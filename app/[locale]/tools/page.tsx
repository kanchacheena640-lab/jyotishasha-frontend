import type { Metadata } from "next";
import ToolsPageClient from "./ToolsPageClient";

const SITE_URL = "https://www.jyotishasha.com";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale === "hi" ? "hi" : "en";
  const langPath = locale === "hi" ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${langPath}/tools`;

  const title =
    locale === "hi"
      ? "मुफ्त ज्योतिष टूल्स - कुंडली, दोष, योग कैलकुलेटर | ज्योतिष आशा"
      : "Free Astrology Tools - Kundali, Dosh, Yog Calculator | Jyotishasha";

  const description =
    locale === "hi"
      ? "मुफ्त वैदिक ज्योतिष कैलकुलेटर - मंगल दोष, काल सर्प, राजयोग, गजकेसरी और 25+ टूल्स।"
      : "Free Vedic astrology calculators - check Mangal Dosh, Kaal Sarp, Rajyog, Gajakesari and 25+ more tools instantly.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Jyotishasha",
    },
  };
}

export default function ToolsPage() {
  return <ToolsPageClient />;
}
