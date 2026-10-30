/**
 * financial_pressure_easing -- grounded in modules/focused_reports/prompt_specs.py
 * (DIAGNOSTIC; income/savings support vs expense and obligation factors with
 * MD/AD and Jupiter/Saturn; describe pressure as persistent, mixed or easing;
 * explain pressure mechanisms and counterweights with budgeting caution; no
 * financial advice or guarantees; remedies=False) and money_business_evidence.py
 * (not in MULTI_YEAR_KEYS -> 12 months).
 */
import type { FocusedReportSeoContent } from "./types";

export const financialPressureEasing: FocusedReportSeoContent = {
  questionKey: "financial_pressure_easing",
  searchIntent:
    "Diagnostic: someone under ongoing money strain (expenses, family obligations, irregular income) asking what is driving it and whether it may ease. Distinct from debt-pressure-easing (loans and repayment specifically) and financial-improvement-timing (when things get better overall).",
  seoTitle: {
    en: "When Will Financial Pressure Ease? Astrology | Jyotishasha",
    hi: "आर्थिक दबाव कब कम होगा? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 personalised report on what is driving your money strain, what is supporting you, and whether the pressure looks persistent, mixed or easing in 12 months.",
    hi: "₹51 की व्यक्तिगत रिपोर्ट: आपके आर्थिक दबाव के पीछे क्या है, क्या सहारा दे रहा है, और 12 महीनों में दबाव लगातार, मिला-जुला या कम होता दिखता है।",
  },
  h1: {
    en: "Financial Pressure: What Is Behind It and When It May Ease",
    hi: "आर्थिक दबाव: इसके पीछे क्या है और यह कब कम हो सकता है",
  },
  intro: {
    en: [
      "Financial pressure is not always about how much you earn. Often the money comes in but goes straight out: rent, school fees, family needs, medical bills, irregular payments. The strain comes from the balance between what supports you and what draws on you, and that balance can shift.",
      "This report examines both sides. It reads the factors in your chart that support income and savings against those linked with expenses and obligations, along with your current Dasha and Jupiter and Saturn, and tells you whether the pressure looks persistent, mixed or easing over the next 12 months.",
    ],
    hi: [
      "आर्थिक दबाव हमेशा इस बात से नहीं होता कि आप कितना कमाते हैं। अक्सर पैसा आता है लेकिन सीधे निकल जाता है: किराया, स्कूल फ़ीस, परिवार की ज़रूरतें, इलाज के बिल, अनियमित भुगतान। दबाव इस संतुलन से आता है कि क्या आपको सहारा देता है और क्या आपसे खींचता है, और यह संतुलन बदल सकता है।",
      "यह रिपोर्ट दोनों पक्षों की जाँच करती है। यह आपकी कुंडली में आमदनी और बचत को सहारा देने वाले कारणों को खर्च और ज़िम्मेदारियों से जुड़े कारणों के सामने रखकर पढ़ती है, साथ में मौजूदा दशा और गुरु व शनि, और बताती है कि अगले 12 महीनों में दबाव लगातार, मिला-जुला या कम होता दिखता है।",
    ],
  },
  analyzes: {
    en: [
      "Chart factors supporting income and savings, set against those connected with expenses and obligations",
      "Which side is currently stronger, and why the present phase feels the way it does",
      "Your running Mahadasha and Antardasha, and whether a sub-period change within 12 months shifts the balance",
      "Jupiter and Saturn from your Lagna as counterweights or added load",
    ],
    hi: [
      "आमदनी और बचत को सहारा देने वाले कुंडली के कारण, खर्च और ज़िम्मेदारियों से जुड़े कारणों के सामने",
      "अभी कौन-सा पक्ष ज़्यादा मजबूत है, और मौजूदा दौर ऐसा क्यों महसूस होता है",
      "आपकी चल रही महादशा और अंतर्दशा, और क्या 12 महीनों के भीतर उप-दशा का बदलाव संतुलन बदलता है",
      "आपके लग्न से गुरु और शनि, सहारे या अतिरिक्त बोझ के रूप में",
    ],
  },
  readingGuide: {
    heading: { en: "Reading persistent, mixed or easing pressure", hi: "लगातार, मिला-जुला या कम होता दबाव कैसे पढ़ें" },
    points: {
      en: [
        "Persistent: the obligation side stays stronger through the period. Planning and a tight budget matter more than waiting.",
        "Mixed: relief and strain alternate. Build a small buffer in the lighter months for the heavier ones.",
        "Easing: support gains ground. Use it to clear the most expensive obligations first rather than expanding spending.",
        "Pressure from a single loan behaves differently; Debt Pressure looks at repayment specifically.",
      ],
      hi: [
        "लगातार: पूरे समय ज़िम्मेदारियों वाला पक्ष ज़्यादा मजबूत रहता है। इंतज़ार से ज़्यादा योजना और कसा हुआ बजट मायने रखता है।",
        "मिला-जुला: राहत और दबाव बारी-बारी से आते हैं। हल्के महीनों में भारी महीनों के लिए थोड़ा बचाकर रखें।",
        "कम होता: सहारा मजबूत होता है। इसका उपयोग खर्च बढ़ाने के बजाय सबसे महँगी ज़िम्मेदारियाँ पहले निपटाने में करें।",
        "किसी एक लोन का दबाव अलग तरह से चलता है; 'कर्ज़ के दबाव' रिपोर्ट खास तौर पर चुकाने को देखती है।",
      ],
    },
  },
  differentiation: {
    en: "Debt Pressure focuses on loans and repayment. Financial Improvement asks when things get better overall. This report diagnoses the strain itself: what is driving it, what is holding you up, and whether the balance is shifting.",
    hi: "'कर्ज़ के दबाव' रिपोर्ट लोन और चुकाने पर केंद्रित है। 'आर्थिक स्थिति में सुधार' पूछती है कि कुल मिलाकर हालात कब बेहतर होंगे। यह रिपोर्ट खुद दबाव का विश्लेषण करती है: इसे क्या चला रहा है, आपको क्या थामे हुए है, और क्या संतुलन बदल रहा है।",
  },
  internalLinks: [
    { path: "/reports/focused/debt-pressure-easing", localized: true, label: { en: "Debt Pressure report (₹51)", hi: "कर्ज़ के दबाव रिपोर्ट (₹51)" } },
    { path: "/reports/focused/financial-improvement-timing", localized: true, label: { en: "Financial Improvement report (₹51)", hi: "आर्थिक स्थिति में सुधार रिपोर्ट (₹51)" } },
    { path: "/reports/financial_stability_report", localized: false, label: { en: "Full Financial Stability Report", hi: "पूरी आर्थिक स्थिरता रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "Identifies what is driving your financial strain and what is supporting you",
      "Says whether the pressure looks persistent, mixed or easing over 12 months",
      "Budgeting caution matched to that pattern",
    ],
    hi: [
      "बताती है कि आपके आर्थिक दबाव के पीछे क्या है और क्या आपको सहारा दे रहा है",
      "बताती है कि 12 महीनों में दबाव लगातार, मिला-जुला या कम होता दिखता है",
      "उसी पैटर्न के हिसाब से बजट की सावधानी",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “When may my financial pressure ease?”. It explains the main factors behind the strain, why this phase feels difficult, and when within 12 months the pressure may lighten.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरा आर्थिक दबाव कब कम हो सकता है?” यह दबाव के मुख्य कारण, यह दौर कठिन क्यों लगता है, और 12 महीनों में दबाव कब हल्का हो सकता है, यह समझाती है।",
    },
    howJyotishApproachesIt: {
      en: "The backend first works out your placements, the houses and lords tied to income, savings, expenses and obligations, your Dasha periods and Jupiter and Saturn dates. The reading weighs support against strain and invents no date.",
      hi: "बैकएंड पहले आपकी ग्रह-स्थितियाँ, आमदनी, बचत, खर्च और ज़िम्मेदारियों से जुड़े भाव और स्वामी, दशा की अवधियाँ और गुरु व शनि की तारीखें निकालता है। विश्लेषण सहारे को दबाव के सामने तौलता है और कोई तारीख नहीं गढ़ता।",
    },
    whoItIsFor: {
      en: "For someone stretched by expenses or family responsibilities, where income is not the only problem, who wants to understand the strain before planning around it.",
      hi: "उन लोगों के लिए जो खर्चों या पारिवारिक ज़िम्मेदारियों से दबे हैं, जहाँ सिर्फ़ आमदनी समस्या नहीं है, और जो योजना बनाने से पहले दबाव को समझना चाहते हैं।",
    },
    whatYouReceive: {
      en: "A PDF of roughly 400 to 500 words covering Direct Answer, Main Astrological Factors, Why This Phase Feels Difficult, When Pressure May Ease, What You Can Do, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF, जिसमें सीधा जवाब, मुख्य ज्योतिषीय कारण, यह समय कठिन क्यों लगता है, दबाव कब कम हो सकता है, आप क्या कर सकते हैं, और सीधी बात शामिल हैं; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It is not financial or debt advice, and it does not tell you to borrow, invest or cut any specific obligation.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह वित्तीय या कर्ज़ संबंधी सलाह नहीं है, और आपको उधार लेने, निवेश करने या कोई खास ज़िम्मेदारी छोड़ने को नहीं कहती।",
    },
  },
  faqs: [
    {
      question: { en: "I earn decently but still feel squeezed. Is this the right report?", hi: "मेरी कमाई ठीक है फिर भी तंगी लगती है। क्या यह सही रिपोर्ट है?" },
      answer: {
        en: "Yes. It is built for that case, where the strain comes from outflow and obligations rather than income alone.",
        hi: "हाँ। यह उसी स्थिति के लिए बनी है, जहाँ दबाव सिर्फ़ आमदनी से नहीं, बल्कि खर्च और ज़िम्मेदारियों से आता है।",
      },
    },
    {
      question: { en: "How is this different from Debt Pressure?", hi: "यह 'कर्ज़ के दबाव' से कैसे अलग है?" },
      answer: {
        en: "Debt Pressure looks at loans and repayment. This report covers general strain from expenses and responsibilities, whether or not you owe money.",
        hi: "'कर्ज़ के दबाव' लोन और चुकाने को देखती है। यह रिपोर्ट खर्च और ज़िम्मेदारियों से होने वाले सामान्य दबाव को देखती है, चाहे आप पर कर्ज़ हो या न हो।",
      },
    },
    {
      question: { en: "What does “mixed” pressure mean?", hi: "“मिला-जुला” दबाव का क्या मतलब है?" },
      answer: {
        en: "Periods of relief and strain alternate. The report explains which months look lighter so you can plan a buffer.",
        hi: "राहत और दबाव के दौर बारी-बारी से आते हैं। रिपोर्ट बताती है कि कौन-से महीने हल्के दिखते हैं ताकि आप थोड़ा बचाकर रख सकें।",
      },
    },
    {
      question: { en: "Does it suggest rituals to reduce the pressure?", hi: "क्या यह दबाव कम करने के लिए कोई अनुष्ठान बताती है?" },
      answer: {
        en: "No. Its suggestions are practical, such as budgeting and prioritising obligations.",
        hi: "नहीं। इसके सुझाव व्यावहारिक हैं, जैसे बजट बनाना और ज़िम्मेदारियों को प्राथमिकता देना।",
      },
    },
  ],
  grounding: { archetype: "DIAGNOSTIC", horizonMonths: 12, houses: null, transits: ["Jupiter", "Saturn"], remedies: false },
};
