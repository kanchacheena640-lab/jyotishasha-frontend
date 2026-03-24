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

const VENUS_HOUSE_TRAITS_EN: Record<number, string> = {
  1: "charming personality, physical beauty, self-love and magnetism",
  2: "financial gains, sweet speech, family celebrations and luxury",
  3: "creative hobbies, pleasant short travels, harmonious siblings bond",
  4: "domestic comfort, luxury vehicle or home décor, emotional peace",
  5: "romantic bliss, creative sparks, joyful bond with progeny",
  6: "pleasant workplace, healing through art, balanced daily routine",
  7: "marital harmony, social grace, prosperous business partnerships",
  8: "hidden financial gains, deep intimacy, interest in occult beauty",
  9: "philosophical travel, grace in higher learning, spiritual abundance",
  10: "professional charm, career in arts or luxury, social status boost",
  11: "monetary gains, influential social circle, fulfillment of desires",
  12: "luxury in isolation, foreign pleasures, subconscious healing and dreams",
};

const VENUS_HOUSE_TRAITS_HI: Record<number, string> = {
  1: "आकर्षक व्यक्तित्व, शारीरिक सौंदर्य, आत्म-प्रेम और चुंबकत्व",
  2: "आर्थिक लाभ, मधुर वाणी, पारिवारिक उत्सव और विलासिता",
  3: "रचनात्मक शौक, सुखद छोटी यात्राएँ, भाइयों से सामंजस्यपूर्ण बंधन",
  4: "घरेलू सुख, लग्जरी वाहन या घर सजावट, भावनात्मक शांति",
  5: "रोमांटिक आनंद, रचनात्मक प्रेरणा, संतान से आनंदपूर्ण बंधन",
  6: "सुखद कार्यस्थल, कला से उपचार, संतुलित दैनिक रूटीन",
  7: "वैवाहिक सामंजस्य, सामाजिक शालीनता, समृद्ध साझेदारी",
  8: "छिपे वित्तीय लाभ, गहन अंतरंगता, गूढ़ सौंदर्य में रुचि",
  9: "दार्शनिक यात्रा, उच्च शिक्षा में शालीनता, आध्यात्मिक समृद्धि",
  10: "व्यावसायिक आकर्षण, कला या विलासिता में करियर, सामाजिक स्थिति वृद्धि",
  11: "धन लाभ, प्रभावशाली सामाजिक दायरा, इच्छा पूर्ति",
  12: "एकांत में विलासिता, विदेशी सुख, अवचेतन उपचार और सपने",
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
async function fetchVenusCurrent(lang: string) {
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
      ? `शुक्र गोचर ${currentYear} ${ascName} लग्न के लिए – प्रेम और समृद्धि`
      : `Venus Transit ${currentYear} for ${ascName} Rising – Love & Abundance`,
    description: isHi
      ? `${ascName} लग्न के लिए शुक्र गोचर ${currentYear} में रिश्ते, वित्त, सौंदर्य और विलासिता पर घर-वार विस्तृत वैदिक विश्लेषण।`
      : `Detailed house-wise effects of Venus (Shukra) transit ${currentYear} for ${ascName} Rising. Vedic insights on relationships, finances, beauty, and luxury.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/venus-transit/${asc}`,
    },
  };
}

