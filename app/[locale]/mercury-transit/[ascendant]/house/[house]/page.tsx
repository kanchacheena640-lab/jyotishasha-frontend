import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";
import TransitInternalLinks from "@/components/transit/TransitInternalLinks";

const BACKEND = "https://jyotishasha-backend.onrender.com";
const currentYear = new Date().getFullYear();

/* ---------------- DATA FETCHING ---------------- */
async function fetchTransit(ascendant: string, house: number, lang: "en" | "hi") {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=mercury&house=${house}&lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

/* ---------------- SEO & METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; house: string; locale: string };
}): Promise<Metadata> {
  const houseNum = Number(params.house);
  if (isNaN(houseNum) || houseNum < 1 || houseNum > 12) {
    return { title: "Not Found", robots: { index: false } };
  }

  const asc = titleCase(params.ascendant);
  const locale = params.locale || "en";
  const isHi = locale === "hi";

  return {
    title: isHi
      ? `बुध गोचर ${currentYear} ${houseNum}वें भाव में ${asc} लग्न के लिए – बुद्धि और संचार`
      : `Mercury Transit ${currentYear} in ${houseNum} House for ${asc} Rising – Intellect & Communication`,
    description: isHi
      ? `${asc} लग्न के लिए ${houseNum}वें भाव में बुध गोचर ${currentYear} का सरल विश्लेषण – दिमाग तेजी, व्यापार और संचार में बदलाव।`
      : `Simple Vedic analysis of Mercury transit ${currentYear} in House ${houseNum} for ${asc} Rising – communication, business, learning, and logic shifts.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/mercury-transit/${params.ascendant}/house/${houseNum}`,
    },
  };
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generateStaticParams() {
  const ascendants = [
    "aries","taurus","gemini","cancer","leo","virgo",
    "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
  ];

  const houses = Array.from({ length: 12 }, (_, i) => String(i + 1));

  return ascendants.flatMap((asc) =>
    houses.flatMap((house) => [
      { locale: "en", ascendant: asc, house },
      { locale: "hi", ascendant: asc, house },
    ])
  );
}

/* ---------------- PAGE COMPONENT ---------------- */
export default async function MercuryTransitHousePage({
  params,
  searchParams,
}: {
  params: { ascendant: string; house: string; locale: string };
  searchParams?: { lang?: string };
}) {
  const houseNum = Number(params.house);
  if (isNaN(houseNum) || houseNum < 1 || houseNum > 12) notFound();

  const ascendant = params.ascendant.toLowerCase();

  const locale = params.locale || "en";
  const lang: "en" | "hi" = locale === "hi" ? "hi" : "en";
  const isHi = lang === "hi";

  const data = await fetchTransit(ascendant, houseNum, lang);
  if (!data) notFound();

  const ascTitle = titleCase(ascendant);

  const summary = isHi ? data.summary_hi || data.summary : data.summary;

  const faqText = isHi
    ? `${ascTitle} लग्न के लिए ${houseNum}वें भाव में बुध से दिमाग तेज होता है और बातचीत अच्छी चलती है।`
    : `For ${ascTitle} ascendant, Mercury in the ${houseNum} house brings sharp thinking and better communication.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `${houseNum}वें भाव में बुध का क्या असर होता है?`
          : `How does Mercury transit in ${houseNum} house affect ${ascTitle} rising?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: faqText,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-emerald-950/20 py-12 md:py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-16 py-16 shadow-2xl text-slate-900 relative border border-slate-100">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-50 pb-6">
          <Link href={`/${isHi ? "hi/" : ""}mercury-transit`} className="hover:text-emerald-600 transition">
            {isHi ? "बुध हब" : "Mercury Hub"}
          </Link>
          <span className="text-slate-200">/</span>
          <Link href={`/${isHi ? "hi/" : ""}mercury-transit/${ascendant}`} className="hover:text-emerald-600 transition">
            {ascTitle}
          </Link>
          <span className="text-slate-200">/</span>
          <span className="text-emerald-600">
            {isHi ? `${houseNum}वाँ भाव` : `House ${houseNum}`}
          </span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-950 tracking-tight">
          {isHi ? (
            <>
              बुध {houseNum}वें भाव में {ascTitle} लग्न के लिए –{" "}
              <span className="text-emerald-600">बुद्धि और संचार</span>
            </>
          ) : (
            <>
              Mercury in <span className="text-emerald-600">{houseNum} House</span> for {ascTitle}{" "}
              <span className="text-slate-550 font-light italic">Rising (Lagna)</span>
            </>
          )}
        </h1>

        <VedicNote lang={lang} />

        {/* Chart + Quick Insight */}
        <div className="my-16 flex flex-col md:flex-row items-center gap-12 bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 shadow-inner">
          <div className="shrink-0">
            <DynamicTransitChart
              ascendant={ascendant}
              activePlanet="mercury"
              house={houseNum}
              size={300}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              {isHi ? "अब दिमाग तेज होने का दौर" : "Current House Activation"}
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              {isHi ? (
                <>वैदिक ज्योतिष में <strong>बुध</strong> सबसे तेज़ ग्रह है। आपके {houseNum}वें भाव में आने से <strong>दिमाग तेज चलता है, बातचीत अच्छी होती है और व्यापार में समझदारी बढ़ती है</strong>।</>
              ) : (
                <>In Vedic astrology, Mercury is the fastest planet. Its transit in your {houseNum} house brings <strong>sharp thinking, better communication, and smart business decisions</strong>.</>
              )}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest">
              {isHi ? "अब प्लानिंग का अच्छा समय" : "Status: Sharp Mind Phase"}
            </div>
          </div>
        </div>

        {/* Summary Quote */}
        <div className="mb-12 prose prose-slate max-w-none">
          <p className="text-xl text-slate-700 leading-relaxed font-medium border-l-4 border-emerald-500 pl-6 italic">
            &quot;{summary}&quot;
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 mb-20">
          {data.sections?.map((sec: any, i: number) => (
            <section
              key={i}
              className="group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
            >
              <h3 className="text-2xl font-black mb-6 text-blue-950 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full group-hover:h-8 transition-all"></span>
                {sec.heading}
              </h3>
              <ul className="space-y-5">
                {sec.points?.map((p: string, j: number) => (
                  <li key={j} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                    <span className="text-emerald-500 mt-1.5 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Gains vs Blindspots */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pb-20 border-b border-slate-100">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl">📈</div>
            <h4 className="text-xl font-black mb-4 text-emerald-900 uppercase tracking-widest text-sm">
              {isHi ? "क्या अच्छा होगा" : "What Will Be Good"}
            </h4>
            <ul className="space-y-4">
              {data.strengths?.map((s: string, i: number) => (
                <li key={i} className="text-emerald-800/80 font-medium leading-relaxed flex gap-2">
                  <span>•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl">🧠</div>
            <h4 className="text-xl font-black mb-4 text-rose-900 uppercase tracking-widest text-sm">
              {isHi ? "किन बातों से सावधान रहें" : "Things To Be Careful About"}
            </h4>
            <ul className="space-y-4">
              {data.challenges?.map((c: string, i: number) => (
                <li key={i} className="text-rose-800/80 font-medium leading-relaxed flex gap-2">
                  <span>•</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal Linking */}
        <div className="mt-12">
          <TransitInternalLinks
            lang={lang}
            planetName="Mercury"
            planetSlug="mercury-transit"
            ascendant={params.ascendant}
            currentHouse={houseNum}
          />
        </div>

        {/* CTA */}
        <div className="mt-20 bg-slate-950 rounded-[3.5rem] p-8 md:p-16 text-white text-center shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/30 via-transparent to-transparent opacity-50"></div>

          <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight">
            {isHi ? (
              <>अब दिमाग की भटकन बंद करो!</>
            ) : (
              <>Stop the Mental Noise.</>
            )}
            <br />
            <span className="text-emerald-400">
              {isHi ? "अपना करियर का रास्ता साफ करो।" : "Clarify Your Professional Path."}
            </span>
          </h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium relative z-10">
            {isHi ? (
              <>बुध तेज़ दिमाग देता है, लेकिन बिना अपनी कुंडली और दशा के पता चलाए काम करने से गड़बड़ हो सकती है। अपना सही प्लानिंग मैप ले लो।</>
            ) : (
              <>Mercury can create genius or confusion. Without analyzing your natal Budh placement and current Dasha, you might miss the timing for that big deal or creative breakthrough.</>
            )}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <Link
              href={`/${isHi ? "hi/" : ""}personalized-transit-report?planet=mercury&house=${houseNum}&ascendant=${params.ascendant}`}
              className="w-full md:w-auto bg-emerald-600 text-white font-black px-12 py-5 rounded-full hover:bg-emerald-700 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              {isHi ? "मेरा प्लानिंग रिपोर्ट लो →" : "Get My Precision Logic Report →"}
            </Link>
            <Link
              href="/app-download"
              className="w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              {isHi ? "रोज़ाना संचार टिप्स" : "Daily Communication Tips"}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}