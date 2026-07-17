import type { Metadata } from "next"
import venus from "@/lib/retrograde/planets/venus"
import RetrogradeDetailPageRenderer from "@/components/retrograde/RetrogradeDetailPageRenderer"
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  toISTDatePublished,
  buildBreadcrumbSchema,
  buildFAQPageSchema,
} from "@/lib/seo/articleSchema"

export const revalidate = 86400

/* ---------- Metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isHi = params.locale === "hi"

  const title = isHi
    ? venus.meta_title_hi ||
      `वक्री ${venus.planet_hi} — वैदिक ज्योतिष में अर्थ, प्रभाव और उपाय | ज्योतिष आशा`
    : venus.meta_title ||
      `${venus.planet} Retrograde in Vedic Astrology — Meaning, Effects & Remedies | Jyotishasha`

  const description = isHi
    ? venus.meta_description_hi ||
      `वैदिक ज्योतिष में वक्री ${venus.planet_hi} का अर्थ, जन्मकालीन और गोचर प्रभाव, शास्त्रीय व्याख्या और उपाय — विस्तृत मार्गदर्शिका।`
    : venus.meta_description ||
      `${venus.planet} retrograde in Vedic astrology — natal and transit effects, classical vakri graha interpretation, do's and don'ts, and remedies.`

  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/${venus.routeSlug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/${venus.routeSlug}`,
        hi: `${SITE_URL}/hi/${venus.routeSlug}`,
        "x-default": `${SITE_URL}/${venus.routeSlug}`,
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
  }
}

/* ---------- Page ---------- */
export default function RetrogradeVenusPage({
  params,
}: {
  params: { locale: string }
}) {
  const isHi = params.locale === "hi"
  const langPath = isHi ? "/hi" : ""
  const t = (en: string, hi: string) => (isHi ? hi : en)

  const canonicalUrl = `${SITE_URL}${langPath}/${venus.routeSlug}`

  const pageTitle = t(
    venus.title || `${venus.planet} Retrograde in Vedic Astrology`,
    venus.title_hi || `वक्री ${venus.planet_hi} — वैदिक ज्योतिष`,
  )

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: t("Home", "होम"), url: `${langPath}/` },
    {
      name: t("Retrograde Planets", "वक्री ग्रह"),
      url: `${langPath}/retrograde-planets`,
    },
    { name: pageTitle, url: `${langPath}/${venus.routeSlug}` },
  ])

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: t(
      venus.intro ||
        `${venus.planet} retrograde in Vedic astrology — meaning, effects and remedies.`,
      venus.intro_hi ||
        `वक्री ${venus.planet_hi} — वैदिक ज्योतिष में अर्थ, प्रभाव और उपाय।`,
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
  }

  const faqSchema =
    venus.faqs.length > 0
      ? buildFAQPageSchema(
          venus.faqs.map((f) => ({
            q: t(f.q, f.q_hi),
            a: t(f.a, f.a_hi),
          })),
        )
      : null

  return (
    <div className="bg-gradient-to-b from-indigo-950 to-slate-900 py-6 md:py-16 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <RetrogradeDetailPageRenderer
        data={venus}
        isHi={isHi}
        langPath={langPath}
      />
    </div>
  )
}
