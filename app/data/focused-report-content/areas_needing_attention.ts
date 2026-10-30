/**
 * areas_needing_attention -- grounded in modules/focused_reports/prompt_specs.py
 * (life_turning_points, care_periods -> TIMING; map the supplied MD/AD lords and
 * relevant transits to natal house/lord themes without inventing health or
 * crisis events; prioritise a small number of supported themes and practical
 * attention, balancing pressure with resources; remedies=False), life_keys.py
 * (houses 1, 2, 4, 6, 7, 10 plus houses ruled by active Dasha lords; 12 months;
 * natal Sun, Moon, Mercury, Jupiter, Saturn) and life_evidence.py (transits
 * Jupiter, Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const areasNeedingAttention: FocusedReportSeoContent = {
  questionKey: "areas_needing_attention",
  searchIntent:
    "Life-area priorities: someone wanting to know which parts of life (self, money, home, daily routine, partnership, work) deserve constructive attention this year, balanced with the resources that support them. Distinct from current-phase-meaning (what the chapter is about) and major-kundali-obstacles (lasting chart obstacles).",
  seoTitle: {
    en: "Which Areas of Life Need My Attention? | Jyotishasha",
    hi: "जीवन के किन क्षेत्रों पर ध्यान चाहिए? | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report naming the few areas of life that most need constructive attention over the next 12 months, and the strengths you can use to handle them.",
    hi: "₹51 की रिपोर्ट: अगले 12 महीनों में जीवन के वे कुछ क्षेत्र जिन्हें सबसे ज़्यादा रचनात्मक ध्यान चाहिए, और उन्हें सँभालने के लिए आपकी ताकतें।",
  },
  h1: {
    en: "Areas Needing Attention: Where to Put Your Care This Year",
    hi: "ध्यान देने वाले जीवन क्षेत्र: इस साल अपना ध्यान कहाँ लगाएँ",
  },
  intro: {
    en: [
      "Attention is limited. In any given year most people can give real care to only a few parts of life at once, such as money, home, a relationship, health routines or work. Spreading it evenly often means none of them gets enough.",
      "This report helps you choose. It maps the planets running your Dasha over the next 12 months, and the movement of Jupiter and Saturn, onto six areas of your chart: the 1st, 2nd, 4th, 6th, 7th and 10th houses and their lords, covering self, money, home, daily routine, partnership and work. It picks out the few areas that most need constructive attention, and balances each one with the resources in your chart that can help. It does not predict health problems or crises.",
    ],
    hi: [
      "ध्यान सीमित होता है। किसी भी साल में ज़्यादातर लोग एक साथ जीवन के कुछ ही हिस्सों को सच्चा ध्यान दे पाते हैं, जैसे पैसा, घर, कोई रिश्ता, सेहत की दिनचर्या या काम। इसे बराबर बाँटने का मतलब अक्सर यह होता है कि किसी को भी काफ़ी नहीं मिलता।",
      "यह रिपोर्ट चुनने में मदद करती है। यह अगले 12 महीनों में आपकी दशा चलाने वाले ग्रहों, और गुरु व शनि की चाल, को आपकी कुंडली के छह क्षेत्रों पर रखती है: 1ला, 2रा, 4था, 6ठा, 7वाँ और 10वाँ भाव और उनके स्वामी, यानी स्वयं, पैसा, घर, रोज़ की दिनचर्या, साझेदारी और काम। यह उन कुछ क्षेत्रों को चुनती है जिन्हें सबसे ज़्यादा रचनात्मक ध्यान चाहिए, और हर एक को आपकी कुंडली के उन संसाधनों के साथ संतुलित करती है जो मदद कर सकते हैं। यह सेहत की समस्याओं या संकटों की भविष्यवाणी नहीं करती।",
    ],
  },
  analyzes: {
    en: [
      "The 1st, 2nd, 4th, 6th, 7th and 10th houses and their lords: self, money, home, routine, partnership and work",
      "Houses ruled by the planets running your Dasha in the next 12 months",
      "Natal placements of the Sun, Moon, Mercury, Jupiter and Saturn, as resources as well as pressures",
      "Jupiter and Saturn from your Lagna over the year",
    ],
    hi: [
      "1ला, 2रा, 4था, 6ठा, 7वाँ और 10वाँ भाव और उनके स्वामी: स्वयं, पैसा, घर, दिनचर्या, साझेदारी और काम",
      "अगले 12 महीनों में आपकी दशा चलाने वाले ग्रहों के स्वामित्व वाले भाव",
      "सूर्य, चंद्रमा, बुध, गुरु और शनि की जन्मजात स्थितियाँ, दबाव के साथ संसाधन के रूप में भी",
      "साल भर आपके लग्न से गुरु और शनि",
    ],
  },
  readingGuide: {
    heading: { en: "Turning priorities into care", hi: "प्राथमिकताओं को ध्यान में कैसे बदलें" },
    points: {
      en: [
        "Pick one concrete action for each highlighted area, such as a budget, a weekly family evening or a fixed sleep time.",
        "Use the resources the report names. Pressure in one area often sits beside real support in another.",
        "Areas not highlighted still need ordinary care; they are simply less likely to need extra effort this year.",
        "Attention is not alarm. The report never forecasts illness, accidents or crises.",
      ],
      hi: [
        "हर उभरे क्षेत्र के लिए एक ठोस कदम चुनें, जैसे बजट, हफ़्ते में एक पारिवारिक शाम या सोने का तय समय।",
        "रिपोर्ट जिन संसाधनों का नाम लेती है, उनका उपयोग करें। एक क्षेत्र का दबाव अक्सर दूसरे के असली सहारे के पास होता है।",
        "जिन क्षेत्रों को नहीं उभारा गया, उन्हें भी सामान्य ध्यान चाहिए; बस इस साल उन्हें अतिरिक्त मेहनत की कम ज़रूरत है।",
        "ध्यान का मतलब डर नहीं है। रिपोर्ट कभी बीमारी, दुर्घटना या संकट की भविष्यवाणी नहीं करती।",
      ],
    },
  },
  differentiation: {
    en: "Understanding Your Current Phase explains what the present chapter is about. Major Obstacles in Your Kundali looks at lasting challenges across the whole chart. This report is a short, practical priority list: which life areas need care in the next 12 months, and what you have to work with.",
    hi: "'मौजूदा समय को समझना' समझाती है कि मौजूदा अध्याय किस बारे में है। 'आपकी कुंडली की प्रमुख बाधाएँ' पूरी कुंडली की टिकाऊ चुनौतियाँ देखती है। यह रिपोर्ट छोटी, व्यावहारिक प्राथमिकता-सूची है: अगले 12 महीनों में जीवन के किन क्षेत्रों पर ध्यान चाहिए, और आपके पास किन चीज़ों का सहारा है।",
  },
  internalLinks: [
    { path: "/reports/focused/current-phase-meaning", localized: true, label: { en: "Understanding Your Current Phase report (₹51)", hi: "मौजूदा समय को समझना रिपोर्ट (₹51)" } },
    { path: "/reports/focused/major-kundali-obstacles", localized: true, label: { en: "Major Obstacles in Your Kundali report (₹51)", hi: "आपकी कुंडली की प्रमुख बाधाएँ रिपोर्ट (₹51)" } },
    { path: "/tools/sadhesati-calculator", localized: true, label: { en: "Free Sade Sati calculator", hi: "मुफ़्त साढ़ेसाती कैलकुलेटर" } },
  ],
  benefits: {
    en: [
      "Names the few life areas that most need attention in the next 12 months",
      "Pairs each one with resources from your chart",
      "Practical, non-alarming priorities rather than warnings",
    ],
    hi: [
      "अगले 12 महीनों में जीवन के वे कुछ क्षेत्र जिन्हें सबसे ज़्यादा ध्यान चाहिए",
      "हर एक को आपकी कुंडली के संसाधनों के साथ जोड़ती है",
      "चेतावनियों के बजाय व्यावहारिक, बिना डराने वाली प्राथमिकताएँ",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Which areas of life need attention in the coming years?”. Using 12 months of evidence, it ranks the areas that most need care and pairs each with supporting resources.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “आने वाले सालों में जीवन के किन क्षेत्रों पर ध्यान देना ज़रूरी है?” 12 महीनों के प्रमाण से यह उन क्षेत्रों का क्रम बताती है जिन्हें सबसे ज़्यादा ध्यान चाहिए, और हर एक को सहायक संसाधनों से जोड़ती है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates the six life-area houses and their lords, the houses ruled by your active Dasha lords, your natal placements and Jupiter and Saturn dates. The reading maps them to themes and invents no event.",
      hi: "बैकएंड जीवन-क्षेत्रों के छह भाव और उनके स्वामी, सक्रिय दशा-स्वामियों के भाव, आपकी जन्मजात स्थितियाँ और गुरु व शनि की तारीखें गणना करता है। विश्लेषण उन्हें विषयों से जोड़ता है और कोई घटना नहीं गढ़ता।",
    },
    whoItIsFor: {
      en: "For someone who feels pulled in many directions and wants to decide where their care will do the most good this year.",
      hi: "उन लोगों के लिए जो कई दिशाओं में खिंचे महसूस करते हैं और तय करना चाहते हैं कि इस साल उनका ध्यान कहाँ सबसे ज़्यादा काम आएगा।",
    },
    whatYouReceive: {
      en: "A PDF of around 400 to 500 words with Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, built from your birth details. The Slower or Watch Period section appears only when your dated evidence supports it.",
      hi: "लगभग 400 से 500 शब्दों की PDF, जिसमें सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात शामिल हैं; आपकी जन्म जानकारी से बनी। 'धीमा या ध्यान रखने वाला समय' वाला हिस्सा तभी आता है जब आपकी तारीख-युक्त जानकारी उसका समर्थन करे।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not predict illness, accidents or crises and is not medical, legal or financial advice.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह बीमारी, दुर्घटना या संकट की भविष्यवाणी नहीं करती और चिकित्सा, कानूनी या वित्तीय सलाह नहीं है।",
    },
  },
  faqs: [
    {
      question: { en: "The question says “coming years”. Why 12 months?", hi: "सवाल में “आने वाले साल” है। फिर 12 महीने क्यों?" },
      answer: {
        en: "The backend supplies 12 months of evidence for this question, so the priorities are for the year ahead and the report does not stretch them further.",
        hi: "इस सवाल के लिए बैकएंड 12 महीनों का प्रमाण देता है, इसलिए प्राथमिकताएँ आने वाले साल की हैं और रिपोर्ट उन्हें आगे नहीं खींचती।",
      },
    },
    {
      question: { en: "If health routines are highlighted, am I going to fall ill?", hi: "अगर सेहत की दिनचर्या उभरे, तो क्या मैं बीमार पड़ूँगा/पड़ूँगी?" },
      answer: {
        en: "No. It means daily routines deserve more care this year. The report never forecasts illness; health concerns belong with a doctor.",
        hi: "नहीं। इसका मतलब है कि इस साल रोज़ की दिनचर्या पर ज़्यादा ध्यान चाहिए। रिपोर्ट कभी बीमारी की भविष्यवाणी नहीं करती; सेहत की चिंता डॉक्टर के पास ले जाएँ।",
      },
    },
    {
      question: { en: "How many areas will it highlight?", hi: "यह कितने क्षेत्र उभारेगी?" },
      answer: {
        en: "A small number, usually two or three, so the list stays usable.",
        hi: "कुछ ही, आमतौर पर दो या तीन, ताकि सूची उपयोगी रहे।",
      },
    },
    {
      question: { en: "How is this different from Major Obstacles in Your Kundali?", hi: "यह 'आपकी कुंडली की प्रमुख बाधाएँ' से कैसे अलग है?" },
      answer: {
        en: "That report looks at lasting challenges in the whole chart. This one is about where to put your attention this year.",
        hi: "वह रिपोर्ट पूरी कुंडली की टिकाऊ चुनौतियाँ देखती है। यह रिपोर्ट इस बारे में है कि इस साल ध्यान कहाँ लगाएँ।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: [1, 2, 4, 6, 7, 10], transits: ["Jupiter", "Saturn"], natalPlanets: ["Sun", "Moon", "Mercury", "Jupiter", "Saturn"], remedies: false },
};
