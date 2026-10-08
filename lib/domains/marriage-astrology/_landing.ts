// lib/domains/marriage-astrology/_landing.ts
// Opt-in landing presentation for individual Marriage topics. Only topics
// listed here get the direct answer / report unit (+ video when configured) /
// SSR FAQ (and SSR accordion bodies); every other topic renders exactly as before.

import type { AnyTopicLandingConfig, TopicLandingConfig, ToolLedLandingConfig } from '../../authority-engine/landing-types'

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

// Dedicated product: the Delay in Marriage Report (its own sample covers delay
// signal, 7th house/lord, Saturn/Mars/Rahu-Ketu, current Dasha, what can
// support the pattern). No timing promise, no Navamsa/transit claims. No video yet.
export const delayedMarriageLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Astrology does not trace a delay in marriage to one placement. Astrologers read a combination: the condition of the 7th house and its lord; the influence of Saturn, Mars, Rahu and Ketu on them; the strength of Venus and Jupiter; supporting factors such as a combust or retrograde 7th lord; the Navamsa (D9) as supporting evidence; and the running Dasha, which can activate these factors. Together they may indicate a tendency toward slower progress or extra effort — not a fixed outcome, and not that marriage will not happen. Real-world circumstances such as education, career, family and personal choice matter too.',
    hi: 'ज्योतिष में शादी में देरी को किसी एक ग्रह-स्थिति से नहीं जोड़ा जाता। ज्योतिषी कई कारकों को मिलाकर देखते हैं: सप्तम भाव और सप्तमेश की स्थिति; उन पर शनि, मंगल, राहु और केतु का प्रभाव; शुक्र और गुरु की शक्ति; अस्त या वक्री सप्तमेश जैसे सहायक कारक; सहायक प्रमाण के रूप में नवांश (D9); और चल रही दशा, जो इन कारकों को सक्रिय कर सकती है। ये मिलकर धीमी प्रगति या अधिक प्रयास की प्रवृत्ति का संकेत दे सकते हैं — कोई तय परिणाम नहीं, और न ही यह कि विवाह नहीं होगा। पढ़ाई, करियर, परिवार और अपनी पसंद जैसी वास्तविक परिस्थितियाँ भी मायने रखती हैं।',
  },

  offer: {
    reportSlug: 'delay_in_marriage_report',
    eyebrow: { en: 'Based on your birth chart', hi: 'आपकी जन्मकुंडली पर आधारित' },
    heading: { en: 'Delay in Marriage Report', hi: 'विवाह में देरी रिपोर्ट' },
    intro: {
      en: 'General rules cannot show which delay factors apply to your own chart. The report reads them in your birth chart — it does not predict an exact marriage date.',
      hi: 'सामान्य नियम यह नहीं बता सकते कि आपकी अपनी कुंडली में देरी के कौन-से कारक लागू होते हैं। यह रिपोर्ट इन्हें आपकी जन्मकुंडली में पढ़ती है — यह विवाह की कोई सटीक तारीख नहीं बताती।',
    },
    bullets: {
      en: [
        'Your delay signal, with the reasons behind it',
        '7th house and 7th lord evidence',
        'Saturn, Mars and Rahu–Ketu factors in your chart',
        'Current Dasha window and what can support the pattern',
      ],
      hi: [
        'आपकी कुंडली में देरी का संकेत और उसके कारण',
        'सप्तम भाव और सप्तमेश का विश्लेषण',
        'आपकी कुंडली में शनि, मंगल और राहु–केतु के कारक',
        'वर्तमान दशा और इस प्रवृत्ति में क्या सहायक हो सकता है',
      ],
    },
    ctaLabel: { en: 'Get My Delay Report – ₹{price}', hi: 'विवाह में देरी रिपोर्ट पाएं – ₹{price}' },
    microcopy: {
      en: 'Personalised using your Date, Time & Place of Birth.',
      hi: 'आपकी जन्म तिथि, समय और स्थान के आधार पर तैयार।',
    },
    sampleTitle: { en: 'Delay in Marriage Report', hi: 'विवाह में देरी रिपोर्ट' },
    reportCtaId: 'delayed_marriage_report_cta',
    sampleCtaId: 'delayed_marriage_sample_report',
    screenName: 'delayed_marriage_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at why marriage may be delayed. Related questions have their own detailed guides — when marriage may happen, the love and arranged paths to marriage, matching two charts and life after marriage:',
      hi: 'यह मार्गदर्शिका बताती है कि शादी में देरी क्यों हो सकती है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — विवाह कब हो सकता है, प्रेम और अरेंज विवाह के मार्ग, दो कुंडलियों का मिलान और विवाह के बाद का जीवन:',
    },
    topicSlugs: ['marriage-timing', 'love-marriage', 'arranged-marriage', 'compatibility', 'married-life'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,
}

