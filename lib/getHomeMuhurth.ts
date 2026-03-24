const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

// 1. Helper function mein locale accept karo
async function fetchEvent(activity: string, locale: string = "en") {
  const res = await fetch(`${BACKEND}/api/muhurth/list`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "x-jyotishasha-lang": locale 
    },
    body: JSON.stringify({
      activity,
      latitude: 28.6139,
      longitude: 77.2090,
      days: 1,
      top_k: 1,
      // 2. Hardcoded "en" ki jagah locale variable
      language: locale, 
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.results?.[0] ?? null;
}

// 3. Main function mein locale accept karo
export async function getHomeMuhurth(locale: string = "en") {
  const [
    naamkaran,
    marriage,
    grah_pravesh,
    vehicle,
    gold,
    travel,
  ] = await Promise.all([
    // 4. Sabhi calls mein locale pass karo
    fetchEvent("naamkaran", locale),
    fetchEvent("marriage", locale),
    fetchEvent("grah_pravesh", locale),
    fetchEvent("vehicle", locale),
    fetchEvent("gold", locale),
    fetchEvent("travel", locale),
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