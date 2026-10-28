import { notFound, permanentRedirect } from "next/navigation";
import ReportCheckout from "@/components/reports/ReportCheckout";
import ReportSeoSchema from "@/components/reports/ReportSeoSchema";
import ReportContent from "@/components/reports/ReportContent";
import ReportContentDetails from "@/components/reports/ReportContentDetails";
import RelatedReports from "@/components/reports/RelatedReports";
import ProductBreadcrumb from "@/components/reports/ProductBreadcrumb";
import ProductReviews from "@/components/reports/ProductReviews";
import { fetchProductActive, fetchReviewSummary } from "@/lib/reportReviews";

import { reportsData } from "@/app/data/reportsData";
import { reportSeoContent } from "@/app/data/reportSeoContent";
import { reportRelations } from "@/app/data/reportRelations";
import { getReportDisplayName, RELATIONSHIP_REPORT_PATH, RELATIONSHIP_REPORT_SLUG } from "@/lib/reportProductSeo";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const report = reportsData.find(
    (r) => r.slug === params.slug
  );

  if (!report) {
    return {
      title: "Report Not Found | Jyotishasha",
    };
  }

  const seo =
    reportSeoContent[
      report.slug as keyof typeof reportSeoContent
    ];

  const title =
    seo?.seoTitle?.en ||
    report.seoTitle?.en ||
    `${report.title.en} | Jyotishasha`;

  const description =
    seo?.seoDescription?.en ||
    report.seoDescription?.en ||
    report.description.en;

  const canonicalUrl =
    `https://www.jyotishasha.com/reports/${report.slug}`;

  return {
    title,
    description,

    keywords:
      seo?.targetKeywords ||
      report.keywords ||
      [],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: report.image,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [report.image],
    },
  };
}

export default async function ReportPage({ params }: Props) {
  // next.config.js already 301s this URL; this server-side fallback keeps the
  // route from ever rendering an empty page if that redirect is bypassed.
  if (params.slug === RELATIONSHIP_REPORT_SLUG) {
    permanentRedirect(RELATIONSHIP_REPORT_PATH);
  }

  const report = reportsData.find(
    (r) => r.slug === params.slug
  );

  if (!report) {
    notFound();
  }

  const seo =
    reportSeoContent[
      params.slug as keyof typeof reportSeoContent
    ];

  const relatedSlugs =
    reportRelations[report.slug] ?? [];

  const relatedReports =
    reportsData.filter((r) =>
      relatedSlugs.includes(r.slug)
    );

  // F10-P15: fetched ONCE and used for both the visible reviews and the
  // Product JSON-LD, so markup always matches the page. null -> no claim.
  const [active, reviews] = await Promise.all([
    fetchProductActive(report.slug),
    fetchReviewSummary(report.slug),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* /reports is English-only; the last crumb is the same name as the
          server-rendered H1 and the Product schema. */}
      <ProductBreadcrumb
        items={[
          { name: "Home", path: "" },
          { name: "Reports", path: "/reports" },
          { name: getReportDisplayName(report, seo, "en"), path: `/reports/${report.slug}` },
        ]}
      />

      <ReportContent
        report={report}
        seo={seo}
      />

      <ReportCheckout />

      <ReportContentDetails
        report={report}
        seo={seo}
      />

      <ProductReviews summary={reviews} lang="en" />

      <RelatedReports
        reports={relatedReports}
      />

      <ReportSeoSchema
        report={report}
        seoContent={seo}
        active={active}
        reviews={reviews}
      />
    </div>
  );
}
