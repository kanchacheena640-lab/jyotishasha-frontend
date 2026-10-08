// lib/chhath/cities.ts
//
// City keys accepted by POST /api/festivals/chhath (backend
// services/festivals/chhath_engine.py CITIES). Keys and order must stay in
// sync with the backend -- an unknown key is rejected with 400 INVALID_CITY.
// Coordinates live in the backend only; the page sends the key.

export interface ChhathCity {
  key: string;
  en: string;
  hi: string;
}

export const CHHATH_DEFAULT_CITY = "patna";

export const CHHATH_CITIES: readonly ChhathCity[] = [
  { key: "patna", en: "Patna", hi: "पटना" },
  { key: "gaya", en: "Gaya", hi: "गया" },
  { key: "muzaffarpur", en: "Muzaffarpur", hi: "मुजफ्फरपुर" },
  { key: "bhagalpur", en: "Bhagalpur", hi: "भागलपुर" },
  { key: "darbhanga", en: "Darbhanga", hi: "दरभंगा" },
  { key: "ranchi", en: "Ranchi", hi: "रांची" },
  { key: "jamshedpur", en: "Jamshedpur", hi: "जमशेदपुर" },
  { key: "varanasi", en: "Varanasi", hi: "वाराणसी" },
  { key: "gorakhpur", en: "Gorakhpur", hi: "गोरखपुर" },
  { key: "prayagraj", en: "Prayagraj", hi: "प्रयागराज" },
  { key: "lucknow", en: "Lucknow", hi: "लखनऊ" },
  { key: "delhi", en: "New Delhi", hi: "नई दिल्ली" },
  { key: "kolkata", en: "Kolkata", hi: "कोलकाता" },
  { key: "mumbai", en: "Mumbai", hi: "मुंबई" },
  { key: "pune", en: "Pune", hi: "पुणे" },
  { key: "surat", en: "Surat", hi: "सूरत" },
  { key: "ahmedabad", en: "Ahmedabad", hi: "अहमदाबाद" },
  { key: "bengaluru", en: "Bengaluru", hi: "बेंगलुरु" },
  { key: "hyderabad", en: "Hyderabad", hi: "हैदराबाद" },
  { key: "chennai", en: "Chennai", hi: "चेन्नई" },
];

export function isChhathCity(key: string): boolean {
  return CHHATH_CITIES.some((c) => c.key === key);
}

export function chhathCityName(key: string, lang: "en" | "hi"): string {
  const city = CHHATH_CITIES.find((c) => c.key === key);
  return city ? city[lang] : key;
}
