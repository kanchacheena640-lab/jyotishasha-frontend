// Shared helpers for the Muhurat topic pages (/panchang/muhurat/[slug] and /[slug]/[period]).
// Pure functions only, so the same logic runs in server components, client components and tests.

export const MUHURAT_TIME_ZONE = "Asia/Kolkata";

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Fixed list (not Intl) so Hindi month names never depend on the runtime's ICU data.
const MONTHS_HI = [
  "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

/** Localized month name for a 1-12 month number ("November" / "नवंबर"). */
export function localizedMonthName(monthNumber: number, isHi: boolean): string {
  const list = isHi ? MONTHS_HI : MONTHS_EN;
  return list[monthNumber - 1] ?? "";
}

/** Today's calendar date in Asia/Kolkata. */
export function istToday(now: Date = new Date()): { iso: string; year: number; month: number } {
  // en-CA formats as YYYY-MM-DD.
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: MUHURAT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return { iso, year: Number(iso.slice(0, 4)), month: Number(iso.slice(5, 7)) };
}

type Dated = { date?: string };

/** Dates on or after todayIso (YYYY-MM-DD); original order is kept. */
export function upcomingDates<T extends Dated>(dates: T[], todayIso: string): T[] {
  return (dates || []).filter((d) => typeof d?.date === "string" && d.date.slice(0, 10) >= todayIso);
}

/** Dates that fall inside the given calendar month; original order is kept. */
export function datesInMonth<T extends Dated>(dates: T[], year: number, monthNumber: number): T[] {
  const prefix = `${year}-${String(monthNumber).padStart(2, "0")}-`;
  return (dates || []).filter((d) => typeof d?.date === "string" && d.date.startsWith(prefix));
}

/** Topic name without the subtitle ("Vehicle Muhurat – Auspicious …" -> "Vehicle Muhurat"). */
export function topicShortName(title: string): string {
  return (title || "").split(" – ")[0].trim();
}

/**
 * Concise, month-aware meta description.
 * scope "month": a month page restricted to that month.
 * scope "upcoming": the rolling topic page listing the next upcoming dates.
 */
export function muhuratMetaDescription(opts: {
  shortName: string;
  monthLabel: string;
  year: number;
  isHi: boolean;
  scope: "month" | "upcoming";
}): string {
  const { shortName, monthLabel, year, isHi, scope } = opts;
  if (isHi) {
    return scope === "month"
      ? `${shortName} ${monthLabel} ${year}: इस महीने की शुभ तिथियां, नक्षत्र और तिथि विवरण सहित — हिंदू पंचांग के अनुसार।`
      : `${shortName} ${monthLabel} ${year}: आने वाले शुभ दिन, नक्षत्र और तिथि विवरण सहित — हिंदू पंचांग के अनुसार।`;
  }
  return scope === "month"
    ? `${shortName} ${monthLabel} ${year}: auspicious dates this month with Nakshatra and Tithi details, as per the Hindu Panchang.`
    : `${shortName} ${monthLabel} ${year}: upcoming auspicious dates with Nakshatra and Tithi details, as per the Hindu Panchang.`;
}

/** Hindi FAQ heading subject without a doubled "मुहूर्त" ("वाहन मुहूर्त" stays as is). */
export function hindiMuhuratSubject(activityName: string): string {
  const name = (activityName || "").trim();
  return name.endsWith("मुहूर्त") ? name : `${name} मुहूर्त`;
}

/**
 * Hindi hero-intro phrase "शुभ <topic> मुहूर्त" with neither word doubled:
 * "वाहन मुहूर्त" -> "शुभ वाहन मुहूर्त"; "सोना खरीदने का शुभ मुहूर्त" stays as is.
 */
export function hindiHeroSubject(topicName: string): string {
  const subject = hindiMuhuratSubject(topicName);
  return subject.includes("शुभ") ? subject : `शुभ ${subject}`;
}
