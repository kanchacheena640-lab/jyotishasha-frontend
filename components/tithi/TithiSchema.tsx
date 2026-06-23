interface Props {
  locale: string;
}

export default function TithiSchema({
  locale,
}: Props) {
  const isHi = locale === "hi";

  const pageUrl = isHi
    ? "https://www.jyotishasha.com/hi/panchang/tithi"
    : "https://www.jyotishasha.com/panchang/tithi";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isHi
          ? "तिथि क्या है?"
          : "What is Tithi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "तिथि सूर्य और चंद्रमा के बीच के कोणीय अंतर पर आधारित वैदिक समय इकाई है।"
            : "Tithi is a Vedic time unit based on the angular distance between the Sun and Moon.",
        },
      },
      {
        "@type": "Question",
        name: isHi
          ? "एक चंद्र मास में कितनी तिथियाँ होती हैं?"
          : "How many Tithis are there in a lunar month?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "एक चंद्र मास में कुल 30 तिथियाँ होती हैं, जिनमें 15 शुक्ल पक्ष और 15 कृष्ण पक्ष की तिथियाँ शामिल होती हैं।"
            : "There are 30 Tithis in a lunar month, including 15 Shukla Paksha and 15 Krishna Paksha Tithis.",
        },
      },
      {
        "@type": "Question",
        name: isHi
          ? "शुक्ल पक्ष और कृष्ण पक्ष में क्या अंतर है?"
          : "What is the difference between Shukla Paksha and Krishna Paksha?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "शुक्ल पक्ष अमावस्या से पूर्णिमा तक तथा कृष्ण पक्ष पूर्णिमा से अमावस्या तक चलता है।"
            : "Shukla Paksha runs from Amavasya to Purnima, while Krishna Paksha runs from Purnima to Amavasya.",
        },
      },
      {
        "@type": "Question",
        name: isHi
          ? "क्या तिथि मुहूर्त चयन में महत्वपूर्ण है?"
          : "Is Tithi important for Muhurat selection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "हाँ, तिथि मुहूर्त चयन के सबसे महत्वपूर्ण पंचांग तत्वों में से एक मानी जाती है।"
            : "Yes, Tithi is one of the most important Panchang factors used in Muhurat selection.",
        },
      },
      {
        "@type": "Question",
        name: isHi
          ? "सबसे महत्वपूर्ण तिथियाँ कौन सी हैं?"
          : "Which Tithis are considered most important?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "एकादशी, पूर्णिमा, अमावस्या, चतुर्थी और प्रदोष से जुड़ी तिथियाँ विशेष महत्व रखती हैं।"
            : "Ekadashi, Purnima, Amavasya and Chaturthi are among the most significant Tithis.",
        },
      },
      {
        "@type": "Question",
        name: isHi
          ? "क्या प्रत्येक तिथि का अलग महत्व होता है?"
          : "Does every Tithi have a unique significance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isHi
            ? "हाँ, प्रत्येक तिथि का अपना स्वभाव, देवता, धार्मिक महत्व और पारंपरिक उपयोग माना जाता है।"
            : "Yes, every Tithi has its own nature, deity, spiritual significance and traditional applications.",
        },
      },
    ],
  };

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
        name: isHi ? "पंचांग" : "Panchang",
        item: isHi
          ? "https://www.jyotishasha.com/hi/panchang"
          : "https://www.jyotishasha.com/panchang",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isHi ? "तिथि" : "Tithi",
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isHi
      ? "हिंदू पंचांग की तिथियाँ"
      : "Hindu Panchang Tithis",
    description: isHi
      ? "तिथि, पक्ष, प्रमुख तिथियाँ, व्रत और मुहूर्त में तिथि के महत्व की विस्तृत जानकारी।"
      : "Learn about Tithis, Paksha, important lunar days, observances and the role of Tithi in Muhurat selection.",
    url: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

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