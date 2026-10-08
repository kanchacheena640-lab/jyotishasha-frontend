// lib/chhath/api.ts
//
// Client + server fetch helper for POST /api/festivals/chhath
// (backend CHHATH-02C contract: services/festivals/chhath_engine.py).
//
// Types mirror ONLY the response fields the page renders. Internal
// diagnostics (diagnostics, review_reasons, flags detail) are typed loosely
// and never rendered verbatim.
//
// Relative imports only -- this module is compiled standalone by
// lib/chhathPage.test.ts.

export const CHHATH_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

export const CHHATH_MIN_YEAR = 2000;
export const CHHATH_MAX_YEAR = 2100;

export type ChhathLanguage = "en" | "hi";

export const CHHATH_DAY_KEYS = ["nahay_khay", "kharna", "sandhya_arghya", "usha_arghya"] as const;
export type ChhathDayKey = (typeof CHHATH_DAY_KEYS)[number];

export interface ChhathTithi {
  number: number;
  paksha: string;
  name: string;
  name_en: string;
  name_hi: string;
}

export interface ChhathDay {
  key: ChhathDayKey;
  name: string;
  name_en: string;
  name_hi: string;
  date: string; // YYYY-MM-DD
  weekday: string;
  weekday_local: string;
  sunrise: string; // HH:MM IST
  sunset: string; // HH:MM IST
  tithi_at_sunrise: ChhathTithi;
  arghya_time?: string;
  arghya_event?: "sunset" | "sunrise";
}

export interface ChhathCandidate {
  rule_id: string;
  label: string;
  reference_city: string;
  evaluated_at: string;
  is_primary: boolean;
  sandhya_arghya: string | null;
  matching_days: string[];
  dates: Record<ChhathDayKey, string> | null;
}

export interface ChhathResponse {
  festival: "chhath";
  type: string;
  language: ChhathLanguage;
  year: number;
  status: "confirmed" | "needs_review";
  source: string;
  rule_version: string;
  rule: {
    rule_id: string;
    policy_status: string;
    policy_unapproved: string[];
    reference_location: { city: string; name_en: string; lat: number; lon: number };
  };
  verification: { status_scope: string; regional_observance_verified: boolean; note: string };
  location: {
    city: string;
    name: string;
    name_en: string;
    name_hi: string;
    lat: number;
    lon: number;
    tz: string;
  };
  timezone_display: string;
  lunar_month: {
    amanta: string;
    paksha: string;
    is_adhik: boolean;
    adhik_kartik_skipped: boolean;
    new_moon_ist: string;
  };
  shashthi: { start_ist: string; end_ist: string };
  days: ChhathDay[];
  flags: Record<string, boolean>;
  candidates: ChhathCandidate[];
}

/**
 * Public subset of the response that the page renders. Only this shape is
 * passed from the server component to the client component (and therefore
 * serialized into the HTML) -- backend diagnostics, review reasons, flags
 * and policy metadata stay out of the page.
 */
export interface ChhathCandidateView {
  is_primary: boolean;
  sandhya_arghya: string | null;
}

export interface ChhathView {
  year: number;
  status: "confirmed" | "needs_review";
  language: ChhathLanguage;
  location: { city: string; name: string; name_en: string; name_hi: string };
  lunar_month: { amanta: string; paksha: string; is_adhik: boolean };
  shashthi: { start_ist: string; end_ist: string };
  days: ChhathDay[];
  candidates: ChhathCandidateView[];
}

export function toChhathView(r: ChhathResponse): ChhathView {
  return {
    year: r.year,
    status: r.status,
    language: r.language,
    location: {
      city: r.location.city,
      name: r.location.name,
      name_en: r.location.name_en,
      name_hi: r.location.name_hi,
    },
    lunar_month: {
      amanta: r.lunar_month.amanta,
      paksha: r.lunar_month.paksha,
      is_adhik: r.lunar_month.is_adhik,
    },
    shashthi: { start_ist: r.shashthi.start_ist, end_ist: r.shashthi.end_ist },
    days: r.days.map((d) => ({
      key: d.key,
      name: d.name,
      name_en: d.name_en,
      name_hi: d.name_hi,
      date: d.date,
      weekday: d.weekday,
      weekday_local: d.weekday_local,
      sunrise: d.sunrise,
      sunset: d.sunset,
      tithi_at_sunrise: {
        number: d.tithi_at_sunrise.number,
        paksha: d.tithi_at_sunrise.paksha,
        name: d.tithi_at_sunrise.name,
        name_en: d.tithi_at_sunrise.name_en,
        name_hi: d.tithi_at_sunrise.name_hi,
      },
      ...(d.arghya_time ? { arghya_time: d.arghya_time } : {}),
      ...(d.arghya_event ? { arghya_event: d.arghya_event } : {}),
    })),
    candidates: r.candidates.map((c) => ({ is_primary: c.is_primary, sandhya_arghya: c.sandhya_arghya })),
  };
}

