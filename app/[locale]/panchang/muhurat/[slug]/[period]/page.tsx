import { muhurthTopics } from "@/app/[locale]/panchang/muhurat/muhurth_topics";
import { CtaMuhurth, CtaKundali, CtaReport } from "@/components/cta";
import { faq_muhurth } from "@/app/data/faq_muhurth";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

// 🧩 Importing Our New "Tunch" Components
import { DynamicHero } from "@/components/muhurat/DynamicHero";
import { PrimeDates } from "@/components/muhurat/PrimeDates";
import { QuickActionGrid } from "@/components/muhurat/QuickActionGrid";
import { ZodiacVibeScroll } from "@/components/muhurat/ZodiacVibeScroll";
import { ExpandableDates } from "@/components/muhurat/ExpandableDates";
import { MuhurthArtFaq } from "@/components/muhurat/MuhurthArtFaq";
import UpcomingMonths from "@/components/muhurat/UpcomingMonths";
import {
  getMonthNumber,
  getTargetYear,
} from "@/lib/months";
import AnnualMuhuratPage from "@/components/muhurat/AnnualMuhuratPage";
import { DEFAULT_OG_IMAGE, SITE_URL, toISTDatePublished } from "@/lib/seo/articleSchema";


export const revalidate = 86400;

// 🔍 SEO & Metadata (Ranking Priority)
export async function generateMetadata({
  params,
}: {
  params: {
    locale: string;
    slug: string;
    period: string;
  };
}) {

  const isHi = params.locale === "hi";

  const topic = muhurthTopics[params.slug];

  if (!topic) {
    return {
      title: "Not Found",
    };
  }

  const isYear = /^\d{4}$/.test(params.period);

  if (isYear) {

    const canonical =
      `https://www.jyotishasha.com${
        isHi ? "/hi" : ""
      }/panchang/muhurat/${
        params.slug
      }/${params.period}`;

    return {

      title: isHi
        ? `${topic.title_hi || topic.title} ${params.period}`
        : `${topic.title} ${params.period}`,

      description: isHi
        ? `${params.period} के लिए ${topic.title_hi || topic.title} कैलेंडर, शुभ तिथियाँ, मासिक मुहूर्त और पंचांग आधारित मार्गदर्शन।`
        : `${topic.title} ${params.period} calendar with auspicious dates, monthly Muhurat guides, Panchang analysis and yearly planning.`,

      keywords: topic.keywords || [],

      alternates: {
        canonical,
      },

      openGraph: {
        title: isHi
          ? `${topic.title_hi || topic.title} ${params.period}`
          : `${topic.title} ${params.period}`,

        description: isHi
          ? `${params.period} के लिए वार्षिक मुहूर्त कैलेंडर।`
          : `${params.period} annual Muhurat calendar.`,

        url: canonical,

        images: [
          "/og/muhurat-base.jpg",
        ],

        type: "website",
      },

      twitter: {
        card: "summary_large_image",

        title: isHi
          ? `${topic.title_hi || topic.title} ${params.period}`
          : `${topic.title} ${params.period}`,

        description: isHi
          ? `${params.period} के लिए वार्षिक मुहूर्त कैलेंडर।`
          : `${params.period} annual Muhurat calendar.`,

        images: [
          "/og/muhurat-base.jpg",
        ],
      },
    };
  }

  const monthNumber =
    getMonthNumber(params.period);

  if (!monthNumber) {
    notFound();
  }

  const year =
    getTargetYear(monthNumber);

  const month = params.period;

  const title = isHi
    ? `${topic.title_hi || topic.title} – ${month} ${year}`
    : `${topic.title} – ${month} ${year}`;

  const description = isHi
    ? (topic.description_hi || topic.description)
    : topic.description;

  const canonical =
    `https://www.jyotishasha.com${
      isHi ? "/hi" : ""
    }/panchang/muhurat/${params.slug}/${params.period}`;

  return {
    title,

    description,

    keywords: topic.keywords || [],

    alternates: {
      canonical,
    },

    openGraph: {
      title,

      description,

      url: canonical,

      images: [
        "/og/muhurat-base.jpg",
      ],

      type: "article",
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [
        "/og/muhurat-base.jpg",
      ],
    },
  };
}

// 📡 Data Fetching from Backend
async function getMonthMuhurth(
  activity: string,
  month: number,
  lang: string
) {

  if (activity === "grahpravesh-muhurat") {
    activity = "grahpravesh";
  }

  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/muhurth/month",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        activity,
        month,
        year: getTargetYear(month),
        latitude: 26.8467,
        longitude: 80.9462,
        language: lang,
      }),

      next: {
        revalidate: 86400,
      },
    }
  );

  const data = await res.json();

  return data.results || [];
}

