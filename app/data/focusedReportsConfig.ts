// app/data/focusedReportsConfig.ts

/**
 * Focused Reports (₹51) -- frontend presentation/SEO/routing config.
 *
 * This file intentionally holds ONLY what app/data/intentCatalog.json (the
 * exact export of the backend's authoritative catalog) does NOT already
 * supply: a human-readable SEO slug, marketing/landing-page copy, benefits,
 * FAQ, and category label -- never the question_key, never the EN/HI
 * title/question text itself, which are always read live from
 * intentCatalog.ts (getIntentQuestion / resolveIntentSelection) so this
 * file can never drift from the backend's own wording.
 *
 * TWO TIERS, same FocusedReportConfig shape either way (P0.7 -- all 63
 * routable):
 *   1. BESPOKE (FOCUSED_REPORTS_CONFIG below): exactly the 2 pilots that
 *      have hand-authored landing copy, approved and E2E-proven in
 *      production. Untouched by this phase.
 *   2. GENERIC (buildGenericFocusedReportConfig): the other 61. Built ONLY
 *      from authoritative fields -- question_key, category, person_mode
 *      (intentCatalog.ts) and title (focusedReportTitles.json, itself a
 *      verbatim export of the backend's own modules/focused_reports/
 *      prompt_specs.py -- never hand-typed). Every other string is fixed,
 *      generic, equally-true-for-any-focused-report boilerplate (payment/
 *      delivery mechanics, the same trust/disclaimer language #62/#63
 *      already use) -- never a specific claim about what a given report's
 *      content contains, since that is not something this layer knows.
 *      getFocusedReportConfigBySlug() checks tier 1 first, then tier 2 --
 *      a product promoted to bespoke copy later just needs a
 *      FOCUSED_REPORTS_CONFIG entry added; nothing else changes.
 *
 * SECURITY: `humanSlug` is a purely cosmetic URL identifier. The stable
 * identity used for anything that reaches the backend (order creation,
 * analytics dimensions, catalog lookups) is ALWAYS `questionKey` --
 * resolved from `humanSlug` once, at the route boundary
 * (getFocusedReportConfigBySlug), and never re-derived from visible text.
 * The slug<->question_key transform (questionKeyToHumanSlug /
 * humanSlugToQuestionKey) is a plain, bijective underscore<->hyphen swap --
 * safe because every real question_key is already lower_snake_case only
 * (enforced by lib/intentCatalog.test.ts), so it can never collide.
 */
import {
  getIntentQuestion, getIntent, intentQuestions, intentCategories,
  type IntentCategoryId, type IntentQuestion,
} from "./intentCatalog";
import focusedReportTitlesData from "./focusedReportTitles.json";
import { FOCUSED_REPORT_SEO_CONTENT, type FocusedReportSeoContent } from "./focused-report-content";
import { majorKundaliObstacles } from "./focused-report-content/major_kundali_obstacles";
import { majorKundaliStrengths } from "./focused-report-content/major_kundali_strengths";
// Relative, not the @/ alias -- matches this file's own existing import
// convention (everything else here is relative), and keeps this file
// compilable standalone by the plain `tsc` invocation
// lib/focusedReportsConfig.test.ts documents (which doesn't pass
// -p tsconfig.json, so path aliases aren't resolved there).
import { getReportSampleUrl } from "../../lib/reportSamples";

const FOCUSED_REPORT_TITLES = focusedReportTitlesData as Record<string, { en: string; hi: string }>;

export interface FocusedReportFaq {
  question: { en: string; hi: string };
  answer: { en: string; hi: string };
}

export interface FocusedReportConfig {
  /** Cosmetic, human-readable URL segment -- e.g. "major-kundali-obstacles". Never sent to the backend. */
  humanSlug: string;
  /** The ONE stable identity: the backend's question_key, also this product's report_slug in ReportProduct. */
  questionKey: string;
  category: IntentCategoryId;
  priceRupees: 51;
  /** Short SEO/H1 title -- NOT exported by intentCatalog.json today (only the long customer
   * question is). Copied verbatim from the backend's own authoritative source,
   * modules/focused_reports/prompt_specs.py::PROMPT_SPECS[questionKey].title -- the exact
   * same text pdf_adapter.py already uses as this report's PDF product title -- never a
   * re-worded alternative. Re-verify against that source if this product's spec ever changes. */
  title: { en: string; hi: string };
  /** 3-4 short above-fold benefit lines. */
  benefits: { en: string[]; hi: string[] };
  /** Below-fold explanatory sections, in a fixed order (see FocusedReportDetails). */
  sections: {
    whatItTellsYou: { en: string; hi: string };
    howJyotishApproachesIt: { en: string; hi: string };
    whoItIsFor: { en: string; hi: string };
    whatYouReceive: { en: string; hi: string };
    trustAndLimitations: { en: string; hi: string };
  };
  faqs: FocusedReportFaq[];
  /** SEO meta description (distinct from the H1/hook, which always comes from intentCatalog). */
  metaDescription: { en: string; hi: string };
  /** F12-P2.1: topic-specific SEO content (app/data/focused-report-content). Absent on bespoke and generic configs. */
  seo?: FocusedReportSeoContent;
}

