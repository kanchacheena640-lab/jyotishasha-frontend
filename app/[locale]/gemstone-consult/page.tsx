// app/gemstone-consult/page.tsx

import type { Metadata } from "next";
import GemstoneConsultation from "@/components/GemstoneConsultation";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHi = params.locale === "hi";

  const title = isHi
    ? "रत्न परामर्श - अपना भाग्यशाली रत्न जानें | ज्योतिष आशा"
    : "Gemstone Consultation - Find Your Lucky Gemstone | Jyotishasha";
  const description = isHi
    ? "वैदिक जन्म कुंडली के आधार पर व्यक्तिगत रत्न सुझाव प्राप्त करें।"
    : "Get personalized gemstone recommendations based on your Vedic birth chart. Find which gemstone suits you best.";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/gemstone-consult`;

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

export default function GemstoneConsultPage() {
  return (
    <main className="min-h-screen py-10 px-4">
        <GemstoneConsultation />

    </main>
  );
}
