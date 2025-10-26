import { muhurthTopics, GLOBAL_OG_IMAGE } from "@/app/panchang/muhurat/muhurth_topics";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = muhurthTopics[params.slug];
  const month = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

  if (!topic) {
    return {
      title: "Shubh Muhurat | Jyotishasha",
      description: "Explore updated auspicious muhurat dates based on Hindu Panchang.",
      openGraph: { title: "Shubh Muhurat | Jyotishasha", images: [GLOBAL_OG_IMAGE] },
      alternates: { canonical: "https://www.jyotishasha.com/panchang/muhurat/" },
    };
  }

  const metaTitle = `${topic.title} – ${month}`;
  const metaDesc = `${topic.description} Updated for ${month}. Check monthly Shubh dates as per Hindu Panchang.`;

  // ✅ Structured-data schema blocks
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": topic.canonical,
    },
    headline: metaTitle,
    description: metaDesc,
    image: GLOBAL_OG_IMAGE,
    author: {
      "@type": "Organization",
      name: "Jyotishasha",
      url: "https://www.jyotishasha.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Jyotishasha",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jyotishasha.com/logo.png",
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Panchang", item: "https://www.jyotishasha.com/panchang" },
      { "@type": "ListItem", position: 2, name: "Muhurat", item: "https://www.jyotishasha.com/panchang/muhurat" },
      { "@type": "ListItem", position: 3, name: topic.title.split(" – ")[0], item: topic.canonical },
    ],
  };

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: topic.keywords,
    alternates: { canonical: topic.canonical },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: topic.canonical,
      type: "article",
      images: [GLOBAL_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [GLOBAL_OG_IMAGE],
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
      "script:ld+json-2": JSON.stringify(breadcrumbLd),
    },
  };
}
