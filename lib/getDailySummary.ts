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

export async function getDailySummary(): Promise<HoroscopeResponse | null> {
  try {
    const res = await fetch(
      `${BACKEND}/api/daily-horoscope-summary`,
      { 
        next: { revalidate: 1800 }, // 30 मिनट का कैशिंग
        headers: {
          'Content-Type': 'application/json',
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