export const FOCUSED_REPORTS_CONFIG: Record<string, FocusedReportConfig> = {
  // F12-P3.2: the two bespoke pilots keep their own tier, slug, key and backend title, but their page copy
  // now comes from full content modules (same shape and checks as the other 61 topics).
  "major-kundali-obstacles": {
    humanSlug: "major-kundali-obstacles",
    questionKey: "major_kundali_obstacles",
    category: "life",
    priceRupees: 51,
    title: { en: "Major Obstacles in Your Kundali", hi: "आपकी कुंडली की प्रमुख बाधाएँ" },
    benefits: majorKundaliObstacles.benefits,
    sections: majorKundaliObstacles.sections,
    faqs: majorKundaliObstacles.faqs,
    metaDescription: majorKundaliObstacles.metaDescription,
    seo: majorKundaliObstacles,
  },

  "major-kundali-strengths": {
    humanSlug: "major-kundali-strengths",
    questionKey: "major_kundali_strengths",
    category: "life",
    priceRupees: 51,
    title: { en: "Major Strengths in Your Kundali", hi: "आपकी कुंडली की प्रमुख शक्तियाँ" },
    benefits: majorKundaliStrengths.benefits,
    sections: majorKundaliStrengths.sections,
    faqs: majorKundaliStrengths.faqs,
    metaDescription: majorKundaliStrengths.metaDescription,
    seo: majorKundaliStrengths,
  },
};

export type FocusedReportHumanSlug = string;

/** Public URL segment <-> the backend's own question_key. Plain, bijective
 * underscore<->hyphen swap -- see module docstring for why this is safe. */
export function questionKeyToHumanSlug(questionKey: string): string {
  return questionKey.replace(/_/g, "-");
}
export function humanSlugToQuestionKey(humanSlug: string): string {
  return humanSlug.replace(/-/g, "_");
}

/** Every focused product that has a REAL sample PDF in public/report-samples/
 * today. Update this ONLY when a new sample is actually added there -- this
 * is the one, explicit, honest source of "does a sample exist", never
 * inferred from whether a product has bespoke copy or is active/inactive.
 *
 * All 63 catalog questions now have one (<questionKey>_<en|hi>.pdf, 126
 * files). #62/#63 (major_kundali_obstacles/strengths) keep their original,
 * product-specific pilot samples. The other 61 are a product-labelled SAMPLE
 * REPORT cover carrying that product's own title + exact catalog question,
 * followed by the SAME approved demonstration body (strongest_marriage_periods,
 * sample person Aarav Sharma); the cover states that the following pages
 * demonstrate the report format using sample analysis and that a purchased
 * report answers the customer's own question. Generated deterministically,
 * without AI, by the backend's scripts/generate_focused_cover_samples.py. A
 * future catalog question with no PDF yet must NOT be added here -- it falls
 * back to the generic preview. */
