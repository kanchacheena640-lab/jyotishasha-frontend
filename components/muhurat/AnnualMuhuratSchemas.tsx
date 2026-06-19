import Script from "next/script";


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
    `https://www.jyotishasha.com${
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
          `https://www.jyotishasha.com${
            locale === "hi" ? "/hi" : ""
          }/panchang`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Muhurat",
        item:
          `https://www.jyotishasha.com${
            locale === "hi" ? "/hi" : ""
          }/panchang/muhurat`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
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