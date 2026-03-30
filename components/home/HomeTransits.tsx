"use client";

import { useState } from "react";
import type { TransitResponse } from "@/lib/getTransit";

type Props = {
  data: TransitResponse | null;
  dict: any;   // ✅ Added
  lang: string; // ✅ Added
};

const planets = [
  { name: "Sun", icon: "🔆" },
  { name: "Moon", icon: "🌙" },
  { name: "Mars", icon: "🔴" },
  { name: "Mercury", icon: "🟢" },
  { name: "Jupiter", icon: "🟡" },
  { name: "Venus", icon: "💫" },
  { name: "Saturn", icon: "🪐" },
  { name: "Rahu", icon: "👹" },
  { name: "Ketu", icon: "🐍" },
];

function formatDate(dateStr: string | undefined, lang: string) {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'hi' ? "hi-IN" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomeTransit({ data, dict, lang }: Props) {
  if (!data || !dict) return null;

  const { positions, future_transits } = data;
  const [activePlanet, setActivePlanet] = useState("Sun");

  // Rashi ka naam backend se dynamic aayega
  const rashi = positions?.[activePlanet]?.rashi;
  const currentTransit = future_transits?.[activePlanet]?.find(
    (t: any) => t.from_rashi === rashi
  );

  const exitDate = formatDate(currentTransit?.exit_date, lang);

  // ✅ Bilingual Preview Text
  const planetName = dict.transit.planets[activePlanet];
  const previewText = lang === 'hi' 
    ? `${planetName} वर्तमान में ${rashi} राशि में गोचर कर रहा है। ${dict.transit.influenceText} ${planetName.toLowerCase()} ${dict.transit.themesText}`
    : `${planetName} ${dict.transit.presentText} ${rashi}. ${dict.transit.influenceText} ${planetName.toLowerCase()} ${dict.transit.themesText}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          {dict.transit.heading}
        </h2>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-2xl p-6 border border-purple-700 shadow-xl flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl text-indigo-300">
                {planets.find(p => p.name === activePlanet)?.icon}
              </span>
              <h3 className="text-base text-white font-semibold">
                {planetName} {dict.transit.transitLabel}
              </h3>
            </div>
            <p className="text-sm text-purple-200 leading-relaxed mb-4">
              {previewText}
            </p>
            <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
              <li>{dict.transit.currentSign}: {rashi}</li>
              <li>{dict.transit.transitEnds}: {exitDate}</li>
            </ul>
          </div>
          <div className="mt-6 text-right">
            <a
  href={
    lang === "hi"
      ? `/hi/${activePlanet.toLowerCase()}-transit`
      : `/${activePlanet.toLowerCase()}-transit`
  }
  className="text-purple-300 hover:text-white underline text-sm"
>
  {dict.transit.readMore} →
</a>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {planets.map((planet) => (
              <button
                key={planet.name}
                onClick={() => setActivePlanet(planet.name)}
                className={`bg-[#1e1b4b] rounded-xl p-2 border transition w-full ${
                  activePlanet === planet.name ? "border-purple-500 bg-[#2a2565]" : "border-transparent hover:border-purple-600"
                }`}
              >
                <div className="text-lg md:text-xl text-center mb-1 text-indigo-300">
                  {planet.icon}
                </div>
                <div className="text-white text-[9px] md:text-xs text-center">
                  {dict.transit.planets[planet.name]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}