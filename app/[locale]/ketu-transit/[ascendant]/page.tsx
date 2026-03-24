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

const KETU_HOUSE_TRAITS_EN: Record<number, string> = {
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

const KETU_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "पहचान में भ्रम, आत्म-वैराग्य, आंतरिक पुनर्खोज",
  2: "धन से अलगाव, वाणी संयम, मूल्यों का पुनर्मूल्यांकन",
  3: "संचार में संकोच, चुनिंदा प्रयास, आंतरिक साहस",
  4: "भावनात्मक अलगाव, आंतरिक अशांति, शांति की खोज",
  5: "रचनात्मक रुकावट, अपरंपरागत सोच, प्रेम में वैराग्य",
  6: "छिपे शत्रु, कर्मिक स्वास्थ्य पैटर्न, बिना आसक्ति सेवा",
  7: "रिश्तों में दूरी, कर्मिक साझेदारी, भावनात्मक अंतर",
  8: "गहन परिवर्तन, छिपे डर, आध्यात्मिक जागृति",
  9: "विश्वासों पर सवाल, धर्म से अलगाव, दार्शनिक बदलाव",
  10: "करियर में भ्रम, दिशा की कमी, उद्देश्य पुनर्संतुलन",
  11: "सामाजिक दायरे से अलगाव, चुनिंदा नेटवर्किंग, लक्ष्य बदलाव",
  12: "एकांत, अवचेतन उपचार, आध्यात्मिक विकास",
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

/* ---------------- Data Fetch ---------------- */
async function fetchKetuCurrent(lang: string) {
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
      ? `केतु गोचर ${currentYear} ${ascName} लग्न के लिए – अर्थ और प्रभाव`
      : `Ketu Transit ${currentYear} for ${ascName} Rising – Meaning & Effects`,
    description: isHi
      ? `${ascName} लग्न के लिए केतु (दक्षिण नोड) गोचर ${currentYear} में कर्मिक अलगाव, आध्यात्मिक विकास और घर-वार प्रभाव का विस्तृत विश्लेषण।`
      : `Detailed house-wise effects of Ketu (South Node) transit ${currentYear} for ${ascName} Rising. Karmic shifts, detachment, and spiritual insights in Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/ketu-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function KetuTransitAscendantPage({
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

  const current = await fetchKetuCurrent(lang);
  if (!current) notFound();

  const ketuPos = current.positions?.Ketu;
  if (!ketuPos) notFound();

  const ascName = titleCase(ascendant);
  const currentRashi = ketuPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi =
    currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "ketu",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? KETU_HOUSE_TRAITS_HI : KETU_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `केतु गोचर ${currentYear} का ज्योतिष में क्या महत्व है?`
          : `What does Ketu Transit ${currentYear} mean in astrology?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "केतु गोचर, जिसे दक्षिण नोड गोचर भी कहते हैं, कर्मिक मुक्ति, वैराग्य और आध्यात्मिक परिवर्तन का प्रतीक है।"
            : "Ketu transit, also known as South Node transit, represents karmic release, detachment, and spiritual transformation in astrology.",
        },
      },
      {
        "@type": "Question",
        name: isHi
          ? `${ascName} लग्न के लिए केतु गोचर ${currentYear} क्या प्रभाव डालेगा?`
          : `How will Ketu Transit ${currentYear} affect ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए केतु का गोचर भाव के अनुसार जीवन के क्षेत्रों में वैराग्य और आंतरिक विकास लाता है।`
            : `For ${ascName} ascendant, Ketu transit influences life areas based on its house placement, bringing detachment and inner growth.`,
        },
      },
      {
        "@type": "Question",
        name: isHi ? "क्या केतु गोचर हमेशा नकारात्मक होता है?" : "Is Ketu transit always negative?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "नहीं, केतु गोचर नकारात्मक नहीं है। यह आध्यात्मिक विकास, भ्रमों से मुक्ति और अस्वास्थ्यकर पैटर्न तोड़ने में मदद करता है।"
            : "No, Ketu transit is not negative. It helps in spiritual growth, removing illusions, and breaking unhealthy patterns.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-gray-900 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-950 tracking-tight">
            {isHi ? (
              <>
                केतु गोचर {currentYear} {ascName} लग्न के लिए –{" "}
                <span className="text-blue-600">वैराग्य और आध्यात्मिकता</span>
              </>
            ) : (
              <>
                Ketu Transit {currentYear} for {ascName} Rising –{" "}
                <span className="text-blue-600">Detachment & Spirituality</span>
              </>
            )}
          </h1>
          <Link
            href={`/${isHi ? "hi/" : ""}ketu-transit`}
            className="text-sm font-bold text-blue-700 uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            ← {isHi ? "ग्लोबल गोचर" : "Global Transit"}
          </Link>
        </header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-10 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="ketu"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            {isHi ? (
              <>केतु गोचर {currentYear} ({ascName} लग्न) आपके जीवन दिशा में सूक्ष्म लेकिन गहन बदलाव लाता है।</>
            ) : (
              <>Ketu transit {currentYear} ({ascName} Rising) marks a subtle yet profound shift in your life direction.</>
            )}
          </p>

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {isHi ? "केतु गोचर शिफ्ट" : "Ketu Transit Shift"}: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {isHi ? (
              <>
                केतु — अंतर्ज्ञान और वैराग्य का ग्रह — {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से {currentHouse}वें भाव में शिफ्ट हो रहा है।
                <br /><br />
                पहले {KETU_HOUSE_TRAITS_HI[previousHouse]} से जुड़े पैटर्न कम हो रहे हैं, जबकि अब {KETU_HOUSE_TRAITS_HI[currentHouse]} से संबंधित थीम्स प्रमुख होंगे। यह परिवर्तन आंतरिक होता है — धारणा, भावनाओं और जीवन से जुड़ाव को प्रभावित करता है।
              </>
            ) : (
              <>
                Ketu — the planet of intuition and detachment — is moving from {previousRashi} to {currentRashi}, shifting from your {previousHouse} house to the {currentHouse} house.
                <br /><br />
                Patterns related to <strong>{KETU_HOUSE_TRAITS_EN[previousHouse]}</strong> begin to fade, while themes of <strong>{KETU_HOUSE_TRAITS_EN[currentHouse]}</strong> become prominent. This transition works internally, influencing perception, emotional response, and engagement with life.
              </>
            )}
          </p>

          <p className="text-sm text-slate-500 mt-4 italic">
            {isHi ? "नीचे सभी भावों के लिए केतु का प्रभाव देखें।" : "Explore how Ketu affects each house for your ascendant below."}
          </p>
        </div>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Ketu</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            {isHi ? "केतु गोचर स्थिति" : "South Node Transit Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "गोचर ग्रह" : "Transit Planet"}
              </p>
              <p className="text-lg">{isHi ? "केतु (दक्षिण नोड)" : "Ketu (South Node)"}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "वर्तमान राशि" : "Current Sign"}
              </p>
              <p className="text-lg">{currentRashi}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "डिग्री" : "Exact Degree"}
              </p>
              <p className="text-lg">{ketuPos?.degree ? `${ketuPos.degree}°` : "-"}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "गति" : "Motion"}
              </p>
              <p className="text-lg text-amber-400">{ketuPos?.motion || "Retrograde"}</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-4 italic">
            {isHi ? "वैदिक गणना के आधार पर वर्तमान केतु गोचर स्थिति।" : "Current Ketu transit position based on Vedic astrology."}
          </p>
        </section>

        {/* Current Transit Insight */}
        <section className="mb-12 p-8 bg-slate-50 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-950">
            {isHi ? `केतु ${currentRashi} में ${ascName} लग्न के लिए – अर्थ` : `Ketu in ${currentRashi} for ${ascName} Ascendant – What It Means`}
          </h2>

          <p className="text-slate-700 leading-relaxed">
            {isHi ? (
              <>
                {ascName} लग्न के लिए केतु का {currentRashi} में गोचर मुख्य रूप से {currentHouse}वें भाव को प्रभावित करता है।
                <br /><br />
                यह स्थान <strong>{KETU_HOUSE_TRAITS_HI[currentHouse]}</strong> से जुड़े विषयों पर वैराग्य, आंतरिक बदलाव और कर्मिक संतुलन लाता है।
                <br /><br />
                केतु बाहरी परिणामों से ज्यादा आंतरिक काम करता है — नियंत्रण छोड़ने, प्राथमिकताएँ बदलने और अनुभवों की गहरी समझ विकसित करने में मदद करता है।
              </>
            ) : (
              <>
                For {ascName} ascendant, Ketu in {currentRashi} primarily influences the {currentHouse} house of your chart.
                <br /><br />
                This placement highlights themes related to <strong>{KETU_HOUSE_TRAITS_EN[currentHouse]}</strong>, bringing detachment, internal shift, and karmic realignment.
                <br /><br />
                Rather than direct external results, Ketu operates subtly — helping release control, rethink priorities, and develop deeper understanding.
              </>
            )}
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

        {/* House Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-blue-950">
            {isHi ? `${ascName} लग्न के लिए हर भाव का फल` : `${ascName} Ascendant Forecast for Every House`}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/ketu-transit/${ascendant}?house=${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-tighter">
                  {isHi ? "भाव" : "House"} {h}
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-blue-700">
                  {isHi ? "प्रभाव देखें" : "View Impact"}
                </p>
                <p className="text-[10px] text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isHi ? "विस्तार से →" : "Detailed →"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Read Also */}
        <section className="mt-16">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">
            {isHi ? "यह भी पढ़ें" : "Read Also"}
          </h3>

          <div className="flex flex-wrap gap-4 text-blue-700 font-semibold">
            <Link href="/rahu-transit">{isHi ? "राहु गोचर →" : "Rahu Transit →"}</Link>
            <Link href="/jupiter-transit">{isHi ? "बृहस्पति गोचर →" : "Jupiter Transit →"}</Link>
            <Link href="/saturn-transit">{isHi ? "शनि गोचर →" : "Saturn Transit →"}</Link>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/personalized-transit-report"
            className="inline-block bg-blue-700 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-800 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            {isHi ? `${currentYear} के लिए अपना कर्म नक्शा खोलें →` : `Unlock Your Karma Map for ${currentYear} →`}
          </Link>
        </div>

      </article>
    </div>
  );
}