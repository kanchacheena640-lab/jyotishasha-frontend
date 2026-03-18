"use client";
import React from "react";
import KundaliChartNorth from "./KundaliChartNorth";

interface DynamicTransitProps {
  ascendant: string;
  activePlanet: string; // e.g., "ketu"
  house: number;
  size?: number;
}

/** Helper to map string ascendant to number */
const getAscendantNumber = (asc: string): number => {
  const mapping: Record<string, number> = {
    aries: 1, taurus: 2, gemini: 3, cancer: 4, leo: 5, virgo: 6,
    libra: 7, scorpio: 8, sagittarius: 9, capricorn: 10, aquarius: 11, pisces: 12
  };
  return mapping[asc.toLowerCase()] || 1;
};

export default function DynamicTransitChart({ 
  ascendant, 
  activePlanet, 
  house, 
  size = 350 
}: DynamicTransitProps) {
  
  const lagnaRashi = getAscendantNumber(ascendant);
  
  // Hum planets array mein active planet bhej rahe hain
  const planets = [
    { name: activePlanet, house: house }
  ];

  return (
    <div className="flex flex-col items-center justify-center my-8 p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
        Visual Transit Chart ({ascendant})
      </h3>
      
      <div className="relative group">
        {/* Glow effect behind the chart */}
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
        
        <KundaliChartNorth 
          planets={planets} 
          lagnaRashi={lagnaRashi} 
          size={size} 
        />
      </div>

      <p className="mt-4 text-xs text-slate-500 italic">
        *Showing {activePlanet} position in House {house}
      </p>

      {/* Global SEO Trick: Adding a small pulsing CSS specifically for the active planet */}
      <style jsx global>{`
        @keyframes transitPulse {
          0% { opacity: 1; filter: drop-shadow(0 0 2px #3b82f6); }
          50% { opacity: 0.6; filter: drop-shadow(0 0 8px #3b82f6); }
          100% { opacity: 1; filter: drop-shadow(0 0 2px #3b82f6); }
        }
        /* Yeh aapke KundaliChartNorth ke text par apply hoga */
        svg text { transition: all 0.3s ease; }
        /* Har us text par pulse lagao jo empty nahi hai (hamara active planet) */
        svg g text:nth-of-type(2) {
          animation: transitPulse 2s infinite ease-in-out;
          fill: #1e3a8a !important; /* Deep Blue for Global Look */
        }
      `}</style>
    </div>
  );
}