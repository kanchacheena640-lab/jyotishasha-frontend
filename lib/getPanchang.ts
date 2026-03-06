const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPanchang() {
  const res = await fetch(`${BACKEND}/api/panchang`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: 28.6139,
      longitude: 77.2090,
      date: new Date().toISOString().split("T")[0],
      language: "en",
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  return res.json();
}