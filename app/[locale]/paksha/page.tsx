import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getPakshaSchemas } from "@/lib/seo/pakshaSchema";

import PakshaHero from "@/components/paksha/PakshaHero";
import TodayPaksha from "@/components/paksha/TodayPaksha";
import PakshaBenefits from "@/components/paksha/PakshaBenefits";
import PakshaIntro from "@/components/paksha/PakshaIntro";
import PakshaCalculation from "@/components/paksha/PakshaCalculation";
import PakshaUsage from "@/components/paksha/PakshaUsage";
import PakshaFAQ from "@/components/paksha/PakshaFAQ";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

export const revalidate = 3600;

type PageProps = {
  params: { locale: string };
};

async function getTodayPanchang(lang: "en" | "hi") {
  const today = format(new Date(), "yyyy-MM-dd");

  const res = await fetch(`${BACKEND_URL}/api/panchang`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: today,
      latitude: 26.8467,
      longitude: 80.9462,
      language: lang,
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch Panchang");

  const data = await res.json();
  return data.selected_date;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/paksha`;

  const title = isHi
    ? "आज का पक्ष | चंद्र चरण और पंचांग जानकारी"
    : "Paksha Today | Lunar Phase and Panchang Insights";

  const description = isHi
    ? "आज का दैनिक पक्ष (शुक्ल या कृष्ण) जानें। पंचांग में पक्ष की भूमिका और इसका आपके जीवन व मुहूर्त नियोजन पर प्रभाव समझें।"
    : "Check today's daily Paksha (Shukla or Krishna). Understand the role of Paksha in the Panchang and its impact on your life and Muhurat planning.";

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

export default async function PakshaPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const { faqSchema, breadcrumbSchema } = getPakshaSchemas(isHi);

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

      <PakshaHero isHi={isHi} />

      <TodayPaksha isHi={isHi} paksha={p?.tithi?.paksha} />

      <PakshaBenefits isHi={isHi} />

      <PakshaIntro isHi={isHi} />

      <PakshaCalculation isHi={isHi} />

      <PakshaUsage isHi={isHi} />

      <PakshaFAQ isHi={isHi} />
    </main>
  );
}
