import type { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === 'hi';

  const title = isHi 
    ? "फ्री ऑनलाइन जन्म कुंडली | नाम और जन्म तिथि से कुंडली बनाएं | Jyotishasha"
    : "Free Janma Kundali Online | Vedic Birth Chart by Date & Time | Jyotishasha";

  const description = isHi
    ? "अपनी सटीक जन्म कुंडली ऑनलाइन प्राप्त करें। इसमें ग्रहों की स्थिति, अष्टकवर्ग, और दोषों का विस्तृत विश्लेषण पाएं।"
    : "Generate your accurate Vedic Birth Chart (Free Kundali) online. Get professional insights into planetary positions, yogas, and life predictions.";

  const baseUrl = "https://www.jyotishasha.com";
  const path = "/free-kundali";

  return {
    title,
    description,
    // 🌍 SEO Fix: Canonical aur Alternates (Google ko batana ki do versions hain)
    alternates: {
      canonical: `${baseUrl}${isHi ? '/hi' : ''}${path}`,
      languages: {
        'en-US': `${baseUrl}${path}`,
        'hi-IN': `${baseUrl}/hi${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${isHi ? '/hi' : ''}${path}`,
      siteName: "Jyotishasha",
      locale: isHi ? "hi_IN" : "en_US",
      type: "website",
      images: [{ url: "/og/free-kundali-og.jpg" }],
    },
    keywords: isHi 
      ? ["फ्री कुंडली", "ऑनलाइन जन्म कुंडली", "नाम से कुंडली", "ज्योतिष", "Kundli in Hindi"]
      : ["Free Kundali", "Vedic Birth Chart", "Janma Kundali Online", "Astrology Chart", "Horoscope Maker"],
  };
}

export default async function FreeKundaliLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } = await params;
  const isHi = locale === 'hi';

  // ✅ Schema.org Fix: Locale specific URL and Name
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": isHi ? "फ्री कुंडली जनरेटर" : "Free Kundali Generator",
    "url": `https://www.jyotishasha.com${isHi ? '/hi' : ''}/free-kundali`,
    "operatingSystem": "Web",
    "applicationCategory": "Astrology Tool",
    "author": {
      "@type": "Organization",
      "name": "Jyotishasha",
      "url": "https://www.jyotishasha.com",
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1200",
    }
  };

  return (
    <>
      <Script
        id="free-kundali-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {children}
    </>
  );
}