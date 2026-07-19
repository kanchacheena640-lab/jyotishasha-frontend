import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const salaryGrowth: DomainTopic = {

  identity: {
    id:        'astrology:salary-growth',
    slug:      'salary-growth',
    title:     'Salary Growth in Vedic Astrology: 2nd and 11th House Analysis',
    title_hi:  'वैदिक ज्योतिष में वेतन वृद्धि: द्वितीय और एकादश भाव विश्लेषण',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/salary-growth',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Salary Growth',       label_hi: 'वेतन वृद्धि',     href: '/financial-astrology/salary-growth' },
    ],
  },

  seo: {
    metaTitle:          'Salary Growth in Astrology: 2nd and 11th House Guide',
    metaDescription:    'The 2nd and 11th lords in mutual support predict salary growth in Vedic astrology. Learn the key income combinations and dasha timing windows in your chart.',
    metaDescription_hi: 'लगातार वेतन वृद्धि के लिए द्वितीय और एकादश भाव के स्वामियों के बीच पारस्परिक संबंध आवश्यक है — केवल मजबूत दशम भाव पर्याप्त नहीं।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Salary Growth in Vedic Astrology: Why the 2nd and 11th Houses Matter More Than the 10th',
    headline_hi: 'वैदिक ज्योतिष में वेतन वृद्धि: क्यों द्वितीय और एकादश भाव दशम से अधिक मायने रखते हैं',
    subtext:     'Career performance and income growth are not the same astrological question. The 10th house governs career achievement; the 2nd and 11th houses govern whether that achievement translates into consistent income growth. The two can — and often do — decouple',
    subtext_hi:  'करियर प्रदर्शन और आय वृद्धि एक ही ज्योतिषीय प्रश्न नहीं हैं। दशम भाव करियर उपलब्धि का स्वामी है; द्वितीय और एकादश भाव यह तय करते हैं कि वह उपलब्धि लगातार आय वृद्धि में बदलती है या नहीं',
  },

  taxonomy: {
    tags:        ['salary-growth', '2nd-house-wealth', '11th-house-gains', 'income-growth', 'financial-astrology', 'wealth-yoga'],
    keywords:    ['salary growth astrology', 'income growth horoscope', '2nd house vedic astrology', '11th house gains', 'wealth yoga birth chart', 'salary increase prediction'],
    keywords_hi: ['वेतन वृद्धि ज्योतिष', 'आय वृद्धि कुंडली', 'द्वितीय भाव धन', 'एकादश भाव लाभ', 'वेतन वृद्धि कब होगी'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'income-phases',
        title:    'How Income Growth Unfolds: The Four Stages',
        title_hi: 'आय वृद्धि कैसे होती है: चार चरण',
        layout:   'timeline',
        items: [
          {
            id:       'phase-initial',
            badge:    'Stage 1',
            badge_hi: 'चरण 1',
            label:    'Initial Income — 6th House and Entry-Level Earnings',
            label_hi: 'प्रारंभिक आय — षष्ठ भाव और प्रवेश-स्तर की कमाई',
            body:     'The first income from employment is governed by the 6th house (service, employment). The 6th lord\'s strength and placement determines how easily the native finds their first paying role and whether the initial income is adequate to their effort. A strong 6th lord places the person in an environment where they are compensated fairly for their work; a weak 6th lord creates mismatches between effort and early compensation.',
            body_hi:  'रोजगार से पहली आय षष्ठ भाव द्वारा नियंत्रित होती है। षष्ठेश की ताकत और स्थिति यह तय करती है कि पहला भुगतान करने वाला काम कितनी आसानी से मिलता है।',
            badgeVariant: 'neutral',
          },
          {
            id:       'phase-growth',
            badge:    'Stage 2',
            badge_hi: 'चरण 2',
            label:    'Active Income Growth — 11th House Activation',
            label_hi: 'सक्रिय आय वृद्धि — एकादश भाव सक्रियता',
            body:     'The 11th house governs gains, income from professional activity, and the fulfillment of ambitions. When the 11th lord is strong and in a favorable dasha, income from the primary career grows measurably year over year. The 11th house also governs the professional network — the quality of connections that bring opportunities, referrals, and income multipliers. A strong 11th house dasha is typically the period of most rapid income growth.',
            body_hi:  'एकादश भाव लाभ, पेशेवर गतिविधि से आय और महत्वाकांक्षाओं की पूर्ति का स्वामी है। मजबूत एकादश दशा आमतौर पर सबसे तेज आय वृद्धि की अवधि है।',
            badgeVariant: 'positive',
          },
          {
            id:       'phase-wealth',
            badge:    'Stage 3',
            badge_hi: 'चरण 3',
            label:    'Wealth Accumulation — 2nd House Retention',
            label_hi: 'धन संचय — द्वितीय भाव प्रतिधारण',
            body:     'The 2nd house governs accumulated wealth — what stays after income arrives. Income can be high without wealth accumulating if the 2nd lord is weak or afflicted. The 2nd and 11th lords need a reception relationship (each placed in the other\'s sign, or in mutual aspect, or in friendly houses) for income to compound into wealth. Without this relationship, income arrives but doesn\'t accumulate — the person earns well but never builds financial security.',
            body_hi:  'द्वितीय भाव संचित धन का स्वामी है — आय आने के बाद जो बचता है। द्वितीय और एकादश स्वामियों के बीच पारस्परिक संबंध के बिना आय आती है लेकिन संचित नहीं होती।',
            badgeVariant: 'positive',
          },
          {
            id:       'phase-peak',
            badge:    'Stage 4',
            badge_hi: 'चरण 4',
            label:    'Peak Earning — Dhana Yoga Activation',
            label_hi: 'शीर्ष आय — धन योग सक्रियता',
            body:     "Peak earning periods in a lifetime coincide with Dhana Yoga activation — periods when the 2nd, 5th, 9th, and 11th lords simultaneously form positive relationships in transit or dasha. Jupiter transiting through the 2nd or 11th house brings a 12–13 month window of significant income growth potential. The strongest peak earning periods happen when natal Dhana Yogas are activated by both a supportive dasha and a favorable Jupiter or Venus transit.",
            body_hi:  'जीवन में शीर्ष आय अवधि धन योग सक्रियता के साथ मेल खाती है — जब द्वितीय, पंचम, नवम और एकादश स्वामी एक साथ सकारात्मक संबंध बनाते हैं।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'salary-checklist',
        title:    'Reading Salary Growth Potential in Your Chart',
        title_hi: 'अपनी कुंडली में वेतन वृद्धि क्षमता पढ़ना',
        layout:   'checklist',
        items: [
          {
            id:    'check-2nd-lord',
            label: '2nd lord is placed in a good house (1st, 4th, 5th, 7th, 9th, 10th, 11th)',
            label_hi: 'द्वितीयेश अच्छे भाव में स्थित है (1, 4, 5, 7, 9, 10, 11)',
            body:  'The 2nd lord placed in a kendra (1st, 4th, 7th, 10th) or trikona (1st, 5th, 9th) gives strength to the accumulated wealth sector. Placement in the 11th house is particularly powerful — the wealth lord in the gains house.',
            body_hi: 'केंद्र (1, 4, 7, 10) या त्रिकोण (1, 5, 9) में द्वितीयेश संचित धन क्षेत्र को ताकत देता है। 11वें भाव में स्थिति विशेष रूप से शक्तिशाली है।',
          },
          {
            id:    'check-11th-lord',
            label: '11th lord is not debilitated and not placed in the 6th, 8th, or 12th house',
            label_hi: 'एकादशेश नीच नहीं है और 6, 8, या 12वें भाव में नहीं है',
            body:  'The 11th lord placed in the 6th, 8th, or 12th (the dusthana houses) significantly weakens income growth — gains are blocked or delayed by obstacles, transformation, or expenditure respectively.',
            body_hi: 'एकादशेश का 6, 8, या 12वें (दुष्थान) भाव में स्थित होना आय वृद्धि को काफी कमजोर करता है।',
          },
          {
            id:    'check-reception',
            label: '2nd lord and 11th lord are in mutual aspect, mutual reception, or the same house',
            label_hi: 'द्वितीयेश और एकादशेश परस्पर दृष्टि, पारस्परिक रिसेप्शन, या एक ही भाव में हैं',
            body:  'This is the income compounding indicator. When these two lords support each other — each placed in the other\'s sign, or aspecting each other, or conjunct — income converts to wealth rather than disappearing.',
            body_hi: 'यह आय संयोजन संकेतक है। जब ये दोनों स्वामी एक-दूसरे का समर्थन करते हैं, तो आय धन में बदलती है।',
          },
          {
            id:    'check-jupiter-venus',
            label: 'Jupiter or Venus aspects the 2nd house or 2nd lord',
            label_hi: 'गुरु या शुक्र द्वितीय भाव या द्वितीयेश को देखता है',
            body:  'Jupiter and Venus are the two primary wealth significators in Vedic astrology. Their aspect on the 2nd house or 2nd lord significantly enhances accumulated wealth potential and tends to protect against major financial loss.',
            body_hi: 'गुरु और शुक्र वैदिक ज्योतिष में दो प्राथमिक धन कारक हैं। द्वितीय भाव पर उनकी दृष्टि संचित धन क्षमता को महत्वपूर्ण रूप से बढ़ाती है।',
          },
          {
            id:    'check-no-malefic-2nd',
            label: 'No strong malefic is placed in the 2nd house without benefic protection',
            label_hi: 'द्वितीय भाव में शुभ ग्रह सुरक्षा के बिना कोई मजबूत पापग्रह नहीं है',
            body:  "Saturn, Mars, or Rahu placed in the 2nd house without Jupiter's or Venus's aspect can create wealth accumulation problems — income arrives but gets eroded through expenses, debts, or unexpected losses.",
            body_hi: 'शुभ ग्रह सुरक्षा के बिना द्वितीय भाव में शनि, मंगल, या राहु धन संचय समस्याएं उत्पन्न कर सकते हैं।',
          },
        ],
      },

      {
        id:       'stagnation-alert',
        title:    'Warning: Why Salary Growth Stagnates Despite Career Performance',
        title_hi: 'चेतावनी: करियर प्रदर्शन के बावजूद वेतन वृद्धि क्यों रुकती है',
        layout:   'alert',
        items: [
          {
            id:       'alert-10th-without-11th',
            label:    'Strong 10th House With Weak 11th Lord — Career Success Without Income Growth',
            label_hi: 'मजबूत दशम भाव और कमजोर एकादशेश — करियर सफलता के बिना आय वृद्धि',
            body:     "This is one of the most frustrating chart configurations: the person performs well, receives recognition, advances in title and responsibility — but income doesn't grow proportionally. The 10th house drives achievement; the 11th house drives financial reward from that achievement. When the 11th lord is weak, in a dusthana, or under malefic pressure, professional achievement converts to income growth slowly or incompletely. The fix isn't working harder — it's identifying the 11th house dasha when income growth becomes possible.",
            body_hi:  'यह सबसे निराशाजनक कुंडली संयोजनों में से एक है: व्यक्ति अच्छा प्रदर्शन करता है, प्रगति करता है — लेकिन आय आनुपातिक रूप से नहीं बढ़ती। दशम भाव उपलब्धि चलाता है; एकादश भाव उस उपलब्धि से वित्तीय पुरस्कार।',
            badgeVariant: 'warning',
          },
          {
            id:       'alert-2nd-without-retention',
            label:    'High Income Without 2nd House Support — Earning Well but Building Nothing',
            label_hi: 'द्वितीय भाव समर्थन के बिना उच्च आय — अच्छी कमाई लेकिन धन निर्माण नहीं',
            body:     "A person with a strong 11th house but an afflicted 2nd house can have periods of genuinely high income that leave no lasting financial footprint. Income arrives in large amounts but exits equally fast — through lifestyle spending, family obligations, debt service, or unexpected expenses. This pattern requires a behavioral and timing intervention: use the 11th house dasha peak to aggressively build 2nd house assets (property, savings, business equity) before the dasha ends.",
            body_hi:  'मजबूत एकादश और पीड़ित द्वितीय भाव वाला व्यक्ति वास्तव में उच्च आय के काल पा सकता है जो कोई स्थायी वित्तीय निशान नहीं छोड़ते। एकादश दशा के शिखर का उपयोग आक्रामक रूप से द्वितीय भाव संपत्ति बनाने में करें।',
            badgeVariant: 'warning',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Salary Growth and Astrology',
        title_hi: 'वेतन वृद्धि और ज्योतिष के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-when-salary',
            label:    'When will my salary increase according to my chart?',
            label_hi: 'कुंडली के अनुसार मेरा वेतन कब बढ़ेगा?',
            body:     "Salary increases most reliably come during: (1) the mahadasha or antardasha of the 11th lord, (2) Jupiter transiting through the 2nd or 11th house, (3) the antardasha of Jupiter or Venus within any supportive dasha, (4) when the current dasha lord is in a positive relationship with the natal 2nd or 11th house. The strongest salary growth periods combine at least two of these factors simultaneously.",
            body_hi:  'वेतन वृद्धि सबसे विश्वसनीय रूप से आती है: (1) एकादशेश की महादशा या अंतर्दशा, (2) 2वें या 11वें भाव से गुरु गोचर, (3) किसी सहायक दशा में गुरु या शुक्र की अंतर्दशा।',
          },
          {
            id:       'faq-negotiation',
            label:    'Can astrology help me time a salary negotiation?',
            label_hi: 'क्या ज्योतिष वेतन वार्ता का समय निर्धारित करने में मदद कर सकता है?',
            body:     "Yes — with reasonable accuracy. A salary negotiation attempted when Jupiter is transiting the 2nd or 11th house, or during the antardasha of a well-placed planet connected to those houses, has a statistically higher success rate in Vedic astrological analysis. Avoid major salary negotiations during Saturn's transit through the 2nd house or during the mahadasha of a planet placed in the 12th house (expenditure) — these periods tend to produce disappointing results regardless of merit.",
            body_hi:  'हाँ — उचित सटीकता के साथ। जब गुरु 2वें या 11वें भाव से गोचर कर रहा हो, या अच्छी तरह से स्थित ग्रह की अंतर्दशा में वेतन वार्ता अधिक सफल होती है।',
          },
          {
            id:       'faq-dhana-yoga',
            label:    'What is a Dhana Yoga and how does it affect salary growth?',
            label_hi: 'धन योग क्या है और यह वेतन वृद्धि को कैसे प्रभावित करता है?',
            body:     "Dhana Yoga (wealth combination) forms when the lords of the 2nd, 5th, 9th, and 11th houses form positive relationships in the natal chart — conjunction, mutual aspect, or placement in each other's houses. These are not rare yogas; most charts have at least one. The important detail: Dhana Yogas indicate wealth potential that becomes active during the relevant dasha periods. A strong natal Dhana Yoga that hasn't been activated yet simply means the best financial period hasn't arrived yet.",
            body_hi:  'धन योग तब बनता है जब 2, 5, 9, और 11वें भावों के स्वामी जन्मकुंडली में सकारात्मक संबंध बनाते हैं। ये दुर्लभ योग नहीं हैं। महत्वपूर्ण विवरण: धन योग धन क्षमता दर्शाते हैं जो संबंधित दशा काल में सक्रिय होती है।',
          },
          {
            id:       'faq-plateau',
            label:    'My income has been flat for 3 years. When will it change?',
            label_hi: '3 साल से मेरी आय स्थिर है। यह कब बदलेगी?',
            body:     "A 3-year income plateau often coincides with a mahadasha whose lord has no connection to the 2nd or 11th house, or a Saturn transit over the 2nd or 11th house suppressing gains. Check: (1) which mahadasha is current and whether its lord connects to the 2nd/11th; (2) whether Saturn is currently transiting the 2nd or 11th house (this suppresses gains for up to 2.5 years); (3) when the next 11th lord dasha or Jupiter's transit through the 2nd/11th is due. The plateau is almost always dasha-bounded.",
            body_hi:  '3 साल का आय ठहराव अक्सर ऐसी महादशा के साथ मेल खाता है जिसके स्वामी का 2वें या 11वें से कोई संबंध नहीं है, या शनि का 2वें/11वें पर गोचर है। ठहराव लगभग हमेशा दशा-बाधित है।',
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
        label:       'Get Your Salary Growth Forecast',
        label_hi:    'अपना वेतन वृद्धि पूर्वानुमान प्राप्त करें',
        description: 'A complete analysis of your 2nd and 11th house lords, their relationship, active Dhana Yogas, and the upcoming dasha periods when income growth is most supported.',
        description_hi: 'आपके द्वितीय और एकादश स्वामियों, उनके संबंध, सक्रिय धन योगों और आगामी दशा काल का पूर्ण विश्लेषण।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Income Growth Window',
        label_hi:    'अपनी आय वृद्धि खिड़की जांचें',
        description: 'Enter your birth details to see which dasha and transit factors are currently supporting or blocking your salary growth — and when the next income-growth window opens in your chart.',
        description_hi: 'जानें कौन सी दशा और गोचर कारक अभी आपकी वेतन वृद्धि का समर्थन या अवरोध कर रहे हैं।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'standard',
    topicGoal:       'Help readers understand why the 2nd and 11th houses govern salary growth separately from career achievement, and how the reception relationship between their lords determines whether income compounds into wealth.',
    targetAudience:  ['professionals experiencing income stagnation', 'people planning salary negotiations', 'astrology students studying wealth houses'],
    primaryQuestion: 'What does my chart say about my salary growth potential?',
    contentAngle:    'The 2nd and 11th lords need a reception relationship for consistent income growth — a strong 10th alone explains career success but not why salary stays flat',
    relatedConcepts: ['2nd house wealth', '11th house gains', 'dhana yoga', 'reception relationship', 'jupiter transit', 'income compounding'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish analysis of salary growth through the 2nd house (accumulated wealth), 11th house (gains), their lords\' reception relationship, and Dhana Yoga activation through dasha and transit',
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