export default async function MuhuratPage({
  params,
}: {
  params: {
    locale: string;
    slug: string;
    period: string;
  };
}) {
  const { locale, slug, period } = params;

  const isYear = /^\d{4}$/.test(period);


  const isHi = locale === "hi";
  const topic = muhurthTopics[slug];
  
  if (!topic) return null;

  if (isYear) {
    return (
      <AnnualMuhuratPage
        slug={slug}
        locale={locale}
        year={Number(period)}
        topic={topic}
      />
    );
  }

  const monthNumber = getMonthNumber(period);

    if (!monthNumber) {
    notFound();
    }

    const dates = await getMonthMuhurth(
    topic.activity,
    monthNumber,
    locale
    );


  const monthName =
    period.charAt(0).toUpperCase() +
    period.slice(1);

  const year =
    getTargetYear(monthNumber);

  const currentCanonical =
    `https://www.jyotishasha.com${
    isHi ? "/hi" : ""
    }/panchang/muhurat/${slug}/${period}`;

  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "Article",

    headline: isHi
        ? (topic.title_hi || topic.title)
        : topic.title,

    description: isHi
      ? (topic.description_hi || topic.description)
      : topic.description,

    image:
      "https://www.jyotishasha.com/og/muhurat-base.jpg",

    datePublished: toISTDatePublished(),

    author: {
      "@type": "Organization",

      name: "Jyotishasha",

      url: SITE_URL,
    },

    publisher: {
      "@type": "Organization",

      name: "Jyotishasha",

      logo: {
        "@type": "ImageObject",

        url: DEFAULT_OG_IMAGE,
      },
    },

    mainEntityOfPage: currentCanonical,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: isHi
          ? "पंचांग"
          : "Panchang",

        item:
          `https://www.jyotishasha.com${
            isHi ? "/hi" : ""
          }/panchang`,
      },

      {
        "@type": "ListItem",

        position: 2,

        name: isHi
          ? "मुहूर्त"
          : "Muhurat",

        item:
          `https://www.jyotishasha.com${
            isHi ? "/hi" : ""
          }/panchang/muhurat`,
      },

      {
        "@type": "ListItem",

        position: 3,

        name: isHi
          ? topic.title_hi
          : topic.title,

        item: currentCanonical,
      },
    ],
  };

  // Helper for PrimeDates Summary
  const getSummary = (score: number) => {
    const s = Math.round(score);
    if (isHi) return s >= 6 ? "बेहद शुभ दिन" : "अनुकूल समय";
    return s >= 6 ? "Highly Auspicious" : "Favorable Time";
  };

  return (
    <>
  <Script
    id="muhurat-article-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd),
    }}
  />

  <Script
    id="muhurat-breadcrumb-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(breadcrumbLd),
    }}
  />

    <article className="max-w-6xl mx-auto px-4 py-10 text-white leading-relaxed">
      
      {/* 1️⃣ SEO Dynamic Hero */}
      <DynamicHero 
        title={isHi ? (topic.title_hi || topic.title) : topic.title} 
        month={monthName} 
        year={year} 
        isHi={isHi} 
        locale={locale} 
      />


      {/* 🚀 2️⃣ Side-by-Side Grid: Prime Dates + Quick Actions */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Top 3 Dates (7 cols on Desktop) */}
        <div className="lg:col-span-7">
          <PrimeDates 
            dates={dates} 
            isHi={isHi} 
            monthName={monthName} 
            getSummary={getSummary} 
          />
        </div>

        {/* Right: Personal Intent CTA (5 cols on Desktop) */}
        <div className="lg:col-span-5">
          <QuickActionGrid 
            activity={topic.activity} 
            locale={locale} 
            isHi={isHi} 
          />
        </div>

      </section>

      <UpcomingMonths
        locale={locale}
        slug={slug}
        title={
          isHi
            ? (topic.title_hi || topic.title)
            : topic.title
        }
      />

      {/* 3️⃣ Zodiac Scroll (Full Width) */}
      <div className="my-4">
        <ZodiacVibeScroll locale={locale} isHi={isHi} />
      </div>

      {/* 4️⃣ Full Expandable Dates Table (Default Closed) */}
      <ExpandableDates 
        dates={dates} 
        isHi={isHi} 
        monthName={monthName} 
        year={year} 
      />

      {/* 📝 Ranking Content (SEO Insight) */}
      <section className="my-16 prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-purple-200 mb-6 border-b border-white/10 pb-2">
           {isHi ? `${topic.title_hi.split(" – ")[0]} का महत्व और शास्त्र` : `Significance of ${topic.title.split(" – ")[0]}`}
        </h2>
        <div className="text-gray-300 text-sm md:text-base space-y-5 leading-loose">
           {isHi
            ? (topic.description_hi || topic.description)
            : topic.description}
        </div>
      </section>

      <CtaKundali />

      {/* 5️⃣ FAQ Section (Rich Snippets) */}
      <div className="mt-16">
        <MuhurthArtFaq 
          faqs={faq_muhurth[topic.activity] || []} 
          isHi={isHi} 
          activityName={isHi ? topic.title_hi.split(" – ")[0] : topic.title.split(" – ")[0]} 
        />
      </div>

      {/* Standard Bottom CTAs */}
      <div className="space-y-6 mt-12">
        <CtaMuhurth slug={slug} />
        <CtaReport />
      </div>

      {/* 🔗 Related Guides Footer */}
      <footer className="mt-20 pt-10 border-t border-white/10">
        <h3 className="text-xl font-black text-purple-200 mb-8 uppercase tracking-widest text-center md:text-left">
          {isHi ? "अन्य महत्वपूर्ण मुहूर्त" : "Explore More Guides"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
           {Object.values(muhurthTopics)
            .filter((t: any) => t.slug !== slug)
            .slice(0, 6)
            .map((t: any) => (
             <Link 
                key={t.slug} 
                href={`/${locale}/panchang/muhurat/${t.slug}/${period}`} 
                className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center hover:bg-white/10 hover:border-purple-500/30 transition-all group shadow-sm"
             >
                <span className="text-xs font-bold text-purple-300 group-hover:text-white">
                  {isHi ? t.title_hi.split(" – ")[0] : t.title.split(" – ")[0]}
                </span>
             </Link>
           ))}
        </div>
      </footer>
    </article>
</>
);
}