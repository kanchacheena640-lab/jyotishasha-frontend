// lib/analyticsAttribution.ts

/**
 * Task 2C -- website attribution capture: landing page, incoming UTM
 * (source/medium/campaign only -- not content/term, Task 1 confirmed
 * the backend campaign_context envelope doesn't accept them yet), a
 * privacy-safe referrer, and a minimal, deterministic source/medium
 * classification.
 *
 * Captured ONCE per analytics session (see analyticsSession.ts) and
 * then persisted -- later SPA navigation, even after UTM parameters
 * disappear from the URL, must never overwrite the first capture. This
 * mirrors GA4's own "first-touch-per-session" idea, but is entirely a
 * separate, first-party concept -- it does not read or write anything
 * GA4/GTM owns.
 *
 * IMPORTANT CONTRACT BOUNDARY (Task 2C S3): the backend's
 * campaign_context envelope (modules/activity_events/event_schemas.py,
 * CAMPAIGN_CONTEXT_ALLOWED_KEYS) accepts exactly
 * {utm_source, utm_medium, utm_campaign, referrer, medium} -- it does
 * NOT accept landing_page. This module stores landingPage locally (for
 * future event `properties` use by a later instrumentation task) but
 * buildCampaignContextFromAttribution() below never includes it. The
 * `classification` field (direct/referral/campaign) is similarly a
 * LOCAL-only concept -- not part of the backend contract at all, never
 * sent anywhere in this task; kept only as a small, deterministic,
 * already-computed convenience for whatever a future producer task
 * decides to do with it (e.g. an event property), not invented as a
 * new backend field.
 *
 * Every function here is pure and framework-free -- see
 * analyticsSession.ts's module docstring for why (same rationale,
 * same testing approach).
 */

export const ANALYTICS_ATTRIBUTION_STORAGE_KEY = "jyotishasha:analytics:attribution";

// Matches modules/activity_events/ingestion_validation.py's
// MAX_STRING_VALUE_LENGTH on the backend -- a value capped here can
// never be the reason a whole anonymous-event request is rejected
// structurally by validate_context_dict() there.
const MAX_ATTRIBUTION_VALUE_LENGTH = 256;

export interface AnalyticsStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * S6 classification -- deliberately minimal, three deterministic
 * outcomes, no invented organic-search detection:
 *   "campaign" -- an explicit utm_source, utm_medium, or utm_campaign
 *                 is present. Explicit UTM values always win first.
 *   "referral" -- no UTM, but a valid http(s) referrer whose origin
 *                 differs from this site's own origin was captured.
 *   "direct"   -- no UTM and no external referrer (includes: no
 *                 referrer at all, a same-origin/internal referrer, or
 *                 a malformed/unsupported referrer that was omitted).
 * Nothing attempts to distinguish a search engine from any other
 * external referrer -- Task 2C S6 explicitly asks NOT to invent that
 * without an audited rule; detailed channel grouping (organic search
 * vs. social vs. other referral, etc.) stays GA4's job.
 */
export type SourceMediumClassification = "direct" | "referral" | "campaign";

export interface AnalyticsAttribution {
  /** pathname only (locale prefix retained, e.g. "/hi/free-kundali") --
   * never the full URL, never a query string, never a fragment. */
  landingPage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  /** origin + pathname only -- query, fragment, and any userinfo/
   * credentials are always stripped before this is ever stored. */
  referrer?: string;
  classification: SourceMediumClassification;
}

function normalizeUtmValue(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return trimmed.length > MAX_ATTRIBUTION_VALUE_LENGTH
    ? trimmed.slice(0, MAX_ATTRIBUTION_VALUE_LENGTH)
    : trimmed;
}

/** Reads ONLY utm_source/utm_medium/utm_campaign from a query string --
 * never an arbitrary parameter, and never utm_content/utm_term (Task 1:
 * not currently backend-supported, out of scope for this task). */
export function captureUtmParams(search: string): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} {
  const params = new URLSearchParams(search || "");
  return {
    utmSource: normalizeUtmValue(params.get("utm_source")),
    utmMedium: normalizeUtmValue(params.get("utm_medium")),
    utmCampaign: normalizeUtmValue(params.get("utm_campaign")),
  };
}

/** pathname only. Guards against a caller accidentally passing a full
 * href (extracts just the pathname in that case) as well as the normal
 * case of already receiving a bare pathname; either way, any query
 * string or fragment is always stripped. */
export function normalizeLandingPage(pathname: string): string {
  if (!pathname) return "/";
  if (pathname.includes("://")) {
    try {
      return new URL(pathname).pathname;
    } catch {
      // Not actually a parseable absolute URL despite containing
      // "://" -- fall through to the plain-pathname handling below.
    }
  }
  return pathname.split("?")[0].split("#")[0];
}

/** origin + pathname ONLY -- Task 2C S5's privacy requirement. Returns
 * undefined for a malformed value, a non-http(s) scheme, or an empty
 * referrer -- an unsupported referrer is omitted, never persisted in
 * any partial/raw form. The `origin` half of the return value is used
 * only for classification (never itself sent anywhere); `full` is the
 * value actually stored/transmitted. */
