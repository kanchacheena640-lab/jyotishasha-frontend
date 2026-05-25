import type { Metadata } from "next";

type TransitMetadataParams = {
  planetEn: string;
  planetHi?: string;
  slug: string;
  locale?: string;
  ascendant?: string;
  houseNum?: number;
};

export function getTransitMetadata({
  planetEn,
  planetHi,
  slug,
  locale = "en",
  ascendant,
  houseNum,
}: TransitMetadataParams): Metadata {

  const year = new Date().getFullYear();

  const isHi = locale === "hi";

  const planetName = isHi
    ? (planetHi || planetEn)
    : planetEn;

  const alias =
    planetEn.toLowerCase() === "ketu"
      ? " (South Node)"
      : planetEn.toLowerCase() === "rahu"
      ? " (North Node)"
      : "";

  const ascText = ascendant
    ? isHi
      ? ` ${ascendant} लग्न`
      : ` for ${ascendant} Rising`
    : "";

  const houseText = houseNum
    ? isHi
      ? ` ${houseNum}वें भाव में`
      : ` in ${houseNum} House`
    : "";

  const title = isHi
    ? `${planetName} गोचर ${year}${houseText}${ascText}`
    : `${planetEn} Transit ${year}${alias}${houseText}${ascText}`;

  const description = isHi
    ? `${planetName} गोचर ${year}${houseText}${ascText} का विस्तृत वैदिक ज्योतिष विश्लेषण।`
    : `${planetEn} Transit ${year}${alias}${houseText}${ascText}: astrology effects, predictions, meanings and remedies.`;

  const canonical = `https://www.jyotishasha.com${
    isHi ? "/hi" : ""
  }/${slug}`;

  return {
    title: `${title} | Jyotishasha`,
    description,

    alternates: {
      canonical,
      languages: {
        en: `https://www.jyotishasha.com/${slug}`,
        hi: `https://www.jyotishasha.com/hi/${slug}`,
      },
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Jyotishasha",
      locale: isHi ? "hi_IN" : "en_US",
      type: "article",

      images: [
        {
          url: "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg",
          width: 1200,
          height: 630,
          alt: "Jyotishasha",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      images: [
        "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg",
      ],
    },
  };
}