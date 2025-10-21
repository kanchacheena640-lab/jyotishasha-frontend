import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Free Kundali Report | Online Janma Kundali Result | Jyotishasha",
  description:
    "View your personalized Free Kundali report online with complete planetary positions, Lagna, Moon Sign, Yogas, and gemstone recommendations. Powered by Jyotishasha modern astrology engine.",
  keywords: [
    "Free Kundali Report",
    "Online Janma Kundali",
    "Free Birth Chart Result",
    "Lagna and Moon Sign",
    "Jyotishasha Astrology",
    "Planetary Yogas and Remedies",
  ],
  robots: {
    index: false, // 🚫 No indexing for dynamic personalized results
    follow: true, // ✅ Allow internal links to be followed
  },
  alternates: {
    canonical: "https://www.jyotishasha.com/free-kundali", // ✅ Consolidates SEO authority
  },
  openGraph: {
    title: "Your Free Kundali Report | Jyotishasha",
    description:
      "Discover your detailed Janma Kundali generated instantly by Jyotishasha — includes planetary insights, Yogas, and gemstone remedies.",
    url: "https://www.jyotishasha.com/free-kundali/free-birthchart-result",
    siteName: "Jyotishasha",
    type: "article",
    locale: "en_IN",
    images: [
      {
        url: "/og/free-kundali-result-og.jpg",
        width: 1200,
        height: 630,
        alt: "Free Janma Kundali Report - Jyotishasha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Free Kundali Result | Jyotishasha",
    description:
      "Personalized Janma Kundali report — planetary details, yogas, and gemstone suggestions powered by Jyotishasha.",
    images: ["/og/free-kundali-result-og.jpg"],
    creator: "@jyotishasha",
  },
  other: {
    "theme-color": "#4f46e5",
    "application-name": "Jyotishasha Free Kundali Result",
  },
};

export default function FreeBirthchartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
