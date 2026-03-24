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

const MERCURY_HOUSE_TRAITS_EN: Record<number, string> = {
  1: "mental agility, self-expression, new ideas",
  2: "financial planning, articulate speech, business calculations",
  3: "skill learning, short travels, effective networking",
  4: "domestic discussions, property paperwork, mental peace",
  5: "creative writing, intellectual romance, speculative logic",
  6: "analytical work, health awareness, strategic problem-solving",
  7: "relationship communication, contract negotiations, social commerce",
  8: "deep research, occult interests, financial analysis",
  9: "higher studies, philosophical travel, wisdom sharing",
  10: "professional networking, career planning, public speaking",
  11: "social connections, goal setting, intellectual gains",
  12: "subconscious analysis, foreign trade, spiritual writing",
};

const MERCURY_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "मानसिक चपलता, आत्म-अभिव्यक्ति, नई विचारधारा",
  2: "वित्तीय योजना, स्पष्ट वाणी, व्यापार गणना",
  3: "कौशल सीखना, छोटी यात्राएँ, प्रभावी नेटवर्किंग",
  4: "घरेलू चर्चाएँ, संपत्ति कागजी कार्य, मानसिक शांति",
  5: "रचनात्मक लेखन, बौद्धिक प्रेम, सट्टा तर्क",
  6: "विश्लेषणात्मक कार्य, स्वास्थ्य जागरूकता, रणनीतिक समस्या समाधान",
  7: "रिश्तों में संचार, अनुबंध बातचीत, सामाजिक व्यापार",
  8: "गहन अनुसंधान, गूढ़ रुचियाँ, वित्तीय विश्लेषण",
  9: "उच्च अध्ययन, दार्शनिक यात्रा, ज्ञान साझा करना",
  10: "व्यावसायिक नेटवर्किंग, करियर योजना, सार्वजनिक बोलचाल",
  11: "सामाजिक संबंध, लक्ष्य निर्धारण, बौद्धिक लाभ",
  12: "अवचेतन विश्लेषण, विदेशी व्यापार, आध्यात्मिक लेखन",
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
async function fetchMercuryCurrent(lang: string) {
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
      ? `बुध गोचर ${currentYear} ${ascName} लग्न के लिए – बुद्धि और संचार`
      : `Mercury Transit ${currentYear} for ${ascName} Rising – Intellect & Communication`,
    description: isHi
      ? `${ascName} लग्न के लिए बुध गोचर ${currentYear} में संचार, व्यापार, बुद्धि और शिक्षा पर घर-वार प्रभाव का विस्तृत वैदिक विश्लेषण।`
      : `Detailed house-wise effects of Mercury (Budh) transit ${currentYear} for ${ascName} Rising. Vedic insights on communication, business, learning, and logic.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/mercury-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function MercuryTransitAscendantPage({
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

  const current = await fetchMercuryCurrent(lang);
  if (!current) notFound();

  const mercuryPos = current.positions?.Mercury;
  if (!mercuryPos) notFound();

  const mercuryFuture = current.future_transits?.Mercury || [];
  const currentTransit = mercuryFuture[0];

  const rashiName = getRashiName(mercuryPos.rashi, mercuryPos.rashi_hi, isHi);
  const motion = getMotion(mercuryPos.motion, isHi);

  const ascName = titleCase(ascendant);
  const currentRashi = mercuryPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi =
    currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "mercury",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? MERCURY_HOUSE_TRAITS_HI : MERCURY_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `बुध गोचर ${currentYear} ${ascName} लग्न को कैसे प्रभावित करेगा?`
          : `How does Mercury transit ${currentYear} affect ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए बुध का ${currentRashi} में गोचर ${currentHouse}वें भाव में संचार और तर्क को सक्रिय करता है।`
            : `For ${ascName} Rising, Mercury transit in ${currentRashi} triggers changes in communication and logic in the ${currentHouse} house.`,
        },
      },
      {
        "@type": "Question",
        name: isHi ? "बुध गोचर हमेशा तेज़ बदलाव लाता है?" : "Does Mercury transit always bring quick changes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "हाँ, बुध सबसे तेज़ ग्रह है। यह संचार, व्यापार और बुद्धि में त्वरित बदलाव लाता है, लेकिन retrograde में सावधानी बरतें।"
            : "Yes, Mercury is the fastest planet. It brings quick shifts in communication, business, and intellect—but exercise caution during retrograde.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-emerald-950/20 py-16 px-4">
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
                बुध गोचर {currentYear} {ascName} लग्न के लिए –{" "}
                <span className="text-emerald-600">बुद्धि और संचार</span>
              </>
            ) : (
              <>
                Mercury Transit {currentYear} for {ascName} Rising –{" "}
                <span className="text-emerald-600">Intellect & Communication</span>
              </>
            )}
          </h1>
          <Link
            href={`/${isHi ? "hi/" : ""}mercury-transit`}
            className="text-sm font-bold text-emerald-700 uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            ← {isHi ? "बुध हब" : "Mercury Hub"}
          </Link>
        </header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="mercury"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            {isHi ? (
              <>बुध गोचर {currentYear} ({ascName} लग्न) में <strong>संचार और निर्णय लेने</strong> की क्षमता में महत्वपूर्ण बदलाव लाता है।</>
            ) : (
              <>Mercury transit {currentYear} ({ascName} Rising) represents a pivotal time for <strong>communication and decision-making</strong>.</>
            )}
          </p>

          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            {isHi ? "बौद्धिक शिफ्ट" : "Intellectual Shift"}: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {isHi ? (
              <>
                बुध, तर्क और संचार का ग्रह, {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से <strong>{currentHouse}वें भाव</strong> में शिफ्ट हो रहा है।
                <br /><br />
                पहले {MERCURY_HOUSE_TRAITS_HI[previousHouse]} पर फोकस था, अब <strong>{MERCURY_HOUSE_TRAITS_HI[currentHouse]}</strong> से जुड़े नए बौद्धिक अवसर खुल रहे हैं। यह नेटवर्किंग और व्यापार योजना के लिए आदर्श समय है।
              </>
            ) : (
              <>
                Mercury, the planet of logic, moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>.
                <br /><br />
                Your analytical focus shifts from <strong>{MERCURY_HOUSE_TRAITS_EN[previousHouse]}</strong> toward new intellectual pursuits in <strong>{MERCURY_HOUSE_TRAITS_EN[currentHouse]}</strong>. This is an ideal period for networking and business planning.
              </>
            )}
          </p>
        </div>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Budh</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-emerald-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            {isHi ? "बुध गोचर स्थिति" : "Current Mercury Status"}
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
              <p className="text-lg text-emerald-400 font-bold">House {currentHouse}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "डिग्री" : "Exact Degree"}
              </p>
              <p className="text-lg">{mercuryPos?.degree ? `${mercuryPos.degree}°` : "-"}</p>
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
            planet="mercury"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* House Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? `${ascName} लग्न के लिए हर भाव का फल` : `${ascName} Rising Intellectual Map for Every House`}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/mercury-transit/${ascendant}?house=${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-emerald-600 uppercase mb-1 tracking-tighter">
                  {isHi ? "भाव" : "House"} {h}
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-emerald-700 tracking-tight">
                  {isHi ? "प्रभाव देखें" : "View Impact"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-emerald-700 font-bold text-sm uppercase tracking-wider">
          <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
          <Link href="/venus-transit" className="hover:underline">Venus Transit →</Link>
          <Link href="/mars-transit" className="hover:underline">Mars Transit →</Link>
        </footer>
      </article>
    </div>
  );
}