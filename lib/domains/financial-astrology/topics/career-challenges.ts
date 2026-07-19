import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const careerChallenges: DomainTopic = {

  identity: {
    id:        'astrology:career-challenges',
    slug:      'career-challenges',
    title:     'Career Challenges in Vedic Astrology: What Your Chart Reveals',
    title_hi:  'वैदिक ज्योतिष में करियर की बाधाएं: कुंडली क्या बताती है',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/career-challenges',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Career Challenges',   label_hi: 'करियर की बाधाएं', href: '/financial-astrology/career-challenges' },
    ],
  },

  seo: {
    metaTitle:          'Career Challenges in Astrology: Reading Your Birth Chart',
    metaDescription:    'Career obstacles in your birth chart signal transformation, not just difficulty. Learn which planets drive each challenge type and when the period ends.',
    metaDescription_hi: 'सभी करियर बाधाएं दुर्भाग्य नहीं हैं — कुछ परिवर्तन का संकेत हैं। जानें कौन से ग्रह किस प्रकार की बाधा उत्पन्न करते हैं।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Career Challenges in Your Birth Chart: Obstacles or Redirections?',
    headline_hi: 'कुंडली में करियर की बाधाएं: रुकावट या दिशा परिवर्तन?',
    subtext:     "The same planetary placement that looks like career destruction can be a forced upgrade — if the chart's full picture supports it. Most people's biggest career frustrations are written in their chart, and so are the exit points",
    subtext_hi:  'जो ग्रह स्थिति करियर विनाश जैसी दिखती है, वह जबरन उन्नयन हो सकती है — यदि कुंडली की पूरी तस्वीर इसका समर्थन करती है',
  },

  taxonomy: {
    tags:        ['career-obstacles', 'saturn-challenges', 'rahu-ketu-career', '6th-house', '8th-house', 'career-transformation'],
    keywords:    ['career challenges astrology', 'career obstacles horoscope', 'career problems vedic astrology', '10th lord in 8th house', 'saturn career delay'],
    keywords_hi: ['करियर में बाधाएं ज्योतिष', 'करियर की मुश्किलें कुंडली', 'दशम भाव में समस्याएं', 'शनि और करियर'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'challenge-types',
        title:    'The Four Types of Career Challenges in a Birth Chart',
        title_hi: 'कुंडली में करियर बाधाओं के चार प्रकार',
        layout:   'cards',
        items: [
          {
            id:       'delay-challenge',
            icon:     '⏳',
            label:    "Delay — Saturn's Signature",
            label_hi: 'विलंब — शनि की पहचान',
            body:     "Career delays are the most commonly experienced challenge and are almost always associated with Saturn. When Saturn aspects the 10th house, 10th lord, or is placed in a career-sensitive position, professional milestones arrive 5–10 years later than the native expects. This is almost never permanent — Saturn's delays are associated with the quality of what eventually arrives. Late career starts under Saturn frequently produce more durable success than early starts under more permissive planetary influences.",
            body_hi:  'करियर में देरी सबसे आम चुनौती है और लगभग हमेशा शनि से जुड़ी होती है। शनि की देरी लगभग कभी स्थायी नहीं होती — जो अंततः आता है वह अधिक टिकाऊ होता है।',
            badge:    'Most Common',
            badge_hi: 'सबसे सामान्य',
            badgeVariant: 'neutral',
          },
          {
            id:       'disruption-challenge',
            icon:     '⚡',
            label:    "Disruption — Rahu and Ketu's Pattern",
            label_hi: 'व्यवधान — राहु-केतु का पैटर्न',
            body:     "Career disruption — sudden reversals, unexpected role changes, industry shifts — is Rahu and Ketu's domain. Rahu in the 10th house or in strong aspect to the 10th lord creates a career trajectory that doesn't follow conventional paths. Roles appear out of nowhere, end unexpectedly, or transform into something unrecognizable. The person with this signature typically has a more volatile but potentially more interesting career than conventionally positioned charts — the key is not to fight the disruption.",
            body_hi:  'अचानक उलटफेर, अप्रत्याशित भूमिका परिवर्तन — यह राहु-केतु का क्षेत्र है। 10वें भाव में राहु अपरंपरागत करियर पथ बनाता है। व्यवधान से न लड़ें।',
            badge:    'Volatile',
            badge_hi: 'अस्थिर',
            badgeVariant: 'warning',
          },
          {
            id:       'conflict-challenge',
            icon:     '⚔️',
            label:    'Conflict — Mars and the Workplace',
            label_hi: 'संघर्ष — मंगल और कार्यस्थल',
            body:     "Workplace conflict, authority clashes, and competitive friction are Mars-driven challenges. Mars afflicting the 6th house (workplace environment) or the 10th lord creates repeated conflict patterns — the person tends to attract adversarial colleagues, difficult managers, or competitive team dynamics regardless of the employer. The 6th house connection is key: Mars's aspect on the 6th house produces a fundamentally combative work environment that follows the person across jobs.",
            body_hi:  'कार्यस्थल संघर्ष और प्राधिकार टकराव मंगल-चालित चुनौतियां हैं। मंगल का षष्ठ भाव पर प्रभाव एक लड़ाकू कार्यस्थल अनुभव पैदा करता है जो नौकरी बदलने पर भी नहीं बदलता।',
            badge:    'Recurring',
            badge_hi: 'बार-बार',
            badgeVariant: 'warning',
          },
          {
            id:       'transformation-challenge',
            icon:     '🔄',
            label:    '8th House Placements — Transformation, Not Destruction',
            label_hi: 'अष्टम भाव की स्थितियां — परिवर्तन, विनाश नहीं',
            body:     "The 10th lord in the 8th house is not always negative — this is the most misread placement in career astrology. The 8th house governs deep transformation, hidden knowledge, and the capacity for reinvention. A 10th lord in the 8th doesn't produce simple career destruction; it produces a career that goes through at least one radical metamorphosis. The person doesn't just change jobs — they change professional identities. Research, investigation, psychology, and transformative fields are often strongly indicated.",
            body_hi:  'दशम भाव का स्वामी अष्टम में हमेशा नकारात्मक नहीं होता — यह करियर ज्योतिष की सबसे गलत व्याख्या है। यह पूर्ण पेशेवर परिवर्तन का संकेत है, न विनाश का।',
            badge:    'Misunderstood',
            badge_hi: 'गलत समझा गया',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'warning-combinations',
        title:    'Chart Combinations That Require Careful Timing',
        title_hi: 'कुंडली संयोग जिनके लिए सावधानीपूर्वक समय की आवश्यकता है',
        layout:   'alert',
        items: [
          {
            id:       'alert-saturn-rahu',
            label:    'Saturn–Rahu Conjunction in or Aspecting the 10th House',
            label_hi: 'शनि-राहु युति दशम भाव में या उस पर दृष्टि',
            body:     'This combination — called Shrapit Dosha when conjunct — creates career challenges that are simultaneously delay-based (Saturn) and disruptive (Rahu). It does not indicate permanent failure, but it does indicate that career progress will not follow a smooth ascending line. Major career moves attempted during the mahadasha of either planet require careful timing with beneficial Jupiter transits or antardasha support.',
            body_hi:  'यह संयोजन — युति होने पर श्रापित दोष कहलाता है — एक साथ देरी और व्यवधान उत्पन्न करता है। इन ग्रहों की दशा में बड़े करियर कदमों के लिए शुभ गुरु गोचर की आवश्यकता है।',
            badgeVariant: 'warning',
          },
          {
            id:       'alert-ketu-10th',
            label:    'Ketu Placed in the 10th House',
            label_hi: 'केतु दशम भाव में',
            body:     "Ketu in the 10th house creates a detachment from conventional career recognition. The person often achieves notable professional results but doesn't experience the satisfaction or public recognition that those results should logically produce. This is not a career destruction indicator — it is a dissatisfaction indicator. The antidote is finding work that connects with 4th house themes (Ketu's opposite point): roots, emotion, home, and care.",
            body_hi:  'दशम भाव में केतु पारंपरिक करियर मान्यता से वैराग्य उत्पन्न करता है। सफलता के बावजूद असंतोष का सूचक है। समाधान चतुर्थ भाव (जड़ें, देखभाल) से जुड़े कार्य में है।',
            badgeVariant: 'info',
          },
          {
            id:       'alert-malefic-6th',
            label:    'Malefic Planets in the 6th House Without Benefic Protection',
            label_hi: 'षष्ठ भाव में पापग्रह बिना शुभ ग्रह सुरक्षा के',
            body:     'The 6th house governs workplace environment, adversaries, and service conditions. Strong malefics (Mars, Saturn, Rahu) placed here without any benefic aspect (Jupiter, Venus) or without the 6th lord being well-placed create persistent workplace friction. This doesn\'t resolve by changing employers — it follows the chart. The resolution typically requires finding work where the combative energy is an asset: law, military, medicine, competitive sales.',
            body_hi:  'षष्ठ भाव में शुभ ग्रह सुरक्षा के बिना मजबूत पापग्रह निरंतर कार्यस्थल घर्षण उत्पन्न करते हैं। यह नियोक्ता बदलने से हल नहीं होता — कानून, सेना, चिकित्सा में काम उचित है।',
            badgeVariant: 'warning',
          },
        ],
      },

      {
        id:       'reading-checklist',
        title:    'How to Identify Career Challenge Patterns in Your Chart',
        title_hi: 'अपनी कुंडली में करियर चुनौती पैटर्न कैसे पहचानें',
        layout:   'checklist',
        items: [
          {
            id:    'check-10th-lord',
            label: "Find where your 10th lord is placed and which planets aspect it",
            label_hi: 'अपने दशमेश की स्थिति और उस पर दृष्टि डालने वाले ग्रह खोजें',
            body:  "The 10th lord's house placement tells you the dominant career theme; planets aspecting it tell you who is shaping the career for better or worse.",
            body_hi: 'दशमेश की भाव स्थिति मुख्य करियर विषय बताती है; उस पर दृष्टि डालने वाले ग्रह करियर को आकार देते हैं।',
          },
          {
            id:    'check-6th-house',
            label: 'Examine the 6th house separately from the 10th for workplace indicators',
            label_hi: 'षष्ठ भाव की जांच दशम से अलग कार्यस्थल संकेतकों के लिए करें',
            body:  'A well-supported 6th means easier colleague relationships and service conditions regardless of the 10th house strength.',
            body_hi: 'अच्छा षष्ठ भाव बेहतर सहकर्मी संबंध देता है, चाहे दशम भाव कितना भी मजबूत हो।',
          },
          {
            id:    'check-current-dasha',
            label: 'Identify the current mahadasha lord and its natal position',
            label_hi: 'वर्तमान महादशा स्वामी और उसकी जन्मकालीन स्थिति जानें',
            body:  'Many career challenges are time-limited to a specific dasha. If the current dasha lord is afflicted natally, the challenges ease once the period ends.',
            body_hi: 'अधिकांश करियर चुनौतियां किसी विशिष्ट दशा तक सीमित हैं। यदि वर्तमान दशा स्वामी पीड़ित है, तो अवधि समाप्त होने पर चुनौतियां कम होती हैं।',
          },
          {
            id:    'check-saturn-transit',
            label: "Check Saturn's current transit relative to the natal 10th house",
            label_hi: 'दशम भाव के सापेक्ष शनि की वर्तमान गोचर स्थिति जांचें',
            body:  'Saturn transiting through the 10th or its aspect points can create career pressure independent of the dasha. This is time-limited — Saturn moves on in 2–2.5 years.',
            body_hi: 'दशम भाव से गोचर करता शनि दशा से स्वतंत्र करियर दबाव उत्पन्न कर सकता है। यह 2-2.5 वर्ष में गुजर जाता है।',
          },
          {
            id:    'check-benefic-protection',
            label: 'Identify whether a benefic planet aspects the most challenged house',
            label_hi: 'जांचें कि क्या कोई शुभ ग्रह सबसे चुनौतीपूर्ण भाव को देखता है',
            body:  "Jupiter or Venus aspecting an afflicted 10th house or 10th lord acts as a significant mitigating factor — the challenge is real but bounded.",
            body_hi: 'गुरु या शुक्र का पीड़ित दशम भाव पर दृष्टि एक महत्वपूर्ण शमन कारक है — चुनौती वास्तविक है लेकिन सीमित।',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Career Challenges in Astrology',
        title_hi: 'करियर बाधाओं के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-permanent',
            label:    'Are career challenges in the birth chart permanent?',
            label_hi: 'क्या कुंडली में करियर की बाधाएं स्थायी होती हैं?',
            body:     "No planetary challenge in a birth chart is permanent. Even the most challenging placements — Saturn afflicting the 10th lord, 10th lord in the 8th house — are expressed through time-limited dasha periods. The natal chart shows the terrain; the dasha shows when that terrain becomes active. Most challenging periods last 3–7 years and are followed by significantly better periods once a more favorable dasha begins.",
            body_hi:  'कुंडली में कोई भी ग्रह चुनौती स्थायी नहीं होती। यहां तक कि सबसे चुनौतीपूर्ण स्थितियां समय-सीमित दशा काल के माध्यम से व्यक्त होती हैं। अधिकांश कठिन काल 3-7 वर्ष चलते हैं।',
          },
          {
            id:       'faq-remedy',
            label:    'What remedies exist for career challenges in Vedic astrology?',
            label_hi: 'वैदिक ज्योतिष में करियर बाधाओं के लिए क्या उपाय हैं?',
            body:     "The most effective remedy is using the challenging period to build the foundation for what comes next. Saturn delays reward those who use the delay to deepen competence. Rahu disruptions reward those who use the disruption to acquire skills for the new field they're being pushed toward. Gemstones and rituals can support psychological stability during hard periods — but they don't replace making good decisions.",
            body_hi:  'सबसे प्रभावी उपाय यह है कि चुनौतीपूर्ण काल का उपयोग आगे आने वाले के लिए नींव बनाने में करें। रत्न और अनुष्ठान मनोवैज्ञानिक स्थिरता के लिए सहायक हो सकते हैं।',
          },
          {
            id:       'faq-10th-8th',
            label:    'What does 10th lord in the 8th house actually mean for my career?',
            label_hi: 'दशमेश अष्टम भाव में — मेरे करियर के लिए वास्तव में क्या अर्थ है?',
            body:     "It means your career will go through at least one complete transformation — a change so fundamental that the professional identity on the other side looks little like the starting point. The 8th house also governs other people's resources, inheritance, insurance, and research. If the 10th lord is strong in the 8th, the career often involves managing these domains. The suffering comes from trying to maintain a conventional trajectory; the success comes from embracing the transformation.",
            body_hi:  'इसका अर्थ है आपका करियर कम से कम एक पूर्ण परिवर्तन से गुजरेगा। दूसरों के संसाधन, शोध और बीमा क्षेत्र संभावित हैं। पारंपरिक पथ बनाए रखने की कोशिश कष्ट देती है।',
          },
          {
            id:       'faq-good-chart-struggle',
            label:    'My chart has no major challenges — why am I still struggling?',
            label_hi: 'मेरी कुंडली में कोई बड़ी बाधा नहीं — फिर भी संघर्ष क्यों?',
            body:     'A chart without major career afflictions can still produce struggle if the 3rd house (initiative), 9th house (luck), or 11th house (gains) are weak. A person might have a strong 10th house but insufficient 3rd house initiative to act on the available opportunities, or a weak 11th house that converts strong career performance into minimal financial reward.',
            body_hi:  'बड़ी बाधाओं के बिना भी संघर्ष हो सकता है यदि तृतीय (पहल), नवम (भाग्य), या एकादश (लाभ) भाव कमजोर हों।',
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
        label:       'Get Your Career Challenges Report',
        label_hi:    'अपनी करियर बाधाएं रिपोर्ट प्राप्त करें',
        description: 'A chart-specific analysis identifying which challenges are active in your current dasha and when the next growth window opens.',
        description_hi: 'कुंडली-विशिष्ट विश्लेषण जो बताता है कि वर्तमान दशा में कौन सी बाधाएं सक्रिय हैं और अगली विकास खिड़की कब है।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Career Timing Now',
        label_hi:    'अभी अपना करियर समय जांचें',
        description: 'Enter your birth details to see which planetary periods are currently active, which challenge type each represents, and when conditions shift to support career growth again.',
        description_hi: 'जानें कौन से ग्रह काल अभी सक्रिय हैं और वे आपके करियर को कैसे प्रभावित कर रहे हैं।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'standard',
    topicGoal:       'Help readers understand the four types of career challenges in Vedic astrology and distinguish between permanent afflictions and time-limited dasha patterns.',
    targetAudience:  ['professionals experiencing career difficulties', 'astrology students studying malefic influences', 'people in career plateau'],
    primaryQuestion: 'What do career challenges in my birth chart actually mean?',
    contentAngle:    'The 10th lord in the 8th house is not career destruction — it is the most misread placement in career astrology, indicating transformation not ruin',
    relatedConcepts: ['saturn delay', 'rahu disruption', '6th house workplace', '8th house transformation', '10th lord placement', 'dasha timing'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish analysis of the four career challenge types: delay (Saturn), disruption (Rahu/Ketu), conflict (Mars/6th house), and transformation (8th house)',
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
