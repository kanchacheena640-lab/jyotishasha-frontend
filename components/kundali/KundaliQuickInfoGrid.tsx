"use client";

import Link from "next/link";

interface Props {
  data: any;
  isHi: boolean;
}

const PLANET_HI: Record<string, string> = {
  Sun: "सूर्य", Moon: "चंद्र", Mars: "मंगल", Mercury: "बुध",
  Jupiter: "गुरु", Venus: "शुक्र", Saturn: "शनि", Rahu: "राहु", Ketu: "केतु",
};

function toSlug(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

function findPlanet(planets: any[], matcher: (name: string) => boolean) {
  return planets?.find((p: any) => p?.name && matcher(p.name.toLowerCase()));
}

export default function KundaliQuickInfoGrid({ data, isHi }: Props) {
  const langPath = isHi ? "/hi" : "";
  const planets = data?.chart_data?.planets || [];

  const ascendant = findPlanet(planets, (n) => n.includes("ascendant"));
  const moon = findPlanet(planets, (n) => n === "moon");
  const current = data?.dasha_summary?.current_block;

  const tPlanet = (p: string) => (isHi ? PLANET_HI[p] || p : p);

  const ascNakshatra = ascendant
    ? `${isHi ? (ascendant.nakshatra_hi || ascendant.nakshatra) : ascendant.nakshatra}${ascendant.pada ? `, ${isHi ? "पाद" : "Pada"} ${ascendant.pada}` : ""}`
    : null;

  const moonNakshatraName = moon ? (isHi ? (moon.nakshatra_hi || moon.nakshatra) : moon.nakshatra) : null;
  const moonNakshatraSlug = moon?.nakshatra ? toSlug(moon.nakshatra) : null;
  const moonPada = moon?.pada;

  const pills = [
    {
      key: "ascendant",
      icon: "🏠",
      label: isHi ? "लग्न" : "Ascendant",
      value: ascendant?.sign || "—",
      sub: ascNakshatra,
    },
    {
      key: "rashi",
      icon: "🌙",
      label: isHi ? "राशि" : "Rashi",
      value: moon?.sign || "—",
      sub: null,
    },
    {
      key: "nakshatra",
      icon: "⭐",
      label: isHi ? "नक्षत्र" : "Nakshatra",
      value: moonNakshatraName || "—",
      sub: moonPada ? `${isHi ? "पाद" : "Pada"} ${moonPada}` : null,
      href: moonNakshatraSlug ? `${langPath}/nakshatra/${moonNakshatraSlug}` : null,
    },
    {
      key: "mahadasha",
      icon: "🔮",
      label: isHi ? "महादशा" : "Mahadasha",
      value: current
        ? `${tPlanet(current.mahadasha)} → ${tPlanet(current.antardasha)}`
        : "—",
      sub: current?.period || null,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {pills.map((pill) => {
        const isNakshatra = pill.key === "nakshatra";
        const content = (
          <div
            className={`flex flex-col h-full justify-center min-h-[80px] rounded-2xl bg-purple-950/60 border p-4 transition-all active:scale-[0.98] hover:border-purple-400/60 ${
              isNakshatra ? "border-yellow-500/30" : "border-purple-400/30"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-300 mb-1">
              {pill.icon} {pill.label}
            </p>
            <p className="text-xl font-bold text-white leading-tight break-words">
              {pill.value}
            </p>
            {pill.sub && (
              <p className="text-xs text-white/70 mt-0.5">{pill.sub}</p>
            )}
          </div>
        );

        return pill.href ? (
          <Link key={pill.key} href={pill.href} className="block">
            {content}
          </Link>
        ) : (
          <div key={pill.key}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
