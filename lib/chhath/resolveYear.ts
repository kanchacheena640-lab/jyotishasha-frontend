// lib/chhath/resolveYear.ts
//
// Server-side resolution of the default (current/upcoming) festival year:
// the IST year, or the next year once this year's Usha Arghya has passed.
// Any API failure resolves to { data: null } -- the page then renders its
// error/retry state and never invents dates.

import { CHHATH_MAX_YEAR, fetchChhath, toChhathView } from "./api";
import type { ChhathLanguage, ChhathView } from "./api";
import { CHHATH_DEFAULT_CITY } from "./cities";
import { istToday, istYear, isChhathOver } from "./format";

export interface InitialChhath {
  year: number;
  /** Public view only (safe to pass to the client component). */
  data: ChhathView | null;
}

type Fetcher = typeof fetchChhath;

export async function resolveInitialChhath(
  lang: ChhathLanguage,
  now: Date = new Date(),
  fetcher: Fetcher = fetchChhath
): Promise<InitialChhath> {
  const today = istToday(now);
  const year = istYear(now);
  try {
    const current = await fetcher({ year, city: CHHATH_DEFAULT_CITY, language: lang, server: true });
    if (!isChhathOver(current, today) || year + 1 > CHHATH_MAX_YEAR) {
      return { year, data: toChhathView(current) };
    }
  } catch {
    return { year, data: null };
  }
  try {
    const next = await fetcher({ year: year + 1, city: CHHATH_DEFAULT_CITY, language: lang, server: true });
    return { year: year + 1, data: toChhathView(next) };
  } catch {
    return { year: year + 1, data: null };
  }
}
