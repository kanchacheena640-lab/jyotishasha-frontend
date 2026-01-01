// app/sun-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";

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

  /* 🔮 PLACEHOLDERS (backend-ready) */
  const nakshatra = "—"; // future: data.positions.Sun.nakshatra
  const nakshatraPada = "—"; // future: data.positions.Sun.pada

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Sun Transit in {sunPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO (ENRICHED, NON-REPETITIVE) */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          The Sun is currently transiting through <strong>{sunPos?.rashi}</strong> rashi,
          marking an important astrological phase. At present, Surya is positioned at{" "}
          <strong>{sunPos?.degree}°</strong>, moving under{" "}
          <strong>{nakshatra}</strong> nakshatra{" "}
          <strong>{nakshatraPada}</strong> pada.  
          <br /><br />
          In Vedic astrology, the Sun represents authority, vitality, confidence and life
          direction. As it progresses through this sign, its influence unfolds differently
          for each ascendant based on house placement, dignity and individual chart factors.
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
            while weaker dignity may demand humility, patience and disciplined action.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Sun"
          planetRashi={sunPos?.rashi}
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
