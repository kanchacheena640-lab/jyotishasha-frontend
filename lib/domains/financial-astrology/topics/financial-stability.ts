import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

// Informational guide: KEEPING money -- savings, expenses and financial steadiness. Earning and income growth
// stay with salary-growth (2nd/11th lords, income timing); this page does not repeat that material.
//
// Product statements are limited to what each product does (verified for Checkpoint 5C):
//  - financial_stability_report (₹99, reportsData): backend prompts/financial_stability_report_en.txt (origin/main)
//    reads the 2nd, 8th and 12th houses, the computed wealth-yoga evidence and the current dasha window, in
//    eight sections incl. money retention, volatility/pressure factors and financial discipline guidance; it
//    never states a guaranteed outcome or a specific investment.
//  - Focused reports (₹51, 12-month horizon, not in MULTI_YEAR_KEYS): financial_pressure_easing ("When may my
//    financial pressure ease?") and financial_improvement_timing ("When will my financial situation improve?").
//  - grah-dasha-finder: returns the current Mahadasha and Antardasha with start and end dates; it does not
//    assess financial stability, and the page says so.
// Astrological statements about the houses, Saturn, Jupiter and dashas are written as traditional readings,
// not facts or forecasts. Review status stays 'not-reviewed' until the panel astrologer has reviewed the copy.

