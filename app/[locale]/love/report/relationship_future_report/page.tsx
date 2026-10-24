import RelationshipFutureReportForm from "./RelationshipFutureReportForm";
import { Metadata } from "next";
import { reportsData } from "@/app/data/reportsData";
import { SITE_URL } from "@/lib/seo/articleSchema";
import { RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG, serializeJsonLd } from "@/lib/reportProductSeo";

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

export default function ReportPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  const { name, description } = copy(isHi);
  const canonical = canonicalFor(isHi);

  // Personalized PDF delivered by email: no shippingDetails, and no
  // availability claim (the frontend has no trusted view of the backend
  // registry's active flag -- F10-P03 unresolved item).
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: [`${SITE_URL}${catalogEntry.image}`],
    description,
    brand: { "@type": "Brand", name: "Jyotishasha" },
    offers: {
      "@type": "Offer",
      url: canonical,
      price: catalogEntry.price,
      priceCurrency: "INR",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
  };

  const base = `${SITE_URL}${isHi ? "/hi" : ""}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isHi ? "होम" : "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: isHi ? "प्रेम" : "Love", item: `${base}/love` },
      { "@type": "ListItem", position: 3, name, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      {/* Razorpay is loaded on demand by the useReportPurchase hook inside
          RelationshipFutureReportForm, only when the user actually pays --
          not eagerly here on every page load. */}
      <div className="text-center bg-[#0f0a1e] pt-10 pb-2 px-4">
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
    </>
  );
}
