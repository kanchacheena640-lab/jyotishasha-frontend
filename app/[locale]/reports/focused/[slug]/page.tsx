// app/[locale]/reports/focused/[slug]/page.tsx
//
// P0.4 -- ONE reusable dynamic route for focused reports (not one page per
// product). Locale-scoped from day one (app/[locale]/..., matching the
// authority-engine convention) -- deliberately avoiding the hreflang gap
// the existing /reports/[slug] route has (that route is NOT locale-scoped;
// Hindi there is a same-URL client-side toggle, never a crawlable, distinct
// URL). `slug` is the cosmetic, human-readable SEO segment
// (e.g. "major-kundali-obstacles"); the ONE trusted identity anything
// payment-related uses is `question_key`, resolved here ONCE via
// getFocusedReportConfigBySlug() and passed down as data -- never
// re-derived from the URL/visible text downstream.
//
// PILOT-ONLY (P0.4): only the 2 approved slugs exist in
// FOCUSED_REPORTS_CONFIG. Any other value -- including any of the other 61
// real question_keys -- resolves to notFound(), by construction (this
// route does not read the full 63-question intentCatalog to resolve a
// slug, only the pilot config).
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/articleSchema";
import {
  FOCUSED_REPORTS_CONFIG,
  getFocusedReportConfigBySlug,
  getFocusedReportCatalogEntry,
  listFocusedReportHumanSlugs,
} from "@/app/data/focusedReportsConfig";
import { localized } from "@/app/data/intentCatalog";
import type { Locale } from "@/lib/authority-engine/types";
import FocusedReportHero from "@/components/focused-reports/FocusedReportHero";
import FocusedReportCheckout from "@/components/focused-reports/FocusedReportCheckout";
import FocusedReportDetails from "@/components/focused-reports/FocusedReportDetails";
import RelatedFocusedReports from "@/components/focused-reports/RelatedFocusedReports";
import FocusedReportSeoSchema from "@/components/focused-reports/FocusedReportSeoSchema";

export const revalidate = 86400;

type Params = { locale: string; slug: string };

function toLocale(raw: string): Locale {
  return raw === "hi" ? "hi" : "en";
}

// SSG for exactly the pilot slugs -- never all 63 (P0.4's own "pilot-only
// discovery" requirement). A future task extends this list only once a
// product is approved for its own SEO rollout.
export async function generateStaticParams() {
  return listFocusedReportHumanSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const config = getFocusedReportConfigBySlug(params.slug);
  if (!config) return {};

  const locale = toLocale(params.locale);
  const title = config.title[locale];

  const path = `/reports/focused/${config.humanSlug}`;
  const canonical = `${SITE_URL}${locale === "hi" ? "/hi" : ""}${path}`;

  return {
    title,
    description: config.metaDescription[locale],
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}${path}`,
        hi: `${SITE_URL}/hi${path}`,
        "x-default": `${SITE_URL}${path}`,
      },
    },
    // Deliberate: P0.4's own "no sitemap inclusion yet" / "pilot-only
    // discovery" requirement. The page is directly reachable by URL for
    // QA and stakeholder review, but not yet offered to Google as a page
    // worth indexing -- the product itself is still active=False on the
    // backend and cannot be purchased. Revisit once activation (a
    // separate, later, explicit step) has happened.
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description: config.metaDescription[locale],
      url: canonical,
      type: "website",
      siteName: "Jyotishasha",
    },
  };
}

export default function FocusedReportPage({ params }: { params: Params }) {
  const config = getFocusedReportConfigBySlug(params.slug);
  if (!config) notFound();

  const locale = toLocale(params.locale);
  const title = config.title[locale];
  // The exact customer question/hook -- read live from intentCatalog (never hand-typed), so
  // this can never drift from the backend's own authoritative wording.
  const { question } = getFocusedReportCatalogEntry(config);
  const questionText = localized(question.question, locale);

  const otherSlug = Object.keys(FOCUSED_REPORTS_CONFIG).find((slug) => slug !== config.humanSlug);
  const otherConfig = otherSlug ? FOCUSED_REPORTS_CONFIG[otherSlug] : undefined;
  const otherTitle = otherConfig ? otherConfig.title[locale] : undefined;

  return (
    <div className="min-h-screen bg-[#0b0620]">
      <FocusedReportHero config={config} title={title} question={questionText} locale={locale} />
      <FocusedReportCheckout config={config} locale={locale} />
      <FocusedReportDetails config={config} locale={locale} />
      {otherSlug && otherConfig && otherTitle && (
        <RelatedFocusedReports otherSlug={otherSlug} otherTitle={otherTitle} priceRupees={otherConfig.priceRupees} locale={locale} />
      )}
      <FocusedReportSeoSchema config={config} title={title} locale={locale} />
    </div>
  );
}
