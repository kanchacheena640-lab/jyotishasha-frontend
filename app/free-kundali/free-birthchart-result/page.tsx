"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import DignityBadge from "@/components/DignityBadge";
import { getDignity } from "@/lib/astro/dignity";
import DashaTimeline from "@/components/DashaTimeline/DashaTimeline";

// ✅ Structured Schema Data (App Info)
const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Kundali Generator",
  applicationCategory: "Astrology Tool",
  operatingSystem: "Web",
  url: "https://www.jyotishasha.com/free-kundali",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "1250" },
};

// ✅ Lazy import for Kundali Chart (no SSR)
const KundaliChartNorth = dynamic(() => import("@/components/KundaliChartNorth"), {
  ssr: false,
});

interface Planet {
  name?: string;
  house?: number | string;
  sign?: string;
  name_hi?: string;
  sign_hi?: string;
  nakshatra_hi?: string;
}

interface KundaliPayload {
  profile?: any;
  lagna_sign?: string;
  lagna_trait?: string; 
  rashi?: string;
  chart_data?: {
    ascendant?: string;
    planets?: Planet[];
  };
  planet_overview?: any[];
  houses_overview?: any[];
  yogas?: any;
  dasha_summary?: any;
  gemstone_suggestion?: any;
  grah_dasha_block?: any;
  moon_traits?: any;
  chart_image?: string;
  life_aspects?: {
    aspect: string;
    houses: string;
    planets: string;
    yogas: string;
    summary: string;
    example: string;
    cta?: {
      title?: string;
      button?: string;
      link?: string;
    };
  }[];
}

// ✅ Wrap main export in Suspense to fix Next.js build error
export default function FreeBirthChartResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
          <Image src="/loader-astro.gif" alt="Loading Kundali" width={120} height={120} />
          <p className="mt-4 text-indigo-300 font-medium">Preparing your Kundali...</p>
        </div>
      }
    >
      <KundaliPageContent />
    </Suspense>
  );
}

