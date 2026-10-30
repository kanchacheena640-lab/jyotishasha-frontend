/**
 * major_kundali_obstacles (bespoke tier; attached to FOCUSED_REPORTS_CONFIG, not the content registry) --
 * grounded in modules/focused_reports/prompt_specs.py (kundali_obstacles -> OBSTACLES; whole-chart
 * house/lord facts and existing career/wealth yogas for birth-chart challenges, current MD/AD and
 * Jupiter/Saturn/Rahu transits for what is active now; 2-4 obstacles only; never an invented dosha;
 * practical-first remedies; the only key in REMEDY_KEYS), master_contract.py (OBSTACLES sections and
 * REMEDY_INSTRUCTION) and life_keys.py (12 months; all 12 houses; all 9 natal planets; transits
 * Jupiter, Saturn, Rahu).
 */
import type { FocusedReportSeoContent } from "./types";

export const majorKundaliObstacles: FocusedReportSeoContent = {
  questionKey: "major_kundali_obstacles",
  searchIntent:
    "Whole-chart diagnosis: someone who feels one or two areas of life keep running into resistance and wants a calm, chart-wide explanation of the few obstacles that genuinely stand out, which are active now, and what practical steps help. Distinct from areas-needing-attention (this year's priorities) and major-kundali-strengths.",
  seoTitle: {
    en: "Major Obstacles in Your Kundali | Jyotishasha",
    hi: "आपकी कुंडली की प्रमुख बाधाएँ | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report naming the 2–4 obstacles that stand out in your whole birth chart, which are active in your current Dasha, and practical ways to respond.",
    hi: "₹51 की रिपोर्ट: आपकी पूरी जन्म कुंडली की 2–4 सबसे अहम बाधाएँ, उनमें से कौन-सी मौजूदा दशा में सक्रिय हैं, और उनसे निपटने के व्यावहारिक उपाय।",
  },
  h1: {
    en: "Major Obstacles in Your Kundali: What Stands Out, What Is Active Now",
    hi: "आपकी कुंडली की प्रमुख बाधाएँ: क्या उभरता है, और अभी क्या सक्रिय है",
  },
  intro: {
    en: [
      "Some difficulties are passing; others seem to return in the same area of life, such as money, relationships or work, however much effort goes in. When that happens, people often reach for a frightening label. A more useful question is narrower: which few challenges does the chart actually show, and which of them are switched on right now?",
      "This report answers that across your whole birth chart rather than one house or one planet. It reads all twelve houses and their lords, all nine natal planets and the career and wealth yogas present in your chart. It then compares them with the Mahadasha and Antardasha running over the next 12 months and with Jupiter, Saturn and Rahu. It keeps the long-standing patterns apart from what is active now, and closes with practical, conditional remedies.",
    ],
    hi: [
      "कुछ मुश्किलें गुज़र जाती हैं; कुछ जीवन के एक ही हिस्से में बार-बार लौटती हैं, जैसे पैसा, रिश्ते या काम, चाहे कितनी भी मेहनत की जाए। ऐसे में लोग अक्सर कोई डरावना नाम ढूँढ लेते हैं। ज़्यादा उपयोगी सवाल छोटा है: कुंडली असल में कौन-सी कुछ चुनौतियाँ दिखाती है, और उनमें से कौन-सी अभी सक्रिय हैं?",
      "यह रिपोर्ट इसका जवाब पूरी जन्म कुंडली से देती है, किसी एक भाव या ग्रह से नहीं। यह सभी बारह भाव और उनके स्वामी, सभी नौ जन्मजात ग्रह और आपकी कुंडली में मौजूद करियर व धन योग पढ़ती है। फिर इन्हें अगले 12 महीनों में चल रही महादशा और अंतर्दशा, और गुरु, शनि व राहु से मिलाती है। यह पुराने, टिकाऊ पैटर्न को अभी सक्रिय बातों से अलग रखती है, और आखिर में व्यावहारिक, सशर्त उपाय देती है।",
    ],
  },
  analyzes: {
    en: [
      "All twelve houses and their lords, so no area of life is left out",
      "The Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu as placed in your birth chart",
      "Career and wealth yogas already present in the chart, used only where they are formed",
      "Your Mahadasha and Antardasha over the next 12 months, with Jupiter, Saturn and Rahu, to see which obstacles are active now",
    ],
    hi: [
      "सभी बारह भाव और उनके स्वामी, ताकि जीवन का कोई क्षेत्र न छूटे",
      "आपकी जन्म कुंडली में सूर्य, चंद्रमा, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु की स्थिति",
      "कुंडली में पहले से मौजूद करियर और धन योग, केवल वहीं जहाँ वे बनते हों",
      "अगले 12 महीनों की महादशा और अंतर्दशा, गुरु, शनि और राहु के साथ, यह देखने के लिए कि कौन-सी बाधाएँ अभी सक्रिय हैं",
    ],
  },
  readingGuide: {
    heading: { en: "Reading an obstacles report without fear", hi: "बाधाओं वाली रिपोर्ट को बिना डर के कैसे पढ़ें" },
    points: {
      en: [
        "Only the 2–4 most meaningful obstacles are named. A short list is a sign of focus, not of a light reading.",
        "A birth-chart obstacle describes a recurring pattern to manage. A currently active one is where effort is most worth putting this year.",
        "Start with the practical remedies: routines, decisions and habits. A simple Jyotish practice is suggested only where the chart reasonably supports it.",
        "No dosha is named unless the exact planetary fact for it is present in your chart, and nothing is presented as fate.",
      ],
      hi: [
        "केवल 2–4 सबसे अहम बाधाएँ बताई जाती हैं। छोटी सूची ध्यान का संकेत है, हल्के विश्लेषण का नहीं।",
        "जन्मजात बाधा एक बार-बार आने वाला पैटर्न है जिसे संभालना है। अभी सक्रिय बाधा वह जगह है जहाँ इस साल मेहनत सबसे ज़्यादा काम आएगी।",
        "शुरुआत व्यावहारिक उपायों से करें: दिनचर्या, फ़ैसले और आदतें। कोई साधारण ज्योतिषीय अभ्यास तभी सुझाया जाता है जब कुंडली उसका ठीक-ठाक समर्थन करे।",
        "कोई दोष तभी बताया जाता है जब उसका सटीक ग्रह-तथ्य आपकी कुंडली में मौजूद हो, और कुछ भी भाग्य के रूप में नहीं रखा जाता।",
      ],
    },
  },
  differentiation: {
    en: "Areas Needing Attention picks this year's priorities from six life areas. Major Strengths in Your Kundali reads the same whole chart for what supports you. This report looks for the few obstacles that genuinely stand out across all twelve houses, separates lasting patterns from what is active now, and is the only focused report that includes remedies.",
    hi: "'ध्यान देने वाले जीवन क्षेत्र' छह जीवन-क्षेत्रों में से इस साल की प्राथमिकताएँ चुनती है। 'आपकी कुंडली की प्रमुख शक्तियाँ' उसी पूरी कुंडली में आपका साथ देने वाली बातें पढ़ती है। यह रिपोर्ट सभी बारह भावों में वे कुछ बाधाएँ ढूँढती है जो सच में उभरती हैं, टिकाऊ पैटर्न को अभी सक्रिय बातों से अलग करती है, और अकेली ऐसी फ़ोकस्ड रिपोर्ट है जिसमें उपाय शामिल हैं।",
  },
  internalLinks: [
    { path: "/reports/focused/major-kundali-strengths", localized: true, label: { en: "Major Strengths in Your Kundali report (₹51)", hi: "आपकी कुंडली की प्रमुख शक्तियाँ रिपोर्ट (₹51)" } },
    { path: "/reports/focused/areas-needing-attention", localized: true, label: { en: "Areas Needing Attention report (₹51)", hi: "ध्यान देने वाले जीवन क्षेत्र रिपोर्ट (₹51)" } },
    { path: "/tools/mangal-dosh", localized: true, label: { en: "Mangal dosh tool (free)", hi: "मंगल दोष टूल (मुफ़्त)" } },
  ],
  benefits: {
    en: [
      "Identifies the 2–4 most meaningful challenges in your birth chart, not an exhaustive negative list",
      "Separates long-standing birth-chart patterns from what your current Dasha and transits are actively activating",
      "Practical, conditional remedies tied to what your chart actually shows, never a guaranteed fix",
      "Calm, plain-language reading with no fear-based or fatalistic language",
    ],
    hi: [
      "आपकी जन्म कुंडली की 2–4 सबसे अहम चुनौतियाँ बताती है, हर नकारात्मक बात की पूरी सूची नहीं",
      "कुंडली के पुराने, टिकाऊ पैटर्न को उन बातों से अलग करती है जिन्हें आपकी मौजूदा दशा और गोचर अभी सक्रिय कर रहे हैं",
      "आपकी कुंडली में सच में जो दिखता है उसी से जुड़े व्यावहारिक, सशर्त उपाय, कभी पक्के नतीजे की गारंटी नहीं",
      "शांत, सीधी भाषा में विश्लेषण, कोई डराने वाली या भाग्यवादी भाषा नहीं",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What are the major obstacles in my birth chart, what is affecting me currently, and what remedies can help?”. It names the few challenges that stand out, marks which are active in the next 12 months, and suggests practical responses.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरी जन्म कुंडली में प्रमुख बाधाएँ क्या हैं, वर्तमान समय में कौन-सी बाधाएँ सक्रिय हैं और उनके लिए क्या उपाय किए जा सकते हैं?” यह उभरने वाली कुछ चुनौतियाँ बताती है, अगले 12 महीनों में कौन-सी सक्रिय हैं यह दिखाती है, और व्यावहारिक कदम सुझाती है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates all twelve houses and their lords, the nine natal planets, existing career and wealth yogas, your Dasha periods and the Jupiter, Saturn and Rahu dates. The reading never invents a dosha: one is named only if that exact dosha's planetary fact is present in your chart.",
      hi: "बैकएंड सभी बारह भाव और उनके स्वामी, नौ जन्मजात ग्रह, मौजूद करियर और धन योग, आपकी दशा की अवधियाँ और गुरु, शनि व राहु की तारीखें गणना करता है। विश्लेषण कभी कोई दोष नहीं गढ़ता: किसी दोष का नाम तभी आता है जब उसका सटीक ग्रह-तथ्य आपकी कुंडली में मौजूद हो।",
    },
    whoItIsFor: {
      en: "For someone who feels a particular area of life has been harder than expected for a long time, and wants a grounded explanation plus practical next steps rather than a vague or frightening one.",
      hi: "उन लोगों के लिए जिन्हें लगता है कि जीवन का कोई खास हिस्सा लंबे समय से उम्मीद से ज़्यादा कठिन रहा है, और जो अस्पष्ट या डराने वाली बात के बजाय ठोस व्याख्या और व्यावहारिक अगले कदम चाहते हैं।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words: Direct Answer, Birth Chart Obstacles, Current Active Obstacles, Remedies and What Helps, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, कुंडली की जन्मजात बाधाएँ, अभी सक्रिय बाधाएँ, उपाय और क्या मदद करता है, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome, and not medical, legal or financial advice. Remedies are practical-first and conditional on what your chart supports; no remedy is presented as a guaranteed outcome, and none requires an expensive gemstone.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं, और चिकित्सा, कानूनी या वित्तीय सलाह नहीं। उपाय व्यावहारिक-प्राथमिकता वाले हैं और आपकी कुंडली के समर्थन पर निर्भर हैं; किसी उपाय को पक्के नतीजे के रूप में नहीं रखा जाता, और किसी में महँगे रत्न की ज़रूरत नहीं है।",
    },
  },
  faqs: [
    {
      question: { en: "Will this report tell me I have a specific dosha?", hi: "क्या यह रिपोर्ट बताएगी कि मुझे कोई खास दोष है?" },
      answer: {
        en: "Only if that exact dosha's planetary fact is present in your chart. Otherwise it explains the actual house, lord, Dasha or transit evidence in plain language instead of a label.",
        hi: "सिर्फ तभी जब उस दोष का सटीक ग्रह-तथ्य आपकी कुंडली में मौजूद हो। वरना यह किसी ठप्पे के बजाय असली भाव, स्वामी, दशा या गोचर के प्रमाण को आसान भाषा में समझाती है।",
      },
    },
    {
      question: { en: "What kind of remedies does it suggest?", hi: "यह किस तरह के उपाय सुझाती है?" },
      answer: {
        en: "Mostly practical ones, such as routines, decisions and habits. A simple practice like a mantra, a fasting day or a modest act of charity is added only when the chart reasonably supports it. No remedy is presented as a guaranteed outcome.",
        hi: "ज़्यादातर व्यावहारिक, जैसे दिनचर्या, फ़ैसले और आदतें। कोई साधारण अभ्यास, जैसे मंत्र, व्रत का दिन या छोटा दान, तभी जोड़ा जाता है जब कुंडली उसका ठीक-ठाक समर्थन करे। किसी उपाय को पक्के नतीजे के रूप में नहीं रखा जाता।",
      },
    },
    {
      question: { en: "Why only two to four obstacles?", hi: "सिर्फ़ दो से चार बाधाएँ ही क्यों?" },
      answer: {
        en: "Because a short, prioritised list is something you can act on. The backend asks for the most meaningful few, never an exhaustive list designed to alarm.",
        hi: "क्योंकि छोटी, प्राथमिकता वाली सूची पर काम किया जा सकता है। बैकएंड सबसे अहम कुछ बाधाएँ माँगता है, डराने के लिए बनी पूरी सूची कभी नहीं।",
      },
    },
    {
      question: { en: "How is this different from Areas Needing Attention?", hi: "यह 'ध्यान देने वाले जीवन क्षेत्र' से कैसे अलग है?" },
      answer: {
        en: "That report sets this year's priorities across six life areas. This one reads the whole chart for lasting and currently active obstacles and adds remedies.",
        hi: "वह रिपोर्ट छह जीवन-क्षेत्रों में इस साल की प्राथमिकताएँ तय करती है। यह रिपोर्ट पूरी कुंडली में टिकाऊ और अभी सक्रिय बाधाएँ पढ़ती है और उपाय भी देती है।",
      },
    },
  ],
  grounding: {
    archetype: "OBSTACLES", horizonMonths: 12, houses: null, transits: ["Jupiter", "Saturn", "Rahu"],
    natalPlanets: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"], remedies: true,
  },
};
