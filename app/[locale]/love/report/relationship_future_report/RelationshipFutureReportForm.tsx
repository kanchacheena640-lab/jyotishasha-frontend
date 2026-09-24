"use client";

import { useState, useEffect, useRef } from "react";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";
import { useReportPurchase } from "@/hooks/useReportPurchase";
import { getReportSampleLabel, getReportSampleUrl } from "@/lib/reportSamples";
import { reportsData } from "@/app/data/reportsData";
import { pushViewItem, pushBeginCheckout, ORIGINAL_PRODUCT_FAMILY, type FunnelItemInput } from "@/lib/ecommerceMeasurement";
import {
  applyPlaceSelection,
  applyPobEdit,
  relationshipPlaceError,
  restoreStoredPlace,
  type SelectedPlace,
} from "@/lib/relationshipPlaceValidation";

interface RelationshipFutureReportFormProps {
  locale: string;
}

export default function RelationshipFutureReportForm({ locale }: RelationshipFutureReportFormProps) {
  const { purchase, isProcessing: loading } = useReportPurchase();
  const [mounted, setMounted] = useState(false);
  const isHi = locale === "hi";
  const viewItemSentRef = useRef(false);
  const beginCheckoutSentRef = useRef(false);

  // Reports Ads P0.2A -- GA4-compatible funnel item (catalog display values:
  // funnel events, never financial authority; the purchase itself is measured
  // inside hooks/useReportPurchase.ts from the backend's verified /webhook
  // response, which is why this form adds no purchase handling).
  const catalogEntry = reportsData.find((r) => r.slug === "relationship_future_report");
  const funnelItem: FunnelItemInput | null = catalogEntry
    ? {
        questionKey: catalogEntry.slug, itemName: catalogEntry.title.en, category: catalogEntry.category.en.toLowerCase(),
        price: catalogEntry.price, reportType: "relationship", productFamily: ORIGINAL_PRODUCT_FAMILY,
      }
    : null;

  const [form, setForm] = useState({
    email: "",
    language: locale,
    // placeSelected: true only after a real autocomplete suggestion was picked (typed text alone has no coordinates)
    boy: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0, placeSelected: false },
    girl: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0, placeSelected: false },
  });

  // Hydration Guard & Auto-fill
  useEffect(() => {
    setMounted(true);
    const prevData = sessionStorage.getItem("love_payload");
    if (prevData) {
      try {
        const p = JSON.parse(prevData);
        setForm(prev => ({
          ...prev,
          boy: { 
            name: p.user?.name || "", 
            dob: p.user?.dob || "", 
            tob: p.user?.tob || "", 
            // a place carried over from the free love-match form counts as resolved only if it has usable coordinates
            ...restoreStoredPlace(p.user),
          },
          girl: { 
            name: p.partner?.name || "", 
            dob: p.partner?.dob || "", 
            tob: p.partner?.tob || "", 
            ...restoreStoredPlace(p.partner),
          }
        }));
      } catch (e) {
      }
    }
  }, []);

  // GA4 view_item, once per mount (ref-guarded so React StrictMode's dev
  // double-effect cannot send it twice). Declared before the early return
  // below so hook order is stable.
  useEffect(() => {
    if (!funnelItem || viewItemSentRef.current) return;
    viewItemSentRef.current = true;
    pushViewItem(funnelItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  const update = (side: "boy" | "girl", key: string, value: any) => {
    setForm((p) => ({
      ...p,
      [side]: { ...p[side], [key]: value },
    }));
  };

  // Birth place: a place is valid only after the customer picks a suggestion (see lib/relationshipPlaceValidation.ts).
  // Selecting stores name + coordinates together; any manual edit of the text drops the previous selection at once.
  const selectPlace = (side: "boy" | "girl", place: SelectedPlace) => {
    setForm((p) => ({ ...p, [side]: applyPlaceSelection(p[side], place) }));
  };
  const editPob = (side: "boy" | "girl", value: string) => {
    setForm((p) => ({ ...p, [side]: applyPobEdit(p[side], value) }));
  };

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";
  const labelClass = "block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider";

  // Payment handled by the shared useReportPurchase hook (create order -> checkout ->
  // capture verification fields -> POST /webhook -> redirect only on backend confirmation).
  // Only what's specific to this report -- the two-person form, its validation, and its
  // two-kundali payload shape -- lives here.
  const submit = async () => {
    if (!form.email || !form.email.includes("@")) {
      alert(isHi ? "कृपया सही ईमेल दर्ज करें।" : "Please enter a valid email.");
      return;
    }

    // Both birth places must be genuinely selected BEFORE any order/payment request can start.
    const placeError = relationshipPlaceError(form.boy, form.girl, isHi);
    if (placeError) {
      alert(placeError);
      return;
    }

    // GA4 begin_checkout: both places selected and the email valid -- the
    // customer genuinely starts checkout; order creation is next. Once per
    // page view (a retry after a failed order does not double-count).
    if (funnelItem && !beginCheckoutSentRef.current) {
      beginCheckoutSentRef.current = true;
      pushBeginCheckout(funnelItem);
    }

    const genericFailureAlert = () => {
      alert(isHi ? "भुगतान विफल रहा। पुनः प्रयास करें।" : "Payment failed. Try again.");
    };

    // Paid Report Platform v1.0 -- R7. The COMPLETE primary + partner
    // payload the new backend (R3) requires is now sent at ORDER-
    // CREATION time (POST /api/razorpay-order), not resent later at
    // /webhook -- the backend validates and persists it BEFORE ever
    // contacting Razorpay. Field names/shape match the backend's own
    // contract exactly: primary fields flat, partner fields nested
    // under `partner` unchanged (Order.partner_payload's own existing
    // shape) -- neither flattened nor renamed. `boy_is_user`/bare
    // `payment_id`/`order_id` are dropped: confirmed unused by the
    // backend (love_premium_task.py hard-codes boy_is_user=True itself;
    // only razorpay_order_id/razorpay_payment_id/razorpay_signature are
    // ever read from the callback), not a functional change.
    const orderPayload = {
      name: form.boy.name,
      email: form.email,
      dob: form.boy.dob,
      tob: form.boy.tob,
      pob: form.boy.pob,
      latitude: form.boy.lat,
      longitude: form.boy.lng,
      language: form.language,
      partner: {
        name: form.girl.name,
        dob: form.girl.dob,
        tob: form.girl.tob,
        pob: form.girl.pob,
        latitude: form.girl.lat,
        longitude: form.girl.lng,
      },
    };

    await purchase({
      productSlug: "relationship_future_report",
      orderPayload,
      description: isHi ? "रिलेशनशिप भविष्य रिपोर्ट" : "Relationship Future Report",
      image: "/logo.png",
      themeColor: "#7c3aed",
      redirectTo: `/${locale}/thank-you`,
      // This flow never had a script-load check or a payment.failed listener of its own --
      // both previously fell through to the same generic catch-all alert, preserved here.
      onScriptLoadError: genericFailureAlert,
      onOrderCreationError: genericFailureAlert,
      onUnexpectedError: genericFailureAlert,
      // R7 Section G -- payment succeeded but report generation is
      // delayed: genuinely paid, never a failure, never "pay again".
      onProcessingDelayed: () => {
        alert(isHi
          ? "आपका भुगतान प्राप्त हो गया है। रिपोर्ट तैयार होने में सामान्य से थोड़ा अधिक समय लग रहा है -- यह ईमेल पर भेज दी जाएगी।"
          : "Your payment was received. Your report is taking a little longer than usual and will be emailed to you once ready.");
      },
      // R7 Section G -- /webhook itself rejected the payment (verification
      // failed, amount/order mismatch, orphaned payment, manual-review
      // conflict, ...) or could not be reached at all -- never redirect
      // to success, never invite a second payment.
      onFinalizationFailed: () => {
        alert(isHi
          ? "आपका भुगतान प्राप्त हो गया है, लेकिन हम रिपोर्ट प्रोसेसिंग की पुष्टि नहीं कर सके। कृपया सहायता टीम से संपर्क करें। कृपया दोबारा भुगतान न करें।"
          : "Your payment was received, but we couldn't confirm that your report is being processed. Please contact support. Do not pay again.");
      },
      // onPaymentFailed intentionally omitted: this flow never attached a payment.failed
      // listener before, relying on Razorpay's own modal to surface a failed payment.
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 bg-[#0f0a1e] min-h-screen text-white">
      
      {/* HERO */}
      <div className="rounded-[2.5rem] bg-gradient-to-br from-purple-600/20 to-indigo-900/30 p-8 md:p-12 text-center border border-purple-500/20 shadow-2xl relative overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          💞 {isHi ? "रिलेशनशिप भविष्य रिपोर्ट" : "Relationship Future Report"}
        </h2>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto italic">
          {isHi 
            ? "विवाह की सफलता, ग्रहों के दोष और भविष्य की पूरी जानकारी सीधे ईमेल पर।" 
            : "Deep love analysis based on Vedic principles delivered instantly."}
        </p>
        {/* Secondary, static sample PDF (public/report-samples). Plain anchor: no order, no payment, no backend request. */}
        <div className="mt-6">
          <a
            href={getReportSampleUrl("relationship_future_report", isHi ? "hi" : "en")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 px-5 py-2 text-sm font-semibold text-purple-200 transition-colors hover:border-purple-300 hover:text-white"
          >
            {getReportSampleLabel(isHi ? "hi" : "en")}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* EMAIL */}
      <div className="rounded-3xl bg-white/5 border border-purple-500/20 p-6 md:p-8 backdrop-blur-sm">
        <label className="block text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-3">
           {isHi ? "ईमेल एड्रेस (रिपोर्ट इसी पर आएगी)" : "Email (Report Delivery Address)"}
        </label>
        <input
          type="email"
          className={`${inputClass} text-lg py-4 border-purple-500/30 font-bold`}
          placeholder="example@gmail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BOY */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-5">
          <h2 className="text-xl font-bold text-blue-400">👨 {isHi ? "लड़के का विवरण" : "Boy's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "नाम" : "Name"}</label>
            <input className={inputClass} value={form.boy.name} onChange={(e) => update("boy", "name", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.boy.dob} onChange={(e) => update("boy", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "TOB"}</label>
              <input type="time" className={inputClass} value={form.boy.tob} onChange={(e) => update("boy", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "POB"}</label>
            <PlaceAutocompleteInput
              value={form.boy.pob}
              onChange={(v) => editPob("boy", v)}
              onPlaceSelected={(p) => selectPlace("boy", p)}
            />
          </div>
        </div>

        {/* GIRL */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-5">
          <h2 className="text-xl font-bold text-pink-400">👩 {isHi ? "लड़की का विवरण" : "Girl's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "नाम" : "Name"}</label>
            <input className={inputClass} value={form.girl.name} onChange={(e) => update("girl", "name", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.girl.dob} onChange={(e) => update("girl", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "TOB"}</label>
              <input type="time" className={inputClass} value={form.girl.tob} onChange={(e) => update("girl", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "POB"}</label>
            <PlaceAutocompleteInput
              value={form.girl.pob}
              onChange={(v) => editPob("girl", v)}
              onPlaceSelected={(p) => selectPlace("girl", p)}
            />
          </div>
        </div>
      </div>

      {/* PAYMENT BUTTON */}
      <div className="mt-12 text-center">
        <button
          onClick={submit}
          disabled={loading}
          className="w-full md:max-w-md mx-auto group overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-px shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          <div className="bg-[#0f0a1e]/80 group-hover:bg-transparent transition-colors rounded-2xl py-5 px-8">
             <span className="text-xl font-black text-white">
                {loading ? (isHi ? "भुगतान प्रक्रिया में..." : "Processing...") : (isHi ? "₹199 भुगतान करें और रिपोर्ट प्राप्त करें" : "Pay ₹199 & Generate Report")}
             </span>
          </div>
        </button>
      </div>
    </div>
  );
}