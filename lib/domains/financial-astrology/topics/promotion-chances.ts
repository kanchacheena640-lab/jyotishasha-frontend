import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const promotionChances: DomainTopic = {

  identity: {
    id:        'astrology:promotion-chances',
    slug:      'promotion-chances',
    title:     'Promotion in Astrology: Career Advancement Indicators',
    title_hi:  'पदोन्नति का ज्योतिष: करियर उन्नति के संकेत',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/promotion-chances',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',              href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष',  href: '/financial-astrology' },
      { label: 'Promotion Chances',   label_hi: 'पदोन्नति की संभावना', href: '/financial-astrology/promotion-chances' },
    ],
  },

  seo: {
    metaTitle:          'Career Promotion in Astrology: Which Planets Deliver',
    metaDescription:    'Which planets in your horoscope indicate a promotion? Learn how Sun, Jupiter, and Saturn work differently for advancement — and when your chart says yes.',
    metaDescription_hi: 'कुंडली में पदोन्नति के संकेत कौन से हैं? जानें सूर्य, गुरु और शनि पदोन्नति में कैसे अलग-अलग भूमिका निभाते हैं।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Promotion and Career Advancement Shown in Your Birth Chart',
    headline_hi: 'कुंडली में पदोन्नति और करियर उन्नति के संकेत',
    subtext:     'Recognition and actual promotion are two different events in Vedic astrology — the Sun delivers visibility, but Jupiter delivers the elevation, and Saturn delivers the official appointment that sticks',
    subtext_hi:  'पहचान और वास्तविक पदोन्नति ज्योतिष में दो अलग घटनाएं हैं — सूर्य दृश्यता देता है, गुरु उन्नति देता है, और शनि टिकाऊ आधिकारिक नियुक्ति देता है',
  },

  taxonomy: {
    tags:        ['promotion', 'career-advancement', 'recognition', 'sun-career', 'jupiter-career', 'dasha-timing'],
    keywords:    ['promotion in astrology', 'career advancement horoscope', 'job promotion kundali', 'when will I get promoted astrology', 'career growth yoga astrology'],
    keywords_hi: ['ज्योतिष में पदोन्नति', 'करियर उन्नति के योग', 'पदोन्नति कब मिलेगी', 'नौकरी में प्रमोशन ज्योतिष'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'promotion-planets',
        title:    'Planets That Drive Promotion and Recognition',
        title_hi: 'पदोन्नति और पहचान देने वाले ग्रह',
        layout:   'cards',
        items: [
          {
            id:       'sun-recognition',
            icon:     '☉',
            label:    'Sun — Visibility and Recognition',
            label_hi: 'सूर्य — दृश्यता और पहचान',
            body:     "The Sun governs authority, recognition, and being seen by superiors — but it does not automatically produce promotions. When the Sun is active in dasha or transit over the 10th house, the native becomes more visible: noticed by leadership, praised in meetings, given additional responsibility. The mistake is expecting this visibility to automatically translate into a formal promotion. The Sun sets the stage; Jupiter delivers the actual title change.",
            body_hi:  'सूर्य अधिकार और पहचान का कारक है — लेकिन यह स्वतः पदोन्नति नहीं देता। सूर्य दशा में व्यक्ति वरिष्ठों की नजर में आता है। लेकिन वास्तविक पदोन्नति के लिए गुरु का सक्रिय होना जरूरी है।',
            badge:    'Visibility First',
            badge_hi: 'पहले दृश्यता',
            badgeVariant: 'info',
          },
          {
            id:       'jupiter-elevation',
            icon:     '♃',
            label:    'Jupiter — Actual Elevation',
            label_hi: 'गुरु — वास्तविक उन्नति',
            body:     "Jupiter's dasha or transit over the natal Sun, 10th house, or 10th lord is the primary indicator of genuine career elevation — a formal increase in responsibilities, title, and often team size. The distinction between Jupiter and Sun is critical: when only the Sun is active, the native is recognized but not promoted. When Jupiter joins, the recognition converts into structural advancement. Look for the Jupiter-Sun activation overlap to time a promotion cycle accurately.",
            body_hi:  'गुरु की दशा या दशम भाव पर गोचर वास्तविक उन्नति का सबसे प्रमुख संकेत है — जिम्मेदारियों, पद और प्रायः टीम आकार में वृद्धि। सूर्य-गुरु का एक साथ सक्रिय होना प्रमोशन चक्र की सटीक समय-सीमा देता है।',
            badge:    'Title Change',
            badge_hi: 'पद में बदलाव',
            badgeVariant: 'positive',
          },
          {
            id:       'saturn-appointment',
            icon:     '♄',
            label:    'Saturn — Official Appointment',
            label_hi: 'शनि — आधिकारिक नियुक्ति',
            body:     "Saturn's role in promotion is often misunderstood. Saturn does not produce glamorous or sudden promotions. What Saturn gives is the promotion that is formalized, documented, and permanent — the official appointment that no one can reverse. For Taurus, Libra, Capricorn, and Aquarius ascendants, Saturn dasha promotions are the most enduring of a career. For other ascendants, Saturn may delay the paperwork but ensure it happens through proper channels.",
            body_hi:  'शनि की भूमिका गलत समझी जाती है। शनि तत्काल पदोन्नति नहीं देता — वह औपचारिक, दस्तावेजीकृत और स्थायी नियुक्ति देता है। शनि दशा की पदोन्नति सबसे टिकाऊ होती है।',
            badge:    'Permanent & Formal',
            badge_hi: 'स्थायी और औपचारिक',
            badgeVariant: 'neutral',
          },
          {
            id:       'mars-performance',
            icon:     '♂',
            label:    'Mars — Performance-Based Advancement',
            label_hi: 'मंगल — प्रदर्शन-आधारित उन्नति',
            body:     "Mars produces promotions through raw performance: exceeding targets, leading a critical project, or solving a problem the organization couldn't solve otherwise. Mars-driven promotions are faster to arrive but sometimes shorter-lived — because they are based on a specific achievement rather than sustained authority. For ascendants where Mars is a yogakaraka (Cancer, Leo), Mars dasha promotions have lasting structural impact.",
            body_hi:  'मंगल प्रदर्शन के माध्यम से पदोन्नति देता है: लक्ष्य पार करना, महत्वपूर्ण परियोजना का नेतृत्व। मंगल-चालित पदोन्नति तेज आती है लेकिन कभी-कभी कम स्थायी होती है।',
            badge:    'Performance Driven',
            badge_hi: 'प्रदर्शन-आधारित',
            badgeVariant: 'positive',
          },
        ],
      },

      {
        id:       'promotion-by-lagna',
        title:    'Promotion Timing by Ascendant: Key Dasha Periods',
        title_hi: 'लग्न के अनुसार पदोन्नति का समय: प्रमुख दशा काल',
        layout:   'accordion',
        items: [
          {
            id:       'aries-scorpio',
            label:    'Aries and Scorpio Ascendant',
            label_hi: 'मेष और वृश्चिक लग्न',
            body:     "For Aries lagna, Mars dasha is the primary promotion period — especially when Mars occupies the 10th, 1st, or 5th house natally. Sun antardasha within Jupiter mahadasha is the next most reliable window. For Scorpio lagna, Mars still triggers promotion but also watch Jupiter dasha: Jupiter rules the 2nd and 5th houses from Scorpio, bringing income increase alongside promotion.",
            body_hi:  'मेष लग्न के लिए मंगल दशा प्रमुख पदोन्नति काल है। वृश्चिक लग्न के लिए भी मंगल सक्रिय है, लेकिन गुरु दशा में द्वितीय और पंचम भाव के स्वामी के रूप में आय और उन्नति दोनों आते हैं।',
          },
          {
            id:       'taurus-libra',
            label:    'Taurus and Libra Ascendant',
            label_hi: 'वृष और तुला लग्न',
            body:     "Saturn is the yogakaraka for both Taurus (rules 9th and 10th) and Libra (rules 4th and 5th) ascendants. Saturn dasha or antardasha is the most reliable promotion period for these charts — typically not immediately at dasha start but after the first 2-3 years when Saturn matures its karaka role. Venus, as lagna lord for both, in antardasha within a favorable mahadasha also brings recognition from leadership.",
            body_hi:  'शनि वृष और तुला दोनों के लिए योगकारक है। शनि दशा इन लग्नों के लिए सबसे विश्वसनीय पदोन्नति काल है — आमतौर पर दशा के पहले 2-3 वर्षों के बाद जब शनि अपनी कारक भूमिका में परिपक्व होता है।',
          },
          {
            id:       'gemini-virgo',
            label:    'Gemini and Virgo Ascendant',
            label_hi: 'मिथुन और कन्या लग्न',
            body:     "For Mercury-ruled ascendants, Mercury dasha or antardasha brings promotions particularly in analytical, communication, or technology-focused roles. The key timing signal is Mercury's transit over the natal 10th lord combined with Jupiter aspecting the natal Mercury. Venus dasha is the secondary promotion window — Venus rules the 5th and 12th (Gemini) or 2nd and 9th (Virgo), bringing different flavors of advancement.",
            body_hi:  'बुध-स्वामित्व वाले लग्नों के लिए बुध दशा विश्लेषण, संचार और प्रौद्योगिकी भूमिकाओं में पदोन्नति लाती है। शुक्र दशा द्वितीयक पदोन्नति काल है।',
          },
          {
            id:       'cancer-leo',
            label:    'Cancer and Leo Ascendant',
            label_hi: 'कर्क और सिंह लग्न',
            body:     "For Cancer lagna, Jupiter dasha is the primary promotion period — Jupiter rules the 6th and 9th, and when well-placed, its dasha brings both service recognition and higher-purpose advancement. The Moon-Jupiter combination in transit is a reliable monthly signal for Cancer natives. For Leo lagna, Sun dasha should be the promotion period, but watch for Saturn's influence: Saturn rules the 6th and 7th from Leo and can delay despite Sun visibility.",
            body_hi:  'कर्क लग्न के लिए गुरु दशा प्रमुख पदोन्नति काल है। सिंह लग्न के लिए सूर्य दशा होनी चाहिए, लेकिन शनि का प्रभाव देरी कर सकता है।',
          },
          {
            id:       'capricorn-aquarius',
            label:    'Capricorn and Aquarius Ascendant',
            label_hi: 'मकर और कुंभ लग्न',
            body:     "Saturn is the lagna lord for both Capricorn and Aquarius. Its dasha brings promotions that are exceptionally stable — built on track record and formal documentation. The characteristic of Saturn dasha promotions for these ascendants is that they often come with a salary increase that continues for years, not just a one-time adjustment. Venus antardasha within Saturn mahadasha is particularly strong for Capricorn; Jupiter antardasha for Aquarius.",
            body_hi:  'शनि मकर और कुंभ दोनों का लग्नेश है। इन लग्नों में शनि दशा की पदोन्नति असाधारण रूप से स्थिर होती है — जो ट्रैक रिकॉर्ड और आधिकारिक दस्तावेज पर बनी होती है।',
          },
        ],
      },

      {
        id:       'promotion-yogas',
        title:    'Birth Chart Yogas That Support Career Advancement',
        title_hi: 'पदोन्नति के लिए सहायक जन्मकुंडली योग',
        layout:   'checklist',
        items: [
          {
            id:          'sun-tenth',
            label:       'Sun placed in or aspecting the 10th house — visibility to authority is built in',
            label_hi:    'सूर्य दशम भाव में या उस पर दृष्टि से — प्रमुखों की नजर में रहना सहज है',
            badgeVariant: 'positive',
          },
          {
            id:          'jupiter-tenth-lord',
            label:       'Jupiter associated with the 10th lord by conjunction, aspect, or mutual reception',
            label_hi:    'गुरु का दशमेश से युति, दृष्टि या परस्पर स्थिति से संबंध',
            badgeVariant: 'positive',
          },
          {
            id:          'tenth-lord-exalted',
            label:       '10th lord in its own sign or exalted — career house is strengthened at root',
            label_hi:    'दशमेश अपनी राशि में या उच्च का — करियर भाव मूल से मजबूत',
            badgeVariant: 'positive',
          },
          {
            id:          'rajyoga-present',
            label:       'A Rajayoga formed by the combination of kendra and trikona lords — natural authority yoga',
            label_hi:    'केंद्र और त्रिकोण स्वामियों का योग — राजयोग उपस्थित',
            badgeVariant: 'positive',
          },
          {
            id:          'no-papakartari-tenth',
            label:       '10th house is not hemmed in by malefics on both sides (Papakartari yoga absent)',
            label_hi:    'दशम भाव दोनों ओर पाप ग्रहों से घिरा नहीं है (पापकर्तरी योग अनुपस्थित)',
            badgeVariant: 'positive',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Promotion in Astrology',
        title_hi: 'ज्योतिष में पदोन्नति के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-stuck',
            label:    'My chart looks favorable but I have not been promoted in years. Why?',
            label_hi: 'मेरी कुंडली अनुकूल दिखती है फिर भी वर्षों से पदोन्नति नहीं मिली। क्यों?',
            body:     "A 'favorable chart' for career doesn't guarantee promotion unless a specific dasha of a career-relevant planet is also running. A well-placed 10th lord gives potential, not guaranteed outcome. Two common reasons for delayed promotion: (1) The 8th lord or 12th lord is running a prominent dasha, suppressing the 10th house potential. (2) The natal 10th house is strong but the transiting 10th lord is consistently under malefic aspects, preventing the potential from activating.",
            body_hi:  'अनुकूल कुंडली पदोन्नति की संभावना देती है, गारंटी नहीं। देरी के दो सामान्य कारण: (1) अष्टमेश या द्वादशेश की प्रमुख दशा चल रही है। (2) गोचर में दशमेश लगातार पाप दृष्टि में है।',
          },
          {
            id:       'faq-same-level',
            label:    'I keep getting recognition but no promotion. What does this indicate?',
            label_hi: 'मुझे पहचान तो मिलती है पर पदोन्नति नहीं। इसका क्या अर्थ है?',
            body:     "This pattern — high visibility, no structural advancement — is a signature of strong Sun with weak or inactive Jupiter. The Sun is doing its job: you are seen. But Jupiter, which governs expansion, higher position, and formal elevation, is either in a weak dasha, under malefic transit, or poorly placed natally. The solution astrologically is to identify when Jupiter becomes active and target that window for making a direct case for promotion.",
            body_hi:  'यह स्थिति — उच्च दृश्यता, कोई उन्नति नहीं — मजबूत सूर्य और कमजोर गुरु का संकेत है। सूर्य अपना काम कर रहा है: आप दिखते हैं। लेकिन गुरु दशा में कमजोर या पाप गोचर में है।',
          },
          {
            id:       'faq-competitive-environment',
            label:    'In a very competitive workplace, does astrology still predict who gets promoted?',
            label_hi: 'बहुत प्रतिस्पर्धी कार्यस्थल में, क्या ज्योतिष अभी भी भविष्यवाणी करता है?',
            body:     "Yes — but the prediction becomes more probabilistic than certain. In a competitive environment, the person with the strongest active career dasha has the highest probability of being chosen. This doesn't mean others can't be promoted — it means that when all else is equal, the astrological window is what tips the outcome. The person in a Jupiter main dasha + Saturn antardasha with a 10th lord transit will outperform in a competitive cycle.",
            body_hi:  'हाँ — लेकिन भविष्यवाणी निश्चित से अधिक संभाव्य होती है। जब सब बराबर हो, तो सबसे मजबूत करियर दशा वाला व्यक्ति परिणाम तय करता है।',
          },
          {
            id:       'faq-multiple-promotions',
            label:    'Can a single dasha bring multiple promotions?',
            label_hi: 'क्या एक दशा में एक से अधिक पदोन्नति हो सकती है?',
            body:     "Yes, within a long mahadasha (like Jupiter at 16 years or Saturn at 19 years), multiple antardasha periods of career-relevant planets can each produce a promotion. The pattern is one promotion per active career-planet antardasha within the main dasha. More than three promotions in one mahadasha is unusual and typically requires an exceptionally strong natal chart with multiple career yogas stacked together.",
            body_hi:  'हाँ, एक लंबी महादशा (गुरु 16 वर्ष, शनि 19 वर्ष) में कई अंतर्दशाएं अलग-अलग पदोन्नति दे सकती हैं। एक महादशा में एक से अधिक तीन पदोन्नति असामान्य है।',
          },
        ],
      },

      {
        id:       'disclaimer',
        title:    'About This Content',
        title_hi: 'इस सामग्री के बारे में',
        layout:   'alert',
        items: [
          {
            id:       'disclaimer-text',
            label:    'For Educational Purposes Only',
            label_hi: 'केवल शैक्षिक उद्देश्यों के लिए',
            body:     'Astrological analysis describes tendencies and timing patterns observed across birth charts — it does not predict fixed outcomes. Career and financial results depend on personal effort, decisions, and individual circumstances. This content is educational and should not replace professional career, financial, or legal advice.',
            body_hi:  'ज्योतिषीय विश्लेषण जन्मकुंडलियों में देखी गई प्रवृत्तियों और समय पैटर्न का वर्णन करता है — यह निश्चित परिणामों की भविष्यवाणी नहीं करता। करियर और वित्तीय परिणाम व्यक्तिगत प्रयास, निर्णयों और परिस्थितियों पर निर्भर करते हैं। यह सामग्री शैक्षिक है और पेशेवर करियर, वित्तीय या कानूनी सलाह की जगह नहीं लेनी चाहिए।',
            badgeVariant: 'info',
          },
        ],
      },
    ],

    ctas: [
      {
        id:          'cta-career-report',
        type:        'report',
        slug:        'career_report',
        label:       'Get Your Promotion Timeline Report',
        label_hi:    'अपनी पदोन्नति समयरेखा रिपोर्ट प्राप्त करें',
        description: 'A detailed analysis of your Sun, Jupiter, and Saturn placements with a dasha-by-dasha promotion forecast showing your strongest career advancement windows over the next 12 years.',
        description_hi: 'आपके सूर्य, गुरु और शनि की स्थितियों का विस्तृत विश्लेषण — दशा-दर-दशा पदोन्नति पूर्वानुमान जो अगले 12 वर्षों में आपकी सबसे मजबूत करियर उन्नति खिड़कियां दिखाता है।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Promotion Window',
        label_hi:    'अपनी पदोन्नति की खिड़की जाँचें',
        description: 'Enter your birth details to see which planetary periods currently support career advancement and when your next promotion window opens in the dasha sequence.',
        description_hi: 'अपना जन्म विवरण दर्ज करें और जानें कौन सी दशाएं पदोन्नति में सहायक हैं — और अगली पदोन्नति खिड़की कब खुलती है।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Help readers understand which planets, yogas, and dasha periods indicate career promotion in Vedic astrology.',
    targetAudience:  ['professionals seeking promotion', 'Vedic astrology students', 'HR professionals curious about timing'],
    primaryQuestion: 'Which planets and dasha periods indicate a promotion in my birth chart?',
    contentAngle:    'Recognition (Sun) and actual elevation (Jupiter) are distinct astrological events — and most stalled promotions stem from confusing the two',
    relatedConcepts: ['rajyoga', '10th house lord', 'sun career', 'jupiter elevation', 'saturn appointment', 'dasha timing', 'papakartari'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish analysis of career promotion timing using Sun, Jupiter, and Saturn activations and natal yogas',
    datePublished: '2026-07-18',
  },

  authority: {
    reviewStatus:   'approved',
    lastUpdated:    '2026-07-18T00:00:00Z',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     true,
    isSearchEnabled: true,
    visibility:      'public',
  },

  lineage: {
    firstAuthoredAt: '2026-07-18',
    migratedAt:      '2026-07-19',
    legacySource:    'authority-topic-v1',
    legacyVersion:   1,
  },
}
