/**
 * promotion_timing -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING; natal career indications, 2nd/6th/10th/11th houses and lords,
 * career yogas, current MD/AD, Jupiter/Saturn/Rahu; "assess the present first,
 * then compare upcoming windows"; no guaranteed promotion, raise, salary amount,
 * continued employment or job loss; remedies=False) and career_evidence.py
 * (dasha_window_summary -> 12-month horizon).
 */
import type { FocusedReportSeoContent } from "./types";

export const promotionTiming: FocusedReportSeoContent = {
  questionKey: "promotion_timing",
  searchIntent:
    "Commercial-timing: an employed person asking whether now (and which coming months) suit a promotion. Distinct from the free /financial-astrology/promotion-chances guide, from career-growth-delay-reason (why progress is stuck) and job-change-now (whether to move jobs).",
  seoTitle: {
    en: "Good Time for a Promotion? Astrology Report | Jyotishasha",
    hi: "प्रमोशन का सही समय? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 personalised report on whether your present period supports a promotion, and the stronger advancement windows in the next 12 months, from your own chart.",
    hi: "₹51 की व्यक्तिगत रिपोर्ट: क्या आपकी मौजूदा अवधि प्रमोशन के पक्ष में है, और आपकी कुंडली के अनुसार अगले 12 महीनों में आगे बढ़ने के मजबूत समय कौन-से हैं।",
  },
  h1: {
    en: "Promotion Timing: Does Your Present Period Support a Step Up?",
    hi: "प्रमोशन का समय: क्या आपकी मौजूदा अवधि आगे बढ़ने में साथ दे रही है?",
  },
  intro: {
    en: [
      "A promotion usually arrives through a review cycle, a vacancy or a manager's recommendation, so the question is rarely just “will it happen?” but “is this the right stretch to push for it?” Vedic astrology approaches that by reading how strongly your chart's advancement indications are active in the current period.",
      "This report answers the present first: whether your running Dasha and the current Jupiter, Saturn and Rahu positions support more responsibility now. It then compares the stronger and slower windows in the next 12 months, so you can see whether to make your case now or prepare for a better-supported stretch.",
    ],
    hi: [
      "प्रमोशन आमतौर पर अप्रेज़ल, किसी पद के खाली होने या मैनेजर की सिफ़ारिश से आता है, इसलिए असली सवाल सिर्फ़ “क्या होगा?” नहीं होता, बल्कि “क्या अभी इसके लिए ज़ोर लगाने का सही समय है?” वैदिक ज्योतिष इसे यह देखकर समझता है कि मौजूदा समय में आपकी कुंडली के तरक्की से जुड़े संकेत कितने सक्रिय हैं।",
      "यह रिपोर्ट पहले वर्तमान का जवाब देती है: क्या आपकी चल रही दशा और गुरु, शनि व राहु की मौजूदा स्थिति अभी ज़्यादा ज़िम्मेदारी के पक्ष में है। फिर यह अगले 12 महीनों के मजबूत और धीमे समय की तुलना करती है, ताकि आप देख सकें कि अभी अपनी बात रखें या बेहतर समय के लिए तैयारी करें।",
    ],
  },
  analyzes: {
    en: [
      "Your 2nd, 6th, 10th and 11th houses and their lords, which the report reads for income, service, status and gains at work",
      "Career yogas already computed in your chart, used only where they are actually present",
      "Your current Mahadasha and Antardasha, and any sub-period that begins within the next 12 months",
      "Jupiter, Saturn and Rahu: the sign and house each occupies from your Lagna, with their direct and retrograde phases",
    ],
    hi: [
      "आपके 2रे, 6ठे, 10वें और 11वें भाव और उनके स्वामी, जिन्हें यह रिपोर्ट काम में आय, सेवा, पद और लाभ के लिए पढ़ती है",
      "आपकी कुंडली में पहले से गणना किए गए करियर योग, केवल वहीं जहाँ वे सच में मौजूद हों",
      "आपकी मौजूदा महादशा और अंतर्दशा, और अगले 12 महीनों में शुरू होने वाली कोई उप-दशा",
      "गुरु, शनि और राहु: आपके लग्न से हर ग्रह किस राशि और भाव में है, और उनके मार्गी व वक्री चरण",
    ],
  },
  readingGuide: {
    heading: { en: "Reading promotion timing sensibly", hi: "प्रमोशन के समय को समझदारी से कैसे पढ़ें" },
    points: {
      en: [
        "“Now” and “next window” are separate answers. A chart can show steady conditions today and a stronger stretch a few months out; the report states which applies to you.",
        "Advancement indications are about responsibility and recognition, not a specific raise. No chart reading can name a salary figure, so the report does not.",
        "A slower period is a cue for preparation: documenting results, building the case and taking on visible work, so you are ready when support strengthens.",
        "Your organisation's review calendar still matters. Use the supported windows to decide when to ask, not as a substitute for the process.",
      ],
      hi: [
        "“अभी” और “अगला अनुकूल समय” दो अलग जवाब हैं। कुंडली आज स्थिर परिस्थितियाँ और कुछ महीने बाद ज़्यादा मजबूत समय दिखा सकती है; रिपोर्ट बताती है कि आप पर कौन-सा लागू होता है।",
        "तरक्की के संकेत ज़िम्मेदारी और पहचान के बारे में होते हैं, किसी तय वेतन-वृद्धि के बारे में नहीं। कोई भी कुंडली-विश्लेषण वेतन की रकम नहीं बता सकता, इसलिए यह रिपोर्ट भी नहीं बताती।",
        "धीमा समय तैयारी का संकेत है: अपने नतीजों को दर्ज करना, अपनी बात मजबूत करना और ऐसा काम लेना जो दिखे, ताकि सहयोग बढ़ने पर आप तैयार रहें।",
        "आपकी संस्था का अप्रेज़ल कैलेंडर अब भी मायने रखता है। अनुकूल समय का उपयोग यह तय करने में करें कि कब बात करनी है, प्रक्रिया के विकल्प के रूप में नहीं।",
      ],
    },
  },
  differentiation: {
    en: "The free guide to promotion chances explains how astrology looks at career advancement in general. If your progress has felt stuck for a long time, the Career Growth Delays report diagnoses the reasons instead. This report answers a narrower question: whether the present period, and which coming months, support a step up for you.",
    hi: "प्रमोशन के योग पर मुफ़्त गाइड बताती है कि ज्योतिष सामान्य रूप से करियर की तरक्की को कैसे देखता है। अगर आपकी प्रगति लंबे समय से रुकी हुई लगती है, तो 'करियर की देरी' रिपोर्ट इसके कारणों का विश्लेषण करती है। यह रिपोर्ट एक सीमित सवाल का जवाब देती है: क्या मौजूदा अवधि, और आने वाले कौन-से महीने, आपके लिए आगे बढ़ने में साथ देते हैं।",
  },
  internalLinks: [
    { path: "/financial-astrology/promotion-chances", localized: true, label: { en: "Promotion chances in astrology (free guide)", hi: "ज्योतिष में प्रमोशन के योग (मुफ़्त गाइड)" } },
    { path: "/reports/focused/career-growth-delay-reason", localized: true, label: { en: "Career Growth Delays report (₹51)", hi: "करियर की देरी रिपोर्ट (₹51)" } },
    { path: "/tools/career-path", localized: true, label: { en: "Career path tool (free)", hi: "करियर पथ टूल (मुफ़्त)" } },
    { path: "/reports/career_report", localized: false, label: { en: "Career Report (₹51)", hi: "करियर रिपोर्ट (₹51, अंग्रेज़ी पेज)" } },
  ],
  benefits: {
    en: [
      "A clear answer about the present period first, then the stronger advancement windows ahead",
      "Reads the 2nd, 6th, 10th and 11th houses with your running Dasha and three key transits",
      "Practical career action matched to whether support is strong now or later",
    ],
    hi: [
      "पहले मौजूदा अवधि का साफ़ जवाब, फिर आगे के मजबूत तरक्की वाले समय",
      "2रे, 6ठे, 10वें और 11वें भाव को आपकी चल रही दशा और तीन मुख्य गोचरों के साथ पढ़ती है",
      "इस बात से जुड़ी व्यावहारिक करियर-सलाह कि सहयोग अभी मजबूत है या बाद में",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Is this a good time for my promotion?”. It assesses your present period first, then names the strongest supported advancement windows in the next 12 months and, only where justified, a slower stretch.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “क्या यह समय मेरे प्रमोशन के लिए अच्छा है?” यह पहले आपकी मौजूदा अवधि का आकलन करती है, फिर अगले 12 महीनों में तरक्की के सबसे मजबूत समय बताती है, और केवल जहाँ उचित हो, कोई धीमी अवधि भी।",
    },
    howJyotishApproachesIt: {
      en: "Your Lagna, placements, the 2nd, 6th, 10th and 11th houses with their lords, career yogas, Dasha periods and the transit dates for Jupiter, Saturn and Rahu are all calculated first. The written reading then weighs these together for advancement; it never alters a calculated position or date.",
      hi: "आपका लग्न, ग्रह-स्थितियाँ, 2रा, 6ठा, 10वाँ और 11वाँ भाव व उनके स्वामी, करियर योग, दशा की अवधियाँ और गुरु, शनि व राहु के गोचर की तारीखें पहले गणना की जाती हैं। इसके बाद लिखित विश्लेषण इन्हें तरक्की के लिए साथ में तौलता है; यह किसी गणना की गई स्थिति या तारीख को कभी नहीं बदलता।",
    },
    whoItIsFor: {
      en: "For someone already in a role who is approaching an appraisal, eyeing a senior opening, or deciding when to raise the subject with a manager.",
      hi: "उन लोगों के लिए जो पहले से किसी पद पर हैं और अप्रेज़ल के करीब हैं, किसी वरिष्ठ पद पर नज़र रखे हैं, या तय कर रहे हैं कि मैनेजर से यह बात कब करें।",
    },
    whatYouReceive: {
      en: "Your PDF runs to roughly 400 to 500 words across Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, prepared from your birth details and sent by email. The Slower or Watch Period section appears only when your dated evidence supports it.",
      hi: "आपकी PDF लगभग 400 से 500 शब्दों की होती है, जिसमें सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए और सीधी बात शामिल हैं; यह आपकी जन्म जानकारी से तैयार होकर ईमेल पर भेजी जाती है। 'धीमा या ध्यान रखने वाला समय' वाला हिस्सा तभी आता है जब आपकी तारीख-युक्त जानकारी उसका समर्थन करे।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not promise a promotion, a raise or a salary figure, and it does not predict continued employment or job loss.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह प्रमोशन, वेतन-वृद्धि या वेतन की रकम का वादा नहीं करती, और न ही नौकरी बने रहने या जाने की भविष्यवाणी करती है।",
    },
  },
  faqs: [
    {
      question: { en: "My appraisal is next month. Will this tell me the result?", hi: "मेरा अप्रेज़ल अगले महीने है। क्या यह उसका नतीजा बताएगी?" },
      answer: {
        en: "No. It tells you whether the period around your appraisal looks supportive or slower in your chart. The decision itself rests with your organisation.",
        hi: "नहीं। यह बताती है कि आपके अप्रेज़ल के आसपास का समय आपकी कुंडली में अनुकूल दिखता है या धीमा। फ़ैसला आपकी संस्था के हाथ में ही रहता है।",
      },
    },
    {
      question: { en: "Will the report mention how much my salary could increase?", hi: "क्या रिपोर्ट बताएगी कि मेरी सैलरी कितनी बढ़ सकती है?" },
      answer: {
        en: "No. It discusses support for advancement and responsibility, never a salary amount. For pay-focused timing, the Salary Growth report is the closer fit.",
        hi: "नहीं। यह तरक्की और ज़िम्मेदारी के लिए सहयोग की बात करती है, वेतन की रकम की कभी नहीं। वेतन पर केंद्रित समय के लिए 'सैलरी में बढ़ोतरी' रिपोर्ट ज़्यादा उपयुक्त है।",
      },
    },
    {
      question: { en: "How is this different from the Career Growth Delays report?", hi: "यह 'करियर की देरी' रिपोर्ट से कैसे अलग है?" },
      answer: {
        en: "This one asks whether now and the coming months support a step up. The delays report asks why progress has been slow and when that pressure may ease.",
        hi: "यह रिपोर्ट पूछती है कि क्या अभी और आने वाले महीने आगे बढ़ने में साथ देते हैं। देरी वाली रिपोर्ट पूछती है कि प्रगति धीमी क्यों रही और वह दबाव कब कम हो सकता है।",
      },
    },
    {
      question: { en: "What if the present period is slow but a later window is strong?", hi: "अगर अभी का समय धीमा है लेकिन आगे का समय मजबूत है तो?" },
      answer: {
        en: "The report says so plainly and suggests practical preparation for the gap, so your case is ready when the stronger stretch begins.",
        hi: "रिपोर्ट यह साफ़ बताती है और बीच के समय के लिए व्यावहारिक तैयारी सुझाती है, ताकि मजबूत समय शुरू होने पर आपकी बात तैयार रहे।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: [2, 6, 10, 11], transits: ["Jupiter", "Saturn", "Rahu"], remedies: false },
};
