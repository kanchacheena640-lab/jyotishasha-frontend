// app/[locale]/reports/focused/page.tsx
//
// The customer-facing hub for all 63 focused reports, grouped under the 8
// authoritative categories (app/data/intentCatalog.ts's own
// intentCategories, EN/HI labels already exactly match this task's
// requested category names -- not re-typed here). A sibling of
// app/[locale]/reports/focused/[slug]/page.tsx, not a new route tree:
// Next.js resolves the bare `/reports/focused` path to this page and
// `/reports/focused/<slug>` to the dynamic one with no conflict.
//
// FINAL layout (this task): compact Hero -> Browse by Category (nav) ->
// Popular Reports -> 8 category sections. Cards show the CUSTOMER QUESTION
// as primary content (never the report title or category name), price
// once, then Proceed (primary) + View Sample (secondary). The sample/
// preview resolution itself (getFocusedReportSampleOrPreviewHref --
// #62/#63 real PDFs, the other 61 the shared generic Example Report
// preview) is untouched by this layout change -- same import, same call.
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo/articleSchema";
import { intentCategories, intentQuestions, getIntentQuestion, localized, type IntentCategoryId } from "@/app/data/intentCatalog";
import {
  getFocusedReportConfigBySlug,
  questionKeyToHumanSlug,
  FEATURED_FOCUSED_QUESTION_KEYS,
  getFocusedReportSampleOrPreviewHref,
} from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";

type Params = { locale: string };

function toLocale(raw: string): Locale {
  return raw === "hi" ? "hi" : "en";
}

