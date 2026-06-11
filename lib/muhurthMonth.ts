export function getMonthYearFromSlug(
  monthNumber: number
) {
  const now = new Date();

  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return {
    month: monthNumber,
    year: currentYear,
  };
}