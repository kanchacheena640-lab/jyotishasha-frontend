// app/sun-transit/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600; // 1 hour ISR

export const metadata: Metadata = {
  title: "Sun Transit – Effects, Dates & Remedies | Jyotishasha",
  description:
    "Know current Sun transit with zodiac sign, degree, next sign change, effects and remedies as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/sun-transit",
  },
};

async function fetchSunTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

export default async function SunTransitPage() {
  const data = await fetchSunTransit();

  const sunPos = data.positions?.Sun;
  const sunFuture = data.future_transits?.Sun || [];
  const currentTransit = sunFuture[0];
  const nextTransit = sunFuture[1];

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* 🔥 H1 – Dynamic SEO */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Sun Transit in {sunPos?.rashi} – Dates, Effects & Remedies for All Zodiac
        Signs
      </h1>

      {/* 🟡 INTRO */}
      <section className="mb-10">
        <p className="text-gray-700">
          The Sun is transiting through <strong>{sunPos?.rashi}</strong> rashi,
          bringing a noticeable shift in themes related to purpose, confidence
          and responsibilities. In Vedic astrology, Surya represents authority,
          vitality and self-identity. As it moves through this sign, its influence
          unfolds differently for each ascendant depending on house placement,
          dignity and individual chart factors.
        </p>
      </section>

      {/* 📊 LIVE SNAPSHOT */}
      <section className="bg-white rounded-xl p-6 shadow mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Current Sun Transit Snapshot
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
          <div>
            <strong>Planet:</strong> Sun (Surya)
          </div>
          <div>
            <strong>Current Rashi:</strong> {sunPos?.rashi}
          </div>
          <div>
            <strong>Degree Position:</strong> {sunPos?.degree}°
          </div>
          <div>
            <strong>Motion:</strong> {sunPos?.motion}
          </div>
          <div>
            <strong>Transit Period:</strong>{" "}
            {currentTransit?.entering_date} –{" "}
            {currentTransit?.exit_date}
          </div>
          <div>
            <strong>Next Transit:</strong>{" "}
            {nextTransit?.to_rashi} on{" "}
            {nextTransit?.entering_date}
          </div>
        </div>
      </section>

      {/* 🌞 WHY IT MATTERS */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Why This Sun Transit Matters
        </h2>
        <p className="text-gray-700">
          The Sun’s transit activates matters related to leadership,
          decision-making, health and public image. Depending on the strength and
          dignity of the Sun in an individual chart, this period may bring
          recognition and clarity, or demand discipline and humility to avoid
          friction with authority figures.
        </p>
      </section>

      {/* ♈ ASCENDANT-WISE EFFECTS (placeholder for cards) */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Ascendant-wise Effects of Sun Transit
        </h2>

        <p className="text-gray-600 mb-6">
          The impact of this Sun transit differs for each ascendant based on the
          house it activates in the birth chart. Below is a Lagna-based overview
          highlighting which life areas come into focus during this phase.
          Results may vary according to individual kundali factors.
        </p>

        {/* 🔮 FUTURE STEP:
            <AscendantTransitCards
              planet="Sun"
              planetRashi={sunPos?.rashi}
            />
        */}
      </section>

      {/* 🪔 REMEDIES */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">
          Remedies for Sun Transit
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Offer water to the rising Sun daily</li>
          <li>Recite Aditya Hridayam or Surya Beej Mantra</li>
          <li>Practice Surya Namaskar regularly</li>
          <li>Donate wheat, jaggery or copper on Sundays</li>
        </ul>
      </section>

      {/* 🔗 INTERNAL LINKS */}
      <section className="mb-10">
        <p className="text-sm text-gray-500">
          Also explore:&nbsp;
          <Link href="/moon-transit" className="text-purple-600">
            Moon Transit
          </Link>
          {" | "}
          <Link href="/saturn-transit" className="text-purple-600">
            Saturn Transit
          </Link>
        </p>
      </section>

      {/* 🚀 CTA */}
      <div className="text-center">
        <Link
          href="/app-download"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Get Ascendant-wise Sun Transit Guidance
        </Link>
      </div>
    </article>
  );
}
