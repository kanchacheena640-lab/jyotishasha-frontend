// lib/homeTicker.ts
// Pure helpers for components/home/HomeTicker.tsx (the homepage "Astro
// Updates" / "एस्ट्रो अपडेट्स" ticker).
//
// Backend /api/panchang Choghadiya slots carry `name` (already localized to
// the requested `language`) and `name_en`; there is no `name_hi` field. The
// ticker read `name_hi` for Hindi and rendered "undefined". These helpers read
// the fields that exist and return "" when a value is missing, so the caller
// can hide the item instead of printing "undefined".

export interface ChoghadiyaSlot {
  name?: unknown;
  name_en?: unknown;
  name_hi?: unknown;
  nature?: unknown;
  nature_en?: unknown;
  nature_hi?: unknown;
  start?: unknown;
  end?: unknown;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Display name for the slot in `lang`, or "" if none is available. */
export function choghadiyaSlotName(slot: ChoghadiyaSlot | null | undefined, lang: string): string {
  if (!slot) return "";
  if (lang === "hi") {
    // `name` is the Hindi name when the panchang was requested with language "hi".
    return text(slot.name_hi) || text(slot.name) || text(slot.name_en);
  }
  return text(slot.name_en) || text(slot.name);
}

/** True when the slot is auspicious ("shubh" / "शुभ"). */
export function isShubhSlot(slot: ChoghadiyaSlot | null | undefined): boolean {
  if (!slot) return false;
  return (
    text(slot.nature_en).toLowerCase() === "shubh" ||
    text(slot.nature_hi) === "शुभ" ||
    text(slot.nature) === "शुभ" ||
    text(slot.nature).toLowerCase() === "shubh"
  );
}

/**
 * The Choghadiya ticker line, or "" when any part is missing (the caller then
 * hides the item -- "undefined" is never rendered).
 */
export function choghadiyaTickerMessage(
  slot: ChoghadiyaSlot | null | undefined,
  lang: string,
  goodText: unknown,
  badText: unknown,
): string {
  const name = choghadiyaSlotName(slot, lang);
  const start = text(slot?.start);
  const end = text(slot?.end);
  const good = isShubhSlot(slot);
  const suffix = text(good ? goodText : badText);
  if (!name || !start || !end || !suffix) return "";
  return `${good ? "🟢" : "🔴"} ${name} (${start}–${end}) – ${suffix}`;
}
