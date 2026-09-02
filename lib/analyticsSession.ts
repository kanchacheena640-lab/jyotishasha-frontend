// lib/analyticsSession.ts

/**
 * Task 2C -- the website analytics session identifier.
 *
 * This is NOT GA4's session concept, and does not attempt to replace or
 * mirror it (no 30-minute timeout, no re-engagement logic). It exists
 * for exactly one purpose: linking meaningful activity_events rows
 * (Task 2B's anonymous ingestion endpoint) that happen within the same
 * browser tab/session. A new tab or a new browser session gets a new,
 * unrelated id -- there is no cross-session/cross-tab/persistent
 * identity here (no anonymous_id, no fingerprinting; see the module
 * docstring in lib/analyticsAttribution.ts for the fuller privacy
 * rationale shared by both modules).
 *
 * Every function here is pure and framework-free (no DOM/React import)
 * so it can be exercised directly by analyticsSession.test.ts without a
 * browser -- this repo has no test runner installed (see Task 2A.1's
 * freeKundaliSession.ts, which established this same pattern first).
 */

export const ANALYTICS_SESSION_STORAGE_KEY = "jyotishasha:analytics:session-id";

/** Minimal Storage-like shape (matches window.sessionStorage's surface)
 * so this stays testable with a plain in-memory object -- no DOM/jsdom
 * required. */
export interface AnalyticsStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Opaque, random, and -- deliberately -- never derived from IP,
 * email, phone, birth details, device fingerprint, user-agent, Firebase
 * identity, or any other PII/identifying input. Prefers
 * crypto.randomUUID(); falls back to a timestamp+Math.random shape for
 * environments without it (same fallback style as Task 2A.1's
 * generateFreeKundaliRid()). */
export function generateAnalyticsSessionId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `sess-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Returns the existing session_id from storage if one is already
 * present (so it survives SPA navigation and a same-tab refresh, for as
 * long as sessionStorage itself survives); otherwise generates,
 * persists, and returns a fresh one. Read-once-then-write: never
 * overwrites an existing value, so a new session_id is only ever
 * created once per tab/session lifetime.
 *
 * Never throws. If storage access itself fails (blocked, disabled,
 * private-mode quota, or simply unavailable), returns null -- callers
 * must treat null as "no session id available for this visit" and
 * safely skip analytics, never crash the product (Task 2C S8/S10). */
export function getOrCreateAnalyticsSessionId(
  storage: AnalyticsStorageLike
): string | null {
  try {
    const existing = storage.getItem(ANALYTICS_SESSION_STORAGE_KEY);
    if (existing) return existing;
    const fresh = generateAnalyticsSessionId();
    storage.setItem(ANALYTICS_SESSION_STORAGE_KEY, fresh);
    return fresh;
  } catch {
    return null;
  }
}
