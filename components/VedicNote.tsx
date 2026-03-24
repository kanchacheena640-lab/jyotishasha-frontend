"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function VedicNote({ lang = "en" }: { lang?: "en" | "hi" }) {
  const isHi = lang === "hi";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full my-6 transition-all duration-300 ease-in-out">
      <div 
        className={`border rounded-2xl transition-all duration-500 overflow-hidden shadow-sm ${
          isOpen 
            ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md" 
            : "bg-blue-50/40 border-blue-100 hover:border-blue-300 cursor-pointer"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg bg-white shadow-sm transition-transform duration-300 ${isOpen ? 'rotate-12 scale-110' : ''}`}>
              <span className="text-lg">🌌</span>
            </div>

            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] text-blue-900/70">
              {isHi ? (
                <>यह <span className="text-blue-600">निरायण राशि चक्र</span> पर आधारित है।</>
              ) : (
                <>Based on <span className="text-blue-600">Sidereal Zodiac</span></>
              )}
            </p>
          </div>

          <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 group">
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              {isHi ? (isOpen ? "बंद करें" : "जानकारी पढ़ें") : (isOpen ? "Close" : "Read Disclaimer")}
            </span>
            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'animate-bounce-x'}`}>
              »
            </span>
          </button>
        </div>

        {/* Content */}
        {isOpen && (
          <div className="px-5 pb-5 pt-2 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="border-t border-blue-200/50 pt-4 space-y-4">
              
              <p className="text-xs leading-relaxed text-blue-900/80 font-medium italic">
                {isHi ? (
                  <>वैदिक ज्योतिष वास्तविक ग्रह-नक्षत्र स्थिति पर आधारित होता है। यह पश्चिमी (ट्रॉपिकल) प्रणाली से लगभग <strong>24 डिग्री</strong> अलग होता है।</>
                ) : (
                  <>Vedic Astrology (Jyotish) tracks actual star positions. This differs from Western (Tropical) systems by approx. <strong>24 degrees</strong>.</>
                )}
              </p>

              <div className="bg-white/80 p-4 rounded-xl border border-blue-200/50 shadow-inner">
                <p className="text-[11px] text-slate-500 mb-2 font-semibold">
                  {isHi ? (
                    <>*महत्वपूर्ण: परिणाम आपके <strong>लग्न (Ascendant)</strong> पर निर्भर करते हैं।</>
                  ) : (
                    <>*Important: Results depend on your <strong>Ascendant (Lagna)</strong> sign.</>
                  )}
                </p>

                <Link
                  href={`/${isHi ? "hi/" : ""}tools/lagna-finder`}
                  className="inline-flex items-center gap-2 text-[11px] font-black text-blue-700 hover:text-indigo-800 transition-colors uppercase tracking-wider"
                >
                  {isHi ? "✨ अपना लग्न जानें →" : "✨ Find My Ascendant Sign →"}
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  );
}