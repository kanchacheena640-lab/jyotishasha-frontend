interface Props {
  locale: string;
}

export default function PanchangSchema({
  locale,
}: Props) {
  const isHi = locale === "hi";

  const pageUrl = isHi
    ? "https://www.jyotishasha.com/hi/vedic-panchang"
    : "https://www.jyotishasha.com/vedic-panchang";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.jyotishasha.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isHi ? "वैदिक पंचांग" : "Vedic Panchang",
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isHi
      ? "वैदिक पंचांग"
      : "Vedic Panchang",
    description: isHi
      ? "आज की तिथि, नक्षत्र, योग, करण, राहु काल, पंचक और शुभ मुहूर्त की जानकारी।"
      : "Today's Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Panchak and auspicious Muhurat details.",
    url: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
    </>
  );
}