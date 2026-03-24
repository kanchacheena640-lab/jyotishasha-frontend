import { muhurthTopics, GLOBAL_OG_IMAGE } from "@/app/[locale]/panchang/muhurat/muhurth_topics";

export async function generateMetadata({ params }: { params: { locale: string, slug: string } }) {
  // 1. Get Locale and Topic
  const locale = params.locale;
  const isHi = locale === "hi";
  const topic = muhurthTopics[params.slug] as any;

  // 2. Format Month (Locale based)
  const month = new Date().toLocaleString(isHi ? "hi-IN" : "en-US", { 
    month: "long", 
    year: "numeric" 
  });

  // 3. Fallback if topic not found
  if (!topic) {
    return {
      title: isHi ? "शुभ मुहूर्त | ज्‍योतिष आशा" : "Shubh Muhurat | Jyotishasha",
      description: isHi 
        ? "हिंदू पंचांग पर आधारित अपडेटेड शुभ मुहूर्त तिथियां देखें।" 
        : "Explore updated auspicious muhurat dates based on Hindu Panchang.",
      openGraph: { images: [GLOBAL_OG_IMAGE] },
      alternates: { canonical: `https://www.jyotishasha.com${isHi ? '/hi' : ''}/panchang/muhurat/` },
    };
  }

  // 4. Dynamic Title & Description (Hybrid Logic)
  const displayTitle = isHi ? (topic.title_hi || topic.title) : topic.title;
  const displayDesc = isHi ? (topic.description_hi || topic.description) : topic.description;

  const metaTitle = `${displayTitle} – ${month}`;
  const metaDesc = `${displayDesc} ${isHi ? `${month} के लिए अपडेटेड।` : `Updated for ${month}.`} ${isHi ? 'हिंदू पंचांग के अनुसार शुभ तिथियां जांचें।' : 'Check monthly Shubh dates as per Hindu Panchang.'}`;

  // 5. Canonical Path Fix
  const currentCanonical = `https://www.jyotishasha.com${isHi ? '/hi' : ''}/panchang/muhurat/${params.slug}`;

  // ✅ Structured-data schema blocks
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentCanonical,
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
      { "@type": "ListItem", position: 1, name: isHi ? "पंचांग" : "Panchang", item: `https://www.jyotishasha.com${isHi ? '/hi' : ''}/panchang` },
      { "@type": "ListItem", position: 2, name: isHi ? "मुहूर्त" : "Muhurat", item: `https://www.jyotishasha.com${isHi ? '/hi' : ''}/panchang/muhurat` },
      { "@type": "ListItem", position: 3, name: displayTitle.split(" – ")[0], item: currentCanonical },
    ],
  };

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: topic.keywords,
    alternates: { canonical: currentCanonical },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: currentCanonical,
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