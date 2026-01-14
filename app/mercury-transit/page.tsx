// app/mercury-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";


export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Mercury Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Mercury transit with dates, ascendant-wise effects, communication, business, learning themes and remedies as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/mercury-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchMercuryTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MercuryTransitPage() {
  const data = await fetchMercuryTransit();

  const mercuryPos = data.positions?.Mercury;
  const mercuryFuture = data.future_transits?.Mercury || [];
  const currentTransit = mercuryFuture[0];
  const nextTransit = mercuryFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">
        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Mercury Transit in {mercuryPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          Mercury is currently transiting through <strong>{mercuryPos?.rashi}</strong> rashi,
          shaping communication, learning, travel planning and decision-making patterns.
          At present, Budh is positioned at <strong>{mercuryPos?.degree}°</strong> in{" "}
          <strong>{mercuryPos?.rashi}</strong> rashi.
          <br /><br />
          In Vedic astrology, Mercury represents intellect, speech, logic, commerce and skills.
          Its transit influences how clearly one thinks and communicates, how deals are negotiated,
          and how effectively ideas are converted into results—varying for each ascendant based on
          house placement and planetary strength.
        </p>

        {/* SNAPSHOT */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Mercury Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Mercury (Budh)</div>
            <div><strong>Current Rashi:</strong> {mercuryPos?.rashi}</div>
            <div><strong>Degree:</strong> {mercuryPos?.degree}°</div>
            <div><strong>Motion:</strong> {mercuryPos?.motion}</div>
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
            Why This Mercury Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Mercury transit impacts clarity of thought, negotiations, studies, writing, contracts
            and business decisions. A supportive Mercury phase improves communication and problem-solving,
            while a challenging period can cause misunderstandings, delays, indecision or errors—especially
            if you rush paperwork or ignore details.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Mercury"
          planetRashi={mercuryPos?.rashi}
        />

        
        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Mercury Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Double-check messages, documents and commitments</li>
            <li>Chant Budh Beej Mantra or “Om Budhaya Namah”</li>
            <li>Practice mindful speech; avoid gossip and harsh words</li>
            <li>Donate green moong, stationery or support students on Wednesdays</li>
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
          This Mercury transit analysis is prepared using classical Vedic astrology
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
