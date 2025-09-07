// utils/fetchFullKundali.ts
// Final Backend Endpoint (auto-switch via .env): http://localhost:5000 OR https://api.jyotishasha.com
// .env.local → NEXT_PUBLIC_BACKEND_URL

type KundaliRequest = {
  toolId: string;
  name: string;
  dob: string;        // DD-MM-YYYY or YYYY-MM-DD
  tob: string;        // HH:MM
  latitude: number;
  longitude: number;
  language: 'en' | 'hi';
};

const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/$/, '');

const SIGN_TO_RASHI: Record<string, number> = {
  aries: 1, taurus: 2, gemini: 3, cancer: 4,
  leo: 5, virgo: 6, libra: 7, scorpio: 8,
  sagittarius: 9, capricorn: 10, aquarius: 11, pisces: 12,
};

function toYYYYMMDD(d: string): string {
  if (!d) return d;
  if (/^\d{2}-\d{2}-\d{4}$/.test(d)) {
    const [dd, mm, yyyy] = d.split('-');
    return `${yyyy}-${mm}-${dd}`;
  }
  return d;
}

function normalizePlanets(resp: any) {
  const raw =
    resp?.planets ?? resp?.Planets ?? resp?.planet_positions ?? resp?.planetPositions ?? [];

  if (!Array.isArray(raw)) return [];

  const toInt = (x: any) => {
    const n = typeof x === 'string' ? parseInt(x, 10) : Number(x);
    return Number.isFinite(n) ? n : NaN;
  };

  return raw
    .map((p: any) => {
      const name = p?.name ?? p?.planet ?? p?.planet_name;
      const houseRaw = p?.house ?? p?.house_no ?? p?.houseNumber ?? p?.house_index;
      const house = toInt(houseRaw);
      if (!name || !Number.isFinite(house)) return null;
      if (String(name).toLowerCase().includes('ascendant')) return null;
      return { name: String(name), house };
    })
    .filter(Boolean);
}

export async function fetchFullKundali(req: KundaliRequest) {
  const payload = {
  name: req.name,
  dob: toYYYYMMDD(req.dob),
  tob: req.tob,
  latitude: req.latitude,
  longitude: req.longitude,
  language: req.language,
  toolId: req.toolId,
};

  console.log("🧪 Validating payload:", payload);

  const isValid = (
    typeof payload.name === 'string' && payload.name.trim() !== '' &&
    typeof payload.dob === 'string' && payload.dob.trim() !== '' &&
    typeof payload.tob === 'string' && payload.tob.trim() !== '' &&
    typeof payload.latitude === 'number' && !isNaN(payload.latitude) && payload.latitude !== 0 &&
    typeof payload.longitude === 'number' && !isNaN(payload.longitude) && payload.longitude !== 0
  );

  if (!isValid) {
    console.error("❌ Validation failed for:", payload);
    throw new Error('Missing or invalid required parameters.');
  }

  console.log("🚀 Payload to backend:", payload);

  const key = `kundali:${payload.name}:${payload.dob}:${payload.tob}:${payload.latitude}:${payload.longitude}:${payload.language}`;
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { ts, data } = JSON.parse(cached);
      if (Date.now() - ts < 12 * 60 * 60 * 1000) {
        const planets = normalizePlanets(data);
        return { ...data, planets, _fromCache: true };
      }
    }
  } catch {}

  // 🔍 LOG what is going to be fetched
  console.log("📡 Fetching from backend:", `${BACKEND}/api/full-kundali`);
  console.log("📤 Payload sent:", payload);

  const res = await fetch(`${BACKEND}/api/full-kundali`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error("❌ Backend error:", res.status, text || res.statusText);
    throw new Error(`Backend error ${res.status}: ${text || res.statusText}`);
  }

  const json = await res.json();
  const planets = normalizePlanets(json);
  const lagna_sign: string | undefined = json?.lagna_sign;
  const lagnaRashi = lagna_sign ? SIGN_TO_RASHI[String(lagna_sign).trim().toLowerCase()] ?? 1 : 1;
  const moon_traits = json?.moon_traits;
  const lagna_trait = json?.lagna_trait;
  const planet_overview = json?.planet_overview ?? json?.PlanetOverview ?? [];

  const out = { ...json, planets, _lagnaRashi: lagnaRashi, moon_traits, lagna_trait, planet_overview, manglik_dosh: json?.manglik_dosh, sadhesati: json?.sadhesati,};
  

  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data: out }));
  } catch {}

  // ✅ LOG Final normalized output
  console.log("✅ Normalized kundali response:", out);

  return out;
}
