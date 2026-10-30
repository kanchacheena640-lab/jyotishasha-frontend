/**
 * major_kundali_strengths (bespoke tier; attached to FOCUSED_REPORTS_CONFIG, not the content registry) --
 * grounded in modules/focused_reports/prompt_specs.py (kundali_strengths -> STRENGTHS_NOW; whole-chart
 * house/lord facts and existing career/wealth yogas for birth-chart strengths, current MD/AD and
 * Jupiter/Saturn/Rahu transits for which are active now; 2-4 strengths only; never claim a strength
 * guarantees an outcome; remedies=False), master_contract.py (STRENGTHS_NOW sections) and life_keys.py
 * (12 months; all 12 houses; all 9 natal planets; transits Jupiter, Saturn, Rahu).
 */
import type { FocusedReportSeoContent } from "./types";

export const majorKundaliStrengths: FocusedReportSeoContent = {
  questionKey: "major_kundali_strengths",
  searchIntent:
    "Whole-chart strengths with current activation: someone who wants to know the few strongest areas across their entire birth chart and which of them the present Dasha is switching on, so they can lean on them this year. Distinct from natural-strengths (natal-only, no timing) and focus-to-use-strengths (priorities from five houses).",
  seoTitle: {
    en: "Major Strengths in Your Kundali | Jyotishasha",
    hi: "आपकी कुंडली की प्रमुख शक्तियाँ | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report naming the 2–4 strengths that stand out in your whole birth chart, which your current Dasha is activating, and how to use them this year.",
    hi: "₹51 की रिपोर्ट: आपकी पूरी जन्म कुंडली की 2–4 सबसे मजबूत बातें, उनमें से कौन-सी मौजूदा दशा में सक्रिय हैं, और इस साल उनका सही इस्तेमाल।",
  },
  h1: {
    en: "Major Strengths in Your Kundali: Your Best Assets, and Which Are Active Now",
    hi: "आपकी कुंडली की प्रमुख शक्तियाँ: आपकी सबसे बड़ी पूँजी, और अभी क्या सक्रिय है",
  },
  intro: {
    en: [
      "Everyone has a few things their chart supports unusually well: a steady mind under pressure, a gift for building relationships, an instinct for money or for teaching. But a strength that is always present is not always equally switched on. Some years bring one of them to the front.",
      "This report finds both layers across your whole birth chart. It reads all twelve houses and their lords, all nine natal planets and the career and wealth yogas present, to name the 2–4 strengths that genuinely stand out. It then checks which of them your Mahadasha and Antardasha over the next 12 months, together with Jupiter, Saturn and Rahu, are actively supporting, and suggests how to use them now.",
    ],
    hi: [
      "हर किसी के पास कुछ ऐसी बातें होती हैं जिनका उसकी कुंडली ख़ास तौर पर साथ देती है: दबाव में स्थिर मन, रिश्ते बनाने की कला, पैसे या पढ़ाने की समझ। लेकिन जो ताकत हमेशा मौजूद है, वह हमेशा बराबर सक्रिय नहीं होती। कुछ साल उनमें से किसी एक को आगे ले आते हैं।",
      "यह रिपोर्ट पूरी जन्म कुंडली में ये दोनों परतें ढूँढती है। यह सभी बारह भाव और उनके स्वामी, सभी नौ जन्मजात ग्रह और मौजूद करियर व धन योग पढ़कर वे 2–4 ताकतें बताती है जो सच में उभरती हैं। फिर यह देखती है कि अगले 12 महीनों की महादशा और अंतर्दशा, गुरु, शनि और राहु के साथ, उनमें से किसका अभी सक्रिय रूप से साथ दे रही हैं, और उनका अभी उपयोग कैसे करें, यह सुझाती है।",
    ],
  },
  analyzes: {
    en: [
      "All twelve houses and their lords, to find where the chart is strongest",
      "The Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu as placed at birth",
      "Career and wealth yogas present in your chart, cited only where they are formed",
      "Your Mahadasha and Antardasha over the next 12 months, with Jupiter, Saturn and Rahu, to see which strengths are currently active",
    ],
    hi: [
      "सभी बारह भाव और उनके स्वामी, यह ढूँढने के लिए कि कुंडली कहाँ सबसे मजबूत है",
      "जन्म के समय सूर्य, चंद्रमा, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु की स्थिति",
      "आपकी कुंडली में मौजूद करियर और धन योग, केवल वहीं जहाँ वे बनते हों",
      "अगले 12 महीनों की महादशा और अंतर्दशा, गुरु, शनि और राहु के साथ, यह देखने के लिए कि कौन-सी ताकतें अभी सक्रिय हैं",
    ],
  },
  readingGuide: {
    heading: { en: "Lasting strengths and active strengths", hi: "टिकाऊ ताकतें और सक्रिय ताकतें" },
    points: {
      en: [
        "A birth-chart strength is something you can rely on in any year. An active strength is one your current period is amplifying.",
        "Put new effort behind the active strengths first; they are where results usually come with the least friction.",
        "The guidance is concrete, such as a skill to develop, a role to take on or a habit to keep, not generic motivation.",
        "Strengths describe tendencies. The report never claims one guarantees a result, and it gives no scores.",
      ],
      hi: [
        "जन्मजात ताकत वह है जिस पर आप किसी भी साल भरोसा कर सकते हैं। सक्रिय ताकत वह है जिसे आपका मौजूदा दौर बढ़ा रहा है।",
        "नई मेहनत पहले सक्रिय ताकतों पर लगाएँ; आमतौर पर वहीं सबसे कम रुकावट के साथ नतीजे आते हैं।",
        "मार्गदर्शन ठोस है, जैसे कोई कौशल निखारना, कोई भूमिका लेना या कोई आदत बनाए रखना, कोई आम प्रेरक बात नहीं।",
        "ताकतें रुझान बताती हैं। रिपोर्ट कभी दावा नहीं करती कि कोई ताकत नतीजे की गारंटी है, और कोई अंक नहीं देती।",
      ],
    },
  },
  differentiation: {
    en: "Natural Strengths is natal-only: it describes tendencies from five factors with no timing. Putting Strengths to Work turns five houses into this year's priorities. This report reads the whole chart and adds which strengths your current Dasha and transits are activating right now.",
    hi: "'प्राकृतिक ताकतें' केवल जन्मजात है: यह बिना समय के पाँच कारणों से रुझान बताती है। 'ताकतों का सही इस्तेमाल' पाँच भावों को इस साल की प्राथमिकताओं में बदलती है। यह रिपोर्ट पूरी कुंडली पढ़ती है और यह भी बताती है कि आपकी मौजूदा दशा और गोचर अभी किन ताकतों को सक्रिय कर रहे हैं।",
  },
  internalLinks: [
    { path: "/reports/focused/natural-strengths", localized: true, label: { en: "Natural Strengths report (₹51)", hi: "प्राकृतिक ताकतें रिपोर्ट (₹51)" } },
    { path: "/reports/focused/focus-to-use-strengths", localized: true, label: { en: "Putting Strengths to Work report (₹51)", hi: "ताकतों का सही इस्तेमाल रिपोर्ट (₹51)" } },
    { path: "/reports/focused/major-kundali-obstacles", localized: true, label: { en: "Major Obstacles in Your Kundali report (₹51)", hi: "आपकी कुंडली की प्रमुख बाधाएँ रिपोर्ट (₹51)" } },
  ],
  benefits: {
    en: [
      "Identifies the 2–4 strongest, most usable areas across your whole birth chart",
      "Shows which of those strengths your current Dasha and transits are actively supporting right now",
      "Practical guidance for using your active strengths in this window, not generic motivation",
      "Unlike a natal-only reading, it covers your birth strengths plus what is active today",
    ],
    hi: [
      "आपकी पूरी जन्म कुंडली के 2–4 सबसे मजबूत और उपयोगी क्षेत्र बताती है",
      "बताती है कि उनमें से किन ताकतों का आपकी मौजूदा दशा और गोचर अभी सक्रिय रूप से साथ दे रहे हैं",
      "इस समय सक्रिय ताकतों के उपयोग का व्यावहारिक मार्गदर्शन, कोई आम प्रेरक बात नहीं",
      "केवल जन्मजात विश्लेषण से अलग: जन्मजात ताकतों के साथ यह भी बताती है कि आज क्या सक्रिय है",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What are the strongest areas of my birth chart, which strengths are active now, and how can I use them effectively?”. It names the few strengths that stand out and marks which are currently active over the next 12 months.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरी जन्म कुंडली की प्रमुख शक्तियाँ क्या हैं, वर्तमान समय में कौन-सी शक्तियाँ सक्रिय हैं और उनका सर्वोत्तम उपयोग कैसे करूँ?” यह उभरने वाली कुछ ताकतें बताती है और अगले 12 महीनों में कौन-सी सक्रिय हैं, यह दिखाती है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates all twelve houses and their lords, the nine natal planets, existing career and wealth yogas, your Dasha periods and the Jupiter, Saturn and Rahu dates. The reading keeps durable strengths apart from currently active ones and names no score.",
      hi: "बैकएंड सभी बारह भाव और उनके स्वामी, नौ जन्मजात ग्रह, मौजूद करियर और धन योग, आपकी दशा की अवधियाँ और गुरु, शनि व राहु की तारीखें गणना करता है। विश्लेषण टिकाऊ ताकतों को अभी सक्रिय ताकतों से अलग रखता है और कोई अंक नहीं देता।",
    },
    whoItIsFor: {
      en: "For someone who wants to know not only what they are good at, but which of those strengths this period favours, and how to make practical use of it.",
      hi: "उन लोगों के लिए जो सिर्फ़ यह नहीं जानना चाहते कि वे किसमें अच्छे हैं, बल्कि यह भी कि यह दौर उनमें से किसका साथ देता है, और उसका व्यावहारिक उपयोग कैसे करें।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words: Direct Answer, Birth Chart Strengths, Currently Active Strengths, How To Use Them Now, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, कुंडली की जन्मजात शक्तियाँ, अभी सक्रिय शक्तियाँ, अभी इनका इस्तेमाल कैसे करें, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It describes tendencies and supported strengths, gives no ability score or ranking, and never claims a strength guarantees a result.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह रुझान और समर्थित ताकतें बताती है, कोई क्षमता-अंक या क्रम नहीं देती, और कभी दावा नहीं करती कि कोई ताकत नतीजे की गारंटी है।",
    },
  },
  faqs: [
    {
      question: { en: "How is this different from Natural Strengths?", hi: "यह 'प्राकृतिक ताकतें' से कैसे अलग है?" },
      answer: {
        en: "The natural-strengths report is natal-only and has no timing. This report reads the whole chart and adds which strengths your current Dasha and transits are activating, plus how to use them now.",
        hi: "प्राकृतिक ताकतों वाली रिपोर्ट केवल जन्मजात है और उसमें समय नहीं है। यह रिपोर्ट पूरी कुंडली पढ़ती है और जोड़ती है कि आपकी मौजूदा दशा और गोचर किन ताकतों को सक्रिय कर रहे हैं, और उनका अभी उपयोग कैसे करें।",
      },
    },
    {
      question: { en: "Which planets does it read?", hi: "यह किन ग्रहों को पढ़ती है?" },
      answer: {
        en: "All nine natal planets, the Sun through Ketu, plus Jupiter, Saturn and Rahu in transit over the next 12 months.",
        hi: "सभी नौ जन्मजात ग्रह, सूर्य से केतु तक, और अगले 12 महीनों में गोचर करते गुरु, शनि और राहु।",
      },
    },
    {
      question: { en: "Will strong areas in my chart make me successful?", hi: "क्या कुंडली के मजबूत क्षेत्र मुझे सफल बना देंगे?" },
      answer: {
        en: "No. The report describes tendencies and chart-supported strengths and never claims a strength guarantees a specific outcome.",
        hi: "नहीं। रिपोर्ट रुझान और कुंडली-समर्थित ताकतें बताती है और कभी दावा नहीं करती कि कोई ताकत किसी खास नतीजे की गारंटी है।",
      },
    },
    {
      question: { en: "What if none of my strengths is active this year?", hi: "अगर इस साल मेरी कोई ताकत सक्रिय न हो तो?" },
      answer: {
        en: "The report says so and suggests how to keep your lasting strengths in use until a more supportive period arrives.",
        hi: "रिपोर्ट यह बताती है और सुझाती है कि ज़्यादा अनुकूल दौर आने तक अपनी टिकाऊ ताकतों को उपयोग में कैसे बनाए रखें।",
      },
    },
  ],
  grounding: {
    archetype: "STRENGTHS_NOW", horizonMonths: 12, houses: null, transits: ["Jupiter", "Saturn", "Rahu"],
    natalPlanets: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"], remedies: false,
  },
};
