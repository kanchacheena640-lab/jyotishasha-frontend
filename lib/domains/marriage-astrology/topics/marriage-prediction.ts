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
    metaTitle:       'Accurate Marriage Prediction by Date of Birth - Vedic Astrology',
    metaDescription: 'Seeking marriage prediction? Explore how Vedic astrology analyzes the 7th house, Venus, Jupiter, and Navamsa to provide insights into marriage timing and compatibility.',
    robots:          'index,follow',
  },

  hero: {
    headline:    'Decoding Your Destiny: Marriage Prediction in Vedic Astrology',
    headline_hi: 'अपनी नियति को समझना: वैदिक ज्योतिष में विवाह भविष्यवाणी',
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
            body_hi:  'वैदिक ज्योतिष में विवाह को केवल एक कानूनी व्यवस्था या रोमांटिक चिंगारी के रूप में नहीं देखा जाता; इसे एक महत्वपूर्ण कार्मिक साझेदारी के रूप में देखा जाता है। यह ढांचा एक निश्चित भविष्य को निर्देशित नहीं करता, बल्कि ऊर्जात्मक प्रवृत्तियों को उजागर करता है — व्यक्ति को अधिक चेतना, तैयारी और आध्यात्मिक संरेखण के साथ आगे बढ़ने की अनुमति देता है।',
          },
          {
            id:       'intro-karmic-lessons',
            label:    'Karmic Lessons',
            label_hi: 'कार्मिक पाठ',
            body:     'The specific lessons regarding partnership, sacrifice, and growth that your soul chose to explore in this lifetime. Marriage astrology reveals the underlying karmic themes encoded in your chart — not as burdens, but as meaningful curriculum for your soul\'s evolution.',
            body_hi:  'साझेदारी, त्याग और विकास के बारे में विशिष्ट पाठ जो आपकी आत्मा ने इस जीवनकाल में खोजने के लिए चुने हैं। विवाह ज्योतिष आपकी कुंडली में एन्कोड किए गए कार्मिक विषयों को बोझ नहीं, बल्कि आत्मा के विकास के लिए सार्थक पाठ के रूप में प्रकट करता है।',
          },
          {
            id:       'intro-partner-traits',
            label:    'Partner Characteristics',
            label_hi: 'जीवनसाथी की विशेषताएं',
            body:     'The nature, temperament, and strengths of the person you are likely to be drawn to — often described through your Spouse Nature indicators (Darakaraka, 7th house lord). The chart reveals not a specific individual but the archetypal qualities of your most resonant partner.',
            body_hi:  'उस व्यक्ति की प्रकृति, स्वभाव और शक्तियां जिसकी ओर आप संभवतः आकर्षित होंगे — अक्सर दारकारक और सप्तमेश जैसे जीवनसाथी प्रकृति संकेतकों के माध्यम से वर्णित। कुंडली किसी विशिष्ट व्यक्ति को नहीं बल्कि आपके सबसे अनुकूल साझेदार के पुरातात्विक गुणों को प्रकट करती है।',
          },
          {
            id:       'intro-timing-energy',
            label:    'Peak Marriage Timing Windows',
            label_hi: 'विवाह के शीर्ष समय की खिड़कियां',
            body:     'The Dasha periods and favorable Transit windows when the energy for forming a committed partnership is at its peak. Understanding these cycles allows one to prepare consciously — moving toward partnership with awareness rather than waiting passively.',
            body_hi:  'दशा अवधियां और अनुकूल गोचर की खिड़कियां जब एक प्रतिबद्ध साझेदारी बनाने की ऊर्जा अपने चरम पर होती है। इन चक्रों को समझने से व्यक्ति को सचेत रूप से तैयार होने में मदद मिलती है।',
          },
          {
            id:       'intro-compatibility',
            label:    'Compatibility and Deeper Resonance',
            label_hi: 'अनुकूलता और गहरा अनुनाद',
            body:     'The deeper, underlying resonance between two individuals — beyond superficial attraction. True compatibility analysis in Vedic astrology examines the alignment of karmic trajectories, values, and the shared capacity to grow together over the long arc of a lifetime.',
            body_hi:  'दो व्यक्तियों के बीच गहरा, अंतर्निहित अनुनाद — सतही आकर्षण से परे। वैदिक ज्योतिष में वास्तविक अनुकूलता विश्लेषण कार्मिक प्रक्षेपपथों और साझा जीवन में एक साथ बढ़ने की क्षमता के संरेखण की जांच करता है।',
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
            body:     'The 7th house is the foundational anchor for all partnerships. The planet ruling its sign directs the union — strength, placement, and aspects determine quality. If the 7th lord is in the 10th house, the partnership may carry a public or career-oriented dimension. Planets occupying the 7th color the spouse\'s personality: the Sun suggests an authoritative nature; the Moon, a nurturing one. An afflicted 7th points to karmic lessons, not the denial of marriage.',
            body_hi:  'सप्तम भाव सभी साझेदारियों का आधार है। सप्तम भाव में ग्रह जीवनसाथी के व्यक्तित्व को रंग देते हैं: सूर्य आधिकारिक स्वभाव का सुझाव देता है; चंद्रमा, पोषण करने वाला। पीड़ित सप्तम भाव विवाह से इनकार नहीं — कर्मिक पाठों का संकेत देता है।',
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
            body:     'For women, Jupiter represents the husband figure and the institution of marriage. A well-placed Jupiter brings ethical grounding, wisdom, and stability — acting as a stabilizing force that helps navigate the complexities of long-term commitment, ensuring the partnership is anchored in shared values and growth.',
            body_hi:  'महिलाओं के लिए, गुरु पति और विवाह की संस्था का प्रतिनिधित्व करता है। एक सुस्थित गुरु नैतिक आधार, ज्ञान और स्थिरता लाता है — दीर्घकालिक प्रतिबद्धता की जटिलताओं को नेविगेट करने में मदद करने वाली एक स्थिर शक्ति।',
          },
          {
            id:       'darakaraka',
            icon:     '💫',
            label:    'Darakaraka — The Soulmate Indicator',
            label_hi: 'दारकारक — जीवनसाथी संकेतक',
            body:     'From the Jaimini school, the Darakaraka is the planet with the lowest degree in the natal chart (excluding Rahu/Ketu). Where the 7th house describes the external partner, the Darakaraka describes the core traits of the spouse your soul is karmically drawn to — whether an intellectual partner (Mercury) or a driven, high-energy one (Mars) — providing the most granular view of Spouse Nature.',
            body_hi:  'जैमिनी पद्धति से, दारकारक जन्म कुंडली में सबसे कम डिग्री वाला ग्रह है। सप्तम भाव बाहरी साथी का वर्णन करता है, जबकि दारकारक उन मूल गुणों का वर्णन करता है जिसकी ओर आपकी आत्मा कर्मिक रूप से आकर्षित होती है।',
          },
          {
            id:       'navamsa',
            icon:     '💎',
            label:    'Navamsa (D9) — The Fruit of Marriage',
            label_hi: 'नवांश (D9) — विवाह का फल',
            body:     'The Navamsa is the ultimate validator. A natal chart may appear promising, but if the 7th house is significantly weakened in the Navamsa, the marriage may lack internal stability. Expert analysis checks the dignity of the 7th lord and Venus within D9 to reveal the quality and sustainability of the bond — the life that unfolds within the marriage over time.',
            body_hi:  'नवांश कुंडली अंतिम सत्यापनकर्ता है। विशेषज्ञ विश्लेषण D9 में सप्तमेश और शुक्र की गरिमा की जांच करता है — समय के साथ विवाह के भीतर प्रकट होने वाले जीवन की गुणवत्ता और स्थायित्व को प्रकट करने के लिए।',
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
            body_hi:  'सप्तम भाव या सप्तमेश पर शनि का प्रभाव साझेदारी प्रकट होने से पहले धैर्य और परिपक्वता की मांग करता है। 6th, 8th, या 12th भाव में नीच या स्थित सप्तमेश को अधिक सचेत प्रयास की आवश्यकता हो सकती है। ये कार्मिक समय समायोजन हैं, विवाह से इनकार नहीं।',
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
            body:     'Strong, direct influences between the 5th house (romance/emotion) and the 7th house (partnership) — especially a connection between the lords of the 5th and 7th, or a Venus-Mars interaction — frequently indicate a partnership born from personal romance. A love-based chart does not preclude familial approval.',
            body_hi:  'पंचम और सप्तम भाव के बीच मजबूत संबंध, विशेष रूप से पंचमेश और सप्तमेश का संबंध, या शुक्र-मंगल की परस्पर क्रिया — अक्सर प्रेम विवाह का संकेत देते हैं। प्रेम-आधारित कुंडली पारिवारिक स्वीकृति को बाहर नहीं करती।',
          },
          {
            id:       'arranged-tendency',
            label:    'Arranged-Based Marriage Tendency',
            label_hi: 'व्यवस्थित विवाह की प्रवृत्ति',
            body:     'A focus on the 7th and 9th house (tradition/family), where familial guidance and societal structures play a prominent role, often suggests an arranged-marriage path. A strong arranged-marriage chart does not preclude personal romance. Astrology highlights the dominant trend — personal choices remain the active ingredient.',
            body_hi:  'सप्तम और नवम भाव पर ध्यान, जहां पारिवारिक मार्गदर्शन प्रमुख भूमिका निभाता है, अक्सर व्यवस्थित विवाह का सुझाव देता है। ज्योतिष प्रमुख प्रवृत्ति को उजागर करता है — व्यक्तिगत विकल्प सक्रिय घटक बने रहते हैं।',
          },
          {
            id:       'holistic-perspective',
            label:    'Practical Guidance: Aligning with Your Chart',
            label_hi: 'व्यावहारिक मार्गदर्शन: अपनी कुंडली के साथ संरेखण',
            body:     'If your chart indicates a delayed marriage, use this period for personal and professional growth — the goal is to reach emotional maturity before the partnership manifests. Do not fixate on isolated factors: the strength of the Ascendant (1st house) is crucial, as it dictates your overall capacity to handle the responsibilities and joys of partnership; if the Ascendant is weak, even a brilliant 7th house may not be fully realized. Remember also to consider the 8th house (longevity of the union) and the 12th house (bed comforts and renunciation), as these play subtle but significant roles in the overall quality of the marital experience.',
            body_hi:  'यदि आपकी कुंडली विलंबित विवाह का संकेत देती है, तो इस अवधि का उपयोग व्यक्तिगत और व्यावसायिक विकास के लिए करें। लग्न (प्रथम भाव) की शक्ति महत्वपूर्ण है — यदि कमजोर हो, तो एक शानदार सप्तम भाव भी पूरी तरह से साकार नहीं हो सकता। अष्टम भाव (मिलन की दीर्घायु) और द्वादश भाव (शयन सुख और त्याग) भी वैवाहिक अनुभव की समग्र गुणवत्ता में सूक्ष्म लेकिन महत्वपूर्ण भूमिका निभाते हैं।',
          },
        ],
      },

      {
        id:       'timing-analysis',
        title:    'Timing Marriage: Dasha and Transit Synergy',
        title_hi: 'विवाह का समय: दशा और गोचर की तालमेल',
        layout:   'checklist',
        items: [
          {
            id:       'dasha-7th-lord',
            label:    'Mahadasha of the 7th House Lord',
            label_hi: 'सप्तमेश की महादशा',
            body:     'The most reliable Dasha window. The major or sub-period of the planet ruling the 7th house brings strong activation of marriage energy and is the first indicator an astrologer verifies when assessing timing.',
            body_hi:  'सबसे विश्वसनीय दशा खिड़की। सप्तमेश की महादशा या अंतर्दशा विवाह ऊर्जा की प्रबल सक्रियता लाती है।',
          },
          {
            id:       'dasha-7th-occupants',
            label:    'Dasha of Planets Occupying the 7th House',
            label_hi: 'सप्तम भाव में स्थित ग्रहों की दशा',
            body:     'Any planet placed in the 7th house at birth becomes a significant marriage-period indicator when its Mahadasha or Antardasha runs. Their natal position in the house of partnership gives them direct relevance for timing.',
            body_hi:  'जन्म के समय सप्तम भाव में स्थित कोई भी ग्रह अपनी महादशा या अंतर्दशा में विवाह का महत्वपूर्ण संकेत बन जाता है।',
          },
          {
            id:       'dasha-venus',
            label:    'Venus Dasha — Universal Marriage Significator',
            label_hi: 'शुक्र दशा — सार्वभौमिक विवाह कारक',
            body:     'Venus, as the natural Karaka for love and marriage, activates matrimonial matters strongly in its Mahadasha and sub-periods — irrespective of its natal house placement. It is among the most universally reliable marriage-period indicators.',
            body_hi:  'शुक्र, प्रेम और विवाह के प्राकृतिक कारक के रूप में, अपनी महादशा और अंतर्दशा में वैवाहिक मामलों को दृढ़ता से सक्रिय करता है — अपनी जन्म भाव स्थिति की परवाह किए बिना।',
          },
          {
            id:       'dasha-navamsa',
            label:    'Planets Strong in the Navamsa 7th',
            label_hi: 'नवांश सप्तम भाव में मजबूत ग्रह',
            body:     'Planets with strong connections to the 7th house in the Navamsa also serve as marriage-period triggers when their Dasha runs. The Navamsa amplifies their timing role beyond what the natal chart alone reveals.',
            body_hi:  'नवांश में सप्तम भाव से मजबूत संबंध वाले ग्रह भी अपनी दशा में विवाह के समय संकेतक के रूप में काम करते हैं।',
          },
          {
            id:       'transit-jupiter',
            label:    'Jupiter Transit Over the 7th House Axis',
            label_hi: 'सप्तम भाव अक्ष पर गुरु का गोचर',
            body:     'Jupiter transiting over the 7th house or the natal 7th house lord is one of the most reliable transit triggers. It provides the auspicious, expansive energy needed to initiate a union — the "blessing" the Dasha window has been waiting for.',
            body_hi:  'सप्तम भाव या सप्तमेश पर गुरु का गोचर विवाह के लिए सबसे विश्वसनीय गोचर संकेतकों में से एक है — वह "आशीर्वाद" जिसकी दशा खिड़की प्रतीक्षा कर रही थी।',
          },
          {
            id:       'transit-dual-confirm',
            label:    'Dual Confirmation: Dasha and Transit Both Active',
            label_hi: 'दोहरी पुष्टि: दशा और गोचर दोनों सक्रिय',
            body:     'Marriage most reliably manifests only when both Dasha and Transit confirm the activation of marriage-related houses simultaneously. A Dasha period alone may bring relationship experiences rather than marriage itself — the Transit is what converts potential into event. Saturn and Jupiter simultaneously activating the 7th house axis is the classical dual-confirmation trigger.',
            body_hi:  'विवाह सबसे विश्वसनीय रूप से तभी प्रकट होता है जब दशा और गोचर दोनों एक साथ विवाह-संबंधित भावों की सक्रियता की पुष्टि करते हैं। केवल दशा अवधि संबंध अनुभव ला सकती है — गोचर ही संभावना को घटना में बदलता है।',
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
            body_hi:  'ज्योतिषीय उपाय ग्रहों की ऊर्जाओं के प्रति आपकी आंतरिक प्रतिक्रिया को संतुलित करने के लिए बनाए गए हैं। सच्ची सद्भावना कुंडली को समझने और जीवन में सचेत प्रयास करने से उत्पन्न होती है।',
          },
          {
            id:       'professional-analysis',
            label:    'Myth: Automated calculators are sufficient',
            label_hi: 'मिथक: स्वचालित कैलकुलेटर पर्याप्त हैं',
            body:     'Automated calculators are useful for quick checks but lack the depth of holistic analysis. A professional horoscope analysis weaves together the 7th house, the Navamsa, the Dasha, and the Transit into a coherent narrative. An expert astrologer provides balanced, non-fear-based guidance — recognizing that a delayed marriage is often a necessary period of personal maturation, not a denial of partnership.',
            body_hi:  'स्वचालित कैलकुलेटर त्वरित जांच के लिए उपयोगी हैं लेकिन समग्र विश्लेषण की गहराई का अभाव है। एक पेशेवर कुंडली विश्लेषण सप्तम भाव, नवांश, दशा और गोचर को एक सुसंगत कथा में बुनता है। एक विशेषज्ञ ज्योतिषी संतुलित, गैर-भय-आधारित मार्गदर्शन प्रदान करता है।',
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
            body:     'Vedic astrology suggests the most likely time frames based on the activation of marriage-related houses through Dasha and Transit. It offers probability-based insights rather than a fixed, unchangeable calendar date.',
            body_hi:  'वैदिक ज्योतिष दशा और गोचर के माध्यम से विवाह-संबंधित भावों की सक्रियता के आधार पर सबसे संभावित समय सीमा का सुझाव देता है।',
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
            body:     'Yes. Specific combinations involving the 5th house (romance) and the 7th house (partnership), along with the strength of the 7th lord, often indicate a propensity for love-based or arranged-based paths.',
            body_hi:  'हां। पंचम और सप्तम भाव से जुड़े विशिष्ट संयोजन अक्सर प्रेम-आधारित या व्यवस्थित-आधारित पथों की प्रवृत्ति का संकेत देते हैं।',
          },
          {
            id:       'faq-delayed',
            label:    'What if my marriage is delayed?',
            label_hi: 'अगर मेरा विवाह विलंबित हो तो क्या होगा?',
            body:     'Delayed marriage is often a result of specific karmic lessons or planetary influences like Saturn, not a sign that marriage will not happen. It often indicates that the timing is governed by a different karmic cycle requiring personal maturation.',
            body_hi:  'विलंबित विवाह अक्सर विशिष्ट कर्मिक पाठ या शनि जैसे ग्रह प्रभावों का परिणाम है — यह संकेत नहीं कि विवाह नहीं होगा।',
          },
          {
            id:       'faq-navamsa',
            label:    'How important is the Navamsa chart?',
            label_hi: 'नवांश कुंडली कितनी महत्वपूर्ण है?',
            body:     'The Navamsa (D9) chart is indispensable. It validates the actual, deep-rooted strength and quality of the marriage, acting as the "fruit" of the natal potential shown in the main chart.',
            body_hi:  'नवांश (D9) कुंडली अपरिहार्य है। यह मुख्य कुंडली में दिखाई गई जन्मजात क्षमता के "फल" के रूप में कार्य करते हुए विवाह की वास्तविक शक्ति और गुणवत्ता को मान्य करती है।',
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
            label:    'How do I choose the right astrologer?',
            label_hi: 'मैं सही ज्योतिषी का चुनाव कैसे करूं?',
            body:     'Seek those who adhere strictly to traditional Sidereal (Lahiri) systems, prioritize holistic analysis over isolated factors, and provide balanced, probability-based guidance rather than fear-based or fatalistic predictions.',
            body_hi:  'ऐसे लोगों की तलाश करें जो पारंपरिक नक्षत्र (लाहिड़ी) प्रणालियों का कड़ाई से पालन करते हैं और संतुलित, संभावना-आधारित मार्गदर्शन प्रदान करते हैं।',
          },
        ],
      },

    ],
    ctas: [
      {
        id:       'cta-consultation',
        type:     'page',
        slug:     'marriage-astrology/consultation',
        label:    'Get Expert Marriage Prediction',
        label_hi: 'विशेषज्ञ विवाह भविष्यवाणी प्राप्त करें',
        variant:  'primary',
      },
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
