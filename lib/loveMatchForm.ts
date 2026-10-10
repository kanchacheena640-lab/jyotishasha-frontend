// lib/loveMatchForm.ts
// Free love match (/love): form validation, error messages and the match-success de-duplication key.
// Pure functions (no React, no network) so the exact rules are unit-tested.
//
// Why birth TIME is required for both people: without it the backend can only estimate a partner's Moon
// from the date of birth, which is not reliable enough to show a Guna Milan number. The backend also
// rejects a missing time for the first person outright.

import { birthDetailsError, isResolvedPlace, type RelationshipPlaceState } from "./relationshipPlaceValidation";

export interface LoveMatchPerson extends RelationshipPlaceState {
  name: string;
  dob: string;
  tob: string;
}

/** First problem found (boy first, then girl), as a localized sentence -- or null when the form can be sent. */
export function validateLoveMatchForm(
  form: { boy: LoveMatchPerson; girl: LoveMatchPerson },
  isHi: boolean,
  today: Date = new Date(),
): string | null {
  for (const side of ["boy", "girl"] as const) {
    const p = form[side];
    const details = birthDetailsError(p, side, isHi, today);
    if (details) return details;
    if (!isResolvedPlace(p)) {
      return isHi
        ? `कृपया ${side === "boy" ? "लड़के का" : "लड़की का"} जन्म स्थान सुझावों में से चुनें।`
        : `Please select the ${side}'s place of birth from the suggestions.`;
    }
  }
  return null;
}

/**
 * Message for a failed calculation. `status` is the HTTP status of the main report call, or null when the
 * request never got an answer (offline, timeout, server asleep).
 */
export function loveMatchErrorMessage(status: number | null, isHi: boolean): string {
  if (status !== null && status >= 400 && status < 500) {
    return isHi
      ? "कुछ जन्म विवरण इस्तेमाल नहीं हो सके। कृपया नाम, तिथि, समय और स्थान जाँचकर फिर से कोशिश करें।"
      : "Some birth details could not be used. Please check the names, dates, times and places, then try again.";
  }
  return isHi
    ? "अभी मिलान की गणना नहीं हो सकी। कृपया एक मिनट बाद फिर से कोशिश करें।"
    : "We couldn't calculate the match right now. Please try again in a minute.";
}

/**
 * Stable, opaque key for one couple's submission -- used only as a local de-duplication marker so the same
 * match is counted once per browser session. FNV-1a over the submitted fields; never sent anywhere.
 */
export function loveMatchKey(payload: {
  language?: string;
  user: Pick<LoveMatchPerson, "name" | "dob" | "tob" | "lat" | "lng">;
  partner: Pick<LoveMatchPerson, "name" | "dob" | "tob" | "lat" | "lng">;
}): string {
  const part = (p: Pick<LoveMatchPerson, "name" | "dob" | "tob" | "lat" | "lng">) =>
    [p.name.trim().toLowerCase(), p.dob, p.tob, p.lat.toFixed(4), p.lng.toFixed(4)].join("|");
  const text = [payload.language || "", part(payload.user), part(payload.partner)].join("#");
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

export const LOVE_MATCH_MEASURED_PREFIX = "love_match_measured:";
