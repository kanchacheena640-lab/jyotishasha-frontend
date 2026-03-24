"use client";

import React, { useState } from "react";

interface ExpandableDatesProps {
  dates: any[];
  isHi: boolean;
  monthName: string;
  year: number;
}

export const ExpandableDates = ({ dates, isHi, monthName, year }: ExpandableDatesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ Client-side par hi summary logic handle kar rahe hain (Error Fix)
  const getSummaryInternal = (score: number) => {
    const s = Math.round(score);
    if (isHi) {
        if (s >= 7) return "✨ यह अत्यंत श्रेष्ठ मुहूर्त है—बड़े कार्यों के लिए उत्तम।";
        if (s >= 5) return "⭐ यह एक अनुकूल दिन है जो सकारात्मक परिणाम देता है।";
        return "⚖️ सामान्य शुभ ऊर्जा वाला दिन, नियमित कार्यों के लिए उपयुक्त।";
    }
    if (s >= 7) return "✨ Exceptionally auspicious — blessed with strong harmony.";
    if (s >= 5) return "⭐ Highly favorable alignment that encourages success.";
    return "⚖️ Neutral planetary influence — proceed with steady focus.";
  };

  if (!dates || dates.length === 0) return null;

  const initialLimit = 6;
  const hasMore = dates.length > initialLimit;

  return (
    <section id="all-dates" className="scroll-mt-20 mb-10">
      <div className="bg-white/10 rounded-3xl border border-purple-400/20 overflow-hidden shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-bold text-purple-200 mb-6 flex items-center gap-2">
            📅 {isHi ? `${monthName} की सभी शुभ तिथियां` : `All Auspicious Dates: ${monthName}`}
          </h2>

          <div className="space-y-0">
            {dates.map((d, index) => {
              const isHidden = !isExpanded && index >= initialLimit;
              const formattedDate = new Date(d.date).toLocaleDateString(isHi ? "hi-IN" : "en-GB");

              return (
                <div 
                  key={d.date} 
                  className={`border-b border-white/5 last:border-0 transition-all duration-500 overflow-hidden ${
                    isHidden ? "max-h-0 opacity-0 py-0" : "max-h-60 opacity-100 py-5"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="text-gray-200 text-sm font-bold">
                        {formattedDate} <span className="text-purple-400 font-medium ml-1">({d.weekday})</span>
                      </p>
                      <p className="text-gray-400 text-[11px] tracking-wide uppercase">
                        {d.nakshatra || "—"} <span className="mx-1 text-white/20">|</span> {d.tithi || "—"}
                      </p>
                    </div>
                    <div className="bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">
                       <span className="text-[10px] font-bold text-purple-300">Score: {Math.round(d.score)}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-[12px] mt-2 italic leading-relaxed opacity-90">
                    {getSummaryInternal(d.score)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {hasMore && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-4 bg-purple-600/20 text-center text-xs font-black text-purple-300 uppercase tracking-widest border-t border-white/10 hover:bg-purple-600/30 transition-all"
          >
            {isExpanded ? (isHi ? "कम दिखाएं ↑" : "Show Less ↑") : (isHi ? `बाकी ${dates.length - initialLimit} तिथियां देखें ↓` : `View More Dates ↓`)}
          </button>
        )}
      </div>
    </section>
  );
};