import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getAbhijitMuhuratSchemas } from "@/lib/seo/abhijitMuhuratSchema";

import AbhijitHero from "@/components/abhijit-muhurat/AbhijitHero";
import TodayAbhijitMuhurat from "@/components/abhijit-muhurat/TodayAbhijitMuhurat";
import AbhijitBenefits from "@/components/abhijit-muhurat/AbhijitBenefits";
import AbhijitIntro from "@/components/abhijit-muhurat/AbhijitIntro";
import AbhijitCalculation from "@/components/abhijit-muhurat/AbhijitCalculation";
import AbhijitUsage from "@/components/abhijit-muhurat/AbhijitUsage";
import AbhijitFAQ from "@/components/abhijit-muhurat/AbhijitFAQ";

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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/abhijit-muhurat`;

  const title = isHi
    ? "आज का अभिजीत मुहूर्त | अत्यंत शुभ और शक्तिशाली समय"
    : "Abhijit Muhurat Today | Highly Auspicious and Powerful Time";

  const description = isHi
  ? "आज का सटीक अभिजीत मुहूर्त देखें। पंचांग के अनुसार यह मुहूर्त अत्यंत शुभ है, जो नए कार्यों की शुरुआत के लिए सर्वश्रेष्ठ है।"
  : "Check today's accurate Abhijit Muhurat. According to Panchang, this is a highly auspicious period, ideal for starting new tasks.";

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
  };
}

export default async function AbhijitMuhuratPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const { faqSchema, breadcrumbSchema } = getAbhijitMuhuratSchemas(isHi);

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

      <AbhijitHero isHi={isHi} />

      <TodayAbhijitMuhurat isHi={isHi} abhijitMuhurat={p?.abhijit_muhurta} />

      <AbhijitBenefits isHi={isHi} />

      <AbhijitIntro isHi={isHi} />

      <AbhijitCalculation isHi={isHi} />

      <AbhijitUsage isHi={isHi} />

      <AbhijitFAQ isHi={isHi} />
    </main>
  );
}
