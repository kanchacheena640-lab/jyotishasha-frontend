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
    description: `${name} yearly horoscope 2026 – career, love, finance and health predictions.`,
  };
}

export default async function YearlySignPage({ params }: { params: { sign: string } }) {
  const sign = params.sign;
  if (!VALID_SIGNS.includes(sign)) notFound();

  const data = await getYearlyHoroscope(YEAR, sign, "en");
  if (!data) notFound();

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <section className="mb-10 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-10 text-white flex gap-6 items-center">
        <Image
          src={`/zodiac/${sign}.png`}
          alt={signName}
          width={72}
          height={72}
          className="bg-white rounded-full p-2"
        />
        <h1 className="text-3xl font-extrabold">
          {signName} Horoscope {YEAR}
        </h1>
      </section>

      <p className="mb-8 text-lg text-gray-800">
        {data.introduction?.content?.[0]}
      </p>

      <Link
        href="/yearly-horoscope"
        className="text-purple-700 font-semibold"
      >
        ← Back to all signs
      </Link>
    </main>
  );
}
