// lib/adAttribution.ts

/**
 * Reports Ads P0.1 -- advertising attribution foundation.
 *
 * Captures the full UTM set (source/medium/campaign/content/term), the
 * paid-click identifiers (gclid/gbraid/wbraid/fbclid), the landing page
 * and a privacy-safe referrer, keeps them in first-party browser storage
 * for a bounded lifetime, and builds the snapshot the checkout sends to
 * POST /api/razorpay-order (`attribution`), where the backend persists it
 * against the internal Order (modules/payments/order_attribution.py).
 *
 * WHY A SEPARATE MODULE (not an extension of analyticsAttribution.ts):
 * lib/analyticsAttribution.ts and components/analytics/
 * WebsiteAnalyticsInit.tsx are frozen, by lib/consent.test.ts #14, as the
 * consent-INDEPENDENT first-party pipeline (they may never import
 * consent.ts). The persistent, multi-session store and the paid-click
 * identifiers are consent-sensitive, so all consent-aware logic lives
 * here; WebsiteAnalyticsInit only calls syncAdAttributionFromBrowser().
 * analyticsAttribution.ts's own session-scoped first-touch snapshot,
 * campaign_context, and anonymous-event behavior are all UNCHANGED.
 *
 * SEMANTICS
 *   first touch   -- the first visit recorded inside the storage
 *                    lifetime (whatever it carried, even nothing). Written
 *                    once; never overwritten until it expires.
 *   latest click  -- the most recent landing that carried a campaign
 *                    signal: any click identifier, or any utm_* value.
 *                    A later visit with NO signal (direct, organic,
 *                    plain referral) NEVER overwrites it. A later visit
 *                    with a DIFFERENT signal replaces it (last-click).
 *                    Refreshing the same landing URL is a no-op.
 *   effective     -- what the order is attributed to: latest click when
 *                    one exists, otherwise the first touch.
 *   lifetime      -- AD_ATTRIBUTION_TTL_MS (90 days) per touch, in
 *                    localStorage. sessionStorage would lose an ad click
 *                    the moment the tab closes.
 *
 * CONSENT (mirrors the existing Geo-Aware Consent rules, invents none)
 *   NORMAL / US_PRIVACY -- no Jyotishasha consent gate applies (same as
 *                          context/ConsentContext.tsx): store, UNLESS the
 *                          visitor has an explicit stored advertising:false
 *                          (e.g. via Cookie Settings), which is always
 *                          honored. No GPC/US opt-out mechanism is added.
 *   SAFE_FALLBACK       -- store only if the visitor's own stored choice
 *                          has advertising === true.
 *   EUROPE_CONSENT      -- Google's certified CMP is the sole authority
 *                          and its decision is not readable here, so this
 *                          fails CLOSED: nothing persistent is stored.
 *   When persistence is not allowed, the only attribution available to
 *   checkout is the existing session-scoped first-touch snapshot (UTM
 *   source/medium/campaign, landing page, referrer) -- exactly what the
 *   site already captured before this task; no click identifiers.
 *   A previously stored record is deleted if consent no longer allows it.
 *
 * PRIVACY: only the fields above ever enter storage or the checkout
 * payload. No name/email/phone/birth data, no session id, no user id.
 * Values are control-character-stripped, length-capped, click IDs are
 * charset-validated, and any value containing "@" (email-shaped) is
 * dropped. The backend re-validates all of this independently.
 *
 * Pure and framework-free like its sibling modules (storage is injected),
 * so lib/adAttribution.test.ts runs without a browser.
 */

import { readConsentGeoPolicyCookie, readStoredConsent, type ConsentState } from "./consent";
import type { ConsentGeoPolicy } from "./geo";
import { normalizeLandingPage, normalizeReferrer, readStoredAttribution, type AnalyticsAttribution } from "./analyticsAttribution";

export const AD_ATTRIBUTION_STORAGE_KEY = "jyotishasha:attribution:v1";
export const AD_ATTRIBUTION_VERSION = 1;
export const AD_ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
export const MAX_AD_ATTRIBUTION_VALUE_LENGTH = 256;

const CLICK_ID_RE = /^[A-Za-z0-9_\-.]{1,256}$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_RE = /[\u0000-\u001f\u007f]/g;

export interface AdStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem?(key: string): void;
}

/** The nine captured query parameters, camelCase. */
export interface AdParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
}

