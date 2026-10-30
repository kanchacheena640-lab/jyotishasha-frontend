/**
 * current_phase_meaning -- grounded in modules/focused_reports/prompt_specs.py
 * (life_turning_points, current_period -> TIMING; read current MD/AD lords in
 * their natal houses and lordships, then the next dated transition and relevant
 * transits; connect present experiences to a limited set of themes;
 * distinguish a timing boundary from instant change; 12-month keys put current
 * context first; remedies=False), life_keys.py (houses 1, 4, 6, 10 plus houses
 * ruled by active Dasha lords; 12 months; natal Sun, Moon, Mercury, Jupiter,
 * Saturn) and life_evidence.py (transits Jupiter, Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const currentPhaseMeaning: FocusedReportSeoContent = {
  questionKey: "current_phase_meaning",
  searchIntent:
    "Making sense of now: someone going through an intense, confusing or slow stretch who wants to understand what the present chapter is about and when it is likely to shift. Distinct from next-life-change-period (when the next shift comes, over three years) and areas-needing-attention (which life areas need care).",
  seoTitle: {
    en: "What Does My Current Life Phase Mean? | Jyotishasha",
    hi: "मेरा मौजूदा समय कैसा है? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report explaining the themes of the phase you are living through now, from your current Dasha lords, and when it may change within 12 months.",
    hi: "₹51 की रिपोर्ट: आपकी मौजूदा दशा के स्वामियों से उस दौर के विषय समझाती है जिससे आप अभी गुज़र रहे हैं, और 12 महीनों में वह कब बदल सकता है।",
  },
  h1: {
    en: "Understanding Your Current Phase: What This Chapter Is About",
    hi: "मौजूदा समय को समझना: यह अध्याय किस बारे में है",
  },
  intro: {
    en: [
      "Some stretches of life are easier to understand afterwards than while living through them. Work might be demanding while home feels unsettled, or everything might feel slow for no clear reason. A frame for the present often makes it easier to bear and easier to use.",
      "This report starts with now. It reads the planets running your current Mahadasha and Antardasha: which houses they rule and where they sit in your chart, starting from your 1st, 4th, 6th and 10th houses. It connects them to a small number of themes you may recognise in daily life. It then looks at the next dated transition within 12 months and the movement of Jupiter and Saturn, to say how and when the emphasis may shift, as a gradual turn rather than an overnight change.",
    ],
    hi: [
      "जीवन के कुछ दौर उन्हें जीते समय से ज़्यादा बाद में समझ आते हैं। काम भारी हो सकता है जबकि घर अस्थिर लगे, या बिना साफ़ वजह सब कुछ धीमा लग सकता है। वर्तमान को समझने का ढाँचा अक्सर उसे सहना और उसका उपयोग करना आसान बना देता है।",
      "यह रिपोर्ट अभी से शुरू होती है। यह आपकी मौजूदा महादशा और अंतर्दशा चलाने वाले ग्रह पढ़ती है: वे किन भावों के स्वामी हैं और आपकी कुंडली में कहाँ बैठे हैं, शुरुआत आपके 1ले, 4थे, 6ठे और 10वें भाव से। यह उन्हें कुछ ऐसे विषयों से जोड़ती है जिन्हें आप रोज़मर्रा में पहचान सकें। फिर यह 12 महीनों के भीतर अगला तारीख-युक्त बदलाव और गुरु व शनि की चाल देखती है, ताकि बता सके कि ज़ोर कैसे और कब बदल सकता है, रातोंरात नहीं, धीरे-धीरे।",
    ],
  },
  analyzes: {
    en: [
      "The planets running your current Mahadasha and Antardasha, and the houses they rule and occupy",
      "The 1st, 4th, 6th and 10th houses and their lords: self, home, daily pressures and work",
      "Natal placements of the Sun, Moon, Mercury, Jupiter and Saturn",
      "The next dated transition and Jupiter and Saturn within 12 months",
    ],
    hi: [
      "आपकी मौजूदा महादशा और अंतर्दशा चलाने वाले ग्रह, और वे किन भावों के स्वामी हैं और कहाँ बैठे हैं",
      "1ला, 4था, 6ठा और 10वाँ भाव और उनके स्वामी: स्वयं, घर, रोज़ के दबाव और काम",
      "सूर्य, चंद्रमा, बुध, गुरु और शनि की जन्मजात स्थितियाँ",
      "12 महीनों के भीतर अगला तारीख-युक्त बदलाव और गुरु व शनि",
    ],
  },
  readingGuide: {
    heading: { en: "Reading the present without fatalism", hi: "बिना भाग्यवाद के वर्तमान को पढ़ना" },
    points: {
      en: [
        "Look for the two or three themes the report names in your own week, such as responsibility, home or health routines.",
        "Ask what this chapter is asking of you. Phases often reward one kind of effort more than others.",
        "Use the expected shift as a planning point, not a countdown: prepare, but do not put life on hold.",
        "The report describes emphasis. It does not predict illness, crises or fixed outcomes.",
      ],
      hi: [
        "रिपोर्ट जो दो-तीन विषय बताती है, उन्हें अपने हफ़्ते में देखें, जैसे ज़िम्मेदारी, घर या सेहत की दिनचर्या।",
        "पूछें कि यह अध्याय आपसे क्या माँगता है। दौर अक्सर एक तरह की मेहनत को दूसरों से ज़्यादा फल देते हैं।",
        "अपेक्षित बदलाव को योजना का पड़ाव मानें, उलटी गिनती नहीं: तैयारी करें, लेकिन जीवन रोकें नहीं।",
        "रिपोर्ट ज़ोर बताती है। यह बीमारी, संकट या तय नतीजों की भविष्यवाणी नहीं करती।",
      ],
    },
  },
  differentiation: {
    en: "Next Phase Change looks up to three years ahead for the next boundary. Areas Needing Attention picks out which life areas need care this year. This report is about understanding the chapter you are in now, and when within 12 months it may begin to shift.",
    hi: "'अगला जीवन बदलाव' अगली सीमा के लिए तीन साल तक आगे देखती है। 'ध्यान देने वाले जीवन क्षेत्र' बताती है कि इस साल जीवन के किन क्षेत्रों पर ध्यान चाहिए। यह रिपोर्ट उस अध्याय को समझने के बारे में है जिसमें आप अभी हैं, और 12 महीनों में वह कब बदलना शुरू हो सकता है।",
  },
  internalLinks: [
    { path: "/reports/focused/next-life-change-period", localized: true, label: { en: "Next Phase Change report (₹51)", hi: "अगला जीवन बदलाव रिपोर्ट (₹51)" } },
    { path: "/reports/focused/areas-needing-attention", localized: true, label: { en: "Areas Needing Attention report (₹51)", hi: "ध्यान देने वाले जीवन क्षेत्र रिपोर्ट (₹51)" } },
    { path: "/tools/grah-dasha-finder", localized: true, label: { en: "Free Dasha finder", hi: "मुफ़्त दशा फ़ाइंडर" } },
  ],
  benefits: {
    en: [
      "Explains the themes of the phase you are living through now",
      "Links them to your current Dasha lords and the houses they rule",
      "Says how and when the emphasis may shift within 12 months",
    ],
    hi: [
      "उस दौर के विषय समझाती है जिससे आप अभी गुज़र रहे हैं",
      "उन्हें आपकी मौजूदा दशा के स्वामियों और उनके भावों से जोड़ती है",
      "बताती है कि 12 महीनों में ज़ोर कैसे और कब बदल सकता है",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What does my current life phase mean, and when does it change?”. It reads the present first, then the next dated transition within 12 months.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरा मौजूदा समय किस तरह का है और यह कब बदलेगा?” यह पहले वर्तमान पढ़ती है, फिर 12 महीनों के भीतर अगला तारीख-युक्त बदलाव।",
    },
    howJyotishApproachesIt: {
      en: "Your current Dasha lords, the houses they rule, your natal placements and Jupiter and Saturn dates are calculated first. The reading starts from the present and adds no date of its own.",
      hi: "आपकी मौजूदा दशा के स्वामी, उनके भाव, आपकी जन्मजात स्थितियाँ और गुरु व शनि की तारीखें पहले गणना की जाती हैं। विश्लेषण वर्तमान से शुरू होता है और अपनी ओर से कोई तारीख नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For someone in an intense, confusing or slow stretch who wants to understand it before deciding what to change.",
      hi: "उन लोगों के लिए जो किसी तीव्र, उलझन भरे या धीमे दौर में हैं और कुछ बदलने का फ़ैसला करने से पहले उसे समझना चाहते हैं।",
    },
    whatYouReceive: {
      en: "Your PDF runs to about 400 to 500 words: Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from your birth details. The Slower or Watch Period section appears only when your dated evidence supports it.",
      hi: "आपकी PDF लगभग 400 से 500 शब्दों की होती है: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात; आपकी जन्म जानकारी से। 'धीमा या ध्यान रखने वाला समय' वाला हिस्सा तभी आता है जब आपकी तारीख-युक्त जानकारी उसका समर्थन करे।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It describes themes of emphasis, not fate, and does not diagnose health or emotional conditions.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह ज़ोर के विषय बताती है, भाग्य नहीं, और सेहत या भावनात्मक स्थितियों का निदान नहीं करती।",
    },
  },
  faqs: [
    {
      question: { en: "Will it explain why things feel so hard right now?", hi: "क्या यह समझाएगी कि अभी सब इतना कठिन क्यों लगता है?" },
      answer: {
        en: "It explains the themes your current Dasha emphasises, which often makes a hard stretch easier to understand. It does not claim to be the only cause.",
        hi: "यह उन विषयों को समझाती है जिन पर आपकी मौजूदा दशा ज़ोर देती है, जिससे कठिन दौर अक्सर समझना आसान हो जाता है। यह अकेला कारण होने का दावा नहीं करती।",
      },
    },
    {
      question: { en: "What if my phase does not change within 12 months?", hi: "अगर मेरा दौर 12 महीनों में न बदले तो?" },
      answer: {
        en: "The report says so and focuses on how to work with the current chapter. Next Phase Change looks further ahead.",
        hi: "रिपोर्ट यह बताती है और इस पर ध्यान देती है कि मौजूदा अध्याय के साथ कैसे काम करें। 'अगला जीवन बदलाव' और आगे देखती है।",
      },
    },
    {
      question: { en: "Is my current phase good or bad?", hi: "क्या मेरा मौजूदा दौर अच्छा है या बुरा?" },
      answer: {
        en: "The report avoids that label. It explains what the phase emphasises and how to make good use of it.",
        hi: "रिपोर्ट यह ठप्पा नहीं लगाती। यह समझाती है कि दौर किस पर ज़ोर देता है और उसका अच्छा उपयोग कैसे करें।",
      },
    },
    {
      question: { en: "Do I need to know my Dasha first?", hi: "क्या मुझे पहले अपनी दशा पता होनी चाहिए?" },
      answer: {
        en: "No. The report calculates it from your birth details. The free Dasha finder can show the dates if you are curious.",
        hi: "नहीं। रिपोर्ट आपकी जन्म जानकारी से उसकी गणना करती है। जिज्ञासा हो तो मुफ़्त दशा फ़ाइंडर तारीखें दिखा सकता है।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: [1, 4, 6, 10], transits: ["Jupiter", "Saturn"], natalPlanets: ["Sun", "Moon", "Mercury", "Jupiter", "Saturn"], remedies: false },
};
