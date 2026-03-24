import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

/* ---------------- Configuration ---------------- */
const ASCENDANTS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] as const;
type AscendantSlug = (typeof ASCENDANTS)[number];

const PLANET_HI: Record<string, string> = {
  Jupiter: "बृहस्पति",
};

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

const JUPITER_HOUSE_TRAITS_EN: Record<number, string> = {
  1: "personal growth, optimism, physical vitality",
  2: "financial expansion, family harmony, improved speech",
  3: "skill development, short travels, courageous initiatives",
  4: "domestic happiness, property gains, emotional peace",
  5: "creative sparks, progeny luck, speculative gains",
  6: "victory over hurdles, health improvement, service growth",
  7: "marital bliss, partnership growth, social recognition",
  8: "sudden inheritance, occult wisdom, deep transformation",
  9: "spiritual awakening, higher learning, travel for wisdom",
  10: "career elevation, public status, professional authority",
  11: "monetary gains, social networking, desire fulfillment",
  12: "spiritual solitude, foreign opportunities, subconscious healing",
};

const JUPITER_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "व्यक्तिगत विकास, आशावाद, शारीरिक ऊर्जा",
  2: "आर्थिक विस्तार, पारिवारिक सुख, वाणी में सुधार",
  3: "कौशल विकास, छोटी यात्राएँ, साहसिक पहल",
  4: "घरेलू सुख, संपत्ति लाभ, भावनात्मक शांति",
  5: "रचनात्मक प्रेरणा, संतान सुख, सट्टा लाभ",
  6: "बाधाओं पर विजय, स्वास्थ्य सुधार, सेवा वृद्धि",
  7: "वैवाहिक सुख, साझेदारी विकास, सामाजिक मान्यता",
  8: "अचानक विरासत, गूढ़ ज्ञान, गहन परिवर्तन",
  9: "आध्यात्मिक जागृति, उच्च शिक्षा, ज्ञान यात्रा",
  10: "करियर उन्नति, सार्वजनिक प्रतिष्ठा, व्यावसायिक अधिकार",
  11: "धन लाभ, सामाजिक नेटवर्किंग, इच्छा पूर्ति",
  12: "आध्यात्मिक एकांत, विदेशी अवसर, अवचेतन उपचार",
};