export const FOCUSED_REPORTS_WITH_SAMPLES: ReadonlySet<string> = new Set([
  // career
  "promotion_timing", "career_improvement_timing", "career_growth_delay_reason", "next_strong_career_period",
  "salary_growth_timing", "work_recognition_timing", "best_career_years", "job_change_now", "new_job_timing",
  "best_period_to_switch", "job_search_start_timing", "job_gap_easing",
  // money & business
  "financial_improvement_timing", "income_increase_timing", "money_growth_periods", "financial_pressure_easing",
  "debt_pressure_easing", "business_start_timing", "business_growth_timing", "best_business_periods",
  "business_expansion_timing", "business_slowdown_easing", "new_venture_partnership_timing",
  // marriage
  "strongest_marriage_periods", "marriage_chances_timing", "marriage_delay_reason", "marriage_delay_easing",
  "marriage_talks_current_period", "relationship_to_marriage_window",
  // relationship (two-person)
  "relationship_lead_to_marriage", "long_term_compatibility", "kundali_match_for_marriage",
  "right_time_to_consider_marriage", "relationship_strengths_risks", "conflict_areas", "emotional_communication_fit",
  "strengthen_relationship", "relationship_care_periods",
  // foreign
  "going_abroad_timing", "foreign_work_timing", "study_abroad", "foreign_settlement_timing", "relocation_timing",
  "foreign_plans_delay_reason",
  // education
  "study_strong_period", "exam_preparation_period", "higher_education_timing", "study_progress_improvement",
  // property
  "property_purchase_timing", "property_current_period", "property_strongest_period", "property_delay_reason",
  "own_home_timing",
  // life
  "major_turning_points", "next_life_change_period", "important_years_ahead", "current_phase_meaning",
  "areas_needing_attention", "natural_strengths", "life_direction", "focus_to_use_strengths",
  "major_kundali_obstacles", "major_kundali_strengths",
]);
export function focusedReportHasSample(questionKey: string): boolean {
  return FOCUSED_REPORTS_WITH_SAMPLES.has(questionKey);
}

/** Sample-preview strategy -- every one of the 63 products gets a "View
 * Sample" action, and all 63 are now in FOCUSED_REPORTS_WITH_SAMPLES, so each
 * opens its own sample PDF (public/report-samples/<questionKey>_<lang>.pdf).
 * The generic Example Report preview branch below is kept only as the
 * fallback for a key without a PDF; no current catalog question reaches it
 * (retiring it is a separate task). Never call getReportSampleUrl() directly for the
 * "View Sample" action outside this function -- this is the single place
 * that decides real-vs-generic. */
export const GENERIC_EXAMPLE_PREVIEW_PATH = "/reports/focused/example-preview";
export function getFocusedReportSampleOrPreviewHref(questionKey: string, locale: "en" | "hi"): string {
  if (focusedReportHasSample(questionKey)) {
    // Real, exact sample -- the SAME existing helper/URL every other
    // sample link already uses, completely unchanged.
    return getReportSampleUrl(questionKey, locale);
  }
  return locale === "hi" ? `/hi${GENERIC_EXAMPLE_PREVIEW_PATH}` : GENERIC_EXAMPLE_PREVIEW_PATH;
}

/** Tier 2 (generic): built ONLY from question_key/category/person_mode
 * (intentCatalog.ts) and title (focusedReportTitlesData, itself sourced
 * verbatim from the backend). Every other field is fixed, generic
 * boilerplate equally true for any focused report -- see module docstring.
 * Caller (getFocusedReportConfigBySlug) guarantees `question` is real. */
