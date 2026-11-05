"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LOVE_APPROXIMATE_COPY, loveScorePrecision } from "@/lib/loveApproximate";
import { mangalSignalView } from "@/lib/loveMangalSignal";
import { loadLoveTools, type LoveToolsState } from "@/lib/loveTools";

export default function LoveResultSummaryDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const isHi = locale === "hi";

  const [summary, setSummary] = useState<any>(null);
  // Truth-or-Dare + Marriage potential load after the main result (lib/loveTools.ts).
  const [tools, setTools] = useState<LoveToolsState>({ status: "pending" });
  const [payload, setPayload] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let cancelled = false;
    const s = sessionStorage.getItem("love_summary");

    if (!s) {
      router.replace(`${isHi ? "/hi" : ""}/love`);
      return;
    }

    try {
      const parsedSummary = JSON.parse(s);

      // 🔥 POSTMAN FIX: Tumhare JSON mein asli data 'data' key ke andar hai
      // Isliye hum summary.data ko set kar rahe hain
      setSummary(parsedSummary.data || parsedSummary);
      // The submitted birth details -- flag an approximate score if the backend gives no flag, and key the
      // secondary results to this match.
      let storedPayload: any = null;
      try {
        storedPayload = JSON.parse(sessionStorage.getItem("love_payload") || "null");
      } catch {
        storedPayload = null;
      }
      setPayload(storedPayload);
      if (storedPayload) {
        loadLoveTools(storedPayload).then((state) => { if (!cancelled) setTools(state); });
      } else {
        setTools({ status: "failed" });
      }
    } catch (e) {
      router.replace(`${isHi ? "/hi" : ""}/love`);
    }
    return () => { cancelled = true; };
  }, [router, locale]);

  // 🛡️ Blank Screen Guard
  if (!mounted || !summary) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FBF8F2]">
        <div role="status" aria-label={isHi ? "लोड हो रहा है" : "Loading"} className="w-10 h-10 border-4 border-[#E8DDC9] border-t-[#A8461F] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Data Extraction with Safety (Matches your Postman structure)
  const ashtakoot = summary.ashtakoot || {};
  // Partner's birth time/place missing -> the score is an estimate; say so beside the score.
  const precision = loveScorePrecision(summary, payload);
  const approxCopy = LOVE_APPROXIMATE_COPY[isHi ? "hi" : "en"];
  const mangalView = mangalSignalView(summary.mangal_dosh, isHi);

  // Tools safety (Marriage & Truth/Dare) -- shown as loading / unavailable until (or unless) they arrive.
  const marriage = tools.status === "ready" ? tools.marriagePotential : null;
  const truthDare = tools.status === "ready" ? tools.truthOrDare : null;
  const toolLabel = (ready: boolean, value: string) =>
    ready ? value : tools.status === "pending" ? (isHi ? "लोड हो रहा है…" : "Loading…") : "—";

  // Presentation only (Phase 1 redesign): ivory palette, the koota-wise table inline, real links instead
  // of clickable divs, and a single Relationship Future Report card. The data logic above is unchanged.
  const lp = isHi ? "/hi" : "";
  type KootaNote = { key: string; score: number; max: number; note?: string };
  type Section = { id?: string; data?: { koota_notes?: KootaNote[] } };
  const kootaNotes: KootaNote[] =
    (summary.sections as Section[] | undefined)?.find((s) => s.id === "koota_notes")?.data?.koota_notes || [];
  const reasonLine: string | undefined = summary.verdict?.reason_line;
  // Koota keys come from the backend's fixed ordered_keys; names match the landing page's koota table.
  const KOOTA_HI: Record<string, string> = {
    varna: "वर्ण", vashya: "वश्य", tara: "तारा", yoni: "योनि",
    graha_maitri: "ग्रह मैत्री", gana: "गण", bhakoot: "भकूट", nadi: "नाड़ी",
  };
  const kootaName = (key: string) =>
    (isHi && KOOTA_HI[key]) || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  // Light-theme badge colours for the ivory page (the shared MANGAL_TONE_CLASS stays for the dark detail page).
  const MANGAL_TONE_LIGHT: Record<string, string> = {
    balanced: "bg-[#E8F3EC] text-[#1E6B3A] border-[#9CCBAE]",
    mismatch: "bg-[#FDF3E3] text-[#8A4B00] border-[#E6C28A]",
    unavailable: "bg-[#F5EEDF] text-[#45516A] border-[#E8DDC9]",
  };
  const card = "rounded-2xl border border-[#E8DDC9] bg-[#FFFFFF] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.06)] sm:p-6";
  const rowLink = "flex min-h-[56px] items-center justify-between gap-4 rounded-2xl border border-[#E8DDC9] bg-[#FFFFFF] px-5 py-4 hover:border-[#A8461F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]";
  const textLink = "inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-sm";

  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#45516A]">
      <div className="mx-auto max-w-3xl space-y-5 px-4 pb-16 pt-2 md:px-6">
        <p className="text-center text-[15px] text-[#5B667D]">
          {isHi ? "आपके वैदिक अष्टकूट मिलान का सारांश" : "Summary of your Vedic Ashtakoot match"}
        </p>

        {/* 1. Ashtakoot score + koota-wise breakdown */}
        <section aria-labelledby="love-score-heading" className={card}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="love-score-heading" className="text-[20px] font-bold leading-snug text-[#1B2A4A]">
                {isHi ? "अष्टकूट गुण मिलान" : "Ashtakoot Guna Milan"}
              </h2>
              {reasonLine && <p className="mt-1 text-[15px] leading-6 text-[#45516A]">{reasonLine}</p>}
            </div>
            {/* An approximate (estimated-Moon) result never shows a number. */}
            <p className="flex-none text-[40px] font-bold leading-none text-[#1B2A4A]">
              {precision === "approximate" ? "—" : (ashtakoot.total_score || 0)}
              <span className="text-[18px] font-semibold text-[#5B667D]">/36</span>
            </p>
          </div>
          {precision === "approximate" && (
            <div data-testid="love-score-approximate" className="mt-4 rounded-xl border border-[#E6C28A] bg-[#FDF3E3] px-4 py-3">
              <p className="text-[14px] font-bold text-[#8A4B00]">⚠ {approxCopy.badge}</p>
              <p className="mt-1 text-[14px] leading-6 text-[#5C3A00]">{approxCopy.reason}</p>
            </div>
          )}
          {kootaNotes.length > 0 && (
            <div className="mt-5 overflow-hidden rounded-xl border border-[#E8DDC9]">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">{isHi ? "कूट-वार अंक" : "Koota-wise points"}</caption>
                <thead className="bg-[#F5EEDF] text-[14px] text-[#1B2A4A]">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-semibold">{isHi ? "कूट" : "Koota"}</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">{isHi ? "अंक" : "Points"}</th>
                  </tr>
                </thead>
                <tbody>
                  {kootaNotes.map((k) => (
                    <tr key={k.key} className="border-t border-[#EFE7D8]">
                      <th scope="row" className="px-4 py-2.5 text-[15px] font-semibold text-[#1B2A4A]">{kootaName(k.key)}</th>
                      <td className="px-4 py-2.5 text-right text-[15px] font-semibold text-[#1B2A4A]">
                        {precision === "approximate" ? "—" : `${k.score} / ${k.max}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Link href={`${lp}/love/matchmaking-compatibility`} className={`mt-3 ${textLink}`}>
            {isHi ? "हर कूट का अर्थ देखें" : "See what each koota means for you"} <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </section>

        {/* 2. Mangal Dosh Tile */}
        <Link href={`${lp}/love/mangal-dosh`} className={rowLink}>
          <span>
            <span className="block text-[17px] font-bold text-[#1B2A4A]">{isHi ? "मंगल दोष" : "Mangal Dosh"}</span>
            <span className="block text-[14px] text-[#45516A]">{isHi ? "दोनों कुंडलियों की तुलना" : "Compared across both charts"}</span>
          </span>
          <span className={`flex-none rounded-lg border px-3 py-1 text-[14px] font-semibold ${MANGAL_TONE_LIGHT[mangalView.tone] ?? MANGAL_TONE_LIGHT.unavailable}`}>
            {mangalView.label}
          </span>
        </Link>

        {/* 3. Truth or Dare Tile */}
        <Link href={`${lp}/love/truth-or-dare`} className={rowLink}>
          <span>
            <span className="block text-[17px] font-bold text-[#1B2A4A]">{isHi ? "रिलेशनशिप रियलिटी चेक" : "Relationship reality check"}</span>
            <span className="block text-[14px] text-[#45516A]">{isHi ? "ट्रुथ या डेयर" : "Truth or Dare"}</span>
          </span>
          <span data-testid="love-tile-truth" className="flex-none text-[15px] font-semibold text-[#1B2A4A]">
            {toolLabel(!!truthDare?.verdict, truthDare?.verdict)}
          </span>
        </Link>

        {/* 4. Marriage Potential Tile */}
        <Link href={`${lp}/love/marriage-potential`} className={rowLink}>
          <span>
            <span className="block text-[17px] font-bold text-[#1B2A4A]">{isHi ? "विवाह की प्रवृत्ति" : "Marriage tendency"}</span>
            <span className="block text-[14px] text-[#45516A]">{isHi ? "संकेतात्मक स्कोर" : "Indicative score"}</span>
          </span>
          <span data-testid="love-tile-marriage" className="flex-none text-[18px] font-bold text-[#1B2A4A]">
            {toolLabel(typeof marriage?.user_result?.pct === "number", `${marriage?.user_result?.pct}%`)}
          </span>
        </Link>

        {/* Single paid next step (existing ₹199 product page and checkout). */}
        <section aria-labelledby="love-report-heading" className="rounded-2xl border-2 border-[#C9A227] bg-[#FFFFFF] p-5 sm:p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-[#7A5A00]">{isHi ? "रिलेशनशिप फ्यूचर रिपोर्ट" : "Relationship Future Report"}</p>
          <h2 id="love-report-heading" className="mt-1 text-[19px] font-bold leading-snug text-[#1B2A4A]">
            {isHi ? "दोनों कुंडलियों का पूरा विश्लेषण चाहते हैं?" : "Want the Full Two-Chart Reading?"}
          </h2>
          <p className="mt-2 text-[15px] leading-7 text-[#45516A]">
            {isHi
              ? "यह रिपोर्ट आप दोनों की कुंडलियाँ साथ पढ़ती है — अष्टकूट मिलान का हर कूट, दोनों कुंडलियों के पंचम और सप्तम भाव व शुक्र, और आपकी वर्तमान दशाएँ।"
              : "This report reads both of your charts together — every koota of your Ashtakoot match, both charts' 5th and 7th houses and Venus, and your current Dasha periods."}
          </p>
          <Link
            href={`${lp}/love/report/relationship_future_report`}
            className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#A8461F] px-5 text-[15px] font-bold text-[#FFFFFF] hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
          >
            {isHi ? "रिपोर्ट देखें" : "See the report"}
          </Link>
        </section>

        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <Link href={`${lp}/love`} className={textLink}>{isHi ? "दूसरा मिलान करें" : "Check another match"}</Link>
          <Link href={`${lp}/marriage-astrology/compatibility`} className={textLink}>{isHi ? "विवाह अनुकूलता मार्गदर्शिका" : "Marriage compatibility guide"}</Link>
        </div>
      </div>
    </div>
  );
}
