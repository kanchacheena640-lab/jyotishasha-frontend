/** The transit API returns an Indian Standard Time wall clock, not an ISO instant.
 * Validate every component and retain its explicit timezone; never ask Date to
 * guess what the ambiguous abbreviation IST means on the viewer's machine.
 */
export function formatTransitTimestamp(value?: string | null): string {
  if (typeof value !== 'string') return 'Unavailable';
  const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) IST$/.exec(value.trim());
  if (!match) return 'Unavailable';
  const [, year, month, day, hour, minute, second] = match;
  const parts = [year, month, day, hour, minute, second].map(Number);
  const date = new Date(0);
  date.setUTCFullYear(parts[0], parts[1] - 1, parts[2]);
  date.setUTCHours(parts[3], parts[4], parts[5], 0);
  if (date.getUTCFullYear() !== parts[0] || date.getUTCMonth() !== parts[1] - 1 ||
      date.getUTCDate() !== parts[2] || date.getUTCHours() !== parts[3] ||
      date.getUTCMinutes() !== parts[4] || date.getUTCSeconds() !== parts[5]) return 'Unavailable';
  const monthLabel = date.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' });
  return `${day} ${monthLabel} ${year}, ${hour}:${minute}:${second} IST`;
}
