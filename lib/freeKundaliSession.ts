// lib/freeKundaliSession.ts

/**
 * Task 2A.1 -- Free Kundali result-URL PII remediation.
 *
 * Root cause (Task 2A): FreeKundaliClient.tsx used to serialize the full
 * birth-detail form (name, gender, dob, tob, place, lat, lng, language)
 * into URLSearchParams and navigate to a URL carrying all of it in plain
 * text. GTM and AdSense (both loaded unconditionally on that route) had
 * direct JS access to that URL, and GA4's default page_location capture
 * would potentially have retained it.
 *
 * Fix: the birth-detail payload now travels via sessionStorage, keyed by
 * a fresh, opaque, non-guessable request id (rid) that is NOT derived
 * from any user/birth data. Only `?rid=<opaque-id>` appears in the URL.
 *
 * Every function here is pure and framework-free (no DOM/React import)
 * specifically so it can be exercised directly by
 * freeKundaliSession.test.ts without a browser or a test-rendering
 * harness -- this repository has no test runner installed today (no
 * jest/vitest/RTL in package.json), so keeping the interesting logic
 * pure and dependency-free is what makes it independently testable at
 * all. See freeKundaliSession.test.ts's header for how it's run.
 */

export const FREE_KUNDALI_STORAGE_PREFIX = "jyotishasha:free-kundali:";

// Deliberately does NOT include `gender` -- Task 2A proved the result
// page never reads it back; carrying it forward at all (even off-URL)
// would just be dead weight, so it is dropped here at the source.
export type FreeKundaliPayload = {
  name: string;
  dob: string;
  tob: string;
  place: string;
  lat: string;
  lng: string;
  language: string;
};

const REQUIRED_KEYS: (keyof FreeKundaliPayload)[] = [
  "name",
  "dob",
  "tob",
  "place",
  "lat",
  "lng",
  "language",
];

// Accepts crypto.randomUUID()'s shape and the plain fallback below.
// Deliberately conservative: safe to interpolate into a sessionStorage
// key and a URL query value without further escaping concerns.
const RID_PATTERN = /^[A-Za-z0-9-]{8,64}$/;

export function isValidRid(rid: string | null | undefined): rid is string {
  return typeof rid === "string" && RID_PATTERN.test(rid);
}

export function buildFreeKundaliStorageKey(rid: string): string {
  return `${FREE_KUNDALI_STORAGE_PREFIX}${rid}`;
}

/** Fresh, opaque, random request id -- never derived from or hashed out
 * of user/birth data (Task 2A.1 explicit requirement). Prefers
 * crypto.randomUUID(); falls back to a timestamp+Math.random shape for
 * environments without it (still matches RID_PATTERN). */
export function generateFreeKundaliRid(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `rid-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidFreeKundaliPayload(
  value: unknown
): value is FreeKundaliPayload {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return REQUIRED_KEYS.every((key) => isNonEmptyString(record[key]));
}

export function serializeFreeKundaliPayload(payload: FreeKundaliPayload): string {
  // Only the 7 required keys are ever written -- an object literal here
  // (rather than passing through an arbitrary caller-supplied object)
  // guarantees no stray field (e.g. a leftover `gender`) can slip in.
  const clean: FreeKundaliPayload = {
    name: payload.name,
    dob: payload.dob,
    tob: payload.tob,
    place: payload.place,
    lat: payload.lat,
    lng: payload.lng,
    language: payload.language,
  };
  return JSON.stringify(clean);
}

/** Never throws. Malformed JSON or a missing/invalid field -> null,
 * exactly like every other failure mode this module reports. */
export function parseFreeKundaliPayload(
  raw: string | null | undefined
): FreeKundaliPayload | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  return isValidFreeKundaliPayload(parsed) ? parsed : null;
}

/** Minimal Storage-like shape (matches window.sessionStorage's read
 * surface) so this stays testable with a plain in-memory object --
 * no DOM/jsdom required. */
export interface FreeKundaliStorageLike {
  getItem(key: string): string | null;
}

/** The one function both the submit side's "did this actually get
 * stored" check and the result page's lookup ultimately rely on.
 * Returns null on ANY failure (missing rid, invalid rid shape, no
 * stored entry, malformed JSON, missing/invalid fields) -- callers
 * must treat null as "show the existing reselect/fallback UX", never
 * call the backend with a partial payload. Read-only: never deletes
 * the entry, so a same-tab refresh can resolve the same rid again
 * (Task 2A.1 storage-lifetime requirement). */
export function resolveFreeKundaliPayload(
  rid: string | null | undefined,
  storage: FreeKundaliStorageLike
): FreeKundaliPayload | null {
  if (!isValidRid(rid)) return null;
  const raw = storage.getItem(buildFreeKundaliStorageKey(rid));
  return parseFreeKundaliPayload(raw);
}

export function buildFreeKundaliResultPath(isHi: boolean, rid: string): string {
  const pathPrefix = isHi ? "/hi" : "";
  return `${pathPrefix}/free-kundali/free-birthchart-result/?rid=${encodeURIComponent(rid)}`;
}

// The exact POST /api/full-kundali-modern body shape is unchanged from
// before this fix (Task 2A.1: "API payload semantics must remain
// unchanged") -- only where the field values now come FROM (sessionStorage
// via a resolved payload, not raw URL params) is different. Pulled out
// as its own pure function so the field mapping itself (place -> place_name,
// lat/lng string -> float) is independently testable.
export function buildFullKundaliApiPayload(payload: FreeKundaliPayload) {
  return {
    name: payload.name,
    dob: payload.dob,
    tob: payload.tob,
    place_name: payload.place,
    lat: parseFloat(payload.lat || "0"),
    lng: parseFloat(payload.lng || "0"),
    timezone: "+05:30",
    ayanamsa: "Lahiri",
    language: payload.language,
  };
}
