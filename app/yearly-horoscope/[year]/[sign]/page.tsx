import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getYearlyHoroscope } from "@/lib/services/yearlyHoroscope";

export const dynamicParams = false;

export async function generateStaticParams() {
  const years = ["2025", "2026", "2027"];
  const signs = [
    "aries","taurus","gemini","cancer","leo","virgo",
    "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
  ];

  return years.flatMap(year =>
    signs.map(sign => ({ year, sign }))
  );
}

const VALID_SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];


type PageProps = {
  params: { year: string; sign: string };
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  if (!VALID_SIGNS.includes(params.sign)) return {};
  const name = params.sign.charAt(0).toUpperCase() + params.sign.slice(1);
  return {
    title: `${name} ${params.year} Yearly Horoscope | Jyotishasha`,
    description: `${name} yearly horoscope ${params.year} based on Vedic astrology.`,
  };
}

export default async function YearlySignPage({ params }: PageProps) {
  const { year, sign } = params;
  if (!VALID_SIGNS.includes(sign)) notFound();

  const data = await getYearlyHoroscope(year, sign, "en");
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
          {signName} Horoscope {year}
        </h1>
      </section>

      <p className="mb-8 text-lg text-gray-800">
        {data.introduction?.content?.[0]}
      </p>

      <Link
        href={`/yearly-horoscope/${year}`}
        className="text-purple-700 font-semibold"
      >
        ← Back to all signs
      </Link>
    </main>
  );
}