// Dedicated product: the Spouse Nature Report (rep_026). Bullets stay within its
// sample (nature/temperament, communication and emotional style, the 7th-house,
// Navamsa and Darakaraka basis, health and financial tendencies). It never names
// a specific person. The bottom report CTA stays the broader Marriage Report, so
// the dedicated report is offered once. No approved video yet.
export const spouseNatureLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Vedic astrology does not read a spouse\'s nature from one placement. An astrologer combines the sign on the 7th house and the condition of its lord, the planets placed in or influencing the 7th house, Venus and Jupiter as significators of the partner, the Navamsa (D9) chart for the inner nature of the partnership, and supporting indicators such as the Darakaraka. Together they point to likely tendencies in temperament, communication and relationship style — not a fixed description of one particular person.',
    hi: 'वैदिक ज्योतिष में जीवनसाथी का स्वभाव किसी एक ग्रह-स्थिति से तय नहीं होता। ज्योतिषी सप्तम भाव की राशि और सप्तमेश की स्थिति, सप्तम भाव में बैठे या उस पर प्रभाव डालने वाले ग्रह, जीवनसाथी के कारक शुक्र और गुरु, रिश्ते की आंतरिक प्रकृति के लिए नवांश (D9) कुंडली और दारकारक जैसे सहायक संकेतकों को साथ मिलाकर देखते हैं। इनसे जीवनसाथी के स्वभाव, बातचीत के तरीके और रिश्ते में व्यवहार की संभावित प्रवृत्तियों का संकेत मिलता है — किसी एक विशेष व्यक्ति का तय विवरण नहीं।',
  },

  offer: {
    reportSlug: 'spouse_nature_report',
    eyebrow: { en: 'Based on your birth chart', hi: 'आपकी जन्मकुंडली पर आधारित' },
    heading: { en: 'Spouse Nature Report', hi: 'जीवनसाथी स्वभाव रिपोर्ट' },
    intro: {
      en: 'This page explains the general principles. The report reads these factors in your own birth chart to describe your spouse\'s likely tendencies — it does not identify a specific person.',
      hi: 'यह पृष्ठ सामान्य सिद्धांत समझाता है। रिपोर्ट इन्हीं कारकों को आपकी अपनी जन्मकुंडली में पढ़कर जीवनसाथी की संभावित प्रवृत्तियों का वर्णन करती है — यह किसी विशेष व्यक्ति की पहचान नहीं बताती।',
    },
    bullets: {
      en: [
        'Your spouse\'s likely nature, temperament and personality',
        'Communication and emotional style',
        'The 7th house, Navamsa (D9) and Darakaraka basis behind each reading',
        'Health and financial tendencies — indications, not certainties',
      ],
      hi: [
        'जीवनसाथी का संभावित स्वभाव, मिज़ाज और व्यक्तित्व',
        'बातचीत और भावनात्मक शैली',
        'हर निष्कर्ष के पीछे का सप्तम भाव, नवांश (D9) और दारकारक आधार',
        'स्वास्थ्य और आर्थिक प्रवृत्तियाँ — संकेत, निश्चितता नहीं',
      ],
    },
    ctaLabel: { en: 'Get Spouse Nature Report – ₹{price}', hi: 'जीवनसाथी स्वभाव रिपोर्ट पाएं – ₹{price}' },
    microcopy: {
      en: 'Personalised using your Date, Time & Place of Birth.',
      hi: 'आपकी जन्म तिथि, समय और स्थान के आधार पर तैयार।',
    },
    sampleTitle: { en: 'Spouse Nature Report', hi: 'जीवनसाथी स्वभाव रिपोर्ट' },
    reportCtaId: 'spouse_nature_report_cta',
    sampleCtaId: 'spouse_nature_sample_report',
    screenName: 'spouse_nature_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at what a chart suggests about the nature of a partner. Related questions have their own detailed guides — matching two charts once a proposal comes, what life after marriage may look like, when marriage may happen, and how a family-arranged match is read:',
      hi: 'यह मार्गदर्शिका बताती है कि कुंडली जीवनसाथी के स्वभाव के बारे में क्या संकेत देती है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — रिश्ता आने पर दो कुंडलियों का मिलान, विवाह के बाद का जीवन, विवाह कब हो सकता है, और अरेंज्ड रिश्ते को कैसे देखा जाता है:',
    },
    topicSlugs: ['compatibility', 'married-life', 'marriage-timing', 'arranged-marriage'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  // Also renders the Primary Houses / Planet-wise accordion bodies in server HTML.
  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,

  // MC-04: free Lagna -> 7th-house sign check, placed after the Introduction (before the deep
  // house/planet analysis). Its result CTA is a compact text link to the same report.
  inlineTool: { kind: 'spouse-lagna', afterSectionId: 'introduction', reportSlug: 'spouse_nature_report' },
}

