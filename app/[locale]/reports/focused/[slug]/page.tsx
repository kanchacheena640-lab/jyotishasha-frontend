// app/[locale]/reports/focused/[slug]/page.tsx
//
// ONE reusable dynamic route for ALL 63 focused reports (not one page per
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
// P0.7 -- ALL 63 catalog products are now routable (bespoke copy for the
// 2 pilots, generic-but-honest copy built from catalog data for the other
// 61 -- see app/data/focusedReportsConfig.ts's own module docstring).
// SELF (person_mode="single", 54) renders FocusedReportCheckout; DUAL
// (person_mode="dual", 9) renders FocusedDualReportCheckout. Availability
// (61 of the 63 are still active=False on the backend) is NOT tracked or
// guessed here -- the existing backend rejection at order-creation time
// (OrderService.create_pending_order) is the ONE source of truth, reused
// unchanged for every product, active or not.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/articleSchema";
import {
  getFocusedReportConfigBySlug,
  getFocusedReportCatalogEntry,
  listFocusedReportHumanSlugs,
  getRelatedFocusedReports,
} from "@/app/data/focusedReportsConfig";
import { localized } from "@/app/data/intentCatalog";
import type { Locale } from "@/lib/authority-engine/types";
import FocusedReportHero from "@/components/focused-reports/FocusedReportHero";
import FocusedReportCheckout from "@/components/focused-reports/FocusedReportCheckout";
import FocusedDualReportCheckout from "@/components/focused-reports/FocusedDualReportCheckout";
import FocusedReportDetails from "@/components/focused-reports/FocusedReportDetails";
import RelatedFocusedReports from "@/components/focused-reports/RelatedFocusedReports";
import FocusedReportSeoSchema from "@/components/focused-reports/FocusedReportSeoSchema";
import ProductBreadcrumb from "@/components/reports/ProductBreadcrumb";
import PurchasePolicyLinks from "@/components/reports/PurchasePolicyLinks";
import ProductReviews from "@/components/reports/ProductReviews";
import { fetchProductActive, fetchReviewSummary } from "@/lib/reportReviews";

export const revalidate = 86400;

type Params = { locale: string; slug: string };

function toLocale(raw: string): Locale {
  return raw === "hi" ? "hi" : "en";
}

// SSG for all 63 real catalog products -- pilot-only discovery ended once
// #62/#63 were approved for production activation; every other product is
// reachable for QA/browsing (see Phase 5's own "accessible but not
// purchasable" requirement), still noindex (see generateMetadata below).
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
    // P0.7 Phase 7 -- deliberately still noindex for ALL 63 (not just the
    // 61 inactive ones): SEO/indexing is a separate, later step taken
    // only after product activation and commercial-page selection. The
    // page is directly reachable by URL for QA/manual browsing either way.
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

export default async function FocusedReportPage({ params }: { params: Params }) {
  const config = getFocusedReportConfigBySlug(params.slug);
  if (!config) notFound();
  // F10-P15: backend product key = question_key. Fetched once for both the
  // visible reviews and the Product JSON-LD (null -> no claim).
  const [active, reviews] = await Promise.all([
    fetchProductActive(config.questionKey),
    fetchReviewSummary(config.questionKey),
  ]);

  const locale = toLocale(params.locale);
  const title = config.title[locale];
  // The exact customer question/hook -- read live from intentCatalog (never hand-typed), so
  // this can never drift from the backend's own authoritative wording.
  const { question } = getFocusedReportCatalogEntry(config);
  const questionText = localized(question.question, locale);
  const isDual = question.personMode === "dual";

  // Related cross-link: up to 3 OTHER products in the same category (never
  // self), resolved through app/data/focusedReportsConfig.ts::
  // getRelatedFocusedReports() -- the SAME getFocusedReportConfigBySlug()
  // every page uses under the hood, so each card always has a real, valid
  // destination, bespoke or generic alike. Deterministic catalog order.
  const relatedItems = getRelatedFocusedReports(config, 3).map((related) => ({
    slug: related.humanSlug,
    title: related.title[locale],
    priceRupees: related.priceRupees,
  }));

  return (
    <div className="min-h-screen bg-[#0b0620]">
      {/* Real user path: /reports -> /reports/focused (hub) -> product. The
          /reports catalogue is English-only, so it has no /hi variant. */}
      <div className="px-4 pt-6">
        <ProductBreadcrumb
          items={[
            { name: locale === "hi" ? "होम" : "Home", path: locale === "hi" ? "/hi" : "" },
            { name: locale === "hi" ? "रिपोर्ट्स" : "Reports", path: "/reports" },
            { name: locale === "hi" ? "फोकस्ड रिपोर्ट्स" : "Focused Reports", path: `${locale === "hi" ? "/hi" : ""}/reports/focused` },
            { name: title, path: `${locale === "hi" ? "/hi" : ""}/reports/focused/${config.humanSlug}` },
          ]}
        />
      </div>
      <FocusedReportHero config={config} title={title} question={questionText} locale={locale} />
      {isDual ? (
        <FocusedDualReportCheckout config={config} locale={locale} />
      ) : (
        <FocusedReportCheckout config={config} locale={locale} />
      )}
      {/* The checkouts already show secure-payment and WhatsApp-support lines. */}
      <PurchasePolicyLinks lang={locale === "hi" ? "hi" : "en"} variant="refund" />
      <FocusedReportDetails config={config} locale={locale} />
      <ProductReviews summary={reviews} lang={locale === "hi" ? "hi" : "en"} />
      <RelatedFocusedReports items={relatedItems} locale={locale} />
      <FocusedReportSeoSchema config={config} title={title} locale={locale} active={active} reviews={reviews} />
    </div>
  );
}
