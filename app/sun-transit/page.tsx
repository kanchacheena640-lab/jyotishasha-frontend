// app/sun-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Sun Transit in Sagittarius – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Sun transit in Sagittarius with dates, ascendant-wise effects, remedies and next transit details as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/sun-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchSunTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function SunTransitPage() {
  const data = await fetchSunTransit();

  const sunPos = data.positions?.Sun;
  const sunFuture = data.future_transits?.Sun || [];
  const currentTransit = sunFuture[0];
  const nextTransit = sunFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Sun Transit in {sunPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO (CLEAN & SEO-SAFE) */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          The Sun is currently transiting through <strong>{sunPos?.rashi}</strong> rashi,
          marking an important astrological phase. At present, Surya is positioned at{" "}
          <strong>{sunPos?.degree}°</strong> in <strong>{sunPos?.rashi}</strong> rashi, influencing themes related to authority,
          confidence, vitality and life direction.
          <br /><br />
          In Vedic astrology, the Sun governs leadership, responsibility and self-expression.
          As it moves through this sign, its effects manifest differently for each ascendant
          depending on house placement, planetary dignity and individual chart factors.
        </p>

        {/* SNAPSHOT CARD */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Sun Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Sun (Surya)</div>
            <div><strong>Current Rashi:</strong> {sunPos?.rashi}</div>
            <div><strong>Degree:</strong> {sunPos?.degree}°</div>
            <div><strong>Motion:</strong> {sunPos?.motion}</div>
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
            Why This Sun Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            This Sun transit activates themes of leadership, responsibility, health and
            self-expression. Strong Sun placements may support recognition and confidence,
            while weaker dignity may require humility, patience and disciplined action.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Sun"
          planetRashi={sunPos?.rashi}
          planetSlug="sun-transit"
        />

        
        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Sun Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Offer water to the rising Sun daily</li>
            <li>Recite Aditya Hridayam or Surya Beej Mantra</li>
            <li>Practice Surya Namaskar regularly</li>
            <li>Donate wheat, jaggery or copper on Sundays</li>
          </ul>
        </section>
        {/* 🔗 Explore Other Planetary Transits */}
        <div className="mt-10 border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">
            Explore other planetary transits:
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            <Link href="/moon-transit" className="text-blue-700 hover:underline">
              Moon Transit
            </Link>
            <span className="text-gray-400">|</span>

            <Link href="/mars-transit" className="text-blue-700 hover:underline">
              Mars Transit
            </Link>
            <span className="text-gray-400">|</span>

            <Link href="/mercury-transit" className="text-blue-700 hover:underline">
              Mercury Transit
            </Link>
            <span className="text-gray-400">|</span>

            <Link href="/jupiter-transit" className="text-blue-700 hover:underline">
              Jupiter Transit
            </Link>
            <span className="text-gray-400">|</span>

            <Link href="/venus-transit" className="text-blue-700 hover:underline">
              Venus Transit
            </Link>
            <span className="text-gray-400">|</span>

            <Link href="/saturn-transit" className="text-blue-700 hover:underline">
              Saturn Transit
            </Link>
            <span className="text-gray-400">|</span>

            <Link href="/rahu-transit" className="text-blue-700 hover:underline">
              Rahu Transit
            </Link>
            <span className="text-gray-400">|</span>

            <Link href="/ketu-transit" className="text-blue-700 hover:underline">
              Ketu Transit
            </Link>
          </div>
        </div>


        {/* 🔎 Authority Note (EEAT – indirect) */}
        <p className="mt-10 text-sm text-gray-500 leading-relaxed">
          This Sun transit analysis is prepared using classical Vedic astrology
          principles, Gochar rules, planetary dignity, and Jyotishasha research methodology.
          Dates are calculated using sidereal zodiac (Lahiri Ayanamsa).
        </p>

        <Link href="/astrology-methodology" className="underline text-blue-700">
          Astrology calculation methodology
        </Link>

        {/* CTA */}
        <div className="mt-16 text-left">
          <Link
            href="/app-download"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            See How This Transit Affects You →
          </Link>
        </div>

      </article>
    </div>
  );
}
