import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const newJobChances: DomainTopic = {

  // ─── IDENTITY ─────────────────────────────────────────────────────────────
  identity: {
    id:        'astrology:new-job-chances',             // TopicId: domain:slug format (v1.1)
    slug:      'new-job-chances',
    title:     'New Job Chances in Your Birth Chart',
    title_hi:  'कुंडली में नई नौकरी के योग',             // v1.1: first-class field (was metadata.title_hi_nav)
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  // ─── ROUTING ──────────────────────────────────────────────────────────────
  routing: {
    canonicalPath: '/financial-astrology/new-job-chances',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',              href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष',  href: '/financial-astrology' },
      { label: 'New Job Chances in Your Birth Chart', label_hi: 'कुंडली में नई नौकरी के योग', href: '/financial-astrology/new-job-chances' },
    ],
  },

  // ─── SEO ──────────────────────────────────────────────────────────────────
  seo: {
    metaTitle:          'New Job Chances in Astrology: Timing Your Career Move',
    metaDescription:    'Which planets in your birth chart indicate new job chances? Learn how Jupiter, Saturn, Rahu, and dashas predict the best employment windows in your chart.',
    metaDescription_hi: 'आपकी कुंडली में कौन से ग्रह नई नौकरी के योग बनाते हैं? जानें गुरु, शनि, राहु और दशाएं कैसे मिलकर रोजगार के अवसरों का संकेत देती हैं।',
    robots: 'index,follow',
  },

  // ─── HERO ─────────────────────────────────────────────────────────────────
  hero: {
    headline:    'New Job Chances in Astrology: What Your Birth Chart Shows',
    headline_hi: 'कुंडली में नई नौकरी के योग',
    subtext:     'Discover which planets and dashas reveal your best windows for finding new employment — and what astrology actually says about job timing',
    subtext_hi:  'जानें कौन से ग्रह और दशाएं आपकी नई नौकरी के सर्वोत्तम समय को दर्शाती हैं',
  },

  // ─── TAXONOMY ─────────────────────────────────────────────────────────────
  taxonomy: {
    tags:         ['career-change', 'employment', 'saturn-jupiter', 'dasha-timing', 'transit', '10th-house'],
    keywords:     ['new job astrology', 'job chance horoscope', 'employment prediction astrology', 'job dasha astrology', 'when will I get a new job astrology', 'career planets horoscope'],
    keywords_hi:  ['नई नौकरी के योग', 'नौकरी मिलने का ज्योतिष', 'नौकरी कब मिलेगी', 'करियर ज्योतिष', 'रोजगार के योग'],
    // ↑ v1.1: moved from metadata.keywords_hi (was migration gap #3)
    hubPriority:  'standard',
  },

  // ─── CONTENT ──────────────────────────────────────────────────────────────
  content: {
    contentTemplate: 'concept',
    // ↑ v1.1: changed from 'custom' — 'concept' is the correct template for
    // educational financial-astrology authority pages.

    contentBlocks: [
      // ── Section 1: Planets ────────────────────────────────────────────────
      {
        id:       'key-planets',
        title:    'Planets That Signal New Job Opportunities',
        title_hi: 'नई नौकरी के संकेत देने वाले ग्रह',
        layout:   'cards',
        items: [
          {
            id:       'jupiter',
            icon:     '♃',
            label:    'Jupiter (Guru)',
            label_hi: 'गुरु (बृहस्पति)',
            body:     'Jupiter transiting or aspecting your 10th house draws attention — but only when it simultaneously connects with your running dasha. An unconnected Jupiter transit is mostly noise. The real signal is Jupiter as the 10th lord running its own mahadasha or antardasha: that combination consistently delivers new professional opportunities.',
            body_hi:  'गुरु का दशम भाव पर गोचर तभी प्रभावी होता है जब वह आपकी चल रही दशा से जुड़ा हो। अगर गुरु स्वयं दशमेश है और अपनी महादशा या अंतर्दशा चला रहा है — तो यह सबसे विश्वसनीय संकेत है।',
            badge:    'Career Expander',
            badge_hi: 'कैरियर विस्तारक',
            badgeVariant: 'positive',
          },
          {
            id:       'saturn',
            icon:     '♄',
            label:    'Saturn (Shani)',
            label_hi: 'शनि',
            body:     "Most people fear Saturn's dasha during job searches. The reality is opposite for several ascendants. Saturn dasha for Taurus, Libra, Capricorn, and Aquarius lagna often produces the most stable and enduring employment of a lifetime — slow to start, permanent when it arrives. Judging Saturn by general fear instead of its specific role in your chart is the single biggest mistake in career prediction.",
            body_hi:  'शनि दशा में नौकरी की तलाश से अधिकतर लोग डरते हैं। लेकिन वृष, तुला, मकर और कुंभ लग्न के लिए शनि दशा जीवन की सबसे स्थायी नौकरी का समय होती है — धीमी शुरुआत, पर टिकाऊ परिणाम।',
            badge:    'Slow but Permanent',
            badge_hi: 'धीमा पर स्थायी',
            badgeVariant: 'neutral',
          },
          {
            id:       'rahu',
            icon:     '☊',
            label:    'Rahu',
            label_hi: 'राहु',
            body:     "Rahu's transit through the 10th house or over the 10th lord is the most underrated indicator for sudden job changes. Especially potent for roles in technology, media, startups, or foreign-based companies. Rahu rarely announces itself — opportunities appear unexpectedly, often through an unusual referral or platform you weren't using for job search.",
            body_hi:  'दशम भाव में राहु का गोचर अचानक नौकरी बदलाव का सबसे कम आंका गया संकेत है। तकनीक, मीडिया, स्टार्टअप या विदेशी कंपनियों के लिए विशेष रूप से प्रभावशाली। अवसर बिना किसी पूर्व सूचना के, अप्रत्याशित माध्यम से आता है।',
            badge:    'Unexpected Doors',
            badge_hi: 'अप्रत्याशित अवसर',
            badgeVariant: 'info',
          },
          {
            id:       'mercury',
            icon:     '☿',
            label:    'Mercury (Budh)',
            label_hi: 'बुध',
            body:     "For professionals in finance, analysis, writing, law, or consulting, Mercury's dasha or antardasha is almost always when a new role materialises. Mercury rules professional negotiation — and every job offer is, at its core, a negotiation. A strong natal Mercury (exalted in Virgo, own sign, or in the 2nd/10th) amplifies this significantly.",
            body_hi:  'वित्त, विश्लेषण, लेखन, कानून या परामर्श क्षेत्र के पेशेवरों के लिए बुध दशा या अंतर्दशा में अक्सर नई नौकरी मिलती है। बुध पेशेवर वार्ता का कारक है — और हर नौकरी का प्रस्ताव मूलतः एक वार्ता है।',
            badge:    'Communication Roles',
            badge_hi: 'संचार भूमिकाएं',
            badgeVariant: 'positive',
          },
          {
            id:       'sun',
            icon:     '☉',
            label:    'Sun (Surya)',
            label_hi: 'सूर्य',
            body:     "The Sun's dasha is the decisive window for government jobs, public sector roles, and positions carrying authority or recognition. Critically: a combust 10th lord (within 6° of Sun) temporarily suppresses career momentum regardless of other favorable indicators. Check combustion before predicting a quick hire.",
            body_hi:  'सरकारी नौकरी और अधिकार के पदों के लिए सूर्य दशा निर्णायक होती है। ध्यान दें: दशमेश का सूर्य से अस्त होना (6° के भीतर) करियर की गति को अस्थायी रूप से दबा देता है, चाहे अन्य योग कितने भी अनुकूल हों।',
            badge:    'Authority & Govt',
            badge_hi: 'सत्ता और सरकार',
            badgeVariant: 'positive',
          },
        ],
      },

      // ── Section 2: Positive Signs ─────────────────────────────────────────
      {
        id:       'positive-signs',
        title:    'Positive Signs for Employment in Your Chart',
        title_hi: 'कुंडली में शुभ संकेत',
        layout:   'checklist',
        items: [
          {
            id:          'tenth-lord-kendra',
            label:       '10th lord placed in a Kendra (1st, 4th, 7th, 10th) or Trikona (5th, 9th)',
            label_hi:    'दशमेश केंद्र (1, 4, 7, 10) या त्रिकोण (5, 9) में स्थित है',
            badgeVariant: 'positive',
          },
          {
            id:          'jupiter-aspects-tenth',
            label:       'Jupiter aspects the 10th house or 10th lord by conjunction, 5th, 7th, or 9th aspect',
            label_hi:    'गुरु का दशम भाव या दशमेश पर युति, 5वीं, 7वीं, या 9वीं दृष्टि से प्रभाव',
            badgeVariant: 'positive',
          },
          {
            id:          'active-dasha',
            label:       'Running the mahadasha or antardasha of the 10th lord, 6th lord, or 11th lord',
            label_hi:    'दशमेश, षष्ठेश, या एकादशेश की महादशा या अंतर्दशा चल रही है',
            badgeVariant: 'positive',
          },
          {
            id:          'eleventh-strong',
            label:       '11th house lord strong and well-placed — gains and fulfilment of wishes are indicated',
            label_hi:    'एकादशेश बलवान और शुभ स्थान में — लाभ और इच्छा पूर्ति के योग',
            badgeVariant: 'positive',
          },
          {
            id:          'lagna-lord-connected',
            label:       'Lagna lord connected to the 10th house by conjunction, aspect, or mutual exchange',
            label_hi:    'लग्नेश का दशम भाव से युति, दृष्टि या परिवर्तन योग',
            badgeVariant: 'positive',
          },
          {
            id:          'no-combustion',
            label:       '10th lord is not combust — not within 6° of the Sun in the natal chart',
            label_hi:    'दशमेश अस्त नहीं है — जन्मकुंडली में सूर्य से 6° से अधिक दूरी पर है',
            badgeVariant: 'positive',
          },
        ],
      },

      // ── Section 3: Timing Cautions ────────────────────────────────────────
      {
        id:       'timing-cautions',
        title:    'Timing Cautions for New Job Seekers',
        title_hi: 'सावधानी के संकेत',
        layout:   'alert',
        items: [
          {
            id:       'mercury-retrograde',
            label:    'Avoid joining a new role during Mercury retrograde',
            label_hi: 'बुध वक्री के समय नई नौकरी जॉइन करने से बचें',
            body:     'Contracts and offer letters signed during Mercury retrograde frequently contain clauses that require renegotiation later. The role itself may change significantly within the first 3 months. If timing is not in your control, read the offer letter with unusual care.',
            body_hi:  'बुध वक्री के दौरान हस्ताक्षरित अनुबंधों में अक्सर ऐसी शर्तें होती हैं जिन्हें बाद में पुनर्विचार की आवश्यकता पड़ती है। यदि समय आपके नियंत्रण में नहीं है, तो ऑफर लेटर को विशेष सावधानी से पढ़ें।',
            badgeVariant: 'warning',
          },
          {
            id:       'saturn-over-sun',
            label:    'Saturn transiting directly over your natal Sun',
            label_hi: 'शनि का जन्मकालीन सूर्य पर सीधा गोचर',
            body:     'Job offers that arrive during this transit often come with hidden conditions, demanding managers, or unexpected scope creep. Evaluate the culture and management structure — not just the compensation — before accepting.',
            body_hi:  'इस गोचर के दौरान आने वाले नौकरी के प्रस्तावों में अक्सर छिपी शर्तें या कठिन प्रबंधन होता है। केवल वेतन नहीं, कार्यस्थल की संस्कृति और प्रबंधन को भी परखें।',
            badgeVariant: 'negative',
          },
          {
            id:       'ketu-tenth',
            label:    'Ketu transiting through the 10th house',
            label_hi: 'केतु का दशम भाव में गोचर',
            body:     'Career direction becomes unclear and scattered during this period. Not a time to make long-term employment commitments. Short-term contracts or independent projects work better. Wait for Ketu to cross into the 9th before signing permanent roles.',
            body_hi:  'इस अवधि में करियर की दिशा अस्पष्ट और बिखरी होती है। दीर्घकालिक रोजगार की प्रतिबद्धता के लिए यह सही समय नहीं है। स्वतंत्र या अनुबंध कार्य बेहतर रहता है।',
            badgeVariant: 'warning',
          },
          {
            id:       'tenth-lord-combust',
            label:    '10th lord is combust in the transit sky (not natal)',
            label_hi: 'गोचर में दशमेश का अस्त होना (जन्मकालीन नहीं)',
            body:     'When the transiting 10th lord is combust, professional visibility is temporarily reduced — your efforts may not be seen or credited as readily. Push for interviews and outreach before or after the combustion window, not during it.',
            body_hi:  'जब गोचर में दशमेश अस्त हो, तो पेशेवर दृश्यता अस्थायी रूप से कम हो जाती है। साक्षात्कार और नेटवर्किंग अस्त की अवधि के पहले या बाद में करें।',
            badgeVariant: 'warning',
          },
        ],
      },

      // ── Section 4: FAQ (always last) ──────────────────────────────────────
      {
        id:       'faqs',
        title:    'Common Questions About New Job Chances',
        title_hi: 'अक्सर पूछे जाने वाले प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-jupiter-guarantee',
            label:    'Does Jupiter in the 10th house guarantee a new job?',
            label_hi: 'क्या दशम भाव में गुरु नई नौकरी की गारंटी देता है?',
            body:     'No single placement guarantees employment. Jupiter in the 10th is one of the most favorable indicators, but without a supporting dasha, it remains potential rather than result. A well-placed 10th lord in an active career dasha consistently matters more than any transit.',
            body_hi:  'कोई भी एकल ग्रह स्थिति नौकरी की गारंटी नहीं देती। दशम में गुरु शुभ है, लेकिन सहायक दशा के बिना यह संभावना बनकर रह जाता है। सक्रिय दशा में बलवान दशमेश हमेशा किसी भी गोचर से अधिक महत्वपूर्ण है।',
          },
          {
            id:       'faq-best-dasha',
            label:    'Which dasha period is best for finding a new job?',
            label_hi: 'नई नौकरी के लिए कौन सी दशा सर्वोत्तम है?',
            body:     "The mahadasha of your 10th lord, or of any planet placed in the 10th house. Within another planet's mahadasha, the antardasha of Jupiter or Mercury frequently delivers the actual offer — even when the main dasha planet is unrelated to career. The \"sub-period\" level is where most job changes actually materialise.",
            body_hi:  'दशमेश की महादशा, या दशम भाव में स्थित किसी ग्रह की दशा सर्वोत्तम है। किसी अन्य ग्रह की महादशा में भी गुरु या बुध की अंतर्दशा प्रायः नौकरी का प्रस्ताव लाती है। अधिकांश नौकरी परिवर्तन अंतर्दशा स्तर पर होते हैं।',
          },
          {
            id:       'faq-saturn-dasha',
            label:    'Is Saturn mahadasha always bad for job searching?',
            label_hi: 'क्या शनि महादशा में नौकरी की तलाश हमेशा कठिन होती है?',
            body:     'Absolutely not. This is one of the most persistent misconceptions in Jyotish. Saturn is a yogakaraka for Taurus and Libra ascendants, and a strong functional benefic for Capricorn and Aquarius. For these charts, Saturn dasha can be the period of greatest career stability and advancement. The mistake is applying general Saturn fear without checking its specific role in the individual chart.',
            body_hi:  'बिल्कुल नहीं। यह ज्योतिष की सबसे बड़ी भ्रांतियों में से एक है। वृष और तुला लग्न के लिए शनि योगकारक है, और मकर-कुंभ के लिए कार्यात्मक शुभ है। इन कुंडलियों के लिए शनि दशा करियर की सबसे स्थिर और उन्नत अवधि हो सकती है।',
          },
          {
            id:       'faq-how-long',
            label:    'How long after a favorable dasha starts should I expect job results?',
            label_hi: 'शुभ दशा शुरू होने के कितने समय बाद नौकरी मिल सकती है?',
            body:     'Typically 3 to 6 months from the start of a favorable antardasha, assuming active job searching. Slower planets (Saturn, Jupiter) build momentum over the first few months before results appear. Faster planets (Mercury, Moon) can produce results within weeks. Almost no favorable dasha produces instant results on day one — the chart unfolds gradually.',
            body_hi:  'आमतौर पर अनुकूल अंतर्दशा शुरू होने के 3 से 6 महीने बाद, यदि आप सक्रिय रूप से नौकरी की तलाश कर रहे हों। शनि और गुरु जैसे धीमे ग्रह परिणाम देने से पहले कुछ महीने लेते हैं। बुध और चंद्र तेज़ परिणाम दे सकते हैं।',
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
        id:             'cta-career-report',
        type:           'report',
        slug:           'career_report',
        label:          'Get Your Full Career Report',
        label_hi:       'पूर्ण करियर रिपोर्ट प्राप्त करें',
        description:    'A detailed analysis of your 10th house, all career planets, your current dasha timeline, and 12-month windows for job changes — in one comprehensive report.',
        description_hi: 'दशम भाव, सभी करियर ग्रहों, वर्तमान दशा अनुक्रम, और नौकरी बदलाव के 12-महीने के अवसरों का विस्तृत विश्लेषण — एक व्यापक रिपोर्ट में।',
        variant:        'primary',
      },
      {
        id:             'cta-job-prediction-tool',
        type:           'tool',
        slug:           'career-path',
        label:          'Check Your Job Chances',
        label_hi:       'अपने नौकरी के योग जाँचें',
        description:    'Enter your birth details and discover which planets are currently supporting your career — and the best months ahead for a job change.',
        description_hi: 'अपना जन्म विवरण दर्ज करें और जानें कौन से ग्रह अभी आपके करियर में सहायक हैं — और आगे के किन महीनों में नौकरी बदलाव के सबसे अच्छे अवसर हैं।',
        variant:        'secondary',
      },
    ],
  },

  // ─── AI METADATA ──────────────────────────────────────────────────────────
  aiMetadata: {
    difficulty:      'beginner',      // v1.1: direct from AuthorityTopic.difficulty
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Understand which planets and dashas produce new employment opportunities in a Vedic horoscope.',
    targetAudience:  ['job seekers using Vedic astrology', 'career astrology students', 'professionals evaluating timing for job changes'],
    primaryQuestion: 'Which planets and dashas indicate new job opportunities in my birth chart?',
    contentAngle:    'Focuses on dasha activation as the primary timing signal — over transits alone — correcting the common overemphasis on Jupiter and Saturn transits without dasha support',
    relatedConcepts: ['vimshottari dasha', '10th house', 'dasha activation', 'jupiter transit', 'saturn dasha', 'rahu career', 'combustion', 'antardasha'],
  },

  // ─── SCHEMA SIGNALS ───────────────────────────────────────────────────────
  schemaSignals: {
    expertise:     'Vedic Jyotish analysis of career indicators using 10th house placement, dasha timing, and planetary periods',
    datePublished: '2026-07-18',
  },

  // ─── AUTHORITY ────────────────────────────────────────────────────────────
  authority: {
    reviewStatus:   'approved',
    lastUpdated:    '2026-07-18T00:00:00Z',
    contentVersion: 1,
  },

  // ─── PUBLISHING ───────────────────────────────────────────────────────────
  publishing: {
    isIndexable:     true,
    isSearchEnabled: true,
    visibility:      'public',
  },

  // ─── LINEAGE ──────────────────────────────────────────────────────────────
  lineage: {
    firstAuthoredAt: '2026-07-18',       // AuthorityTopic.publishedAt
    migratedAt:      '2026-07-19',       // date migrated to DomainTopic
    legacySource:    'authority-topic-v1',
    legacyVersion:   1,
  },
}
