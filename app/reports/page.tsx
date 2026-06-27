import type { Metadata } from "next";
import ReportsPageClient from "./ReportsPageClient";

const SITE_URL = "https://www.jyotishasha.com";

export const metadata: Metadata = {
  title: "Astrology Reports - Kundali, Career, Love & More | Jyotishasha",
  description:
    "Get detailed Vedic astrology reports on career, love, marriage, finance and more. Expert analysis based on your birth chart.",
  alternates: {
    canonical: `${SITE_URL}/reports`,
  },
  openGraph: {
    title: "Astrology Reports - Kundali, Career, Love & More | Jyotishasha",
    description:
      "Get detailed Vedic astrology reports on career, love, marriage, finance and more. Expert analysis based on your birth chart.",
    url: `${SITE_URL}/reports`,
    type: "website",
    siteName: "Jyotishasha",
  },
};

export default function ReportsPage() {
  return <ReportsPageClient />;
}
