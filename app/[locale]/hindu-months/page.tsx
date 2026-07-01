import { Metadata } from 'next';
import { SITE_URL, DEFAULT_OG_IMAGE, buildBreadcrumbSchema, buildFAQPageSchema, buildItemListSchema } from '@/lib/seo/articleSchema';
import { hinduMonthsData } from '@/lib/data/hinduMonthsData';
import HinduMonthsHero from '@/components/hindu-months/HinduMonthsHero';
import CurrentHinduMonth from '@/components/hindu-months/CurrentHinduMonth';
import HinduMonthsGrid from '@/components/hindu-months/HinduMonthsGrid';
import HinduMonthsIntroduction from '@/components/hindu-months/HinduMonthsIntroduction';
import HinduMonthsPanchangContext from '@/components/hindu-months/HinduMonthsPanchangContext';
import HinduMonthsFAQ from '@/components/hindu-months/HinduMonthsFAQ';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === 'hi';
  const title = isHi ? "हिंदू कैलेंडर के महीने | ज्योतिष आशा" : "Hindu Calendar Months | Jyotishasha";
  const description = isHi
    ? "हिंदू पंचांग के 12 पवित्र चंद्र महीनों के बारे में जानें — ऋतु, नक्षत्र, त्योहार और मुहूर्त।"
    : "Explore the 12 sacred months of the Hindu lunisolar calendar — Ritu, Nakshatra, festivals and muhurat.";
  const canonical = `${SITE_URL}${isHi ? "/hi" : ""}/hindu-months`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/hindu-months`,
        hi: `${SITE_URL}/hi/hindu-months`,
        "x-default": `${SITE_URL}/hindu-months`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      card: "summary_large_image",
    },
  };
}

export default function HinduMonthsPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === 'hi';
  const langPath = isHi ? "/hi" : "";

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isHi ? "होम" : "Home", url: langPath || "/" },
    { name: isHi ? "हिंदू कैलेंडर के महीने" : "Hindu Calendar Months", url: `${langPath}/hindu-months` },
  ]);

  const hubFaqs = isHi
    ? [
        { q: "हिंदू पंचांग में कितने महीने होते हैं?", a: "हिंदू पंचांग में 12 चंद्र महीने होते हैं, जिनमें अधिक वर्ष में 13वां अधिक मास भी जुड़ सकता है।" },
        { q: "नामकरण नक्षत्र का क्या महत्व है?", a: "चंद्र मास का नाम पारंपरिक रूप से उस महीने की पूर्णिमा के निकटतम नक्षत्र के नाम पर रखा जाता है।" },
        { q: "अमांत और पूर्णिमांत प्रणाली क्या है?", a: "अमांत प्रणाली में महीना अमावस्या पर समाप्त होता है (दक्षिण भारत में प्रचलित); पूर्णिमांत में पूर्णिमा पर (उत्तर भारत में प्रचलित)।" },
      ]
    : [
        { q: "How many months are in the Hindu calendar?", a: "There are 12 lunar months in the Hindu calendar, with a 13th intercalary month (Adhik Maas) added in leap years." },
        { q: "What is the significance of the naming Nakshatra?", a: "The lunar month is traditionally named after the nakshatra nearest to the full moon (Purnima) within that month." },
        { q: "What is the Amanta vs Purnimanta system?", a: "In the Amanta system the month ends on Amavasya (followed in South India); in Purnimanta it ends on Purnima (followed in North India)." },
      ];

  const faqSchema = buildFAQPageSchema(hubFaqs.map(f => ({ q: f.q, a: f.a })));

  const itemListSchema = buildItemListSchema(
    Object.entries(hinduMonthsData).map(([slug, data]) => ({
      name: isHi ? data.basic.hindiName : data.basic.englishName,
      url: `${langPath}/hindu-months/${slug}`,
    }))
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HinduMonthsHero isHi={isHi} />
      <CurrentHinduMonth isHi={isHi} />
      <HinduMonthsIntroduction isHi={isHi} />
      <HinduMonthsGrid locale={params.locale} />
      <HinduMonthsPanchangContext isHi={isHi} />
      <HinduMonthsFAQ faqs={hubFaqs} isHi={isHi} />
    </main>
  );
}
