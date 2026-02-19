// app/holi/[year]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export async function generateMetadata({
  params,
}: {
  params: { year: string };
}): Promise<Metadata> {
  if (!isValidYear(params.year))
    return { robots: { index: false, follow: false } };

  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);
  if (!data)
    return { robots: { index: false, follow: false } };

  return {
    title: `Holi ${year} Date & Holika Dahan Muhurat | Jyotishasha`,
    description: `Holi ${year} date, Holika Dahan muhurat, sunset timing and Panchang calculation.`,
    alternates: { canonical: `/holi-${year}` },
    robots: { index: true, follow: true },
  };
}

export default async function HoliYearPage({
  params,
}: {
  params: { year: string };
}) {
  if (!isValidYear(params.year)) return notFound();

  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);
  if (!data) return notFound();

  const holika = data.holika_dahan;
  const dhulandi = data.holi_dhulandi?.date;
  const rashiTips = data.rashi_tips ?? {};

  return (
    <div className="bg-gradient-to-b from-orange-100 to-pink-100 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Holi {year} Date & Time in India: Holika Dahan Muhurat and Rangwali Holi
        </h1>

        {/* Year Navigation */}
        <div className="flex gap-6 mb-10 text-sm">
          <Link href={`/holi-${year - 1}`} className="text-orange-700 hover:underline">
            Holi {year - 1}
          </Link>

          <span className="font-semibold border-b-2 border-orange-600 pb-1">
            Holi {year}
          </span>

          <Link href={`/holi-${year + 1}`} className="text-orange-700 hover:underline">
            Holi {year + 1}
          </Link>
        </div>

        {/* Snapshot Card */}
        <section className="relative overflow-hidden rounded-2xl mb-14 shadow-lg border border-blue-200">

          {/* Soft Blue Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-100 opacity-70" />

          <div className="relative p-8">

            <h2 className="text-2xl font-semibold mb-6 text-blue-800">
              🔥 Holika Dahan {year} – Key Details
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-gray-500 text-xs uppercase">Date</div>
                <div className="font-semibold text-lg text-gray-900">
                  {holika.date}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-gray-500 text-xs uppercase">Muhurat</div>
                <div className="font-semibold text-lg text-gray-900">
                  {holika.muhurta ?? "-"}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-gray-500 text-xs uppercase">Sunset</div>
                <div className="font-semibold text-lg text-gray-900">
                  {holika.sunset ?? "-"}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-gray-500 text-xs uppercase">Duration</div>
                <div className="font-semibold text-lg text-gray-900">
                  {holika.duration ?? "-"}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-gray-500 text-xs uppercase">Method</div>
                <div className="font-semibold text-lg text-gray-900">
                  {holika.method ?? "-"}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Rangwali Holi */}
        <section className="bg-pink-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-3">
            Rangwali Holi (Dhulandi)
          </h2>
          <p className="text-sm">
            <strong>Date:</strong> {dhulandi ?? "-"}
          </p>
        </section>

        {/* Rashi Wise Tips */}
        {Object.keys(rashiTips).length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Rashi Wise Holika Tips
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(rashiTips).map(([sign, item]) => (
                <div key={sign} className="border rounded-xl p-5 bg-white shadow-sm">
                  <div className="font-semibold text-lg mb-2">{sign}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    Moon in House {item.moon_transit_house}
                  </div>
                  <p className="text-sm">{item.tip.en}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Summary Paragraph */}
        <section className="mb-12">
          <p className="text-gray-800 leading-relaxed">
            Holi {year} will be observed with Holika Dahan on {holika.date}
            {holika.muhurta ? ` during ${holika.muhurta}` : ""}.
            The muhurat is calculated using Phalguna Purnima, sunset timing,
            and traditional Panchang rules. Rangwali Holi will be celebrated
            on {dhulandi}. All timings are calculated using sidereal zodiac
            and Vedic calendar principles.
          </p>
        </section>

        {/* Authority Note */}
        <p className="mt-10 text-sm text-gray-500 leading-relaxed">
          This Holi calculation follows classical Vedic Panchang rules,
          tithi boundaries, and Bhadra avoidance principles using
          Lahiri Ayanamsa.
        </p>

      </article>
    </div>
  );
}
