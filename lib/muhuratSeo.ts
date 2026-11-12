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

/** One date row as returned by /api/muhurth/list and /api/muhurth/month. */
export type MuhuratDateItem = {
  date: string;
  weekday: string;
  nakshatra: string;
  tithi: string;
  score: number;
  reasons?: string[];
  language?: string;
};

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

/**
 * Highest score the backend Muhurat engine can give (services/muhurth_engine.py):
 * allowed Tithi +2, allowed weekday +2, allowed Nakshatra +3. Penalties only lower it.
 */
export const MUHURAT_MAX_SCORE = 7;

export type MuhuratScoreLabel = { short: string; long: string };

/**
 * One display label per score band, shared by the Top 3 and the full date list so the
 * same date never gets two different labels. Display only: which dates are listed is
 * decided by the backend and is not changed here.
 */
export function muhuratScoreLabel(score: number, isHi: boolean): MuhuratScoreLabel {
  const s = Math.round(score);
  if (s >= MUHURAT_MAX_SCORE) {
    return isHi
      ? { short: "अत्यंत शुभ", long: "✨ अत्यंत शुभ — तिथि, वार और नक्षत्र तीनों अनुकूल हैं।" }
      : { short: "Most auspicious", long: "✨ Most auspicious — Tithi, weekday and Nakshatra are all favourable." };
  }
  if (s >= 5) {
    return isHi
      ? { short: "बहुत अनुकूल", long: "⭐ बहुत अनुकूल दिन।" }
      : { short: "Highly favourable", long: "⭐ Highly favourable day." };
  }
  if (s >= 4) {
    return isHi
      ? { short: "अनुकूल", long: "⭐ अनुकूल दिन।" }
      : { short: "Favourable", long: "⭐ Favourable day." };
  }
  return isHi
    ? { short: "सामान्य", long: "⚖️ सामान्य दिन।" }
    : { short: "Neutral", long: "⚖️ Neutral day." };
}

/** "Score: 5/7" / "स्कोर: 5/7" */
export function muhuratScoreText(score: number, isHi: boolean): string {
  return `${isHi ? "स्कोर" : "Score"}: ${Math.round(score)}/${MUHURAT_MAX_SCORE}`;
}

/** Analytics ids for Muhurat page CTAs (WebsiteEvents.ctaClick). */
export function muhuratCtaIds(slug: string) {
  const key = slug.replace(/-/g, "_");
  return {
    screenName: `muhurat_${key}`,
    kundali: `muhurat_${key}_free_kundali`,
    report: `muhurat_${key}_report`,
    tool: `muhurat_${key}_panchang_tool`,
    monthNav: `muhurat_${key}_month_nav`,
    relatedGuide: `muhurat_${key}_related_guide`,
  };
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
