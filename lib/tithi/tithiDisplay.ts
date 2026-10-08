// lib/tithi/tithiDisplay.ts
//
// Display helpers for the Tithi landing page (/panchang/tithi, /hi/panchang/tithi).
// Formatting only -- API values and Panchang calculations are never changed.

// Tithi groups (Nanda, Bhadra, Jaya, Rikta, Purna) as stored in
// app/data/tithiData.ts `category`.
export const TITHI_CATEGORY_LABELS: Record<string, { en: string; hi: string }> = {
  Nanda: { en: "Nanda", hi: "नंदा" },
  Bhadra: { en: "Bhadra", hi: "भद्रा" },
  Jaya: { en: "Jaya", hi: "जया" },
  Rikta: { en: "Rikta", hi: "रिक्ता" },
  Poorna: { en: "Poorna", hi: "पूर्णा" },
};

/** Localized category label; unknown values are shown unchanged. */
export function tithiCategoryLabel(category: unknown, isHi: boolean): string {
  if (typeof category !== "string") return "";
  const label = TITHI_CATEGORY_LABELS[category];
  if (!label) return category;
  return isHi ? label.hi : label.en;
}

const pad = (n: number) => String(n).padStart(2, "0");
const IST_OFFSET_MINUTES = 330;

function wallClock(year: number, month: number, day: number, hour: number, minute: number): string {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${pad(day)}-${pad(month)}-${year}, ${pad(h12)}:${pad(minute)} ${suffix} IST`;
}

/**
 * Formats a Panchang timestamp as "DD-MM-YYYY, hh:mm AM/PM IST".
 *
 * - "YYYY-MM-DD HH:MM[:SS]" or "YYYY-MM-DDTHH:MM[:SS]" without an offset is
 *   the backend's IST wall-clock time: it is reformatted as-is (no Date
 *   parsing, so no server/browser timezone can shift it).
 * - A value with "Z" or a ±HH:MM offset is converted explicitly to
 *   Asia/Kolkata (UTC+05:30, no DST).
 * Anything else returns "-".
 */
export function formatIstDateTime(value: unknown): string {
  if (typeof value !== "string") return "-";
  const m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?$/.exec(value.trim());
  if (!m) return "-";
  const [, y, mo, d, h, mi, , zone] = m;
  const year = Number(y), month = Number(mo), day = Number(d), hour = Number(h), minute = Number(mi);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return "-";

  if (!zone) {
    const check = new Date(Date.UTC(year, month - 1, day));
    if (check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return "-";
    return wallClock(year, month, day, hour, minute);
  }

  let offsetMinutes = 0;
  if (zone !== "Z") {
    const zm = /^([+-])(\d{2}):?(\d{2})$/.exec(zone)!;
    offsetMinutes = (zm[1] === "-" ? -1 : 1) * (Number(zm[2]) * 60 + Number(zm[3]));
  }
  const utcMs = Date.UTC(year, month - 1, day, hour, minute) - offsetMinutes * 60000;
  if (Number.isNaN(utcMs)) return "-";
  const ist = new Date(utcMs + IST_OFFSET_MINUTES * 60000);
  return wallClock(ist.getUTCFullYear(), ist.getUTCMonth() + 1, ist.getUTCDate(), ist.getUTCHours(), ist.getUTCMinutes());
}
