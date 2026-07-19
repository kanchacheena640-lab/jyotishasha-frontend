import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const governmentJob: DomainTopic = {

  identity: {
    id:        'astrology:government-job',
    slug:      'government-job',
    title:     'Government Job Yoga in Vedic Astrology',
    title_hi:  'वैदिक ज्योतिष में सरकारी नौकरी का योग',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/government-job',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',                href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष',   href: '/financial-astrology' },
      { label: 'Government Job',      label_hi: 'सरकारी नौकरी',       href: '/financial-astrology/government-job' },
    ],
  },

  seo: {
    metaTitle:          'Government Job Yoga in Vedic Astrology: Key Indicators',
    metaDescription:    'Identify government job yoga using the Sun, Moon nakshatra, and Saturn in your birth chart. See which combinations indicate strong government career potential.',
    metaDescription_hi: 'वैदिक ज्योतिष सूर्य की स्थिति, चंद्रमा की नक्षत्र, शनि के दशम से संबंध, और विशिष्ट योगों के माध्यम से सरकारी नौकरी की संभावना पहचानता है।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Government Job Yoga in Vedic Astrology: Which Planets Indicate Public Sector Careers?',
    headline_hi: 'वैदिक ज्योतिष में सरकारी नौकरी का योग: कौन से ग्रह सार्वजनिक क्षेत्र की नौकरी दर्शाते हैं?',
    subtext:     "Most analysis focuses on the Sun for government roles. The underappreciated indicator is the Moon's nakshatra — Rohini, Hasta, and Shravana are the three Moon nakshatras most consistently associated with public sector careers across thousands of charts",
    subtext_hi:  'अधिकांश विश्लेषण सरकारी भूमिकाओं के लिए सूर्य पर केंद्रित है। कम सराहा गया संकेतक चंद्रमा की नक्षत्र है — रोहिणी, हस्त और श्रवण सार्वजनिक क्षेत्र करियर से सबसे अधिक जुड़े हैं',
  },

  taxonomy: {
    tags:        ['government-job', 'sarkari-naukri', 'sun-career', 'moon-nakshatra', 'public-sector', 'saturn-service'],
    keywords:    ['government job astrology', 'sarkari naukri kundali', 'government job yoga', 'sun 10th house government', 'which nakshatra gives government job'],
    keywords_hi: ['सरकारी नौकरी ज्योतिष', 'सरकारी नौकरी का योग', 'सरकारी नौकरी कुंडली', 'सूर्य और सरकारी नौकरी', 'कौन सी नक्षत्र सरकारी नौकरी देती है'],
    hubPriority: 'featured',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'planet-indicators',
        title:    'The Key Planets for Government Job Yoga',
        title_hi: 'सरकारी नौकरी योग के लिए मुख्य ग्रह',
        layout:   'cards',
        items: [
          {
            id:       'card-sun',
            icon:     '☀️',
            label:    'Sun — Authority and Government Connection',
            label_hi: 'सूर्य — अधिकार और सरकार से संबंध',
            body:     "The Sun represents authority, governance, and the state. A strong Sun — placed in the 10th house, exalted in Aries, or aspecting the 10th from a powerful position — is the most direct indicator of a career connected to government, authority, or public administration. The Sun in the 10th house from the ascendant or from the Moon sign both contribute. When the Sun is also the 10th lord (Leo ascendant), the government career yoga is particularly strong.",
            body_hi:  'सूर्य अधिकार, शासन और राज्य का प्रतिनिधित्व करता है। दशम भाव में मजबूत सूर्य — मेष में उच्च, या शक्तिशाली स्थिति से दशम पर दृष्टि — सरकार से जुड़े करियर का सबसे प्रत्यक्ष संकेतक है।',
            badge:    'Primary',
            badge_hi: 'प्राथमिक',
            badgeVariant: 'positive',
          },
          {
            id:       'card-moon-nakshatra',
            icon:     '🌙',
            label:    "Moon's Nakshatra — The Hidden Public Sector Indicator",
            label_hi: 'चंद्रमा की नक्षत्र — छिपा हुआ सार्वजनिक क्षेत्र संकेतक',
            body:     "The Moon's nakshatra is the most underappreciated government job indicator in Vedic astrology. Rohini nakshatra (ruled by the Moon, associated with royalty and public provision) consistently appears in government career charts. Hasta nakshatra (in Virgo, associated with skilled public service and health services) shows strong civil service aptitude. Shravana nakshatra (in Capricorn, associated with listening, public communication, and institutional work) frequently appears in administrative and public communications careers.",
            body_hi:  'चंद्रमा की नक्षत्र स्थिति सबसे कम सराही जाने वाली सरकारी नौकरी संकेतक है। रोहिणी (राजत्व से संबद्ध), हस्त (कुशल सार्वजनिक सेवा), श्रवण (संस्थागत कार्य) — ये तीन नक्षत्र सरकारी करियर चार्टों में सबसे अधिक दिखते हैं।',
            badge:    'Underappreciated',
            badge_hi: 'कम सराहा गया',
            badgeVariant: 'info',
          },
          {
            id:       'card-saturn',
            icon:     '♄',
            label:    'Saturn — Structure, Hierarchy, and Long Service',
            label_hi: 'शनि — संरचना, पदानुक्रम और दीर्घ सेवा',
            body:     "Saturn in or aspecting the 10th house supports government careers through a different mechanism than the Sun: not authority, but discipline, hierarchy, and patient long-term service. Many civil servants have Saturn strongly connected to their 10th house. Saturn in the 10th also delays the start of government career — selection often comes after age 28–30, after the first Saturn return. Saturn-ruled signs (Capricorn, Aquarius) on the 10th house cusp also support administrative and regulatory careers.",
            body_hi:  'शनि 10वें भाव में या उसे देखते हुए अनुशासन, पदानुक्रम और धैर्यपूर्ण दीर्घकालिक सेवा के माध्यम से सरकारी करियर का समर्थन करता है। शनि का 10वें से संबंध सरकारी चयन में देरी दे सकता है — अक्सर 28-30 वर्ष के बाद।',
            badge:    'Long Service',
            badge_hi: 'दीर्घ सेवा',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-jupiter',
            icon:     '♃',
            label:    'Jupiter — Administrative Authority and Law',
            label_hi: 'गुरु — प्रशासनिक अधिकार और कानून',
            body:     "Jupiter in the 10th house or aspecting it from strong positions gives legal, judicial, educational, and advisory government roles. Jupiter's connection to the 6th house (government service) alongside the 10th produces senior administrative careers. Jupiter as the 10th lord (for Pisces or Sagittarius ascendants) in a good house creates strong government or institutional career yoga. Jupiter dasha often brings government selection, promotions, or appointment to advisory roles.",
            body_hi:  '10वें भाव में या उसे देखते हुए गुरु कानूनी, न्यायिक, शैक्षिक और सलाहकारी सरकारी भूमिकाएं देता है। गुरु दशा अक्सर सरकारी चयन, पदोन्नति, या सलाहकार भूमिकाओं में नियुक्ति लाती है।',
            badge:    'Law & Education',
            badge_hi: 'कानून और शिक्षा',
            badgeVariant: 'neutral',
          },
        ],
      },

      {
        id:       'yoga-checklist',
        title:    'Government Job Yoga Indicators: What to Look For',
        title_hi: 'सरकारी नौकरी योग संकेतक: क्या देखें',
        layout:   'checklist',
        items: [
          {
            id:    'check-sun-position',
            label: 'Sun is in the 1st, 10th, or 9th house, or is the 10th lord',
            label_hi: 'सूर्य पहले, दसवें, या नौवें भाव में है, या दशमेश है',
            body:  'These placements give the clearest solar connection to career authority. The 9th house placement works because the 9th governs dharma, fortune, and the king\'s support.',
            body_hi: 'ये स्थितियां करियर अधिकार से सबसे स्पष्ट सौर संबंध देती हैं। नवम भाव में सूर्य राजा के समर्थन का प्रतीक है।',
          },
          {
            id:    'check-moon-nakshatra',
            label: "Moon is in Rohini, Hasta, or Shravana nakshatra",
            label_hi: 'चंद्रमा रोहिणी, हस्त, या श्रवण नक्षत्र में है',
            body:  'These three Moon nakshatras show the strongest consistent correlation with public sector careers. Rohini (Cancer), Hasta (Virgo), Shravana (Capricorn) — different signs, but each connects the Moon to institutional and public service domains.',
            body_hi: 'ये तीन चंद्र नक्षत्र सार्वजनिक क्षेत्र करियर के साथ सबसे मजबूत सुसंगत संबंध दिखाते हैं। रोहिणी (कर्क), हस्त (कन्या), श्रवण (मकर)।',
          },
          {
            id:    'check-saturn-10th',
            label: 'Saturn is in or aspecting the 10th house',
            label_hi: 'शनि दसवें भाव में है या उसे देख रहा है',
            body:  'Saturn strengthens the capacity for long-term institutional commitment — essential for most government career paths that require years of service and seniority accumulation.',
            body_hi: 'शनि दीर्घकालिक संस्थागत प्रतिबद्धता की क्षमता को मजबूत करता है — अधिकांश सरकारी करियर पथों के लिए आवश्यक।',
          },
          {
            id:    'check-jupiter-6th',
            label: 'Jupiter has a positive connection to the 6th or 10th house',
            label_hi: 'गुरु का षष्ठ या दशम भाव से सकारात्मक संबंध है',
            body:  'The 6th house is the house of government service and subordinate roles. Jupiter\'s connection to both the 6th and 10th creates the classic civil service yoga — dignified public sector work with increasing authority.',
            body_hi: 'षष्ठ भाव सरकारी सेवा का भाव है। गुरु का षष्ठ और दशम दोनों से संबंध क्लासिक सिविल सेवा योग बनाता है।',
          },
          {
            id:    'check-no-strong-rahu',
            label: "Rahu is not the dominant planet of the 10th house without Saturn's support",
            label_hi: 'राहु शनि के समर्थन के बिना दशम भाव का प्रमुख ग्रह नहीं है',
            body:  "Rahu in the 10th tends to push toward private-sector, unconventional, or technology-driven careers. Government careers are possible with Rahu in the 10th but require Saturn's presence or aspect to provide the structural discipline that government roles demand.",
            body_hi: '10वें भाव में राहु निजी क्षेत्र या अपरंपरागत करियर की ओर धकेलता है। सरकारी करियर के लिए शनि की उपस्थिति या दृष्टि संरचनात्मक अनुशासन प्रदान करती है।',
          },
        ],
      },

      {
        id:       'selection-timing',
        title:    'When Government Job Selection Is Most Likely',
        title_hi: 'सरकारी नौकरी चयन कब सबसे अधिक संभव है',
        layout:   'alert',
        items: [
          {
            id:       'alert-sun-dasha',
            label:    'Sun Mahadasha or Antardasha — Direct Government Activation',
            label_hi: 'सूर्य महादशा या अंतर्दशा — सीधी सरकारी सक्रियता',
            body:     "The Sun mahadasha or antardasha is the most direct period for government selection, promotion, or appointment. If the natal Sun is well-placed and connected to the 10th house, major government career milestones — selection, first posting, promotion to gazetted rank — frequently coincide with Sun periods. The Sun's antardasha within any other dasha also brings brief windows of government opportunity.",
            body_hi:  'सूर्य महादशा या अंतर्दशा सरकारी चयन, पदोन्नति, या नियुक्ति का सबसे प्रत्यक्ष काल है। यदि जन्मकालीन सूर्य 10वें से जुड़ा हो, तो प्रमुख सरकारी करियर मील के पत्थर सूर्य काल के साथ मेल खाते हैं।',
            badgeVariant: 'positive',
          },
          {
            id:       'alert-saturn-jupiter-transit',
            label:    'Saturn or Jupiter Transiting Through the 10th House',
            label_hi: 'शनि या गुरु का दशम भाव से गोचर',
            body:     "Jupiter transiting through the 10th house brings a 12–13 month window of professional opportunity, including government selection. Saturn transiting through the 10th house (occurring every 29–30 years) marks the most significant career restructuring periods — for people with government job yoga, this often coincides with joining government service or achieving a major promotion. Check both at the same time — Jupiter and Saturn co-activating the 10th is a particularly strong indicator.",
            body_hi:  'गुरु का 10वें भाव से गोचर 12-13 महीने की पेशेवर अवसर खिड़की लाता है। शनि का 10वें भाव से गोचर सबसे महत्वपूर्ण करियर पुनर्गठन काल है — सरकारी नौकरी योग वाले लोगों के लिए यह अक्सर सरकारी सेवा में शामिल होने से मेल खाता है।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Government Job Yoga in Astrology',
        title_hi: 'ज्योतिष में सरकारी नौकरी योग के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-no-yoga',
            label:    'My chart shows no government job yoga — can I still get a government job?',
            label_hi: 'मेरी कुंडली में सरकारी नौकरी का योग नहीं है — क्या फिर भी मिल सकती है?',
            body:     "Birth chart yogas indicate tendencies, not absolute outcomes. A person without classical government job yoga can still obtain a government position — particularly if the dasha sequence supports it and effort is applied consistently. The chart yoga indicates whether the position will feel natural and sustainable (yoga present) or whether it will require fighting against the chart's natural inclinations (yoga absent but position obtained through effort).",
            body_hi:  'जन्मकुंडली योग प्रवृत्तियां दर्शाते हैं, पूर्ण परिणाम नहीं। बिना योग के भी सरकारी नौकरी मिल सकती है — विशेष रूप से यदि दशा अनुक्रम इसका समर्थन करे।',
          },
          {
            id:       'faq-which-department',
            label:    'Can astrology predict which government department suits me?',
            label_hi: 'क्या ज्योतिष बता सकता है कि मुझे कौन सा सरकारी विभाग सूट करता है?',
            body:     "Yes, with reasonable precision. The Sun-dominant chart works well in IAS, IPS, and administrative departments. Saturn-dominant charts with 6th house strength suit revenue, tax, and audit services. Mars-connected 10th house indicators suit defense, police, and prosecution services. Jupiter-connected 10th suits education, judiciary, and advisory services. The 10th house sign also provides domain clues — Scorpio on the 10th with Mars connection strongly indicates police or investigation services.",
            body_hi:  'हाँ, उचित सटीकता के साथ। सूर्य-प्रधान कुंडली IAS/IPS में अच्छा काम करती है। शनि-प्रधान राजस्व/कर में। मंगल संबंध रक्षा/पुलिस में। गुरु संबंध शिक्षा/न्यायपालिका में।',
          },
          {
            id:       'faq-private-to-govt',
            label:    'I am in the private sector. Can my chart support switching to government?',
            label_hi: 'मैं निजी क्षेत्र में हूं। क्या कुंडली सरकारी में जाने का समर्थन करती है?',
            body:     "If the government job yoga indicators are present natally but you are currently in the private sector, this often means the dasha sequence hasn't yet activated the government indicators. Check whether an upcoming Sun or Saturn mahadasha or antardasha is approaching. If so, that period is the window to prepare for and attempt government entry. The yoga being present natally means the path exists — the dasha determines when it becomes accessible.",
            body_hi:  'यदि सरकारी नौकरी योग संकेतक जन्मजात रूप से मौजूद हैं लेकिन आप निजी क्षेत्र में हैं, तो इसका अक्सर मतलब है कि दशा अनुक्रम अभी तक सरकारी संकेतकों को सक्रिय नहीं किया है।',
          },
          {
            id:       'faq-ias-vs-other',
            label:    'What distinguishes an IAS-level career chart from a general government job chart?',
            label_hi: 'IAS-स्तर करियर कुंडली को सामान्य सरकारी नौकरी कुंडली से क्या अलग करता है?',
            body:     "Senior administrative careers (IAS, IPS, IRS) typically show the Sun strongly placed in the 10th or 1st house with beneficial aspects from Jupiter, a strong and well-placed Moon, and the 9th house (fortune and dharma) connected to the 10th. The distinction from lower-level government jobs is usually the strength of the 9th house and the quality of Jupiter's placement — both need to be strong for elite administrative selection.",
            body_hi:  'वरिष्ठ प्रशासनिक करियर (IAS, IPS) आमतौर पर सूर्य को 10वें या पहले भाव में गुरु के शुभ पहलू के साथ दिखाते हैं। सामान्य सरकारी नौकरियों से अंतर नवम भाव और गुरु की स्थिति की ताकत में है।',
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
        label:       'Get Your Government Job Yoga Report',
        label_hi:    'अपनी सरकारी नौकरी योग रिपोर्ट प्राप्त करें',
        description: 'A detailed analysis of your Sun, Moon nakshatra, Saturn, and Jupiter placements to assess your government job yoga and identify the best timing windows.',
        description_hi: 'सूर्य, चंद्र नक्षत्र, शनि और गुरु की स्थितियों का विस्तृत विश्लेषण — सरकारी नौकरी योग और सर्वोत्तम समय खिड़कियां।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Government Selection Timing',
        label_hi:    'अपने सरकारी चयन समय की जांच करें',
        description: 'Enter your birth details to see whether your current dasha supports government career entry or promotion — and which upcoming periods carry the strongest government selection indicators.',
        description_hi: 'देखें क्या आपकी वर्तमान दशा और गोचर सरकारी करियर प्रवेश या पदोन्नति का समर्थन करते हैं।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'standard',
    topicGoal:       "Help readers identify government job yoga in their chart through the Sun's position, Moon's nakshatra (Rohini/Hasta/Shravana), Saturn's 10th house connection, and Jupiter's role.",
    targetAudience:  ['students preparing for government exams', 'professionals considering public sector transition', 'people with family expectations of government careers'],
    primaryQuestion: 'Does my birth chart indicate a government job?',
    contentAngle:    "The Moon's nakshatra — Rohini, Hasta, Shravana — is the most underappreciated government job indicator, more consistent than the Sun's house placement alone",
    relatedConcepts: ['sun government career', 'moon nakshatra public sector', 'saturn service', 'jupiter administration', 'civil service yoga', 'sarkari naukri dasha'],
  },

  schemaSignals: {
    expertise:     "Vedic Jyotish analysis of government job yoga: Sun authority, Moon's nakshatra (Rohini/Hasta/Shravana) for public sector, Saturn's discipline, and Jupiter's administrative connection",
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
