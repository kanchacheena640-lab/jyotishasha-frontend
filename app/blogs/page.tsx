// app/blogs/page.tsx
import Link from "next/link";
import HoroscopeTabs from "@/components/blogs/HoroscopeTabs";
import { muhurthTopics } from "@/app/panchang/muhurat/muhurth_topics";


export const revalidate = 3600;

export const metadata = {
  title: "Astrology Updates & Daily Insights | Jyotishasha",
  description:
    "Explore daily, monthly and yearly horoscope along with muhurat, panchang and planetary transits — updated regularly using Vedic astrology.",
};

export default async function BlogsHubPage() {
  const cardClass =
    "bg-white rounded-[14px] p-[18px] text-center shadow-[0_6px_16px_rgba(0,0,0,0.06)] transition hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]";

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* HERO */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-3">
          Astrology Updates & Daily Insights
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Fresh daily horoscope, muhurat, panchang and live planetary transits —
          prepared using Vedic astrology and updated regularly.
        </p>
        <p className="mt-2 text-sm text-gray-500 italic">
          Updated as per latest planetary movements
        </p>
      </header>

      {/* HOROSCOPE HUB */}
      <HoroscopeTabs />

      {/* TODAY PANCHANG */}
    <section className="mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Today’s Panchang & Muhurat
      </h2>

      <div className="max-w-xl mx-auto">
        <Link
          href="/today-panchang"
          className="block bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Today’s Panchang
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Tithi, Nakshatra, Yoga, Karana, Rahu Kaal & Auspicious Muhurats
          </p>
          <span className="text-purple-600 font-medium">
            Read Today’s Panchang →
          </span>
        </Link>
      </div>
    </section>

      {/* MONTHLY MUHURAT ARTICLES */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Auspicious Muhurats (Monthly Updated)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.values(muhurthTopics).map((topic) => (
            <Link
              key={topic.slug}
              href={topic.canonical.replace("https://www.jyotishasha.com", "")}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {topic.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                {topic.description}
              </p>

              <span className="text-xs text-green-700 font-medium">
                Updated Monthly
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TRANSITS */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Planetary Transit Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/transits/saturn" className={cardClass}>
            Saturn Transit • Long-term Impact
          </Link>

          <Link href="/transits/jupiter" className={cardClass}>
            Jupiter Transit • Growth Phase
          </Link>

          <Link href="/transits/venus" className={cardClass}>
            Venus Transit • Love & Comforts
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mt-24">
        <Link
          href="/app-download"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Get Personalized Astrology on Mobile
        </Link>
      </section>

      {/* AUTHORITY FOOTER */}
      <footer className="mt-20 text-sm text-gray-600 max-w-4xl mx-auto text-center">
        <p>
          <strong>Astrology Method:</strong> Vedic astrology (Sidereal Zodiac),
          Gochar principles and astronomical ephemeris data.
        </p>
        <p className="mt-1">
          <strong>Source:</strong> Jyotishasha Astrology Research Desk
        </p>
      </footer>
    </div>
  );
}
