// app/moon-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";


export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Moon Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Moon transit with dates, ascendant-wise effects, emotional impact, remedies and next transit details as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/moon-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchMoonTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MoonTransitPage() {
  const data = await fetchMoonTransit();

  const moonPos = data.positions?.Moon;
  const moonFuture = data.future_transits?.Moon || [];
  const currentTransit = moonFuture[0];
  const nextTransit = moonFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Moon Transit in {moonPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          The Moon is currently transiting through <strong>{moonPos?.rashi}</strong> rashi,
          marking a sensitive and emotionally active phase. At present, Chandra is positioned
          at <strong>{moonPos?.degree}°</strong> in <strong>{moonPos?.rashi}</strong> rashi,
          influencing moods, instincts, mental focus and daily reactions.
          <br /><br />
          In Vedic astrology, the Moon governs the mind, emotions, intuition and comfort.
          As it moves swiftly through the zodiac, its effects are felt immediately and vary
          for each ascendant depending on house placement and individual chart factors.
        </p>

        {/* SNAPSHOT CARD */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Moon Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Moon (Chandra)</div>
            <div><strong>Current Rashi:</strong> {moonPos?.rashi}</div>
            <div><strong>Degree:</strong> {moonPos?.degree}°</div>
            <div><strong>Motion:</strong> {moonPos?.motion}</div>
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
            Why This Moon Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            The Moon’s transit directly impacts emotional balance, mental clarity,
            relationships and daily decision-making. A supportive Moon phase can
            enhance intuition and inner calm, while a challenging phase may require
            rest, emotional awareness and conscious responses.
          </p>
        </section>

        {/* ASCENDANT CARDS (error-safe) */}
        {moonPos?.rashi && (
          <AscendantTransitCards
            planet="Moon"
            planetRashi={moonPos.rashi}
          />
        )}

       
        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Moon Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Maintain proper sleep and hydration</li>
            <li>Practice mindfulness and emotional grounding</li>
            <li>Chant Chandra Beej Mantra or “Om Somaya Namah”</li>
            <li>Offer milk or white rice on Mondays</li>
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
          This Moon transit analysis is prepared using classical Vedic astrology
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
