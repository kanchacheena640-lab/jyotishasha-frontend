"use client";
// components/focused-reports/FocusedReportCheckout.tsx
//
// P0.4 -- SELF-only checkout for the 2 pilot focused reports, adapted from
// components/reports/ReportCheckout.tsx (the proven, live ₹51/₹199 checkout
// flow) rather than rewritten. Reused UNCHANGED: the Razorpay SDK load,
// Google Places autocomplete wiring, formatCalendarDob, the order-creation
// contract (/api/razorpay-order + /webhook), analyticsAttribution's
// campaign_context, and the fulfillmentIssue "payment received, do not pay
// again" screen.
//
// CRITICAL SECURITY RULE: the `product` field sent to the backend is
// ALWAYS `config.questionKey` (e.g. "major_kundali_obstacles") -- the one
// stable identity resolved once, server-side, from the trusted
// FOCUSED_REPORTS_CONFIG map. The cosmetic SEO slug in the URL
// ("major-kundali-obstacles") is never read by this component at all, so
// there is no code path through which it could ever be submitted as
// `product`. The frontend never computes or trusts a charge amount --
// `orderData.amount` from the backend response is used verbatim, exactly
// as the existing flow already does.
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadGoogleMapsPlaces } from "@/components/PlaceAutocompleteInput";
import { buildCampaignContextFromAttribution, readStoredAttribution } from "@/lib/analyticsAttribution";
import { formatCalendarDob } from "@/lib/formatCalendarDob";
import { WebsiteEvents } from "@/lib/websiteEvents";
import type { FocusedReportConfig } from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Same two non-immediate-success outcomes as ReportCheckout.tsx -- see
// that file's own comment for exactly why ("unconfirmed" vs.
// "processing_delayed"). Reused verbatim, not reinvented.
interface FulfillmentIssue {
  orderId: string;
  paymentId: string;
  kind: "unconfirmed" | "processing_delayed";
}

interface Props {
  config: FocusedReportConfig;
  locale: Locale;
}

