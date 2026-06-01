import { notFound } from "next/navigation";
import ReportCheckout from "@/components/reports/ReportCheckout";
import { reportsData } from "@/app/data/reportsData";
import { reportSeoContent } from "@/app/data/reportSeoContent";
import ReportSeoSchema from "@/components/reports/ReportSeoSchema";
import ReportContent from "@/components/reports/ReportContent";
import ReportContentDetails from "@/components/reports/ReportContentDetails";


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


export default function ReportPage({ params }: Props) {
  const report = reportsData.find(
    (r) => r.slug === params.slug
  );

  const seo =
    reportSeoContent[
      params.slug as keyof typeof reportSeoContent
  ];

  if (!report) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <ReportContent
        report={report}
        seo={seo}
      />

      <ReportCheckout />

      <ReportContentDetails
        report={report}
        seo={seo}
      />

      <ReportSeoSchema
        report={report}
        seoContent={seo}
      />

    </div>
  );
}