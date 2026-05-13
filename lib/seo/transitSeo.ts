import type { Metadata } from "next";

export function getTransitMetadata(
  planet: string,
  slug: string,
  locale: string = "en"
): Metadata {

  const year = new Date().getFullYear();

  const isHi = locale === "hi";

  const alias =
    planet.toLowerCase() === "ketu"
      ? " (South Node)"
      : planet.toLowerCase() === "rahu"
      ? " (North Node)"
      : "";

  const title = `${planet} Transit ${year}${alias} – Effects, Meaning & Remedies in Astrology`;

  const description = `${planet} Transit ${year}${alias}: meaning, astrology effects, zodiac sign predictions, and remedies. See how this transit impacts your birth chart and life.`;

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
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}