export default function FocusedReportCheckout({ config, locale }: Props) {
  const currentLang = locale; // the route's own locale -- never re-detected client-side

  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", tob: "", pob: "",
    latitude: "", longitude: "", language: currentLang,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [fulfillmentIssue, setFulfillmentIssue] = useState<FulfillmentIssue | null>(null);
  const paymentConfirmedRef = useRef(false);
  const placeRef = useRef<HTMLInputElement | null>(null);
  const hasTrackedFormStartRef = useRef(false);

  useEffect(() => {
    // report_view: this form is the customer's first real interaction with
    // this specific focused report (the hero above it is server-rendered,
    // no client event needed for it) -- fires once per mount.
    WebsiteEvents.reportViewed(config.questionKey, config.category, currentLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!placeRef.current) return;
    loadGoogleMapsPlaces();
    const interval = setInterval(() => {
      if ((window as any).google?.maps) {
        clearInterval(interval);
        const autocomplete = new (window as any).google.maps.places.Autocomplete(placeRef.current!, {
          types: ["(cities)"],
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setForm((prev) => ({
            ...prev,
            pob: place.name || "",
            latitude: place.geometry?.location?.lat()?.toString() || "",
            longitude: place.geometry?.location?.lng()?.toString() || "",
          }));
        });
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const trackFormStartOnce = () => {
    if (hasTrackedFormStartRef.current) return;
    hasTrackedFormStartRef.current = true;
    WebsiteEvents.formStarted(config.questionKey, config.category, currentLang);
  };

  const handleChange = (e: any) => {
    trackFormStartOnce();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Same invalidate-on-manual-edit rule as ReportCheckout.tsx: any real
  // edit to the place text -- not a selection -- clears any previously
  // captured coordinates, until a new real suggestion is chosen.
  const handlePobChange = (e: any) => {
    trackFormStartOnce();
    const val = e.target.value;
    setForm((prev) => ({ ...prev, pob: val, latitude: "", longitude: "" }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.dob || !form.tob || !form.pob || !form.name || !form.phone) {
      alert(currentLang === "hi" ? "❗ कृपया सभी अनिवार्य जानकारी भरें" : "❗ Please fill all required fields");
      return;
    }

    if (form.latitude === "" || form.longitude === "") {
      alert(
        currentLang === "hi"
          ? "❗ कृपया सूची में से अपना जन्म स्थान चुनें"
          : "❗ Please select your place of birth from the suggestions list",
      );
      return;
    }

    // form_complete: all required fields, including a real place
    // selection, are present -- the customer has finished the form.
    WebsiteEvents.formCompleted(config.questionKey, config.category, currentLang);

    paymentConfirmedRef.current = false;
    setIsProcessing(true);

    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert(currentLang === "hi" ? "पेमेंट गेटवे लोड नहीं हो सका। कृपया इंटरनेट जांचें।" : "Failed to load Razorpay SDK. Check your internet.");
        setIsProcessing(false);
        return;
      }

      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const campaignContext =
        typeof window !== "undefined"
          ? buildCampaignContextFromAttribution(readStoredAttribution(window.sessionStorage))
          : undefined;

      // begin_checkout: fired right before the order-creation request --
      // the customer has committed to paying.
      WebsiteEvents.beginCheckout(config.questionKey, config.category, currentLang);

      // SECURITY: `product` is ALWAYS config.questionKey -- the trusted,
      // stable identity -- never the cosmetic SEO slug, never a visible
      // title/question string.
      const orderResponse = await fetch(`${base}/api/razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: config.questionKey,
          name: form.name, email: form.email, phone: form.phone,
          dob: form.dob, tob: form.tob, pob: form.pob,
          latitude: form.latitude, longitude: form.longitude,
          language: form.language,
          ...(campaignContext ? { campaign_context: campaignContext } : {}),
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.order_id) {
        // Requirement 7 / P0.5 Part 6 -- inactive-product UX: the backend
        // rejects an inactive/unknown product with { error, message } and
        // NO order_id, exactly like any other invalid_request today (see
        // OrderService.create_pending_order()). Handled by the SAME
        // existing error path as every other order-creation failure --
        // no special-cased "fake success," no bypass of backend
        // validation, and the CTA is simply re-enabled so the customer
        // is never stuck in a broken, unrecoverable state.
        //
        // P0.5 fix: the backend's own `error`/`message` strings are
        // internal diagnostics -- OrderService's message literally
        // embeds the raw question_key (e.g. "Report product is not
        // currently available: 'major_kundali_obstacles'"). They must
        // never reach this alert; the customer sees one fixed, bilingual
        // sentence only, with no backend text, no error code, and no
        // question_key ever appended.
        alert(currentLang === "hi" ? "यह रिपोर्ट अभी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।" : "This report is not available yet. Please try again later.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        // Backend-authoritative, in paise, verbatim -- never derived from
        // config.priceRupees (display-only) or multiplied client-side.
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Jyotishasha",
        description: "Focused Astrology Report",
        order_id: orderData.order_id,
        handler: async function (response: any) {
          paymentConfirmedRef.current = true;
          setIsProcessing(true);

          try {
            const webhookRes = await fetch(`${base}/webhook`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!webhookRes.ok) {
              setFulfillmentIssue({ orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, kind: "unconfirmed" });
              return;
            }

            const webhookData = await webhookRes.json().catch(() => null);
            if (webhookData?.status === "payment_confirmed_processing_delayed") {
              setFulfillmentIssue({ orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, kind: "processing_delayed" });
              return;
            }

            window.location.href = `/${currentLang}/thank-you`;
          } catch {
            setFulfillmentIssue({ orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, kind: "unconfirmed" });
          }
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#7e22ce" },
        modal: {
          ondismiss: function () {
            if (!paymentConfirmedRef.current) setIsProcessing(false);
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment Failed. Reason: " + response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      alert("Something went wrong during payment initialization.");
      setIsProcessing(false);
    }
  };

  if (fulfillmentIssue) {
    const isDelayedOnly = fulfillmentIssue.kind === "processing_delayed";
    return (
      <div className="max-w-xl mx-auto px-4 py-10 font-sans text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-200">
          <p className="text-4xl mb-4">{isDelayedOnly ? "⏳" : "⚠️"}</p>
          <h2 className="text-xl font-bold text-amber-700 mb-3">
            {currentLang === "hi" ? "भुगतान प्राप्त हो गया" : "Payment Received"}
          </h2>
          <p className="text-gray-700 mb-4">
            {isDelayedOnly
              ? currentLang === "hi"
                ? "आपका भुगतान सफलतापूर्वक प्राप्त हो गया है। आपकी रिपोर्ट तैयार होने में सामान्य से थोड़ा अधिक समय लग रहा है -- यह तैयार होते ही ईमेल पर भेज दी जाएगी। कृपया दोबारा भुगतान न करें।"
                : "Your payment was received successfully. Your report is taking a little longer than usual and will be emailed to you once ready. Please do not pay again."
              : currentLang === "hi"
                ? "आपका भुगतान सफलतापूर्वक प्राप्त हो गया है, लेकिन हम आपकी रिपोर्ट प्रोसेसिंग की पुष्टि नहीं कर सके। कृपया नीचे दिए गए विवरण के साथ हमारी सहायता टीम से संपर्क करें। कृपया दोबारा भुगतान न करें।"
                : "Your payment was received successfully, but we couldn't confirm that your report is being processed. Please contact our support team with the details below. Please do not pay again."}
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 mb-6 space-y-1">
            <div><strong>{currentLang === "hi" ? "ऑर्डर आईडी" : "Order ID"}:</strong> {fulfillmentIssue.orderId}</div>
            <div><strong>{currentLang === "hi" ? "भुगतान आईडी" : "Payment ID"}:</strong> {fulfillmentIssue.paymentId}</div>
          </div>
          {!isDelayedOnly && (
            <a
              href="https://wa.me/917007012255"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              💬 {currentLang === "hi" ? "सहायता के लिए व्हाट्सएप पर चैट करें" : "Chat with support on WhatsApp"}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="focused-report-form" className="max-w-xl mx-auto px-4 py-10 font-sans scroll-mt-24">
      <h2 className="text-2xl font-bold mb-8 text-center text-purple-800">
        {currentLang === "hi" ? "अपनी जानकारी भरें" : "Fill Your Details"}
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 mb-6">
        <h3 className="text-lg font-bold mb-4 text-purple-700 border-b pb-2">
          👤 {currentLang === "hi" ? "व्यक्तिगत विवरण" : "Personal Details"}
        </h3>
        <div className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder={currentLang === "hi" ? "पूरा नाम *" : "Full Name *"} className="inputStyle" required />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className="inputStyle" required />
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={currentLang === "hi" ? "फ़ोन नंबर *" : "Phone Number *"} className="inputStyle" required />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 mb-8">
        <h3 className="text-lg font-bold mb-4 text-purple-700 border-b pb-2">
          🔮 {currentLang === "hi" ? "जन्म विवरण" : "Birth Details"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === "hi" ? "जन्म तिथि *" : "Date of Birth *"}
            </label>
            <DatePicker
              selected={form.dob ? new Date(`${form.dob}T00:00:00`) : null}
              onChange={(date: Date | null) => {
                trackFormStartOnce();
                if (date) setForm((prev) => ({ ...prev, dob: formatCalendarDob(date) }));
              }}
              dateFormat="dd-MM-yyyy"
              className="inputStyle text-gray-900 w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholderText="DD-MM-YYYY"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === "hi" ? "जन्म का समय *" : "Time of Birth *"}
            </label>
            <input type="time" name="tob" value={form.tob} onChange={handleChange} className="inputStyle" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === "hi" ? "जन्म स्थान *" : "Place of Birth *"}
            </label>
            <input ref={placeRef} name="pob" value={form.pob} onChange={handlePobChange} placeholder={currentLang === "hi" ? "शहर चुनें" : "Search City"} className="inputStyle text-gray-900" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === "hi" ? "रिपोर्ट की भाषा" : "Report Language"}
            </label>
            <select name="language" value={form.language} onChange={handleChange} className="inputStyle">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`w-full text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all active:scale-95 ${
          isProcessing ? "bg-purple-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
        }`}
      >
        {isProcessing
          ? currentLang === "hi" ? "प्रोसेस हो रहा है..." : "Processing..."
          : currentLang === "hi" ? `भुगतान करें ₹${config.priceRupees}` : `Proceed to Pay ₹${config.priceRupees}`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        {currentLang === "hi"
          ? "सुरक्षित भुगतान Razorpay द्वारा संचालित।"
          : "Secure payment powered by Razorpay."}
      </p>

      <style jsx>{`
        .inputStyle {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          outline: none;
          transition: all 0.2s;
          background: #fff;
          color: #1a202c;
        }
        .inputStyle:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px #ddd6fe;
        }
      `}</style>
    </div>
  );
}
