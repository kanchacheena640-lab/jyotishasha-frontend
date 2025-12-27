export async function getYearlyHoroscope(
  year: string,
  sign: string,
  lang: string = "en"
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/yearly-horoscope?year=${year}&sign=${sign}&lang=${lang}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
