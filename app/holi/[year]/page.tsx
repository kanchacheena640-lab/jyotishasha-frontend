// app/holi/[year]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BACKEND = "https://jyotishasha-backend.onrender.com";

// Default location (Lucknow) – stable SEO page.
// (Later you can add location picker; keep canonical year-only to avoid duplicate pages.)
const DEFAULT_LAT = 26.84;
const DEFAULT_LON = 80.94;

type Tip = { en: string; hi: string };

type HoliApiResponse = {
  year: number;
  holika_dahan: {
    date: string; // YYYY-MM-DD
    sunset?: string; // HH:MM
    muhurta?: string; // "HH:MM to HH:MM"
    duration?: string; // "0:15:00"
    method?: string; // "Standard Pradosh" | ...
    note?: string;
  };
  holi_dhulandi?: { date: string };
  moon_sign_on_holi?: string; // e.g., "Virgo"
  rashi_tips?: Record<
    string,
    { moon_transit_house: number; tip: Tip }
  >;
};

function isValidYear(raw: string) {
  return /^\d{4}$/.test(raw);
}

function clampYear(y: number) {
  const now = new Date().getFullYear();
  // safe range for SEO pages
  const min = now - 2;
  const max = now + 20;
  return Math.min(Math.max(y, min), max);
}

async function fetchHoli(year: number): Promise<HoliApiResponse | null> {
  try {
    const res = await fetch(`${BACKEND}/api/festivals/holi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // keep stable, no location-based duplication in URL for SEO
      body: JSON.stringify({
        latitude: DEFAULT_LAT,
        longitude: DEFAULT_LON,
        year,
      }),
      cache: "no-store",
    });

    if (!res.ok) return null;
    const json = (await res.json()) as HoliApiResponse;
    if (!json?.holika_dahan?.date) return null;
    return json;
  } catch {
    return null;
  }
}

function titleCase(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildFaq(year: number) {
  // Keep answers short + authoritative (SEO + UX)
  return [
    {
      q: `Why does Holi ${year} date change every year?`,
      a: `Holi is based on Phalguna Purnima (lunar tithi). Gregorian dates shift because tithi boundaries depend on the Moon’s motion and local sunset.`,
    },
    {
      q: `What is the rule for Holika Dahan muhurat?`,
      a: `Holika Dahan is typically done around sunset during Pradosh, provided Phalguna Purnima is valid and Bhadra (Vishti Karana) is avoided.`,
    },
    {
      q: `What if Bhadra is present during Holika Dahan?`,
      a: `Bhadra is avoided. If Bhadra blocks the sunset window, the dahan is shifted to the next suitable window or done after Bhadra ends (if Purnima support still exists).`,
    },
    {
      q: `Is Holika Dahan time location-specific?`,
      a: `Yes. Sunset timing and tithi change by latitude/longitude. Jyotishasha calculates it using Panchang rules for the given location.`,
    },
  ];
}

function jsonLdEvent(data: HoliApiResponse) {
  const year = data.year;
  const holika = data.holika_dahan?.date;
  const dhulandi = data.holi_dhulandi?.date;

  // Avoid over-claiming exact time zones / venue
  const obj: any = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Holi ${year}`,
    description:
      `Holi ${year} date and Holika Dahan muhurat based on Panchang calculation (Phalguna Purnima + Bhadra avoidance).`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "India",
    },
  };

  if (holika) obj.startDate = holika;
  if (dhulandi) obj.endDate = dhulandi;

  return JSON.stringify(obj);
}

function jsonLdFaq(year: number) {
  const faq = buildFaq(year);
  const obj = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return JSON.stringify(obj);
}

