/**
 * focus_to_use_strengths -- grounded in modules/focused_reports/prompt_specs.py
 * (life_direction_and_strengths, guidance -> DIRECTION; connect recurring
 * placement and house/lord themes with supplied current MD/AD and Jupiter/Saturn
 * context for practice and balanced development; explain what to focus on and
 * why, linked to the reading rather than generic motivation; 12-month keys put
 * current context first; remedies=False), life_keys.py (houses 1, 3, 5, 6, 10
 * plus houses ruled by active Dasha lords; 12 months; natal Sun, Moon, Mercury,
 * Jupiter, Saturn) and life_evidence.py (transits Jupiter, Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const focusToUseStrengths: FocusedReportSeoContent = {
  questionKey: "focus_to_use_strengths",
  searchIntent:
    "Practical priorities now: someone who broadly knows their strengths and wants a short list of what to focus on in the coming year to make the most of them, tied to their current Dasha. Distinct from natural-strengths (describing tendencies, no timing) and life-direction (broad paths, no timing).",
  seoTitle: {
    en: "How Do I Make the Most of My Strengths? | Jyotishasha",
    hi: "अपनी ताकतों का पूरा फ़ायदा कैसे उठाएँ? | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report turning the strengths your chart supports into a few practical priorities for the next 12 months, matched to the Dasha you are running now.",
    hi: "₹51 की रिपोर्ट: आपकी कुंडली जिन ताकतों का समर्थन करती है, उन्हें अगले 12 महीनों की कुछ व्यावहारिक प्राथमिकताओं में बदलती है, आपकी मौजूदा दशा के हिसाब से।",
  },
  h1: {
    en: "Putting Strengths to Work: What to Focus On This Year",
    hi: "ताकतों का सही इस्तेमाल: इस साल किस पर ध्यान दें",
  },
  intro: {
    en: [
      "Knowing your strengths is useful; using them deliberately is what changes things. Yet most people never turn self-knowledge into a plan. The same few talents stay half-used while energy goes into whatever is most urgent.",
      "This report closes that gap for the coming year. It reads recurring strengths in your 1st, 3rd, 5th, 6th and 10th houses and their lords, covering self, effort, skill, discipline and work, and in the placements of the Sun, Moon, Mercury, Jupiter and Saturn. It then matches them with the Dasha you are running and the movement of Jupiter and Saturn over the next 12 months. The result is a small number of practical priorities, each with a reason drawn from your chart rather than generic motivation.",
    ],
    hi: [
      "अपनी ताकतें जानना उपयोगी है; उनका जानबूझकर उपयोग ही चीज़ें बदलता है। फिर भी ज़्यादातर लोग खुद की समझ को कभी योजना में नहीं बदलते। वही कुछ प्रतिभाएँ अधूरी इस्तेमाल होती रहती हैं, जबकि ऊर्जा जो सबसे ज़रूरी हो उसमें चली जाती है।",
      "यह रिपोर्ट आने वाले साल के लिए यह कमी भरती है। यह आपके 1ले, 3रे, 5वें, 6ठे और 10वें भाव और उनके स्वामियों में, जो स्वयं, मेहनत, कौशल, अनुशासन और काम से जुड़े हैं, और सूर्य, चंद्रमा, बुध, गुरु और शनि की स्थितियों में बार-बार आने वाली ताकतें पढ़ती है। फिर उन्हें अगले 12 महीनों में आपकी चल रही दशा और गुरु व शनि की चाल से मिलाती है। नतीजा कुछ व्यावहारिक प्राथमिकताएँ हैं, हर एक का कारण आपकी कुंडली से, कोई आम प्रेरक बात नहीं।",
    ],
  },
  analyzes: {
    en: [
      "The 1st, 3rd, 5th, 6th and 10th houses and their lords: self, effort, skill, discipline and work",
      "Placements of the Sun, Moon, Mercury, Jupiter and Saturn, and of the planets running your Dasha",
      "Your current Mahadasha and Antardasha, read first, and any change within 12 months",
      "Jupiter and Saturn from your Lagna as the year's backdrop for practice and growth",
    ],
    hi: [
      "1ला, 3रा, 5वाँ, 6ठा और 10वाँ भाव और उनके स्वामी: स्वयं, मेहनत, कौशल, अनुशासन और काम",
      "सूर्य, चंद्रमा, बुध, गुरु और शनि, और आपकी दशा चलाने वाले ग्रहों की स्थितियाँ",
      "आपकी मौजूदा महादशा और अंतर्दशा, पहले पढ़ी गई, और 12 महीनों के भीतर कोई बदलाव",
      "अभ्यास और विकास के लिए साल की पृष्ठभूमि के रूप में आपके लग्न से गुरु और शनि",
    ],
  },
  readingGuide: {
    heading: { en: "From priorities to practice", hi: "प्राथमिकताओं से अभ्यास तक" },
    points: {
      en: [
        "Choose one priority to start with and give it a fixed weekly slot before adding another.",
        "Pair each strength with a balancing habit; the report notes where a strength may be overused.",
        "Review after three months: what moved, and what needs to change?",
        "The focus is tied to your current period. It is guidance for this year, not a life-long rule.",
      ],
      hi: [
        "शुरुआत के लिए एक प्राथमिकता चुनें और दूसरी जोड़ने से पहले उसे हफ़्ते का तय समय दें।",
        "हर ताकत के साथ एक संतुलन वाली आदत रखें; रिपोर्ट बताती है कि कहाँ किसी ताकत का ज़रूरत से ज़्यादा उपयोग हो सकता है।",
        "तीन महीने बाद समीक्षा करें: क्या आगे बढ़ा, और क्या बदलना है?",
        "ध्यान आपके मौजूदा दौर से जुड़ा है। यह इस साल का मार्गदर्शन है, जीवनभर का नियम नहीं।",
      ],
    },
  },
  differentiation: {
    en: "Natural Strengths describes your tendencies without timing. Life Direction suggests broad paths. Major Strengths in Your Kundali covers the whole chart. This report is the practical one: what to focus on in the next 12 months, given the Dasha you are in.",
    hi: "'प्राकृतिक ताकतें' बिना समय के आपके रुझान बताती है। 'जीवन की दिशा' बड़े रास्ते सुझाती है। 'आपकी कुंडली की प्रमुख शक्तियाँ' पूरी कुंडली देखती है। यह रिपोर्ट व्यावहारिक है: आपकी मौजूदा दशा को देखते हुए अगले 12 महीनों में किस पर ध्यान दें।",
  },
  internalLinks: [
    { path: "/reports/focused/natural-strengths", localized: true, label: { en: "Natural Strengths report (₹51)", hi: "प्राकृतिक ताकतें रिपोर्ट (₹51)" } },
    { path: "/reports/focused/major-kundali-strengths", localized: true, label: { en: "Major Strengths in Your Kundali report (₹51)", hi: "आपकी कुंडली की प्रमुख शक्तियाँ रिपोर्ट (₹51)" } },
    { path: "/tools/planet-overview", localized: true, label: { en: "Free planet overview", hi: "मुफ़्त ग्रह विवरण" } },
  ],
  benefits: {
    en: [
      "A few practical priorities for the next 12 months, drawn from your chart",
      "Matched to the Dasha you are running now",
      "Each priority comes with a reason, not generic motivation",
    ],
    hi: [
      "अगले 12 महीनों की कुछ व्यावहारिक प्राथमिकताएँ, आपकी कुंडली से",
      "आपकी चल रही दशा से मेल खातीं",
      "हर प्राथमिकता के साथ कारण, कोई आम प्रेरक बात नहीं",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What should I focus on to make the most of my strengths?”. It reads your current context first and turns supported strengths into practical priorities for 12 months.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “अपनी ताकतों का पूरा फायदा उठाने के लिए मुझे किस पर ध्यान देना चाहिए?” यह पहले आपका मौजूदा संदर्भ पढ़ती है और समर्थित ताकतों को 12 महीनों की व्यावहारिक प्राथमिकताओं में बदलती है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates your five houses and their lords, natal placements, current Dasha and Jupiter and Saturn dates. The reading links each priority to those facts and adds no date of its own.",
      hi: "बैकएंड आपके पाँच भाव और उनके स्वामी, जन्मजात स्थितियाँ, मौजूदा दशा और गुरु व शनि की तारीखें गणना करता है। विश्लेषण हर प्राथमिकता को उन्हीं तथ्यों से जोड़ता है और अपनी ओर से कोई तारीख नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For someone who wants to turn self-knowledge into action this year, at work, in study or in personal growth.",
      hi: "उन लोगों के लिए जो इस साल खुद की समझ को काम में बदलना चाहते हैं, काम में, पढ़ाई में या निजी विकास में।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words: Direct Answer, Natural Strengths and Tendencies, Most Relevant Directions, Current Timing Context, Practical Focus, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, ताकतें और रुझान, सबसे उपयोगी दिशाएँ, अभी के समय का संदर्भ, व्यावहारिक ध्यान, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It describes tendencies and current emphasis, not fixed ability, and success still depends on effort and circumstances.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह रुझान और मौजूदा ज़ोर बताती है, कोई तय क्षमता नहीं, और सफलता फिर भी मेहनत और हालात पर निर्भर है।",
    },
  },
  faqs: [
    {
      question: { en: "Do I need to read Natural Strengths first?", hi: "क्या मुझे पहले 'प्राकृतिक ताकतें' पढ़नी चाहिए?" },
      answer: {
        en: "No. This report summarises the strengths it builds on. Natural Strengths goes deeper into the description itself.",
        hi: "नहीं। यह रिपोर्ट उन ताकतों का सार देती है जिन पर यह बनी है। 'प्राकृतिक ताकतें' खुद उनके वर्णन में गहराई तक जाती है।",
      },
    },
    {
      question: { en: "Why does the current Dasha matter?", hi: "मौजूदा दशा क्यों मायने रखती है?" },
      answer: {
        en: "Different periods emphasise different areas. A strength that suits this year's emphasis is usually easier to build on now.",
        hi: "अलग-अलग दौर अलग क्षेत्रों पर ज़ोर देते हैं। जो ताकत इस साल के ज़ोर से मेल खाती है, उस पर अभी आगे बढ़ना आमतौर पर आसान होता है।",
      },
    },
    {
      question: { en: "How many priorities will it give?", hi: "यह कितनी प्राथमिकताएँ देगी?" },
      answer: {
        en: "A small number, so you can actually act on them.",
        hi: "कुछ ही, ताकि आप सच में उन पर काम कर सकें।",
      },
    },
    {
      question: { en: "Is this career advice?", hi: "क्या यह करियर सलाह है?" },
      answer: {
        en: "Partly. It covers work and also study and personal growth, wherever your strengths apply.",
        hi: "कुछ हद तक। यह काम के साथ पढ़ाई और निजी विकास को भी देखती है, जहाँ भी आपकी ताकतें लागू हों।",
      },
    },
  ],
  grounding: { archetype: "DIRECTION", horizonMonths: 12, houses: [1, 3, 5, 6, 10], transits: ["Jupiter", "Saturn"], natalPlanets: ["Sun", "Moon", "Mercury", "Jupiter", "Saturn"], remedies: false },
};
