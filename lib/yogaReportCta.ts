// lib/yogaReportCta.ts

/**
 * Kundali yoga tool result -> paid report CTA. The ONE place that decides
 * whether a yoga tool result shows a report CTA, where it points, what it
 * says, and how its click is tracked.
 *
 * Replaces the backend `upsell` blocks (data/rajyog_content/*.json), which
 * are NEVER rendered any more: they offered a per-yoga "detailed report @
 * ₹49" and an "All 14 Rajyog reports + Dosha Analysis @ ₹199" bundle, and
 * neither product exists. The backend also sends that upsell when the yoga
 * is NOT present, so a CTA here is shown only when the yoga is confirmed
 * active (`is_active === true`).
 *
 * Destinations are limited to real single-person reports whose own backend
 * prompt already uses the yoga as evidence (summary_blocks.py:
 * career_yoga_summary -> career_report, wealth_yoga_summary ->
 * financial_report), or the /reports catalog for yogas no report covers.
 * Prices come from app/data/reportsData.ts, never hand-typed; an unknown
 * slug falls back to the catalog rather than rendering a broken link.
 *
 * Relative imports (not the @/ alias), matching lib/ modules that the plain
 * `tsc` test invocation compiles standalone.
 */
import { reportsData } from "../app/data/reportsData"

export type YogaReportDestination = "career_report" | "financial_report" | "catalog"

export type YogaKey =
  | "parashari_rajyog"
  | "rajya_sambandh_rajyog"
  | "dharma_karmadhipati_rajyog"
  | "panch_mahapurush_yog"
  | "gajakesari_yog"
  | "dhan_yog"
  | "kuber_rajyog"
  | "lakshmi_yog"
  | "chandra_mangal_yog"
  | "adhi_rajyog"
  | "neechbhang_rajyog"
  | "vipreet_rajyog"
  | "shubh_kartari_yog"

interface YogaReportRule {
  /** The /tools/<toolId> page that renders this yoga's result block. */
  toolId: string
  name: { en: string; hi: string }
  destination: YogaReportDestination
}

export const YOGA_REPORT_RULES: Readonly<Record<YogaKey, YogaReportRule>> = {
  parashari_rajyog: { toolId: "parashari-rajyog", name: { en: "Parashari Rajyog", hi: "पराशरी राजयोग" }, destination: "career_report" },
  rajya_sambandh_rajyog: { toolId: "rajya-sambandh", name: { en: "Rajya Sambandh Rajyog", hi: "राज्य संबंध राजयोग" }, destination: "career_report" },
  dharma_karmadhipati_rajyog: { toolId: "dharma-karmadhipati", name: { en: "Dharma-Karmadhipati Rajyog", hi: "धर्म-कर्माधिपति राजयोग" }, destination: "career_report" },
  panch_mahapurush_yog: { toolId: "panch-mahapurush", name: { en: "Panch Mahapurush Yog", hi: "पंच महापुरुष योग" }, destination: "career_report" },
  gajakesari_yog: { toolId: "gajakesari-yog", name: { en: "Gajakesari Yog", hi: "गजकेसरी योग" }, destination: "career_report" },
  dhan_yog: { toolId: "dhan-yog", name: { en: "Dhan Yog", hi: "धन योग" }, destination: "financial_report" },
  kuber_rajyog: { toolId: "kuber-rajyog", name: { en: "Kuber Rajyog", hi: "कुबेर राजयोग" }, destination: "financial_report" },
  lakshmi_yog: { toolId: "lakshmi-yog", name: { en: "Lakshmi Yog", hi: "लक्ष्मी योग" }, destination: "financial_report" },
  chandra_mangal_yog: { toolId: "chandra-mangal", name: { en: "Chandra-Mangal Yog", hi: "चंद्र-मंगल योग" }, destination: "financial_report" },
  adhi_rajyog: { toolId: "adhi-rajyog", name: { en: "Adhi Rajyog", hi: "अधि राजयोग" }, destination: "catalog" },
  neechbhang_rajyog: { toolId: "neechbhang-rajyog", name: { en: "Neechbhang Rajyog", hi: "नीचभंग राजयोग" }, destination: "catalog" },
  vipreet_rajyog: { toolId: "vipreet-rajyog", name: { en: "Vipreet Rajyog", hi: "विपरीत राजयोग" }, destination: "catalog" },
  shubh_kartari_yog: { toolId: "shubh-kartari", name: { en: "Shubh Kartari Yog", hi: "शुभ कर्तरी योग" }, destination: "catalog" },
}

export const REPORTS_CATALOG_PATH = "/reports"

