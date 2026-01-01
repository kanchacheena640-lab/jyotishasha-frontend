// app/sun-transit/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sun Transit – Effects, Dates & Remedies | Jyotishasha",
  description:
    "Know current Sun transit in zodiac signs with dates, ascendant-wise effects and remedies as per Vedic astrology.",
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
    <article className="max-w-5xl mx-auto px-6 py-14">
      {/* 🔥 H1 */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Sun Transit in {sunPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
      </h1>

      {/* 🟡 INTRO */}
      <p className="text-gray-800 leading-relaxed mb-10">
        The Sun is currently transiting through <strong>{sunPos?.rashi}</strong> rashi,
        marking an important astrological phase. Surya governs vitality,
        authority, confidence and purpose. As it moves through this sign,
        its influence unfolds differently for each ascendant based on house
        placement, dignity and individual birth chart factors.
      </p>

      {/* 📊 SNAPSHOT CARD */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ☀️ Current Sun Transit Snapshot
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
          <div><strong>Planet:</strong> Sun (Surya)</div>
          <div><strong>Current Rashi:</strong> {sunPos?.rashi}</div>
          <div><strong>Degree:</strong> {sunPos?.degree}°</div>
          <div><strong>Motion:</strong> {sunPos?.motion}</div>
          <div>
            <strong>Transit Period:</strong>{" "}
            {currentTransit?.entering_date} – {currentTransit?.exit_date}
          </div>
          <div>
            <strong>Next Transit:</strong>{" "}
            {nextTransit?.to_rashi} on {nextTransit?.entering_date}
          </div>
        </div>
      </section>

      {/* 🌞 WHY IT MATTERS */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Why This Sun Transit Matters
        </h2>
        <p className="text-gray-800 leading-relaxed">
          Sun transit highlights themes of leadership, decision-making,
          health and public image. A strong Sun may bring recognition,
          authority and clarity, while a weak Sun demands humility,
          discipline and conscious effort to avoid ego conflicts.
        </p>
      </section>

      {/* ♈ ASCENDANT-WISE CARDS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Ascendant-wise Effects of Sun Transit
        </h2>

        <p className="text-gray-800 mb-8">
          Below is a Lagna-based overview showing which house gets activated
          for each ascendant during this Sun transit. This gives a quick,
          practical understanding of where focus, responsibility and action
          are required.
        </p>

        <AscendantTransitCards
          planet="Sun"
          planetRashi={sunPos?.rashi}
        />
      </section>

      {/* 🪔 REMEDIES */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Remedies for Sun Transit
        </h2>
        <ul className="list-disc pl-6 text-gray-800 space-y-2">
          <li>Offer water to the rising Sun every morning</li>
          <li>Recite Aditya Hridayam or Surya Beej Mantra</li>
          <li>Practice Surya Namaskar regularly</li>
          <li>Donate wheat, jaggery or copper on Sundays</li>
        </ul>
      </section>

      {/* 🔗 INTERNAL LINKS */}
      <div className="mb-10 text-sm text-gray-700">
        Also explore:&nbsp;
        <Link href="/moon-transit" className="text-purple-700 font-medium">
          Moon Transit
        </Link>
        {" | "}
        <Link href="/saturn-transit" className="text-purple-700 font-medium">
          Saturn Transit
        </Link>
      </div>

      {/* 🚀 FINAL CTA */}
      <div className="text-center mt-12">
        <Link
          href="/app-download"
          className="inline-block bg-purple-700 text-white px-10 py-4 rounded-xl font-semibold hover:bg-purple-800 transition"
        >
          Get Personalized Sun Transit Guidance @ ₹51
        </Link>
      </div>
    </article>
  );
}