export interface AdTouch extends AdParams {
  /** pathname only (locale prefix kept) -- never a query string. */
  landingPage: string;
  /** origin + pathname of an EXTERNAL referrer only. */
  referrer?: string;
  /** ISO timestamp -- drives the TTL. */
  capturedAt: string;
}

export interface AdAttributionRecord {
  version: typeof AD_ATTRIBUTION_VERSION;
  firstTouch: AdTouch;
  latestClick: AdTouch | null;
}

const PARAM_KEYS: ReadonlyArray<keyof AdParams> = [
  "utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm",
  "gclid", "gbraid", "wbraid", "fbclid",
];

function normalizeText(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(CONTROL_CHARS_RE, "").trim();
  if (!cleaned) return undefined;
  if (cleaned.includes("@")) return undefined; // email-shaped: never enters attribution
  return cleaned.length > MAX_AD_ATTRIBUTION_VALUE_LENGTH ? cleaned.slice(0, MAX_AD_ATTRIBUTION_VALUE_LENGTH) : cleaned;
}

/** Click identifiers are opaque tokens: a wrong charset or an oversized
 * value is DROPPED (truncating one would silently corrupt it). */
function normalizeClickId(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return CLICK_ID_RE.test(trimmed) ? trimmed : undefined;
}

/** Reads ONLY the nine allowlisted parameters from a query string. */
export function captureAdvertisingParams(search: string): AdParams {
  const q = new URLSearchParams(search || "");
  return {
    utmSource: normalizeText(q.get("utm_source")),
    utmMedium: normalizeText(q.get("utm_medium")),
    utmCampaign: normalizeText(q.get("utm_campaign")),
    utmContent: normalizeText(q.get("utm_content")),
    utmTerm: normalizeText(q.get("utm_term")),
    gclid: normalizeClickId(q.get("gclid")),
    gbraid: normalizeClickId(q.get("gbraid")),
    wbraid: normalizeClickId(q.get("wbraid")),
    fbclid: normalizeClickId(q.get("fbclid")),
  };
}

/** A campaign signal: any click identifier or any utm_* value. */
export function hasAdSignal(params: AdParams): boolean {
  return PARAM_KEYS.some((k) => !!params[k]);
}

export function isAdvertisingIdentifierStorageAllowed(
  policy: ConsentGeoPolicy,
  storedConsent: ConsentState | null
): boolean {
  // No Jyotishasha consent gate applies, BUT a genuine explicit choice is
  // always honored (context/ConsentContext.tsx: "a genuine explicit
  // choice, however it was made, is always honored") -- so an explicit
  // stored advertising:false blocks storage here too.
  if (policy === "NORMAL" || policy === "US_PRIVACY") return storedConsent === null || storedConsent.advertising !== false;
  if (policy === "SAFE_FALLBACK") return storedConsent?.advertising === true;
  return false; // EUROPE_CONSENT (and anything unrecognized): fail closed
}

