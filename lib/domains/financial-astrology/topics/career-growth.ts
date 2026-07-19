import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const careerGrowth: DomainTopic = {

  identity: {
    id:        'astrology:career-growth',
    slug:      'career-growth',
    title:     'Career Growth in Astrology: Phases and Planets',
    title_hi:  'ज्योतिष में करियर विकास: चरण और ग्रह',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/career-growth',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',              href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष',  href: '/financial-astrology' },
      { label: 'Career Growth',       label_hi: 'करियर विकास',      href: '/financial-astrology/career-growth' },
    ],
  },

  seo: {
    metaTitle:          'Career Growth in Astrology: Phases and Planets Explained',
    metaDescription:    'Vedic astrology maps career growth across four life phases — each with its own planetary director. Discover which phase you are in and what it means.',
    metaDescription_hi: 'वैदिक ज्योतिष करियर विकास को चार जीवन चरणों में मापता है — हर चरण का अपना ग्रह निदेशक होता है। जानें आप किस चरण में हैं।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Career Growth in Vedic Astrology: Reading Your Professional Arc',
    headline_hi: 'वैदिक ज्योतिष में करियर विकास: अपने पेशेवर जीवन को समझें',
    subtext:     'Most career readings look two years ahead. A birth chart tells a forty-year story — and each chapter is directed by a different planet, with its own pace, priorities, and tests',
    subtext_hi:  'अधिकांश करियर पाठन दो वर्ष आगे देखते हैं। जन्मकुंडली चालीस साल की कहानी बताती है — हर अध्याय एक अलग ग्रह द्वारा निर्देशित होता है',
  },

  taxonomy: {
    tags:        ['career-phases', 'career-arc', 'professional-development', 'dasha-sequence', 'saturn-return', 'jupiter-cycle'],
    keywords:    ['career growth astrology', 'career phases vedic astrology', 'professional development horoscope', 'career arc birth chart', 'career stages astrology'],
    keywords_hi: ['करियर विकास ज्योतिष', 'पेशेवर जीवन के चरण', 'करियर की दिशा कुंडली', 'दशा अनुक्रम और करियर'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'career-phases',
        title:    'The Four Career Phases in Vedic Astrology',
        title_hi: 'वैदिक ज्योतिष में करियर के चार चरण',
        layout:   'timeline',
        items: [
          {
            id:    'phase-foundation',
            badge: 'Ages 20–28',
            badge_hi: 'आयु 20-28',
            label: 'Foundation — Skill Building and First Placements',
            label_hi: 'नींव — कौशल निर्माण और पहली नियुक्तियां',
            body:  "This phase is governed by Saturn's first half-cycle and the dasha sequence inherited from birth. The dominant career task is establishing baseline competence and understanding how professional environments work. Mistakes made during this phase are recoverable — and the best outcome is not a prestigious early job but an accurate read on which kind of work produces genuine engagement. The 3rd house (skills and initiative) and Mercury's condition strongly influence how productive this phase is.",
            body_hi: 'यह चरण शनि के पहले अर्धचक्र और जन्म से विरासत में मिली दशा अनुक्रम से नियंत्रित होता है। तृतीय भाव और बुध की स्थिति इस चरण की उत्पादकता निर्धारित करती है।',
            badgeVariant: 'neutral',
          },
          {
            id:    'phase-establishment',
            badge: 'Ages 28–40',
            badge_hi: 'आयु 28-40',
            label: 'Establishment — Finding the Core Career Thread',
            label_hi: 'स्थापना — मुख्य करियर सूत्र की खोज',
            body:  "Saturn's return at age 29–30 restructures professional identity. The careers or roles that don't align with the natal Saturn's placement or aspirations tend to collapse or feel hollow at this point. Jupiter's transit through the 10th house (occurring roughly every 12 years) during this phase marks peak growth windows. The person who has correctly identified their professional calling by the end of this phase will enter the 40s with remarkable acceleration potential.",
            body_hi: '29-30 वर्ष में शनि वापसी पेशेवर पहचान को पुनर्गठित करती है। जो करियर जन्मकालीन शनि की स्थिति के अनुरूप नहीं हैं, वे इस समय खोखले महसूस होते हैं। इस चरण में गुरु का दशम पर गोचर शिखर विकास खिड़कियां बनाता है।',
            badgeVariant: 'positive',
          },
          {
            id:    'phase-peak',
            badge: 'Ages 40–55',
            badge_hi: 'आयु 40-55',
            label: 'Peak — Authority and Leadership',
            label_hi: 'शिखर — अधिकार और नेतृत्व',
            body:  "This is the phase where natal strengths mature most fully. People in their Jupiter or Saturn mahadasha during this window tend to achieve their most prominent career positions. The 10th house indicators that looked theoretical in earlier decades become lived reality. The critical risk in this phase: over-extension — taking on too many responsibilities because the chart supports growth, without adequate attention to health and personal life.",
            body_hi: 'इस चरण में जन्मजात शक्तियां सबसे पूर्णरूप से परिपक्व होती हैं। गुरु या शनि महादशा वाले लोग इस खिड़की में अपने सबसे प्रमुख पदों पर पहुंचते हैं।',
            badgeVariant: 'positive',
          },
          {
            id:    'phase-legacy',
            badge: 'Ages 55+',
            badge_hi: 'आयु 55+',
            label: 'Legacy — Wisdom Transfer and Second Calling',
            label_hi: 'विरासत — ज्ञान हस्तांतरण और दूसरी पुकार',
            body:  "Saturn's second return at ages 58–59 is often more liberating than the first. By this point, the person has shed most of the career choices made from external pressure and is more aligned with authentic calling. Many people discover their most meaningful professional contribution in this phase — writing, consulting, teaching, or founding something new. The 9th house (higher wisdom, teaching) becomes more prominent as a career anchor after the second Saturn return.",
            body_hi: '58-59 वर्ष में शनि की दूसरी वापसी अक्सर पहले से अधिक मुक्तिदायक होती है। इस चरण में नवम भाव (उच्च ज्ञान, शिक्षण) करियर का मुख्य आधार बनता है।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'growth-accelerators',
        title:    'Career Growth Accelerators Shown in Your Birth Chart',
        title_hi: 'कुंडली में करियर विकास के चार त्वरक',
        layout:   'cards',
        items: [
          {
            id:       'third-house-skills',
            icon:     '📚',
            label:    '3rd House — Skills and Initiative',
            label_hi: 'तृतीय भाव — कौशल और पहल',
            body:     "The 3rd house is the most underrated career house in most analyses. It governs skills development, self-initiative, and the courage to act on opportunities. Career growth stalls most commonly not because of a bad 10th house but because the person stops developing new skills (weak 3rd house or 3rd lord under malefic pressure). A strong 3rd house produces the kind of professional who turns every role into a learning experience and keeps compounding capability across phases.",
            body_hi:  'तृतीय भाव सबसे कम आंका जाने वाला करियर भाव है। करियर विकास अधिकांशतः खराब दशम भाव के कारण नहीं रुकता — बल्कि कौशल विकास बंद होने (कमजोर तृतीय भाव) के कारण रुकता है।',
            badge:    'Skill Engine',
            badge_hi: 'कौशल का इंजन',
            badgeVariant: 'positive',
          },
          {
            id:       'ninth-house-luck',
            icon:     '🎯',
            label:    '9th House — Fortune, Mentors, and Higher Learning',
            label_hi: 'नवम भाव — भाग्य, मार्गदर्शक और उच्च शिक्षा',
            body:     "The 9th house governs fortune, luck, the quality of mentors encountered, and opportunities for higher education or advanced credentials. When the 9th lord and Jupiter are mutually well-placed, the person tends to encounter the right mentor at the right time — someone who accelerates their career by 5–10 years. 9th house activation in dasha or transit consistently brings the 'right place, right time' professional opportunity.",
            body_hi:  'नवम भाव भाग्य, सही मार्गदर्शकों और उच्च शिक्षा के अवसरों का स्वामी है। 9वें भाव की सक्रियता सही समय, सही जगह पेशेवर अवसर लाती है।',
            badge:    'Fortune & Mentors',
            badge_hi: 'भाग्य और मार्गदर्शक',
            badgeVariant: 'positive',
          },
          {
            id:       'eleventh-house-gains',
            icon:     '💰',
            label:    '11th House — Income Growth and Professional Network',
            label_hi: 'एकादश भाव — आय वृद्धि और पेशेवर नेटवर्क',
            body:     "The 11th house converts career activity into financial gains and professional influence. A strong 11th house means the person's work consistently produces income growth, and their professional network compounds over time. When the 11th lord is strong and in a favorable dasha, income grows alongside career advancement — these two don't always happen together, which is why checking the 11th house separately from the 10th is essential.",
            body_hi:  'एकादश भाव करियर गतिविधि को वित्तीय लाभ और पेशेवर प्रभाव में बदलता है। मजबूत एकादश भाव यह सुनिश्चित करता है कि पद और आय साथ-साथ बढ़ें।',
            badge:    'Income Growth',
            badge_hi: 'आय वृद्धि',
            badgeVariant: 'positive',
          },
          {
            id:       'rahu-disruption',
            icon:     '☊',
            label:    'Rahu — Unconventional Growth Catalyst',
            label_hi: 'राहु — अपरंपरागत विकास उत्प्रेरक',
            body:     "Rahu doesn't follow the expected career growth path — it disrupts it. Rahu dasha often produces career growth in industries or roles that didn't exist a decade earlier. It breaks the person out of the professional container they were placed in and forces reinvention. This is rarely comfortable in the moment, but the growth produced by Rahu dasha for someone with a well-placed Rahu often exceeds what any conventional dasha would have delivered.",
            body_hi:  'राहु अपेक्षित करियर पथ का अनुसरण नहीं करता — वह इसे बाधित करता है। राहु दशा ऐसे उद्योगों में विकास देती है जो दशक पहले नहीं थे। यह बेचैनी लाता है, लेकिन अच्छी स्थिति में राहु के लिए यह असाधारण विकास देता है।',
            badge:    'Disruptive Growth',
            badge_hi: 'विघटनकारी विकास',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Career Growth and Astrology',
        title_hi: 'करियर विकास और ज्योतिष के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-plateau',
            label:    'I have been at the same career level for 5 years. What does this indicate?',
            label_hi: '5 साल से एक ही करियर स्तर पर हूँ। इसका क्या संकेत है?',
            body:     "A 5-year plateau often coincides with a mahadasha of a planet that is not particularly active in the career houses (10th, 6th, 11th). It may also indicate that the 3rd house (initiative) is under pressure, preventing the person from proactively creating growth opportunities. Check whether the current mahadasha's lord has any connection to the 10th or 11th house natally. If it doesn't, this plateau will likely persist until the next mahadasha shift.",
            body_hi:  '5 साल का ठहराव अक्सर ऐसी ग्रह की महादशा के साथ आता है जो करियर भावों (10वें, 6वें, 11वें) में सक्रिय नहीं है। तृतीय भाव पर दबाव भी पहल को रोकता है।',
          },
          {
            id:       'faq-faster-growth',
            label:    'Which planetary period produces the fastest career growth?',
            label_hi: 'किस ग्रह काल में करियर विकास सबसे तेज होता है?',
            body:     "Jupiter mahadasha, when Jupiter is well-placed and connected to the 10th or 11th house, produces the fastest sustainable growth. Rahu mahadasha can produce faster-appearing growth, but it is more volatile. The distinction: Jupiter growth is structural (you go up and stay up); Rahu growth is rapid but sometimes collapses back to baseline if the foundation wasn't built correctly during previous dashas.",
            body_hi:  'गुरु महादशा (जब गुरु 10वें या 11वें से जुड़ा हो) सबसे तेज टिकाऊ विकास देती है। राहु तेज लेकिन अस्थिर विकास देता है।',
          },
          {
            id:       'faq-late-bloomer',
            label:    'Is it possible to achieve major career success after 45?',
            label_hi: 'क्या 45 वर्ष के बाद बड़ी करियर सफलता संभव है?',
            body:     "Yes — and it's astrologically more common than most people assume. Saturn and Jupiter dashas in the 40s–50s are often the most productive career periods for people who have built strong foundations in earlier phases. The myth of career being over at 40 is not supported by dasha analysis. Many natal charts peak professionally between 45 and 58. A Saturn return at 58–59 frequently brings the most authentic professional contribution of a lifetime.",
            body_hi:  'हाँ — और यह ज्योतिषीय रूप से सोचे से अधिक सामान्य है। 40-50 वर्ष की आयु में शनि और गुरु दशाएं अक्सर सबसे उत्पादक करियर काल होती हैं।',
          },
          {
            id:       'faq-wrong-career',
            label:    'Can astrology tell me if I am in the wrong career?',
            label_hi: 'क्या ज्योतिष बता सकता है कि मैं गलत करियर में हूँ?',
            body:     "Yes. When the current career consistently drains energy rather than producing it — and this coincides with a chart where the 10th house lord and the natal career planet are in perpetual conflict with the current dasha lord — it is an indicator that the career direction is misaligned with the chart's natural strengths. The 10th house sign and the nakshatra of the 10th lord together give the most precise indication of what type of work the native is best suited for.",
            body_hi:  'हाँ। जब करियर लगातार ऊर्जा खींचता है और दशा का स्वामी 10वें भाव के स्वामी से संघर्ष में है — यह गलत दिशा का संकेत है। दशमेश की नक्षत्र स्थिति सबसे सटीक करियर दिशा देती है।',
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
        label:       'Get Your Career Arc Report',
        label_hi:    'अपनी करियर आर्क रिपोर्ट प्राप्त करें',
        description: 'A phase-by-phase career forecast showing which planetary period you are in now and what each upcoming phase holds.',
        description_hi: 'दशा-दर-दशा करियर पूर्वानुमान — अभी किस चरण में हैं और आगे क्या है।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Growth Window Now',
        label_hi:    'अभी अपनी विकास खिड़की जाँचें',
        description: 'Enter your birth details to see which planets and dasha periods are currently supporting career advancement — and what each upcoming phase holds for your professional trajectory.',
        description_hi: 'जानें कौन से ग्रह अभी आपके करियर विकास में सहायक हैं।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Help readers understand the four-phase career arc in Vedic astrology and identify which growth accelerator houses are most relevant to their chart.',
    targetAudience:  ['professionals at career crossroads', 'astrology students studying career timing', 'people in career transition'],
    primaryQuestion: 'Which phase of career growth am I in according to Vedic astrology?',
    contentAngle:    'The 3rd house (skills) stalls more careers than any weak 10th house — the overlooked growth engine in every chart',
    relatedConcepts: ['saturn return', 'jupiter cycle', '3rd house skills', '9th house fortune', '11th house gains', 'rahu disruption', 'dasha sequence'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish analysis of career arc phases using dasha sequences and the four growth-accelerating houses',
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
