import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getBhadraSchemas } from "@/lib/seo/bhadraSchema";

import BhadraHero from "@/components/bhadra/BhadraHero";
import TodayBhadra from "@/components/bhadra/TodayBhadra";
import BhadraBenefits from "@/components/bhadra/BhadraBenefits";
import BhadraIntro from "@/components/bhadra/BhadraIntro";
import BhadraCalculation from "@/components/bhadra/BhadraCalculation";
import BhadraUsage from "@/components/bhadra/BhadraUsage";
import BhadraFAQ from "@/components/bhadra/BhadraFAQ";

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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/bhadra`;

  const title = isHi
    ? "आज का भद्रा (विष्टि करण) | मुहूर्त और सावधानी"
    : "Bhadra Today (Vishti Karana) | Muhurat and Caution";

  const description = isHi
    ? "आज का दैनिक भद्रा समय देखें। जानें कि क्या आज भद्रा है और इसका आपके कार्यों पर क्या प्रभाव पड़ सकता है। पंचांग आधारित दैनिक भद्रा जानकारी।"
    : "Check today's daily Bhadra (Vishti Karana). Find out if it is Bhadra today and understand its impact on your activities. Daily updated Bhadra information based on Panchang.";

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

export default async function BhadraPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const { faqSchema, breadcrumbSchema } = getBhadraSchemas(isHi);

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

      <BhadraHero isHi={isHi} />

      <TodayBhadra isHi={isHi} bhadra={p?.bhadra} />

      <BhadraBenefits isHi={isHi} />

      <BhadraIntro isHi={isHi} />

      <BhadraCalculation isHi={isHi} />

      <BhadraUsage isHi={isHi} />

      <BhadraFAQ isHi={isHi} />
    </main>
  );
}