// Tool-led (P1): the primary action is the EXISTING free Kundli Matching calculator (/love). Its result
// pages already offer the Relationship Future Report, so this page carries no report card of its own
// (the existing bottom report CTA stays as a secondary option).
export const compatibilityLanding: ToolLedLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Marriage compatibility in Vedic astrology is broader than a single Guna Milan score. Kundli matching usually starts with the Ashtakoota system — 36 gunas, including Nadi, Bhakoot and Graha Maitri — and a Mangal Dosha check, and is then read alongside both full birth charts: the Moon for emotional fit, the 7th house and its lord, Venus and Jupiter, and the Navamsa (D9). A high score does not by itself mean a happy marriage, and a low score is not a verdict on its own.',
    hi: 'वैदिक ज्योतिष में विवाह की अनुकूलता केवल गुण मिलान के अंकों तक सीमित नहीं है। कुंडली मिलान आमतौर पर अष्टकूट पद्धति — 36 गुण, जिनमें नाड़ी, भकूट और ग्रह मैत्री शामिल हैं — और मंगल दोष की जाँच से शुरू होता है, और फिर दोनों की पूरी जन्मकुंडली के साथ पढ़ा जाता है: भावनात्मक मेल के लिए चंद्रमा, सप्तम भाव और सप्तमेश, शुक्र और गुरु, और नवांश (D9)। अधिक गुण अपने आप सुखी विवाह का प्रमाण नहीं हैं, और कम गुण अकेले कोई अंतिम फैसला नहीं हैं।',
  },

  primaryAction: {
    eyebrow: { en: 'Free Kundli Matching', hi: 'फ्री कुंडली मिलान' },
    heading: { en: 'Check Your Compatibility', hi: 'अपनी कुंडली अनुकूलता जाँचें' },
    body: {
      en: 'Enter both partners\' birth details to see your Guna Milan score with the Ashtakoota breakdown and a Mangal Dosha check.',
      hi: 'दोनों साथियों की जन्म तिथि, समय और स्थान दर्ज करें और अष्टकूट विवरण के साथ गुण मिलान और मंगल दोष की जाँच देखें।',
    },
    ctaLabel: { en: 'Check Compatibility — Free', hi: 'फ्री में अनुकूलता जाँचें' },
    microcopy: {
      en: 'After your free result you can choose a detailed two-chart report.',
      hi: 'फ्री परिणाम के बाद आप दोनों कुंडलियों की विस्तृत रिपोर्ट चुन सकते हैं।',
    },
    href: '/love',
    ctaId: 'compatibility_kundli_matching_cta',
    screenName: 'compatibility_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at how two charts are matched for marriage. Related questions have their own detailed guides — the nature of the spouse, what married life may look like, and how love and arranged paths are read:',
      hi: 'यह मार्गदर्शिका बताती है कि विवाह के लिए दो कुंडलियों का मिलान कैसे किया जाता है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — जीवनसाथी का स्वभाव, विवाह के बाद का जीवन, और प्रेम व अरेंज्ड विवाह के मार्ग:',
    },
    topicSlugs: ['married-life', 'spouse-nature', 'love-marriage', 'arranged-marriage'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,
}

// Report-led (P2): most readers want to know what married life may be like, not to fix an existing
// problem -- so the primary card is the Marriage Report (outlook, married-life dynamics, strengths and
// areas needing attention; it does not read the Navamsa, so the card never claims D9). The Problem in
// Marriage Report is offered only as a compact contextual card after the harmony/challenges section,
// for readers already facing difficulties. Couples comparing two charts get the free /love calculator
// via the topic's own cross-link.
export const marriedLifeLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Married life astrology does not judge a marriage from one planet or one yoga. An astrologer reads the 7th house and its lord together with the houses linked to family, home, intimacy and shared values (the 2nd, 4th, 8th and 9th), the marital karakas Venus and Jupiter, the Moon for emotional temperament, and the supportive or challenging combinations in the chart — then checks the Navamsa (D9) and the running Dasha. The result describes tendencies: where married life is naturally supported and where it may need more conscious effort. It is not a verdict on whether a marriage will be happy or will last.',
    hi: 'वैवाहिक जीवन का आकलन किसी एक ग्रह या एक योग से नहीं होता। ज्योतिषी सप्तम भाव और सप्तमेश को परिवार, घर, अंतरंगता और साझे मूल्यों से जुड़े भावों (द्वितीय, चतुर्थ, अष्टम और नवम) के साथ पढ़ते हैं; विवाह के कारक शुक्र और गुरु, भावनात्मक स्वभाव के लिए चंद्रमा, और कुंडली के सहायक या चुनौतीपूर्ण योगों को देखते हैं — फिर नवांश (D9) और चल रही दशा से इसकी पुष्टि करते हैं। इससे प्रवृत्तियों का पता चलता है: वैवाहिक जीवन में कहाँ स्वाभाविक सहारा है और कहाँ अधिक सचेत प्रयास की आवश्यकता हो सकती है। यह इस बात का फैसला नहीं है कि विवाह सुखी होगा या टिकेगा।',
  },

  offer: {
    reportSlug: 'marriage_report',
    eyebrow: { en: 'Personalised Marriage Report', hi: 'व्यक्तिगत विवाह रिपोर्ट' },
    heading: { en: 'Your Married Life Outlook', hi: 'आपके वैवाहिक जीवन की संभावनाएँ' },
    intro: {
      en: 'This guide explains the general indicators. The report applies the core marriage factors to your own birth chart, including a dedicated section on married-life dynamics.',
      hi: 'यह मार्गदर्शिका सामान्य संकेत समझाती है। रिपोर्ट विवाह के मुख्य कारकों को आपकी अपनी जन्मकुंडली पर लागू करती है, जिसमें वैवाहिक जीवन के आपसी व्यवहार पर अलग खंड है।',
    },
    bullets: {
      en: [
        'Your marriage outlook from the 7th house and its lord',
        'Married-life dynamics: emotional connection, communication and harmony',
        'Strengths and areas needing attention',
        'Key planetary influences, your current Dasha window and practical guidance',
      ],
      hi: [
        'सप्तम भाव और सप्तमेश से आपके विवाह की संभावनाएँ',
        'वैवाहिक जीवन का आपसी व्यवहार: भावनात्मक जुड़ाव, बातचीत और सामंजस्य',
        'मज़बूत पक्ष और ध्यान देने योग्य बातें',
        'प्रमुख ग्रहों का प्रभाव, आपकी वर्तमान दशा और व्यावहारिक मार्गदर्शन',
      ],
    },
    ctaLabel: { en: 'Get My Marriage Report – ₹{price}', hi: 'मेरी विवाह रिपोर्ट पाएं – ₹{price}' },
    microcopy: {
      en: 'Personalised using your Date, Time & Place of Birth.',
      hi: 'आपकी जन्म तिथि, समय और स्थान के आधार पर तैयार।',
    },
    sampleTitle: { en: 'Marriage Report', hi: 'विवाह रिपोर्ट' },
    reportCtaId: 'married_life_report_cta',
    sampleCtaId: 'married_life_sample_report',
    screenName: 'married_life_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at what a birth chart suggests about married life. Related questions have their own detailed guides — matching two charts, the nature of the spouse, and how astrology reads relationship stress and separation risk:',
      hi: 'यह मार्गदर्शिका बताती है कि जन्मकुंडली वैवाहिक जीवन के बारे में क्या संकेत देती है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — दो कुंडलियों का मिलान, जीवनसाथी का स्वभाव, और ज्योतिष में रिश्ते के तनाव व अलगाव की आशंका को कैसे देखा जाता है:',
    },
    topicSlugs: ['compatibility', 'spouse-nature', 'divorce-possibility'],
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

  // Secondary path for readers ALREADY facing difficulties -- placed right after the harmony /
  // challenges indicators, worded without fear and without implying the reader has a problem.
  inlineTool: {
    kind: 'contextual-report',
    afterSectionId: 'harmony-and-challenges',
    reportSlug: 'problem_in_marriage_report',
    eyebrow: { en: 'Problem in Marriage Report', hi: 'विवाह समस्या रिपोर्ट' },
    heading: { en: 'Already Facing Difficulties in Your Marriage?', hi: 'क्या वैवाहिक जीवन में पहले से कठिनाइयाँ हैं?' },
    body: {
      en: 'The Problem in Marriage Report focuses on the friction patterns your own chart shows, the factors that can help steady the relationship, and practical steps that may help. It does not predict separation.',
      hi: 'विवाह समस्या रिपोर्ट आपकी अपनी कुंडली में दिखने वाले मतभेद के पैटर्न, रिश्ते को स्थिर करने में सहायक कारकों और मददगार व्यावहारिक कदमों पर केंद्रित है। यह अलगाव की भविष्यवाणी नहीं करती।',
    },
    ctaLabel: { en: 'Get Problem in Marriage Report – ₹{price}', hi: 'विवाह समस्या रिपोर्ट पाएं – ₹{price}' },
    ctaId: 'married_life_problem_report_cta',
    screenName: 'married_life_topic',
  },
}

