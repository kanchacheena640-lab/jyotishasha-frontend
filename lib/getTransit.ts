const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface TransitResponse {
  timestamp_ist: string;
  positions: Record<string, any>;
  future_transits: Record<
    string,
    {
      planet: string;
      from_rashi: string;
      to_rashi: string;
      entering_date: string;
      exit_date: string;
    }[]
  >;
}

// 1. Function mein locale accept karo (default 'en')
export async function getTransit(locale: string = 'en'): Promise<TransitResponse | null> {
  try {
    // 2. URL mein ?lang=${locale} jodo
    const res = await fetch(`${BACKEND}/api/transit/current?lang=${locale}`, {
      method: "GET",
      next: { revalidate: 21600 }, // 6 hour cache
      headers: {
        // 3. Headers bhi update kar diye safety ke liye
        'x-jyotishasha-lang': locale,
        'Accept-Language': locale
      }
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Transit API error:", error);
    return null;
  }
}