"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HoroscopeEntry {
  career: string;
  love: string;
  health: string;
  tips: string;
}

export default function BilingualHoroscope({ lang }: { lang: "en" | "hi" }) {
  const pathname = usePathname();
  const [horoscope, setHoroscope] = useState<HoroscopeEntry | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Extract zodiac sign from URL → /horoscope/[sign]
  const parts = pathname.split("/");
  const sign = parts[parts.length - 1]?.toLowerCase();

  // 🔹 Detect type (daily/monthly)
  const type: "daily" | "monthly" =
    pathname.includes("monthly") ? "monthly" : "daily";

  useEffect(() => {
    async function loadHoroscope() {
      try {
        setLoading(true);

        // 1. Fetch EN from backend
        const apiBase =
          process.env.NEXT_PUBLIC_API_BASE ||
          "https://jyotishasha-backend.onrender.com";
        const res = await fetch(`${apiBase}/api/${type}-horoscope?sign=${sign}`);
        if (!res.ok) throw new Error("Backend error");
        const enData: HoroscopeEntry = await res.json();

        // 2. Load local bilingual pool
        const poolRes = await fetch(`/data/horoscopes/${type}_pool_bilingual.json`);
        const pool: any[] = await poolRes.json();

        // 3. Match English text from backend in pool
        const poolEn = pool.find(
          (p) =>
            p.id.endsWith("e") &&
            JSON.stringify(p[type + "_horoscope"]) === JSON.stringify(enData)
        );
        const poolHi = pool.find((p) => p.id === poolEn?.id.replace("e", "h"));

        setHoroscope(
          lang === "hi" && poolHi
            ? poolHi[type + "_horoscope"]
            : enData
        );
      } catch (err) {
        console.error("Error loading horoscope:", err);
        setHoroscope(null);
      } finally {
        setLoading(false);
      }
    }

    if (sign) loadHoroscope();
  }, [sign, type, lang]);

  if (loading) return <p>Loading {type} horoscope...</p>;
  if (!horoscope) return <p>No horoscope found for {sign}.</p>;

  return (
    <div className="p-4 bg-[#1e1b4b] text-white rounded-lg shadow-md text-left">
      <h2 className="text-xl font-bold mb-4 capitalize">
        {sign} – {type} Horoscope ({lang === "en" ? "English" : "हिन्दी"})
      </h2>
      <p><strong>Career:</strong> {horoscope.career}</p>
      <p><strong>Love:</strong> {horoscope.love}</p>
      <p><strong>Health:</strong> {horoscope.health}</p>
      <p><strong>Tips:</strong> {horoscope.tips}</p>
    </div>
  );
}
