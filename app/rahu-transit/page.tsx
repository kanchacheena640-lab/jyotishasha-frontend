// app/rahu-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Rahu Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Rahu transit with dates, ascendant-wise effects on karma, ambition, confusion and remedies as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/rahu-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchRahuTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function RahuTransitPage() {
  const data = await fetchRahuTransit();

  const rahuPos = data.positions?.Rahu;
  const rahuFuture = data.future_transits?.Rahu || [];
  const currentTransit = rahuFuture[0];
  const nextTransit = rahuFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Rahu Transit in {rahuPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          Rahu is currently transiting through <strong>{rahuPos?.rashi}</strong> rashi,
          marking a powerful karmic phase. At present, Rahu is positioned at{" "}
          <strong>{rahuPos?.degree}°</strong>, amplifying desires, ambitions,
          unconventional thinking and sudden life changes.
          <br /><br />
          In Vedic astrology, Rahu represents illusion, obsession, innovation,
          foreign influences and material hunger. Its transit often brings
          unexpected turns, pushing individuals out of comfort zones depending
          on house placement and chart strength.
        </p>

        {/* SNAPSHOT CARD */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Rahu Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Rahu</div>
            <div><strong>Current Rashi:</strong> {rahuPos?.rashi}</div>
            <div><strong>Degree:</strong> {rahuPos?.degree}°</div>
            <div><strong>Motion:</strong> {rahuPos?.motion}</div>
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
            Why This Rahu Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Rahu transit intensifies ambition, confusion and unconventional
            paths. While it can bring rapid growth, foreign opportunities and
            breakthroughs, it may also create illusions, impulsive decisions
            and instability if not handled consciously.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Rahu"
          planetRashi={rahuPos?.rashi}
        />

        {/* 🔐 EEAT TRUST */}
        <EEATTrustSnippet />        

        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Rahu Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Chant “Om Raam Rahave Namah” regularly</li>
            <li>Donate black cloth or mustard oil on Saturdays</li>
            <li>Avoid shortcuts, addictions and unethical actions</li>
            <li>Practice grounding through meditation and routine</li>
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
