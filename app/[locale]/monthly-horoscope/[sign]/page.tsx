import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.jyotishasha.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jyotishasha.com";

const VALID_SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra",
  "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
] as const;

type ValidSign = typeof VALID_SIGNS[number];

type PageProps = {
  params: Promise<{ locale: string; sign: string }>;
};

// -----------------------------
// SEO + Metadata
// -----------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, sign } = await params;
  const lang = locale === "hi" ? "hi" : "en";
  const signLower = sign.toLowerCase() as ValidSign;

  if (!VALID_SIGNS.includes(signLower)) return {};

  const dict = await getDictionary(lang);

  const signName = dict.horoscope?.zodiacNames?.[signLower] 
    ?? (signLower.charAt(0).toUpperCase() + signLower.slice(1));

  const canonicalUrl = `${SITE_URL}/${lang === "hi" ? "hi/" : ""}monthly-horoscope/${signLower}`;

  return {
    title: lang === "hi" 
      ? `${signName} मासिक राशिफल | ज्योतिषाशा` 
      : `${signName} Monthly Horoscope | Jyotishasha`,
    
    description: lang === "hi"
      ? `${signName} का मासिक राशिफल - करियर, प्रेम, स्वास्थ्य, धन और उपाय सहित।`
      : `Read the monthly horoscope for ${signName}. Career, love, health, money and practical guidance.`,

    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// -----------------------------
// Data Fetch
// -----------------------------
async function getMonthlyHoroscope(sign: string) {
  const res = await fetch(`${API_BASE}/api/monthly-horoscope?sign=${sign}`, {
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!res.ok) return null;
  return res.json();
}

// -----------------------------
// Page Component
// -----------------------------
export default async function MonthlyHoroscopePage({ params }: PageProps) {
  const { locale, sign } = await params;
  const lang = locale === "hi" ? "hi" : "en";
  const signLower = sign.toLowerCase() as ValidSign;

  if (!VALID_SIGNS.includes(signLower)) notFound();

  const dict = await getDictionary(lang);
  const data = await getMonthlyHoroscope(signLower);

  if (!data) notFound();

  const signName = dict.horoscope?.zodiacNames?.[signLower] 
    ?? (signLower.charAt(0).toUpperCase() + signLower.slice(1));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* HERO */}
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-700 px-8 py-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          {lang === "hi" ? `${signName} मासिक राशिफल` : data.title}
        </h1>
      </div>

      <div className="space-y-8">

        {/* THEME */}
        <section className="rounded-2xl bg-white border shadow p-7">
          <h2 className="text-2xl font-semibold mb-4">
            {lang === "hi" ? "मासिक थीम" : "Monthly Theme"}
          </h2>
          <p className="leading-relaxed text-gray-700">{data.theme}</p>
        </section>

        {/* CAREER & MONEY */}
        <section className="rounded-2xl bg-white border shadow p-7">
          <h2 className="text-2xl font-semibold mb-4">
            {lang === "hi" ? "करियर और धन" : "Career & Money"}
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-700">
            {data.career_money}
          </p>
        </section>

        {/* LOVE */}
        <section className="rounded-2xl bg-white border shadow p-7">
          <h2 className="text-2xl font-semibold mb-4">
            {lang === "hi" ? "प्रेम और संबंध" : "Love & Relationships"}
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-700">
            {data.love_relationships}
          </p>
        </section>

        {/* HEALTH */}
        <section className="rounded-2xl bg-white border shadow p-7">
          <h2 className="text-2xl font-semibold mb-4">
            {lang === "hi" ? "स्वास्थ्य और जीवनशैली" : "Health & Lifestyle"}
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-700">
            {data.health_lifestyle}
          </p>
        </section>

        {/* KEY DATES */}
        {Array.isArray(data.key_dates) && data.key_dates.length > 0 && (
          <section className="rounded-2xl bg-purple-50 border border-purple-200 p-7">
            <h2 className="text-2xl font-semibold mb-4">
              {lang === "hi" ? "महत्वपूर्ण तिथियाँ" : "Important Dates"}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {data.key_dates.map((d: string, i: number) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>
        )}

        {/* MONTHLY ADVICE */}
        <section className="rounded-2xl bg-amber-50 border border-amber-200 p-7">
          <h2 className="text-2xl font-semibold mb-4">
            {lang === "hi" ? "मासिक सलाह" : "Monthly Advice"}
          </h2>
          <p className="font-medium text-gray-800">{data.monthly_advice}</p>
        </section>

        {/* Internal Links */}
        <div className="flex flex-wrap gap-4 pt-6">
          <a
            href={`/${lang}/daily-horoscope/${signLower}`}
            className="flex-1 text-center rounded-2xl bg-white border border-purple-300 py-3 font-semibold hover:bg-purple-50 transition"
          >
            {lang === "hi" ? "🔮 दैनिक राशिफल" : "🔮 Daily Horoscope"}
          </a>
          <a
            href={`/${lang}/yearly-horoscope/${signLower}`}
            className="flex-1 text-center rounded-2xl bg-white border border-indigo-300 py-3 font-semibold hover:bg-indigo-50 transition"
          >
            {lang === "hi" ? "📅 वार्षिक राशिफल" : "📅 Yearly Horoscope"}
          </a>
        </div>
      </div>
    </main>
  );
}