function buildGenericFocusedReportConfig(question: IntentQuestion): FocusedReportConfig {
  const title = FOCUSED_REPORT_TITLES[question.questionKey];
  if (!title) {
    // A real catalog question with no title is a genuine data gap (the
    // backend's own prompt_specs.py should define one for every question) --
    // fail loud rather than render an untitled page.
    throw new Error(`focusedReportsConfig: no title for questionKey ${question.questionKey}`);
  }
  const isDual = question.personMode === "dual";
  const questionText = question.question;

  return {
    humanSlug: questionKeyToHumanSlug(question.questionKey),
    questionKey: question.questionKey,
    category: question.category,
    priceRupees: 51,
    title,
    benefits: {
      en: [
        isDual
          ? "A personalized reading built from both of your birth charts together -- not a generic article"
          : "A personalized reading built from your own birth chart -- not a generic article",
        "Shows what your current Dasha and transits are activating right now",
        "Delivered as a PDF to your email, usually within minutes of payment",
      ],
      hi: [
        isDual
          ? "आप दोनों की जन्म कुंडली पर आधारित व्यक्तिगत विश्लेषण -- कोई सामान्य लेख नहीं"
          : "आपकी अपनी जन्म कुंडली पर आधारित व्यक्तिगत विश्लेषण -- कोई सामान्य लेख नहीं",
        "बताता है कि आपकी मौजूदा दशा और गोचर अभी क्या सक्रिय कर रहे हैं",
        "भुगतान के कुछ ही मिनटों में आपके ईमेल पर PDF के रूप में भेजी जाती है",
      ],
    },
    sections: {
      whatItTellsYou: {
        en: `This report reads ${isDual ? "both of your birth charts" : "your whole birth chart"} to directly answer: "${questionText.en}" It looks at the relevant house/lord placements and the current Dasha and transit activation together, not just one isolated factor.`,
        hi: `यह रिपोर्ट ${isDual ? "आप दोनों की जन्म कुंडली" : "आपकी पूरी जन्म कुंडली"} को पढ़कर सीधे इस सवाल का जवाब देती है: "${questionText.hi}" यह संबंधित भाव/स्वामी की स्थिति और मौजूदा दशा व गोचर सक्रियता को एक साथ देखती है, न कि किसी एक अलग-थलग कारण को।`,
      },
      howJyotishApproachesIt: {
        en: "The analysis uses the same authoritative calculation method used across Jyotishasha's reports -- existing planetary placements and yogas for the durable, birth-chart layer, and the real Dasha/transit timeline for what's active right now. Only what the chart's own evidence supports is discussed.",
        hi: "यह विश्लेषण वही प्रामाणिक गणना पद्धति उपयोग करता है जो Jyotishasha की सभी रिपोर्ट्स में इस्तेमाल होती है -- स्थायी, जन्मजात परत के लिए मौजूदा ग्रह-स्थिति और योग, और अभी क्या सक्रिय है इसके लिए असली दशा/गोचर समयरेखा। सिर्फ वही बताया जाता है जिसका समर्थन कुंडली के अपने प्रमाण करते हैं।",
      },
      whoItIsFor: {
        en: `For anyone who wants a direct, chart-based answer to this exact question, rather than a broad general reading.`,
        hi: `उन लोगों के लिए जो इस ठीक सवाल का सीधा, कुंडली-आधारित जवाब चाहते हैं, न कि एक सामान्य विस्तृत रीडिंग।`,
      },
      whatYouReceive: {
        en: `A personalized PDF report covering your direct answer and the ${isDual ? "birth-chart" : "birth-chart"} and current-period evidence behind it -- generated from ${isDual ? "both of your birth details" : "your own birth details"}, delivered to your email.`,
        hi: `एक व्यक्तिगत PDF रिपोर्ट जिसमें आपका सीधा जवाब और उसके पीछे का कुंडली व मौजूदा-समय का प्रमाण शामिल है -- ${isDual ? "आप दोनों की" : "आपकी अपनी"} जन्म जानकारी से तैयार, आपके ईमेल पर भेजी गई।`,
      },
      trustAndLimitations: {
        en: "This is astrology-based guidance, not a certainty, a medical/legal/financial opinion, or a guaranteed outcome.",
        hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता, चिकित्सा/कानूनी/वित्तीय राय, या पक्के नतीजे की गारंटी नहीं।",
      },
    },
    faqs: [
      {
        question: { en: "How long does it take to receive my report?", hi: "मुझे अपनी रिपोर्ट मिलने में कितना समय लगता है?" },
        answer: {
          en: "Your personalized PDF is generated from your birth details and emailed to you shortly after successful payment.",
          hi: "आपकी व्यक्तिगत PDF आपकी जन्म जानकारी से तैयार की जाती है और सफल भुगतान के कुछ ही समय बाद आपके ईमेल पर भेज दी जाती है।",
        },
      },
      {
        question: { en: "Is this report guaranteed to be accurate?", hi: "क्या यह रिपोर्ट सटीक होने की गारंटी है?" },
        answer: {
          en: "This is astrology-based guidance describing tendencies and chart-based evidence, not a certainty or a guaranteed outcome.",
          hi: "यह ज्योतिष-आधारित मार्गदर्शन है जो रुझान और कुंडली-आधारित प्रमाण बताता है, यह कोई निश्चितता या पक्के नतीजे की गारंटी नहीं है।",
        },
      },
    ],
    metaDescription: {
      en: `A personalized ₹51 astrology report answering: "${title.en}" -- built from ${isDual ? "both of your birth charts" : "your own birth chart"} and current Dasha/transit activation.`,
      hi: `₹51 की व्यक्तिगत ज्योतिष रिपोर्ट: "${title.hi}" -- ${isDual ? "आप दोनों की जन्म कुंडली" : "आपकी अपनी जन्म कुंडली"} और मौजूदा दशा/गोचर सक्रियता पर आधारित।`,
    },
  };
}

/** The ONLY function that turns a public URL segment into the trusted
 * question_key + full page config. Tier 1 (bespoke) first, then topics
 * with their own SEO content (app/data/focused-report-content), then the
 * generic template for any other real catalog question. Returns undefined for
 * anything that isn't a real question_key's slug -- the route calls
 * notFound() in that case. Never guesses, never falls back to treating
 * the slug itself as a question_key. */
