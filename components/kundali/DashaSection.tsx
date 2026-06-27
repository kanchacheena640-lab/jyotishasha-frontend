"use client";

import DashaTimeline from "@/components/DashaTimeline/DashaTimeline";

interface Props {
  dasha: any;
  isHi: boolean;
}

export default function DashaSection({ dasha, isHi }: Props) {
  if (!dasha) return null;

  // 🌍 Hindi translation map for Planets
  const planetHiMap: Record<string, string> = {
    Sun: "सूर्य", Moon: "चंद्र", Mars: "मंगल", Mercury: "बुध",
    Jupiter: "गुरु", Venus: "शुक्र", Saturn: "शनि", Rahu: "राहु", Ketu: "केतु",
  };

  const t = (p: string) => (isHi ? planetHiMap[p] || p : p);

  // 🌟 Glowing planet emoji per Mahadasha/Antardasha lord
  const planetEmoji: Record<string, string> = {
    Sun: "☀️", Moon: "🌙", Mars: "🔴", Mercury: "💚", Jupiter: "🪐",
    Venus: "💛", Saturn: "⚫", Rahu: "🐉", Ketu: "☄️",
  };
  const emoji = (p: string) => planetEmoji[p] || "✨";

  const current = dasha.current_block || {};

  // 🔁 Timeline data translation logic
  const translatedMahadashas = isHi
    ? dasha.mahadashas.map((m: any) => ({
        ...m,
        mahadasha: planetHiMap[m.mahadasha] || m.mahadasha,
        antardashas: m.antardashas?.map((a: any) => ({
          ...a,
          planet: planetHiMap[a.planet] || a.planet,
        })),
      }))
    : dasha.mahadashas;

  return (
    <div className="mt-12 space-y-6">
      {/* 🔮 Current Dasha Summary Card */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 border border-purple-500/40 rounded-2xl p-6 text-center shadow-xl">
        <h3 className="text-indigo-300 font-semibold mb-2">
          {isHi ? "✨ वर्तमान महादशा विवरण" : "✨ Current Dasha Insights"}
        </h3>
        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          <span className="drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]">{emoji(current.mahadasha)}</span> {t(current.mahadasha)} — <span className="drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]">{emoji(current.antardasha)}</span> {t(current.antardasha)}
        </p>
        <p className="text-purple-300 text-sm mt-1">
          {isHi ? "अवधि:" : "Period:"} {current.period || "—"}
        </p>

        {(current.impact_snippet_hi || current.text) && (
          <p className="mt-4 text-[15px] text-white/90 leading-relaxed italic border-t border-indigo-500/20 pt-4">
            {isHi ? (current.impact_snippet_hi || current.text_hi) : (current.impact_snippet || current.text)}
          </p>
        )}
      </div>

      {/* 🧭 Detailed Interactive Timeline */}
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
        <h3 className="text-lg font-medium text-indigo-100 mb-4 px-2">
          {isHi ? "📅 पूर्ण महादशा समयरेखा" : "📅 Full Dasha Timeline"}
        </h3>
        <DashaTimeline 
          mahadashas={translatedMahadashas} 
          current={isHi ? { ...current, mahadasha: t(current.mahadasha), antardasha: t(current.antardasha) } : current} 
        />
      </div>
    </div>
  );
}