import type { Metadata } from "next";
import { getEkadashiContent } from "@/app/data/ekadashi";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string; locale: string };
  searchParams: { year?: string };
}): Promise<Metadata> {

  const locale = params.locale || "en";
  const isHi = locale === "hi";

  const t = (en: any, hi: any) => (isHi ? hi : en);

  const content = getEkadashiContent(params.slug);
  if (!content) return {};

  const currentYear = new Date().getFullYear();
  const displayYear = searchParams.year
    ? searchParams.year
    : currentYear.toString();

  // ✅ Locale URL
  const baseUrl = `https://www.jyotishasha.com/${locale}/ekadashi/${params.slug}`;
  const url = `${baseUrl}${searchParams.year ? `?year=${searchParams.year}` : ""}`;

  // ✅ Bilingual Title + Description
  const title = t(
    `${content.name.en} ${displayYear} Date, Vrat Vidhi, Parana Time & Katha`,
    `${content.name.hi} ${displayYear} व्रत तिथि, पूजा विधि, पारण समय और कथा`
  );

  const description = t(
    `Complete guide for ${content.name.en} in ${displayYear}. Find accurate vrat date, tithi timings, parana time, and significance.`,
    `${displayYear} में ${content.name.hi} की पूरी जानकारी। व्रत तिथि, तिथि समय, पारण समय और महत्व जानें।`
  );

  return {
    title,
    description,

    alternates: {
      canonical: baseUrl, // ✅ locale-based canonical
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
          alt: `${t(content.name.en, content.name.hi)} ${displayYear}`,
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