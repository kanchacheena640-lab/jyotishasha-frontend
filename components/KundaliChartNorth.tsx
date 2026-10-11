"use client";
import React from "react";
import { CHART_BASE, RASHI_FONT_SIZE, RASHI_NUMBER_POS, layoutHouseLabels } from "@/lib/kundaliChartLayout";

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

const BASE = CHART_BASE;
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

        {/* Houses: rashi number at its fixed spot, planets in the house's own label area (lib/kundaliChartLayout.ts) */}
        {Object.entries(RASHI_NUMBER_POS).map(([k, pos]) => {
          const house = parseInt(k, 10);
          const rashi = rashis[house - 1];
          const hp = byHouse[house] || [];
          const { fontSize, slots } = layoutHouseLabels(house, hp.length);

          return (
            <g key={house}>
              <text x={pos.x} y={pos.y} fontSize={RASHI_FONT_SIZE} fill="black" textAnchor="middle" dominantBaseline="middle">
                {rashi}
              </text>
              {hp.map((abbr, i) => (
                <text
                  key={i}
                  x={slots[i].x}
                  y={slots[i].y}
                  fontSize={fontSize}
                  fill="black"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontWeight: 600 }}
                >
                  {abbr}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
