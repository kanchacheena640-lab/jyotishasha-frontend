// lib/astro/dignity.ts
export type DignityStatus = "Exalted" | "Debilitated" | "Mooltrikon" | "Own" | "None";

const EXALT: Record<string, { sign: string; point: number }> = {
  Sun: { sign: "Aries", point: 10 },
  Moon: { sign: "Taurus", point: 3 },
  Mars: { sign: "Capricorn", point: 28 },
  Mercury: { sign: "Virgo", point: 15 },
  Jupiter: { sign: "Cancer", point: 5 },
  Venus: { sign: "Pisces", point: 27 },
  Saturn: { sign: "Libra", point: 20 },
};

const DEBIL: Record<string, { sign: string; point: number }> = {
  Sun: { sign: "Libra", point: 10 },
  Moon: { sign: "Scorpio", point: 3 },
  Mars: { sign: "Cancer", point: 28 },
  Mercury: { sign: "Pisces", point: 15 },
  Jupiter: { sign: "Capricorn", point: 5 },
  Venus: { sign: "Virgo", point: 27 },
  Saturn: { sign: "Aries", point: 20 },
};

const OWN: Record<string, string[]> = {
  Sun: ["Leo"],
  Moon: ["Cancer"],
  Mars: ["Aries", "Scorpio"],
  Mercury: ["Gemini", "Virgo"],
  Jupiter: ["Sagittarius", "Pisces"],
  Venus: ["Taurus", "Libra"],
  Saturn: ["Capricorn", "Aquarius"],
};

// [sign, startDeg, endDeg] — inclusive
const MOOL: Record<string, [string, number, number]> = {
  Sun: ["Leo", 0, 20],
  Moon: ["Taurus", 4, 30],
  Mars: ["Aries", 0, 12],
  Mercury: ["Virgo", 16, 20],
  Jupiter: ["Sagittarius", 0, 10],
  Venus: ["Libra", 0, 15],
  Saturn: ["Aquarius", 0, 20],
};

const SKIP = new Set(["Rahu", "Ketu", "Ascendant (Lagna)", "Ascendant", "Lagna"]);

export function getDignity(
  planet: string,
  sign: string,
  degreeInSign: number
): {
  status: DignityStatus;
  own: boolean;
  mooltrikon: boolean;
  exaltation_point?: number | null;
  debilitation_point?: number | null;
} {
  if (SKIP.has(planet)) {
    return { status: "None", own: false, mooltrikon: false, exaltation_point: null, debilitation_point: null };
  }

  const isExalt = EXALT[planet]?.sign === sign;
  const isDebil = DEBIL[planet]?.sign === sign;
  const isOwn = OWN[planet]?.includes(sign) ?? false;
  const m = MOOL[planet];
  const isMool =
    !!m && m[0] === sign && degreeInSign >= m[1] && degreeInSign <= m[2];

  let status: DignityStatus = "None";
  if (isExalt) status = "Exalted";
  else if (isDebil) status = "Debilitated";
  else if (isMool) status = "Mooltrikon";
  else if (isOwn) status = "Own";

  return {
    status,
    own: isOwn,
    mooltrikon: isMool,
    exaltation_point: isExalt ? EXALT[planet].point : null,
    debilitation_point: isDebil ? DEBIL[planet].point : null,
  };
}