// ONE card shape, reused for both Popular Reports and every category
// section -- the customer question is the primary content (never the
// report title or category name), price shown once, then Proceed
// (primary CTA) + View Sample (secondary, unchanged sample/preview
// resolution). A plain <div> (not itself a <Link>): it needs TWO separate
// clickable targets, and nesting an <a> inside a <Link> would be invalid
// HTML. Dark-lavender surface, clearly separated from the page background,
// subtle purple border -- no gradient/glow.
function FocusedReportCard({
  humanSlug, questionKey, hookText, priceRupees, locale, prefix,
}: {
  humanSlug: string; questionKey: string; hookText: string;
  priceRupees: number; locale: Locale; prefix: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-purple-500/25 bg-[#1c1640] p-5 hover:border-purple-400/50 transition-colors">
      <p className="text-white font-semibold text-base leading-snug mb-4 flex-1">{hookText}</p>
      <p className="text-purple-300 font-bold text-lg mb-3">₹{priceRupees}</p>
      <div className="flex items-center gap-4">
        <Link href={`${prefix}/reports/focused/${humanSlug}`} className="text-sm font-bold text-purple-300 hover:text-white transition-colors">
          {locale === "hi" ? "आगे बढ़ें →" : "Proceed →"}
        </Link>
        <a
          href={getFocusedReportSampleOrPreviewHref(questionKey, locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-slate-400 hover:text-purple-300 transition-colors underline underline-offset-2"
        >
          {locale === "hi" ? "Sample देखें" : "View Sample"}
        </a>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const path = "/reports/focused";
  const canonical = `${SITE_URL}${locale === "hi" ? "/hi" : ""}${path}`;
  const title = locale === "hi" ? "फोकस्ड ज्योतिष रिपोर्ट्स -- ₹51" : "Focused Astrology Reports -- ₹51";
  const description =
    locale === "hi"
      ? "आपकी अपनी जन्म कुंडली पर आधारित, एक खास सवाल का सीधा जवाब देने वाली ₹51 की व्यक्तिगत रिपोर्ट्स।"
      : "Personalized ₹51 reports that answer one specific question directly, built from your own birth chart.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: `${SITE_URL}${path}`, hi: `${SITE_URL}/hi${path}`, "x-default": `${SITE_URL}${path}` },
    },
    // Deliberately noindex until product activation/commercial-page
    // selection is handled separately; no sitemap entry either.
    robots: { index: false, follow: true },
    openGraph: { title, description, url: canonical, type: "website", siteName: "Jyotishasha" },
  };
}

export default function FocusedReportsHubPage({ params }: { params: Params }) {
  const locale = toLocale(params.locale);
  const prefix = locale === "hi" ? "/hi" : "";

  const byCategory: Record<IntentCategoryId, typeof intentQuestions> = {} as Record<IntentCategoryId, typeof intentQuestions>;
  for (const category of intentCategories) byCategory[category.categoryId] = [];
  for (const question of intentQuestions) byCategory[question.category].push(question);

  return (
    <div className="min-h-screen bg-[#0b0620] px-4 py-10">
      {/* 1. Compact Hero */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <p className="text-sm font-semibold tracking-wide uppercase text-purple-400 mb-2">
          {locale === "hi" ? "व्यक्तिगत ज्योतिष रिपोर्ट्स" : "Personalized Astrology Reports"}
        </p>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
          {locale === "hi" ? "फोकस्ड रिपोर्ट्स" : "Focused Reports"}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          {locale === "hi"
            ? "हर रिपोर्ट एक खास सवाल का सीधा जवाब देती है -- आपकी अपनी जन्म कुंडली और मौजूदा दशा/गोचर पर आधारित। सिर्फ ₹51।"
            : "Each report directly answers one specific question -- built from your own birth chart and current Dasha/transits. Just ₹51."}
        </p>
      </div>

      {/* 2. Browse by Category -- immediately after the hero, before Popular Reports. */}
      <h2 className="max-w-5xl mx-auto text-2xl font-bold text-white mb-6 text-center">
        {locale === "hi" ? "श्रेणी के अनुसार देखें" : "Browse by Category"}
      </h2>
      <nav className="max-w-5xl mx-auto mb-14 flex flex-wrap justify-center gap-2">
        {intentCategories.map((category) => (
          <a
            key={category.categoryId}
            href={`#category-${category.categoryId}`}
            className="rounded-full border border-purple-400/30 px-4 py-1.5 text-sm text-purple-300 hover:border-purple-300 hover:text-white transition-colors"
          >
            {localized(category.label, locale)}
          </a>
        ))}
      </nav>

      {/* 3. Popular Reports -- a fixed, curated merchandising shortlist
          (app/data/focusedReportsConfig.ts::FEATURED_FOCUSED_QUESTION_KEYS),
          NOT computed from real purchase/order data (none exists yet to
          compute from) and never claiming any purchase ranking/statistics.
          No badge -- price appears once per card, in the card body itself. */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {locale === "hi" ? "लोकप्रिय रिपोर्ट्स" : "Popular Reports"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_FOCUSED_QUESTION_KEYS.map((questionKey) => {
            const humanSlug = questionKeyToHumanSlug(questionKey);
            const config = getFocusedReportConfigBySlug(humanSlug);
            const question = getIntentQuestion(questionKey);
            if (!config || !question) return null; // defensive only -- every featured key is a real catalog entry
            return (
              <FocusedReportCard
                key={questionKey}
                humanSlug={humanSlug}
                questionKey={questionKey}
                hookText={localized(question.question, locale)}
                priceRupees={config.priceRupees}
                locale={locale}
                prefix={prefix}
              />
            );
          })}
        </div>
      </div>

      {/* 4. 8 category sections, all 63 reports. */}
      <div className="max-w-5xl mx-auto space-y-16">
        {intentCategories.map((category) => {
          const questions = byCategory[category.categoryId];
          return (
            <section key={category.categoryId} id={`category-${category.categoryId}`} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-purple-500/20 pb-3">
                {localized(category.label, locale)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {questions.map((question) => {
                  const humanSlug = questionKeyToHumanSlug(question.questionKey);
                  const config = getFocusedReportConfigBySlug(humanSlug);
                  if (!config) return null; // defensive only -- every real question_key always resolves
                  return (
                    <FocusedReportCard
                      key={question.questionKey}
                      humanSlug={humanSlug}
                      questionKey={question.questionKey}
                      hookText={localized(question.question, locale)}
                      priceRupees={config.priceRupees}
                      locale={locale}
                      prefix={prefix}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
