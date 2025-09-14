"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HoroscopeEntry {
  career: string;
  love: string;
  health: string;
  tips: string;
}

interface PoolEntry {
  id: string;
  daily_horoscope?: HoroscopeEntry;
  monthly_horoscope?: HoroscopeEntry;
}

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export default function BilingualHoroscope({ lang }: { lang: "en" | "hi" }) {
  const pathname = usePathname();
  const [horoscopeMap, setHoroscopeMap] = useState<Record<string, HoroscopeEntry>>({});
  const [loading, setLoading] = useState(true);

  const type: "daily" | "monthly" = pathname.includes("monthly") ? "monthly" : "daily";

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Load pool
        const poolRes = await fetch(`/data/horoscopes/${type}_pool_bilingual.json`);
        const pool: PoolEntry[] = await poolRes.json();

        // Which block (day → daily, month → monthly)
        const today = new Date();
        const cycle = type === "daily" ? today.getDate() - 1 : today.getMonth();

        // Pick 12 EN ids for this cycle
        const startIndex = cycle * 12;
        const blockEn: PoolEntry[] = [];   // ✅ type added
        for (let i = 0; i < 12; i++) {
          const index = (startIndex + i * 2) % pool.length; // jump by 2 (because e+h pairs)
          const entry = pool[index];
          if (entry && entry.id.endsWith("e")) {
            blockEn.push(entry);
          }
        }

        // Map zodiac → entry (EN/HI based on lang)
        const map: Record<string, HoroscopeEntry> = {};
        zodiacSigns.forEach((sign, idx) => {
          const enEntry = blockEn[idx];
          if (!enEntry) return;

          const baseId = enEntry.id.replace("e", "");
          const targetId = `${baseId}${lang === "hi" ? "h" : "e"}`;
          const twin = pool.find((p) => p.id === targetId);

          if (twin) {
            map[sign] =
              type === "daily"
                ? (twin.daily_horoscope as HoroscopeEntry)
                : (twin.monthly_horoscope as HoroscopeEntry);
          }
        });

        setHoroscopeMap(map);
      } catch (err) {
        console.error("Error loading horoscope:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [lang, type]);

  if (loading) return <p>Loading {type} horoscope...</p>;

  return (
    <div className="p-6 bg-[#1e1b4b] text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {type} Horoscope ({lang === "en" ? "English" : "हिन्दी"})
      </h2>

      <div className="space-y-6">
        {zodiacSigns.map((sign) => {
          const entry = horoscopeMap[sign];
          if (!entry) return null;

          return (
            <div key={sign} className="border-b border-gray-600 pb-4">
              <h3 className="font-semibold text-lg mb-2">{sign}</h3>
              <p>
                <strong>Career:</strong> {entry.career}
              </p>
              <p>
                <strong>Love:</strong> {entry.love}
              </p>
              <p>
                <strong>Health:</strong> {entry.health}
              </p>
              <p>
                <strong>Tips:</strong> {entry.tips}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
