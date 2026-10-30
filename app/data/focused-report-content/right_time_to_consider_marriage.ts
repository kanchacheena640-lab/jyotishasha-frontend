/**
 * right_time_to_consider_marriage -- grounded in modules/focused_reports/prompt_specs.py
 * (DUAL, current_period -> TIMING; combine separately attributed natal
 * compatibility with each person's MD/AD and Jupiter/Saturn timing context;
 * distinguish compatible charts from synchronized readiness and useful
 * discussions; remedies=False), relationship_keys.py (houses 2, 5, 7, 11;
 * kootas graha_maitri, gana, bhakoot; in RELATIONSHIP_TIMING_KEYS -> 12 months)
 * and relationship_evidence.py (both charts; aligned Jupiter/Saturn horizons).
 */
import type { FocusedReportSeoContent } from "./types";

export const rightTimeToConsiderMarriage: FocusedReportSeoContent = {
  questionKey: "right_time_to_consider_marriage",
  searchIntent:
    "Shared present-moment timing: a couple asking whether now is a supportive period for both of them to think seriously about marriage. Distinct from relationship-lead-to-marriage (whether the charts support marriage at all) and relationship-to-marriage-window (one person's chart over several years).",
  seoTitle: {
    en: "Is Now the Right Time for Us to Marry? | Jyotishasha",
    hi: "क्या अभी हमारे लिए शादी का सही समय है? | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report reading both your charts to see whether the current period supports considering marriage together, and when you are both in step in 12 months.",
    hi: "₹51 की रिपोर्ट, दोनों कुंडलियों से: क्या मौजूदा समय साथ मिलकर शादी पर विचार करने के लिए अनुकूल है, और 12 महीनों में आप दोनों कब एक लय में हैं।",
  },
  h1: {
    en: "Considering Marriage Together: Are You Both in Step Right Now?",
    hi: "साथ शादी पर विचार: क्या आप दोनों अभी एक लय में हैं?",
  },
  intro: {
    en: [
      "Two people can suit each other well and still not be ready at the same moment. One may be settling a career, the other dealing with family pressure. Compatibility answers whether you fit; timing answers whether now is the time for both of you.",
      "This report reads both charts. It looks at each person's 2nd, 5th, 7th and 11th houses and their lords and three Ashtakoot components, Graha Maitri, Gana and Bhakoot, as the background. Then it compares each person's current Dasha and Jupiter and Saturn across the same next 12 months, to see whether your periods line up for considering marriage together, and when conversations look most useful.",
    ],
    hi: [
      "दो लोग एक-दूसरे के लिए बहुत अच्छे हो सकते हैं, फिर भी एक ही समय पर तैयार न हों। एक करियर सँभाल रहा हो, दूसरा पारिवारिक दबाव झेल रहा हो। तालमेल बताता है कि आप मेल खाते हैं या नहीं; समय बताता है कि क्या अभी आप दोनों के लिए सही समय है।",
      "यह रिपोर्ट दोनों कुंडलियाँ पढ़ती है। पृष्ठभूमि के रूप में यह हर व्यक्ति का 2रा, 5वाँ, 7वाँ और 11वाँ भाव और उनके स्वामी, और तीन अष्टकूट घटक, ग्रह मैत्री, गण और भकूट, देखती है। फिर यह अगले उन्हीं 12 महीनों में हर व्यक्ति की मौजूदा दशा और गुरु व शनि की तुलना करती है, ताकि देखा जा सके कि क्या आपके दौर साथ मिलकर शादी पर विचार करने के लिए मेल खाते हैं, और बातचीत कब सबसे उपयोगी दिखती है।",
    ],
  },
  analyzes: {
    en: [
      "Each person's current Mahadasha and Antardasha, and any change within the same 12 months",
      "Jupiter and Saturn from each person's Lagna over that shared period",
      "The 2nd, 5th, 7th and 11th houses and their lords in both charts, as background",
      "Three Ashtakoot components: Graha Maitri, Gana and Bhakoot",
    ],
    hi: [
      "हर व्यक्ति की मौजूदा महादशा और अंतर्दशा, और उन्हीं 12 महीनों में कोई बदलाव",
      "उस साझा अवधि में हर व्यक्ति के लग्न से गुरु और शनि",
      "दोनों कुंडलियों में 2रा, 5वाँ, 7वाँ और 11वाँ भाव और उनके स्वामी, पृष्ठभूमि के रूप में",
      "तीन अष्टकूट घटक: ग्रह मैत्री, गण और भकूट",
    ],
  },
  readingGuide: {
    heading: { en: "Compatible charts versus synchronised readiness", hi: "मेल खाती कुंडलियाँ बनाम एक साथ तैयारी" },
    points: {
      en: [
        "Compatible charts mean you fit. Synchronised readiness means both of you are in supportive periods at the same time. The report keeps these apart.",
        "If only one of you is in a supportive phase, that is usually a time for open conversations rather than formal steps.",
        "When both periods line up, it is a useful time to involve families and talk through practical plans.",
        "Either person can still decide differently. The report describes conditions; it never decides for you.",
      ],
      hi: [
        "मेल खाती कुंडलियों का मतलब है आप एक-दूसरे के लिए ठीक हैं। एक साथ तैयारी का मतलब है आप दोनों एक ही समय पर अनुकूल दौर में हैं। रिपोर्ट इन्हें अलग रखती है।",
        "अगर आप में से केवल एक अनुकूल दौर में है, तो आमतौर पर यह औपचारिक कदमों के बजाय खुली बातचीत का समय होता है।",
        "जब दोनों के दौर मेल खाते हैं, तो परिवारों को शामिल करने और व्यावहारिक योजनाओं पर बात करने का यह उपयोगी समय है।",
        "कोई भी व्यक्ति फिर भी अलग फ़ैसला कर सकता है। रिपोर्ट परिस्थितियाँ बताती है; आपके लिए फ़ैसला कभी नहीं करती।",
      ],
    },
  },
  differentiation: {
    en: "Relationship and Marriage asks whether your charts support the relationship becoming a marriage at all. Relationship Towards Marriage reads one person's chart over several years. This report asks whether now, for both of you, is a good time to consider it together.",
    hi: "'रिश्ता और शादी' पूछती है कि क्या आपकी कुंडलियाँ रिश्ते के शादी बनने का साथ देती हैं। 'रिश्ते से शादी की ओर' एक व्यक्ति की कुंडली कई वर्षों के लिए पढ़ती है। यह रिपोर्ट पूछती है कि क्या अभी, आप दोनों के लिए, साथ मिलकर इस पर विचार करने का अच्छा समय है।",
  },
  internalLinks: [
    { path: "/reports/focused/relationship-lead-to-marriage", localized: true, label: { en: "Relationship and Marriage report (₹51)", hi: "रिश्ता और शादी रिपोर्ट (₹51)" } },
    { path: "/reports/focused/relationship-to-marriage-window", localized: true, label: { en: "Relationship Towards Marriage report, one chart (₹51)", hi: "रिश्ते से शादी की ओर रिपोर्ट, एक कुंडली (₹51)" } },
    { path: "/marriage-astrology/marriage-timing", localized: true, label: { en: "Marriage timing in astrology (free guide)", hi: "ज्योतिष में शादी का समय (मुफ़्त गाइड)" } },
  ],
  benefits: {
    en: [
      "Reads both of your birth charts and compares your current periods over the same 12 months",
      "Separates fitting well from being ready at the same time",
      "Points to when conversations and family involvement look most useful",
    ],
    hi: [
      "आप दोनों की जन्म कुंडलियाँ पढ़कर अगले उन्हीं 12 महीनों में मौजूदा दौरों की तुलना",
      "अच्छे मेल को एक ही समय पर तैयार होने से अलग करती है",
      "बताती है कि बातचीत और परिवार को शामिल करना कब सबसे उपयोगी दिखता है",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Is this a supportive period for us to think about marriage?”. It assesses both people's present periods first, then compares useful windows within 12 months.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “क्या यह समय हमारे शादी के बारे में सोचने के लिए अनुकूल है?” यह पहले दोनों लोगों के मौजूदा दौरों का आकलन करती है, फिर 12 महीनों के भीतर उपयोगी समयों की तुलना करती है।",
    },
    howJyotishApproachesIt: {
      en: "You enter both people's birth details. The backend calculates both charts, the koota results, and each person's Dasha and Jupiter and Saturn dates over the same period; the reading names no date.",
      hi: "आप दोनों लोगों की जन्म जानकारी देते हैं। बैकएंड दोनों कुंडलियाँ, कूट के नतीजे, और उसी अवधि में हर व्यक्ति की दशा व गुरु-शनि की तारीखें गणना करता है; विश्लेषण कोई तारीख नहीं बताता।",
    },
    whoItIsFor: {
      en: "For a couple who already feel right for each other and are now wondering whether the timing is right for both of them.",
      hi: "उस जोड़े के लिए जो पहले से एक-दूसरे को सही मानता है और अब सोच रहा है कि क्या समय भी दोनों के लिए सही है।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words with Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from both people's birth details. The Slower or Watch Period section appears only when your dated evidence supports it.",
      hi: "लगभग 400 से 500 शब्दों की PDF, जिसमें सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात शामिल हैं; दोनों लोगों की जन्म जानकारी से। 'धीमा या ध्यान रखने वाला समय' वाला हिस्सा तभी आता है जब आपकी तारीख-युक्त जानकारी उसका समर्थन करे।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not decide whether you should marry, sets no date and cannot speak for either person's wishes.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह तय नहीं करती कि आपको शादी करनी चाहिए या नहीं, कोई तारीख नहीं देती और किसी भी व्यक्ति की इच्छा की ओर से नहीं बोल सकती।",
    },
  },
  faqs: [
    {
      question: { en: "We are compatible. Why might the timing still be off?", hi: "हम मेल खाते हैं। फिर भी समय ठीक क्यों न हो?" },
      answer: {
        en: "Because each of you runs a different Dasha. One of you may be in a demanding phase even if the match itself is good.",
        hi: "क्योंकि आप दोनों की दशाएँ अलग चलती हैं। मिलान अच्छा होने पर भी आप में से एक किसी कठिन दौर में हो सकता है।",
      },
    },
    {
      question: { en: "What if only one of us is in a supportive period?", hi: "अगर हम में से केवल एक अनुकूल दौर में हो तो?" },
      answer: {
        en: "The report says so and suggests using the time for open discussion, with more formal steps when both periods align.",
        hi: "रिपोर्ट यह बताती है और उस समय को खुली बातचीत में लगाने का सुझाव देती है, और दोनों के दौर मिलने पर ज़्यादा औपचारिक कदम।",
      },
    },
    {
      question: { en: "Does it work for an arranged match we are considering?", hi: "क्या यह उस अरेंज्ड रिश्ते के लिए भी है जिस पर हम विचार कर रहे हैं?" },
      answer: {
        en: "Yes, if you have both birth details. For the full koota match, Kundali Match for Marriage is the closer fit.",
        hi: "हाँ, अगर आपके पास दोनों की जन्म जानकारी है। पूरे कूट मिलान के लिए 'शादी के लिए कुंडली मिलान' ज़्यादा उपयुक्त है।",
      },
    },
    {
      question: { en: "Why only 12 months?", hi: "सिर्फ़ 12 महीने क्यों?" },
      answer: {
        en: "The backend aligns both people's timing over the same 12-month period, and the report stays within it.",
        hi: "बैकएंड दोनों लोगों के समय को उसी 12 महीनों की अवधि पर मिलाता है, और रिपोर्ट उसी के भीतर रहती है।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: [2, 5, 7, 11], transits: ["Jupiter", "Saturn"], remedies: false },
};
