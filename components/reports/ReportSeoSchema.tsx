import { SITE_URL } from "@/lib/seo/articleSchema";
import { getReportDisplayName, serializeJsonLd } from "@/lib/reportProductSeo";

interface Props {
  report: any;
  seoContent: any;
}

// Plain <script> elements (not next/script) so the JSON-LD is in the initial
// server HTML -- Google warns that JS-injected Product markup makes Shopping
// crawls less frequent and less reliable.
export default function ReportSeoSchema({
  report,
  seoContent,
}: Props) {
  const url = `${SITE_URL}/reports/${report.slug}`;
  const name = getReportDisplayName(report, seoContent, "en");

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

  // Personalized PDF delivered by email: no shippingDetails (nothing is
  // shipped), and no availability claim -- the frontend has no trusted view of
  // the backend registry's active flag, so "InStock" could not be verified
  // (availability is a recommended, not required, Offer property).
  offers: {
    "@type": "Offer",
    url,
    price: report.price,
    priceCurrency: "INR",

    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnNotPermitted",
    },
  },
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
        name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
    </>
  );
}
