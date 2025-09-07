export function formatDate(isoDate?: string): string {
  if (!isoDate) return '';
  const [yyyy, mm, dd] = isoDate.split('-');
  return `${dd}-${mm}-${yyyy}`;
}
