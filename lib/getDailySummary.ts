import { istDateKey } from "./istDate";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;

// डेटा के स्ट्रक्चर को डिफाइन करें
interface HoroscopeResponse {
  date: string;
  data: Record<string, {
    preview: string;
    lucky_color: string;
    lucky_number: string;
  }>;
}

// 1. Function mein locale accept karo
export async function getDailySummary(locale: string = 'en'): Promise<HoroscopeResponse | null> {
  try {
    const res = await fetch(
      // 2. URL ke peeche query parameter jodo. `date` (IST YYYY-MM-DD, ignored
      // by the backend) keys the cache per IST day, so yesterday's cached
      // previews are never served after IST midnight -- see lib/istDate.ts.
      `${BACKEND}/api/daily-horoscope-summary?lang=${locale}&date=${istDateKey()}`,
      { 
        next: { revalidate: 1800 }, // 30 मिनट का कैशिंग
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
}