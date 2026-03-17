import type { Metadata } from "next";

export function getTransitMetadata(planet: string, slug: string): Metadata {
  const year = new Date().getFullYear();

  return {
    title: `${planet} Transit ${year} – Date, Effects & Predictions | Jyotishasha`,
    description: `${planet} Transit ${year}: date, rashi change, zodiac wise effects, guru gochar impact, predictions and remedies as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/${slug}`,
    },
  };
}