export async function generateMetadata({
  params,
}: {
  params: { year: string };
}): Promise<Metadata> {
  if (!isValidYear(params.year)) return { robots: { index: false, follow: false } };

  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);

  // If backend fails, keep index false to avoid thin/empty page indexing
  if (!data) return { robots: { index: false, follow: false } };

  const holika = data.holika_dahan;
  const title = `Holi ${year} Date, Holika Dahan Muhurat & Time | Jyotishasha`;
  const desc =
    `Holi ${year} date: Holika Dahan on ${holika.date}` +
    (holika.muhurta ? ` (Muhurat: ${holika.muhurta})` : "") +
    `. Panchang-based calculation with Bhadra avoidance. हिंदी: होली ${year} तिथि और होलिका दहन मुहूर्त।`;

  return {
    title,
    description: desc,
    alternates: { canonical: `/holi-${year}` },
    openGraph: {
      title: `Holi ${year} Date & Holika Dahan Muhurat`,
      description: desc,
      url: `/holi-${year}`,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function HoliYearPage({
  params,
}: {
  params: { year: string };
}) {
  if (!isValidYear(params.year)) return notFound();

  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);
  if (!data) return notFound();

  const holika = data.holika_dahan;
  const dhulandi = data.holi_dhulandi?.date;

  const prev = year - 1;
  const next = year + 1;

  const faq = buildFaq(year);
  const tips = data.rashi_tips ?? null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* JSON-LD (Event + FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdEvent(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdFaq(year) }}
      />

      {/* HERO */}
      <header className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Holi {year} Date, Holika Dahan Muhurat & Time
            </h1>
            <p className="mt-2 text-slate-600">
              होली {year} की तिथि और होलिका दहन मुहूर्त (Panchang + Sunset rules)
            </p>
          </div>

          {/* Year switcher (SEO internal links) */}
          <nav className="flex gap-3 text-sm">
            <a className="rounded-xl border px-3 py-2 hover:bg-slate-50" href={`/holi-${prev}`}>
              ← Holi {prev}
            </a>
            <a className="rounded-xl border px-3 py-2 hover:bg-slate-50" href={`/holi-${next}`}>
              Holi {next} →
            </a>
          </nav>
        </div>

        {/* Quick Highlights */}
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs text-slate-600">Holika Dahan Date</div>
            <div className="text-base font-semibold">{holika.date}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs text-slate-600">Muhurat</div>
            <div className="text-base font-semibold">{holika.muhurta ?? "—"}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs text-slate-600">Holi (Dhulandi)</div>
            <div className="text-base font-semibold">{dhulandi ?? "—"}</div>
          </div>
        </div>

        {/* Table of contents */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <a className="underline" href="#muhurta">Muhurat</a>
          <a className="underline" href="#why-correct">Why this date</a>
          <a className="underline" href="#rashi-tips">Rashi tips</a>
          <a className="underline" href="#faq">FAQ</a>
        </div>
      </header>

      {/* MUHURAT + DETAILS */}
      <section id="muhurta" className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Holika Dahan Muhurat</h2>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-600">Date</dt>
              <dd className="font-medium">{holika.date}</dd>
            </div>

            {holika.sunset ? (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Sunset</dt>
                <dd className="font-medium">{holika.sunset}</dd>
              </div>
            ) : null}

            {holika.muhurta ? (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Muhurat</dt>
                <dd className="font-medium">{holika.muhurta}</dd>
              </div>
            ) : null}

            {holika.duration ? (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Duration</dt>
                <dd className="font-medium">{holika.duration}</dd>
              </div>
            ) : null}

            {holika.method ? (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Method</dt>
                <dd className="font-medium">{holika.method}</dd>
              </div>
            ) : null}
          </dl>

          {holika.note ? (
            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <b>Note:</b> {holika.note}
            </p>
          ) : null}

          <p className="mt-4 text-xs text-slate-500">
            Calculated for Lucknow (default). Sunset + tithi boundaries are location dependent.
          </p>
        </article>

        <article id="why-correct" className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Why this date is correct</h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>
              Holi is selected using <b>Phalguna Purnima</b> near sunset (Panchang rule).
            </li>
            <li>
              If <b>Bhadra (Vishti Karana)</b> blocks the sunset window, Holika Dahan is avoided in that period.
            </li>
            <li>
              Muhurat is kept inside the <b>Pradosh window</b> and within remaining Purnima support (when applicable).
            </li>
          </ul>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs text-slate-600">Moon Sign on Holika Dahan</div>
              <div className="text-base font-semibold">
                {data.moon_sign_on_holi ?? "—"}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs text-slate-600">What this means</div>
              <div className="text-sm text-slate-700">
                We use Moon’s rashi on that evening to generate rashi-wise simple offerings.
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* RASHI TIPS */}
      {tips ? (
        <section id="rashi-tips" className="mt-10">
          <h2 className="text-2xl font-bold">Rashi-wise Holi Tips ({year})</h2>
          <p className="mt-2 text-sm text-slate-600">
            These are simple, safe offerings based on the Moon’s transit house counted from each rashi.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(tips).map(([sign, item]) => (
              <article key={sign} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{titleCase(sign)}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    House {item.moon_transit_house}
                  </span>
                </div>

                {/* English + Hindi both (no JS needed) */}
                <p className="mt-3 text-sm text-slate-800">{item.tip.en}</p>
                <p className="mt-2 text-sm text-slate-600">{item.tip.hi}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section id="faq" className="mt-12 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Holi {year} FAQ</h2>
        <div className="mt-6 space-y-5">
          {faq.map((f) => (
            <details key={f.q} className="rounded-xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* YOUTUBE VIDEO SECTION */}
        <section className="mt-12 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
            Holi {year} – Complete Explanation Video
        </h2>

        <p className="mt-2 text-sm text-slate-600">
            Watch the detailed explanation of Holika Dahan muhurat, Bhadra rules and
            the correct Panchang logic for Holi {year}.
        </p>

        <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl">
            <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title={`Holi ${year} Date & Muhurat Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        </div>
        </section>

      {/* INTERNAL LINKS (Authority + crawl depth) */}
      <section className="mt-10 text-sm">
        <h2 className="text-lg font-semibold">Explore more on Jyotishasha</h2>
        <div className="mt-3 flex flex-wrap gap-4">
          <a className="underline" href="/panchang">Today Panchang</a>
          <a className="underline" href="/free-kundali">Free Kundali</a>
          <a className="underline" href={`/holi-${prev}`}>Holi {prev}</a>
          <a className="underline" href={`/holi-${next}`}>Holi {next}</a>
        </div>
      </section>
    </main>
  );
}
