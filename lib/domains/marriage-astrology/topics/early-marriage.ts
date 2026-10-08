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
    metaDescription: 'Discover the astrological indicators traditionally associated with early marriage — the 7th house, Venus, Jupiter, Dasha timing, and how a well-supported early marriage differs from a rushed one.',
    metaDescription_hi: 'कुंडली में जल्दी विवाह के योग कैसे देखे जाते हैं — सप्तम भाव और सप्तमेश, शुक्र, गुरु, चंद्रमा, दशा और नवांश। जानें कौन-से संकेत परंपरागत रूप से जल्दी विवाह से जुड़े हैं, और क्यों कोई एक योग विवाह की उम्र तय नहीं करता।',
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Early Marriage in Vedic Astrology: Your Karmic Timetable',
    headline_hi: 'वैदिक ज्योतिष में प्रारंभिक विवाह: आपकी कार्मिक समय-सारणी',
    subtext:     'Explore how Vedic astrology reads early-marriage indicators through the 7th house, Venus, Jupiter, and the Dasha-Bhukti system — and how a well-supported early marriage differs from a rushed one.',
    subtext_hi:  'जानें कि वैदिक ज्योतिष सप्तम भाव, शुक्र, गुरु और दशा-भुक्ति के माध्यम से जल्दी विवाह के संकेत कैसे पढ़ता है — और सोच-समझकर हुआ जल्दी विवाह जल्दबाज़ी में हुए विवाह से कैसे अलग है।',
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
        title:    'Understanding Early Marriage in Vedic Astrology',
        title_hi: 'वैदिक ज्योतिष में जल्दी विवाह को समझना',
        layout:   'list',
        items: [
          {
            id:       'intro-karmic-framing',
            label:    'A Karmic Event, Not Simply a Matter of Haste',
            label_hi: 'एक कार्मिक घटना, केवल जल्दबाज़ी का मामला नहीं',
            body:     'In Vedic astrology, marriage is not simply a societal arrangement — it is a deep karmic union, a sanskara that bridges two souls to fulfill mutual obligations and spiritual evolution. For the experienced astrologer, an early marriage is not read simply as haste or circumstance. Like other significant events in life, it is studied through the planetary configurations at the time of birth, which astrologers associate with past-life tendencies (Prarabdha Karma) — alongside the person’s own choices and circumstances.',
            body_hi:  'वैदिक ज्योतिष में विवाह केवल एक सामाजिक व्यवस्था नहीं है — यह एक गहरा कार्मिक बंधन है, एक संस्कार जो दो आत्माओं को पारस्परिक दायित्वों और आध्यात्मिक विकास के लिए जोड़ता है। अनुभवी ज्योतिषी जल्दी विवाह को केवल जल्दबाज़ी या परिस्थिति का परिणाम नहीं मानते। जीवन की अन्य महत्वपूर्ण घटनाओं की तरह, इसे भी जन्म के समय की ग्रह स्थितियों से समझा जाता है, जिन्हें पिछले जन्मों की प्रवृत्तियों (प्रारब्ध कर्म) से जोड़ा जाता है — साथ ही व्यक्ति के अपने निर्णय और परिस्थितियाँ भी भूमिका निभाती हैं।',
          },
          {
            id:       'intro-defining-early',
            label:    'What Constitutes Early Marriage in Vedic Context',
            label_hi: 'वैदिक संदर्भ में प्रारंभिक विवाह की परिभाषा',
            body:     'As a general convention — not a prediction — early marriage is often taken to mean a union before about 24 or 25, though this varies across cultures and generations. Astrologically, "early" is judged relative to the chart rather than to the calendar: when the 7th house, its lord and the significators of marriage are activated prominently in the early Dasha-Bhukti periods of the native’s life, the chart is read as supporting a relatively early marriage. This describes a tendency, not a fixed age.',
            body_hi:  'सामान्य परंपरा के अनुसार — भविष्यवाणी के रूप में नहीं — जल्दी विवाह का अर्थ अक्सर लगभग 24 या 25 वर्ष से पहले होने वाला विवाह माना जाता है, हालांकि यह संस्कृति और पीढ़ी के अनुसार बदलता है। ज्योतिष में "जल्दी" कैलेंडर से नहीं, कुंडली के संदर्भ में देखा जाता है: जब सप्तम भाव, सप्तमेश और विवाह के कारक जीवन की शुरुआती दशा-भुक्ति में प्रमुखता से सक्रिय हों, तो कुंडली को अपेक्षाकृत जल्दी विवाह का समर्थन करने वाला माना जाता है। यह एक प्रवृत्ति है, कोई तय उम्र नहीं।',
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
            label_hi: 'सप्तम भाव — साझेदारी का मुख्य भाव',
            body:     'The 7th house is the primary seat of partnership and marriage. Charts associated with early marriage usually show a strong 7th house, well-aspected by benefics and free from the malefic influences that tend to bring delay. A strong 7th house lord placed in an angular (Kendra) or trinal (Trikona) house is traditionally seen as a key supporting factor for an earlier union.',
            body_hi:  'सप्तम भाव साझेदारी और विवाह का मुख्य भाव है। जल्दी विवाह से जुड़ी कुंडलियों में आमतौर पर सप्तम भाव मज़बूत होता है, उस पर शुभ ग्रहों की दृष्टि होती है और वह देरी लाने वाले पाप प्रभावों से मुक्त होता है। केंद्र या त्रिकोण में स्थित मज़बूत सप्तमेश को परंपरागत रूप से जल्दी विवाह का एक मुख्य सहायक कारक माना जाता है।',
          },
          {
            id:       'house-2nd',
            icon:     '🏛️',
            label:    '2nd House — The Family Foundation',
            label_hi: 'द्वितीय भाव — पारिवारिक नींव',
            body:     'The 2nd house (Kutumba Bhava) governs the family unit. Early marriage directly influences the establishment of one’s own family lineage. When the 2nd house is strong and activated by a supportive Dasha, it supports the early formation of a stable family environment — and a link between the 2nd and 7th house lords is traditionally seen as supporting an earlier marriage.',
            body_hi:  'द्वितीय भाव (कुटुंब भाव) परिवार का भाव है। जल्दी विवाह का सीधा संबंध अपने परिवार की स्थापना से है। जब द्वितीय भाव मज़बूत हो और किसी सहायक दशा से सक्रिय हो, तो यह जल्दी एक स्थिर पारिवारिक वातावरण बनने का समर्थन करता है — और द्वितीयेश व सप्तमेश के संबंध को परंपरागत रूप से जल्दी विवाह का सहायक माना जाता है।',
          },
          {
            id:       'house-5th',
            icon:     '🔥',
            label:    '5th House — Purva Punya and Romance',
            label_hi: 'पंचम भाव — पूर्व पुण्य और रोमांस',
            body:     'The 5th house is the house of Purva Punya (past-life merit) and romance. In the context of Vedic astrology, it acts as a bridge to the 7th house. A strong connection between the 5th and 7th houses — especially when involving benefic planets — is often associated with earlier marriage, as past-life romantic merit is read as flowing into the present lifetime’s union.',
            body_hi:  'पंचम भाव पूर्व पुण्य (पिछले जन्म के पुण्य) और प्रेम का भाव है। वैदिक ज्योतिष में यह सप्तम भाव के लिए सेतु का काम करता है। पंचम और सप्तम भाव का मज़बूत संबंध — विशेषकर शुभ ग्रहों के साथ — अक्सर जल्दी विवाह से जोड़ा जाता है, क्योंकि इसे पिछले जन्म के प्रेम-पुण्य का वर्तमान विवाह में फलित होना माना जाता है।',
          },
          {
            id:       'house-11th',
            icon:     '⭐',
            label:    '11th House — Desires and Fulfillment',
            label_hi: 'एकादश भाव — इच्छाएँ और पूर्ति',
            body:     'The 11th house is the house of desires and their fulfillment. Its strong connection to the 7th house or the 7th lord is traditionally read as helping the wish for marriage materialise earlier in life. When the 11th lord reinforces the 7th house, the native’s desire for partnership is more likely to find early expression rather than remaining a potential.',
            body_hi:  'एकादश भाव इच्छाओं और उनकी पूर्ति का भाव है। सप्तम भाव या सप्तमेश से इसके मज़बूत संबंध को परंपरागत रूप से जीवन में जल्दी विवाह की इच्छा पूरी होने में सहायक माना जाता है। जब एकादशेश सप्तम भाव को बल देता है, तो साथी की इच्छा के जल्दी पूरा होने की संभावना बढ़ती है।',
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
            body:     'Venus is the Karaka of passion, love, and the partner. A strong, well-placed Venus — unafflicted and receiving benefic aspects — is one of the strongest single indicators traditionally associated with a smooth, relatively early entry into marriage, though it still needs support from the 7th house and the Dasha periods. Venus in its own signs (Taurus, Libra), exalted (Pisces), or in a strong Kendra house is read as having a heightened capacity to support early marital union.',
            body_hi:  'शुक्र प्रेम, आकर्षण और जीवनसाथी का कारक है। मज़बूत और सुस्थित शुक्र — पीड़ा से मुक्त और शुभ दृष्टि वाला — परंपरागत रूप से सहज और अपेक्षाकृत जल्दी विवाह के सबसे प्रबल एकल संकेतों में से एक माना जाता है, हालांकि उसे भी सप्तम भाव और दशा का साथ चाहिए। अपनी राशियों (वृषभ, तुला), उच्च राशि (मीन) या मज़बूत केंद्र भाव में शुक्र जल्दी विवाह का अधिक समर्थन करता माना जाता है।',
          },
          {
            id:       'planet-jupiter',
            icon:     '🪐',
            label:    'Jupiter — Wisdom and the Husband Karaka',
            label_hi: 'गुरु — ज्ञान और पति का कारक',
            body:     'Jupiter acts as the Karaka for the husband in a female chart and the stabilizer of the marriage in any chart. A strong Jupiter — particularly Digbala (directional strength) or Vargottama (in the same sign in both Rashi and Navamsa) — is read as bringing the maturity required for union even at a younger age, helping an early marriage be grounded rather than impulsive.',
            body_hi:  'गुरु स्त्री की कुंडली में पति का कारक है और किसी भी कुंडली में विवाह को स्थिरता देने वाला ग्रह है। मज़बूत गुरु — विशेषकर दिग्बली या वर्गोत्तम — कम उम्र में भी विवाह के लिए आवश्यक परिपक्वता देने वाला माना जाता है, जिससे जल्दी विवाह आवेग के बजाय समझदारी पर टिका रहता है।',
          },
          {
            id:       'planet-moon',
            icon:     '🌙',
            label:    'The Moon — Emotional Readiness',
            label_hi: 'चंद्रमा — भावनात्मक तैयारी',
            body:     'The Moon represents the mind and emotional disposition. For an early marriage to be stable rather than merely early, a strong, well-placed Moon is important. An emotionally mature Moon helps the native genuinely embrace the responsibilities of marriage at a young age — helping prevent the union from becoming an impulsive decision driven by fleeting emotional states.',
            body_hi:  'चंद्रमा मन और भावनात्मक स्वभाव का कारक है। जल्दी विवाह केवल जल्दी नहीं, बल्कि स्थिर भी हो, इसके लिए मज़बूत और सुस्थित चंद्रमा महत्वपूर्ण माना जाता है। भावनात्मक रूप से परिपक्व चंद्रमा कम उम्र में विवाह की ज़िम्मेदारियाँ सचमुच अपनाने में मदद करता है, ताकि विवाह क्षणिक भावनाओं से प्रेरित आवेगी निर्णय न बने।',
          },
          {
            id:       'planet-mars',
            icon:     '🔴',
            label:    'Mars — The Energy Catalyst',
            label_hi: 'मंगल — ऊर्जा और पहल का ग्रह',
            body:     'Mars is the planet of action and passion. While Mars can be aggressive, its well-directed energy can help initiate a marital union. A balanced Mars — assertive but not malefic toward the 7th house — is read as the spark that can move the marriage process forward quickly. Mars in conflict with the 7th house, however, may push toward impulsive decisions rather than well-supported unions.',
            body_hi:  'मंगल कर्म और उत्साह का ग्रह है। मंगल आक्रामक हो सकता है, फिर भी उसकी सही दिशा में लगी ऊर्जा विवाह की पहल में मदद कर सकती है। संतुलित मंगल — दृढ़, लेकिन सप्तम भाव के लिए अशुभ नहीं — वह चिंगारी माना जाता है जो विवाह की प्रक्रिया को तेज़ी से आगे बढ़ा सकती है। लेकिन सप्तम भाव से टकराव वाला मंगल सुदृढ़ विवाह के बजाय आवेगी निर्णयों की ओर धकेल सकता है।',
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
            body:     'Marriage typically occurs during the Dasha or Bhukti of the 7th house lord, a planet in the 7th house, or a planet aspecting the 7th house. If these periods fall within the native’s early years — which depends on the Nakshatra of the Moon at birth — the chart is read as supporting a relatively early marriage, though the actual timing also depends on transits, the Navamsa and life circumstances. The Dasha sequence itself is fixed at birth; how one prepares for it is not.',
            body_hi:  'विवाह आमतौर पर सप्तमेश, सप्तम भाव में स्थित ग्रह, या सप्तम भाव पर दृष्टि डालने वाले ग्रह की दशा या भुक्ति में होता है। यदि ये अवधियाँ जातक के शुरुआती वर्षों में आती हैं — जो जन्म के समय चंद्रमा के नक्षत्र पर निर्भर करता है — तो कुंडली को अपेक्षाकृत जल्दी विवाह का समर्थन करने वाला माना जाता है, हालांकि वास्तविक समय गोचर, नवांश और जीवन की परिस्थितियों पर भी निर्भर करता है। दशा का क्रम जन्म से तय है; उसके लिए हम कैसे तैयार होते हैं, यह तय नहीं है।',
          },
          {
            id:       'timing-transit',
            label:    'Transit Triggers — Jupiter Over the 7th House',
            label_hi: 'गोचर से सक्रियता — सप्तम भाव पर गुरु',
            body:     'Transits act as the final triggers that convert Dasha permission into the actual event. The transit of Jupiter over the 7th house, the 7th house lord, or the Navamsa 7th lord is often treated as a key trigger. Saturn’s transit — though it usually brings delay — can occasionally act as a stabilizer, helping to anchor an early union.',
            body_hi:  'गोचर दशा द्वारा दी गई संभावना को वास्तविक घटना में बदलने वाली अंतिम सक्रियता का काम करते हैं। सप्तम भाव, सप्तमेश या नवांश के सप्तमेश पर गुरु का गोचर अक्सर एक मुख्य सक्रिय कारक माना जाता है। शनि का गोचर — जो आमतौर पर देरी लाता है — कभी-कभी जल्दी हुए विवाह को स्थिरता भी दे सकता है।',
          },
          {
            id:       'timing-navamsa',
            label:    'Navamsa (D9) — Confirming the Marital Promise',
            label_hi: 'नवांश (D9) — वैवाहिक संकेतों की पुष्टि',
            body:     'Astrologers do not judge early marriage from the Rashi (D1) chart alone. The Navamsa (D9) is read as the chart of marital promise — for early marriage, a robust 7th house and lord in the D9 is supportive. If the D1 shows early potential but the D9 is weak, the early indication may not materialise as expected. Ideally, the D9 confirms what the D1 suggests.',
            body_hi:  'ज्योतिषी जल्दी विवाह का आकलन केवल राशि (D1) कुंडली से नहीं करते। नवांश (D9) को विवाह के संकेतों की कुंडली माना जाता है — जल्दी विवाह के लिए D9 में मज़बूत सप्तम भाव और सप्तमेश सहायक होते हैं। यदि D1 में जल्दी विवाह की संभावना हो लेकिन D9 कमज़ोर हो, तो वह संकेत अपेक्षा के अनुसार फलित न भी हो। आदर्श रूप से D9, D1 के संकेतों की पुष्टि करता है।',
          },
          {
            id:       'timing-darakaraka',
            label:    'Darakaraka and Upapada Lagna — Advanced Validation',
            label_hi: 'दारकारक और उपपद लग्न — अतिरिक्त पुष्टि',
            body:     'In the Jaimini system, the Darakaraka (the planet with the lowest longitude) is a key indicator for marriage. If the DK is strong and occupies a Kendra or Trikona in the Rashi chart, it is traditionally read as supporting earlier marriage. A strong, well-placed Upapada Lagna (UL) — representing the marriage partner — is likewise seen as supporting a smoother, timelier union.',
            body_hi:  'जैमिनी पद्धति में दारकारक (सबसे कम अंश वाला ग्रह) विवाह का एक मुख्य संकेतक है। यदि दारकारक मज़बूत हो और राशि कुंडली में केंद्र या त्रिकोण में हो, तो इसे परंपरागत रूप से जल्दी विवाह का सहायक माना जाता है। इसी तरह मज़बूत और सुस्थित उपपद लग्न (UL) — जो जीवनसाथी को दर्शाता है — सहज और समय पर विवाह का सहायक माना जाता है।',
          },
        ],
      },

      {
        id:       'destined-vs-immature',
        title:    'Well-Supported Early Marriage vs. Immature Marriage',
        title_hi: 'सुदृढ़ जल्दी विवाह बनाम अपरिपक्व विवाह',
        layout:   'checklist',
        items: [
          {
            id:       'distinction-destined',
            label:    'Well-Supported Early Marriage — Chart Alignment',
            label_hi: 'सुदृढ़ जल्दी विवाह — कुंडली के संकेतों का मेल',
            body:     'A well-supported early marriage is one where the native’s chart, Dasha and transit indicators point in the same direction. Such marriages are supported by the planetary energies — a strong 7th house, confirmed by the Navamsa, with benefic Dasha activations — and the partners can grow together through the formative years, sharing a unique life journey.',
            body_hi:  'सुदृढ़ जल्दी विवाह वह है जिसमें जातक की कुंडली, दशा और गोचर के संकेत एक ही दिशा में हों। ऐसे विवाहों को ग्रहों का समर्थन मिलता है — मज़बूत सप्तम भाव, नवांश से पुष्टि और शुभ दशा की सक्रियता — और दोनों साथी जीवन के शुरुआती वर्षों में साथ-साथ आगे बढ़ सकते हैं।',
          },
          {
            id:       'distinction-immature',
            label:    'Immature Marriage — The Critical Warning',
            label_hi: 'अपरिपक्व विवाह — महत्वपूर्ण चेतावनी',
            body:     'An immature marriage occurs when the native marries due to impulse, pressure, or superficial reasons despite the chart indicating a need for greater maturity. Astrologers often associate this with heavy malefic afflictions to the 5th and 7th houses — a rush into union that lacks the necessary foundation. The event comes quickly, but the planetary support to sustain it may be weaker.',
            body_hi:  'अपरिपक्व विवाह तब होता है जब कुंडली अधिक परिपक्वता की आवश्यकता दिखा रही हो, फिर भी जातक आवेग, दबाव या सतही कारणों से विवाह कर ले। ज्योतिषी इसे अक्सर पंचम और सप्तम भाव पर भारी पाप प्रभाव से जोड़ते हैं — बिना पक्की नींव के विवाह की जल्दबाज़ी। घटना तो जल्दी हो जाती है, पर उसे टिकाए रखने वाला ग्रहों का समर्थन कमज़ोर हो सकता है।',
          },
          {
            id:       'distinction-advantages-challenges',
            label:    'Advantages and Challenges of an Early Marriage',
            label_hi: 'जल्दी विवाह के लाभ और चुनौतियाँ',
            body:     'Advantages: when the chart supports it, an early marriage can provide a strong foundation for both partners to grow and evolve together, sharing the formative years of life in tandem. Challenges: the primary challenge is maintaining individual identity while learning the dynamics of partnership during a phase of rapid personal change — and resisting societal pressure to conform to a conventional marital timeline.',
            body_hi:  'लाभ: जब कुंडली इसका समर्थन करे, तो जल्दी विवाह दोनों साथियों को साथ-साथ बढ़ने और जीवन के शुरुआती वर्ष साथ बिताने की मज़बूत नींव दे सकता है। चुनौतियाँ: मुख्य चुनौती तेज़ी से बदलते व्यक्तिगत दौर में साझेदारी सीखते हुए अपनी पहचान बनाए रखना है — और विवाह की पारंपरिक समय-सीमा के सामाजिक दबाव से बचना।',
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
            body:     'Is the 7th house free from malefic obstruction? Is the 7th lord strong, well-placed in a Kendra or Trikona, and connected to benefic planets? This is the foundation of the analysis — a heavily afflicted 7th house makes early marriage less likely, even when other indicators are present.',
            body_hi:  'क्या सप्तम भाव पाप ग्रहों की बाधा से मुक्त है? क्या सप्तमेश मज़बूत है, केंद्र या त्रिकोण में सुस्थित है और शुभ ग्रहों से जुड़ा है? यही विश्लेषण की नींव है — बहुत पीड़ित सप्तम भाव होने पर जल्दी विवाह की संभावना कम मानी जाती है, भले ही अन्य संकेत मौजूद हों।',
          },
          {
            id:       'guidance-connections',
            label:    'Step 2: Check the 2nd, 5th, and 11th House Connections',
            label_hi: 'चरण 2: 2रे, 5वें और 11वें भाव के संबंध जाँचें',
            body:     'Are these support houses reinforcing the 7th? A 5th-7th lord connection is read as carrying past-life romantic merit into present-lifetime marriage. A 2nd-7th link grounds the union in family continuity. An 11th-7th link is read as helping the desire for partnership find early expression rather than remaining unfulfilled potential.',
            body_hi:  'क्या ये सहायक भाव सप्तम भाव को बल दे रहे हैं? पंचमेश-सप्तमेश का संबंध पिछले जन्म के प्रेम-पुण्य को वर्तमान विवाह से जोड़ने वाला माना जाता है। द्वितीय-सप्तम का संबंध विवाह को पारिवारिक निरंतरता से जोड़ता है। एकादश-सप्तम का संबंध साथी की इच्छा के जल्दी पूरा होने में सहायक माना जाता है।',
          },
          {
            id:       'guidance-dasha',
            label:    'Step 3: Examine the Dasha Sequence and Confirm in D9',
            label_hi: 'चरण 3: दशा अनुक्रम की जाँच करें और D9 में पुष्टि करें',
            body:     'Are the marriage-related Dasha periods (7th lord, Venus, planets in the 7th) occurring early in the native’s life? If yes, confirm in the Navamsa: is the 7th house and its lord robust in D9? Early D1 promise without D9 confirmation frequently stalls. When both layers agree, the indication of a relatively early marriage is strongest — still a tendency, not a date.',
            body_hi:  'क्या विवाह से जुड़ी दशाएँ (सप्तमेश, शुक्र, सप्तम भाव के ग्रह) जातक के जीवन में जल्दी आ रही हैं? यदि हाँ, तो नवांश में पुष्टि करें: क्या D9 में सप्तम भाव और सप्तमेश मज़बूत हैं? D9 की पुष्टि के बिना D1 का शुरुआती संकेत अक्सर रुक जाता है। जब दोनों स्तर सहमत हों, तब अपेक्षाकृत जल्दी विवाह का संकेत सबसे प्रबल होता है — फिर भी यह एक प्रवृत्ति है, कोई तारीख नहीं।',
          },
          {
            id:       'remedy-jupiter-venus',
            label:    'Remedies: Strengthening Jupiter and Venus',
            label_hi: 'उपाय: गुरु और शुक्र को शक्तिशाली बनाना',
            body:     'If the indicators for early marriage are slightly hindered, traditional remedies can help focus intention. For Jupiter: the Vishnu Sahasranama is traditionally recited to strengthen the wisdom and maturity needed for union. For Venus: the Lalita Sahasranama helps balance the energies of love and devotion, helping keep attraction grounded rather than merely superficial.',
            body_hi:  'यदि जल्दी विवाह के संकेत थोड़े बाधित हों, तो पारंपरिक उपाय मन को एकाग्र करने में मदद कर सकते हैं। गुरु के लिए: विवाह के लिए आवश्यक समझ और परिपक्वता बढ़ाने हेतु परंपरागत रूप से विष्णु सहस्रनाम का पाठ किया जाता है। शुक्र के लिए: ललिता सहस्रनाम प्रेम और भक्ति की ऊर्जा में संतुलन लाता है, ताकि आकर्षण केवल सतही न रहे।',
          },
          {
            id:       'remedy-self',
            label:    'The Most Essential Remedy: Conscious Maturity',
            label_hi: 'सबसे आवश्यक उपाय: सचेत परिपक्वता',
            body:     'The most essential remedy for early marriage is the conscious cultivation of emotional maturity, self-awareness, and genuine readiness. Remedies and rituals assist in mental alignment — but they cannot bypass the fundamental karmic architecture of the Dasha sequence. The native\'s internal readiness is the real accelerant; the chart only opens the door.',
            body_hi:  'जल्दी विवाह के लिए सबसे ज़रूरी उपाय भावनात्मक परिपक्वता, आत्म-जागरूकता और सच्ची तैयारी का सचेत विकास है। उपाय और अनुष्ठान मन को तैयार करने में मदद करते हैं — लेकिन वे दशा क्रम की मूल कार्मिक संरचना को नहीं बदल सकते। जातक की आंतरिक तैयारी ही असली सहायक है; कुंडली केवल द्वार खोलती है।',
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
            body:     'The "better" marriage is the one that aligns with your specific chart and circumstances — whether early, standard, or late. A forced early marriage against a chart that requires maturity can bring far more difficulty than a later marriage that arrives with proper planetary support. Timing is not a virtue; alignment is.',
            body_hi:  '"बेहतर" विवाह वह है जो आपकी कुंडली और परिस्थितियों से मेल खाए — चाहे वह जल्दी हो, सामान्य समय पर हो या देर से। जिस कुंडली में अधिक परिपक्वता की ज़रूरत दिखती हो, वहाँ ज़बरदस्ती किया गया जल्दी विवाह उस बाद के विवाह से कहीं अधिक कठिनाइयाँ ला सकता है जो ग्रहों के उचित समर्थन के साथ आता है। समय अपने आप में गुण नहीं है; तालमेल है।',
          },
          {
            id:       'myth-force',
            label:    'Myth: Rituals can force an early marriage',
            label_hi: 'मिथक: अनुष्ठान से ज़बरदस्ती जल्दी विवाह कराया जा सकता है',
            body:     'Rituals assist in mental alignment and intention-setting, but they cannot bypass the fundamental karmic architecture of the Dasha sequence. No ritual moves the Dasha calendar forward. What rituals do is help the native be more receptive, clear, and mature when the Dasha window opens — not create a window that the chart has not permitted.',
            body_hi:  'अनुष्ठान मन को तैयार करने और संकल्प बनाने में मदद करते हैं, लेकिन वे दशा क्रम की मूल कार्मिक संरचना को नहीं बदल सकते। कोई भी अनुष्ठान दशा के समय को आगे नहीं खिसकाता।',
          },
          {
            id:       'myth-impulsive',
            label:    'Myth: Every early marriage is impulsive',
            label_hi: 'मिथक: हर प्रारंभिक विवाह आवेगी होता है',
            body:     'Many early marriages are deeply stable — supported by strong planetary indications, confirmed in the Navamsa, and backed by the emotional maturity indicated by the Moon. Whether an early marriage is well-supported or impulsive is read from the chart’s overall evidence and the couple’s maturity, not from the age at which it occurs.',
            body_hi:  'कई जल्दी विवाह बहुत स्थिर होते हैं — जिन्हें ग्रहों के मज़बूत संकेतों, नवांश की पुष्टि और चंद्रमा से दिखने वाली भावनात्मक परिपक्वता का समर्थन मिलता है। कोई जल्दी विवाह सुदृढ़ है या आवेगी, यह कुंडली के समग्र संकेतों और दंपति की परिपक्वता से देखा जाता है, केवल उम्र से नहीं।',
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
            body:     'There is no fixed age. As a general convention, "early" is often taken to mean before about 24–25, but this varies across cultures and generations. Astrologically, "early" is judged relative to the chart: when marriage-related Dasha periods activate the 7th house and its lord early in life, the chart is read as supporting a relatively early marriage. This is a traditional heuristic, not a prediction of anyone’s age at marriage.',
            body_hi:  'कोई तय उम्र नहीं है। सामान्य परंपरा में "जल्दी" का अर्थ अक्सर लगभग 24–25 वर्ष से पहले माना जाता है, लेकिन यह संस्कृति और पीढ़ी के साथ बदलता है। ज्योतिष में "जल्दी" कुंडली के संदर्भ में देखा जाता है: जब विवाह से जुड़ी दशाएँ जीवन में जल्दी सप्तम भाव और सप्तमेश को सक्रिय करें, तो कुंडली को अपेक्षाकृत जल्दी विवाह का समर्थन करने वाला माना जाता है। यह एक पारंपरिक अनुमान-सूत्र है, किसी की विवाह की उम्र की भविष्यवाणी नहीं।',
          },
          {
            id:       'faq-debilitated-7th-lord',
            label:    'Can early marriage happen if the 7th lord is debilitated?',
            label_hi: 'क्या प्रारंभिक विवाह हो सकता है यदि सप्तमेश नीच हो?',
            body:     'It is possible if the debilitated lord receives Neecha Bhanga (cancellation of debilitation) through specific planetary combinations — such as the lord of the debilitation sign being in a Kendra, or the exaltation lord aspecting the debilitated planet. In such cases, the initial weakness is traditionally said to turn into strength, and the marriage may still occur early, though it may bring initial adjustments.',
            body_hi:  'यह संभव है, यदि नीच सप्तमेश को कुछ विशेष ग्रह योगों से नीच भंग (नीचता का भंग होना) मिले — जैसे नीच राशि का स्वामी केंद्र में हो। ऐसे मामलों में शुरुआती कमज़ोरी को परंपरागत रूप से शक्ति में बदलता हुआ माना जाता है, और विवाह जल्दी हो सकता है, हालांकि शुरुआत में कुछ समायोजन करना पड़ सकता है।',
          },
          {
            id:       'faq-venus-guarantee',
            label:    'Does a strong Venus always guarantee an early marriage?',
            label_hi: 'क्या मजबूत शुक्र हमेशा प्रारंभिक विवाह की गारंटी देता है?',
            body:     'A strong Venus is a major indicator but not a guarantee on its own. It needs support from the 7th house and a suitable Dasha period to show up as early marriage. Venus strong in isolation — while other marriage indicators are weak or the Dasha activation is late — tends to show a refined nature and capacity for love without necessarily bringing an early marriage.',
            body_hi:  'मज़बूत शुक्र एक प्रमुख संकेत है, लेकिन अकेले कोई गारंटी नहीं। जल्दी विवाह के रूप में फलित होने के लिए उसे सप्तम भाव और उपयुक्त दशा का साथ चाहिए। यदि केवल शुक्र मज़बूत हो — जबकि अन्य विवाह संकेत कमज़ोर हों या दशा देर से सक्रिय हो — तो यह प्रेम की क्षमता और परिष्कृत स्वभाव तो दिखाता है, पर ज़रूरी नहीं कि विवाह जल्दी हो।',
          },
          {
            id:       'faq-strong-7th-enough',
            label:    'Does a strong 7th house mean early marriage?',
            label_hi: 'क्या मज़बूत सप्तम भाव का अर्थ जल्दी विवाह है?',
            body:     'Not by itself. A strong 7th house supports good marriage potential, but timing is read mainly from the Dasha periods: if the periods that activate the 7th house come later in life, marriage is also more likely to come later, however well-placed the 7th lord is. Strength is read for quality; Dasha for timing — and neither fixes an exact age.',
            body_hi:  'अकेले नहीं। मज़बूत सप्तम भाव अच्छी विवाह संभावना का समर्थन करता है, लेकिन समय मुख्य रूप से दशाओं से देखा जाता है: यदि सप्तम भाव को सक्रिय करने वाली दशाएँ जीवन में बाद में आएँ, तो विवाह भी बाद में होने की संभावना अधिक रहती है, चाहे सप्तमेश कितना भी सुस्थित हो। भाव की शक्ति से गुणवत्ता देखी जाती है, दशा से समय — और इनमें से कोई भी सटीक उम्र तय नहीं करता।',
          },
          {
            id:       'faq-mars-role',
            label:    'What role does Mars play in early marriage?',
            label_hi: 'प्रारंभिक विवाह में मंगल की क्या भूमिका है?',
            body:     'Mars acts as a catalyst for initiation. Its balanced energy can speed up the initiation of the marriage process if it is well-placed and not causing excessive conflict in the 7th house. However, Mars afflicting the 7th house tends to push toward impulsive decisions rather than well-supported unions — speed without foundation. The distinction depends on whether Mars is driving or disturbing the 7th house.',
            body_hi:  'मंगल पहल करने वाला ग्रह है। यदि वह सुस्थित हो और सप्तम भाव में अधिक टकराव न पैदा करे, तो उसकी संतुलित ऊर्जा विवाह की प्रक्रिया को तेज़ कर सकती है। लेकिन सप्तम भाव को पीड़ित करने वाला मंगल सुदृढ़ विवाह के बजाय आवेगी निर्णयों की ओर ले जा सकता है — बिना नींव की तेज़ी।',
          },
          {
            id:       'faq-weak-navamsa',
            label:    'Can an early marriage be successful without a strong Navamsa?',
            label_hi: 'क्या प्रारंभिक विवाह मजबूत नवांश के बिना सफल हो सकता है?',
            body:     'It can be, but astrologers see it as needing more conscious effort. The Navamsa is used to judge the long-term stability of the marital promise shown in the Rashi chart; an early marriage indicated in the D1 but not supported in the D9 is read as more likely to face strain. The couple’s maturity and effort still play a large part in how the marriage actually unfolds.',
            body_hi:  'हो सकता है, लेकिन ज्योतिषी इसके लिए अधिक सचेत प्रयास की ज़रूरत मानते हैं। राशि कुंडली में दिखे वैवाहिक संकेतों की दीर्घकालिक स्थिरता नवांश से परखी जाती है; D1 में दिखा लेकिन D9 से असमर्थित जल्दी विवाह अधिक तनाव का सामना कर सकता है। विवाह वास्तव में कैसा रहेगा, इसमें दंपति की परिपक्वता और प्रयास की भी बड़ी भूमिका है।',
          },
          {
            id:       'faq-moon-strength',
            label:    "Why does the Moon's strength matter so much for early marriage?",
            label_hi: 'प्रारंभिक विवाह के लिए चंद्रमा की शक्ति इतनी क्यों मायने रखती है?',
            body:     'A strong Moon provides the emotional stability required to handle the responsibilities of marriage at a young age. Without a mature Moon, early marriage can become an impulsive emotional decision driven by fleeting states rather than genuine readiness. The Moon helps show whether the "early" in early marriage comes from readiness rather than emotional impulse.',
            body_hi:  'मज़बूत चंद्रमा कम उम्र में विवाह की ज़िम्मेदारियाँ संभालने के लिए ज़रूरी भावनात्मक स्थिरता देता है। परिपक्व चंद्रमा के बिना जल्दी विवाह क्षणिक भावनाओं से प्रेरित आवेगी निर्णय बन सकता है।',
          },
          {
            id:       'faq-remedies-speed',
            label:    'Should I perform remedies to speed up an early marriage?',
            label_hi: 'क्या मुझे प्रारंभिक विवाह को तेज करने के लिए उपाय करने चाहिए?',
            body:     'Remedies are helpful for mental alignment and inner preparation — not for altering the timing shown by the Dasha sequence. If your chart has strong early marriage indicators, the supportive Dasha periods arrive in their own time; remedies help you be more receptive and prepared when they do. They do not create a window that the chart has not permitted.',
            body_hi:  'उपाय मन को तैयार करने और भीतर से संतुलन लाने में सहायक हैं — दशा क्रम में दिखे समय को बदलने के लिए नहीं। यदि आपकी कुंडली में जल्दी विवाह के मज़बूत संकेत हैं, तो सहायक दशाएँ अपने समय पर आती हैं; उपाय उस समय आपको अधिक तैयार और ग्रहणशील बनाने में मदद करते हैं।',
          },
          {
            id:       'faq-early-vs-immature',
            label:    'What is the main difference between early and immature marriage?',
            label_hi: 'प्रारंभिक और अपरिपक्व विवाह के बीच मुख्य अंतर क्या है?',
            body:     'A well-supported early marriage is backed by the chart’s indications and timing — the 7th house is strong, confirmed in the Navamsa, and the Dasha periods activate marriage early. An immature marriage is a result of external pressure or impulse, often lacking foundational planetary support and frequently showing heavy malefic afflictions to the 5th and 7th houses.',
            body_hi:  'सुदृढ़ जल्दी विवाह को कुंडली के संकेतों और समय का समर्थन होता है — सप्तम भाव मज़बूत होता है, नवांश से उसकी पुष्टि होती है और दशाएँ विवाह को जल्दी सक्रिय करती हैं। अपरिपक्व विवाह बाहरी दबाव या आवेग का परिणाम होता है, जिसमें अक्सर ग्रहों का ठोस समर्थन नहीं होता और पंचम व सप्तम भाव पर भारी पाप प्रभाव दिखता है।',
          },
          {
            id:       'faq-how-to-know-destined',
            label:    'Can one yoga or planet guarantee early marriage?',
            label_hi: 'क्या कोई एक योग या ग्रह जल्दी विवाह की गारंटी दे सकता है?',
            body:     'No. Astrologers look for several factors agreeing: a strong, unafflicted 7th house and lord; supportive links from the 2nd, 5th or 11th house; a well-placed Venus, Jupiter and Moon; early activation of marriage-related Dasha periods; and confirmation in the Navamsa (D9). Even when these agree, they indicate a tendency toward relatively early marriage, not a fixed age — and the absence of early-marriage indicators does not by itself mean a delay.',
            body_hi:  'नहीं। ज्योतिषी कई कारकों का एक साथ मेल देखते हैं: मज़बूत और पीड़ा-रहित सप्तम भाव व सप्तमेश; द्वितीय, पंचम या एकादश भाव से सहायक संबंध; सुस्थित शुक्र, गुरु और चंद्रमा; विवाह से जुड़ी दशाओं की जल्दी सक्रियता; और नवांश (D9) में पुष्टि। इन सबके मेल से भी अपेक्षाकृत जल्दी विवाह की प्रवृत्ति ही दिखती है, कोई तय उम्र नहीं — और जल्दी विवाह के संकेत न होने का अर्थ अपने आप देरी नहीं है।',
          },
        ],
      },

    ],
    ctas: [
      {
        id:             'cta-marriage-path',
        type:           'tool',
        slug:           'marriage-path',
        label:          'Check Your Marriage Path',
        label_hi:       'अपना विवाह मार्ग जाँचें',
        description:    'A free check of your main marriage indicators — the planets in your 7th house, Venus and Jupiter, and the strongest influence on your marriage.',
        description_hi: 'आपके मुख्य विवाह संकेतों की निःशुल्क जाँच — सप्तम भाव के ग्रह, शुक्र और गुरु, और विवाह पर सबसे प्रबल प्रभाव।',
        variant:        'primary',
      },
      // The Marriage Report is offered only as a contextual card after 'timing-analysis' (_landing.ts):
      // a broader marriage outlook, not an early-marriage or exact-age report.
    ],
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
