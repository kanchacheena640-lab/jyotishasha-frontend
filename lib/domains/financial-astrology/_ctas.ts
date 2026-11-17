// lib/domains/financial-astrology/_ctas.ts
// Financial Astrology guide CTAs: which products each guide offers, in which order.
//
// Copy sources (nothing is retyped here):
//  - Base report + free tool cards: the topic's own `ctas` (label/description) in topics/*.ts.
//  - Report names and prices: app/data/reportsData.ts.
//  - Focused report question and price: app/data/focusedReportsConfig.ts (the approved entry point)
//    and its intent catalog.
// The only copy kept here is each focused card's short description, because the topic data model
// cannot express focused reports. Each description restates that product's own catalog meta
// description without the price, and names only the horizon its backend generator computes
// (career_evidence.py / money_business_evidence.py: 12 months, or 60 months for best_career_years).

import type { AuthorityTopic, Locale } from '@/lib/authority-engine/types'
import { CTA_ACTION_LABELS, CTA_TYPE_LABELS } from '@/lib/authority-engine/constants'
import { reportsData } from '@/app/data/reportsData'
import { getFocusedReportCatalogEntry, getFocusedReportConfigBySlug, questionKeyToHumanSlug } from '@/app/data/focusedReportsConfig'
import { getReportProductPath } from '@/lib/reportProductSeo'

export type FinancialCtaItem =
  | { kind: 'report'; slug: string }
  | { kind: 'tool'; slug: string }
  | {
      kind: 'focused'
      questionKey: string
      /** The horizon the backend generator computes for this question. */
      horizonMonths: 12 | 60
      description: string
      description_hi: string
    }

const focused = (
  questionKey: string, horizonMonths: 12 | 60, description: string, description_hi: string,
): FinancialCtaItem => ({ kind: 'focused', questionKey, horizonMonths, description, description_hi })

const FOCUSED = {
  salaryGrowth: focused('salary_growth_timing', 12,
    'Whether your present period supports a pay rise, and when the first stronger window opens in the next 12 months, from your chart and dasha periods.',
    'क्या मौजूदा अवधि वेतन-वृद्धि के पक्ष में है, और अगले 12 महीनों में पहला मज़बूत समय कब खुलता है — आपकी कुंडली और दशा के आधार पर।'),
  newJob: focused('new_job_timing', 12,
    'Reads your dasha periods, work houses and the transits of Jupiter, Saturn and Rahu to find supportive new-job windows in the next 12 months.',
    'आपकी दशा, कार्य से जुड़े भाव और गुरु, शनि व राहु के गोचर पढ़कर अगले 12 महीनों में नई नौकरी के अनुकूल समय बताती है।'),
  jobChange: focused('job_change_now', 12,
    'Weighs stability against change in your chart now, comparing staying and moving over the next 12 months.',
    'आपकी कुंडली में अभी स्थिरता और बदलाव की तुलना करती है — अगले 12 महीनों में रुकने और बदलने, दोनों विकल्पों के साथ।'),
  promotion: focused('promotion_timing', 12,
    'Whether your present period supports a promotion, and the stronger advancement windows in the next 12 months, from your own chart.',
    'क्या मौजूदा अवधि प्रमोशन के पक्ष में है, और अगले 12 महीनों में उन्नति के मज़बूत समय कौन से हैं — आपकी अपनी कुंडली से।'),
  nextStrongPeriod: focused('next_strong_career_period', 12,
    'Ranks your comparatively strong career windows in the next 12 months, and whether each favours responsibility or recognition.',
    'अगले 12 महीनों में आपके करियर के तुलनात्मक रूप से मज़बूत समय को क्रम से बताती है, और यह भी कि हर समय ज़िम्मेदारी या पहचान में से किसके पक्ष में है।'),
  delayReason: focused('career_growth_delay_reason', 12,
    'The main chart factors behind slow career growth, the strengths that offset them, and when pressure may ease in the next 12 months.',
    'करियर की धीमी प्रगति के पीछे की मुख्य कुंडली बाधाएँ, उन्हें संतुलित करने वाली ताकतें, और अगले 12 महीनों में दबाव कब कम हो सकता है।'),
  bestCareerYears: focused('best_career_years', 60,
    'Maps your career over the next five years: which dasha phases favour building a base, consolidating or being recognised.',
    'अगले पाँच वर्षों में आपके करियर का नक्शा: कौन से दशा चरण आधार बनाने, मज़बूती लाने या पहचान पाने के पक्ष में हैं।'),
  // money-growth-periods content + money_business_evidence.py MULTI_YEAR_KEYS: a 60-month horizon.
  moneyGrowth: focused('money_growth_periods', 60,
    'Ranks the phases of your next five years that best support steady saving and building resources, from your savings and gains factors, any wealth yogas and your dasha periods — not quick windfalls.',
    'अगले पाँच वर्षों के उन दौरों को क्रम से बताती है जो स्थिर बचत और संसाधन बनाने को सबसे ज़्यादा सहारा देते हैं — आपकी बचत और लाभ से जुड़े कारकों, धन योगों और दशा के आधार पर, अचानक लाभ के आधार पर नहीं।'),
  // financial-pressure-easing / financial-improvement-timing content: 12-month horizon (not in MULTI_YEAR_KEYS).
  pressureEasing: focused('financial_pressure_easing', 12,
    'What is driving your money strain, what is supporting you, and whether the pressure looks persistent, mixed or easing in the next 12 months, from your own chart.',
    'आपके आर्थिक दबाव के पीछे क्या है, क्या सहारा दे रहा है, और अगले 12 महीनों में दबाव लगातार, मिला-जुला या कम होता दिखता है — आपकी अपनी कुंडली से।'),
  financialImprovement: focused('financial_improvement_timing', 12,
    'When your overall financial situation may improve in the next 12 months: more inflow, less strain or steadier money habits, from your own chart.',
    'अगले 12 महीनों में आपकी कुल आर्थिक स्थिति कब सुधर सकती है — ज़्यादा आमदनी, कम दबाव या ज़्यादा स्थिर पैसों की आदतें, आपकी अपनी कुंडली से।'),
  // business-growth-timing / new-venture-partnership-timing content: 12-month horizon (not in MULTI_YEAR_KEYS).
  businessGrowth: focused('business_growth_timing', 12,
    'For an existing business: when growth looks supported in the next 12 months, and whether it means real gains or just more activity, from your own chart.',
    'चल रहे बिज़नेस के लिए: अगले 12 महीनों में बढ़ोतरी कब अनुकूल दिखती है, और क्या उसका मतलब असली लाभ है या सिर्फ़ ज़्यादा काम — आपकी अपनी कुंडली से।'),
  partnership: focused('new_venture_partnership_timing', 12,
    'Whether the next 12 months support your readiness for a new venture or working partnership, with practical agreement checks, from your own chart.',
    'क्या अगले 12 महीने नए काम या कामकाजी साझेदारी के लिए आपकी तैयारी को सहारा देते हैं, साथ में समझौते की व्यावहारिक जाँच — आपकी अपनी कुंडली से।'),
  businessStart: focused('business_start_timing', 12,
    'Ranks the stronger windows to start a business in the next 12 months, from your enterprise and wealth factors, dasha periods and transits.',
    'अगले 12 महीनों में व्यापार शुरू करने के मज़बूत समय को क्रम से बताती है — आपके उद्यम और धन से जुड़े कारकों, दशा और गोचर के आधार पर।'),
}

