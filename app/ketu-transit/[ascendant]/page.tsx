// app/ketu-transit/[ascendant]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";


export const revalidate = 3600;

const currentYear = new Date().getFullYear();

const KETU_HOUSE_TRAITS: Record<number, string> = {
  1: "identity confusion, self-detachment, inner rediscovery",
  2: "detachment from wealth, speech restraint, value re-evaluation",
  3: "withdrawn communication, selective effort, inner courage",
  4: "emotional detachment, inner restlessness, search for peace",
  5: "creative blocks, unconventional thinking, detachment in romance",
  6: "hidden enemies, karmic health patterns, service without attachment",
  7: "distance in relationships, karmic partnerships, emotional gaps",
  8: "deep transformation, hidden fears, spiritual awakening",
  9: "questioning beliefs, detachment from religion, philosophical shift",
  10: "career confusion, loss of direction, purpose realignment",
  11: "detachment from social circle, selective networking, shifting goals",
  12: "isolation, subconscious healing, spiritual growth",
};

const ASCENDANTS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

const RASHI_INDEX: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
  Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
};

const RASHIS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

type AscendantSlug = (typeof ASCENDANTS)[number];

function isValidAscendant(a: string): a is AscendantSlug {
  return (ASCENDANTS as readonly string[]).includes(a);
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getHouse(asc: string, rashi: string) {
  return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1;
}

/* -------- CURRENT KETU POSITION -------- */
async function fetchKetuCurrent() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

/* -------- TRANSIT CONTENT -------- */
async function fetchTransitContent(args: {
  ascendant: string;
  planet: string;
  house: number;
  lang: "en" | "hi";
}) {
  const { ascendant, planet, house, lang } = args;

  const url =
    "https://jyotishasha-backend.onrender.com/api/transit" +
    `?ascendant=${encodeURIComponent(ascendant)}` +
    `&planet=${encodeURIComponent(planet)}` +
    `&house=${house}` +
    `&lang=${lang}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}

/* -------- STATIC PARAMS -------- */
export async function generateStaticParams() {
  return ASCENDANTS.map((ascendant) => ({ ascendant }));
}

/* -------- SEO -------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string };
}): Promise<Metadata> {
  const a = params.ascendant?.toLowerCase();
  if (!a || !isValidAscendant(a)) {
    return {
      title: "Ketu Transit Analysis | Jyotishasha",
      robots: { index: false, follow: false },
    };
  }
  const ascName = titleCase(a);

  return {
    title: `Ketu Transit ${currentYear} (South Node) for ${ascName} Ascendant – Meaning & Effects`,
    description: `Detailed house-wise effects of Ketu Transit ${currentYear} (South Node) for ${ascName} ascendant. Expert Vedic astrology predictions, karmic shifts, and remedies.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/ketu-transit/${a}`,
    },
  };
}

/* -------- PAGE -------- */
export default async function KetuTransitAscendantPage({
  params,
  searchParams,
}: {
  params: { ascendant: string };
  searchParams?: { lang?: string; house?: string };
}) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  const lang: "en" | "hi" = searchParams?.lang === "hi" ? "hi" : "en";
  const initialHouse =
    searchParams?.house && Number(searchParams.house) >= 1 && Number(searchParams.house) <= 12
      ? Number(searchParams.house)
      : 1;

  const current = await fetchKetuCurrent();
  const ketuPos = current?.positions?.Ketu;

  const ascName = titleCase(ascendant);

  const currentRashi = ketuPos?.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));

  const previousRashi =
    currentIndex === 0
      ? RASHIS[11]
      : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "ketu",
    house: initialHouse,
    lang,
  });

  /* ✅ STEP 3: FAQ UPGRADE (Rich Results Boost) */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `What does Ketu Transit ${currentYear} mean in astrology?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ketu transit, also known as South Node transit, represents karmic release, detachment, and spiritual transformation in astrology."
        }
      },
      {
        "@type": "Question",
        "name": `How will Ketu Transit ${currentYear} affect ${ascName} Ascendant?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${ascName} ascendant, Ketu transit influences life areas based on its house placement, bringing detachment and inner growth.`
        }
      },
      {
        "@type": "Question",
        "name": "Is Ketu transit always negative?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, Ketu transit is not negative. It helps in spiritual growth, removing illusions, and breaking unhealthy patterns."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-gray-900 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          {/* ✅ STEP 1: H1 UPGRADE (Title & H1 Parity) */}
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-blue-950">
            Ketu Transit {currentYear} (South Node) for <span className="text-blue-600">{ascName}</span> Ascendant
          </h1>
          <Link href="/ketu-transit" className="text-sm font-bold text-blue-700 uppercase tracking-widest hover:underline flex items-center gap-1">
            ← Global Transit
          </Link>
        </header>

        {/* Global Trust Box */}
        <VedicNote />

        {/* ✅ STEP 2: INTRO REPLACEMENT (Keyword Density Boost) */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            Ketu transit {currentYear} (South Node transit) for {ascName} ascendant marks a subtle yet meaningful shift in your life direction.
          </p>

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Ketu Transit Shift: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            In this phase, Ketu — the planet of intuition and detachment — is moving from {previousRashi} to {currentRashi}, shifting from your {previousHouse} house to the {currentHouse} house. 

            As a result, patterns related to <strong>{KETU_HOUSE_TRAITS[previousHouse]}</strong> begin to fade, while themes connected to <strong>{KETU_HOUSE_TRAITS[currentHouse]}</strong> become more prominent in your experience.

            This transition works internally, influencing perception, emotional response, and how you engage with situations.
          </p>


        <p className="text-sm text-slate-500 mt-3">
          Below you can explore how Ketu affects each house for {ascName} ascendant.
        </p>
        </div>

        {/* ✅ Visual Chart Integration - Snapshot Section se pehle */}
        <div className="my-10">
          <DynamicTransitChart 
            ascendant={ascendant} 
            activePlanet="ketu" 
            house={currentHouse} // Yeh current house positions se calculate ho raha hai
            size={340}
          />
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Jyotish</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            South Node Transit Position
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Transit Planet</p>
              <p className="text-lg">Ketu (South Node)</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Current Sign</p>
              <p className="text-lg">{currentRashi}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Exact Degree</p>
              <p className="text-lg">{ketuPos?.degree ? `${ketuPos.degree}°` : "-"}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Motion</p>
              <p className="text-lg text-amber-400">Retrograde</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-4 italic">
            Current Ketu transit position based on Vedic astrology calculations.
          </p>
        </section>

        {/* CURRENT TRANSIT + INSIGHT */}
        <section className="mb-12 p-8 bg-slate-50 rounded-2xl">


          {/* WHY BLOCK */}
          <h2 className="text-2xl font-bold mb-4">
            Ketu in {currentRashi} for {ascName} Ascendant – What It Means
          </h2>

          <p className="text-slate-700 leading-relaxed">
            For {ascName} ascendant, Ketu in {currentRashi} primarily influences the {currentHouse} house of your chart.

            This placement highlights themes related to <strong>{KETU_HOUSE_TRAITS[currentHouse]}</strong>, bringing a sense of detachment, internal shift, and karmic realignment in this area of life.

            Rather than creating direct external results, Ketu operates subtly — helping you release control, rethink priorities, and develop a deeper understanding of your experiences.
          </p>

        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="ketu"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* Silo Navigation */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-blue-950">
            {ascName} Forecast for Every House
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/ketu-transit/${ascendant}/house/${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-tighter">
                  View Impact in
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-blue-700">
                  House {h}
                </p>
                <p className="text-[10px] text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Detailed Meaning →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* READ ALSO */}
        <section className="mt-16">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">
            Read also
          </h3>

          <div className="flex gap-4 text-blue-700 font-semibold">
            <Link href="/rahu-transit">Rahu Transit (North Node) →</Link>
            <Link href="/jupiter-transit">Jupiter Transit →</Link>
            <Link href="/saturn-transit">Saturn Transit →</Link>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/personalized-transit-report"
            className="inline-block bg-blue-700 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-800 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Unlock Your Karma Map for {currentYear} →
          </Link>
        </div>

        </article>
        </div>
        );
        }