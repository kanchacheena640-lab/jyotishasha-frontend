/**
 * relationship_to_marriage_window -- grounded in modules/focused_reports/prompt_specs.py
 * (SINGLE person, marriage_timing intent, when_begins -> TIMING; lens
 * own_relationship; "Read the user's relationship and marriage houses/lords,
 * MD/AD and Jupiter/Saturn context only"; describe personal readiness and
 * supported discussions; do not infer partner consent or turn this into
 * compatibility; remedies=False) and marriage_keys.py (60 months; multi-year
 * MD/AD) / marriage_evidence.py (Jupiter, Saturn). No partner chart is read.
 */
import type { FocusedReportSeoContent } from "./types";

export const relationshipToMarriageWindow: FocusedReportSeoContent = {
  questionKey: "relationship_to_marriage_window",
  searchIntent:
    "Personal timing inside an existing relationship: someone already with a partner asking, from their own chart, when the relationship could move towards marriage. Single-chart only. Distinct from relationship-lead-to-marriage (both charts, potential) and right-time-to-consider-marriage (both charts, current period).",
  seoTitle: {
    en: "When Could My Relationship Lead to Marriage? | Jyotishasha",
    hi: "मेरा रिश्ता शादी की ओर कब बढ़ेगा? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report from your own chart on when your current relationship could move towards marriage in the next five years. Your partner's chart is not used.",
    hi: "₹51 की रिपोर्ट, केवल आपकी कुंडली से: अगले पाँच वर्षों में आपका मौजूदा रिश्ता शादी की ओर कब बढ़ सकता है। आपके साथी की कुंडली का उपयोग नहीं होता।",
  },
  h1: {
    en: "Relationship Towards Marriage: Your Own Timing, Read From Your Chart",
    hi: "रिश्ते से शादी की ओर: आपका अपना समय, आपकी कुंडली से",
  },
  intro: {
    en: [
      "You are already in a relationship and wondering when it could become a marriage. Often only one of you is asking an astrologer, or only one set of birth details is to hand. That is a fair starting point, as long as it is clear what one chart can and cannot say.",
      "This report reads your chart alone: your relationship and marriage houses and their lords, the dated sequence of your Dasha periods over the next five years, and Jupiter and Saturn. It describes when your side looks ready to move the relationship towards marriage and when conversations about it are better supported. It does not read your partner, guess their feelings or assess compatibility.",
    ],
    hi: [
      "आप पहले से किसी रिश्ते में हैं और सोच रहे हैं कि यह शादी में कब बदल सकता है। अक्सर आप दोनों में से केवल एक ही ज्योतिष से पूछ रहा होता है, या केवल एक की जन्म जानकारी उपलब्ध होती है। यह ठीक शुरुआत है, बशर्ते साफ़ हो कि एक कुंडली क्या बता सकती है और क्या नहीं।",
      "यह रिपोर्ट केवल आपकी कुंडली पढ़ती है: आपके रिश्ते और शादी के भाव और उनके स्वामी, अगले पाँच वर्षों का तारीख-युक्त दशा-क्रम, और गुरु व शनि। यह बताती है कि आपकी ओर से रिश्ते को शादी की ओर ले जाने की तैयारी कब दिखती है, और इस पर बातचीत कब ज़्यादा अनुकूल है। यह आपके साथी को नहीं पढ़ती, उनकी भावनाओं का अनुमान नहीं लगाती और तालमेल (compatibility) का आकलन नहीं करती।",
    ],
  },
  analyzes: {
    en: [
      "Your relationship and marriage houses and their lords, in your chart only",
      "The dated Mahadasha and Antardasha sequence of your next five years",
      "Jupiter and Saturn from your Lagna, used only within the stretch their positions are calculated for",
      "When your own readiness and supported conversations line up",
    ],
    hi: [
      "आपके रिश्ते और शादी के भाव और उनके स्वामी, केवल आपकी कुंडली में",
      "आपके अगले पाँच वर्षों का तारीख-युक्त महादशा और अंतर्दशा क्रम",
      "आपके लग्न से गुरु और शनि, केवल उतनी अवधि के भीतर जितनी के लिए उनकी स्थितियों की गणना की गई है",
      "आपकी अपनी तैयारी और अनुकूल बातचीत कब एक साथ आती हैं",
    ],
  },
  readingGuide: {
    heading: { en: "What one chart can tell you about a shared decision", hi: "साझा फ़ैसले के बारे में एक कुंडली क्या बता सकती है" },
    points: {
      en: [
        "Your chart describes your timing and readiness. Marriage also needs your partner's readiness, which this report does not assess.",
        "A supported period is a good time to raise the subject openly and listen, not a signal that the answer will be yes.",
        "Practical matters such as families, finances and where you will live often decide the pace as much as timing does.",
        "If you can share both birth details, the two-chart reports look at you together.",
      ],
      hi: [
        "आपकी कुंडली आपका समय और तैयारी बताती है। शादी के लिए आपके साथी की तैयारी भी चाहिए, जिसका यह रिपोर्ट आकलन नहीं करती।",
        "अनुकूल समय इस विषय को खुलकर उठाने और सुनने के लिए अच्छा है, यह संकेत नहीं कि जवाब हाँ ही होगा।",
        "परिवार, पैसे और कहाँ रहेंगे जैसी व्यावहारिक बातें अक्सर समय जितनी ही रफ़्तार तय करती हैं।",
        "अगर आप दोनों की जन्म जानकारी दे सकते हैं, तो दो-कुंडली वाली रिपोर्टें आपको साथ में देखती हैं।",
      ],
    },
  },
  differentiation: {
    en: "Relationship and Marriage and Considering Marriage Together both read your partner's chart as well as yours. This report uses only your chart, so it speaks to your side of the timing and makes no claim about your partner.",
    hi: "'रिश्ता और शादी' और 'साथ शादी पर विचार' दोनों आपकी कुंडली के साथ आपके साथी की कुंडली भी पढ़ती हैं। यह रिपोर्ट केवल आपकी कुंडली का उपयोग करती है, इसलिए यह समय के आपके पक्ष की बात करती है और आपके साथी के बारे में कोई दावा नहीं करती।",
  },
  internalLinks: [
    { path: "/reports/focused/relationship-lead-to-marriage", localized: true, label: { en: "Relationship and Marriage report, both charts (₹51)", hi: "रिश्ता और शादी रिपोर्ट, दोनों कुंडलियाँ (₹51)" } },
    { path: "/reports/focused/right-time-to-consider-marriage", localized: true, label: { en: "Considering Marriage Together report (₹51)", hi: "साथ शादी पर विचार रिपोर्ट (₹51)" } },
    { path: "/marriage-astrology/love-marriage", localized: true, label: { en: "Love marriage in astrology (free guide)", hi: "ज्योतिष में लव मैरिज (मुफ़्त गाइड)" } },
    { path: "/reports/love_marriage_report", localized: false, label: { en: "Full Love Marriage Report", hi: "पूरी लव मैरिज रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "When your own chart supports moving a current relationship towards marriage",
      "A five-year view built from your Dasha sequence",
      "Clear about what one chart cannot say about your partner",
    ],
    hi: [
      "आपकी अपनी कुंडली मौजूदा रिश्ते को शादी की ओर ले जाने का समर्थन कब करती है",
      "आपके दशा-क्रम से बना पाँच साल का नज़रिया",
      "साफ़ बताती है कि एक कुंडली आपके साथी के बारे में क्या नहीं कह सकती",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “When could my current relationship move towards marriage?”. It reads your present conditions and the first supported window within five years, from your chart only.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरा मौजूदा रिश्ता शादी की ओर कब बढ़ सकता है?” यह केवल आपकी कुंडली से आपकी मौजूदा परिस्थितियाँ और पाँच वर्षों में पहला अनुकूल समय पढ़ती है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates your relationship and marriage houses and lords, your multi-year Dasha sequence and Jupiter and Saturn dates. Only your birth details are entered, and the reading names no date.",
      hi: "बैकएंड आपके रिश्ते और शादी के भाव व स्वामी, कई वर्षों का दशा-क्रम और गुरु व शनि की तारीखें गणना करता है। केवल आपकी जन्म जानकारी ली जाती है, और विश्लेषण कोई तारीख नहीं बताता।",
    },
    whoItIsFor: {
      en: "For someone in a committed relationship who wants to understand their own timing, especially when the partner's birth details are not available.",
      hi: "उन लोगों के लिए जो किसी गंभीर रिश्ते में हैं और अपना समय समझना चाहते हैं, खासकर जब साथी की जन्म जानकारी उपलब्ध न हो।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words: Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not read your partner, infer their consent or judge compatibility, and gives no wedding date.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह आपके साथी को नहीं पढ़ती, उनकी सहमति का अनुमान नहीं लगाती, तालमेल नहीं आँकती, और शादी की कोई तारीख नहीं देती।",
    },
  },
  faqs: [
    {
      question: { en: "Do I need my partner's birth details?", hi: "क्या मुझे साथी की जन्म जानकारी चाहिए?" },
      answer: {
        en: "No. This report uses only yours. If you have both, Relationship and Marriage reads the two charts together.",
        hi: "नहीं। यह रिपोर्ट केवल आपकी जानकारी का उपयोग करती है। अगर दोनों की है, तो 'रिश्ता और शादी' दोनों कुंडलियाँ साथ पढ़ती है।",
      },
    },
    {
      question: { en: "Can it tell me whether my partner wants to marry me?", hi: "क्या यह बता सकती है कि मेरा साथी मुझसे शादी करना चाहता है या नहीं?" },
      answer: {
        en: "No. No chart reading can know another person's wishes. That is a conversation to have with them.",
        hi: "नहीं। कोई भी कुंडली विश्लेषण किसी और की इच्छा नहीं जान सकता। यह उनसे बात करने का विषय है।",
      },
    },
    {
      question: { en: "Is this a compatibility check?", hi: "क्या यह अनुकूलता (compatibility) जाँच है?" },
      answer: {
        en: "No. For how well you match, see Long-Term Compatibility or Kundali Match for Marriage, which use both charts.",
        hi: "नहीं। आप कितना मेल खाते हैं, इसके लिए 'लंबे समय का तालमेल' या 'शादी के लिए कुंडली मिलान' देखें, जो दोनों कुंडलियों का उपयोग करती हैं।",
      },
    },
    {
      question: { en: "How is this different from Marriage Prospects?", hi: "यह 'शादी की संभावनाओं का समय' से कैसे अलग है?" },
      answer: {
        en: "Marriage Prospects is for someone not yet in a relationship. This report assumes a current partner and reads your timing within it.",
        hi: "'शादी की संभावनाओं का समय' उनके लिए है जो अभी किसी रिश्ते में नहीं हैं। यह रिपोर्ट मानकर चलती है कि साथी है, और उसके भीतर आपका समय पढ़ती है।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 60, houses: null, transits: ["Jupiter", "Saturn"], remedies: false },
};
