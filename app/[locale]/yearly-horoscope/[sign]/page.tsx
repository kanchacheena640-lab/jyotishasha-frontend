import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { getYearlyHoroscope } from "@/lib/services/yearlyHoroscope";

const YEAR = 2026;
const SITE_URL = "https://www.jyotishasha.com";

const VALID_SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
] as const;

type ValidSign = typeof VALID_SIGNS[number];

type PageProps = {
  params: Promise<{ locale: string; sign: string }>;
};

// -----------------------------
// SEO + Metadata (Bilingual)
// -----------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, sign } = await params;
  const lang = locale === "hi" ? "hi" : "en";
  const signLower = sign.toLowerCase() as ValidSign;

  if (!VALID_SIGNS.includes(signLower)) return {};

  const dict = await getDictionary(lang);

  const signName = dict.horoscope?.zodiacNames?.[signLower] 
    ?? (signLower.charAt(0).toUpperCase() + signLower.slice(1));

  const canonicalUrl = `${SITE_URL}/${lang === "hi" ? "hi/" : ""}yearly-horoscope/${signLower}`;

  return {
    title: lang === "hi" 
      ? `${signName} वार्षिक राशिफल ${YEAR} | ज्योतिषाशा` 
      : `${signName} Horoscope ${YEAR} | Vedic Predictions | Jyotishasha`,
    
    description: lang === "hi"
      ? `${signName} का वार्षिक राशिफल ${YEAR} – करियर, प्रेम, धन, स्वास्थ्य और उपाय।`
      : `${signName} yearly horoscope ${YEAR} – career, love, finance, health and remedies.`,

    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: lang === "hi" 
        ? `${signName} वार्षिक राशिफल ${YEAR}` 
        : `${signName} Horoscope ${YEAR}`,
      description: lang === "hi"
        ? `${signName} का वार्षिक राशिफल ${YEAR} – करियर, प्रेम, धन, स्वास्थ्य और उपाय।`
        : `${signName} yearly horoscope ${YEAR} – career, love, finance, health and remedies.`,
      url: canonicalUrl,
      type: "article",
      siteName: "Jyotishasha",
    },
  };
};

// -----------------------------
// Reusable Card Section
// -----------------------------
function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>
      <div className="text-gray-800 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

// -----------------------------
// Main Page
// -----------------------------
export default async function YearlySignPage({ params }: PageProps) {
  const { locale, sign } = await params;
  const lang = locale === "hi" ? "hi" : "en";
  const signLower = sign.toLowerCase() as ValidSign;

  if (!VALID_SIGNS.includes(signLower)) notFound();

  const dict = await getDictionary(lang);
  const data = await getYearlyHoroscope(YEAR, signLower, lang);   // ← lang pass kiya

  if (!data) notFound();

  const signName = dict.horoscope?.zodiacNames?.[signLower] 
    ?? (signLower.charAt(0).toUpperCase() + signLower.slice(1));

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="mb-10 flex items-center gap-5 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-6 py-8 text-white">
        <Image
          src={`/zodiac/${signLower}.png`}
          alt={signName}
          width={64}
          height={64}
          className="rounded-full bg-white p-2"
        />
        <div>
          <h1 className="text-3xl font-extrabold">
            {signName} {lang === "hi" ? `वार्षिक राशिफल ${YEAR}` : `Horoscope ${YEAR}`}
          </h1>
          {data.tagline && (
            <p className="mt-1 text-purple-100">{data.tagline}</p>
          )}
        </div>
      </section>

      <div className="space-y-8">

        {data.introduction && (
          <CardSection title={lang === "hi" ? "परिचय" : data.introduction.heading}>
            {data.introduction.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {data.planetary_overview && (
          <CardSection title={lang === "hi" ? "ग्रहों का अवलोकन" : data.planetary_overview.heading}>
            {data.planetary_overview.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {data.career_finance && (
          <CardSection title={lang === "hi" ? "करियर और वित्त" : data.career_finance.heading}>
            {data.career_finance.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
            {data.career_finance.practical_tips?.length > 0 && (
              <ul className="mt-4 list-disc pl-5 space-y-2">
                {data.career_finance.practical_tips.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </CardSection>
        )}

        {data.love_relationships && (
          <CardSection title={lang === "hi" ? "प्रेम और संबंध" : data.love_relationships.heading}>
            {data.love_relationships.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {data.health_wellness && (
          <CardSection title={lang === "hi" ? "स्वास्थ्य और कल्याण" : data.health_wellness.heading}>
            {data.health_wellness.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {data.spirituality_remedies && (
          <CardSection title={lang === "hi" ? "आध्यात्मिकता और उपाय" : data.spirituality_remedies.heading}>
            {data.spirituality_remedies.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
            {data.spirituality_remedies.remedies?.length > 0 && (
              <ul className="mt-4 list-disc pl-5 space-y-2">
                {data.spirituality_remedies.remedies.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
          </CardSection>
        )}

        {data.monthly_highlights?.length > 0 && (
          <section className="rounded-2xl bg-purple-50 border border-purple-200 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {lang === "hi" ? "मासिक हाइलाइट्स" : "Monthly Highlights"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.monthly_highlights.map((m: { month: string; theme: string }, i: number) => (
                <div key={i} className="rounded-xl bg-white p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">{m.month}</h3>
                  <p className="text-gray-700">{m.theme}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.faqs?.length > 0 && (
          <CardSection title={lang === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "FAQs"}>
            {data.faqs.map((f: { question: string; answer: string }, i: number) => (
              <div key={i}>
                <p className="font-semibold text-gray-900">{f.question}</p>
                <p className="text-gray-700">{f.answer}</p>
              </div>
            ))}
          </CardSection>
        )}

        {data.final_summary && (
          <CardSection title={data.final_summary.heading}>
            <p>{data.final_summary.content}</p>
          </CardSection>
        )}

        <p className="text-sm text-gray-500 leading-relaxed">
          {lang === "hi" 
            ? "यह वार्षिक राशिफल शास्त्रीय वैदिक ज्योतिष सिद्धांतों, ग्रह गोचर और ज्योतिषाशा रिसर्च मेथडोलॉजी का उपयोग करके तैयार किया गया है।"
            : "This yearly horoscope is prepared using classical Vedic astrology principles, planetary transits, and Jyotishasha research methodology."}
        </p>

        <div className="pt-4">
          <Link
            href={`/${lang}/yearly-horoscope`}
            className="font-semibold text-purple-700 hover:underline"
          >
            ← {lang === "hi" ? "सभी राशियों पर वापस जाएँ" : "Back to all signs"}
          </Link>
        </div>
      </div>
    </main>
  );
}