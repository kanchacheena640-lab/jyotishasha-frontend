import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const secondMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:second-marriage',
    slug:       'second-marriage',
    title:      'Second Marriage in Vedic Astrology: Karmic Timing and Analysis',
    title_hi:   'वैदिक ज्योतिष में दूसरा विवाह: कार्मिक समय और विश्लेषण',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'draft',
  },

  routing: {
    canonicalPath: '/marriage-astrology/second-marriage',
    breadcrumbs: [
      { label: 'Home',               label_hi: 'होम',           href: '/' },
      { label: 'Marriage Astrology', label_hi: 'विवाह ज्योतिष', href: '/marriage-astrology' },
      { label: 'Second Marriage',    label_hi: 'दूसरा विवाह',    href: '/marriage-astrology/second-marriage' },
    ],
  },

  seo: {
    metaTitle:       'Second Marriage in Vedic Astrology: Karmic Timing & Analysis',
    metaDescription: 'Understand the astrological promise of a second marriage in Vedic Astrology. Explore key house analysis, Dasha timing, and the role of the 9th house.',
    metaDescription_hi: 'कुंडली में दूसरे विवाह के योग कैसे देखे जाते हैं — सप्तम और नवम भाव, शुक्र और गुरु, दशा और नवांश। जानें पुनर्विवाह के पारंपरिक संकेत, और क्यों कोई एक योग दूसरे विवाह या तलाक की गारंटी नहीं देता।',
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Second Marriage in Vedic Astrology',
    headline_hi: 'वैदिक ज्योतिष में दूसरा विवाह',
    subtext:     'Analyze the karmic promise, planetary conditions, and Dasha-Bhukti timing for a second marital union in Vedic Astrology.',
    subtext_hi:  'वैदिक ज्योतिष में दूसरे विवाह के संकेतों, ग्रह स्थितियों और दशा-भुक्ति के समय का विश्लेषण करें।',
  },

  taxonomy: {
    tags:        ['vedic-astrology', 'marriage-astrology', 'second-marriage', 'karmic-astrology'],
    keywords:    ['second marriage in vedic astrology', 'astrology for second marriage', 'divorce and second marriage astrology', '9th house second spouse'],
    keywords_hi: ['वैदिक ज्योतिष में दूसरा विवाह', 'दूसरे विवाह के लिए ज्योतिष', 'तलाक और दूसरा विवाह ज्योतिष', 'नौवां घर दूसरा जीवनसाथी'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks:   [
      {
        id:     'promise-vs-possibility',
        title:  'Astrological Promise vs. Possibility',
        title_hi: 'कुंडली के संकेत बनाम संभावना',
        layout: 'list',
        items:  [
          {
            id:    'karmic-potential',
            label: 'Understanding Karmic Potential',
            label_hi: 'कार्मिक क्षमता को समझना',
            body:  'First and foremost, we must distinguish between the promise of marriage and the possibility of a second one. Every chart has a baseline karmic potential for partnership. Whether that manifests as one union, two, or none at all is read from the strength of the marital houses and the Dasha-Bhukti sequence — alongside the person’s own choices and circumstances.',
            body_hi: 'सबसे पहले विवाह के मूल संकेत और दूसरे विवाह की संभावना में अंतर समझना ज़रूरी है। हर कुंडली में साझेदारी की एक आधारभूत कार्मिक संभावना होती है। यह एक विवाह, दो विवाह या विवाह न होने के रूप में फलित होगी, इसे वैवाहिक भावों की शक्ति और दशा-भुक्ति के क्रम से पढ़ा जाता है — साथ ही व्यक्ति के अपने निर्णय और परिस्थितियाँ भी भूमिका निभाती हैं।'
          },
          {
            id:    'karmic-outcome',
            label: 'Second Marriage as a Karmic Outcome',
            label_hi: 'एक विशेष कार्मिक संकेत के रूप में दूसरा विवाह',
            body:  'A second marriage is not a universal right or a guarantee; it is a specific karmic indication. Astrologers traditionally associate a higher potential for a second union with charts where the promise for partnership is strong but the first marriage shows significant afflictions. Afflictions describe strain, not a certain ending — many such marriages endure — and a second marriage can also follow widowhood.',
            body_hi: 'दूसरा विवाह कोई सार्वभौमिक अधिकार या गारंटी नहीं है; यह एक विशेष कार्मिक संकेत है। ज्योतिषी परंपरागत रूप से दूसरे विवाह की अधिक संभावना उन कुंडलियों से जोड़ते हैं जिनमें साझेदारी के संकेत मज़बूत हों, लेकिन पहले विवाह पर गंभीर पीड़ा दिखे। पीड़ा तनाव बताती है, निश्चित अंत नहीं — ऐसे कई विवाह टिके रहते हैं — और दूसरा विवाह जीवनसाथी के निधन के बाद भी हो सकता है।'
          }
        ]
      },
      {
        id:     'key-house-analysis',
        title:  'Key House Analysis',
        title_hi: 'प्रमुख भाव विश्लेषण',
        layout: 'accordion',
        items:  [
          {
            id:    '7th-house',
            label: 'The 7th House and its Role',
            label_hi: 'सप्तम भाव और इसकी भूमिका',
            body:  'The 7th House is the primary seat of the first marriage. When evaluating a second union, the 7th house, its lord, and its Karaka (significator) still hold weight, as they set the precedent for the individual’s approach to partnership. Even when no planet occupies the 7th house, its sign, its lord and the lord’s placement still describe the marriage — an empty house is never irrelevant.',
            body_hi: 'सप्तम भाव पहले विवाह का मुख्य भाव है। दूसरे विवाह का आकलन करते समय भी सप्तम भाव, सप्तमेश और विवाह के कारक महत्वपूर्ण रहते हैं, क्योंकि वे साझेदारी के प्रति व्यक्ति के दृष्टिकोण की नींव तय करते हैं। सप्तम भाव में कोई ग्रह न हो, तब भी उसकी राशि, सप्तमेश और सप्तमेश की स्थिति विवाह के बारे में बताती है — खाली भाव कभी महत्वहीन नहीं होता।'
          },
          {
            id:    '2nd-house',
            label: 'The 2nd House: The House of Family Continuity',
            label_hi: 'द्वितीय भाव: परिवार की निरंतरता का भाव',
            body:  'The 2nd House represents Kutumba (family unit) and is the 8th house from the 7th house. In some traditional methods, the 2nd house is examined for a second marriage, as the 8th from the 7th is read as the close of one phase and a new beginning in family life. Other approaches give more weight to the 9th house, and the two are often read together.',
            body_hi: 'द्वितीय भाव कुटुंब (परिवार) का भाव है और सप्तम भाव से अष्टम भाव है। कुछ पारंपरिक पद्धतियों में दूसरे विवाह के लिए द्वितीय भाव देखा जाता है, क्योंकि सप्तम से अष्टम को एक दौर की समाप्ति और पारिवारिक जीवन में नई शुरुआत के रूप में पढ़ा जाता है। अन्य पद्धतियाँ नवम भाव को अधिक महत्व देती हैं, और अक्सर दोनों को साथ पढ़ा जाता है।'
          },
          {
            id:    '8th-house',
            label: 'The 8th House: Marital Transformation',
            label_hi: 'अष्टम भाव: वैवाहिक परिवर्तन',
            body:  'The 8th house represents transformation, sudden changes, and the hidden side of marital life. Astrologers examine it when assessing strain on a first union and the potential for a transformative, or unconventional, second partnership — though an active 8th house does not by itself mean a marriage will end.',
            body_hi: 'अष्टम भाव परिवर्तन, अचानक बदलाव और वैवाहिक जीवन के छिपे पहलुओं का भाव है। पहले विवाह पर तनाव और किसी परिवर्तनकारी या अपरंपरागत दूसरे संबंध की संभावना का आकलन करते समय ज्योतिषी इसे देखते हैं — हालांकि सक्रिय अष्टम भाव अकेले यह नहीं बताता कि विवाह समाप्त होगा।'
          },
          {
            id:    '9th-house',
            label: 'The 9th House: The Second Spouse',
            label_hi: 'नवम भाव: दूसरा जीवनसाथी',
            body:  'In many traditional Vedic approaches, the 9th house is studied as the house representing the second spouse, following the principle that the 3rd from a house shows the next in sequence — here, the 3rd from the 7th. The strength of the 9th lord and planets occupying the 9th house provide clues about the nature and stability of a second partner. Not every tradition uses the 9th house in the same way, and it is read together with the 7th and 2nd houses.',
            body_hi: 'कई पारंपरिक वैदिक पद्धतियों में नवम भाव को दूसरे जीवनसाथी का भाव माना जाता है, इस सिद्धांत के आधार पर कि किसी भाव से तीसरा भाव क्रम में अगले को दर्शाता है — यहाँ सप्तम से तीसरा। नवमेश की शक्ति और नवम भाव में स्थित ग्रह दूसरे साथी के स्वभाव और स्थिरता के संकेत देते हैं। हर परंपरा नवम भाव का उपयोग एक जैसा नहीं करती, और इसे सप्तम व द्वितीय भाव के साथ पढ़ा जाता है।'
          },
          {
            id:    '11th-house',
            label: 'The 11th House: Fulfillment of Desires',
            label_hi: 'एकादश भाव: इच्छाओं की पूर्ति',
            body:  'The 11th house, as the house of gains and fulfillment of desires, is traditionally linked with fulfilment in later partnerships. Its connection to the 2nd or 9th house is read as supporting a second-marriage indication.',
            body_hi: 'एकादश भाव लाभ और इच्छाओं की पूर्ति का भाव है, जिसे परंपरागत रूप से बाद के संबंधों में संतोष से जोड़ा जाता है। द्वितीय या नवम भाव से इसके संबंध को दूसरे विवाह के संकेत का सहायक माना जाता है।'
          }
        ]
      },
      {
        id:     'planetary-influences',
        title:  'Planetary Influences',
        title_hi: 'ग्रहों का प्रभाव',
        layout: 'list',
        items:  [
          {
            id:    'venus',
            label: 'Venus',
            label_hi: 'शुक्र',
            body:  'As the Karaka of passion and the partner, Venus’s placement is always central. If Venus is in a dual sign or has multiple connections to marital houses, it suggests the potential for more than one significant partnership.',
            body_hi: 'प्रेम, आकर्षण और वैवाहिक संबंधों के कारक शुक्र की स्थिति दूसरे विवाह के विश्लेषण में अत्यंत महत्वपूर्ण होती है। यदि शुक्र द्विस्वभाव राशि में हो या वैवाहिक भावों से अनेक प्रकार से जुड़ा हो, तो यह जीवन में एक से अधिक महत्वपूर्ण वैवाहिक या प्रेम संबंधों की संभावना का संकेत दे सकता है।'
          },
          {
            id:    'jupiter',
            label: 'Jupiter',
            label_hi: 'गुरु',
            body:  'Jupiter represents the wisdom to learn from past mistakes. A strong Jupiter aspecting the 2nd or 9th houses can be the stabilizing factor in a successful second marriage.',
            body_hi: 'गुरु बीते अनुभवों से सीखने की समझ का प्रतिनिधित्व करता है। द्वितीय या नवम भाव पर दृष्टि डालने वाला मज़बूत गुरु सफल दूसरे विवाह में स्थिरता देने वाला कारक हो सकता है।'
          },
          {
            id:    'mars',
            label: 'Mars',
            label_hi: 'मंगल',
            body:  'Mars represents energy and passion. Its affliction to the 7th or 8th house is traditionally associated with volatility in the first marriage — strain that astrologers read as something to be managed, not a certain ending. Where a second union is indicated, Mars can also show the drive behind seeking it.',
            body_hi: 'मंगल ऊर्जा और उत्साह का ग्रह है। सप्तम या अष्टम भाव पर इसकी पीड़ा को परंपरागत रूप से पहले विवाह में अस्थिरता से जोड़ा जाता है — ऐसा तनाव जिसे ज्योतिषी संभाला जा सकने वाला मानते हैं, कोई निश्चित अंत नहीं। जहाँ दूसरे विवाह का संकेत हो, वहाँ मंगल उसकी तलाश की प्रेरणा भी दिखा सकता है।'
          },
          {
            id:    'rahu-ketu',
            label: 'Rahu and Ketu',
            label_hi: 'राहु और केतु',
            body:  'Rahu, the planet of obsession and unconventionality, when influencing the 7th, 8th, or 9th houses, is traditionally associated with an unconventional or late-life second marriage. Ketu brings detachment; its influence can show distance within the first marriage or a distinctive quality in a second union.',
            body_hi: 'राहु तीव्र आकर्षण और अपरंपरागत प्रवृत्ति का ग्रह है; सप्तम, अष्टम या नवम भाव पर इसका प्रभाव परंपरागत रूप से अपरंपरागत या जीवन के बाद के दौर में होने वाले दूसरे विवाह से जोड़ा जाता है। केतु वैराग्य लाता है; इसका प्रभाव पहले विवाह में दूरी या दूसरे विवाह की विशेष प्रकृति दिखा सकता है।'
          },
          {
            id:    'saturn',
            label: 'Saturn',
            label_hi: 'शनि',
            body:  'Saturn is the planet of endurance. While it often brings delay, its placement in the 7th or 9th house can indicate a second marriage that occurs later in life, characterized by a more serious or restrictive nature.',
            body_hi: 'शनि सहनशक्ति का ग्रह है। यह अक्सर देरी लाता है, फिर भी सप्तम या नवम भाव में इसकी स्थिति जीवन में बाद में होने वाले ऐसे दूसरे विवाह का संकेत दे सकती है जो अधिक गंभीर और ज़िम्मेदारी भरा हो।'
          }
        ]
      },
      {
        id:     'advanced-indicators',
        title:  'Advanced Indicators: Darakaraka, Upapada Lagna, and Navamsa',
        title_hi: 'उन्नत संकेतक: दारकारक, उपपद लग्न और नवांश',
        layout: 'list',
        items:  [
          {
            id:    'navamsa',
            label: 'Navamsa (D9)',
            label_hi: 'नवांश (D9)',
            body:  'The Navamsa is an important supporting layer. If the Rashi chart shows potential for a second marriage, astrologers look for the Navamsa to corroborate it, examining the 7th house and its lord in the D9 for indications of a second spouse.',
            body_hi: 'नवांश एक महत्वपूर्ण सहायक स्तर है। यदि राशि कुंडली दूसरे विवाह की संभावना दिखाए, तो ज्योतिषी नवांश में इसकी पुष्टि देखते हैं — दूसरे जीवनसाथी के संकेतों के लिए D9 में सप्तम भाव और सप्तमेश का विश्लेषण करते हैं।'
          },
          {
            id:    'darakaraka',
            label: 'Darakaraka (DK)',
            label_hi: 'दारकारक (DK)',
            body:  'In the Jaimini system, the DK is the planet of the spouse. If the DK is in a dual sign or receives aspects from multiple planets, it is traditionally read as indicating the potential for more than one marital experience.',
            body_hi: 'जैमिनी पद्धति में दारकारक जीवनसाथी का ग्रह है। यदि दारकारक द्विस्वभाव राशि में हो या उस पर कई ग्रहों की दृष्टि हो, तो इसे परंपरागत रूप से एक से अधिक वैवाहिक अनुभवों की संभावना का संकेत माना जाता है।'
          },
          {
            id:    'upapada-lagna',
            label: 'Upapada Lagna (UL)',
            label_hi: 'उपपद लग्न (UL)',
            body:  'The UL represents the marriage itself. Studying the UL in the Rashi chart is critical for understanding the nature, strength, and longevity of the specific marital promise.',
            body_hi: 'उपपद लग्न स्वयं विवाह का प्रतिनिधित्व करता है। विवाह के संकेतों की प्रकृति, शक्ति और स्थायित्व समझने के लिए राशि कुंडली में उपपद लग्न का अध्ययन महत्वपूर्ण है।'
          }
        ]
      },
      {
        id:     'timing-dashas-transits',
        title:  'Timing the Event: Dashas and Transits',
        title_hi: 'समय का विश्लेषण: दशा और गोचर',
        layout: 'list',
        items:  [
          {
            id:    'dasha-indications',
            label: 'Dasha Indications',
            label_hi: 'दशा संकेत',
            body:  'When a second-marriage indication is present, astrologers look to the Dasha or Bhukti of the 2nd lord, the 9th lord, or planets strongly connected to these houses as the periods when it may become active. A Dasha shows when themes are emphasised, not a fixed date — and a supportive period does not by itself mean a new marriage will take place.',
            body_hi: 'जब दूसरे विवाह का संकेत हो, तो ज्योतिषी द्वितीयेश, नवमेश या इन भावों से मज़बूती से जुड़े ग्रहों की दशा या भुक्ति को वह समय मानते हैं जब यह सक्रिय हो सकता है। दशा बताती है कि कौन-से विषय किस समय प्रमुख होंगे, कोई तय तारीख नहीं — और सहायक दशा अकेले यह नहीं बताती कि नया विवाह होगा ही।'
          },
          {
            id:    'transit-indications',
            label: 'Transit Indications',
            label_hi: 'गोचर संकेत',
            body:  'Transits are read as the final triggers within a supportive Dasha. Jupiter’s transit over the 2nd or 9th house is traditionally associated with a new partner entering one’s life, but transits are interpreted only alongside the Dasha and the natal chart.',
            body_hi: 'सहायक दशा के भीतर गोचर अंतिम सक्रियता का काम करते हैं। द्वितीय या नवम भाव पर गुरु के गोचर को परंपरागत रूप से जीवन में नए साथी के आने से जोड़ा जाता है, लेकिन गोचर को हमेशा दशा और जन्मकुंडली के साथ ही पढ़ा जाता है।'
          }
        ]
      },
      {
        id:     'separation-divorce',
        title:  'Separation, Divorce, and Second Marriage',
        title_hi: 'अलगाव, तलाक और दूसरा विवाह',
        layout: 'list',
        items:  [
          {
            id:    'distinction',
            label: 'Distinguishing the Stages',
            label_hi: 'चरणों में अंतर',
            body:  'Astrologers distinguish between separation, divorce, and the possibility of a second marriage. Separation can be temporary; divorce is the legal end of a marriage; and a second marriage can also follow widowhood, or appear as an indication in a chart where no marriage has ended at all. Second-marriage indications describe a possibility of a later union — they do not predict a divorce and are not a reason to leave a present relationship.',
            body_hi: 'ज्योतिषी अलगाव, तलाक और दूसरे विवाह की संभावना में अंतर करते हैं। अलगाव अस्थायी हो सकता है; तलाक विवाह का कानूनी अंत है; और दूसरा विवाह जीवनसाथी के निधन के बाद भी हो सकता है, या ऐसी कुंडली में भी संकेत के रूप में दिख सकता है जहाँ कोई विवाह समाप्त नहीं हुआ। दूसरे विवाह के संकेत बाद के संबंध की संभावना बताते हैं — वे तलाक की भविष्यवाणी नहीं करते और वर्तमान संबंध छोड़ने का कारण नहीं हैं।'
          }
        ]
      },
      {
        id:     'ethical-interpretation',
        title:  'Ethical Interpretation',
        title_hi: 'नैतिक व्याख्या',
        layout: 'list',
        items:  [
          {
            id:    'astrologer-ethics',
            label: 'Astrological Responsibility',
            label_hi: 'ज्योतिषीय जिम्मेदारी',
            body:  'As astrologers, we must approach this topic with the highest degree of ethics. Discussing a second marriage is not about encouraging the dissolution of the first. It is about providing clarity on an individual\'s karmic path. We must provide insights that empower the individual to understand their past experiences and to move forward with wisdom, whether that path leads to a second marriage or to a fulfilled life on their own.',
            body_hi: 'ज्योतिषियों के रूप में, हमें इस विषय को नैतिकता के उच्चतम स्तर के साथ देखना चाहिए। दूसरे विवाह पर चर्चा करना पहले विवाह के विघटन को प्रोत्साहित करने के बारे में नहीं है। यह किसी व्यक्ति के कार्मिक पथ पर स्पष्टता प्रदान करने के बारे में है। हमें ऐसी अंतर्दृष्टि प्रदान करनी चाहिए जो व्यक्ति को अपने पिछले अनुभवों को समझने और ज्ञान के साथ आगे बढ़ने के लिए सशक्त बनाए, चाहे वह मार्ग दूसरे विवाह की ओर ले जाए या अपने आप में पूर्ण जीवन की ओर।'
          }
        ]
      },
      {
        id:     'common-misconceptions',
        title:  'Common Misconceptions',
        title_hi: 'सामान्य भ्रांतियां',
        layout: 'list',
        items:  [
          {
            id:    'multiple-planets',
            label: 'Multiple Planets in the 7th House',
            label_hi: 'सप्तम भाव में कई ग्रह',
            body:  'It indicates a complex marital experience, which might mean multiple partners, or simply a complex relationship dynamic.',
            body_hi: 'यह एक जटिल वैवाहिक अनुभव का संकेत देता है, जिसका अर्थ एक से अधिक साथी भी हो सकता है, या केवल एक जटिल रिश्ता।'
          },
          {
            id:    'better-second-marriage',
            label: 'A Second Marriage is Always Better',
            label_hi: 'दूसरा विवाह हमेशा बेहतर होता है',
            body:  'The success of a second marriage depends on the individual\'s growth from past karmic lessons and the planetary promise of the second union itself.',
            body_hi: 'दूसरे विवाह की सफलता इस बात पर निर्भर करती है कि व्यक्ति ने पिछले अनुभवों से कितना सीखा है और स्वयं दूसरे विवाह के ग्रह संकेत कैसे हैं।'
          }
        ]
      },
      {
        id:     'practical-remedies',
        title:  'Practical Remedies',
        title_hi: 'व्यावहारिक उपाय',
        layout: 'list',
        items:  [
          {
            id:    'service',
            label: 'Service and Charity',
            label_hi: 'सेवा और दान',
            body:  'Performing acts of selfless service is traditionally regarded as a powerful remedy for easing the karmic weight that can accompany the end of a marriage.',
            body_hi: 'निस्वार्थ सेवा को परंपरागत रूप से उस कार्मिक भार को हल्का करने का प्रभावी उपाय माना जाता है जो विवाह के अंत के साथ आ सकता है।'
          },
          {
            id:    'mantra-japa',
            label: 'Mantra Japa',
            label_hi: 'मंत्र जप',
            body:  'Chanting Mantras related to Jupiter (for wisdom) or Venus (for devotion) helps in purifying the mind and cultivating the emotional stability required for a healthy partnership.',
            body_hi: 'गुरु (ज्ञान के लिए) या शुक्र (भक्ति के लिए) से संबंधित मंत्रों का जाप मन को शुद्ध करने और एक स्वस्थ साझेदारी के लिए आवश्यक भावनात्मक स्थिरता विकसित करने में मदद करता है।'
          },
          {
            id:    'self-reflection',
            label: 'Self-Development',
            label_hi: 'आत्म-विकास',
            body:  'The most practical "remedy" is to engage in deep self-reflection to understand the lessons of the first union, ensuring that the same mistakes are not repeated.',
            body_hi: 'सबसे व्यावहारिक "उपाय" पहले विवाह की सीख को समझने के लिए गहरा आत्म-चिंतन है, ताकि वही गलतियाँ न दोहराई जाएँ।'
          }
        ]
      },
      {
        id:     'summary',
        title:  'Summary',
        title_hi: 'सारांश',
        layout: 'list',
        items:  [
          {
            id:    'summary-body',
            label: 'Understanding the Karmic Journey',
            label_hi: 'कार्मिक यात्रा को समझना',
            body:  'Vedic Astrology reads a second marriage as a complex karmic theme rather than a mere matter of choice — though real-life circumstances and decisions always play their part. Astrologers look for it in the natal chart, check it in the Navamsa (D9), and relate it to the Dasha-Bhukti sequence. By understanding the roles of the 7th, 2nd, and 9th houses, the influence of planets like Rahu, Saturn, and Jupiter, and the timing of events, we gain meaningful insights — as tendencies, not certainties. The goal of this analysis is not just prediction, but empowerment—helping the individual understand their karmic journey and move toward future partnerships with wisdom, clarity, and emotional maturity.',
            body_hi: 'वैदिक ज्योतिष दूसरे विवाह को केवल एक विकल्प नहीं, बल्कि एक जटिल कार्मिक विषय के रूप में देखता है — हालांकि जीवन की वास्तविक परिस्थितियाँ और निर्णय हमेशा भूमिका निभाते हैं। ज्योतिषी इसे जन्मकुंडली में देखते हैं, नवांश (D9) में इसकी पुष्टि करते हैं और दशा-भुक्ति के क्रम से जोड़ते हैं। सप्तम, द्वितीय और नवम भाव की भूमिका, राहु, शनि और गुरु जैसे ग्रहों के प्रभाव और घटनाओं के समय को समझकर सार्थक अंतर्दृष्टि मिलती है — प्रवृत्तियों के रूप में, निश्चितता के रूप में नहीं। इस विश्लेषण का लक्ष्य केवल भविष्यवाणी नहीं, बल्कि सशक्तिकरण है — व्यक्ति को अपनी कार्मिक यात्रा समझने और समझदारी, स्पष्टता व भावनात्मक परिपक्वता के साथ भविष्य के संबंधों की ओर बढ़ने में मदद करना।'
          }
        ]
      },
      {
        id:     'faq-section',
        title:  'Frequently Asked Questions',
        title_hi: 'अक्सर पूछे जाने वाले प्रश्न',
        layout: 'faq',
        items:  [
          { id: 'faq-1', label: 'Does every divorce guarantee a second marriage?', label_hi: 'क्या हर तलाक दूसरे विवाह की गारंटी देता है?', body: 'No. Astrologers look for a specific indication of a later union in the natal chart, activated by a supportive Dasha period — and personal choice still decides whether someone remarries.', body_hi: 'नहीं। ज्योतिषी जन्मकुंडली में बाद के विवाह का विशेष संकेत और उसे सक्रिय करने वाली सहायक दशा देखते हैं — और व्यक्ति दोबारा विवाह करेगा या नहीं, यह उसका अपना निर्णय भी है।' },
          { id: 'faq-2', label: 'How can I tell if my second marriage will be successful?', label_hi: 'मैं कैसे बता सकता हूँ कि मेरा दूसरा विवाह सफल होगा?', body: 'By analyzing the 9th house, its lord, and the strength of the 7th house and its lord in the Navamsa chart, an experienced astrologer can describe supportive and challenging tendencies — not a guaranteed outcome.', body_hi: 'नवम भाव, नवमेश और नवांश में सप्तम भाव व सप्तमेश की शक्ति का विश्लेषण करके एक अनुभवी ज्योतिषी सहायक और चुनौतीपूर्ण प्रवृत्तियाँ बता सकता है — कोई निश्चित परिणाम नहीं।' },
          { id: 'faq-3', label: 'Is the 9th house definitely the house of the second spouse?', label_hi: 'क्या नवम भाव निश्चित रूप से दूसरे जीवनसाथी का भाव है?', body: 'Not definitely. Many traditional astrologers use the 9th house (the 3rd from the 7th) for the second spouse, but others also examine the 2nd house, and the 7th house and the Navamsa remain essential. It is one widely used approach, not a universal rule.', body_hi: 'निश्चित रूप से नहीं। कई पारंपरिक ज्योतिषी दूसरे जीवनसाथी के लिए नवम भाव (सप्तम से तीसरा) देखते हैं, लेकिन कुछ द्वितीय भाव भी देखते हैं, और सप्तम भाव व नवांश हमेशा आवश्यक रहते हैं। यह एक व्यापक रूप से प्रयुक्त पद्धति है, कोई सार्वभौमिक नियम नहीं।' },
          { id: 'faq-4', label: 'Can a strong Jupiter mitigate the challenges of a second marriage?', label_hi: 'क्या एक मजबूत गुरु दूसरे विवाह की चुनौतियों को कम कर सकता है?', body: 'It can help. A strong Jupiter is traditionally read as bringing the wisdom, maturity and perspective needed to learn from past experiences and build a more stable partnership.', body_hi: 'यह मदद कर सकता है। मज़बूत गुरु को परंपरागत रूप से बीते अनुभवों से सीखने और अधिक स्थिर साझेदारी बनाने के लिए आवश्यक समझ, परिपक्वता और दृष्टिकोण देने वाला माना जाता है।' },
          { id: 'faq-5', label: 'How does Rahu in the 7th house affect the possibility of a second marriage?', label_hi: 'सप्तम भाव में राहु दूसरे विवाह की संभावना को कैसे प्रभावित करता है?', body: 'Rahu in the 7th house is traditionally associated with volatility and unconventional experiences in marriage. Astrologers may read it as increasing the tendency toward an unconventional or later union, but it does not by itself mean that a first marriage will end.', body_hi: 'सप्तम भाव में राहु को परंपरागत रूप से विवाह में अस्थिरता और अपरंपरागत अनुभवों से जोड़ा जाता है। ज्योतिषी इसे अपरंपरागत या बाद के संबंध की प्रवृत्ति बढ़ाने वाला मान सकते हैं, लेकिन यह अकेले यह नहीं बताता कि पहला विवाह समाप्त होगा।' },
          { id: 'faq-6', label: 'Can remedies change a second-marriage indication?', label_hi: 'क्या उपायों से दूसरे विवाह का संकेत बदल सकता है?', body: 'Remedies help in preparing the mind and easing karmic weight, but they do not create a second marriage that the chart does not indicate — and they are not meant to end or replace a present relationship.', body_hi: 'उपाय मन को तैयार करने और कार्मिक भार को हल्का करने में मदद करते हैं, लेकिन जिस दूसरे विवाह का संकेत कुंडली में न हो, उसे वे नहीं बनाते — और उनका उद्देश्य किसी वर्तमान संबंध को समाप्त करना या बदलना नहीं है।' },
          { id: 'faq-7', label: 'Can second-marriage indications appear without a prior divorce?', label_hi: 'क्या बिना तलाक के भी कुंडली में दूसरे विवाह के योग दिख सकते हैं?', body: 'Yes. Later-union indications are read from the chart itself, so they can appear in the charts of people who are single, married or widowed. They describe a possibility in the chart; they do not predict that a present marriage will end, and a second marriage can also follow the death of a spouse.', body_hi: 'हाँ। बाद के विवाह के संकेत कुंडली से ही पढ़े जाते हैं, इसलिए वे अविवाहित, विवाहित या विधवा/विधुर — किसी की भी कुंडली में दिख सकते हैं। ये कुंडली में एक संभावना बताते हैं; ये भविष्यवाणी नहीं करते कि वर्तमान विवाह समाप्त होगा, और दूसरा विवाह जीवनसाथी के निधन के बाद भी हो सकता है।' },
          { id: 'faq-8', label: 'Can astrology predict the exact date of a second marriage?', label_hi: 'क्या ज्योतिष दूसरे विवाह की सटीक तारीख बता सकता है?', body: 'No. Dasha periods and transits show when later-union themes may be more active, but they do not give an exact date, month or age. A supportive period is a window of possibility, not a fixed event.', body_hi: 'नहीं। दशाएँ और गोचर बताते हैं कि बाद के विवाह से जुड़े विषय कब अधिक सक्रिय हो सकते हैं, लेकिन वे कोई सटीक तारीख, महीना या उम्र नहीं देते। सहायक समय एक संभावना की अवधि है, कोई तय घटना नहीं।' },
          { id: 'faq-9', label: 'What is the main difference between a first and second marriage in the chart?', label_hi: 'चार्ट में पहले और दूसरे विवाह में मुख्य अंतर क्या है?', body: 'The first marriage is primarily indicated by the 7th house and its lord; the second is traditionally studied through the 9th or 2nd house, depending on the approach, together with the Navamsa chart’s indications for a second partner.', body_hi: 'पहला विवाह मुख्य रूप से सप्तम भाव और सप्तमेश से देखा जाता है; दूसरा विवाह पद्धति के अनुसार परंपरागत रूप से नवम या द्वितीय भाव से, और नवांश में दूसरे साथी के संकेतों के साथ देखा जाता है।' },
          { id: 'faq-10', label: 'How long should one wait before pursuing a second marriage?', label_hi: 'दूसरे विवाह के लिए आगे बढ़ने से पहले व्यक्ति को कितने समय तक इंतजार करना चाहिए?', body: 'There is no fixed time frame. The decision should be made when the individual has gained clarity and emotional maturity, supported by the timing indicated in their Dasha sequence.', body_hi: 'कोई निश्चित समय सीमा नहीं है। निर्णय तब लेना चाहिए जब व्यक्ति में स्पष्टता और भावनात्मक परिपक्वता आ जाए; दशा का संकेतित समय इसमें सहायक संदर्भ दे सकता है।' }
        ]
      }
    ],
    ctas: [
      {
        id:             'cta-marriage-path',
        type:           'tool',
        slug:           'marriage-path',
        label:          'Explore Your General Marriage Indicators',
        label_hi:       'अपने सामान्य विवाह संकेत देखें',
        description:    'A free general check — the planets in your 7th house, Venus and Jupiter, and the strongest influence on your marriage. It is not a second-marriage calculator.',
        description_hi: 'एक फ्री सामान्य जाँच — सप्तम भाव के ग्रह, शुक्र और गुरु, और विवाह पर सबसे प्रबल प्रभाव। यह दूसरे विवाह की गणना करने वाला टूल नहीं है।',
        variant:        'secondary',
      },
      // The Second Marriage Report is the landing's primary card (_landing.ts); no duplicate bottom report CTA.
    ],
  },

  aiMetadata: {
    searchIntent:  'informational',
    difficulty:    'beginner',
    authorityLevel: 'expert',
  },

  schemaSignals: {
    expertise: 'Analysis of complex karmic patterns in Vedic Astrology regarding marital dissolution and subsequent unions.',
  },

  authority: {
    reviewStatus:   'approved',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },

}
