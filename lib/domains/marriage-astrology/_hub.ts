// lib/domains/marriage-astrology/_hub.ts
// Mobile-first hub presentation for /marriage-astrology (EN + HI).
// Presentation only: every topic slug points at an EXISTING topic route;
// nothing here creates URLs or changes topic content/metadata. The topic
// order below is the approved UX order, not an SEO priority signal.

import type { IntentHubConfig } from '@/components/authority-engine/IntentHubRenderer'

export const marriageAstrologyHub: IntentHubConfig = {
  icon: '💍',
  h1:    'Marriage Astrology',
  h1_hi: 'विवाह ज्योतिष',
  lead:    'Understand marriage timing, spouse nature and compatibility through your birth chart.',
  lead_hi: 'अपनी जन्मकुंडली से विवाह का समय, जीवनसाथी का स्वभाव और अनुकूलता समझें।',

  intentHeading:    'What do you want to know?',
  intentHeading_hi: 'आप क्या जानना चाहते हैं?',
  intents: [
    { slug: 'marriage-timing',  label: 'When will I get married?',         label_hi: 'मेरी शादी कब होगी?' },
    { slug: 'love-marriage',    label: 'Will I have a love marriage?',     label_hi: 'क्या मेरा प्रेम विवाह होगा?' },
    { slug: 'arranged-marriage', label: 'Arranged marriage prospects',     label_hi: 'व्यवस्थित विवाह की संभावना' },
    { slug: 'delayed-marriage', label: 'Why is my marriage delayed?',      label_hi: 'मेरी शादी में देरी क्यों?' },
    { slug: 'spouse-nature',    label: 'What will my spouse be like?',     label_hi: 'मेरा जीवनसाथी कैसा होगा?' },
    { slug: 'compatibility',    label: 'Are we compatible?',               label_hi: 'क्या हमारी अनुकूलता है?' },
    { slug: 'married-life',     label: 'How will my married life be?',     label_hi: 'मेरा वैवाहिक जीवन कैसा रहेगा?' },
  ],

  topicsHeading:    'Marriage topics',
  topicsHeading_hi: 'विवाह के विषय',
  topics: [
    { slug: 'marriage-timing', icon: '⏰',
      title: 'Marriage Timing', title_hi: 'विवाह का समय',
      description: 'How Dasha and transits show when marriage periods may become active.',
      description_hi: 'दशा और गोचर से जानें कि विवाह के योग कब सक्रिय हो सकते हैं।' },
    { slug: 'love-marriage', icon: '❤️',
      title: 'Love Marriage', title_hi: 'प्रेम विवाह',
      description: 'The 5th and 7th houses, Venus and Rahu in a love-based union.',
      description_hi: 'प्रेम विवाह में पंचम-सप्तम भाव, शुक्र और राहु की भूमिका।' },
    { slug: 'arranged-marriage', icon: '💍',
      title: 'Arranged Marriage', title_hi: 'व्यवस्थित विवाह',
      description: 'Chart factors traditionally linked with a family-arranged match.',
      description_hi: 'परिवार द्वारा तय विवाह से जुड़े कुंडली के पारंपरिक कारक।' },
    { slug: 'delayed-marriage', icon: '⏳',
      title: 'Delayed Marriage', title_hi: 'विलंबित विवाह',
      description: 'Why marriage can be delayed — and how delay differs from denial.',
      description_hi: 'विवाह में देरी क्यों होती है, और देरी व अस्वीकृति में अंतर।' },
    { slug: 'spouse-nature', icon: '✨',
      title: 'Spouse Nature', title_hi: 'जीवनसाथी का स्वभाव',
      description: "What the 7th house and its lord suggest about your partner's nature.",
      description_hi: 'सप्तम भाव और उसके स्वामी से जीवनसाथी के स्वभाव के संकेत।' },
    { slug: 'compatibility', icon: '🤝',
      title: 'Compatibility', title_hi: 'अनुकूलता',
      description: 'Guna Milan, Manglik dosha and deeper chart compatibility.',
      description_hi: 'गुण मिलान, मांगलिक दोष और गहरी कुंडली अनुकूलता।' },
    { slug: 'married-life', icon: '🏡',
      title: 'Married Life', title_hi: 'वैवाहिक जीवन',
      description: 'Harmony, challenges and the factors that shape married life.',
      description_hi: 'वैवाहिक जीवन में सामंजस्य, चुनौतियाँ और उन्हें आकार देने वाले कारक।' },
    { slug: 'intercaste-marriage', icon: '💞',
      title: 'Intercaste Marriage', title_hi: 'अंतरजातीय विवाह',
      description: 'Planetary patterns associated with marriage across communities.',
      description_hi: 'अलग समुदायों के बीच विवाह से जुड़े ग्रह-योग।' },
    { slug: 'early-marriage', icon: '🌸',
      title: 'Early Marriage', title_hi: 'प्रारंभिक विवाह',
      description: 'Chart indicators that may point to marriage at a younger age.',
      description_hi: 'कम उम्र में विवाह की ओर संकेत करने वाले कुंडली के योग।' },
    { slug: 'second-marriage', icon: '🔄',
      title: 'Second Marriage', title_hi: 'दूसरा विवाह',
      description: 'How the chart is read for a second marriage and its timing.',
      description_hi: 'दूसरे विवाह और उसके समय के लिए कुंडली का विश्लेषण।' },
    { slug: 'divorce-possibility', icon: '💔',
      title: 'Divorce Possibility', title_hi: 'तलाक की संभावना',
      description: 'Friction factors in the chart — a tendency, never a fixed fate.',
      description_hi: 'कुंडली में तनाव के कारक — एक प्रवृत्ति, कोई तय भाग्य नहीं।' },
    { slug: 'marriage-prediction', icon: '🔮',
      title: 'Marriage Prediction', title_hi: 'विवाह भविष्यवाणी',
      description: 'An overview of how Vedic astrology reads marriage in a chart.',
      description_hi: 'वैदिक ज्योतिष कुंडली में विवाह को कैसे पढ़ता है — एक परिचय।' },
  ],

  planningHeading:    'Planning the wedding?',
  planningHeading_hi: 'विवाह की तैयारी कर रहे हैं?',

  aboutExtra:
    'A Vedic marriage reading centres on the 7th house and its lord, the Navamsa (D9) chart and the Dasha periods that activate them. ' +
    'For couples, Kundli Matching (Guna Milan) compares both charts before marriage.',
  aboutExtra_hi:
    'वैदिक ज्योतिष में विवाह का आकलन मुख्य रूप से सप्तम भाव और उसके स्वामी, नवांश (D9) कुंडली तथा उन्हें सक्रिय करने वाली दशाओं से किया जाता है। ' +
    'दंपति के लिए कुंडली मिलान (गुण मिलान) विवाह से पहले दोनों कुंडलियों की तुलना करता है।',
}
