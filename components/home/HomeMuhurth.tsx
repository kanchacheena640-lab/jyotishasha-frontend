"use client";

import Link from "next/link";

type Props = {
  data: any;
  dict: any;   // ✅ Added
  lang: string; // ✅ Added
};

function getStatus(item: any) {
  if (!item || item.score < 6) {
    return { color: "text-red-400", icon: "✖" };
  }
  return { color: "text-green-400", icon: "✔" };
}

export default function HomeMuhurth({ data, dict, lang }: Props) {
  if (!data || !dict) return null;

  // ✅ Items list ab dictionary se text uthayegi
  const items = [
    { name: dict.muhurth.items.naamkaran, icon: "👶", value: data.naamkaran, slug: "naamkaran-muhurat" },
    { name: dict.muhurth.items.marriage, icon: "💍", value: data.marriage, slug: "marriage-muhurat" },
    { name: dict.muhurth.items.grahPravesh, icon: "🏡", value: data.grah_pravesh, slug: "grah-pravesh-muhurat" },
    { name: dict.muhurth.items.vehicle, icon: "🚗", value: data.vehicle, slug: "vehicle-muhurat" },
    { name: dict.muhurth.items.gold, icon: "🪙", value: data.gold, slug: "gold-buying-muhurat" },
    { name: dict.muhurth.items.travel, icon: "✈️", value: data.travel, slug: "foreign-travel-muhurat" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] 
    rounded-2xl p-6 border border-purple-700 shadow-xl 
    flex flex-col justify-between min-h-[260px]">

      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          {dict.muhurth.heading}
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm auto-rows-fr">
        {items.map((item, i) => {
          const status = getStatus(item.value);
          return (
            <Link
              key={i}
              href={`/${lang}/panchang/muhurat/${item.slug}`}
              className="flex items-center justify-between h-full
              bg-[#1a1740] px-3 py-3 rounded-xl
              border border-purple-800
              hover:border-purple-500 hover:bg-[#211d55]
              transition"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-200 font-medium text-xs md:text-sm">
                  {item.name}
                </span>
              </div>
              <span className={`font-semibold text-sm ${status.color}`}>
                {status.icon}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-purple-800 text-center">
        <Link
          href={`/${lang}/panchang/muhurat`}
          className="text-purple-300 hover:text-white text-sm underline"
        >
          {dict.muhurth.viewAll} →
        </Link>
      </div>
    </div>
  );
}