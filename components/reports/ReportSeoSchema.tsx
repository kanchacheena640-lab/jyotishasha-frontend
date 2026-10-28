import { SITE_URL } from "@/lib/seo/articleSchema";
import { getReportDisplayName, serializeJsonLd } from "@/lib/reportProductSeo";
import { offerAvailability, reviewSchemaFields, type ReviewSummary } from "@/lib/reportReviews";

interface Props {
  report: any;
  seoContent: any;
  /** F10-P15: backend registry active flag (null = unknown -> no claim). */
  active?: boolean | null;
  /** F10-P15: published verified-buyer reviews (null = unavailable -> no rating). */
  reviews?: ReviewSummary | null;
}

// Plain <script> elements (not next/script) so the JSON-LD is in the initial
// server HTML -- Google warns that JS-injected Product markup makes Shopping
// crawls less frequent and less reliable.
export default function ReportSeoSchema({
  report,
  seoContent,
  active = null,
  reviews = null,
}: Props) {
  const url = `${SITE_URL}/reports/${report.slug}`;
  const name = getReportDisplayName(report, seoContent, "en");
  // F10-P15: the page passes the live registry state and published reviews
  // (the SAME summary it renders visibly); null -> no claim is made.
  const availability = offerAvailability(active);

  const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",

  name,

  image: [`${SITE_URL}${report.image}`],

  description:
    seoContent?.seoDescription?.en ||
    report.shortDescription?.en ||
    report.description?.en ||
    "",

  brand: {
    "@type": "Brand",
    name: "Jyotishasha",
  },

  ...reviewSchemaFields(reviews),

  // Personalized PDF delivered by email: no shippingDetails (nothing is
  // shipped). availability comes only from the backend registry's active flag
  // (the same flag order creation enforces); unknown -> omitted.
  offers: {
    "@type": "Offer",
    url,
    price: report.price,
    priceCurrency: "INR",
    ...(availability ? { availability } : {}),

    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnNotPermitted",
    },
  },
};

  // BreadcrumbList is rendered by ProductBreadcrumb (app/reports/[slug]/page.tsx)
  // together with the visible trail it describes.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(productSchema) }}
    />
  );
}
