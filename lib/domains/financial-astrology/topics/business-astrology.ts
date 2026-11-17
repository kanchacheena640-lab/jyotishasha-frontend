import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

// Informational guide for readers ALREADY running, or committed to, a business: houses of trade, planets of
// commerce, partnerships and growth periods, read as tendencies. The "job or business?" decision belongs to
// job-vs-business; this page does not cover it and sends that intent there.
//
// Product statements are limited to what each product does (verified for Checkpoint 5D, origin/main):
//  - business_report (₹99): prompts/business_report_en.txt -- 2nd, 7th, 10th and 11th houses; suitability,
//    entrepreneurial capacity, sustainability factors, practical guidance, current dasha; never guarantees
//    success, revenue, funding or profitability.
//  - startup_suggestion_report (₹99): prompts/startup_suggestion_report_en.txt -- 2nd, 7th and 10th houses;
//    launch readiness, founder strengths, execution challenges, planning guidance; never an exact launch date.
//  - Focused reports (₹51, 12-month horizon, not in MULTI_YEAR_KEYS): business_growth_timing ("When may my
//    business grow?") and new_venture_partnership_timing ("When is a good time to begin a new venture or
//    partnership?").
//  - business-path tool: services/business_path.py -- 7th and 11th lords (dignity, dusthana placement),
//    planets in the 7th and 11th, Rahu there; returns a business / mixed / job-leaning verdict.
// No profit, funding, partner-reliability or launch-date promise; no advice to invest, borrow or sign.
// Review status stays 'not-reviewed' until the panel astrologer has reviewed the copy.

