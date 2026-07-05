import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getPanchakSchemas } from "@/lib/seo/panchakSchema";

import PanchakHero from "@/components/panchak/PanchakHero";
import TodayPanchak from "@/components/panchak/TodayPanchak";
import PanchakBenefits from "@/components/panchak/PanchakBenefits";
import PanchakIntro from "@/components/panchak/PanchakIntro";
import PanchakCalculation from "@/components/panchak/PanchakCalculation";
import PanchakUsage from "@/components/panchak/PanchakUsage";
import PanchakFAQ from "@/components/panchak/PanchakFAQ";

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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/panchak`;

  const title = isHi
    ? "आज का पंचक | पंचक काल की जानकारी और महत्व"
    : "Panchak Today | Panchak Period Insights and Significance";

  const description = isHi
    ? "आज का दैनिक पंचक देखें। जानें कि क्या आज पंचक है और इसका आपके कार्यों पर क्या प्रभाव पड़ सकता है। पंचांग आधारित दैनिक पंचक जानकारी।"
    : "Check today's daily Panchak. Find out if it is Panchak today and understand its impact on your activities. Daily updated Panchak information based on Panchang.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1730, height: 909, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function PanchakPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const { faqSchema, breadcrumbSchema } = getPanchakSchemas(isHi);

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

      <PanchakHero isHi={isHi} />

      <TodayPanchak isHi={isHi} panchak={p?.panchak} />

      <PanchakBenefits isHi={isHi} />

      <PanchakIntro isHi={isHi} />

      <PanchakCalculation isHi={isHi} />

      <PanchakUsage isHi={isHi} />

      <PanchakFAQ isHi={isHi} />
    </main>
  );
}
