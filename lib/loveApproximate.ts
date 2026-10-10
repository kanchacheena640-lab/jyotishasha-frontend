// lib/loveApproximate.ts
// Free love-match result: is the Ashtakoot score approximate (partner's birth time or place missing)?
//
// Contract (backend /api/love/report, Ashtakoot Phase 1): `data.ashtakoot.approximate` and
// `data.verdict.approximate` are booleans -- true when the partner's Moon had to be estimated from the
// date of birth alone. An older backend omits both; then the only fact we can rely on is the request
// itself (the partner's birth time was left blank). Dependency-free so standalone tests can import it.

export type LoveScorePrecision = "approximate" | "precise" | "unknown";

const isBlank = (v: unknown) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");

/**
 * "approximate" -> show the warning. "precise" -> the backend confirmed full details. "unknown" -> neither
 * the backend nor the request says; show nothing rather than claim either.
 */
export function loveScorePrecision(summary: unknown, payload: unknown): LoveScorePrecision {
  const s = (summary && typeof summary === "object" ? summary : {}) as {
    ashtakoot?: { approximate?: unknown };
    verdict?: { approximate?: unknown };
  };
  const flags = [s.ashtakoot?.approximate, s.verdict?.approximate];
  if (flags.some((f) => f === true)) return "approximate";
  if (flags.some((f) => f === false)) return "precise";

  // Older backend without the flags: fall back to what was actually submitted.
  const p = (payload && typeof payload === "object" ? payload : {}) as { partner?: { tob?: unknown } };
  if (p.partner && typeof p.partner === "object" && isBlank(p.partner.tob)) return "approximate";
  return "unknown";
}

export const LOVE_APPROXIMATE_COPY = {
  en: {
    badge: "Approximate score",
    reason: "Partner's birth time or place is missing, so this score is only an estimate.",
  },
  hi: {
    badge: "अनुमानित स्कोर",
    reason: "साथी का जन्म समय या स्थान नहीं दिया गया, इसलिए यह स्कोर केवल अनुमान है।",
  },
} as const;
