import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const delayedMarriage: DomainTopic = {

  identity: {
    id:         'marriage-astrology:delayed-marriage',
    slug:       'delayed-marriage',
    title:      'Delayed Marriage in Vedic Astrology: Why Is My Marriage Getting Delayed?',
    title_hi:   'वैदिक ज्योतिष में शादी में देरी: मेरी शादी में देरी क्यों हो रही है?',
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
    metaTitle:          'Delayed Marriage in Vedic Astrology: Causes, Timing, Remedies',
    metaDescription:    'Why is my marriage getting delayed? See how Vedic astrology reads delay in marriage in a kundli — the 7th house and lord, Saturn, Mars, Rahu-Ketu, Venus, Navamsa — and why delay is not denial.',
    metaDescription_hi: 'मेरी शादी में देरी क्यों हो रही है? जानें कुंडली में विवाह में देरी के ज्योतिषीय कारण — सप्तम भाव और सप्तमेश, शनि, मंगल, राहु-केतु, शुक्र, नवांश — और क्यों देरी का अर्थ विवाह न होना नहीं है।',
    robots:             'noindex,follow',
  },

  hero: {
    headline:    'Delayed Marriage in Vedic Astrology: Causes, Timing & Remedies',
    headline_hi: 'वैदिक ज्योतिष में विलंबित विवाह: कारण, समय और उपाय',
    subtext:     'Why marriage can take longer in some charts — the 7th house and its lord, Saturn, Mars, Rahu-Ketu, Venus and Jupiter, the Navamsa and Dasha — and why a delay in marriage is not the same as no marriage.',
    subtext_hi:  'कुछ कुंडलियों में शादी में अधिक समय क्यों लगता है — सप्तम भाव और सप्तमेश, शनि, मंगल, राहु-केतु, शुक्र और गुरु, नवांश और दशा — और क्यों विवाह में देरी का अर्थ विवाह न होना नहीं है।',
  },

  taxonomy: {
    tags:        ['delayed-marriage', 'vedic-astrology', 'saturn', '7th-house', 'dasha-timing', 'navamsa', 'marriage-remedies'],
    keywords:    ['delayed marriage astrology', 'delay in marriage astrology', 'delay in marriage in kundli', 'reasons for delay in marriage', 'why is my marriage delayed', 'late marriage astrology', 'marriage delay yog in kundli'],
    keywords_hi: ['शादी में देरी', 'मेरी शादी में देरी क्यों हो रही है', 'शादी में देरी के कारण', 'कुंडली में शादी में देरी', 'विवाह में देरी के योग', 'विलंबित विवाह ज्योतिष'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'intro',
        title:    'What Delayed Marriage Means in a Birth Chart',
        title_hi: 'कुंडली में शादी में देरी का अर्थ',
        layout:   'list',
        items: [
          {
            id:       'intro-what-delay-means',
            label:    'Slower Progress, Not a Missing Promise',
            label_hi: 'धीमी प्रगति, विवाह के योग का अभाव नहीं',
            body:     'In Vedic astrology, a delay in marriage means that the chart shows factors traditionally associated with slower progress, extra effort or a longer search before marriage. It describes the path, not a verdict on the person, and it says nothing about anyone’s worth. Astrologers look at why the chart may lean this way — which houses, lords and planets are involved — and read that alongside the person’s real circumstances.',
            body_hi:  'वैदिक ज्योतिष में शादी में देरी (विलंबित विवाह) का अर्थ है कि कुंडली में ऐसे कारक दिखते हैं जिन्हें परंपरागत रूप से धीमी प्रगति, अधिक प्रयास या विवाह से पहले लंबी खोज से जोड़ा जाता है। यह मार्ग का वर्णन है, व्यक्ति पर कोई निर्णय नहीं, और इससे किसी के मूल्य के बारे में कुछ नहीं कहा जाता। ज्योतिषी देखते हैं कि कुंडली इस ओर क्यों झुक सकती है — कौन-से भाव, स्वामी और ग्रह शामिल हैं — और इसे व्यक्ति की वास्तविक परिस्थितियों के साथ मिलाकर पढ़ते हैं।',
          },
          {
            id:       'intro-defining-delay',
            label:    'Delay Is Relative, Not an Age Deadline',
            label_hi: 'देरी सापेक्ष है, उम्र की कोई सीमा नहीं',
            body:     'There is no astrological age after which a marriage becomes “delayed”. Social expectations differ widely between families, cities and generations. In a chart reading, delay simply means that marriage-related factors suggest the process may take longer or need more effort than the person or family expects — whatever their age.',
            body_hi:  'ज्योतिष में ऐसी कोई उम्र तय नहीं है जिसके बाद विवाह "देर से" माना जाए। परिवारों, शहरों और पीढ़ियों के बीच सामाजिक अपेक्षाएँ बहुत अलग होती हैं। कुंडली के विश्लेषण में देरी का अर्थ बस इतना है कि विवाह से जुड़े कारक संकेत देते हैं कि प्रक्रिया में व्यक्ति या परिवार की अपेक्षा से अधिक समय या प्रयास लग सकता है — उम्र चाहे जो हो।',
          },
        ],
      },

      {
        id:       'delay-reasons',
        title:    'Main Astrological Reasons for Marriage Delay',
        title_hi: 'शादी में देरी के मुख्य ज्योतिषीय कारण',
        layout:   'cards',
        items: [
          {
            id:       'reason-no-single-placement',
            icon:     '🧩',
            label:    'No Single Placement Decides It',
            label_hi: 'कोई एक ग्रह-स्थिति निर्णय नहीं करती',
            body:     'There is no one “marriage delay yog” that settles the question. The factors below are potential delay indicators. Astrologers look for several appearing together, check how strongly benefics such as Jupiter and Venus support the 7th house, and only then describe a tendency.',
            body_hi:  'कोई एक "विवाह में देरी का योग" ऐसा नहीं है जो इस प्रश्न का अंतिम उत्तर दे। नीचे दिए कारक देरी के संभावित संकेत हैं। ज्योतिषी देखते हैं कि इनमें से कई एक साथ हैं या नहीं, गुरु और शुक्र जैसे शुभ ग्रह सप्तम भाव का कितना समर्थन करते हैं, और उसके बाद ही किसी प्रवृत्ति का वर्णन करते हैं।',
          },
          {
            id:       'reason-seventh-lord',
            icon:     '🏠',
            label:    'An Afflicted 7th House or 7th Lord',
            label_hi: 'पीड़ित सप्तम भाव या सप्तमेश',
            body:     'The 7th house is the main house of marriage, and its lord shows how the marriage comes about. When the 7th house or its lord is under strong malefic influence, weakly placed (for example in the 6th, 8th or 12th house) or lacks benefic support, the chart may indicate obstacles or a longer search. The more supportive factors are present, the less weight this carries.',
            body_hi:  'सप्तम भाव विवाह का मुख्य भाव है, और सप्तमेश बताता है कि विवाह किस तरह होता है। जब सप्तम भाव या सप्तमेश पर पाप ग्रहों का भारी प्रभाव हो, वह कमज़ोर स्थिति में हो (जैसे 6वें, 8वें या 12वें भाव में) या उसे शुभ समर्थन न मिले, तो कुंडली बाधाओं या लंबी खोज का संकेत दे सकती है। जितने अधिक सहायक कारक हों, इसका प्रभाव उतना कम माना जाता है।',
          },
          {
            id:       'planet-saturn',
            icon:     '⏳',
            label:    'Saturn — Slower, More Considered Progress',
            label_hi: 'शनि — धीमी और सोच-समझकर आगे बढ़ने की प्रवृत्ति',
            body:     'Saturn is often linked with delay, but “Saturn in the 7th means delayed marriage” is not a rule. Saturn’s influence on the 7th house, its lord or Venus may correlate with slower development, caution, a sense of responsibility and a preference for structure before commitment. Its effect depends on its sign, its strength and the support it receives; supported by benefics, it often describes a steady, mature approach rather than a problem.',
            body_hi:  'शनि को अक्सर देरी से जोड़ा जाता है, पर "सप्तम भाव में शनि यानी विवाह में देरी" कोई नियम नहीं है। सप्तम भाव, सप्तमेश या शुक्र पर शनि का प्रभाव धीमी प्रगति, सावधानी, ज़िम्मेदारी की भावना और प्रतिबद्धता से पहले व्यवस्था की पसंद से जुड़ा हो सकता है। इसका प्रभाव इसकी राशि, शक्ति और मिलने वाले समर्थन पर निर्भर करता है; शुभ ग्रहों के समर्थन से यह अक्सर कोई समस्या नहीं, बल्कि स्थिर और परिपक्व दृष्टिकोण दर्शाता है।',
          },
          {
            id:       'planet-mars',
            icon:     '🔴',
            label:    'Mars — Friction and Impatience',
            label_hi: 'मंगल — टकराव और अधीरता',
            body:     'Mars is not a planet of delay as such. When it strongly afflicts the 7th house or its lord, it may contribute to friction, impatience or disagreements that slow relationships down or make it harder to settle on a match. Its influence is read together with the rest of the chart — and is a separate topic from the Manglik assessment used in kundli matching.',
            body_hi:  'मंगल अपने-आप में देरी का ग्रह नहीं है। जब यह सप्तम भाव या सप्तमेश को गहराई से पीड़ित करता है, तो यह टकराव, अधीरता या मतभेदों में योगदान दे सकता है, जिनसे संबंध धीमे पड़ते हैं या किसी रिश्ते पर निर्णय कठिन होता है। इसके प्रभाव को बाकी कुंडली के साथ पढ़ा जाता है — और यह कुंडली मिलान में होने वाले मांगलिक विचार से अलग विषय है।',
          },
          {
            id:       'planet-rahu-ketu',
            icon:     '🌑',
            label:    'Rahu and Ketu — Expectations and Detachment',
            label_hi: 'राहु और केतु — अपेक्षाएँ और विरक्ति',
            body:     'Rahu on the 7th house, its lord or Venus may point to unusual or very specific expectations of a partner, or to unconventional circumstances around marriage. Ketu may point to a phase of detachment, when marriage feels less of a priority. Neither indicates “no marriage”; both describe patterns that can slow decisions and are read with the whole chart.',
            body_hi:  'सप्तम भाव, सप्तमेश या शुक्र पर राहु साथी के बारे में असामान्य या बहुत विशिष्ट अपेक्षाओं, या विवाह से जुड़ी अपरंपरागत परिस्थितियों का संकेत दे सकता है। केतु विरक्ति के ऐसे दौर का संकेत दे सकता है जब विवाह कम प्राथमिकता लगे। दोनों में से कोई भी "विवाह न होना" नहीं दर्शाता; दोनों ऐसी प्रवृत्तियाँ बताते हैं जो निर्णयों को धीमा कर सकती हैं, और इन्हें पूरी कुंडली के साथ पढ़ा जाता है।',
          },
          {
            id:       'planet-venus-jupiter',
            icon:     '✨',
            label:    'Challenged Venus or Jupiter',
            label_hi: 'कमज़ोर या पीड़ित शुक्र अथवा गुरु',
            body:     'Venus is the natural significator of marriage and partnership, and Jupiter is a key significator of marriage and guidance; classical texts give Jupiter special weight in a woman’s chart, though modern readings examine both in every chart. When Venus or Jupiter is debilitated, combust or under heavy malefic influence, the chart may indicate that relationships need more time to take shape. A strong Venus or Jupiter elsewhere in the chart often offsets this.',
            body_hi:  'शुक्र विवाह और साझेदारी का प्राकृतिक कारक है, और गुरु विवाह तथा मार्गदर्शन का प्रमुख कारक है; शास्त्रीय ग्रंथ स्त्री की कुंडली में गुरु को विशेष महत्व देते हैं, हालाँकि आधुनिक विश्लेषण हर कुंडली में दोनों को देखता है। जब शुक्र या गुरु नीच, अस्त या पाप ग्रहों से अधिक प्रभावित हो, तो कुंडली संकेत दे सकती है कि संबंधों को आकार लेने में अधिक समय लगे। कुंडली में अन्यत्र मज़बूत शुक्र या गुरु अक्सर इसे संतुलित करता है।',
          },
          {
            id:       'analysis-retrograde-combust',
            icon:     '🔄',
            label:    'Retrograde or Combust 7th Lord',
            label_hi: 'वक्री या अस्त सप्तमेश',
            body:     'A retrograde 7th lord is traditionally read as an unconventional or revisited path to marriage — reconsidered decisions or a reconnection. A combust 7th lord, very close to the Sun, may indicate that partnership matters are overshadowed for a time by other priorities. Both are supporting indicators to weigh with the rest of the chart, not conclusions on their own.',
            body_hi:  'वक्री सप्तमेश को परंपरागत रूप से विवाह के अपरंपरागत या दोबारा लौटने वाले मार्ग के रूप में पढ़ा जाता है — जैसे पुनर्विचार किए गए निर्णय या किसी से फिर जुड़ना। अस्त सप्तमेश, जो सूर्य के बहुत निकट हो, संकेत दे सकता है कि कुछ समय तक साझेदारी के विषय अन्य प्राथमिकताओं से दब जाएँ। दोनों सहायक संकेतक हैं, जिन्हें बाकी कुंडली के साथ तौला जाता है; अकेले ये कोई निष्कर्ष नहीं हैं।',
          },
        ],
      },

      {
        id:       'delay-houses',
        title:    'Houses Linked With Delay in Marriage',
        title_hi: 'शादी में देरी से जुड़े भाव',
        layout:   'cards',
        items: [
          {
            id:       'house-7th',
            icon:     '🏠',
            label:    '7th House — The Primary House of Marriage',
            label_hi: 'सप्तम भाव — विवाह का मुख्य भाव',
            body:     'The 7th house, its lord, the planets placed in it and the planets aspecting it form the core of any marriage reading. Malefic influence from Saturn, Rahu, Ketu or Mars without the steadying support of Jupiter or Venus is one of the most commonly cited contributors to a slower path to marriage.',
            body_hi:  'सप्तम भाव, सप्तमेश, इसमें स्थित ग्रह और इस पर दृष्टि डालने वाले ग्रह विवाह के हर विश्लेषण का केंद्र हैं। गुरु या शुक्र के स्थिर करने वाले समर्थन के बिना शनि, राहु, केतु या मंगल का पाप प्रभाव विवाह के धीमे मार्ग के सबसे अधिक बताए जाने वाले कारणों में से एक है।',
          },
          {
            id:       'house-2nd',
            icon:     '🏛️',
            label:    '2nd House — Family Foundation',
            label_hi: 'द्वितीय भाव — परिवार की नींव',
            body:     'The 2nd house is Kutumba — family, family values and the household. When it or its lord is afflicted, family circumstances or differing expectations may contribute to delays in finalising a match, especially where families play a large role in the process.',
            body_hi:  'द्वितीय भाव कुटुंब है — परिवार, पारिवारिक मूल्य और घर। जब यह भाव या इसका स्वामी पीड़ित हो, तो पारिवारिक परिस्थितियाँ या अलग-अलग अपेक्षाएँ रिश्ता तय होने में देरी में योगदान दे सकती हैं, विशेषकर जहाँ प्रक्रिया में परिवार की बड़ी भूमिका हो।',
          },
          {
            id:       'house-8th',
            icon:     '⚡',
            label:    '8th House — Obstacles and Transformation',
            label_hi: 'अष्टम भाव — बाधाएँ और परिवर्तन',
            body:     'The 8th house represents obstacles and deep change, and as the 2nd house from the 7th it is also linked with the continuity of marriage. Its strong affliction may be associated with hurdles or a period of personal change before marriage comes together.',
            body_hi:  'अष्टम भाव बाधाओं और गहरे परिवर्तन का भाव है, और सप्तम से द्वितीय होने के कारण यह विवाह की निरंतरता से भी जुड़ा है। इसका गहरा पीड़न विवाह तय होने से पहले बाधाओं या व्यक्तिगत परिवर्तन के दौर से जुड़ा हो सकता है।',
          },
          {
            id:       'house-1st',
            icon:     '🧭',
            label:    '1st House — Personal Readiness',
            label_hi: 'प्रथम भाव — व्यक्तिगत तैयारी',
            body:     'The 1st house (Lagna) represents the self. A weak or afflicted Lagna or Lagna lord may describe hesitation, low confidence or other priorities taking precedence for a while — internal factors that can slow the move toward marriage.',
            body_hi:  'प्रथम भाव (लग्न) स्वयं का प्रतिनिधित्व करता है। कमज़ोर या पीड़ित लग्न अथवा लग्नेश हिचक, कम आत्मविश्वास या कुछ समय के लिए अन्य प्राथमिकताओं के आगे रहने को दर्शा सकता है — ऐसे आंतरिक कारक जो विवाह की ओर बढ़ने की गति धीमी कर सकते हैं।',
          },
          {
            id:       'house-12th',
            icon:     '🌙',
            label:    '12th House — Solitude and Inner Focus',
            label_hi: 'द्वादश भाव — एकांत और अंतर्मुखता',
            body:     'The 12th house governs solitude, distance and inner life. Heavy influence here, or a 7th lord placed in the 12th, may correlate with a preference for independence, a spiritual or inward phase, or a partner connected with a distant place — patterns that can lengthen the path to marriage.',
            body_hi:  'द्वादश भाव एकांत, दूरी और आंतरिक जीवन का भाव है। यहाँ भारी प्रभाव, या सप्तमेश का द्वादश भाव में होना, स्वतंत्रता की पसंद, आध्यात्मिक या अंतर्मुखी दौर, या दूर स्थान से जुड़े साथी से संबंधित हो सकता है — ऐसी प्रवृत्तियाँ जो विवाह के मार्ग को लंबा कर सकती हैं।',
          },
        ],
      },

      {
        id:       'structural-analysis',
        title:    'Navamsa and Supporting Evidence',
        title_hi: 'नवांश और सहायक प्रमाण',
        layout:   'list',
        items: [
          {
            id:       'analysis-navamsa',
            label:    'Navamsa (D9) — Supporting Evidence',
            label_hi: 'नवांश (D9) — सहायक प्रमाण',
            body:     'The Navamsa (D9) is the divisional chart traditionally used to examine marriage in depth. Astrologers check whether it repeats the pattern seen in the birth chart: if the D9 7th house and its lord also show stress, the delay indication is read as more significant; if the D9 is supportive, it tends to soften the birth-chart picture. The D9 adds weight to a reading — it does not cancel or confirm anything on its own.',
            body_hi:  'नवांश (D9) वह वर्ग कुंडली है जिससे परंपरागत रूप से विवाह का गहराई से विश्लेषण किया जाता है। ज्योतिषी देखते हैं कि क्या यह जन्मकुंडली की प्रवृत्ति को दोहराता है: यदि नवांश का सप्तम भाव और सप्तमेश भी दबाव दिखाएँ, तो देरी का संकेत अधिक महत्वपूर्ण माना जाता है; यदि नवांश सहायक हो, तो यह जन्मकुंडली के संकेत को नरम करता है। नवांश विश्लेषण को बल देता है — अकेले न किसी बात को रद्द करता है, न पुष्टि करता है।',
          },
          {
            id:       'analysis-darakaraka',
            label:    'Darakaraka (DK)',
            label_hi: 'दाराकारक (DK)',
            body:     'In the Jaimini system, the Darakaraka — the planet with the lowest degree in the chart — is a significator of the spouse. A weak or afflicted Darakaraka is sometimes read as a more effortful path to meeting the right partner. Its main use is describing the partner’s nature, which is covered in the Spouse Nature guide.',
            body_hi:  'जैमिनी पद्धति में दाराकारक — कुंडली में सबसे कम अंश वाला ग्रह — जीवनसाथी का कारक माना जाता है। कमज़ोर या पीड़ित दाराकारक को कभी-कभी सही साथी से मिलने के अधिक प्रयास वाले मार्ग के रूप में पढ़ा जाता है। इसका मुख्य उपयोग जीवनसाथी के स्वभाव को समझने में होता है, जिसे जीवनसाथी के स्वभाव वाली मार्गदर्शिका में बताया गया है।',
          },
          {
            id:       'analysis-upapada',
            label:    'Upapada Lagna (UL)',
            label_hi: 'उपपद लग्न (UL)',
            body:     'The Upapada Lagna is a Jaimini point used to judge the marriage itself. Affliction to the UL or its lord is sometimes read as added effort before marriage; like the D9 and the Darakaraka, it is supporting evidence rather than a verdict.',
            body_hi:  'उपपद लग्न जैमिनी पद्धति का एक बिंदु है, जिससे स्वयं विवाह का विचार किया जाता है। उपपद या उसके स्वामी के पीड़न को कभी-कभी विवाह से पहले अधिक प्रयास के रूप में पढ़ा जाता है; नवांश और दाराकारक की तरह यह भी अंतिम निर्णय नहीं, बल्कि सहायक प्रमाण है।',
          },
        ],
      },

      {
        id:       'delay-not-denial',
        title:    'Delayed Marriage Does Not Mean No Marriage',
        title_hi: 'शादी में देरी का अर्थ विवाह न होना नहीं है',
        layout:   'list',
        items: [
          {
            id:       'delay-vs-no-marriage',
            label:    'Delay and “No Marriage” Are Different Questions',
            label_hi: 'देरी और "विवाह न होना" अलग-अलग प्रश्न हैं',
            body:     'If you are asking “why am I not getting married?”, the first point is this: a delay indication means the path to marriage may be slower or need more effort. It does not mean marriage will not happen. No single placement, dosha or Dasha shows that a person will never marry — not Saturn in the 7th, not Rahu or Ketu, not a combust or retrograde 7th lord. Supportive factors such as a well-placed Jupiter or Venus often balance difficult ones, and the overall picture can only come from a careful whole-chart assessment. Even then, astrology describes tendencies, not certainties, and personal choices and circumstances keep shaping the outcome. If you feel worried by a single combination you have read about, it is a reason for a fuller reading — not for a conclusion.',
            body_hi:  'यदि आप सोच रहे हैं कि मेरी शादी क्यों नहीं हो रही, तो पहली बात यह है: देरी के संकेत का अर्थ है कि विवाह का मार्ग धीमा हो सकता है या उसमें अधिक प्रयास लग सकता है। इसका अर्थ यह नहीं कि विवाह नहीं होगा। कोई एक ग्रह-स्थिति, दोष या दशा यह नहीं दिखाती कि व्यक्ति का विवाह कभी नहीं होगा — न सप्तम भाव में शनि, न राहु या केतु, न अस्त या वक्री सप्तमेश। अच्छी स्थिति वाले गुरु या शुक्र जैसे सहायक कारक अक्सर कठिन कारकों को संतुलित करते हैं, और समग्र चित्र केवल पूरी कुंडली के सावधान विश्लेषण से ही बनता है। तब भी ज्योतिष प्रवृत्तियाँ बताता है, निश्चितताएँ नहीं, और व्यक्तिगत निर्णय तथा परिस्थितियाँ परिणाम को आकार देती रहती हैं। यदि किसी एक योग के बारे में पढ़कर आप चिंतित हैं, तो यह पूरे विश्लेषण का कारण है — किसी निष्कर्ष का नहीं।',
          },
        ],
      },

      {
        id:       'dasha-activation',
        title:    'Dasha: Are Delay Factors Active?',
        title_hi: 'दशा: क्या देरी के कारक सक्रिय हैं?',
        layout:   'checklist',
        items: [
          {
            id:       'timing-dasha',
            label:    'A Dasha brings existing factors into focus',
            label_hi: 'दशा पहले से मौजूद कारकों को सक्रिय करती है',
            body:     'A Mahadasha or Antardasha does not create delay factors that the birth chart does not show. When the running period belongs to a planet involved in the delay indications — for example Saturn, Rahu or an afflicted 7th lord — those themes may feel more prominent: a slower search, more caution or competing priorities. Periods of planets that support the 7th house, Venus or Jupiter tend to bring marriage matters forward more easily.',
            body_hi:  'महादशा या अंतर्दशा ऐसे देरी के कारक नहीं बनाती जो जन्मकुंडली में न हों। जब चल रही अवधि देरी के संकेतों से जुड़े ग्रह की हो — जैसे शनि, राहु या पीड़ित सप्तमेश — तो ये विषय अधिक प्रमुख लग सकते हैं: धीमी खोज, अधिक सावधानी या प्रतिस्पर्धी प्राथमिकताएँ। सप्तम भाव, शुक्र या गुरु का समर्थन करने वाले ग्रहों की दशाएँ विवाह के विषयों को अधिक सहजता से आगे बढ़ाती हैं।',
          },
          {
            id:       'timing-handoff',
            label:    'When marriage may happen is a separate question',
            label_hi: 'विवाह कब हो सकता है, यह अलग प्रश्न है',
            body:     'Knowing that delay factors are active does not tell you when marriage will take place or when a delay will end. Estimating supportive periods combines Dasha with the Navamsa and the transits of Jupiter and Saturn — that method is explained in the Marriage Timing guide linked below.',
            body_hi:  'यह जानना कि देरी के कारक सक्रिय हैं, यह नहीं बताता कि विवाह कब होगा या देरी कब समाप्त होगी। सहायक अवधियों का अनुमान दशा, नवांश और गुरु-शनि के गोचर को मिलाकर लगाया जाता है — यह विधि नीचे दी गई विवाह के समय की मार्गदर्शिका में समझाई गई है।',
          },
        ],
      },

      {
        id:       'real-world-factors',
        title:    'Not Every Delay Is Astrological',
        title_hi: 'हर देरी ज्योतिषीय नहीं होती',
        layout:   'list',
        items: [
          {
            id:       'practical-circumstances',
            label:    'Real Circumstances Matter Too',
            label_hi: 'वास्तविक परिस्थितियाँ भी मायने रखती हैं',
            body:     'Many delays have ordinary causes: years spent on education or building a career, a personal choice to wait, family responsibilities or circumstances, specific expectations of a partner, living somewhere with a small social circle, or taking time after a previous relationship. A chart reading is most useful alongside these realities — it can describe tendencies, but it should not be used to explain away every practical reason or to replace honest conversations with family and prospective partners.',
            body_hi:  'कई देरियों के सामान्य कारण होते हैं: पढ़ाई या करियर बनाने में लगे वर्ष, प्रतीक्षा करने का अपना निर्णय, पारिवारिक ज़िम्मेदारियाँ या परिस्थितियाँ, साथी के बारे में विशिष्ट अपेक्षाएँ, छोटे सामाजिक दायरे वाली जगह पर रहना, या पिछले संबंध के बाद समय लेना। कुंडली का विश्लेषण इन वास्तविकताओं के साथ सबसे उपयोगी होता है — यह प्रवृत्तियाँ बता सकता है, पर इसका उपयोग हर व्यावहारिक कारण को नकारने या परिवार और संभावित साथी के साथ खुली बातचीत की जगह लेने के लिए नहीं होना चाहिए।',
          },
        ],
      },

      {
        id:       'remedies',
        title:    'What You Can Do: Balanced Remedies',
        title_hi: 'आप क्या कर सकते हैं: संतुलित उपाय',
        layout:   'checklist',
        items: [
          {
            id:       'remedy-saturn',
            label:    'Patience, Discipline and Service',
            label_hi: 'धैर्य, अनुशासन और सेवा',
            body:     'Where Saturn’s influence is part of the picture, the traditional response is patience, steady effort and service to others — especially elders. These practices support a calmer, more mature approach to the search; they are not a way to force an outcome.',
            body_hi:  'जहाँ शनि का प्रभाव चित्र का हिस्सा हो, वहाँ परंपरागत उपाय धैर्य, स्थिर प्रयास और दूसरों — विशेषकर बड़ों — की सेवा है। ये अभ्यास खोज के प्रति शांत और परिपक्व दृष्टिकोण में सहायक होते हैं; ये किसी परिणाम को बाध्य करने का साधन नहीं हैं।',
          },
          {
            id:       'remedy-karaka',
            label:    'Traditional Practices for Venus and Jupiter',
            label_hi: 'शुक्र और गुरु के लिए पारंपरिक अभ्यास',
            body:     'Where Venus or Jupiter is weak, mantra or stotra recitation — such as the Lalita Sahasranama for Venus or the Vishnu Sahasranama for Jupiter — is a traditional practice for focus and clarity. Treat it as optional support for your own state of mind; no mantra or gemstone can promise a marriage.',
            body_hi:  'जहाँ शुक्र या गुरु कमज़ोर हों, वहाँ मंत्र या स्तोत्र पाठ — जैसे शुक्र के लिए ललिता सहस्रनाम या गुरु के लिए विष्णु सहस्रनाम — एकाग्रता और स्पष्टता का पारंपरिक अभ्यास है। इसे अपनी मानसिक स्थिति के लिए वैकल्पिक सहायता मानें; कोई मंत्र या रत्न विवाह का वादा नहीं कर सकता।',
          },
          {
            id:       'remedy-self',
            label:    'Self-Development',
            label_hi: 'आत्म-विकास',
            body:     'Using the waiting period for personal growth, career, health and clarity about what you want in a partner is one of the most practical responses — and it helps whatever the chart shows.',
            body_hi:  'प्रतीक्षा के समय का उपयोग व्यक्तिगत विकास, करियर, स्वास्थ्य और साथी के बारे में अपनी स्पष्टता के लिए करना सबसे व्यावहारिक कदमों में से एक है — और यह कुंडली चाहे जो दिखाए, सहायक रहता है।',
          },
          {
            id:       'remedy-conversation',
            label:    'Honest Conversations',
            label_hi: 'खुली बातचीत',
            body:     'Talking openly with family about expectations, timelines and what matters to you often removes practical obstacles that no astrological remedy can address.',
            body_hi:  'अपेक्षाओं, समय-सीमा और आपके लिए क्या महत्वपूर्ण है, इस पर परिवार से खुलकर बात करना अक्सर ऐसी व्यावहारिक बाधाएँ दूर करता है जिन्हें कोई ज्योतिषीय उपाय नहीं संभाल सकता।',
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
            id:       'myth-one-placement',
            label:    'Myth: One planet in the 7th decides a late marriage',
            label_hi: 'भ्रम: सप्तम भाव का एक ग्रह देर से शादी तय करता है',
            body:     'Saturn, Mars, Rahu or Ketu in the 7th house is only one factor. Its effect depends on its strength, the 7th lord, Venus, Jupiter and the rest of the chart.',
            body_hi:  'सप्तम भाव में शनि, मंगल, राहु या केतु केवल एक कारक है। इसका प्रभाव इसकी शक्ति, सप्तमेश, शुक्र, गुरु और बाकी कुंडली पर निर्भर करता है।',
          },
          {
            id:       'myth-prayers',
            label:    'Myth: A ritual will instantly remove the delay',
            label_hi: 'भ्रम: कोई अनुष्ठान तुरंत देरी दूर कर देगा',
            body:     'Remedies are traditionally used for inner balance and clarity. They support the person going through a slower phase; they are not a guaranteed way to change events.',
            body_hi:  'उपायों का उपयोग परंपरागत रूप से आंतरिक संतुलन और स्पष्टता के लिए किया जाता है। ये धीमे दौर से गुज़र रहे व्यक्ति का साथ देते हैं; घटनाओं को बदलने का निश्चित तरीका नहीं हैं।',
          },
          {
            id:       'myth-exact-day',
            label:    'Myth: An astrologer can name the exact day the delay ends',
            label_hi: 'भ्रम: ज्योतिषी देरी समाप्त होने का सटीक दिन बता सकते हैं',
            body:     'Astrology can describe more and less supportive periods, not a fixed calendar date. Claims of an exact day deserve caution; how supportive periods are estimated is covered in the Marriage Timing guide.',
            body_hi:  'ज्योतिष अधिक और कम सहायक अवधियों का वर्णन कर सकता है, कोई तय तारीख नहीं। सटीक दिन बताने के दावों पर सावधानी रखें; सहायक अवधियों का अनुमान कैसे लगाया जाता है, यह विवाह के समय की मार्गदर्शिका में बताया गया है।',
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
            id:       'faq-why-delayed',
            label:    'Why is my marriage getting delayed according to astrology?',
            label_hi: 'ज्योतिष के अनुसार मेरी शादी में देरी क्यों हो रही है?',
            body:     'Astrologers look for a combination of factors: an afflicted or weakly placed 7th house or 7th lord, the influence of Saturn, Mars, Rahu or Ketu on them, a challenged Venus or Jupiter, and supporting signs such as a combust or retrograde 7th lord or stress in the Navamsa. Several of these together may indicate a slower path; one alone does not. Real-life circumstances matter as well, so a full reading considers both.',
            body_hi:  'ज्योतिषी कई कारकों के मेल को देखते हैं: पीड़ित या कमज़ोर स्थिति वाला सप्तम भाव या सप्तमेश, उन पर शनि, मंगल, राहु या केतु का प्रभाव, कमज़ोर शुक्र या गुरु, और अस्त या वक्री सप्तमेश अथवा नवांश में दबाव जैसे सहायक संकेत। इनमें से कई एक साथ हों तो धीमे मार्ग का संकेत हो सकता है; अकेला एक कारक नहीं। वास्तविक जीवन की परिस्थितियाँ भी मायने रखती हैं, इसलिए पूरा विश्लेषण दोनों को देखता है।',
          },
          {
            id:       'faq-which-house',
            label:    'Which house is linked with delay in marriage?',
            label_hi: 'शादी में देरी से कौन-सा भाव जुड़ा है?',
            body:     'The 7th house and its lord are central. Astrologers also look at the 2nd house (family), the 8th house (obstacles), the 1st house (personal readiness) and the 12th house (solitude and distance), together with the Navamsa. No single house decides the question.',
            body_hi:  'सप्तम भाव और सप्तमेश केंद्रीय हैं। ज्योतिषी द्वितीय भाव (परिवार), अष्टम भाव (बाधाएँ), प्रथम भाव (व्यक्तिगत तैयारी) और द्वादश भाव (एकांत और दूरी) को भी नवांश के साथ देखते हैं। कोई एक भाव इस प्रश्न का निर्णय नहीं करता।',
          },
          {
            id:       'faq-saturn-denial',
            label:    'Does Saturn in the 7th always delay marriage?',
            label_hi: 'क्या सप्तम भाव में शनि हमेशा शादी में देरी करता है?',
            body:     'No. Saturn in the 7th house is often associated with a slower, more cautious and responsibility-minded approach to marriage, but its effect depends on its sign, strength and the support it receives. With benefic support it frequently describes a stable, mature partnership rather than a problem.',
            body_hi:  'नहीं। सप्तम भाव में शनि को अक्सर विवाह के प्रति धीमे, सावधान और ज़िम्मेदारी-भरे दृष्टिकोण से जोड़ा जाता है, पर इसका प्रभाव इसकी राशि, शक्ति और मिलने वाले समर्थन पर निर्भर करता है। शुभ ग्रहों के समर्थन से यह अक्सर किसी समस्या के बजाय स्थिर और परिपक्व साझेदारी दर्शाता है।',
          },
          {
            id:       'faq-mars',
            label:    'Can Mars cause delay in marriage?',
            label_hi: 'क्या मंगल शादी में देरी का कारण बन सकता है?',
            body:     'Mars is not a delay planet in itself. A strongly afflicted Mars on the 7th house or its lord may contribute to friction or impatience that slows relationships down. Whether it matters depends on the rest of the chart; the Manglik question in kundli matching is a separate topic.',
            body_hi:  'मंगल अपने-आप में देरी का ग्रह नहीं है। सप्तम भाव या सप्तमेश पर गहराई से पीड़ित मंगल ऐसे टकराव या अधीरता में योगदान दे सकता है जिससे संबंध धीमे पड़ें। यह कितना महत्वपूर्ण है, यह बाकी कुंडली पर निर्भर करता है; कुंडली मिलान में मांगलिक का प्रश्न अलग विषय है।',
          },
          {
            id:       'faq-rahu-ketu',
            label:    'Can Rahu or Ketu delay marriage?',
            label_hi: 'क्या राहु या केतु शादी में देरी कर सकते हैं?',
            body:     'They can contribute. Rahu may point to unusual or very specific expectations of a partner; Ketu may point to a phase of detachment when marriage feels less important. Neither means marriage will not happen, and both are read together with the 7th lord, Venus and Jupiter.',
            body_hi:  'ये योगदान दे सकते हैं। राहु साथी के बारे में असामान्य या बहुत विशिष्ट अपेक्षाओं का संकेत दे सकता है; केतु विरक्ति के ऐसे दौर का संकेत दे सकता है जब विवाह कम महत्वपूर्ण लगे। दोनों में से किसी का अर्थ विवाह न होना नहीं है, और दोनों को सप्तमेश, शुक्र और गुरु के साथ पढ़ा जाता है।',
          },
          {
            id:       'faq-weak-7th-lord',
            label:    'Does a weak or combust 7th lord mean late marriage?',
            label_hi: 'क्या कमज़ोर या अस्त सप्तमेश का अर्थ देर से शादी है?',
            body:     'It may indicate a more effortful path, but it is not a verdict. A combust 7th lord can suggest partnership matters are overshadowed for a while, and a weak 7th lord can suggest a longer search. Support from Jupiter, Venus or a strong Navamsa often balances this.',
            body_hi:  'यह अधिक प्रयास वाले मार्ग का संकेत दे सकता है, पर यह कोई अंतिम निर्णय नहीं है। अस्त सप्तमेश संकेत दे सकता है कि कुछ समय तक साझेदारी के विषय दबे रहें, और कमज़ोर सप्तमेश लंबी खोज का संकेत दे सकता है। गुरु, शुक्र या मज़बूत नवांश का समर्थन अक्सर इसे संतुलित करता है।',
          },
          {
            id:       'faq-never-marry',
            label:    'Does delayed marriage mean I will not marry?',
            label_hi: 'क्या शादी में देरी का अर्थ है कि मेरी शादी नहीं होगी?',
            body:     'No. A delay indication describes a slower or more effortful path, not the absence of marriage. No single placement, dosha or Dasha shows that someone will never marry, and astrology describes tendencies rather than certainties. See the section above on why delayed marriage does not mean no marriage.',
            body_hi:  'नहीं। देरी का संकेत धीमे या अधिक प्रयास वाले मार्ग का वर्णन करता है, विवाह के न होने का नहीं। कोई एक ग्रह-स्थिति, दोष या दशा यह नहीं दिखाती कि किसी का विवाह कभी नहीं होगा, और ज्योतिष निश्चितताएँ नहीं, प्रवृत्तियाँ बताता है। ऊपर दिया गया खंड देखें कि शादी में देरी का अर्थ विवाह न होना क्यों नहीं है।',
          },
          {
            id:       'faq-when-delay-ends',
            label:    'Can astrology tell when the delay will end?',
            label_hi: 'क्या ज्योतिष बता सकता है कि देरी कब खत्म होगी?',
            body:     'Astrology can describe periods that are more or less supportive for marriage, by combining Dasha with the Navamsa and transits — not a fixed date. That timing method has its own guide: see Marriage Timing.',
            body_hi:  'ज्योतिष दशा, नवांश और गोचर को मिलाकर विवाह के लिए अधिक या कम सहायक अवधियों का वर्णन कर सकता है — कोई तय तारीख नहीं। समय निर्धारण की इस विधि पर अलग मार्गदर्शिका है: विवाह के समय की मार्गदर्शिका देखें।',
          },
          {
            id:       'faq-remedies',
            label:    'Are there remedies for delayed marriage?',
            label_hi: 'क्या शादी में देरी के लिए उपाय हैं?',
            body:     'Traditional practices — patience and service where Saturn is involved, mantras or stotras for Venus and Jupiter — are used for inner balance and clarity. They are optional and cannot promise a marriage. Practical steps such as self-development and honest conversations with family often matter just as much.',
            body_hi:  'पारंपरिक अभ्यास — जहाँ शनि शामिल हो वहाँ धैर्य और सेवा, शुक्र और गुरु के लिए मंत्र या स्तोत्र — आंतरिक संतुलन और स्पष्टता के लिए किए जाते हैं। ये वैकल्पिक हैं और विवाह का वादा नहीं कर सकते। आत्म-विकास और परिवार से खुली बातचीत जैसे व्यावहारिक कदम भी अक्सर उतने ही महत्वपूर्ण होते हैं।',
          },
        ],
      },

    ],
    ctas: [
      {
        id:             'cta-marriage-path',
        type:           'tool',
        slug:           'marriage-path',
        label:          'Check Your 7th House for Free',
        label_hi:       'अपना सप्तम भाव निःशुल्क देखें',
        description:    'A free, general 7th-house marriage check based on your birth details.',
        description_hi: 'आपके जन्म विवरण पर आधारित सप्तम भाव की निःशुल्क, सामान्य विवाह जांच।',
        variant:        'primary',
      },
      {
        id:             'cta-delay-in-marriage-report',
        type:           'report',
        slug:           'delay_in_marriage_report',
        label:          'Get Delay in Marriage Report',
        label_hi:       'विवाह में देरी रिपोर्ट प्राप्त करें',
        description:    'A personalised PDF report based on your birth chart.',
        description_hi: 'आपकी जन्म कुंडली पर आधारित व्यक्तिगत PDF रिपोर्ट।',
        variant:        'secondary',
      },
    ],
  },

  aiMetadata: {
    searchIntent:   'informational',
    difficulty:     'beginner',
    authorityLevel: 'standard',
  },

  schemaSignals: {
    expertise:     'Authored by Vedic astrologers specializing in delay-in-marriage indications, 7th house analysis and the role of Saturn, Mars, Rahu-Ketu, Venus and Jupiter.',
    // First authored in commit 7cd8637 (2026-07-20, "marriage hub").
    datePublished: '2026-07-20',
  },

  authority: {
    reviewStatus:   'not-reviewed',
    contentVersion: 2,
    // DM-2 restructure (direct answer, delay-vs-no-marriage, real-world factors, SSR FAQ).
    lastUpdated:    '2026-10-06',
  },

  publishing: {
    isIndexable:     false,
    isSearchEnabled: false,
    visibility:      'private',
  },

}
