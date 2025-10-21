// 🌟 dashaTextGenerator.ts
// Universal dynamic generator for Mahadasha–Antardasha summary

export function generateDashaSummary(
  mahadasha?: string,
  antardasha?: string,
  chartData?: any,
  housesOverview?: any[]
): string {
  if (!mahadasha || !antardasha) return "";

  const planetThemes: Record<
    string,
    { focus: string[]; tone: string }
  > = {
    Sun: {
      focus: ["career", "authority", "confidence"],
      tone: "leadership, recognition and purpose",
    },
    Moon: {
      focus: ["family", "emotions", "mental peace"],
      tone: "emotional balance, sensitivity and intuition",
    },
    Mars: {
      focus: ["energy", "action", "competitiveness"],
      tone: "courage, drive and disciplined strength",
    },
    Mercury: {
      focus: ["communication", "learning", "business"],
      tone: "clarity, intellect and adaptability",
    },
    Jupiter: {
      focus: ["growth", "wisdom", "fortune"],
      tone: "expansion, higher learning and divine support",
    },
    Venus: {
      focus: ["relationships", "comfort", "creativity"],
      tone: "love, beauty and harmony in connections",
    },
    Saturn: {
      focus: ["discipline", "responsibility", "karma"],
      tone: "hard work, patience and maturity",
    },
    Rahu: {
      focus: ["ambition", "innovation", "foreign ties"],
      tone: "bold moves, unconventional growth and sudden rise",
    },
    Ketu: {
      focus: ["spirituality", "detachment", "healing"],
      tone: "self-realization, letting go and past-life clarity",
    },
  };

  const getHouseFocus = (planet: string) => {
    const found = chartData?.planets?.find((p: any) => p.name === planet);
    if (!found) return null;
    const house = housesOverview?.find((h: any) => h.house === found.house);
    return house?.focus || null;
  };

  const m = planetThemes[mahadasha];
  const a = planetThemes[antardasha];
  const mHouse = getHouseFocus(mahadasha);
  const aHouse = getHouseFocus(antardasha);

  if (!m || !a) return "";

  // 🪄 Construct the paragraph
  let text = `You are currently under the ${mahadasha} Mahadasha and ${antardasha} Antardasha. `;
  text += `This period activates themes of ${m.tone} influenced by ${a.tone}. `;

  text += `${mahadasha} governs ${m.focus.join(", ")}${
    mHouse ? ` (${mHouse.toLowerCase()})` : ""
  }, while ${antardasha} brings focus to ${a.focus.join(", ")}${
    aHouse ? ` (${aHouse.toLowerCase()})` : ""
  }. `;

  text += `Together, this phase may trigger visible changes across love, career, health, and mindset depending on how consciously you act.`;

  return text;
}
