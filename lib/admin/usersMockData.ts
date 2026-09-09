// lib/admin/usersMockData.ts
//
// Users Module U2 -- what remains of U1's mock data after the real
// /admin/api/users integration (lib/admin/usersApi.ts) replaced every
// U2-supported field (user rows, summary counts, search/basic-filter
// logic all deleted from this file -- see git history for the U1
// version if ever needed for reference).
//
// Everything still exported here is explicitly-labeled PLACEHOLDER
// content for the advanced filter groups (Ask Now Concern, Birth
// Astrology, Dasha, Sade Sati, Yog & Dosh) that UsersFilterPanel.tsx
// renders in a disabled "Coming in U3/U4/U5" state -- these lists are
// never sent to the real API and never influence a real query. They
// exist purely so that shell doesn't look empty before U3/U4/U5 wire it
// up for real. Do NOT reintroduce mock user rows/filtering logic here --
// that concern now belongs entirely to lib/admin/usersApi.ts.

export type PlanetId =
  | "sun" | "moon" | "mars" | "mercury" | "jupiter" | "venus" | "saturn" | "rahu" | "ketu";

export const PLANETS: { id: PlanetId; label: string }[] = [
  { id: "sun", label: "Sun" },
  { id: "moon", label: "Moon" },
  { id: "mars", label: "Mars" },
  { id: "mercury", label: "Mercury" },
  { id: "jupiter", label: "Jupiter" },
  { id: "venus", label: "Venus" },
  { id: "saturn", label: "Saturn" },
  { id: "rahu", label: "Rahu" },
  { id: "ketu", label: "Ketu" },
];

export const UPCOMING_WINDOWS: { id: string; label: string }[] = [
  { id: "30d", label: "Next 30 Days" },
  { id: "3m", label: "Next 3 Months" },
  { id: "6m", label: "Next 6 Months" },
  { id: "1y", label: "Next 1 Year" },
];

export const RASHI_OPTIONS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

export const NAKSHATRA_OPTIONS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

export const MOCK_SADE_SATI_PHASES = ["Rising Phase (First)", "Peak Phase (Second)", "Setting Phase (Third)"];

export interface ConcernCategoryOption {
  id: string;
  label: string;
}

// MOCK -- U5B: the real "Ask Now Concern" filter now fetches its option
// list live from the backend's DB-backed ask_now_concern_categories
// master (lib/admin/usersApi.ts::fetchAskNowConcernCategories(), U5A's
// GET /admin/api/users/asknow-concerns) -- this static preview list is
// no longer referenced by UsersFilterPanel.tsx or anywhere else. Left
// defined here (nothing else references it) rather than deleted,
// matching the exact precedent already established for MOCK_TRAITS/
// MOCK_SADE_SATI_PHASES above.
export const MOCK_CONCERN_CATEGORIES: ConcernCategoryOption[] = [
  { id: "love", label: "Love & Relationship" },
  { id: "breakup", label: "Breakup" },
  { id: "marriage", label: "Marriage / Marriage Delay" },
  { id: "marital_conflict", label: "Marital Conflict / Divorce" },
  { id: "job_career", label: "Job & Career" },
  { id: "business", label: "Business" },
  { id: "money_debt", label: "Money / Debt" },
  { id: "property", label: "Property" },
  { id: "childbirth", label: "Childbirth / Children" },
  { id: "health", label: "Health & Mental Wellbeing" },
  { id: "education", label: "Education / Foreign Career & Settlement" },
  { id: "spiritual", label: "Spiritual / Dosh / Remedies" },
  { id: "other", label: "Other" },
];

export interface TraitOption {
  id: string;
  label: string;
  group: string;
}

// MOCK -- a generic, extensible trait catalog (Yog / Dosh / Panch
// Mahapurush), placeholder only for the disabled Yog & Dosh filter
// group (U5+). Never sent to /admin/api/users.
export const MOCK_TRAITS: TraitOption[] = [
  { id: "mangal_dosh", label: "Mangal Dosh", group: "Dosh" },
  { id: "kaal_sarp_dosh", label: "Kaal Sarp Dosh", group: "Dosh" },
  { id: "pitra_dosh", label: "Pitra Dosh", group: "Dosh" },
  { id: "guru_chandal_dosh", label: "Guru Chandal Dosh", group: "Dosh" },
  { id: "grahan_dosh", label: "Grahan Dosh", group: "Dosh" },
  { id: "gaj_kesari_yog", label: "Gaj Kesari Yog", group: "Yog" },
  { id: "budhaditya_yog", label: "Budhaditya Yog", group: "Yog" },
  { id: "lakshmi_yog", label: "Lakshmi Yog", group: "Yog" },
  { id: "raj_yog", label: "Raj Yog", group: "Yog" },
  { id: "dhan_yog", label: "Dhan Yog", group: "Yog" },
  { id: "neecha_bhanga_raj_yog", label: "Neecha Bhanga Raj Yog", group: "Yog" },
  { id: "vipreet_raj_yog", label: "Vipreet Raj Yog", group: "Yog" },
  { id: "ruchaka", label: "Ruchaka", group: "Panch Mahapurush" },
  { id: "bhadra", label: "Bhadra", group: "Panch Mahapurush" },
  { id: "hamsa", label: "Hamsa", group: "Panch Mahapurush" },
  { id: "malavya", label: "Malavya", group: "Panch Mahapurush" },
  { id: "shasha", label: "Shasha", group: "Panch Mahapurush" },
];
