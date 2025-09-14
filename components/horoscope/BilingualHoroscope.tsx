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

// 🔹 Rotation function → picks 12 entries for given day/month
function getRotationSet(pool: PoolEntry[], blockSize: number, cycle: number) {
  const startIndex = cycle * 12;
  const set: PoolEntry[] = [];

  for (let i = 0; i < 12; i++) {
    const index = (startIndex + i) % pool.length;
    set.push(pool[index]);
  }

  return set;
}

export default function BilingualHoroscope({ lang }: { lang: "en" | "hi" }) {
  const pathname = usePathname();
  const [horoscopeSet, setHoroscopeSet] = useState<HoroscopeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Detect daily/monthly
  const type: "daily" | "monthly" = pathname.includes("monthly")
    ? "monthly"
    : "daily";

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Load bilingual pool
        const poolRes = await fetch(`/data/horoscopes/${type}_pool_bilingual.json`);
        const pool: PoolEntry[] = await poolRes.json();

        // Pick cycle (day → daily, month → monthly)
        const today = new Date();
        const cycle =
          type === "daily"
            ? today.getDate() - 1 // 0..30
            : today.getMonth(); // 0..11

        // Get 12 entries (EN or HI)
        const block = getRotationSet(pool, 12, cycle);

        const finalSet: HoroscopeEntry[] = [];
        for (let i = 0; i < block.length; i++) {
          const baseId = block[i].id.replace(/[eh]$/, ""); // "1e" -> "1"
          const targetId = `${baseId}${lang === "hi" ? "h" : "e"}`;
          const twin = pool.find((p) => p.id === targetId);
          if (twin) {
            finalSet.push(
              type === "daily"
                ? (twin.daily_horoscope as HoroscopeEntry)
                : (twin.monthly_horoscope as HoroscopeEntry)
            );
          }
        }

        setHoroscopeSet(finalSet);
      } catch (err) {
        console.error("Error loading pool:", err);
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
        {zodiacSigns.map((sign, idx) => {
          const entry = horoscopeSet[idx];
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
