"use client";
// components/focused-reports/FocusedDualReportCheckout.tsx
//
// P0.7 -- two-person checkout for the 9 DUAL focused products
// (generator=focused_dual_v1 on the backend). Deliberately built on the
// SAME proven primitives the existing relationship_future_report flow
// already uses -- not a new implementation:
//   - hooks/useReportPurchase.ts for the entire Razorpay/webhook
//     orchestration (script load, order creation, payment, fulfillment
//     outcomes) -- no hand-rolled duplicate of that logic here.
//   - components/PlaceAutocompleteInput.tsx for both persons' birth-place
//     fields (the same shared Google Places widget, not a second one).
//   - lib/relationshipPlaceValidation.ts (applyPlaceSelection/applyPobEdit/
//     relationshipPlaceError) for "a place only counts once a real
//     suggestion is picked, and any manual edit invalidates it" -- the
//     exact same proven rule, unit-tested independently of this component.
//
// BACKEND CONTRACT (verified directly against modules/payments/
// order_service.py's LOVE_PREMIUM_PRIMARY_REQUIRED_FIELDS /
// LOVE_PREMIUM_PARTNER_REQUIRED_FIELDS -- the same branch focused_dual_v1
// shares with love_premium_v1 -- and app/[locale]/love/report/
// relationship_future_report/RelationshipFutureReportForm.tsx's own,
// already-live orderPayload shape): primary person's fields are FLAT on
// the order payload (name/email/dob/tob/pob/latitude/longitude, no
// phone -- confirmed absent from the proven relationship form, not
// merely optional), partner fields are nested under `partner`
// (name/dob/tob/pob/latitude/longitude -- no email/phone for the
// partner). Never guessed; read from that source directly.
//
// CRITICAL SECURITY RULE: `product` sent to the backend is ALWAYS
// config.questionKey -- resolved once, server-side (getFocusedReportConfigBySlug),
// never the cosmetic SEO slug or a visible title/question string. Same
// invariant as FocusedReportCheckout.tsx (SELF).
import { useEffect, useRef, useState } from "react";
import { User, Users, Clock, AlertTriangle, MessageCircle } from "lucide-react";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";
import { useReportPurchase } from "@/hooks/useReportPurchase";
import {
  applyPlaceSelection,
  applyPobEdit,
  relationshipPlaceError,
  type RelationshipPlaceState,
  type SelectedPlace,
} from "@/lib/relationshipPlaceValidation";
import { WebsiteEvents } from "@/lib/websiteEvents";
import type { FocusedReportConfig } from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";

interface FulfillmentIssue {
  kind: "unconfirmed" | "processing_delayed";
}

interface PersonState extends RelationshipPlaceState {
  name: string;
  dob: string;
  tob: string;
}
const emptyPerson = (): PersonState => ({ name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0, placeSelected: false });

interface Props {
  config: FocusedReportConfig;
  locale: Locale;
}

