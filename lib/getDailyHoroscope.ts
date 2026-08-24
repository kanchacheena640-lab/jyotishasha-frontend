// lib/getDailyHoroscope.ts
// Server-side fetch for a single sign's daily horoscope prediction, so the
// content is present in the initial server-rendered HTML instead of only
// appearing after a client-side fetch resolves. Mirrors the existing,
// already-proven pattern in lib/getDailySummary.ts (used by the homepage's
// daily horoscope preview): ISR-style revalidation + graceful null fallback
// on any failure.

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

export async function getDailyHoroscope(
  sign: string,
  lang: string = 'en'
): Promise<DailyHoroscopeResponse | null> {
  try {
    const res = await fetch(
      `${BACKEND}/api/daily-horoscope?sign=${sign}&lang=${lang}`,
      {
        next: { revalidate: 1800 }, // 30-minute cache, same as getDailySummary.ts
        signal: AbortSignal.timeout(5000), // don't let a slow/cold backend hang page render
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data || data.error) {
      return null;
    }

    return data as DailyHoroscopeResponse;
  } catch {
    return null;
  }
}
