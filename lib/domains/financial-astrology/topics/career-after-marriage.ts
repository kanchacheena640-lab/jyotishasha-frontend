import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const careerAfterMarriage: DomainTopic = {

  identity: {
    id:        'astrology:career-after-marriage',
    slug:      'career-after-marriage',
    title:     'Career After Marriage in Vedic Astrology',
    title_hi:  'वैदिक ज्योतिष में विवाह के बाद करियर',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'career',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/career-after-marriage',
    breadcrumbs: [
      { label: 'Home',                  label_hi: 'होम',               href: '/' },
      { label: 'Financial Astrology',   label_hi: 'वित्तीय ज्योतिष',   href: '/financial-astrology' },
      { label: 'Career After Marriage', label_hi: 'विवाह के बाद करियर', href: '/financial-astrology/career-after-marriage' },
    ],
  },

  seo: {
    metaTitle:          'Career After Marriage in Vedic Astrology',
    metaDescription:    "The 7th lord's connection to the 3rd house — not the 10th — reveals whether marriage will catalyze or compete with your career in Vedic astrology.",
    metaDescription_hi: 'विवाह करियर को उन तरीकों से पुनर्आकार देता है जो अधिकांश कुंडलियां पूर्वानुमानित बनाती हैं। सप्तमेश का तृतीय से संबंध यह तय करता है।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Career After Marriage: What Your Birth Chart Reveals About This Transition',
    headline_hi: 'विवाह के बाद करियर: जन्मकुंडली इस परिवर्तन के बारे में क्या बताती है',
    subtext:     "Most analysis of marriage and career looks at the 7th and 10th houses. The more precise indicator is the 7th lord's relationship to the 3rd house — the house of self-initiative. When these two are mutually supportive, marriage tends to catalyze career growth; when they are in tension, the energy required by one consistently draws from the other",
    subtext_hi:  'विवाह और करियर के अधिकांश विश्लेषण 7वें और 10वें भाव पर केंद्रित हैं। अधिक सटीक संकेतक सप्तमेश का तृतीय भाव से संबंध है — स्व-पहल का भाव। जब ये दोनों परस्पर समर्थक हों, विवाह करियर को उत्प्रेरित करता है',
  },

  taxonomy: {
    tags:        ['career-after-marriage', '7th-house-career', '3rd-house-initiative', 'marriage-career-balance', 'spouse-career-impact', 'relationship-astrology'],
    keywords:    ['career after marriage astrology', 'marriage and career vedic astrology', 'career change after marriage horoscope', '7th house career impact', 'spouse career influence astrology'],
    keywords_hi: ['विवाह के बाद करियर ज्योतिष', 'शादी और करियर ज्योतिष', 'विवाह के बाद करियर बदलाव', 'सप्तम भाव और करियर', 'पति-पत्नी का करियर प्रभाव'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'marriage-career-dynamics',
        title:    'How Marriage Affects Career: Four Chart Patterns',
        title_hi: 'विवाह करियर को कैसे प्रभावित करता है: चार कुंडली पैटर्न',
        layout:   'cards',
        items: [
          {
            id:       'card-catalytic',
            icon:     '🚀',
            label:    'Marriage as Career Catalyst',
            label_hi: 'करियर उत्प्रेरक के रूप में विवाह',
            body:     "This pattern occurs when the 7th lord and 3rd lord are in mutual aspect, mutual reception (each placed in the other's sign), or conjunction in a favorable house. The spouse's presence, network, or financial stability creates the conditions under which the native's self-initiative (3rd house) activates more fully. In practical terms, the person takes career risks after marriage that they would not have taken alone — and these risks are characteristically supported by the new stability the partnership provides.",
            body_hi:  'यह पैटर्न तब होता है जब सप्तमेश और तृतीयेश परस्पर दृष्टि या पारस्परिक रिसेप्शन में हों। जीवनसाथी की उपस्थिति, नेटवर्क या वित्तीय स्थिरता उन स्थितियों का निर्माण करती है जिनके तहत व्यक्ति की स्व-पहल अधिक पूर्ण रूप से सक्रिय होती है।',
            badge:    'Reinforcing',
            badge_hi: 'प्रबलक',
            badgeVariant: 'positive',
          },
          {
            id:       'card-competing',
            icon:     '⚖️',
            label:    'Marriage and Career as Competing Demands',
            label_hi: 'प्रतिस्पर्धी मांगों के रूप में विवाह और करियर',
            body:     "This pattern appears when the 7th lord and 10th lord are in tension — placed in each other's 6th, 8th, or 12th position (the dusthana relationship), or when a strong malefic in the 7th house aspects the 10th. The energy demanded by the relationship and the energy demanded by the career come from the same planetary reserve, creating consistent tension between the two areas. This is not a sign that either the marriage or the career will fail — it is a sign that managing both simultaneously requires conscious and explicit prioritization.",
            body_hi:  'यह पैटर्न तब प्रकट होता है जब सप्तमेश और दशमेश तनाव में हों। रिश्ते और करियर की मांग एक ही ग्रह भंडार से आती है, दोनों क्षेत्रों के बीच लगातार तनाव पैदा करती है।',
            badge:    'Tension',
            badge_hi: 'तनाव',
            badgeVariant: 'warning',
          },
          {
            id:       'card-redirection',
            icon:     '🔄',
            label:    "Marriage Redirecting the Career's Domain",
            label_hi: 'विवाह द्वारा करियर क्षेत्र का पुनर्निर्देशन',
            body:     "A spouse's profession, geographic move triggered by marriage, or the spouse's family business can redirect the native's career into a different domain than the natal 10th house originally indicated. This is particularly common when the 7th lord is stronger than the 10th lord in the natal chart — the spouse's domain effectively becomes the native's expanded professional context. The 7th lord's sign, house placement, and nakshatra often describe the new domain the career moves toward after marriage.",
            body_hi:  'जीवनसाथी का पेशा, भौगोलिक स्थानांतरण, या पारिवारिक व्यवसाय मूल दशम भाव से अलग क्षेत्र में करियर को पुनर्निर्देशित कर सकता है। जब सप्तमेश दशमेश से मजबूत हो, यह विशेष रूप से सामान्य है।',
            badge:    'Domain Shift',
            badge_hi: 'क्षेत्र परिवर्तन',
            badgeVariant: 'info',
          },
          {
            id:       'card-pause-resume',
            icon:     '⏸️',
            label:    'Career Pause Followed by Stronger Return',
            label_hi: 'करियर विराम के बाद मजबूत वापसी',
            body:     "For some charts — particularly those with a strong 4th house (home, security) alongside a strong 10th house — marriage triggers a deliberate career pause that becomes a genuine career reset. The person steps back from employment (often to raise children or support the household during the spouse's career peak), and when they return, their career direction is more precisely aligned with their natal strengths than it was before. The 4th lord's connection to the 10th lord is the key indicator of whether the pause will be generative or costly.",
            body_hi:  'कुछ कुंडलियों के लिए — विशेष रूप से मजबूत चतुर्थ और दशम भाव के साथ — विवाह एक जानबूझकर करियर विराम को प्रेरित करता है जो एक वास्तविक करियर रीसेट बन जाता है। चतुर्थेश और दशमेश का संबंध यह तय करता है।',
            badge:    'Reset',
            badge_hi: 'रीसेट',
            badgeVariant: 'neutral',
          },
        ],
      },

      {
        id:       'marriage-career-cautions',
        title:    'Timing Cautions for Career Decisions Around Marriage',
        title_hi: 'विवाह के आसपास करियर निर्णयों के लिए समय सावधानियां',
        layout:   'alert',
        items: [
          {
            id:       'alert-venus-saturn',
            label:    'Venus–Saturn Contact: When Marriage Timing and Career Timing Conflict',
            label_hi: 'शुक्र-शनि संपर्क: जब विवाह और करियर समय टकराएं',
            body:     "When the dasha that produces marriage is the dasha of a planet in tension with the 10th lord, the marriage and career transitions typically coincide uncomfortably. Venus dasha (which frequently delivers marriage) for a person with Venus poorly placed relative to the 10th house can produce a period where a significant personal commitment arrives simultaneously with a difficult professional transition. The advice: don't treat the career disruption as a consequence of the marriage — treat both as expressions of the same dasha pattern, each requiring its own response.",
            body_hi:  'जब विवाह देने वाली दशा 10वें स्वामी के साथ तनाव में किसी ग्रह की दशा हो, तो विवाह और करियर परिवर्तन असुविधाजनक रूप से मेल खाते हैं। करियर व्यवधान को विवाह का परिणाम न मानें — दोनों को एक ही दशा पैटर्न की अभिव्यक्ति के रूप में देखें।',
            badgeVariant: 'warning',
          },
          {
            id:       'alert-relocation',
            label:    'Marriage-Triggered Relocation and the 10th House Impact',
            label_hi: 'विवाह-प्रेरित स्थानांतरण और दशम भाव पर प्रभाव',
            body:     "Geographic relocation triggered by a spouse's career is one of the most common ways marriage disrupts an established career trajectory. The natal chart cannot predict the specific new location, but it does indicate whether the native's 10th house is strong enough to rebuild career equity in a new environment. A 10th lord with multiple supportive planets tends to recover and sometimes exceeds prior career levels within 2–3 years of relocation. A 10th lord with limited support requires more deliberate networking and positioning in the new location.",
            body_hi:  'जीवनसाथी के करियर से शुरू हुआ भौगोलिक स्थानांतरण स्थापित करियर को बाधित करने का सबसे सामान्य तरीका है। मजबूत दशमेश नए वातावरण में 2-3 वर्षों के भीतर करियर पूंजी को पुनर्निर्माण करता है।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'career-marriage-checklist',
        title:    'Chart Factors That Determine Career-Marriage Interaction',
        title_hi: 'करियर-विवाह संपर्क निर्धारित करने वाले कुंडली कारक',
        layout:   'checklist',
        items: [
          {
            id:    'check-7th-3rd-relationship',
            label: '7th lord and 3rd lord are in mutual aspect or mutual reception',
            label_hi: 'सप्तमेश और तृतीयेश परस्पर दृष्टि या पारस्परिक रिसेप्शन में हैं',
            body:  'This is the primary indicator that marriage will enhance rather than reduce career-driving initiative. When these two lords support each other, the spouse becomes an effective career partner — directly or indirectly.',
            body_hi: 'यह प्राथमिक संकेतक है कि विवाह करियर-संचालित पहल को बढ़ाएगा न कि घटाएगा। ये स्वामी एक-दूसरे का समर्थन करते हैं, तो जीवनसाथी प्रभावी करियर भागीदार बनता है।',
          },
          {
            id:    'check-7th-10th-no-conflict',
            label: '7th lord and 10th lord are not in a dusthana relationship to each other',
            label_hi: 'सप्तमेश और दशमेश एक-दूसरे के प्रति दुष्थान संबंध में नहीं हैं',
            body:  "If neither lord occupies the 6th, 8th, or 12th house from the other's position, the two life domains don't structurally compete for energy. This doesn't guarantee easy balance — it means the challenge is manageable with conscious effort.",
            body_hi: 'यदि कोई भी स्वामी दूसरे की स्थिति से 6, 8, या 12वें भाव में नहीं है, तो दोनों जीवन क्षेत्र ऊर्जा के लिए संरचनात्मक रूप से प्रतिस्पर्धा नहीं करते।',
          },
          {
            id:    'check-venus-placement',
            label: 'Venus is well-placed and not the ruler of a dusthana house for the ascendant',
            label_hi: 'शुक्र अच्छी तरह से स्थित है और लग्न के लिए दुष्थान का स्वामी नहीं है',
            body:  "Venus governs both relationships and professional harmony. A well-placed Venus that is not a functional malefic for the ascendant tends to produce marriage timing that doesn't interfere destructively with career momentum.",
            body_hi: 'शुक्र रिश्तों और पेशेवर सामंजस्य दोनों का स्वामी है। अच्छी तरह से स्थित शुक्र विवाह समय देता है जो करियर गति में विनाशकारी हस्तक्षेप नहीं करता।',
          },
          {
            id:    'check-4th-house',
            label: '4th house is strong enough to absorb the additional domestic demand of marriage',
            label_hi: 'चतुर्थ भाव विवाह की अतिरिक्त घरेलू मांग को अवशोषित करने के लिए पर्याप्त मजबूत है',
            body:  'A weak 4th lord under marriage pressure can spill career anxiety into the home environment and domestic anxiety into the workplace — creating interference in both directions. A strong 4th lord acts as a buffer.',
            body_hi: 'विवाह दबाव में कमजोर चतुर्थेश करियर चिंता को घरेलू वातावरण में और घरेलू चिंता को कार्यस्थल में ला सकता है। मजबूत चतुर्थेश बफर के रूप में कार्य करता है।',
          },
          {
            id:    'check-marriage-dasha',
            label: 'The dasha delivering marriage is also supportive of the 10th or 11th house',
            label_hi: 'विवाह देने वाली दशा 10वें या 11वें भाव की भी समर्थक है',
            body:  'The best career-and-marriage combinations occur when the dasha that brings marriage is the same dasha that supports career growth — the two transitions reinforce rather than compete. This can be read from the natal chart before the marriage dasha begins.',
            body_hi: 'सबसे अच्छे करियर-और-विवाह संयोजन तब होते हैं जब विवाह लाने वाली दशा वही दशा हो जो करियर विकास का समर्थन करती है।',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Career and Marriage Timing in Astrology',
        title_hi: 'ज्योतिष में करियर और विवाह समय के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-career-vs-marriage',
            label:    'My chart shows career growth and marriage in the same dasha. Is that unusual?',
            label_hi: 'मेरी कुंडली एक ही दशा में करियर विकास और विवाह दिखाती है। क्या यह असामान्य है?',
            body:     "Not unusual at all — it is in fact the most common pattern in dasha analysis. Venus dasha, for example, frequently delivers both marriage (Venus governs partnerships) and career advancement (Venus governs professional harmony, creative output, and material prosperity). Jupiter dasha similarly brings both expansion in relationships and career growth. When the same dasha lord has beneficial connections to both the 7th and the 10th or 11th houses, both life areas activate simultaneously.",
            body_hi:  'बिल्कुल असामान्य नहीं — यह दशा विश्लेषण में सबसे सामान्य पैटर्न है। शुक्र दशा अक्सर विवाह और करियर उन्नति दोनों देती है। जब दशा स्वामी 7वें और 10वें/11वें दोनों से शुभ संबंध रखता है, तो दोनों क्षेत्र एक साथ सक्रिय होते हैं।',
          },
          {
            id:       'faq-spouse-career',
            label:    'Can astrology predict whether marriage will help or hurt my career?',
            label_hi: 'क्या ज्योतिष बता सकता है कि विवाह करियर में मदद करेगा या नुकसान?',
            body:     "Yes, with reasonable reliability. The key indicator is the 7th lord's relationship to the 3rd lord (initiative) and to the 10th lord (career). If these relationships are mutually supportive — the lords in friendly houses, in aspect, or in each other's signs — marriage typically enhances career. If the 7th lord is in tension with the 10th lord (6th/8th/12th from each other), the marriage and career energies will require more deliberate management. Neither outcome is fixed — awareness of the pattern allows for better navigation.",
            body_hi:  'हाँ, उचित विश्वसनीयता के साथ। मुख्य संकेतक सप्तमेश का तृतीयेश और दशमेश से संबंध है। न तो परिणाम निश्चित है — पैटर्न की जागरूकता बेहतर नेविगेशन की अनुमति देती है।',
          },
          {
            id:       'faq-career-pause',
            label:    'If I take a career break after marriage, can I return successfully?',
            label_hi: 'यदि मैं विवाह के बाद करियर विराम लेता हूं, तो क्या सफलतापूर्वक वापस आ सकता हूं?',
            body:     "Whether a career pause is generative or costly depends primarily on the 10th lord's strength and its connections in the natal chart — not on the length of the pause. A well-placed 10th lord with Jupiter's aspect can produce a strong return after even a 5–7 year absence. The practical requirement is that the return direction aligns with the natal 10th lord's natural domain — returning to a field that matches the chart's strengths rather than attempting a complete reinvention.",
            body_hi:  'करियर विराम उत्पादक है या महंगा, यह मुख्य रूप से दशमेश की ताकत पर निर्भर करता है — विराम की लंबाई पर नहीं। गुरु दृष्टि के साथ अच्छी तरह से स्थित दशमेश 5-7 वर्ष की अनुपस्थिति के बाद भी मजबूत वापसी दे सकता है।',
          },
          {
            id:       'faq-spouse-field',
            label:    'Will I end up working in my spouse\'s field because of marriage?',
            label_hi: 'क्या विवाह के कारण मैं अपने जीवनसाथी के क्षेत्र में काम करूंगा?',
            body:     "This outcome is specifically indicated when the 7th lord is stronger than the 10th lord in the natal chart, and the 7th lord's nakshatra or sign points to a professional domain different from the native's existing career. It is also more likely when the current dasha lord is the 7th lord or a planet strongly connected to the 7th house. The spouse's professional domain effectively becomes an expanded career context rather than a replacement for the native's existing work.",
            body_hi:  'यह परिणाम विशेष रूप से तब संकेतित होता है जब जन्मकुंडली में सप्तमेश दशमेश से मजबूत हो, और सप्तमेश की नक्षत्र या राशि मौजूदा करियर से अलग पेशेवर क्षेत्र की ओर इशारा करे।',
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
        label:       'Get Your Career-Marriage Compatibility Report',
        label_hi:    'अपनी करियर-विवाह संगतता रिपोर्ट प्राप्त करें',
        description: 'A chart analysis of your 7th, 3rd, and 10th house relationships to identify whether your chart supports career growth after marriage and the strongest periods ahead.',
        description_hi: '7वें, तृतीय, और दशम भाव संबंधों का विश्लेषण — क्या आपकी कुंडली विवाह के बाद करियर विकास का समर्थन करती है और आगे के सबसे मजबूत काल।',
        variant:     'primary',
      },
      {
        id:          'cta-job-prediction',
        type:        'tool',
        slug:        'career-path',
        label:       'Check Your Career Timing After Marriage',
        label_hi:    'विवाह के बाद अपना करियर समय जांचें',
        description: 'Enter your birth details to see which planetary periods currently support career activity after marriage — and whether your chart indicates professional growth or a natural transition pause in this phase.',
        description_hi: 'जानें कौन से ग्रह काल अभी करियर गतिविधि का समर्थन करते हैं और वर्तमान चरण में पेशेवर विकास संभव है।',
        variant:     'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       "Help readers understand how the 7th lord's relationship to the 3rd house (not the 10th) is the primary indicator of whether marriage will enhance or compete with career in Vedic astrology.",
    targetAudience:  ['people planning marriage and considering career impact', 'professionals navigating career after marriage transition', 'astrology students studying the 7th and 10th house interaction'],
    primaryQuestion: 'How does marriage affect my career according to my birth chart?',
    contentAngle:    "The 7th lord's relationship to the 3rd house — not the 10th — is the actual determinant of whether marriage catalyzes or competes with career initiative",
    relatedConcepts: ['7th house partnerships', '3rd house initiative', '10th house career', 'venus dasha', 'marriage timing', 'spouse career influence'],
  },

  schemaSignals: {
    expertise:     "Vedic Jyotish analysis of marriage-career interaction through the 7th lord's connection to the 3rd house (initiative) and 10th house (career), with four chart pattern types",
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
