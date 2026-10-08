import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const marriagePrediction: DomainTopic = {

  identity: {
    id:         'marriage-astrology:marriage-prediction',
    slug:       'marriage-prediction',
    title:      'Marriage Prediction in Vedic Astrology',
    title_hi:   'वैदिक ज्योतिष में विवाह भविष्यवाणी',
    domain:     'astrology',
    subdomain:  'marriage-astrology',
    category:   'marriage',
    entityType: 'concept',
    status:     'published',
  },

  routing: {
    canonicalPath: '/marriage-astrology/marriage-prediction',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',               href: '/' },
      { label: 'Marriage Astrology',  label_hi: 'विवाह ज्योतिष',    href: '/marriage-astrology' },
      { label: 'Marriage Prediction', label_hi: 'विवाह भविष्यवाणी', href: '/marriage-astrology/marriage-prediction' },
    ],
  },

  seo: {
    metaTitle:       'Marriage Prediction in Vedic Astrology: Houses & Dasha',
    metaDescription: 'Seeking marriage prediction? Explore how Vedic astrology analyzes the 7th house, Venus, Jupiter, and Navamsa to provide insights into marriage timing and compatibility.',
    metaDescription_hi: 'कुंडली से विवाह की भविष्यवाणी कैसे की जाती है — सप्तम भाव, सप्तमेश, शुक्र, गुरु, विवाह योग, दशा और नवांश। जानें विवाह की संभावना के पारंपरिक संकेत, और क्यों कोई योग विवाह की सटीक तारीख तय नहीं करता।',
    robots:          'index,follow',
  },

  hero: {
    headline:    'Marriage Prediction in Vedic Astrology: Reading Your Chart',
    headline_hi: 'वैदिक ज्योतिष में विवाह भविष्यवाणी: अपनी कुंडली को समझना',
    subtext:     'Discover insights into your potential marriage timing, compatibility, and life partner characteristics through the timeless wisdom of Vedic astrology.',
    subtext_hi:  'वैदिक ज्योतिष के कालातीत ज्ञान के माध्यम से अपने संभावित विवाह समय, अनुकूलता और जीवनसाथी की विशेषताओं के बारे में अंतर्दृष्टि प्राप्त करें।',
  },

  taxonomy: {
    tags:        ['marriage-astrology', 'vedic-astrology', 'astrology-prediction'],
    keywords:    ['marriage prediction', 'marriage astrology', 'marriage prediction by date of birth', 'vedic marriage prediction', 'marriage yoga', '7th house marriage', 'marriage timing', 'jyotish marriage analysis'],
    keywords_hi: ['विवाह भविष्यवाणी', 'विवाह ज्योतिष', 'जन्म तिथि के अनुसार विवाह भविष्यवाणी', 'वैदिक विवाह भविष्यवाणी', 'विवाह योग', 'सप्तम भाव विवाह'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'intro',
        title:    'Understanding Marriage Prediction in Vedic Astrology',
        title_hi: 'वैदिक ज्योतिष में विवाह भविष्यवाणी को समझना',
        layout:   'list',
        items: [
          {
            id:       'intro-overview',
            label:    'A Karmic, Probability-Based Guide',
            label_hi: 'एक कार्मिक, संभावना-आधारित मार्गदर्शिका',
            body:     'Marriage in Vedic astrology is not viewed merely as a legal arrangement or a romantic spark; it is seen as a significant karmic partnership, deeply influenced by the planetary configurations present at the time of birth. Grounded in the Sidereal zodiac and the Lahiri Ayanamsha, this sophisticated framework does not dictate a frozen future but rather highlights the energetic trends and karmic themes an individual is likely to encounter — allowing one to move forward with greater consciousness, preparation, and spiritual alignment.',
            body_hi:  'वैदिक ज्योतिष में विवाह को केवल कानूनी व्यवस्था या रोमांटिक आकर्षण के रूप में नहीं देखा जाता; इसे जन्म के समय की ग्रह स्थितियों से गहराई से प्रभावित एक महत्वपूर्ण कार्मिक साझेदारी माना जाता है। यह पद्धति भविष्य को तय नहीं करती, बल्कि उन प्रवृत्तियों और कार्मिक विषयों को उजागर करती है जिनसे व्यक्ति के गुज़रने की संभावना है — ताकि वह अधिक जागरूकता, तैयारी और आत्मिक संतुलन के साथ आगे बढ़ सके।',
          },
          {
            id:       'intro-karmic-lessons',
            label:    'Karmic Lessons',
            label_hi: 'कार्मिक पाठ',
            body:     'The specific lessons regarding partnership, sacrifice, and growth that your soul chose to explore in this lifetime. Marriage astrology reveals the underlying karmic themes encoded in your chart — not as burdens, but as meaningful curriculum for your soul\'s evolution.',
            body_hi:  'साझेदारी, त्याग और विकास से जुड़े वे विशेष पाठ जिन्हें आत्मा ने इस जीवन में सीखने के लिए चुना है। विवाह ज्योतिष कुंडली में छिपे कार्मिक विषयों को बोझ के रूप में नहीं, बल्कि आत्मा के विकास के सार्थक पाठ के रूप में सामने लाता है।',
          },
          {
            id:       'intro-partner-traits',
            label:    'Partner Characteristics',
            label_hi: 'जीवनसाथी की विशेषताएं',
            body:     'The nature, temperament, and strengths of the person you are likely to be drawn to — often described through your Spouse Nature indicators (Darakaraka, 7th house lord). The chart reveals not a specific individual but the archetypal qualities of your most resonant partner.',
            body_hi:  'उस व्यक्ति का स्वभाव, प्रवृत्ति और गुण जिसकी ओर आप आकर्षित हो सकते हैं — जिन्हें अक्सर दारकारक और सप्तमेश जैसे जीवनसाथी के संकेतों से समझा जाता है। कुंडली किसी विशेष व्यक्ति को नहीं, बल्कि आपके लिए सबसे अनुकूल जीवनसाथी के मूल गुणों को दर्शाती है।',
          },
          {
            id:       'intro-timing-energy',
            label:    'Peak Marriage Timing Windows',
            label_hi: 'विवाह के शीर्ष समय की खिड़कियां',
            body:     'The Dasha periods and Transit windows traditionally considered most supportive for forming a committed partnership. Understanding these cycles allows one to prepare consciously — moving toward partnership with awareness rather than waiting passively.',
            body_hi:  'वे दशाएँ और गोचर की अवधियाँ जिन्हें परंपरागत रूप से प्रतिबद्ध साझेदारी के लिए सबसे सहायक माना जाता है। इन चक्रों को समझने से व्यक्ति निष्क्रिय प्रतीक्षा के बजाय जागरूकता के साथ, सचेत रूप से तैयारी कर सकता है।',
          },
          {
            id:       'intro-compatibility',
            label:    'Compatibility and Deeper Resonance',
            label_hi: 'अनुकूलता और गहरा तालमेल',
            body:     'The deeper, underlying resonance between two individuals — beyond superficial attraction. True compatibility analysis in Vedic astrology examines the alignment of karmic trajectories, values, and the shared capacity to grow together over the long arc of a lifetime.',
            body_hi:  'दो व्यक्तियों के बीच सतही आकर्षण से परे का गहरा तालमेल। वैदिक ज्योतिष में वास्तविक अनुकूलता विश्लेषण दोनों की कार्मिक दिशा, मूल्यों और जीवन भर साथ बढ़ने की क्षमता के मेल को देखता है।',
          },
        ],
      },

      {
        id:       'key-pillars',
        title:    'The Five Pillars of Vedic Marriage Analysis',
        title_hi: 'वैदिक विवाह विश्लेषण के पांच स्तंभ',
        layout:   'cards',
        items: [
          {
            id:       'house-7',
            icon:     '🏠',
            label:    '7th House — The Primary Hub',
            label_hi: 'सप्तम भाव — प्राथमिक केंद्र',
            body:     'The 7th house is the foundational anchor for all partnerships. The planet ruling its sign directs the union — its strength, placement, and aspects are read for the quality of the marriage. Even when no planet occupies the 7th house, its sign and its lord still describe the marriage — an empty 7th house does not mean no marriage. If the 7th lord is in the 10th house, the partnership may carry a public or career-oriented dimension. Planets occupying the 7th color the spouse’s personality: the Sun suggests an authoritative nature; the Moon, a nurturing one. An afflicted 7th points to karmic lessons, not the denial of marriage.',
            body_hi:  'सप्तम भाव सभी साझेदारियों का आधार है। इसकी राशि का स्वामी विवाह की दिशा तय करता है — उसकी शक्ति, स्थिति और उस पर पड़ने वाली दृष्टियों से विवाह की गुणवत्ता देखी जाती है। सप्तम भाव में कोई ग्रह न हो, तब भी उसकी राशि और सप्तमेश विवाह के बारे में बताते हैं — खाली सप्तम भाव का अर्थ विवाह न होना नहीं है। सप्तम भाव में स्थित ग्रह जीवनसाथी के व्यक्तित्व को प्रभावित करते हैं: सूर्य अधिकारपूर्ण स्वभाव का संकेत देता है; चंद्रमा, देखभाल करने वाले स्वभाव का। पीड़ित सप्तम भाव कार्मिक पाठ दिखाता है, विवाह से इनकार नहीं।',
          },
          {
            id:       'venus',
            icon:     '✨',
            label:    'Venus — The Karaka of Love',
            label_hi: 'शुक्र — प्रेम का कारक',
            body:     'Venus is the natural Karaka for love, romance, aesthetics, and matrimonial happiness. Its strength and dignity indicate the quality of the marital experience — the capacity to find joy, refinement, and harmony with a partner. It governs the ability to both receive and give love within a committed union.',
            body_hi:  'शुक्र प्रेम, रोमांस, सौंदर्यशास्त्र और वैवाहिक सुख का प्राकृतिक कारक है। इसकी शक्ति और गरिमा वैवाहिक अनुभव की गुणवत्ता को दर्शाती है। यह एक प्रतिबद्ध मिलन में प्रेम प्राप्त करने और देने की क्षमता को नियंत्रित करता है।',
          },
          {
            id:       'jupiter',
            icon:     '🪐',
            label:    'Jupiter — The Karaka for Women',
            label_hi: 'गुरु — महिलाओं के लिए कारक',
            body:     'Traditionally, Jupiter represents the husband figure in a woman’s chart and the institution of marriage in every chart. A well-placed Jupiter brings ethical grounding, wisdom, and stability — acting as a stabilizing force that helps with the complexities of long-term commitment and helps anchor the partnership in shared values and growth.',
            body_hi:  'परंपरागत रूप से स्त्री की कुंडली में गुरु पति का और हर कुंडली में विवाह संस्था का प्रतिनिधित्व करता है। सुस्थित गुरु नैतिक आधार, समझ और स्थिरता लाता है — एक स्थिर करने वाली शक्ति, जो लंबी प्रतिबद्धता की जटिलताओं को संभालने और साझेदारी को साझे मूल्यों व विकास पर टिकाए रखने में मदद करती है।',
          },
          {
            id:       'darakaraka',
            icon:     '💫',
            label:    'Darakaraka — The Soulmate Indicator',
            label_hi: 'दारकारक — जीवनसाथी संकेतक',
            body:     'From the Jaimini school, the Darakaraka is the planet with the lowest degree in the natal chart (excluding Rahu/Ketu). Where the 7th house describes the external partner, the Darakaraka describes the core traits of the spouse your soul is karmically drawn to — whether an intellectual partner (Mercury) or a driven, high-energy one (Mars) — providing the most granular view of Spouse Nature.',
            body_hi:  'जैमिनी पद्धति में दारकारक जन्मकुंडली में सबसे कम अंश वाला ग्रह (राहु/केतु को छोड़कर) है। जहाँ सप्तम भाव बाहरी साथी का वर्णन करता है, वहीं दारकारक उन मूल गुणों का वर्णन करता है जिनकी ओर आपकी आत्मा कार्मिक रूप से आकर्षित होती है।',
          },
          {
            id:       'navamsa',
            icon:     '💎',
            label:    'Navamsa (D9) — The Fruit of Marriage',
            label_hi: 'नवांश (D9) — विवाह का फल',
            body:     'The Navamsa is an important validating layer. A natal chart may appear promising, but if the 7th house is significantly weakened in the Navamsa, the marriage may lack internal stability. Expert analysis checks the dignity of the 7th lord and Venus within D9 to understand the quality and sustainability of the bond — the life that unfolds within the marriage over time.',
            body_hi:  'नवांश पुष्टि करने वाला एक महत्वपूर्ण स्तर है। जन्मकुंडली आशाजनक दिख सकती है, लेकिन यदि नवांश में सप्तम भाव बहुत कमज़ोर हो, तो विवाह में भीतरी स्थिरता की कमी हो सकती है। विशेषज्ञ विश्लेषण D9 में सप्तमेश और शुक्र की स्थिति देखकर संबंध की गुणवत्ता और स्थायित्व समझता है — यानी समय के साथ विवाह के भीतर बनने वाला जीवन।',
          },
        ],
      },

      {
        id:       'yogas-factors',
        title:    'Important Marriage Yogas and Delaying Factors',
        title_hi: 'महत्वपूर्ण विवाह योग और विलंब करने वाले कारक',
        layout:   'checklist',
        items: [
          {
            id:       'positive-yogas',
            label:    'Marriage-Promoting Yogas',
            label_hi: 'विवाह-समर्थक योग',
            body:     '7th Lord placed in a Kendra (1st, 4th, 7th, 10th) or Trikona (1st, 5th, 9th) house; Venus in strong dignity (exalted or in its own sign); benefic planets (Jupiter, Venus, Mercury) aspecting the 7th house. These combinations indicate a favorable karmic background where the energy required for partnership is readily available for expression.',
            body_hi:  'केंद्र या त्रिकोण भाव में सप्तमेश; मजबूत गरिमा में शुक्र; सप्तम भाव पर शुभ ग्रहों का प्रभाव। ये संयोजन एक अनुकूल कार्मिक पृष्ठभूमि का संकेत देते हैं जहां साझेदारी के लिए आवश्यक ऊर्जा उपलब्ध है।',
          },
          {
            id:       'delaying-factors',
            label:    'Delaying Planetary Influences',
            label_hi: 'विलंब करने वाले ग्रह प्रभाव',
            body:     'Saturn aspecting the 7th house or its lord demands patience and maturation before partnership manifests — it represents the requirement to be truly ready for the responsibilities of union. A 7th lord debilitated or placed in the 6th, 8th, or 12th house may require more conscious effort to secure the match. These are karmic timing adjustments, not denials of marriage.',
            body_hi:  'सप्तम भाव या सप्तमेश पर शनि का प्रभाव विवाह से पहले धैर्य और परिपक्वता माँगता है — यानी विवाह की ज़िम्मेदारियों के लिए सचमुच तैयार होने की आवश्यकता। नीच सप्तमेश या षष्ठ, अष्टम या द्वादश भाव में स्थित सप्तमेश होने पर अच्छा रिश्ता तय होने में अधिक सचेत प्रयास लग सकता है। ये समय के कार्मिक समायोजन हैं, विवाह से इनकार नहीं।',
          },
          {
            id:       'malefic-influence',
            label:    'Malefic Influence on the 7th',
            label_hi: 'सप्तम भाव पर पापी ग्रहों का प्रभाव',
            body:     'Mars influencing the 7th house can bring intensity or conflict requiring careful management. Rahu can introduce unpredictability, unconventional partner origins, or a unique style of partnership. Both require nuanced analysis — not alarm, but informed preparation and awareness.',
            body_hi:  'सप्तम भाव को प्रभावित करने वाला मंगल तीव्रता या संघर्ष ला सकता है। राहु अप्रत्याशितता या अपरंपरागत साथी की उत्पत्ति ला सकता है। दोनों को सूक्ष्म विश्लेषण की आवश्यकता है — भय नहीं, बल्कि सूचित तैयारी।',
          },
          {
            id:       'love-tendency',
            label:    'Love-Based Marriage Tendency',
            label_hi: 'प्रेम विवाह की प्रवृत्ति',
            body:     'Strong, direct influences between the 5th house (romance/emotion) and the 7th house (partnership) — especially a connection between the lords of the 5th and 7th, or a Venus-Mars interaction — are traditionally associated with a partnership born from personal romance. A love-based chart does not preclude familial approval.',
            body_hi:  'पंचम भाव (प्रेम/भावना) और सप्तम भाव (साझेदारी) के बीच मज़बूत संबंध — विशेषकर पंचमेश और सप्तमेश का संबंध, या शुक्र-मंगल का संबंध — परंपरागत रूप से व्यक्तिगत प्रेम से बने रिश्ते से जोड़ा जाता है। प्रेम-प्रधान कुंडली का अर्थ यह नहीं कि परिवार की स्वीकृति नहीं मिलेगी।',
          },
          {
            id:       'arranged-tendency',
            label:    'Arranged-Based Marriage Tendency',
            label_hi: 'अरेंज्ड विवाह की प्रवृत्ति',
            body:     'A focus on the 7th and 9th house (tradition/family), where familial guidance and societal structures play a prominent role, often suggests an arranged-marriage path. A strong arranged-marriage chart does not preclude personal romance. Astrology highlights the dominant trend — personal choices remain the active ingredient.',
            body_hi:  'सप्तम और नवम भाव (परंपरा/परिवार) पर ज़ोर, जहाँ पारिवारिक मार्गदर्शन और सामाजिक व्यवस्था की प्रमुख भूमिका हो, अक्सर परिवार द्वारा तय (अरेंज्ड) विवाह के मार्ग का संकेत देता है। ज्योतिष प्रमुख प्रवृत्ति दिखाता है — निर्णय व्यक्ति के अपने ही रहते हैं।',
          },
          {
            id:       'holistic-perspective',
            label:    'Practical Guidance: Aligning with Your Chart',
            label_hi: 'व्यावहारिक मार्गदर्शन: अपनी कुंडली के अनुसार चलना',
            body:     'If your chart indicates a delayed marriage, use this period for personal and professional growth — the goal is to reach emotional maturity before the partnership manifests. Do not fixate on isolated factors: the strength of the Ascendant (1st house) is crucial, as it dictates your overall capacity to handle the responsibilities and joys of partnership; if the Ascendant is weak, even a brilliant 7th house may not be fully realized. Remember also to consider the 8th house (longevity of the union) and the 12th house (bed comforts and renunciation), as these play subtle but significant roles in the overall quality of the marital experience.',
            body_hi:  'यदि आपकी कुंडली विलंबित विवाह का संकेत देती है, तो इस अवधि का उपयोग व्यक्तिगत और व्यावसायिक विकास के लिए करें। लग्न (प्रथम भाव) की शक्ति महत्वपूर्ण है — यदि कमजोर हो, तो एक शानदार सप्तम भाव भी पूरी तरह से साकार नहीं हो सकता। अष्टम भाव (मिलन की दीर्घायु) और द्वादश भाव (शयन सुख और त्याग) भी वैवाहिक अनुभव की समग्र गुणवत्ता में सूक्ष्म लेकिन महत्वपूर्ण भूमिका निभाते हैं।',
          },
        ],
      },

      {
        id:       'timing-analysis',
        title:    'Timing Marriage: Dasha and Transit Synergy',
        title_hi: 'विवाह का समय: दशा और गोचर का तालमेल',
        layout:   'checklist',
        items: [
          {
            id:       'dasha-7th-lord',
            label:    'Mahadasha of the 7th House Lord',
            label_hi: 'सप्तमेश की महादशा',
            body:     'Traditionally the first Dasha window an astrologer examines. The major or sub-period of the planet ruling the 7th house is read as strongly activating marriage themes, making it the first indicator checked when assessing timing.',
            body_hi:  'परंपरागत रूप से ज्योतिषी सबसे पहले इसी दशा को देखते हैं। सप्तमेश की महादशा या अंतर्दशा को विवाह से जुड़े विषयों को प्रबल रूप से सक्रिय करने वाला माना जाता है, इसलिए समय का आकलन करते समय सबसे पहले इसी की जाँच होती है।',
          },
          {
            id:       'dasha-7th-occupants',
            label:    'Dasha of Planets Occupying the 7th House',
            label_hi: 'सप्तम भाव में स्थित ग्रहों की दशा',
            body:     'Any planet placed in the 7th house at birth becomes a significant marriage-period indicator when its Mahadasha or Antardasha runs. Their natal position in the house of partnership gives them direct relevance for timing.',
            body_hi:  'जन्म के समय सप्तम भाव में स्थित कोई भी ग्रह अपनी महादशा या अंतर्दशा में विवाह के समय का महत्वपूर्ण संकेत बन सकता है, क्योंकि साझेदारी के भाव में होने से उसका सीधा संबंध विवाह से होता है।',
          },
          {
            id:       'dasha-venus',
            label:    'Venus Dasha — Universal Marriage Significator',
            label_hi: 'शुक्र दशा — सार्वभौमिक विवाह कारक',
            body:     'Venus, as the natural Karaka for love and marriage, is traditionally read as activating matrimonial matters in its Mahadasha and sub-periods — irrespective of its natal house placement. It is among the most widely used marriage-period indicators.',
            body_hi:  'प्रेम और विवाह के प्राकृतिक कारक के रूप में शुक्र की महादशा और अंतर्दशा को परंपरागत रूप से वैवाहिक विषयों को सक्रिय करने वाला माना जाता है — जन्मकुंडली में उसका भाव चाहे जो हो। यह विवाह के समय के सबसे अधिक प्रयुक्त संकेतों में से एक है।',
          },
          {
            id:       'dasha-navamsa',
            label:    'Planets Strong in the Navamsa 7th',
            label_hi: 'नवांश सप्तम भाव में मजबूत ग्रह',
            body:     'Planets with strong connections to the 7th house in the Navamsa also serve as marriage-period triggers when their Dasha runs. The Navamsa amplifies their timing role beyond what the natal chart alone reveals.',
            body_hi:  'नवांश में सप्तम भाव से मज़बूत संबंध रखने वाले ग्रह भी अपनी दशा में विवाह के समय के संकेत बन सकते हैं। नवांश उनकी भूमिका को उससे आगे दिखाता है जितना केवल जन्मकुंडली से दिखता है।',
          },
          {
            id:       'transit-jupiter',
            label:    'Jupiter Transit Over the 7th House Axis',
            label_hi: 'सप्तम भाव अक्ष पर गुरु का गोचर',
            body:     'Jupiter transiting over the 7th house or the natal 7th house lord is one of the most commonly cited transit triggers. It is traditionally read as the supportive, expansive influence that can help a favourable Dasha window come to fruition.',
            body_hi:  'सप्तम भाव या सप्तमेश पर गुरु का गोचर सबसे अधिक बताए जाने वाले गोचर संकेतों में से एक है। इसे परंपरागत रूप से ऐसा सहायक और विस्तार देने वाला प्रभाव माना जाता है जो अनुकूल दशा को फलित होने में मदद कर सकता है।',
          },
          {
            id:       'transit-dual-confirm',
            label:    'Dual Confirmation: Dasha and Transit Both Active',
            label_hi: 'दोहरी पुष्टि: दशा और गोचर दोनों सक्रिय',
            body:     'Astrologers give most weight to periods when both Dasha and Transit activate the marriage-related houses at the same time. A Dasha period alone may bring relationship experiences rather than marriage itself, and transits are read as the trigger within it — Saturn and Jupiter together activating the 7th house axis is the classical dual-confirmation. Even then, it describes a window of possibility, not a fixed date.',
            body_hi:  'ज्योतिषी उन अवधियों को सबसे अधिक महत्व देते हैं जब दशा और गोचर दोनों एक साथ विवाह से जुड़े भावों को सक्रिय करें। केवल दशा से संबंधों के अनुभव आ सकते हैं, ज़रूरी नहीं कि विवाह ही हो; गोचर को उस दशा के भीतर सक्रिय करने वाला कारक माना जाता है — सप्तम भाव की धुरी पर शनि और गुरु का एक साथ प्रभाव पारंपरिक दोहरी पुष्टि है। तब भी यह संभावना की अवधि है, कोई तय तारीख नहीं।',
          },
        ],
      },

      {
        id:       'misconceptions',
        title:    'Addressing Misconceptions in Marriage Astrology',
        title_hi: 'विवाह ज्योतिष में गलतफहमियों को दूर करना',
        layout:   'checklist',
        items: [
          {
            id:       'certainty-myth',
            label:    'Myth: Astrology offers 100% certainty',
            label_hi: 'मिथक: ज्योतिष 100% निश्चितता प्रदान करता है',
            body:     'Astrology provides probability-based guidance, not absolute certainties. Determinism has no place in the Vedic tradition. Humans possess free will; how we respond to astrological trends is entirely within our control.',
            body_hi:  'ज्योतिष संभावना-आधारित मार्गदर्शन प्रदान करता है, पूर्ण निश्चितता नहीं। वैदिक परंपरा में नियतत्ववाद का कोई स्थान नहीं है। मनुष्यों में स्वतंत्र इच्छा होती है; हम ज्योतिषीय प्रवृत्तियों पर कैसे प्रतिक्रिया करते हैं, यह पूरी तरह से हमारे नियंत्रण में है।',
          },
          {
            id:       'fear-based',
            label:    'Myth: Mangal Dosha means a doomed marriage',
            label_hi: 'मिथक: मंगल दोष का मतलब है बर्बाद विवाह',
            body:     'Mangal Dosha is a technical calculation about Mars\'s placement — not a curse. Often misused to induce anxiety, it simply indicates a specific energy pattern requiring careful management. When properly matched with another chart of similar energy, it can actually contribute to a stable and passionate union.',
            body_hi:  'मंगल दोष मंगल की स्थिति के बारे में एक तकनीकी गणना है — अभिशाप नहीं। यह एक विशिष्ट ऊर्जा पैटर्न का संकेत देता है जिसे सावधानीपूर्वक प्रबंधित करने की आवश्यकता है।',
          },
          {
            id:       'quick-fixes',
            label:    'Myth: Remedies can force a marriage',
            label_hi: 'मिथक: उपाय विवाह को मजबूर कर सकते हैं',
            body:     'Astrological remedies (mantras, gemstones, charity) are designed to balance your internal response to planetary energies — tools for growth and mitigation, not mechanisms to force events against karmic destiny. True harmony arises from understanding the chart and making conscious, aligned efforts in life.',
            body_hi:  'ज्योतिषीय उपाय (मंत्र, रत्न, दान) ग्रहों की ऊर्जा के प्रति आपकी भीतरी प्रतिक्रिया को संतुलित करने के लिए हैं — विकास और राहत के साधन, कर्म के विरुद्ध घटनाओं को ज़बरदस्ती घटित कराने के तरीके नहीं। सच्चा सामंजस्य कुंडली को समझने और जीवन में सचेत प्रयास से आता है।',
          },
          {
            id:       'professional-analysis',
            label:    'Myth: Automated calculators are sufficient',
            label_hi: 'मिथक: स्वचालित कैलकुलेटर पर्याप्त हैं',
            body:     'Automated calculators are useful for quick checks but lack the depth of holistic analysis. A professional horoscope analysis weaves together the 7th house, the Navamsa, the Dasha, and the Transit into a coherent narrative. An expert astrologer provides balanced, non-fear-based guidance — recognizing that a delayed marriage is often a necessary period of personal maturation, not a denial of partnership.',
            body_hi:  'स्वचालित कैलकुलेटर त्वरित जाँच के लिए उपयोगी हैं, लेकिन उनमें समग्र विश्लेषण की गहराई नहीं होती। एक पेशेवर कुंडली विश्लेषण सप्तम भाव, नवांश, दशा और गोचर को साथ जोड़कर एक सुसंगत तस्वीर बनाता है। एक अनुभवी ज्योतिषी संतुलित, बिना डर वाला मार्गदर्शन देता है — यह समझते हुए कि विवाह में देरी अक्सर व्यक्तिगत परिपक्वता का समय होती है, विवाह से इनकार नहीं।',
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
            id:       'faq-timing',
            label:    'Can Vedic astrology predict exactly when I will get married?',
            label_hi: 'क्या वैदिक ज्योतिष यह सटीक भविष्यवाणी कर सकता है कि मेरा विवाह कब होगा?',
            body:     'Not to an exact date. Vedic astrology identifies periods traditionally considered supportive for marriage, based on how Dasha and Transit activate the marriage-related houses. These are windows of possibility, not a fixed date, month or age. Detailed timing methods are covered in the Marriage Timing guide.',
            body_hi:  'सटीक तारीख तक नहीं। वैदिक ज्योतिष दशा और गोचर द्वारा विवाह से जुड़े भावों की सक्रियता के आधार पर उन अवधियों की पहचान करता है जिन्हें परंपरागत रूप से विवाह के लिए सहायक माना जाता है। ये संभावना की अवधियाँ हैं, कोई तय तारीख, महीना या उम्र नहीं। समय निकालने की विस्तृत विधियाँ विवाह के समय वाली मार्गदर्शिका में दी गई हैं।',
          },
          {
            id:       'faq-venus',
            label:    'What is the role of Venus in marriage prediction?',
            label_hi: 'विवाह भविष्यवाणी में शुक्र की क्या भूमिका है?',
            body:     'Venus is the primary significator of love, romance, and marriage. Its strength and dignity reflect the potential for joy, aesthetics, and harmony within a union.',
            body_hi:  'शुक्र प्रेम, रोमांस और विवाह का प्राथमिक कारक है। इसकी शक्ति और गरिमा एक मिलन में आनंद और सद्भाव की संभावना को दर्शाती है।',
          },
          {
            id:       'faq-mangal',
            label:    'Does Mangal Dosha always mean trouble?',
            label_hi: 'क्या मंगल दोष का मतलब हमेशा परेशानी होता है?',
            body:     'No. Mangal Dosha simply indicates a specific energy pattern that requires careful management. It is common to find balance between partners with similar energy configurations, often leading to a stable marriage.',
            body_hi:  'नहीं। मंगल दोष एक विशिष्ट ऊर्जा पैटर्न का संकेत देता है जिसे सावधानीपूर्वक प्रबंधित करने की आवश्यकता है।',
          },
          {
            id:       'faq-love-arranged',
            label:    'Can astrology predict if a marriage will be love or arranged?',
            label_hi: 'क्या ज्योतिष भविष्यवाणी कर सकता है कि विवाह प्रेम होगा या व्यवस्थित?',
            body:     'To a degree. Combinations involving the 5th house (romance) and the 7th house (partnership), along with the strength of the 7th lord and the 9th house of family tradition, can show a tendency toward a love-based or a family-arranged path. Many charts show both, and personal choice decides the path a person actually takes.',
            body_hi:  'कुछ हद तक। पंचम भाव (प्रेम) और सप्तम भाव (साझेदारी) से जुड़े योग, सप्तमेश की शक्ति और पारिवारिक परंपरा का नवम भाव — ये प्रेम विवाह या परिवार द्वारा तय विवाह की ओर झुकाव दिखा सकते हैं। कई कुंडलियों में दोनों के संकेत होते हैं, और वास्तविक मार्ग व्यक्ति का अपना निर्णय तय करता है।',
          },
          {
            id:       'faq-delayed',
            label:    'What if my marriage is delayed?',
            label_hi: 'अगर मेरा विवाह विलंबित हो तो क्या होगा?',
            body:     'Delayed marriage is often a result of specific karmic lessons or planetary influences like Saturn, not a sign that marriage will not happen. It often indicates that the timing is governed by a different karmic cycle requiring personal maturation.',
            body_hi:  'विवाह में देरी अक्सर विशेष कार्मिक पाठों या शनि जैसे ग्रहों के प्रभाव का परिणाम होती है — इसका अर्थ यह नहीं कि विवाह नहीं होगा। यह अक्सर दिखाता है कि समय किसी अलग कार्मिक चक्र से तय हो रहा है, जिसमें व्यक्तिगत परिपक्वता की ज़रूरत है।',
          },
          {
            id:       'faq-navamsa',
            label:    'How important is the Navamsa chart?',
            label_hi: 'नवांश कुंडली कितनी महत्वपूर्ण है?',
            body:     'It is an important supporting layer. The Navamsa (D9) is used to check the deeper strength and quality of the marriage shown in the main chart — the "fruit" of the natal potential — and is always read together with the Rashi chart rather than on its own.',
            body_hi:  'यह एक महत्वपूर्ण सहायक स्तर है। नवांश (D9) से मुख्य कुंडली में दिखे विवाह की गहरी शक्ति और गुणवत्ता — यानी जन्मकुंडली की संभावना का "फल" — परखा जाता है, और इसे हमेशा राशि कुंडली के साथ पढ़ा जाता है, अकेले नहीं।',
          },
          {
            id:       'faq-remedies',
            label:    'Are there remedies for marriage issues?',
            label_hi: 'क्या विवाह संबंधी समस्याओं के लिए कोई उपाय हैं?',
            body:     'Yes. Vedic astrology offers various remedial measures, including mantras, gemstones, and acts of charity. These are intended to help balance difficult planetary influences and foster better harmony within one\'s personal and marital life.',
            body_hi:  'वैदिक ज्योतिष कठिन ग्रह प्रभावों को संतुलित करने के लिए मंत्र, रत्न और दान सहित विभिन्न उपचारात्मक उपाय प्रदान करता है।',
          },
          {
            id:       'faq-astrologer',
            label:    'What if my 7th house is empty?',
            label_hi: 'अगर मेरा सप्तम भाव खाली हो तो क्या?',
            body:     'An empty 7th house does not mean no marriage. The house is still read through its sign, its lord and where that lord is placed, together with any planets aspecting it, Venus and Jupiter, and the Navamsa. Many people with an empty 7th house marry and have stable marriages.',
            body_hi:  'खाली सप्तम भाव का अर्थ विवाह न होना नहीं है। इस भाव को उसकी राशि, सप्तमेश और सप्तमेश की स्थिति के साथ-साथ उस पर दृष्टि डालने वाले ग्रहों, शुक्र और गुरु, और नवांश से पढ़ा जाता है। खाली सप्तम भाव वाले बहुत से लोगों का विवाह होता है और वह स्थिर रहता है।',
          },
        ],
      },

    ],
    ctas: [
      {
        id:             'cta-marriage-path',
        type:           'tool',
        slug:           'marriage-path',
        label:          'Explore Your Marriage Indicators',
        label_hi:       'अपने विवाह संकेत देखें',
        description:    'Use the free tool to review selected marriage-related factors in your chart — the planets in your 7th house, Venus and Jupiter, and the strongest influence on your marriage. It does not predict an exact wedding date.',
        description_hi: 'फ्री टूल से अपनी कुंडली के चुने हुए विवाह संकेत देखें — सप्तम भाव के ग्रह, शुक्र और गुरु, और विवाह पर सबसे प्रबल प्रभाव। यह विवाह की सटीक तारीख नहीं बताता।',
        variant:        'secondary',
      },
      // The Marriage Report is the landing's primary card (_landing.ts); no duplicate bottom report CTA.
      {
        id:       'cta-compatibility',
        type:     'topic',
        entity:   'marriage-astrology',
        slug:     'compatibility',
        label:    'Check Marriage Compatibility',
        label_hi: 'विवाह अनुकूलता की जांच करें',
        variant:  'secondary',
      },
    ],
  },

  aiMetadata: {
    searchIntent:   'informational',
    difficulty:     'intermediate',
    authorityLevel: 'expert',
  },

  schemaSignals: {
    expertise: 'Our content is authored by experienced Vedic astrologers, adhering strictly to traditional Sidereal (Lahiri) systems, ensuring authentic, probability-based insights into marriage and life events.',
  },

  authority: {
    reviewStatus:   'approved',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     true,
    isSearchEnabled: true,
    visibility:      'public',
  },

}
