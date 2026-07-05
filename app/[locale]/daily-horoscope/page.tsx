import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";

const SITE_URL = "https://www.jyotishasha.com";

const ZODIACS = [
  { sign: "aries", img: "/zodiac/aries.png", emoji: "♈" },
  { sign: "taurus", img: "/zodiac/taurus.png", emoji: "♉" },
  { sign: "gemini", img: "/zodiac/gemini.png", emoji: "♊" },
  { sign: "cancer", img: "/zodiac/cancer.png", emoji: "♋" },
  { sign: "leo", img: "/zodiac/leo.png", emoji: "♌" },
  { sign: "virgo", img: "/zodiac/virgo.png", emoji: "♍" },
  { sign: "libra", img: "/zodiac/libra.png", emoji: "♎" },
  { sign: "scorpio", img: "/zodiac/scorpio.png", emoji: "♏" },
  { sign: "sagittarius", img: "/zodiac/sagittarius.png", emoji: "♐" },
  { sign: "capricorn", img: "/zodiac/capricorn.png", emoji: "♑" },
  { sign: "aquarius", img: "/zodiac/aquarius.png", emoji: "♒" },
  { sign: "pisces", img: "/zodiac/pisces.png", emoji: "♓" },
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "hi" ? "hi" : "en";
  const langPath = lang === "hi" ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${langPath}/daily-horoscope`;

  const title = lang === "hi"
    ? "दैनिक राशिफल - सभी 12 राशियाँ | ज्योतिष आशा"
    : "Daily Horoscope - All 12 Zodiac Signs | Jyotishasha";

  const description = lang === "hi"
    ? "अपनी राशि चुनें और आज का राशिफल पढ़ें - प्रेम, करियर, धन और स्वास्थ्य की भविष्यवाणी।"
    : "Select your zodiac sign and read today's horoscope - love, career, finance and health predictions.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Jyotishasha",
      images: [{ url: "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg", width: 1730, height: 909, alt: "Jyotishasha – Free Kundali, Panchang & Muhurat" }],
    },
  };
}

export default async function DailyHoroscopeIndexPage({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === "hi" ? "hi" : "en";
  const langPath = lang === "hi" ? "/hi" : "";

  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* HERO */}
      <section className="mb-12 rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-800 to-indigo-900 px-8 py-12 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {lang === "hi" ? "दैनिक राशिफल" : "Daily Horoscope"}
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          {lang === "hi"
            ? "अपनी राशि चुनें और जानें आज प्रेम, करियर, धन और स्वास्थ्य पर ग्रहों का प्रभाव।"
            : "Select your zodiac sign to read today's horoscope for love, career, finance and health."}
        </p>
      </section>

      {/* ZODIAC GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {ZODIACS.map((z) => {
          const signName =
            (dict.horoscope?.zodiacNames as Record<string, string>)?.[z.sign] ??
            z.sign.charAt(0).toUpperCase() + z.sign.slice(1);

          return (
            <Link
              key={z.sign}
              href={`${langPath}/daily-horoscope/${z.sign}`}
              className="group rounded-2xl bg-white border p-6 text-center shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl mb-1">{z.emoji}</div>
              <Image
                src={z.img}
                alt={signName}
                width={72}
                height={72}
                className="mx-auto mb-4 transition-transform group-hover:scale-110"
              />
              <div className="font-bold text-gray-900 text-lg">{signName}</div>
              <div className="text-sm text-gray-500 mt-1">
                {lang === "hi" ? "आज का राशिफल" : "Today's Horoscope"}
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA SECTION */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {lang === "hi" ? "मासिक राशिफल" : "Monthly Horoscope"}
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            {lang === "hi"
              ? "इस महीने आपके करियर, प्रेम और स्वास्थ्य पर क्या असर पड़ेगा।"
              : "See how this month shapes your career, love and health."}
          </p>
          <Link
            href={`${langPath}/monthly-horoscope`}
            className="inline-block rounded-xl border border-indigo-300 px-5 py-2.5 font-semibold text-gray-900 hover:bg-indigo-50 transition"
          >
            {lang === "hi" ? "📅 मासिक राशिफल देखें" : "📅 View Monthly Horoscope"}
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {lang === "hi" ? "वार्षिक राशिफल" : "Yearly Horoscope"}
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            {lang === "hi"
              ? "अपनी राशि चुनें और जानें 2026 में करियर, प्रेम, धन और स्वास्थ्य की भविष्यवाणी।"
              : "Select your zodiac sign and read the detailed yearly horoscope for 2026."}
          </p>
          <Link
            href={`${langPath}/yearly-horoscope`}
            className="inline-block rounded-xl border border-purple-300 px-5 py-2.5 font-semibold text-gray-900 hover:bg-purple-50 transition"
          >
            {lang === "hi" ? "🗓️ वार्षिक राशिफल देखें" : "🗓️ View Yearly Horoscope"}
          </Link>
        </div>
      </section>
    </main>
  );
}
