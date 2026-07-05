import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import VedicNote from "@/components/VedicNote";
import type { GlobalTransitHubConfig } from "@/lib/transit/transitHubConfig";

const PLANET_HI: Record<string, string> = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "बृहस्पति",
  Venus: "शुक्र",
  Saturn: "शनि",
  Rahu: "राहु",
  Ketu: "केतु",
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

function getRashiName(rashi: string, rashi_hi: string | null, isHi: boolean) {
  if (!isHi) return rashi;
  return rashi_hi || RASHI_HI_MAP[rashi] || rashi;
}

function getPlanetName(planet: string, isHi: boolean) {
  if (!isHi) return planet;
  return PLANET_HI[planet] || planet;
}

function getMotion(motion: string, isHi: boolean) {
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

async function fetchTransitData(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

export default async function GlobalTransitPage({
  params,
  config,
}: {
  params: { locale?: string };
  config: GlobalTransitHubConfig;
}) {
  const lang: "en" | "hi" = params?.locale === "hi" ? "hi" : "en";
  const isHi = lang === "hi";
  const currentYear = new Date().getFullYear();

  const data = await fetchTransitData(lang);

  const pos = data.positions?.[config.positionKey];
  const future = data.future_transits?.[config.positionKey] || [];
  const currentTransit = future?.[0];

  const rashiName = getRashiName(pos?.rashi, pos?.rashi_hi, isHi);
  const planetName = getPlanetName(config.positionKey, isHi);
  const motion = getMotion(pos?.motion, isHi);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: config.faqQ1Name(currentYear, isHi),
        acceptedAnswer: {
          "@type": "Answer",
          text: config.faqQ1Answer(isHi),
        },
      },
      {
        "@type": "Question",
        name: config.faqQ2Name(currentYear, isHi),
        acceptedAnswer: {
          "@type": "Answer",
          text: config.faqQ2Answer(isHi),
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isHi ? "गोचर" : "Transits",
        item: `https://www.jyotishasha.com/${isHi ? "hi/" : ""}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isHi ? config.breadcrumbNameHi : config.breadcrumbNameEn,
        item: `https://www.jyotishasha.com/${isHi ? "hi/" : ""}${config.slug}`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isHi ? config.webPageNameHi(currentYear) : config.webPageNameEn(currentYear),
    description: isHi ? config.webPageDescHi(currentYear) : config.webPageDescEn,
    url: `https://www.jyotishasha.com/${isHi ? "hi/" : ""}${config.slug}`,
    inLanguage: isHi ? "hi-IN" : "en-US",
  };

  return (
    <div className={`${config.outerBg} py-16 px-4`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          {isHi ? (
            <>
              {planetName} गोचर {currentYear} {rashiName} राशि में –{" "}
              <span className={config.h1AccentClass}>{config.h1TaglineHi}</span>
            </>
          ) : (
            <>
              {config.planetEn} Transit {currentYear} in {rashiName} –{" "}
              <span className={config.h1AccentClass}>{config.h1TaglineEn}</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className={`flex gap-6 text-[10px] font-black ${config.navColorClass} uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6`}>
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? config.remediesNavHi : config.remediesNavEn}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {config.intro(planetName, rashiName, isHi, currentYear)}
        </div>

        {/* SNAPSHOT */}
        <section className={`${config.snapshotBgClass} rounded-[2rem] p-8 mb-16 text-white`}>
          <h2 className={`text-xl font-bold mb-8 ${config.snapshotH2ColorClass} uppercase`}>
            {isHi ? config.snapshotH2Hi : config.snapshotH2En}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({pos?.degree ?? "-"}°)
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गति" : "Transit Motion"}
              </p>
              <p className={`text-2xl font-black italic${config.snapshotMotionClass ? ` ${config.snapshotMotionClass}` : ""}`}>
                {motion}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "समय अवधि" : "Transit Window"}
              </p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet={planetName}
            planetRashi={rashiName}
            planetSlug={config.slug}
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? config.remediesH2Hi : config.remediesH2En}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 ${config.remediesLeftBgClass} rounded-3xl border ${config.remediesLeftBorderClass}`}>
              <h3 className={`font-black ${config.remediesLeftHeadingColorClass} mb-4 uppercase tracking-widest text-xs`}>
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                {config.remediesVedicItems(isHi)}
              </ul>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "व्यावहारिक उपाय" : "Modern Alignment"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                {config.remediesModernItems(isHi)}
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`mt-20 pt-12 border-t border-slate-100${config.footerPbBottom ? " pb-10" : ""}`}>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">
            {isHi ? "ग्रह गोचर देखें" : "Planetary Transits"}
          </h4>

          <div className={`flex flex-wrap gap-x-6 gap-y-3 text-xs font-black ${config.footerColorClass}`}>
            {config.footerOtherPlanets.map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/${config.slug}/${pos?.rashi?.toLowerCase()}`}
              className={`inline-block ${config.ctaBtnColorClass} px-12 py-5 rounded-full font-black text-lg transition shadow-2xl hover:scale-105 active:scale-95`}
            >
              {isHi ? config.ctaBtnHi : config.ctaBtnEn}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}
