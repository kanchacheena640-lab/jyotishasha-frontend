// app/sun-transit/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600; // 1 hour ISR (fresh + fast)

export const metadata: Metadata = {
  title: "Sun Transit – Effects, Dates & Remedies | Jyotishasha",
  description:
    "Know current Sun transit with zodiac sign, degree, next sign change, effects and remedies as per Vedic astrology. Updated regularly.",
  alternates: {
    canonical: "https://www.jyotishasha.com/sun-transit",
  },
  openGraph: {
    title: "Sun Transit – Effects, Dates & Remedies",
    description:
      "Current Sun transit details, effects on career, health and authority, with Vedic remedies.",
    url: "https://www.jyotishasha.com/sun-transit",
    type: "article",
  },
};

export default async function SunTransitPage() {
  // 🔮 FUTURE (STEP-4): fetch live data from backend
  // const data = await fetchSunTransit();

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Sun Transit – Effects, Dates & Remedies
      </h1>

      {/* Intro */}
      <p className="text-gray-600 mb-8">
        Sun transit represents the movement of the Sun through zodiac signs.
        In Vedic astrology, the Sun governs authority, vitality, confidence,
        leadership and career direction. This page is updated regularly with
        the latest transit information.
      </p>

      {/* LIVE SNAPSHOT (static placeholder for now) */}
      <section className="bg-white rounded-xl p-6 shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Current Sun Transit</h2>
        <ul className="text-gray-700 space-y-1">
          <li><strong>Zodiac Sign:</strong> Sagittarius</li>
          <li><strong>Degree:</strong> 12°34′</li>
          <li><strong>Next Sign Change:</strong> In 18 days</li>
        </ul>
      </section>

      {/* EFFECTS */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Effects of Sun Transit
        </h2>
        <p className="text-gray-700">
          The Sun’s transit activates themes of responsibility, self-expression
          and public image. Depending on your Lagna and Moon sign, this transit
          can influence career growth, relationship with authority figures,
          health and personal confidence.
        </p>
      </section>

      {/* REMEDIES */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">
          Remedies for Weak Sun Transit
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Offer water to the rising Sun daily</li>
          <li>Recite Surya Beej Mantra or Aditya Hridayam</li>
          <li>Donate wheat, jaggery or copper on Sundays</li>
        </ul>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/app-download"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Get Personalized Transit Alerts
        </Link>
      </div>
    </article>
  );
}
