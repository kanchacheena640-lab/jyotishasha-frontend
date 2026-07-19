import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const jobVsBusiness: DomainTopic = {

  identity: {
    id:        'astrology:job-vs-business',
    slug:      'job-vs-business',
    title:     'Job vs Business: What Your Birth Chart Recommends',
    title_hi:  'नौकरी बनाम व्यापार: जन्मकुंडली क्या सुझाती है',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/job-vs-business',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Job vs Business',     label_hi: 'नौकरी बनाम व्यापार', href: '/financial-astrology/job-vs-business' },
    ],
  },

  seo: {
    metaTitle:          'Job vs Business in Astrology: What Your Chart Shows',
    metaDescription:    'Employment or entrepreneurship: your birth chart holds the answer. The 3rd house — self-initiative — is the real key to business success in Vedic astrology.',
    metaDescription_hi: 'नौकरी या व्यापार में से क्या आपकी कुंडली के अनुकूल है, यह दशम भाव से अधिक तृतीय भाव पर निर्भर करता है — स्व-पहल और साहस का भाव।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Job vs Business: Reading the Employment-Entrepreneurship Question in Your Chart',
    headline_hi: 'नौकरी बनाम व्यापार: अपनी कुंडली में रोजगार-उद्यमिता प्रश्न पढ़ना',
    subtext:     'The 7th house (partnerships) and 10th house (career) get most of the attention in business readings. But the 3rd house — self-initiative, courage to act, and willingness to compete without a safety net — is the actual determinant of business success',
    subtext_hi:  '7वें और 10वें भाव पर ध्यान केंद्रित होता है, लेकिन तृतीय भाव — स्व-पहल, साहस — व्यापारिक सफलता का वास्तविक निर्धारक है',
  },

  taxonomy: {
    tags:        ['job-vs-business', 'entrepreneurship-astrology', '3rd-house', '7th-house', 'self-employment', 'career-choice'],
    keywords:    ['job vs business astrology', 'self employment horoscope', 'entrepreneurship birth chart', '3rd house business', 'which is better job or business astrology'],
    keywords_hi: ['नौकरी या व्यापार ज्योतिष', 'स्वरोजगार कुंडली', 'उद्यमिता ज्योतिष', 'तृतीय भाव व्यापार', 'नौकरी बनाम व्यवसाय'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'comparison-table',
        title:    'Job vs Business: Key Astrological Indicators Compared',
        title_hi: 'नौकरी बनाम व्यापार: मुख्य ज्योतिषीय संकेतक तुलना',
        layout:   'comparison',
        items: [
          {
            id:       'cmp-primary-house',
            label:    'Primary House',
            label_hi: 'मुख्य भाव',
            body:     'Job: 6th house (service, employment, routine). The 6th house represents salaried work, serving under an employer, and daily work routines. A strong 6th lord well-placed in the chart supports stable employment.',
            body_hi:  'नौकरी: षष्ठ भाव (सेवा, रोजगार, दिनचर्या)। मजबूत षष्ठेश स्थिर रोजगार का समर्थन करता है।',
            badge:    'Job',
            badge_hi: 'नौकरी',
            badgeVariant: 'neutral',
            href:     'business',
          },
          {
            id:       'cmp-primary-house-b',
            label:    'Primary House',
            label_hi: 'मुख्य भाव',
            body:     'Business: 7th house (partnerships, independent dealings with the public) and 3rd house (initiative, courage, self-directed effort). The 7th house governs independent professional dealings; the 3rd house determines whether the person has the initiative to sustain them.',
            body_hi:  'व्यापार: सप्तम भाव (साझेदारी, स्वतंत्र जन-व्यवहार) और तृतीय भाव (पहल, साहस)। सप्तम भाव स्वतंत्र व्यापार; तृतीय भाव उन्हें बनाए रखने की क्षमता।',
            badge:    'Business',
            badge_hi: 'व्यापार',
            badgeVariant: 'positive',
          },
          {
            id:       'cmp-key-planet',
            label:    'Key Planet',
            label_hi: 'मुख्य ग्रह',
            body:     'Job: Saturn. Saturn rules discipline, hierarchy, structured environments, and long-term institutional loyalty. A prominent Saturn in the chart — especially connected to the 10th house — produces a person who thrives in organized professional settings with clear roles.',
            body_hi:  'नौकरी: शनि। शनि अनुशासन, पदानुक्रम, संरचित वातावरण का शासक है। 10वें से जुड़ा प्रमुख शनि व्यक्ति को संगठित पेशेवर परिवेश में फलने-फूलने देता है।',
            badge:    'Job',
            badge_hi: 'नौकरी',
            badgeVariant: 'neutral',
          },
          {
            id:       'cmp-key-planet-b',
            label:    'Key Planet',
            label_hi: 'मुख्य ग्रह',
            body:     'Business: Mercury and Mars. Mercury rules commerce, trade, negotiation, and information-based enterprise. Mars rules initiative, risk tolerance, and the competitive drive to build independently. Both need to be reasonably placed for sustained business success.',
            body_hi:  'व्यापार: बुध और मंगल। बुध वाणिज्य, व्यापार, वार्ता का शासक है। मंगल पहल, जोखिम सहनशीलता और स्वतंत्र रूप से निर्माण करने की प्रतिस्पर्धी भावना।',
            badge:    'Business',
            badge_hi: 'व्यापार',
            badgeVariant: 'positive',
          },
          {
            id:       'cmp-income-pattern',
            label:    'Income Pattern',
            label_hi: 'आय पैटर्न',
            body:     'Job: Steady and predictable. Employment charts with strong 2nd and 6th house indicators produce consistent monthly income but often limited upside potential. Income growth is typically linear — tied to promotions and tenure.',
            body_hi:  'नौकरी: स्थिर और अनुमानित। मजबूत 2nd और 6th भाव के साथ रोजगार चार्ट लगातार मासिक आय देते हैं लेकिन अक्सर सीमित ऊपरी क्षमता के साथ।',
            badge:    'Job',
            badge_hi: 'नौकरी',
            badgeVariant: 'neutral',
          },
          {
            id:       'cmp-income-pattern-b',
            label:    'Income Pattern',
            label_hi: 'आय पैटर्न',
            body:     'Business: Variable and asymmetric. Business charts with strong 11th house indicators can produce income that scales non-linearly — but also periods of zero income. The 11th house (gains from enterprise) and 2nd house (accumulated wealth) need to work together for business income to compound.',
            body_hi:  'व्यापार: परिवर्तनशील और असममित। मजबूत 11वें भाव वाले चार्ट गैर-रेखीय रूप से बढ़ने वाली आय दे सकते हैं — लेकिन शून्य आय की अवधि भी।',
            badge:    'Business',
            badge_hi: 'व्यापार',
            badgeVariant: 'positive',
          },
        ],
      },

      {
        id:       'business-readiness',
        title:    'Is Your Chart Business-Ready? Key Indicators to Check',
        title_hi: 'क्या आपकी कुंडली व्यापार के लिए तैयार है? मुख्य संकेतक',
        layout:   'checklist',
        items: [
          {
            id:    'check-3rd-house',
            label: '3rd house is occupied or aspected by Mars, Mercury, or the 3rd lord is strong',
            label_hi: 'तृतीय भाव मंगल, बुध द्वारा अधिष्ठित या दृष्ट है, या तृतीयेश मजबूत है',
            body:  'This is the single most important business readiness indicator. The 3rd house drives self-initiated action without waiting for permission or structure — the core skill of entrepreneurship.',
            body_hi: 'यह सबसे महत्वपूर्ण व्यापार तत्परता संकेतक है। तृतीय भाव बिना अनुमति या संरचना की प्रतीक्षा के स्व-आरंभित कार्य को चलाता है।',
          },
          {
            id:    'check-7th-house',
            label: '7th house lord is placed in a good house and not heavily afflicted',
            label_hi: 'सप्तम भाव का स्वामी अच्छे भाव में स्थित है और अधिक पीड़ित नहीं है',
            body:  'The 7th house governs independent professional dealings and partnerships. A well-placed 7th lord supports the ability to negotiate, close deals, and maintain business relationships.',
            body_hi: 'सप्तम भाव स्वतंत्र व्यापारिक लेनदेन और साझेदारी का स्वामी है। अच्छी तरह से स्थित सप्तमेश वार्ता और व्यापार संबंध बनाए रखने की क्षमता देता है।',
          },
          {
            id:    'check-11th-house',
            label: '11th house lord has a positive relationship with 2nd house lord',
            label_hi: 'एकादश भाव स्वामी का द्वितीय भाव स्वामी से सकारात्मक संबंध है',
            body:  'The 11th house (gains) and 2nd house (accumulated wealth) need to be connected for business income to compound rather than disappear as fast as it arrives.',
            body_hi: 'व्यापारिक आय के संचय के लिए एकादश (लाभ) और द्वितीय (संचित धन) भावों का संबंध आवश्यक है।',
          },
          {
            id:    'check-moon',
            label: 'Moon is reasonably strong (not debilitated, not heavily afflicted)',
            label_hi: 'चंद्रमा उचित रूप से मजबूत है (नीच नहीं, अधिक पीड़ित नहीं)',
            body:  'Business requires sustained decision-making under uncertainty. A strong Moon provides the emotional resilience to keep making decisions without the psychological security of a salary.',
            body_hi: 'व्यापार के लिए अनिश्चितता में निरंतर निर्णय लेने की आवश्यकता है। मजबूत चंद्रमा वेतन की मनोवैज्ञानिक सुरक्षा के बिना निर्णय लेने का भावनात्मक लचीलापन देता है।',
          },
          {
            id:    'check-no-strong-6th',
            label: '6th lord is not more powerful than the 7th lord in the chart',
            label_hi: 'षष्ठेश कुंडली में सप्तमेश से अधिक शक्तिशाली नहीं है',
            body:  'When the 6th lord dominates the 7th lord, the chart strongly favors employment over enterprise — the native will be most productive and satisfied within an institutional framework.',
            body_hi: 'जब षष्ठेश सप्तमेश पर हावी हो, तो कुंडली दृढ़ता से रोजगार का पक्ष लेती है — व्यक्ति संस्थागत ढांचे में सबसे अधिक उत्पादक होगा।',
          },
        ],
      },

      {
        id:       'alert-wrong-path',
        title:    'Signs You May Be on the Wrong Path',
        title_hi: 'संकेत कि आप गलत रास्ते पर हो सकते हैं',
        layout:   'alert',
        items: [
          {
            id:       'alert-business-with-job-chart',
            label:    'Running a Business With a Job-Oriented Chart',
            label_hi: 'नौकरी-उन्मुख कुंडली के साथ व्यापार चलाना',
            body:     "A chart with a dominant 6th house, strong Saturn, and a weak 3rd lord often produces someone who is technically skilled but psychologically dependent on structure, hierarchy, and institutional validation. Starting a business in this configuration doesn't produce freedom — it produces the anxiety of structure without the support of structure. This person typically performs better as a high-level employee than as a founder.",
            body_hi:  'प्रभावी 6वें भाव, मजबूत शनि, और कमजोर तृतीयेश वाली कुंडली अक्सर ऐसे व्यक्ति को जन्म देती है जो तकनीकी रूप से कुशल है लेकिन संरचना पर मनोवैज्ञानिक रूप से निर्भर है।',
            badgeVariant: 'warning',
          },
          {
            id:       'alert-employment-with-business-chart',
            label:    'Staying Employed With a Business-Oriented Chart',
            label_hi: 'व्यापार-उन्मुख कुंडली के साथ नौकरी में बने रहना',
            body:     "A chart with a strong 3rd house, well-placed Mercury, and a prominent Rahu in the entrepreneurial half of the chart often produces someone who finds employment deeply frustrating. The frustration isn't a personality problem — it's a chart problem. These individuals chafe under hierarchy, tend to propose more changes than their role allows, and consistently underperform relative to their capability when placed in salaried structures.",
            body_hi:  'मजबूत तृतीय भाव, अच्छी तरह से स्थित बुध, और उद्यमशील कुंडली वाला व्यक्ति रोजगार में गहरी निराशा पाता है। पदानुक्रम के तहत घुटन महसूस करता है।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Job vs Business in Astrology',
        title_hi: 'ज्योतिष में नौकरी बनाम व्यापार के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-both',
            label:    'Can my chart support both employment and business simultaneously?',
            label_hi: 'क्या मेरी कुंडली रोजगार और व्यापार दोनों का समर्थन कर सकती है?',
            body:     "Yes — particularly if the 6th lord and 7th lord are both strong and well-placed. This configuration produces people who start businesses while maintaining professional employment, or who run consulting practices alongside institutional roles. The dual path works when both indicators are strong; it creates conflict when one is weak and the person is dividing attention between an unsupported area and a supported one.",
            body_hi:  'हाँ — विशेष रूप से यदि षष्ठेश और सप्तमेश दोनों मजबूत और अच्छी तरह से स्थित हों। यह संयोजन उन लोगों को जन्म देता है जो पेशेवर रोजगार बनाए रखते हुए व्यापार शुरू करते हैं।',
          },
          {
            id:       'faq-3rd-house-key',
            label:    'Why is the 3rd house more important for business than the 7th house?',
            label_hi: 'व्यापार के लिए सप्तम से तृतीय भाव अधिक महत्वपूर्ण क्यों है?',
            body:     "The 7th house tells you whether you can deal with the public or partners effectively. But many employed people do this too — client-facing roles, management, and sales all involve 7th house skills. What distinguishes the entrepreneur is self-generated initiative without waiting for instruction: the ability to act on an opportunity before anyone else tells you to. That is the 3rd house, and it is what most business charts either have strongly or learn to develop.",
            body_hi:  'सप्तम भाव बताता है कि आप जनता से प्रभावी ढंग से निपट सकते हैं — लेकिन कई कर्मचारी भी यही करते हैं। उद्यमी को अलग करती है स्व-उत्पन्न पहल — बिना निर्देश की प्रतीक्षा किए कार्य करना। यह तृतीय भाव है।',
          },
          {
            id:       'faq-timing',
            label:    'When is the best time to start a business according to astrology?',
            label_hi: 'ज्योतिष के अनुसार व्यापार शुरू करने का सबसे अच्छा समय कब है?',
            body:     "The best time to start a business is when the current mahadasha or antardasha lord is the ruler of the 7th, 3rd, or 11th house — or a planet strongly connected to these houses natally. Jupiter transiting through the 7th house or Jupiter forming a positive aspect to natal Mercury or the 7th lord in transit also supports business launches. Avoid starting during the mahadasha of a planet that is the 6th lord with no additional career house connection.",
            body_hi:  'व्यापार शुरू करने का सबसे अच्छा समय तब है जब वर्तमान महादशा या अंतर्दशा स्वामी 7वें, 3वें, या 11वें भाव का शासक हो। गुरु का 7वें भाव से गोचर भी व्यापार लॉन्च का समर्थन करता है।',
          },
          {
            id:       'faq-partnership',
            label:    'My chart is weak for business. Can a business partner compensate?',
            label_hi: 'मेरी कुंडली व्यापार के लिए कमजोर है। क्या व्यापारिक साझेदार भरपाई कर सकता है?',
            body:     "Partially — especially if the partner's chart shows the strengths yours lacks. A person with weak 3rd house (low initiative) partnering with someone who has a strong 3rd house can work well structurally. The critical requirement: the partnership agreement must reflect the actual chart strengths. The person with the employment-oriented chart typically does better in operational or specialist roles within the venture, not as the primary decision-maker.",
            body_hi:  'आंशिक रूप से — विशेष रूप से यदि साझेदार की कुंडली आपकी कमज़ोरियों की ताकत दिखाती है। कमजोर तृतीय भाव वाला व्यक्ति मजबूत तृतीय भाव वाले के साथ अच्छा काम कर सकता है।',
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
        label:       'Get Your Job vs Business Analysis',
        label_hi:    'अपना नौकरी बनाम व्यापार विश्लेषण प्राप्त करें',
        description: 'A chart-specific assessment of your 3rd, 6th, 7th, and 11th house indicators to determine whether employment or entrepreneurship is more supported.',
        description_hi: 'आपके तृतीय, षष्ठ, सप्तम और एकादश भाव संकेतकों का कुंडली-विशिष्ट मूल्यांकन।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Business Timing',
        label_hi:    'अपना व्यापार समय जांचें',
        description: 'Enter your birth details to see whether your current dasha and 3rd, 7th, and 11th house indicators support starting, scaling, or staying in a business right now.',
        description_hi: 'देखें क्या आपकी वर्तमान दशा व्यापार शुरू करने या बढ़ाने का समर्थन करती है।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'comparison',
    authorityLevel:  'standard',
    topicGoal:       'Help readers determine whether their chart favors employment or entrepreneurship using the 3rd, 6th, 7th, and 11th house framework.',
    targetAudience:  ['people considering leaving employment for business', 'entrepreneurs evaluating career direction', 'professionals choosing between salaried and independent work'],
    primaryQuestion: 'Does my birth chart favor a job or a business?',
    contentAngle:    'The 3rd house (self-initiative) is the real key to business success — more than the 7th house or any partnership indicator',
    relatedConcepts: ['3rd house initiative', '6th house employment', '7th house partnerships', '11th house gains', 'business timing', 'entrepreneurship dasha'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish comparative analysis of employment versus entrepreneurship using the 3rd, 6th, 7th, and 11th house indicators and their planetary rulers',
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
