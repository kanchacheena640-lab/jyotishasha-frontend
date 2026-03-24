import NextImage from "next/image";
import Link from "next/link";
import React from "react";

interface ZodiacProps {
  locale: string;
  isHi: boolean;
}

export const ZodiacVibeScroll = ({ locale, isHi }: ZodiacProps) => {
  const zodiacs = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  return (
    <section className="my-10 px-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🔮 Header Section */}
      <div className="mb-5 ml-1 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
            {isHi ? "आज का दिन कैसा होगा?" : "Check Your Today's Vibe"}
          </h2>
          <p className="text-[11px] text-gray-400 mt-1">
            {isHi ? "अपनी राशि चुनें और राशिफल जानें" : "Select your sign for daily insights"}
          </p>
        </div>
        <div className="text-[10px] font-bold text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded-full bg-purple-400/5 uppercase tracking-tighter animate-pulse">
           {isHi ? "लाइव" : "Live"}
        </div>
      </div>

      {/* ♈ Zodiac PNG Scroll Grid */}
      <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar scroll-smooth px-1">
        {zodiacs.map((s) => (
          <Link 
            key={s} 
            href={`/${locale}/daily-horoscope/${s}`} 
            className="group flex-shrink-0 flex flex-col items-center gap-2 active:scale-90 transition-all"
          >
            {/* Image Container */}
            <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl flex items-center justify-center shadow-xl group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">
              <div className="relative w-11 h-11 group-hover:scale-110 transition-transform duration-300">
                <NextImage 
                  src={`/zodiac/${s}.png`} 
                  alt={s} 
                  fill
                  className="object-contain"
                  sizes="44px"
                />
              </div>
            </div>
            
            {/* Label */}
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter group-hover:text-purple-300">
              {s.slice(0, 3)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};