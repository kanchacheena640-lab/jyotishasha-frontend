"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

// ✅ Lazy import for Chart (Client-side only)
const KundaliChartNorth = dynamic(() => import("@/components/KundaliChartNorth"), {
  ssr: false,
});

interface Props {
  data: any;
  lagnaRashi: number;
  language: string;
}

export default function KundaliChartSection({ data, lagnaRashi, language }: Props) {
  const isHi = language === "hi";

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-10 w-full">
      
      {/* 🪐 Kundali Chart Wrapper (Fixed Spacing & Alignment) */}
      <div className="relative flex items-center justify-center w-full max-w-4xl overflow-hidden rounded-3xl py-6 sm:py-10 px-2 sm:px-6">
        
        {/* ✅ Circular glow strictly centered behind chart */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70%] sm:w-[50%] aspect-square bg-gradient-to-br from-pink-500/20 via-indigo-500/25 to-purple-600/20 blur-[80px] sm:blur-[120px] rounded-full opacity-40"></div>
        </div>

        {/* ✅ Chart Container: Ab ye responsive hai aur hamesha center rahega */}
        <div className="relative z-10 bg-white/5 p-3 sm:p-5 rounded-3xl border border-indigo-300/30 shadow-[0_0_40px_rgba(139,92,246,0.3)] backdrop-blur-md flex items-center justify-center w-full max-w-[360px] aspect-square mx-auto transform transition-all hover:scale-[1.02]">
          {data.chart_data?.planets ? (
            <KundaliChartNorth
              planets={data.chart_data.planets}
              lagnaRashi={lagnaRashi}
              // 🪄 Magic: Size dynamic hai, screen width ke hisaab se adapt karega
              size={typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.8, 320) : 300}
            />
          ) : data.chart_image ? (
            <Image
              src={data.chart_image}
              alt="Kundali Chart"
              width={320}
              height={320}
              className="rounded-2xl border border-indigo-400/30 shadow-2xl"
            />
          ) : (
            <p className="text-indigo-200">{isHi ? "चाँद उपलब्ध नहीं है" : "Chart unavailable"}</p>
          )}
        </div>
      </div>

      {/* 📜 Birthchart Snippet: Spacing enhanced for better readability */}
      <div className="w-full max-w-4xl bg-white/95 p-6 sm:p-10 rounded-3xl border border-indigo-200/40 shadow-2xl text-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6 text-center drop-shadow-sm">
          {isHi ? "🪐 कुंडली विश्लेषण (Snippet)" : "🪐 Birthchart Snippet"}
        </h2>

        <p className="leading-relaxed text-base sm:text-[17px] whitespace-pre-line text-justify text-gray-900 px-1 sm:px-3 mb-6">
          {data?.lagna_trait ? (
            <>{data.lagna_trait}</>
          ) : isHi ? (
            <>{data?.planet_overview?.find((p: any) => p.planet === "Ascendant (Lagna)")?.text_hi || 
               "आपका लग्न शुभ स्थान पर स्थित है, जो आपके व्यक्तित्व में संतुलन और आकर्षण लाता है।"}</>
          ) : (
            <>{data?.planet_overview?.find((p: any) => p.planet === "Ascendant (Lagna)")?.text_en || 
               "Your Ascendant defines your personality, confidence, and how you interact with the world."}</>
          )}
        </p>

        {/* Closing Line */}
        <div className="pt-4 border-t border-indigo-100 text-[15px] text-indigo-700 font-medium text-center italic">
          {isHi
            ? "⭐ यह कुंडली आपके जीवन की दिशा को समझने की पहली झलक देती है।"
            : "⭐ This is the first glimpse of your life's cosmic blueprint."}
        </div>
      </div>
    </div>
  );
}