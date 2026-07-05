import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getRahuKaalSchemas } from "@/lib/seo/rahuKaalSchema";

import RahuKaalHero from "@/components/rahu-kaal/RahuKaalHero";
import TodayRahuKaal from "@/components/rahu-kaal/TodayRahuKaal";
import RahuKaalDosDonts from "@/components/rahu-kaal/RahuKaalDosDonts";
import RahuKaalIntro from "@/components/rahu-kaal/RahuKaalIntro";
import RahuKaalCalculation from "@/components/rahu-kaal/RahuKaalCalculation";
import RahuKaalUsage from "@/components/rahu-kaal/RahuKaalUsage";
import RahuKaalFAQ from "@/components/rahu-kaal/RahuKaalFAQ";

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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/rahu-kaal`;

  const title = isHi
    ? "आज का राहु काल | शुभ कार्यों के लिए वर्जित समय"
    : "Rahu Kaal Today | Inauspicious Time for Important Tasks";

  const description = isHi
  ? "आज का सटीक राहु काल देखें। राहु काल के दौरान किसी भी नए कार्य की शुरुआत करने से बचें। पंचांग आधारित दैनिक राहु काल समय।"
  : "Check today's accurate Rahu Kaal. Avoid starting important tasks during Rahu Kaal. Daily updated Rahu Kaal timings based on Panchang.";

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
  };
}

export default async function RahuKaalPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const { faqSchema, breadcrumbSchema } = getRahuKaalSchemas(isHi);

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

      <RahuKaalHero isHi={isHi} />

      <TodayRahuKaal isHi={isHi} rahuKaal={p?.rahu_kaal} />

      <RahuKaalDosDonts isHi={isHi} />

      <RahuKaalIntro isHi={isHi} />

      <RahuKaalCalculation isHi={isHi} />

      <RahuKaalUsage isHi={isHi} />

      <RahuKaalFAQ isHi={isHi} />
    </main>
  );
}
