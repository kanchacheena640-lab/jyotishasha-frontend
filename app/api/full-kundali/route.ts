import { NextRequest, NextResponse } from "next/server";

// --- helpers (no extra deps) ---
function toInt(x: any): number {
  const n = Number(x);
  return Number.isFinite(n) ? Math.round(n) : NaN;
}

type Planet = { name: string; house: number; sign: string };
type KundaliData = {
  name?: string;
  dob?: string;
  tob?: string;
  latitude?: number;
  longitude?: number;
  rashi: string;
  lagna_sign: string;
  planets: Planet[];
};

// Canonicalize backend response -> always return { rashi, lagna_sign, planets: Planet[] }
function sanitizeKundali(raw: any): KundaliData {
  const rashi = String(raw?.rashi ?? raw?.moon_sign ?? "").trim();
  const lagna_sign = String(raw?.lagna_sign ?? raw?.lagnaSign ?? raw?.ascendant ?? "").trim();

  const planetsSrc: any[] = Array.isArray(raw?.planets) ? raw.planets : [];
  const planets: Planet[] = planetsSrc
    .map((p: any) => {
      const name = String(p?.name ?? p?.planet ?? "").trim();
      const sign = String(p?.sign ?? p?.rashi ?? p?.zodiac ?? "").trim();
      const house = toInt(p?.house ?? p?.house_no ?? p?.houseIndex);
      return { name, sign, house };
    })
    .filter((p) => p.name && p.sign && Number.isFinite(p.house) && p.house >= 1 && p.house <= 12);

  return {
    ...raw,
    rashi,
    lagna_sign,
    planets, // always an array (possibly empty, but never undefined)
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    const r = await fetch(`${base}/api/full-kundali`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await r.text();
    if (!r.ok) return new NextResponse(text, { status: r.status });

    const raw = JSON.parse(text);
    const sanitized = sanitizeKundali(raw); // 🔒 contract enforced here
    return NextResponse.json(sanitized);
  } catch (e: any) {
    console.error("full-kundali proxy error:", e);
    return new NextResponse("Proxy error", { status: 500 });
  }
}