export const financialStability: DomainTopic = {

  identity: {
    id:        'astrology:financial-stability',
    slug:      'financial-stability',
    title:     'Financial Stability in Astrology: Savings and Expenses',
    title_hi:  'ज्योतिष में आर्थिक स्थिरता: बचत और खर्च के योग',
    domain:    'astrology',
    subdomain: 'financial-astrology',
    category:  'stability',
    entityType: 'concept',
    status:    'published',
  },

  routing: {
    canonicalPath: '/financial-astrology/financial-stability',
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Financial Stability', label_hi: 'आर्थिक स्थिरता',  href: '/financial-astrology/financial-stability' },
    ],
  },

  seo: {
    metaTitle:          'Financial Stability in Astrology: Savings and Expenses',
    metaDescription:    'How the 2nd, 8th and 12th houses, Saturn and Jupiter describe saving, spending and money pressure in your chart, and which dashas test steadiness.',
    metaDescription_hi: 'दूसरा, आठवाँ और बारहवाँ भाव, शनि और गुरु आपकी कुंडली में बचत, खर्च और आर्थिक दबाव के बारे में क्या बताते हैं, और कौन-सी दशा स्थिरता परखती है।',
    robots: 'index,follow',
  },

  hero: {
    headline:    'Financial Stability in Astrology: How Saving, Spending and Steadiness Are Read',
    headline_hi: 'ज्योतिष में आर्थिक स्थिरता: बचत, खर्च और स्थिरता को कैसे पढ़ा जाता है',
    subtext:     'Earning money and keeping it are read as two different questions in Vedic astrology. This guide covers the second one: how the chart is traditionally read for savings, expenses and steadiness, which houses and planets are involved, and what such a reading can and cannot tell you.',
    subtext_hi:  'वैदिक ज्योतिष में धन कमाना और धन को बचाए रखना दो अलग प्रश्न माने जाते हैं। यह गाइड दूसरे प्रश्न पर है: बचत, खर्च और आर्थिक स्थिरता के लिए कुंडली को पारंपरिक रूप से कैसे पढ़ा जाता है, इसमें कौन-से भाव और ग्रह देखे जाते हैं, और ऐसा विश्लेषण क्या बता सकता है और क्या नहीं।',
  },

  taxonomy: {
    // Provisional SEO assumptions (no Search Console data). '2nd-house-wealth' is the one tag shared with
    // salary-growth; no tag is shared with dhan-yoga, so no existing guide's related list changes.
    tags:        ['financial-stability', 'money-retention', 'savings', '2nd-house-wealth', '12th-house-expenses', '8th-house'],
    keywords:    ['financial stability astrology', 'savings in kundli', '12th house expenses', '8th house money', 'money retention horoscope'],
    keywords_hi: ['आर्थिक स्थिरता ज्योतिष', 'कुंडली में बचत', 'बारहवाँ भाव खर्च', 'आठवाँ भाव धन', 'पैसा क्यों नहीं टिकता कुंडली'],
    hubPriority: 'standard',
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks: [

      {
        id:       'earning-vs-keeping',
        title:    'Earning and Keeping Are Read Separately',
        title_hi: 'कमाना और बचाए रखना अलग-अलग पढ़े जाते हैं',
        layout:   'alert',
        items: [
          {
            id:       'alert-two-questions',
            label:    'Income growth and financial steadiness are different readings',
            label_hi: 'आय की वृद्धि और आर्थिक स्थिरता अलग-अलग विश्लेषण हैं',
            body:     'Income and gains are usually read from the 11th house and its links with the 2nd. Steadiness is a different question: how much of what arrives tends to stay, how outflow weighs against it, and how the chart handles sudden changes. A chart can show strong earning and weaker retention, or modest earning with steady habits. Our salary growth guide covers the earning side; this guide covers keeping.',
            body_hi:  'आय और लाभ को आमतौर पर ग्यारहवें भाव और दूसरे भाव से उसके संबंध से पढ़ा जाता है। स्थिरता एक अलग प्रश्न है: जो धन आता है उसमें से कितना टिकता है, खर्च उसके मुकाबले कितना भारी पड़ता है, और कुंडली अचानक आए बदलावों को कैसे संभालती है। किसी कुंडली में कमाई मज़बूत और बचत कमज़ोर दिख सकती है, या कमाई सामान्य और आदतें स्थिर। कमाई वाला पक्ष हमारी वेतन वृद्धि गाइड में है; यह गाइड धन को बचाए रखने पर है।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'stability-houses',
        title:    'The Three Houses Read for Financial Steadiness',
        title_hi: 'आर्थिक स्थिरता के लिए देखे जाने वाले तीन भाव',
        layout:   'cards',
        items: [
          {
            id:       'card-2nd-house',
            icon:     '🏦',
            label:    'The 2nd House — What You Hold',
            label_hi: 'दूसरा भाव — जो धन आपके पास टिकता है',
            body:     'The 2nd house is traditionally read for accumulated money: savings, family resources and the wealth that stays with you. Its sign, its lord and the planets that influence it are weighed when an astrologer looks at how readily money is held.',
            body_hi:  'दूसरे भाव को पारंपरिक रूप से संचित धन के लिए पढ़ा जाता है: बचत, परिवार के संसाधन, और वह धन जो आपके पास टिकता है। धन कितनी आसानी से टिकता है, यह देखते समय ज्योतिषी इसकी राशि, इसके स्वामी और इसे प्रभावित करने वाले ग्रहों को साथ में तौलते हैं।',
            badge:    'Holding',
            badge_hi: 'संचय',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-12th-house',
            icon:     '📤',
            label:    'The 12th House — Expenses and Outflow',
            label_hi: 'बारहवाँ भाव — खर्च और धन का बाहर जाना',
            body:     'The 12th house is traditionally read for expenses and outflow. That covers planned spending, giving and travel as well as losses, so a prominent 12th house is read as a tendency for money to move out, not as a sign of loss on its own.',
            body_hi:  'बारहवें भाव को पारंपरिक रूप से खर्च और धन के बाहर जाने के लिए पढ़ा जाता है। इसमें योजना से किया गया खर्च, दान और यात्रा भी आते हैं, केवल हानि नहीं; इसलिए प्रमुख बारहवाँ भाव धन के बाहर जाने की प्रवृत्ति माना जाता है, अपने-आप में हानि का संकेत नहीं।',
            badge:    'Outflow',
            badge_hi: 'खर्च',
            badgeVariant: 'neutral',
          },
          {
            id:       'card-8th-house',
            icon:     '🔄',
            label:    'The 8th House — Sudden Changes and Shared Money',
            label_hi: 'आठवाँ भाव — अचानक बदलाव और साझा धन',
            body:     'The 8th house is traditionally associated with sudden changes and with money shared with or held by others, such as joint resources and inheritance. In a stability reading it is weighed for how unexpected shifts may affect what you hold, rather than read as a forecast of any event.',
            body_hi:  'आठवें भाव को पारंपरिक रूप से अचानक बदलावों और दूसरों के साथ साझा या दूसरों के पास रखे धन से जोड़ा जाता है, जैसे संयुक्त संसाधन और विरासत। स्थिरता के विश्लेषण में इसे इस नज़र से देखा जाता है कि अनपेक्षित बदलाव आपके पास टिके धन पर कैसे असर डाल सकते हैं; इसे किसी घटना की भविष्यवाणी नहीं माना जाता।',
            badge:    'Change',
            badge_hi: 'बदलाव',
            badgeVariant: 'neutral',
          },
        ],
      },

      {
        id:       'saturn-jupiter',
        title:    'Saturn and Jupiter in a Steadiness Reading',
        title_hi: 'स्थिरता के विश्लेषण में शनि और गुरु',
        layout:   'cards',
        items: [
          {
            id:       'card-saturn',
            icon:     '🪐',
            label:    'Saturn — Discipline and Slow Accumulation',
            label_hi: 'शनि — अनुशासन और धीरे-धीरे संचय',
            body:     'Saturn is traditionally associated with discipline, patience, responsibility and results that build slowly. Its influence on the money houses is often read as a tendency towards careful, gradual accumulation, and at times as restriction or delay; how it works depends on its placement and strength in your chart.',
            body_hi:  'शनि को पारंपरिक रूप से अनुशासन, धैर्य, ज़िम्मेदारी और धीरे-धीरे बनने वाले परिणामों से जोड़ा जाता है। धन के भावों पर इसके प्रभाव को अक्सर सावधानी से, धीरे-धीरे संचय की प्रवृत्ति के रूप में पढ़ा जाता है, और कभी-कभी रुकावट या देरी के रूप में भी; यह कैसे काम करता है, यह आपकी कुंडली में इसकी स्थिति और बल पर निर्भर करता है।',
            badge:    'Discipline',
            badge_hi: 'अनुशासन',
            badgeVariant: 'info',
          },
          {
            id:       'card-jupiter',
            icon:     '🌕',
            label:    'Jupiter — Growth and Preservation',
            label_hi: 'गुरु — वृद्धि और संरक्षण',
            body:     'Jupiter is traditionally regarded as a significator of wealth and wisdom. Its support of the 2nd house or the 2nd lord is often read as protective for what you hold. Like Saturn, its effect is read from its own placement and strength, not assumed.',
            body_hi:  'गुरु को पारंपरिक रूप से धन और ज्ञान का कारक माना जाता है। दूसरे भाव या द्वितीयेश पर इसके सहयोग को अक्सर संचित धन के लिए संरक्षण देने वाला माना जाता है। शनि की तरह इसका प्रभाव भी इसकी अपनी स्थिति और बल से पढ़ा जाता है, पहले से मान नहीं लिया जाता।',
            badge:    'Preservation',
            badge_hi: 'संरक्षण',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'dasha-steadiness',
        title:    'Dasha Periods and Steadiness',
        title_hi: 'दशा और आर्थिक स्थिरता',
        layout:   'alert',
        items: [
          {
            id:       'alert-dasha',
            label:    'Periods are read as tendencies, not dated events',
            label_hi: 'दशाओं को प्रवृत्ति के रूप में पढ़ा जाता है, तय घटनाओं के रूप में नहीं',
            body:     'When reading steadiness, astrologers often look at the running dasha, especially periods of the 2nd, 8th and 12th lords and of Saturn and Jupiter, and ask whether the period leans towards holding, outflow or change. This describes a tendency for the period, not a prediction of a specific event. The free Grah Dasha Finder shows your current Mahadasha and Antardasha with their start and end dates; it does not assess financial stability.',
            body_hi:  'आर्थिक स्थिरता पढ़ते समय ज्योतिषी अक्सर चल रही दशा को देखते हैं, खासकर द्वितीयेश, अष्टमेश और द्वादशेश की दशा, और शनि व गुरु की दशा, और यह समझते हैं कि वह अवधि धन के टिकने, खर्च या बदलाव में से किस ओर झुकती है। यह उस अवधि की प्रवृत्ति बताता है, किसी खास घटना की भविष्यवाणी नहीं। मुफ़्त ग्रह दशा कैलकुलेटर आपकी वर्तमान महादशा और अंतर्दशा उनकी शुरुआत और समाप्ति तिथियों के साथ दिखाता है; यह आर्थिक स्थिरता का आकलन नहीं करता।',
            badgeVariant: 'info',
          },
        ],
      },

      {
        id:       'stability-not-wealth',
        title:    'What a Stability Reading Can and Cannot Show',
        title_hi: 'स्थिरता का विश्लेषण क्या बता सकता है और क्या नहीं',
        layout:   'alert',
        items: [
          {
            id:       'alert-not-amount',
            label:    'Steadiness is not the size of your wealth',
            label_hi: 'स्थिरता का अर्थ धन की मात्रा नहीं',
            body:     'A stability reading describes how money tends to be held and how outflow and sudden changes weigh against it. It does not measure how much you will have, predict savings figures or say when a change will happen.',
            body_hi:  'स्थिरता का विश्लेषण बताता है कि धन आमतौर पर कैसे टिकता है, और खर्च व अचानक बदलाव उसके मुकाबले कितना असर डालते हैं। यह नहीं मापता कि आपके पास कितना धन होगा, न बचत की कोई राशि बताता है, न यह कि कोई बदलाव कब होगा।',
            badgeVariant: 'info',
          },
          {
            id:       'alert-choices',
            label:    'Circumstances and choices shape the outcome',
            label_hi: 'परिस्थितियाँ और निर्णय परिणाम को आकार देते हैं',
            body:     'Chart tendencies sit alongside real-world factors such as income, obligations, family needs and the decisions you make. Astrology can describe a tendency; it cannot replace a plan made with your actual finances.',
            body_hi:  'कुंडली की प्रवृत्तियाँ वास्तविक परिस्थितियों के साथ चलती हैं, जैसे आय, ज़िम्मेदारियाँ, परिवार की ज़रूरतें और आपके अपने निर्णय। ज्योतिष किसी प्रवृत्ति का वर्णन कर सकता है; यह आपकी वास्तविक आर्थिक स्थिति के आधार पर बनाई गई योजना की जगह नहीं ले सकता।',
            badgeVariant: 'warning',
          },
        ],
      },

      {
        id:       'faqs',
        title:    'Common Questions About Financial Stability and Astrology',
        title_hi: 'आर्थिक स्थिरता और ज्योतिष के बारे में सामान्य प्रश्न',
        layout:   'faq',
        items: [
          {
            id:       'faq-cannot-save',
            label:    'Why does money not stay with me even when I earn well?',
            label_hi: 'अच्छी कमाई के बावजूद पैसा मेरे पास क्यों नहीं टिकता?',
            body:     'In Vedic astrology earning and keeping are read separately: income from the 11th house and its links, holding from the 2nd house, and outflow from the 12th. When outflow or change factors are emphasised relative to the 2nd house, a reading may describe money that moves out easily. This is a tendency to understand, not a fixed result; savings also depend on your circumstances and decisions.',
            body_hi:  'वैदिक ज्योतिष में कमाना और बचाए रखना अलग-अलग पढ़े जाते हैं: आय ग्यारहवें भाव और उसके संबंधों से, धन का टिकना दूसरे भाव से, और खर्च बारहवें भाव से। जब दूसरे भाव की तुलना में खर्च या बदलाव के कारक अधिक प्रमुख हों, तो विश्लेषण में ऐसा धन दिख सकता है जो आसानी से बाहर चला जाता है। यह समझने की एक प्रवृत्ति है, कोई तय परिणाम नहीं; बचत आपकी परिस्थितियों और निर्णयों पर भी निर्भर करती है।',
          },
          {
            id:       'faq-12th-loss',
            label:    'Does a strong 12th house always mean losing money?',
            label_hi: 'क्या प्रमुख बारहवाँ भाव हमेशा धन की हानि बताता है?',
            body:     'No. The 12th house is traditionally read for expenses and outflow in general, which includes planned spending, giving and travel as well as losses. Its effect is read together with its lord, the planets involved and the 2nd house.',
            body_hi:  'नहीं। बारहवें भाव को पारंपरिक रूप से सामान्य खर्च और धन के बाहर जाने के लिए पढ़ा जाता है, जिसमें योजना से किया गया खर्च, दान और यात्रा भी आते हैं, केवल हानि नहीं। इसका प्रभाव इसके स्वामी, संबंधित ग्रहों और दूसरे भाव के साथ मिलाकर पढ़ा जाता है।',
          },
          {
            id:       'faq-8th-house',
            label:    'Is an afflicted 8th house bad for money?',
            label_hi: 'क्या पीड़ित आठवाँ भाव धन के लिए बुरा होता है?',
            body:     'Not necessarily. The 8th house is traditionally linked with sudden changes and shared or inherited resources. Pressure on it is read as a reason for caution about unexpected shifts, and its meaning depends on the whole chart rather than on one factor.',
            body_hi:  'ज़रूरी नहीं। आठवें भाव को पारंपरिक रूप से अचानक बदलावों और साझा या विरासत में मिले संसाधनों से जोड़ा जाता है। इस पर दबाव को अनपेक्षित बदलावों के प्रति सावधानी का संकेत माना जाता है, और इसका अर्थ किसी एक कारक से नहीं, पूरी कुंडली से तय होता है।',
          },
          {
            id:       'faq-saturn-dasha',
            label:    'Can a Saturn dasha make my finances stable?',
            label_hi: 'क्या शनि की दशा मेरी आर्थिक स्थिति को स्थिर बना सकती है?',
            body:     'A Saturn period is traditionally read as one that rewards patience and careful habits, and it can also feel slow or restrictive. Whether it leans towards steadiness depends on Saturn’s placement and strength in your chart. It does not by itself make finances stable or unstable.',
            body_hi:  'शनि की दशा को पारंपरिक रूप से ऐसी अवधि माना जाता है जो धैर्य और सावधान आदतों का फल देती है, और यह धीमी या रुकावट भरी भी लग सकती है। यह स्थिरता की ओर झुकेगी या नहीं, यह आपकी कुंडली में शनि की स्थिति और बल पर निर्भर करता है। यह अपने-आप में आर्थिक स्थिति को स्थिर या अस्थिर नहीं बनाती।',
          },
          {
            id:       'faq-vs-dhan-yoga',
            label:    'How is financial stability different from Dhan Yoga?',
            label_hi: 'आर्थिक स्थिरता धन योग से कैसे अलग है?',
            body:     'Dhan Yoga describes links between the houses of money and fortune and is read for wealth potential. A stability reading asks a different question: how money tends to be held, and how outflow and sudden changes weigh against it. A chart can show one without the other.',
            body_hi:  'धन योग धन और भाग्य के भावों के आपसी संबंध को बताता है और इसे धन की संभावना के लिए पढ़ा जाता है। स्थिरता का विश्लेषण एक अलग प्रश्न पूछता है: धन आमतौर पर कैसे टिकता है, और खर्च व अचानक बदलाव उसके मुकाबले कितना असर डालते हैं। किसी कुंडली में इनमें से एक हो सकता है और दूसरा नहीं।',
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
            body:     'Astrological analysis describes tendencies observed across birth charts — it does not predict fixed outcomes. Financial results depend on personal effort, decisions and individual circumstances. This content is educational and is not budgeting, investment, borrowing, lending or tax advice.',
            body_hi:  'ज्योतिषीय विश्लेषण जन्म कुंडलियों में देखी गई प्रवृत्तियों का वर्णन करता है — यह निश्चित परिणामों की भविष्यवाणी नहीं करता। वित्तीय परिणाम व्यक्तिगत प्रयास, निर्णयों और परिस्थितियों पर निर्भर करते हैं। यह सामग्री शैक्षिक है; यह बजट, निवेश, उधार लेने-देने या कर से जुड़ी सलाह नहीं है।',
            badgeVariant: 'info',
          },
        ],
      },
    ],

    ctas: [
      {
        id:             'cta-financial-stability-report',
        type:           'report',
        slug:           'financial_stability_report',
        label:          'Want a full reading of your money steadiness?',
        label_hi:       'अपनी आर्थिक स्थिरता का पूरा विश्लेषण चाहते हैं?',
        description:    'Reads your 2nd, 8th and 12th houses for money retention, pressure factors and steadiness, with financial discipline guidance and your current dasha period. Delivered as a PDF to your email.',
        description_hi: 'दूसरे, आठवें और बारहवें भाव से धन की बचत, दबाव के कारक और स्थिरता, साथ में वित्तीय अनुशासन के सुझाव और वर्तमान दशा अवधि। PDF आपके ईमेल पर भेजी जाती है।',
        variant:        'primary',
      },
      {
        id:             'cta-tool-grah-dasha-finder',
        type:           'tool',
        slug:           'grah-dasha-finder',
        label:          'See which dasha you are running, free',
        label_hi:       'मुफ़्त देखें कि कौन सी दशा चल रही है',
        description:    'Shows your current Mahadasha and Antardasha with their start and end dates.',
        description_hi: 'आपकी वर्तमान महादशा और अंतर्दशा उनकी शुरुआत और समाप्ति तिथियों के साथ दिखाता है।',
        variant:        'secondary',
      },
    ],
  },

  aiMetadata: {
    difficulty:      'beginner',
    searchIntent:    'informational',
    authorityLevel:  'introductory',
    topicGoal:       'Explain how Vedic astrology is traditionally read for keeping money -- savings (2nd house), expenses (12th) and sudden changes (8th), with Saturn, Jupiter and the running dasha -- as tendencies, separately from earning and income growth.',
    targetAudience:  ['people who earn but find money does not stay', 'people wanting to understand money pressure in their chart', 'astrology students learning the 2nd, 8th and 12th houses'],
    primaryQuestion: 'What does my chart say about saving money and financial steadiness?',
    contentAngle:    'Earning and keeping are separate readings: the 2nd, 12th and 8th houses with Saturn and Jupiter describe retention, outflow and change as tendencies, never amounts or dated events',
    relatedConcepts: ['2nd house savings', '12th house expenses', '8th house sudden change', 'saturn discipline', 'jupiter preservation', 'dasha tendency'],
  },

  schemaSignals: {
    expertise:     'Vedic Jyotish reading of financial steadiness: the 2nd house (savings), 12th house (expenses), 8th house (sudden change and shared money), Saturn, Jupiter and the running dasha, read as tendencies',
    datePublished: '2026-11-17',
  },

  authority: {
    // Not yet reviewed by the panel astrologer; see the Checkpoint 5C report for the claims awaiting review.
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
