import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getYearlyHoroscope } from "@/lib/services/yearlyHoroscope";

const YEAR = 2026;

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
    description: `${name} yearly horoscope 2026 – career, love, finance, health and remedies.`,
  };
}

/* -----------------------------
   REUSABLE CARD SECTION
-------------------------------- */
function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {title}
      </h2>
      <div className="text-gray-800 leading-relaxed space-y-4">
        {children}
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
    <main className="mx-auto max-w-4xl px-4 py-10 bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="mb-10 flex items-center gap-5 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-6 py-8 text-white">
        <Image
          src={`/zodiac/${sign}.png`}
          alt={signName}
          width={64}
          height={64}
          className="rounded-full bg-white p-2"
        />
        <div>
          <h1 className="text-3xl font-extrabold">
            {signName} Horoscope {YEAR}
          </h1>
          {data.tagline && (
            <p className="mt-1 text-purple-100">
              {data.tagline}
            </p>
          )}
        </div>
      </section>

      <div className="space-y-8">

        {/* INTRODUCTION */}
        {data.introduction && (
          <CardSection title={data.introduction.heading}>
            {data.introduction.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {/* PLANETARY OVERVIEW */}
        {data.planetary_overview && (
          <CardSection title={data.planetary_overview.heading}>
            {data.planetary_overview.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {/* CAREER & FINANCE */}
        {data.career_finance && (
          <CardSection title={data.career_finance.heading}>
            {data.career_finance.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}

            {data.career_finance.practical_tips?.length > 0 && (
              <ul className="mt-4 list-disc pl-5 space-y-2">
                {data.career_finance.practical_tips.map(
                  (tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  )
                )}
              </ul>
            )}
          </CardSection>
        )}

        {/* LOVE */}
        {data.love_relationships && (
          <CardSection title={data.love_relationships.heading}>
            {data.love_relationships.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {/* HEALTH */}
        {data.health_wellness && (
          <CardSection title={data.health_wellness.heading}>
            {data.health_wellness.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </CardSection>
        )}

        {/* SPIRITUALITY */}
        {data.spirituality_remedies && (
          <CardSection title={data.spirituality_remedies.heading}>
            {data.spirituality_remedies.content.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}

            {data.spirituality_remedies.remedies?.length > 0 && (
              <ul className="mt-4 list-disc pl-5 space-y-2">
                {data.spirituality_remedies.remedies.map(
                  (r: string, i: number) => (
                    <li key={i}>{r}</li>
                  )
                )}
              </ul>
            )}
          </CardSection>
        )}

        {/* MONTHLY HIGHLIGHTS */}
        {data.monthly_highlights?.length > 0 && (
          <section className="rounded-2xl bg-purple-50 border border-purple-200 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Monthly Highlights
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.monthly_highlights.map(
                (m: { month: string; theme: string }, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {m.month}
                    </h3>
                    <p className="text-gray-700">
                      {m.theme}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        {data.faqs?.length > 0 && (
          <CardSection title="FAQs">
            {data.faqs.map(
              (f: { question: string; answer: string }, i: number) => (
                <div key={i}>
                  <p className="font-semibold text-gray-900">
                    {f.question}
                  </p>
                  <p className="text-gray-700">
                    {f.answer}
                  </p>
                </div>
              )
            )}
          </CardSection>
        )}

        {/* FINAL SUMMARY */}
        {data.final_summary && (
          <CardSection title={data.final_summary.heading}>
            <p>{data.final_summary.content}</p>
          </CardSection>
        )}

        {/* BACK */}
        <div className="pt-4">
          <Link
            href="/yearly-horoscope"
            className="font-semibold text-purple-700 hover:underline"
          >
            ← Back to all signs
          </Link>
        </div>

      </div>
    </main>
  );
}
