export async function getYearlyHoroscope(year: string) {
  const res = await fetch(`/data/horoscopes/yearly_${year}.json`);
  if (!res.ok) throw new Error("Horoscope not found");
  return await res.json();
}
