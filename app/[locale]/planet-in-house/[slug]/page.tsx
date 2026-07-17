import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPlanetInHouseContent,
  getAllPlanetInHouseSlugs,
  type PlanetInHouseData,
} from "@/lib/planetInHouse";
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  toISTDatePublished,
  buildBreadcrumbSchema,
  buildFAQPageSchema,
} from "@/lib/seo/articleSchema";

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = getAllPlanetInHouseSlugs();

  return slugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "hi", slug },
  ]);
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const { slug, locale } = params;
  const isHi = locale === "hi";

  const data = getPlanetInHouseContent(slug);
  if (!data) {
    return {
      title: isHi ? "भाव में ग्रह | ज्योतिष आशा" : "Planet in House | Jyotishasha",
    };
  }

  const title = isHi
    ? (data.meta_title_hi || `${data.planet_hi} ${data.houseLabel_hi} में — वैदिक ज्योतिष | ज्योतिष आशा`)
    : (data.meta_title || `${data.planet} in ${data.houseLabel} in Vedic Astrology | Jyotishasha`);

  const description = isHi
    ? (data.meta_description_hi || `वैदिक ज्योतिष में ${data.planet_hi} ${data.houseLabel_hi} में होने के प्रभाव — व्यक्तित्व, करियर, रिश्ते, स्वास्थ्य और आध्यात्मिकता पर प्रभाव।`)
    : (data.meta_description || `Effects of ${data.planet} in ${data.houseLabel} in Vedic Astrology — personality, career, relationships, health and spirituality.`);

  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/planet-in-house/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/planet-in-house/${slug}`,
        hi: `${SITE_URL}/hi/planet-in-house/${slug}`,
        "x-default": `${SITE_URL}/planet-in-house/${slug}`,
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
export default function PlanetInHousePage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = params;
  const isHi = locale === "hi";
  const langPath = isHi ? "/hi" : "";

  const t = (en: string, hi: string) => (isHi ? hi : en);

  const data = getPlanetInHouseContent(slug);
  if (!data) notFound();

  const pageTitle = t(
    data.title || `${data.planet} in ${data.houseLabel} in Vedic Astrology`,
    data.title_hi || `${data.planet_hi} ${data.houseLabel_hi} में — वैदिक ज्योतिष`
  );

  const canonicalUrl = `${SITE_URL}${langPath}/planet-in-house/${slug}`;

  /* ---------- Schema ---------- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: t(
      data.overview || `Effects of ${data.planet} in ${data.houseLabel} in Vedic Astrology.`,
      data.overview_hi || `वैदिक ज्योतिष में ${data.planet_hi} ${data.houseLabel_hi} में प्रभाव।`
    ),
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

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: t("Home", "होम"), url: `${langPath}/` },
    { name: t("Planets in Houses", "भावों में ग्रह"), url: `${langPath}/planet-in-house` },
    { name: pageTitle, url: `${langPath}/planet-in-house/${slug}` },
  ]);

  const faqSchema =
    data.faqs.length > 0
      ? buildFAQPageSchema(
          data.faqs.map((f) => ({ q: t(f.q, f.q_hi), a: t(f.a, f.a_hi) }))
        )
      : null;

  /* ---------- Internal links ---------- */
  const relatedSamePlanet = data.related.samePlanetOtherHouses
    .map((s) => getPlanetInHouseContent(s))
    .filter((d): d is PlanetInHouseData => d !== null);

  const relatedOtherPlanets = data.related.otherPlanetsInSameHouse
    .map((s) => getPlanetInHouseContent(s))
    .filter((d): d is PlanetInHouseData => d !== null);

  return (
    <div className="bg-gradient-to-b from-indigo-950 to-slate-900 py-6 md:py-16 min-h-screen">
      {/* JSON-LD */}
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
          <Link href={`${langPath}/planet-in-house`}>
            {t("Planets in Houses", "भावों में ग्रह")}
          </Link> /
          <span className="text-indigo-700 font-bold">{pageTitle}</span>
        </nav>

        {/* Hero — H1 */}
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-indigo-900">
          {pageTitle}
        </h1>

        {/* Quick Summary */}
        <section className="grid grid-cols-2 gap-3 mb-10">
          {[
            { label: t("Planet", "ग्रह"),  value: t(data.planet, data.planet_hi) },
            { label: t("House", "भाव"),    value: t(data.houseLabel, data.houseLabel_hi) },
          ].map((item) => (
            <div key={item.label} className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
              <p className="text-[10px] uppercase font-bold text-indigo-400">{item.label}</p>
              <p className="text-sm font-bold text-indigo-900">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Links — high-intent next steps for the reader */}
        <section className="flex flex-wrap gap-3 mb-10">
          <Link
            href={`${langPath}/tools/lagna-finder`}
            className="text-xs font-bold px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {t("Find Your Lagna", "अपना लग्न जानें")} →
          </Link>
          <Link
            href={`${langPath}/${data.planetSlug}-transit`}
            className="text-xs font-bold px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {t(`${data.planet} Transit Guide`, `${data.planet_hi} गोचर गाइड`)} →
          </Link>
          <Link
            href={`${langPath}/free-kundali`}
            className="text-xs font-bold px-4 py-2 rounded-full bg-slate-700 text-white hover:bg-slate-800 transition"
          >
            {t("Get Your Full Birth Chart", "पूरी जन्म कुंडली बनाएं")} →
          </Link>
        </section>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Overview", "परिचय")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.overview, data.overview_hi)}
          </p>
        </section>

        {/* Personality */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Personality", "व्यक्तित्व")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.personality, data.personality_hi)}
          </p>
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

        {/* Relationships */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Love & Relationships", "प्रेम और रिश्ते")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.relationships, data.relationships_hi)}
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

        {/* Spirituality */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t("Spirituality", "आध्यात्मिकता")}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.spirituality, data.spirituality_hi)}
          </p>
        </section>

        {/* Strengths & Challenges */}
        {(data.strengths.length > 0 || data.challenges.length > 0) && (
          <section className="mb-10 grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <h2 className="text-lg font-bold mb-3 text-emerald-800">
                {t("Strengths", "शक्तियाँ")}
              </h2>
              <ul className="space-y-2">
                {(isHi ? data.strengths_hi : data.strengths).map((s, i) => (
                  <li key={i} className="text-sm text-gray-700">{s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
              <h2 className="text-lg font-bold mb-3 text-rose-800">
                {t("Challenges", "चुनौतियाँ")}
              </h2>
              <ul className="space-y-2">
                {(isHi ? data.challenges_hi : data.challenges).map((c, i) => (
                  <li key={i} className="text-sm text-gray-700">{c}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQ */}
        {data.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-indigo-900">
              {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल")}
            </h2>
            <div className="space-y-4">
              {data.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group bg-indigo-50 rounded-xl p-4 border border-indigo-100"
                >
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

        {/* Internal Links — Same Planet, Other Houses */}
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 text-indigo-900">
            {t(
              `${data.planet} in Other Houses`,
              `${data.planet_hi} अन्य भावों में`
            )}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedSamePlanet.map((rel) => (
              <Link
                key={rel.slug}
                href={`${langPath}/planet-in-house/${rel.slug}`}
                className="text-xs font-bold px-3 py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition"
              >
                {t(rel.houseLabel, rel.houseLabel_hi)}
              </Link>
            ))}
          </div>
        </section>

        {/* Internal Links — Other Planets, Same House */}
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 text-indigo-900">
            {t(
              `Other Planets in ${data.houseLabel}`,
              `${data.houseLabel_hi} में अन्य ग्रह`
            )}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedOtherPlanets.map((rel) => (
              <Link
                key={rel.slug}
                href={`${langPath}/planet-in-house/${rel.slug}`}
                className="text-xs font-bold px-3 py-2 rounded-full bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 transition"
              >
                {t(rel.planet, rel.planet_hi)}
              </Link>
            ))}
          </div>
        </section>

        {/* Discover More */}
        {data.discoverMore.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-indigo-900">
              {t("Discover More", "और जानें")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.discoverMore.map((slug) => (
                <span
                  key={slug}
                  className="text-xs font-bold px-3 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
                >
                  {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        {data.cta && (
          <section className="mb-10 bg-indigo-900 text-white rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3">
              {t(data.cta.title, data.cta.title_hi)}
            </h2>
            <p className="text-indigo-100 mb-4 leading-relaxed">
              {t(data.cta.description, data.cta.description_hi)}
            </p>
            <Link
              href={`/reports/${data.cta.reportSlug}`}
              className="inline-block px-6 py-3 rounded-full bg-white text-indigo-900 font-bold text-sm hover:bg-indigo-50 transition"
            >
              {t("Get Your Report", "रिपोर्ट प्राप्त करें")} →
            </Link>
          </section>
        )}

        {/* Back to Hub */}
        <section className="mt-10 pt-8 border-t border-gray-100">
          <Link
            href={`${langPath}/planet-in-house`}
            className="inline-block text-sm font-bold text-indigo-700 hover:underline"
          >
            ← {t("Back to Planets in Houses", "भावों में ग्रह पर वापस जाएँ")}
          </Link>
        </section>
      </article>
    </div>
  );
}
