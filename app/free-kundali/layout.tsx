// app/free-kundali/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Free Janma Kundali Online | Birth Chart by Date, Time & Place | Jyotishasha",
  description:
    "Generate your Free Janma Kundali online using your date, time, and place of birth. Get detailed planetary positions, yogas, and remedies powered by Jyotishasha modern astrology engine.",
  keywords: [
    "Free Kundali",
    "Janma Kundali Online",
    "Free Birth Chart",
    "Kundali by Date of Birth",
    "Free Horoscope",
    "Online Janam Kundli",
    "Jyotishasha Astrology",
    "Free Vedic Kundali Maker",
  ],
  alternates: {
    canonical: "https://www.jyotishasha.com/free-kundali",
  },
  openGraph: {
    title: "Free Janma Kundali Online | Jyotishasha",
    description:
      "Create your accurate Free Kundali online. Powered by Jyotishasha – detailed planetary positions, houses, yogas & remedies instantly.",
    url: "https://www.jyotishasha.com/free-kundali",
    siteName: "Jyotishasha",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og/free-kundali-og.jpg",
        width: 1200,
        height: 630,
        alt: "Free Kundali Online - Jyotishasha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Janma Kundali Online | Jyotishasha",
    description:
      "Generate your Free Kundali based on date, time & place of birth with Jyotishasha modern astrology engine.",
    images: ["/og/free-kundali-og.jpg"],
    creator: "@jyotishasha",
  },
  other: {
    "theme-color": "#4f46e5",
    "application-name": "Jyotishasha Free Kundali",
  },
};

// ✅ Schema.org JSON-LD for SEO Rich Snippet
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Kundali Generator",
  url: "https://www.jyotishasha.com/free-kundali",
  operatingSystem: "Web",
  applicationCategory: "Astrology Tool",
  author: {
    "@type": "Organization",
    name: "Jyotishasha",
    url: "https://www.jyotishasha.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1200",
  },
  potentialAction: {
    "@type": "Action",
    name: "Generate Free Kundali",
    target: "https://www.jyotishasha.com/free-kundali",
  },
};

export default function FreeKundaliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ✅ Global Structured Data for the entire Free Kundali section */}
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
