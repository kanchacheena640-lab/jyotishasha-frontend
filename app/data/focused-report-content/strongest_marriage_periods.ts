/**
 * strongest_marriage_periods -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING; best_windows; in MARRIAGE_MULTI_YEAR_KEYS so MD/AD is swapped for the
 * multi-year LONG_DASHA sequence with Jupiter/Saturn coverage; marriage-related
 * natal placements and house/lord facts with MD/AD and Jupiter/Saturn; rank
 * supported windows and explain their combined support without promising a
 * wedding date; remedies=False) and marriage_keys.py (60 months) /
 * marriage_evidence.py (Jupiter, Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const strongestMarriagePeriods: FocusedReportSeoContent = {
  questionKey: "strongest_marriage_periods",
  searchIntent:
    "Comparative planning: someone open to marriage, often with family involved in the search, who wants the comparatively strongest windows across the next several years ranked. Distinct from marriage-chances-timing (when prospects first open) and marriage-talks-current-period (whether now suits discussions).",
  seoTitle: {
    en: "My Strongest Marriage Periods? Astrology | Jyotishasha",
    hi: "शादी के सबसे मजबूत समय? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 personalised report ranking the windows in your next five years with the strongest combined support for marriage, without promising a wedding date.",
    hi: "₹51 की व्यक्तिगत रिपोर्ट: अगले पाँच वर्षों में शादी के लिए सबसे मजबूत संयुक्त सहारे वाले समयों का क्रम, बिना शादी की तारीख का वादा किए।",
  },
  h1: {
    en: "Marriage Windows: Ranking Your Strongest Periods Ahead",
    hi: "शादी के मजबूत समय: आगे के सबसे मजबूत दौरों का क्रम",
  },
  intro: {
    en: [
      "Families planning a marriage often ask the same thing in different words: is there a stretch ahead that looks especially good? A ranked view helps. It shows where support is strongest, where it is moderate and where it is quieter, so the search does not feel like guesswork.",
      "This report reads the marriage-related placements and houses in your birth chart against the dated sequence of your Dasha periods and Jupiter and Saturn over the next five years. It ranks the windows where these factors line up best and explains what makes one stronger than another. It does not name a wedding date.",
    ],
    hi: [
      "शादी की योजना बना रहे परिवार अक्सर अलग-अलग शब्दों में एक ही बात पूछते हैं: क्या आगे कोई ऐसा समय है जो खास तौर पर अच्छा दिखता है? क्रम वाला नज़रिया मदद करता है। यह दिखाता है कि सहारा कहाँ सबसे मजबूत है, कहाँ मध्यम और कहाँ शांत, ताकि तलाश अंदाज़े जैसी न लगे।",
      "यह रिपोर्ट आपकी जन्म कुंडली की शादी से जुड़ी ग्रह-स्थितियों और भावों को अगले पाँच वर्षों के तारीख-युक्त दशा-क्रम और गुरु व शनि के साथ पढ़ती है। यह उन समयों का क्रम बताती है जहाँ ये कारण सबसे अच्छे से मिलते हैं, और समझाती है कि कोई समय दूसरे से मजबूत क्यों है। यह शादी की कोई तारीख नहीं बताती।",
    ],
  },
  analyzes: {
    en: [
      "Marriage-related placements in your birth chart",
      "The houses and lords connected with marriage and partnership",
      "The dated Mahadasha and Antardasha sequence across the next five years",
      "Jupiter and Saturn from your Lagna, used only within the stretch their positions are calculated for",
    ],
    hi: [
      "आपकी जन्म कुंडली में शादी से जुड़ी ग्रह-स्थितियाँ",
      "शादी और साझेदारी से जुड़े भाव और उनके स्वामी",
      "अगले पाँच वर्षों का तारीख-युक्त महादशा और अंतर्दशा क्रम",
      "आपके लग्न से गुरु और शनि, केवल उतनी अवधि के भीतर जितनी के लिए उनकी स्थितियों की गणना की गई है",
    ],
  },
  readingGuide: {
    heading: { en: "Using a ranked marriage window", hi: "शादी के समयों के क्रम का उपयोग कैसे करें" },
    points: {
      en: [
        "A strong window means the chart's marriage factors are well supported at the same time. It is a good period to be active in the search, not a date.",
        "Combined support is what ranks a window: natal promise, the running Dasha and Jupiter and Saturn all pointing the same way.",
        "Moderate windows are still usable, especially if a suitable match is already in view.",
        "Personal choice and compatibility matter more than any window. The report supports a decision, it does not make one.",
      ],
      hi: [
        "मजबूत समय का मतलब है कि कुंडली के शादी से जुड़े कारणों को एक ही समय पर अच्छा सहारा है। यह तलाश में सक्रिय रहने का अच्छा समय है, कोई तारीख नहीं।",
        "संयुक्त सहारा ही किसी समय का क्रम तय करता है: जन्मजात संभावना, चल रही दशा और गुरु व शनि, सब एक ही दिशा में।",
        "मध्यम समय भी काम के हैं, खासकर अगर कोई उपयुक्त रिश्ता पहले से नज़र में हो।",
        "किसी भी समय से ज़्यादा अहम निजी पसंद और आपसी तालमेल है। रिपोर्ट फ़ैसले में मदद करती है, फ़ैसला नहीं करती।",
      ],
    },
  },
  differentiation: {
    en: "Marriage Prospects asks when chances first begin to open. Marriage Discussions looks only at the present phase. This report compares the whole five-year stretch and ranks its strongest windows.",
    hi: "'शादी की संभावनाओं का समय' पूछती है कि मौके पहली बार कब खुलने लगते हैं। 'शादी की बातचीत' केवल मौजूदा दौर को देखती है। यह रिपोर्ट पूरे पाँच वर्षों की तुलना करती है और उसके सबसे मजबूत समयों का क्रम बताती है।",
  },
  internalLinks: [
    { path: "/reports/focused/marriage-chances-timing", localized: true, label: { en: "Marriage Prospects report (₹51)", hi: "शादी की संभावनाओं का समय रिपोर्ट (₹51)" } },
    { path: "/marriage-astrology/marriage-timing", localized: true, label: { en: "Marriage timing in astrology (free guide)", hi: "ज्योतिष में शादी का समय (मुफ़्त गाइड)" } },
    { path: "/tools/marriage-path", localized: true, label: { en: "Free marriage path calculator", hi: "मुफ़्त विवाह पथ कैलकुलेटर" } },
    { path: "/reports/marriage_report", localized: false, label: { en: "Full Marriage Report", hi: "पूरी विवाह रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "Ranks the windows in the next five years with the strongest marriage support",
      "Explains what makes one window stronger than another",
      "Never presents a window as a wedding date",
    ],
    hi: [
      "अगले पाँच वर्षों में शादी के लिए सबसे मजबूत सहारे वाले समयों का क्रम",
      "समझाती है कि कोई समय दूसरे से मजबूत क्यों है",
      "किसी समय को शादी की तारीख के रूप में नहीं रखती",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “When are my strongest periods for marriage?”. It ranks the supported windows of the next five years and explains the combined support behind each.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरी शादी के लिए सबसे मजबूत समय कब है?” यह अगले पाँच वर्षों के अनुकूल समयों का क्रम बताती है और हर समय के पीछे का संयुक्त सहारा समझाती है।",
    },
    howJyotishApproachesIt: {
      en: "Your marriage-related placements, houses and lords, the multi-year Dasha sequence and Jupiter and Saturn dates are calculated first. The reading ranks only those windows and invents no date.",
      hi: "आपकी शादी से जुड़ी ग्रह-स्थितियाँ, भाव और स्वामी, कई वर्षों का दशा-क्रम और गुरु व शनि की तारीखें पहले गणना की जाती हैं। विश्लेषण केवल उन्हीं समयों का क्रम बताता है और कोई तारीख नहीं गढ़ता।",
    },
    whoItIsFor: {
      en: "For someone ready to marry, or a family supporting the search, who wants to know which stretches ahead look strongest.",
      hi: "उन लोगों के लिए जो शादी के लिए तैयार हैं, या तलाश में साथ दे रहे परिवार के लिए, जो जानना चाहते हैं कि आगे कौन-से दौर सबसे मजबूत दिखते हैं।",
    },
    whatYouReceive: {
      en: "Your PDF runs to about 400 to 500 words: Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from your birth details. The Slower or Watch Period section appears only when your dated evidence supports it.",
      hi: "आपकी PDF लगभग 400 से 500 शब्दों की होती है: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात; आपकी जन्म जानकारी से। 'धीमा या ध्यान रखने वाला समय' वाला हिस्सा तभी आता है जब आपकी तारीख-युक्त जानकारी उसका समर्थन करे।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not predict a wedding date, a particular match or anyone's decision.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह शादी की तारीख, कोई खास रिश्ता या किसी का फ़ैसला नहीं बताती।",
    },
  },
  faqs: [
    {
      question: { en: "Will the report give my marriage year?", hi: "क्या रिपोर्ट मेरी शादी का साल बताएगी?" },
      answer: {
        en: "It ranks windows, which may span months or years, but it never presents one as the year you will marry.",
        hi: "यह समयों का क्रम बताती है, जो महीनों या वर्षों के हो सकते हैं, लेकिन किसी को कभी आपकी शादी के साल के रूप में नहीं रखती।",
      },
    },
    {
      question: { en: "How is this different from Marriage Prospects?", hi: "यह 'शादी की संभावनाओं का समय' से कैसे अलग है?" },
      answer: {
        en: "Marriage Prospects looks for the first opening. This report compares all supported windows in five years and ranks them.",
        hi: "'शादी की संभावनाओं का समय' पहला मौका ढूँढती है। यह रिपोर्ट पाँच वर्षों के सभी अनुकूल समयों की तुलना करके उनका क्रम बताती है।",
      },
    },
    {
      question: { en: "Does it check compatibility with a particular person?", hi: "क्या यह किसी खास व्यक्ति से मिलान देखती है?" },
      answer: {
        en: "No. It reads one chart only. For matching two people, a compatibility reading is the right tool.",
        hi: "नहीं। यह केवल एक कुंडली पढ़ती है। दो लोगों के मिलान के लिए अनुकूलता (कम्पैटिबिलिटी) विश्लेषण सही तरीका है।",
      },
    },
    {
      question: { en: "We already have a proposal. Is this useful?", hi: "हमारे पास पहले से एक रिश्ता है। क्या यह उपयोगी है?" },
      answer: {
        en: "If the question is whether now suits talks, Marriage Discussions is closer. This report suits wider planning.",
        hi: "अगर सवाल यह है कि क्या अभी बातचीत का समय ठीक है, तो 'शादी की बातचीत' ज़्यादा उपयुक्त है। यह रिपोर्ट बड़ी योजना के लिए है।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 60, houses: null, transits: ["Jupiter", "Saturn"], remedies: false },
};
