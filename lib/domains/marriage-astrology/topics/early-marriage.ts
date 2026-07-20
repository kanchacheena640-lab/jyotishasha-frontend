import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const earlyMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:early-marriage',
    slug:       'early-marriage',
    title:      'Early Marriage in Vedic Astrology',
    title_hi:   'वैदिक ज्योतिष में प्रारंभिक विवाह',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'draft',
  },

  routing: {
    canonicalPath: '/marriage-astrology/early-marriage',
    breadcrumbs: [
      { label: 'Home',               label_hi: 'होम',              href: '/' },
      { label: 'Marriage Astrology', label_hi: 'विवाह ज्योतिष',    href: '/marriage-astrology' },
      { label: 'Early Marriage',     label_hi: 'प्रारंभिक विवाह',  href: '/marriage-astrology/early-marriage' },
    ],
  },

  seo: {
    metaTitle:       'Early Marriage in Vedic Astrology: Houses, Planets & Timing',
    metaDescription: 'Discover the astrological indicators for early marriage — the 7th house, Venus, Jupiter, Dasha timing, and how to distinguish a destined early union from an immature one.',
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Early Marriage in Vedic Astrology: Your Karmic Timetable',
    headline_hi: 'वैदिक ज्योतिष में प्रारंभिक विवाह: आपकी कार्मिक समय-सारणी',
    subtext:     'Explore how Vedic astrology determines early marriage through the 7th house, Venus, Jupiter, and the Dasha-Bhukti system — and how to distinguish a destined early union from an immature one.',
    subtext_hi:  'जानें कैसे वैदिक ज्योतिष 7वें भाव, शुक्र, गुरु और दशा-भुक्ति प्रणाली के माध्यम से प्रारंभिक विवाह निर्धारित करता है — और एक नियत प्रारंभिक मिलन को अपरिपक्व विवाह से कैसे अलग करें।',
  },

  taxonomy: {
    tags:        ['early-marriage', 'vedic-astrology', 'venus', 'jupiter', '7th-house', 'dasha-timing', 'navamsa'],
    keywords:    ['early marriage astrology', 'early marriage vedic astrology', 'early marriage indicators', '7th house early marriage', 'venus early marriage', 'dasha early marriage', 'destined early marriage'],
    keywords_hi: ['प्रारंभिक विवाह ज्योतिष', 'वैदिक ज्योतिष में प्रारंभिक विवाह', 'शुक्र प्रारंभिक विवाह', 'सप्तम भाव प्रारंभिक विवाह'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'intro',
        title:    'Early Marriage as Karmic Destiny',
        title_hi: 'प्रारंभिक विवाह एक कार्मिक नियति के रूप में',
        layout:   'list',
        items: [
          {
            id:       'intro-karmic-framing',
            label:    'A Destined Event, Not a Matter of Haste',
            label_hi: 'एक नियत घटना, जल्दबाजी का मामला नहीं',
            body:     'In Vedic astrology, marriage is not simply a societal arrangement — it is a deep karmic union, a sanskara that bridges two souls to fulfill mutual obligations and spiritual evolution. For the experienced astrologer, an early marriage is not a product of haste or circumstance. It is, like every other significant event in life, a manifestation of the planetary configurations at the time of birth, deeply influenced by past-life tendencies (Prarabdha Karma).',
            body_hi:  'वैदिक ज्योतिष में, विवाह केवल एक सामाजिक व्यवस्था नहीं है — यह एक गहन कार्मिक मिलन है, एक संस्कार जो दो आत्माओं को पारस्परिक दायित्वों और आध्यात्मिक विकास को पूरा करने के लिए जोड़ता है। अनुभवी ज्योतिषी के लिए, प्रारंभिक विवाह जल्दबाजी का नहीं बल्कि जन्म के समय ग्रह स्थितियों की अभिव्यक्ति है।',
          },
          {
            id:       'intro-defining-early',
            label:    'What Constitutes Early Marriage in Vedic Context',
            label_hi: 'वैदिक संदर्भ में प्रारंभिक विवाह की परिभाषा',
            body:     'Conventionally, early marriage refers to a union occurring before age 24 or 25. However, the more precise Vedic definition is not chronological — it is defined by the activation of marriage-related houses and lords during the Dasha-Bhukti sequence. If the 7th house, its lord, and the Karaka of marriage are triggered prominently in the very early Dashas of the native\'s life, an early marriage is the natural, inevitable karmic result regardless of absolute age.',
            body_hi:  'परंपरागत रूप से, प्रारंभिक विवाह 24 या 25 वर्ष की आयु से पहले होने वाले मिलन को संदर्भित करता है। हालाँकि, अधिक सटीक वैदिक परिभाषा कालानुक्रमिक नहीं है — यह दशा-भुक्ति अनुक्रम में विवाह-संबंधित भावों और स्वामियों की सक्रियता से परिभाषित होती है।',
          },
        ],
      },

      {
        id:       'key-houses',
        title:    'The Four Houses of Early Marriage',
        title_hi: 'प्रारंभिक विवाह के चार भाव',
        layout:   'cards',
        items: [
          {
            id:       'house-7th',
            icon:     '🏠',
            label:    '7th House — The Primary Seat of Partnership',
            label_hi: 'सप्तम भाव — साझेदारी की प्राथमिक सीट',
            body:     'The 7th house is the primary seat of partnership and marriage. For early marriage to occur, the 7th house must be inherently strong, well-aspected by benefics, and free from debilitating malefic influences that create delays. A strong 7th house lord placed in an angular (Kendra) or trinal (Trikona) house acts as the primary catalyst for early union.',
            body_hi:  'सप्तम भाव साझेदारी और विवाह की प्राथमिक सीट है। प्रारंभिक विवाह के लिए, सप्तम भाव स्वाभाविक रूप से मजबूत, शुभ ग्रहों द्वारा देखा गया, और विलंब पैदा करने वाले पापी प्रभावों से मुक्त होना चाहिए। केंद्र या त्रिकोण में स्थित मजबूत सप्तमेश प्राथमिक उत्प्रेरक के रूप में कार्य करता है।',
          },
          {
            id:       'house-2nd',
            icon:     '🏛️',
            label:    '2nd House — The Family Foundation',
            label_hi: 'द्वितीय भाव — पारिवारिक नींव',
            body:     'The 2nd house (Kutumba Bhava) governs the family unit. Early marriage directly influences the establishment of one\'s own family lineage. When the 2nd house is strong and activated by a promising Dasha, it supports the early formation of a stable family environment — and a link between the 2nd and 7th house lords is a strong accelerant.',
            body_hi:  'द्वितीय भाव (कुटुंब भाव) परिवार इकाई को नियंत्रित करता है। प्रारंभिक विवाह सीधे अपने परिवार वंश की स्थापना को प्रभावित करता है। जब 2रा भाव मजबूत हो और एक आशाजनक दशा द्वारा सक्रिय हो, तो यह एक स्थिर पारिवारिक वातावरण के प्रारंभिक गठन का समर्थन करता है।',
          },
          {
            id:       'house-5th',
            icon:     '🔥',
            label:    '5th House — Purva Punya and Romance',
            label_hi: 'पंचम भाव — पूर्व पुण्य और रोमांस',
            body:     'The 5th house is the house of Purva Punya (past-life merit) and romance. In the context of Vedic astrology, it acts as a bridge to the 7th house. A strong connection between the 5th and 7th houses — especially when involving benefic planets — frequently accelerates the timing of marriage by channeling past-life romantic merit into the present lifetime\'s union.',
            body_hi:  'पंचम भाव पूर्व पुण्य (पिछले जन्म की पुण्यता) और रोमांस का भाव है। वैदिक ज्योतिष के संदर्भ में, यह सप्तम भाव के लिए सेतु के रूप में कार्य करता है। पंचम और सप्तम भाव के बीच मजबूत संबंध — विशेष रूप से शुभ ग्रहों से जुड़ा — विवाह के समय को अक्सर तेज करता है।',
          },
          {
            id:       'house-11th',
            icon:     '⭐',
            label:    '11th House — Desires and Fulfillment',
            label_hi: 'एकादश भाव — इच्छाएँ और पूर्ति',
            body:     'The 11th house is the house of desires and their fulfillment. Its strong connection to the 7th house or the 7th lord provides the fulfilling energy necessary for the desire for marriage to manifest early in life. When the 11th lord reinforces the 7th house, the native\'s desire for partnership finds early actualization rather than being held in potential.',
            body_hi:  'एकादश भाव इच्छाओं और उनकी पूर्ति का भाव है। सप्तम भाव या सप्तमेश के साथ इसका मजबूत संबंध जीवन में जल्दी विवाह की इच्छा प्रकट करने के लिए आवश्यक पूर्ति ऊर्जा प्रदान करता है।',
          },
        ],
      },

      {
        id:       'planetary-influences',
        title:    'Planetary Influences Facilitating Early Union',
        title_hi: 'प्रारंभिक मिलन को सुगम बनाने वाले ग्रह प्रभाव',
        layout:   'cards',
        items: [
          {
            id:       'planet-venus',
            icon:     '💫',
            label:    'Venus — The Universal Significator',
            label_hi: 'शुक्र — सार्वभौमिक कारक',
            body:     'Venus is the Karaka of passion, love, and the partner. A strong, well-placed Venus — unafflicted and receiving benefic aspects — is the most potent single indicator of a smooth, early entry into marriage. Venus in its own signs (Taurus, Libra), exalted (Pisces), or in a strong Kendra house has significantly heightened ability to manifest early marital union.',
            body_hi:  'शुक्र जुनून, प्रेम और साथी का कारक है। एक मजबूत, सुस्थित शुक्र — अपीड़ित और शुभ दृष्टि प्राप्त — प्रारंभिक विवाह में सुगम, प्रारंभिक प्रवेश का सबसे शक्तिशाली एकल संकेतक है। अपनी राशियों (वृषभ, तुला), उच्च (मीन) या मजबूत केंद्र भाव में शुक्र की क्षमता काफी बढ़ जाती है।',
          },
          {
            id:       'planet-jupiter',
            icon:     '🪐',
            label:    'Jupiter — Wisdom and the Husband Karaka',
            label_hi: 'गुरु — ज्ञान और पति का कारक',
            body:     'Jupiter acts as the Karaka for the husband in a female chart and the stabilizer of the marriage in any chart. A strong Jupiter — particularly Digbala (directional strength) or Vargottama (in the same sign in both Rashi and Navamsa) — brings the maturity required for union even at a younger age, ensuring the early marriage is grounded rather than impulsive.',
            body_hi:  'गुरु महिला की कुंडली में पति का कारक और किसी भी कुंडली में विवाह का स्थिरीकरण करने वाला कारक है। मजबूत गुरु — विशेष रूप से दिग्बल या वर्गोत्तम — कम उम्र में भी मिलन के लिए आवश्यक परिपक्वता लाता है।',
          },
          {
            id:       'planet-moon',
            icon:     '🌙',
            label:    'The Moon — Emotional Readiness',
            label_hi: 'चंद्रमा — भावनात्मक तैयारी',
            body:     'The Moon represents the mind and emotional disposition. For an early marriage to be stable rather than merely early, the Moon must be strong and well-placed. An emotionally mature Moon allows the native to genuinely embrace the responsibilities of marriage at a young age — preventing the union from becoming an impulsive decision driven by fleeting emotional states.',
            body_hi:  'चंद्रमा मन और भावनात्मक स्वभाव का प्रतिनिधित्व करता है। प्रारंभिक विवाह को स्थिर बनाने के लिए, चंद्रमा मजबूत और सुस्थित होना चाहिए। भावनात्मक रूप से परिपक्व चंद्रमा जातक को कम उम्र में विवाह की जिम्मेदारियों को वास्तव में स्वीकार करने देता है।',
          },
          {
            id:       'planet-mars',
            icon:     '🔴',
            label:    'Mars — The Energy Catalyst',
            label_hi: 'मंगल — ऊर्जा उत्प्रेरक',
            body:     'Mars is the planet of action and passion. While Mars can be aggressive, its well-directed energy is essential for the initiation of marital union. A balanced Mars — assertive but not malefic toward the 7th house — acts as the spark that moves the marriage process forward quickly. Mars in conflict with the 7th house, however, accelerates impulsive decisions rather than destined unions.',
            body_hi:  'मंगल क्रिया और जुनून का ग्रह है। जबकि मंगल आक्रामक हो सकता है, इसकी सुनिर्देशित ऊर्जा वैवाहिक मिलन की शुरुआत के लिए आवश्यक है। संतुलित मंगल — दृढ़ लेकिन सप्तम भाव के प्रति पापी नहीं — वह चिंगारी है जो विवाह प्रक्रिया को जल्दी आगे बढ़ाती है।',
          },
        ],
      },

      {
        id:       'timing-analysis',
        title:    'Timing Analysis: Dashas, Transits, and Divisional Charts',
        title_hi: 'समय विश्लेषण: दशाएँ, गोचर और विभागीय कुंडलियाँ',
        layout:   'checklist',
        items: [
          {
            id:       'timing-dasha',
            label:    'Dasha Indications — Marriage-Related Periods Activating Early',
            label_hi: 'दशा संकेत — विवाह-संबंधित अवधियों की प्रारंभिक सक्रियता',
            body:     'Marriage typically occurs during the Dasha or Bhukti of the 7th house lord, a planet in the 7th house, or a planet aspecting the 7th house. If these periods occur within the native\'s early years — determined by the Nakshatra of the Moon at birth — early marriage is practically guaranteed. The Dasha sequence is fixed at birth and cannot be altered; only one\'s preparation for it can.',
            body_hi:  'विवाह आमतौर पर सप्तमेश, 7वें भाव में स्थित ग्रह, या सप्तम को देखने वाले ग्रह की दशा या भुक्ति के दौरान होता है। यदि ये अवधियाँ जातक के प्रारंभिक वर्षों में आती हैं, तो प्रारंभिक विवाह व्यावहारिक रूप से निश्चित है।',
          },
          {
            id:       'timing-transit',
            label:    'Transit Triggers — Jupiter Over the 7th House',
            label_hi: 'गोचर ट्रिगर — 7वें भाव पर गुरु',
            body:     'Transits act as the final triggers that convert Dasha permission into the actual event. The transit of Jupiter over the 7th house, the 7th house lord, or the Navamsa 7th lord is often the decisive factor. Saturn\'s transit — though it usually brings delay — can occasionally act as a stabilizer, anchoring an early union that was karmically destined to manifest quickly.',
            body_hi:  'गोचर अंतिम ट्रिगर के रूप में कार्य करते हैं जो दशा अनुमति को वास्तविक घटना में बदलते हैं। 7वें भाव, सप्तमेश, या नवांश सप्तमेश पर गुरु का गोचर अक्सर निर्णायक कारक होता है।',
          },
          {
            id:       'timing-navamsa',
            label:    'Navamsa (D9) — Confirming the Marital Promise',
            label_hi: 'नवांश (D9) — वैवाहिक वादे की पुष्टि',
            body:     'Early marriage prediction is never based on the Rashi (D1) chart alone. The Navamsa (D9) is the chart of marital promise — for early marriage, the 7th house and its lord in the D9 must be robust. If the D1 shows early potential but the D9 is weak, the early marriage promise will be stalled. The D9 must confirm what the D1 suggests.',
            body_hi:  'प्रारंभिक विवाह भविष्यवाणी कभी केवल राशि (D1) कुंडली पर आधारित नहीं होती। नवांश (D9) वैवाहिक वादे की कुंडली है — प्रारंभिक विवाह के लिए, D9 में 7वाँ भाव और इसका स्वामी मजबूत होना चाहिए।',
          },
          {
            id:       'timing-darakaraka',
            label:    'Darakaraka and Upapada Lagna — Advanced Validation',
            label_hi: 'दारकारक और उपापद लग्न — उन्नत सत्यापन',
            body:     'In the Jaimini system, the Darakaraka (the planet with the lowest longitude) is the most vital indicator for marriage. If the DK is strong and occupies a Kendra or Trikona in the Rashi chart, it significantly accelerates marriage timing. The Upapada Lagna (UL) — representing the marriage partner — must also be strong and well-placed for the union to manifest with speed and ease.',
            body_hi:  'जैमिनी प्रणाली में, दारकारक (सबसे कम अंश वाला ग्रह) विवाह का सबसे महत्वपूर्ण संकेतक है। यदि DK मजबूत हो और राशि कुंडली में केंद्र या त्रिकोण में हो, तो यह विवाह के समय को काफी तेज करता है।',
          },
        ],
      },

      {
        id:       'destined-vs-immature',
        title:    'Destined Early Marriage vs. Immature Marriage',
        title_hi: 'नियत प्रारंभिक विवाह बनाम अपरिपक्व विवाह',
        layout:   'checklist',
        items: [
          {
            id:       'distinction-destined',
            label:    'Destined Early Marriage — Karmic Alignment',
            label_hi: 'नियत प्रारंभिक विवाह — कार्मिक संरेखण',
            body:     'A destined early marriage is a karmic alignment where the native\'s chart, Dasha, and transit indicators converge to manifest marriage early. Such marriages are supported by the planetary energies — a strong 7th house, confirmed by the Navamsa, with benefic Dasha activations. The partners grow together through the formative years, sharing a unique life journey that is itself part of the karmic design.',
            body_hi:  'एक नियत प्रारंभिक विवाह एक कार्मिक संरेखण है जहाँ जातक की कुंडली, दशा और गोचर संकेतक प्रारंभिक विवाह प्रकट करने के लिए एकत्रित होते हैं। ऐसे विवाह ग्रहों की ऊर्जाओं द्वारा समर्थित होते हैं — एक मजबूत 7वाँ भाव, नवांश द्वारा पुष्टि।',
          },
          {
            id:       'distinction-immature',
            label:    'Immature Marriage — The Critical Warning',
            label_hi: 'अपरिपक्व विवाह — महत्वपूर्ण चेतावनी',
            body:     'An immature marriage occurs when the native marries due to impulse, pressure, or superficial reasons despite the chart indicating a need for greater maturity. This is frequently marked by heavy malefic afflictions to the 5th and 7th houses — creating a rush into union that lacks the necessary foundation. The chart rushes the event; the planetary support does not sustain it.',
            body_hi:  'अपरिपक्व विवाह तब होता है जब जातक आवेग, दबाव या सतही कारणों से विवाह करता है, बावजूद इसके कि कुंडली अधिक परिपक्वता की आवश्यकता का संकेत दे रही हो। यह अक्सर 5वें और 7वें भाव पर भारी पापी पीड़न से चिह्नित होता है।',
          },
          {
            id:       'distinction-advantages-challenges',
            label:    'Advantages and Challenges of a Destined Early Marriage',
            label_hi: 'नियत प्रारंभिक विवाह के लाभ और चुनौतियाँ',
            body:     'Advantages: when the karmic timing is right, an early marriage provides a strong foundation for both partners to grow and evolve together, sharing the formative years of life in tandem. Challenges: the primary challenge is maintaining individual identity while learning the dynamics of partnership during a phase of rapid personal change — and resisting societal pressure to conform to a conventional marital timeline.',
            body_hi:  'लाभ: जब कार्मिक समय सही हो, प्रारंभिक विवाह दोनों साझेदारों को एक साथ बढ़ने और विकसित होने के लिए एक मजबूत नींव प्रदान करता है। चुनौतियाँ: प्राथमिक चुनौती तेज व्यक्तिगत परिवर्तन के चरण में साझेदारी की गतिशीलता सीखते हुए व्यक्तिगत पहचान बनाए रखना है।',
          },
        ],
      },

      {
        id:       'guidance-remedies',
        title:    'Chart Analysis Guidance and Traditional Remedies',
        title_hi: 'कुंडली विश्लेषण मार्गदर्शन और पारंपरिक उपाय',
        layout:   'checklist',
        items: [
          {
            id:       'guidance-7th-house',
            label:    'Step 1: Assess the 7th House and Its Lord',
            label_hi: 'चरण 1: सप्तम भाव और इसके स्वामी का मूल्यांकन करें',
            body:     'Is the 7th house free from malefic obstruction? Is the 7th lord strong, well-placed in a Kendra or Trikona, and connected to benefic planets? This is the foundation of the analysis — a compromised 7th house cannot produce early marriage, regardless of other indicators.',
            body_hi:  'क्या सप्तम भाव पापी बाधा से मुक्त है? क्या सप्तमेश मजबूत, केंद्र या त्रिकोण में सुस्थित, और शुभ ग्रहों से जुड़ा है? यह विश्लेषण की नींव है — एक समझौता किया गया 7वाँ भाव अन्य संकेतकों की परवाह किए बिना प्रारंभिक विवाह नहीं दे सकता।',
          },
          {
            id:       'guidance-connections',
            label:    'Step 2: Check the 2nd, 5th, and 11th House Connections',
            label_hi: 'चरण 2: 2रे, 5वें और 11वें भाव के संबंध जाँचें',
            body:     'Are these support houses reinforcing the 7th? A 5th-7th lord connection channels past-life romantic merit into present-lifetime marriage. A 2nd-7th link grounds the union in family continuity. An 11th-7th link ensures the desire for partnership finds early actualization rather than remaining unfulfilled potential.',
            body_hi:  'क्या ये सहायक भाव 7वें को मजबूत कर रहे हैं? 5वें-7वें स्वामी का संबंध पिछले जन्म के रोमांटिक पुण्य को वर्तमान जीवन के विवाह में चैनल करता है। 2रे-7वें का संबंध मिलन को पारिवारिक निरंतरता में आधार देता है।',
          },
          {
            id:       'guidance-dasha',
            label:    'Step 3: Examine the Dasha Sequence and Confirm in D9',
            label_hi: 'चरण 3: दशा अनुक्रम की जाँच करें और D9 में पुष्टि करें',
            body:     'Are the marriage-related Dasha periods (7th lord, Venus, planets in the 7th) occurring early in the native\'s life? If yes, confirm in the Navamsa: is the 7th house and its lord robust in D9? Early D1 promise without D9 confirmation frequently stalls. Both layers must agree for an early marriage to be reliably predicted.',
            body_hi:  'क्या विवाह-संबंधित दशा अवधियाँ (सप्तमेश, शुक्र, 7वें में ग्रह) जातक के जीवन में जल्दी आ रही हैं? यदि हाँ, तो नवांश में पुष्टि करें: D9 में 7वाँ भाव और इसका स्वामी मजबूत है? D9 पुष्टि के बिना प्रारंभिक D1 वादा अक्सर रुक जाता है।',
          },
          {
            id:       'remedy-jupiter-venus',
            label:    'Remedies: Strengthening Jupiter and Venus',
            label_hi: 'उपाय: गुरु और शुक्र को शक्तिशाली बनाना',
            body:     'If the indicators for early marriage are slightly hindered, traditional remedies can help focus intention. For Jupiter: the Vishnu Sahasranama strengthens the wisdom and maturity needed for early union. For Venus: the Lalita Sahasranama helps balance the energies of love and devotion, ensuring the attraction is grounded rather than merely superficial.',
            body_hi:  'यदि प्रारंभिक विवाह के संकेतक थोड़े बाधित हैं, तो पारंपरिक उपाय इरादे पर ध्यान केंद्रित करने में मदद कर सकते हैं। गुरु के लिए: विष्णु सहस्रनाम प्रारंभिक मिलन के लिए आवश्यक ज्ञान और परिपक्वता को मजबूत करता है। शुक्र के लिए: ललिता सहस्रनाम।',
          },
          {
            id:       'remedy-self',
            label:    'The Most Essential Remedy: Conscious Maturity',
            label_hi: 'सबसे आवश्यक उपाय: सचेत परिपक्वता',
            body:     'The most essential remedy for early marriage is the conscious cultivation of emotional maturity, self-awareness, and genuine readiness. Remedies and rituals assist in mental alignment — but they cannot bypass the fundamental karmic architecture of the Dasha sequence. The native\'s internal readiness is the real accelerant; the chart only opens the door.',
            body_hi:  'प्रारंभिक विवाह के लिए सबसे आवश्यक उपाय भावनात्मक परिपक्वता, आत्म-जागरूकता और वास्तविक तैयारी का सचेत विकास है। उपाय मानसिक संरेखण में सहायता करते हैं — लेकिन वे दशा अनुक्रम की मूलभूत कार्मिक वास्तुकला को नहीं बदल सकते।',
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
            id:       'myth-better',
            label:    'Myth: Early marriage is always better and brings more joy',
            label_hi: 'मिथक: प्रारंभिक विवाह हमेशा बेहतर और अधिक आनंदमय होता है',
            body:     'The "better" marriage is the one that aligns with your specific karmic timing — whether early, standard, or late. A forced early marriage against a chart that requires maturity will produce far more difficulty than a later marriage that arrives with proper planetary support. Timing is not a virtue; alignment is.',
            body_hi:  '"बेहतर" विवाह वह है जो आपके विशिष्ट कार्मिक समय के साथ संरेखित हो — चाहे वह प्रारंभिक, मानक या देर से हो। परिपक्वता की आवश्यकता वाली कुंडली के विरुद्ध जबरदस्ती प्रारंभिक विवाह उचित ग्रहीय समर्थन के साथ आने वाले बाद के विवाह की तुलना में अधिक कठिनाई उत्पन्न करेगा।',
          },
          {
            id:       'myth-force',
            label:    'Myth: Rituals can force an early marriage',
            label_hi: 'मिथक: अनुष्ठान प्रारंभिक विवाह को जबरदस्ती कर सकते हैं',
            body:     'Rituals assist in mental alignment and intention-setting, but they cannot bypass the fundamental karmic architecture of the Dasha sequence. No ritual moves the Dasha calendar forward. What rituals do is help the native be more receptive, clear, and mature when the Dasha window opens — not create a window that the chart has not permitted.',
            body_hi:  'अनुष्ठान मानसिक संरेखण और इरादे की स्थापना में सहायता करते हैं, लेकिन वे दशा अनुक्रम की मूलभूत कार्मिक वास्तुकला को नहीं बदल सकते। कोई भी अनुष्ठान दशा कैलेंडर को आगे नहीं बढ़ाता।',
          },
          {
            id:       'myth-impulsive',
            label:    'Myth: Every early marriage is impulsive',
            label_hi: 'मिथक: हर प्रारंभिक विवाह आवेगी होता है',
            body:     'Many early marriages are deeply stable and destined — supported by strong planetary alignments, confirmed in the Navamsa, and backed by strong emotional maturity indicated by the Moon. The distinction between a destined early marriage and an impulsive one lies entirely in the chart\'s evidence, not in the age at which it occurs.',
            body_hi:  'कई प्रारंभिक विवाह गहराई से स्थिर और नियत होते हैं — मजबूत ग्रहीय संरेखणों द्वारा समर्थित, नवांश में पुष्टि, और चंद्रमा द्वारा संकेतित मजबूत भावनात्मक परिपक्वता द्वारा समर्थित। नियत और आवेगी प्रारंभिक विवाह के बीच का अंतर पूरी तरह से कुंडली के साक्ष्य में निहित है।',
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
            id:       'faq-how-young',
            label:    'How young is considered "early" for marriage in Vedic astrology?',
            label_hi: 'वैदिक ज्योतिष में विवाह के लिए कितनी छोटी उम्र "प्रारंभिक" मानी जाती है?',
            body:     'While traditionally early marriage means before 24-25, the Vedic definition is more precise: it is defined by the Dasha-Bhukti sequence that activates the 7th house and its lord early in the native\'s life. A native with a strong 7th house activation at 22 is experiencing early marriage by karmic design, regardless of the societal norm.',
            body_hi:  'जबकि परंपरागत रूप से प्रारंभिक विवाह 24-25 से पहले का अर्थ है, वैदिक परिभाषा अधिक सटीक है: यह दशा-भुक्ति अनुक्रम द्वारा परिभाषित है जो जातक के जीवन में जल्दी 7वें भाव और इसके स्वामी को सक्रिय करता है।',
          },
          {
            id:       'faq-debilitated-7th-lord',
            label:    'Can early marriage happen if the 7th lord is debilitated?',
            label_hi: 'क्या प्रारंभिक विवाह हो सकता है यदि सप्तमेश नीच हो?',
            body:     'It is possible if the debilitated lord receives Neecha Bhanga (cancellation of debilitation) through specific planetary combinations — such as the lord of the debilitation sign being in a Kendra, or the exaltation lord aspecting the debilitated planet. In such cases, the initial weakness is converted into unexpected strength, and the marriage may still occur early, though it may bring initial adjustments.',
            body_hi:  'यह संभव है यदि नीच स्वामी को नीच भंग (नीचता का रद्दीकरण) विशिष्ट ग्रह संयोजनों के माध्यम से प्राप्त हो — जैसे नीचता राशि का स्वामी केंद्र में हो। ऐसे मामलों में, प्रारंभिक कमजोरी अप्रत्याशित शक्ति में बदल जाती है।',
          },
          {
            id:       'faq-venus-guarantee',
            label:    'Does a strong Venus always guarantee an early marriage?',
            label_hi: 'क्या मजबूत शुक्र हमेशा प्रारंभिक विवाह की गारंटी देता है?',
            body:     'A strong Venus is a major indicator but not a guarantee on its own. It must be supported by the 7th house strength and the correct Dasha period to manifest early. Venus strong in isolation — while other marriage indicators are weak or the Dasha activation is late — will produce a refined nature and capacity for love without necessarily producing early marriage.',
            body_hi:  'मजबूत शुक्र एक प्रमुख संकेतक है लेकिन अपने आप में गारंटी नहीं है। इसे 7वें भाव की शक्ति और सही दशा अवधि द्वारा समर्थित होना चाहिए। अकेले मजबूत शुक्र — जबकि अन्य विवाह संकेतक कमजोर हों — प्रेम की क्षमता देगा लेकिन जरूरी नहीं कि प्रारंभिक विवाह हो।',
          },
          {
            id:       'faq-strong-7th-enough',
            label:    'Is early marriage destined for everyone with a strong 7th house?',
            label_hi: 'क्या मजबूत सप्तम भाव वाले सभी के लिए प्रारंभिक विवाह नियत है?',
            body:     'No. The Dasha sequence is the ultimate determinant of timing. A strong 7th house guarantees a good marriage potential — but if the 7th house activation Dasha arrives in the native\'s 30s or 40s, the marriage will manifest accordingly, regardless of how well-placed the 7th lord is. Strength governs quality; Dasha governs timing.',
            body_hi:  'नहीं। दशा अनुक्रम समय का अंतिम निर्धारक है। एक मजबूत 7वाँ भाव अच्छी विवाह क्षमता की गारंटी देता है — लेकिन यदि 7वें भाव की सक्रियता दशा 30 या 40 के दशक में आती है, तो विवाह तदनुसार प्रकट होगा।',
          },
          {
            id:       'faq-mars-role',
            label:    'What role does Mars play in early marriage?',
            label_hi: 'प्रारंभिक विवाह में मंगल की क्या भूमिका है?',
            body:     'Mars acts as a catalyst for initiation. Its balanced energy can speed up the initiation of the marriage process if it is well-placed and not causing excessive conflict in the 7th house. However, Mars afflicting the 7th house tends to accelerate impulsive decisions rather than destined unions — speed without foundation. The distinction depends on whether Mars is driving or disturbing the 7th house.',
            body_hi:  'मंगल शुरुआत के लिए उत्प्रेरक के रूप में कार्य करता है। इसकी संतुलित ऊर्जा विवाह प्रक्रिया की शुरुआत को तेज कर सकती है यदि यह सुस्थित हो। हालाँकि, सप्तम भाव को पीड़ित करने वाला मंगल नियत मिलन के बजाय आवेगी निर्णयों को तेज करता है।',
          },
          {
            id:       'faq-weak-navamsa',
            label:    'Can an early marriage be successful without a strong Navamsa?',
            label_hi: 'क्या प्रारंभिक विवाह मजबूत नवांश के बिना सफल हो सकता है?',
            body:     'It is difficult. The Navamsa is essential for verifying the long-term stability and success of any marital promise shown in the Rashi chart. An early marriage indicated in the D1 but unsupported by the D9 may occur, but its long-term sustainability will be strained. Early marriage without Navamsa confirmation is premature marriage, not destined marriage.',
            body_hi:  'यह कठिन है। नवांश राशि कुंडली में दिखाए गए किसी भी वैवाहिक वादे की दीर्घकालिक स्थिरता और सफलता को सत्यापित करने के लिए आवश्यक है। D1 में संकेतित लेकिन D9 द्वारा असमर्थित प्रारंभिक विवाह हो सकता है, लेकिन इसकी दीर्घकालिक स्थिरता तनावपूर्ण होगी।',
          },
          {
            id:       'faq-moon-strength',
            label:    "Why does the Moon's strength matter so much for early marriage?",
            label_hi: 'प्रारंभिक विवाह के लिए चंद्रमा की शक्ति इतनी क्यों मायने रखती है?',
            body:     'A strong Moon provides the emotional stability required to handle the responsibilities of marriage at a young age. Without a mature Moon, early marriage becomes an impulsive emotional decision driven by fleeting states rather than genuine readiness. The Moon is what ensures the "early" in early marriage is driven by karmic readiness rather than emotional impulse.',
            body_hi:  'मजबूत चंद्रमा कम उम्र में विवाह की जिम्मेदारियों को संभालने के लिए आवश्यक भावनात्मक स्थिरता प्रदान करता है। परिपक्व चंद्रमा के बिना, प्रारंभिक विवाह एक आवेगी भावनात्मक निर्णय बन जाता है।',
          },
          {
            id:       'faq-remedies-speed',
            label:    'Should I perform remedies to speed up an early marriage?',
            label_hi: 'क्या मुझे प्रारंभिक विवाह को तेज करने के लिए उपाय करने चाहिए?',
            body:     'Remedies are helpful for mental alignment and internal calibration — not for altering the timing dictated by the Dasha sequence. If your chart has strong early marriage indicators, the Dasha window will open naturally. Remedies help you be more receptive and prepared when it does. They do not create a window that the chart has not permitted.',
            body_hi:  'उपाय मानसिक संरेखण और आंतरिक अंशांकन के लिए सहायक हैं — दशा अनुक्रम द्वारा निर्धारित समय को बदलने के लिए नहीं। यदि आपकी कुंडली में मजबूत प्रारंभिक विवाह संकेतक हैं, तो दशा खिड़की स्वाभाविक रूप से खुलेगी।',
          },
          {
            id:       'faq-early-vs-immature',
            label:    'What is the main difference between early and immature marriage?',
            label_hi: 'प्रारंभिक और अपरिपक्व विवाह के बीच मुख्य अंतर क्या है?',
            body:     'Destined early marriage is supported by the chart\'s karmic promise and timing — the 7th house is strong, confirmed in the Navamsa, and the Dasha is delivering what the natal chart promised. Immature marriage is a result of external pressure or impulse, often lacking foundational planetary support and frequently showing heavy malefic afflictions to the 5th and 7th houses.',
            body_hi:  'नियत प्रारंभिक विवाह कुंडली के कार्मिक वादे और समय द्वारा समर्थित है — 7वाँ भाव मजबूत है, नवांश में पुष्टि, और दशा वही दे रही है जो जन्म कुंडली ने वादा किया था। अपरिपक्व विवाह बाहरी दबाव या आवेग का परिणाम है।',
          },
          {
            id:       'faq-how-to-know-destined',
            label:    'How can I know if my early marriage is "destined"?',
            label_hi: 'मैं कैसे जान सकता हूँ कि मेरा प्रारंभिक विवाह "नियत" है?',
            body:     'A detailed analysis of the Rashi chart, Dasha-Bhukti periods, and Navamsa chart by a knowledgeable astrologer can reveal whether the timing is supported by your karmic blueprint. Look for: a strong, unafflicted 7th house and lord; early activation of marriage-related Dashas; strong Venus and Moon; and confirmation of the D1 promise in the D9. All four layers agreeing is the clearest sign of a destined early marriage.',
            body_hi:  'एक जानकार ज्योतिषी द्वारा राशि कुंडली, दशा-भुक्ति अवधियों और नवांश कुंडली का विस्तृत विश्लेषण प्रकट कर सकता है कि क्या समय आपके कार्मिक ब्लूप्रिंट द्वारा समर्थित है। देखें: मजबूत, अपीड़ित 7वाँ भाव; विवाह-संबंधित दशाओं की प्रारंभिक सक्रियता; मजबूत शुक्र और चंद्रमा; और D9 में D1 वादे की पुष्टि।',
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
    expertise: 'Authored by Vedic astrologers specializing in early marriage, Venus-Jupiter indicators, and Dasha-based timing analysis.',
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
