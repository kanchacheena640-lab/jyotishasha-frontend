// utils/fetchCurrentTransits.ts
const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/$/, '');

const SIGN_TO_RASHI: Record<string, number> = {
  aries: 1, taurus: 2, gemini: 3, cancer: 4,
  leo: 5, virgo: 6, libra: 7, scorpio: 8,
  sagittarius: 9, capricorn: 10, aquarius: 11, pisces: 12,
};

export async function fetchCurrentTransits(lagnaRashi: number = 1) {
  try {
    const res = await fetch(`${BACKEND}/api/transit/current`);
    const json = await res.json();
    const raw = json.positions || {};

    const planets = Object.entries(raw).map(([planet, data]: any) => {
      const sign = String(data.rashi || '').toLowerCase();
      const signIndex = SIGN_TO_RASHI[sign];
      const house = ((signIndex - lagnaRashi + 12) % 12) + 1;

      return {
        name: planet,
        sign: data.rashi,
        degree: data.degree,
        motion: data.motion,
        house: house,
      };
    });

    return {
      datetime: json.timestamp_ist,
      planets,
    };
  } catch (err) {
    console.warn("⚠️ fetchCurrentTransits failed:", err);
    return null;
  }
}
