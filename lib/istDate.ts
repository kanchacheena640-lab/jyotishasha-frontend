// lib/istDate.ts
// One source of truth for "today" on daily-horoscope surfaces.
//
// The daily horoscope rotates once per IST (Asia/Kolkata) calendar day on the
// backend (routes/daily_horoscope.py). The website must therefore derive
// "today" in IST too -- never from the server's local clock, which is UTC on
// Vercel and lags IST by 5:30 (00:00-05:30 IST would otherwise read as
// yesterday). These helpers are pure: pass `now` in tests.

export const IST_TIME_ZONE = "Asia/Kolkata";

/** IST calendar date as YYYY-MM-DD (e.g. "2026-11-21"). */
export function istDateKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Long, human date in IST, e.g. "शनिवार, 21 नवंबर 2026" / "Saturday, 21 November 2026". */
export function formatIstLongDate(locale: string, now: Date = new Date()): string {
  return now.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
    timeZone: IST_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Mirrors the backend's own `date` / heading format exactly
// (routes/daily_horoscope.py): EN strftime("%d %B %Y"); HI "<day> <MONTH_HI> <year>".
const MONTH_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_HI = [
  "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

/** The `date` string the backend returns for today's IST horoscope. */
export function expectedBackendHoroscopeDate(lang: string, now: Date = new Date()): string {
  const [year, month, day] = istDateKey(now).split("-").map(Number);
  if (lang === "hi") return `${day} ${MONTH_HI[month - 1]} ${year}`;
  return `${String(day).padStart(2, "0")} ${MONTH_EN[month - 1]} ${year}`;
}
