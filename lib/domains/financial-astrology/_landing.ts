// lib/domains/financial-astrology/_landing.ts
// Opt-in landing presentation for individual Financial guides, following the Marriage guide pattern
// (lib/domains/marriage-astrology/_landing.ts, default dark layout): a visible "Short answer" right under the
// hero, and a short related-guides block just before the FAQ that links sibling guides by their own titles.
// Guides without an entry render exactly as before. The Financial CTA panel, schema and FAQ are unchanged.
//
// No CTAs here: products stay in the Financial CTA panel (lib/domains/financial-astrology/_ctas.ts).

import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'

interface Localized { en: string; hi: string }

export interface FinancialTopicLanding {
  directAnswerLabel: Localized
  directAnswer: Localized
  /** Related guides shown before the FAQ: registered topic slugs in this domain, linked by their own titles. */
  relatedGuides?: { heading: Localized; body: Localized; topicSlugs: string[] }
}

export const FINANCIAL_TOPIC_LANDINGS: Record<string, FinancialTopicLanding> = {
  'best-career': {
    directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
    directAnswer: {
      en: 'Your birth chart does not guarantee one particular job. In Vedic astrology, career direction is assessed by reading several factors together: the 10th house and its lord, the nakshatra of the 10th lord, your Atmakaraka, and your current Dasha period. Where these agree, they describe the kinds of work your chart supports.',
      hi: 'आपकी जन्मकुंडली किसी एक खास नौकरी की गारंटी नहीं देती। वैदिक ज्योतिष में करियर की दिशा कई कारकों को साथ पढ़कर आँकी जाती है: दशम भाव और उसका स्वामी, दशमेश का नक्षत्र, आपका आत्मकारक, और आपकी वर्तमान दशा। जहाँ ये संकेत आपस में मिलते हैं, वहाँ वे उन कामों के बारे में बताते हैं जिनका आपकी कुंडली समर्थन करती है।',
    },
    // Only links the page does not already have (it already links new-job-chances, job-vs-business and
    // job-change-prediction as related topics, and the hub through its breadcrumb): the other "Career
    // Direction" guide and the hub's other 10th-house guide.
    relatedGuides: {
      heading: { en: 'Related Career Questions', hi: 'करियर से जुड़े और प्रश्न' },
      body: {
        en: 'If you are weighing a government career, or want to know how a career develops over time, these guides go further.',
        hi: 'अगर आप सरकारी करियर पर विचार कर रहे हैं, या जानना चाहते हैं कि करियर समय के साथ कैसे आगे बढ़ता है, तो ये गाइड आगे की जानकारी देती हैं।',
      },
      topicSlugs: ['government-job', 'career-growth'],
    },
  },
}

export interface ResolvedFinancialLanding {
  label: string
  answer: string
  related?: { heading: string; body: string; links: { href: string; title: string }[] }
}

/** The landing for a Financial guide, or null for guides without one. Throws on an unknown related slug. */
export function resolveFinancialLanding(domain: AuthorityDomain, topic: AuthorityTopic, locale: Locale): ResolvedFinancialLanding | null {
  const landing = FINANCIAL_TOPIC_LANDINGS[topic.slug]
  if (!landing) return null
  const lp = locale === 'hi' ? '/hi' : ''
  const pick = (s: Localized) => (locale === 'hi' ? s.hi : s.en)
  const related = landing.relatedGuides && {
    heading: pick(landing.relatedGuides.heading),
    body: pick(landing.relatedGuides.body),
    links: landing.relatedGuides.topicSlugs.map(slug => {
      const target = domain.topics[slug]
      if (!target || slug === topic.slug) throw new Error(`financial-astrology: landing related guide '${slug}' is not a registered sibling guide`)
      return { href: `${lp}${domain.basePath}/${slug}`, title: locale === 'hi' && target.title_hi ? target.title_hi : target.title }
    }),
  }
  return { label: pick(landing.directAnswerLabel), answer: pick(landing.directAnswer), ...(related ? { related } : {}) }
}
