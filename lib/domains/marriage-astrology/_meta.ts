// lib/domains/marriage-astrology/_meta.ts
// Domain-level config for Marriage Astrology.
// Localization: flat _hi suffix fields — no BiText objects.
// Categories: only 'marriage' is active; compatibility/remedies are roadmap items.
// Registry: commented out in lib/authority-engine/registry.ts until content is ready.

import type { AuthorityDomainMeta } from '@/lib/authority-engine/types'

export const marriageAstrologyMeta: AuthorityDomainMeta = {
  slug:     'marriage-astrology',
  basePath: '/marriage-astrology',
  label:    'Marriage Astrology', label_hi: 'विवाह ज्योतिष',

  hubTitle:    'Marriage Astrology: Vedic Guide to Love, Timing & Compatibility',
  hubTitle_hi: 'विवाह ज्योतिष: प्रेम, समय और अनुकूलता की वैदिक मार्गदर्शिका',

  hubSubtitle:    'Explore Vedic astrology insights on marriage timing, spouse nature, compatibility, and marital life through your birth chart.',
  hubSubtitle_hi: 'जन्मकुंडली के माध्यम से विवाह के समय, जीवनसाथी के स्वभाव, अनुकूलता और वैवाहिक जीवन पर वैदिक ज्योतिष की अंतर्दृष्टि प्राप्त करें।',

  hubMetaDescription:    'Discover Vedic astrology insights on marriage timing, love marriage, compatibility, spouse nature, and marital life — guided by your birth chart and Navamsa.',
  hubMetaDescription_hi: 'विवाह के समय, प्रेम विवाह, अनुकूलता, जीवनसाथी के स्वभाव और वैवाहिक जीवन पर वैदिक ज्योतिष की अंतर्दृष्टि — आपकी जन्मकुंडली और नवांश द्वारा निर्देशित।',

  hubKeywords:    ['marriage astrology', 'vedic marriage prediction', 'marriage timing astrology', 'spouse nature vedic', 'kundli marriage compatibility'],
  hubKeywords_hi: ['विवाह ज्योतिष', 'वैदिक विवाह भविष्यवाणी', 'विवाह समय ज्योतिष', 'कुंडली विवाह अनुकूलता'],

  accentColor: 'rose',
  icon: '💍',

  categories: [
    {
      slug:           'marriage',
      label:          'Marriage Astrology',
      label_hi:       'विवाह ज्योतिष',
      description:    'TODO',
      description_hi: 'TODO',
      icon:           '💍',
      order:          1,
    },
  ],

  featuredSlugs: [
    'marriage-prediction',
    'marriage-timing',
    'love-marriage',
    'compatibility',
  ],
}
