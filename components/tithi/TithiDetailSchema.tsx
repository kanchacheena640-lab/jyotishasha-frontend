interface FaqItem {
  question: string;
  answer: string;
  question_hi: string;
  answer_hi: string;
}

interface Props {
  locale: string;
  slug: string;
  title: string;
  description: string;
  faq: FaqItem[];
}

export default function TithiDetailSchema({
  locale,
  slug,
  title,
  description,
  faq,
}: Props) {
  const isHi = locale === "hi";

  const pageUrl = isHi
    ? `https://www.jyotishasha.com/hi/panchang/tithi/${slug}`
    : `https://www.jyotishasha.com/panchang/tithi/${slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: isHi ? item.question_hi : item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isHi ? item.answer_hi : item.answer,
      },
    })),
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
        item: isHi
          ? "https://www.jyotishasha.com/hi/panchang/tithi"
          : "https://www.jyotishasha.com/panchang/tithi",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: pageUrl,
      },
    ],
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
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
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}