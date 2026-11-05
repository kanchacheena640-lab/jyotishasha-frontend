"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadLoveTools } from "@/lib/loveTools";
import { kundliMatchingHref } from "@/lib/kundliMatchingRoute";
import { DetailBody, DetailLoading, DetailNextSteps, DetailUnavailable, detailCard } from "../loveDetailUi";

export default function MarriagePotentialDetail({ locale }: { locale: string }) {
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
      if (state.status === "ready" && state.marriagePotential) setData(state.marriagePotential);
      else setUnavailable(true);
    });
    return () => { cancelled = true; };
  }, [locale, router]);

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

  // Presentation only (editorial redesign): the data logic above is unchanged.
  const people = [
    { key: "user", r: data.user_result, fallback: isHi ? "यूज़र" : "User" },
    { key: "partner", r: data.partner_result, fallback: isHi ? "पार्टनर" : "Partner" },
  ];

  return (
    <DetailBody>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {people.map(({ key, r, fallback }) => (
          <section key={key} aria-labelledby={`tendency-${key}-heading`} className={detailCard}>
            <h2 id={`tendency-${key}-heading`} className="text-[18px] font-bold leading-snug text-[#1B2A4A]">{r?.name || fallback}</h2>
            <p className="mt-2 text-[40px] font-bold leading-none text-[#1B2A4A]">
              {r?.pct ?? 0}<span className="text-[20px] font-semibold text-[#5B667D]">%</span>
            </p>
            {r?.band && (
              <p className="mt-2 inline-flex rounded-lg border border-[#E8DDC9] bg-[#F5EEDF] px-3 py-1 text-[14px] font-semibold text-[#1B2A4A]">
                {isHi ? "स्तर" : "Band"}: {r.band}
              </p>
            )}
            {Array.isArray(r?.reasons) && r.reasons.length > 0 && (
              <ul className="mt-4 list-disc space-y-1.5 border-t border-[#EFE7D8] pl-5 pt-4 text-[15px] leading-7 text-[#45516A] marker:text-[#A8461F]">
                {r.reasons.map((reason: string, i: number) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {data.overall_line && (
        <section className={detailCard}>
          <p className="text-[17px] leading-8 text-[#1B2A4A]">{data.overall_line}</p>
        </section>
      )}

      <DetailNextSteps isHi={isHi} reportHref={`${isHi ? "/hi" : ""}/love/report/relationship_future_report`} />
    </DetailBody>
  );
}
