// components/focused-reports/FocusedReportSeoSchema.tsx
//
// Product + Offer + FAQPage + BreadcrumbList JSON-LD, modeled on
// components/reports/ReportSeoSchema.tsx's existing shape -- adapted, not
// copied verbatim, for two reasons specific to a NEW, not-yet-activated
// focused report:
//   - no `availability` claim: the backend ReportProduct row is
//     deliberately active=False right now (P0.2/P0.3's approved rollout
//     gate) -- claiming "InStock" would be false. availability is simply
//     omitted (a valid, optional Offer field) rather than any invented
//     value.
//   - no `image`: no product photography exists yet for the 63 focused
//     reports (unlike the 25 standard reports' public/reports/*.webp).
//     Omitted rather than pointed at a non-existent/generic asset.
// No ratings, reviews or sales-count claims are made anywhere here.
import Script from "next/script";
import { SITE_URL } from "@/lib/seo/articleSchema";
import type { FocusedReportConfig } from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";

interface Props {
  config: FocusedReportConfig;
  title: string;
  locale: Locale;
}

export default function FocusedReportSeoSchema({ config, title, locale }: Props) {
  const canonical = `${SITE_URL}${locale === "hi" ? "/hi" : ""}/reports/focused/${config.humanSlug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: config.metaDescription[locale],
    brand: { "@type": "Brand", name: "Jyotishasha" },
    offers: {
      "@type": "Offer",
      url: canonical,
      price: config.priceRupees,
      priceCurrency: "INR",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question[locale],
      acceptedAnswer: { "@type": "Answer", text: faq.answer[locale] },
    })),
  };

  const base = `${SITE_URL}${locale === "hi" ? "/hi" : ""}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "hi" ? "होम" : "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: locale === "hi" ? "रिपोर्ट्स" : "Reports", item: `${SITE_URL}/reports` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };

  return (
    <>
      <Script id={`focused-product-schema-${config.questionKey}-${locale}`} type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Script id={`focused-faq-schema-${config.questionKey}-${locale}`} type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`focused-breadcrumb-schema-${config.questionKey}-${locale}`} type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
