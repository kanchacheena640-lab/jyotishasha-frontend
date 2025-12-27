export async function getYearlyHoroscope(
  year: string | number,
  sign: string,
  lang: string = "en"
) {
  const API_BASE =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://jyotishasha-backend.onrender.com";

  try {
    const res = await fetch(
      `${API_BASE}/api/yearly-horoscope?year=${year}&sign=${sign}&lang=${lang}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
