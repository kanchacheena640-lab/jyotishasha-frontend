// lib/relationshipPlaceValidation.ts

/**
 * Relationship Future Report (Rs199): a birth place only counts as RESOLVED once the customer actually picked a
 * suggestion from the existing Google Places autocomplete (components/PlaceAutocompleteInput.tsx). Typed text alone
 * never has coordinates: they stay at the form's 0/0 defaults, and a report computed at 0,0 would be wrong.
 *
 * Pure functions only (no React, no network, no payment code) so the exact transitions the form uses are unit-tested.
 * Selection state (`placeSelected`) is the primary validity signal; the coordinate checks are a second, independent
 * safety net -- one coordinate equal to 0 is fine (e.g. lat 0, lng 30), but a 0,0 pair is the form's own "never
 * resolved" default and is never accepted as proof of a selection.
 */

export interface RelationshipPlaceState {
  pob: string;
  lat: number;
  lng: number;
  /** true only between a real autocomplete selection and the next manual edit of the text */
  placeSelected: boolean;
}

export interface SelectedPlace {
  name: string;
  lat: number;
  lng: number;
}

/** Finite numbers inside the real geographic ranges. A single 0 is legitimate; strings/NaN/Infinity are not. */
export function isValidCoordinatePair(lat: unknown, lng: unknown): boolean {
  return (
    typeof lat === "number" && typeof lng === "number" &&
    Number.isFinite(lat) && Number.isFinite(lng) &&
    lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  );
}

/** True only for a genuinely selected place with usable coordinates. */
export function isResolvedPlace(place: Partial<RelationshipPlaceState> | null | undefined): boolean {
  if (!place || place.placeSelected !== true) return false;
  if (typeof place.pob !== "string" || !place.pob.trim()) return false;
  if (!isValidCoordinatePair(place.lat, place.lng)) return false;
  return !(place.lat === 0 && place.lng === 0);
}

/** The customer picked a suggestion. Unusable coordinates keep the place unresolved (never a half-valid state). */
export function applyPlaceSelection<T extends RelationshipPlaceState>(person: T, place: SelectedPlace): T {
  if (!place || typeof place.name !== "string" || !place.name.trim() || !isValidCoordinatePair(place.lat, place.lng)) {
    return { ...person, lat: 0, lng: 0, placeSelected: false };
  }
  return { ...person, pob: place.name, lat: place.lat, lng: place.lng, placeSelected: true };
}

/**
 * The text input changed. PlaceAutocompleteInput echoes the just-selected name back through onChange right after
 * onPlaceSelected, so an identical value on a selected place is NOT an edit. Any other change is a manual edit: the
 * previous selection and its coordinates are dropped immediately and a new suggestion must be picked.
 */
export function applyPobEdit<T extends RelationshipPlaceState>(person: T, value: string): T {
  if (person.placeSelected && value === person.pob) return person;
  return { ...person, pob: value, lat: 0, lng: 0, placeSelected: false };
}

/** A place carried over from the free love-match form (sessionStorage) counts as resolved only if it is usable. */
export function restoreStoredPlace(stored: { pob?: unknown; latitude?: unknown; lat?: unknown; longitude?: unknown; lng?: unknown } | null | undefined): RelationshipPlaceState {
  const pob = typeof stored?.pob === "string" ? stored.pob : "";
  const lat = typeof (stored?.latitude ?? stored?.lat) === "number" ? (stored?.latitude ?? stored?.lat) as number : 0;
  const lng = typeof (stored?.longitude ?? stored?.lng) === "number" ? (stored?.longitude ?? stored?.lng) as number : 0;
  const place = { pob, lat, lng, placeSelected: true };
  return isResolvedPlace(place) ? place : { pob, lat: 0, lng: 0, placeSelected: false };
}

export function relationshipPlaceError(
  primary: Partial<RelationshipPlaceState> | null | undefined,
  partner: Partial<RelationshipPlaceState> | null | undefined,
  isHi: boolean,
): string | null {
  if (!isResolvedPlace(primary)) {
    return isHi
      ? "कृपया सुझावों में से अपना जन्म स्थान चुनें।"
      : "Please select your birth place from the suggestions.";
  }
  if (!isResolvedPlace(partner)) {
    return isHi
      ? "कृपया सुझावों में से अपने साथी का जन्म स्थान चुनें।"
      : "Please select your partner's birth place from the suggestions.";
  }
  return null;
}

// ---------- name / date / time of birth (both people) ----------

export interface BirthDetails {
  name?: unknown;
  dob?: unknown;
  tob?: unknown;
}

const BIRTH_LABEL = {
  boy: { en: "boy's", hi: "लड़के का" },
  girl: { en: "girl's", hi: "लड़की का" },
} as const;

function isValidDob(dob: unknown, today: Date): boolean {
  if (typeof dob !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return false;
  const [y, m, d] = dob.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return false;
  return y >= 1900 && dt.getTime() <= today.getTime();
}

const isValidTob = (tob: unknown) => typeof tob === "string" && /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(tob);

/**
 * Name, a real past date of birth, and a birth TIME for one person -- the backend needs all three for a
 * two-person Ashtakoot (without the time a partner's Moon could only be estimated). Null when complete.
 */
export function birthDetailsError(person: BirthDetails | null | undefined, side: "boy" | "girl", isHi: boolean, today: Date = new Date()): string | null {
  const who = BIRTH_LABEL[side];
  if (typeof person?.name !== "string" || !person.name.trim()) {
    return isHi ? `कृपया ${who.hi} नाम लिखें।` : `Please enter the ${who.en} name.`;
  }
  if (!isValidDob(person.dob, today)) {
    return isHi ? `कृपया ${who.hi} सही जन्म तिथि चुनें।` : `Please enter the ${who.en} correct date of birth.`;
  }
  if (!isValidTob(person.tob)) {
    return isHi
      ? `कृपया ${who.hi} जन्म समय डालें। सही गुण मिलान के लिए जन्म समय ज़रूरी है।`
      : `Please enter the ${who.en} time of birth. Guna Milan needs the birth time to be accurate.`;
  }
  return null;
}
