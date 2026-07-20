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
    robots:          'noindex,follow',
  },

  hero: {
    headline:    'Second Marriage in Vedic Astrology',
    headline_hi: 'वैदिक ज्योतिष में दूसरा विवाह',
    subtext:     'Analyze the karmic promise, planetary conditions, and Dasha-Bhukti timing for a second marital union in Vedic Astrology.',
    subtext_hi:  'वैदिक ज्योतिष में दूसरे विवाह के लिए कार्मिक वादा, ग्रह स्थिति और दशा-भुक्ति समय का विश्लेषण करें।',
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
        title_hi: 'ज्योतिषीय वादा बनाम संभावना',
        layout: 'list',
        items:  [
          {
            id:    'karmic-potential',
            label: 'Understanding Karmic Potential',
            label_hi: 'कार्मिक क्षमता को समझना',
            body:  'First and foremost, we must distinguish between the promise of marriage and the possibility of a second one. Every chart has a baseline karmic potential for partnership. Whether that manifests as one union, two, or none at all is determined by the specific strength of the marital houses and the Dasha-Bhukti sequence.',
            body_hi: 'सबसे पहले, हमें विवाह के वादे और दूसरे विवाह की संभावना के बीच अंतर करना चाहिए। प्रत्येक चार्ट में साझेदारी के लिए एक आधारभूत कार्मिक क्षमता होती है। यह एक मिलन, दो, या बिल्कुल नहीं के रूप में प्रकट होता है, यह वैवाहिक घरों और दशा-भुक्ति अनुक्रम की विशिष्ट शक्ति द्वारा निर्धारित किया जाता है।'
          },
          {
            id:    'karmic-outcome',
            label: 'Second Marriage as a Karmic Outcome',
            label_hi: 'एक कार्मिक परिणाम के रूप में दूसरा विवाह',
            body:  'A second marriage is not a universal right or a guarantee; it is a specific karmic outcome. If the natal promise for partnership is strong, but the first union is destined to conclude due to severe afflictions, the potential for a second union is elevated.',
            body_hi: 'दूसरा विवाह कोई सार्वभौमिक अधिकार या गारंटी नहीं है; यह एक विशिष्ट कार्मिक परिणाम है। यदि साझेदारी के लिए जन्म का वादा मजबूत है, लेकिन गंभीर कष्टों के कारण पहला मिलन समाप्त होने के लिए नियत है, तो दूसरे मिलन की संभावना बढ़ जाती है।'
          }
        ]
      },
      {
        id:     'key-house-analysis',
        title:  'Key House Analysis',
        title_hi: 'प्रमुख घर विश्लेषण',
        layout: 'accordion',
        items:  [
          {
            id:    '7th-house',
            label: 'The 7th House and its Role',
            label_hi: 'सप्तम भाव और इसकी भूमिका',
            body:  'The 7th House is the primary seat of the first marriage. When evaluating a second union, the 7th house, its lord, and its Karaka (significator) still hold weight, as they set the precedent for the individual\'s approach to partnership.',
            body_hi: 'सप्तम भाव पहले विवाह की प्राथमिक सीट है। दूसरे मिलन का मूल्यांकन करते समय, सप्तम भाव, उसके स्वामी और उसके कारक (संकेतक) अभी भी महत्वपूर्ण हैं, क्योंकि वे साझेदारी के प्रति व्यक्ति के दृष्टिकोण के लिए मिसाल कायम करते हैं।'
          },
          {
            id:    '2nd-house',
            label: 'The 2nd House: The House of Family Continuity',
            label_hi: 'दूसरा भाव: परिवार निरंतरता का घर',
            body:  'The 2nd House represents Kutumba (family unit) and is considered the 8th house from the 7th house. In some traditional methodologies, the 2nd House is considered the primary house of the second marriage, indicating the end of the first, and a new beginning in terms of family.',
            body_hi: 'दूसरा भाव कुटुम्ब (परिवार इकाई) का प्रतिनिधित्व करता है और इसे सप्तम भाव से अष्टम भाव माना जाता है। कुछ पारंपरिक पद्धतियों में, दूसरे भाव को दूसरे विवाह का प्राथमिक घर माना जाता है, जो पहले के अंत और परिवार के संदर्भ में एक नई शुरुआत का संकेत देता है।'
          },
          {
            id:    '8th-house',
            label: 'The 8th House: Marital Transformation',
            label_hi: 'अष्टम भाव: वैवाहिक परिवर्तन',
            body:  'The 8th house represents transformation, sudden changes, and the secrets of marital life. Its influence is paramount when analyzing the dissolution of a first union and the potential for a transformative, or unconventional, second partnership.',
            body_hi: 'अष्टम भाव परिवर्तन, अचानक बदलाव और वैवाहिक जीवन के रहस्यों का प्रतिनिधित्व करता है। पहले मिलन के विघटन और एक परिवर्तनकारी, या अपरंपरागत, दूसरे साझेदारी की संभावना का विश्लेषण करते समय इसका प्रभाव सर्वोपरि है।'
          },
          {
            id:    '9th-house',
            label: 'The 9th House: The Second Spouse',
            label_hi: 'नवम भाव: दूसरा जीवनसाथी',
            body:  'In advanced Vedic analysis, the 9th house is often studied as the house representing the second spouse. The strength of the 9th lord and planets occupying the 9th house provides essential clues about the nature and stability of a second partner.',
            body_hi: 'उन्नत वैदिक विश्लेषण में, नवम भाव का अध्ययन अक्सर दूसरे जीवनसाथी का प्रतिनिधित्व करने वाले घर के रूप में किया जाता है। नवम स्वामी की शक्ति और नवम भाव में स्थित ग्रह दूसरे साथी की प्रकृति और स्थिरता के बारे में आवश्यक सुराग प्रदान करते हैं।'
          },
          {
            id:    '11th-house',
            label: 'The 11th House: Fulfillment of Desires',
            label_hi: 'एकादश भाव: इच्छाओं की पूर्ति',
            body:  'The 11th house, as the house of gains and fulfillment of desires, often indicates the success of subsequent partnerships. Its connection to the 2nd or 9th houses can strongly indicate the manifestation of a second marriage.',
            body_hi: 'एकादश भाव, लाभ और इच्छाओं की पूर्ति के घर के रूप में, अक्सर बाद की साझेदारी की सफलता का संकेत देता है। दूसरे या नवम भाव से इसका संबंध दूसरे विवाह की अभिव्यक्ति का दृढ़ता से संकेत दे सकता है।'
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
            body_hi: 'गुरु अतीत की गलतियों से सीखने के लिए ज्ञान का प्रतिनिधित्व करता है। दूसरे या नवम भाव को देखने वाला एक मजबूत गुरु एक सफल दूसरे विवाह में स्थिर कारक हो सकता है।'
          },
          {
            id:    'mars',
            label: 'Mars',
            label_hi: 'मंगल',
            body:  'Mars represents energy and passion. Its affliction to the 7th or 8th house is often a driver behind the volatility that leads to the dissolution of the first union, and subsequently, it can drive the search for a second.',
            body_hi: 'मंगल ऊर्जा और जुनून का प्रतिनिधित्व करता है। 7वें या 8वें भाव पर इसका कष्ट अक्सर उस अस्थिरता के पीछे का चालक होता है जो पहले मिलन के विघटन की ओर ले जाता है, और बाद में, यह दूसरे की तलाश को प्रेरित कर सकता है।'
          },
          {
            id:    'rahu-ketu',
            label: 'Rahu and Ketu',
            label_hi: 'राहु और केतु',
            body:  'Rahu, the planet of obsession and unconventionality, when influencing the 7th, 8th, or 9th houses, often points towards an unconventional or late-life second marriage. Ketu brings detachment, and its influence can either be the cause of the first marriage\'s end or a factor in the unique nature of a second union.',
            body_hi: 'राहु, जुनून और अपरंपरागतता का ग्रह, जब 7वें, 8वें, या 9वें भाव को प्रभावित करता है, तो अक्सर एक अपरंपरागत या जीवन के अंतिम दौर में दूसरे विवाह की ओर इशारा करता है। केतु वैराग्य लाता है, और इसका प्रभाव या तो पहले विवाह के अंत का कारण हो सकता है या दूसरे मिलन की अनूठी प्रकृति का एक कारक हो सकता है।'
          },
          {
            id:    'saturn',
            label: 'Saturn',
            label_hi: 'शनि',
            body:  'Saturn is the planet of endurance. While it often brings delay, its placement in the 7th or 9th house can indicate a second marriage that occurs later in life, characterized by a more serious or restrictive nature.',
            body_hi: 'शनि सहनशक्ति का ग्रह है। हालांकि यह अक्सर देरी लाता है, 7वें या 9वें घर में इसकी स्थिति एक ऐसे दूसरे विवाह का संकेत दे सकती है जो जीवन में बाद में होता है, और जो अधिक गंभीर या प्रतिबंधात्मक प्रकृति का होता है।'
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
            body:  'The Navamsa is the ultimate arbiter. If the Rashi chart shows potential for a second marriage, the Navamsa must corroborate this. Analyze the 7th house and its lord in the D9 specifically for the indicators of the second spouse.',
            body_hi: 'नवांश अंतिम निर्णायक है। यदि राशि चार्ट दूसरे विवाह की संभावना दिखाता है, तो नवांश को इसकी पुष्टि करनी चाहिए। विशेष रूप से दूसरे जीवनसाथी के संकेतकों के लिए D9 में 7वें घर और उसके स्वामी का विश्लेषण करें।'
          },
          {
            id:    'darakaraka',
            label: 'Darakaraka (DK)',
            label_hi: 'दारकारक (DK)',
            body:  'In the Jaimini system, the DK is the planet of the spouse. If the DK is in a dual sign or receives aspects from multiple planets, it indicates the potential for multiple marital experiences.',
            body_hi: 'जैमिनी प्रणाली में, DK जीवनसाथी का ग्रह है। यदि DK दोहरे संकेत में है या कई ग्रहों से पहलू प्राप्त करता है, तो यह कई वैवाहिक अनुभवों की संभावना का संकेत देता है।'
          },
          {
            id:    'upapada-lagna',
            label: 'Upapada Lagna (UL)',
            label_hi: 'उपपद लग्न (UL)',
            body:  'The UL represents the marriage itself. Studying the UL in the Rashi chart is critical for understanding the nature, strength, and longevity of the specific marital promise.',
            body_hi: 'UL स्वयं विवाह का प्रतिनिधित्व करता है। राशि चार्ट में UL का अध्ययन विशिष्ट वैवाहिक वादे की प्रकृति, शक्ति और दीर्घायु को समझने के लिए महत्वपूर्ण है।'
          }
        ]
      },
      {
        id:     'timing-dashas-transits',
        title:  'Timing the Event: Dashas and Transits',
        title_hi: 'घटना का समय: दशाएं और गोचर',
        layout: 'list',
        items:  [
          {
            id:    'dasha-indications',
            label: 'Dasha Indications',
            label_hi: 'दशा संकेत',
            body:  'A second marriage usually manifests during the Dasha or Bhukti of the 2nd lord, 9th lord, or planets strongly connected to these houses.',
            body_hi: 'दूसरा विवाह आमतौर पर दूसरे स्वामी, नवम स्वामी, या इन घरों से मजबूती से जुड़े ग्रहों की दशा या भुक्ति के दौरान प्रकट होता है।'
          },
          {
            id:    'transit-indications',
            label: 'Transit Indications',
            label_hi: 'गोचर संकेत',
            body:  'Transits are the final triggers. The transit of Jupiter over the 2nd or 9th house is frequently the catalyst that brings a second partner into one\'s life.',
            body_hi: 'गोचर अंतिम ट्रिगर हैं। दूसरे या नवम भाव पर गुरु का गोचर अक्सर वह उत्प्रेरक होता है जो किसी के जीवन में दूसरे साथी को लाता है।'
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
            body:  'It is vital to distinguish between separation, divorce, and the possibility of a second marriage. Separation can be temporary, while divorce is the legal and karmic dissolution of the union. A second marriage is the manifestation of a new karmic contract. The chart must clearly indicate the dissolution of the first before the potential for a second can be realistically assessed.',
            body_hi: 'अलगाव, तलाक और दूसरे विवाह की संभावना के बीच अंतर करना महत्वपूर्ण है। अलगाव अस्थायी हो सकता है, जबकि तलाक मिलन का कानूनी और कार्मिक विघटन है। दूसरा विवाह एक नए कार्मिक अनुबंध की अभिव्यक्ति है। दूसरे की संभावना का यथार्थवादी आकलन करने से पहले चार्ट को स्पष्ट रूप से पहले के विघटन का संकेत देना चाहिए।'
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
            body_hi: 'यह एक जटिल वैवाहिक अनुभव को इंगित करता है, जिसका अर्थ कई साथी, या केवल एक जटिल संबंध गतिशील हो सकता है।'
          },
          {
            id:    'better-second-marriage',
            label: 'A Second Marriage is Always Better',
            label_hi: 'दूसरा विवाह हमेशा बेहतर होता है',
            body:  'The success of a second marriage depends on the individual\'s growth from past karmic lessons and the planetary promise of the second union itself.',
            body_hi: 'दूसरे विवाह की सफलता पिछले कार्मिक पाठों से व्यक्ति के विकास और स्वयं दूसरे मिलन के ग्रह वादे पर निर्भर करती है।'
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
            body:  'Performing acts of selfless service is the most potent remedy for alleviating the heavy karmic debt that often accompanies marital dissolution.',
            body_hi: 'निस्वार्थ सेवा के कार्य करना उस भारी कार्मिक ऋण को कम करने के लिए सबसे शक्तिशाली उपाय है जो अक्सर वैवाहिक विघटन के साथ होता है।'
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
            body_hi: 'सबसे व्यावहारिक "उपाय" पहले मिलन के पाठों को समझने के लिए आत्म-चिंतन में संलग्न होना है, यह सुनिश्चित करना कि वही गलतियाँ न दोहराई जाएं।'
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
            body:  'A second marriage in Vedic Astrology is a complex karmic manifestation, far removed from being a mere choice. It is deeply rooted in the natal chart, confirmed by the Navamsa (D9), and triggered by the Dasha-Bhukti sequence. By understanding the roles of the 7th, 2nd, and 9th houses, the influence of planets like Rahu, Saturn, and Jupiter, and the precise timing of events, we gain profound insights. The goal of this analysis is not just prediction, but empowerment—helping the individual understand their karmic journey and move toward future partnerships with wisdom, clarity, and emotional maturity.',
            body_hi: 'वैदिक ज्योतिष में दूसरा विवाह एक जटिल कार्मिक अभिव्यक्ति है, जो केवल एक विकल्प होने से बहुत दूर है। यह जन्म चार्ट में गहराई से निहित है, नवांश (D9) द्वारा पुष्टि की गई है, और दशा-भुक्ति अनुक्रम द्वारा ट्रिगर की गई है। 7वें, 2वें और 9वें भाव की भूमिकाओं, राहु, शनि और गुरु जैसे ग्रहों के प्रभाव और घटनाओं के सटीक समय को समझकर, हम गहन अंतर्दृष्टि प्राप्त करते हैं। इस विश्लेषण का लक्ष्य केवल भविष्यवाणी नहीं, बल्कि सशक्तिकरण है—व्यक्ति को उनकी कार्मिक यात्रा को समझने में मदद करना और ज्ञान, स्पष्टता और भावनात्मक परिपक्वता के साथ भविष्य की साझेदारी की ओर बढ़ना।'
          }
        ]
      },
      {
        id:     'faq-section',
        title:  'Frequently Asked Questions',
        title_hi: 'अक्सर पूछे जाने वाले प्रश्न',
        layout: 'faq',
        items:  [
          { id: 'faq-1', label: 'Does every divorce guarantee a second marriage?', label_hi: 'क्या हर तलाक दूसरे विवाह की गारंटी देता है?', body: 'No. A second marriage must be specifically promised by the natal chart and triggered by the correct Dasha sequence.', body_hi: 'नहीं। दूसरे विवाह का जन्म चार्ट द्वारा विशेष रूप से वादा किया जाना चाहिए और सही दशा अनुक्रम द्वारा ट्रिगर किया जाना चाहिए।' },
          { id: 'faq-2', label: 'How can I tell if my second marriage will be successful?', label_hi: 'मैं कैसे बता सकता हूँ कि मेरा दूसरा विवाह सफल होगा?', body: 'By analyzing the 9th house, its lord, and the strength of the 7th house/lord in the Navamsa chart, an experienced astrologer can provide insights.', body_hi: 'नवम भाव, इसके स्वामी और नवांश चार्ट में सप्तम भाव/स्वामी की शक्ति का विश्लेषण करके, एक अनुभवी ज्योतिषी अंतर्दृष्टि प्रदान कर सकते हैं।' },
          { id: 'faq-3', label: 'Is the 9th house definitely the house of the second spouse?', label_hi: 'क्या नवम भाव निश्चित रूप से दूसरे जीवनसाथी का घर है?', body: 'It is a widely accepted principle in traditional Vedic astrology, as it represents the partner following the first.', body_hi: 'यह पारंपरिक वैदिक ज्योतिष में व्यापक रूप से स्वीकृत सिद्धांत है, क्योंकि यह पहले के बाद आने वाले साथी का प्रतिनिधित्व करता है।' },
          { id: 'faq-4', label: 'Can a strong Jupiter mitigate the challenges of a second marriage?', label_hi: 'क्या एक मजबूत गुरु दूसरे विवाह की चुनौतियों को कम कर सकता है?', body: 'Absolutely. A strong Jupiter brings the wisdom, maturity, and perspective necessary to learn from past failures and build a more stable partnership.', body_hi: 'बिल्कुल। एक मजबूत गुरु पिछली असफलताओं से सीखने और अधिक स्थिर साझेदारी बनाने के लिए आवश्यक ज्ञान, परिपक्वता और परिप्रेक्ष्य लाता है।' },
          { id: 'faq-5', label: 'How does Rahu in the 7th house affect the possibility of a second marriage?', label_hi: 'सप्तम भाव में राहु दूसरे विवाह की संभावना को कैसे प्रभावित करता है?', body: 'Rahu often creates volatility and unconventional experiences, which can lead to the dissolution of a first union and the potential for a complex or unconventional second one.', body_hi: 'राहु अक्सर अस्थिरता और अपरंपरागत अनुभव पैदा करता है, जो पहले मिलन के विघटन और एक जटिल या अपरंपरागत दूसरे की संभावना का कारण बन सकता है।' },
          { id: 'faq-6', label: 'Are remedies effective if the chart indicates a second marriage is destined?', label_hi: 'क्या उपाय प्रभावी हैं यदि चार्ट दूसरे विवाह का संकेत देता है?', body: 'Remedies help in preparing the mind and purifying the karmic energy, but they do not create a second marriage if it is not promised by the natal chart.', body_hi: 'उपाय मन को तैयार करने और कार्मिक ऊर्जा को शुद्ध करने में मदद करते हैं, लेकिन यदि वे जन्म चार्ट द्वारा वादा नहीं किए गए हैं तो वे दूसरा विवाह नहीं बनाते हैं।' },
          { id: 'faq-7', label: 'Why does the 8th house matter so much in marital dissolution?', label_hi: 'वैवाहिक विघटन में अष्टम भाव इतना महत्वपूर्ण क्यों है?', body: 'The 8th house represents transformation and sudden, often disruptive changes; its activation during a Dasha period is frequently linked to the end of a relationship.', body_hi: 'अष्टम भाव परिवर्तन और अचानक, अक्सर विघटनकारी परिवर्तनों का प्रतिनिधित्व करता है; दशा अवधि के दौरान इसकी सक्रियता अक्सर रिश्ते के अंत से जुड़ी होती है।' },
          { id: 'faq-8', label: 'Can a second marriage happen if the first one never officially ended?', label_hi: 'क्या दूसरा विवाह हो सकता है यदि पहला आधिकारिक रूप से समाप्त नहीं हुआ है?', body: 'In the context of Vedic Astrology, we look at the karmic dissolution. If the first union is functionally dead, the potential for a second can manifest, but legal factors in the native\'s life also play a significant role.', body_hi: 'वैदिक ज्योतिष के संदर्भ में, हम कार्मिक विघटन को देखते हैं। यदि पहला मिलन कार्यात्मक रूप से मृत है, तो दूसरे की संभावना प्रकट हो सकती है, लेकिन व्यक्ति के जीवन में कानूनी कारक भी महत्वपूर्ण भूमिका निभाते हैं।' },
          { id: 'faq-9', label: 'What is the main difference between a first and second marriage in the chart?', label_hi: 'चार्ट में पहले और दूसरे विवाह में मुख्य अंतर क्या है?', body: 'The first marriage is primarily indicated by the 7th house and its lord; the second is studied through the 2nd or 9th house, and the Navamsa chart\'s specific indications for a second partner.', body_hi: 'पहला विवाह मुख्य रूप से सप्तम भाव और उसके स्वामी द्वारा इंगित किया जाता है; दूसरा दूसरे या नवम भाव के माध्यम से, और नवांश चार्ट के दूसरे साथी के लिए विशिष्ट संकेतों के माध्यम से अध्ययन किया जाता है।' },
          { id: 'faq-10', label: 'How long should one wait before pursuing a second marriage?', label_hi: 'दूसरे विवाह के लिए आगे बढ़ने से पहले व्यक्ति को कितने समय तक इंतजार करना चाहिए?', body: 'There is no fixed time frame. The decision should be made when the individual has gained clarity and emotional maturity, supported by the timing indicated in their Dasha sequence.', body_hi: 'कोई निश्चित समय सीमा नहीं है। निर्णय तब लिया जाना चाहिए जब व्यक्ति ने स्पष्टता और भावनात्मक परिपक्वता प्राप्त कर ली हो, जो उनके दशा अनुक्रम में इंगित समय द्वारा समर्थित हो।' }
        ]
      }
    ],
    ctas:            [],
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
