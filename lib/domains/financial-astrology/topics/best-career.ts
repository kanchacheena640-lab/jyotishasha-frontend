import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const bestCareer: DomainTopic = {

  identity: {
    id:        'astrology:best-career',
    slug:      'best-career',
    title:     'Best Career According to Your Birth Chart',
    title_hi:  'जन्मकुंडली के अनुसार सर्वश्रेष्ठ करियर',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/best-career',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Best Career',         label_hi: 'सर्वश्रेष्ठ करियर', href: '/financial-astrology/best-career' },
    ],
  },

  seo: {
    metaTitle:          'Best Career for Your Birth Chart: Vedic Astrology Guide',
    metaDescription:    'Use your 10th house, 10th lord nakshatra, and Atmakaraka to find the career domain where your chart is strongest — the most precise method in Vedic astrology.',
    metaDescription_hi: 'आपका दशम भाव करियर क्षेत्र बताता है। दशमेश की नक्षत्र स्थिति उस क्षेत्र के भीतर विशिष्ट कार्य प्रकार बताती है।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'What Is the Best Career for Your Birth Chart?',
    headline_hi: 'आपकी जन्मकुंडली के अनुसार सर्वश्रेष्ठ करियर क्या है?',
    subtext:     'Most career readings stop at the 10th house sign — but that only tells you the broad domain. The nakshatra of the 10th lord gives the specific type of work within that domain, and that is where the precision lives',
    subtext_hi:  'अधिकांश करियर पाठन दशम भाव की राशि पर रुक जाते हैं — लेकिन यह केवल व्यापक क्षेत्र बताता है। दशमेश की नक्षत्र स्थिति उस क्षेत्र के भीतर विशिष्ट कार्य देती है',
  },

  taxonomy: {
    tags:        ['career-selection', '10th-house', 'nakshatra-career', 'career-choice', 'dharma', 'vocational-astrology'],
    keywords:    ['best career astrology', 'career choice vedic astrology', '10th house career', 'nakshatra career prediction', 'which career suits my horoscope'],
    keywords_hi: ['सर्वश्रेष्ठ करियर ज्योतिष', 'कुंडली से करियर', 'दशम भाव और पेशा', 'नक्षत्र और करियर', 'कौन सा करियर सही है'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'career-indicators',
        title:    'The Four Key Indicators of Career Direction in Vedic Astrology',
        title_hi: 'वैदिक ज्योतिष में करियर दिशा के चार मुख्य संकेतक',
        layout:   'cards',
        items: [
          {
            id:       'card-10th-sign',
            icon:     '🏠',
            label:    '10th House Sign — Career Domain',
            label_hi: 'दशम भाव की राशि — करियर क्षेत्र',
            body:     'The sign occupying the 10th house gives the broadest indication of career domain. Aries or Scorpio in the 10th points toward leadership, defense, or competitive fields. Taurus or Libra suggests finance, art, or design. Gemini or Virgo indicates communication, writing, or analytical fields. Cancer indicates caregiving, food, or public-sector work. Leo indicates leadership, politics, or creative industries. Capricorn or Aquarius indicates structure-dependent work: law, government, science, or technology.',
            body_hi:  'दशम भाव की राशि करियर क्षेत्र का सबसे व्यापक संकेत देती है। मेष/वृश्चिक नेतृत्व/रक्षा; वृष/तुला कला/वित्त; मिथुन/कन्या संचार/विश्लेषण; कर्क देखभाल/सार्वजनिक क्षेत्र।',
            badge:    'First Layer',
            badge_hi: 'पहली परत',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-10th-lord',
            icon:     '🪐',
            label:    '10th Lord — Career Activity Type',
            label_hi: 'दशमेश — करियर गतिविधि प्रकार',
            body:     "The planet ruling the 10th house (the 10th lord) reveals the type of professional activity that suits the native. The Sun as 10th lord inclines toward authority and public roles. The Moon inclines toward care, public interface, and fluid environments. Mars drives toward action, competition, and execution. Mercury inclines toward communication, trade, and analysis. Jupiter points toward teaching, counseling, or law. Venus toward creative and relationship-based fields. Saturn toward disciplined, structured, or service-oriented work.",
            body_hi:  'दशम भाव का स्वामी पेशेवर गतिविधि के प्रकार को प्रकट करता है। सूर्य-दशमेश अधिकार और सार्वजनिक भूमिकाएं; चंद्र देखभाल; मंगल क्रियान्वयन; बुध संचार; गुरु शिक्षण/परामर्श।',
            badge:    'Second Layer',
            badge_hi: 'दूसरी परत',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-nakshatra',
            icon:     '⭐',
            label:    "Nakshatra of the 10th Lord — The Precision Layer",
            label_hi: 'दशमेश की नक्षत्र स्थिति — सटीकता की परत',
            body:     "The nakshatra in which the 10th lord is placed gives the most specific career direction — more precise than either the 10th house sign or the 10th lord's planet alone. This is the layer most career readings miss. A Mars in the 10th lord position can give very different careers depending on whether Mars sits in Mrigashira (creative-analytical), Chitra (design, craft), or Dhanishtha (wealth management, rhythm-based work). Each nakshatra has a specific devatā (deity), shakti (power), and occupational domain.",
            body_hi:  'दशमेश की नक्षत्र स्थिति सबसे विशिष्ट करियर दिशा देती है — यह वह परत है जो अधिकांश करियर पाठन चूक जाते हैं। मृगशिरा (रचनात्मक-विश्लेषणात्मक), चित्रा (डिजाइन), धनिष्ठा (संपदा प्रबंधन) — एक ही ग्रह अलग-अलग करियर देता है।',
            badge:    'Most Precise',
            badge_hi: 'सबसे सटीक',
            badgeVariant: 'positive',
          },
          {
            id:       'card-atmakaraka',
            icon:     '💫',
            label:    'Atmakaraka — Soul-Level Career Direction',
            label_hi: 'आत्मकारक — आत्मा-स्तरीय करियर दिशा',
            body:     "The Atmakaraka (the planet with the highest degrees in the natal chart) shows the soul's lesson and the deepest career fulfillment. When a career aligns with the Atmakaraka's domain, the work feels like calling rather than job. A person with Jupiter as Atmakaraka finds deepest fulfillment in teaching, guidance, or law regardless of what the 10th house shows. This is the career direction that persists across life phases and doesn't feel hollow during Saturn's tests.",
            body_hi:  'आत्मकारक (जन्मकुंडली में सर्वाधिक अंश वाला ग्रह) आत्मा का पाठ और गहरी करियर संतुष्टि दिखाता है। जब करियर आत्मकारक के क्षेत्र के साथ संरेखित होता है, तो काम नौकरी नहीं पुकार लगती है।',
            badge:    'Soul Purpose',
            badge_hi: 'आत्मा का उद्देश्य',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'career-fit-checklist',
        title:    'Signs Your Career Aligns With Your Chart',
        title_hi: 'संकेत कि आपका करियर कुंडली के अनुरूप है',
        layout:   'checklist',
        items: [
          {
            id:    'check-energy',
            label: 'The work generates energy rather than consistently draining it',
            label_hi: 'काम ऊर्जा उत्पन्न करता है, न कि नियमित रूप से निकासी करता है',
            body:  'Career-chart alignment shows up physically. Work that aligns with the 10th house lord and its nakshatra typically produces a sustained energy state rather than depletion.',
            body_hi: 'करियर-कुंडली संरेखण शारीरिक रूप से दिखता है। दशमेश और उसके नक्षत्र के अनुरूप काम ऊर्जा की निरंतर स्थिति उत्पन्न करता है।',
          },
          {
            id:    'check-recognition',
            label: 'Professional recognition arrives without excessive self-promotion',
            label_hi: 'अत्यधिक आत्म-प्रचार के बिना पेशेवर मान्यता मिलती है',
            body:  'When the career aligns with the natal Sun and 10th house indicators, recognition tends to arrive naturally — the person is seen for who they are, not who they\'re pretending to be.',
            body_hi: 'जब करियर सूर्य और दशम भाव संकेतकों के अनुरूप हो, मान्यता स्वाभाविक रूप से आती है।',
          },
          {
            id:    'check-income',
            label: 'Income grows proportionally to professional capability',
            label_hi: 'आय पेशेवर क्षमता के अनुपात में बढ़ती है',
            body:  'A career aligned with the 11th house (gains) and the 10th house simultaneously produces income that scales with competence. Persistent undercompensation despite strong performance points to 11th house misalignment.',
            body_hi: 'एकादश भाव (लाभ) और दशम भाव के साथ संरेखित करियर ऐसी आय देता है जो दक्षता के साथ बढ़ती है।',
          },
          {
            id:    'check-dasha-support',
            label: "Current dasha lord has a positive connection to the 10th house",
            label_hi: 'वर्तमान दशा स्वामी का दशम भाव से सकारात्मक संबंध है',
            body:  'Career moves made when the current dasha lord is a natural ally of the 10th house or 10th lord tend to stick. Moves made during unsupportive dashas often require correction.',
            body_hi: 'जब वर्तमान दशा स्वामी दशम भाव का प्राकृतिक मित्र हो, तब किए गए करियर कदम टिकते हैं।',
          },
          {
            id:    'check-no-pretending',
            label: "The work doesn't require sustained performance of a personality you don't have",
            label_hi: 'काम के लिए ऐसे व्यक्तित्व का प्रदर्शन नहीं करना पड़ता जो आपका नहीं है',
            body:  "This is the single most reliable indicator of career-chart misalignment: the person is playing a role. A career aligned with the Atmakaraka and 10th lord allows the native's natural intelligence to lead.",
            body_hi: 'यह करियर-कुंडली असंरेखण का सबसे विश्वसनीय संकेतक है: व्यक्ति एक भूमिका निभा रहा है। आत्मकारक के अनुरूप करियर में प्राकृतिक बुद्धि आगे होती है।',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Finding the Best Career in Your Chart',
        title_hi: 'कुंडली में सर्वश्रेष्ठ करियर खोजने के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-change-career',
            label:    'Can I switch careers mid-life and still succeed according to my chart?',
            label_hi: 'क्या मैं जीवन के मध्य में करियर बदल सकता हूं और फिर भी सफल हो सकता हूं?',
            body:     "Yes — especially if the switch aligns the new career more closely with the natal 10th lord and Atmakaraka. Many mid-life career changes coincide with a new mahadasha whose lord is more supportive of the authentic career direction. The chart doesn't lock you into your first career; it shows the direction that produces the most natural growth. Moving toward that direction at any age accelerates results.",
            body_hi:  'हाँ — विशेष रूप से यदि नया करियर जन्मकालीन दशमेश और आत्मकारक के अनुरूप हो। कुंडली आपको पहले करियर में बंद नहीं करती — यह वह दिशा दिखाती है जो सबसे प्राकृतिक विकास देती है।',
          },
          {
            id:       'faq-multiple-careers',
            label:    'My chart shows multiple career possibilities. How do I choose?',
            label_hi: 'मेरी कुंडली कई करियर संभावनाएं दिखाती है। कैसे चुनूं?',
            body:     "When multiple career indicators point in different directions, the Atmakaraka is the tiebreaker. The career domain ruled by the Atmakaraka planet will produce the deepest sense of meaning, even if other domains produce higher initial income. The 9th house (dharma) also provides guidance: careers that align with the 9th house values tend to sustain motivation across decades, not just during favorable dashas.",
            body_hi:  'जब कई करियर संकेतक अलग-अलग दिशाओं में इंगित करते हैं, तो आत्मकारक निर्णायक है। नवम भाव (धर्म) भी मार्गदर्शन देता है — धर्म-संरेखित करियर दशकों तक प्रेरणा बनाए रखते हैं।',
          },
          {
            id:       'faq-nakshatra-specific',
            label:    'How do I find the nakshatra of my 10th lord?',
            label_hi: 'अपने दशमेश की नक्षत्र स्थिति कैसे जानें?',
            body:     "To find the nakshatra of your 10th lord: first identify which planet rules your 10th house (determined by the sign on the 10th house cusp). Then find where that planet is placed in degrees in the natal chart. The nakshatra is determined by the degree of that planet across all 12 signs. Each nakshatra spans 13°20' and there are 27 in total. A detailed birth chart or a vedic astrology calculator will show this — it's listed as the 'nakshatra' or 'star' of the planet.",
            body_hi:  'दशमेश की नक्षत्र स्थिति जानने के लिए: पहले दशम भाव की राशि से दशमेश ग्रह पहचानें। फिर जन्मकुंडली में उस ग्रह की डिग्री देखें। प्रत्येक नक्षत्र 13°20\' में फैला है और कुल 27 हैं।',
          },
          {
            id:       'faq-no-obvious-career',
            label:    "My chart doesn't show an obvious career direction. Is this a problem?",
            label_hi: 'मेरी कुंडली में स्पष्ट करियर दिशा नहीं दिखती। क्या यह समस्या है?',
            body:     "No — it often indicates versatility and multi-domain capability rather than a problem. Charts where the 10th house has multiple planets, or where the 10th lord is involved in multiple yogas, produce people who can excel in several domains but may take longer to identify their strongest focus. These individuals benefit most from the nakshatra layer analysis, which provides specificity when the broader indicators are ambiguous.",
            body_hi:  'नहीं — यह अक्सर बहुमुखी प्रतिभा और बहु-क्षेत्र क्षमता का संकेत है। कई ग्रहों वाले दशम भाव वाले लोग कई क्षेत्रों में उत्कृष्ट हो सकते हैं। नक्षत्र परत विश्लेषण सबसे अधिक सहायक है।',
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
        label:       'Get Your Personalized Career Direction Report',
        label_hi:    'अपनी व्यक्तिगत करियर दिशा रिपोर्ट प्राप्त करें',
        description: 'A full analysis of your 10th house, 10th lord, its nakshatra, and Atmakaraka to identify the career domain where your chart is strongest.',
        description_hi: 'आपके दशम भाव, दशमेश, उसके नक्षत्र और आत्मकारक का पूर्ण विश्लेषण — जहां आपकी कुंडली सबसे मजबूत है।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Career Alignment Now',
        label_hi:    'अभी अपना करियर संरेखण जांचें',
        description: 'Enter your birth details to see how well your current career aligns with your 10th house, 10th lord nakshatra, and Atmakaraka — and where a chart-aligned adjustment could strengthen your trajectory.',
        description_hi: 'देखें कि आपका वर्तमान करियर आपकी जन्मकुंडली संकेतकों के साथ कितना संरेखित है।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Help readers understand how Vedic astrology identifies the best career through four layers: 10th house sign, 10th lord, nakshatra of the 10th lord, and Atmakaraka.',
    targetAudience:  ['professionals evaluating career choices', 'students choosing career paths', 'people considering mid-life career changes'],
    primaryQuestion: 'What career does my birth chart indicate is best for me?',
    contentAngle:    'The nakshatra of the 10th lord gives more career precision than any other single indicator — and most career readings never reach this layer',
    relatedConcepts: ['10th house career', 'atmakaraka', 'nakshatra', '10th lord placement', '9th house dharma', 'career alignment'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish vocational analysis using the four career layers: 10th house sign, 10th lord planet, nakshatra of 10th lord, and Atmakaraka for soul-level career direction',
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