// Tool-led (P3): the primary action is the EXISTING free Marriage Path tool (/tools/marriage-path). The
// tool reads the 7th house (sign, lord, occupants), Venus/Jupiter dignity and Rahu with the 7th lord --
// the copy claims nothing more (no D9, no Dasha, no caste or family assessment). The Love Marriage Report
// is a contextual card after the love-vs-intercaste comparison, framed as love-marriage tendency only:
// it does not analyse caste, intercaste indications or family acceptance.
export const intercasteMarriageLanding: ToolLedLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Vedic astrology traditionally links certain combinations with marriage outside family or social convention — most often Rahu or Ketu influencing the 7th house or its lord, a strong link between the 5th house of personal choice and the 7th, and a 9th house (tradition) that is less connected to marriage, read again in the Navamsa (D9) and the running Dasha. No single planet or yoga proves an intercaste marriage. A horoscope does not show anyone’s caste and cannot say whether a family will accept a relationship; it describes tendencies, and the choice of partner remains a personal one.',
    hi: 'वैदिक ज्योतिष परंपरागत रूप से कुछ योगों को परिवार या सामाजिक परंपरा से अलग विवाह से जोड़ता है — सबसे अधिक सप्तम भाव या सप्तमेश पर राहु या केतु का प्रभाव, व्यक्तिगत चुनाव के पंचम भाव और सप्तम भाव का मज़बूत संबंध, और विवाह से कम जुड़ा नवम भाव (परंपरा) — जिन्हें नवांश (D9) और चल रही दशा में दोबारा परखा जाता है। कोई एक ग्रह या योग अंतरजातीय विवाह को सिद्ध नहीं करता। जन्मकुंडली किसी की जाति नहीं बताती और यह नहीं कह सकती कि परिवार रिश्ते को स्वीकार करेगा या नहीं; यह प्रवृत्तियाँ बताती है, और जीवनसाथी का चुनाव व्यक्तिगत ही रहता है।',
  },

  primaryAction: {
    eyebrow: { en: 'Free Marriage Path Check', hi: 'फ्री विवाह मार्ग जाँच' },
    heading: { en: 'Check Your Marriage Path', hi: 'अपना विवाह मार्ग जाँचें' },
    body: {
      en: 'Enter your birth details for a free 7th-house reading: the planets placed in your 7th house, the strength of Venus and Jupiter, the planet with the strongest influence on your marriage, and whether Rahu — the planet traditionally linked with unconventional unions — sits with your 7th lord.',
      hi: 'अपना जन्म विवरण दर्ज करें और सप्तम भाव का फ्री विश्लेषण पाएं: आपके सप्तम भाव में स्थित ग्रह, शुक्र और गुरु की स्थिति, विवाह पर सबसे प्रबल प्रभाव वाला ग्रह, और यह कि क्या राहु — जिसे परंपरागत रूप से अपरंपरागत विवाह से जोड़ा जाता है — आपके सप्तमेश के साथ है।',
    },
    ctaLabel: { en: 'Check Marriage Path — Free', hi: 'फ्री में विवाह मार्ग जाँचें' },
    microcopy: {
      en: 'A general snapshot from your birth chart. It does not assess caste or family acceptance.',
      hi: 'आपकी जन्मकुंडली पर आधारित सामान्य झलक। यह जाति या पारिवारिक स्वीकृति का आकलन नहीं करती।',
    },
    href: '/tools/marriage-path',
    ctaId: 'intercaste_marriage_path_cta',
    screenName: 'intercaste_marriage_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at astrological indications of marriage outside family or social convention. Related questions have their own detailed guides — the love-marriage side and the family-arranged side:',
      hi: 'यह मार्गदर्शिका परिवार या सामाजिक परंपरा से अलग विवाह के ज्योतिषीय संकेतों को देखती है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — प्रेम विवाह का पक्ष और परिवार द्वारा तय विवाह का पक्ष:',
    },
    topicSlugs: ['love-marriage', 'arranged-marriage'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  // Also renders the Key House / Planetary Influences accordion bodies in server HTML.
  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,

  inlineTool: {
    kind: 'contextual-report',
    afterSectionId: 'love-vs-intercaste',
    reportSlug: 'love_marriage_report',
    eyebrow: { en: 'Love Marriage Report', hi: 'प्रेम विवाह रिपोर्ट' },
    heading: { en: 'Want to Understand Your Love-Marriage Tendency?', hi: 'अपनी प्रेम विवाह की प्रवृत्ति समझना चाहते हैं?' },
    body: {
      en: 'The Love Marriage Report reads your own chart for love-marriage tendency — the 5th house of romance, the 7th house of partnership, the link between them, and Venus, Mars and Jupiter. It does not assess caste, intercaste indications or family acceptance.',
      hi: 'प्रेम विवाह रिपोर्ट आपकी अपनी कुंडली में प्रेम विवाह की प्रवृत्ति देखती है — प्रेम का पंचम भाव, साझेदारी का सप्तम भाव, इन दोनों का संबंध, और शुक्र, मंगल व गुरु। यह जाति, अंतरजातीय संकेतों या पारिवारिक स्वीकृति का आकलन नहीं करती।',
    },
    ctaLabel: { en: 'Get Love Marriage Report – ₹{price}', hi: 'प्रेम विवाह रिपोर्ट पाएं – ₹{price}' },
    ctaId: 'intercaste_love_marriage_report_cta',
    screenName: 'intercaste_marriage_topic',
  },
}

