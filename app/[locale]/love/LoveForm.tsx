"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";
import { WebsiteEvents } from "@/lib/websiteEvents";
import { pushMarketingMeasurementEvent } from "@/lib/marketingMeasurementBridge";
import { applyPlaceSelection, applyPobEdit, type SelectedPlace } from "@/lib/relationshipPlaceValidation";
import {
  LOVE_MATCH_MEASURED_PREFIX,
  loveMatchErrorMessage,
  loveMatchKey,
  validateLoveMatchForm,
  type LoveMatchPerson,
} from "@/lib/loveMatchForm";
import { loadLoveTools, pendingToolsRecord } from "@/lib/loveTools";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

interface LoveFormProps {
  locale: string;
}

/** The exact birth fields the backend receives (the local placeSelected flag stays in the form). */
const toPayloadPerson = ({ name, dob, tob, pob, lat, lng }: LoveMatchPerson) => ({ name, dob, tob, pob, lat, lng });

export default function LoveFormPage({ locale }: LoveFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isHi = locale === "hi";

  const abortControllerRef = useRef<AbortController | null>(null);
  // Match keys already measured on this page view (StrictMode / double-click safety; sessionStorage covers reloads).
  const measuredRef = useRef<Set<string>>(new Set());

  // placeSelected: true only after a real autocomplete suggestion was picked (typed text has no coordinates).
  const [form, setForm] = useState<{ language: string; boy: LoveMatchPerson; girl: LoveMatchPerson }>({
    language: locale,
    boy: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0, placeSelected: false },
    girl: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0, placeSelected: false },
  });

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const update = (section: "boy" | "girl", field: "name" | "dob" | "tob", value: string) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Birth place: valid only after a suggestion is picked; any manual edit drops the previous coordinates.
  const selectPlace = (section: "boy" | "girl", place: SelectedPlace) => {
    setForm((prev) => ({ ...prev, [section]: applyPlaceSelection(prev[section], place) }));
  };
  const editPob = (section: "boy" | "girl", value: string) => {
    setForm((prev) => ({ ...prev, [section]: applyPobEdit(prev[section], value) }));
  };

  // Ads measurement: one jyotishasha_love_match_success per couple per browser session. Consent is handled the
  // same way as every other bridge event -- Google Consent Mode decides what GTM's tags may do with it.
  const measureMatchSuccess = (key: string) => {
    if (measuredRef.current.has(key)) return;
    measuredRef.current.add(key);
    try {
      const storageKey = LOVE_MATCH_MEASURED_PREFIX + key;
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Storage unavailable: the in-memory guard above still prevents duplicates on this page view.
    }
    pushMarketingMeasurementEvent({ name: "jyotishasha_love_match_success" });
  };

  const submit = async () => {
    if (loading) return;

    // Names, dates, BOTH birth times and selected places are required -- no score from an estimated Moon.
    const invalid = validateLoveMatchForm(form, isHi);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError(null);

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    // Task 13E -- the meaningful Match Making generation attempt: fires
    // only after required local validation has passed (both DOBs present,
    // both places resolved to real coordinates) but before the actual
    // calculation/API request begins. An incomplete form that returns
    // above never reaches this line, so it is never counted as a
    // generation attempt. Fixed, developer-controlled identifiers only --
    // no name/dob/tob/pob/lat/lng ever passed here. page_path is attached
    // automatically by WebsiteEvents itself (Task 9A).
    WebsiteEvents.ctaClick("love_matchmaking_generate", "love");

    setLoading(true);

    const payload = {
      language: form.language,
      boy_is_user: true,
      user: toPayloadPerson(form.boy),
      partner: toPayloadPerson(form.girl),
    };

    // HTTP status of the main report call, for the error message (stays null if no answer arrived).
    let reportStatus: number | null = null;

    try {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortControllerRef.current.signal,
      };

      // Only the main report is awaited: it alone carries the score, verdict and Mangal Dosh. The backend
      // handles one request at a time, so waiting for all three calls made the visitor wait for their sum.
      const reportRes = await fetch(`${BACKEND}/api/love/report`, fetchOptions);

      reportStatus = reportRes.status;
      if (!reportRes.ok) throw new Error("Primary API failed");

      const reportJson = await reportRes.json();
      const matchKey = loveMatchKey(payload);

      sessionStorage.setItem("love_payload", JSON.stringify(payload));
      sessionStorage.setItem("love_summary", JSON.stringify(reportJson));
      // Truth-or-Dare and Marriage potential (/api/love/truth-or-dare, /api/love/love-marriage-probability)
      // load AFTER the main report, in the background: marked pending here, filled in by lib/loveTools.ts,
      // which the result page reuses (one load per match; never aborted by this form unmounting).
      sessionStorage.setItem("love_tools", pendingToolsRecord(matchKey));
      void loadLoveTools(payload, BACKEND);

      // Task 13E -- successful completion ONLY: reached exclusively after
      // the primary report response was confirmed ok and the main match
      // result was safely prepared and stored in sessionStorage just
      // above (the two secondary tools load afterwards). Never
      // fires from the catch block below, never on a validation/API
      // failure, never on page load or a result-page render. One real
      // submission that truly succeeds produces exactly one feature_used.
      // No birth data, no API response, no calculated/compatibility data
      // -- only the fixed feature identity, mirroring the /tools family's
      // own "featureUsed only after successful generation" rule.
      WebsiteEvents.featureUsed("love_matchmaking_generate");
      measureMatchSuccess(matchKey);

      router.push(`${isHi ? "/hi" : ""}/love/result`);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setError(loveMatchErrorMessage(reportStatus, isHi));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm";
  const labelClass = "block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          {isHi ? "💍 वैदिक मिलान" : "💍 Vedic Matchmaking"}
        </h2>
        <p className="text-gray-400 text-sm">
          {isHi ? "कुंडली और 36 गुण मिलान" : "Kundli & 36 Guna Milan"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BOY CARD */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4 backdrop-blur-sm relative group">
          <h2 className="text-lg font-bold text-blue-400">♂ {isHi ? "लड़का" : "Boy's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "पूरा नाम" : "Full Name"}</label>
            <input
              className={inputClass}
              value={form.boy.name}
              onChange={(e) => update("boy", "name", e.target.value)}
              placeholder={isHi ? "नाम लिखें..." : "Enter name..."}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.boy.dob} onChange={(e) => update("boy", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "Time"}</label>
              <input type="time" className={inputClass} value={form.boy.tob} onChange={(e) => update("boy", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
            <PlaceAutocompleteInput
              value={form.boy.pob}
              onChange={(val) => editPob("boy", val)}
              onPlaceSelected={(p) => selectPlace("boy", p)}
            />
          </div>
        </div>

        {/* GIRL CARD */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4 backdrop-blur-sm relative group">
          <h2 className="text-lg font-bold text-pink-400">♀ {isHi ? "लड़की" : "Girl's Details"}</h2>
          <div>
            <label className={labelClass}>{isHi ? "पूरा नाम" : "Full Name"}</label>
            <input
              className={inputClass}
              value={form.girl.name}
              onChange={(e) => update("girl", "name", e.target.value)}
              placeholder={isHi ? "नाम लिखें..." : "Enter name..."}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>{isHi ? "जन्म तिथि" : "DOB"}</label>
              <input type="date" className={inputClass} value={form.girl.dob} onChange={(e) => update("girl", "dob", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isHi ? "समय" : "Time"}</label>
              <input type="time" className={inputClass} value={form.girl.tob} onChange={(e) => update("girl", "tob", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
            <PlaceAutocompleteInput
              value={form.girl.pob}
              onChange={(val) => editPob("girl", val)}
              onPlaceSelected={(p) => selectPlace("girl", p)}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-sm mx-auto">
        {error && (
          <p role="alert" data-testid="love-form-error" className="mb-4 rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm leading-snug text-rose-100">
            {error}
          </p>
        )}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 p-px shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          <div className="bg-[#0f0a1e] py-4 rounded-2xl">
            <span className="text-lg font-bold text-white uppercase tracking-widest">
              {loading ? (isHi ? "गणना जारी है..." : "Analyzing...") : (isHi ? "शुभ मिलान चेक करें" : "Check Match")}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
