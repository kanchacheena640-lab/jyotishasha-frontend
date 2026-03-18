import type { Metadata } from "next";

export function getTransitMetadata(planet: string, slug: string): Metadata {
  const year = new Date().getFullYear();

  const alias =
    planet.toLowerCase() === "ketu"
      ? " (South Node)"
      : planet.toLowerCase() === "rahu"
      ? " (North Node)"
      : "";

  // 🔥 Title (SEO optimized + high intent)
  const title = `${planet} Transit ${year}${alias} – Effects, Meaning & Remedies in Astrology`;

  // 🔥 Description (US + India keywords mix)
  const description = `${planet} Transit ${year}${alias}: meaning, astrology effects, zodiac sign predictions, and remedies. See how this transit impacts your birth chart and life.`;

  return {
    title: `${title} | Jyotishasha`,
    description,
    alternates: {
      canonical: `https://www.jyotishasha.com/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.jyotishasha.com/${slug}`,
      siteName: "Jyotishasha",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}