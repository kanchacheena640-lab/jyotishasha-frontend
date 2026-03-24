"use client";

import Link from "next/link";

interface Props {
  data: any;
  events: any;
  dict: any;
  lang: string;
}

export default function HomePanchang({ data, events, dict, lang }: Props) {
  if (!data || !dict) return null;

  // Backend se data nikal rahe hain
  const p = data.selected_date ?? data;

  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{dict.panchang?.heading || "Panchang"}</h2>
          <Link href={`/${lang}/panchang`} className="text-xs text-purple-400 hover:underline">
            {dict.panchang?.viewFull || "View Full"} →
          </Link>
        </div>

        {/* 🗓️ HINDU MONTH (Exact key used: month_name) */}
        {p.month_name && (
          <div className="mb-5">
            <span className="bg-orange-500/10 text-orange-400 text-xs px-3 py-1.5 rounded-full border border-orange-500/30 font-medium">
              🗓️ {p.month_name} Month
            </span>
          </div>
        )}

        {/* 4 GRID BOXES */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          
          {/* SUNRISE */}
          <div className="bg-[#020617] p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase">{dict.panchang?.sunrise || "Sunrise"}</p>
            <p className="text-sm text-yellow-500 font-semibold">{p.sunrise || '--:--'}</p>
          </div>
          
          {/* SUNSET */}
          <div className="bg-[#020617] p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase">{dict.panchang?.sunset || "Sunset"}</p>
            <p className="text-sm text-orange-500 font-semibold">{p.sunset || '--:--'}</p>
          </div>
          
          {/* TITHI (Object se Paksha aur Name nikal rahe hain) */}
          <div className="bg-[#020617] p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase">{dict.panchang?.tithi || "Tithi"}</p>
            <p className="text-xs md:text-sm text-white line-clamp-2" title={`${p.tithi?.paksha} ${p.tithi?.name}`}>
              {p.tithi?.paksha} {p.tithi?.name}
            </p>
          </div>
          
          {/* NAKSHATRA (Object se Name nikal rahe hain) */}
          <div className="bg-[#020617] p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase">{dict.panchang?.nakshatra || "Nakshatra"}</p>
            <p className="text-xs md:text-sm text-white line-clamp-2" title={p.nakshatra?.name}>
              {p.nakshatra?.name}
            </p>
          </div>

        </div>
      </div>

      {/* 🌸 UPCOMING EVENTS (Agar Parent Component se Events aa rahe hain toh) */}
      <div className="mt-auto border-t border-gray-800 pt-4">
        <p className="text-xs font-semibold text-indigo-300 mb-2">{dict.panchang?.upcomingEvents || "Upcoming Festivals"}</p>
        
        {events && events.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {events.slice(0, 3).map((ev: any, i: number) => (
              <span key={i} className="text-[10px] bg-purple-900/30 text-purple-300 px-2 py-1 rounded border border-purple-800">
                {lang === 'hi' ? (ev.name_hi || ev.name) : (ev.name_en || ev.name)} ({ev.date})
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-gray-500 italic">No upcoming events right now.</p>
        )}
      </div>
    </div>
  );
}