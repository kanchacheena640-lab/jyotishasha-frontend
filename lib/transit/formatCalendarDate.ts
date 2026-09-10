// lib/transit/formatCalendarDate.ts
//
// U4C.2 -- timezone-safe formatter for backend DATE-ONLY strings
// ("YYYY-MM-DD") such as transit_engine.py's entering_date/exit_date
// (U4C.1) -- these represent an Asia/Kolkata CALENDAR DATE, never a
// UTC timestamp. The bug this fixes (confirmed via Node during U4C.0's
// audit): `new Date("2026-09-08")` parses as 2026-09-08T00:00:00Z per
// the ECMAScript spec, and `.toLocaleDateString(...)` with no explicit
// `timeZone` then renders it in the VIEWER's own browser timezone --
// which rolls the displayed date back to "Sep 7" for any visitor west
// of UTC (verified: America/New_York shows "Sep 7" for that exact
// string, while Asia/Kolkata and UTC correctly show "Sep 8").
//
// Fix: parse the year/month/day components directly out of the string
// (never let `Date` guess an instant from a bare date string), build a
// UTC-anchored Date from those exact components, and force the format
// call's OWN `timeZone: "UTC"` so the viewer's local timezone can never
// influence which calendar date is displayed. Locale defaults to
// "en-US" to preserve the exact existing output shape of every
// `formatDate()` this replaces (see U4C.2 report Sec.6) -- pass "hi-IN"
// only where a caller's existing behavior already localized into Hindi
// (components/home/HomeTransits.tsx).

export function formatCalendarDate(
  dateStr?: string | null,
  locale: "en-US" | "hi-IN" = "en-US",
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
): string {
  if (!dateStr) return "-";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return dateStr; // not a plain date-only string -- pass through rather than guess
  const [, y, mo, d] = m;
  const utcDate = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
  return utcDate.toLocaleDateString(locale, { ...options, timeZone: "UTC" });
}
