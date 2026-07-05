import { nakshatraList } from "@/lib/nakshatra";
import { nakshatraHubFaqs } from "@/lib/nakshatra/hubFaqData";

const SITE_URL = "https://www.jyotishasha.com";

interface Props {
  locale: string;
}

export default function NakshatraSchema({ locale }: Props) {
  const isHi = locale === "hi";
  const langPath = isHi ? "/hi" : "";
  const pageUrl = `${SITE_URL}${langPath}/nakshatra`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isHi ? "होम" : "Home",
        item: `${SITE_URL}${langPath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isHi ? "नक्षत्र" : "Nakshatra",
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isHi
      ? "27 नक्षत्र – संपूर्ण सूची और वैदिक ज्योतिष मार्गदर्शिका"
      : "27 Nakshatras – Complete List & Vedic Astrology Guide",
    description: isHi
      ? "वैदिक ज्योतिष के सभी 27 नक्षत्रों की संपूर्ण जानकारी – स्वामी ग्रह, देवता, गण, स्वभाव, प्रेम, करियर और स्वास्थ्य।"
      : "Explore all 27 Nakshatras of Vedic astrology – ruling planets, deities, gana, personality traits, love, career and health insights for each birth star.",
    url: pageUrl,
    inLanguage: isHi ? "hi" : "en",
    publisher: {
      "@type": "Organization",
      name: "Jyotishasha",
      url: SITE_URL,
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isHi ? "27 नक्षत्र" : "27 Nakshatras",
    itemListElement: nakshatraList.map((n) => ({
      "@type": "ListItem",
      position: n.number,
      name: isHi ? `${n.name_hi} नक्षत्र` : `${n.name} Nakshatra`,
      url: `${SITE_URL}${langPath}/nakshatra/${n.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: nakshatraHubFaqs.map((f) => ({
      "@type": "Question",
      name: isHi ? f.q_hi : f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: isHi ? f.a_hi : f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
