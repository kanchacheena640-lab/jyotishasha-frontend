// Shared presentation for the four session-only result-detail pages (/love/matchmaking-compatibility,
// /love/mangal-dosh, /love/marriage-potential, /love/truth-or-dare): the ivory/navy editorial palette of the
// Kundli Matching landing and result summary. Presentation only -- no data loading, session storage,
// API calls or analytics live here. No hooks, so it works from server pages and client components alike.
import Link from "next/link";
import type { ReactNode } from "react";
import { kundliMatchingHref } from "@/lib/kundliMatchingRoute";

export const detailCard = "rounded-2xl border border-[#E8DDC9] bg-[#FFFFFF] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.06)] sm:p-6";
export const detailTextLink =
  "inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-sm";

/** Light-theme badge colours for the Mangal Dosh comparison (tone from lib/loveMangalSignal). */
export const MANGAL_TONE_LIGHT: Record<string, string> = {
  balanced: "bg-[#E8F3EC] text-[#1E6B3A] border-[#9CCBAE]",
  mismatch: "bg-[#FDF3E3] text-[#8A4B00] border-[#E6C28A]",
  unavailable: "bg-[#F5EEDF] text-[#45516A] border-[#E8DDC9]",
};

// Koota keys are the backend's fixed ordered_keys; names match the landing page's koota table.
const KOOTA_HI: Record<string, string> = {
  varna: "वर्ण", vashya: "वश्य", tara: "तारा", yoni: "योनि",
  graha_maitri: "ग्रह मैत्री", gana: "गण", bhakoot: "भकूट", nadi: "नाड़ी",
};
export const kootaLabel = (key: string, isHi: boolean) =>
  (isHi && KOOTA_HI[key]) || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Page frame (server pages): ivory main, back link to the result, one navy H1 and an optional subtitle. */
export function DetailPageFrame({ isHi, title, subtitle, children }: { isHi: boolean; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <main lang={isHi ? "hi" : undefined} className="min-h-screen bg-[#FBF8F2] text-[#45516A]">
      <div className="mx-auto max-w-3xl px-4 pt-6 md:px-6">
        <Link href={`${isHi ? "/hi" : ""}/love/result`} className={detailTextLink}>
          <span aria-hidden="true" className="mr-1">←</span>{isHi ? "मिलान परिणाम पर वापस" : "Back to your match result"}
        </Link>
        <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-[#1B2A4A] md:text-[36px] [text-wrap:balance]">{title}</h1>
        {subtitle && <p className="mt-2 text-[16px] leading-7 text-[#45516A]">{subtitle}</p>}
      </div>
      {children}
    </main>
  );
}

/** Body wrapper for a detail component's content. */
export function DetailBody({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-5 px-4 pb-16 pt-5 md:px-6">{children}</div>;
}

export function DetailLoading({ isHi, label }: { isHi: boolean; label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 bg-[#FBF8F2] px-4">
      <div role="status" aria-label={label || (isHi ? "लोड हो रहा है" : "Loading")} className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8DDC9] border-t-[#A8461F]"></div>
      {label && <p className="text-[15px] text-[#45516A]">{label}</p>}
    </div>
  );
}

/** Shown when a secondary result could not be calculated (message text comes from the page). */
export function DetailUnavailable({ isHi, message }: { isHi: boolean; message: string }) {
  return (
    <DetailBody>
      <div className={detailCard}>
        <p role="status" className="text-[16px] leading-7 text-[#45516A]">{message}</p>
        <Link
          href={`${isHi ? "/hi" : ""}/love/result`}
          className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#1B2A4A] px-5 text-[15px] font-bold text-[#FFFFFF] hover:bg-[#2A3D63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8461F] focus-visible:ring-offset-2"
        >
          {isHi ? "परिणाम पर वापस जाएँ" : "Back to result"}
        </Link>
      </div>
    </DetailBody>
  );
}

/** The single paid next step (existing ₹199 product page and checkout) plus the way back. */
export function DetailNextSteps({ isHi, reportHref }: { isHi: boolean; reportHref: string }) {
  return (
    <>
      <section aria-labelledby="love-detail-report-heading" className="rounded-2xl border-2 border-[#C9A227] bg-[#FFFFFF] p-5 sm:p-6">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-[#7A5A00]">{isHi ? "रिलेशनशिप फ्यूचर रिपोर्ट" : "Relationship Future Report"}</p>
        <h2 id="love-detail-report-heading" className="mt-1 text-[19px] font-bold leading-snug text-[#1B2A4A]">
          {isHi ? "दोनों कुंडलियों का पूरा विश्लेषण चाहते हैं?" : "Want the Full Two-Chart Reading?"}
        </h2>
        <p className="mt-2 text-[15px] leading-7 text-[#45516A]">
          {isHi
            ? "यह रिपोर्ट आप दोनों की कुंडलियाँ साथ पढ़ती है — अष्टकूट मिलान का हर कूट, दोनों कुंडलियों के पंचम और सप्तम भाव व शुक्र, और आपकी वर्तमान दशाएँ।"
            : "This report reads both of your charts together — every koota of your Ashtakoot match, both charts' 5th and 7th houses and Venus, and your current Dasha periods."}
        </p>
        <Link
          href={reportHref}
          className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#A8461F] px-5 text-[15px] font-bold text-[#FFFFFF] hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
        >
          {isHi ? "रिपोर्ट देखें" : "See the report"}
        </Link>
      </section>
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        <Link href={`${isHi ? "/hi" : ""}/love/result`} className={detailTextLink}>{isHi ? "मिलान परिणाम पर वापस" : "Back to your match result"}</Link>
        <Link href={kundliMatchingHref(isHi)} className={detailTextLink}>{isHi ? "दूसरा मिलान करें" : "Check another match"}</Link>
      </div>
    </>
  );
}
