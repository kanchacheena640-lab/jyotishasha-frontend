import type { Metadata } from "next";
import { getEkadashiContent } from "@/app/data/ekadashi";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const content = getEkadashiContent(params.slug);
  if (!content) return {};

  const year = new Date().getFullYear();
  const url = `https://www.jyotishasha.com/ekadashi/${params.slug}`;
  const title = `${content.name.en} ${year} Date, Vrat Vidhi, Parana Time & Katha`;
  const description = `${content.name.en} ${year} vrat date, tithi timing, parana time, astrological significance and full vidhi details.`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
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
          alt: content.name.en,
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