/* ---------------- Page ---------------- */
export default async function VenusTransitAscendantPage({
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

  const current = await fetchVenusCurrent(lang);
  if (!current) notFound();

  const venusPos = current.positions?.Venus;
  if (!venusPos) notFound();

  const venusFuture = current.future_transits?.Venus || [];
  const currentTransit = venusFuture[0];

  const rashiName = getRashiName(venusPos.rashi, venusPos.rashi_hi, isHi);
  const motion = getMotion(venusPos.motion, isHi);

  const ascName = titleCase(ascendant);
  const currentRashi = venusPos.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);

  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi =
    currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];

  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "venus",
    house: initialHouse,
    lang,
  });

  const houseTraits = isHi ? VENUS_HOUSE_TRAITS_HI : VENUS_HOUSE_TRAITS_EN;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `शुक्र गोचर ${currentYear} ${ascName} लग्न को कैसे प्रभावित करेगा?`
          : `How does Venus transit ${currentYear} affect ${ascName} Ascendant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? `${ascName} लग्न के लिए शुक्र का ${currentRashi} में गोचर ${currentHouse}वें भाव में प्रेम और भौतिक सुख को सक्रिय करता है।`
            : `For ${ascName} Rising, Venus in ${currentRashi} activates the ${currentHouse} house of love and material abundance.`,
        },
      },
      {
        "@type": "Question",
        name: isHi ? "शुक्र गोचर कितने समय तक रहता है?" : "How long does Venus transit last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "शुक्र एक राशि में लगभग 1 महीना रहता है। यह मासिक प्रेम, सौंदर्य और वित्तीय सुख को प्रभावित करता है।"
            : "Venus stays in one sign for approximately one month. It influences monthly love, beauty, relationships, and financial pleasures.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-rose-950/20 py-16 px-4">
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
                शुक्र गोचर {currentYear} {ascName} लग्न के लिए –{" "}
                <span className="text-rose-600">प्रेम और समृद्धि</span>
              </>
            ) : (
              <>
                Venus Transit {currentYear} for {ascName} Rising –{" "}
                <span className="text-rose-600">Love & Abundance</span>
              </>
            )}
          </h1>
          <Link
            href={`/${isHi ? "hi/" : ""}venus-transit`}
            className="text-sm font-bold text-rose-700 uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            ← {isHi ? "शुक्र हब" : "Venus Hub"}
          </Link>
        </header>

        <VedicNote lang={lang} />

        {/* Dynamic Chart */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart
            ascendant={ascendant}
            activePlanet="venus"
            house={currentHouse}
            size={340}
          />
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            {isHi ? (
              <>शुक्र गोचर {currentYear} ({ascName} लग्न) में <strong>सामंजस्य और भौतिक आकर्षण</strong> का चरण आता है।</>
            ) : (
              <>The Venus transit {currentYear} ({ascName} Rising) brings a phase of <strong>harmony and material attraction</strong>.</>
            )}
          </p>

          <h2 className="text-2xl font-bold text-rose-900 mb-4">
            {isHi ? "प्रेम और धन शिफ्ट" : "Relationship & Wealth Shift"}: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {isHi ? (
              <>
                शुक्र, सौंदर्य का ग्रह, {previousRashi} से {currentRashi} की ओर जा रहा है, जिससे प्रभाव {previousHouse}वें भाव से <strong>{currentHouse}वें भाव</strong> में शिफ्ट हो रहा है।
                <br /><br />
                पहले {VENUS_HOUSE_TRAITS_HI[previousHouse]} पर फोकस था, अब <strong>{VENUS_HOUSE_TRAITS_HI[currentHouse]}</strong> से जुड़े नए अवसर खुल रहे हैं। यह समय शालीनता और विलासिता पर फोकस करने का है।
              </>
            ) : (
              <>
                Venus, the planet of beauty, moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>.
                <br /><br />
                Your path of pleasure and abundance shifts from <strong>{VENUS_HOUSE_TRAITS_EN[previousHouse]}</strong> toward the core themes of <strong>{VENUS_HOUSE_TRAITS_EN[currentHouse]}</strong>. This is a time to cultivate grace and focus on luxury.
              </>
            )}
          </p>
        </div>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Shukra</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-rose-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
            {isHi ? "शुक्र गोचर स्थिति" : "Venus Status Snapshot"}
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
              <p className="text-lg text-rose-400 font-bold">House {currentHouse}</p>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">
                {isHi ? "डिग्री" : "Exact Degree"}
              </p>
              <p className="text-lg">{venusPos?.degree ? `${venusPos.degree}°` : "-"}</p>
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
            planet="venus"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* House Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? `${ascName} लग्न के लिए हर भाव का फल` : `${ascName} Rising Abundance Map for Every House`}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/venus-transit/${ascendant}?house=${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-rose-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-rose-600 uppercase mb-1 tracking-tighter">
                  {isHi ? "भाव" : "House"} {h}
                </p>
                <p className="text-xl font-black text-slate-800 group-hover:text-rose-700 tracking-tight">
                  {isHi ? "प्रभाव देखें" : "View Pleasure"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-rose-700 font-bold text-sm uppercase tracking-wider">
          <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
          <Link href="/mars-transit" className="hover:underline">Mars Transit →</Link>
          <Link href="/mercury-transit" className="hover:underline">Mercury Transit →</Link>
        </footer>
      </article>
    </div>
  );
}