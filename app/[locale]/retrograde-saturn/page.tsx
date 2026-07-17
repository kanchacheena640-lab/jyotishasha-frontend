import type { Metadata } from "next"
import saturn from "@/lib/retrograde/planets/saturn"
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
    ? saturn.meta_title_hi ||
      `वक्री ${saturn.planet_hi} — वैदिक ज्योतिष में अर्थ, प्रभाव और उपाय | ज्योतिष आशा`
    : saturn.meta_title ||
      `${saturn.planet} Retrograde in Vedic Astrology — Meaning, Effects & Remedies | Jyotishasha`

  const description = isHi
    ? saturn.meta_description_hi ||
      `वैदिक ज्योतिष में वक्री ${saturn.planet_hi} का अर्थ, जन्मकालीन और गोचर प्रभाव, शास्त्रीय व्याख्या और उपाय — विस्तृत मार्गदर्शिका।`
    : saturn.meta_description ||
      `${saturn.planet} retrograde in Vedic astrology — natal and transit effects, classical vakri graha interpretation, do's and don'ts, and remedies.`

  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/${saturn.routeSlug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/${saturn.routeSlug}`,
        hi: `${SITE_URL}/hi/${saturn.routeSlug}`,
        "x-default": `${SITE_URL}/${saturn.routeSlug}`,
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
export default function RetrogradeSaturnPage({
  params,
}: {
  params: { locale: string }
}) {
  const isHi = params.locale === "hi"
  const langPath = isHi ? "/hi" : ""
  const t = (en: string, hi: string) => (isHi ? hi : en)

  const canonicalUrl = `${SITE_URL}${langPath}/${saturn.routeSlug}`

  const pageTitle = t(
    saturn.title || `${saturn.planet} Retrograde in Vedic Astrology`,
    saturn.title_hi || `वक्री ${saturn.planet_hi} — वैदिक ज्योतिष`,
  )

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: t("Home", "होम"), url: `${langPath}/` },
    {
      name: t("Retrograde Planets", "वक्री ग्रह"),
      url: `${langPath}/retrograde-planets`,
    },
    { name: pageTitle, url: `${langPath}/${saturn.routeSlug}` },
  ])

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: t(
      saturn.intro ||
        `${saturn.planet} retrograde in Vedic astrology — meaning, effects and remedies.`,
      saturn.intro_hi ||
        `वक्री ${saturn.planet_hi} — वैदिक ज्योतिष में अर्थ, प्रभाव और उपाय।`,
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
    saturn.faqs.length > 0
      ? buildFAQPageSchema(
          saturn.faqs.map((f) => ({
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
        data={saturn}
        isHi={isHi}
        langPath={langPath}
      />
    </div>
  )
}
