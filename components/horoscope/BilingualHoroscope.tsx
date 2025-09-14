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

export default function BilingualHoroscope() {
  const pathname = usePathname();
  const [horoscopeMap, setHoroscopeMap] = useState<HoroscopeMap>({});
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [loading, setLoading] = useState(true);

  // 🔹 Automatically detect type
  const type: "daily" | "monthly" =
    pathname.includes("monthly") ? "monthly" : "daily";

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Check LocalStorage cache
        const cacheKey = `${type}_horoscope_map`;
        const cacheRaw = localStorage.getItem(cacheKey);

        if (cacheRaw) {
          const cache = JSON.parse(cacheRaw);

          // Daily cache expiry check
          if (
            type === "daily" &&
            cache.date === new Date().toISOString().slice(0, 10)
          ) {
            setHoroscopeMap(cache.data);
            setLoading(false);
            return;
          }

          // Monthly cache expiry check
          if (
            type === "monthly" &&
            cache.month === new Date().toISOString().slice(0, 7)
          ) {
            setHoroscopeMap(cache.data);
            setLoading(false);
            return;
          }
        }

        // 2. Load bilingual pool
        const poolRes = await fetch(`/data/horoscopes/${type}_pool_bilingual.json`);
        const pool: any[] = await poolRes.json();

        // 3. Load fixed English from backend
        const fixedRes = await fetch(
          `https://jyotishasha-backend.onrender.com/${type}_fixed.json`
        );
        const fixedData: any[] = await fixedRes.json();

        // 4. Prepare mapping
        const map: HoroscopeMap = {};
        fixedData.forEach((item, index) => {
          const enText = item.daily_horoscope || item.monthly_horoscope;

          // find English twin in pool
          const poolEn = pool.find(
            (p) =>
              p.id.endsWith("e") &&
              JSON.stringify(p.daily_horoscope || p.monthly_horoscope) ===
                JSON.stringify(enText)
          );
          if (!poolEn) return;

          // find Hindi twin
          const poolHi = pool.find((p) => p.id === poolEn.id.replace("e", "h"));

          const sign = Object.keys(fixedData)[index] || `sign_${index + 1}`;
          map[sign] = {
            en: enText,
            hi: poolHi
              ? poolHi.daily_horoscope || poolHi.monthly_horoscope
              : enText,
          };
        });

        // 5. Save in LocalStorage with date/month
        const payload =
          type === "daily"
            ? { date: new Date().toISOString().slice(0, 10), data: map }
            : { month: new Date().toISOString().slice(0, 7), data: map };

        localStorage.setItem(cacheKey, JSON.stringify(payload));

        // 6. Update state
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
        {Object.keys(horoscopeMap).map((sign) => (
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
