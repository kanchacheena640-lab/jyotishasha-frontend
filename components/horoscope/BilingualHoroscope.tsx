"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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

        // Filter only English blocks
        const enBlocks = pool.filter((p) => p.id.endsWith("e"));

        // Pick today's 12-block window (looping if needed)
        const today = new Date();
        const start = (today.getDate() - 1) % Math.floor(enBlocks.length / 12) * 12;
        const todaysBlocks = enBlocks.slice(start, start + 12);
        console.log("Todays Blocks:", todaysBlocks);


        // Sort according to zodiac order
        const sortedBlocks = zodiacOrder.map((sign) =>
          todaysBlocks.find((b) => b.sign && b.sign.toLowerCase() === sign)
        ).filter(Boolean) as PoolItem[];

        const finalData = sortedBlocks.map((block) => {
          const hindi = pool.find((p) => p.id === block.id.replace("e", "h"));
          return {
            sign: block.sign,
            en: block[`${type}_horoscope`]!,
            hi: hindi ? hindi[`${type}_horoscope`]! : null,
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
    <div className="bg-[#1e1b4b] text-white rounded-xl p-6 shadow-md transition-all duration-300 text-left space-y-6">
      {dataBlock.map(({ sign, en, hi }, idx) => {
        const h = lang === "hi" && hi ? hi : en;
        return (
          <div key={idx}>
            <h2 className="text-2xl font-bold capitalize mb-2">{sign}</h2>
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
