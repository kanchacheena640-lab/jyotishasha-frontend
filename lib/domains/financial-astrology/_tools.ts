// lib/domains/financial-astrology/_tools.ts
// Financial Astrology free-tool pages: which guide and which ₹99 standard report each of the seven Financial
// tools links to (server-rendered, under the tool's own content). Only the tool IDs listed here get the
// Financial breadcrumb + links block; every other tool page renders exactly as before.
//
// Names and prices are never typed here: report title/price come from app/data/reportsData.ts, guide titles
// from the Financial Astrology registry, the hub label from the domain meta.

import { reportsData } from '@/app/data/reportsData'
import { getReportProductPath } from '@/lib/reportProductSeo'
import { getAuthorityDomain } from '@/lib/authority-engine/resolver'

export const FINANCIAL_TOOL_LINKS: Record<string, { guide: string; report: string }> = {
  'career-path':       { guide: 'best-career',           report: 'career_report' },
  'government-job':    { guide: 'government-job',        report: 'government_job_report' },
  'business-path':     { guide: 'job-vs-business',       report: 'business_report' },
  // Dhan, Lakshmi and Kuber yogas: the 2nd/11th-house income guide, and the Financial Report, which reads
  // these wealth yogas (same destination as their result CTA in lib/yogaReportCta.ts).
  'dhan-yog':          { guide: 'salary-growth',         report: 'financial_report' },
  'lakshmi-yog':       { guide: 'salary-growth',         report: 'financial_report' },
  'kuber-rajyog':      { guide: 'salary-growth',         report: 'financial_report' },
  // Current Mahadasha/Antardasha: the guide on reading dasha periods for job change, and the Career Report,
  // which reads the current dasha window for career.
  'grah-dasha-finder': { guide: 'job-change-prediction', report: 'career_report' },
}

export interface FinancialToolLinkSet {
  hub: { href: string; label: string }
  guide: { href: string; label: string }
  report: { href: string; label: string; price: number; englishOnlyNotice?: string }
}

const T = {
  hubLabel: { en: 'Financial Astrology', hi: 'वित्त ज्योतिष' },
  // Same notice as the Marriage hub / Financial guides; the report checkout offers Hindi as the report language.
  enOnlyPage: 'यह पेज अंग्रेज़ी में है; फ़ॉर्म में रिपोर्ट की भाषा हिंदी चुन सकते हैं।',
}

/** Resolved links for a Financial tool, or null for every other tool. Throws if a reference does not resolve. */
export function financialToolLinks(toolId: string, locale: 'en' | 'hi'): FinancialToolLinkSet | null {
  const entry = FINANCIAL_TOOL_LINKS[toolId]
  if (!entry) return null
  const lp = locale === 'hi' ? '/hi' : ''
  const domain = getAuthorityDomain('financial-astrology')
  const topic = domain.topics[entry.guide]
  if (!topic) throw new Error(`financial tools: unknown guide '${entry.guide}'`)
  const report = reportsData.find((r) => r.slug === entry.report)
  if (!report) throw new Error(`financial tools: unknown report '${entry.report}'`)
  const reportHref = getReportProductPath(entry.report, locale)
  return {
    hub: { href: `${lp}${domain.basePath}`, label: T.hubLabel[locale] },
    guide: { href: `${lp}${domain.basePath}/${entry.guide}`, label: locale === 'hi' ? topic.title_hi : topic.title },
    report: {
      href: reportHref,
      label: report.title[locale],
      price: report.price,
      englishOnlyNotice: locale === 'hi' && !reportHref.startsWith('/hi/') ? T.enOnlyPage : undefined,
    },
  }
}
