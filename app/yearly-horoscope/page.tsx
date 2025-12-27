import Link from "next/link";
import Image from "next/image";

const YEAR = "2026";

const ZODIACS = [
  { sign: "aries", name: "Aries", img: "/zodiac/aries.png" },
  { sign: "taurus", name: "Taurus", img: "/zodiac/taurus.png" },
  { sign: "gemini", name: "Gemini", img: "/zodiac/gemini.png" },
  { sign: "cancer", name: "Cancer", img: "/zodiac/cancer.png" },
  { sign: "leo", name: "Leo", img: "/zodiac/leo.png" },
  { sign: "virgo", name: "Virgo", img: "/zodiac/virgo.png" },
  { sign: "libra", name: "Libra", img: "/zodiac/libra.png" },
  { sign: "scorpio", name: "Scorpio", img: "/zodiac/scorpio.png" },
  { sign: "sagittarius", name: "Sagittarius", img: "/zodiac/sagittarius.png" },
  { sign: "capricorn", name: "Capricorn", img: "/zodiac/capricorn.png" },
  { sign: "aquarius", name: "Aquarius", img: "/zodiac/aquarius.png" },
  { sign: "pisces", name: "Pisces", img: "/zodiac/pisces.png" },
];

export const metadata = {
  title: "Yearly Horoscope 2026 | Jyotishasha",
  description:
    "Read 2026 yearly horoscope for all zodiac signs. Career, love, finance and health predictions based on Vedic astrology.",
};

export default function YearlyHoroscopePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-12 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-12 text-white">
        <h1 className="text-4xl font-extrabold mb-4">
          Yearly Horoscope {YEAR}
        </h1>
        <p className="text-purple-100 text-lg">
          Select your zodiac sign to read detailed yearly horoscope for {YEAR}.
        </p>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {ZODIACS.map((z) => (
          <Link
            key={z.sign}
            href={`/yearly-horoscope/${z.sign}`}
            className="rounded-2xl bg-white border p-6 text-center shadow-sm hover:shadow-lg hover:scale-105 transition"
          >
            <Image
              src={z.img}
              alt={z.name}
              width={64}
              height={64}
              className="mx-auto mb-3"
            />
            <div className="font-bold text-gray-900">{z.name}</div>
            <div className="text-sm text-gray-500">
              {YEAR} Horoscope
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
