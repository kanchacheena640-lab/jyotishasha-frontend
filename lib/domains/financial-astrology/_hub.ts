// lib/domains/financial-astrology/_hub.ts
// Hub presentation for /financial-astrology (EN + HI), rendered by IntentHubRenderer per
// docs/seo/JYOTISHASHA_HUB_STANDARD.md. Presentation only: every link points at an EXISTING route
// (the 14 registered guides, free tool pages, report product pages, focused-report pages).
//
// Report names, prices and focused-report questions are NOT typed here: the renderer reads them from
// app/data/reportsData.ts and app/data/focusedReportsConfig.ts. Descriptions below only name what the
// product actually computes or writes:
//  - tools: backend services/<tool>.py (career_path, government_job, business_path, dhan_yog,
//    lakshmi_yog, kuber_rajyog) and the grah-dasha-finder result block (current MD/AD with dates);
//  - standard reports: the section list of backend prompts/<slug>_en.txt (each read with the current
//    dasha window, no transits, no event prediction).

import type { IntentHubConfig } from '@/components/authority-engine/IntentHubRenderer'

export const financialAstrologyHub: IntentHubConfig = {
  icon: '💼',
  h1:    'Financial Astrology',
  h1_hi: 'वित्त ज्योतिष',
  lead:    'Read career direction, job changes, promotion and income, and your business and wealth indications in your birth chart, with free tools and personalised reports.',
  lead_hi: 'अपनी जन्मकुंडली से करियर की दिशा, नौकरी में बदलाव, प्रमोशन और आय, और व्यापार व धन के संकेत समझें — फ्री टूल्स और व्यक्तिगत रिपोर्ट के साथ।',

  seoTitle:    'Financial Astrology: Career Guides, Free Tools & Reports',
  seoTitle_hi: 'वित्त ज्योतिष: करियर गाइड, फ्री टूल्स और रिपोर्ट',
  metaDescription:
    'Vedic guides to career, job change, promotion and salary, with free Dhan Yog, Lakshmi Yog and career tools, plus wealth, career and business reports.',
  metaDescription_hi:
    'करियर, नौकरी बदलाव, प्रमोशन और वेतन पर वैदिक गाइड, फ्री धन योग, लक्ष्मी योग और करियर टूल्स, साथ ही धन, करियर और व्यापार रिपोर्ट।',

  // Section 1 -- eight questions, each to its most relevant existing guide.
  intentHeading:    'Do You Have These Questions About Your Career and Money?',
  intentHeading_hi: 'क्या आपके मन में भी करियर और पैसे को लेकर ये सवाल हैं?',
  intents: [
    { slug: 'best-career',           icon: '🧭', label: 'Which career suits my birth chart?',     label_hi: 'मेरी कुंडली के अनुसार कौन सा करियर सही है?' },
    { slug: 'job-vs-business',       icon: '⚖️', label: 'Should I do a job or start a business?', label_hi: 'मुझे नौकरी करनी चाहिए या व्यापार?' },
    { slug: 'government-job',        icon: '🏛️', label: 'Is a government job indicated in my chart?', label_hi: 'क्या मेरी कुंडली में सरकारी नौकरी का योग है?' },
    { slug: 'salary-growth',         icon: '💰', label: 'When will my salary increase?',          label_hi: 'मेरी सैलरी कब बढ़ेगी?' },
    { slug: 'job-change-prediction', icon: '🔄', label: 'Is this a good time to change my job?',  label_hi: 'क्या यह नौकरी बदलने का सही समय है?' },
    { slug: 'promotion-chances',     icon: '📈', label: 'When will I get a promotion?',           label_hi: 'मेरा प्रमोशन कब होगा?' },
    { slug: 'new-job-chances',       icon: '💼', label: 'Will I get a new job soon?',             label_hi: 'क्या मुझे जल्द नई नौकरी मिलेगी?' },
    // career-challenges (not career-growth) covers delays, obstacles and why growth stalls.
    { slug: 'career-challenges',     icon: '⏳', label: 'Why is my career not growing?',          label_hi: 'मेरे करियर में प्रगति क्यों नहीं हो रही?' },
  ],

  // Section 2 -- existing free tools (EN at the path, HI under /hi). No Financial calendar page exists.
  toolsHeading:    'Explore Free Career & Wealth Tools',
  toolsHeading_hi: 'करियर और धन के फ्री टूल्स',
  tools: [
    { href: '/tools/career-path', icon: '🧭',
      title: 'Career Path', title_hi: 'करियर मार्ग',
      benefit: 'A quick read of your 10th house: its lord and placement, the planets there and the planet with the strongest career influence.',
      benefit_hi: 'आपके दशम भाव की झलक: दशमेश और उसकी स्थिति, वहाँ के ग्रह और करियर पर सबसे प्रभावी ग्रह।' },
    { href: '/tools/government-job', icon: '🏛️',
      title: 'Government Job', title_hi: 'सरकारी नौकरी',
      benefit: 'Checks whether your 6th lord (competition) and 10th lord (career) are exalted, in their own sign or debilitated.',
      benefit_hi: 'देखता है कि षष्ठेश (प्रतियोगिता) और दशमेश (करियर) उच्च, स्वराशि या नीच राशि में हैं।' },
    { href: '/tools/business-path', icon: '📈',
      title: 'Business Path', title_hi: 'व्यापार मार्ग',
      benefit: 'Reads your 7th and 11th house lords, the planets placed there and Rahu for a business, job or mixed leaning.',
      benefit_hi: 'सातवें और ग्यारहवें भाव के स्वामी, वहाँ के ग्रह और राहु से व्यापार, नौकरी या मिश्रित झुकाव।' },
    { href: '/tools/grah-dasha-finder', icon: '🪐',
      title: 'Grah Dasha Finder', title_hi: 'ग्रह दशा कैलकुलेटर',
      benefit: 'Your current Mahadasha and Antardasha, with their start and end dates.',
      benefit_hi: 'आपकी वर्तमान महादशा और अंतर्दशा, उनकी शुरुआत और समाप्ति तिथियों के साथ।' },
    { href: '/tools/dhan-yog', icon: '💰',
      title: 'Dhan Yog', title_hi: 'धन योग',
      benefit: 'Checks whether your 2nd, 5th, 9th and 11th house lords are linked by conjunction, mutual aspect or sign exchange.',
      benefit_hi: 'दूसरे, पाँचवें, नौवें और ग्यारहवें भाव के स्वामियों में युति, परस्पर दृष्टि या राशि परिवर्तन की जाँच।' },
    { href: '/tools/lakshmi-yog', icon: '🪷',
      title: 'Lakshmi Yog', title_hi: 'लक्ष्मी योग',
      benefit: 'Checks whether your 9th lord sits in its own sign in a kendra or trikona, with a strong Ascendant lord.',
      benefit_hi: 'देखता है कि नवमेश स्वराशि में होकर केंद्र या त्रिकोण में है और लग्नेश बलवान है।' },
    { href: '/tools/kuber-rajyog', icon: '🏦',
      title: 'Kuber Rajyog', title_hi: 'कुबेर राजयोग',
      benefit: 'Looks for a strong Jupiter, Venus, Mercury or Moon placed in your 2nd, 5th, 9th or 11th house.',
      benefit_hi: 'दूसरे, पाँचवें, नौवें या ग्यारहवें भाव में बलवान गुरु, शुक्र, बुध या चंद्र की जाँच।' },
  ],

  // Section 3 -- standard reports (names/prices from reportsData.ts) + focused questions.
  reports: {
    heading:    'Get Personalised Answers About Career and Money',
    heading_hi: 'करियर और धन से जुड़े सवालों के व्यक्तिगत जवाब पाएं',
    intro:    'Each report is prepared from your own birth details and emailed to you as a PDF.',
    intro_hi: 'हर रिपोर्ट आपकी अपनी जन्म जानकारी से तैयार होती है और PDF के रूप में ईमेल पर भेजी जाती है।',
    featuredLabel:    'Featured wealth report',
    featuredLabel_hi: 'मुख्य धन रिपोर्ट',
    featured: {
      slug: 'financial_report',
      // prompts/financial_report_en.txt: 2nd/5th/8th/11th, wealth-yoga evidence, strengths, constraints, dasha context.
      description: 'Reads your income and wealth houses (2nd, 5th, 8th and 11th), wealth yogas such as Dhan Yog, and your wealth-building strengths and constraints, with your current dasha period.',
      description_hi: 'आपके आय और धन के भाव (दूसरा, पाँचवाँ, आठवाँ और ग्यारहवाँ), धन योग सहित धन से जुड़े योग, और धन बढ़ाने की ताकतें व बाधाएँ — वर्तमान दशा अवधि के साथ।',
    },
    more: [
      { slug: 'financial_stability_report',
        description: 'Reads your 2nd, 8th and 12th houses for money retention, pressure factors and steadiness, with financial discipline guidance and your current dasha period.',
        description_hi: 'दूसरे, आठवें और बारहवें भाव से धन की बचत, दबाव के कारक और स्थिरता, साथ में वित्तीय अनुशासन के सुझाव और वर्तमान दशा अवधि।' },
      { slug: 'career_report',
        description: 'Reads your 10th house and its lord, career yogas, professional strengths and challenges, with practical guidance and your current dasha period.',
        description_hi: 'दशम भाव और उसका स्वामी, करियर योग, पेशेवर ताकतें और चुनौतियाँ, साथ में व्यावहारिक मार्गदर्शन और वर्तमान दशा अवधि।' },
      { slug: 'business_report',
        description: 'Reads business suitability and entrepreneurial capacity from your 2nd, 7th, 10th and 11th houses and relevant yogas, with your current dasha period.',
        description_hi: 'दूसरे, सातवें, दसवें और ग्यारहवें भाव और संबंधित योगों से व्यापार की उपयुक्तता और उद्यमशीलता की क्षमता, वर्तमान दशा अवधि के साथ।' },
      { slug: 'government_job_report',
        description: 'Reads your 6th, 9th, 10th and 11th houses with the Sun, Saturn, Jupiter and Mars, plus preparation guidance and your current dasha period.',
        description_hi: 'छठे, नौवें, दसवें और ग्यारहवें भाव के साथ सूर्य, शनि, गुरु और मंगल, तैयारी के सुझाव और वर्तमान दशा अवधि।' },
    ],
    focusedHeading:    'Ask One Specific Question',
    focusedHeading_hi: 'एक खास सवाल पूछें',
    focusedIntro:    'Focused reports answer one question in a short PDF.',
    focusedIntro_hi: 'फोकस्ड रिपोर्ट एक सवाल का जवाब एक छोटी PDF में देती है।',
    // Real focused-report question_keys (money + business categories); question text, price and
    // description are read from focusedReportsConfig at render time.
    focusedKeys: [
      'income_increase_timing',
      'money_growth_periods',
      'financial_pressure_easing',
      'debt_pressure_easing',
      'business_start_timing',
      'business_growth_timing',
    ],
  },

  // Section 4 -- all 14 guides, each exactly once, in five groups.
  topicsHeading:    'Explore Career & Money Through Vedic Astrology',
  topicsHeading_hi: 'वैदिक ज्योतिष से करियर और धन को समझें',
  topicGroups: [
    { id: 'direction', icon: '🧭',
      title: 'Career Direction', title_hi: 'करियर की दिशा',
      description: 'The work your chart supports: profession, job or business, and government service.',
      description_hi: 'आपकी कुंडली किस काम का समर्थन करती है: पेशा, नौकरी या व्यापार, और सरकारी सेवा।' },
    { id: 'jobs', icon: '💼',
      title: 'New Jobs & Job Change', title_hi: 'नई नौकरी और नौकरी बदलाव',
      description: 'How the chart is read for new roles and for moving on from a job.',
      description_hi: 'नई नौकरी और नौकरी बदलने के लिए कुंडली कैसे पढ़ी जाती है।' },
    { id: 'growth', icon: '📈',
      title: 'Growth, Promotion & Income', title_hi: 'प्रगति, प्रमोशन और आय',
      description: 'Career growth phases, promotion indicators and salary growth.',
      description_hi: 'करियर की प्रगति के चरण, प्रमोशन के संकेत और वेतन वृद्धि।' },
    { id: 'wealth', icon: '🪙',
      title: 'Wealth, Savings & Business', title_hi: 'धन, बचत और व्यापार',
      description: 'Dhan Yoga, keeping money steady, and reading a business you run or are starting.',
      description_hi: 'धन योग, धन को स्थिर बनाए रखना, और चल रहे या शुरू होने वाले व्यापार का विश्लेषण।' },
    { id: 'stages', icon: '🌱',
      title: 'Challenges & Life Stages', title_hi: 'चुनौतियाँ और जीवन के पड़ाव',
      description: 'Career obstacles, and how career is read after 40 and after marriage.',
      description_hi: 'करियर की बाधाएँ, और 40 के बाद व विवाह के बाद करियर कैसे पढ़ा जाता है।' },
  ],
  topics: [
    { slug: 'best-career',           group: 'direction', title: 'Best Career for Your Chart', title_hi: 'कुंडली के अनुसार सर्वश्रेष्ठ करियर' },
    { slug: 'job-vs-business',       group: 'direction', title: 'Job vs Business',            title_hi: 'नौकरी बनाम व्यापार' },
    { slug: 'government-job',        group: 'direction', title: 'Government Job Yoga',        title_hi: 'सरकारी नौकरी का योग' },
    { slug: 'new-job-chances',       group: 'jobs',      title: 'New Job Chances',            title_hi: 'नई नौकरी के योग' },
    { slug: 'job-change-prediction', group: 'jobs',      title: 'Job Change Prediction',      title_hi: 'नौकरी बदलाव की भविष्यवाणी' },
    { slug: 'promotion-chances',     group: 'growth',    title: 'Promotion Chances',          title_hi: 'प्रमोशन के योग' },
    { slug: 'career-growth',         group: 'growth',    title: 'Career Growth',              title_hi: 'करियर विकास' },
    { slug: 'salary-growth',         group: 'growth',    title: 'Salary Growth',              title_hi: 'वेतन वृद्धि' },
    { slug: 'dhan-yoga',             group: 'wealth',    title: 'Dhan Yoga',                  title_hi: 'धन योग' },
    { slug: 'financial-stability',   group: 'wealth',    title: 'Financial Stability',        title_hi: 'आर्थिक स्थिरता' },
    { slug: 'business-astrology',    group: 'wealth',    title: 'Business Astrology',         title_hi: 'व्यापार ज्योतिष' },
    { slug: 'career-challenges',     group: 'stages',    title: 'Career Challenges',          title_hi: 'करियर की बाधाएँ' },
    { slug: 'career-after-40',       group: 'stages',    title: 'Career After 40',            title_hi: '40 के बाद करियर' },
    { slug: 'career-after-marriage', group: 'stages',    title: 'Career After Marriage',      title_hi: 'विवाह के बाद करियर' },
  ],

  // Section 5 -- the chart factors a Vedic career-and-money reading rests on, each linked to the
  // existing guide (or free tool page) that treats it in depth.
  basics: {
    heading:    'How Vedic Astrology Reads Career and Money',
    heading_hi: 'वैदिक ज्योतिष करियर और धन को कैसे पढ़ता है',
    intro:    'A career-and-money reading weighs a few houses, their lords and the running dasha together. No single factor decides the outcome.',
    intro_hi: 'करियर और धन के विश्लेषण में कुछ भाव, उनके स्वामी और चल रही दशा एक साथ देखे जाते हैं। कोई एक कारक परिणाम तय नहीं करता।',
    items: [
      { id: 'tenth-house', icon: '🏢',
        title: 'The 10th house', title_hi: 'दशम भाव',
        body: 'The house of career and status. Its sign, the placement of its lord and the planets in it describe the kind of work and recognition the chart supports.',
        body_hi: 'करियर और प्रतिष्ठा का भाव। इसकी राशि, इसके स्वामी की स्थिति और इसमें बैठे ग्रह बताते हैं कि कुंडली किस तरह के काम और पहचान का समर्थन करती है।',
        links: [
          { href: '/financial-astrology/best-career', label: 'Best Career for Your Chart', label_hi: 'कुंडली के अनुसार सर्वश्रेष्ठ करियर' },
          { href: '/financial-astrology/career-growth', label: 'Career Growth', label_hi: 'करियर विकास' },
        ] },
      { id: 'income-houses', icon: '💰',
        title: 'The 2nd and 11th houses', title_hi: 'दूसरा और ग्यारहवाँ भाव',
        body: 'The 2nd house relates to earned and saved money, the 11th to income and gains. Their lords, and the link between them, are read for income growth.',
        body_hi: 'दूसरा भाव कमाए और बचाए गए धन से, ग्यारहवाँ आय और लाभ से जुड़ा है। आय वृद्धि के लिए इनके स्वामी और उनके आपसी संबंध देखे जाते हैं।',
        links: [
          { href: '/financial-astrology/salary-growth', label: 'Salary Growth', label_hi: 'वेतन वृद्धि' },
        ] },
      { id: 'service-trade', icon: '⚖️',
        title: 'The 6th and 7th houses', title_hi: 'छठा और सातवाँ भाव',
        body: 'The 6th house describes service, competition and exams; the 7th, partnership and trade. Both are weighed when comparing a job, government service or business.',
        body_hi: 'छठा भाव सेवा, प्रतियोगिता और परीक्षा का है; सातवाँ साझेदारी और व्यापार का। नौकरी, सरकारी सेवा या व्यापार की तुलना में दोनों को देखा जाता है।',
        links: [
          { href: '/financial-astrology/government-job', label: 'Government Job Yoga', label_hi: 'सरकारी नौकरी का योग' },
          { href: '/financial-astrology/job-vs-business', label: 'Job vs Business', label_hi: 'नौकरी बनाम व्यापार' },
        ] },
      { id: 'dhan-yoga', icon: '🪙',
        title: 'Dhan Yoga', title_hi: 'धन योग',
        body: 'Jyotishasha’s free tool checks for conjunctions, mutual aspects or sign exchanges among the lords of the 2nd, 5th, 9th and 11th houses. Other definitions may consider additional factors. A Dhan Yoga may indicate wealth potential; interpret it in the context of the rest of the chart.',
        body_hi: 'ज्योतिष आशा का मुफ़्त टूल दूसरे, पाँचवें, नौवें और ग्यारहवें भाव के स्वामियों के बीच युति, परस्पर दृष्टि या राशि परिवर्तन की जाँच करता है। अन्य परिभाषाओं में अतिरिक्त कारक देखे जा सकते हैं। धन योग धन की संभावना का संकेत दे सकता है; इसकी व्याख्या पूरी कुंडली के संदर्भ में करनी चाहिए।',
        links: [
          { href: '/financial-astrology/dhan-yoga', label: 'Dhan Yoga Explained', label_hi: 'धन योग की पूरी जानकारी' },
          { href: '/tools/dhan-yog', label: 'Check Dhan Yog', label_hi: 'धन योग जाँचें' },
        ] },
      { id: 'dasha', icon: '🕰️',
        title: 'Dasha periods', title_hi: 'दशा',
        body: 'Mahadasha and Antardasha periods bring the chart’s career and income indications into focus. Periods of the 10th, 2nd and 11th lords are traditionally watched for job changes, promotion and income.',
        body_hi: 'महादशा और अंतर्दशा कुंडली के करियर और आय से जुड़े संकेतों को सक्रिय करती हैं। परंपरा के अनुसार नौकरी बदलाव, प्रमोशन और आय के लिए दशमेश, द्वितीयेश और एकादशेश की दशाएँ देखी जाती हैं।',
        links: [
          { href: '/financial-astrology/job-change-prediction', label: 'Job Change Prediction', label_hi: 'नौकरी बदलाव की भविष्यवाणी' },
          { href: '/financial-astrology/promotion-chances', label: 'Promotion Chances', label_hi: 'प्रमोशन के योग' },
        ] },
    ],
  },
}
