/**
 * foreign_plans_delay_reason -- grounded in modules/focused_reports/prompt_specs.py
 * (DIAGNOSTIC via answer_mode delay_reason; balance natal travel/residence
 * support against present MD/AD and relevant transit pressures; distinguish
 * astrological context from actual administrative obstacles; identify easing
 * only within supported dates; remedies=False), foreign_keys.py (houses 3, 4,
 * 9, 12; 12 months) and foreign_evidence.py (Jupiter, Saturn, Rahu).
 */
import type { FocusedReportSeoContent } from "./types";

export const foreignPlansDelayReason: FocusedReportSeoContent = {
  questionKey: "foreign_plans_delay_reason",
  searchIntent:
    "Diagnostic: someone whose overseas plans keep stalling (applications pending, rejections, repeated postponements) asking what the chart shows about the delay and whether it may ease in the coming year. Distinct from going-abroad-timing (ranking good windows) and foreign-work-timing.",
  seoTitle: {
    en: "Why Are My Plans to Go Abroad Delayed? | Jyotishasha",
    hi: "विदेश जाने में देरी क्यों हो रही है? | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report weighing your chart's travel support against current pressures, to explain why overseas plans are stalling and whether that may ease in 12 months.",
    hi: "₹51 की रिपोर्ट: आपकी कुंडली के यात्रा-सहारे को मौजूदा दबावों के साथ तौलकर बताती है कि विदेश की योजना क्यों रुकी है और क्या 12 महीनों में राहत संभव है।",
  },
  h1: {
    en: "Overseas Plans Delayed: Reading the Pressure Behind the Wait",
    hi: "विदेश की योजना में देरी: इंतज़ार के पीछे के दबाव को समझना",
  },
  intro: {
    en: [
      "Few delays feel as personal as a stalled move abroad. Friends leave, applications sit in a queue, an interview goes well and then nothing happens. It is natural to ask whether something in your chart is holding things back.",
      "This report gives an honest answer in two parts. First, it separates the practical side, such as paperwork, embassy processing and finances, which no chart controls, from the astrological context. Then it weighs the support for travel and residence in your 3rd, 4th, 9th and 12th houses and their lords against the pressure from your current Dasha and from Jupiter, Saturn and Rahu over the next 12 months. It points to easing only where the dated evidence supports it.",
    ],
    hi: [
      "विदेश जाने की रुकी योजना जितनी निजी कुछ ही देरियाँ लगती हैं। दोस्त चले जाते हैं, आवेदन कतार में पड़े रहते हैं, इंटरव्यू अच्छा जाता है और फिर कुछ नहीं होता। यह पूछना स्वाभाविक है कि क्या आपकी कुंडली में कुछ चीज़ों को रोक रहा है।",
      "यह रिपोर्ट दो हिस्सों में ईमानदार जवाब देती है। पहले, यह व्यावहारिक पक्ष, जैसे कागज़ात, दूतावास की प्रक्रिया और पैसे, जिन्हें कोई कुंडली नियंत्रित नहीं करती, ज्योतिषीय संदर्भ से अलग करती है। फिर यह आपके 3रे, 4थे, 9वें और 12वें भाव और उनके स्वामियों में यात्रा और निवास के सहारे को, अगले 12 महीनों में आपकी मौजूदा दशा और गुरु, शनि व राहु के दबाव के साथ तौलती है। यह राहत की बात केवल वहीं करती है जहाँ तारीख-युक्त प्रमाण उसका साथ दे।",
    ],
  },
  analyzes: {
    en: [
      "Natal support for travel and residence in the 3rd, 4th, 9th and 12th houses and their lords",
      "The 4th house side of the picture, which can pull towards staying near home",
      "Your current Mahadasha and Antardasha, and any change of sub-period within 12 months",
      "Jupiter, Saturn and Rahu from your Lagna, as current pressure or relief",
    ],
    hi: [
      "3रे, 4थे, 9वें और 12वें भाव और उनके स्वामियों में यात्रा और निवास का जन्मजात सहारा",
      "तस्वीर का 4थे भाव वाला पक्ष, जो घर के पास रहने की ओर खींच सकता है",
      "आपकी मौजूदा महादशा और अंतर्दशा, और 12 महीनों के भीतर उप-दशा में कोई बदलाव",
      "आपके लग्न से गुरु, शनि और राहु, मौजूदा दबाव या राहत के रूप में",
    ],
  },
  readingGuide: {
    heading: { en: "Separating chart context from paperwork", hi: "कुंडली के संदर्भ को कागज़ी काम से अलग करना" },
    points: {
      en: [
        "List the concrete blockers first: missing documents, test scores, funds, a refused application. These need direct action whatever the chart says.",
        "Treat the astrological reading as context for timing and patience, not as the cause of a rejection.",
        "If pressure looks persistent, use the period to strengthen the application rather than resubmitting the same one.",
        "Easing is mentioned only where the dated evidence supports it. The report never sets a departure date.",
      ],
      hi: [
        "पहले ठोस रुकावटें लिखें: अधूरे कागज़ात, परीक्षा के अंक, पैसे, अस्वीकार हुआ आवेदन। कुंडली कुछ भी कहे, इन पर सीधा काम चाहिए।",
        "ज्योतिषीय विश्लेषण को समय और धैर्य का संदर्भ मानें, किसी अस्वीकृति का कारण नहीं।",
        "अगर दबाव लगातार दिखे, तो वही आवेदन दोबारा भेजने के बजाय इस समय में आवेदन को मज़बूत करें।",
        "राहत की बात केवल वहीं होती है जहाँ तारीख-युक्त प्रमाण साथ दे। रिपोर्ट कभी जाने की तारीख तय नहीं करती।",
      ],
    },
  },
  differentiation: {
    en: "Going Abroad and Working Abroad rank the good windows ahead. This report starts from a delay that is already happening: it separates practical blockers from astrological pressure and says whether that pressure may ease in the coming year.",
    hi: "'विदेश जाने का समय' और 'विदेश में काम' आगे के अच्छे समयों का क्रम बताती हैं। यह रिपोर्ट पहले से हो रही देरी से शुरू होती है: यह व्यावहारिक रुकावटों को ज्योतिषीय दबाव से अलग करती है और बताती है कि आने वाले साल में वह दबाव कम हो सकता है या नहीं।",
  },
  internalLinks: [
    { path: "/reports/focused/going-abroad-timing", localized: true, label: { en: "Going Abroad report (₹51)", hi: "विदेश जाने का समय रिपोर्ट (₹51)" } },
    { path: "/reports/focused/foreign-work-timing", localized: true, label: { en: "Working Abroad report (₹51)", hi: "विदेश में काम रिपोर्ट (₹51)" } },
    { path: "/tools/foreign-travel", localized: true, label: { en: "Foreign travel tool (free)", hi: "विदेश यात्रा टूल (मुफ़्त)" } },
  ],
  benefits: {
    en: [
      "Separates practical blockers from the astrological context of a delay",
      "Weighs your chart's travel support against current pressure",
      "Says whether that pressure may ease within 12 months, only where dates support it",
    ],
    hi: [
      "देरी के ज्योतिषीय संदर्भ को व्यावहारिक रुकावटों से अलग करती है",
      "आपकी कुंडली के यात्रा-सहारे को मौजूदा दबाव के साथ तौलती है",
      "बताती है कि 12 महीनों में दबाव कम हो सकता है या नहीं, केवल वहीं जहाँ तारीखें साथ दें",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Why are my plans to go abroad getting delayed?”. It sets out the main factors, why this phase feels difficult, and whether pressure may ease within 12 months.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरे विदेश जाने के प्लान में देरी क्यों हो रही है?” यह मुख्य कारण, यह दौर कठिन क्यों लगता है, और क्या 12 महीनों में दबाव कम हो सकता है, यह बताती है।",
    },
    howJyotishApproachesIt: {
      en: "Your four travel and residence houses and their lords, your Dasha periods and Jupiter, Saturn and Rahu dates are computed first. The reading weighs support against pressure and adds no date of its own.",
      hi: "आपके यात्रा और निवास के चार भाव और उनके स्वामी, दशा की अवधियाँ और गुरु, शनि व राहु की तारीखें पहले गणना की जाती हैं। विश्लेषण सहारे को दबाव के सामने तौलता है और अपनी ओर से कोई तारीख नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For someone whose study, work or family move abroad keeps getting postponed, and who wants a calm explanation rather than reassurance.",
      hi: "उन लोगों के लिए जिनकी पढ़ाई, काम या परिवार के लिए विदेश जाने की योजना बार-बार टल रही है, और जो दिलासे के बजाय शांत व्याख्या चाहते हैं।",
    },
    whatYouReceive: {
      en: "A PDF of roughly 400 to 500 words: Direct Answer, Main Astrological Factors, Why This Phase Feels Difficult, When Pressure May Ease, What You Can Do, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, मुख्य ज्योतिषीय कारण, यह समय कठिन क्यों लगता है, दबाव कब कम हो सकता है, आप क्या कर सकते हैं, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It cannot explain or overturn an embassy decision and is not visa or immigration advice.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह दूतावास के फ़ैसले की व्याख्या नहीं कर सकती, न उसे बदल सकती है, और वीज़ा या आप्रवासन सलाह नहीं है।",
    },
  },
  faqs: [
    {
      question: { en: "My visa was refused. Will the report say why?", hi: "मेरा वीज़ा अस्वीकार हुआ। क्या रिपोर्ट बताएगी क्यों?" },
      answer: {
        en: "No. A refusal has administrative reasons, usually stated in the decision. The report covers astrological context only.",
        hi: "नहीं। अस्वीकृति के प्रशासनिक कारण होते हैं, जो आमतौर पर फ़ैसले में लिखे होते हैं। रिपोर्ट केवल ज्योतिषीय संदर्भ देखती है।",
      },
    },
    {
      question: { en: "Does it apply to study, work and family moves?", hi: "क्या यह पढ़ाई, काम और परिवार, सभी के लिए है?" },
      answer: {
        en: "Yes. It reads travel and residence factors in general, whatever the purpose of the move.",
        hi: "हाँ। यह जाने का मकसद जो भी हो, सामान्य रूप से यात्रा और निवास के कारण पढ़ती है।",
      },
    },
    {
      question: { en: "Should I stop applying if the pressure looks strong?", hi: "अगर दबाव ज़्यादा दिखे तो क्या आवेदन रोक दूँ?" },
      answer: {
        en: "The report does not tell you to stop. It suggests using a heavier period to strengthen your application before trying again.",
        hi: "रिपोर्ट रुकने को नहीं कहती। यह सुझाती है कि भारी दौर में दोबारा कोशिश से पहले आवेदन को मज़बूत करें।",
      },
    },
    {
      question: { en: "Why only the next 12 months?", hi: "सिर्फ़ अगले 12 महीने क्यों?" },
      answer: {
        en: "For this question the backend supplies 12 months of evidence. For a longer view of good windows, see Going Abroad.",
        hi: "इस सवाल के लिए बैकएंड 12 महीनों का प्रमाण देता है। अच्छे समयों के लंबे नज़रिये के लिए 'विदेश जाने का समय' देखें।",
      },
    },
  ],
  grounding: { archetype: "DIAGNOSTIC", horizonMonths: 12, houses: [3, 4, 9, 12], transits: ["Jupiter", "Saturn", "Rahu"], remedies: false },
};
