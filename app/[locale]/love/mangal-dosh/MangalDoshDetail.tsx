"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mangalSignalView } from "@/lib/loveMangalSignal";
import { kundliMatchingHref } from "@/lib/kundliMatchingRoute";
import { DetailBody, DetailLoading, DetailNextSteps, MANGAL_TONE_LIGHT, detailCard } from "../loveDetailUi";

export default function MangalDoshDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false); // 🛡️ Server crash se bachane ke liye
  const isHi = locale === "hi";

  useEffect(() => {
    setMounted(true); // Pehle confirm karo ki hum browser par hain

    const s = sessionStorage.getItem("love_summary");
    if (!s) {
      router.replace(kundliMatchingHref(isHi));
      return;
    }

    try {
      const parsed = JSON.parse(s);
      // 🔥 Safety Check: API response agar data.data.mangal_dosh mein hai
      const mangalData = parsed?.data?.mangal_dosh || parsed?.mangal_dosh;
      setData(mangalData || null);
      setLoaded(true);
    } catch (e) {
      router.replace(kundliMatchingHref(isHi));
    }
  }, [router, locale]);

  // 🛑 Server-side par render nahi hone dega (No Mismatch Crash)
  if (!mounted) return null;

  if (!loaded) {
    return <DetailLoading isHi={isHi} label={isHi ? "मंगल दोष विश्लेषण लोड हो रहा है…" : "Loading the Mangal Dosh comparison…"} />;
  }

  // GREEN / RED / missing -> plain wording (never the raw codes, never an endless spinner).
  const view = mangalSignalView(data, isHi);
  const showCharts = view.tone !== "unavailable" && data;

  // Presentation only (editorial redesign): the data logic above is unchanged.
  const people = [
    { key: "boy", title: isHi ? "वर (लड़का) की कुंडली" : "Groom's chart", d: data?.boy },
    { key: "girl", title: isHi ? "वधू (लड़की) की कुंडली" : "Bride's chart", d: data?.girl },
  ];

  return (
    <DetailBody>
      <section aria-labelledby="mangal-compare-heading" className={detailCard}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="mangal-compare-heading" className="text-[20px] font-bold leading-snug text-[#1B2A4A]">
            {isHi ? "दोनों कुंडलियों की तुलना" : "Comparison of both charts"}
          </h2>
          <span data-testid="mangal-signal" className={`rounded-lg border px-3 py-1 text-[15px] font-semibold ${MANGAL_TONE_LIGHT[view.tone] ?? MANGAL_TONE_LIGHT.unavailable}`}>
            {view.label}
          </span>
        </div>
        {view.explanation ? (
          <p className="mt-3 text-[16px] leading-7 text-[#45516A]">{view.explanation}</p>
        ) : (
          typeof data?.summary === "string" && data.summary && (
            <p className="mt-3 text-[16px] leading-7 text-[#45516A]">{data.summary}</p>
          )
        )}
      </section>

      {showCharts && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {people.map(({ key, title, d }) => (
            <section key={key} aria-labelledby={`mangal-${key}-heading`} className={detailCard}>
              <h2 id={`mangal-${key}-heading`} className="text-[18px] font-bold leading-snug text-[#1B2A4A]">{title}</h2>
              {d?.status?.is_mangalic && (
                <p className="mt-2 border-l-4 border-[#C9A227] pl-3 text-[16px] font-semibold leading-7 text-[#1B2A4A]">{d.status.is_mangalic}</p>
              )}
              {Array.isArray(d?.summary_block?.points) && d.summary_block.points.length > 0 && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-[#45516A] marker:text-[#A8461F]">
                  {d.summary_block.points.map((p: string, i: number) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}

      <DetailNextSteps isHi={isHi} reportHref={`${isHi ? "/hi" : ""}/love/report/relationship_future_report`} />
    </DetailBody>
  );
}
