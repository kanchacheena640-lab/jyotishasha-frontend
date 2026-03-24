import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

/* ---------------- Configuration ---------------- */
const ASCENDANTS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

type AscendantSlug = (typeof ASCENDANTS)[number];

const RASHI_HI_MAP: Record<string, string> = {
  Aries: "मेष",
  Taurus: "वृषभ",
  Gemini: "मिथुन",
  Cancer: "कर्क",
  Leo: "सिंह",
  Virgo: "कन्या",
  Libra: "तुला",
  Scorpio: "वृश्चिक",
  Sagittarius: "धनु",
  Capricorn: "मकर",
  Aquarius: "कुंभ",
  Pisces: "मीन",
};

const RAHU_HOUSE_TRAITS_EN: Record<number, string> = {
  1: "intense self-transformation, radical identity shifts, material ambition",
  2: "unconventional wealth creation, speech intensity, family shifts",
  3: "fearless communication, digital growth, sudden short travels",
  4: "domestic innovation, shifting home base, deep inner restlessness",
  5: "creative obsession, unconventional romance, speculative gains",
  6: "overcoming obstacles, unique health focus, work-life dominance",
  7: "unconventional partnerships, social magnetism, business breakthroughs",
  8: "occult research, sudden financial shifts, deep transformation",
  9: "questioning traditions, foreign travels, unique belief systems",
  10: "professional expansion, unconventional career growth, social status",
  11: "sudden monetary gains, massive networking, desire fulfillment",
  12: "foreign connections, subconscious exploration, spiritual breakthroughs",
};

const RAHU_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "तीव्र आत्म-परिवर्तन, कट्टर पहचान बदलाव, भौतिक महत्वाकांक्षा",
  2: "अपरंपरागत धन सृजन, वाणी तीव्रता, पारिवारिक बदलाव",
  3: "निडर संचार, डिजिटल विकास, अचानक छोटी यात्राएँ",
  4: "घरेलू नवाचार, घर आधार बदलाव, गहरी आंतरिक अशांति",
  5: "रचनात्मक जुनून, अपरंपरागत प्रेम, सट्टा लाभ",
  6: "बाधाओं पर विजय, अनोखा स्वास्थ्य फोकस, कार्य-जीवन प्रभुत्व",
  7: "अपरंपरागत साझेदारी, सामाजिक आकर्षण, व्यवसाय सफलता",
  8: "गूढ़ अनुसंधान, अचानक वित्तीय बदलाव, गहन परिवर्तन",
  9: "परंपराओं पर सवाल, विदेशी यात्राएँ, अनोखी विश्वास प्रणाली",
  10: "व्यावसायिक विस्तार, अपरंपरागत करियर विकास, सामाजिक स्थिति",
  11: "अचानक धन लाभ, विशाल नेटवर्किंग, इच्छा पूर्ति",
  12: "विदेशी संबंध, अवचेतन अन्वेषण, आध्यात्मिक सफलता",
};

const RASHI_INDEX: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
  Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
};

const RASHIS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

