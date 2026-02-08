// app/mars-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";


export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Mars Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Mars transit with dates, ascendant-wise effects, energy, action, conflict themes and remedies as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/mars-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchMarsTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MarsTransitPage() {
  const data = await fetchMarsTransit();

  const marsPos = data.positions?.Mars;
  const marsFuture = data.future_transits?.Mars || [];
  const currentTransit = marsFuture[0];
  const nextTransit = marsFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Mars Transit in {marsPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          Mars is currently transiting through <strong>{marsPos?.rashi}</strong> rashi,
          activating themes of action, courage, ambition and conflict management.
          At present, Mangal is positioned at <strong>{marsPos?.degree}°</strong> in{" "}
          <strong>{marsPos?.rashi}</strong> rashi.
          <br /><br />
          In Vedic astrology, Mars represents energy, initiative, willpower and physical
          drive. Its transit influences how decisively one acts, handles pressure and
          channels aggression, with results varying for each ascendant based on house
          placement and planetary strength.
        </p>

        {/* SNAPSHOT */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Mars Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Mars (Mangal)</div>
            <div><strong>Current Rashi:</strong> {marsPos?.rashi}</div>
            <div><strong>Degree:</strong> {marsPos?.degree}°</div>
            <div><strong>Motion:</strong> {marsPos?.motion}</div>
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
            Why This Mars Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Mars transit governs motivation, assertiveness, competition and conflict
            handling. A strong Mars transit supports courage, leadership and decisive
            action, while a challenging placement may increase impatience, anger or
            impulsive decisions if energy is not directed constructively.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Mars"
          planetRashi={marsPos?.rashi}
          planetSlug="mars-transit"
        />
        
        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Mars Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Practice physical discipline and controlled exercise</li>
            <li>Chant Hanuman Chalisa or Mangal Beej Mantra</li>
            <li>Avoid impulsive decisions and heated arguments</li>
            <li>Donate red lentils or copper on Tuesdays</li>
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
          This Mars transit analysis is prepared using classical Vedic astrology
          principles, Gochar rules, planetary dignity, and Jyotishasha research methodology.
          Dates are calculated using sidereal zodiac (Lahiri Ayanamsa).
        </p>

        {/* CTA */}
        <div className="mt-16 text-left">
          <Link
            href={`/mars-transit/${marsPos?.rashi?.toLowerCase()}`}
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            See How This Transit Affects You →
          </Link>
        </div>

      </article>
    </div>
  );
}
