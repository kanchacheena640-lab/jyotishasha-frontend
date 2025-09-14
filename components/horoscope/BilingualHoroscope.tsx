"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HoroscopeEntry {
  career: string;
  love: string;
  health: string;
  tips: string;
}

interface HoroscopeMap {
  [sign: string]: {
    en: HoroscopeEntry;
    hi: HoroscopeEntry;
  };
}

const signs = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

export default function BilingualHoroscope() {
  const pathname = usePathname();
  const [horoscopeMap, setHoroscopeMap] = useState<HoroscopeMap>({});
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [loading, setLoading] = useState(true);

  // 🔹 Detect type automatically
  const type: "daily" | "monthly" =
    pathname.includes("monthly") ? "monthly" : "daily";

  useEffect(() => {
    async function loadData() {
      try {
        const cacheKey = `${type}_horoscope_map`;
        const cacheRaw = localStorage.getItem(cacheKey);

        // ✅ Daily expiry check
        if (cacheRaw) {
          const cache = JSON.parse(cacheRaw);
          if (
            type === "daily" &&
            cache.date === new Date().toISOString().slice(0, 10)
          ) {
            setHoroscopeMap(cache.data);
            setLoading(false);
            return;
          }
          // ✅ Monthly expiry check
          if (
            type === "monthly" &&
            cache.month === new Date().toISOString().slice(0, 7)
          ) {
            setHoroscopeMap(cache.data);
            setLoading(false);
            return;
          }
        }

        // 1. Load bilingual pool
        const poolRes = await fetch(
          `/data/horoscopes/${type}_pool_bilingual.json`
        );
        const pool: any[] = await poolRes.json();

        // 2. Fetch all 12 signs in parallel
        const apiBase =
          process.env.NEXT_PUBLIC_API_BASE ||
          "https://jyotishasha-backend.onrender.com";

        const results: [string, HoroscopeEntry][] = await Promise.all(
          signs.map(async (sign) => {
            const res = await fetch(
              `${apiBase}/api/${type}-horoscope?sign=${sign}`
            );
            if (!res.ok) throw new Error(`Failed to fetch ${sign}`);
            const data: HoroscopeEntry = await res.json();
            return [sign, data];
          })
        );

        // 3. Prepare bilingual map
        const map: HoroscopeMap = {};
        results.forEach(([sign, enData]) => {
          // find English twin in pool
          const poolEn = pool.find(
            (p) =>
              p.id.endsWith("e") &&
              JSON.stringify(p.daily_horoscope || p.monthly_horoscope) ===
                JSON.stringify(enData)
          );

          const poolHi = poolEn
            ? pool.find((p) => p.id === poolEn.id.replace("e", "h"))
            : null;

          map[sign] = {
            en: enData,
            hi: poolHi
              ? (poolHi.daily_horoscope ||
                  poolHi.monthly_horoscope) as HoroscopeEntry
              : enData,
          };
        });

        // 4. Save in LocalStorage
        const payload =
          type === "daily"
            ? { date: new Date().toISOString().slice(0, 10), data: map }
            : { month: new Date().toISOString().slice(0, 7), data: map };

        localStorage.setItem(cacheKey, JSON.stringify(payload));

        setHoroscopeMap(map);
        setLoading(false);
      } catch (err) {
        console.error("Error loading horoscope:", err);
      }
    }

    loadData();
  }, [type]);

  if (loading) return <p>Loading {type} horoscope...</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize">{type} Horoscope</h2>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-3 py-1 bg-blue-500 text-white rounded-md"
        >
          {lang === "en" ? "Show Hindi" : "Show English"}
        </button>
      </div>

      <div className="space-y-4">
        {signs.map((sign) => (
          <div key={sign} className="border-b pb-2">
            <h3 className="font-semibold text-lg">{sign.toUpperCase()}</h3>
            <p>
              <strong>Career:</strong> {horoscopeMap[sign][lang].career}
            </p>
            <p>
              <strong>Love:</strong> {horoscopeMap[sign][lang].love}
            </p>
            <p>
              <strong>Health:</strong> {horoscopeMap[sign][lang].health}
            </p>
            <p>
              <strong>Tips:</strong> {horoscopeMap[sign][lang].tips}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
