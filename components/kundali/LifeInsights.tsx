"use client";
import { useState } from "react";

export default function LifeInsights({ data, isHi }: { data: any; isHi: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-300">
        {isHi ? "📜 जीवन के प्रमुख क्षेत्र" : "📜 Key Life Insights"}
      </h2>
      <div className="grid gap-4">
        {data.life_aspects?.map((item: any, i: number) => (
          <div key={i} className="bg-white/5 border border-indigo-400/20 rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between p-4 text-left hover:bg-white/10"
            >
              <span className="font-semibold text-indigo-100">🌟 {isHi ? item.aspect_hi : item.aspect}</span>
              <span>{openIndex === i ? "▲" : "▼"}</span>
            </button>
            {openIndex === i && (
              <div className="p-4 bg-indigo-900/30 text-sm space-y-2 border-t border-indigo-500/20">
                <p><strong>{isHi ? "सारांश:" : "Summary:"}</strong> {isHi ? item.summary_hi : item.summary}</p>
                <p className="text-yellow-300 italic">{isHi ? item.example_hi : item.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}