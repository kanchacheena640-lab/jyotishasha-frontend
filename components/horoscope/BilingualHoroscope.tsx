"use client";

import { useEffect, useState } from "react";

interface HoroscopeEntry {
  career: string;
  love: string;
  health: string;
  tips: string;
}

interface PoolItem {
  id: string;
  sign: string;
  daily_horoscope?: HoroscopeEntry;
  monthly_horoscope?: HoroscopeEntry;
}

const zodiacOrder = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

export default function BilingualHoroscope({
  lang,
  type,
}: {
  lang: "en" | "hi";
  type: "daily" | "monthly";
}) {
  const [dataBlock, setDataBlock] = useState<
    { sign: string; en: HoroscopeEntry; hi: HoroscopeEntry | null }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/data/horoscopes/${type}_pool_bilingual.json`);
        const pool: PoolItem[] = await res.json();

        // ✅ fix: group English + Hindi directly
        const finalData = zodiacOrder.map((sign) => {
          const enBlock = pool.find(
            (p) => p.sign?.toLowerCase() === sign && p.id.endsWith("e")
          );
          const hiBlock = pool.find(
            (p) => p.sign?.toLowerCase() === sign && p.id.endsWith("h")
          );

          return {
            sign,
            en: enBlock ? enBlock[`${type}_horoscope`]! : { career:"", love:"", health:"", tips:"" },
            hi: hiBlock ? hiBlock[`${type}_horoscope`]! : null,
          };
        });

        setDataBlock(finalData);
      } catch (err) {
        console.error("Error loading horoscope:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [type, lang]);

  if (loading) return <p className="text-white">Loading {type} horoscope...</p>;

  return (
    <div className="bg-[#1e1b4b] text-white rounded-xl p-6 shadow-md space-y-6">
      {dataBlock.map(({ sign, en, hi }, idx) => {
        const h = lang === "hi" && hi ? hi : en;
        return (
          <div key={idx}>
            <h2 className="text-2xl font-bold capitalize mb-2">
              {idx + 1}. {sign}
            </h2>
            <p><strong>Career:</strong> {h.career}</p>
            <p><strong>Love:</strong> {h.love}</p>
            <p><strong>Health:</strong> {h.health}</p>
            <p><strong>Tips:</strong> {h.tips}</p>
          </div>
        );
      })}
    </div>
  );
}
