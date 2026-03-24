"use client";

import Link from "next/link";

type Props = {
  dict: any;
  lang: string;
};

export default function HomeFreeKundaliCompact({ dict, lang }: Props) {
  if (!dict?.kundaliCompact) return null;

  const isHindi = lang === "hi";

  return (
    <Link
      href={`/${lang}/free-kundali`}
      className="block w-full bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-700 
                 text-white rounded-2xl shadow-lg hover:shadow-xl 
                 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
    >
      <div className="px-5 py-4 flex items-center gap-4 min-h-[68px]">
        
        {/* Left Content */}
        <div className="flex-1 min-w-0">   {/* ← Yeh line important hai */}
          <div className="flex items-center gap-2.5 mb-1">
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wider animate-pulse">
              {dict.kundaliCompact.freeBadge || "FREE KUNDALI"}
            </span>
            
            <span className="text-xs font-medium text-indigo-200">
              NASA GRADE
            </span>
          </div>

          

          <div className="text-[13px] text-indigo-200 mt-0.5 line-clamp-1">
            {dict.kundaliCompact.subtitle}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex-shrink-0">
          <span className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 
                         px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap 
                         transition-all active:bg-white active:text-purple-700">
            {dict.kundaliCompact.cta}
          </span>
        </div>
      </div>
    </Link>
  );
}