/** What the component renders -- already localized, with a verified href. */
export interface ResolvedYogaReportCta {
  kind: "report" | "catalog"
  href: string
  title: string
  description: string
  label: string
  /** WebsiteEvents.ctaClick ids -- fixed identifiers only, never user data. */
  ctaId: string
  screenName: string
}

type Locale = "en" | "hi"

function reportCopy(destination: "career_report" | "financial_report", yoga: { en: string; hi: string }, price: number) {
  if (destination === "career_report") {
    return {
      title: { en: `Your Career Report Takes ${yoga.en} into Account`, hi: `आपकी करियर रिपोर्ट में ${yoga.hi} शामिल है` },
      description: {
        en: `${yoga.en} is one of the yogas the Career Report checks in your birth chart. The report gives career direction and strengths from your own chart and current dasha. It is not a separate ${yoga.en} report. Delivered as a PDF to your email, in English or Hindi.`,
        hi: `${yoga.hi} उन योगों में से है जिन्हें करियर रिपोर्ट आपकी जन्म कुंडली में देखती है। रिपोर्ट आपकी अपनी कुंडली और वर्तमान दशा के आधार पर करियर दिशा और क्षमताएँ बताती है। यह ${yoga.hi} की अलग रिपोर्ट नहीं है। रिपोर्ट PDF के रूप में आपके ईमेल पर, हिंदी या अंग्रेज़ी में।`,
      },
      label: { en: `Get Career Report — ₹${price}`, hi: `करियर रिपोर्ट पाएं — ₹${price}` },
    }
  }
  return {
    title: { en: `Your Financial Report Takes ${yoga.en} into Account`, hi: `आपकी वित्तीय रिपोर्ट में ${yoga.hi} शामिल है` },
    description: {
      en: `${yoga.en} is one of the wealth yogas the Financial Report checks in your birth chart. The report covers your earning and wealth-building potential from your own chart and current dasha. It is not a separate ${yoga.en} report. Delivered as a PDF to your email, in English or Hindi.`,
      hi: `${yoga.hi} उन धन योगों में से है जिन्हें वित्तीय रिपोर्ट आपकी जन्म कुंडली में देखती है। रिपोर्ट आपकी अपनी कुंडली और वर्तमान दशा के आधार पर कमाई और धन-निर्माण की संभावना बताती है। यह ${yoga.hi} की अलग रिपोर्ट नहीं है। रिपोर्ट PDF के रूप में आपके ईमेल पर, हिंदी या अंग्रेज़ी में।`,
    },
    label: { en: `Get Financial Report — ₹${price}`, hi: `वित्तीय रिपोर्ट पाएं — ₹${price}` },
  }
}

function catalogCopy(yoga: { en: string; hi: string }) {
  return {
    title: { en: "Looking for Personalised Guidance?", hi: "व्यक्तिगत मार्गदर्शन चाहिए?" },
    description: {
      en: `There is no separate ${yoga.en} report. Our personalised reports each answer a specific question — career, marriage, finance, Sade Sati and more — from your own birth chart, delivered as a PDF to your email.`,
      hi: `${yoga.hi} के लिए अलग रिपोर्ट उपलब्ध नहीं है। हमारी व्यक्तिगत रिपोर्ट्स आपकी अपनी जन्म कुंडली के आधार पर किसी एक खास प्रश्न — करियर, विवाह, वित्त, साढ़ेसाती आदि — का उत्तर देती हैं, और PDF के रूप में आपके ईमेल पर भेजी जाती हैं।`,
    },
    label: { en: "Explore Reports", hi: "सभी रिपोर्ट्स देखें" },
  }
}

/**
 * The CTA for a yoga tool result, or null for none. Shown ONLY when the
 * yoga is confirmed active; the backend `upsell` content is never read.
 */
export function resolveYogaReportCta(
  yogaKey: YogaKey,
  yoga: { is_active?: boolean } | null | undefined,
  locale: Locale,
): ResolvedYogaReportCta | null {
  if (yoga?.is_active !== true) return null
  const rule = YOGA_REPORT_RULES[yogaKey]
  if (!rule) return null

  const tracking = { ctaId: `tools_${rule.toolId}_report_cta`, screenName: `tools_${rule.toolId}` }
  const pick = (copy: { title: { en: string; hi: string }; description: { en: string; hi: string }; label: { en: string; hi: string } }) => ({
    title: copy.title[locale], description: copy.description[locale], label: copy.label[locale],
  })

  if (rule.destination !== "catalog") {
    const report = reportsData.find((r) => r.slug === rule.destination)
    if (report) {
      return { kind: "report", href: `/reports/${report.slug}`, ...pick(reportCopy(rule.destination, rule.name, report.price)), ...tracking }
    }
  }
  return { kind: "catalog", href: REPORTS_CATALOG_PATH, ...pick(catalogCopy(rule.name)), ...tracking }
}
