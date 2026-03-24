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

const MOON_HOUSE_TRAITS_EN: Record<number, string> = {
  1: "emotional focus on self, sensitive moods, intuitive physical response",
  2: "focus on financial security, family emotions, selective speech",
  3: "active daily communication, short travels, mental restlessness",
  4: "domestic peace, emotional grounding at home, focus on mother",
  5: "creative expression, romantic sensitivity, emotional bond with progeny",
  6: "daily routine focus, health sensitivity, emotional service",
  7: "focus on partnerships, sensitive social interactions, public emotions",
  8: "intense subconscious shifts, hidden fears, intuitive research",
  9: "philosophical mindset, religious emotions, travel for peace",
  10: "public reputation focus, emotional career drive, social status",
  11: "social networking, desire fulfillment, emotional gains from friends",
  12: "subconscious healing, isolation, spiritual dreams and intuition",
};

const MOON_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "स्वयं पर भावनात्मक फोकस, संवेदनशील मूड, अंतर्ज्ञानी शारीरिक प्रतिक्रिया",
  2: "वित्तीय सुरक्षा पर फोकस, पारिवारिक भावनाएँ, चुनिंदा वाणी",
  3: "दैनिक संचार सक्रिय, छोटी यात्राएँ, मानसिक अशांति",
  4: "घरेलू शांति, घर में भावनात्मक स्थिरता, माँ पर फोकस",
  5: "रचनात्मक अभिव्यक्ति, रोमांटिक संवेदनशीलता, संतान से भावनात्मक बंधन",
  6: "दैनिक रूटीन फोकस, स्वास्थ्य संवेदनशीलता, भावनात्मक सेवा",
  7: "साझेदारी पर फोकस, संवेदनशील सामाजिक अंतर्क्रिया, सार्वजनिक भावनाएँ",
  8: "तीव्र अवचेतन बदलाव, छिपे डर, अंतर्ज्ञानी अनुसंधान",
  9: "दार्शनिक मानसिकता, धार्मिक भावनाएँ, शांति के लिए यात्रा",
  10: "सार्वजनिक प्रतिष्ठा फोकस, भावनात्मक करियर प्रेरणा, सामाजिक स्थिति",
  11: "सामाजिक नेटवर्किंग, इच्छा पूर्ति, मित्रों से भावनात्मक लाभ",
  12: "अवचेतन उपचार, एकांत, आध्यात्मिक सपने और अंतर्ज्ञान",
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
async function fetchMoonCurrent(lang: string) {
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
      ? `चंद्र गोचर ${currentYear} ${ascName} लग्न के लिए – भावनाएँ और अंतर्ज्ञान`
      : `Moon Transit ${currentYear} for ${ascName} Rising – Emotions & Intuition`,
    description: isHi
      ? `${ascName} लग्न के लिए चंद्र गोचर ${currentYear} में भावनाओं, मन, माँ और दैनिक मूड पर घर-वार प्रभाव का विस्तृत वैदिक विश्लेषण।`
      : `Detailed house-wise effects of Moon (Chandra) transit ${currentYear} for ${ascName} Rising. Vedic insights on moods, mind, intuition, and daily emotional shifts.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/moon-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function MoonTransitAscendantPage({
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

  const current = await fetchMoonCurrent(lang);
  if (!current) notFound();

  const moonPos = current.positions?.Moon;
  if (!moonPos) notFound();

  const moonFuture = current.future_transits?.Moon || [];
  const currentTransit = moonFuture[0];

  const rashiName = getRashiName(moonPos.rashi, moonPos.rashi_hi, isHi);
  const motion = getMotion(moonPos.motion, isHi);

  const ascName = titleCase(ascendant);
  const currentRashi = moonPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi =
    currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "moon",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? MOON_HOUSE_TRAITS_HI : MOON_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `चंद्र गोचर ${currentYear} ${ascName} लग्न को कैसे प्रभावित करेगा?`
          : `How does Moon transit ${currentYear} affect ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए चंद्र आज ${currentRashi} में है, जो ${currentHouse}वें भाव में भावनाओं और अंतर्ज्ञान को सक्रिय करता है।`
            : `For ${ascName} Rising, the Moon moves through ${currentRashi} today, activating the ${currentHouse} house of emotions and instincts.`,
        },
      },
      {
        "@type": "Question",
        name: isHi ? "चंद्र गोचर कितनी बार बदलता है?" : "How often does Moon transit change?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "चंद्र हर 2-3 दिन में राशि बदलता है। इसलिए यह दैनिक मूड और भावनाओं पर सबसे तेज़ प्रभाव डालता है।"
            : "The Moon changes signs every 2-3 days, making it the fastest influence on daily mood, emotions, and instincts.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950/20 py-16 px-4">
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
                चंद्र गोचर {currentYear} {ascName} लग्न के लिए –{" "}
                <span className="text-indigo-600">भावनाएँ और अंतर्ज्ञान</span>
              </>
            ) : (
              <>
                Moon Transit {currentYear} for {ascName} Rising –{" "}
                <span className="text-indigo-600">Emotions & Intuition</span>
              </>
            )}
          </h1>
          <Link
            href={`/${isHi ? "hi/" : ""}moon-transit`}
            className="text-sm font-bold text-indigo-700 uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            ← {isHi ? "चंद्र हब" : "Moon Hub"}
          </Link>
        </header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="moon"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            {isHi ? (
              <>चंद्र गोचर {currentYear} ({ascName} लग्न) में <strong>भावनात्मक आवृत्ति</strong> का सबसे तेज़ बदलाव आता है।</>
            ) : (
              <>The Moon transit {currentYear} ({ascName} Rising) represents the fast-moving <strong>emotional frequency</strong>.</>
            )}
          </p>

          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            {isHi ? "भावनात्मक शिफ्ट" : "Emotional Shift"}: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {isHi ? (
              <>
                चंद्र {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से <strong>{currentHouse}वें भाव</strong> में शिफ्ट हो रहा है।
                <br /><br />
                पहले {MOON_HOUSE_TRAITS_HI[previousHouse]} पर फोकस था, अब <strong>{MOON_HOUSE_TRAITS_HI[currentHouse]}</strong> से जुड़े दैनिक भावनात्मक विषय प्रमुख होंगे। यह चक्र हर 27 दिन में दोहराता है, जिससे मासिक भावनात्मक परिदृश्य बनता है।
              </>
            ) : (
              <>
                The Moon moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>.
                <br /><br />
                Your mental focus and comfort zone shift from <strong>{MOON_HOUSE_TRAITS_EN[previousHouse]}</strong> toward the daily themes of <strong>{MOON_HOUSE_TRAITS_EN[currentHouse]}</strong>. This cycle repeats every 27 days, shaping your monthly emotional landscape.
              </>
            )}
          </p>
        </div>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Chandra</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-indigo-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            {isHi ? "चंद्र गोचर स्थिति" : "Current Moon Position"}
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
              <p className="text-lg">{moonPos?.degree ? `${moonPos.degree}°` : "-"}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "नक्षत्र" : "Nakshatra"}
              </p>
              <p className="text-lg text-white font-bold">{moonPos?.nakshatra || "-"}</p>
            </div>
          </div>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="moon"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* House Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? `${ascName} लग्न के लिए हर भाव का फल` : `${ascName} Rising Lunar Forecast for Every House`}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/moon-transit/${ascendant}?house=${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-indigo-600 uppercase mb-1 tracking-tighter">
                  {isHi ? "भाव" : "House"} {h}
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-indigo-700 tracking-tight font-serif italic">
                  {isHi ? "प्रभाव देखें" : "View Impact"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-indigo-700 font-bold text-sm uppercase tracking-wider">
          <Link href="/sun-transit" className="hover:underline">Sun Transit →</Link>
          <Link href="/mercury-transit" className="hover:underline">Mercury Transit →</Link>
          <Link href="/mars-transit" className="hover:underline">Mars Transit →</Link>
        </footer>
      </article>
    </div>
  );
}