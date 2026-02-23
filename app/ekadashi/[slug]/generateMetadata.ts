import type { Metadata } from "next";
import { getEkadashiContent } from "@/app/data/ekadashi";

export async function generateMetadata({
  params,
  searchParams, // Isse hume pata chalega user 2026 dekh raha hai ya 2027
}: {
  params: { slug: string };
  searchParams: { year?: string };
}): Promise<Metadata> {
  const content = getEkadashiContent(params.slug);
  if (!content) return {};

  // URL se year lo, agar nahi hai toh current year lo
  const currentYear = new Date().getFullYear();
  const displayYear = searchParams.year ? searchParams.year : currentYear.toString();
  
  // Canonical URL humesha base rakhenge ya specific year ke saath
  const url = `https://www.jyotishasha.com/ekadashi/${params.slug}${searchParams.year ? `?year=${searchParams.year}` : ""}`;
  
  // Title aur Description mein dynamic year daal diya
  const title = `${content.name.en} ${displayYear} Date, Vrat Vidhi, Parana Time & Katha`;
  const description = `Complete guide for ${content.name.en} in ${displayYear}. Find accurate vrat date, tithi timings, parana time (breaking fast), and astrological significance.`;

  return {
    title,
    description,

    alternates: {
      canonical: `https://www.jyotishasha.com/ekadashi/${params.slug}`, // Canonical base hi rakho SEO ke liye best hai
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Jyotishasha",
      type: "article",
      images: [
        {
          url: "https://www.jyotishasha.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${content.name.en} ${displayYear}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.jyotishasha.com/og-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}