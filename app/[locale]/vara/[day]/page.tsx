import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { varaData } from "@/lib/data/varaData";
import { getVaraDaySchemas } from "@/lib/seo/varaDaySchema";

import VaraDayHero from "@/components/vara/day/VaraDayHero";
import WeekdayIntro from "@/components/vara/day/WeekdayIntro";
import PlanetSection from "@/components/vara/day/PlanetSection";
import DeitySection from "@/components/vara/day/DeitySection";
import VratSection from "@/components/vara/day/VratSection";
import ActivitiesSection from "@/components/vara/day/ActivitiesSection";
import MuhuratSection from "@/components/vara/day/MuhuratSection";
import PanchangSection from "@/components/vara/day/PanchangSection";
import WeekdayFAQ from "@/components/vara/day/WeekdayFAQ";

export const revalidate = 3600;

type PageProps = {
  params: {
    locale: string;
    day: string;
  };
};

export async function generateStaticParams() {
  return Object.keys(varaData).map((day) => ({
    day,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const day = params.day as keyof typeof varaData;
  const data = varaData[day];
  if (!data) return {};

  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/vara/${day}`;

  const title = isHi ? data.seo.title.hi : data.seo.title.en;
  const description = isHi ? data.seo.description.hi : data.seo.description.en;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function VaraDetailPage({ params }: PageProps) {
  // Runtime validation
  if (!(params.day in varaData)) {
    notFound();
  }

  // Safe type derivation after validation
  const day = params.day as keyof typeof varaData;
  const data = varaData[day];
  const isHi = params.locale === "hi";

  const { faqSchema, breadcrumbSchema } = getVaraDaySchemas(data, isHi);

  return (
    <main className="container mx-auto px-4 py-8 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <VaraDayHero data={data} isHi={isHi} />
      <WeekdayIntro data={data} isHi={isHi} />
      <PlanetSection data={data} isHi={isHi} />
      <DeitySection data={data} isHi={isHi} />
      <VratSection data={data} isHi={isHi} />
      <ActivitiesSection data={data} isHi={isHi} />
      <MuhuratSection data={data} isHi={isHi} />
      <PanchangSection data={data} isHi={isHi} />
      <WeekdayFAQ data={data} isHi={isHi} />
    </main>
  );
}
