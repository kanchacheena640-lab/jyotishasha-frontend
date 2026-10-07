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

/** Topic slug -> landing config. Topics not listed render unchanged. */
export const marriageTopicLandings: Record<string, TopicLandingConfig> = {
  'marriage-timing': marriageTimingLanding,
  'love-marriage': loveMarriageLanding,
  'arranged-marriage': arrangedMarriageLanding,
  'delayed-marriage': delayedMarriageLanding,
  'spouse-nature': spouseNatureLanding,
}