// Tool-led (P4): the primary action is the EXISTING free Marriage Path tool, described only by what it
// computes (7th-house occupants, Venus/Jupiter dignity, Rahu with the 7th lord, strongest influence) --
// it calculates no Dasha, no D9 and no marriage age. The Marriage Report is a contextual card after the
// timing section, framed as a broader marriage outlook -- never an early-marriage or exact-age report.
export const earlyMarriageLanding: ToolLedLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'In Vedic astrology, a relatively early marriage is traditionally read from several factors together: a strong 7th house and 7th lord, supportive links from the 2nd, 5th and 11th houses, a well-placed Venus, Jupiter and Moon, and marriage-related Dasha periods that become active early in life, checked again in the Navamsa (D9). No single placement guarantees early marriage, and “early” is relative to the person’s chart and circumstances — the chart shows a tendency, not a fixed age or date.',
    hi: 'वैदिक ज्योतिष में अपेक्षाकृत जल्दी विवाह को परंपरागत रूप से कई कारकों को साथ मिलाकर देखा जाता है: मज़बूत सप्तम भाव और सप्तमेश, द्वितीय, पंचम और एकादश भाव से सहायक संबंध, सुस्थित शुक्र, गुरु और चंद्रमा, और विवाह से जुड़ी दशाएँ जो जीवन में जल्दी सक्रिय हों — जिनकी पुष्टि नवांश (D9) में भी की जाती है। कोई एक ग्रह-स्थिति जल्दी विवाह की गारंटी नहीं देती, और “जल्दी” व्यक्ति की कुंडली और परिस्थितियों के सापेक्ष होता है — कुंडली एक प्रवृत्ति दिखाती है, कोई तय उम्र या तारीख नहीं।',
  },

  primaryAction: {
    eyebrow: { en: 'Free Marriage Path Check', hi: 'फ्री विवाह मार्ग जाँच' },
    heading: { en: 'Check Your Marriage Path', hi: 'अपना विवाह मार्ग जाँचें' },
    body: {
      en: 'Enter your birth details for a free check of your main marriage indicators: the planets placed in your 7th house, the strength of Venus and Jupiter, whether Rahu sits with your 7th lord, and the planet with the strongest influence on your marriage.',
      hi: 'अपना जन्म विवरण दर्ज करें और अपने मुख्य विवाह संकेतों की फ्री जाँच पाएं: आपके सप्तम भाव में स्थित ग्रह, शुक्र और गुरु की स्थिति, क्या राहु आपके सप्तमेश के साथ है, और विवाह पर सबसे प्रबल प्रभाव वाला ग्रह।',
    },
    ctaLabel: { en: 'Check Marriage Path — Free', hi: 'फ्री में विवाह मार्ग जाँचें' },
    microcopy: {
      en: 'A general snapshot of your marriage indicators. It does not calculate Dasha periods or a marriage age.',
      hi: 'आपके विवाह संकेतों की सामान्य झलक। यह दशाओं या विवाह की उम्र की गणना नहीं करती।',
    },
    href: '/tools/marriage-path',
    ctaId: 'early_marriage_path_cta',
    screenName: 'early_marriage_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at the indicators traditionally associated with a relatively early marriage. Related questions have their own detailed guides — how marriage timing is read in general, and why marriage can be delayed:',
      hi: 'यह मार्गदर्शिका उन संकेतों को देखती है जिन्हें परंपरागत रूप से अपेक्षाकृत जल्दी विवाह से जोड़ा जाता है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — विवाह का समय सामान्य रूप से कैसे देखा जाता है, और विवाह में देरी क्यों हो सकती है:',
    },
    topicSlugs: ['marriage-timing', 'delayed-marriage'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,

  inlineTool: {
    kind: 'contextual-report',
    afterSectionId: 'timing-analysis',
    reportSlug: 'marriage_report',
    eyebrow: { en: 'Marriage Report', hi: 'विवाह रिपोर्ट' },
    heading: { en: 'Want a Broader Personalised Marriage Outlook?', hi: 'अपने विवाह की व्यापक, व्यक्तिगत संभावनाएँ जानना चाहते हैं?' },
    body: {
      en: 'The Marriage Report reads your own chart for your overall marriage outlook — the 7th house and its lord, key planetary influences, your current Dasha window and supportive periods, and practical guidance. It does not give an exact marriage age or date.',
      hi: 'विवाह रिपोर्ट आपकी अपनी कुंडली से आपके विवाह की समग्र संभावनाएँ देखती है — सप्तम भाव और सप्तमेश, प्रमुख ग्रहों का प्रभाव, आपकी वर्तमान दशा और सहायक अवधियाँ, और व्यावहारिक मार्गदर्शन। यह विवाह की कोई सटीक उम्र या तारीख नहीं बताती।',
    },
    ctaLabel: { en: 'Get Marriage Report – ₹{price}', hi: 'विवाह रिपोर्ट पाएं – ₹{price}' },
    ctaId: 'early_marriage_report_cta',
    screenName: 'early_marriage_topic',
  },
}

