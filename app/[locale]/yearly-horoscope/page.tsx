import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionaries";

const YEAR = "2026";

const ZODIACS = [
  { sign: "aries", img: "/zodiac/aries.png" },
  { sign: "taurus", img: "/zodiac/taurus.png" },
  { sign: "gemini", img: "/zodiac/gemini.png" },
  { sign: "cancer", img: "/zodiac/cancer.png" },
  { sign: "leo", img: "/zodiac/leo.png" },
  { sign: "virgo", img: "/zodiac/virgo.png" },
  { sign: "libra", img: "/zodiac/libra.png" },
  { sign: "scorpio", img: "/zodiac/scorpio.png" },
  { sign: "sagittarius", img: "/zodiac/sagittarius.png" },
  { sign: "capricorn", img: "/zodiac/capricorn.png" },
  { sign: "aquarius", img: "/zodiac/aquarius.png" },
  { sign: "pisces", img: "/zodiac/pisces.png" },
] as const;

export default async function YearlyHoroscopePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "hi" ? "hi" : "en";

  const dict = await getDictionary(lang);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* HERO */}
      <section className="mb-12 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-12 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {lang === "hi" ? `वार्षिक राशिफल ${YEAR}` : `Yearly Horoscope ${YEAR}`}
        </h1>
        <p className="text-purple-100 text-lg max-w-2xl mx-auto">
          {lang === "hi"
            ? "अपनी राशि चुनें और जानें 2026 में आपके करियर, प्रेम, धन और स्वास्थ्य की भविष्यवाणी"
            : "Select your zodiac sign to read detailed yearly horoscope for 2026."}
        </p>
      </section>

      {/* ZODIAC GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {ZODIACS.map((z) => {
          // Fixed: Type-safe zodiac name
          const signName = (dict.horoscope?.zodiacNames as Record<string, string>)?.[z.sign] 
            ?? z.sign.charAt(0).toUpperCase() + z.sign.slice(1);

          return (
            <Link
              key={z.sign}
              href={`/${lang}/yearly-horoscope/${z.sign}`}
              className="group rounded-2xl bg-white border p-6 text-center shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Image
                src={z.img}
                alt={signName}
                width={72}
                height={72}
                className="mx-auto mb-4 transition-transform group-hover:scale-110"
              />
              <div className="font-bold text-gray-900 text-lg">{signName}</div>
              <div className="text-sm text-gray-500 mt-1">
                {lang === "hi" ? `${YEAR} राशिफल` : `${YEAR} Horoscope`}
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA SECTION */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        
        {/* Daily Horoscope CTA */}
        <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {lang === "hi" ? "दैनिक राशिफल" : "Daily Horoscope"}
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            {lang === "hi"
              ? "आज का राशिफल प्रेम, करियर और ग्रहों की सलाह के साथ"
              : "Get today’s horoscope with love, finance and planetary guidance."}
          </p>
          <Link
            href={`/${lang}/daily-horoscope/aries`}
            className="inline-block rounded-xl border border-purple-300 px-5 py-2.5 font-semibold text-gray-900 hover:bg-purple-50 transition"
          >
            {lang === "hi" ? "🔮 दैनिक राशिफल पढ़ें" : "🔮 Read Daily Horoscope"}
          </Link>
        </div>

        {/* Monthly Horoscope CTA */}
        <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {lang === "hi" ? "मासिक राशिफल" : "Monthly Horoscope"}
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            {lang === "hi"
              ? "इस महीने आपके करियर, प्रेम और स्वास्थ्य पर क्या असर पड़ेगा"
              : "See how this month shapes your career, love and health."}
          </p>
          <Link
            href={`/${lang}/monthly-horoscope/aries`}
            className="inline-block rounded-xl border border-indigo-300 px-5 py-2.5 font-semibold text-gray-900 hover:bg-indigo-50 transition"
          >
            {lang === "hi" ? "📅 मासिक राशिफल देखें" : "📅 View Monthly Horoscope"}
          </Link>
        </div>

        {/* App CTA */}
        <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {lang === "hi" ? "ज्योतिषाशा ऐप" : "Jyotishasha App"}
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            {lang === "hi"
              ? "व्यक्तिगत राशिफल, पंचांग और एक प्रश्न पूछें — मुफ्त"
              : "Personalized horoscope, Panchang & Ask One Question — free."}
          </p>
          <Link
            href={`/${lang}/app`}
            className="inline-block rounded-xl border border-yellow-300 px-5 py-2.5 font-semibold text-gray-900 hover:bg-yellow-50 transition"
          >
            {lang === "hi" ? "📱 ऐप डाउनलोड करें" : "📱 Download App"}
          </Link>
        </div>

      </section>
    </main>
  );
}