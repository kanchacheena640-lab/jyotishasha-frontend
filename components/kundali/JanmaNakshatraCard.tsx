"use client";

import Link from "next/link";

interface Props {
  data: any;
  isHi: boolean;
}

const SIGN_HI: Record<string, string> = {
  Aries: "मेष", Taurus: "वृषभ", Gemini: "मिथुन", Cancer: "कर्क",
  Leo: "सिंह", Virgo: "कन्या", Libra: "तुला", Scorpio: "वृश्चिक",
  Sagittarius: "धनु", Capricorn: "मकर", Aquarius: "कुंभ", Pisces: "मीन",
};

// Lightweight ruling-planet lookup (Vimshottari lords) — avoids pulling the
// full lib/nakshatra content dataset into this client bundle for one field.
const RULING_PLANET: Record<string, { en: string; hi: string }> = {
  ashwini: { en: "Ketu", hi: "केतु" },
  bharani: { en: "Venus", hi: "शुक्र" },
  krittika: { en: "Sun", hi: "सूर्य" },
  rohini: { en: "Moon", hi: "चंद्रमा" },
  mrigashira: { en: "Mars", hi: "मंगल" },
  ardra: { en: "Rahu", hi: "राहु" },
  punarvasu: { en: "Jupiter", hi: "बृहस्पति" },
  pushya: { en: "Saturn", hi: "शनि" },
  ashlesha: { en: "Mercury", hi: "बुध" },
  magha: { en: "Ketu", hi: "केतु" },
  "purva-phalguni": { en: "Venus", hi: "शुक्र" },
  "uttara-phalguni": { en: "Sun", hi: "सूर्य" },
  hasta: { en: "Moon", hi: "चंद्रमा" },
  chitra: { en: "Mars", hi: "मंगल" },
  swati: { en: "Rahu", hi: "राहु" },
  vishakha: { en: "Jupiter", hi: "बृहस्पति" },
  anuradha: { en: "Saturn", hi: "शनि" },
  jyeshtha: { en: "Mercury", hi: "बुध" },
  mula: { en: "Ketu", hi: "केतु" },
  "purva-ashadha": { en: "Venus", hi: "शुक्र" },
  "uttara-ashadha": { en: "Sun", hi: "सूर्य" },
  shravana: { en: "Moon", hi: "चंद्रमा" },
  dhanishtha: { en: "Mars", hi: "मंगल" },
  shatabhisha: { en: "Rahu", hi: "राहु" },
  "purva-bhadrapada": { en: "Jupiter", hi: "बृहस्पति" },
  "uttara-bhadrapada": { en: "Saturn", hi: "शनि" },
  revati: { en: "Mercury", hi: "बुध" },
};

function toSlug(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

export default function JanmaNakshatraCard({ data, isHi }: Props) {
  const moon = data?.chart_data?.planets?.find((p: any) => p.name === "Moon");

  if (!moon?.nakshatra) return null;

  const slug = toSlug(moon.nakshatra);
  const nakInfo = RULING_PLANET[slug];

  const nakshatraName = isHi ? (moon.nakshatra_hi || moon.nakshatra) : moon.nakshatra;
  const rulingPlanet = nakInfo ? (isHi ? nakInfo.hi : nakInfo.en) : null;
  const rashi = moon.sign ? (isHi ? (SIGN_HI[moon.sign] || moon.sign) : moon.sign) : null;
  const langPath = isHi ? "/hi" : "";

  return (
    <Link
      href={`${langPath}/nakshatra/${slug}`}
      className="group block mt-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 p-6 sm:p-8 border border-purple-400/30 shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-transform hover:scale-[1.015]"
    >
      {/* Glow accents */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-400/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase font-bold tracking-widest text-purple-200 mb-2">
            ✨ {isHi ? "आपका जन्म नक्षत्र" : "Your Janma Nakshatra"}
          </p>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md mb-3">
            🌙 {nakshatraName}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start text-xs font-semibold">
            {rulingPlanet && (
              <span className="bg-white/15 text-white px-3 py-1 rounded-full">
                {isHi ? "स्वामी ग्रह:" : "Ruling Planet:"} {rulingPlanet}
              </span>
            )}
            {moon.pada && (
              <span className="bg-white/15 text-white px-3 py-1 rounded-full">
                {isHi ? "पाद:" : "Pada:"} {moon.pada}
              </span>
            )}
            {rashi && (
              <span className="bg-white/15 text-white px-3 py-1 rounded-full">
                {isHi ? "राशि:" : "Rashi:"} {rashi}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-5 text-sm font-bold text-pink-200 group-hover:text-white transition-colors text-center sm:text-left">
        {isHi ? "आपका नक्षत्र क्या कहता है" : "What Your Star Says About You"} →
      </p>
    </Link>
  );
}
