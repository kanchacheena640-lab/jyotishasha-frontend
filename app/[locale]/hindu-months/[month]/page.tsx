import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL, DEFAULT_OG_IMAGE, buildBreadcrumbSchema, buildFAQPageSchema, toISTDatePublished } from '@/lib/seo/articleSchema';
import { hinduMonthsData, MonthSlug } from '@/lib/data/hinduMonthsData';
import HinduMonthHero from '@/components/hindu-months/HinduMonthHero';
import HinduMonthQuickFacts from '@/components/hindu-months/HinduMonthQuickFacts';
import HinduMonthIntroduction from '@/components/hindu-months/HinduMonthIntroduction';
import HinduMonthNavigation from '@/components/hindu-months/HinduMonthNavigation';
import HinduMonthContextComponents from '@/components/hindu-months/HinduMonthContextComponents';

export const revalidate = 3600;

export async function generateStaticParams() {
  return (["en", "hi"] as const).flatMap((locale) =>
    Object.keys(hinduMonthsData).map((month) => ({
      locale,
      month,
    }))
  );
}

export async function generateMetadata({ params }: { params: { locale: string; month: string } }): Promise<Metadata> {
  const isHi = params.locale === 'hi';
  const monthData = hinduMonthsData[params.month as MonthSlug];
  if (!monthData) return {};

  const title = isHi ? monthData.seo.title.hi : monthData.seo.title.en;
  const description = isHi ? monthData.seo.description.hi : monthData.seo.description.en;
  const canonical = `${SITE_URL}${isHi ? "/hi" : ""}/hindu-months/${params.month}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/hindu-months/${params.month}`,
        hi: `${SITE_URL}/hi/hindu-months/${params.month}`,
        "x-default": `${SITE_URL}/hindu-months/${params.month}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [monthData.seo.ogImage || DEFAULT_OG_IMAGE],
    },
    twitter: {
      title,
      description,
      images: [monthData.seo.ogImage || DEFAULT_OG_IMAGE],
      card: "summary_large_image",
    },
  };
}

export default function MonthPage({ params }: { params: { month: string; locale: string } }) {
  const isHi = params.locale === 'hi';
  const monthData = hinduMonthsData[params.month as MonthSlug];
  if (!monthData) notFound();

  const langPath = isHi ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${langPath}/hindu-months/${params.month}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isHi ? monthData.seo.title.hi : monthData.seo.title.en,
    description: isHi ? monthData.seo.description.hi : monthData.seo.description.en,
    image: monthData.seo.ogImage || DEFAULT_OG_IMAGE,
    datePublished: toISTDatePublished(),
    author: { "@type": "Organization", name: "Jyotishasha", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Jyotishasha" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isHi ? "होम" : "Home", url: langPath || "/" },
    { name: isHi ? "हिंदू कैलेंडर के महीने" : "Hindu Calendar Months", url: `${langPath}/hindu-months` },
    { name: isHi ? monthData.basic.hindiName : monthData.basic.englishName, url: `${langPath}/hindu-months/${params.month}` },
  ]);

  const faqSchema = buildFAQPageSchema(
    monthData.faqs.map((f) => ({
      q: isHi ? f.question.hi : f.question.en,
      a: isHi ? f.answer.hi : f.answer.en,
    }))
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HinduMonthHero data={monthData.hero} basic={monthData.basic} isHi={isHi} />
      <HinduMonthQuickFacts data={monthData.quickFacts} isHi={isHi} />
      <HinduMonthIntroduction data={monthData.introduction} isHi={isHi} />
      <HinduMonthContextComponents data={monthData} isHi={isHi} />
      <HinduMonthNavigation data={monthData.crossLinks} locale={params.locale} />
    </main>
  );
}
