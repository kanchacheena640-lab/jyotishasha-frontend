"use client";
import React from "react";

interface PlanetData {
  name?: string;
  house?: number | string;
}

interface Props {
  planets: PlanetData[];     // EXPECTS flat array only
  lagnaRashi: number;        // 1..12 (Libra = 7)
  size?: number;             // default 400
}

/** 2-letter initials */
const ABBR: Record<string, string> = {
  sun: "Su",
  moon: "Mo",
  mars: "Ma",
  mercury: "Me",
  jupiter: "Ju",
  venus: "Ve",
  saturn: "Sa",
  rahu: "Ra",
  ketu: "Ke",
};

/** few safe synonyms (ascii only) */
const ALT: Record<string, string> = {
  surya: "sun",
  soorya: "sun",
  ravi: "sun",
  chandra: "moon",
  soma: "moon",
  mangal: "mars",
  kuja: "mars",
  budh: "mercury",
  budha: "mercury",
  guru: "jupiter",
  brihaspati: "jupiter",
  shukra: "venus",
  shani: "saturn",
  sani: "saturn",
  raahu: "rahu",
};

const BASE = 400;
const CENTER = BASE / 2;

const toInt = (x: any): number => {
  const n = typeof x === "string" ? parseInt(x, 10) : Number(x);
  return Number.isFinite(n) ? n : NaN;
};

const getRashisByHouse = (lagnaRashi: number): number[] => {
  const out: number[] = [];
  for (let i = 0; i < 12; i++) out.push(((lagnaRashi - 1 + i) % 12) + 1);
  return out;
};

const toAbbr = (raw: unknown): string => {
  if (!raw) return "";
  const s = String(raw).trim();
  if (!s) return "";
  const key = s.toLowerCase().replace(/[^a-z]/g, "");
  const canon = ALT[key] || key;
  return ABBR[canon] || ((s[0]?.toUpperCase() ?? "") + (s[1]?.toLowerCase() ?? ""));
};

export default function KundaliChartNorth({ planets, lagnaRashi, size = 400 }: Props) {
  // clean + group
  const byHouse: Record<number, string[]> = {};
  for (const p of planets || []) {
    if (!p?.name) continue;
    if (/ascendant/i.test(p.name)) continue;                 // skip Ascendant
    const h = toInt(p.house);
    if (!Number.isFinite(h) || h < 1 || h > 12) continue;
    const ab = toAbbr(p.name).toUpperCase();
    if (!byHouse[h]) byHouse[h] = [];
    byHouse[h].push(ab);
  }

  const rashis = getRashisByHouse(lagnaRashi);

  const houseCenters: Record<number, { x: number; y: number }> = {
    1: { x: CENTER, y: 155 },
    2: { x: CENTER - 100, y: 80 },
    3: { x: CENTER - 130, y: CENTER - 95 },
    4: { x: CENTER - 40, y: CENTER },
    5: { x: CENTER - 130, y: CENTER + 95 },
    6: { x: CENTER - 100, y: CENTER + 120 },
    7: { x: CENTER, y: CENTER + 50 },
    8: { x: CENTER + 100, y: CENTER + 120 },
    9: { x: CENTER + 130, y: CENTER + 95 },
    10:{ x: CENTER + 40, y: CENTER },
    11:{ x: CENTER + 130, y: CENTER - 95 },
    12:{ x: CENTER + 100, y: 80 },
  };

  return (
    <div className="mx-auto" style={{ width: size, maxWidth: "100%" }}>
      <svg
        viewBox={`0 0 ${BASE} ${BASE}`}
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        className="h-auto"
        role="img"
        aria-label="Kundali North Chart"
      >
        {/* Outer square */}
        <rect x="0" y="0" width={BASE} height={BASE} stroke="black" fill="white" strokeWidth={2} />

        {/* Diagonals */}
        <line x1="0" y1="0" x2={BASE} y2={BASE} stroke="black" strokeWidth={1.5} />
        <line x1={BASE} y1="0" x2="0" y2={BASE} stroke="black" strokeWidth={1.5} />

        {/* Diamond ring */}
        <line x1={CENTER} y1="0" x2="0" y2={CENTER} stroke="black" strokeWidth={1.5} />
        <line x1="0" y1={CENTER} x2={CENTER} y2={BASE} stroke="black" strokeWidth={1.5} />
        <line x1={CENTER} y1={BASE} x2={BASE} y2={CENTER} stroke="black" strokeWidth={1.5} />
        <line x1={BASE} y1={CENTER} x2={CENTER} y2="0" stroke="black" strokeWidth={1.5} />

        {/* Houses */}
        {Object.entries(houseCenters).map(([k, pos]) => {
          const house = parseInt(k, 10);
          const rashi = rashis[house - 1];
          const hp = byHouse[house] || [];

          let shiftX = 0, shiftY = 0;
          if ([1, 2, 12].includes(house)) shiftY = -28;
          else if ([3, 4, 5].includes(house)) shiftX = -30;
          else if ([6, 7, 8].includes(house)) shiftY = 30;
          else if ([9, 10, 11].includes(house)) shiftX = 30;

          return (
            <g key={house}>
              <text x={pos.x} y={pos.y} fontSize="14" fill="black" textAnchor="middle" dominantBaseline="middle">
                {rashi}
              </text>
              {hp.length > 0 && (
                <text
                  x={pos.x + shiftX}
                  y={pos.y + shiftY}
                  fontSize="12"
                  fill="black"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontWeight: 600 }}
                >
                  {hp.join(", ")}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
