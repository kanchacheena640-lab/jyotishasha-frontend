// lib/domains/financial-astrology/_meta.ts
// Domain-level config for Financial Astrology.
// Localization: flat _hi suffix fields — no BiText objects.
// Categories: 'career', 'wealth', 'stability' and 'business' are active; investment is a roadmap item.

import type { AuthorityDomainMeta } from '@/lib/authority-engine/types'

export const financialAstrologyMeta: AuthorityDomainMeta = {
  slug: 'financial-astrology',
  basePath: '/financial-astrology',
  label: 'Financial Astrology', label_hi: 'वित्त ज्योतिष',
  hubTitle:    'Financial Astrology: Career Guides, Free Tools & Reports',
  hubTitle_hi: 'वित्त ज्योतिष: करियर गाइड, फ्री टूल्स और रिपोर्ट',
  hubSubtitle:    'Read career direction, job changes, promotion and income, and your business and wealth indications in your birth chart, with free tools and personalised reports.',
  hubSubtitle_hi: 'अपनी जन्मकुंडली से करियर की दिशा, नौकरी में बदलाव, प्रमोशन और आय, और व्यापार व धन के संकेत समझें — फ्री टूल्स और व्यक्तिगत रिपोर्ट के साथ।',
  hubMetaDescription:    'Vedic guides to career, job change, promotion and salary, with free Dhan Yog, Lakshmi Yog and career tools, plus wealth, career and business reports.',
  hubMetaDescription_hi: 'करियर, नौकरी बदलाव, प्रमोशन और वेतन पर वैदिक गाइड, फ्री धन योग, लक्ष्मी योग और करियर टूल्स, साथ ही धन, करियर और व्यापार रिपोर्ट।',
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
    {
      slug: 'wealth',
      label:          'Wealth Astrology',
      label_hi:       'धन ज्योतिष',
      description:    'Wealth combinations such as Dhan Yoga and how Vedic astrology reads them',
      description_hi: 'धन योग जैसे धन के संयोग और वैदिक ज्योतिष उन्हें कैसे पढ़ता है',
      icon: '🪙',
      order: 2,
    },
    {
      slug: 'stability',
      label:          'Savings & Stability',
      label_hi:       'बचत और स्थिरता',
      description:    'Savings, expenses and financial steadiness through Vedic astrology',
      description_hi: 'वैदिक ज्योतिष के माध्यम से बचत, खर्च और आर्थिक स्थिरता',
      icon: '🏦',
      order: 3,
    },
    {
      slug: 'business',
      label:          'Business Astrology',
      label_hi:       'व्यापार ज्योतिष',
      description:    'Reading an existing or committed business through Vedic astrology',
      description_hi: 'वैदिक ज्योतिष के माध्यम से चल रहे या तय किए गए व्यापार का विश्लेषण',
      icon: '🤝',
      order: 4,
    },
  ],
  featuredSlugs: [
    'best-career',
    'job-vs-business',
    'government-job',
    'salary-growth',
  ],
}
