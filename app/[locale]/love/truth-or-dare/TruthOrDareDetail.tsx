"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadLoveTools } from "@/lib/loveTools";
import { kundliMatchingHref } from "@/lib/kundliMatchingRoute";
import { DetailBody, DetailLoading, DetailNextSteps, DetailUnavailable, detailCard } from "../loveDetailUi";

export default function TruthOrDareDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isHi = locale === "hi";

  useEffect(() => {
    setMounted(true);
    let cancelled = false;
    let payload: any = null;
    try {
      payload = JSON.parse(sessionStorage.getItem("love_payload") || "null");
    } catch {
      payload = null;
    }
    if (!payload || !sessionStorage.getItem("love_summary")) {
      router.replace(kundliMatchingHref(isHi));
      return;
    }
    // Loaded after the main result (lib/loveTools.ts): reuses the load in flight, or loads it again after a reload.
    loadLoveTools(payload).then((state) => {
      if (cancelled) return;
      if (state.status === "ready" && state.truthOrDare) setData(state.truthOrDare);
      else setUnavailable(true);
    });
    return () => { cancelled = true; };
  }, [router, locale]);

  if (!mounted) return null;

  if (unavailable) {
    return (
      <DetailUnavailable
        isHi={isHi}
        message={isHi ? "यह हिस्सा अभी नहीं निकल सका। कृपया थोड़ी देर बाद फिर से देखें।" : "This part couldn't be calculated right now. Please try again in a little while."}
      />
    );
  }

  if (!data) {
    return <DetailLoading isHi={isHi} />;
  }

  // Verdict logic based on API (TRUTH or DARE)
  const isTruth = data.verdict === "TRUTH";

  // Presentation only (editorial redesign): the data logic above is unchanged.
  const verdictLabel = data.verdict === "TRUTH" ? (isHi ? "ट्रुथ" : "Truth") : data.verdict === "DARE" ? (isHi ? "डेयर" : "Dare") : data.verdict;
  const accent = isTruth ? "border-[#9CCBAE] bg-[#E8F3EC] text-[#1E6B3A]" : "border-[#E6C28A] bg-[#FDF3E3] text-[#8A4B00]";

  return (
    <DetailBody>
      <section aria-labelledby="truth-verdict-heading" className={detailCard}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="truth-verdict-heading" className="text-[20px] font-bold leading-snug text-[#1B2A4A]">
            {isHi ? "आपका परिणाम" : "Your verdict"}
          </h2>
          {verdictLabel && (
            <span data-testid="truth-verdict" className={`rounded-lg border px-3 py-1 text-[16px] font-bold ${accent}`}>{verdictLabel}</span>
          )}
        </div>
        {data.verdict_line && <p className="mt-3 text-[17px] leading-8 text-[#1B2A4A]">{data.verdict_line}</p>}
      </section>

      {Array.isArray(data.blocks) && data.blocks.length > 0 && (
        <ul className="space-y-3">
          {data.blocks.map((block: any, i: number) => (
            <li key={block.id || i} className={detailCard}>
              {block.title && <h3 className="text-[17px] font-bold text-[#1B2A4A]">{block.title}</h3>}
              {block.text && <p className="mt-1.5 text-[16px] leading-7 text-[#45516A]">{block.text}</p>}
            </li>
          ))}
        </ul>
      )}

      {data.disclaimers?.[0] && (
        <p className="text-[14px] leading-6 text-[#5B667D]">{data.disclaimers[0]}</p>
      )}

      <DetailNextSteps isHi={isHi} reportHref={`${isHi ? "/hi" : ""}/love/report/relationship_future_report`} />
    </DetailBody>
  );
}
