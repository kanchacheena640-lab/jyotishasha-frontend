import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getYearlyHoroscope } from "@/lib/services/yearlyHoroscope";

const YEAR = "2026";

const VALID_SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { sign: string } }) {
  if (!VALID_SIGNS.includes(params.sign)) return {};

  const name = params.sign.charAt(0).toUpperCase() + params.sign.slice(1);
  return {
    title: `${name} Horoscope 2026 | Jyotishasha`,
    description: `${name} yearly horoscope 2026 – career, love, finance, health & remedies.`,
  };
}

function Section({
  title,
  content,
}: {
  title: string;
  content: string[];
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="space-y-4 text-gray-800 leading-relaxed">
        {content.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </section>
  );
}

export default async function YearlySignPage({
  params,
}: {
  params: { sign: string };
}) {
  const sign = params.sign;
  if (!VALID_SIGNS.includes(sign)) notFound();

  const data = await getYearlyHoroscope(YEAR, sign, "en");
  if (!data) notFound();

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      {/* Header */}
      <section className="mb-12 flex items-center gap-6 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-10 text-white">
        <Image
          src={`/zodiac/${sign}.png`}
          alt={signName}
          width={72}
          height={72}
          className="rounded-full bg-white p-2"
        />
        <div>
          <h1 className="text-3xl font-extrabold">
            {signName} Horoscope {YEAR}
          </h1>
          {data.tagline && (
            <p className="mt-1 text-purple-100">{data.tagline}</p>
          )}
        </div>
      </section>

      {/* Introduction */}
      {data.introduction && (
        <Section
          title={data.introduction.heading}
          content={data.introduction.content}
        />
      )}

      {/* Planetary Overview */}
      {data.planetary_overview && (
        <Section
          title={data.planetary_overview.heading}
          content={data.planetary_overview.content}
        />
      )}

      {/* Career & Finance */}
      {data.career_finance && (
        <>
          <Section
            title={data.career_finance.heading}
            content={data.career_finance.content}
          />

          {data.career_finance.practical_tips?.length > 0 && (
            <ul className="mb-10 list-disc space-y-2 pl-6 text-gray-800">
              {data.career_finance.practical_tips.map((tip: string, i: number) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Love & Relationships */}
      {data.love_relationships && (
        <Section
          title={data.love_relationships.heading}
          content={data.love_relationships.content}
        />
      )}

      {/* Health */}
      {data.health_wellness && (
        <Section
          title={data.health_wellness.heading}
          content={data.health_wellness.content}
        />
      )}

      {/* Spirituality & Remedies */}
      {data.spirituality_remedies && (
        <>
          <Section
            title={data.spirituality_remedies.heading}
            content={data.spirituality_remedies.content}
          />

          {data.spirituality_remedies.remedies?.length > 0 && (
            <ul className="mb-10 list-disc space-y-2 pl-6 text-gray-800">
              {data.spirituality_remedies.remedies.map(
                (remedy: string, i: number) => (
                  <li key={i}>{remedy}</li>
                )
              )}
            </ul>
          )}
        </>
      )}

      {/* Monthly Highlights */}
      {data.monthly_highlights?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Monthly Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.monthly_highlights.map(
              (
                item: { month: string; theme: string },
                i: number
              ) => (
                <div
                  key={i}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <h3 className="font-semibold">{item.month}</h3>
                  <p className="text-gray-700">{item.theme}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* FAQs */}
      {data.faqs?.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">FAQs</h2>
          <div className="space-y-4">
            {data.faqs.map(
              (
                faq: { question: string; answer: string },
                i: number
              ) => (
                <div key={i}>
                  <p className="font-semibold">{faq.question}</p>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Final Summary */}
      {data.final_summary && (
        <Section
          title={data.final_summary.heading}
          content={[data.final_summary.content]}
        />
      )}

      <Link href="/yearly-horoscope" className="font-semibold text-purple-700">
        ← Back to all signs
      </Link>
    </main>
  );
}
