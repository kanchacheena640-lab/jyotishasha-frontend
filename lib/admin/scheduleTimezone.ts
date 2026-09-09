// N5.2: backend scheduling authority is UTC; this Admin panel's fixed
// v1 display/input timezone is India Standard Time (Asia/Kolkata),
// matching this codebase's existing convention (lib/admin/
// formatTransitTimestamp.ts already displays backend timestamps as
// IST). IST has a fixed +05:30 offset with no DST, so this is plain
// arithmetic -- never dependent on the viewing browser's own timezone,
// and never an ambiguous naive datetime persisted anywhere.

export const IST_OFFSET_MINUTES = 5 * 60 + 30;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Parses a <input type="datetime-local"> value ("YYYY-MM-DDTHH:mm"),
 * interprets its wall-clock reading as IST, and returns the
 * corresponding UTC instant as an ISO-8601 string with an explicit
 * offset. Returns null for a malformed/empty value. */
export function istInputToUtcIso(localValue: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(localValue || '');
  if (!match) return null;
  const [y, mo, d, h, mi] = match.slice(1).map(Number);
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59) return null;
  const asIfUtcMs = Date.UTC(y, mo - 1, d, h, mi, 0, 0);
  const trueUtcMs = asIfUtcMs - IST_OFFSET_MINUTES * 60 * 1000;
  const result = new Date(trueUtcMs);
  if (Number.isNaN(result.getTime())) return null;
  return result.toISOString();
}

/** Inverse of istInputToUtcIso: a UTC ISO timestamp -> the value shape
 * <input type="datetime-local"> expects, displaying it in IST. */
export function utcIsoToIstInput(utcIso: string): string {
  const utcMs = new Date(utcIso).getTime();
  const d = new Date(utcMs + IST_OFFSET_MINUTES * 60 * 1000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

export function formatIst(utcIso: string | null | undefined): string {
  if (!utcIso) return '—';
  const utcMs = new Date(utcIso).getTime();
  if (Number.isNaN(utcMs)) return '—';
  const d = new Date(utcMs + IST_OFFSET_MINUTES * 60 * 1000);
  return `${pad(d.getUTCDate())}-${pad(d.getUTCMonth() + 1)}-${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} IST`;
}

export function formatUtc(utcIso: string | null | undefined): string {
  if (!utcIso) return '—';
  const d = new Date(utcIso);
  if (Number.isNaN(d.getTime())) return '—';
  return `${pad(d.getUTCDate())}-${pad(d.getUTCMonth() + 1)}-${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}