export class ChhathApiError extends Error {
  status: number;
  code: string | null;

  constructor(status: number, code: string | null, message?: string) {
    super(message || `Chhath API error ${status}${code ? ` (${code})` : ""}`);
    this.name = "ChhathApiError";
    this.status = status;
    this.code = code;
  }
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validates the parts of the payload the page depends on. A malformed
 * response is treated as a failure (the page shows its error state) --
 * dates are never patched, guessed or fabricated.
 */
export function parseChhathResponse(json: unknown): ChhathResponse {
  if (!isRecord(json) || json.festival !== "chhath") {
    throw new ChhathApiError(200, "MALFORMED_RESPONSE");
  }
  const days = json.days;
  if (!Array.isArray(days) || days.length !== CHHATH_DAY_KEYS.length) {
    throw new ChhathApiError(200, "MALFORMED_RESPONSE");
  }
  days.forEach((day, i) => {
    if (
      !isRecord(day) ||
      day.key !== CHHATH_DAY_KEYS[i] ||
      typeof day.date !== "string" ||
      !DATE_RE.test(day.date) ||
      typeof day.sunrise !== "string" ||
      !TIME_RE.test(day.sunrise) ||
      typeof day.sunset !== "string" ||
      !TIME_RE.test(day.sunset) ||
      !isRecord(day.tithi_at_sunrise)
    ) {
      throw new ChhathApiError(200, "MALFORMED_RESPONSE");
    }
  });
  if (typeof (days[2] as Record<string, unknown>).arghya_time !== "string" ||
      typeof (days[3] as Record<string, unknown>).arghya_time !== "string") {
    throw new ChhathApiError(200, "MALFORMED_RESPONSE");
  }
  if (!isRecord(json.location) || !isRecord(json.lunar_month) || !isRecord(json.shashthi)) {
    throw new ChhathApiError(200, "MALFORMED_RESPONSE");
  }
  if (json.status !== "confirmed" && json.status !== "needs_review") {
    throw new ChhathApiError(200, "MALFORMED_RESPONSE");
  }
  return {
    ...(json as unknown as ChhathResponse),
    candidates: Array.isArray(json.candidates) ? (json.candidates as ChhathCandidate[]) : [],
    flags: isRecord(json.flags) ? (json.flags as Record<string, boolean>) : {},
  };
}

export interface FetchChhathParams {
  year: number;
  city: string;
  language: ChhathLanguage;
  signal?: AbortSignal;
  /** Server render: cache with ISR revalidation. Browser: always fresh. */
  server?: boolean;
  timeoutMs?: number;
}

type NextRequestInit = RequestInit & { next?: { revalidate: number } };

export async function fetchChhath({
  year,
  city,
  language,
  signal,
  server = false,
  timeoutMs = server ? 25000 : 30000,
}: FetchChhathParams): Promise<ChhathResponse> {
  const timeoutController = new AbortController();
  const timer = setTimeout(() => timeoutController.abort(), timeoutMs);
  const onAbort = () => timeoutController.abort();
  signal?.addEventListener("abort", onAbort);

  const init: NextRequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year, city, language }),
    signal: timeoutController.signal,
    ...(server ? { next: { revalidate: 3600 } } : { cache: "no-store" as RequestCache }),
  };

  try {
    const res = await fetch(`${CHHATH_BACKEND_URL}/api/festivals/chhath`, init);
    if (!res.ok) {
      let code: string | null = null;
      try {
        const body = await res.json();
        code = isRecord(body) && typeof body.code === "string" ? body.code : null;
      } catch {
        code = null;
      }
      throw new ChhathApiError(res.status, code);
    }
    return parseChhathResponse(await res.json());
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}
