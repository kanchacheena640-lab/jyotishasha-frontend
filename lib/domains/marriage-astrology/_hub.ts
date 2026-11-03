// lib/domains/marriage-astrology/_hub.ts
// Mobile-first hub presentation for /marriage-astrology (EN + HI).
// Presentation only: every link points at an EXISTING route (topic pages,
// free tools, the muhurat page, report product pages); nothing here creates
// URLs or changes topic content/metadata.
//
// Report names, prices and focused-report questions are NOT typed here: the
// renderer reads them from app/data/reportsData.ts and the focused-report
// catalog (via app/data/focusedReportsConfig.ts), so the hub can
// never drift from what the product pages sell. The short standard-report
// descriptions below only name sections the backend generator actually
// writes (prompts/<slug>_en.txt, modules/love/love_prompt_builder.py).

import type { IntentHubConfig } from '@/components/authority-engine/IntentHubRenderer'

export const marriageAstrologyHub: IntentHubConfig = {
  icon: '💍',
  h1:    'Marriage Astrology',
  h1_hi: 'विवाह ज्योतिष',
  lead:    'Understand marriage timing, spouse nature and compatibility through your birth chart, with free tools and personalised reports.',
  lead_hi: 'अपनी जन्मकुंडली से विवाह का समय, जीवनसाथी का स्वभाव और अनुकूलता समझें, फ्री टूल्स और व्यक्तिगत रिपोर्ट के साथ।',

  seoTitle:    'Marriage Astrology: Vedic Guide, Free Tools & Reports',
  seoTitle_hi: 'विवाह ज्योतिष: वैदिक मार्गदर्शिका, फ्री टूल्स और रिपोर्ट | ज्योतिष आशा',
  metaDescription:
    'Vedic marriage astrology on timing, love or arranged marriage, delays, spouse and compatibility, with free Kundli matching, Mangal Dosh check and reports.',
  metaDescription_hi:
    'विवाह का समय, प्रेम या अरेंज्ड विवाह, देरी, जीवनसाथी और अनुकूलता पर वैदिक मार्गदर्शन, फ्री कुंडली मिलान, मंगल दोष जाँच और व्यक्तिगत रिपोर्ट के साथ।',

  // Section 1 -- eight questions, each to its most relevant existing guide.
  intentHeading:    'Do You Have These Questions About Your Marriage Too?',
  intentHeading_hi: 'क्या आपकी शादी को लेकर आपके मन में भी ये सवाल हैं?',
  intents: [
    { slug: 'marriage-timing',     icon: '⏰', label: 'When will I get married?',                        label_hi: 'मेरी शादी कब होगी?' },
    // The arranged-marriage guide carries the "Love or Arranged? How Astrologers Weigh It" comparison.
    { slug: 'arranged-marriage',   icon: '💑', label: 'Will mine be a love or arranged marriage?',       label_hi: 'मेरी शादी लव मैरिज होगी या अरेंज्ड?' },
    { slug: 'delayed-marriage',    icon: '⏳', label: 'Why is my marriage getting delayed?',             label_hi: 'मेरी शादी में देरी क्यों हो रही है?' },
    { slug: 'spouse-nature',       icon: '✨', label: 'What will my future spouse be like?',             label_hi: 'मेरा जीवनसाथी कैसा होगा?' },
    { slug: 'intercaste-marriage', icon: '💞', label: 'Will I marry someone from a different caste?',    label_hi: 'क्या मेरी शादी दूसरी जाति में होगी?' },
    { slug: 'compatibility',       icon: '🤝', label: 'How compatible are we?',                          label_hi: 'हम दोनों की अनुकूलता कितनी है?' },
    { slug: 'married-life',        icon: '🏡', label: 'Will my married life be happy?',                  label_hi: 'क्या मेरा वैवाहिक जीवन सुखी रहेगा?' },
    { slug: 'second-marriage',     icon: '🔄', label: 'Is a second marriage indicated in my horoscope?', label_hi: 'क्या मेरी कुंडली में दूसरे विवाह का योग है?' },
  ],

  // Section 2 -- existing free tools (EN at the path, HI under /hi) + the muhurat page.
  toolsHeading:    'Explore Free Marriage Tools',
  toolsHeading_hi: 'विवाह के फ्री टूल्स',
  tools: [
    { href: '/love', icon: '💍',
      title: 'Kundli Matching', title_hi: 'कुंडली मिलान',
      benefit: '36-guna Ashtakoot score with a koota breakdown and Mangal Dosh check for both partners.',
      benefit_hi: 'दोनों के लिए 36 गुणों का अष्टकूट स्कोर, हर कूट का ब्योरा और मंगल दोष जाँच।' },
    { href: '/tools/mangal-dosh', icon: '🔴',
      title: 'Mangal Dosh Calculator', title_hi: 'मंगल दोष कैलकुलेटर',
      benefit: 'Checks Mars from your Lagna and Moon, with the traditional cancellation rules.',
      benefit_hi: 'लग्न और चंद्र से मंगल की स्थिति, पारंपरिक दोष-भंग नियमों के साथ।' },
    { href: '/tools/marriage-path', icon: '🧭',
      title: 'Marriage Path Calculator', title_hi: 'विवाह मार्ग कैलकुलेटर',
      benefit: 'A quick read of your 7th house: planets placed there and the strength of Venus and Jupiter.',
      benefit_hi: 'आपके सप्तम भाव की झलक: वहाँ के ग्रह और शुक्र व गुरु की स्थिति।' },
    { href: '/tools/love-life', icon: '❤️',
      title: 'Love Life Calculator', title_hi: 'प्रेम जीवन कैलकुलेटर',
      benefit: 'Planet placements in your chart that support or challenge your love life.',
      benefit_hi: 'आपकी कुंडली के वे ग्रह जो प्रेम जीवन को सहारा देते हैं या चुनौती देते हैं।' },
  ],
  muhurat: {
    href: '/panchang/muhurat/marriage-muhurat', icon: '🪔',
    title: 'Marriage Muhurat', title_hi: 'विवाह मुहूर्त',
    benefit: 'Auspicious wedding dates month by month, from the Hindu Panchang.',
    benefit_hi: 'हिंदू पंचांग के अनुसार महीने-दर-महीने शुभ विवाह तिथियाँ।',
    cta: 'See wedding dates', cta_hi: 'शुभ तिथियाँ देखें',
  },

  // Section 3 -- personalised reports. Names/prices come from the catalogs at render time.
  reports: {
    heading:    'Get Personalized Answers About Your Marriage',
    heading_hi: 'अपनी शादी से जुड़े सवालों के व्यक्तिगत जवाब पाएं',
    intro:    'Each report is prepared from your own birth details and emailed to you as a PDF.',
    intro_hi: 'हर रिपोर्ट आपकी अपनी जन्म जानकारी से तैयार होती है और PDF के रूप में ईमेल पर भेजी जाती है।',
    featured: {
      slug: 'marriage_report',
      // = reportsData.ts fullDescription for marriage_report (outlook, Dasha window, married-life sections).
      description: 'Explore your marriage outlook, supportive Dasha periods and married-life dynamics through a personalized birth-chart reading.',
      description_hi: 'व्यक्तिगत कुंडली विश्लेषण के माध्यम से अपने विवाह की संभावनाएँ, सहायक दशा अवधियाँ और वैवाहिक जीवन के आपसी व्यवहार को समझें।',
    },
    more: [
      { slug: 'love_marriage_report',
        description: 'Reads your 5th and 7th houses, Venus, Mars and Jupiter, and your current Dasha for love-marriage tendencies.',
        description_hi: 'आपके पंचम और सप्तम भाव, शुक्र, मंगल व गुरु और वर्तमान दशा से प्रेम विवाह की प्रवृत्ति का विश्लेषण।' },
      { slug: 'delay_in_marriage_report',
        description: 'Reads your 7th house and its lord, Saturn, Mars and Rahu-Ketu, and the current Dasha behind a delay.',
        description_hi: 'सप्तम भाव और उसके स्वामी, शनि, मंगल, राहु-केतु और वर्तमान दशा से विवाह में देरी के कारणों का विश्लेषण।' },
      { slug: 'relationship_future_report',
        description: 'For two people: koota-wise Ashtakoot compatibility, both charts’ 5th and 7th houses and current Dasha.',
        description_hi: 'दो लोगों के लिए: कूट-वार अष्टकूट अनुकूलता, दोनों कुंडलियों के पंचम-सप्तम भाव और वर्तमान दशा।' },
    ],
    focusedHeading:    'Ask One Specific Question',
    focusedHeading_hi: 'एक खास सवाल पूछें',
    focusedIntro:    'Focused reports answer one question in a short PDF.',
    focusedIntro_hi: 'फोकस्ड रिपोर्ट एक सवाल का जवाब एक छोटी PDF में देती है।',
    // Real focused-report question_keys (marriage + relationship categories); question
    // text, price and description are read from focusedReportsConfig at render time.
    focusedKeys: [
      'marriage_chances_timing',
      'strongest_marriage_periods',
      'marriage_delay_reason',
      'marriage_delay_easing',
      'kundali_match_for_marriage',
      'relationship_lead_to_marriage',
    ],
  },

  // Section 4 -- all 12 topic guides, each exactly once, in five groups.
  topicsHeading:    'Explore Marriage & Relationships Through Vedic Astrology',
  topicsHeading_hi: 'वैदिक ज्योतिष से विवाह और रिश्तों को समझें',
  topicGroups: [
    { id: 'timing', icon: '⏰',
      title: 'Marriage Prediction & Timing', title_hi: 'विवाह भविष्यवाणी और समय',
      description: 'How the chart shows marriage and when its periods become active.',
      description_hi: 'कुंडली में विवाह के योग और उनके सक्रिय होने का समय।' },
    { id: 'path', icon: '💑',
      title: 'Love & Arranged Marriage', title_hi: 'प्रेम और अरेंज्ड विवाह',
      description: 'Love, family-arranged and intercaste paths to marriage.',
      description_hi: 'प्रेम, परिवार द्वारा तय और अंतरजातीय विवाह के योग।' },
    { id: 'spouse', icon: '🏡',
      title: 'Spouse & Married Life', title_hi: 'जीवनसाथी और वैवाहिक जीवन',
      description: 'Your partner’s nature and the harmony of married life.',
      description_hi: 'जीवनसाथी का स्वभाव और वैवाहिक जीवन का सामंजस्य।' },
    { id: 'match', icon: '🤝',
      title: 'Compatibility & Matching', title_hi: 'अनुकूलता और कुंडली मिलान',
      description: 'Guna Milan, Mangal Dosh and deeper chart compatibility.',
      description_hi: 'गुण मिलान, मंगल दोष और गहरी कुंडली अनुकूलता।' },
    { id: 'challenges', icon: '🌱',
      title: 'Marriage Challenges', title_hi: 'विवाह की चुनौतियाँ',
      description: 'Delays, marital stress and the possibility of a second marriage.',
      description_hi: 'विवाह में देरी, वैवाहिक तनाव और दूसरे विवाह की संभावना।' },
  ],
  topics: [
    { slug: 'marriage-prediction', group: 'timing',     title: 'Marriage Prediction', title_hi: 'विवाह भविष्यवाणी' },
    { slug: 'marriage-timing',     group: 'timing',     title: 'Marriage Timing',     title_hi: 'विवाह का समय' },
    { slug: 'early-marriage',      group: 'timing',     title: 'Early Marriage',      title_hi: 'प्रारंभिक विवाह' },
    { slug: 'love-marriage',       group: 'path',       title: 'Love Marriage',       title_hi: 'प्रेम विवाह' },
    { slug: 'arranged-marriage',   group: 'path',       title: 'Arranged Marriage',   title_hi: 'व्यवस्थित विवाह' },
    { slug: 'intercaste-marriage', group: 'path',       title: 'Intercaste Marriage', title_hi: 'अंतरजातीय विवाह' },
    { slug: 'spouse-nature',       group: 'spouse',     title: 'Spouse Nature',       title_hi: 'जीवनसाथी का स्वभाव' },
    { slug: 'married-life',        group: 'spouse',     title: 'Married Life',        title_hi: 'वैवाहिक जीवन' },
    { slug: 'compatibility',       group: 'match',      title: 'Compatibility',       title_hi: 'अनुकूलता' },
    { slug: 'delayed-marriage',    group: 'challenges', title: 'Delayed Marriage',    title_hi: 'विलंबित विवाह' },
    { slug: 'divorce-possibility', group: 'challenges', title: 'Divorce Possibility', title_hi: 'तलाक की संभावना' },
    { slug: 'second-marriage',     group: 'challenges', title: 'Second Marriage',     title_hi: 'दूसरा विवाह' },
  ],

  // Section 5 -- the four factors a Vedic marriage reading rests on, each linked to the
  // existing guide that treats it in depth (and the natal 7th-house placement pages).
  basics: {
    heading:    'How Vedic Astrology Reads Marriage',
    heading_hi: 'वैदिक ज्योतिष विवाह को कैसे पढ़ता है',
    intro:    'A Vedic marriage reading rests on four chart factors. No single factor decides the outcome; astrologers weigh them together.',
    intro_hi: 'विवाह के वैदिक विश्लेषण में मुख्य रूप से चार कारक देखे जाते हैं। कोई एक कारक परिणाम तय नहीं करता; ज्योतिषी इन्हें साथ मिलाकर पढ़ते हैं।',
    items: [
      { id: 'seventh-house', icon: '🏠',
        title: 'The 7th house', title_hi: 'सप्तम भाव',
        body: 'The house of marriage and partnership. Its sign, the planets placed in it and the planets aspecting it describe the nature of partnership and the qualities associated with a spouse. An empty 7th house is still read through its sign and its lord.',
        body_hi: 'विवाह और साझेदारी का भाव। इसकी राशि, इसमें बैठे ग्रह और इस पर दृष्टि डालने वाले ग्रह साझेदारी के स्वभाव और जीवनसाथी से जुड़े गुणों को दर्शाते हैं। खाली सप्तम भाव को भी उसकी राशि और स्वामी से पढ़ा जाता है।',
        links: [
          { href: '/marriage-astrology/marriage-prediction', label: 'Marriage Prediction', label_hi: 'विवाह भविष्यवाणी' },
          { href: '/planet-in-house/venus-in-7th-house', label: 'Venus in the 7th house', label_hi: 'सप्तम भाव में शुक्र' },
          { href: '/planet-in-house/mars-in-7th-house', label: 'Mars in the 7th house', label_hi: 'सप्तम भाव में मंगल' },
          { href: '/planet-in-house/saturn-in-7th-house', label: 'Saturn in the 7th house', label_hi: 'सप्तम भाव में शनि' },
        ] },
      { id: 'seventh-lord', icon: '🪐',
        title: 'The 7th lord', title_hi: 'सप्तमेश',
        body: 'The planet that rules the sign on the 7th house. Its placement and strength show how well marriage is supported in the chart; a weak or afflicted 7th lord is one traditional sign of delay.',
        body_hi: 'सप्तम भाव की राशि का स्वामी ग्रह। इसकी स्थिति और बल बताते हैं कि कुंडली में विवाह को कितना सहारा मिलता है; कमज़ोर या पीड़ित सप्तमेश देरी का एक पारंपरिक संकेत है।',
        links: [
          { href: '/marriage-astrology/spouse-nature', label: 'Spouse Nature', label_hi: 'जीवनसाथी का स्वभाव' },
          { href: '/marriage-astrology/delayed-marriage', label: 'Delayed Marriage', label_hi: 'विलंबित विवाह' },
        ] },
      { id: 'navamsa', icon: '🧭',
        title: 'Navamsa (D9)', title_hi: 'नवांश (D9)',
        body: 'The ninth divisional chart. Astrologers use it to confirm the marriage indications seen in the birth chart and to judge the strength of married life.',
        body_hi: 'नौवीं वर्ग कुंडली। ज्योतिषी इससे जन्मकुंडली में दिखे विवाह-संकेतों की पुष्टि करते हैं और वैवाहिक जीवन की मज़बूती आँकते हैं।',
        links: [
          { href: '/marriage-astrology/married-life', label: 'Married Life', label_hi: 'वैवाहिक जीवन' },
        ] },
      { id: 'dasha', icon: '🕰️',
        title: 'Dasha periods', title_hi: 'दशा',
        body: 'Mahadasha and Antardasha periods bring the chart’s indications into focus. Marriage indications are traditionally read as active in periods of the 7th lord, Venus or planets linked to the 7th house, especially when Jupiter or Saturn transits support them. Periods show tendencies, not fixed dates.',
        body_hi: 'महादशा और अंतर्दशा कुंडली के संकेतों को सक्रिय करती हैं। परंपरा के अनुसार विवाह के योग सप्तमेश, शुक्र या सप्तम भाव से जुड़े ग्रहों की दशा में सक्रिय माने जाते हैं, विशेषकर जब गुरु या शनि का गोचर साथ दे। दशाएँ प्रवृत्ति बताती हैं, कोई तय तारीख नहीं।',
        links: [
          { href: '/marriage-astrology/marriage-timing', label: 'Marriage Timing', label_hi: 'विवाह का समय' },
        ] },
    ],
  },
}
