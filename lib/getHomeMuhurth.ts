const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchEvent(activity: string) {
  const res = await fetch(`${BACKEND}/api/muhurth/list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      activity,
      latitude: 28.6139,
      longitude: 77.2090,
      days: 1,
      top_k: 1,
      language: "en",
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.results?.[0] ?? null;
}

export async function getHomeMuhurth() {

  const [
    naamkaran,
    marriage,
    grah_pravesh,
    vehicle,
    gold,
    travel,
  ] = await Promise.all([
    fetchEvent("naamkaran"),
    fetchEvent("marriage"),
    fetchEvent("grah_pravesh"),
    fetchEvent("vehicle"),
    fetchEvent("gold"),
    fetchEvent("travel"),
  ]);

  return {
    naamkaran,
    marriage,
    grah_pravesh,
    vehicle,
    gold,
    travel,
  };
}