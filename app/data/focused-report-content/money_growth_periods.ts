/**
 * money_growth_periods -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING; best_windows; in MULTI_YEAR_KEYS so MD/AD is swapped for the full
 * multi-year LONG_DASHA sequence; savings/gains indications and computed
 * wealth yogas with MD/AD and relevant transits; rank supported accumulation
 * windows, separating sustained stability from speculative windfalls;
 * remedies=False) and money_business_evidence.py (MULTI_YEAR_KEYS -> 60 months,
 * Jupiter/Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const moneyGrowthPeriods: FocusedReportSeoContent = {
  questionKey: "money_growth_periods",
  searchIntent:
    "Long-range planning: someone building savings or assets over several years who wants to know which coming phases favour steady accumulation. Distinct from income-increase-timing and financial-improvement-timing (both 12-month), and not a windfall or speculation query.",
  seoTitle: {
    en: "Best Periods for Money Growth? Astrology | Jyotishasha",
    hi: "पैसों की बढ़ोतरी का सबसे अच्छा समय? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 personalised report ranking the phases of your next five years that best support steady saving and building resources, not quick windfalls.",
    hi: "₹51 की व्यक्तिगत रिपोर्ट: आपके अगले पाँच वर्षों के उन दौरों का क्रम जो स्थिर बचत और संसाधन बनाने को सबसे ज़्यादा सहारा देते हैं, अचानक लाभ को नहीं।",
  },
  h1: {
    en: "Money Growth Periods: Your Best Phases for Building Resources",
    hi: "पैसों की बढ़ोतरी के समय: संसाधन बनाने के आपके सबसे अच्छे दौर",
  },
  intro: {
    en: [
      "Wealth rarely comes from one good month. It builds through stretches when income is steady, expenses are manageable and saving actually sticks. Knowing roughly when those stretches fall helps you decide when to save harder, when to build an emergency fund, and when to simply hold steady.",
      "This report reads your savings and gains factors and any wealth yogas against the full sequence of your Dasha periods across the next five years, plus Jupiter and Saturn, and ranks the phases that best support accumulation. It keeps sustained stability separate from short-lived or speculative gains.",
    ],
    hi: [
      "धन शायद ही कभी किसी एक अच्छे महीने से बनता है। यह उन दौरों में बनता है जब आमदनी स्थिर हो, खर्च संभलने लायक हों और बचत सच में टिके। मोटे तौर पर यह जानना कि ऐसे दौर कब आते हैं, यह तय करने में मदद करता है कि कब ज़्यादा बचाएँ, कब आपात फ़ंड बनाएँ, और कब बस स्थिर रहें।",
      "यह रिपोर्ट आपकी बचत और लाभ से जुड़े कारणों और धन योगों को अगले पाँच वर्षों के पूरे दशा-क्रम और गुरु व शनि के साथ पढ़ती है, और उन दौरों का क्रम बताती है जो संचय को सबसे ज़्यादा सहारा देते हैं। यह टिकाऊ स्थिरता को थोड़े समय के या सट्टे वाले लाभ से अलग रखती है।",
    ],
  },
  analyzes: {
    en: [
      "Savings and gains indications through the relevant houses and their lords",
      "Wealth yogas computed for your chart, mentioned only if they are formed",
      "The full dated Mahadasha and Antardasha sequence over the next five years",
      "Jupiter and Saturn from your Lagna, used only for the stretch their calculated positions cover",
    ],
    hi: [
      "बचत और लाभ के संकेत, संबंधित भावों और उनके स्वामियों के ज़रिए",
      "आपकी कुंडली के लिए गणना किए गए धन योग, केवल तभी बताए जाते हैं जब वे बनते हों",
      "अगले पाँच वर्षों का तारीख-युक्त पूरा महादशा और अंतर्दशा क्रम",
      "आपके लग्न से गुरु और शनि, केवल उतनी अवधि के लिए जितनी उनकी गणना की गई स्थितियाँ कवर करती हैं",
    ],
  },
  readingGuide: {
    heading: { en: "Accumulation, not windfalls", hi: "संचय, अचानक लाभ नहीं" },
    points: {
      en: [
        "A strong accumulation phase is one where saving is easier to sustain, not one where money suddenly appears.",
        "Use the stronger phases to automate savings and build a buffer; use the slower ones to protect what is already there.",
        "The report explicitly separates stable growth from speculative-looking periods and does not encourage trading or betting on them.",
        "Five years is the limit of the evidence. The report does not rank years beyond it.",
      ],
      hi: [
        "मज़बूत संचय वाला दौर वह है जिसमें बचत बनाए रखना आसान हो, न कि वह जिसमें अचानक पैसा आ जाए।",
        "मज़बूत दौरों में बचत को नियमित बनाएँ और बफ़र तैयार करें; धीमे दौरों में जो पहले से है उसे सुरक्षित रखें।",
        "रिपोर्ट साफ़ तौर पर स्थिर बढ़ोतरी को सट्टे जैसे दिखने वाले समय से अलग करती है और उन पर ट्रेडिंग या दाँव को बढ़ावा नहीं देती।",
        "पाँच साल प्रमाण की सीमा है। रिपोर्ट उससे आगे के वर्षों का क्रम नहीं बताती।",
      ],
    },
  },
  differentiation: {
    en: "Income Increase and Financial Improvement both look at the coming 12 months. This report covers five years and ranks phases for building resources over time, which suits savings goals and long-term planning.",
    hi: "'आमदनी में बढ़ोतरी' और 'आर्थिक स्थिति में सुधार' दोनों आने वाले 12 महीनों को देखती हैं। यह रिपोर्ट पाँच वर्षों को देखती है और समय के साथ संसाधन बनाने के लिए दौरों का क्रम बताती है, जो बचत के लक्ष्यों और लंबी योजना के लिए उपयुक्त है।",
  },
  internalLinks: [
    { path: "/reports/focused/income-increase-timing", localized: true, label: { en: "Income Increase report (₹51)", hi: "आमदनी में बढ़ोतरी रिपोर्ट (₹51)" } },
    { path: "/reports/focused/financial-improvement-timing", localized: true, label: { en: "Financial Improvement report (₹51)", hi: "आर्थिक स्थिति में सुधार रिपोर्ट (₹51)" } },
    { path: "/tools/dhan-yog", localized: true, label: { en: "Free Dhan Yog calculator", hi: "मुफ़्त धन योग कैलकुलेटर" } },
    { path: "/reports/financial_stability_report", localized: false, label: { en: "Full Financial Stability Report", hi: "पूरी आर्थिक स्थिरता रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "Ranks the phases of the next five years that best support building resources",
      "Separates sustained stability from speculative or short-lived gains",
      "Helps plan when to save harder and when to protect what you have",
    ],
    hi: [
      "अगले पाँच वर्षों के उन दौरों का क्रम जो संसाधन बनाने को सबसे ज़्यादा सहारा देते हैं",
      "टिकाऊ स्थिरता को सट्टे वाले या थोड़े समय के लाभ से अलग करती है",
      "कब ज़्यादा बचाएँ और कब जो है उसे सुरक्षित रखें, इसकी योजना में मदद",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Which coming periods are best for money growth?”. It ranks the supported accumulation phases of the next five years and explains what makes one steadier than another.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “पैसों की बढ़ोतरी के लिए आने वाले कौन-से समय सबसे अच्छे हैं?” यह अगले पाँच वर्षों के अनुकूल संचय वाले दौरों का क्रम बताती है और समझाती है कि कोई दौर दूसरे से ज़्यादा स्थिर क्यों है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates your placements, savings and gains houses and lords, wealth yogas, the multi-year Dasha sequence and Jupiter and Saturn dates. The reading ranks those phases and adds nothing outside them.",
      hi: "बैकएंड आपकी ग्रह-स्थितियाँ, बचत और लाभ के भाव व स्वामी, धन योग, कई वर्षों का दशा-क्रम और गुरु व शनि की तारीखें गणना करता है। विश्लेषण उन्हीं दौरों का क्रम बताता है और उनके बाहर कुछ नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For someone with a multi-year money goal, such as a house deposit, a child's education fund or simply a real safety net, who wants to time their effort.",
      hi: "उन लोगों के लिए जिनका कई वर्षों का पैसों का लक्ष्य है, जैसे घर का डाउन पेमेंट, बच्चे की पढ़ाई का फ़ंड या बस एक असली सुरक्षा कवच, और जो अपनी मेहनत का समय तय करना चाहते हैं।",
    },
    whatYouReceive: {
      en: "Your PDF has about 400 to 500 words across Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from your birth details.",
      hi: "आपकी PDF में लगभग 400 से 500 शब्द होते हैं, इन हिस्सों में: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It is not investment advice, names no amounts, and does not recommend any product, trade or purchase.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह निवेश सलाह नहीं है, कोई राशि नहीं बताती, और किसी उत्पाद, ट्रेड या खरीदारी की सिफ़ारिश नहीं करती।",
    },
  },
  faqs: [
    {
      question: { en: "Will this tell me when I might win money or get lucky?", hi: "क्या यह बताएगी कि कब पैसा जीत सकता/सकती हूँ या किस्मत चमकेगी?" },
      answer: {
        en: "No. It is about steady accumulation. Periods that look speculative are flagged as such, not recommended.",
        hi: "नहीं। यह स्थिर संचय के बारे में है। सट्टे जैसे दिखने वाले समय को उसी रूप में बताया जाता है, उनकी सिफ़ारिश नहीं की जाती।",
      },
    },
    {
      question: { en: "How is this different from Income Increase?", hi: "यह 'आमदनी में बढ़ोतरी' से कैसे अलग है?" },
      answer: {
        en: "Income Increase looks at inflow over the next 12 months. This report looks at building resources across five years.",
        hi: "'आमदनी में बढ़ोतरी' अगले 12 महीनों में आमदनी देखती है। यह रिपोर्ट पाँच वर्षों में संसाधन बनाने को देखती है।",
      },
    },
    {
      question: { en: "Should I invest during the strongest phase?", hi: "क्या सबसे मज़बूत दौर में निवेश करना चाहिए?" },
      answer: {
        en: "The report does not give investment advice. It describes when saving and building are better supported; specific choices belong with a qualified adviser.",
        hi: "रिपोर्ट निवेश सलाह नहीं देती। यह बताती है कि बचत और संसाधन बनाना कब ज़्यादा अनुकूल है; खास फ़ैसले किसी योग्य सलाहकार के साथ लें।",
      },
    },
    {
      question: { en: "I run a business. Is this the right report?", hi: "मेरा बिज़नेस है। क्या यह सही रिपोर्ट है?" },
      answer: {
        en: "It reads personal resources. For the business itself, Business Expansion or Business Growth are closer fits.",
        hi: "यह व्यक्तिगत संसाधन पढ़ती है। बिज़नेस के लिए 'बिज़नेस बढ़ाने का समय' या 'बिज़नेस की बढ़ोतरी' ज़्यादा उपयुक्त हैं।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 60, houses: null, transits: ["Jupiter", "Saturn"], remedies: false },
};
