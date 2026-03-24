import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";
import TransitInternalLinks from "@/components/transit/TransitInternalLinks";

const BACKEND = "https://jyotishasha-backend.onrender.com";
const currentYear = new Date().getFullYear();

/* ---------------- DATA FETCHING ---------------- */
async function fetchTransit(
  ascendant: string,
  house: number,
  lang: "en" | "hi"
) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=jupiter&house=${house}&lang=${lang}`,
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
      ? `बृहस्पति गोचर ${currentYear} ${houseNum}वें भाव में ${asc} लग्न के लिए – भाग्य और विकास`
      : `Jupiter Transit ${currentYear} in ${houseNum} House for ${asc} Rising – Fortune & Growth`,
    description: isHi
      ? `${asc} लग्न के लिए ${houseNum}वें भाव में बृहस्पति गोचर ${currentYear} का विस्तृत वैदिक विश्लेषण – ज्ञान, समृद्धि और शुभ फल।`
      : `Detailed Vedic analysis of Jupiter transit ${currentYear} in House ${houseNum} for ${asc} Rising – expansion, wisdom, and long-term fortune.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/jupiter-transit/${params.ascendant}/house/${houseNum}`,
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
export default async function JupiterTransitHousePage({
  params,
  searchParams,
}: {
  params: { ascendant: string; house: string; locale: string };
  searchParams?: { lang?: string };
}) {
  const houseNum = Number(params.house);
  if (isNaN(houseNum) || houseNum < 1 || houseNum > 12) notFound();

  const ascendant = params.ascendant.toLowerCase();

  // Language detection
  const locale = params.locale || "en";
  const lang: "en" | "hi" = locale === "hi" ? "hi" : "en";
  const isHi = lang === "hi";

  const data = await fetchTransit(ascendant, houseNum, lang);
  if (!data) notFound();

  const ascTitle = titleCase(ascendant);

  const summary = isHi ? data.summary_hi || data.summary : data.summary;

  const faqText = isHi
    ? `${ascTitle} लग्न के लिए ${houseNum} भाव में बृहस्पति ज्ञान और वृद्धि देता है।`
    : `For ${ascTitle} ascendant, Jupiter in the ${houseNum} house brings expansion and wisdom.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? `${houseNum} भाव में बृहस्पति का प्रभाव क्या है?`
          : `How does Jupiter transit in ${houseNum} house affect ${ascTitle} rising?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: faqText,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-amber-950/20 py-12 md:py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-16 py-16 shadow-2xl text-slate-900 relative border border-slate-100">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-50 pb-6">
          <Link href={`/${isHi ? "hi/" : ""}jupiter-transit`} className="hover:text-amber-600 transition">
            {isHi ? "बृहस्पति हब" : "Jupiter Hub"}
          </Link>
          <span className="text-slate-200">/</span>
          <Link href={`/${isHi ? "hi/" : ""}jupiter-transit/${ascendant}`} className="hover:text-amber-600 transition">
            {ascTitle}
          </Link>
          <span className="text-slate-200">/</span>
          <span className="text-amber-600">
            {isHi ? `${houseNum}वाँ भाव` : `House ${houseNum}`}
          </span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-950 tracking-tight">
          {isHi ? (
            <>
              बृहस्पति {houseNum}वें भाव में {ascTitle} लग्न के लिए –{" "}
              <span className="text-amber-600">भाग्य और विकास</span>
            </>
          ) : (
            <>
              Jupiter in <span className="text-amber-600">{houseNum} House</span> for {ascTitle}{" "}
              <span className="text-slate-550 font-light italic">Rising (Lagna)</span>
            </>
          )}
        </h1>

        <VedicNote lang={lang} />

        {/* Visual Experience Section - Updated Hindi */}
<div className="my-16 flex flex-col md:flex-row items-center gap-12 bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100 shadow-inner">
  <div className="shrink-0">
    <DynamicTransitChart 
      ascendant={params.ascendant} 
      activePlanet="jupiter" 
      house={houseNum} 
      size={300}
    />
  </div>
  <div className="space-y-4">
    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
      {isHi ? "भाग्य का दौर शुरू" : "Abundance Activation"}
    </h2>
    <p className="text-slate-600 leading-relaxed font-medium text-lg">
      {isHi ? (
        <>वैदिक ज्योतिष में <strong>बृहस्पति (गुरु)</strong> सबसे बड़ा शुभ ग्रह हैं। आपके {houseNum}वें भाव में आने से <strong>पैसा, ज्ञान और खुशहाली</strong> का नया दौर शुरू होता है।</>
      ) : (
        <>In Vedic astrology, <strong>Jupiter (Guru)</strong> is the Great Benefic. Its transit in your {houseNum} house opens doors to <strong>expansion, wisdom, and long-term fortune</strong>.</>
      )}
    </p>
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest">
      {isHi ? "अब भाग्य का समय है" : "Status: Fortune Rising Phase"}
    </div>
  </div>
</div>

        {/* Summary Quote */}
        <div className="mb-12 prose prose-slate max-w-none">
          <p className="text-xl text-slate-700 leading-relaxed font-medium border-l-4 border-amber-500 pl-6 italic">
            &quot;{summary}&quot;
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 mb-20">
          {data.sections?.map((sec: any, i: number) => (
            <section
              key={i}
              className="group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-300"
            >
              <h3 className="text-2xl font-black mb-6 text-blue-950 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-amber-500 rounded-full group-hover:h-10 transition-all"></span>
                {sec.heading}
              </h3>
              <ul className="space-y-5">
                {sec.points?.map((p: string, j: number) => (
                  <li key={j} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                    <span className="text-amber-500 mt-1.5 shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Opportunities vs Challenges */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pb-20 border-b border-slate-100">
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-[2.5rem] p-10">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-3xl">🌿</div>
            <h4 className="text-xl font-black mb-4 text-emerald-900 uppercase tracking-widest text-sm">
              {isHi ? "वृद्धि उत्प्रेरक" : "Growth Catalysts"}
            </h4>
            <ul className="space-y-4">
              {data.strengths?.map((s: string, i: number) => (
                <li key={i} className="text-emerald-800/80 font-bold leading-relaxed flex gap-3">
                  <span className="text-emerald-400">✦</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/40 border border-rose-100 rounded-[2.5rem] p-10">
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-3xl">⚖️</div>
            <h4 className="text-xl font-black mb-4 text-rose-900 uppercase tracking-widest text-sm">
              {isHi ? "ज्ञान परीक्षा" : "Wisdom Tests"}
            </h4>
            <ul className="space-y-4">
              {data.challenges?.map((c: string, i: number) => (
                <li key={i} className="text-rose-800/80 font-bold leading-relaxed flex gap-3">
                  <span className="text-rose-400">✦</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal Linking */}
        <div className="mt-12">
          <TransitInternalLinks
            lang={lang}
            planetName="Jupiter"
            planetSlug="jupiter-transit"
            ascendant={params.ascendant}
            currentHouse={houseNum}
          />
        </div>

        {/* High-Conversion CTA */}
        <div className="mt-20 bg-slate-950 rounded-[3.5rem] p-8 md:p-16 text-white text-center shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-600/30 via-transparent to-transparent opacity-50"></div>

          <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight">
            {isHi ? (
              <>समय ही सब कुछ है। <br /><span className="text-amber-400">अपना भाग्य खोलें।</span></>
            ) : (
              <>Timing is Everything. <br /><span className="text-amber-400">Unlock Your Fortune.</span></>
            )}
          </h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium relative z-10">
            {isHi ? (
              <>सामान्य गोचर नक्शा देते हैं, लेकिन आपकी महादशा तय करती है कि खजाना आपका है या नहीं। अपने विकास का सटीक समय-तालिका प्राप्त करें।</>
            ) : (
              <>General transits provide the map, but your natal Mahadasha determines if the treasure is yours. Get a precise timeline of your growth.</>
            )}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <Link
              href={`/${isHi ? "hi/" : ""}personalized-transit-report?planet=jupiter&house=${houseNum}&ascendant=${params.ascendant}`}
              className="w-full md:w-auto bg-amber-500 text-slate-950 font-black px-12 py-5 rounded-full hover:bg-amber-400 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              {isHi ? "मेरा भाग्य रिपोर्ट प्राप्त करें →" : "Get My Fortune Report →"}
            </Link>
            <Link
              href={`/${isHi ? "hi/" : ""}astrology-methodology`}
              className="w-full md:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/10 transition-all border border-white/10"
            >
              {isHi ? "हमारी गणना विधि" : "Our Calculation Logic"}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}