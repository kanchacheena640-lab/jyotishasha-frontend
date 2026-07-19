// lib/domains/financial-astrology/_meta.ts
// Domain-level config for Financial Astrology.
// Localization: flat _hi suffix fields — no BiText objects.
// Categories: only 'career' is active; business/wealth/investment are roadmap items.

import type { AuthorityDomainMeta } from '@/lib/authority-engine/types'

export const financialAstrologyMeta: AuthorityDomainMeta = {
  slug: 'financial-astrology',
  basePath: '/financial-astrology',
  label: 'Financial Astrology', label_hi: 'वित्त ज्योतिष',
  hubTitle:    'Financial Astrology: Career, Wealth, and Business Timing',
  hubTitle_hi: 'वित्त ज्योतिष: करियर, धन और व्यापार का समय',
  hubSubtitle:    'Vedic astrology guides for career direction, income growth, and financial timing — all mapped to your birth chart and dasha sequence.',
  hubSubtitle_hi: 'करियर दिशा, आय वृद्धि और वित्तीय समय के लिए वैदिक ज्योतिष मार्गदर्शिकाएं — सभी आपकी जन्मकुंडली और दशा अनुक्रम पर आधारित।',
  hubMetaDescription:    'Vedic astrology guides for career direction, promotion timing, salary growth, and job decisions — mapped to your birth chart. Includes free birth chart tool.',
  hubMetaDescription_hi: 'करियर दिशा, पदोन्नति समय, वेतन वृद्धि और रोजगार निर्णयों के लिए वैदिक ज्योतिष मार्गदर्शिकाएं — आपकी जन्मकुंडली पर आधारित। निःशुल्क कुंडली टूल सहित।',
  hubKeywords: [
    'financial astrology',
    'career astrology',
    'job change astrology',
    'promotion in astrology',
    'salary growth astrology',
    'government job yoga',
    'vedic astrology career',
    'best career horoscope',
    'income growth astrology',
    'dasha career timing',
    'career birth chart',
    'financial horoscope',
  ],
  hubKeywords_hi: [
    'वित्त ज्योतिष',
    'करियर ज्योतिष',
    'नौकरी बदलाव ज्योतिष',
    'पदोन्नति ज्योतिष',
    'वेतन वृद्धि ज्योतिष',
    'सरकारी नौकरी योग',
    'वैदिक ज्योतिष करियर',
    'आय वृद्धि ज्योतिष',
    'दशा करियर समय',
  ],
  accentColor: 'amber',
  icon: '💼',
  categories: [
    {
      slug: 'career',
      label:          'Career Astrology',
      label_hi:       'करियर ज्योतिष',
      description:    'Career direction, job timing, promotion, and income growth through Vedic astrology',
      description_hi: 'वैदिक ज्योतिष के माध्यम से करियर दिशा, नौकरी समय, पदोन्नति और आय वृद्धि',
      icon: '💼',
      order: 1,
    },
  ],
  featuredSlugs: [
    'best-career',
    'job-vs-business',
    'government-job',
    'salary-growth',
  ],
}
