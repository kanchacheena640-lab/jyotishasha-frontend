// lib/domains/marriage-astrology/_landing.ts
// Opt-in landing presentation for individual Marriage topics. Only topics
// listed here get the direct answer / report unit (+ video when configured) /
// SSR FAQ (and SSR accordion bodies); every other topic renders exactly as before.

import type { TopicLandingConfig } from '../../authority-engine/landing-types'

export const marriageTimingLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Vedic astrology does not judge marriage timing from one planet or one house. An astrologer combines the 7th house and its lord, the running Mahadasha–Antardasha periods, the Navamsa (D9) chart and supporting transits of Jupiter and Saturn to find the periods when marriage is most strongly supported. The result is a likely timing window — not a guaranteed date.',
    hi: 'वैदिक ज्योतिष में शादी का समय किसी एक ग्रह या एक भाव से तय नहीं होता। ज्योतिषी सप्तम भाव और सप्तमेश, चल रही महादशा–अंतर्दशा, नवांश (D9) कुंडली और गुरु-शनि के गोचर को साथ मिलाकर देखते हैं कि किन अवधियों में विवाह के योग सबसे मज़बूत हैं। इससे विवाह की संभावित समय-अवधि का संकेत मिलता है — कोई पक्की तारीख नहीं।',
  },

  video: {
    youtubeId: 'uJ8DrQmh0nA',
    posterSrc: '/media/marriage-timing-short-poster.webp',
    posterWidth: 480,
    posterHeight: 854,
    caption: {
      en: 'Watch: why marriage timing needs your full birth chart',
      hi: 'देखें: शादी का समय जानने के लिए पूरी कुंडली क्यों ज़रूरी है',
    },
    playLabel: {
      en: 'Play video: why marriage timing needs your full birth chart',
      hi: 'वीडियो चलाएं: शादी का समय जानने के लिए पूरी कुंडली क्यों ज़रूरी है',
    },
    playFeatureName: 'marriage_timing_video_play',
  },

  offer: {
    reportSlug: 'marriage_report',
    eyebrow: { en: 'Personalised Marriage Report', hi: 'व्यक्तिगत विवाह रिपोर्ट' },
    heading: { en: 'Know Your Marriage Timing', hi: 'अपनी शादी का समय जानें' },
    intro: {
      en: 'General rules cannot tell you when your own marriage is likely. The report applies them to your birth chart.',
      hi: 'सामान्य नियम यह नहीं बता सकते कि आपकी अपनी शादी का समय कब है। यह रिपोर्ट इन्हीं नियमों को आपकी जन्मकुंडली पर लागू करती है।',
    },
    bullets: {
      en: [
        'Your birth chart with 7th house and 7th lord analysis',
        'Current and upcoming Mahadasha–Antardasha periods',
        'Periods that support marriage — indications, not a fixed date',
        'Key planetary influences and practical guidance',
      ],
      hi: [
        'सप्तम भाव और सप्तमेश के विश्लेषण के साथ आपकी जन्मकुंडली',
        'वर्तमान और आने वाली महादशा–अंतर्दशा अवधियाँ',
        'विवाह के लिए सहायक अवधियाँ — संकेत, कोई पक्की तारीख नहीं',
        'प्रमुख ग्रह प्रभाव और व्यावहारिक मार्गदर्शन',
      ],
    },
    ctaLabel: { en: 'Get My Marriage Report – ₹{price}', hi: 'मेरी विवाह रिपोर्ट पाएं – ₹{price}' },
    microcopy: {
      en: 'Personalised using your Date, Time & Place of Birth.',
      hi: 'आपकी जन्म तिथि, समय और स्थान के आधार पर तैयार।',
    },
    sampleTitle: { en: 'Marriage Report', hi: 'विवाह रिपोर्ट' },
    sampleHookLead: { en: 'See what you’ll get', hi: 'रिपोर्ट में क्या मिलेगा?' },
    reportCtaId: 'marriage_timing_report_cta',
    sampleCtaId: 'marriage_timing_sample_report',
    screenName: 'marriage_timing_topic',
  },

  contextLinks: {
    heading: { en: 'Early or Delayed Marriage?', hi: 'जल्दी या देर से विवाह?' },
    body: {
      en: 'The same principles explain why timing differs from one chart to another — some charts point to a relatively early window, others to a later one, and a delay is not a denial. These patterns have their own detailed guides:',
      hi: 'यही सिद्धांत बताते हैं कि अलग-अलग कुंडलियों में समय अलग क्यों होता है — कुछ कुंडलियाँ अपेक्षाकृत जल्दी की अवधि दिखाती हैं, कुछ बाद की, और देरी का अर्थ विवाह न होना नहीं है। इन स्थितियों पर विस्तृत मार्गदर्शिकाएँ:',
    },
    topicSlugs: ['early-marriage', 'delayed-marriage'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  ssrFaq: true,
}

// No approved Love Marriage video yet: `video` is omitted on purpose, so the
// report card renders on its own. Adding one later is config-only (a `video`
// block plus `offer.sampleHookLead`).
export const loveMarriageLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Vedic astrology does not judge love marriage from one placement. An astrologer looks at the 5th house of romance and its lord, the 7th house of marriage and its lord, and whether the two are connected — along with Venus, supporting influences such as Mars, Rahu and Jupiter, the Navamsa (D9) and the running Dasha–Antardasha. When these factors link romance with commitment, the chart indicates support for a love marriage; when they do not, it may suggest a more family-guided path. It shows a tendency, not a certainty — personal choice, family circumstances and real-life factors matter too.',
    hi: 'वैदिक ज्योतिष में प्रेम विवाह किसी एक ग्रह-स्थिति से तय नहीं होता। ज्योतिषी प्रेम के पंचम भाव और पंचमेश, विवाह के सप्तम भाव और सप्तमेश, और इन दोनों के आपसी संबंध को देखते हैं — साथ में शुक्र, मंगल, राहु और गुरु जैसे सहायक प्रभाव, नवांश (D9) और चल रही महादशा–अंतर्दशा भी। जब ये कारक प्रेम को प्रतिबद्धता से जोड़ते हैं, तो कुंडली प्रेम विवाह का समर्थन करती है; जब नहीं जोड़ते, तो परिवार की भूमिका वाले मार्ग का संकेत मिल सकता है। यह एक प्रवृत्ति है, निश्चितता नहीं — आपकी अपनी पसंद, पारिवारिक परिस्थितियाँ और जीवन की वास्तविकताएँ भी मायने रखती हैं।',
  },

  offer: {
    reportSlug: 'love_marriage_report',
    eyebrow: { en: 'Based on your birth chart', hi: 'आपकी जन्मकुंडली पर आधारित' },
    heading: { en: 'Personalised Love Marriage Report', hi: 'व्यक्तिगत प्रेम विवाह रिपोर्ट' },
    intro: {
      en: 'General rules cannot tell you how strongly your own chart supports a love marriage. The report applies them to your birth chart.',
      hi: 'सामान्य नियम यह नहीं बता सकते कि आपकी अपनी कुंडली प्रेम विवाह का कितना समर्थन करती है। यह रिपोर्ट इन्हीं नियमों को आपकी जन्मकुंडली पर लागू करती है।',
    },
    bullets: {
      en: [
        'Your love-marriage tendency, with the reasons behind it',
        '5th house (romance) and 7th house (partnership), including any 5th–7th link',
        'Venus, Mars and Jupiter influences on your relationships',
        'Current Dasha context and practical guidance',
      ],
      hi: [
        'आपकी कुंडली में प्रेम विवाह की प्रवृत्ति और उसके कारण',
        'पंचम भाव (प्रेम) और सप्तम भाव (साझेदारी), पंचम–सप्तम संबंध सहित',
        'आपके संबंधों पर शुक्र, मंगल और गुरु का प्रभाव',
        'वर्तमान दशा का संदर्भ और व्यावहारिक मार्गदर्शन',
      ],
    },
    ctaLabel: { en: 'Get Love Marriage Report – ₹{price}', hi: 'प्रेम विवाह रिपोर्ट पाएं – ₹{price}' },
    microcopy: {
      en: 'Personalised using your Date, Time & Place of Birth.',
      hi: 'आपकी जन्म तिथि, समय और स्थान के आधार पर तैयार।',
    },
    sampleTitle: { en: 'Love Marriage Report', hi: 'प्रेम विवाह रिपोर्ट' },
    reportCtaId: 'love_marriage_report_cta',
    sampleCtaId: 'love_marriage_sample_report',
    screenName: 'love_marriage_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at whether a chart supports a love marriage. Other questions have their own detailed guides — when marriage may happen, how arranged and intercaste unions are read, and what the chart shows about life after marriage:',
      hi: 'यह मार्गदर्शिका बताती है कि कुंडली प्रेम विवाह का समर्थन करती है या नहीं। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — विवाह कब हो सकता है, अरेंज्ड और अंतरजातीय विवाह कैसे देखे जाते हैं, और विवाह के बाद के जीवन के बारे में कुंडली क्या बताती है:',
    },
    topicSlugs: ['marriage-timing', 'arranged-marriage', 'intercaste-marriage', 'married-life'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  ssrFaq: true,
}

