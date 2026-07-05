import Link from "next/link";
import { notFound } from "next/navigation";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";
import TransitInternalLinks from "@/components/transit/TransitInternalLinks";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo/transitSeo";
import type { HousePlanetConfig } from "@/lib/transit/planetConfig";

const BACKEND = "https://jyotishasha-backend.onrender.com";

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function fetchTransit(
  planet: string,
  ascendant: string,
  house: number,
  lang: "en" | "hi"
) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=${planet}&house=${house}&lang=${lang}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function HouseTransitPage({
  params,
  config,
}: {
  params: { ascendant: string; house: string; locale: string };
  searchParams?: { lang?: string };
  config: HousePlanetConfig;
}) {
  const houseNum = Number(params.house.replace("house-", ""));
  if (isNaN(houseNum) || houseNum < 1 || houseNum > 12) notFound();

  const ascendant = params.ascendant.toLowerCase();
  const locale = params.locale || "en";
  const lang: "en" | "hi" = locale === "hi" ? "hi" : "en";
  const isHi = lang === "hi";

  const data = await fetchTransit(config.planet, ascendant, houseNum, lang);
  if (!data) notFound();

  const ascTitle = titleCase(ascendant);
  const summary = isHi ? data.summary_hi || data.summary : data.summary;

  const faqText = isHi
    ? config.faqTextHi(ascTitle, houseNum)
    : config.faqTextEn(ascTitle, houseNum);

  const faqQ1Hi = config.faqQ1HiOverride
    ? config.faqQ1HiOverride(houseNum)
    : `${houseNum}वें भाव में ${config.planetHi} का क्या असर होता है?`;
  const faqQ1En = `How does ${config.planetEn} transit in ${houseNum} house affect ${ascTitle} rising?`;
  const faqQ2Hi = `${ascTitle} लग्न के लिए ${config.planetHi} गोचर शुभ है क्या?`;
  const faqQ2En = `Is ${config.planetEn} transit beneficial for ${ascTitle} ascendant?`;
  const faqQ3Hi = config.faqQ3HiOverride
    ? config.faqQ3HiOverride(houseNum)
    : `${houseNum}वें भाव में ${config.planetHi} किन जीवन क्षेत्रों को प्रभावित करता है?`;
  const faqQ3En = `Which life areas are ${config.faqQ3Verb} by ${config.planetEn} transit in ${houseNum} house?`;

  const faqSchema = buildFAQSchema([
    {
      question: isHi ? faqQ1Hi : faqQ1En,
      answer: faqText,
    },
    {
      question: isHi ? faqQ2Hi : faqQ2En,
      answer: isHi ? config.faqA2Hi : config.faqA2En,
    },
    {
      question: isHi ? faqQ3Hi : faqQ3En,
      answer: isHi ? config.faqA3Hi : config.faqA3En,
    },
  ]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    {
      name: `${config.planetEn} Transit`,
      item: `https://www.jyotishasha.com/${isHi ? "hi/" : ""}${config.slug}`,
    },
    {
      name: `${ascTitle} Ascendant`,
      item: `https://www.jyotishasha.com/${isHi ? "hi/" : ""}${config.slug}/${ascendant}`,
    },
    {
      name: isHi ? `${houseNum}वाँ भाव` : `${houseNum} House`,
      item: `https://www.jyotishasha.com/${isHi ? "hi/" : ""}${config.slug}/${ascendant}/house-${houseNum}`,
    },
  ]);

  return (
    <div className={`${config.outerBg} py-12 md:py-20 px-4`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-16 py-16 shadow-2xl text-slate-900 relative border border-slate-100">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-50 pb-6">
          <Link href={`/${isHi ? "hi/" : ""}${config.slug}`} className={config.navHoverClass}>
            {isHi ? config.hubLabelHi : config.hubLabelEn}
          </Link>
          <span className="text-slate-200">/</span>
          <Link href={`/${isHi ? "hi/" : ""}${config.slug}/${ascendant}`} className={config.navHoverClass}>
            {ascTitle}
          </Link>
          <span className="text-slate-200">/</span>
          <span className={config.navCurrentClass}>
            {isHi ? `${houseNum}वाँ भाव` : `House ${houseNum}`}
          </span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-950 tracking-tight">
          {isHi ? (
            <>
              {config.planetHi} {houseNum}वें भाव में {ascTitle} लग्न के लिए –{" "}
              <span className={config.h1SpanColorClass}>{config.h1HiPhrase}</span>
            </>
          ) : (
            <>
              {config.planetEn} in{" "}
              <span className={config.h1SpanColorClass}>{houseNum} House</span> for {ascTitle}{" "}
              <span className="text-slate-550 font-light italic">Rising (Lagna)</span>
            </>
          )}
        </h1>

        <VedicNote lang={lang} />

        {/* Chart + Quick Insight */}
        <div className={config.chartBoxClass}>
          <div className="shrink-0">
            <DynamicTransitChart
              ascendant={ascendant}
              activePlanet={config.planet}
              house={houseNum}
              size={300}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              {isHi ? config.chartH2Hi : "Current House Activation"}
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              {isHi ? config.chartParaHi(houseNum) : config.chartParaEn(houseNum)}
            </p>
            <div className={config.chartBadgeClass}>
              {isHi ? config.chartBadgeHi : config.chartBadgeEn}
            </div>
          </div>
        </div>

        {/* Summary Quote */}
        <div className="mb-12 prose prose-slate max-w-none">
          <p className={`text-xl text-slate-700 leading-relaxed font-medium border-l-4 ${config.quoteBorderClass} pl-6 italic`}>
            &quot;{summary}&quot;
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 mb-20">
          {data.sections?.map((sec: any, i: number) => (
            <section
              key={i}
              className={`group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl ${config.sectionHoverClass} transition-all duration-300`}
            >
              <h3 className={`text-2xl font-black mb-6 ${config.sectionHeadingClass} flex items-center gap-3`}>
                <span className={`w-1.5 h-6 ${config.sectionBarClass} rounded-full ${config.sectionBarGrow} transition-all`}></span>
                {sec.heading}
              </h3>
              <ul className="space-y-5">
                {sec.points?.map((p: string, j: number) => (
                  <li key={j} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                    <span className={`${config.sectionIconClass} mt-1.5 shrink-0`}>
                      {config.sectionIcon}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Strengths / Challenges */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pb-20 border-b border-slate-100">
          <div className={config.strengthsBg}>
            <div className={config.strengthsIconClass}>{config.strengthsEmoji}</div>
            <h4 className={`text-xl font-black mb-4 ${config.strengthsHeadingClass} uppercase tracking-widest text-sm`}>
              {isHi ? config.strengthsHeadingHi : config.strengthsHeadingEn}
            </h4>
            <ul className="space-y-4">
              {data.strengths?.map((s: string, i: number) => (
                <li key={i} className={config.strengthsItemClass}>
                  {config.strengthsBullet} {s}
                </li>
              ))}
            </ul>
          </div>

          <div className={config.challengesBg}>
            <div className={config.challengesIconClass}>{config.challengesEmoji}</div>
            <h4 className={`text-xl font-black mb-4 ${config.challengesHeadingClass} uppercase tracking-widest text-sm`}>
              {isHi ? config.challengesHeadingHi : config.challengesHeadingEn}
            </h4>
            <ul className="space-y-4">
              {data.challenges?.map((c: string, i: number) => (
                <li key={i} className={config.challengesItemClass}>
                  {config.challengesBullet} {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal Linking */}
        <div className="mt-12">
          <TransitInternalLinks
            lang={lang}
            planetName={config.planetEn}
            planetSlug={config.slug}
            ascendant={params.ascendant}
            currentHouse={houseNum}
          />
        </div>

        {/* CTA */}
        <div className={`mt-20 bg-slate-950 ${config.ctaRounding} p-8 md:p-16 text-white text-center shadow-3xl relative overflow-hidden`}>
          <div className={config.ctaGradientClass}></div>

          <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight">
            {config.ctaH3(isHi)}
          </h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium relative z-10">
            {isHi ? config.ctaParaHi : config.ctaParaEn}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <Link
              href={`/${isHi ? "hi/" : ""}personalized-transit-report?planet=${config.planet}&house=${houseNum}&ascendant=${params.ascendant}`}
              className={config.ctaBtnPrimaryClass}
            >
              {isHi ? config.ctaBtnPrimaryHi : config.ctaBtnPrimaryEn}
            </Link>
            <Link
              href={config.ctaBtnSecondaryHref(isHi)}
              className={config.ctaBtnSecondaryClass}
            >
              {isHi ? config.ctaBtnSecondaryHi : config.ctaBtnSecondaryEn}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