const report = (slug: string): FinancialCtaItem => ({ kind: 'report', slug })
const tool = (slug: string): FinancialCtaItem => ({ kind: 'tool', slug })

/** Per guide, in display order; the first item is the primary offer. */
export const FINANCIAL_CTA_PLAN: Record<string, FinancialCtaItem[]> = {
  'best-career':           [report('career_report'), tool('career-path')],
  'job-vs-business':       [report('business_report'), FOCUSED.businessStart, tool('business-path')],
  'government-job':        [report('government_job_report'), tool('government-job')],
  'salary-growth':         [FOCUSED.salaryGrowth, report('financial_report'), tool('dhan-yog')],
  'new-job-chances':       [FOCUSED.newJob, report('career_report'), tool('grah-dasha-finder')],
  'job-change-prediction': [FOCUSED.jobChange, report('career_report'), tool('grah-dasha-finder')],
  'promotion-chances':     [FOCUSED.promotion, report('career_report'), tool('grah-dasha-finder')],
  'career-growth':         [report('career_report'), FOCUSED.nextStrongPeriod, tool('grah-dasha-finder')],
  'career-challenges':     [report('career_report'), FOCUSED.delayReason, tool('grah-dasha-finder')],
  'career-after-40':       [report('career_report'), FOCUSED.bestCareerYears, tool('grah-dasha-finder')],
  'career-after-marriage': [report('career_report')],
  // Informational guide: the free check is the natural next step, then the full wealth reading.
  'dhan-yoga':             [tool('dhan-yog'), report('financial_report'), FOCUSED.moneyGrowth],
  'financial-stability':   [report('financial_stability_report'), FOCUSED.pressureEasing, FOCUSED.financialImprovement, tool('grah-dasha-finder')],
  'business-astrology':    [report('business_report'), FOCUSED.businessGrowth, FOCUSED.partnership, report('startup_suggestion_report'), tool('business-path')],
}

