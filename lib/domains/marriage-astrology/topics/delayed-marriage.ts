import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const delayedMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:delayed-marriage',
    slug:       'delayed-marriage',
    title:      'Delayed Marriage in Vedic Astrology',
    title_hi:   'वैदिक ज्योतिष में विलंबित विवाह',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'draft',
  },

  routing: {
    canonicalPath: '/marriage-astrology/delayed-marriage',
    breadcrumbs: [
      { label: 'Home',               label_hi: 'होम',            href: '/' },
      { label: 'Marriage Astrology', label_hi: 'विवाह ज्योतिष',  href: '/marriage-astrology' },
      { label: 'Delayed Marriage',   label_hi: 'विलंबित विवाह',  href: '/marriage-astrology/delayed-marriage' },
    ],
  },

  seo: {
    metaTitle:       'Delayed Marriage in Vedic Astrology: Causes, Timing, Remedies',
    metaDescription: 'Explore the astrological causes of delayed marriage — Saturn, afflicted houses, Dasha timing, and the crucial difference between delay and denial in Vedic astrology.',
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Delayed Marriage in Vedic Astrology: Causes, Timing & Remedies',
    headline_hi: 'वैदिक ज्योतिष में विलंबित विवाह: कारण, समय और उपाय',
    subtext:     "Understand why marriage is delayed in your chart — from Saturn's karmic lessons and afflicted houses to Dasha timing, Darakaraka analysis, and the crucial difference between delay and denial.",
    subtext_hi:  'जानें कुंडली में विवाह क्यों विलंबित होता है — शनि के कार्मिक पाठों से लेकर पीड़ित भावों, दशा समय, दारकारक विश्लेषण और विलंब तथा अस्वीकृति के बीच महत्वपूर्ण अंतर तक।',
  },

  taxonomy: {
    tags:        ['delayed-marriage', 'vedic-astrology', 'saturn', '7th-house', 'dasha-timing', 'navamsa', 'marriage-remedies'],
    keywords:    ['delayed marriage astrology', 'delayed marriage vedic astrology', 'saturn delayed marriage', '7th house afflicted marriage', 'delay vs denial astrology', 'darakaraka marriage', 'delayed marriage causes'],
    keywords_hi: ['विलंबित विवाह ज्योतिष', 'वैदिक ज्योतिष में विलंबित विवाह', 'शनि विवाह विलंब', 'सप्तम भाव विवाह विलंब'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'intro',
        title:    'Delayed Marriage as a Karmic Blueprint',
        title_hi: 'विलंबित विवाह एक कार्मिक ब्लूप्रिंट के रूप में',
        layout:   'list',
        items: [
          {
            id:       'intro-karmic-event',
            label:    'A Karmic Event, Not a Social Failure',
            label_hi: 'एक कार्मिक घटना, सामाजिक विफलता नहीं',
            body:     'In Vedic astrology, marriage is not merely a social contract — it is a karmic intersection where two souls align to fulfill mutual obligations. When marriage does not occur within the expected societal timeframe, it is categorized as delayed. For the seasoned astrologer, this is rarely random. It is a calculated manifestation of past-life karmas, represented by the specific configuration of the horoscope. It is not necessarily a bad thing, but a specific timeline designated by cosmic architecture.',
            body_hi:  'वैदिक ज्योतिष में, विवाह केवल एक सामाजिक अनुबंध नहीं है — यह एक कार्मिक चौराहा है जहाँ दो आत्माएँ पारस्परिक दायित्वों को पूरा करने के लिए संरेखित होती हैं। जब विवाह अपेक्षित सामाजिक समय सीमा में नहीं होता, तो इसे विलंबित कहा जाता है। अनुभवी ज्योतिषी के लिए यह शायद ही कभी यादृच्छिक होता है।',
          },
          {
            id:       'intro-defining-delay',
            label:    'What Constitutes a Delayed Marriage?',
            label_hi: 'विलंबित विवाह की परिभाषा क्या है?',
            body:     'Conventionally, a marriage occurring after age 30 or 32 is viewed as delayed. However, a more precise definition looks beyond age at the Dasha and Bhukti timings that activate the marriage houses. If the activation of the 7th house and its lord occurs significantly later than the native\'s peers, the marriage is delayed regardless of the absolute age at which it occurs. Delay is defined by the karmic timetable, not by the calendar.',
            body_hi:  'परंपरागत रूप से, 30 या 32 वर्ष के बाद होने वाला विवाह विलंबित माना जाता है। हालाँकि, अधिक सटीक परिभाषा दशा और भुक्ति समय को देखती है जो विवाह भावों को सक्रिय करती है। विलंब कार्मिक समय-सारणी से परिभाषित होता है, न कि कैलेंडर से।',
          },
        ],
      },

      {
        id:       'delay-houses',
        title:    'The Five Houses of Delay',
        title_hi: 'विलंब के पाँच भाव',
        layout:   'cards',
        items: [
          {
            id:       'house-7th',
            icon:     '🏠',
            label:    '7th House — The Primary Seat of Marriage',
            label_hi: 'सप्तम भाव — विवाह की प्राथमिक सीट',
            body:     'The 7th house is the primary seat of marriage. Its lord, the planets residing within it, and the planets aspecting it form the core of marriage analysis. If the 7th house or its lord is heavily afflicted by Saturn, Rahu, or Ketu, or if it lacks the stabilizing influence of Jupiter or Venus, the path to marriage becomes arduous and delayed.',
            body_hi:  'सप्तम भाव विवाह की प्राथमिक सीट है। इसका स्वामी, इसमें स्थित ग्रह और इसे देखने वाले ग्रह विवाह विश्लेषण का केंद्र बनाते हैं। यदि सप्तम भाव या इसका स्वामी शनि, राहु या केतु से भारी रूप से पीड़ित हो, तो विवाह का मार्ग कठिन और विलंबित हो जाता है।',
          },
          {
            id:       'house-1st',
            icon:     '🧭',
            label:    '1st House — The Self and Its Readiness',
            label_hi: 'प्रथम भाव — स्वयं और उसकी तैयारी',
            body:     'The 1st house (Lagna) represents the self. If the Lagna and the Lagna Lord are weak or afflicted, the individual\'s own drive, personality, or readiness for union may be hindered. A weak Lagna can cause the native to be hesitant, lack confidence, or encounter internal obstacles in manifesting a partner — delaying marriage from within.',
            body_hi:  'प्रथम भाव (लग्न) स्वयं का प्रतिनिधित्व करता है। यदि लग्न और लग्नेश कमजोर या पीड़ित हों, तो व्यक्ति की अपनी तत्परता या मिलन की इच्छाशक्ति बाधित हो सकती है। कमजोर लग्न व्यक्ति को संकोची बना सकता है या साथी प्रकट करने में आंतरिक बाधाएँ उत्पन्न कर सकता है।',
          },
          {
            id:       'house-2nd',
            icon:     '🏛️',
            label:    '2nd House — The Family Foundation',
            label_hi: 'द्वितीय भाव — पारिवारिक नींव',
            body:     'The 2nd house is the house of Kutumba — family continuity and the values that anchor a household. When the 2nd house is afflicted, it directly affects the capacity to establish a stable family unit, contributing to delays in marriage as the structural foundation for union is weakened or contested.',
            body_hi:  'द्वितीय भाव कुटुंब का भाव है — पारिवारिक निरंतरता और उन मूल्यों का जो एक घर को लंगर डालते हैं। जब 2रा भाव पीड़ित होता है, तो यह एक स्थिर पारिवारिक इकाई स्थापित करने की क्षमता को सीधे प्रभावित करता है, जो विवाह में विलंब में योगदान देता है।',
          },
          {
            id:       'house-8th',
            icon:     '⚡',
            label:    '8th House — Obstacles and Transformation',
            label_hi: 'अष्टम भाव — बाधाएं और परिवर्तन',
            body:     'The 8th house represents obstacles, longevity, and profound transformation. As the 2nd house from the 7th (marking the endurance of the marriage), its affliction can introduce significant hurdles, delays, or intense karmic tests before marriage manifests — demanding deep transformation before the union is permitted.',
            body_hi:  'अष्टम भाव बाधाओं, दीर्घायु और गहन परिवर्तन का प्रतिनिधित्व करता है। सप्तम से 2रे भाव के रूप में (विवाह की दीर्घायु चिह्नित करते हुए), इसका पीड़न विवाह से पहले महत्वपूर्ण बाधाएँ या तीव्र कार्मिक परीक्षण ला सकता है।',
          },
          {
            id:       'house-12th',
            icon:     '🌙',
            label:    '12th House — Isolation and Renunciation',
            label_hi: 'द्वादश भाव — एकांत और त्याग',
            body:     'The 12th house governs bed pleasures, isolation, and renunciation. Excessive malefic influence here can lead to a preference for solitude or a spiritual inclination that consciously or subconsciously postpones marriage — the individual becomes drawn to inner worlds rather than outward partnerships.',
            body_hi:  'द्वादश भाव शयन सुख, एकांत और त्याग को नियंत्रित करता है। यहाँ अत्यधिक पापी प्रभाव एकांत की प्राथमिकता या आध्यात्मिक झुकाव की ओर ले जा सकता है जो सचेत या अवचेतन रूप से विवाह को स्थगित कर देता है।',
          },
        ],
      },

      {
        id:       'planetary-architects',
        title:    'Planetary Architects of Delay',
        title_hi: 'विलंब के ग्रह वास्तुकार',
        layout:   'cards',
        items: [
          {
            id:       'planet-saturn',
            icon:     '🔵',
            label:    'Saturn — The Great Delayer',
            label_hi: 'शनि — महान विलंबकर्ता',
            body:     'Saturn is the primary planet of restriction, discipline, and delay. When Saturn influences the 7th house, the 7th lord, or the Karaka of marriage (Venus for men, Jupiter for women), a delay is highly probable. Saturn demands maturity and a lesson to be learned before granting the fruits of marriage — the delay is intended to ensure the individual is adequately prepared for the seriousness of the commitment.',
            body_hi:  'शनि प्रतिबंध, अनुशासन और विलंब का प्राथमिक ग्रह है। जब शनि सप्तम भाव, सप्तमेश या विवाह के कारक (पुरुषों के लिए शुक्र, महिलाओं के लिए गुरु) को प्रभावित करता है, तो विलंब अत्यधिक संभावित है। शनि विवाह के फल देने से पहले परिपक्वता और सीखे जाने वाले पाठ की माँग करता है।',
          },
          {
            id:       'planet-mars',
            icon:     '🔴',
            label:    'Mars — Passion and Conflict',
            label_hi: 'मंगल — जुनून और संघर्ष',
            body:     'Mars is not a planet of delay in the same sense as Saturn, but its heavy affliction of the 7th house creates conflicts, passion-driven disruptions, or impulsiveness that hampers long-term commitment. The native may be too driven or combative to sustain a partnership, pushing marriage into the background while other pursuits dominate.',
            body_hi:  'मंगल शनि के समान विलंब का ग्रह नहीं है, लेकिन सप्तम भाव पर इसका भारी पीड़न संघर्ष या आवेगशीलता पैदा करता है जो दीर्घकालिक प्रतिबद्धता में बाधा डालता है। व्यक्ति अन्य लक्ष्यों पर अत्यधिक ध्यान केंद्रित कर सकता है, जिससे विवाह पृष्ठभूमि में चला जाता है।',
          },
          {
            id:       'planet-rahu-ketu',
            icon:     '🌑',
            label:    'Rahu and Ketu — Obsession and Detachment',
            label_hi: 'राहु और केतु — जुनून और वैराग्य',
            body:     'Rahu creates obsession or unconventional desires, often leading to delays because the native holds unrealistic expectations or pursues unsuitable partners. Ketu is the opposite — the planet of detachment. Its influence can make the native uninterested in marriage altogether, leading to delay simply because the desire for union is not sufficiently strong or is directed toward spiritual pursuits.',
            body_hi:  'राहु जुनून या अपरंपरागत इच्छाएँ पैदा करता है, जिससे अक्सर देरी होती है क्योंकि व्यक्ति अवास्तविक अपेक्षाएँ रखता है। केतु विपरीत है — वैराग्य का ग्रह। इसका प्रभाव व्यक्ति को विवाह में अरुचि बना सकता है, जिससे देरी केवल इसलिए होती है क्योंकि मिलन की इच्छा पर्याप्त मजबूत नहीं है।',
          },
          {
            id:       'planet-venus-jupiter',
            icon:     '✨',
            label:    'Venus and Jupiter — The Afflicted Karakas',
            label_hi: 'शुक्र और गुरु — पीड़ित कारक',
            body:     'Venus is the universal Karaka for marriage and passion; Jupiter is the Karaka for the husband in a female chart. An afflicted Venus — debilitated, combust, or under heavy malefic influence — severely hampers the ability to form intimate bonds. An afflicted Jupiter in a female chart delays the manifestation of a partner who fulfills the required standards for marriage.',
            body_hi:  'शुक्र विवाह और जुनून का सार्वभौमिक कारक है; गुरु महिला की कुंडली में पति का कारक है। नीच, दग्ध या भारी पापी प्रभाव में शुक्र अंतरंग बंधन बनाने की क्षमता को गंभीर रूप से बाधित करता है। महिला की कुंडली में पीड़ित गुरु उस साथी के प्रकट होने में देरी करता है।',
          },
        ],
      },

      {
        id:       'structural-analysis',
        title:    'Advanced Structural Analysis',
        title_hi: 'उन्नत संरचनात्मक विश्लेषण',
        layout:   'checklist',
        items: [
          {
            id:       'analysis-retrograde',
            label:    'Retrograde 7th Lord — Unconventional Timing',
            label_hi: 'वक्री सप्तमेश — अपरंपरागत समय',
            body:     'A retrograde planet behaves in an unconventional or powerful, sometimes unpredictable, manner. If the 7th lord is retrograde, the timing of marriage is often delayed or arrives under unusual circumstances — a second attempt, an unexpected reconnection, or a reversal of prior decisions about partnership.',
            body_hi:  'एक वक्री ग्रह अपरंपरागत या शक्तिशाली, कभी-कभी अप्रत्याशित तरीके से व्यवहार करता है। यदि सप्तमेश वक्री हो, तो विवाह का समय अक्सर विलंबित होता है या असामान्य परिस्थितियों में आता है।',
          },
          {
            id:       'analysis-combust',
            label:    'Combust 7th Lord — Burnt Significations',
            label_hi: 'दग्ध सप्तमेश — जली हुई संकेतात्मकता',
            body:     'Combustion occurs when a planet is too close to the Sun, causing it to lose its power to act independently. If the 7th lord is combust, the significations of the 7th house become burnt or unable to manifest — partnership potential exists in the chart but cannot actualize, leading to obstacles and delay.',
            body_hi:  'दहन तब होता है जब कोई ग्रह सूर्य के बहुत निकट होता है, जिससे वह स्वतंत्र रूप से कार्य करने की शक्ति खो देता है। यदि सप्तमेश दग्ध हो, तो सप्तम भाव की संकेतात्मकताएँ प्रकट नहीं हो पाती — साझेदारी की संभावना कुंडली में मौजूद है लेकिन वास्तविक नहीं हो सकती।',
          },
          {
            id:       'analysis-darakaraka',
            label:    'Darakaraka (DK) — The Jaimini Soulmate Indicator',
            label_hi: 'दारकारक (DK) — जैमिनी सोलमेट संकेतक',
            body:     'In the Jaimini system, the Darakaraka is the planet with the lowest longitude in the natal chart. Its placement and strength are vital. If the DK is weak, afflicted, or placed in a Dusthana (6th, 8th, or 12th house), it indicates significant challenges and delays — the karmic partner is real, but the path to meeting them is burdened.',
            body_hi:  'जैमिनी प्रणाली में, दारकारक जन्म कुंडली में सबसे कम अंश वाला ग्रह है। यदि DK कमजोर, पीड़ित या दुस्थान (6वें, 8वें या 12वें भाव) में हो, तो यह महत्वपूर्ण चुनौतियाँ और विलंब दर्शाता है।',
          },
          {
            id:       'analysis-navamsa-ul',
            label:    'Navamsa (D9) and Upapada Lagna — The Validation Layer',
            label_hi: 'नवांश (D9) और उपापद लग्न — सत्यापन परत',
            body:     'A strong D1 chart can be negated by a weak D9 chart. If the 7th house and its lord are weak or afflicted in the Navamsa, the delay indicated in the D1 will manifest. The Upapada Lagna (UL) — the house of the marriage partner — must also be studied for the stability of the partner\'s side of the equation. Delays confirmed in all three layers are the most durable.',
            body_hi:  'मजबूत D1 कुंडली कमजोर D9 कुंडली से नकारी जा सकती है। यदि नवांश में सप्तम भाव और इसका स्वामी कमजोर या पीड़ित हों, तो D1 में संकेतित विलंब प्रकट होगा। उपापद लग्न (UL) को भी साथी की स्थिरता के लिए अध्ययन किया जाना चाहिए।',
          },
        ],
      },

      {
        id:       'timing-and-denial',
        title:    'Timing, Transits, and Delay vs. Denial',
        title_hi: 'समय, गोचर, और विलंब बनाम अस्वीकृति',
        layout:   'checklist',
        items: [
          {
            id:       'timing-dasha',
            label:    'Dasha Indications — When Karmic Promise Activates',
            label_hi: 'दशा संकेत — कार्मिक वादा कब सक्रिय होता है',
            body:     'Marriage typically occurs during the Dasha or Bhukti of the 7th house lord, planets in the 7th, or planets aspecting the 7th. If these Dasha periods fall very late in the native\'s life — due to the sequence fixed at birth — the delay is structural and inevitable. The Dasha sequence cannot be changed; only one\'s preparation for it can.',
            body_hi:  'विवाह आमतौर पर सप्तमेश, 7वें भाव में स्थित ग्रहों, या सप्तम को देखने वाले ग्रहों की दशा या भुक्ति के दौरान होता है। यदि ये दशा काल जीवन में बहुत देर से आते हैं, तो विलंब संरचनात्मक और अपरिहार्य है।',
          },
          {
            id:       'timing-transit',
            label:    'Transit Triggers — Saturn Delays, Jupiter Catalyzes',
            label_hi: 'गोचर ट्रिगर — शनि विलंब करता है, गुरु उत्प्रेरित करता है',
            body:     'Transits act as activation triggers. Saturn transiting over the 7th house or the 7th lord often brings delays or intense testing — it is the gatekeeper demanding readiness. Jupiter\'s transit, conversely, is typically the catalyst that converts Dasha permission into the actual marriage event. Both must align with the Dasha window for marriage to manifest.',
            body_hi:  'गोचर सक्रियता ट्रिगर के रूप में कार्य करते हैं। सप्तम भाव या सप्तमेश पर शनि का गोचर अक्सर विलंब या तीव्र परीक्षण लाता है। गुरु का गोचर, इसके विपरीत, आमतौर पर वह उत्प्रेरक है जो दशा अनुमति को वास्तविक विवाह घटना में बदलता है।',
          },
          {
            id:       'timing-denial',
            label:    'Delay vs. Denial — A Critical Distinction',
            label_hi: 'विलंब बनाम अस्वीकृति — एक महत्वपूर्ण अंतर',
            body:     'Denial occurs when the 7th house, the 7th lord, the Karaka, and the Navamsa all consistently show strong afflictions with no benefic support — the promise of marriage is fundamentally absent. Delay, however, is simply a matter of timing: the karmic potential is present, but the environmental, emotional, or Dasha-based conditions have not yet aligned. A strong, well-placed Jupiter or Venus, even if delayed by Saturn, almost always ensures eventual success.',
            body_hi:  'अस्वीकृति तब होती है जब सप्तम भाव, सप्तमेश, कारक और नवांश सभी लगातार बिना किसी शुभ समर्थन के मजबूत पीड़न दिखाते हैं। विलंब, हालाँकि, केवल समय की बात है: कार्मिक संभावना मौजूद है, लेकिन स्थितियाँ अभी संरेखित नहीं हुई हैं।',
          },
        ],
      },

      {
        id:       'remedies',
        title:    'Yogas for Success and Practical Remedies',
        title_hi: 'सफलता के योग और व्यावहारिक उपाय',
        layout:   'checklist',
        items: [
          {
            id:       'remedy-yogas',
            label:    'Yogas for a Delayed But Successful Marriage',
            label_hi: 'विलंबित लेकिन सफल विवाह के योग',
            body:     'A strong, well-placed Jupiter or Venus — even when delayed by Saturn — often ensures a stable and long-lasting union once the karmic lesson is learned. A strong 7th lord in the 10th or 11th house in the Navamsa chart is a particularly powerful indicator of eventual marital success. The delay in such charts is a preparation period, not a sentence.',
            body_hi:  'एक मजबूत, सुस्थित गुरु या शुक्र — भले ही शनि द्वारा विलंबित हो — अक्सर कार्मिक पाठ सीखने के बाद एक स्थिर और दीर्घकालिक मिलन सुनिश्चित करता है। नवांश में 10वें या 11वें भाव में मजबूत सप्तमेश अंतिम वैवाहिक सफलता का एक विशेष रूप से शक्तिशाली संकेत है।',
          },
          {
            id:       'remedy-saturn',
            label:    "Saturn's Lessons — Patience, Discipline, and Service",
            label_hi: 'शनि के पाठ — धैर्य, अनुशासन और सेवा',
            body:     'If Saturn causes the delay, the remedy is not a ritual — it is patience, discipline, and service to others, especially the elderly. Saturn rewards those who genuinely mature through the waiting period. Fighting the delay creates more resistance; accepting and using it as a preparation phase is the most effective response to Saturn\'s demand.',
            body_hi:  'यदि शनि विलंब का कारण है, तो उपाय कोई अनुष्ठान नहीं है — यह धैर्य, अनुशासन और दूसरों की, विशेष रूप से बुजुर्गों की, सेवा है। शनि उन्हें पुरस्कृत करता है जो प्रतीक्षा अवधि के माध्यम से वास्तव में परिपक्व होते हैं।',
          },
          {
            id:       'remedy-karaka',
            label:    'Venus and Jupiter Strengthening',
            label_hi: 'शुक्र और गुरु को शक्तिशाली बनाना',
            body:     'If the significators of marriage are weak, traditional remedies such as Mantras or Stotras — the Lalita Sahasranama for Venus, the Vishnu Sahasranama for Jupiter — can help focus the mind and balance the energy of these planets. These are not bypasses of karmic timing; they are internal calibration tools that bring clarity and receptivity.',
            body_hi:  'यदि विवाह के कारक कमजोर हैं, तो पारंपरिक उपाय जैसे मंत्र या स्तोत्र — शुक्र के लिए ललिता सहस्रनाम, गुरु के लिए विष्णु सहस्रनाम — मन को केंद्रित करने और इन ग्रहों की ऊर्जा को संतुलित करने में मदद कर सकते हैं।',
          },
          {
            id:       'remedy-self',
            label:    'Self-Development — The Most Practical Remedy',
            label_hi: 'आत्म-विकास — सबसे व्यावहारिक उपाय',
            body:     'The most practical remedy for delayed marriage is to use the period of delay for personal growth, career advancement, and spiritual development. Often, the delay is exactly the time required for the native to become the person they need to be for a successful union. The chart does not delay to punish; it delays to prepare.',
            body_hi:  'विलंबित विवाह के लिए सबसे व्यावहारिक उपाय व्यक्तिगत विकास, करियर उन्नति और आध्यात्मिक विकास के लिए विलंब की अवधि का उपयोग करना है। अक्सर, विलंब ठीक वही समय होता है जो जातक को एक सफल मिलन के लिए आवश्यक व्यक्ति बनने के लिए चाहिए।',
          },
        ],
      },

      {
        id:       'misconceptions',
        title:    'Common Misconceptions',
        title_hi: 'सामान्य भ्रांतियाँ',
        layout:   'checklist',
        items: [
          {
            id:       'myth-never-marry',
            label:    'Myth: Delayed marriage means I will never marry',
            label_hi: 'मिथक: विलंबित विवाह का अर्थ है मैं कभी विवाह नहीं करूँगा',
            body:     'In most cases, delayed marriage is purely a matter of karmic timing. The promise of union is present in the chart; only the activation window is later than expected. Denial — the genuine absence of marital potential — is a far rarer configuration requiring consistent afflictions across the D1, Navamsa, and Darakaraka simultaneously.',
            body_hi:  'अधिकांश मामलों में, विलंबित विवाह केवल कार्मिक समय का मामला है। कुंडली में मिलन का वादा मौजूद है; केवल सक्रियता की खिड़की अपेक्षा से बाद में है। अस्वीकृति — वैवाहिक संभावना की वास्तविक अनुपस्थिति — एक बहुत दुर्लभ संरचना है।',
          },
          {
            id:       'myth-prayers',
            label:    'Myth: A few prayers will instantly remove the delay',
            label_hi: 'मिथक: कुछ प्रार्थनाएँ तुरंत विलंब हटा देंगी',
            body:     'Remedies are for internal alignment, not for altering the fundamental karmic timeline dictated by the Dasha sequence. No ritual bypasses the Dasha system. What remedies do is help the native handle the planetary energies with greater maturity and receptivity — so that when the Dasha window does open, they are genuinely ready.',
            body_hi:  'उपाय आंतरिक संरेखण के लिए हैं, दशा अनुक्रम द्वारा निर्धारित मूलभूत कार्मिक समय-सारणी को बदलने के लिए नहीं। कोई भी अनुष्ठान दशा प्रणाली को नहीं बदलता। उपाय जातक को ग्रहों की ऊर्जाओं को अधिक परिपक्वता के साथ संभालने में मदद करते हैं।',
          },
          {
            id:       'myth-exact-day',
            label:    'Myth: Astrologers can predict the exact day of marriage',
            label_hi: 'मिथक: ज्योतिषी विवाह के सटीक दिन की भविष्यवाणी कर सकते हैं',
            body:     'While Dasha and Transit analysis can narrow timing down to a time frame of months, precision to the exact day is rare and often unreliable — and any astrologer claiming otherwise should be approached with skepticism. What can be accurately identified is the window of high probability, not a fixed calendar date.',
            body_hi:  'जबकि दशा और गोचर विश्लेषण समय को महीनों की समय सीमा तक सीमित कर सकता है, सटीक दिन तक की सटीकता दुर्लभ और अक्सर अविश्वसनीय है। जो सटीक रूप से पहचाना जा सकता है वह उच्च संभावना की खिड़की है, न कि एक निश्चित तिथि।',
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
            id:       'faq-can-be-avoided',
            label:    'Can a delayed marriage be avoided?',
            label_hi: 'क्या विलंबित विवाह से बचा जा सकता है?',
            body:     'It is a karmic event. One can work on themselves to be ready for the union when it arrives, but the timing is largely determined by the chart and the Dasha sequence fixed at birth. The goal is not to avoid the delay but to use it productively.',
            body_hi:  'यह एक कार्मिक घटना है। कोई भी विवाह के आने पर तैयार रहने के लिए खुद पर काम कर सकता है, लेकिन समय काफी हद तक कुंडली और जन्म के समय निर्धारित दशा अनुक्रम से निर्धारित होता है।',
          },
          {
            id:       'faq-saturn-denial',
            label:    'Does Saturn always mean marriage is denied?',
            label_hi: 'क्या शनि का अर्थ हमेशा विवाह की अस्वीकृति है?',
            body:     'Absolutely not. Saturn brings delay and demands maturity, which often leads to a more stable and serious commitment once the Dasha window opens. Many of the most durable marriages are indicated by Saturn-influenced charts — the wait builds the foundation that makes the union last.',
            body_hi:  'बिल्कुल नहीं। शनि विलंब लाता है और परिपक्वता की माँग करता है, जो अक्सर दशा खिड़की खुलने पर अधिक स्थिर और गंभीर प्रतिबद्धता की ओर ले जाता है। सबसे टिकाऊ विवाहों में से कई शनि-प्रभावित कुंडलियों द्वारा संकेतित होते हैं।',
          },
          {
            id:       'faq-7th-in-12th',
            label:    'Is marriage more difficult if the 7th lord is in the 12th house?',
            label_hi: 'क्या विवाह अधिक कठिन है यदि सप्तमेश 12वें भाव में हो?',
            body:     'Yes, it can indicate challenges related to the partner — a tendency toward solitude, a foreign or distant partner, or a relationship that involves sacrifice and spiritual depth. It requires conscious effort to bring the partnership energy into the physical world rather than leaving it in the realm of idealization.',
            body_hi:  'हाँ, यह साथी से संबंधित चुनौतियों का संकेत दे सकता है — एकांत की प्रवृत्ति, दूर के साथी, या बलिदान से जुड़ा संबंध। साझेदारी ऊर्जा को भौतिक संसार में लाने के लिए सचेत प्रयास की आवश्यकता है।',
          },
          {
            id:       'faq-poojas',
            label:    'Should I perform specific Poojas to hasten my marriage?',
            label_hi: 'क्या मुझे अपने विवाह को शीघ्र करने के लिए विशिष्ट पूजाएँ करनी चाहिए?',
            body:     'Traditional remedies can help align your intentions and internal energy, but they do not bypass the timing dictated by your Dasha sequence. Perform them for inner clarity and maturity — not with the expectation of overriding the karmic calendar.',
            body_hi:  'पारंपरिक उपाय आपके इरादों और आंतरिक ऊर्जा को संरेखित करने में मदद कर सकते हैं, लेकिन वे आपके दशा अनुक्रम द्वारा निर्धारित समय को नहीं बदलते। आंतरिक स्पष्टता और परिपक्वता के लिए इन्हें करें — कार्मिक कैलेंडर को ओवरराइड करने की अपेक्षा से नहीं।',
          },
          {
            id:       'faq-retrograde-saturn',
            label:    'How does Retrograde Saturn affect marriage timing?',
            label_hi: 'वक्री शनि विवाह के समय को कैसे प्रभावित करता है?',
            body:     'Retrograde Saturn often creates unexpected cycles of effort and apparent disappointment before the marriage is finalized. The native may reach a point of near-completion and then face reversal — this is Saturn\'s retrograde nature testing genuine commitment before granting the result. Persistence through these cycles is what ultimately produces the marriage.',
            body_hi:  'वक्री शनि अक्सर विवाह के अंतिम होने से पहले प्रयास और स्पष्ट निराशा के अप्रत्याशित चक्र बनाता है। जातक पूर्णता के करीब पहुँच सकता है और फिर उलटफेर का सामना कर सकता है — यह शनि की वक्री प्रकृति है जो परिणाम देने से पहले वास्तविक प्रतिबद्धता का परीक्षण करती है।',
          },
          {
            id:       'faq-navamsa-vs-rashi',
            label:    'Does the Navamsa chart reveal more than the Rashi chart?',
            label_hi: 'क्या नवांश कुंडली राशि कुंडली से अधिक प्रकट करती है?',
            body:     'Yes. The Navamsa provides essential detail and confirmation of the potential indicated in the Rashi chart. A strong Rashi can be negated by a weak Navamsa, and vice versa. For delayed marriage analysis specifically, the Navamsa tells you whether the delay is a preparation period leading to success, or a more fundamental challenge to the marriage promise.',
            body_hi:  'हाँ। नवांश राशि कुंडली में संकेतित संभावना का आवश्यक विवरण और पुष्टि प्रदान करती है। एक मजबूत राशि कमजोर नवांश से नकारी जा सकती है। विलंबित विवाह विश्लेषण के लिए, नवांश बताती है कि क्या विलंब सफलता की ओर ले जाने वाली तैयारी अवधि है।',
          },
          {
            id:       'faq-modern-times',
            label:    'Is it common to have a delayed marriage in modern times?',
            label_hi: 'क्या आधुनिक समय में विलंबित विवाह सामान्य है?',
            body:     'Yes, increasingly so. This is partly due to modern lifestyle factors such as career prioritization and urban independence, and partly due to the prevalence of specific planetary combinations — particularly Saturn and Rahu influences — that are statistically common in charts born during the 20th and 21st centuries.',
            body_hi:  'हाँ, तेजी से बढ़ रहा है। यह आंशिक रूप से करियर प्राथमिकता और शहरी स्वतंत्रता जैसे आधुनिक जीवनशैली कारकों के कारण है, और आंशिक रूप से विशिष्ट ग्रह संयोजनों — विशेष रूप से शनि और राहु प्रभाव — की प्रचलितता के कारण है।',
          },
          {
            id:       'faq-dasha-change',
            label:    'Can my Dasha period change to show an earlier marriage?',
            label_hi: 'क्या मेरी दशा अवधि बदल सकती है और पहले का विवाह दिखा सकती है?',
            body:     'No. The Dasha sequence is fixed based on your birth time and the Nakshatra of the Moon at that moment. It cannot be altered. What changes is your readiness and alignment within the period — but the window itself is fixed in the chart. This is why precise birth time records are so important for accurate Dasha analysis.',
            body_hi:  'नहीं। दशा अनुक्रम आपके जन्म समय और उस समय चंद्रमा के नक्षत्र के आधार पर निर्धारित होता है। इसे बदला नहीं जा सकता। जो बदलता है वह अवधि के भीतर आपकी तैयारी और संरेखण है — लेकिन खिड़की स्वयं कुंडली में निश्चित है।',
          },
          {
            id:       'faq-jupiter-delays',
            label:    'Why does Jupiter cause delays sometimes?',
            label_hi: 'गुरु कभी-कभी विलंब क्यों करता है?',
            body:     'Jupiter in certain positions — particularly aspecting the 12th house or heavily connected to spiritual houses — may temporarily deprioritize earthly marriage in favor of higher learning, spiritual seeking, or philosophical expansion. This is not a denial; it is Jupiter directing its energy toward the domains it governs most strongly before turning its attention to partnership.',
            body_hi:  'गुरु कुछ स्थितियों में — विशेष रूप से 12वें भाव को देखते हुए या आध्यात्मिक भावों से भारी रूप से जुड़े — उच्च शिक्षा, आध्यात्मिक खोज के पक्ष में सांसारिक विवाह को अस्थायी रूप से प्राथमिकता दे सकता है।',
          },
          {
            id:       'faq-handle-stress',
            label:    'What is the best way to handle the stress of a delayed marriage?',
            label_hi: 'विलंबित विवाह के तनाव को संभालने का सबसे अच्छा तरीका क्या है?',
            body:     'Focus on self-improvement, spiritual growth, and understanding the karmic lessons your chart is presenting. The delay is rarely punitive — it is usually purposive. Individuals who use the waiting period to build financial stability, deepen self-awareness, and clarify what they genuinely want in a partner are typically far better positioned when the Dasha window finally opens.',
            body_hi:  'आत्म-सुधार, आध्यात्मिक विकास और अपनी कुंडली द्वारा प्रस्तुत कार्मिक पाठों को समझने पर ध्यान केंद्रित करें। विलंब शायद ही कभी दंडात्मक होता है — यह आमतौर पर उद्देश्यपूर्ण होता है। जो व्यक्ति प्रतीक्षा अवधि का उपयोग वित्तीय स्थिरता बनाने के लिए करते हैं, वे दशा खिड़की खुलने पर बेहतर स्थिति में होते हैं।',
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
    expertise: 'Authored by Vedic astrologers specializing in delayed marriage, Saturn timing, Navamsa analysis, and Dasha-based marriage prediction.',
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
