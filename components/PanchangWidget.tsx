"use client";

import React, { useEffect, useState } from "react";

interface PanchangData {
  sunrise?: string;
  sunset?: string;
  rahu_kaal?: { start: string; end: string };
  abhijit_muhurta?: { start: string; end: string };
}

export default function PanchangWidget() {
  const [p, setP] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/panchang`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: 26.8467, // Default Lucknow
            longitude: 80.9462,
          }),
        });
        const data = await res.json();
        setP(data?.selected_date || {});
      } catch (err) {
        console.error("❌ Panchang fetch failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-gray-400">Loading Panchang...</p>;

  if (!p) return <p className="text-gray-400">No Panchang data available.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 text-left">
      {/* Sunrise */}
      <div className="bg-white/10 border border-purple-500/30 rounded-xl p-4">
        <p className="text-sm text-purple-200 font-semibold">🌅 Sunrise</p>
        <p className="text-lg text-white font-bold">{p.sunrise || "--"}</p>
      </div>

      {/* Sunset */}
      <div className="bg-white/10 border border-purple-500/30 rounded-xl p-4">
        <p className="text-sm text-purple-200 font-semibold">🌇 Sunset</p>
        <p className="text-lg text-white font-bold">{p.sunset || "--"}</p>
      </div>

      {/* Auspicious */}
      <div className="bg-white/10 border border-green-500/30 rounded-xl p-4">
        <p className="text-sm text-green-200 font-semibold">✨ Auspicious</p>
        <p className="text-lg text-white font-bold">
          {p.abhijit_muhurta?.start && p.abhijit_muhurta?.end
            ? `${p.abhijit_muhurta.start} – ${p.abhijit_muhurta.end}`
            : "--"}
        </p>
        <p className="text-xs text-green-300 mt-1">Abhijit Muhurtha</p>
      </div>

      {/* Inauspicious */}
      <div className="bg-white/10 border border-red-500/30 rounded-xl p-4">
        <p className="text-sm text-red-200 font-semibold">⚠️ Inauspicious</p>
        <p className="text-lg text-white font-bold">
          {p.rahu_kaal?.start && p.rahu_kaal?.end
            ? `${p.rahu_kaal.start} – ${p.rahu_kaal.end}`
            : "--"}
        </p>
        <p className="text-xs text-red-300 mt-1">Rahu Kaal</p>
      </div>
    </div>
  );
}
