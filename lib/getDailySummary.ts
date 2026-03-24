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
      // 2. URL ke peeche query parameter jodo
      `${BACKEND}/api/daily-horoscope-summary?lang=${locale}`,
      { 
        next: { revalidate: 1800 }, // 30 मिनट का कैशिंग
        headers: {
          'Content-Type': 'application/json',
          // 3. Header mein bhi bhasha bhej do (Safety ke liye)
          'x-jyotishasha-lang': locale,
          'Accept-Language': locale
        }
      }
    );

    if (!res.ok) {
      console.error("API Fetch Error:", res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
}