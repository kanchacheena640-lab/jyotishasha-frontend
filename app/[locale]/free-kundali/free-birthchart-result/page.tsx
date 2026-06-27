"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import Script from "next/script";

// ✅ Modular Components (Jo humne abhi banaye)
import KundaliProfileHeader from "@/components/kundali/KundaliProfileHeader";
import KundaliChartPanel from "@/components/kundali/KundaliChartPanel";
import KundaliQuickInfoGrid from "@/components/kundali/KundaliQuickInfoGrid";
import KundaliChartSection from "@/components/kundali/KundaliChartSection";
import PlanetDataTable from "@/components/kundali/PlanetDataTable";
import DashaSection from "@/components/kundali/DashaSection";
import LifeInsights from "@/components/kundali/LifeInsights";
import JanmaNakshatraCard from "@/components/kundali/JanmaNakshatraCard";

export default function FreeBirthChartResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b1120] text-white">
          <Image src="/loader-astro.gif" alt="Loading" width={120} height={120} />
          <p className="mt-4 text-indigo-300 animate-pulse">Preparing your Kundali...</p>
        </div>
      }
    >
      <KundaliPageContent />
    </Suspense>
  );
}

function KundaliPageContent() {
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const isHi = locale === "hi";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 📝 URL Params Extraction
  const name = searchParams.get("name") || "";
  const dob = searchParams.get("dob") || "";
  const tob = searchParams.get("tob") || "";
  const place = searchParams.get("place") || "";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const language = searchParams.get("language") || (isHi ? "hi" : "en");

  useEffect(() => {
    async function fetchKundali() {
      try {
        setLoading(true);
        const payload = {
          name, dob, tob, 
          place_name: place,
          lat: parseFloat(lat || "0"),
          lng: parseFloat(lng || "0"),
          timezone: "+05:30",
          ayanamsa: "Lahiri",
          language,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/full-kundali-modern`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Backend connection failed");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (lat && lng) fetchKundali();
  }, [name, dob, tob, lat, lng, language]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0b1120] text-indigo-300">Calculating positions...</div>;
  if (error || !data) return <div className="min-h-screen flex items-center justify-center text-red-400">⚠️ Error: {error}</div>;

  // 🧭 Lagna Rashi Calculation logic (Your original)
  const lagnaMap: Record<string, number> = { aries: 1, taurus: 2, gemini: 3, cancer: 4, leo: 5, virgo: 6, libra: 7, scorpio: 8, sagittarius: 9, capricorn: 10, aquarius: 11, pisces: 12 };
  const ascendantSign = (data?.chart_data?.ascendant || data?.lagna_sign || "aries").toLowerCase().replace(/[^a-z]/g, "");
  const lagnaRashi = lagnaMap[ascendantSign] || 1;

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-6 sm:py-10 px-3 sm:px-4 text-white">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm:p-10 border border-indigo-500/30">

        {/* HERO WRAPPER: Profile Header + Chart + Quick Info */}
        <div className="relative rounded-3xl p-6 mb-8 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-purple-800/20 border border-purple-500/20 backdrop-blur-sm overflow-hidden">
          {/* Glow decorations */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Profile Header (Name / DOB / Place) - TOP */}
            <KundaliProfileHeader profile={data.profile} moonTraits={data.moon_traits} language={language} />

            {/* 1. HERO: Chart (left) + Quick Info (right) */}
            <div className="flex flex-col md:flex-row gap-6 items-start mt-6">
              <div className="w-full md:w-[300px] md:shrink-0">
                <KundaliChartPanel data={data} lagnaRashi={lagnaRashi} isHi={isHi} />
              </div>
              <div className="w-full md:flex-1">
                <KundaliQuickInfoGrid data={data} isHi={isHi} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Lagna Trait / Birthchart Snippet */}
        <div className="mt-8">
          <KundaliChartSection data={data} language={language} />
        </div>

        {/* 3. Janma Nakshatra Highlight */}
        <div className="mt-8">
          <JanmaNakshatraCard data={data} isHi={isHi} />
        </div>

        {/* 4-5. Current Dasha + Full Timeline */}
        <DashaSection dasha={data.dasha_summary} isHi={isHi} />

        {/* 6. Planetary Table - House Wise */}
        <PlanetDataTable data={data} isHi={isHi} lagnaRashi={lagnaRashi} />

        {/* 7. Key Life Insights & Yogas */}
        <LifeInsights data={data} isHi={isHi} />

        {/* 💎 Gemstone Recommendation (Original Footer Logic) */}
        {data.gemstone_suggestion && (
          <div className="mt-12 bg-yellow-500/10 p-6 rounded-2xl border border-yellow-300/30 text-center">
            <h2 className="text-xl font-bold text-yellow-300 mb-2">💎 {isHi ? "अनुशंसित रत्न" : "Recommended Gemstone"}</h2>
            <p className="text-gray-200 text-sm mb-3">{data.gemstone_suggestion.paragraph}</p>
            <div className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-full font-bold">
              {data.gemstone_suggestion.gemstone}
            </div>
          </div>
        )}

        <p className="text-center text-xs mt-10 text-indigo-300/50">
          © {new Date().getFullYear()} Jyotishasha Modern Astrology Engine
        </p>
      </div>
    </section>
  );
}