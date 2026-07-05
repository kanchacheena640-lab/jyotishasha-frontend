import type { Metadata } from "next";

const SITE_URL = "https://www.jyotishasha.com";

const DEFAULT_OG =
  `${SITE_URL}/og/jyotishasha-og-banner.jpg`;

type TransitMetadataParams = {
  planetEn: string;
  planetHi?: string;

  slug: string;

  locale?: string;

  ascendant?: string;

  houseNum?: number;

  customTitle?: string;
  customDescription?: string;

  noIndex?: boolean;

  ogImage?: string;
};

function buildPlanetAlias(planetEn: string) {
  const p = planetEn.toLowerCase();

  if (p === "ketu") return " (South Node)";
  if (p === "rahu") return " (North Node)";

  return "";
}

function buildAscText(
  ascendant: string | undefined,
  isHi: boolean
) {
  if (!ascendant) return "";

  return isHi
    ? ` ${ascendant} लग्न`
    : ` for ${ascendant} Rising`;
}

function buildHouseText(
  houseNum: number | undefined,
  isHi: boolean
) {
  if (!houseNum) return "";

  return isHi
    ? ` ${houseNum}वें भाव में`
    : ` in ${houseNum} House`;
}

function buildCanonical(
  slug: string,
  isHi: boolean
) {
  return `${SITE_URL}${isHi ? "/hi" : ""}/${slug}`;
}

export function getTransitMetadata({
  planetEn,
  planetHi,

  slug,

  locale = "en",

  ascendant,
  houseNum,

  customTitle,
  customDescription,

  noIndex = false,

  ogImage,
}: TransitMetadataParams): Metadata {

  const year = new Date().getFullYear();

  const isHi = locale === "hi";

  const planetName = isHi
    ? (planetHi || planetEn)
    : planetEn;

  const alias = buildPlanetAlias(planetEn);

  const ascText = buildAscText(
    ascendant,
    isHi
  );

  const houseText = buildHouseText(
    houseNum,
    isHi
  );

  const generatedTitle = isHi
    ? `${planetName} गोचर ${year}${houseText}${ascText}`
    : `${planetEn} Transit ${year}${alias}${houseText}${ascText}`;

  const generatedDescription = isHi
    ? `${planetName} गोचर ${year}${houseText}${ascText} का विस्तृत वैदिक ज्योतिष विश्लेषण।`
    : `${planetEn} Transit ${year}${alias}${houseText}${ascText}: astrology effects, predictions, meanings, remedies and house-wise analysis.`;

  const title = customTitle || generatedTitle;

  const description =
    customDescription || generatedDescription;

  const canonical = buildCanonical(
    slug,
    isHi
  );

  const finalOg = ogImage || DEFAULT_OG;

  return {
    title: `${title} | Jyotishasha`,

    description,

    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    keywords: isHi
      ? [
          `${planetName} गोचर`,
          `${planetName} गोचर ${year}`,
          `${planetName} राशिफल`,
          `${planetName} गोचर प्रभाव`,
          `${planetName} वैदिक ज्योतिष`,
          ascendant
            ? `${ascendant} लग्न`
            : "",
          houseNum
            ? `${houseNum}वाँ भाव`
            : "",
        ].filter(Boolean)
      : [
          `${planetEn} transit`,
          `${planetEn} transit ${year}`,
          `${planetEn} transit astrology`,
          `${planetEn} transit effects`,
          `${planetEn} transit predictions`,
          `${planetEn} vedic astrology`,
          ascendant
            ? `${ascendant} rising`
            : "",
          houseNum
            ? `${houseNum} house`
            : "",
        ].filter(Boolean),

    alternates: {
      canonical,

      languages: {
        en: `${SITE_URL}/${slug}`,
        hi: `${SITE_URL}/hi/${slug}`,
      },
    },

    openGraph: {
      title,

      description,

      url: canonical,

      siteName: "Jyotishasha",

      locale: isHi
        ? "hi_IN"
        : "en_US",

      type: "article",

      images: [
        {
          url: finalOg,

          width: 1730,
          height: 909,

          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [finalOg],
    },
  };
}

export function buildFAQSchema(
  questions: {
    question: string;
    answer: string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: questions.map((q) => ({
      "@type": "Question",

      name: q.question,

      acceptedAnswer: {
        "@type": "Answer",

        text: q.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: {
    name: string;
    item: string;
  }[]
) {
  return {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: items.map((x, i) => ({
      "@type": "ListItem",

      position: i + 1,

      name: x.name,

      item: x.item,
    })),
  };
}

export function buildWebPageSchema(args: {
  title: string;

  description: string;

  url: string;

  locale?: string;
}) {
  return {
    "@context": "https://schema.org",

    "@type": "WebPage",

    name: args.title,

    description: args.description,

    url: args.url,

    inLanguage:
      args.locale === "hi"
        ? "hi-IN"
        : "en-US",
  };
}