import { format, getDay } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getVaraSchemas } from "@/lib/seo/varaSchema";

import VaraHero from "@/components/vara/VaraHero";
import TodayVara from "@/components/vara/TodayVara";
import VaraIntro from "@/components/vara/VaraIntro";
import WeekdayNavigationGrid from "@/components/vara/WeekdayNavigationGrid";
import VaraPanchangContext from "@/components/vara/VaraPanchangContext";
import VaraFAQ from "@/components/vara/VaraFAQ";

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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/vara`;

  const title = isHi
    ? "आज का वार | ग्रह और देवता जानकारी"
    : "Vara Today | Planet and Deity Insights";

  const description = isHi
    ? "आज के वार के बारे में जानें। पंचांग में वार की भूमिका और इसका आपके जीवन पर प्रभाव समझें।"
    : "Check today's Vara. Understand the role of Vara in the Panchang and its impact on your life.";

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

export default async function VaraPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  // We derive Vara data if not directly provided by backend
  // Note: Backend might not return a 'vara' object directly in the response structure.
  // We utilize the date to provide the context if needed.
  const varaData = p?.vara;

  const { faqSchema, breadcrumbSchema } = getVaraSchemas(isHi);

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

      <VaraHero isHi={isHi} />

      <TodayVara isHi={isHi} vara={varaData} />

      <VaraIntro isHi={isHi} />

      <WeekdayNavigationGrid isHi={isHi} />

      <VaraPanchangContext isHi={isHi} />

      <VaraFAQ isHi={isHi} />
    </main>
  );
}
