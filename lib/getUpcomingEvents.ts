const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getUpcomingEvents(locale: string = "en") {
  try {
    const res = await fetch(`${BACKEND}/api/events/home-upcoming`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: 28.6139,
        longitude: 77.2090,
        language: locale,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json?.events ?? [];

  } catch (error) {
    return [];
  }
}