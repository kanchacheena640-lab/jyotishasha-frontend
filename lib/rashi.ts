// lib/rashi.ts
// Display helpers for the Moon sign and Lagna. Backend values stay English ("Sagittarius", "Purva Ashadha"); these
// maps only decide what a visitor reads and where a link goes. Kept small and free of the full Nakshatra guide data,
// because they load with the calculator. lib/rashiFinderTool.test.ts checks every slug against the real routes.

/** Backend sign name -> Hindi name and the horoscope route slug. */
const SIGNS: Record<string, { hi: string; slug: string }> = {
  Aries: { hi: "मेष", slug: "aries" },
  Taurus: { hi: "वृषभ", slug: "taurus" },
  Gemini: { hi: "मिथुन", slug: "gemini" },
  Cancer: { hi: "कर्क", slug: "cancer" },
  Leo: { hi: "सिंह", slug: "leo" },
  Virgo: { hi: "कन्या", slug: "virgo" },
  Libra: { hi: "तुला", slug: "libra" },
  Scorpio: { hi: "वृश्चिक", slug: "scorpio" },
  Sagittarius: { hi: "धनु", slug: "sagittarius" },
  Capricorn: { hi: "मकर", slug: "capricorn" },
  Aquarius: { hi: "कुंभ", slug: "aquarius" },
  Pisces: { hi: "मीन", slug: "pisces" },
};

/** Backend nakshatra name (full_kundali_api.NAKSHATRAS) -> Hindi name and /nakshatra/<slug>. */
const NAKSHATRAS: Record<string, { hi: string; slug: string }> = {
  Ashwini: { hi: "अश्विनी", slug: "ashwini" },
  Bharani: { hi: "भरणी", slug: "bharani" },
  Krittika: { hi: "कृत्तिका", slug: "krittika" },
  Rohini: { hi: "रोहिणी", slug: "rohini" },
  Mrigashira: { hi: "मृगशिरा", slug: "mrigashira" },
  Ardra: { hi: "आर्द्रा", slug: "ardra" },
  Punarvasu: { hi: "पुनर्वसु", slug: "punarvasu" },
  Pushya: { hi: "पुष्य", slug: "pushya" },
  Ashlesha: { hi: "आश्लेषा", slug: "ashlesha" },
  Magha: { hi: "मघा", slug: "magha" },
  "Purva Phalguni": { hi: "पूर्वा फाल्गुनी", slug: "purva-phalguni" },
  "Uttara Phalguni": { hi: "उत्तरा फाल्गुनी", slug: "uttara-phalguni" },
  Hasta: { hi: "हस्त", slug: "hasta" },
  Chitra: { hi: "चित्रा", slug: "chitra" },
  Swati: { hi: "स्वाति", slug: "swati" },
  Vishakha: { hi: "विशाखा", slug: "vishakha" },
  Anuradha: { hi: "अनुराधा", slug: "anuradha" },
  Jyeshtha: { hi: "ज्येष्ठा", slug: "jyeshtha" },
  Mula: { hi: "मूल", slug: "mula" },
  "Purva Ashadha": { hi: "पूर्वाषाढ़ा", slug: "purva-ashadha" },
  "Uttara Ashadha": { hi: "उत्तराषाढ़ा", slug: "uttara-ashadha" },
  Shravana: { hi: "श्रवण", slug: "shravana" },
  // The backend spells it "Dhanishta"; the guide's URL is /nakshatra/dhanishtha.
  Dhanishta: { hi: "धनिष्ठा", slug: "dhanishtha" },
  Shatabhisha: { hi: "शतभिषा", slug: "shatabhisha" },
  "Purva Bhadrapada": { hi: "पूर्वा भाद्रपद", slug: "purva-bhadrapada" },
  "Uttara Bhadrapada": { hi: "उत्तरा भाद्रपद", slug: "uttara-bhadrapada" },
  Revati: { hi: "रेवती", slug: "revati" },
};

export const ALL_SIGN_NAMES = Object.keys(SIGNS);
export const ALL_NAKSHATRA_NAMES = Object.keys(NAKSHATRAS);

/** Sign name for display: Hindi on /hi; an unknown value is shown as it came. */
export const signName = (sign: unknown, isHi: boolean): string => {
  const s = String(sign ?? "");
  return (isHi && SIGNS[s]?.hi) || s;
};
export const signSlug = (sign: unknown): string | null => SIGNS[String(sign ?? "")]?.slug ?? null;

export const nakshatraName = (name: unknown, isHi: boolean): string => {
  const n = String(name ?? "");
  return (isHi && NAKSHATRAS[n]?.hi) || n;
};
export const nakshatraSlug = (name: unknown): string | null => NAKSHATRAS[String(name ?? "")]?.slug ?? null;

/** Horoscope and Nakshatra guides for a visitor's own Moon sign; null when the value is not recognised. */
export const horoscopeHref = (kind: "daily" | "monthly" | "yearly", sign: unknown, isHi: boolean): string | null => {
  const slug = signSlug(sign);
  return slug ? `${isHi ? "/hi" : ""}/${kind}-horoscope/${slug}` : null;
};
export const nakshatraHref = (name: unknown, isHi: boolean): string | null => {
  const slug = nakshatraSlug(name);
  return slug ? `${isHi ? "/hi" : ""}/nakshatra/${slug}` : null;
};

/** Moon within this many degrees of a sign's edge: about two hours of the Moon's motion. */
export const SIGN_BOUNDARY_DEGREES = 1;

/** True when the Moon's degree inside its sign (0-30) sits close to the start or end of the sign. */
export const isNearSignBoundary = (degree: unknown): boolean =>
  typeof degree === "number" && Number.isFinite(degree) && degree >= 0 && degree < 30 &&
  (degree < SIGN_BOUNDARY_DEGREES || degree > 30 - SIGN_BOUNDARY_DEGREES);
