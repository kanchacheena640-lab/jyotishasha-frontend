"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LOVE_APPROXIMATE_COPY, loveScorePrecision } from "@/lib/loveApproximate";
import { kundliMatchingHref } from "@/lib/kundliMatchingRoute";
import { DetailBody, DetailLoading, DetailNextSteps, detailCard, kootaLabel } from "../loveDetailUi";

export default function MatchmakingCompatibilityDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // 🛡️ Crash Guard
  const isHi = locale === "hi";

  useEffect(() => {
    setMounted(true); // Confirm browser load

    if (typeof window !== "undefined") {
      const s = sessionStorage.getItem("love_summary");
      if (!s) {
        router.replace(kundliMatchingHref(isHi));
        return;
      }

      try {
        const parsed = JSON.parse(s);
        // 🔥 Safety Check: API result usually has data.data
        const mainData = parsed?.data || parsed;
        setData(mainData);
      } catch (e) {
        router.replace(kundliMatchingHref(isHi));
      }
    }
  }, [router, locale]);

  // 🛑 Prevent Server-side Crash
  if (!mounted) return null;

  if (!data) {
    return <DetailLoading isHi={isHi} />;
  }

  // Data structure mapping from your JSON
  const verdict = data.verdict || {};
  const kootaNotes = data.sections?.find((s: any) => s.id === "koota_notes")?.data?.koota_notes || [];

  // Presentation only (editorial redesign). Like the result summary, an approximate (estimated-Moon) score
  // never shows a number: the same loveScorePrecision check, reading the stored request (read-only).
  let storedPayload: unknown = null;
  try {
    storedPayload = JSON.parse(sessionStorage.getItem("love_payload") || "null");
  } catch {
    storedPayload = null;
  }
  const approximate = loveScorePrecision(data, storedPayload) === "approximate";
  const approxCopy = LOVE_APPROXIMATE_COPY[isHi ? "hi" : "en"];

  return (
    <DetailBody>
      <section aria-labelledby="koota-score-heading" className={detailCard}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="koota-score-heading" className="text-[20px] font-bold leading-snug text-[#1B2A4A]">
              {isHi ? "कुल अष्टकूट स्कोर" : "Total Ashtakoot score"}
            </h2>
            {verdict.reason_line && <p className="mt-1 text-[16px] leading-7 text-[#45516A]">{verdict.reason_line}</p>}
          </div>
          <p className="flex-none text-[40px] font-bold leading-none text-[#1B2A4A]">
            {approximate ? "—" : verdict.score}
            <span className="text-[18px] font-semibold text-[#5B667D]">/{verdict.max_score || 36}</span>
          </p>
        </div>
        {approximate && (
          <div data-testid="koota-score-approximate" className="mt-4 rounded-xl border border-[#E6C28A] bg-[#FDF3E3] px-4 py-3">
            <p className="text-[14px] font-bold text-[#8A4B00]">⚠ {approxCopy.badge}</p>
            <p className="mt-1 text-[14px] leading-6 text-[#5C3A00]">{approxCopy.reason}</p>
          </div>
        )}
      </section>

      {kootaNotes.length > 0 && (
        <section aria-labelledby="koota-notes-heading">
          <h2 id="koota-notes-heading" className="mb-3 text-[20px] font-bold leading-snug text-[#1B2A4A]">
            {isHi ? "हर कूट आपके लिए क्या कहता है" : "What each koota says for you"}
          </h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {kootaNotes.map((k: any, i: number) => (
              <li key={k.key || i} className={detailCard}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[17px] font-bold text-[#1B2A4A]">{kootaLabel(String(k.key || ""), isHi)}</h3>
                  <span className="flex-none rounded-lg border border-[#E8DDC9] bg-[#F5EEDF] px-3 py-1 text-[15px] font-semibold text-[#1B2A4A]">
                    {approximate ? "—" : `${k.score} / ${k.max}`}
                  </span>
                </div>
                {k.note && <p className="mt-2 text-[15px] leading-7 text-[#45516A]">{k.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <DetailNextSteps isHi={isHi} reportHref={`${isHi ? "/hi" : ""}/love/report/relationship_future_report`} />
    </DetailBody>
  );
}
