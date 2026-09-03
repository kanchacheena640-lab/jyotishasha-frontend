// lib/consent.ts

/**
 * Task 8 -- the consent contract: three independently-controllable
 * categories (necessary, analytics, advertising), versioned first-party
 * persistence, and the Google Consent Mode v2 mapping/push functions.
 *
 * CONSENT MODEL (Task 8 S3):
 *   necessary   -- always true, never a user choice, never persisted as
 *                  a togglable field (there is nothing to disable: it
 *                  covers strictly-necessary product storage like the
 *                  Free Kundali rid/session payload and the website
 *                  session_id -- see this task's own storage inventory
 *                  in the final report for exactly what qualifies).
 *   analytics   -- independently controllable boolean.
 *   advertising -- independently controllable boolean, NEVER implied
 *                  by analytics=true, and vice versa (Task 8 S5).
 *
 * DEFAULT (Task 8 S4): before a real choice is stored, BOTH analytics
 * and advertising are treated as denied -- readStoredConsent() returns
 * null for a fresh visitor, and every caller here treats null exactly
 * like {analytics: false, advertising: false}.
 *
 * FIRST-PARTY INDEPENDENCE (Task 8 S13, explicit): this module governs
 * ONLY the Google Consent Mode signal and the marketing UI's own state.
 * lib/websiteEvents.ts / lib/anonymousActivityEventClient.ts (the
 * first-party activity_events pipeline) are NOT imported here and do
 * NOT consult this module at all -- they remain fully independent of
 * marketing consent, exactly as before this task, per Task 8's own
 * explicit instruction not to gate activity_events on consent.
 *
 * PERSISTENCE (Task 8 S8/S9): a single, versioned, first-party
 * localStorage key. Only {version, analytics, advertising, updatedAt}
 * are ever stored -- no email, firebase_uid, profile_id, birth data,
 * IP, or device fingerprint. A missing/malformed/wrong-version record
 * is treated as "no consent decision yet" (safe fallback to denied),
 * never silently reinterpreted.
 *
 * localStorage (not sessionStorage, unlike Task 2C's session/attribution
 * choice) is deliberate here: a consent decision must persist across
 * browser sessions/tabs, not be re-asked every new tab -- the opposite
 * storage-lifetime requirement from Task 2C's own session concept, so
 * the two deliberately use different storage.
 */

export const CONSENT_STORAGE_KEY = "jyotishasha_consent_v1";
export const CONSENT_VERSION = 1;

export interface ConsentChoice {
  analytics: boolean;
  advertising: boolean;
}

export interface ConsentState extends ConsentChoice {
  version: number;
  updatedAt: string;
}

export interface ConsentStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function isValidConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    v.version === CONSENT_VERSION &&
    typeof v.analytics === "boolean" &&
    typeof v.advertising === "boolean" &&
    typeof v.updatedAt === "string"
  );
}

/** Never throws. Returns null for: no stored value, malformed JSON, a
 * non-object, a wrong/missing version, or a wrong field shape -- every
 * one of those collapses to the same safe "no valid consent decision
 * yet" outcome (Task 8 S9: unknown-version/malformed state must safely
 * fall back to denied, never be silently reinterpreted as some other
 * version's meaning). */
export function readStoredConsent(storage: ConsentStorageLike): ConsentState | null {
  try {
    const raw = storage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidConsentState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Never throws (a full/blocked storage simply means the choice won't
 * persist across reloads -- never a product-breaking exception).
 * Persists ONLY the 4 documented fields, by object-literal construction
 * -- no caller can accidentally add a 5th field. */
export function writeConsent(storage: ConsentStorageLike, choice: ConsentChoice): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    analytics: choice.analytics,
    advertising: choice.advertising,
    updatedAt: new Date().toISOString(),
  };
  try {
    storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable/full -- never throws into product code.
  }
  return state;
}

/** Google Consent Mode v2's 4 required signals. analytics=true grants
 * ONLY analytics_storage; advertising=true grants ALL THREE of
 * ad_storage/ad_user_data/ad_personalization together (Task 8's own
 * mapping, S5) -- advertising is never split into finer sub-toggles in
 * this task ("do not introduce dozens of categories", S3). A null
 * choice (no stored consent yet) maps to every signal denied. */
export interface GoogleConsentModeState {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
}

export function toGoogleConsentMode(choice: ConsentChoice | null): GoogleConsentModeState {
  const analytics = choice?.analytics ?? false;
  const advertising = choice?.advertising ?? false;
  return {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  };
}

interface GtagLike {
  (...args: unknown[]): void;
}

/** Defensively ensures window.dataLayer and a window.gtag shim exist
 * (mirrors the exact bootstrap shape the root layout's own
 * beforeInteractive inline script already establishes -- see
 * app/layout.tsx), then returns the gtag function. Never throws;
 * returns undefined if window is unavailable. Re-defining the shim
 * here (rather than assuming the bootstrap script already ran) means
 * this still works even if that script somehow failed/was blocked. */
function getOrCreateGtag(): GtagLike | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: GtagLike };
  if (!Array.isArray(w.dataLayer)) w.dataLayer = [];
  if (typeof w.gtag !== "function") {
    const dataLayer = w.dataLayer;
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    };
  }
  return w.gtag;
}

/**
 * Pushes a Google Consent Mode v2 `consent update` command reflecting
 * the given choice. Never throws -- a missing window/dataLayer, or any
 * other failure, is silently swallowed (consent UI interaction must
 * never break on this). This is the ONLY function in this task that
 * mutates the live Google Consent Mode state after the initial
 * beforeInteractive default -- called exactly once per user consent
 * decision (Accept All / Reject Non-Essential / Save Preferences).
 */
export function pushConsentUpdate(choice: ConsentChoice): void {
  try {
    const gtag = getOrCreateGtag();
    if (!gtag) return;
    gtag("consent", "update", toGoogleConsentMode(choice));
  } catch {
    // Analytics/consent signaling must never throw into product code.
  }
}