const RASHI_INDEX: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
  Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
};

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
  if (!isHi) return rashi;
  return rashi_hi || RASHI_HI_MAP[rashi] || rashi;
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
async function fetchJupiterCurrent(lang: string) {
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

  const rashiForMeta = isHi
    ? RASHI_HI_MAP[ascName] || ascName // Hindi में देवनागरी
    : ascName; // English में Roman

  return {
    title: isHi
      ? `बृहस्पति गोचर ${currentYear} ${rashiForMeta} लग्न के लिए – प्रभाव और अर्थ`
      : `Jupiter Transit ${currentYear} for ${ascName} Rising – Effects & Meaning`,
    description: isHi
      ? `${rashiForMeta} लग्न के लिए बृहस्पति गोचर ${currentYear} में घर परिवर्तन, वित्तीय वृद्धि और आध्यात्मिक अवसरों का विस्तृत विश्लेषण।`
      : `How Jupiter transit ${currentYear} will affect ${ascName} Rising? Detailed house-wise Vedic effects, growth, and fortune.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/jupiter-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function JupiterTransitAscendantPage({
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

  const currentData = await fetchJupiterCurrent(lang);
  if (!currentData) notFound();

  const jupiterPos = currentData.positions?.Jupiter;
  if (!jupiterPos) notFound();

  const jupiterFuture = currentData.future_transits?.Jupiter || [];
  const currentTransit = jupiterFuture[0];

  const rashiName = getRashiName(jupiterPos.rashi, jupiterPos.rashi_hi, isHi);
  const motion = getMotion(jupiterPos.motion, isHi);

  const ascName = titleCase(ascendant);
  const currentRashi = jupiterPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = RASHI_INDEX[currentRashi] || 1;
  const previousRashi =
    currentIndex === 1
      ? "Pisces"
      : Object.keys(RASHI_INDEX).find(
          (key) => RASHI_INDEX[key] === currentIndex - 1
        ) || "Pisces";

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "jupiter",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? JUPITER_HOUSE_TRAITS_HI : JUPITER_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `${ascName} लग्न के लिए बृहस्पति गोचर ${currentYear} का महत्व क्या है?`
          : `What is the significance of Jupiter Transit ${currentYear} for ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए गुरु का ${currentRashi} में गोचर ${currentHouse}वें भाव में विस्तार और ज्ञान लाता है।`
            : `For ${ascName} Rising, Jupiter's movement into ${currentRashi} activates the ${currentHouse}th house, bringing expansion and wisdom in related areas.`,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-yellow-950/10 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">

        {/* Header */}
<header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
  <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-950 tracking-tight">
    {isHi ? (
      <>
        बृहस्पति गोचर {currentYear} {rashiName} लग्न के लिए –{" "}
        <span className="text-yellow-600">विकास और भाग्य</span>
      </>
    ) : (
      <>
        Jupiter Transit {currentYear} for {ascName} Rising –{" "}
        <span className="text-yellow-600">Growth & Fortune</span>
      </>
    )}
  </h1>
  <Link
    href={`/${isHi ? "hi/" : ""}jupiter-transit`}
    className="text-sm font-bold text-yellow-700 uppercase tracking-widest hover:underline flex items-center gap-1"
  >
    ← {isHi ? "ग्लोबल हब" : "Global Hub"}
  </Link>
</header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="jupiter"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>बृहस्पति गोचर {currentYear}</strong> {ascName} लग्न के लिए <strong>ज्ञान, समृद्धि और शुभ अवसरों</strong> का शक्तिशाली चक्र है। गुरु देवगुरु हैं—यह गोचर {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से {currentHouse}वें भाव में शिफ्ट हो रहा है।
              </p>
              <p>
                पहले {houseTraits[previousHouse]} पर फोकस था, अब नए अवसर {houseTraits[currentHouse]} में खुल रहे हैं। यह समय शिक्षा, यात्रा, धार्मिक कार्य और आर्थिक वृद्धि के लिए उत्तम है।
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Jupiter transit {currentYear}</strong> for {ascName} Rising is a powerful cycle of <strong>wisdom, prosperity, and fortunate opportunities</strong>. Guru is moving from {previousRashi} to {currentRashi}, shifting influence from the {previousHouse}th house to the <strong>{currentHouse}th house</strong>.
              </p>
              <p>
                Previously focused on {houseTraits[previousHouse]}, now new doors open in <strong>{houseTraits[currentHouse]}</strong>. This is an excellent period for learning, travel, spiritual pursuits, and financial growth.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-yellow-400 uppercase">
            {isHi ? "वर्तमान बृहस्पति स्थिति" : "Current Jupiter Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({jupiterPos?.degree}°)
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "सक्रिय भाव" : "Active House"}
              </p>
              <p className="text-2xl font-black text-yellow-400">
                House {currentHouse}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गति" : "Motion"}
              </p>
              <p className="text-2xl font-black italic text-amber-400">
                {motion}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "समय अवधि" : "Transit Window"}
              </p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} –{" "}
                {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* Client Interactive Tabs */}
        <section id="signs" className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="jupiter"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </section>

        {/* House Grid Links */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi
              ? `${ascName} लग्न के भाव-वार फल`
              : `${ascName} Rising House-by-House Forecast`}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/${isHi ? "hi/" : ""}jupiter-transit/${ascendant}?house=${h}`}
                className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-yellow-500 hover:bg-white transition-all shadow-sm hover:shadow-md"
              >
                <p className="text-xs font-black text-yellow-600 uppercase mb-2 tracking-wider">
                  {isHi ? "भाव" : "House"} {h}
                </p>
                <p className="text-lg font-bold text-slate-800 group-hover:text-yellow-700">
                  {isHi ? "प्रभाव देखें" : "View Impact"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-slate-100 pb-10">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">
            {isHi ? "अन्य ग्रह गोचर" : "Other Planetary Transits"}
          </h4>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-yellow-700">
            {["Sun", "Moon", "Mars", "Mercury", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${isHi ? "hi/" : ""}${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p as keyof typeof PLANET_HI] || p : p} →
              </Link>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}