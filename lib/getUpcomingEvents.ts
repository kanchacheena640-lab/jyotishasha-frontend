const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getUpcomingEvents() {
  try {
    const res = await fetch(`${BACKEND}/api/events/home-upcoming`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: 26.8467,
        longitude: 80.9462,
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