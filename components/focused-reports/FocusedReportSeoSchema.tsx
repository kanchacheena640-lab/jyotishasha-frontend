// components/focused-reports/FocusedReportSeoSchema.tsx
//
// Product + Offer + FAQPage + BreadcrumbList JSON-LD, modeled on
// components/reports/ReportSeoSchema.tsx's existing shape -- adapted, not
// copied verbatim, for two reasons specific to a NEW, not-yet-activated
// focused report:
//   - availability is NEVER assumed: it comes only from the backend
//     ReportProduct.active flag (the same gate order creation enforces) via
//     offerAvailability() -- inactive -> OutOfStock, unknown -> omitted
//     (F10-P15; previously always omitted while every product was inactive).
//   - no `image`: no product photography exists yet for the 63 focused
//     reports (unlike the 25 standard reports' public/reports/*.webp).
//     Omitted rather than pointed at a non-existent/generic asset.
// Ratings/reviews appear only from genuine published verified-buyer reviews
// (reviewSchemaFields), matching the visible review section. No sales-count
// or popularity claims are made anywhere here.
// Plain <script> elements (not next/script) so the JSON-LD is in the initial
// server HTML; the page itself stays noindex (see the route's generateMetadata).
import { SITE_URL } from "@/lib/seo/articleSchema";
import { serializeJsonLd } from "@/lib/reportProductSeo";
import { offerAvailability, reviewSchemaFields, type ReviewSummary } from "@/lib/reportReviews";
import type { FocusedReportConfig } from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";

interface Props {
  config: FocusedReportConfig;
  title: string;
  locale: Locale;
  /** F10-P15: registry active flag for config.questionKey (null = unknown -> no claim). */
  active?: boolean | null;
  /** F10-P15: published verified-buyer reviews (the same summary rendered on the page). */
  reviews?: ReviewSummary | null;
}

export default function FocusedReportSeoSchema({ config, title, locale, active = null, reviews = null }: Props) {
  const canonical = `${SITE_URL}${locale === "hi" ? "/hi" : ""}/reports/focused/${config.humanSlug}`;
  const offerState = offerAvailability(active);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: config.metaDescription[locale],
    brand: { "@type": "Brand", name: "Jyotishasha" },
    ...reviewSchemaFields(reviews),
    offers: {
      "@type": "Offer",
      url: canonical,
      price: config.priceRupees,
      priceCurrency: "INR",
      ...(offerState ? { availability: offerState } : {}),
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

  // BreadcrumbList is rendered by ProductBreadcrumb on the page, together
  // with the visible trail it describes.
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
    </>
  );
}