export interface FinancialCtaCard {
  kind: FinancialCtaItem['kind']
  /** Small label above the heading (e.g. "Free Tool", "Focused report · next 12 months"). */
  eyebrow: string
  heading: string
  description: string
  href: string
  button: string
  /** Hindi page linking to an English-only report page. */
  notice?: string
  isPrimary: boolean
  /** `cta_click` ids (WebsiteEvents.ctaClick), fixed identifiers only -- see financialCtaTracking. */
  ctaId: string
  screenName: string
}

/**
 * `cta_click` identifiers, following the Marriage guide convention (lib/domains/marriage-astrology/_landing.ts):
 * screen_name `<topic>_topic`, cta_id `<topic>_<product>_cta`, where <product> is the report slug, the
 * focused report's question_key, or the tool slug (underscored). The event's own `page_path` adds the locale.
 */
export function financialCtaTracking(topicSlug: string, item: FinancialCtaItem): { ctaId: string; screenName: string } {
  const key = (s: string) => s.replace(/-/g, '_')
  const product = item.kind === 'focused' ? item.questionKey : item.slug
  return { ctaId: `${key(topicSlug)}_${key(product)}_cta`, screenName: `${key(topicSlug)}_topic` }
}

const T = {
  focusedEyebrow: {
    12: { en: 'Focused report · next 12 months', hi: 'फोकस्ड रिपोर्ट · अगले 12 महीने' },
    60: { en: 'Focused report · next 5 years', hi: 'फोकस्ड रिपोर्ट · अगले 5 वर्ष' },
  },
  getAnswer: { en: 'Get My Answer', hi: 'मेरा जवाब पाएं' },
  // Same notice as the Marriage hub; the report checkout offers Hindi as the report language.
  enOnlyPage: { en: '', hi: 'यह पेज अंग्रेज़ी में है; फ़ॉर्म में रिपोर्ट की भाषा हिंदी चुन सकते हैं।' },
}

/**
 * Resolve a guide's CTA cards. Throws on any reference that does not resolve to an existing
 * catalog product or topic CTA, so a broken link fails the build/tests instead of shipping.
 */
export function resolveFinancialCtas(topic: AuthorityTopic, locale: Locale): FinancialCtaCard[] {
  const plan = FINANCIAL_CTA_PLAN[topic.slug]
  if (!plan) throw new Error(`financial-astrology: no CTA plan for topic '${topic.slug}'`)
  const lp = locale === 'hi' ? '/hi' : ''

  return plan.map((item, i) => {
    const isPrimary = i === 0
    const tracking = financialCtaTracking(topic.slug, item)
    if (item.kind === 'focused') {
      const config = getFocusedReportConfigBySlug(questionKeyToHumanSlug(item.questionKey))
      if (!config) throw new Error(`financial-astrology: focused report '${item.questionKey}' not found`)
      const { question } = getFocusedReportCatalogEntry(config)
      return {
        kind: item.kind,
        eyebrow: T.focusedEyebrow[item.horizonMonths][locale],
        heading: question.question[locale],
        description: locale === 'hi' ? item.description_hi : item.description,
        href: `${lp}/reports/focused/${config.humanSlug}`,
        button: `${T.getAnswer[locale]} — ₹${config.priceRupees}`,
        isPrimary,
        ...tracking,
      }
    }

    const cta = topic.ctas.find(c => c.type === item.kind && c.slug === item.slug)
    if (!cta) throw new Error(`financial-astrology: topic '${topic.slug}' has no ${item.kind} CTA '${item.slug}'`)
    const heading = locale === 'hi' ? cta.label_hi : cta.label
    const description = locale === 'hi' ? cta.description_hi : cta.description

    if (item.kind === 'tool') {
      return {
        kind: item.kind,
        eyebrow: CTA_TYPE_LABELS.tool[locale],
        heading, description,
        href: `${lp}/tools/${item.slug}`,
        button: CTA_ACTION_LABELS.tool[locale],
        isPrimary,
        ...tracking,
      }
    }

    const product = reportsData.find(r => r.slug === item.slug)
    if (!product) throw new Error(`financial-astrology: report '${item.slug}' not in reportsData`)
    const href = getReportProductPath(item.slug, locale)
    const englishOnly = locale === 'hi' && !href.startsWith('/hi/')
    return {
      kind: item.kind,
      eyebrow: CTA_TYPE_LABELS.report[locale],
      heading, description, href,
      button: locale === 'hi'
        ? `${product.title.hi} पाएं — ₹${product.price}`
        : `Get ${product.title.en} — ₹${product.price}`,
      notice: englishOnly ? T.enOnlyPage.hi : undefined,
      isPrimary,
      ...tracking,
    }
  })
}
