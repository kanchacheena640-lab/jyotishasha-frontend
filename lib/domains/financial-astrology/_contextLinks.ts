// lib/domains/financial-astrology/_contextLinks.ts
// Contextual links between Financial guides, rendered by the Financial guide route right after a named
// section (the shared renderer's existing `afterSections` slot). Guide content files stay unchanged, and a
// guide without an entry here renders exactly as before.
//
// Hrefs are localized at render time (/hi on Hindi pages). Every entry must point at a registered guide and
// name a section that exists in the source guide; anything else throws, so a broken link fails tests/build.

import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'

interface ContextLinkEntry {
  /** Section of the source guide the link follows. */
  afterSectionId: string
  /** Target guide slug in this domain. */
  target: string
  lead: string
  lead_hi: string
  label: string
  label_hi: string
}

export const FINANCIAL_CONTEXT_LINKS: Record<string, ContextLinkEntry[]> = {
  // Readers past the job-or-business decision go on to the Business Astrology guide.
  'job-vs-business': [
    {
      afterSectionId: 'business-readiness',
      target: 'business-astrology',
      lead: 'Already running a business, or committed to starting one?',
      lead_hi: 'पहले से व्यापार चला रहे हैं या शुरू करने का निश्चय कर चुके हैं?',
      label: 'Read the Business Astrology guide',
      label_hi: 'व्यापार ज्योतिष गाइड पढ़ें',
    },
  ],
}

export interface FinancialContextLink {
  afterSectionId: string
  href: string
  lead: string
  label: string
}

export function resolveFinancialContextLinks(domain: AuthorityDomain, topic: AuthorityTopic, locale: Locale): FinancialContextLink[] {
  const entries = FINANCIAL_CONTEXT_LINKS[topic.slug] ?? []
  const lp = locale === 'hi' ? '/hi' : ''
  return entries.map(entry => {
    if (!domain.topics[entry.target]) throw new Error(`financial-astrology: context link target '${entry.target}' is not a registered guide`)
    if (!topic.sections.some(s => s.id === entry.afterSectionId)) {
      throw new Error(`financial-astrology: '${topic.slug}' has no section '${entry.afterSectionId}' for a context link`)
    }
    return {
      afterSectionId: entry.afterSectionId,
      href: `${lp}${domain.basePath}/${entry.target}`,
      lead: locale === 'hi' ? entry.lead_hi : entry.lead,
      label: locale === 'hi' ? entry.label_hi : entry.label,
    }
  })
}
