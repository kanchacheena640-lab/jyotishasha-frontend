import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getNakshatraContent, getAllNakshatraSlugs, nakshatraList } from "@/lib/nakshatra";
import { DEFAULT_OG_IMAGE, SITE_URL, toISTDatePublished } from "@/lib/seo/articleSchema";

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = getAllNakshatraSlugs();

  return slugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "hi", slug },
  ]);
}

const SLUG_BY_NAME: Record<string, string> = {};
nakshatraList.forEach((n) => {
  SLUG_BY_NAME[n.name] = n.slug;
});

function getZodiacSlug(rashi: string) {
  return rashi.split("-")[0].trim().toLowerCase();
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const { slug, locale } = params;
  const isHi = locale === "hi";

  const data = getNakshatraContent(slug);
  if (!data) {
    return { title: isHi ? "नक्षत्र | ज्योतिष आशा" : "Nakshatra | Jyotishasha" };
  }

  const name = isHi ? data.name_hi : data.name;

  const title = isHi
    ? `${name} नक्षत्र - स्वभाव, स्वामी ग्रह, प्रेम और करियर | ज्योतिष आशा`
    : `${name} Nakshatra - Traits, Ruling Planet, Love & Career | Jyotishasha`;
  const description = isHi
    ? `${name} नक्षत्र की संपूर्ण जानकारी - स्वामी ग्रह, देवता, गण, स्वभाव, प्रेम, करियर, स्वास्थ्य, पाद, अनुकूलता और पौराणिक कथा के बारे में जानें।`
    : `Complete guide to ${name} Nakshatra - ruling planet, deity, gana, personality traits, love, career, health, padas, compatibility and mythology.`;

  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/nakshatra/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/nakshatra/${slug}`,
        hi: `${SITE_URL}/hi/nakshatra/${slug}`,
        "x-default": `${SITE_URL}/nakshatra/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      type: "article",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1730, height: 909, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/* ---------------- PAGE ---------------- */
export default function NakshatraDetailPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = params;
  const isHi = locale === "hi";
  const langPath = isHi ? "/hi" : "";

  const t = (en: string, hi: string) => (isHi ? hi : en);

  const data = getNakshatraContent(slug);
  if (!data) notFound();

  const name = t(data.name, data.name_hi);
  const canonicalUrl = `https://www.jyotishasha.com${langPath}/nakshatra/${slug}`;
  const zodiacSlug = getZodiacSlug(data.rashi);
  const planetTransitSlug = `${data.ruling_planet.toLowerCase()}-transit`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(
      `${data.name} Nakshatra - Traits, Ruling Planet, Love & Career`,
      `${data.name_hi} नक्षत्र - स्वभाव, स्वामी ग्रह, प्रेम और करियर`
    ),
    description: t(data.introduction, data.introduction_hi),
    image: DEFAULT_OG_IMAGE,
    datePublished: toISTDatePublished(),
    author: { "@type": "Organization", name: "Jyotishasha", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Jyotishasha",
      logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("Home", "होम"),
        item: `https://www.jyotishasha.com${langPath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("Nakshatra", "नक्षत्र"),
        item: `https://www.jyotishasha.com${langPath}/nakshatra`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema = data.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: t(f.q, f.q_hi),
      acceptedAnswer: { "@type": "Answer", text: t(f.a, f.a_hi) },
    })),
  } : null;

  const compatibilityGroups = [
    {
      label: t("Best Match", "सर्वोत्तम अनुकूलता"),
      names: data.compatibility.best,
      names_hi: data.compatibility.best_hi,
      boxClass: "bg-emerald-50 border-emerald-100",
      labelClass: "text-emerald-700",
    },
    {
      label: t("Average Match", "मध्यम अनुकूलता"),
      names: data.compatibility.average,
      names_hi: data.compatibility.average_hi,
      boxClass: "bg-amber-50 border-amber-100",
      labelClass: "text-amber-700",
    },
    {
      label: t("Challenging Match", "चुनौतीपूर्ण अनुकूलता"),
      names: data.compatibility.challenging,
      names_hi: data.compatibility.challenging_hi,
      boxClass: "bg-rose-50 border-rose-100",
      labelClass: "text-rose-700",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-950 to-slate-900 py-6 md:py-16 min-h-screen">
      {/* JSON-LD Schema (Article + FAQPage + BreadcrumbList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="max-w-4xl mx-auto bg-white rounded-3xl px-4 md:px-10 py-8 md:py-14 shadow-2xl text-slate-900">
        {/* Breadcrumb */}
        <nav className="flex text-xs text-gray-500 mb-6 gap-2">
          <Link href={`${langPath}/`}>{t("Home", "होम")}</Link> /
          <Link href={`${langPath}/nakshatra`}>{t("Nakshatra", "नक्षत्र")}</Link> /
          <span className="text-indigo-700 font-bold">{name}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-indigo-900">
          {name} {t("Nakshatra", "नक्षत्र")} - {t("Traits, Ruling Planet, Love & Career", "स्वभाव, स्वामी ग्रह, प्रेम और करियर")}
        </h1>

        {/* Quick Facts */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { label: t("Symbol", "प्रतीक"), value: t(data.symbol, data.symbol_hi) },
            { label: t("Deity", "देवता"), value: t(data.deity, data.deity_hi) },
            { label: t("Ruling Planet", "स्वामी ग्रह"), value: t(data.ruling_planet, data.ruling_planet_hi) },
            { label: t("Element", "तत्व"), value: t(data.element, data.element_hi) },
            { label: t("Gana", "गण"), value: t(data.gana, data.gana_hi) },
            { label: t("Rashi", "राशि"), value: t(data.rashi, data.rashi_hi) },
            { label: t("Degree Range", "अंश सीमा"), value: data.degree },
            { label: t("Number", "क्रमांक"), value: `#${data.number}` },
          ].map((item) => (
            <div key={item.label} className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
              <p className="text-[10px] uppercase font-bold text-indigo-400">{item.label}</p>
              <p className="text-sm font-bold text-indigo-900">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Links */}
        <section className="flex flex-wrap gap-3 mb-10">
          <Link href={`${langPath}/daily-horoscope/${zodiacSlug}`} className="text-xs font-bold px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">
            {t(`${data.rashi.split("-")[0]} Horoscope`, `${data.rashi_hi.split("-")[0]} राशिफल`)} →
          </Link>
          <Link href={`${langPath}/${planetTransitSlug}`} className="text-xs font-bold px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
            {t(`${data.ruling_planet} Transit`, `${data.ruling_planet_hi} गोचर`)} →
          </Link>
          <Link href={`${langPath}/free-kundali`} className="text-xs font-bold px-4 py-2 rounded-full bg-slate-700 text-white hover:bg-slate-800 transition">
            {t("Generate Your Birth Chart", "अपनी जन्म कुंडली बनाएं")} →
          </Link>
          <Link href={`${langPath}/tools`} className="text-xs font-bold px-4 py-2 rounded-full bg-slate-700 text-white hover:bg-slate-800 transition">
            {t("Nakshatra Calculator", "नक्षत्र कैलकुलेटर")} →
          </Link>
        </section>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Introduction", "परिचय")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.introduction, data.introduction_hi)}
          </p>
        </section>

        {/* Traits */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Personality Traits", "व्यक्तित्व लक्षण")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.traits, data.traits_hi)}
          </p>
        </section>

        {/* Strengths & Weaknesses */}
        <section className="mb-10 grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
            <h2 className="text-lg font-bold mb-3 text-emerald-800">
              {t("Strengths", "शक्तियाँ")}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {t(data.strengths, data.strengths_hi)}
            </p>
          </div>
          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
            <h2 className="text-lg font-bold mb-3 text-rose-800">
              {t("Weaknesses", "कमज़ोरियाँ")}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {t(data.weaknesses, data.weaknesses_hi)}
            </p>
          </div>
        </section>

        {/* Male & Female Traits */}
        <section className="mb-10 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <h2 className="text-lg font-bold mb-3 text-blue-800">
              {t("Male Traits", "पुरुष लक्षण")}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {t(data.male_traits, data.male_traits_hi)}
            </p>
          </div>
          <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100">
            <h2 className="text-lg font-bold mb-3 text-pink-800">
              {t("Female Traits", "महिला लक्षण")}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {t(data.female_traits, data.female_traits_hi)}
            </p>
          </div>
        </section>

        {/* Pada */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("The Four Padas", "चार पाद")}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.pada.map((p) => (
              <div key={p.number} className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                <p className="text-xs font-bold uppercase text-indigo-400 mb-2">
                  {t(`Pada ${p.number}`, `पाद ${p.number}`)}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t(p.description, p.description_hi)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Love */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Love & Relationships", "प्रेम और रिश्ते")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.love, data.love_hi)}
          </p>
        </section>

        {/* Compatibility */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Nakshatra Compatibility", "नक्षत्र अनुकूलता")}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {compatibilityGroups.map((group) => (
              <div key={group.label} className={`rounded-2xl p-4 border ${group.boxClass}`}>
                <p className={`text-xs font-bold uppercase mb-3 ${group.labelClass}`}>
                  {group.label}
                </p>
                <div className="flex flex-col gap-2">
                  {group.names.map((n, i) => {
                    const targetSlug = SLUG_BY_NAME[n];
                    const label = isHi ? group.names_hi[i] : n;
                    return targetSlug ? (
                      <Link
                        key={n}
                        href={`${langPath}/nakshatra/${targetSlug}`}
                        className="text-sm font-semibold text-indigo-700 hover:underline"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span key={n} className="text-sm font-semibold text-gray-700">{label}</span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Career & Finance", "करियर और वित्त")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.career, data.career_hi)}
          </p>
        </section>

        {/* Health */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Health", "स्वास्थ्य")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.health, data.health_hi)}
          </p>
        </section>

        {/* Mythology */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Mythology", "पौराणिक कथा")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.mythology, data.mythology_hi)}
          </p>
        </section>

        {/* Born in this Nakshatra */}
        <section className="mb-10 bg-indigo-900 text-white rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">
            {t(`Born in ${data.name} Nakshatra`, `${data.name_hi} नक्षत्र में जन्म`)}
          </h2>
          <p className="text-indigo-100 leading-relaxed whitespace-pre-line">
            {t(data.born_in, data.born_in_hi)}
          </p>
        </section>

        {/* FAQ */}
        {data.faqs?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-indigo-900">
              {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल")}
            </h2>
            <div className="space-y-4">
              {data.faqs.map((f, i) => (
                <details key={i} className="group bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                  <summary className="cursor-pointer font-bold text-indigo-900 flex justify-between items-center">
                    {t(f.q, f.q_hi)}
                    <span className="text-indigo-400 group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    {t(f.a, f.a_hi)}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Other Nakshatras */}
        <section className="mt-10 pt-8 border-t border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-indigo-900">
            {t("Explore Other Nakshatras", "अन्य नक्षत्र देखें")}
          </h2>
          <Link
            href={`${langPath}/nakshatra`}
            className="inline-block text-sm font-bold text-indigo-700 hover:underline"
          >
            ← {t("Back to all 27 Nakshatras", "सभी 27 नक्षत्रों पर वापस जाएँ")}
          </Link>
        </section>
      </article>
    </div>
  );
}
