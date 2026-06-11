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

export function getTargetYear(
  monthNumber: number
) {
  const now = new Date();

  const currentMonth =
    now.getMonth() + 1;

  const currentYear =
    now.getFullYear();

  return monthNumber >= currentMonth
    ? currentYear
    : currentYear + 1;
}