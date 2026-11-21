// lib/getDailyHoroscope.ts
// Server-side fetch for a single sign's daily horoscope prediction, so the
// content is present in the initial server-rendered HTML instead of only
// appearing after a client-side fetch resolves. Mirrors the existing,
// already-proven pattern in lib/getDailySummary.ts (used by the homepage's
// daily horoscope preview): ISR-style revalidation + graceful null fallback
// on any failure.
//
// Date consistency: the cache entry is keyed by the IST calendar day
// (`&date=YYYY-MM-DD`; the backend ignores the parameter). A URL-only key let
// a response cached on the previous day survive past IST midnight and be
// served stale-while-revalidate, so the page's own date (rendered now) and the
// heading's date (from yesterday's cached response) disagreed.
//
// Contract: the caller passes ONE `now` snapshot and uses the same snapshot for
// the date it displays. A response is returned only if its `date` is that
// snapshot's IST day; otherwise the fetch is retried once, and if the retry
// fails or is still another day, null is returned -- a mismatched heading is
// never handed back (the page then shows its "not available" fallback). This
// also covers a slow fetch that crosses IST midnight: the snapshot (and the
// cache key) stay on the day the request started.
//
// The retry uses a per-minute key cached for 60 s. Deliberately NOT
// `cache: "no-store"`: in Next 14.2 a no-store fetch inside a static/ISR render
// records dynamic usage and throws DynamicServerError (patch-fetch.js), which
// would break any ISR caller; a distinct, short-lived cache key is safe in
// every rendering mode.

import { expectedBackendHoroscopeDate, istDateKey } from "./istDate";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;

export interface DailyHoroscopeResponse {
  date: string;
  heading: string;
  intro: string;
  paragraph: string;
  lucky_color: string;
  lucky_number: string;
  tips: string;
  sign: string;
  lang: string;
}

type HoroscopeFetchInit = RequestInit & { next?: { revalidate?: number } };

async function fetchHoroscope(url: string, init: HoroscopeFetchInit): Promise<DailyHoroscopeResponse | null> {
  const res = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(5000), // don't let a slow/cold backend hang page render
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  if (!data || data.error) {
    return null;
  }

  return data as DailyHoroscopeResponse;
}

export async function getDailyHoroscope(
  sign: string,
  lang: string = 'en',
  now: Date = new Date() // the caller's IST-day snapshot -- display the same one
): Promise<DailyHoroscopeResponse | null> {
  try {
    const expectedDate = expectedBackendHoroscopeDate(lang, now);
    const url = `${BACKEND}/api/daily-horoscope?sign=${sign}&lang=${lang}&date=${istDateKey(now)}`;

    // 30-minute cache within the IST day, same as getDailySummary.ts
    const data = await fetchHoroscope(url, { next: { revalidate: 1800 } });
    if (!data) {
      return null;
    }
    if (data.date === expectedDate) {
      return data;
    }

    const minuteKey = Math.floor(now.getTime() / 60000);
    const retry = await fetchHoroscope(`${url}&t=${minuteKey}`, { next: { revalidate: 60 } }).catch(() => null);
    // Only a response for the snapshot's own IST day is ever returned; never
    // fall back to the stale first response.
    return retry && retry.date === expectedDate ? retry : null;
  } catch {
    return null;
  }
}