// Report-led (P5): the dedicated Second Marriage Report is the primary card. Its copy claims only what
// the report reads (Low / Moderate / Elevated second-union indication; 7th + 9th house evidence;
// Venus / Jupiter; current Dasha context; guidance) -- no D9, no transits, no date, no guarantee, and it
// never assumes the reader is divorced or separated. The free Marriage Path tool stays a secondary,
// honestly-labelled bottom action (it is not a second-marriage calculator).
export const secondMarriageLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'Vedic astrology does not read a second marriage from one placement. Astrologers weigh several factors together: the 7th house and its lord, which describe the first marriage and one’s approach to partnership; the houses traditionally used for a later union — most often the 9th, with some approaches also examining the 2nd; the condition of Venus and Jupiter; the Dasha periods that could activate these houses; and the Navamsa (D9) as a supporting layer. A single placement does not guarantee a second marriage, difficulties in the 7th house do not automatically mean divorce, and later-union indications do not mean anyone must leave a present relationship.',
    hi: 'वैदिक ज्योतिष दूसरे विवाह को किसी एक ग्रह-स्थिति से नहीं पढ़ता। ज्योतिषी कई कारकों को साथ देखते हैं: सप्तम भाव और सप्तमेश, जो पहले विवाह और साझेदारी के प्रति दृष्टिकोण को दर्शाते हैं; बाद के विवाह के लिए परंपरागत रूप से देखे जाने वाले भाव — सबसे अधिक नवम भाव, और कुछ पद्धतियों में द्वितीय भाव भी; शुक्र और गुरु की स्थिति; इन भावों को सक्रिय करने वाली दशाएँ; और सहायक स्तर के रूप में नवांश (D9)। कोई एक ग्रह-स्थिति दूसरे विवाह की गारंटी नहीं देती, सप्तम भाव की कठिनाइयों का अर्थ अपने आप तलाक नहीं है, और बाद के विवाह के संकेतों का अर्थ यह नहीं कि किसी को अपना वर्तमान संबंध छोड़ना होगा।',
  },

  offer: {
    reportSlug: 'second_marriage_report',
    eyebrow: { en: 'Personalised Second Marriage Report', hi: 'व्यक्तिगत दूसरे विवाह की रिपोर्ट' },
    heading: { en: 'Explore Your Second-Marriage Indications', hi: 'अपने दूसरे विवाह के संकेत जानें' },
    intro: {
      en: 'A personalised reading of possible later-union indications in your own chart. It discusses supportive and challenging factors — not a guaranteed remarriage or an exact marriage date.',
      hi: 'आपकी अपनी कुंडली में बाद के विवाह के संभावित संकेतों का व्यक्तिगत विश्लेषण। यह सहायक और चुनौतीपूर्ण कारकों की चर्चा करती है — दूसरे विवाह की गारंटी या विवाह की सटीक तारीख नहीं।',
    },
    bullets: {
      en: [
        'Your second-union indication — Low, Moderate or Elevated, as a tendency',
        'Evidence from both the 7th and 9th houses, including their signs and lords',
        'Venus and Jupiter as supporting or reducing factors',
        'Your current Dasha context and practical guidance',
      ],
      hi: [
        'आपके दूसरे विवाह का संकेत — कम, मध्यम या अधिक, एक प्रवृत्ति के रूप में',
        'सप्तम और नवम दोनों भावों के संकेत, उनकी राशि और स्वामी सहित',
        'सहायक या कम करने वाले कारकों के रूप में शुक्र और गुरु',
        'आपकी वर्तमान दशा का संदर्भ और व्यावहारिक मार्गदर्शन',
      ],
    },
    ctaLabel: { en: 'Get Second Marriage Report – ₹{price}', hi: 'दूसरे विवाह की रिपोर्ट प्राप्त करें – ₹{price}' },
    // Visible on phones (the intro sentence is hidden there), so it carries the scope limit too.
    microcopy: {
      en: 'Personalised from your birth details. Shows tendencies — not a guaranteed remarriage or an exact date.',
      hi: 'आपके जन्म विवरण पर आधारित। यह प्रवृत्तियाँ बताती है — दूसरे विवाह की गारंटी या सटीक तारीख नहीं।',
    },
    sampleTitle: { en: 'Second Marriage Report', hi: 'दूसरे विवाह की रिपोर्ट' },
    reportCtaId: 'second_marriage_report_cta',
    sampleCtaId: 'second_marriage_sample_report',
    screenName: 'second_marriage_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at indications of a second or later marriage. Related questions have their own detailed guides — how astrology reads relationship stress and separation risk, and what married life may look like:',
      hi: 'यह मार्गदर्शिका दूसरे या बाद के विवाह के संकेतों को देखती है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — ज्योतिष में रिश्ते के तनाव व अलगाव की आशंका को कैसे देखा जाता है, और वैवाहिक जीवन कैसा हो सकता है:',
    },
    topicSlugs: ['divorce-possibility', 'married-life'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  // Also renders the Key House Analysis accordion bodies in server HTML.
  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,
}

