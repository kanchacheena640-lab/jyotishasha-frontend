import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const marriageTiming: DomainTopic = {

  identity: {
    id:         'marriage-astrology:marriage-timing',
    slug:       'marriage-timing',
    title:      'Marriage Timing in Vedic Astrology',
    title_hi:   'वैदिक ज्योतिष में विवाह का समय',
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
    metaTitle:       'Marriage Timing in Vedic Astrology: Dasha & Transit Guide',
    metaDescription: 'Understand how Vedic astrology times marriage through Dasha cycles and planetary transits, including the convergence rule for accurate prediction.',
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Timing Your Marriage: The Vedic Astrology Guide to Dasha and Transit',
    headline_hi: 'अपने विवाह का समय: दशा और गोचर की वैदिक ज्योतिष मार्गदर्शिका',
    subtext:     'Discover how the convergence of Mahadasha, Antardasha, and planetary transits determines the precise window for marriage in your birth chart.',
    subtext_hi:  'जानें कैसे महादशा, अंतर्दशा और ग्रहों के गोचर का संगम आपकी जन्म कुंडली में विवाह के सटीक समय का निर्धारण करता है।',
  },

  taxonomy: {
    tags:        ['marriage-timing', 'vedic-astrology', 'dasha-system', 'marriage-prediction', 'planetary-transits'],
    keywords:    ['marriage timing', 'marriage timing astrology', 'when will i get married vedic astrology', 'mahadasha marriage', 'jupiter transit marriage', 'delayed marriage astrology', 'dasha transit marriage'],
    keywords_hi: ['विवाह का समय', 'विवाह ज्योतिष समय', 'कब होगा विवाह', 'महादशा विवाह', 'गुरु गोचर विवाह'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'intro',
        title:    'Marriage Timing as a Karmic Science',
        title_hi: 'विवाह समय: एक कार्मिक विज्ञान',
        layout:   'list',
        items: [
          {
            id:       'intro-karmic-timing',
            label:    'A Karmic Appointment, Not a Random Event',
            label_hi: 'एक कार्मिक नियुक्ति, यादृच्छिक घटना नहीं',
            body:     'In the Sidereal (Lahiri) Vedic tradition, marriage is not viewed as a random event governed by chance, but as a karmic appointment that manifests when the planetary energy in the individual\'s birth chart is appropriately activated. Marriage timing is the study of celestial readiness — understanding the specific moments when the karmic potential for union is permitted to flower in physical reality.',
            body_hi:  'सिद्धांत (लाहिड़ी) वैदिक परंपरा में, विवाह को संयोग द्वारा शासित एक यादृच्छिक घटना नहीं माना जाता, बल्कि एक कार्मिक नियुक्ति के रूप में देखा जाता है जो तब प्रकट होती है जब व्यक्ति की जन्म कुंडली में ग्रहों की ऊर्जा उचित रूप से सक्रिय होती है।',
          },
          {
            id:       'intro-vedic-method',
            label:    'The Vedic Method: Bhāvas, Dashas, and Transits',
            label_hi: 'वैदिक विधि: भाव, दशा और गोचर',
            body:     'Unlike Western astrological approaches that emphasize psychological readiness, Vedic astrology focuses on the activation of specific houses (Bhāvas) through planetary cycles (Dashas) and celestial movements (Transits). This guide explores the mechanisms used to predict marriage timing — focusing strictly on the timing parameters rather than the nature or quality of the partnership itself.',
            body_hi:  'वैदिक ज्योतिष मनोवैज्ञानिक तैयारी पर जोर देने वाले पश्चिमी दृष्टिकोण के विपरीत, ग्रहों के चक्रों (दशाओं) और आकाशीय गतिविधियों (गोचर) के माध्यम से विशिष्ट भावों की सक्रियता पर ध्यान केंद्रित करता है।',
          },
        ],
      },

      {
        id:       'foundational-indicators',
        title:    'The Three Foundational Indicators for Timing',
        title_hi: 'समय के लिए तीन मूलभूत संकेतक',
        layout:   'cards',
        items: [
          {
            id:       'indicator-7th-lord',
            icon:     '🏠',
            label:    '7th House and 7th Lord — The Primary Timekeeper',
            label_hi: 'सप्तम भाव और सप्तमेश — प्राथमिक समयपाल',
            body:     'The 7th house is the primary seat of marriage, and its lord is the primary timekeeper. A strong, well-placed 7th Lord produces marriage timing that follows a natural progression. An afflicted 7th Lord extends the period required for the individual to mature and meet the karmic requirements for partnership.',
            body_hi:  'सप्तम भाव विवाह की प्राथमिक सीट है, और इसका स्वामी प्राथमिक समयपाल है। एक पीड़ित सप्तमेश उस अवधि को बढ़ाता है जो व्यक्ति को साझेदारी के लिए कार्मिक आवश्यकताओं को पूरा करने के लिए चाहिए।',
          },
          {
            id:       'indicator-venus-jupiter',
            icon:     '✨',
            label:    'Venus and Jupiter — The Essential Karakas',
            label_hi: 'शुक्र और गुरु — आवश्यक कारक',
            body:     'Venus is the natural Karaka of love and romance; Jupiter is the Karaka for marriage, particularly in a woman\'s chart. Their Dasha periods — or periods of planets associated with them — are frequently the primary candidates for marriage timing. A strong Venus accelerates timing through its Mahadasha; an active Jupiter shifts focus toward the formal aspects of union.',
            body_hi:  'शुक्र प्रेम और रोमांस का प्राकृतिक कारक है; गुरु विवाह का कारक है, विशेष रूप से महिला की कुंडली में। उनकी दशा अवधियां अक्सर विवाह के समय के लिए प्राथमिक उम्मीदवार होती हैं।',
          },
          {
            id:       'indicator-navamsa',
            icon:     '💎',
            label:    'Navamsa (D9) — The Validation Layer',
            label_hi: 'नवांश (D9) — सत्यापन परत',
            body:     'Relying solely on the Rashi (D1) chart is a common timing error. The Navamsa (D9) is the indispensable validation filter — a planet may appear to be a marriage indicator in the Rashi chart but may be weak or disconnected from marriage-related houses in the Navamsa. Expert timing requires the activating planet to show strength and a direct connection to the 7th house in D9.',
            body_hi:  'केवल राशि (D1) कुंडली पर निर्भर रहना एक सामान्य समय की गलती है। नवांश (D9) अपरिहार्य सत्यापन फिल्टर है। विशेषज्ञ समय के लिए आवश्यक है कि सक्रिय करने वाला ग्रह D9 में सप्तम भाव से शक्ति और सीधा संबंध दिखाए।',
          },
        ],
      },

      {
        id:       'dasha-system',
        title:    'The Timing Engine: Mahadasha and Antardasha',
        title_hi: 'समय का इंजन: महादशा और अंतर्दशा',
        layout:   'checklist',
        items: [
          {
            id:       'mahadasha-candidates',
            label:    'Mahadasha — The General Marriage Window',
            label_hi: 'महादशा — सामान्य विवाह खिड़की',
            body:     'The Mahadasha provides the broad time frame during which marriage is highlighted. The primary candidates are Mahadashas of: the 7th Lord; planets residing in the 7th house; Venus (the universal significator of love and marriage); and planets that aspect the 7th house. The Mahadasha is the broad permission, not the precise date.',
            body_hi:  'महादशा वह व्यापक समय सीमा प्रदान करती है जिसमें विवाह उजागर होता है। प्राथमिक उम्मीदवार: सप्तमेश; सप्तम भाव में रहने वाले ग्रह; शुक्र; और सप्तम भाव पर दृष्टि रखने वाले ग्रह। महादशा व्यापक अनुमति है, सटीक तारीख नहीं।',
          },
          {
            id:       'antardasha-precision',
            label:    'Antardasha — Narrowing to the Specific Year',
            label_hi: 'अंतर्दशा — विशिष्ट वर्ष तक संकुचन',
            body:     'Within the Mahadasha, the Antardasha (sub-period) is the primary timing agent. Marriage rarely occurs in a Mahadasha that does not support it; however, the specific year is determined by the Antardasha. When both are favorable — for example, the Mahadasha of the 7th Lord and the Antardasha of a planet related to Venus — the marriage window narrows significantly.',
            body_hi:  'महादशा के भीतर, अंतर्दशा (उप-अवधि) प्राथमिक समय एजेंट है। जब महादशा और अंतर्दशा दोनों विवाह के लिए अनुकूल होती हैं, तो विवाह की खिड़की काफी संकुचित हो जाती है।',
          },
        ],
      },

      {
        id:       'transit-triggers',
        title:    'Transit Triggers and the Convergence Rule',
        title_hi: 'गोचर ट्रिगर और अभिसरण नियम',
        layout:   'checklist',
        items: [
          {
            id:       'transit-jupiter',
            label:    'Jupiter Transit — The Most Potent Trigger',
            label_hi: 'गुरु गोचर — सबसे शक्तिशाली ट्रिगर',
            body:     'Dasha provides the potential; the Transit provides the trigger. Jupiter is the most potent transit trigger for marriage. Marriage is most likely when Jupiter transits through the 7th house, over the 7th house lord, over the lord of the Ascendant, or in aspect to the 7th house.',
            body_hi:  'दशा संभावना प्रदान करती है; गोचर ट्रिगर प्रदान करता है। गुरु विवाह के लिए सबसे शक्तिशाली गोचर ट्रिगर है: सप्तम भाव से गुजरते हुए, सप्तमेश पर, लग्नेश पर, या सप्तम भाव पर दृष्टि के साथ।',
          },
          {
            id:       'transit-saturn',
            label:    'Saturn Transit — The Structure-Bringer',
            label_hi: 'शनि गोचर — संरचना लाने वाला',
            body:     'While Jupiter provides the permission, Saturn provides the concrete manifestation of the event. Marriage frequently occurs when Saturn transits over the Ascendant, over the 7th house, or over the 7th house lord. Saturn\'s transit confers the structural gravity needed to formalize the union.',
            body_hi:  'जबकि गुरु अनुमति प्रदान करता है, शनि घटना की ठोस अभिव्यक्ति प्रदान करता है। विवाह अक्सर तब होता है जब शनि लग्न, सप्तम भाव, या सप्तमेश से गुजरता है।',
          },
          {
            id:       'convergence-rule',
            label:    'The Convergence Rule: Both Conditions Must Align',
            label_hi: 'अभिसरण नियम: दोनों शर्तें संरेखित होनी चाहिए',
            body:     'Marriage typically manifests only when two conditions are met simultaneously. (1) Dasha Permission: the Mahadasha and Antardasha lords must be explicitly related to the 7th house, the 7th lord, or Venus. (2) Transit Trigger: Jupiter or Saturn must transit the 7th house, the 7th lord, or the Ascendant axis. If one factor is missing, the window may open but the event may not manifest in physical reality.',
            body_hi:  'विवाह आमतौर पर तभी प्रकट होता है जब दो शर्तें एक साथ पूरी हों: (1) दशा अनुमति: महादशा और अंतर्दशा स्वामी सप्तम भाव, सप्तमेश या शुक्र से स्पष्ट रूप से संबंधित होने चाहिए। (2) गोचर ट्रिगर: गुरु या शनि को सप्तम भाव, सप्तमेश, या लग्न अक्ष से गुजरना होगा।',
          },
        ],
      },

      {
        id:       'timing-combinations',
        title:    'Combinations Affecting Timing: Early and Delayed',
        title_hi: 'समय को प्रभावित करने वाले संयोजन: जल्दी और विलंबित',
        layout:   'checklist',
        items: [
          {
            id:       'early-marriage-combos',
            label:    'Early Marriage Combinations',
            label_hi: 'जल्दी विवाह के संयोजन',
            body:     'Early marriage is typically indicated when: the 7th house is heavily influenced by benefic planets (Jupiter, Venus, Mercury); the 7th Lord is placed in a Kendra house (1st, 4th, 7th, 10th) with strong dignity; benefic planets have a direct relationship with the Ascendant lord; or the individual enters the Dasha of a marriage-signifying planet at a young age.',
            body_hi:  'जल्दी विवाह का संकेत आमतौर पर: सप्तम भाव पर शुभ ग्रहों का भारी प्रभाव; उच्च गरिमा के साथ केंद्र भाव में सप्तमेश; लग्नेश के साथ शुभ ग्रहों का सीधा संबंध; या कम उम्र में विवाह-संकेतक ग्रह की दशा।',
          },
          {
            id:       'delayed-marriage-combos',
            label:    'Delayed Marriage Combinations',
            label_hi: 'विलंबित विवाह के संयोजन',
            body:     'Delayed marriage — which is not denial — is indicated by: Saturn in the 7th house or aspecting the 7th Lord, requiring patience and maturation; the 7th Lord combust, debilitated, or placed in the 6th, 8th, or 12th house; or multiple malefic influences (Mars, Rahu, Saturn) in the 7th house without mitigating benefic aspects, making the internal requirements for partnership more complex.',
            body_hi:  'विलंबित विवाह — जो अस्वीकृति नहीं है — का संकेत: सप्तम भाव में या सप्तमेश पर शनि; 6th, 8th, या 12th भाव में दग्ध या नीच सप्तमेश; या शमन करने वाले शुभ पहलुओं के बिना सप्तम भाव में कई पापी प्रभाव।',
          },
        ],
      },

      {
        id:       'practical-guidance',
        title:    'Practical Guidance and Why Timing Predictions Differ',
        title_hi: 'व्यावहारिक मार्गदर्शन और समय भविष्यवाणियां क्यों भिन्न होती हैं',
        layout:   'checklist',
        items: [
          {
            id:       'guidance-holistic',
            label:    'Trust the Holistic Picture',
            label_hi: 'समग्र चित्र पर भरोसा करें',
            body:     'Do not rely on a single indicator. The timing of marriage is an intersection of several planetary signals. Prioritize Dasha first — it is the roadmap of life. If the Dasha does not allow for marriage, no amount of favorable transits will produce the event.',
            body_hi:  'एक ही संकेतक पर निर्भर न रहें। पहले दशा को प्राथमिकता दें — यह जीवन का रोडमैप है। यदि दशा विवाह की अनुमति नहीं देती है, तो कोई भी अनुकूल गोचर घटना उत्पन्न नहीं करेगा।',
          },
          {
            id:       'guidance-navamsa',
            label:    'Always Verify with the Navamsa',
            label_hi: 'हमेशा नवांश के साथ सत्यापित करें',
            body:     'A planet that is strong in the Rashi chart but weak in the Navamsa is often an unreliable timing indicator. If the timing suggested by the chart is late, understand it as a karmic requirement for maturity — not a failure of the prediction or a denial of partnership.',
            body_hi:  'एक ग्रह जो राशि कुंडली में मजबूत है लेकिन नवांश में कमजोर है, अक्सर एक अविश्वसनीय समय संकेतक होता है। यदि कुंडली द्वारा सुझाया गया समय देर से है, तो इसे परिपक्वता के लिए कार्मिक आवश्यकता के रूप में समझें।',
          },
          {
            id:       'guidance-why-differs',
            label:    'Why Timing Predictions Differ Between Astrologers',
            label_hi: 'ज्योतिषियों के बीच समय भविष्यवाणियां क्यों भिन्न होती हैं',
            body:     'Two competent astrologers may suggest different time frames due to: Ayanamsha differences (even slight variations shift Dasha calculations); birth time uncertainty (a few minutes of error can shift the Navamsa or Antardasha start times); differing judgments on planetary strength; or interpreting a strong relationship experience as the marital event rather than a formal union.',
            body_hi:  'दो सक्षम ज्योतिषी अलग-अलग समय सीमाओं का सुझाव दे सकते हैं: अयनांश में अंतर; जन्म समय की अनिश्चितता; ग्रह शक्ति के आकलन में अंतर; या एक मजबूत संबंध अनुभव को वैवाहिक घटना के रूप में व्याख्यायित करना।',
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
            id:       'faq-rashi-alone',
            label:    'Does the Rashi chart alone suffice for predicting marriage timing?',
            label_hi: 'क्या राशि कुंडली अकेले विवाह के समय की भविष्यवाणी के लिए पर्याप्त है?',
            body:     'No. The Rashi chart provides the potential, but the Navamsa (D9) chart is indispensable for validating the strength and actualization of that potential. Timing predictions based on the Rashi chart alone are often inaccurate.',
            body_hi:  'नहीं। राशि कुंडली संभावना प्रदान करती है, लेकिन नवांश (D9) कुंडली उस संभावना की शक्ति और वास्तविकता को मान्य करने के लिए अपरिहार्य है।',
          },
          {
            id:       'faq-unconnected-mahadasha',
            label:    'Can marriage occur if the Mahadasha lord is not directly connected to the 7th house?',
            label_hi: 'क्या विवाह हो सकता है यदि महादशा स्वामी सप्तम भाव से सीधे जुड़ा नहीं है?',
            body:     'It is rare. Marriage timing almost exclusively occurs during the Dasha of a planet that has a strong, explicit relationship with the 7th house, the 7th Lord, or Venus in the natal chart.',
            body_hi:  'यह दुर्लभ है। विवाह का समय लगभग विशेष रूप से उस ग्रह की दशा के दौरान होता है जिसका जन्म कुंडली में सप्तम भाव, सप्तमेश, या शुक्र के साथ मजबूत, स्पष्ट संबंध हो।',
          },
          {
            id:       'faq-window-vs-trigger',
            label:    'What is the difference between a timing trigger and a timing window?',
            label_hi: 'समय ट्रिगर और समय खिड़की के बीच क्या अंतर है?',
            body:     'The timing window is created by the Mahadasha and Antardasha, which establish the overall opportunity. The transit of Jupiter or Saturn acts as the trigger that converts the potential opportunity into a physical event.',
            body_hi:  'समय खिड़की महादशा और अंतर्दशा द्वारा बनाई जाती है, जो समग्र अवसर स्थापित करती है। गुरु या शनि का गोचर ट्रिगर के रूप में कार्य करता है जो संभावित अवसर को एक भौतिक घटना में बदलता है।',
          },
          {
            id:       'faq-jupiter-no-marriage',
            label:    'Why does my Jupiter transit look favorable, but I did not get married?',
            label_hi: 'मेरा गुरु गोचर अनुकूल क्यों दिखता है, लेकिन मेरा विवाह नहीं हुआ?',
            body:     'Transit is only a trigger. If the Dasha window is not active or does not support marriage, the trigger has nothing to activate. Both the Dasha and the Transit must point toward marriage simultaneously.',
            body_hi:  'गोचर केवल एक ट्रिगर है। यदि दशा खिड़की सक्रिय नहीं है या विवाह का समर्थन नहीं करती है, तो ट्रिगर के पास सक्रिय करने के लिए कुछ नहीं है।',
          },
          {
            id:       'faq-antardasha-mismatch',
            label:    'What if the Mahadasha lord is related to marriage, but the Antardasha lord is not?',
            label_hi: 'क्या होगा यदि महादशा स्वामी विवाह से संबंधित है, लेकिन अंतर्दशा स्वामी नहीं है?',
            body:     'The marriage is unlikely to occur in that period. Both the Mahadasha and the Antardasha lords must be favorable and related to marriage-signifying houses for the timing to be correct.',
            body_hi:  'उस अवधि में विवाह होने की संभावना नहीं है। सही समय के लिए महादशा और अंतर्दशा दोनों स्वामी अनुकूल और विवाह-संकेतक भावों से संबंधित होने चाहिए।',
          },
          {
            id:       'faq-remedies-speed',
            label:    'Can I speed up marriage timing through remedies?',
            label_hi: 'क्या मैं उपायों के माध्यम से विवाह के समय को तेज कर सकता हूं?',
            body:     'No. Astrological remedies are meant to help you handle planetary energies with greater balance and maturity. They do not force an event like marriage against the karmic timing indicated by the chart.',
            body_hi:  'नहीं। ज्योतिषीय उपाय आपको ग्रहों की ऊर्जाओं को अधिक संतुलन और परिपक्वता के साथ संभालने में मदद करने के लिए हैं। वे कुंडली द्वारा संकेतित कार्मिक समय के विरुद्ध विवाह जैसी घटना को मजबूर नहीं करते।',
          },
          {
            id:       'faq-8th-house',
            label:    'How does the 8th house affect marriage timing?',
            label_hi: 'अष्टम भाव विवाह के समय को कैसे प्रभावित करता है?',
            body:     'The 8th house represents longevity. If it is highly active in the Dasha period, it may sometimes override or complicate the timing indicated by the 7th house, occasionally causing unforeseen delays or shifts in timing.',
            body_hi:  'अष्टम भाव दीर्घायु का प्रतिनिधित्व करता है। यदि यह दशा अवधि में अत्यधिक सक्रिय है, तो यह कभी-कभी सप्तम भाव द्वारा संकेतित समय को ओवरराइड या जटिल बना सकता है।',
          },
          {
            id:       'faq-timing-accuracy',
            label:    'How accurate is marriage timing prediction?',
            label_hi: 'विवाह समय की भविष्यवाणी कितनी सटीक है?',
            body:     'When based on authentic Vedic principles (Dasha-Transit convergence), timing predictions can be remarkably accurate. However, they are always subject to the precision of the recorded birth time and the astrologer\'s judgment of planetary strength.',
            body_hi:  'जब प्रामाणिक वैदिक सिद्धांतों (दशा-गोचर अभिसरण) पर आधारित हो, तो समय की भविष्यवाणियां उल्लेखनीय रूप से सटीक हो सकती हैं। हालांकि, वे हमेशा दर्ज जन्म समय की सटीकता और ग्रह शक्ति के ज्योतिषी के निर्णय के अधीन होती हैं।',
          },
          {
            id:       'faq-marriage-vs-relationship',
            label:    'Should I look at marriage or relationship timing?',
            label_hi: 'क्या मुझे विवाह या संबंध के समय को देखना चाहिए?',
            body:     'The 7th house governs committed, formal partnership (marriage). Relationship experiences such as dating can be triggered by less formal activations of the 5th house or Venus, and should not be confused with the timing of a formal union.',
            body_hi:  'सप्तम भाव प्रतिबद्ध, औपचारिक साझेदारी (विवाह) को नियंत्रित करता है। डेटिंग जैसे संबंध अनुभव पंचम भाव या शुक्र की कम औपचारिक सक्रियता द्वारा ट्रिगर हो सकते हैं।',
          },
        ],
      },

    ],
    ctas: [],
  },

  aiMetadata: {
    searchIntent:   'informational',
    difficulty:     'beginner',
    authorityLevel: 'standard',
  },

  schemaSignals: {
    expertise: 'Authored by experienced Vedic astrologers applying traditional Sidereal (Lahiri) Dasha-Transit methodology for precise marriage timing analysis.',
  },

  authority: {
    reviewStatus:   'not-reviewed',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },

}
