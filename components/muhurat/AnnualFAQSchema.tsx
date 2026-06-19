import Script from "next/script";

type FAQ = {
  q: string;
  a: string;
};

type Props = {
  faqs: FAQ[];
};

export default function AnnualFAQSchema({
  faqs,
}: Props) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqs.map(
      (faq) => ({
        "@type": "Question",
        name: faq.q,

        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })
    ),
  };

  return (
    <Script
      id="annual-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}