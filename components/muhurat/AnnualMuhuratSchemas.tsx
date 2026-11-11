import Script from "next/script";
import { SITE_URL } from "@/lib/seo/articleSchema";


type Props = {
  title: string;
  year: number;
  locale: string;
  slug: string;
};

export default function AnnualMuhuratSchemas({
  title,
  year,
  locale,
  slug,
}: Props) {

  const baseUrl =
    `${SITE_URL}${
      locale === "hi" ? "/hi" : ""
    }/panchang/muhurat/${slug}/${year}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Panchang",
        item:
          `${SITE_URL}${
            locale === "hi" ? "/hi" : ""
          }/panchang`,
      },
      // Parent is the topic page: "/panchang/muhurat" has no Muhurat page (it falls through
      // to /panchang/[date] and renders today's Panchang).
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item:
          `${SITE_URL}${
            locale === "hi" ? "/hi" : ""
          }/panchang/muhurat/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${title} ${year}`,
        item: baseUrl,
      },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: `${title} ${year}`,

    url: baseUrl,

    description:
      `${title} ${year} annual muhurat calendar with monthly auspicious dates and detailed monthly guides.`,
  };

  return (
    <>
      <Script
        id="annual-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd
          ),
        }}
      />

      <Script
        id="annual-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionLd
          ),
        }}
      />
    </>
  );
}