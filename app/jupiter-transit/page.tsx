// app/jupiter-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";

export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Jupiter Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Jupiter (Guru) transit with dates, ascendant-wise effects, wisdom, growth, remedies and next transit details as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/jupiter-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchJupiterTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function JupiterTransitPage() {
  const data = await fetchJupiterTransit();

  const jupiterPos = data.positions?.Jupiter;
  const jupiterFuture = data.future_transits?.Jupiter || [];
  const currentTransit = jupiterFuture[0];
  const nextTransit = jupiterFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Jupiter Transit in {jupiterPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          Jupiter (Guru) is currently transiting through{" "}
          <strong>{jupiterPos?.rashi}</strong> rashi, initiating a phase focused on
          wisdom, expansion, learning and long-term growth. At present, Guru is
          positioned at <strong>{jupiterPos?.degree}°</strong>, shaping belief systems,
          opportunities and ethical direction.
          <br /><br />
          In Vedic astrology, Jupiter represents knowledge, fortune, guidance and
          dharma. As it moves slowly through the zodiac, its transit brings deep,
          lasting changes depending on ascendant, house placement and planetary dignity.
        </p>

        {/* SNAPSHOT CARD */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Jupiter Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Jupiter (Guru)</div>
            <div><strong>Current Rashi:</strong> {jupiterPos?.rashi}</div>
            <div><strong>Degree:</strong> {jupiterPos?.degree}°</div>
            <div><strong>Motion:</strong> {jupiterPos?.motion}</div>
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
            Why This Jupiter Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Jupiter’s transit influences education, finances, marriage prospects,
            spirituality and overall life direction. A strong Guru transit can
            support growth, clarity and good fortune, while a weak or afflicted
            Jupiter may require patience, discipline and conscious ethical choices.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Jupiter"
          planetRashi={jupiterPos?.rashi}
          planetSlug="jupiter-transit"
        />        

        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Jupiter Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Chant Guru Beej Mantra or “Om Brim Brihaspataye Namah”</li>
            <li>Offer yellow sweets or turmeric on Thursdays</li>
            <li>Respect teachers, mentors and elders</li>
            <li>Practice charity and ethical decision-making</li>
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
          This Jupiter transit analysis is prepared using classical Vedic astrology
          principles, Gochar rules, planetary dignity, and Jyotishasha research methodology.
          Dates are calculated using sidereal zodiac (Lahiri Ayanamsa).
        </p>

        {/* CTA */}
        <div className="mt-16 text-left">
          <Link
            href={`/jupiter-transit/${jupiterPos?.rashi?.toLowerCase()}`}
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            See How This Transit Affects You →
          </Link>
        </div>

      </article>
    </div>
  );
}