// ✅ Actual page content moved here (where useSearchParams runs)
function KundaliPageContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<KundaliPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  const [openYogaIndex, setOpenYogaIndex] = useState<number | null>(null);
  const handleYogaToggle = (i: number) => setOpenYogaIndex(prev => (prev === i ? null : i));

  const [openLifeAspectIndex, setOpenLifeAspectIndex] = useState<number | null>(null);
  const handleLifeAspectToggle = (i: number) =>
    setOpenLifeAspectIndex(prev => (prev === i ? null : i));

  const name = searchParams.get("name") || "";
  const gender = searchParams.get("gender") || "";
  const dob = searchParams.get("dob") || "";
  const tob = searchParams.get("tob") || "";
  const place = searchParams.get("place") || "";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const language = searchParams.get("language") || "en";

  useEffect(() => {
    async function fetchKundali() {
      try {
        setLoading(true);

        // ✅ STEP 1: Parse and validate coordinates
        const latNum = lat ? parseFloat(lat) : NaN;
        const lngNum = lng ? parseFloat(lng) : NaN;

        if (isNaN(latNum) || isNaN(lngNum)) {
          console.error("❌ Missing or invalid coordinates:", { lat, lng });
          alert("Unable to determine coordinates. Please select a valid location again.");
          setError("Invalid location — lat/lng missing");
          setLoading(false);
          return;
        }

        // ✅ STEP 2: Build payload
        const payload = {
          name,
          dob,
          tob,
          place_name: place,
          lat: latNum,
          lng: lngNum,
          timezone: "+05:30",
          ayanamsa: "Lahiri",
          language,
        };

        console.log("🚀 Sending Kundali Payload:", payload);

        // ✅ STEP 3: Call backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/full-kundali-modern`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        console.log("✅ Full JSON from backend:", json);
        setData(json);
      } catch (err: any) {
        console.error("Error fetching kundali:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchKundali();
  }, [name, gender, dob, tob, place, lat, lng, language]);

  // ----------------------------------------
  // Render States
  // ----------------------------------------

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <Image src="/loader-astro.gif" alt="Loading Kundali" width={120} height={120} />
        <p className="mt-4 text-indigo-300 font-medium">
          Calculating your planetary positions...
        </p>
      </div>
    );

  if (error || !data)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-red-400">
        <p className="font-semibold text-lg mb-2">⚠️ Error Loading Kundali</p>
        <p>{error || "Unexpected error occurred."}</p>
      </div>
    );

  const { profile, lagna_sign, rashi, planet_overview, gemstone_suggestion } = data;

  // ✅ Prefer ascendant from chart_data; fallback to lagna_sign
  const ascendantSign = (
    data?.chart_data?.ascendant?.trim()
      ? data.chart_data.ascendant
      : data.lagna_sign || ""
  )
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  const lagnaMap: Record<string, number> = {
    aries: 1,
    taurus: 2,
    gemini: 3,
    cancer: 4,
    leo: 5,
    virgo: 6,
    libra: 7,
    scorpio: 8,
    sagittarius: 9,
    capricorn: 10,
    aquarius: 11,
    pisces: 12,
  };

  const lagnaRashi = lagnaMap[ascendantSign] || 1;

  console.log("🧭 Ascendant used:", data.chart_data?.ascendant, "| lagna_sign:", data.lagna_sign, "| Rashi number:", lagnaRashi);

  // ✅ Rich Result Schema
  const richSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Free Kundali Generator",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "1250",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.jyotishasha.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free Kundali",
            item: "https://www.jyotishasha.com/free-kundali",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Result",
          },
        ],
      },
    ],
  };
  

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 px-4 text-white">
      {/* ✅ Schema for SEO */}
      <Script
        id="free-kundali-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Script
        id="kundali-rich-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(richSchema) }}
      />

      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-indigo-500/30">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-300">🪐 Janma Kundali Report</h1>
            <p className="text-gray-200">
              Prepared for <strong>{profile?.name}</strong> — {profile?.dob} ({profile?.tob}) at{" "}
              {profile?.place}
            </p>
          </div>
          {data.moon_traits?.image && (
            <Image
              src={data.moon_traits.image}
              alt={data.moon_traits.title || "Zodiac"}
              width={80}
              height={80}
              className="rounded-full shadow-md"
            />
          )}
        </div>
      
        {/* 🌟 Kundali Chart Centered + Snippet Below (Final Vertical Layout) */}
        <div className="flex flex-col items-center justify-center mt-8 space-y-8">

          {/* 🪐 Kundali Chart - Centered (Responsive + Glow Fixed) */}
          <div className="relative flex items-center justify-center w-full max-w-3xl overflow-hidden rounded-3xl py-4 sm:py-6">
            {/* ✅ Circular glow strictly behind chart */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] aspect-square bg-gradient-to-br from-pink-500/25 via-indigo-500/25 to-purple-600/25 blur-3xl rounded-full opacity-30 pointer-events-none"></div>
            </div>

            {/* ✅ Chart wrapper responsive */}
            <div className="relative z-10 bg-white/10 p-3 sm:p-4 rounded-2xl border border-indigo-300/40 shadow-[0_0_25px_rgba(139,92,246,0.4)] backdrop-blur-sm flex items-center justify-center w-[90vw] max-w-[340px] aspect-square mx-auto">
              {data.chart_data?.planets ? (
                <KundaliChartNorth
                  planets={data.chart_data.planets}
                  lagnaRashi={lagnaRashi}
                  size={typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.75, 340) : 320}
                />
              ) : data.chart_image ? (
                <Image
                  src={data.chart_image}
                  alt="Kundali Chart"
                  width={320}
                  height={320}
                  className="rounded-xl border border-indigo-400/40 shadow-lg"
                />
              ) : (
                <p className="text-indigo-200">Chart unavailable</p>
              )}
            </div>
          </div>

        
          {/* 📜 Snippet Below Chart */}
          <div className="w-full max-w-3xl bg-white/95 p-8 rounded-2xl border border-indigo-200/50 shadow-lg text-black">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
              🪐 Birthchart Snippet
            </h2>

            {/* 🧩 Ascendant Text */}
            <p className="leading-relaxed text-[15px] whitespace-pre-line text-justify mb-4">
              {data?.lagna_trait ? (
                <>{data.lagna_trait}</>
              ) : language === "hi" ? (
                <>
                  {data?.planet_overview?.find((p) => p.planet === "Ascendant (Lagna)")?.text_hi ||
                    "आपका लग्न शुभ स्थान पर स्थित है, जो आपके व्यक्तित्व में संतुलन और आकर्षण लाता है।"}
                </>
              ) : (
                <>
                  {data?.planet_overview?.find((p) => p.planet === "Ascendant (Lagna)")?.text_en ||
                    "Your Ascendant defines your personality, confidence, and how you interact with the world."}
                </>
              )}
            </p>

            {/* 🕉️ Dasha Line */}
            <div className="text-[15px] text-gray-800 leading-relaxed text-justify mb-6">
              {language === "hi" ? (
                <>
                  वर्तमान में आप{" "}
                  <strong className="text-indigo-700">
                    {data?.dasha_summary?.current_block?.mahadasha || "—"}
                  </strong>{" "}
                  महादशा और{" "}
                  <strong className="text-indigo-700">
                    {data?.dasha_summary?.current_block?.antardasha || "—"}
                  </strong>{" "}
                  अंतर्दशा से प्रभावित हैं। यह समय आपके जीवन की दिशा और विकास को आकार दे रहा है।
                </>
              ) : (
                <>
                  You are currently under{" "}
                  <strong className="text-indigo-700">
                    {data?.dasha_summary?.current_block?.mahadasha || "—"}
                  </strong>{" "}
                  Mahadasha and{" "}
                  <strong className="text-indigo-700">
                    {data?.dasha_summary?.current_block?.antardasha || "—"}
                  </strong>{" "}
                  Antardasha — a period shaping your ongoing growth and life direction.
                </>
              )}
            </div>

            {/* ✨ Closing Line */}
            <div className="pt-3 border-t border-indigo-100 text-sm text-indigo-700/70 text-center">
              {language === "hi"
                ? "⭐ यह कुंडली आपके जीवन की दिशा को समझने की पहली झलक देती है।"
                : "⭐ This is the first glimpse of your life's cosmic blueprint."}
            </div>
          </div>
      {/* 🌟 House-wise Planetary Positions (Hindi + English both supported, fixed Hindi fallback) */}
      {data.houses_overview && data.houses_overview.length > 0 && (
      <div className="mt-12">
        {/* 🌟 Heading + Legend (bilingual) */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-2">
            {language === "hi"
              ? "🏠 भाव अनुसार ग्रह स्थिति (House-wise Planetary Positions)"
              : "🏠 House-wise Planetary Positions (भाव अनुसार ग्रह स्थिति)"}
          </h2>

          <p className="text-sm text-indigo-400 font-medium">
            (E = Exalted / उच्च, D = Debilitated / नीच, O = Own Sign / स्वगृह, MT = Mooltrikon / मूलत्रिकोण)
          </p>
        </div>

        {/* ✅ Table section wrapped properly inside one block */}
        {(() => {
          const signNames = [
            "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
            "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
          ];

          const signHiMap: Record<string, string> = {
            Aries: "मेष",
            Taurus: "वृषभ",
            Gemini: "मिथुन",
            Cancer: "कर्क",
            Leo: "सिंह",
            Virgo: "कन्या",
            Libra: "तुला",
            Scorpio: "वृश्चिक",
            Sagittarius: "धनु",
            Capricorn: "मकर",
            Aquarius: "कुंभ",
            Pisces: "मीन",
          };

          const ordinal = (n: number) => {
            const s = ["th", "st", "nd", "rd"], v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
          };

          const getHouseSign = (houseNum: number) => {
            const idx = (lagnaRashi - 1 + (houseNum - 1)) % 12;
            return signNames[idx];
          };

          const formatDeg = (val: any) => {
            const num = typeof val === "number" ? val : parseFloat(val);
            if (Number.isNaN(num)) return "—";
            const deg = Math.floor(num);
            const min = Math.round((num - deg) * 60);
            return `${deg}° ${String(min).padStart(2, "0")}′`;
          };

          return (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
              <table className="min-w-full text-sm text-gray-900">
                <thead className="bg-gray-100 text-gray-900 uppercase text-[13px]">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">
                      {language === "hi" ? "भाव" : "House"}
                    </th>
                    <th className="px-5 py-3 text-left font-semibold">
                      {language === "hi" ? "राशि" : "Sign"}
                    </th>
                    <th className="px-5 py-3 text-left font-semibold">
                      {language === "hi" ? "ग्रह" : "Planet(s)"}
                    </th>
                    <th className="px-5 py-3 text-left font-semibold">
                      {language === "hi" ? "डिग्री" : "Degree"}
                    </th>
                    <th className="px-5 py-3 text-left font-semibold">
                      {language === "hi" ? "नक्षत्र (पद)" : "Nakshatra (Pada)"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.houses_overview.map((house: any, idx: number) => {
                    const placements = house?.notable_placements || [];
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-5 py-3 font-semibold">
                          {language === "hi"
                            ? `${house?.house ?? idx + 1} भाव`
                            : ordinal(house?.house ?? idx + 1)}
                        </td>

                        {/* Sign */}
                        <td className="px-5 py-3">
                          {placements.length > 0
                            ? (() => {
                                const p = placements[0];
                                const chartMatch = data.chart_data?.planets?.find(
                                  (pl: any) =>
                                    pl.name?.toLowerCase() === p.planet?.toLowerCase()
                                );
                                const engSign =
                                  p.sign || chartMatch?.sign || getHouseSign(house?.house ?? idx + 1);
                                const hindiSign =
                                  chartMatch?.sign_hi || signHiMap[engSign] || engSign;
                                return language === "hi" ? hindiSign : engSign;
                              })()
                            : language === "hi"
                            ? signHiMap[getHouseSign(house?.house ?? idx + 1)]
                            : getHouseSign(house?.house ?? idx + 1)}
                        </td>

                        {/* Planets */}
                        <td className="px-5 py-3">
                          {placements.length ? (
                            <div className="flex flex-col gap-1">
                              {placements.map((p: any, i: number) => {
                                const chartMatch = data.chart_data?.planets?.find(
                                  (pl: any) =>
                                    pl.name?.toLowerCase() === p.planet?.toLowerCase()
                                );
                                const planetName = p.planet;
                                const planet_hi = chartMatch?.name_hi || planetName;
                                const dignity = getDignity(p.planet, p.sign, Number(p.degree)).status;

                                const tag =
                                  planetName === "Ascendant (Lagna)" || planetName === "Lagna"
                                    ? ""
                                    : dignity === "Exalted"
                                    ? "(E)"
                                    : dignity === "Debilitated"
                                    ? "(D)"
                                    : dignity === "Own"
                                    ? "(O)"
                                    : dignity === "Mooltrikon"
                                    ? "(MT)"
                                    : "(N)";

                                return (
                                  <div key={i} className="flex items-center gap-1">
                                    <span className="text-gray-800 font-medium">
                                      {language === "hi" ? planet_hi : planetName}
                                    </span>
                                    {tag && (
                                      <span
                                        className={`text-[12px] font-semibold ${
                                          tag === "(E)"
                                            ? "text-green-600"
                                            : tag === "(D)"
                                            ? "text-red-600"
                                            : tag === "(O)"
                                            ? "text-blue-600"
                                            : tag === "(MT)"
                                            ? "text-amber-600"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        {tag}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>

                        {/* Degree */}
                        <td className="px-5 py-3">
                          {placements.length
                            ? placements.map((p: any) => formatDeg(p.degree)).join(", ")
                            : "—"}
                        </td>

                        {/* Nakshatra */}
                        <td className="px-5 py-3">
                          {placements.length
                            ? placements
                                .map((p: any) => {
                                  const chartMatch = data.chart_data?.planets?.find(
                                    (pl: any) =>
                                      pl.name?.toLowerCase() === p.planet?.toLowerCase()
                                  );
                                  const nak_hi = chartMatch?.nakshatra_hi || p.nakshatra;
                                  return language === "hi"
                                    ? `${nak_hi}${p.pada ? ` (${p.pada})` : ""}`
                                    : `${p.nakshatra}${p.pada ? ` (${p.pada})` : ""}`;
                                })
                                .join(", ")
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>
    )}

      {/* 🔮 Current Dasha Summary Block */}
      {data.dasha_summary && (() => {
        const dasha = data.dasha_summary;

        const planetHiMap: Record<string, string> = {
          Sun: "सूर्य",
          Moon: "चंद्र",
          Mars: "मंगल",
          Mercury: "बुध",
          Jupiter: "गुरु",
          Venus: "शुक्र",
          Saturn: "शनि",
          Rahu: "राहु",
          Ketu: "केतु",
        };

        const t = (p: string) => (language === "hi" ? planetHiMap[p] || p : p);

        // ✅ Format “YYYY-MM-DD – YYYY-MM-DD” → “DD/MM/YYYY – DD/MM/YYYY”
        const formatPeriod = (periodStr: string) => {
          if (!periodStr) return "";
          const formatDate = (str: string) => {
            const clean = str.trim().split(" ")[0];
            const parts = clean.split("-");
            if (parts.length === 3) {
              const [yyyy, mm, dd] = parts;
              return `${dd}/${mm}/${yyyy}`;
            }
            return str;
          };
          if (periodStr.includes("–")) {
            const [start, end] = periodStr.split("–").map((s) => s.trim());
            return `${formatDate(start)} – ${formatDate(end)}`;
          }
          return formatDate(periodStr);
        };

        // ✅ Read all possible backend fields safely
        const current = {
          mahadasha:
            dasha.current_block?.mahadasha ||
            dasha.current_mahadasha?.mahadasha ||
            "",
          antardasha:
            dasha.current_block?.antardasha ||
            dasha.current_antardasha?.planet ||
            "",
          period: formatPeriod(dasha.current_block?.period || ""),
          // ✅ choose correct text: Hindi first, else English
          text:
            (language === "hi"
              ? dasha.current_block?.impact_snippet_hi ||
                dasha.current_block?.text_hi ||
                dasha.current_block?.description_hi
              : dasha.current_block?.impact_snippet ||
                dasha.current_block?.text ||
                dasha.current_block?.description) || "",
        };

        return (
          <div className="mt-12 bg-indigo-900/20 border border-indigo-400/30 rounded-2xl p-5 mb-6 text-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            {language === "hi" ? (
              <>
                वर्तमान में आप{" "}
                <strong className="text-indigo-300">{t(current.mahadasha)}</strong>{" "}
                महादशा और{" "}
                <strong className="text-indigo-300">{t(current.antardasha)}</strong>{" "}
                अंतर्दशा के प्रभाव में हैं।
                <br />
                <span className="text-indigo-200 text-sm">
                  अवधि: {current.period || "—"}
                </span>

                {current.text && (
                  <p className="mt-3 text-[15px] text-indigo-100 leading-relaxed">
                    {current.text}
                  </p>
                )}
              </>
            ) : (
              <>
                You are currently under{" "}
                <strong className="text-indigo-300">{current.mahadasha}</strong>{" "}
                Mahadasha and{" "}
                <strong className="text-indigo-300">{current.antardasha}</strong>{" "}
                Antardasha.
                <br />
                <span className="text-indigo-200 text-sm">
                  Period: {current.period || "—"}
                </span>

                {current.text && (
                  <p className="mt-3 text-[15px] text-indigo-100 leading-relaxed">
                    {current.text}
                  </p>
                )}
              </>
            )}
          </div>
        );
      })()}



          {/* 🧭 Detailed Timeline Component (with Hindi planet translation) */}
          {(() => {
            const dasha = data.dasha_summary;
            const current = dasha.current_block || {
              mahadasha: dasha.current_mahadasha?.mahadasha || "",
              antardasha: dasha.current_antardasha?.planet || "",
            };

            // 🔠 Hindi translation map
            const planetHiMap: Record<string, string> = {
              Sun: "सूर्य",
              Moon: "चंद्र",
              Mars: "मंगल",
              Mercury: "बुध",
              Jupiter: "गुरु",
              Venus: "शुक्र",
              Saturn: "शनि",
              Rahu: "राहु",
              Ketu: "केतु",
            };

            // 🔁 Convert planets inside mahadasha → antardasha lists
            const translatedMahadashas =
              language === "hi"
                ? dasha.mahadashas.map((m: any) => ({
                    ...m,
                    mahadasha: planetHiMap[m.mahadasha] || m.mahadasha,
                    antardashas: m.antardashas?.map((a: any) => ({
                      ...a,
                      planet: planetHiMap[a.planet] || a.planet,
                    })),
                  }))
                : dasha.mahadashas;

            const translatedCurrent =
              language === "hi"
                ? {
                    ...current,
                    mahadasha: planetHiMap[current.mahadasha] || current.mahadasha,
                    antardasha: planetHiMap[current.antardasha] || current.antardasha,
                  }
                : current;

            return (
              <DashaTimeline
                mahadashas={translatedMahadashas}
                current={translatedCurrent}
              />
            );
          })()}
        {/* 🌠 Planetary Overview – Interactive Cosmic Style */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-6 text-center">
            🌠 Planetary Overview
          </h2>

          {planet_overview?.map((p, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border border-indigo-400/30 mb-4 transition-all duration-500 
                  ${isOpen ? "bg-indigo-900/40 shadow-[0_0_30px_rgba(139,92,246,0.3)]" : "bg-white/5 hover:bg-white/10"}
                `}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer"
                  onClick={() => handleToggle(i)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {
                        ((): string => {
                          const emojiMap: Record<string, string> = {
                            Sun: "☀️",
                            Moon: "🌙",
                            Mars: "🔥",
                            Mercury: "💬",
                            Jupiter: "🌕",
                            Venus: "💖",
                            Saturn: "🪐",
                            Rahu: "🌑",
                            Ketu: "🌒",
                          };
                          return emojiMap[p?.planet as keyof typeof emojiMap] || "⭐";
                        })()
                      }
                    </span>
                    <h3 className="text-lg font-semibold text-indigo-100">
                      {p.planet}
                    </h3>
                  </div>
                  <span
                    className={`text-indigo-300 transform transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                </div>

                {/* Expandable Section */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-sm leading-relaxed text-gray-200 relative">
                    {/* cosmic glow bg */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,0.2),transparent_70%)] opacity-50 pointer-events-none"></div>

                    <div className="relative z-10">
                      <p className="font-medium text-indigo-200 mb-2">
                        ✨ Influence Summary
                      </p>
                      <p className="text-gray-300 whitespace-pre-line">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 🌿 Active Yogas & Doshas – Only Active & With Content */}
        {data.yogas && Object.keys(data.yogas).length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-300">
              {language === "hi" ? "🌿 सक्रिय योग और दोष" : "🌿 Active Yogas & Doshas"}
            </h2>

            <div className="space-y-4">
              {Object.entries(data.yogas)
                .filter(([_, item]: [string, any]) => {
                  // ✅ show only active yogas with real content
                  if (!item || item.is_active === false) return false;
                  const hasContent =
                    item.description ||
                    (Array.isArray(item.positives) && item.positives.length > 0) ||
                    (Array.isArray(item.reasons) && item.reasons.length > 0);
                  return hasContent;
                })
                .map(([key, item]: [string, any], i: number) => {
                  const isOpen = openYogaIndex === i;

                  return (
                    <div
                      key={key}
                      className={`rounded-2xl border border-indigo-400/30 transition-all duration-500 overflow-hidden ${
                        isOpen
                          ? "bg-indigo-900/40 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {/* Header */}
                      <div
                        className="flex items-center justify-between px-5 py-4 cursor-pointer"
                        onClick={() => handleYogaToggle(i)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji || "✨"}</span>
                          <h3 className="text-lg font-semibold text-indigo-100">
                            {item.heading || item.name || key}
                          </h3>
                        </div>
                        <span
                          className={`text-indigo-300 transform transition-transform duration-300 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        >
                          ▶
                        </span>
                      </div>

                      {/* Expanded Body */}
                      <div
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                          isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-5 text-sm leading-relaxed text-gray-200 relative">
                          {/* Background glow */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,0.2),transparent_70%)] opacity-50 pointer-events-none"></div>

                          <div className="relative z-10 space-y-4">
                            {/* Description */}
                            {item.description && (
                              <p className="text-indigo-100">{item.description}</p>
                            )}

                            {/* Positives */}
                            {Array.isArray(item.positives) && item.positives.length > 0 && (
                              <div>
                                <p className="font-medium text-green-400 mb-1">
                                  {language === "hi"
                                    ? "सकारात्मक प्रभाव:"
                                    : "Positive Effects:"}
                                </p>
                                <ul className="list-disc list-inside text-gray-200 space-y-1">
                                  {item.positives.map((p: string, idx: number) => (
                                    <li key={idx}>{p}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Challenge */}
                            {item.challenge && (
                              <div>
                                <p className="font-medium text-red-400 mb-1">
                                  {language === "hi" ? "चुनौती:" : "Challenge:"}
                                </p>
                                <p className="text-gray-300">{item.challenge}</p>
                              </div>
                            )}

                            {/* Reasons */}
                            {Array.isArray(item.reasons) && item.reasons.length > 0 && (
                              <div>
                                <p className="font-medium text-indigo-300 mb-1">
                                  {language === "hi"
                                    ? "कारण / ज्योतिषीय स्थिति:"
                                    : "Astrological Reasons:"}
                                </p>
                                <ul className="list-disc list-inside text-gray-200 space-y-1">
                                  {item.reasons.map((r: string, idx: number) => (
                                    <li key={idx}>{r}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Strength */}
                            {item.strength && (
                              <p className="text-purple-300">
                                <strong>
                                  {language === "hi" ? "शक्ति स्तर:" : "Strength:"}
                                </strong>{" "}
                                {item.strength}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}



        {/* 🌌 Your Life Blueprint – Key Insights from Your Chart */}
        {Array.isArray(data.life_aspects) && data.life_aspects.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-extrabold text-center mb-3 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              {language === "hi"
                ? "📜 जीवन के महत्‍वपूर्ण क्षेत्र और प्रमुख कारक"
                : "📜 Your Life Blueprint – Key Insights from Your Chart"}
            </h2>
            <p className="text-center text-indigo-200 text-sm mb-8 max-w-2xl mx-auto">
              {language === "hi"
                ? "जानिए कैसे आपकी कुंडली के भाव, ग्रह और योग जीवन के हर क्षेत्र को प्रभावित करते हैं।"
                : "Discover how each area of your life is shaped by houses, planets, and yogas in your Kundali."}
            </p>

            <div className="space-y-4">
              {data.life_aspects.map((item: any, i: number) => {
                const isOpen = openLifeAspectIndex === i;

                const aspect = language === "hi" ? item.aspect_hi || item.aspect : item.aspect;
                const summary = language === "hi" ? item.summary_hi || item.summary : item.summary;
                const example = language === "hi" ? item.example_hi || item.example : item.example;
                const yogas = language === "hi" ? item.yogas_hi || item.yogas : item.yogas;
                const houses = item.houses || "—";
                const planets =
                  language === "hi" && item.planets_hi
                    ? item.planets_hi
                    : item.planets || "—";
                const summaryFocus =
                  summary?.includes("=") ? summary.split("=")[1] : summary || "";

                return (
                  <article
                    key={i}
                    className={`rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                      isOpen
                        ? "bg-indigo-900/40 border-indigo-400/40 shadow-[0_0_25px_rgba(129,140,248,0.4)]"
                        : "bg-white/5 border-indigo-400/20 hover:bg-indigo-900/20"
                    }`}
                    onClick={() => handleLifeAspectToggle(i)}
                  >
                    {/* Header */}
                    <header className="flex justify-between items-center px-5 py-4">
                      <div>
                        <h3 className="text-lg font-semibold text-indigo-100 flex items-center gap-2">
                          🌟 {aspect}
                        </h3>
                        <p className="text-indigo-300 text-sm">
                          {language === "hi"
                            ? "विस्तृत ग्रहों की अंतर्दृष्टि देखने के लिए टैप करें"
                            : "Tap to view detailed planetary insights"}
                        </p>
                      </div>
                      <span
                        className={`text-indigo-300 transform transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </header>

                    {/* Expandable Body */}
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-5 text-gray-200 text-sm leading-relaxed space-y-2">
                        <p>
                          <strong>{language === "hi" ? "संबंधित भाव:" : "Related Houses:"}</strong>{" "}
                          {houses}
                        </p>
                        <p>
                          <strong>{language === "hi" ? "मुख्य ग्रह:" : "Key Planets:"}</strong>{" "}
                          {planets}
                        </p>
                        <p>
                          <strong>{language === "hi" ? "सहायक योग:" : "Supporting Yogas:"}</strong>{" "}
                          {yogas && yogas.trim() !== "—"
                            ? yogas
                            : language === "hi"
                            ? "इस क्षेत्र में कोई सक्रिय योग नहीं है।"
                            : "No active Yog supporting this aspect."}
                        </p>

                        <p className="text-yellow-300 mt-2">
                          <strong>{language === "hi" ? "ज्योतिष नियम:" : "Astro Rule:"}</strong>{" "}
                          {summary}
                        </p>

                        {/* Aspect Description removed */}
                       

                        {/* CTA Button */}
                        <div className="pt-4 text-right">
                          <a
                            href={item.cta?.link || "https://www.jyotishasha.com/tools"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 
                                        text-white text-sm font-medium px-4 py-1.5 rounded-full transition-all"
                          >
                            {language === "hi"
                              ? `अपनी ${aspect} रिपोर्ट प्राप्त करें ₹49/- में`
                              : `Get your personalized ${aspect} Report @ ₹49/-`}
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Footer note */}
            <p className="text-center text-sm mt-10 text-indigo-300">
              {language === "hi" ? "सभी 25 जीवन क्षेत्रों और उपाय देखें – " : "Explore all 25 life aspects & remedies at "}
              <a
                href="https://www.jyotishasha.com/tools"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-indigo-100"
              >
                jyotishasha.com/tools
              </a>
              .
            </p>
          </section>
        )}

        {/* Gemstone Suggestion */}
        {gemstone_suggestion && (
          <div className="mt-10 bg-yellow-500/10 p-5 rounded-xl border border-yellow-300/40">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-2">
              💎 Gemstone Recommendation
            </h2>
            <p className="text-gray-200">{gemstone_suggestion.paragraph}</p>
            <p className="mt-2 text-yellow-100 font-semibold">
              Recommended Stone: {gemstone_suggestion.gemstone} ({gemstone_suggestion.substone})
            </p>
          </div>
        )}
      </div>
    </div>
    </section>
  );
}
