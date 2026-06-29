import { format } from "date-fns";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import { getChoghadiyaSchemas } from "@/lib/seo/choghadiyaSchema";
import { ChaughadiyaItem } from "@/components/panchang/ChoghadiyaCard";

import ChoghadiyaHero from "@/components/choghadiya/ChoghadiyaHero";
import TodayChoghadiya from "@/components/choghadiya/TodayChoghadiya";
import RahuAbhijitCard from "@/components/choghadiya/RahuAbhijitCard";
import ChoghadiyaIntro from "@/components/choghadiya/ChoghadiyaIntro";
import ChoghadiyaTypes from "@/components/choghadiya/ChoghadiyaTypes";
import ChoghadiyaUsage from "@/components/choghadiya/ChoghadiyaUsage";
import ChoghadiyaFAQ from "@/components/choghadiya/ChoghadiyaFAQ";

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

const MONTH_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_HI = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/choghadiya`;

  const now = new Date();
  const monthEn = MONTH_EN[now.getMonth()];
  const monthHi = MONTH_HI[now.getMonth()];
  const year = now.getFullYear();

  const title = isHi
    ? `आज का चौघड़िया मुहूर्त - ${monthHi} ${year} | शुभ चौघड़िया टाइम्स`
    : `Choghadiya Today | Auspicious Choghadiya Timings - ${monthEn} ${year}`;

  const description = isHi
  ? "आज का चौघड़िया मुहूर्त देखें। दिन और रात के शुभ एवं अशुभ चौघड़िया, राहु काल और अभिजीत मुहूर्त का सटीक समय प्राप्त करें।"
  : "Check today's Day and Night Choghadiya timings along with Rahu Kaal and Abhijit Muhurat. Find accurate auspicious and inauspicious periods."

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

export default async function ChoghadiyaPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const p = await getTodayPanchang(lang);

  const dayItems: ChaughadiyaItem[] = p?.chaughadiya?.day || [];
  const nightItems: ChaughadiyaItem[] = p?.chaughadiya?.night || [];

  const { faqSchema, breadcrumbSchema } = getChoghadiyaSchemas(isHi);

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

      <ChoghadiyaHero isHi={isHi} />

      <TodayChoghadiya isHi={isHi} dayItems={dayItems} nightItems={nightItems} />

      <RahuAbhijitCard
        isHi={isHi}
        rahuKaal={p?.rahu_kaal}
        abhijitMuhurat={p?.abhijit_muhurta}
      />

      <ChoghadiyaIntro isHi={isHi} />

      <ChoghadiyaTypes isHi={isHi} />

      <ChoghadiyaUsage isHi={isHi} />

      <ChoghadiyaFAQ isHi={isHi} />
    </main>
  );
}
