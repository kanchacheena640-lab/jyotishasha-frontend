// lib/checkoutPrefill.ts

/**
 * Report checkout birth-details prefill -- pure helpers, no React, no storage.
 *
 * Source: the birth details an astrology tool already saved in
 * localStorage['jyotishasha_user'] (lib/useUserCache.ts, written only by
 * components/ToolInputForm.tsx on submit). This module never reads or writes
 * storage itself; ReportCheckout passes the parsed cache in.
 *
 * Rules:
 *   - Every field is validated strictly; anything invalid, partial or
 *     malformed is skipped and left for manual entry.
 *   - Only birth details are ever filled: name, DOB, time, and place +
 *     coordinates (as one unit). Email, phone and language never are.
 *   - A field is filled only if it is still empty AND the user has not
 *     edited it.
 *   - "Clear prefill" removes only values this prefill inserted that are
 *     still unchanged; anything the user typed is kept.
 *
 * Relative-import-free on purpose: compiles standalone for the plain `tsc`
 * test invocation.
 */

/** The checkout form fields this module may touch. */
export type PrefillField = "name" | "dob" | "tob" | "place";

/** Validated values, already in the checkout form's own string formats. */
export interface CheckoutBirthPrefill {
  name?: string;
  dob?: string; // YYYY-MM-DD
  tob?: string; // HH:mm (24h)
  place?: { pob: string; latitude: string; longitude: string };
}

/** The subset of the checkout form shape this module reads/writes. */
export interface PrefillableForm {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  latitude: string;
  longitude: string;
}

const NAME_MAX = 100;
const PLACE_MAX = 200;
const MIN_BIRTH_YEAR = 1900;
const CONTROL_OR_MARKUP = /[\u0000-\u001F\u007F<>]/;
const DOB_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TOB_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function cleanText(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (t.length < 1 || t.length > max || CONTROL_OR_MARKUP.test(t)) return undefined;
  return t;
}

/** YYYY-MM-DD for "today" in the visitor's local calendar. */
function localToday(now: Date): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function validDob(v: unknown, now: Date = new Date()): string | undefined {
  if (typeof v !== "string") return undefined;
  const m = DOB_RE.exec(v);
  if (!m) return undefined;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (y < MIN_BIRTH_YEAR) return undefined;
  // Real calendar date (rejects 2023-02-30, 2023-13-01, ...).
  const probe = new Date(Date.UTC(y, mo - 1, d));
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== mo - 1 || probe.getUTCDate() !== d) return undefined;
  // Not in the future (string compare is safe for zero-padded YYYY-MM-DD).
  if (v > localToday(now)) return undefined;
  return v;
}

export function validTob(v: unknown): string | undefined {
  return typeof v === "string" && TOB_RE.test(v) ? v : undefined;
}

/**
 * Place + coordinates as one unit. Coordinates must be finite, in range and
 * non-zero: ToolInputForm uses {lat: 0, lng: 0} as its "nothing selected"
 * value and itself refuses to submit a zero coordinate.
 */
export function validPlace(place: unknown, coords: unknown): CheckoutBirthPrefill["place"] {
  const pob = cleanText(place, PLACE_MAX);
  if (!pob || !isPlainObject(coords)) return undefined;
  const { lat, lng } = coords;
  if (typeof lat !== "number" || typeof lng !== "number") return undefined;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return undefined;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return undefined;
  if (lat === 0 || lng === 0) return undefined;
  return { pob, latitude: String(lat), longitude: String(lng) };
}

/** Validated prefill from the parsed tool cache. Never throws. */
export function buildCheckoutPrefill(cache: unknown, now: Date = new Date()): CheckoutBirthPrefill {
  if (!isPlainObject(cache)) return {};
  const out: CheckoutBirthPrefill = {};
  const name = cleanText(cache.name, NAME_MAX);
  if (name) out.name = name;
  const dob = validDob(cache.dob, now);
  if (dob) out.dob = dob;
  const tob = validTob(cache.tob);
  if (tob) out.tob = tob;
  const place = validPlace(cache.place, cache.coords);
  if (place) out.place = place;
  return out;
}

/** What a prefill actually inserted -- the exact values, for "Clear prefill". */
export type AppliedPrefill = Partial<Pick<PrefillableForm, "name" | "dob" | "tob" | "pob" | "latitude" | "longitude">>;

/**
 * Fill only empty, unedited fields. `edited` holds the PrefillField names the
 * user has touched (place edits mark "place"). Place + coordinates are filled
 * only together, and only if all three are still empty.
 */
export function applyCheckoutPrefill<F extends PrefillableForm>(
  form: F,
  prefill: CheckoutBirthPrefill,
  edited: ReadonlySet<PrefillField>,
): { form: F; applied: AppliedPrefill } {
  const next = { ...form };
  const applied: AppliedPrefill = {};
  for (const key of ["name", "dob", "tob"] as const) {
    const value = prefill[key];
    if (value && form[key] === "" && !edited.has(key)) {
      next[key] = value;
      applied[key] = value;
    }
  }
  const place = prefill.place;
  if (place && !edited.has("place") && form.pob === "" && form.latitude === "" && form.longitude === "") {
    next.pob = place.pob;
    next.latitude = place.latitude;
    next.longitude = place.longitude;
    applied.pob = place.pob;
    applied.latitude = place.latitude;
    applied.longitude = place.longitude;
  }
  return { form: next, applied };
}

/**
 * Undo a prefill: clear each inserted value only if the field still holds
 * exactly that value. Place clears as a unit, only if all three still match.
 * Fields the user changed since -- and every other field -- are kept.
 */
export function clearCheckoutPrefill<F extends PrefillableForm>(form: F, applied: AppliedPrefill): F {
  const next = { ...form };
  for (const key of ["name", "dob", "tob"] as const) {
    if (applied[key] !== undefined && form[key] === applied[key]) next[key] = "";
  }
  if (
    applied.pob !== undefined &&
    form.pob === applied.pob && form.latitude === applied.latitude && form.longitude === applied.longitude
  ) {
    next.pob = "";
    next.latitude = "";
    next.longitude = "";
  }
  return next;
}

export function hasAppliedPrefill(applied: AppliedPrefill): boolean {
  return Object.keys(applied).length > 0;
}