export function normalizeReferrer(
  raw: string | null | undefined
): { full: string; origin: string } | undefined {
  if (!raw) return undefined;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return undefined;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
  // url.host (and the reconstructed origin) never includes
  // username/password -- credentials are stripped by construction, not
  // by an extra scrub step.
  const origin = `${url.protocol}//${url.host}`;
  const full = `${origin}${url.pathname}`;
  return {
    full: full.length > MAX_ATTRIBUTION_VALUE_LENGTH ? full.slice(0, MAX_ATTRIBUTION_VALUE_LENGTH) : full,
    origin,
  };
}

export function classifySourceMedium(input: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerOrigin?: string;
  currentOrigin?: string;
}): SourceMediumClassification {
  if (input.utmSource || input.utmMedium || input.utmCampaign) return "campaign";
  if (input.referrerOrigin && input.referrerOrigin !== input.currentOrigin) return "referral";
  return "direct";
}

function isValidClassification(value: unknown): value is SourceMediumClassification {
  return value === "direct" || value === "referral" || value === "campaign";
}

/** Never throws. Malformed JSON, a non-object, a missing/invalid
 * `landingPage`/`classification`, or an optional field present with the
 * wrong type -> null (treated as "no valid stored attribution", so the
 * caller recreates it fresh rather than trusting a corrupted value). */
function parseAttribution(raw: string): AnalyticsAttribution | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const obj = parsed as Record<string, unknown>;

  if (typeof obj.landingPage !== "string") return null;
  if (!isValidClassification(obj.classification)) return null;
  for (const key of ["utmSource", "utmMedium", "utmCampaign", "referrer"]) {
    if (key in obj && obj[key] !== undefined && typeof obj[key] !== "string") return null;
  }

  return {
    landingPage: obj.landingPage,
    utmSource: obj.utmSource as string | undefined,
    utmMedium: obj.utmMedium as string | undefined,
    utmCampaign: obj.utmCampaign as string | undefined,
    referrer: obj.referrer as string | undefined,
    classification: obj.classification,
  };
}

/** Read-once-then-persist, exactly like getOrCreateAnalyticsSessionId()
 * (analyticsSession.ts): if a valid attribution object is already
 * stored, it is returned UNCHANGED -- the current URL/referrer/pathname
 * are never consulted, so later SPA navigation (even after UTM
 * parameters disappear from the URL, even to a different pathname)
 * never overwrites the first-captured attribution (Task 2C S3/S4/G).
 * Only when nothing valid is stored yet does this capture fresh
 * attribution from the given context and persist it.
 *
 * Never throws -- returns null if storage access itself fails
 * (Task 2C S8/S10, same contract as getOrCreateAnalyticsSessionId). */
export function getOrCreateAttribution(
  storage: AnalyticsStorageLike,
  context: { search: string; referrer: string; pathname: string; currentOrigin: string }
): AnalyticsAttribution | null {
  try {
    const existingRaw = storage.getItem(ANALYTICS_ATTRIBUTION_STORAGE_KEY);
    if (existingRaw) {
      const parsed = parseAttribution(existingRaw);
      if (parsed) return parsed;
      // Corrupted stored value -- fall through and recapture fresh
      // rather than propagating a broken read forever.
    }

    const utm = captureUtmParams(context.search);
    const normalizedReferrer = normalizeReferrer(context.referrer);
    const classification = classifySourceMedium({
      ...utm,
      referrerOrigin: normalizedReferrer?.origin,
      currentOrigin: context.currentOrigin,
    });

    const attribution: AnalyticsAttribution = {
      landingPage: normalizeLandingPage(context.pathname),
      ...utm,
      referrer: normalizedReferrer?.full,
      classification,
    };

    storage.setItem(ANALYTICS_ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return null;
  }
}

/** Read-only lookup for callers (e.g. the event client) that must never
 * themselves create/overwrite attribution -- only the init seam
 * (getOrCreateAttribution, called once at session start) does that.
 * Never throws; returns null if nothing valid is stored. */
export function readStoredAttribution(storage: AnalyticsStorageLike): AnalyticsAttribution | null {
  try {
    const raw = storage.getItem(ANALYTICS_ATTRIBUTION_STORAGE_KEY);
    return raw ? parseAttribution(raw) : null;
  } catch {
    return null;
  }
}

/** Derives the backend's campaign_context shape from stored attribution
 * -- Task 2C S3/S9's explicit contract boundary: landingPage and
 * classification are NEVER included (the backend envelope doesn't
 * accept either -- CAMPAIGN_CONTEXT_ALLOWED_KEYS is exactly
 * {utm_source, utm_medium, utm_campaign, referrer, medium}, and this
 * task does not send a "medium" value at all -- no classification-to-
 * "medium" mapping is invented here, since S6 explicitly warns against
 * building attribution logic beyond what's asked for). Returns
 * undefined (not an empty object) when there is nothing to send, so
 * callers can omit the field entirely -- matching the backend's own
 * "campaign_context must remain optional" contract. */
export function buildCampaignContextFromAttribution(
  attribution: AnalyticsAttribution | null
): Record<string, string> | undefined {
  if (!attribution) return undefined;
  const context: Record<string, string> = {};
  if (attribution.utmSource) context.utm_source = attribution.utmSource;
  if (attribution.utmMedium) context.utm_medium = attribution.utmMedium;
  if (attribution.utmCampaign) context.utm_campaign = attribution.utmCampaign;
  if (attribution.referrer) context.referrer = attribution.referrer;
  return Object.keys(context).length > 0 ? context : undefined;
}
