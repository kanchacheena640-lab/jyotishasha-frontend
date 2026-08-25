import Script from "next/script";
import { SITE_URL } from "@/lib/seo/articleSchema";

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

  image: [report.image],

  description:
    seoContent?.seoDescription?.en ||
    report.shortDescription?.en ||
    report.description?.en ||
    "",

  brand: {
    "@type": "Brand",
    name: "Jyotishasha",
  },

  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/reports/${report.slug}`,
    price: report.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",

    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "INR",
      },
    },

    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnNotPermitted",
    },
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
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reports",
        item: `${SITE_URL}/reports`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: report.title?.en || report.title,
        item: `${SITE_URL}/reports/${report.slug}`,
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

