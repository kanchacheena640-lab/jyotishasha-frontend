const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

// 1. Function mein locale accept karo (default 'en' rakho)
export async function getPanchang(locale: string = "en") {

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const res = await fetch(`${BACKEND}/api/panchang`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: 28.6139,
      longitude: 77.2090,
      date: today,
      language: locale,
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  return res.json();
}