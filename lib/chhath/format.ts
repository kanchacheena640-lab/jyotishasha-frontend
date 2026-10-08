// lib/chhath/format.ts
//
// Deterministic (Intl-free) formatting so server and browser render the
// same strings -- no hydration mismatch between Node and browser locales.
// All backend times are already IST.

import type { ChhathCandidateView, ChhathDay, ChhathLanguage } from "./api";

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_HI = [
  "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

/** "17:00" -> "5:00 PM"; "06:07" -> "6:07 AM". Returns "" for invalid input. */
export function to12Hour(hhmm: string | undefined): string {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm || "");
  if (!m) return "";
  const h = Number(m[1]);
  const min = m[2];
  if (h > 23 || Number(min) > 59) return "";
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${min} ${suffix}`;
}

/** "2026-11-15" -> "15 November 2026" / "15 नवंबर 2026". */
export function formatChhathDate(iso: string | null | undefined, lang: ChhathLanguage): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return "";
  const month = Number(m[2]) - 1;
  if (month < 0 || month > 11) return "";
  const names = lang === "hi" ? MONTHS_HI : MONTHS_EN;
  return `${Number(m[3])} ${names[month]} ${m[1]}`;
}

/** "2026-11-14T23:24" -> "15 November 2026, 11:24 PM" style (date + 12h time). */
export function formatChhathDateTime(isoMinute: string | undefined, lang: ChhathLanguage): string {
  const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/.exec(isoMinute || "");
  if (!m) return "";
  return `${formatChhathDate(m[1], lang)}, ${to12Hour(m[2])}`;
}

/** Current date in IST as YYYY-MM-DD. */
export function istToday(now: Date = new Date()): string {
  return new Date(now.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function istYear(now: Date = new Date()): number {
  return Number(istToday(now).slice(0, 4));
}

/**
 * Current/upcoming festival year: the IST year, unless that year's Usha
 * Arghya has already passed, in which case the next year.
 */
export function isChhathOver(data: { days: Pick<ChhathDay, "date">[] }, todayIst: string): boolean {
  const last = data.days[data.days.length - 1]?.date;
  return typeof last === "string" && last < todayIst;
}

/**
 * Whether the concise Panchang-variation note should be shown. Only the
 * backend's review status drives it: in ordinary years the sunset-rule
 * candidate can differ (e.g. 2021, 2023) while observance followed the
 * displayed date, so a differing candidate alone is not a variation signal.
 */
export function showVariationNote(data: { status: string }): boolean {
  return data.status === "needs_review";
}

/**
 * Sandhya Arghya dates listed by the backend's competing-rule candidates
 * that differ from the displayed one -- only for needs_review years, and
 * only for the short variation note. The calculated dates stay primary.
 */
export function alternativeSandhyaDates(data: {
  status: string;
  candidates: ChhathCandidateView[];
  days: Pick<ChhathDay, "date">[];
}): string[] {
  if (!showVariationNote(data)) return [];
  const primary = data.days[2]?.date;
  const out: string[] = [];
  data.candidates.forEach((c) => {
    if (!c.is_primary && c.sandhya_arghya && c.sandhya_arghya !== primary && !out.includes(c.sandhya_arghya)) {
      out.push(c.sandhya_arghya);
    }
  });
  return out.sort();
}

export const PAKSHA_LABEL: Record<string, { en: string; hi: string }> = {
  Shukla: { en: "Shukla Paksha", hi: "शुक्ल पक्ष" },
  Krishna: { en: "Krishna Paksha", hi: "कृष्ण पक्ष" },
};

export const MONTH_LABEL: Record<string, { en: string; hi: string }> = {
  Kartik: { en: "Kartik", hi: "कार्तिक" },
};
