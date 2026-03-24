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
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=rahu&house=${house}&lang=${lang}`,
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
      ? `राहु गोचर ${currentYear} ${houseNum}वें भाव में ${asc} लग्न के लिए – महत्वाकांक्षा और कर्म`
      : `Rahu Transit ${currentYear} in ${houseNum} House for ${asc} Rising – Ambition & Karma`,
    description: isHi
      ? `${asc} लग्न के लिए ${houseNum}वें भाव में राहु गोचर ${currentYear} का सरल विश्लेषण – अचानक बदलाव, महत्वाकांक्षा और कर्मिक प्रभाव।`
      : `Simple Vedic analysis of Rahu transit ${currentYear} in House ${houseNum} for ${asc} Rising – sudden shifts, material desires, and karmic lessons.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/rahu-transit/${params.ascendant}/house/${houseNum}`,
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
export default async function RahuTransitHousePage({
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
    ? `${ascTitle} लग्न के लिए ${houseNum}वें भाव में राहु से अचानक बदलाव और महत्वाकांक्षा बढ़ती है।`
    : `For ${ascTitle} ascendant, Rahu in the ${houseNum} house amplifies desires and brings sudden karmic shifts.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `${houseNum}वें भाव में राहु का क्या असर होता है?`
          : `How does Rahu transit in ${houseNum} house affect ${ascTitle} rising?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: faqText,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 py-12 md:py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-16 py-16 shadow-2xl text-slate-900 relative border border-slate-100">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-50 pb-6">
          <Link href={`/${isHi ? "hi/" : ""}rahu-transit`} className="hover:text-indigo-600 transition">
            {isHi ? "राहु हब" : "Rahu Hub"}
          </Link>
          <span className="text-slate-200">/</span>
          <Link href={`/${isHi ? "hi/" : ""}rahu-transit/${ascendant}`} className="hover:text-indigo-600 transition">
            {ascTitle}
          </Link>
          <span className="text-slate-200">/</span>
          <span className="text-indigo-600">
            {isHi ? `${houseNum}वाँ भाव` : `House ${houseNum}`}
          </span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-950 tracking-tight">
          {isHi ? (
            <>
              राहु {houseNum}वें भाव में {ascTitle} लग्न के लिए –{" "}
              <span className="text-indigo-600">महत्वाकांक्षा और कर्म</span>
            </>
          ) : (
            <>
              Rahu in <span className="text-indigo-600">{houseNum} House</span> for {ascTitle}{" "}
              <span className="text-slate-550 font-light italic">Rising (Lagna)</span>
            </>
          )}
        </h1>

        <VedicNote lang={lang} />

        {/* Chart + Quick Insight */}
        <div className="my-16 flex flex-col md:flex-row items-center gap-12 bg-indigo-50/30 p-8 rounded-[2rem] border border-indigo-100 shadow-inner">
          <div className="shrink-0">
            <DynamicTransitChart
              ascendant={ascendant}
              activePlanet="rahu"
              house={houseNum}
              size={300}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              {isHi ? "अब कर्म का नया दौर" : "Current House Activation"}
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              {isHi ? (
                <>वैदिक ज्योतिष में <strong>राहु</strong> इच्छाओं और अचानक बदलाव का ग्रह है। आपके {houseNum}वें भाव में आने से <strong>महत्वाकांक्षा बढ़ती है और नए अवसर आते हैं</strong>। लेकिन सावधानी बरतनी पड़ती है।</>
              ) : (
                <>In Vedic astrology, Rahu is the planet of desires and sudden shifts. Its transit in your {houseNum} house brings <strong>magnetic pull toward expansion, obsession, and unconventional breakthroughs</strong>.</>
              )}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest">
              {isHi ? "अब बड़ा बदलाव का समय" : "Status: Intensive Change Phase"}
            </div>
          </div>
        </div>

        {/* Summary Quote */}
        <div className="mb-12 prose prose-slate max-w-none">
          <p className="text-xl text-slate-700 leading-relaxed font-medium border-l-4 border-indigo-500 pl-6 italic">
            &quot;{summary}&quot;
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 mb-20">
          {data.sections?.map((sec: any, i: number) => (
            <section
              key={i}
              className="group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            >
              <h3 className="text-2xl font-black mb-6 text-indigo-950 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full group-hover:h-8 transition-all"></span>
                {sec.heading}
              </h3>
              <ul className="space-y-5">
                {sec.points?.map((p: string, j: number) => (
                  <li key={j} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                    <span className="text-indigo-500 mt-1.5 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Breakthroughs vs Illusions */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pb-20 border-b border-slate-100">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl">🚀</div>
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
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl">👁️</div>
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
            planetName="Rahu"
            planetSlug="rahu-transit"
            ascendant={params.ascendant}
            currentHouse={houseNum}
          />
        </div>

        {/* CTA */}
        <div className="mt-20 bg-slate-950 rounded-[3.5rem] p-8 md:p-16 text-white text-center shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/30 via-transparent to-transparent opacity-50"></div>

          <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight">
            {isHi ? (
              <>अवसर है या धोखा?<br/><span className="text-indigo-400">राहु का खेल समझो!</span></>
            ) : (
              <>Is it Opportunity or Mirage?<br/><span className="text-indigo-400">Decode Rahu's Agenda.</span></>
            )}
          </h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium relative z-10">
            {isHi ? (
              <>राहु जो भी छूता है उसे बड़ा कर देता है। लेकिन बिना अपनी कुंडली और दशा के पता चलाए ये "अवसर" कर्म के जाल भी हो सकते हैं। अपना सही मैप ले लो।</>
            ) : (
              <>Rahu amplifies whatever it touches. Without knowing your natal Rahu strength and dispositor dignity, these "opportunities" could be karmic traps. Get your precision material map.</>
            )}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <Link
              href={`/${isHi ? "hi/" : ""}personalized-transit-report?planet=rahu&house=${houseNum}&ascendant=${params.ascendant}`}
              className="w-full md:w-auto bg-indigo-600 text-white font-black px-12 py-5 rounded-full hover:bg-indigo-700 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              {isHi ? "मेरा राहु रिपोर्ट लो →" : "Get My Rahu Reality Report →"}
            </Link>
            <Link
              href="/app-download"
              className="w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              {isHi ? "रोज़ाना महत्वाकांक्षा अलर्ट" : "Daily Manifestation Alerts"}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}