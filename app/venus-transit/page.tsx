// app/venus-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";

export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Venus Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Venus (Shukra) transit with dates, ascendant-wise effects on love, relationships, luxury and remedies as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/venus-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchVenusTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function VenusTransitPage() {
  const data = await fetchVenusTransit();

  const venusPos = data.positions?.Venus;
  const venusFuture = data.future_transits?.Venus || [];
  const currentTransit = venusFuture[0];
  const nextTransit = venusFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Venus Transit in {venusPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          Venus (Shukra) is currently transiting through{" "}
          <strong>{venusPos?.rashi}</strong> rashi, bringing focus on love,
          relationships, comfort, luxury and creative expression. At present,
          Shukra is positioned at <strong>{venusPos?.degree}°</strong>, influencing
          emotional harmony, attraction and financial pleasures.
          <br /><br />
          In Vedic astrology, Venus governs romance, beauty, art, material comfort
          and marital happiness. As it moves through this sign, its effects vary
          for each ascendant based on house placement, dignity and individual chart factors.
        </p>

        {/* SNAPSHOT CARD */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Venus Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Venus (Shukra)</div>
            <div><strong>Current Rashi:</strong> {venusPos?.rashi}</div>
            <div><strong>Degree:</strong> {venusPos?.degree}°</div>
            <div><strong>Motion:</strong> {venusPos?.motion}</div>
            <div>
              <strong>Transit Period:</strong>{" "}
              {formatDate(currentTransit?.entering_date)} –{" "}
              {formatDate(currentTransit?.exit_date)}
            </div>
            <div>
              <strong>Next Transit:</strong>{" "}
              {nextTransit?.to_rashi} on{" "}
              {formatDate(nextTransit?.entering_date)}
            </div>
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">
            Why This Venus Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Venus transit impacts love life, marriage prospects, artistic pursuits,
            luxury, comforts and financial enjoyment. A strong Venus can enhance
            harmony and attraction, while a weak or afflicted Venus may require
            balance, self-restraint and emotional clarity.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Venus"
          planetRashi={venusPos?.rashi}
        />

        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Venus Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Chant Shukra Beej Mantra or “Om Shum Shukraya Namah”</li>
            <li>Donate white clothes, rice or sweets on Fridays</li>
            <li>Maintain harmony in relationships and avoid excess indulgence</li>
            <li>Respect women and practice gratitude</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-16 text-left">
          <Link
            href="/app-download"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Get the app for a personalized experience →
          </Link>
        </div>

      </article>
    </div>
  );
}
