// app/holi/[year]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import LocationText from "@/components/location/LocationText";

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
    alternates: {
      canonical: `https://www.jyotishasha.com/holi-${year}`,
    },
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

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `Why does Holi ${year} date change every year?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Holi follows the lunar calendar based on Phalguna Purnima."
                  }
                },
                {
                  "@type": "Question",
                  name: "What is the correct time for Holika Dahan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Holika Dahan is performed during the Pradosh period after sunset avoiding Bhadra."
                  }
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: `Holi ${year} Complete Explanation by Jyotishasha`,
              description: `Detailed explanation of Holi ${year}, Holika Dahan Muhurat and Rangwali Holi significance.`,
              thumbnailUrl: "https://i.ytimg.com/vi/3rgZa19zWP8/maxresdefault.jpg",
              uploadDate: new Date().toISOString(),
              embedUrl: "https://www.youtube.com/embed/3rgZa19zWP8",
              publisher: {
                "@type": "Organization",
                name: "Jyotishasha",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.jyotishasha.com/logo.png"
                }
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.jyotishasha.com"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Festivals",
                  item: "https://www.jyotishasha.com/festivals"
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `Holi ${year}`,
                  item: `https://www.jyotishasha.com/holi-${year}`
                }
              ]
            })
          }}
        />

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Holi {year} Date & Time <LocationText />: Holika Dahan Muhurat and Rangwali Holi
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
            <div className="text-3xl font-bold mt-2">{formatDateDDMMYYYY(dhulandi ?? "")}</div>
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
        <section className="mb-16">

          <div className="rounded-2xl border border-blue-200 shadow-md p-8 bg-gradient-to-r from-blue-50 via-white to-blue-100">

            <h2 className="text-2xl font-semibold mb-6 text-blue-900">
              Rangwali Holi {year} – Festival of Colors
            </h2>

            <div className="text-gray-800 leading-relaxed space-y-4">

              <p>
                Rangwali Holi in {year} will be celebrated on{" "}
                <strong>{formatDateDDMMYYYY(dhulandi ?? "")}</strong>.
                It is observed on the day following Holika Dahan and marks the
                joyful celebration of colors across India.
              </p>

              <p>
                On this day, people apply gulal, exchange sweets, and celebrate
                unity and harmony. Traditionally, it represents the victory of
                good over evil and the arrival of spring season.
              </p>

              <p>
                In many regions, Holi festivities begin in the morning and continue
                throughout the day with music, community gatherings, and festive meals.
              </p>

            </div>

          </div>
        </section>
        {/* FAQ Section */}
        <section className="mb-16">
          <div className="rounded-2xl border border-blue-200 shadow-md p-8 bg-white">

            <h2 className="text-2xl font-semibold mb-8 text-blue-900">
              Holi {year} – Frequently Asked Questions
            </h2>

            <div className="space-y-6 text-gray-800">

              <div>
                <h3 className="font-semibold text-lg">
                  Why does Holi date change every year?
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Holi is determined by Phalguna Purnima according to the Hindu lunar
                  calendar. Since lunar months do not match the Gregorian calendar
                  exactly, Holi dates shift every year.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  What is the correct time for Holika Dahan?
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Holika Dahan is performed during the Pradosh period after sunset,
                  provided Bhadra (Vishti Karana) is not active during that time.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Is Holika Dahan time location specific?
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Yes. Sunset timing and tithi boundaries vary based on geographical
                  location. Panchang calculations depend on latitude and longitude.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  What is the difference between Holika Dahan and Rangwali Holi?
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Holika Dahan is the bonfire ritual performed on the evening of
                  Purnima, while Rangwali Holi is celebrated the next day with colors.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* Authority / EEAT Section */}
        <section className="mb-20">
          <div className="rounded-2xl border border-blue-200 shadow-md p-8 bg-gradient-to-r from-blue-50 via-white to-blue-100">

            <h2 className="text-xl font-semibold mb-4 text-blue-900">
              Panchang Calculation Methodology
            </h2>

            <p className="text-sm text-gray-800 leading-relaxed">
              Holi {year} dates and Holika Dahan muhurat on this page are calculated
              using classical Vedic Panchang principles including Phalguna Purnima
              validation, Pradosh period alignment, Bhadra avoidance rules and
              sidereal (Lahiri) ayanamsa based astronomical calculations.
            </p>

            <p className="mt-4 text-sm text-gray-800 leading-relaxed">
              Sunset timings and tithi boundaries are computed according to the
              specified geographical coordinates. All festival timings are location
              sensitive and derived using traditional Hindu calendar algorithms.
            </p>

            <p className="mt-4 text-sm text-gray-800 leading-relaxed">
              This content is prepared by Jyotishasha research methodology,
              combining classical scriptures, Panchang rules and modern astronomical
              precision for accuracy.
            </p>

          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-20">
          <div className="rounded-2xl border border-blue-200 shadow-md p-8 bg-white">

            <h2 className="text-xl font-semibold mb-6 text-blue-900">
              Explore More Hindu Festival & Panchang Resources
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">

              <Link href="/free-kundali" className="text-blue-700 hover:underline">
                Free Kundali with Reading & Yog Dosh Analysis
              </Link>

              <Link href="/tools" className="text-blue-700 hover:underline">
                Free Astrology Tools
              </Link>

              <Link href="/love" className="text-blue-700 hover:underline">
                Love Compatibility & Match Making
              </Link>

              <Link href="/panchang/2026-02-19" className="text-blue-700 hover:underline">
                Today Panchang & Shubh Muhurat
              </Link>

              <Link href={`/holi-${year - 1}`} className="text-blue-700 hover:underline">
                Holi {year - 1} Date & Muhurat
              </Link>

              <Link href={`/holi-${year + 1}`} className="text-blue-700 hover:underline">
                Holi {year + 1} Date & Muhurat
              </Link>

            </div>

          </div>
        </section>
        {/* YouTube Video Section */}
        <section className="mb-20">
          <div className="rounded-2xl border border-blue-200 shadow-md p-8 bg-gradient-to-r from-blue-50 via-white to-blue-100">

            <h2 className="text-2xl font-semibold mb-6 text-blue-900">
              Holi {year} – Watch Complete Explanation Video
            </h2>

            {/* YouTube Embed */}
            <div className="aspect-video mb-6">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/3rgZa19zWP8"
                title="Opel Stone : One for Love & Wealth"
                frameBorder="0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Subscribe CTA */}
            <div className="text-center">
              <a
                href="https://www.youtube.com/@Jyotishasha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                🔔 Subscribe to Jyotishasha on YouTube
              </a>
            </div>

          </div>
        </section>

      </article>
    </div>
  );
}
