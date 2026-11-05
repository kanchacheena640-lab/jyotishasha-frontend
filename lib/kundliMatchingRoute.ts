// lib/kundliMatchingRoute.ts
// The Free Kundli Matching landing lives at /kundli-matching (EN) and /hi/kundli-matching (HI).
// The old landing URLs /love, /hi/love and /en/love answer with a permanent 308 redirect (next.config.js).
// Only the landing moved: the session result pages (/love/result, /love/mangal-dosh, ...) and the ₹199
// product page (/love/report/relationship_future_report) keep their /love/* URLs.
export const KUNDLI_MATCHING_PATH = "/kundli-matching";

/** Locale-aware landing path: "/kundli-matching" or "/hi/kundli-matching". */
export const kundliMatchingHref = (isHi: boolean) => `${isHi ? "/hi" : ""}${KUNDLI_MATCHING_PATH}`;
