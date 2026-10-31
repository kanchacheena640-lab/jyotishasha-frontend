import type { Metadata } from "next";
import Link from "next/link";
import ReportsPageClient from "./ReportsPageClient";
import { reportsData } from "@/app/data/reportsData";
import { getReportProductPath } from "@/lib/reportProductSeo";
import {
  FEATURED_FOCUSED_QUESTION_KEYS,
  getFocusedReportConfigBySlug,
  questionKeyToHumanSlug,
} from "@/app/data/focusedReportsConfig";

const SITE_URL = "https://www.jyotishasha.com";

const featuredFocusedReports = FEATURED_FOCUSED_QUESTION_KEYS.flatMap((questionKey) => {
  const config = getFocusedReportConfigBySlug(questionKeyToHumanSlug(questionKey));
  return config ? [{ href: `/reports/focused/${config.humanSlug}`, title: config.seo?.h1.en ?? config.title.en }] : [];
});

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
          <Link key={report.slug} href={getReportProductPath(report.slug)}>
            {report.title.en}
          </Link>
        ))}
      </nav>
      <ReportsPageClient />
      {/* F12 SEO: crawlable, server-rendered links from this indexable page to
          focused report product pages (one featured report per category, the
          same list the focused hub features), plus the full hub. */}
      <section aria-labelledby="focused-reports-heading" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 id="focused-reports-heading" className="text-xl font-bold text-white mb-4">
          Popular focused questions — ₹51 each
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredFocusedReports.map(({ href, title }) => (
            <li key={href}>
              <Link href={href} className="block rounded-xl border border-purple-400/30 bg-white/5 px-4 py-3 text-slate-200 hover:border-purple-400/60 hover:bg-white/10 transition-colors">
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/reports/focused" className="mt-4 inline-block text-purple-300 font-medium text-sm hover:underline">
          See all 63 focused reports
        </Link>
      </section>
    </>
  );
}
