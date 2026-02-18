// app/holi/[year]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BACKEND = "https://jyotishasha-backend.onrender.com";

const DEFAULT_LAT = 26.84;
const DEFAULT_LON = 80.94;

type Tip = { en: string; hi: string };

type HoliApiResponse = {
  year: number;
  holika_dahan: {
    date: string;
    sunset?: string;
    muhurta?: string;
    duration?: string;
    method?: string;
    note?: string;
  };
  holi_dhulandi?: { date: string };
  moon_sign_on_holi?: string;
  rashi_tips?: Record<string, { moon_transit_house: number; tip: Tip }>;
};

function isValidYear(raw: string) {
  return /^\d{4}$/.test(raw);
}

function clampYear(y: number) {
  const now = new Date().getFullYear();
  return Math.min(Math.max(y, now - 2), now + 20);
}

async function fetchHoli(year: number): Promise<HoliApiResponse | null> {
  try {
    const res = await fetch(`${BACKEND}/api/festivals/holi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: DEFAULT_LAT,
        longitude: DEFAULT_LON,
        year,
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  if (!isValidYear(params.year)) return { robots: { index: false, follow: false } };
  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);
  if (!data) return { robots: { index: false, follow: false } };

  return {
    title: `Holi ${year} Date & Holika Dahan Muhurat | Jyotishasha`,
    description: `Holi ${year} date, Holika Dahan muhurat, sunset timing and Panchang calculation. Accurate Hindu calendar based details.`,
    alternates: { canonical: `/holi-${year}` },
    robots: { index: true, follow: true },
  };
}

export default async function HoliYearPage({ params }: { params: { year: string } }) {
  if (!isValidYear(params.year)) return notFound();
  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);
  if (!data) return notFound();

  const holika = data.holika_dahan;
  const dhulandi = data.holi_dhulandi?.date;
  const tips = data.rashi_tips ?? null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 bg-slate-50 text-slate-900">

      {/* HERO */}
      <header className="rounded-3xl bg-gradient-to-br from-orange-50 via-white to-pink-50 p-8 shadow-md border">
        <h1 className="text-4xl font-bold">
          Holi {year} Date & Holika Dahan Muhurat
        </h1>

        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          Holi {year} will be observed with Holika Dahan on <b>{holika.date}</b>
          {holika.muhurta ? ` during ${holika.muhurta}` : ""}.
          The date is determined by Phalguna Purnima according to Hindu Panchang rules.
        </p>

        <p className="mt-4 text-slate-600 leading-relaxed">
          This page explains the correct Panchang logic, Bhadra avoidance,
          sunset calculation, Moon sign influence and spiritual meaning.
        </p>
      </header>

      {/* ABOUT HOLI */}
      <section className="mt-10 bg-white rounded-3xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-4">About Holi Festival</h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          Holi symbolizes the victory of devotion over ego, inspired by the legend of Prahlada.
          Holika Dahan represents the burning of negativity and protection of righteousness.
        </p>

        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li><b>Holika Dahan</b> – Bonfire ritual after sunset on Purnima.</li>
          <li><b>Dhulandi</b> – Festival of colors celebrated the next day.</li>
        </ul>

        <p className="mt-4 text-slate-600">
          Holi dates change every year because Hindu festivals follow lunar tithis.
        </p>
      </section>

      {/* MUHURAT */}
      <section className="mt-10 bg-white rounded-3xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">Holika Dahan Muhurat</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div><b>Date:</b> {holika.date}</div>
            {holika.sunset && <div className="mt-2"><b>Sunset:</b> {holika.sunset}</div>}
            {holika.muhurta && <div className="mt-2"><b>Muhurat:</b> {holika.muhurta}</div>}
            {holika.duration && <div className="mt-2"><b>Duration:</b> {holika.duration}</div>}
          </div>

          <div className="text-slate-700 leading-relaxed">
            Holika Dahan is performed during Pradosh period after sunset,
            provided Purnima tithi is valid and Bhadra does not obstruct the muhurat.
          </div>
        </div>
      </section>

      {/* MOON SIGN */}
      {data.moon_sign_on_holi && (
        <section className="mt-10 bg-white rounded-3xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-4">Moon Sign on Holika Dahan</h2>
          <p className="text-slate-700">
            Moon will be in <b>{data.moon_sign_on_holi}</b> on Holika Dahan evening.
            This influences emotional energy and spiritual focus.
          </p>
        </section>
      )}

      {/* RASHI TIPS */}
      {tips && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Rashi-wise Holi Tips</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(tips).map(([sign, item]) => (
              <div key={sign} className="bg-white rounded-2xl border shadow-sm p-6">
                <h3 className="font-semibold text-lg">{sign}</h3>
                <div className="text-sm text-slate-600 mt-1">
                  Moon in House {item.moon_transit_house}
                </div>
                <p className="mt-3 text-slate-800 text-sm">{item.tip.en}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mt-12 bg-white rounded-3xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">Holi {year} FAQ</h2>

        <div className="space-y-6 text-slate-700">
          <div>
            <h3 className="font-semibold">Why does Holi date change every year?</h3>
            <p className="mt-2">
              Holi follows lunar calendar rules based on Phalguna Purnima,
              not fixed Gregorian dates.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Is Holika Dahan time location specific?</h3>
            <p className="mt-2">
              Yes. Sunset timing and tithi boundaries depend on latitude and longitude.
            </p>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="mt-12 bg-white rounded-3xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-4">
          Holi {year} – Complete Explanation Video
        </h2>

        <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title={`Holi ${year} Video`}
            allowFullScreen
          ></iframe>
        </div>
      </section>

    </main>
  );
}
