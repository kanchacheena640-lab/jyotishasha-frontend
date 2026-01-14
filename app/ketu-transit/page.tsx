// app/ketu-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";


export const revalidate = 3600;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title: "Ketu Transit – Dates, Effects & Remedies | Jyotishasha",
  description:
    "Ketu transit with dates, ascendant-wise effects on detachment, spirituality, confusion and remedies as per Vedic astrology.",
  alternates: {
    canonical: "https://www.jyotishasha.com/ketu-transit",
  },
};

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}

/* ---------------- Data Fetch ---------------- */
async function fetchKetuTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function KetuTransitPage() {
  const data = await fetchKetuTransit();

  const ketuPos = data.positions?.Ketu;
  const ketuFuture = data.future_transits?.Ketu || [];
  const currentTransit = ketuFuture[0];
  const nextTransit = ketuFuture[1];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Ketu Transit in {ketuPos?.rashi} – Dates, Effects & Remedies for All Zodiac Signs
        </h1>

        {/* INTRO */}
        <p className="text-gray-800 mb-10 leading-relaxed">
          Ketu is currently transiting through <strong>{ketuPos?.rashi}</strong> rashi,
          marking a deeply karmic and introspective phase. At present, Ketu is positioned
          at <strong>{ketuPos?.degree}°</strong>, encouraging detachment, inner clarity
          and spiritual reassessment.
          <br /><br />
          In Vedic astrology, Ketu represents past-life karma, separation, moksha and
          sudden realizations. Its transit often reduces material attachment while
          highlighting hidden weaknesses and inner truths based on house placement.
        </p>

        {/* SNAPSHOT CARD */}
        <section className="bg-blue-900 rounded-xl p-6 mb-12 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Current Ketu Transit Snapshot
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Ketu</div>
            <div><strong>Current Rashi:</strong> {ketuPos?.rashi}</div>
            <div><strong>Degree:</strong> {ketuPos?.degree}°</div>
            <div><strong>Motion:</strong> {ketuPos?.motion}</div>
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
            Why This Ketu Transit Matters
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Ketu transit brings detachment, inner questioning and karmic clearing.
            While it may reduce interest in material pursuits, it supports spiritual
            growth, research, healing and self-realization. Resistance to change,
            however, can lead to confusion or isolation.
          </p>
        </section>

        {/* ASCENDANT CARDS */}
        <AscendantTransitCards
          planet="Ketu"
          planetRashi={ketuPos?.rashi}
        />

        {/* REMEDIES */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-3">
            Remedies for Ketu Transit
          </h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-1">
            <li>Chant “Om Kem Ketave Namah” regularly</li>
            <li>Donate grey or brown blankets to the needy</li>
            <li>Practice meditation, silence and introspection</li>
            <li>Avoid escapism and unnecessary isolation</li>
          </ul>
        </section>

        {/* 🔎 Authority Note (EEAT – indirect) */}
        <p className="mt-10 text-sm text-gray-500 leading-relaxed">
          This Ketu transit analysis is prepared using classical Vedic astrology
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