// Report-led (P6): the dedicated Divorce Possibility Report is the primary card. Its copy claims only what
// the report reads (Low / Moderate / Elevated stress signal; 7th-house foundation; 6th / 8th stress
// indicators; current sensitive Dasha period; protective factors; communication guidance; restrained
// remedies) -- no D9, no transits, no date, no legal outcome. The scope limit sits in the microcopy, which
// stays visible on phones (the intro is hidden there). Readers already in difficulty get the Problem in
// Marriage Report as a compact contextual card after the timing / communication section.
export const divorcePossibilityLanding: TopicLandingConfig = {
  directAnswerLabel: { en: 'Short answer', hi: 'संक्षिप्त उत्तर' },
  directAnswer: {
    en: 'In Vedic astrology, marital strain and separation indications are read from several chart factors together, not from one planet or one house. Astrologers examine the 7th house and its lord, the 6th, 8th and 12th houses, Venus and Jupiter, challenging influences from Mars, Saturn, Rahu and Ketu, the running Dasha, and the Navamsa (D9) — and weigh protective combinations that can moderate difficult indications. A difficult combination does not guarantee divorce. Personal choices, communication, circumstances and legal realities are separate from any astrological reading.',
    hi: 'वैदिक ज्योतिष में वैवाहिक तनाव और अलगाव के संकेत किसी एक ग्रह या एक भाव से नहीं, बल्कि कुंडली के कई कारकों को साथ देखकर पढ़े जाते हैं। ज्योतिषी सप्तम भाव और सप्तमेश, षष्ठ, अष्टम और द्वादश भाव, शुक्र और गुरु, मंगल, शनि, राहु और केतु के चुनौतीपूर्ण प्रभाव, चल रही दशा और नवांश (D9) देखते हैं — और उन सुरक्षात्मक योगों को भी तौलते हैं जो कठिन संकेतों को कम कर सकते हैं। कोई कठिन योग तलाक की गारंटी नहीं देता। व्यक्तिगत निर्णय, आपसी संवाद, परिस्थितियाँ और कानूनी वास्तविकताएँ किसी भी ज्योतिषीय विश्लेषण से अलग हैं।',
  },

  offer: {
    reportSlug: 'divorce_possibility_report',
    eyebrow: { en: 'Personalised Divorce Possibility Report', hi: 'व्यक्तिगत तलाक की संभावना रिपोर्ट' },
    heading: { en: 'Understand Your Marriage Stability Indicators', hi: 'अपने विवाह की स्थिरता के संकेत समझें' },
    intro: {
      en: 'A personalised assessment of relationship-stress signals in your own chart, the protective factors that can balance them, the current sensitive period and practical guidance.',
      hi: 'आपकी अपनी कुंडली में रिश्ते के तनाव के संकेतों, उन्हें संतुलित करने वाले सुरक्षात्मक कारकों, वर्तमान संवेदनशील अवधि और व्यावहारिक मार्गदर्शन का व्यक्तिगत आकलन।',
    },
    bullets: {
      en: [
        'Your relationship-stress signal — Low, Moderate or Elevated, as a tendency',
        'The 7th-house foundation, with the 6th and 8th houses as stress indicators',
        'Your current Dasha period and the protective factors in your chart',
        'Communication guidance and restrained, evidence-aware remedies',
      ],
      hi: [
        'आपके रिश्ते के तनाव का संकेत — कम, मध्यम या अधिक, एक प्रवृत्ति के रूप में',
        'सप्तम भाव की नींव, और तनाव के संकेत के रूप में षष्ठ व अष्टम भाव',
        'आपकी वर्तमान दशा और आपकी कुंडली के सुरक्षात्मक कारक',
        'संवाद से जुड़ा मार्गदर्शन और संयमित, संकेतों पर आधारित उपाय',
      ],
    },
    ctaLabel: { en: 'Explore Divorce Possibility Report – ₹{price}', hi: 'तलाक की संभावना रिपोर्ट देखें – ₹{price}' },
    // Visible on phones (the intro sentence is hidden there), so it carries the scope limit.
    microcopy: {
      en: 'Personalised from your birth details. Shows tendencies and protective factors — not a certain divorce, a date or a legal outcome.',
      hi: 'आपके जन्म विवरण पर आधारित। यह प्रवृत्तियाँ और सुरक्षात्मक कारक बताती है — निश्चित तलाक, तारीख या कानूनी परिणाम नहीं।',
    },
    sampleTitle: { en: 'Divorce Possibility Report', hi: 'तलाक की संभावना रिपोर्ट' },
    reportCtaId: 'divorce_possibility_report_cta',
    sampleCtaId: 'divorce_possibility_sample_report',
    screenName: 'divorce_possibility_topic',
  },

  contextLinks: {
    heading: { en: 'Related Marriage Questions', hi: 'विवाह से जुड़े अन्य प्रश्न' },
    body: {
      en: 'This guide looks at how astrology reads marital stress and separation indications. Related questions have their own detailed guides — indications of a later marriage, and married-life harmony and dynamics:',
      hi: 'यह मार्गदर्शिका बताती है कि ज्योतिष वैवाहिक तनाव और अलगाव के संकेतों को कैसे पढ़ता है। अन्य प्रश्नों पर अलग विस्तृत मार्गदर्शिकाएँ हैं — बाद के विवाह के संकेत, और वैवाहिक जीवन का सामंजस्य व आपसी व्यवहार:',
    },
    topicSlugs: ['second-marriage', 'married-life'],
    overviewLead: {
      en: 'For a broader overview of how a kundli is read for marriage, see',
      hi: 'कुंडली में विवाह को समग्र रूप से कैसे पढ़ा जाता है, यह जानने के लिए देखें',
    },
    overviewSlug: 'marriage-prediction',
  },

  // Also renders the Key House / Planetary / Advanced-tools accordion bodies in server HTML.
  ssrFaq: true,
  // Text-heavy page: section dividers + sub-heading labels (landing.module.css `.longform`).
  longForm: true,

  inlineTool: {
    kind: 'contextual-report',
    afterSectionId: 'timing-and-factors',
    reportSlug: 'problem_in_marriage_report',
    eyebrow: { en: 'Problem in Marriage Report', hi: 'विवाह समस्या रिपोर्ट' },
    heading: { en: 'Facing Difficulties in Your Marriage?', hi: 'क्या वैवाहिक जीवन में कठिनाइयाँ चल रही हैं?' },
    body: {
      en: 'A separate personalised reading focused on the friction patterns in your chart, the factors that can help steady the relationship, and practical, constructive guidance. It does not predict separation.',
      hi: 'एक अलग व्यक्तिगत विश्लेषण, जो आपकी कुंडली में मतभेद के पैटर्न, रिश्ते को स्थिर करने में सहायक कारकों और व्यावहारिक, रचनात्मक मार्गदर्शन पर केंद्रित है। यह अलगाव की भविष्यवाणी नहीं करता।',
    },
    ctaLabel: { en: 'Get Problem in Marriage Report – ₹{price}', hi: 'विवाह समस्या रिपोर्ट पाएं – ₹{price}' },
    ctaId: 'divorce_problem_in_marriage_report_cta',
    screenName: 'divorce_possibility_topic',
  },
}

/** Topic slug -> landing config. Topics not listed render unchanged. */
export const marriageTopicLandings: Record<string, AnyTopicLandingConfig> = {
  'marriage-timing': marriageTimingLanding,
  'love-marriage': loveMarriageLanding,
  'arranged-marriage': arrangedMarriageLanding,
  'delayed-marriage': delayedMarriageLanding,
  'spouse-nature': spouseNatureLanding,
  'compatibility': compatibilityLanding,
  'married-life': marriedLifeLanding,
  'intercaste-marriage': intercasteMarriageLanding,
  'early-marriage': earlyMarriageLanding,
  'second-marriage': secondMarriageLanding,
  'divorce-possibility': divorcePossibilityLanding,
}
