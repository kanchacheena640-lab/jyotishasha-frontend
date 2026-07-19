import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const jobChangePrediction: DomainTopic = {

  identity: {
    id:        'astrology:job-change-prediction',
    slug:      'job-change-prediction',
    title:     'Job Change Prediction in Astrology',
    title_hi:  'ज्योतिष में नौकरी बदलाव की भविष्यवाणी',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/job-change-prediction',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',              href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष',  href: '/financial-astrology' },
      { label: 'Job Change Prediction', label_hi: 'नौकरी बदलाव की भविष्यवाणी', href: '/financial-astrology/job-change-prediction' },
    ],
  },

  seo: {
    metaTitle:          'Job Change Prediction by Astrology: Timing Signals',
    metaDescription:    'When will you change jobs? Which dasha periods and 6th house activations predict job changes in Vedic astrology — with a free timing check tool.',
    metaDescription_hi: 'नौकरी बदलाव कब होगा? जानें कौन सी दशाएं और षष्ठ भाव की सक्रियता ज्योतिष में नौकरी बदलाव का संकेत देती है।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Job Change Prediction in Your Horoscope: Timing the Switch',
    headline_hi: 'ज्योतिष में नौकरी बदलाव की भविष्यवाणी: सही समय की पहचान',
    subtext:     'The 10th house shows career direction, but the 6th house governs the workplace — accurate job change prediction requires both to be activated together by dasha and transit',
    subtext_hi:  'दशम भाव करियर दिशा दिखाता है, लेकिन षष्ठ भाव कार्यस्थल का कारक है — सटीक नौकरी बदलाव के लिए दोनों का दशा और गोचर से एक साथ सक्रिय होना जरूरी है',
  },

  taxonomy: {
    tags:        ['job-change', 'career-timing', 'dasha-timing', '6th-house', 'transit', 'career-switch'],
    keywords:    ['job change prediction astrology', 'when to change job astrology', 'career change horoscope', 'job change timing kundali', 'best time to switch job astrology'],
    keywords_hi: ['नौकरी बदलाव का सही समय', 'करियर परिवर्तन ज्योतिष', 'नौकरी कब बदलें', 'दशा में नौकरी बदलाव'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'timing-planets',
        title:    'Planetary Periods That Bring Job Changes',
        title_hi: 'नौकरी बदलाव लाने वाले ग्रह-काल',
        layout:   'cards',
        items: [
          {
            id:       'saturn-change',
            icon:     '♄',
            label:    'Saturn — Pressure-Driven Change',
            label_hi: 'शनि — दबाव से उत्पन्न बदलाव',
            body:     "Saturn's dasha or transit through the 6th house is the most common job-change trigger — but its effect depends entirely on Saturn's lordship. For Taurus, Libra, Capricorn, and Aquarius ascendants, Saturn-driven changes lead to more stable and better-compensated positions. For other ascendants, the change often arrives as an external push: restructuring, an impossible manager, or a role made redundant. The diagnostic question is not whether Saturn is involved but whether it simultaneously activates the 6th lord and 10th lord.",
            body_hi:  'शनि की दशा या षष्ठ भाव पर गोचर सबसे सामान्य नौकरी बदलाव कारण है। वृष, तुला, मकर, कुंभ लग्न के लिए यह बेहतर स्थान दिलाता है। अन्य लग्नों के लिए यह बाहरी दबाव — पुनर्गठन, कठिन प्रबंधक — से बदलाव लाता है।',
            badge:    'Most Common Trigger',
            badge_hi: 'सबसे सामान्य कारण',
            badgeVariant: 'neutral',
          },
          {
            id:       'rahu-change',
            icon:     '☊',
            label:    'Rahu — Sudden and Unexpected Change',
            label_hi: 'राहु — अचानक और अप्रत्याशित बदलाव',
            body:     "Rahu's transit over the 10th house cusp — or Rahu dasha when Rahu occupies a career house — produces the most dramatic job changes: headhunter calls out of nowhere, offers from unfamiliar industries, or departures faster than planned. The signature of Rahu-driven change is an unconventional channel: a platform not used for job searching, a contact from a previous career chapter, or a role adjacent to but distinctly different from current work.",
            body_hi:  'राहु का दशम भाव पर गोचर या करियर भाव में राहु की दशा सबसे नाटकीय परिवर्तन लाती है — अप्रत्याशित प्रस्ताव, हेडहंटर कॉल, अनियोजित प्रस्थान। पहचान: अवसर किसी असामान्य माध्यम से आता है।',
            badge:    'Unexpected Offer',
            badge_hi: 'अप्रत्याशित प्रस्ताव',
            badgeVariant: 'info',
          },
          {
            id:       'jupiter-change',
            icon:     '♃',
            label:    'Jupiter — Opportunity-Driven Change',
            label_hi: 'गुरु — अवसर-चालित बदलाव',
            body:     'Jupiter activations produce voluntary moves to something better. The overlooked condition: Jupiter must simultaneously aspect both the 10th house (career status) and the 11th house (income gains) for the change to improve compensation as well as title. Jupiter aspecting only the 10th may deliver a better title but not better pay. Jupiter transiting its natal position or the 10th house cusp is a reliable 12-year window for meaningful career upgrades.',
            body_hi:  'गुरु की सक्रियता स्वैच्छिक और उन्नत नौकरी में बदलाव लाती है। अनदेखी शर्त: गुरु का दशम और एकादश दोनों पर प्रभाव होना चाहिए — तभी पद और वेतन दोनों सुधरते हैं।',
            badge:    'Voluntary Upgrade',
            badge_hi: 'स्वैच्छिक उन्नति',
            badgeVariant: 'positive',
          },
          {
            id:       'mercury-change',
            icon:     '☿',
            label:    'Mercury — Network-Driven Change',
            label_hi: 'बुध — नेटवर्क से आया बदलाव',
            body:     "When Mercury is active — dasha, antardasha, or transit through the 3rd or 6th house — job changes arrive through communication: a referral from a former colleague, a platform message, a conversation that reopens a door. Mercury-driven changes are more common in analytical, writing, and consulting roles. They are more planned than Rahu-driven changes and faster to resolve than Saturn-driven ones. The offer typically arrives in writing before any verbal discussion.",
            body_hi:  'बुध की सक्रियता में नौकरी बदलाव संचार माध्यम से आता है — पूर्व सहकर्मी का संदर्भ, प्लेटफॉर्म संदेश, पुरानी बातचीत का पुनः खुलना। विश्लेषण और परामर्श भूमिकाओं में यह अधिक होता है।',
            badge:    'Referral Based',
            badge_hi: 'संदर्भ-आधारित',
            badgeVariant: 'positive',
          },
        ],
      },

      {
        id:       'green-flags',
        title:    'Signs Your Chart Supports a Job Change Now',
        title_hi: 'संकेत जो बताते हैं अभी नौकरी बदलना सही है',
        layout:   'checklist',
        items: [
          {
            id:          'sixth-lord-active',
            label:       '6th lord is active in the current dasha or antardasha — the workplace is primed for change',
            label_hi:    'वर्तमान दशा या अंतर्दशा में षष्ठेश सक्रिय है — कार्यस्थल बदलाव के लिए तैयार',
            badgeVariant: 'positive',
          },
          {
            id:          'jupiter-transit-tenth',
            label:       '10th lord is receiving a favorable Jupiter or Venus transit',
            label_hi:    'दशमेश को गुरु या शुक्र का अनुकूल गोचर प्राप्त है',
            badgeVariant: 'positive',
          },
          {
            id:          'eleventh-active',
            label:       '11th house or 11th lord is activated — gains from the change are astrologically indicated',
            label_hi:    'एकादश भाव या एकादशेश सक्रिय है — बदलाव से लाभ के संकेत',
            badgeVariant: 'positive',
          },
          {
            id:          'third-lord-active',
            label:       'Mars or 3rd lord is active — initiative and willingness to act are astrologically supported',
            label_hi:    'मंगल या तृतीयेश सक्रिय है — कार्य करने की इच्छाशक्ति को ज्योतिषीय समर्थन',
            badgeVariant: 'positive',
          },
          {
            id:          'second-unafflicted',
            label:       '2nd house is unafflicted — no income gap is indicated during the transition period',
            label_hi:    'द्वितीय भाव पीड़ित नहीं है — परिवर्तन के दौरान आय में कोई रुकावट नहीं',
            badgeVariant: 'positive',
          },
        ],
      },

      {
        id:       'red-flags',
        title:    'Periods to Avoid When Making a Job Change',
        title_hi: 'नौकरी बदलाव के लिए अनुचित समय',
        layout:   'alert',
        items: [
          {
            id:       'eighth-lord-running',
            label:    'Running the dasha or antardasha of the 8th lord',
            label_hi: 'अष्टमेश की दशा या अंतर्दशा चल रही है',
            body:     "The 8th house governs hidden reversals. A job change made during the 8th lord's period frequently leads to a role that doesn't match the offer description — changed scope within months, a company in undisclosed financial distress, or a hidden toxic dynamic that only surfaces after joining. This pattern is especially consistent when the 8th lord is a malefic with no mitigating benefic aspect.",
            body_hi:  'अष्टमेश की दशा में किया गया बदलाव ऐसी स्थिति में ले जाता है जो प्रस्ताव से मेल नहीं खाती — बदलती भूमिका, छिपी आर्थिक समस्या, या जॉइनिंग के बाद उजागर होने वाला विषाक्त वातावरण।',
            badgeVariant: 'negative',
          },
          {
            id:       'eclipse-tenth',
            label:    'Eclipse falling on or within 5° of the natal 10th house cusp',
            label_hi: 'ग्रहण का जन्मकालीन दशम भाव के 5° के भीतर पड़ना',
            body:     'Eclipses near the 10th house cusp create a 6-month instability window. Job changes made within 2 weeks before or after such an eclipse tend to involve incomplete information — details about the new role or company emerge only after commitment is made. If a good offer arrives during this window, delay signing until the eclipse window closes.',
            body_hi:  'दशम भाव पर ग्रहण 6 माह की अस्थिरता खिड़की बनाता है। इस दौरान नौकरी बदलाव अधूरी जानकारी पर होता है। यदि अच्छा प्रस्ताव मिले, ग्रहण खिड़की बंद होने तक प्रतीक्षा करें।',
            badgeVariant: 'warning',
          },
          {
            id:       'second-lord-afflicted',
            label:    '2nd lord is afflicted by Saturn or Mars transit during the transition window',
            label_hi: 'परिवर्तन काल में द्वितीयेश शनि या मंगल के गोचर से पीड़ित है',
            body:     'An afflicted 2nd lord signals income gap risk — the new salary may be delayed, the joining bonus may not materialize, or there may be an unexpected income-free period between leaving and joining. Verify income continuity before submitting resignation.',
            body_hi:  'पीड़ित द्वितीयेश आय अंतराल का संकेत देता है — वेतन विलंब, जॉइनिंग बोनस न मिलना, या नौकरियों के बीच आय-रहित अवधि। इस्तीफे से पहले आय की निरंतरता सुनिश्चित करें।',
            badgeVariant: 'warning',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Job Change Timing',
        title_hi: 'नौकरी बदलाव के समय के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-best-dasha',
            label:    'Which dasha is best for a job change?',
            label_hi: 'नौकरी बदलाव के लिए कौन सी दशा सर्वोत्तम है?',
            body:     "The dasha of the 6th lord combined with a favorable Jupiter transit is the most reliable combination for a smooth, voluntary job change. The 6th lord governs the workplace — its activation signals a change of employer. The Jupiter transit ensures the destination is better, not just different. When the 10th lord is also in a favorable antardasha simultaneously, the combination is among the strongest for a deliberate and successful career move.",
            body_hi:  'षष्ठेश की दशा और गुरु का अनुकूल गोचर सबसे विश्वसनीय संयोजन है। षष्ठेश कार्यस्थल का स्वामी है — उसकी सक्रियता नियोक्ता परिवर्तन का संकेत देती है। गुरु सुनिश्चित करता है कि गंतव्य बेहतर हो।',
          },
          {
            id:       'faq-no-change',
            label:    'Why am I not getting opportunities despite a good dasha period?',
            label_hi: 'अच्छी दशा होने पर भी अवसर क्यों नहीं मिल रहे?',
            body:     "A favorable dasha creates the potential — but the 3rd house (initiative, action) must be active for opportunities to manifest. A weak or malefic-transited 3rd house means the person sees opportunities but cannot act on them. The dasha potential requires a 3rd house trigger to produce actual results. Also check whether the 12th lord is running and creating a visible-effort-but-hidden-results phase.",
            body_hi:  'अनुकूल दशा संभावना बनाती है, लेकिन तृतीय भाव (पहल) का सक्रिय होना जरूरी है। कमजोर तृतीय भाव में अवसर दिखते हैं लेकिन कार्य नहीं होता।',
          },
          {
            id:       'faq-frequent-changes',
            label:    'Is frequent job changing always a negative indicator?',
            label_hi: 'क्या बार-बार नौकरी बदलना हमेशा नकारात्मक है?',
            body:     'No. Frequent changes under malefic dasha pressure (8th lord, 12th lord) are reactive and often negative. Frequent changes under Jupiter, Mercury, or Venus dasha activations indicate rapid skill-building across environments — a pattern that often produces faster career growth than staying in one role for years. The key question is whether changes are voluntary and upward.',
            body_hi:  'नहीं। पाप दशा में बार-बार बदलाव नकारात्मक होता है। लेकिन गुरु, बुध, या शुक्र दशा में बदलाव तेज कौशल विकास दर्शाता है।',
          },
          {
            id:       'faq-timeline',
            label:    'How quickly after the dasha starts can I expect a job change to happen?',
            label_hi: 'दशा शुरू होने के कितने समय बाद नौकरी बदलाव होता है?',
            body:     "Most job changes complete — from first contact to joining date — within one antardasha period. Fast-moving planets (Mercury, Moon, Venus) trigger changes within 4–8 weeks. Slow planets (Jupiter, Saturn) build momentum over 3–6 months. The antardasha of a 6th lord or 10th lord within the main dasha narrows the timing window significantly and often marks the exact joining month.",
            body_hi:  'अधिकांश नौकरी बदलाव एक अंतर्दशा अवधि के भीतर पूरे होते हैं। तेज़ ग्रह 4-8 सप्ताह में, धीमे ग्रह 3-6 माह में परिणाम देते हैं।',
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
        label:          'Get Your Career Timeline Report',
        label_hi:       'करियर समयरेखा रिपोर्ट प्राप्त करें',
        description:    'A dasha-by-dasha career forecast showing every job change window across the next 10 years, the planetary conditions driving each transition, and your strongest upcoming months for making a move.',
        description_hi: 'अगले 10 वर्षों में हर नौकरी बदलाव की खिड़की दिखाने वाली विस्तृत रिपोर्ट — हर बदलाव के पीछे ग्रह स्थितियां और आने वाले सबसे मजबूत महीने।',
        variant:        'primary',
      },
      {
        id:             'cta-job-prediction',
        type:           'tool',
        slug:           'career-path',
        label:          'Check Your Job Change Timing',
        label_hi:       'अपने नौकरी बदलाव का समय जाँचें',
        description:    'Enter your birth details to see which dasha periods and transit conditions currently support a job change — and your strongest upcoming windows for making the switch.',
        description_hi: 'अपना जन्म विवरण दर्ज करें और जानें कौन सी दशाएं और गोचर अभी नौकरी बदलाव में सहायक हैं — और बदलाव के लिए आगे की सबसे मजबूत खिड़कियां।',
        variant:        'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Help readers identify which dasha periods and house activations signal a job change in Vedic astrology.',
    targetAudience:  ['professionals considering a job switch', 'Vedic astrology students', 'career counselors'],
    primaryQuestion: 'Which dasha periods and transits indicate a job change in my horoscope?',
    contentAngle:    'The 6th house of workplace is as critical as the 10th house for job change timing — and most analyses omit it',
    relatedConcepts: ['6th house employment', '10th house career', 'dasha activation', 'saturn transit', 'rahu transit', 'antardasha', '3rd house initiative'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish analysis of job change timing through 6th and 10th house activations and planetary dasha periods',
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
