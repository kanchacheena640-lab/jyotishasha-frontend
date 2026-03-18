"use client";
import React from "react";
import KundaliChartNorth from "./KundaliChartNorth";

interface DynamicTransitProps {
  ascendant: string;
  activePlanet: string; 
  house: number;
  size?: number;
}

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
  size = 340 
}: DynamicTransitProps) {
  
  const lagnaRashi = getAscendantNumber(ascendant);
  const planets = [{ name: activePlanet, house: house }];

  return (
    <div className="flex flex-col items-center justify-center my-10 p-4 md:p-8 bg-white rounded-[2rem] border border-blue-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">
      {/* Subtle Background Decorative Element */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50" />
      
      <div className="text-center mb-6 relative z-10">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-1">
          Transit Visualization
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          {activePlanet.charAt(0).toUpperCase() + activePlanet.slice(1)} in {ascendant.charAt(0).toUpperCase() + ascendant.slice(1)} Ascendant
        </p>
      </div>
      
      <div className="relative group transition-transform duration-500 hover:scale-[1.02]">
        {/* The Glow behind the chart matching the new blue theme */}
        <div className="absolute inset-0 bg-blue-400/20 blur-[60px] rounded-full opacity-50" />
        
        <div className="relative bg-gradient-to-br from-blue-50 to-sky-100 p-3 rounded-[2.5rem] shadow-inner border border-white/50">
          <KundaliChartNorth 
            planets={planets} 
            lagnaRashi={lagnaRashi} 
            size={size} 
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
          Live Position: House {house}
        </p>
      </div>

      <style jsx global>{`
        /* 1. Global Override for KundaliChartNorth colors */
        svg[aria-label="Kundali North Chart"] {
          background: transparent !important; /* Wrapper handle karega bg */
        }
        svg[aria-label="Kundali North Chart"] rect {
          fill: rgba(255, 255, 255, 0.7) !important;
          stroke: #93c5fd !important; /* Light Blue lines */
          stroke-width: 1.5 !important;
          rx: 30; /* Rounded corners for the chart square */
        }
        svg[aria-label="Kundali North Chart"] line {
          stroke: #bfdbfe !important; /* Softer Blue for inner lines */
        }
        /* 2. Rashi Numbers Color */
        svg[aria-label="Kundali North Chart"] text {
          fill: #1e40af !important; /* Darker blue for contrast */
          font-family: inherit;
        }
        /* 3. Active Planet Pulsing Effect */
        @keyframes transitPulse {
          0% { opacity: 1; filter: drop-shadow(0 0 2px #3b82f6); transform: scale(1); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 10px #2563eb); transform: scale(1.1); }
          100% { opacity: 1; filter: drop-shadow(0 0 2px #3b82f6); transform: scale(1); }
        }
        /* Target specifically the planet text (usually the 2nd text in a group) */
        svg g text:nth-of-type(2) {
          animation: transitPulse 2.5s infinite ease-in-out;
          fill: #1d4ed8 !important; /* Vivid Blue */
          font-weight: 800 !important;
          font-size: 14px !important;
        }
      `}</style>
    </div>
  );
}