export function getFocusedReportConfigBySlug(humanSlug: string): FocusedReportConfig | undefined {
  const bespoke = FOCUSED_REPORTS_CONFIG[humanSlug];
  if (bespoke) return bespoke;

  const questionKey = humanSlugToQuestionKey(humanSlug);
  // Round-trip guard: reject anything (wrong case, a stray double-hyphen,
  // etc.) that wouldn't produce this exact slug back -- belt-and-suspenders
  // alongside the "is this a real question_key" check below.
  if (questionKeyToHumanSlug(questionKey) !== humanSlug) return undefined;

  const question = getIntentQuestion(questionKey);
  if (!question) return undefined;

  const content = FOCUSED_REPORT_SEO_CONTENT[questionKey];
  if (content) return buildContentFocusedReportConfig(question, content);

  return buildGenericFocusedReportConfig(question);
}

/** Tier 2 (F12-P2.1): a topic with its own SEO content. Title and category
 * still come from the authoritative sources (focusedReportTitles.json and the
 * catalog); every page-copy field comes from the topic's content file. */
function buildContentFocusedReportConfig(question: IntentQuestion, content: FocusedReportSeoContent): FocusedReportConfig {
  const title = FOCUSED_REPORT_TITLES[question.questionKey];
  if (!title) throw new Error(`focusedReportsConfig: no title for questionKey ${question.questionKey}`);
  return {
    humanSlug: questionKeyToHumanSlug(question.questionKey),
    questionKey: question.questionKey,
    category: question.category,
    priceRupees: 51,
    title,
    benefits: content.benefits,
    sections: content.sections,
    faqs: content.faqs,
    metaDescription: content.metaDescription,
    seo: content,
  };
}

/** Bilingual title/question, read live from the authoritative catalog --
 * never duplicated here. Throws if the config's own questionKey ever
 * drifts from a real catalog entry (a genuine bug, not a runtime case to
 * handle gracefully). */
export function getFocusedReportCatalogEntry(config: FocusedReportConfig) {
  const question = getIntentQuestion(config.questionKey);
  if (!question) {
    throw new Error(`focusedReportsConfig: questionKey ${config.questionKey} is not in intentCatalog`);
  }
  const intent = getIntent(question.intentSlug);
  return { question, intent };
}

/** All 63 routable human slugs -- one per real catalog question_key,
 * bespoke and generic alike. Drives generateStaticParams() and the hub. */
export function listFocusedReportHumanSlugs(): string[] {
  return intentQuestions.map((q) => questionKeyToHumanSlug(q.questionKey));
}

/** Hub "Most Purchased Reports" -- Part 2 of this task's own redesign
 * brief. NOT computed from real order/analytics data (this project has
 * no purchase-ranking signal to compute from yet) -- a fixed, curated
 * merchandising shortlist of 6 real question_keys chosen for broad
 * commercial appeal, one per high-intent theme: relationship, career,
 * money, marriage, foreign relocation, and the #62 pilot itself. The
 * section heading ("Most Purchased Reports" / "लोकप्रिय रिपोर्ट्स") is
 * deliberately merchandising copy, not a data claim -- this list, and
 * every badge shown next to it, must never be presented as, or quietly
 * become, a real ranking. Revisit only when real purchase analytics
 * exist to justify an actual data-driven list. */
export const FEATURED_FOCUSED_QUESTION_KEYS: readonly string[] = [
  "relationship_lead_to_marriage", // Relationship (Two People)
  "best_career_years", // Career & Job
  "income_increase_timing", // Money & Business
  "marriage_chances_timing", // Marriage
  "going_abroad_timing", // Foreign & Relocation
  "major_kundali_obstacles", // Life Direction -- the #62 pilot, real sample + proven production E2E
];

/** Up to `limit` OTHER products in the SAME authoritative category as
 * `config`, excluding `config` itself, resolved through the exact same
 * getFocusedReportConfigBySlug() every page uses -- so a related card
 * always has a real, valid destination, bespoke or generic alike.
 * Deterministic (catalog order), never hardcoded per product: every one
 * of the 63 categories has at least 4 members (the smallest, education,
 * has 4), so excluding self always leaves >= limit=3 real candidates. */
export function getRelatedFocusedReports(config: FocusedReportConfig, limit = 3): FocusedReportConfig[] {
  const related: FocusedReportConfig[] = [];
  for (const q of intentQuestions) {
    if (q.questionKey === config.questionKey || q.category !== config.category) continue;
    const relatedConfig = getFocusedReportConfigBySlug(questionKeyToHumanSlug(q.questionKey));
    if (relatedConfig) related.push(relatedConfig);
    if (related.length >= limit) break;
  }
  return related;
}
