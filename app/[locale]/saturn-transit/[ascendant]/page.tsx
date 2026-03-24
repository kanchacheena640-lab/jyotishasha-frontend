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

const SATURN_HOUSE_TRAITS_EN: Record<number, string> = {
  1: "disciplined self-growth, heavy responsibilities, restructuring identity",
  2: "financial discipline, family duties, cautious speech and values",
  3: "focused efforts, skill mastery, serious communication with siblings",
  4: "domestic responsibilities, property restructuring, emotional maturity",
  5: "disciplined creativity, serious approach to romance, progeny duties",
  6: "victory through hard work, health discipline, organized service",
  7: "relationship testing, business restructuring, long-term contracts",
  8: "occult mastery, deep financial audit, transformative life lessons",
  9: "philosophical depth, religious discipline, travel for duty",
  10: "career peak, professional authority, massive social responsibility",
  11: "steady networking, focused gains, desire fulfillment through delay",
  12: "subconscious cleanup, isolation for growth, spiritual endurance",
};

const SATURN_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "अनुशासित आत्म-विकास, भारी जिम्मेदारियाँ, पहचान का पुनर्गठन",
  2: "वित्तीय अनुशासन, पारिवारिक कर्तव्य, सतर्क वाणी और मूल्य",
  3: "केंद्रित प्रयास, कौशल में महारत, भाइयों से गंभीर संचार",
  4: "घरेलू जिम्मेदारियाँ, संपत्ति पुनर्गठन, भावनात्मक परिपक्वता",
  5: "अनुशासित रचनात्मकता, प्रेम में गंभीर दृष्टिकोण, संतान कर्तव्य",
  6: "कठिन परिश्रम से विजय, स्वास्थ्य अनुशासन, संगठित सेवा",
  7: "रिश्तों की परीक्षा, व्यवसाय पुनर्गठन, दीर्घकालिक अनुबंध",
  8: "गूढ़ महारत, गहन वित्तीय ऑडिट, परिवर्तनकारी जीवन सबक",
  9: "दार्शनिक गहराई, धार्मिक अनुशासन, कर्तव्य के लिए यात्रा",
  10: "करियर चरम, व्यावसायिक अधिकार, विशाल सामाजिक जिम्मेदारी",
  11: "स्थिर नेटवर्किंग, केंद्रित लाभ, विलंब से इच्छा पूर्ति",
  12: "अवचेतन सफाई, विकास के लिए एकांत, आध्यात्मिक सहनशीलता",
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
async function fetchSaturnCurrent(lang: string) {
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
      ? `शनि गोचर ${currentYear} ${ascName} लग्न के लिए – कर्म और अनुशासन`
      : `Saturn Transit ${currentYear} for ${ascName} Rising – Karma & Discipline`,
    description: isHi
      ? `${ascName} लग्न के लिए शनि गोचर ${currentYear} में कर्मिक सबक, करियर बदलाव और साढ़ेसाती प्रभाव का घर-वार विस्तृत वैदिक विश्लेषण।`
      : `Detailed house-wise effects of Saturn (Shani) transit ${currentYear} for ${ascName} Rising. Vedic insights on karmic lessons, discipline, career restructuring, and Sade Sati impacts.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/saturn-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function SaturnTransitAscendantPage({
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

  const current = await fetchSaturnCurrent(lang);
  if (!current) notFound();

  const saturnPos = current.positions?.Saturn;
  if (!saturnPos) notFound();

  const saturnFuture = current.future_transits?.Saturn || [];
  const currentTransit = saturnFuture[0];

  const rashiName = getRashiName(saturnPos.rashi, saturnPos.rashi_hi, isHi);
  const motion = getMotion(saturnPos.motion, isHi);

  const ascName = titleCase(ascendant);
  const currentRashi = saturnPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi =
    currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "saturn",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? SATURN_HOUSE_TRAITS_HI : SATURN_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `शनि गोचर ${currentYear} ${ascName} लग्न को कैसे प्रभावित करेगा?`
          : `How does Saturn transit ${currentYear} affect ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए शनि का ${currentRashi} में गोचर ${currentHouse}वें भाव में अनुशासन और दीर्घकालिक सबक लाता है।`
            : `For ${ascName} Rising, Saturn in ${currentRashi} activates the ${currentHouse} house, bringing karmic discipline and long-term restructuring.`,
        },
      },
      {
        "@type": "Question",
        name: isHi ? "शनि गोचर कितने समय तक रहता है?" : "How long does Saturn transit last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "शनि एक राशि में लगभग 2.5 वर्ष रहता है। यह समय धैर्य, मेहनत और जिम्मेदारी से स्थायी सफलता लाता है।"
            : "Saturn stays in one sign for about 2.5 years. This period rewards patience, hard work, and responsibility with lasting achievements.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4">
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
                शनि गोचर {currentYear} {ascName} लग्न के लिए –{" "}
                <span className="text-slate-600">कर्म और अनुशासन</span>
              </>
            ) : (
              <>
                Saturn Transit {currentYear} for {ascName} Rising –{" "}
                <span className="text-slate-600">Karma & Discipline</span>
              </>
            )}
          </h1>
          <Link
            href={`/${isHi ? "hi/" : ""}saturn-transit`}
            className="text-sm font-bold text-slate-500 uppercase tracking-widest hover:text-blue-600 transition flex items-center gap-1"
          >
            ← {isHi ? "शनि हब" : "Saturn Hub"}
          </Link>
        </header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="saturn"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            {isHi ? (
              <>शनि गोचर {currentYear} ({ascName} लग्न) में <strong>परिपक्वता और महारत</strong> का गहन चक्र आता है।</>
            ) : (
              <>Saturn transit {currentYear} ({ascName} Rising) represents a profound <strong>cycle of maturity and mastery</strong>.</>
            )}
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {isHi ? "कर्मिक पुनर्गठन" : "Karmic Restructuring"}: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {isHi ? (
              <>
                शनि, कर्म का स्वामी, {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से <strong>{currentHouse}वें भाव</strong> में शिफ्ट हो रहा है।
                <br /><br />
                इस धीमे परिवर्तन में जीवन फोकस {SATURN_HOUSE_TRAITS_HI[previousHouse]} से {SATURN_HOUSE_TRAITS_HI[currentHouse]} की दीर्घकालिक नींव की ओर जाता है। यह चरण धैर्य और नैतिक कार्य की मांग करता है।
              </>
            ) : (
              <>
                Saturn, the Lord of Karma, moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>.
                <br /><br />
                In this slow transition, your life focus shifts from <strong>{SATURN_HOUSE_TRAITS_EN[previousHouse]}</strong> toward the long-term foundations of <strong>{SATURN_HOUSE_TRAITS_EN[currentHouse]}</strong>. This phase demands patience and ethical action.
              </>
            )}
          </p>
        </div>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Shani</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-slate-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
            {isHi ? "शनि गोचर स्थिति" : "Saturn Audit Snapshot"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "वर्तमान राशि" : "Transit Sign"}
              </p>
              <p className="text-lg font-bold">{currentRashi}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "प्रभावित भाव" : "Impact House"}
              </p>
              <p className="text-lg text-slate-400 font-bold">House {currentHouse}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "डिग्री" : "Exact Degree"}
              </p>
              <p className="text-lg">{saturnPos?.degree ? `${saturnPos.degree}°` : "-"}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "समय अवधि" : "Current Period"}
              </p>
              <p className="text-[11px] font-bold text-slate-200">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="saturn"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* House Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? `${ascName} लग्न के लिए हर भाव का फल` : `${ascName} Rising Karmic Map for Every House`}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/saturn-transit/${ascendant}?house=${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-tighter">
                  {isHi ? "भाव" : "Audit Scope"} {h}
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-slate-900 tracking-tight">
                  {isHi ? "प्रभाव देखें" : "House"} {h}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-blue-700 font-bold text-sm uppercase tracking-wider">
          <Link href="/rahu-transit" className="hover:underline">Rahu Transit →</Link>
          <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
          <Link href="/ketu-transit" className="hover:underline">Ketu Transit →</Link>
        </footer>
      </article>
    </div>
  );
}