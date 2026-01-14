// app/saturn-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Saturn Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Saturn (Shani) transit with dates, ascendant-wise effects on karma, career, discipline and remedies as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/saturn-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchSaturnTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function SaturnTransitPage() {
  const data = await fetchSaturnTransit();

  const saturnPos = data.positions?.Saturn;
  const saturnFuture = data.future_transits?.Saturn || [];
  const currentTransit = saturnFuture[0];
  const nextTransit = saturnFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Saturn Transit in {saturnPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          Saturn (Shani) is currently transiting through{" "}
          <strong>{saturnPos?.rashi}</strong> rashi, initiating a phase of karmic
          evaluation, discipline and long-term restructuring. At present, Shani
          is positioned at <strong>{saturnPos?.degree}°</strong>, emphasizing
          responsibility, patience and maturity.
          <br /><br />
          In Vedic astrology, Saturn represents karma, delays, endurance,
          discipline and life lessons. Its slow movement makes this transit
          especially significant, as its effects unfold steadily over time and
          vary for each ascendant based on house placement and chart strength.
        </p>

        {/* SNAPSHOT CARD */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Saturn Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Saturn (Shani)</div>
            <div><strong>Current Rashi:</strong> {saturnPos?.rashi}</div>
            <div><strong>Degree:</strong> {saturnPos?.degree}°</div>
            <div><strong>Motion:</strong> {saturnPos?.motion}</div>
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
            Why This Saturn Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Saturn transit brings karmic lessons related to career,
            responsibilities, health, finances and long-term stability. A
            favorable Saturn supports steady growth and wisdom, while a
            challenging phase may demand patience, discipline and acceptance of
            delays for long-term rewards.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Saturn"
          planetRashi={saturnPos?.rashi}
        />

        
        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Saturn Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Chant “Om Sham Shanicharaya Namah” regularly</li>
            <li>Donate black sesame seeds, iron or footwear on Saturdays</li>
            <li>Serve the elderly, laborers or the underprivileged</li>
            <li>Maintain discipline, honesty and patience</li>
          </ul>
        </section>
        {/* 🔗 Explore Other Planetary Transits */}
        <div className="mt-10 border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">
            Explore other planetary transits:
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            <Link href="/sun-transit" className="text-blue-700 hover:underline">
              Sun Transit
            </Link>
            <span className="text-gray-400">|</span>

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
          This Saturn transit analysis is prepared using classical Vedic astrology
          principles, Gochar rules, planetary dignity, and Jyotishasha research methodology.
          Dates are calculated using sidereal zodiac (Lahiri Ayanamsa).
        </p>

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
