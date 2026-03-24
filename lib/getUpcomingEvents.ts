const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

// 1. Function mein locale accept karo
export async function getUpcomingEvents(locale: string = "en") {
  try {
    const res = await fetch(`${BACKEND}/api/events/home-upcoming`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-jyotishasha-lang": locale 
      },
      body: JSON.stringify({
        latitude: 26.8467,
        longitude: 80.9462,
        // 2. Backend ko bhasha bhej di
        language: locale, 
      }),
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!res.ok) {
      console.error("Upcoming API failed:", res.status);
      return [];
    }

    const json = await res.json();
    return json?.events ?? [];

  } catch (error) {
    console.error("Upcoming events fetch error:", error);
    return [];
  }
}