function sameSignal(a: AdParams, b: AdParams): boolean {
  return PARAM_KEYS.every((k) => (a[k] || "") === (b[k] || ""));
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function parseTouch(value: unknown, now: number): AdTouch | null {
  if (!value || typeof value !== "object") return null;
  const o = value as Record<string, unknown>;
  if (!isString(o.landingPage) || !isString(o.capturedAt)) return null;
  const capturedMs = Date.parse(o.capturedAt);
  if (Number.isNaN(capturedMs) || now - capturedMs > AD_ATTRIBUTION_TTL_MS || capturedMs - now > 24 * 60 * 60 * 1000) {
    return null; // expired, unparseable, or from the far future
  }
  const touch: AdTouch = { landingPage: o.landingPage, capturedAt: o.capturedAt };
  for (const key of PARAM_KEYS) {
    const v = o[key];
    if (v === undefined) continue;
    if (!isString(v)) return null;
    (touch as unknown as Record<string, string>)[key] = v;
  }
  if (o.referrer !== undefined) {
    if (!isString(o.referrer)) return null;
    touch.referrer = o.referrer;
  }
  return touch;
}

/** Never throws. Null for missing/corrupt/wrong-version storage or when
 * every touch has expired. An expired latest click alone is dropped and the
 * first touch kept; an expired first touch with a valid latest click keeps
 * the click (as both touches). */
export function readAdAttribution(storage: AdStorageLike, now: number = Date.now()): AdAttributionRecord | null {
  try {
    const raw = storage.getItem(AD_ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown> | null;
    if (!parsed || typeof parsed !== "object" || parsed.version !== AD_ATTRIBUTION_VERSION) return null;
    const latestClick = parsed.latestClick == null ? null : parseTouch(parsed.latestClick, now);
    // If the ORIGINAL first touch has aged out but a valid latest click
    // remains, that click is the earliest still-valid touch: a valid ad
    // click must never be lost just because an older visit expired.
    const firstTouch = parseTouch(parsed.firstTouch, now) ?? latestClick;
    if (!firstTouch) return null;
    return { version: AD_ATTRIBUTION_VERSION, firstTouch, latestClick };
  } catch {
    return null;
  }
}

function buildTouch(
  params: AdParams,
  ctx: { referrer: string; pathname: string; currentOrigin: string },
  now: number
): AdTouch {
  const touch: AdTouch = { landingPage: normalizeLandingPage(ctx.pathname), capturedAt: new Date(now).toISOString() };
  for (const key of PARAM_KEYS) {
    const v = params[key];
    if (v) (touch as unknown as Record<string, string>)[key] = v;
  }
  const ref = normalizeReferrer(ctx.referrer);
  if (ref && ref.origin !== ctx.currentOrigin) touch.referrer = ref.full; // internal referrers are noise
  return touch;
}

export type AdAttributionSyncAction =
  | "skipped_consent"
  | "created"
  | "updated_latest_click"
  | "unchanged"
  | "storage_error";

export interface AdAttributionSyncContext {
  search: string;
  referrer: string;
  pathname: string;
  currentOrigin: string;
  policy: ConsentGeoPolicy;
  storedConsent: ConsentState | null;
  now?: number;
}

/** Called once per page load (WebsiteAnalyticsInit). Never throws. */
export function syncAdAttribution(
  storage: AdStorageLike,
  ctx: AdAttributionSyncContext
): { action: AdAttributionSyncAction; record: AdAttributionRecord | null } {
  const now = ctx.now ?? Date.now();
  try {
    if (!isAdvertisingIdentifierStorageAllowed(ctx.policy, ctx.storedConsent)) {
      // Consent absent or withdrawn: nothing persistent may remain.
      try { storage.removeItem?.(AD_ATTRIBUTION_STORAGE_KEY); } catch { /* never throws into product code */ }
      return { action: "skipped_consent", record: null };
    }

    const params = captureAdvertisingParams(ctx.search);
    const signal = hasAdSignal(params);
    const existing = readAdAttribution(storage, now);
    const touch = buildTouch(params, ctx, now);

    if (!existing) {
      const record: AdAttributionRecord = {
        version: AD_ATTRIBUTION_VERSION,
        firstTouch: touch,
        latestClick: signal ? touch : null,
      };
      storage.setItem(AD_ATTRIBUTION_STORAGE_KEY, JSON.stringify(record));
      return { action: "created", record };
    }

    // A visit with no campaign signal never overwrites a valid click, and
    // re-loading the same landing URL never resets its lifetime.
    if (!signal || (existing.latestClick && sameSignal(existing.latestClick, params))) {
      return { action: "unchanged", record: existing };
    }

    const record: AdAttributionRecord = { ...existing, latestClick: touch };
    storage.setItem(AD_ATTRIBUTION_STORAGE_KEY, JSON.stringify(record));
    return { action: "updated_latest_click", record };
  } catch {
    return { action: "storage_error", record: null };
  }
}

// ---------------------------------------------------------------------
// Checkout snapshot -- the wire shape POSTed as `attribution`.
// ---------------------------------------------------------------------

export type OrderAttributionType = "latest_click" | "first_touch" | "none";

export interface OrderAttributionTouchWire {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
}

export interface OrderAttributionPayload extends OrderAttributionTouchWire {
  attribution_type: OrderAttributionType;
  /** Present only when the effective attribution is a latest click, so the
   * original first touch is not lost. */
  first_touch?: OrderAttributionTouchWire;
  consent: {
    geo_policy: ConsentGeoPolicy;
    /** null = no explicit, readable choice (never guessed). */
    analytics: boolean | null;
    advertising: boolean | null;
  };
}

const WIRE_KEY: Record<keyof AdParams, keyof OrderAttributionTouchWire> = {
  utmSource: "utm_source", utmMedium: "utm_medium", utmCampaign: "utm_campaign",
  utmContent: "utm_content", utmTerm: "utm_term",
  gclid: "gclid", gbraid: "gbraid", wbraid: "wbraid", fbclid: "fbclid",
};

function touchToWire(touch: AdTouch | (AdParams & { landingPage?: string; referrer?: string })): OrderAttributionTouchWire {
  const wire: OrderAttributionTouchWire = {};
  for (const key of PARAM_KEYS) {
    const v = touch[key];
    if (v) wire[WIRE_KEY[key]] = v;
  }
  if (touch.landingPage) wire.landing_page = touch.landingPage;
  if (touch.referrer) wire.referrer = touch.referrer;
  return wire;
}

/** The existing session-scoped first-touch snapshot, reshaped. It never
 * carries click identifiers or utm_content/term (unchanged Task 2C). */
function sessionTouch(session: AnalyticsAttribution | null): (AdParams & { landingPage?: string; referrer?: string }) | null {
  if (!session) return null;
  return {
    utmSource: session.utmSource,
    utmMedium: session.utmMedium,
    utmCampaign: session.utmCampaign,
    landingPage: session.landingPage,
    referrer: session.classification === "direct" ? undefined : session.referrer,
  };
}

/** Always returns an object: "captured, nothing found" (attribution_type
 * "none") must stay distinguishable from "old client, nothing sent". */
export function buildOrderAttributionPayload(input: {
  record: AdAttributionRecord | null;
  sessionAttribution: AnalyticsAttribution | null;
  policy: ConsentGeoPolicy;
  storedConsent: ConsentState | null;
}): OrderAttributionPayload {
  const { policy, storedConsent } = input;
  // Re-checked at checkout time: a record must not be used if consent no
  // longer allows it, even if it is still physically in storage.
  const record = input.record && isAdvertisingIdentifierStorageAllowed(policy, storedConsent) ? input.record : null;
  const knownChoice = policy !== "EUROPE_CONSENT" && storedConsent !== null;

  let type: OrderAttributionType = "none";
  let effective: (AdParams & { landingPage?: string; referrer?: string }) | null = null;
  let firstTouchWire: OrderAttributionTouchWire | undefined;

  if (record?.latestClick) {
    type = "latest_click";
    effective = record.latestClick;
    firstTouchWire = touchToWire(record.firstTouch);
  } else {
    effective = record?.firstTouch ?? sessionTouch(input.sessionAttribution);
    type = effective && hasAdSignal(effective) ? "first_touch" : "none";
  }

  return {
    attribution_type: type,
    ...(effective ? touchToWire(effective) : {}),
    ...(firstTouchWire ? { first_touch: firstTouchWire } : {}),
    consent: {
      geo_policy: policy,
      analytics: knownChoice ? storedConsent!.analytics : null,
      advertising: knownChoice ? storedConsent!.advertising : null,
    },
  };
}

// ---------------------------------------------------------------------
// Browser wrappers (the only DOM-touching code). Both never throw.
// ---------------------------------------------------------------------

function readBrowserConsentContext(): { policy: ConsentGeoPolicy; storedConsent: ConsentState | null } {
  const policy = readConsentGeoPolicyCookie(document.cookie);
  // EUROPE_CONSENT never reads the local decision (see ConsentContext).
  const storedConsent = policy === "EUROPE_CONSENT" ? null : readStoredConsent(window.localStorage);
  return { policy, storedConsent };
}

/** Called from WebsiteAnalyticsInit -- the single initialization seam. */
export function syncAdAttributionFromBrowser(pathname: string): void {
  try {
    if (typeof window === "undefined") return;
    const { policy, storedConsent } = readBrowserConsentContext();
    syncAdAttribution(window.localStorage, {
      search: window.location.search,
      referrer: document.referrer,
      pathname: pathname || window.location.pathname,
      currentOrigin: window.location.origin,
      policy,
      storedConsent,
    });
  } catch {
    // Attribution must never break the product shell.
  }
}

/** Called by the checkouts at order-creation time. `undefined` only when
 * there is no browser at all or storage itself throws. */
export function getBrowserOrderAttribution(): OrderAttributionPayload | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    const { policy, storedConsent } = readBrowserConsentContext();
    return buildOrderAttributionPayload({
      record: readAdAttribution(window.localStorage),
      sessionAttribution: readStoredAttribution(window.sessionStorage),
      policy,
      storedConsent,
    });
  } catch {
    return undefined;
  }
}
