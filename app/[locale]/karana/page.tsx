import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getKaranaSchemas } from "@/lib/seo/karanaSchema";

import KaranaHero from "@/components/karana/KaranaHero";
import TodayKarana from "@/components/karana/TodayKarana";
import KaranaBenefits from "@/components/karana/KaranaBenefits";
import KaranaIntro from "@/components/karana/KaranaIntro";
import KaranaCalculation from "@/components/karana/KaranaCalculation";
import KaranaUsage from "@/components/karana/KaranaUsage";
import KaranaFAQ from "@/components/karana/KaranaFAQ";

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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/karana`;

  const title = isHi
    ? "आज का करण | मुहूर्त और पंचांग जानकारी"
    : "Karana Today | Muhurat and Panchang Insights";

  const description = isHi
    ? "आज की दैनिक करण जानकारी देखें। पंचांग में करण की भूमिका और मुहूर्त नियोजन पर इसके प्रभाव को समझें।"
    : "Check today's daily Karana information. Understand the role of Karana in the Panchang and its impact on your Muhurat planning.";

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

export default async function KaranaPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const { faqSchema, breadcrumbSchema } = getKaranaSchemas(isHi);

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

      <KaranaHero isHi={isHi} />

      <TodayKarana isHi={isHi} karana={p?.karana} />

      <KaranaBenefits isHi={isHi} />

      <KaranaIntro isHi={isHi} />

      <KaranaCalculation isHi={isHi} />

      <KaranaUsage isHi={isHi} />

      <KaranaFAQ isHi={isHi} />
    </main>
  );
}
