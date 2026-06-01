import Script from "next/script";

interface Props {
  report: any;
  seoContent: any;
}

export default function ReportSeoSchema({
  report,
  seoContent,
}: Props) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: report.title?.en || report.title,
    description:
      seoContent?.seoDescription ||
      report.shortDescription?.en ||
      "",
    brand: {
      "@type": "Brand",
      name: "Jyotishasha",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.jyotishasha.com/reports/${report.slug}`,
      price: report.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity:
      seoContent?.faqs?.en?.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })) || [],
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
        name: "Reports",
        item: "https://www.jyotishasha.com/reports",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: report.title?.en || report.title,
        item: `https://www.jyotishasha.com/reports/${report.slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id={`product-schema-${report.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {seoContent?.faqs?.length > 0 && (
        <Script
          id={`faq-schema-${report.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <Script
        id={`breadcrumb-schema-${report.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

