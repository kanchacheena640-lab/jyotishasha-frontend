/**
 * natural_strengths -- grounded in modules/focused_reports/prompt_specs.py
 * (life_direction_and_strengths, overview -> DIRECTION; synthesise Lagna,
 * planet sign/house placements and house/lord relationships without numeric
 * strength rankings; tie each tendency to real-life expression while allowing
 * learning and choice; do not add timing without evidence; remedies=False) and
 * life_keys.py (houses 1, 3, 5, 9; horizon None -> natal only, no Dasha or
 * transits, so master_contract.py omits Current Timing Context; natal Sun,
 * Moon, Mercury, Jupiter, Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const naturalStrengths: FocusedReportSeoContent = {
  questionKey: "natural_strengths",
  searchIntent:
    "Self-knowledge, timeless: someone who wants a clear, specific description of the abilities and tendencies their birth chart consistently supports, with no timing. Distinct from major-kundali-strengths (which also reads what the current Dasha activates) and life-direction (where to point those strengths).",
  seoTitle: {
    en: "What Are My Natural Strengths? Astrology | Jyotishasha",
    hi: "मेरी प्राकृतिक ताकतें क्या हैं? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report describing a few natural tendencies your birth chart consistently supports, and how each tends to show up in real life. No timing, no scores.",
    hi: "₹51 की रिपोर्ट: आपकी जन्म कुंडली जिन कुछ स्वाभाविक रुझानों का लगातार समर्थन करती है, और वे असल जीवन में कैसे दिखते हैं। न समय, न अंक।",
  },
  h1: {
    en: "Natural Strengths: What Your Birth Chart Consistently Supports",
    hi: "प्राकृतिक ताकतें: आपकी जन्म कुंडली लगातार किसका समर्थन करती है",
  },
  intro: {
    en: [
      "Most people find it easier to describe their weaknesses than their strengths. Strengths feel ordinary from the inside because they come naturally: the person who calms a room without trying, or the one who sees the flaw in a plan straight away. Naming them clearly is the first step to using them on purpose.",
      "This report reads your birth chart only. It looks at your Lagna and at the 1st, 3rd, 5th and 9th houses and their lords, which relate to temperament, initiative, intelligence and outlook. It adds the sign and house placements of the Sun, Moon, Mercury, Jupiter and Saturn. From that it describes a few tendencies the chart supports consistently, and how each tends to show up in everyday life. There are no scores and no timing: it is a portrait, not a forecast.",
    ],
    hi: [
      "ज़्यादातर लोगों के लिए अपनी कमज़ोरियाँ बताना ताकतें बताने से आसान होता है। ताकतें अंदर से साधारण लगती हैं क्योंकि वे स्वाभाविक रूप से आती हैं: कोई बिना कोशिश कमरे का माहौल शांत कर देता है, कोई योजना की कमी तुरंत देख लेता है। उन्हें साफ़ नाम देना ही उनका जानबूझकर उपयोग करने का पहला कदम है।",
      "यह रिपोर्ट केवल आपकी जन्म कुंडली पढ़ती है। यह आपका लग्न और 1ला, 3रा, 5वाँ और 9वाँ भाव और उनके स्वामी देखती है, जो स्वभाव, पहल, बुद्धि और दृष्टिकोण से जुड़े हैं। इसमें सूर्य, चंद्रमा, बुध, गुरु और शनि की राशि और भाव-स्थिति जुड़ती है। इससे यह कुछ ऐसे रुझान बताती है जिनका कुंडली लगातार समर्थन करती है, और हर एक रोज़मर्रा में कैसे दिखता है। न अंक हैं, न समय: यह एक चित्र है, भविष्यवाणी नहीं।",
    ],
  },
  analyzes: {
    en: [
      "Your Lagna and its lord, as the base of temperament",
      "The 1st, 3rd, 5th and 9th houses and their lords: self, initiative, intelligence and outlook",
      "Sign and house placements of the Sun, Moon, Mercury, Jupiter and Saturn",
      "Tendencies that appear in more than one of these factors, so they are consistent rather than one-off",
    ],
    hi: [
      "आपका लग्न और उसका स्वामी, स्वभाव के आधार के रूप में",
      "1ला, 3रा, 5वाँ और 9वाँ भाव और उनके स्वामी: स्वयं, पहल, बुद्धि और दृष्टिकोण",
      "सूर्य, चंद्रमा, बुध, गुरु और शनि की राशि और भाव-स्थिति",
      "वे रुझान जो इनमें से एक से ज़्यादा कारणों में दिखते हैं, ताकि वे इक्का-दुक्का नहीं, लगातार हों",
    ],
  },
  readingGuide: {
    heading: { en: "Recognising a strength in yourself", hi: "अपने भीतर किसी ताकत को कैसे पहचानें" },
    points: {
      en: [
        "Check each tendency against your own history: when has it shown up, and when did people thank you for it?",
        "A strength can also be overused, for example confidence becoming stubbornness. The report notes the balance point.",
        "Strengths grow with practice. The chart describes inclination, not a fixed limit on what you can learn.",
        "There are no percentages or rankings, because the backend does not produce them and neither does the reading.",
      ],
      hi: [
        "हर रुझान को अपने इतिहास से मिलाएँ: वह कब दिखा, और कब लोगों ने उसके लिए आपको धन्यवाद दिया?",
        "ताकत का ज़रूरत से ज़्यादा उपयोग भी हो सकता है, जैसे आत्मविश्वास का ज़िद बनना। रिपोर्ट संतुलन का बिंदु बताती है।",
        "ताकतें अभ्यास से बढ़ती हैं। कुंडली झुकाव बताती है, यह नहीं कि आप क्या सीख सकते हैं उसकी कोई तय सीमा है।",
        "कोई प्रतिशत या क्रम नहीं है, क्योंकि न बैकएंड उन्हें बनाता है, न विश्लेषण।",
      ],
    },
  },
  differentiation: {
    en: "Major Strengths in Your Kundali also reads which strengths your current Dasha is activating. Life Direction points those tendencies towards broad directions. This report is the timeless portrait: what your birth chart supports, whatever period you are in.",
    hi: "'आपकी कुंडली की प्रमुख शक्तियाँ' यह भी पढ़ती है कि आपकी मौजूदा दशा किन ताकतों को सक्रिय कर रही है। 'जीवन की दिशा' उन रुझानों को बड़ी दिशाओं की ओर मोड़ती है। यह रिपोर्ट समय से परे चित्र है: आपकी जन्म कुंडली किसका समर्थन करती है, चाहे आप किसी भी दौर में हों।",
  },
  internalLinks: [
    { path: "/reports/focused/major-kundali-strengths", localized: true, label: { en: "Major Strengths in Your Kundali report (₹51)", hi: "आपकी कुंडली की प्रमुख शक्तियाँ रिपोर्ट (₹51)" } },
    { path: "/reports/focused/life-direction", localized: true, label: { en: "Life Direction report (₹51)", hi: "जीवन की दिशा रिपोर्ट (₹51)" } },
    { path: "/tools/lagna-finder", localized: true, label: { en: "Free Lagna finder", hi: "मुफ़्त लग्न फ़ाइंडर" } },
  ],
  benefits: {
    en: [
      "A few natural tendencies your birth chart consistently supports",
      "How each one tends to show up in everyday life, and where it can be overused",
      "No scores, no timing: a portrait you can come back to",
    ],
    hi: [
      "कुछ स्वाभाविक रुझान जिनका आपकी जन्म कुंडली लगातार समर्थन करती है",
      "हर एक रोज़मर्रा में कैसे दिखता है, और कहाँ उसका ज़रूरत से ज़्यादा उपयोग हो सकता है",
      "न अंक, न समय: एक चित्र जिस पर आप लौट सकते हैं",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What are my natural strengths?”. It describes a few tendencies the birth chart supports consistently and how each shows up in real life.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरी प्राकृतिक ताकतें क्या हैं?” यह कुछ ऐसे रुझान बताती है जिनका जन्म कुंडली लगातार समर्थन करती है, और हर एक असल जीवन में कैसे दिखता है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates your Lagna, the four houses above with their lords and the five natal placements. No Dasha or transit timing is used, so the reading describes tendencies only and the PDF leaves out its timing section.",
      hi: "बैकएंड आपका लग्न, ऊपर के चार भाव और उनके स्वामी, और पाँच जन्मजात स्थितियाँ गणना करता है। दशा या गोचर का समय उपयोग नहीं होता, इसलिए विश्लेषण केवल रुझान बताता है और PDF में समय वाला हिस्सा नहीं होता।",
    },
    whoItIsFor: {
      en: "For anyone who wants a clearer picture of what they are naturally good at, whether for work, study or simply self-understanding.",
      hi: "हर उस व्यक्ति के लिए जो साफ़ जानना चाहता है कि वह स्वाभाविक रूप से किसमें अच्छा है, चाहे काम के लिए, पढ़ाई के लिए या बस खुद को समझने के लिए।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words under Direct Answer, Natural Strengths and Tendencies, Most Relevant Directions, Practical Focus, and Bottom Line, from your birth details. The Current Timing Context section is omitted because this report has no timing evidence.",
      hi: "लगभग 400 से 500 शब्दों की PDF, इन शीर्षकों में: सीधा जवाब, ताकतें और रुझान, सबसे उपयोगी दिशाएँ, व्यावहारिक ध्यान, और सीधी बात; आपकी जन्म जानकारी से। 'अभी के समय का संदर्भ' वाला हिस्सा नहीं होता, क्योंकि इस रिपोर्ट में समय का प्रमाण नहीं है।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It describes tendencies, not fixed personality labels, ability scores or destiny.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह रुझान बताती है, कोई तय व्यक्तित्व-ठप्पा, क्षमता-अंक या भाग्य नहीं।",
    },
  },
  faqs: [
    {
      question: { en: "How is this different from Major Strengths in Your Kundali?", hi: "यह 'आपकी कुंडली की प्रमुख शक्तियाँ' से कैसे अलग है?" },
      answer: {
        en: "That report also reads which strengths your current period activates. This one stays with the birth chart and has no timing.",
        hi: "वह रिपोर्ट यह भी पढ़ती है कि आपका मौजूदा दौर किन ताकतों को सक्रिय करता है। यह रिपोर्ट जन्म कुंडली तक रहती है और इसमें समय नहीं है।",
      },
    },
    {
      question: { en: "Will it give me a strength score?", hi: "क्या यह मुझे ताकत का अंक देगी?" },
      answer: {
        en: "No. The backend does not rank strengths numerically, so the report describes them in words.",
        hi: "नहीं। बैकएंड ताकतों को अंकों में क्रम नहीं देता, इसलिए रिपोर्ट उन्हें शब्दों में बताती है।",
      },
    },
    {
      question: { en: "What if a strength does not feel like me?", hi: "अगर कोई ताकत मुझे अपनी न लगे तो?" },
      answer: {
        en: "Treat it as a possibility to test. Some strengths are latent until a situation calls for them.",
        hi: "उसे परखने लायक संभावना मानें। कुछ ताकतें तब तक छिपी रहती हैं जब तक कोई स्थिति उन्हें न बुलाए।",
      },
    },
    {
      question: { en: "Does it say which career to choose?", hi: "क्या यह बताती है कि कौन-सा करियर चुनें?" },
      answer: {
        en: "No. For broad directions, see Life Direction; for career specifically, the free career path calculator is a start.",
        hi: "नहीं। बड़ी दिशाओं के लिए 'जीवन की दिशा' देखें; खास तौर पर करियर के लिए मुफ़्त करियर पथ कैलकुलेटर एक शुरुआत है।",
      },
    },
  ],
  grounding: { archetype: "DIRECTION", horizonMonths: null, houses: [1, 3, 5, 9], transits: [], natalPlanets: ["Sun", "Moon", "Mercury", "Jupiter", "Saturn"], remedies: false },
};
