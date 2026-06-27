"use client";

interface Props {
  data: any;
  language: string;
}

export default function KundaliChartSection({ data, language }: Props) {
  const isHi = language === "hi";

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 p-6 sm:p-10 rounded-3xl border border-indigo-200/40 shadow-2xl text-black">
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
  );
}
