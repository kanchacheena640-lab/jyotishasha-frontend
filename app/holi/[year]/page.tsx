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

function formatDateDDMMYYYY(dateStr?: string) {
  if (!dateStr) return "-";

  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
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
    title: `Holi ${year} Date & Time in India: Holika Dahan Muhurat and Rangwali Holi`,
    description: `Holi ${year} date, Holika Dahan muhurat, Bhadra rules and Rangwali Holi celebration details.`,
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
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Holi {year} Date & Time in India: Holika Dahan Muhurat and Rangwali Holi
        </h1>

        {/* Year Navigation */}
        <div className="flex gap-6 mb-12 text-sm">
          <Link href={`/holi-${year - 1}`} className="text-blue-700 hover:underline">
            Holi {year - 1}
          </Link>

          <span className="font-semibold border-b-2 border-blue-700 pb-1">
            Holi {year}
          </span>

          <Link href={`/holi-${year + 1}`} className="text-blue-700 hover:underline">
            Holi {year + 1}
          </Link>
        </div>

        {/* Top Date Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="bg-blue-900 text-white rounded-2xl p-8 shadow-xl">
            <div className="text-sm uppercase opacity-80">Holika Dahan</div>
            <div className="text-3xl font-bold mt-2">{formatDateDDMMYYYY(holika.date)}</div>
          </div>

          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-2xl p-8 shadow-xl">
            <div className="text-sm uppercase opacity-80">Rangwali Holi</div>
            <div className="text-3xl font-bold mt-2">{formatDateDDMMYYYY(dhulandi)}</div>
          </div>
        </section>

        {/* Shift Message */}
        {holika.method?.includes("Day 2") && (
          <div className="mb-12 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
            <p className="text-gray-800 text-sm">
              Due to Bhadra on the previous day, Holika Dahan has been shifted to{" "}
              <strong>{formatDateDDMMYYYY(holika.date)}</strong> during{" "}
              <strong>{holika.muhurta}</strong>.
            </p>
          </div>
        )}

        {/* Holika Details Card */}
        <section className="bg-white border rounded-2xl p-8 shadow-sm mb-14">
          <h2 className="text-2xl font-semibold mb-6">
            Holika Dahan {year} Details
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-xs uppercase text-gray-500">Date</div>
              <div className="font-bold text-lg mt-2">{formatDateDDMMYYYY(holika.date)}</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-xs uppercase text-gray-500">Muhurat</div>
              <div className="font-bold text-lg mt-2">
                {holika.muhurta ?? "-"}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-xs uppercase text-gray-500">Moon Sign</div>
              <div className="font-bold text-lg mt-2">
                {data.moon_sign_on_holi ?? "-"}
              </div>
            </div>
          </div>
        </section>

        {/* Rashi Tips */}
        {Object.keys(rashiTips).length > 0 && (
          <section className="mb-16">

            <h2 className="text-2xl font-semibold mb-8 text-blue-900">
              Rashi Wise Holika Dahan Tips
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {[
                "aries",
                "taurus",
                "gemini",
                "cancer",
                "leo",
                "virgo",
                "libra",
                "scorpio",
                "sagittarius",
                "capricorn",
                "aquarius",
                "pisces",
              ]
                .filter((sign) => rashiTips[sign])
                .map((sign) => {
                  const item = rashiTips[sign];

                  return (
                    <div
                      key={sign}
                      className="relative overflow-hidden rounded-2xl border border-blue-200 shadow-md p-6 bg-gradient-to-r from-blue-50 via-white to-blue-100"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={`/zodiac/${sign}.png`}
                          alt={`${sign} zodiac sign`}
                          className="w-10 h-10 object-contain"
                        />

                        <div className="font-semibold text-lg capitalize text-blue-900">
                          {sign}
                        </div>
                      </div>

                      {/* Tip */}
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {item.tip.en}
                      </p>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* Rangwali Holi Section */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-4">
            Rangwali Holi {year}
          </h2>

          <p className="text-gray-800 leading-relaxed">
            Rangwali Holi will be celebrated on <strong>{dhulandi}</strong>.
            This festival marks joy, celebration and the symbolic victory
            of positivity over negativity.
          </p>
        </section>

        {/* Authority Note */}
        <p className="mt-10 text-sm text-gray-500 leading-relaxed">
          This Holi calculation follows classical Vedic Panchang rules,
          including Purnima tithi validation, sunset timing and Bhadra avoidance,
          calculated using sidereal zodiac (Lahiri Ayanamsa).
        </p>

      </article>
    </div>
  );
}
