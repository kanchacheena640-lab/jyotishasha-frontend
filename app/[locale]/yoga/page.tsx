import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getYogaSchemas } from "@/lib/seo/yogaSchema";

import YogaHero from "@/components/yoga/YogaHero";
import TodayYoga from "@/components/yoga/TodayYoga";
import YogaBenefits from "@/components/yoga/YogaBenefits";
import YogaIntro from "@/components/yoga/YogaIntro";
import YogaCalculation from "@/components/yoga/YogaCalculation";
import YogaUsage from "@/components/yoga/YogaUsage";
import YogaFAQ from "@/components/yoga/YogaFAQ";

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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/yoga`;

  const title = isHi
    ? "आज का योग | पंचांग के अनुसार शुभ और अशुभ योग"
    : "Yoga Today | Auspicious and Inauspicious Yogas in Panchang";

  const description = isHi
    ? "आज का दैनिक पंचांग योग देखें। जानें कि आज का योग आपके कार्यों के लिए कितना अनुकूल है। दैनिक अपडेटेड पंचांग योग जानकारी।"
    : "Check today's daily Panchang Yoga. Learn how favorable today's Yoga is for your tasks. Daily updated Panchang Yoga information.";

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

export default async function YogaPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const { faqSchema, breadcrumbSchema } = getYogaSchemas(isHi);

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

      <YogaHero isHi={isHi} />

      <TodayYoga isHi={isHi} yoga={p?.yoga} />

      <YogaBenefits isHi={isHi} />

      <YogaIntro isHi={isHi} />

      <YogaCalculation isHi={isHi} />

      <YogaUsage isHi={isHi} />

      <YogaFAQ isHi={isHi} />
    </main>
  );
}