function isValidAscendant(a: string): a is AscendantSlug {
  return ASCENDANTS.includes(a as AscendantSlug);
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getHouse(asc: string, rashi: string) {
  const ascIndex = RASHI_INDEX[titleCase(asc)] || 1;
  const rashiIndex = RASHI_INDEX[rashi] || 1;
  return ((rashiIndex - ascIndex + 12) % 12) + 1;
}

function getRashiName(rashi: string | undefined, rashi_hi: string | null | undefined, isHi: boolean) {
  if (!rashi) return isHi ? "अज्ञात" : "Unknown";
  if (!isHi) return rashi; // English: Aries
  return rashi_hi || RASHI_HI_MAP[rashi] || rashi; // Hindi: मेष
}

function getMotion(motion: string | undefined, isHi: boolean) {
  if (!motion) return isHi ? "मार्गी" : "Direct";
  if (!isHi) return motion;
  if (motion === "Direct") return "मार्गी";
  if (motion === "Retrograde") return "वक्री";
  return motion;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ---------------- Data Fetch ---------------- */
async function fetchRahuCurrent(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

async function fetchTransitContent({
  ascendant,
  planet,
  house,
  lang,
}: {
  ascendant: string;
  planet: string;
  house: number;
  lang: "en" | "hi";
}) {
  const url = `https://jyotishasha-backend.onrender.com/api/transit?ascendant=${encodeURIComponent(ascendant)}&planet=${encodeURIComponent(planet)}&house=${house}&lang=${lang}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  return res.ok ? res.json() : null;
}

export async function generateStaticParams() {
  return ASCENDANTS.map((ascendant) => ({ ascendant }));
}

/* ---------------- Metadata ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; locale?: string };
}): Promise<Metadata> {
  const asc = params.ascendant?.toLowerCase();
  if (!asc || !isValidAscendant(asc)) {
    return { title: "Not Found", robots: { index: false } };
  }
  const ascName = titleCase(asc);
  const locale = params.locale || "en";
  const isHi = locale === "hi";

  return {
    title: isHi
      ? `राहु गोचर ${currentYear} ${ascName} लग्न के लिए – महत्वाकांक्षा और कर्म`
      : `Rahu Transit ${currentYear} for ${ascName} Rising – Ambition & Karma`,
    description: isHi
      ? `${ascName} लग्न के लिए राहु (उत्तर नोड) गोचर ${currentYear} में कर्मिक बदलाव, भौतिक इच्छाएँ और अचानक सफलता का विस्तृत वैदिक विश्लेषण।`
      : `Detailed house-wise effects of Rahu (North Node) transit ${currentYear} for ${ascName} Rising. Vedic insights on karmic shifts, material desires, and sudden breakthroughs.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/rahu-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function RahuTransitAscendantPage({
  params,
  searchParams,
}: {
  params: { ascendant: string; locale?: string };
  searchParams?: { lang?: string; house?: string };
}) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  const locale = params.locale || "en";
  const lang: "en" | "hi" = locale === "hi" ? "hi" : "en";
  const isHi = lang === "hi";

  const rawHouse = searchParams?.house ? Number(searchParams.house) : 1;
  const initialHouse = rawHouse >= 1 && rawHouse <= 12 ? rawHouse : 1;

  const current = await fetchRahuCurrent(lang);
  if (!current) notFound();

  const rahuPos = current.positions?.Rahu;
  if (!rahuPos) notFound();

  const rahuFuture = current.future_transits?.Rahu || [];
  const currentTransit = rahuFuture[0];

  const rashiName = getRashiName(rahuPos.rashi, rahuPos.rashi_hi, isHi);
  const motion = getMotion(rahuPos.motion, isHi);

  const ascName = titleCase(ascendant);
  const currentRashi = rahuPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi =
    currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "rahu",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? RAHU_HOUSE_TRAITS_HI : RAHU_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `राहु गोचर ${currentYear} ${ascName} लग्न को कैसे प्रभावित करेगा?`
          : `How does Rahu transit ${currentYear} affect ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए राहु का ${currentRashi} में गोचर ${currentHouse}वें भाव में महत्वाकांक्षा और कर्मिक बदलाव लाता है।`
            : `For ${ascName} Rising, Rahu moves through ${currentRashi}, influencing the ${currentHouse} house of karma and desires.`,
        },
      },
      {
        "@type": "Question",
        name: isHi ? "राहु गोचर हमेशा भ्रम पैदा करता है?" : "Does Rahu transit always create confusion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "नहीं, राहु भौतिक सफलता और अपरंपरागत अवसर भी लाता है। सही दिशा में उपयोग करने पर यह तेज़ विकास देता है।"
            : "No, Rahu brings material success and unconventional opportunities. When channeled properly, it accelerates growth.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 border border-slate-100 overflow-hidden relative">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-950 tracking-tight">
            {isHi ? (
              <>
                राहु गोचर {currentYear} {ascName} लग्न के लिए –{" "}
                <span className="text-indigo-600">महत्वाकांक्षा और कर्म</span>
              </>
            ) : (
              <>
                Rahu Transit {currentYear} for {ascName} Rising –{" "}
                <span className="text-indigo-600">Ambition & Karma</span>
              </>
            )}
          </h1>
          <Link
            href={`/${isHi ? "hi/" : ""}rahu-transit`}
            className="text-sm font-bold text-indigo-700 uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            ← {isHi ? "राहु हब" : "Rahu Hub"}
          </Link>
        </header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="rahu"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            {isHi ? (
              <>राहु गोचर {currentYear} ({ascName} लग्न) में <strong>कर्मिक विस्तार और जुनून</strong> का चरण आता है।</>
            ) : (
              <>Rahu transit {currentYear} ({ascName} Rising) represents a phase of <strong>karmic expansion and obsession</strong>.</>
            )}
          </p>

          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            {isHi ? "उत्तर नोड शिफ्ट" : "North Node Shift"}: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {isHi ? (
              <>
                राहु, विस्तार का ग्रह, {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से <strong>{currentHouse}वें भाव</strong> में शिफ्ट हो रहा है।
                <br /><br />
                पहले {RAHU_HOUSE_TRAITS_HI[previousHouse]} पर फोकस था, अब <strong>{RAHU_HOUSE_TRAITS_HI[currentHouse]}</strong> से जुड़े नए अवसर खुल रहे हैं। स्पष्टता के साथ इसे हैंडल करें तो अचानक सफलता मिल सकती है।
              </>
            ) : (
              <>
                Rahu, the planet of amplification, moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>.
                <br /><br />
                Your material focus shifts from <strong>{RAHU_HOUSE_TRAITS_EN[previousHouse]}</strong> toward the themes of <strong>{RAHU_HOUSE_TRAITS_EN[currentHouse]}</strong>. This transit often brings sudden breakthroughs if handled with clarity.
              </>
            )}
          </p>
        </div>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Rahu</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-indigo-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            {isHi ? "राहु गोचर स्थिति" : "Current Rahu Position"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "वर्तमान राशि" : "Active Sign"}
              </p>
              <p className="text-lg font-bold">{currentRashi}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "प्रभावित भाव" : "Impact House"}
              </p>
              <p className="text-lg text-indigo-400 font-bold">House {currentHouse}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "डिग्री" : "Exact Degree"}
              </p>
              <p className="text-lg">{rahuPos?.degree ? `${rahuPos.degree}°` : "-"}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "गति" : "Motion"}
              </p>
              <p className="text-lg text-amber-400 italic font-bold">{motion}</p>
            </div>
          </div>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="rahu"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* House Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? `${ascName} लग्न के लिए हर भाव का फल` : `${ascName} Rising Material Forecast for Every House`}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/rahu-transit/${ascendant}?house=${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-indigo-600 uppercase mb-1 tracking-tighter">
                  {isHi ? "भाव" : "House"} {h}
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-indigo-700 tracking-tight font-serif italic">
                  {isHi ? "प्रभाव देखें" : "View Focus"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-indigo-700 font-bold text-sm uppercase tracking-wider">
          <Link href="/ketu-transit" className="hover:underline">Ketu Transit →</Link>
          <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
          <Link href="/saturn-transit" className="hover:underline">Saturn Transit →</Link>
        </footer>
      </article>
    </div>
  );
}