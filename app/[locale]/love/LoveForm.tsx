"use client";

import { useState, useRef, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import DatePicker, { registerLocale } from "react-datepicker";
import { hi as hiLocale } from "date-fns/locale/hi";
import "react-datepicker/dist/react-datepicker.css";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";
import { formatCalendarDob } from "@/lib/formatCalendarDob";
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

// Hindi month and weekday names in the /hi calendar. Display only: the field still shows and parses
// DD-MM-YYYY with Western digits, and the stored value stays YYYY-MM-DD.
registerLocale("hi", hiLocale);

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
      // Sent BEFORE the background load: the backend handles one request at a time, and queued behind the two
      // slow secondary calls this small request hit the analytics client's 3s timeout.
      WebsiteEvents.featureUsed("love_matchmaking_generate");
      measureMatchSuccess(matchKey);
      void loadLoveTools(payload, BACKEND);

      router.push(`${isHi ? "/hi" : ""}/love/result`);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setError(loveMatchErrorMessage(reportStatus, isHi));
    } finally {
      setLoading(false);
    }
  };

  // Presentation only (Phase 1 redesign): every field has a programmatic label, 16px text (no iOS
  // focus zoom), 48px targets and the Marriage Hub ivory/navy palette. The submit logic above is unchanged.
  const uid = useId();
  const fieldId = (section: "boy" | "girl", field: string) => `${uid}-${section}-${field}`;
  const inputClass = "block w-full min-h-[48px] rounded-xl border border-[#B9AE9C] bg-[#FFFFFF] px-4 text-[16px] text-[#1B2A4A] placeholder:text-[#6B7489] focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30";
  // Date and time sit side by side: 12px side padding so "DD-MM-YYYY" and the browser's "hh:mm AM" fit at 380px+.
  const compactInputClass = inputClass.replace("px-4", "px-3");
  const labelClass = "mb-1.5 block text-[14px] font-semibold text-[#1B2A4A]";
  const people = [
    { key: "boy" as const, legend: isHi ? "वर (लड़का)" : "Groom (Boy)" },
    { key: "girl" as const, legend: isHi ? "वधू (लड़की)" : "Bride (Girl)" },
  ];

  return (
    <section aria-labelledby={`${uid}-heading`} className="rounded-2xl border border-[#E8DDC9] bg-[#FFFFFF] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.06)] sm:p-7">
      <h2 id={`${uid}-heading`} className="text-[20px] font-bold leading-snug text-[#1B2A4A] sm:text-[22px]">
        {isHi ? "दोनों की जन्म जानकारी दर्ज करें" : "Enter both partners' birth details"}
      </h2>
      <p className="mt-1 text-[15px] leading-6 text-[#45516A]">
        {isHi
          ? "दोनों की जन्म तिथि, सटीक जन्म समय और जन्म स्थान ज़रूरी हैं — इन्हीं से चंद्र राशि और नक्षत्र निकलते हैं।"
          : "Date, exact time and place of birth are needed for both — they set each person's Moon sign and nakshatra."}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {people.map(({ key, legend }) => (
          <fieldset key={key} className="min-w-0 rounded-xl border border-[#E8DDC9] bg-[#FBF8F2] px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
            <legend className="px-1 text-[16px] font-bold text-[#1B2A4A]">{legend}</legend>
            <div className="space-y-3">
              <div>
                <label htmlFor={fieldId(key, "name")} className={labelClass}>{isHi ? "पूरा नाम" : "Full name"}</label>
                <input
                  id={fieldId(key, "name")}
                  className={inputClass}
                  value={form[key].name}
                  onChange={(e) => update(key, "name", e.target.value)}
                  placeholder={isHi ? "नाम लिखें" : "Enter name"}
                />
              </div>
              {/* Date and time side by side from 380px; stacked on the narrowest phones so DD-MM-YYYY and the calendar fit. */}
              <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor={fieldId(key, "dob")} className={labelClass}>{isHi ? "जन्म तिथि" : "Date of birth"}</label>
                  {/* Shown as DD-MM-YYYY on every device (same picker and helpers as the report checkouts); the form
                      state, payload and validation keep YYYY-MM-DD. Local-midnight parse + local getters: no timezone shift. */}
                  <DatePicker
                    id={fieldId(key, "dob")}
                    selected={form[key].dob ? new Date(`${form[key].dob}T00:00:00`) : null}
                    onChange={(date: Date | null) => update(key, "dob", date ? formatCalendarDob(date) : "")}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="DD-MM-YYYY"
                    className={compactInputClass}
                    wrapperClassName="block w-full"
                    autoComplete="off"
                    locale={isHi ? "hi" : undefined}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor={fieldId(key, "tob")} className={labelClass}>{isHi ? "जन्म समय" : "Time of birth"}</label>
                  <input id={fieldId(key, "tob")} type="time" className={compactInputClass} value={form[key].tob} onChange={(e) => update(key, "tob", e.target.value)} />
                </div>
              </div>
              <div>
                <label htmlFor={fieldId(key, "pob")} className={labelClass}>{isHi ? "जन्म स्थान" : "Place of birth"}</label>
                <PlaceAutocompleteInput
                  id={fieldId(key, "pob")}
                  className={inputClass}
                  placeholder={isHi ? "जन्म स्थान लिखें और सूची से चुनें" : "Type and pick your birth place"}
                  value={form[key].pob}
                  onChange={(val) => editPob(key, val)}
                  onPlaceSelected={(p) => selectPlace(key, p)}
                />
              </div>
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6">
        {error && (
          <p role="alert" data-testid="love-form-error" className="mb-4 rounded-xl border border-[#C0392B]/40 bg-[#FDF0EE] px-4 py-3 text-[15px] leading-snug text-[#8A2A1F]">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          aria-busy={loading}
          className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#A8461F] px-6 text-[17px] font-bold text-[#FFFFFF] transition hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 disabled:opacity-60 md:mx-auto md:w-auto md:min-w-[320px]"
        >
          {loading ? (isHi ? "गणना जारी है..." : "Calculating...") : (isHi ? "फ्री में कुंडली मिलान करें" : "Check Kundli Match — Free")}
        </button>
        <p className="mt-2 text-center text-[13px] leading-5 text-[#5B667D]">
          {isHi ? "फ्री: 36 गुण स्कोर, कूट-वार विवरण और मंगल दोष जाँच।" : "Free: 36 Guna score, koota-wise breakdown and Mangal Dosh check."}
        </p>
      </div>
    </section>
  );
}