export const businessAstrology: DomainTopic = {

  identity: {
    id:        'astrology:business-astrology',
    slug:      'business-astrology',
    title:     'Business Astrology: Business Potential in Your Birth Chart',
    title_hi:  'व्यापार ज्योतिष: कुंडली में व्यापार की संभावना',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'business',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/business-astrology',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Business Astrology',  label_hi: 'व्यापार ज्योतिष', href: '/financial-astrology/business-astrology' },
    ],
  },

  seo: {
    metaTitle:          'Business Astrology: Business Potential in Your Birth Chart',
    metaDescription:    'How the 7th, 10th and 11th houses, Mercury and your dasha sequence describe business potential, partnerships and growth periods in Vedic astrology.',
    metaDescription_hi: 'सातवाँ, दसवाँ और ग्यारहवाँ भाव, बुध और दशा क्रम वैदिक ज्योतिष में व्यापार की क्षमता, साझेदारी और विकास के समय के बारे में क्या बताते हैं।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Business Astrology: How Vedic Astrology Reads an Existing or Committed Business',
    headline_hi: 'व्यापार ज्योतिष: वैदिक ज्योतिष चल रहे या तय किए गए व्यापार को कैसे पढ़ता है',
    subtext:     'For readers already running a business, or committed to starting one. This guide explains which houses and planets are traditionally read for trade, partnerships and business growth, and what such a reading can and cannot tell you. If you are still deciding between a job and a business, the Job vs Business guide covers that question.',
    subtext_hi:  'यह गाइड उन पाठकों के लिए है जो पहले से व्यापार चला रहे हैं या व्यापार शुरू करने का निश्चय कर चुके हैं। इसमें बताया गया है कि व्यापार, साझेदारी और व्यापार की बढ़ोतरी के लिए पारंपरिक रूप से कौन-से भाव और ग्रह देखे जाते हैं, और ऐसा विश्लेषण क्या बता सकता है और क्या नहीं। अगर आप अभी नौकरी और व्यापार के बीच चुनाव कर रहे हैं, तो नौकरी बनाम व्यापार गाइड उस प्रश्न पर है।',
  },

  taxonomy: {
    // Provisional SEO assumptions (no Search Console data). Tags shared with existing guides: '7th-house'
    // (job-vs-business) and '11th-house-gains' (salary-growth) -- one each, so no existing related list changes.
    tags:        ['business-astrology', '7th-house', '11th-house-gains', 'trade-and-commerce', 'business-partnership', 'mercury-business'],
    keywords:    ['business astrology', 'business in kundli', 'business potential birth chart', '7th house business', 'business partnership astrology'],
    keywords_hi: ['व्यापार ज्योतिष', 'कुंडली में व्यापार', 'व्यापार योग कुंडली', 'सातवाँ भाव व्यापार', 'व्यापार साझेदारी ज्योतिष'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'trade-houses',
        title:    'The Houses Read for an Existing Business',
        title_hi: 'चल रहे व्यापार के लिए देखे जाने वाले भाव',
        layout:   'cards',
        items: [
          {
            id:       'card-7th-house',
            icon:     '🤝',
            label:    'The 7th House — Trade, Clients and Partners',
            label_hi: 'सातवाँ भाव — व्यापार, ग्राहक और साझेदार',
            body:     'The 7th house is traditionally read for dealings with others: trade, clients, the public and business partners, not only marriage. Its sign, its lord and the planets that influence it are weighed for how business relationships tend to work.',
            body_hi:  'सातवें भाव को पारंपरिक रूप से दूसरों के साथ व्यवहार के लिए पढ़ा जाता है: व्यापार, ग्राहक, जनता और व्यापारिक साझेदार, केवल विवाह नहीं। व्यापारिक संबंध आमतौर पर कैसे चलते हैं, यह देखने के लिए इसकी राशि, इसके स्वामी और इसे प्रभावित करने वाले ग्रहों को तौला जाता है।',
            badge:    'Dealings',
            badge_hi: 'व्यवहार',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-10th-house',
            icon:     '🏢',
            label:    'The 10th House — The Work and Its Standing',
            label_hi: 'दसवाँ भाव — काम और उसकी प्रतिष्ठा',
            body:     'The 10th house is traditionally read for work, action and reputation. For a business owner it is weighed for the enterprise itself: how the work is carried out and how it is seen.',
            body_hi:  'दसवें भाव को पारंपरिक रूप से काम, कर्म और प्रतिष्ठा के लिए पढ़ा जाता है। व्यापार चलाने वाले व्यक्ति के लिए इसे स्वयं उद्यम के रूप में देखा जाता है: काम कैसे होता है और उसे कैसे देखा जाता है।',
            badge:    'Enterprise',
            badge_hi: 'उद्यम',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-11th-house',
            icon:     '📈',
            label:    'The 11th House — Gains and Networks',
            label_hi: 'ग्यारहवाँ भाव — लाभ और संपर्क',
            body:     'The 11th house is traditionally read for gains and income, and for the networks through which opportunities arrive. In a business reading it is weighed for whether activity tends to turn into gains.',
            body_hi:  'ग्यारहवें भाव को पारंपरिक रूप से लाभ और आय के लिए, और उन संपर्कों के लिए पढ़ा जाता है जिनसे अवसर मिलते हैं। व्यापार के विश्लेषण में इसे इस नज़र से देखा जाता है कि काम आमतौर पर लाभ में बदलता है या नहीं।',
            badge:    'Gains',
            badge_hi: 'लाभ',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-2nd-house',
            icon:     '🏦',
            label:    'The 2nd House — Capital and Resources',
            label_hi: 'दूसरा भाव — पूँजी और संसाधन',
            body:     'The 2nd house is traditionally read for accumulated money and resources. For a business it is weighed for the capital and reserves the work can draw on.',
            body_hi:  'दूसरे भाव को पारंपरिक रूप से संचित धन और संसाधनों के लिए पढ़ा जाता है। व्यापार के लिए इसे उस पूँजी और जमा संसाधनों के रूप में देखा जाता है जिन पर काम निर्भर कर सकता है।',
            badge:    'Resources',
            badge_hi: 'संसाधन',
            badgeVariant: 'neutral',
          },
        ],
      },

      {
        id:       'business-planets',
        title:    'Planets Traditionally Associated With Business',
        title_hi: 'व्यापार से पारंपरिक रूप से जुड़े ग्रह',
        layout:   'cards',
        items: [
          {
            id:       'card-mercury',
            icon:     '☿',
            label:    'Mercury — Trade and Communication',
            label_hi: 'बुध — व्यापार और संवाद',
            body:     'Mercury is traditionally regarded as the significator of trade, commerce, calculation and communication. Its strength and placement are often read for how naturally buying, selling and negotiating come to a person.',
            body_hi:  'बुध को पारंपरिक रूप से व्यापार, वाणिज्य, गणना और संवाद का कारक माना जाता है। खरीदना, बेचना और बातचीत करना किसी व्यक्ति के लिए कितना सहज है, यह अक्सर इसकी शक्ति और स्थिति से पढ़ा जाता है।',
            badge:    'Commerce',
            badge_hi: 'वाणिज्य',
            badgeVariant: 'info',
          },
          {
            id:       'card-jupiter',
            icon:     '🌕',
            label:    'Jupiter — Growth and Judgement',
            label_hi: 'गुरु — वृद्धि और विवेक',
            body:     'Jupiter is traditionally associated with growth, wisdom and sound judgement, and with fields such as advice, teaching and finance. Its support is often read as helping a business expand on a steady footing.',
            body_hi:  'गुरु को पारंपरिक रूप से वृद्धि, ज्ञान और अच्छे विवेक से, और सलाह, शिक्षा व वित्त जैसे क्षेत्रों से जोड़ा जाता है। इसके सहयोग को अक्सर व्यापार के मज़बूत आधार पर बढ़ने में सहायक माना जाता है।',
            badge:    'Growth',
            badge_hi: 'वृद्धि',
            badgeVariant: 'info',
          },
          {
            id:       'card-saturn',
            icon:     '🪐',
            label:    'Saturn — Structure and Endurance',
            label_hi: 'शनि — व्यवस्था और धैर्य',
            body:     'Saturn is traditionally associated with structure, discipline, labour and long-term effort, and with work that grows slowly. Its influence is often read as favouring patient, systematic businesses.',
            body_hi:  'शनि को पारंपरिक रूप से व्यवस्था, अनुशासन, श्रम और लंबे समय के प्रयास से, और धीरे-धीरे बढ़ने वाले काम से जोड़ा जाता है। इसके प्रभाव को अक्सर धैर्य से और व्यवस्थित ढंग से चलने वाले व्यापार के अनुकूल माना जाता है।',
            badge:    'Structure',
            badge_hi: 'व्यवस्था',
            badgeVariant: 'info',
          },
          {
            id:       'card-mars',
            icon:     '🔥',
            label:    'Mars — Initiative and Competition',
            label_hi: 'मंगल — पहल और प्रतिस्पर्धा',
            body:     'Mars is traditionally associated with energy, initiative and competition, and with technical, engineering and property-related work. Its strength is often read for drive and willingness to compete.',
            body_hi:  'मंगल को पारंपरिक रूप से ऊर्जा, पहल और प्रतिस्पर्धा से, और तकनीकी, इंजीनियरिंग व संपत्ति से जुड़े काम से जोड़ा जाता है। इसकी शक्ति को अक्सर लगन और प्रतिस्पर्धा करने की इच्छा के लिए पढ़ा जाता है।',
            badge:    'Drive',
            badge_hi: 'लगन',
            badgeVariant: 'info',
          },
          {
            id:       'card-rahu',
            icon:     '🌀',
            label:    'Rahu — Unconventional Paths and Scale',
            label_hi: 'राहु — अपरंपरागत रास्ते और विस्तार',
            body:     'Rahu is traditionally associated with ambition, unconventional or new fields, foreign connections and large-scale goals, and also with risk and instability. Rahu in the 7th or 11th house is often read for bold, unusual approaches to business; how it works depends on the rest of the chart.',
            body_hi:  'राहु को पारंपरिक रूप से महत्वाकांक्षा, अपरंपरागत या नए क्षेत्रों, विदेशी संबंधों और बड़े लक्ष्यों से, और साथ ही जोखिम व अस्थिरता से जोड़ा जाता है। सातवें या ग्यारहवें भाव में राहु को अक्सर व्यापार में साहसी, अलग तरह के तरीकों के रूप में पढ़ा जाता है; यह कैसे काम करता है, यह बाकी कुंडली पर निर्भर करता है।',
            badge:    'Ambition',
            badge_hi: 'महत्वाकांक्षा',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'planet-associations',
        title:    'Reading Planet Associations Carefully',
        title_hi: 'ग्रहों के संबंधों को सावधानी से पढ़ें',
        layout:   'alert',
        items: [
          {
            id:       'alert-associations',
            label:    'Associations describe tendencies, not instructions',
            label_hi: 'ये संबंध प्रवृत्तियाँ बताते हैं, निर्देश नहीं',
            body:     'The fields linked with each planet are traditional associations. They can help explain why some kinds of work feel natural, but they do not tell anyone which business to run, and a single planet is never read on its own.',
            body_hi:  'हर ग्रह से जुड़े क्षेत्र पारंपरिक संबंध हैं। ये यह समझने में मदद कर सकते हैं कि कुछ तरह के काम सहज क्यों लगते हैं, लेकिन ये किसी को यह नहीं बताते कि कौन-सा व्यापार करना चाहिए, और किसी एक ग्रह को कभी अकेले नहीं पढ़ा जाता।',
            badgeVariant: 'warning',
          },
        ],
      },

      {
        id:       'partnerships',
        title:    'Partnerships in a Business Reading',
        title_hi: 'व्यापार के विश्लेषण में साझेदारी',
        layout:   'alert',
        items: [
          {
            id:       'alert-partnerships',
            label:    'Your chart describes partnership themes, not your partner',
            label_hi: 'आपकी कुंडली साझेदारी के विषय बताती है, आपके साझेदार के बारे में नहीं',
            body:     'The 7th house and its lord are traditionally read for how partnerships tend to work for you, such as how you share decisions and handle agreements. A reading of your own chart cannot judge another person’s reliability or intentions, and it is not a substitute for proper agreements and professional advice.',
            body_hi:  'सातवें भाव और उसके स्वामी को पारंपरिक रूप से यह समझने के लिए पढ़ा जाता है कि साझेदारी आपके लिए आमतौर पर कैसे चलती है, जैसे निर्णय कैसे बाँटे जाते हैं और समझौते कैसे संभाले जाते हैं। आपकी अपनी कुंडली का विश्लेषण किसी दूसरे व्यक्ति की विश्वसनीयता या इरादों का आकलन नहीं कर सकता, और यह उचित समझौतों व पेशेवर सलाह की जगह नहीं लेता।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'business-periods',
        title:    'Growth, Expansion and Slow Periods',
        title_hi: 'बढ़ोतरी, विस्तार और सुस्ती के दौर',
        layout:   'alert',
        items: [
          {
            id:       'alert-periods',
            label:    'Dasha periods are read as tendencies, not dates',
            label_hi: 'दशाओं को प्रवृत्ति के रूप में पढ़ा जाता है, तारीखों के रूप में नहीं',
            body:     'Astrologers often look at the running dasha, especially periods connected with the 7th, 10th and 11th houses or with Mercury, to describe whether a phase leans towards growth, consolidation or slowing down. This describes a tendency for the period. It does not fix a launch date, predict profit or say when a deal will close.',
            body_hi:  'ज्योतिषी अक्सर चल रही दशा को देखते हैं, खासकर सातवें, दसवें और ग्यारहवें भाव से या बुध से जुड़ी दशाओं को, ताकि यह बताया जा सके कि कोई दौर बढ़ोतरी, मज़बूती या सुस्ती में से किस ओर झुकता है। यह उस दौर की प्रवृत्ति बताता है। यह न तो शुरू करने की कोई तारीख तय करता है, न लाभ की भविष्यवाणी करता है, न यह बताता है कि कोई सौदा कब पूरा होगा।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Business Astrology',
        title_hi: 'व्यापार ज्योतिष के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-business-planet',
            label:    'Which planet is linked with business in Vedic astrology?',
            label_hi: 'वैदिक ज्योतिष में व्यापार से कौन-सा ग्रह जुड़ा है?',
            body:     'Mercury is traditionally regarded as the significator of trade and commerce. Jupiter, Saturn, Mars and Rahu are also weighed, each for a different quality, and the houses they influence matter as much as the planets themselves.',
            body_hi:  'बुध को पारंपरिक रूप से व्यापार और वाणिज्य का कारक माना जाता है। गुरु, शनि, मंगल और राहु को भी देखा जाता है, हर ग्रह को अलग गुण के लिए, और वे जिन भावों को प्रभावित करते हैं, वे भी ग्रहों जितने ही महत्वपूर्ण हैं।',
          },
          {
            id:       'faq-7th-house',
            label:    'Is the 7th house only about marriage?',
            label_hi: 'क्या सातवाँ भाव केवल विवाह का भाव है?',
            body:     'No. The 7th house is traditionally read for partnerships of every kind, including business partners, clients and dealings with the public. In a business reading it is one of the main houses weighed.',
            body_hi:  'नहीं। सातवें भाव को पारंपरिक रूप से हर तरह की साझेदारी के लिए पढ़ा जाता है, जिसमें व्यापारिक साझेदार, ग्राहक और जनता के साथ व्यवहार भी शामिल हैं। व्यापार के विश्लेषण में यह मुख्य रूप से देखे जाने वाले भावों में से एक है।',
          },
          {
            id:       'faq-rahu',
            label:    'What does Rahu indicate for business?',
            label_hi: 'व्यापार के लिए राहु क्या संकेत देता है?',
            body:     'Rahu is traditionally linked with ambition, new or unconventional fields and large goals, and also with risk. Its placement, especially in the 7th or 11th house, is read together with the rest of the chart; on its own it does not decide whether a business will do well.',
            body_hi:  'राहु को पारंपरिक रूप से महत्वाकांक्षा, नए या अपरंपरागत क्षेत्रों और बड़े लक्ष्यों से, और साथ ही जोखिम से जोड़ा जाता है। इसकी स्थिति, खासकर सातवें या ग्यारहवें भाव में, बाकी कुंडली के साथ मिलाकर पढ़ी जाती है; अकेले यह तय नहीं करता कि व्यापार अच्छा चलेगा या नहीं।',
          },
          {
            id:       'faq-periods',
            label:    'How are dasha periods read for business growth?',
            label_hi: 'व्यापार की बढ़ोतरी के लिए दशाओं को कैसे पढ़ा जाता है?',
            body:     'The running Mahadasha and Antardasha are read for whether a phase leans towards growth, consolidation or a slower pace, often through their link with the 7th, 10th and 11th houses. They describe tendencies, not dated events or results.',
            body_hi:  'चल रही महादशा और अंतर्दशा को यह समझने के लिए पढ़ा जाता है कि कोई दौर बढ़ोतरी, मज़बूती या धीमी गति में से किस ओर झुकता है, अक्सर सातवें, दसवें और ग्यारहवें भाव से उनके संबंध के ज़रिए। ये प्रवृत्तियाँ बताती हैं, तय तारीख वाली घटनाएँ या परिणाम नहीं।',
          },
          {
            id:       'faq-partner',
            label:    'Can astrology tell me whether a business partner is reliable?',
            label_hi: 'क्या ज्योतिष बता सकता है कि व्यापारिक साझेदार भरोसेमंद है या नहीं?',
            body:     'No. A reading of your chart describes how partnership themes tend to show for you. It cannot judge another person’s reliability, intentions or future conduct.',
            body_hi:  'नहीं। आपकी कुंडली का विश्लेषण बताता है कि साझेदारी से जुड़े विषय आपके लिए आमतौर पर कैसे सामने आते हैं। यह किसी दूसरे व्यक्ति की विश्वसनीयता, इरादों या भविष्य के व्यवहार का आकलन नहीं कर सकता।',
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
            body:     'Astrological analysis describes tendencies observed across birth charts — it does not predict fixed outcomes. Business results depend on effort, decisions, markets and individual circumstances. This content is educational and is not business, investment, borrowing, legal or tax advice.',
            body_hi:  'ज्योतिषीय विश्लेषण जन्म कुंडलियों में देखी गई प्रवृत्तियों का वर्णन करता है — यह निश्चित परिणामों की भविष्यवाणी नहीं करता। व्यापार के परिणाम प्रयास, निर्णयों, बाज़ार और व्यक्तिगत परिस्थितियों पर निर्भर करते हैं। यह सामग्री शैक्षिक है; यह व्यापार, निवेश, उधार, कानूनी या कर से जुड़ी सलाह नहीं है।',
            badgeVariant: 'info',
          },
        ],
      },
    ],

    ctas: [
      {
        id:             'cta-business-report',
        type:           'report',
        slug:           'business_report',
        label:          'See how your chart supports your business',
        label_hi:       'जानें आपकी कुंडली आपके व्यापार का कितना समर्थन करती है',
        description:    'Business suitability, entrepreneurial capacity, your 2nd, 7th, 10th and 11th houses, relevant yogas, sustainability factors and practical guidance, read with your current dasha period. Delivered as a PDF to your email.',
        description_hi: 'व्यापार के लिए उपयुक्तता, उद्यमशीलता की क्षमता, आपके दूसरे, सातवें, दसवें और ग्यारहवें भाव, संबंधित योग, स्थिरता के कारक और व्यावहारिक मार्गदर्शन — आपकी वर्तमान दशा अवधि के साथ। PDF आपके ईमेल पर भेजी जाती है।',
        variant:        'primary',
      },
      {
        id:             'cta-startup-suggestion-report',
        type:           'report',
        slug:           'startup_suggestion_report',
        label:          'Committed to starting a venture?',
        label_hi:       'नया काम शुरू करने का निश्चय कर चुके हैं?',
        description:    'Launch readiness, founder strengths and execution challenges, your 2nd, 7th and 10th houses and relevant yogas, with planning guidance and your current dasha period. Delivered as a PDF to your email.',
        description_hi: 'शुरुआत की तैयारी, संस्थापक के रूप में आपकी ताकतें और काम की चुनौतियाँ, आपके दूसरे, सातवें और दसवें भाव और संबंधित योग — योजना के सुझाव और वर्तमान दशा अवधि के साथ। PDF आपके ईमेल पर भेजी जाती है।',
        variant:        'secondary',
      },
      {
        id:             'cta-tool-business-path',
        type:           'tool',
        slug:           'business-path',
        label:          'Check your chart’s business indications for free',
        label_hi:       'अपनी कुंडली के व्यापार संकेत मुफ़्त जाँचें',
        description:    'Reads your 7th and 11th house lords, the planets placed there and Rahu, and shows whether your chart leans towards business, a job or a mix of both.',
        description_hi: 'आपके सातवें और ग्यारहवें भाव के स्वामी, उनमें स्थित ग्रह और राहु को पढ़कर बताता है कि आपकी कुंडली व्यापार, नौकरी या दोनों के मिश्रण की ओर झुकती है।',
        variant:        'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Explain how Vedic astrology is traditionally read for an existing or committed business -- the 7th, 10th, 11th and 2nd houses, Mercury, Jupiter, Saturn, Mars and Rahu, partnerships and dasha periods -- as tendencies, without promising profit, funding or timing.',
    targetAudience:  ['business owners', 'people committed to starting a business', 'astrology students learning the houses of trade'],
    primaryQuestion: 'What does my chart say about the business I run or am starting?',
    contentAngle:    'For readers past the job-or-business decision: the houses of trade, the planets of commerce, partnership themes and business periods, read as tendencies -- never profit, funding, partner-reliability or launch-date promises',
    relatedConcepts: ['7th house trade', '10th house enterprise', '11th house gains', 'mercury commerce', 'rahu ambition', 'business partnership', 'dasha tendency'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish reading of an existing or committed business: the 7th, 10th, 11th and 2nd houses, the planets of commerce, partnership themes and dasha periods, read as tendencies',
    datePublished: '2026-11-17',
  },

  authority: {
    // Not yet reviewed by the panel astrologer; see the Checkpoint 5D report for the claims awaiting review.
    reviewStatus:   'not-reviewed',
    lastUpdated:    '2026-11-17T00:00:00Z',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     true,
    isSearchEnabled: true,
    visibility:      'public',
  },

  lineage: {
    firstAuthoredAt: '2026-11-17',
  },
}
