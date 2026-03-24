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

const MARS_HOUSE_TRAITS_EN: Record<number, string> = {
  1: "intense energy, physical drive, impulsive decisions",
  2: "financial initiative, sharp speech, wealth-building action",
  3: "unstoppable courage, short travels, competitive edge",
  4: "domestic friction, property initiatives, inner restlessness",
  5: "creative passion, dynamic romance, speculative risks",
  6: "victory over rivals, health discipline, work-life intensity",
  7: "partnership dynamics, intense social interactions, business drive",
  8: "sudden transformations, hidden strengths, occult research",
  9: "religious passion, adventurous travel, pursuit of truth",
  10: "career ambition, professional leadership, social authority",
  11: "social influence, networking for gains, desire fulfillment",
  12: "subconscious battles, foreign initiatives, spiritual discipline",
};

const MARS_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "तीव्र ऊर्जा, शारीरिक प्रेरणा, आवेगी निर्णय",
  2: "आर्थिक पहल, तीक्ष्ण वाणी, धन संचय की क्रिया",
  3: "अटल साहस, छोटी यात्राएँ, प्रतिस्पर्धी बढ़त",
  4: "घरेलू तनाव, संपत्ति पहल, आंतरिक अशांति",
  5: "रचनात्मक जुनून, गतिशील प्रेम, सट्टा जोखिम",
  6: "प्रतिद्वंद्वियों पर विजय, स्वास्थ्य अनुशासन, कार्य-जीवन तीव्रता",
  7: "साझेदारी गतिशीलता, तीव्र सामाजिक अंतर्क्रिया, व्यवसाय प्रेरणा",
  8: "अचानक परिवर्तन, छिपी शक्तियाँ, गूढ़ अनुसंधान",
  9: "धार्मिक जुनून, साहसिक यात्रा, सत्य की खोज",
  10: "करियर महत्वाकांक्षा, व्यावसायिक नेतृत्व, सामाजिक अधिकार",
  11: "सामाजिक प्रभाव, लाभ के लिए नेटवर्किंग, इच्छा पूर्ति",
  12: "अवचेतन संघर्ष, विदेशी पहल, आध्यात्मिक अनुशासन",
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
async function fetchMarsCurrent(lang: string) {
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
      ? `मंगल गोचर ${currentYear} ${ascName} लग्न के लिए – ऊर्जा और साहस`
      : `Mars Transit ${currentYear} for ${ascName} Rising – Energy & Courage`,
    description: isHi
      ? `${ascName} लग्न के लिए मंगल गोचर ${currentYear} में घर-वार प्रभाव, करियर महत्वाकांक्षा, स्वास्थ्य और साहस का विस्तृत वैदिक विश्लेषण।`
      : `Detailed house-wise effects of Mars (Mangal) transit ${currentYear} for ${ascName} Rising. Vedic insights on energy, ambition, conflicts, and vitality.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/mars-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function MarsTransitAscendantPage({
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

  const current = await fetchMarsCurrent(lang);
  if (!current) notFound();

  const marsPos = current.positions?.Mars;
  if (!marsPos) notFound();

  const jupiterFuture = current.future_transits?.Mars || [];
  const currentTransit = jupiterFuture[0];

  const rashiName = getRashiName(marsPos.rashi, marsPos.rashi_hi, isHi);
  const motion = getMotion(marsPos.motion, isHi);

  const ascName = titleCase(ascendant);
  const currentRashi = marsPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi =
    currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "mars",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? MARS_HOUSE_TRAITS_HI : MARS_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `मंगल गोचर ${currentYear} ${ascName} लग्न के लिए क्या प्रभाव डालेगा?`
          : `How will Mars Transit ${currentYear} affect ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए मंगल का ${currentRashi} में गोचर ${currentHouse}वें भाव को सक्रिय करता है, जो महत्वाकांक्षा और दैनिक ऊर्जा को प्रभावित करता है।`
            : `For ${ascName} Rising, Mars in ${currentRashi} activates the ${currentHouse} house, influencing ambition and daily energy levels.`,
        },
      },
      {
        "@type": "Question",
        name: isHi ? "मंगल गोचर हमेशा आक्रामक होता है?" : "Is Mars transit always aggressive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "नहीं, मंगल ऊर्जा और साहस का ग्रह है। सही दिशा में उपयोग करने पर यह सफलता, नेतृत्व और विजय लाता है।"
            : "No, Mars is the planet of energy and courage. When channeled properly, it brings success, leadership, and victory.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-red-950/20 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900 border border-slate-100">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-950 tracking-tight">
            {isHi ? (
              <>
                मंगल गोचर {currentYear} {ascName} लग्न के लिए –{" "}
                <span className="text-red-600">ऊर्जा और साहस</span>
              </>
            ) : (
              <>
                Mars Transit {currentYear} for {ascName} Rising –{" "}
                <span className="text-red-600">Energy & Courage</span>
              </>
            )}
          </h1>
          <Link
            href={`/${isHi ? "hi/" : ""}mars-transit`}
            className="text-sm font-bold text-red-700 uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            ← {isHi ? "मंगल हब" : "Mars Hub"}
          </Link>
        </header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="mars"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            {isHi ? (
              <>मंगल गोचर {currentYear} ({ascName} लग्न) में <strong>इच्छाशक्ति और सक्रियता</strong> में शक्तिशाली बदलाव लाता है।</>
            ) : (
              <>The Mars transit {currentYear} ({ascName} Rising) represents a powerful shift in <strong>willpower and initiative</strong>.</>
            )}
          </p>

          <h2 className="text-2xl font-bold text-red-900 mb-4">
            {isHi ? "मंगल शिफ्ट" : "Mars Shift"}: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {isHi ? (
              <>
                इस चरण में मंगल {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से <strong>{currentHouse}वें भाव</strong> में शिफ्ट हो रहा है।
                <br /><br />
                पहले {MARS_HOUSE_TRAITS_HI[previousHouse]} पर फोकस था, अब <strong>{MARS_HOUSE_TRAITS_HI[currentHouse]}</strong> से जुड़े विषय प्रमुख होंगे। अपनी आंतरिक ऊर्जा को रणनीतिक रूप से उपयोग करें और जल्दबाजी से बचें।
              </>
            ) : (
              <>
                In this phase, Mars moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>.
                <br /><br />
                Your focus transitions from <strong>{MARS_HOUSE_TRAITS_EN[previousHouse]}</strong> toward the themes of <strong>{MARS_HOUSE_TRAITS_EN[currentHouse]}</strong>. This is the time to channel your inner drive strategically and avoid burnout.
              </>
            )}
          </p>
        </div>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Mangal</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-red-500 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            {isHi ? "मंगल गोचर स्थिति" : "Mars Transit Status"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "वर्तमान राशि" : "Current Sign"}
              </p>
              <p className="text-lg font-bold">{currentRashi}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "प्रभावित भाव" : "Impact House"}
              </p>
              <p className="text-lg text-red-400 font-bold">House {currentHouse}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "डिग्री" : "Exact Degree"}
              </p>
              <p className="text-lg">{marsPos?.degree ? `${marsPos.degree}°` : "-"}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "गति" : "Motion"}
              </p>
              <p className="text-lg text-amber-400 italic">{motion}</p>
            </div>
          </div>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="mars"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* House Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? `${ascName} लग्न के लिए हर भाव का फल` : `${ascName} Rising Transit Map for Every House`}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/mars-transit/${ascendant}?house=${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-red-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-red-600 uppercase mb-1 tracking-tighter">
                  {isHi ? "भाव" : "House"} {h}
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-red-700 tracking-tight">
                  {isHi ? "प्रभाव देखें" : "View Impact"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-red-700 font-bold text-sm uppercase tracking-wider">
          <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
          <Link href="/saturn-transit" className="hover:underline">Saturn Transit →</Link>
          <Link href="/rahu-transit" className="hover:underline">Rahu Transit →</Link>
        </footer>
      </article>
    </div>
  );
}