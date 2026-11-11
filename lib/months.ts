import { istToday } from "./muhuratSeo";

export const MONTH_MAP: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

export function getMonthNumber(
  monthSlug: string
): number | null {
  return MONTH_MAP[
    monthSlug.toLowerCase()
  ] ?? null;
}

// Same semantics as before (the current or a later month -> this year, an earlier month -> next year),
// but "current" is the calendar month in Asia/Kolkata, not the server's UTC clock, so the year flips
// exactly at the Indian month/year boundary.
export function getTargetYear(
  monthNumber: number,
  now: Date = new Date()
) {
  const today = istToday(now);

  const currentMonth =
    today.month;

  const currentYear =
    today.year;

  return monthNumber >= currentMonth
    ? currentYear
    : currentYear + 1;
}