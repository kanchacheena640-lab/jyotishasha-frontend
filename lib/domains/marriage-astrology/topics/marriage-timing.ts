import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const marriageTiming: DomainTopic = {

  identity: {
    id:         'marriage-astrology:marriage-timing',
    slug:       'marriage-timing',
    title:      'Marriage Timing in Vedic Astrology: When Will I Get Married?',
    title_hi:   'वैदिक ज्योतिष में विवाह का समय: मेरी शादी कब होगी?',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'draft',
  },

  routing: {
    canonicalPath: '/marriage-astrology/marriage-timing',
    breadcrumbs: [
      { label: 'Home',               label_hi: 'होम',           href: '/' },
      { label: 'Marriage Astrology', label_hi: 'विवाह ज्योतिष', href: '/marriage-astrology' },
      { label: 'Marriage Timing',    label_hi: '',              href: '/marriage-astrology/marriage-timing' },
    ],
  },

  seo: {
    metaTitle:          'Marriage Timing in Vedic Astrology: Dasha & Transit Guide',
    metaDescription:    'When will I get married? See how Vedic astrology reads marriage timing from your kundli: the 7th house, Mahadasha–Antardasha, Navamsa (D9) and transits.',
    metaDescription_hi: 'मेरी शादी कब होगी? जानें वैदिक ज्योतिष कुंडली से विवाह का समय कैसे देखता है — सप्तम भाव, महादशा–अंतर्दशा, नवांश (D9) और गोचर।',
    robots:             'noindex,follow',
  },

  hero: {
    headline:    'Timing Your Marriage: The Vedic Astrology Guide to Dasha and Transit',
    headline_hi: 'अपने विवाह का समय: दशा और गोचर की वैदिक ज्योतिष मार्गदर्शिका',
    subtext:     'How marriage timing is read from your kundli — the 7th house, Dasha periods, the Navamsa and transits — and what kind of answer it can realistically give.',
    subtext_hi:  'आपकी कुंडली से विवाह का समय कैसे देखा जाता है — सप्तम भाव, दशा, नवांश और गोचर — और इससे किस तरह का उत्तर मिल सकता है।',
  },

  taxonomy: {
    tags:        ['marriage-timing', 'vedic-astrology', 'dasha-system', 'marriage-prediction', 'planetary-transits'],
    keywords:    ['marriage timing', 'marriage timing astrology', 'when will i get married', 'when will i get married vedic astrology', 'mahadasha marriage', 'jupiter transit marriage', 'dasha transit marriage'],
    keywords_hi: ['विवाह का समय', 'शादी कब होगी', 'कब होगा विवाह', 'महादशा विवाह', 'गुरु गोचर विवाह'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'foundational-indicators',
        title:    'How Marriage Timing Is Assessed in a Kundli',
        title_hi: 'कुंडली में विवाह का समय कैसे देखा जाता है',
        layout:   'cards',
        items: [
          {
            id:       'indicator-7th-lord',
            icon:     '🏠',
            label:    '7th House and 7th Lord — The Primary Timekeeper',
            label_hi: 'सप्तम भाव और सप्तमेश — प्राथमिक समयपाल',
            body:     'The 7th house is the primary seat of marriage, and its lord is the primary timekeeper. A strong, well-placed 7th Lord produces marriage timing that follows a natural progression. An afflicted 7th Lord extends the period required for the individual to mature and meet the karmic requirements for partnership.',
            body_hi:  'सप्तम भाव विवाह का मुख्य भाव है, और इसका स्वामी (सप्तमेश) मुख्य समयपाल है। मज़बूत और अच्छी स्थिति वाला सप्तमेश विवाह के समय को स्वाभाविक क्रम में आगे बढ़ाता है। पीड़ित सप्तमेश उस अवधि को लंबा कर देता है जो व्यक्ति को साझेदारी के लिए परिपक्व होने में लगती है।',
          },
          {
            id:       'indicator-venus-jupiter',
            icon:     '✨',
            label:    'Venus and Jupiter — The Essential Karakas',
            label_hi: 'शुक्र और गुरु — आवश्यक कारक',
            body:     'Venus is the natural Karaka (significator) of love and partnership. Jupiter is traditionally treated as a key significator of marriage, and classical texts give it particular weight in a woman\'s chart. Dasha periods of these planets — or of planets associated with them — are frequently the primary candidates for marriage timing. A strong Venus can bring timing forward through its Mahadasha; an active Jupiter shifts focus toward the formal aspects of union.',
            body_hi:  'शुक्र प्रेम और साझेदारी का प्राकृतिक कारक है। गुरु को परंपरागत रूप से विवाह का प्रमुख कारक माना जाता है, और शास्त्रीय ग्रंथ स्त्री की कुंडली में इसे विशेष महत्व देते हैं। इन ग्रहों की — या इनसे जुड़े ग्रहों की — दशाएँ अक्सर विवाह के समय की प्रमुख उम्मीदवार होती हैं।',
          },
          {
            id:       'indicator-navamsa',
            icon:     '💎',
            label:    'Navamsa (D9) — The Validation Layer',
            label_hi: 'नवांश (D9) — सत्यापन परत',
            body:     'Relying solely on the Rashi (D1) chart is a common timing error. The Navamsa (D9) is the indispensable validation filter — a planet may appear to be a marriage indicator in the Rashi chart but may be weak or disconnected from marriage-related houses in the Navamsa. Reliable timing requires the activating planet to show strength and a direct connection to the 7th house in D9; a planet that is strong in the Rashi chart but weak in the Navamsa is often an unreliable timing indicator.',
            body_hi:  'केवल राशि (D1) कुंडली पर निर्भर रहना समय-निर्धारण की एक आम गलती है। नवांश (D9) अनिवार्य सत्यापन फ़िल्टर है — कोई ग्रह राशि कुंडली में विवाह का संकेतक दिख सकता है, पर नवांश में कमज़ोर या विवाह-भावों से असंबद्ध हो सकता है। भरोसेमंद समय के लिए आवश्यक है कि सक्रिय करने वाला ग्रह D9 में मज़बूत हो और सप्तम भाव से सीधा जुड़ा हो।',
          },
        ],
      },

      {
        id:       'dasha-system',
        title:    'Mahadasha and Antardasha: The Timing Window',
        title_hi: 'महादशा और अंतर्दशा: विवाह की समय-अवधि',
        layout:   'checklist',
        items: [
          {
            id:       'mahadasha-candidates',
            label:    'Mahadasha — The General Marriage Window',
            label_hi: 'महादशा — विवाह की व्यापक अवधि',
            body:     'The Mahadasha provides the broad time frame during which marriage is highlighted. The primary candidates are Mahadashas of: the 7th Lord; planets residing in the 7th house; Venus (the universal significator of love and marriage); and planets that aspect the 7th house. The Mahadasha is the broad permission, not the precise date.',
            body_hi:  'महादशा वह व्यापक समय-सीमा देती है जिसमें विवाह के योग उभरते हैं। प्रमुख उम्मीदवार हैं: सप्तमेश; सप्तम भाव में स्थित ग्रह; शुक्र; और सप्तम भाव पर दृष्टि डालने वाले ग्रह। महादशा व्यापक अनुमति है, सटीक तारीख नहीं।',
          },
          {
            id:       'antardasha-precision',
            label:    'Antardasha — Narrowing to the Specific Year',
            label_hi: 'अंतर्दशा — विशिष्ट वर्ष तक सीमित करना',
            body:     'Within the Mahadasha, the Antardasha (sub-period) is the primary timing agent. Marriage rarely occurs in a Mahadasha that does not support it; however, the specific year is determined by the Antardasha. When both are favorable — for example, the Mahadasha of the 7th Lord and the Antardasha of a planet related to Venus — the marriage window narrows significantly.',
            body_hi:  'महादशा के भीतर अंतर्दशा (उप-अवधि) समय का मुख्य निर्धारक है। जो महादशा विवाह का समर्थन नहीं करती, उसमें विवाह कम ही होता है; पर विशिष्ट वर्ष अंतर्दशा तय करती है। जब दोनों अनुकूल हों, तो विवाह की अवधि काफ़ी सीमित हो जाती है।',
          },
        ],
      },

      {
        id:       'transit-triggers',
        title:    'Transits and the Convergence Rule',
        title_hi: 'गोचर और अभिसरण नियम',
        layout:   'checklist',
        items: [
          {
            id:       'transit-jupiter',
            label:    'Jupiter Transit — The Most Potent Trigger',
            label_hi: 'गुरु गोचर — सबसे प्रभावी ट्रिगर',
            body:     'Dasha provides the potential; the Transit provides the trigger. Jupiter is the most potent transit trigger for marriage. Marriage is most likely when Jupiter transits through the 7th house, over the 7th house lord, over the lord of the Ascendant, or in aspect to the 7th house.',
            body_hi:  'दशा संभावना देती है; गोचर उसे सक्रिय करता है। विवाह के लिए गुरु सबसे प्रभावी गोचर ट्रिगर है: जब गुरु सप्तम भाव से, सप्तमेश पर, लग्नेश पर गोचर करे या सप्तम भाव पर दृष्टि डाले।',
          },
          {
            id:       'transit-saturn',
            label:    'Saturn Transit — The Structure-Bringer',
            label_hi: 'शनि गोचर — संरचना देने वाला',
            body:     'While Jupiter provides the permission, Saturn provides the concrete manifestation of the event. Marriage frequently occurs when Saturn transits over the Ascendant, over the 7th house, or over the 7th house lord. Saturn\'s transit confers the structural gravity needed to formalize the union.',
            body_hi:  'गुरु अनुमति देता है, जबकि शनि घटना को ठोस रूप देता है। विवाह अक्सर तब होता है जब शनि लग्न, सप्तम भाव या सप्तमेश पर गोचर करता है।',
          },
          {
            id:       'convergence-rule',
            label:    'The Convergence Rule: Both Conditions Must Align',
            label_hi: 'अभिसरण नियम: दोनों शर्तें एक साथ',
            body:     'Marriage typically manifests only when two conditions are met simultaneously. (1) Dasha Permission: the Mahadasha and Antardasha lords must be explicitly related to the 7th house, the 7th lord, or Venus. (2) Transit Trigger: Jupiter or Saturn must transit the 7th house, the 7th lord, or the Ascendant axis. If one factor is missing, the window may open but the event may not manifest. Always weigh the Dasha first — if it does not support marriage, no amount of favorable transits will produce the event.',
            body_hi:  'विवाह आमतौर पर तभी होता है जब दो शर्तें एक साथ पूरी हों: (1) दशा की अनुमति — महादशा और अंतर्दशा के स्वामी सप्तम भाव, सप्तमेश या शुक्र से स्पष्ट रूप से जुड़े हों; (2) गोचर ट्रिगर — गुरु या शनि सप्तम भाव, सप्तमेश या लग्न-अक्ष पर गोचर करें। दशा को हमेशा पहले देखें — अगर दशा विवाह का समर्थन नहीं करती, तो अनुकूल गोचर अकेले घटना नहीं ला सकता।',
          },
        ],
      },

      {
        id:       'combining-indicators',
        title:    'How Astrologers Combine the Indicators — and Why Predictions Differ',
        title_hi: 'संकेतों को साथ कैसे देखा जाता है — और भविष्यवाणियाँ अलग क्यों होती हैं',
        layout:   'checklist',
        items: [
          {
            id:       'window-not-date',
            label:    'A Likely Window, Not a Fixed Date',
            label_hi: 'संभावित अवधि, कोई तय तारीख नहीं',
            body:     'In the Sidereal (Lahiri) Vedic tradition, marriage is read as an event that manifests when the relevant parts of the birth chart are activated — through houses (Bhāvas), Dasha periods and transits, rather than chance. What this analysis produces is a period in which marriage is strongly supported, not a guaranteed date. If the indicated window is later than hoped, it is understood as a requirement for maturity — not a denial of partnership.',
            body_hi:  'सिद्धांत (लाहिड़ी) वैदिक परंपरा में विवाह को ऐसी घटना माना जाता है जो जन्मकुंडली के संबंधित भागों — भाव, दशा और गोचर — के सक्रिय होने पर घटित होती है, संयोग से नहीं। इस विश्लेषण से वह अवधि पता चलती है जिसमें विवाह के योग मज़बूत हों, कोई पक्की तारीख नहीं। अगर संकेतित अवधि अपेक्षा से देर की हो, तो उसे परिपक्वता की आवश्यकता समझा जाता है — विवाह न होना नहीं।',
          },
          {
            id:       'guidance-why-differs',
            label:    'Why Timing Predictions Differ Between Astrologers',
            label_hi: 'ज्योतिषियों की समय-भविष्यवाणियाँ अलग क्यों होती हैं',
            body:     'Two competent astrologers may suggest different time frames due to: Ayanamsha differences (even slight variations shift Dasha calculations); birth time uncertainty (a few minutes of error can shift the Navamsa or Antardasha start times); differing judgments on planetary strength; or interpreting a strong relationship experience as the marital event rather than a formal union.',
            body_hi:  'दो सक्षम ज्योतिषी अलग-अलग समय बता सकते हैं, क्योंकि: अयनांश में छोटा अंतर भी दशा गणना बदल देता है; जन्म समय में कुछ मिनट की गलती नवांश या अंतर्दशा की शुरुआत खिसका सकती है; ग्रह-बल के आकलन अलग हो सकते हैं; या किसी गहरे संबंध को औपचारिक विवाह मान लिया जाता है।',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Frequently Asked Questions',
        title_hi: 'अक्सर पूछे जाने वाले प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-dob-alone',
            label:    'Can my date of birth alone predict my marriage year?',
            label_hi: 'क्या सिर्फ़ जन्म तिथि से शादी का वर्ष पता चल सकता है?',
            body:     'Not reliably. The date of birth fixes the planetary positions, but the time and place of birth determine the Ascendant, the houses — including the 7th — and the exact start dates of Mahadasha and Antardasha periods. Without an accurate birth time, a timing window can shift by months or even years.',
            body_hi:  'भरोसे के साथ नहीं। जन्म तिथि से ग्रहों की स्थिति तय होती है, पर जन्म का समय और स्थान लग्न, भाव (सप्तम सहित) और महादशा–अंतर्दशा की सटीक शुरुआत तय करते हैं। सही जन्म समय के बिना समय-अवधि महीनों या वर्षों तक खिसक सकती है।',
          },
          {
            id:       'faq-which-dasha',
            label:    'Which Dasha can indicate marriage?',
            label_hi: 'कौन-सी दशा विवाह का संकेत दे सकती है?',
            body:     'Most often the Mahadasha or Antardasha of the 7th lord, of planets placed in or aspecting the 7th house, or of Venus — and of planets strongly connected to them. The Antardasha usually narrows the broad Mahadasha period to a more specific window.',
            body_hi:  'अक्सर सप्तमेश की, सप्तम भाव में बैठे या उस पर दृष्टि डालने वाले ग्रहों की, या शुक्र की महादशा या अंतर्दशा — और इनसे गहराई से जुड़े ग्रहों की। अंतर्दशा आमतौर पर व्यापक महादशा को एक अधिक विशिष्ट अवधि तक सीमित करती है।',
          },
          {
            id:       'faq-what-age',
            label:    'At what age will I get married?',
            label_hi: 'मेरी शादी किस उम्र में होगी?',
            body:     'Astrology answers this as a period rather than a fixed age: it looks at when the supporting Dasha and transits occur in your life. Some charts point to an earlier window and some to a later one — the dedicated guides on early and delayed marriage explain those patterns.',
            body_hi:  'ज्योतिष इसका उत्तर किसी तय उम्र के बजाय एक अवधि के रूप में देता है — यह देखता है कि आपके जीवन में सहायक दशा और गोचर कब आते हैं। कुछ कुंडलियाँ जल्दी की अवधि दिखाती हैं और कुछ बाद की — जल्दी और देर से विवाह की मार्गदर्शिकाएँ इन स्थितियों को समझाती हैं।',
          },
          {
            id:       'faq-rashi-alone',
            label:    'Does the Rashi chart alone suffice for predicting marriage timing?',
            label_hi: 'क्या विवाह का समय जानने के लिए अकेली राशि कुंडली पर्याप्त है?',
            body:     'No. The Rashi chart provides the potential, but the Navamsa (D9) chart is indispensable for validating the strength and actualization of that potential. Timing predictions based on the Rashi chart alone are often inaccurate.',
            body_hi:  'नहीं। राशि कुंडली संभावना दिखाती है, पर उस संभावना की शक्ति और साकार होने की पुष्टि के लिए नवांश (D9) अनिवार्य है।',
          },
          {
            id:       'faq-unconnected-mahadasha',
            label:    'Can marriage occur if the Mahadasha lord is not directly connected to the 7th house?',
            label_hi: 'क्या विवाह हो सकता है यदि महादशा स्वामी सप्तम भाव से सीधे जुड़ा नहीं है?',
            body:     'It is rare. Marriage timing almost always falls in the Dasha of a planet that has a strong, explicit relationship with the 7th house, the 7th Lord, or Venus in the natal chart.',
            body_hi:  'ऐसा कम होता है। विवाह का समय लगभग हमेशा उस ग्रह की दशा में आता है जिसका जन्म कुंडली में सप्तम भाव, सप्तमेश या शुक्र से मज़बूत और स्पष्ट संबंध हो।',
          },
          {
            id:       'faq-window-vs-trigger',
            label:    'What is the difference between a timing trigger and a timing window?',
            label_hi: 'समय-ट्रिगर और समय-अवधि में क्या अंतर है?',
            body:     'The timing window is created by the Mahadasha and Antardasha, which establish the overall opportunity. The transit of Jupiter or Saturn acts as the trigger that converts the potential opportunity into a physical event.',
            body_hi:  'समय-अवधि महादशा और अंतर्दशा से बनती है, जो समग्र अवसर तय करती हैं। गुरु या शनि का गोचर वह ट्रिगर है जो इस संभावना को वास्तविक घटना में बदलता है।',
          },
          {
            id:       'faq-jupiter-no-marriage',
            label:    'Why does my Jupiter transit look favorable, but I did not get married?',
            label_hi: 'मेरा गुरु गोचर अनुकूल दिखता है, फिर भी शादी क्यों नहीं हुई?',
            body:     'Transit is only a trigger. If the Dasha window is not active or does not support marriage, the trigger has nothing to activate. Both the Dasha and the Transit must point toward marriage simultaneously.',
            body_hi:  'गोचर केवल ट्रिगर है। अगर दशा की अवधि सक्रिय नहीं है या विवाह का समर्थन नहीं करती, तो ट्रिगर के पास सक्रिय करने के लिए कुछ नहीं होता। दशा और गोचर दोनों का एक साथ विवाह की ओर इशारा करना ज़रूरी है।',
          },
          {
            id:       'faq-antardasha-mismatch',
            label:    'What if the Mahadasha lord is related to marriage, but the Antardasha lord is not?',
            label_hi: 'अगर महादशा स्वामी विवाह से जुड़ा हो, पर अंतर्दशा स्वामी न हो तो?',
            body:     'Marriage is less likely in that sub-period. For a strong timing indication, both the Mahadasha and the Antardasha lords should be favorable and related to marriage-signifying houses.',
            body_hi:  'उस उप-अवधि में विवाह की संभावना कम रहती है। मज़बूत संकेत के लिए महादशा और अंतर्दशा दोनों के स्वामी अनुकूल और विवाह-संकेतक भावों से जुड़े होने चाहिए।',
          },
          {
            id:       'faq-8th-house',
            label:    'How does the 8th house affect marriage timing?',
            label_hi: 'अष्टम भाव विवाह के समय को कैसे प्रभावित करता है?',
            body:     'The 8th house represents longevity. If it is highly active in the Dasha period, it may sometimes override or complicate the timing indicated by the 7th house, occasionally causing unforeseen delays or shifts in timing.',
            body_hi:  'अष्टम भाव दीर्घायु का भाव है। अगर दशा अवधि में यह बहुत सक्रिय हो, तो कभी-कभी सप्तम भाव से संकेतित समय को जटिल बना सकता है और अप्रत्याशित देरी या बदलाव ला सकता है।',
          },
          {
            id:       'faq-timing-accuracy',
            label:    'How accurate is marriage timing prediction?',
            label_hi: 'विवाह के समय की भविष्यवाणी कितनी सटीक होती है?',
            body:     'Analysis based on established Vedic principles — Dasha and transit convergence, checked in the Navamsa — can meaningfully identify supportive periods, but it indicates a likely window rather than a certain date. Its reliability depends heavily on an accurate birth time and on careful judgment of planetary strength.',
            body_hi:  'स्थापित वैदिक सिद्धांतों — दशा और गोचर का अभिसरण, नवांश में पुष्टि — पर आधारित विश्लेषण सहायक अवधियों को सार्थक रूप से पहचान सकता है, पर यह एक संभावित अवधि बताता है, कोई निश्चित तारीख नहीं। इसकी विश्वसनीयता सही जन्म समय और ग्रह-बल के सावधान आकलन पर निर्भर करती है।',
          },
          {
            id:       'faq-marriage-vs-relationship',
            label:    'Should I look at marriage or relationship timing?',
            label_hi: 'मुझे विवाह का समय देखना चाहिए या संबंध का?',
            body:     'The 7th house governs committed, formal partnership (marriage). Relationship experiences such as dating can be triggered by less formal activations of the 5th house or Venus, and should not be confused with the timing of a formal union.',
            body_hi:  'सप्तम भाव प्रतिबद्ध, औपचारिक साझेदारी (विवाह) से जुड़ा है। डेटिंग जैसे संबंध पंचम भाव या शुक्र की कम औपचारिक सक्रियता से भी शुरू हो सकते हैं — इन्हें औपचारिक विवाह के समय से नहीं मिलाना चाहिए।',
          },
        ],
      },

    ],
    ctas: [
      {
        id:             'cta-marriage-path',
        type:           'tool',
        slug:           'marriage-path',
        label:          'Find Your Marriage Window',
        label_hi:       'अपने विवाह का समय जानें',
        description:    'A free check based on your birth details.',
        description_hi: 'आपके जन्म विवरण पर आधारित निःशुल्क जांच।',
        variant:        'primary',
      },
      {
        id:             'cta-marriage-report',
        type:           'report',
        slug:           'marriage_report',
        label:          'Get Your Marriage Report',
        label_hi:       'अपनी विवाह रिपोर्ट प्राप्त करें',
        description:    'A personalised PDF report based on your birth chart.',
        description_hi: 'आपकी जन्म कुंडली पर आधारित व्यक्तिगत PDF रिपोर्ट।',
        variant:        'secondary',
      },
    ],
  },

  relationships: {
    crossLinks: [
      {
        domain:   'panchang',
        slug:     'muhurat/marriage-muhurat',
        relation: 'cross-domain-ref',
        label:    'Shubh Vivah Dates',
        label_hi: 'शुभ विवाह तिथियां',
      },
    ],
  },

  aiMetadata: {
    searchIntent:   'informational',
    difficulty:     'beginner',
    authorityLevel: 'standard',
  },

  schemaSignals: {
    expertise:     'Authored by experienced Vedic astrologers applying traditional Sidereal (Lahiri) Dasha-Transit methodology for marriage timing analysis.',
    // First authored in commit 7cd8637 (2026-07-20, "marriage hub").
    datePublished: '2026-07-20',
  },

  authority: {
    reviewStatus:   'not-reviewed',
    contentVersion: 2,
    // MT-2 restructure (direct answer, consolidated sections, expanded FAQ).
    lastUpdated:    '2026-10-04',
  },

  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },

}
