import Link from "next/link";
import React from "react";

interface PrimeDatesProps {
  dates: any[];
  isHi: boolean;
  monthName: string;
  getSummary: (score: number) => string;
}

export const PrimeDates = ({ dates, isHi, monthName, getSummary }: PrimeDatesProps) => {
  // Agar dates nahi hain toh kuch mat dikhao
  if (!dates || dates.length === 0) return null;

  // Sirf pehli 3 dates uthayenge ranking ke liye
  const topDates = dates.slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/10 overflow-hidden mb-8 shadow-2xl">
      {/* Header Label */}
      <div className="bg-purple-600/20 p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-[11px] font-black text-purple-200 uppercase tracking-[0.2em]">
          {isHi ? `⭐ मुख्य मुहूर्त: ${monthName}` : `⭐ PRIME DATES: ${monthName}`}
        </h2>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] text-gray-400 font-bold uppercase">Live</span>
        </div>
      </div>

      {/* Top 3 Dates List */}
      <div className="p-4 space-y-3">
        {topDates.map((d) => (
          <Link 
            key={d.date} 
            href="#all-dates" 
            className="group flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-purple-500/10 transition-all active:scale-95"
          >
            {/* Date Badge */}
            <div className="text-center bg-gradient-to-br from-purple-600 to-indigo-700 min-w-[60px] py-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <span className="block text-[10px] font-bold text-purple-100 uppercase">
                {d.weekday.slice(0, 3)}
              </span>
              <span className="block text-xl font-black text-white leading-none">
                {new Date(d.date).getDate()}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-gray-100 truncate">
                {d.nakshatra} • {d.tithi}
              </p>
              <p className="text-[11px] text-purple-300 italic truncate opacity-90">
                {getSummary(d.score)}
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="text-gray-500 group-hover:text-purple-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      <Link 
        href="#all-dates" 
        className="block w-full py-4 bg-white/5 text-center text-xs font-black text-purple-300 uppercase tracking-widest hover:bg-purple-600/10 transition-colors border-t border-white/10"
      >
        {isHi ? `बाकी ${dates.length - 3} तिथियां नीचे देखें ↓` : `View Remaining ${dates.length - 3} Dates ↓`}
      </Link>
    </section>
  );
};