// No arranged-marriage report exists: the card offers the general Marriage
// Report, framed only as a personalised marriage reading (no love-vs-arranged
// verdict -- the sample does not contain one). No approved video yet.
export const arrangedMarriageLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'No single placement decides whether a marriage will be arranged. An astrologer reads a combination: the 7th house of marriage and its lord, and how they connect with the 2nd house (family), the 9th house (tradition and elders) and the 11th house (wider social and community network); the influence of Jupiter and Venus; the Navamsa (D9) as supporting evidence; and the running Dasha, which can activate these factors without deciding the outcome. When the family-related factors are prominent, the chart tends to support a family-assisted path — and many charts show both arranged and love indications. Personal choice, family circumstances and real-world factors matter too.',
    hi: 'कोई एक ग्रह-स्थिति यह तय नहीं करती कि विवाह अरेंज होगा। ज्योतिषी कई कारकों को मिलाकर देखते हैं: विवाह का सप्तम भाव और सप्तमेश, और इनका द्वितीय भाव (परिवार), नवम भाव (परंपरा और बड़े-बुज़ुर्ग) तथा एकादश भाव (व्यापक सामाजिक दायरा) से संबंध; गुरु और शुक्र का प्रभाव; सहायक प्रमाण के रूप में नवांश (D9); और चल रही दशा, जो इन कारकों को सक्रिय कर सकती है पर परिणाम तय नहीं करती। जब परिवार से जुड़े कारक प्रमुख हों, तो कुंडली परिवार की सहायता वाले मार्ग (व्यवस्थित विवाह) का समर्थन करती है — और कई कुंडलियों में अरेंज और लव दोनों के संकेत होते हैं। आपकी अपनी पसंद, पारिवारिक परिस्थितियाँ और जीवन की वास्तविकताएँ भी मायने रखती हैं।',
  },

  offer: {
    reportSlug: 'marriage_report',
    eyebrow: { en: 'Based on your birth chart', hi: 'आपकी जन्मकुंडली पर आधारित' },
    heading: { en: 'Personalised Marriage Reading', hi: 'व्यक्तिगत विवाह विश्लेषण' },
    intro: {
      en: 'This page explains arranged-marriage indications in general. The report reads the core marriage factors in your own chart — it does not label your marriage as love or arranged.',
      hi: 'यह पृष्ठ अरेंज मैरिज के संकेतों को सामान्य रूप से समझाता है। रिपोर्ट आपकी अपनी कुंडली के मुख्य विवाह-कारकों का विश्लेषण करती है — यह आपके विवाह को लव या अरेंज घोषित नहीं करती।',
    },
    bullets: {
      en: [
        'Your marriage outlook from the 7th house and its lord',
        'Key planetary influences on marriage',
        'Your current Dasha window and supportive periods',
        'Strengths, areas needing attention and practical guidance',
      ],
      hi: [
        'सप्तम भाव और सप्तमेश से आपके विवाह की संभावनाएँ',
        'विवाह पर प्रमुख ग्रहों का प्रभाव',
        'आपकी वर्तमान दशा और सहायक अवधियाँ',
        'मज़बूत पक्ष, ध्यान देने योग्य बातें और व्यावहारिक मार्गदर्शन',
      ],
    },
    ctaLabel: { en: 'Get My Marriage Report – ₹{price}', hi: 'मेरी विवाह रिपोर्ट पाएं – ₹{price}' },
    microcopy: {
      en: 'Personalised using your Date, Time & Place of Birth.',
      hi: 'आपकी जन्म तिथि, समय और स्थान के आधार पर तैयार।',
    },
    sampleTitle: { en: 'Marriage Report', hi: 'विवाह रिपोर्ट' },
    reportCtaId: 'arranged_marriage_report_cta',
    sampleCtaId: 'arranged_marriage_sample_report',
    screenName: 'arranged_marriage_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at whether a chart supports a family-assisted path to marriage. Related questions have their own detailed guides — the love-marriage side, when marriage may happen, matching two charts once a proposal comes, the nature of the spouse and life after marriage:',
      hi: 'यह मार्गदर्शिका बताती है कि कुंडली परिवार की सहायता वाले विवाह का समर्थन करती है या नहीं। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — प्रेम विवाह वाला पक्ष, विवाह कब हो सकता है, रिश्ता आने पर दो कुंडलियों का मिलान, जीवनसाथी का स्वभाव और विवाह के बाद का जीवन:',
    },
    topicSlugs: ['love-marriage', 'marriage-timing', 'compatibility', 'spouse-nature', 'married-life'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  // Also renders the Key Houses / Planetary Influences accordion bodies in server HTML.
  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,
}

/** Topic slug -> landing config. Topics not listed render unchanged. */
export const marriageTopicLandings: Record<string, TopicLandingConfig> = {
  'marriage-timing': marriageTimingLanding,
  'love-marriage': loveMarriageLanding,
  'arranged-marriage': arrangedMarriageLanding,
}