export default function FocusedDualReportCheckout({ config, locale }: Props) {
  const currentLang = locale;
  const isHi = locale === "hi";
  const { purchase, isProcessing } = useReportPurchase();

  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<Locale>(locale);
  const [primary, setPrimary] = useState<PersonState>(emptyPerson());
  const [partner, setPartner] = useState<PersonState>(emptyPerson());
  const [fulfillmentIssue, setFulfillmentIssue] = useState<FulfillmentIssue | null>(null);
  const hasTrackedFormStartRef = useRef(false);

  useEffect(() => {
    WebsiteEvents.reportViewed(config.questionKey, config.category, currentLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackFormStartOnce = () => {
    if (hasTrackedFormStartRef.current) return;
    hasTrackedFormStartRef.current = true;
    WebsiteEvents.formStarted(config.questionKey, config.category, currentLang);
  };

  const updatePrimary = (key: "name" | "dob" | "tob", value: string) => {
    trackFormStartOnce();
    setPrimary((p) => ({ ...p, [key]: value }));
  };
  const updatePartner = (key: "name" | "dob" | "tob", value: string) => {
    trackFormStartOnce();
    setPartner((p) => ({ ...p, [key]: value }));
  };
  // Same invalidate-on-manual-edit rule as the relationship form: selecting
  // a suggestion stores name+coordinates together; any manual text edit
  // drops the previous selection at once (lib/relationshipPlaceValidation.ts).
  const selectPrimaryPlace = (place: SelectedPlace) => { trackFormStartOnce(); setPrimary((p) => applyPlaceSelection(p, place)); };
  const editPrimaryPob = (value: string) => { trackFormStartOnce(); setPrimary((p) => applyPobEdit(p, value)); };
  const selectPartnerPlace = (place: SelectedPlace) => { trackFormStartOnce(); setPartner((p) => applyPlaceSelection(p, place)); };
  const editPartnerPob = (value: string) => { trackFormStartOnce(); setPartner((p) => applyPobEdit(p, value)); };

  // P0 contrast fix: this form's cards are WHITE (bg-white, matching
  // FocusedReportCheckout.tsx's own SELF-form card style), so inputs need
  // dark-on-light styling -- NOT the dark-card "bg-white/5 text-white"
  // classes RelationshipFutureReportForm.tsx uses, which only read
  // correctly on ITS dark page background. Mixing the two (this form's
  // original bug) put near-white text on a near-white input surface.
  // color-scheme:light additionally keeps the native date/time picker
  // popups and the <select> dropdown light-themed regardless of the
  // visitor's OS/browser dark-mode setting.
  const inputClass = "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all [color-scheme:light]";
  const labelClass = "block text-[11px] font-bold text-gray-600 mb-1.5 uppercase tracking-wider";

  const genericFailureAlert = () => {
    alert(isHi ? "भुगतान विफल रहा। पुनः प्रयास करें।" : "Payment failed. Try again.");
  };

  const submit = async () => {
    if (!email || !email.includes("@") || !primary.name || !primary.dob || !primary.tob || !partner.name || !partner.dob || !partner.tob) {
      alert(isHi ? "कृपया सभी अनिवार्य जानकारी भरें" : "Please fill all required fields");
      return;
    }
    // Both birth places must be genuinely selected BEFORE any order/payment request can start.
    const placeError = relationshipPlaceError(primary, partner, isHi);
    if (placeError) {
      alert(placeError);
      return;
    }

    // form_complete: all required fields, including both real place
    // selections, are present -- the customer has finished the form.
    WebsiteEvents.formCompleted(config.questionKey, config.category, currentLang);
    // begin_checkout: fired right before the order-creation request --
    // the customer has committed to paying.
    WebsiteEvents.beginCheckout(config.questionKey, config.category, currentLang);

    await purchase({
      productSlug: config.questionKey,
      orderPayload: {
        name: primary.name,
        email,
        dob: primary.dob,
        tob: primary.tob,
        pob: primary.pob,
        latitude: primary.lat,
        longitude: primary.lng,
        language,
        partner: {
          name: partner.name,
          dob: partner.dob,
          tob: partner.tob,
          pob: partner.pob,
          latitude: partner.lat,
          longitude: partner.lng,
        },
      },
      description: config.title[currentLang],
      themeColor: "#7e22ce",
      redirectTo: `/${currentLang}/thank-you`,
      onScriptLoadError: () => {
        alert(isHi ? "पेमेंट गेटवे लोड नहीं हो सका। कृपया इंटरनेट जांचें।" : "Failed to load Razorpay SDK. Check your internet.");
      },
      // P0.5 Part 6 -- the backend's own error/message text is an internal
      // diagnostic (it can embed the raw question_key) and must never
      // reach this alert; the `backendMessage` argument is deliberately
      // never read. One fixed, bilingual sentence, same as
      // FocusedReportCheckout.tsx's own inactive-product handling.
      onOrderCreationError: () => {
        alert(isHi ? "यह रिपोर्ट अभी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।" : "This report is not available yet. Please try again later.");
      },
      onUnexpectedError: genericFailureAlert,
      // Same two non-immediate-success outcomes as every other focused/
      // relationship checkout -- see ReportCheckout.tsx's own comment for
      // exactly why. useReportPurchase's callbacks don't carry
      // razorpay_order_id/payment_id through to the caller (matching
      // RelationshipFutureReportForm.tsx's own existing, live use of this
      // same hook), so this shows the same "do not pay again" message via
      // a persistent screen rather than an alert that could be missed.
      onProcessingDelayed: () => setFulfillmentIssue({ kind: "processing_delayed" }),
      onFinalizationFailed: () => setFulfillmentIssue({ kind: "unconfirmed" }),
    });
  };

  if (fulfillmentIssue) {
    const isDelayedOnly = fulfillmentIssue.kind === "processing_delayed";
    return (
      <div className="max-w-xl mx-auto px-4 py-10 font-sans text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-200">
          <div className="flex justify-center mb-4">
            {isDelayedOnly ? <Clock className="w-10 h-10 text-amber-600" aria-hidden="true" /> : <AlertTriangle className="w-10 h-10 text-amber-600" aria-hidden="true" />}
          </div>
          <h2 className="text-xl font-bold text-amber-700 mb-3">
            {isHi ? "भुगतान प्राप्त हो गया" : "Payment Received"}
          </h2>
          <p className="text-gray-700 mb-4">
            {isDelayedOnly
              ? isHi
                ? "आपका भुगतान सफलतापूर्वक प्राप्त हो गया है। आपकी रिपोर्ट तैयार होने में सामान्य से थोड़ा अधिक समय लग रहा है -- यह तैयार होते ही ईमेल पर भेज दी जाएगी। कृपया दोबारा भुगतान न करें।"
                : "Your payment was received successfully. Your report is taking a little longer than usual and will be emailed to you once ready. Please do not pay again."
              : isHi
                ? "आपका भुगतान सफलतापूर्वक प्राप्त हो गया है, लेकिन हम आपकी रिपोर्ट प्रोसेसिंग की पुष्टि नहीं कर सके। कृपया हमारी सहायता टीम से संपर्क करें। कृपया दोबारा भुगतान न करें।"
                : "Your payment was received successfully, but we couldn't confirm that your report is being processed. Please contact our support team. Please do not pay again."}
          </p>
          {!isDelayedOnly && (
            <a
              href="https://wa.me/917007012255"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              {isHi ? "सहायता के लिए व्हाट्सएप पर चैट करें" : "Chat with support on WhatsApp"}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="focused-report-form" className="max-w-4xl mx-auto px-4 py-10 space-y-8 font-sans scroll-mt-24">
      <h2 className="text-2xl font-bold text-center text-purple-800">
        {isHi ? "अपनी जानकारी भरें" : "Fill Your Details"}
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50">
        <label className={labelClass}>{isHi ? "ईमेल (रिपोर्ट इसी पर भेजी जाएगी) *" : "Email (report will be sent here) *"}</label>
        <input
          type="email"
          className={inputClass}
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => { trackFormStartOnce(); setEmail(e.target.value); }}
          required
        />
        <label className={`${labelClass} mt-4`}>{isHi ? "रिपोर्ट की भाषा" : "Report Language"}</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value as Locale)} className={inputClass}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PRIMARY -- the person completing this purchase */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-purple-700 border-b pb-2">
            <User className="w-5 h-5" aria-hidden="true" />
            {isHi ? "आपका विवरण" : "Your Details"}
          </h3>
          <div>
            <label className={labelClass}>{isHi ? "नाम *" : "Name *"}</label>
            <input className={inputClass} value={primary.name} onChange={(e) => updatePrimary("name", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि *" : "DOB *"}</label>
              <input type="date" className={inputClass} value={primary.dob} onChange={(e) => updatePrimary("dob", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय *" : "TOB *"}</label>
              <input type="time" className={inputClass} value={primary.tob} onChange={(e) => updatePrimary("tob", e.target.value)} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान *" : "POB *"}</label>
            <PlaceAutocompleteInput value={primary.pob} onChange={editPrimaryPob} onPlaceSelected={selectPrimaryPlace} />
          </div>
        </div>

        {/* PARTNER */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-purple-700 border-b pb-2">
            <Users className="w-5 h-5" aria-hidden="true" />
            {isHi ? "साथी का विवरण" : "Partner's Details"}
          </h3>
          <div>
            <label className={labelClass}>{isHi ? "नाम *" : "Name *"}</label>
            <input className={inputClass} value={partner.name} onChange={(e) => updatePartner("name", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि *" : "DOB *"}</label>
              <input type="date" className={inputClass} value={partner.dob} onChange={(e) => updatePartner("dob", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय *" : "TOB *"}</label>
              <input type="time" className={inputClass} value={partner.tob} onChange={(e) => updatePartner("tob", e.target.value)} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान *" : "POB *"}</label>
            <PlaceAutocompleteInput value={partner.pob} onChange={editPartnerPob} onPlaceSelected={selectPartnerPlace} />
          </div>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={isProcessing}
        className={`w-full text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all active:scale-95 ${
          isProcessing ? "bg-purple-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
        }`}
      >
        {isProcessing
          ? isHi ? "प्रोसेस हो रहा है..." : "Processing..."
          : isHi ? `भुगतान करें ₹${config.priceRupees}` : `Proceed to Pay ₹${config.priceRupees}`}
      </button>

      <p className="text-xs text-gray-400 text-center">
        {isHi ? "सुरक्षित भुगतान Razorpay द्वारा संचालित।" : "Secure payment powered by Razorpay."}
      </p>
    </div>
  );
}
