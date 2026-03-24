import Link from "next/link"; // ✅ Fix: Link hamesha next/link se aayega
import React from "react";

interface HeroProps {
  title: string;
  month: string;
  year: number;
  isHi: boolean;
  locale: string;
}

export const DynamicHero = ({ title, month, year, isHi, locale }: HeroProps) => {
  const cleanTitle = isHi ? title.split(" – ")[0] : title.split(" – ")[0];

  return (
    <header className="mb-8">
      {/* 🚀 SEO H1: Main Keyword targeting */}
      <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-purple-400 mb-4 leading-tight">
        {isHi ? `${cleanTitle} – ${month} ${year}` : `${cleanTitle} Dates: ${month} ${year}`}
      </h1>

      {/* 📝 LSI Intro: Keywords like 'Panchang', 'Shubh Dates' embedded */}
      <div className="bg-white/5 border-l-4 border-purple-500 p-4 rounded-r-2xl backdrop-blur-sm">
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {isHi ? (
            <>
              ज्योतिष और <strong>शुद्ध हिंदू पंचांग</strong> के अनुसार {month} {year} के सबसे सटीक 
              <span className="text-purple-300"> शुभ {cleanTitle} मुहूर्त </span> 
              यहाँ दिए गए हैं। हमने नक्षत्रों की स्थिति और ग्रहों के गोचर का बारीकी से विश्लेषण किया है 
              ताकि आप अपने विशेष कार्यों की शुरुआत सही समय पर कर सकें।
            </>
          ) : (
            <>
              Get the most accurate <strong>{cleanTitle} auspicious dates</strong> for {month} {year} based on 
              authentic <Link href={`/${locale}/panchang`} className="text-purple-300 underline underline-offset-4">Vedic Panchang</Link>. 
              Our experts have analyzed Nakshatra alignments and Tithis for your success.
            </>
          )}
        </p>
        
        {/* Freshness Tag for Google Bot */}
        <div className="mt-3 flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            {isHi ? `अंतिम अपडेट: 1 ${month} ${year}` : `Last Updated: 1st ${month} ${year}`}
          </span>
        </div>
      </div>
    </header>
  );
};