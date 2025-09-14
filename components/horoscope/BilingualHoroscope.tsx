"use client";

import { useEffect, useState } from "react";

interface DailyHoroscopeEntry {
  career: string;
  love: string;
  health: string;
  tips: string;
}

interface MonthlyHoroscopeEntry {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  tip: string;
}

interface PoolItem {
  id: string;
  daily_horoscope?: DailyHoroscopeEntry;
  monthly_horoscope?: MonthlyHoroscopeEntry;
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
    { sign: string; en: any; hi: any }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/data/horoscopes/${type}_pool_bilingual.json`);
        const pool: PoolItem[] = await res.json();

        // ✅ Map id → zodiac directly (1e → aries, 2e → taurus …)
        const finalData = zodiacOrder.map((sign, idx) => {
          const num = (idx + 1).toString();
          const enBlock = pool.find((p) => p.id === num + "e");
          const hiBlock = pool.find((p) => p.id === num + "h");

          return {
            sign,
            en: enBlock ? enBlock[`${type}_horoscope`]! : null,
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
        if (!en) return null;
        const h = lang === "hi" && hi ? hi : en;

        return (
          <div key={idx}>
            <h2 className="text-2xl font-bold capitalize mb-2">
              {idx + 1}. {sign}
            </h2>

            {type === "daily" ? (
              <>
                <p><strong>Career:</strong> {h.career}</p>
                <p><strong>Love:</strong> {h.love}</p>
                <p><strong>Health:</strong> {h.health}</p>
                <p><strong>Tips:</strong> {h.tips}</p>
              </>
            ) : (
              <>
                <p>{h.paragraph1}</p>
                <p>{h.paragraph2}</p>
                <p>{h.paragraph3}</p>
                <p><strong>Tip:</strong> {h.tip}</p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
