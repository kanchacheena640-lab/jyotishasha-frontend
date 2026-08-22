import type { Metadata } from "next";
import Link from "next/link";
import ReportsPageClient from "./ReportsPageClient";
import { reportsData } from "@/app/data/reportsData";

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
  return (
    <>
      {/* Server-rendered, crawlable link list. ReportsPageClient's cards use
          button+router.push() for navigation (no real <a href>), so without
          this, no report detail page has a discoverable link in the initial
          HTML. Visually hidden (sr-only) — does not change the visible UI. */}
      <nav className="sr-only" aria-label="All reports">
        {reportsData.map((report) => (
          <Link key={report.slug} href={`/reports/${report.slug}`}>
            {report.title.en}
          </Link>
        ))}
      </nav>
      <ReportsPageClient />
    </>
  );
}
