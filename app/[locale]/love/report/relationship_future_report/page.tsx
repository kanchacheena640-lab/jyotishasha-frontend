import RelationshipFutureReportForm from "./RelationshipFutureReportForm";
import { Metadata } from "next";
import { reportsData } from "@/app/data/reportsData";
import { SITE_URL } from "@/lib/seo/articleSchema";
import { RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG, serializeJsonLd } from "@/lib/reportProductSeo";
import ProductBreadcrumb from "@/components/reports/ProductBreadcrumb";
import PurchasePolicyLinks from "@/components/reports/PurchasePolicyLinks";
import ProductReviews from "@/components/reports/ProductReviews";
import { fetchProductActive, fetchReviewSummary, offerAvailability, reviewSchemaFields } from "@/lib/reportReviews";

// Single source for price and image: the report catalog (₹199, same as the
// backend registry seed). Never hard-code the price here.
const catalogEntry = reportsData.find((r) => r.slug === RELATIONSHIP_REPORT_SLUG)!;

function copy(isHi: boolean) {
  return {
    name: isHi ? "रिलेशनशिप भविष्य रिपोर्ट" : "Relationship Future Report",
    description: isHi
      ? "विवाह की सफलता और भविष्य की पूरी गहराई से जानकारी प्राप्त करें।"
      : "Get deep insights into marriage success and future compatibility.",
  };
}

function canonicalFor(isHi: boolean) {
  return `${SITE_URL}${isHi ? "/hi" : ""}${RELATIONSHIP_REPORT_PATH}`;
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const { name, description } = copy(isHi);
  const canonical = canonicalFor(isHi);
  return {
    title: isHi ? `${name} | ज्‍योतिष आशा` : `${name} | Jyotishasha`,
    description,
    alternates: {
      canonical,
      languages: {
        en: canonicalFor(false),
        hi: canonicalFor(true),
        "x-default": canonicalFor(false),
      },
    },
    openGraph: {
      title: name,
      description,
      url: canonical,
      type: "website",
      images: [{ url: `${SITE_URL}${catalogEntry.image}` }],
    },
  };
}

export default async function ReportPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  const { name, description } = copy(isHi);
  const canonical = canonicalFor(isHi);
  // F10-P15: registry active flag + published verified-buyer reviews (null = unknown -> no claim).
  const [active, reviews] = await Promise.all([
    fetchProductActive(RELATIONSHIP_REPORT_SLUG),
    fetchReviewSummary(RELATIONSHIP_REPORT_SLUG),
  ]);
  const availability = offerAvailability(active);

  // Personalized PDF delivered by email: no shippingDetails. availability only
  // from the registry flag order creation enforces; ratings only from the
  // published reviews rendered below.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: [`${SITE_URL}${catalogEntry.image}`],
    description,
    brand: { "@type": "Brand", name: "Jyotishasha" },
    ...reviewSchemaFields(reviews),
    offers: {
      "@type": "Offer",
      url: canonical,
      price: catalogEntry.price,
      priceCurrency: "INR",
      ...(availability ? { availability } : {}),
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
  };

  const prefix = isHi ? "/hi" : "";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productSchema) }} />
      {/* Razorpay is loaded on demand by the useReportPurchase hook inside
          RelationshipFutureReportForm, only when the user actually pays --
          not eagerly here on every page load. */}
      <div className="text-center bg-[#0f0a1e] pt-10 pb-2 px-4">
        <ProductBreadcrumb
          items={[
            { name: isHi ? "होम" : "Home", path: prefix },
            { name: isHi ? "कुंडली मिलान" : "Kundli Matching", path: `${prefix}/kundli-matching` },
            { name, path: `${prefix}${RELATIONSHIP_REPORT_PATH}` },
          ]}
        />
        <h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
          💞 {name}
        </h1>
        {/* Server-rendered price + format, so the offer is visible in the
            initial HTML (the form below is a client component). */}
        <p className="mt-3 text-sm md:text-base text-slate-300">
          <strong className="text-white">{isHi ? "मूल्य:" : "Price:"}</strong> ₹{catalogEntry.price}
          <span className="mx-2 text-purple-400">|</span>
          {isHi ? "PDF रिपोर्ट, ईमेल पर" : "PDF report, delivered by email"}
        </p>
      </div>
      <RelationshipFutureReportForm locale={params.locale} />
      <div className="bg-[#0f0a1e]">
        <PurchasePolicyLinks lang={isHi ? "hi" : "en"} />
        <ProductReviews summary={reviews} lang={isHi ? "hi" : "en"} />
      </div>
    </>
  );
}
