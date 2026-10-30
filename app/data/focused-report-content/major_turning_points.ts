/**
 * major_turning_points -- grounded in modules/focused_reports/prompt_specs.py
 * (life_turning_points, overview -> TIMING; read dated MD/AD transitions
 * through their natal house/lord roles and relevant long-cycle transit context;
 * select only a few supported turning points, naming themes rather than
 * inventing events; remedies=False), life_keys.py (houses 1, 4, 7, 9, 10 plus
 * houses ruled by the Dasha lords active in the horizon; 60 months; natal Sun,
 * Moon, Mercury, Jupiter, Saturn) and life_evidence.py (transits Jupiter,
 * Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const majorTurningPoints: FocusedReportSeoContent = {
  questionKey: "major_turning_points",
  searchIntent:
    "Life-map: someone wanting to know where the big shifts of emphasis fall in the coming years, the boundaries where one chapter gives way to another. Distinct from important-years-ahead (ranking years by significance), next-life-change-period (only the next shift) and current-phase-meaning (the present chapter).",
  seoTitle: {
    en: "Major Turning Points in My Life? Astrology | Jyotishasha",
    hi: "जीवन के बड़े मोड़ कब आएँगे? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report locating the few major changes of emphasis in your next five years, where one Dasha chapter hands over to the next, and what shifts with them.",
    hi: "₹51 की रिपोर्ट: अगले पाँच वर्षों में वे कुछ बड़े बदलाव, जहाँ एक दशा का अध्याय अगले को सौंपता है, और उनके साथ क्या बदलता है।",
  },
  h1: {
    en: "Major Life Phases: Where the Next Five Years Change Direction",
    hi: "जीवन के बड़े बदलाव: अगले पाँच साल कहाँ दिशा बदलते हैं",
  },
  intro: {
    en: [
      "Looking back, most people can name a handful of moments when life quietly changed course: a move, a new responsibility, a relationship, a shift in what mattered. In Jyotish, such changes of emphasis often line up with the hand-over from one Dasha period to the next.",
      "This report maps those hand-overs across the next five years. It reads where each dated Mahadasha and Antardasha transition falls, what houses its planets rule and occupy in your chart, starting from your 1st, 4th, 7th, 9th and 10th houses, and how the slow movement of Jupiter and Saturn colours the period around it. It then selects only the few turning points the evidence clearly supports and names the theme of each, rather than inventing events.",
    ],
    hi: [
      "पीछे देखने पर ज़्यादातर लोग कुछ ऐसे पल गिना सकते हैं जब जीवन ने चुपचाप दिशा बदली: कोई स्थान-परिवर्तन, कोई नई ज़िम्मेदारी, कोई रिश्ता, या जो मायने रखता था उसमें बदलाव। ज्योतिष में ऐसे ज़ोर-परिवर्तन अक्सर एक दशा से अगली दशा में बदलने के साथ मेल खाते हैं।",
      "यह रिपोर्ट अगले पाँच वर्षों में ऐसे बदलावों का नक्शा बनाती है। यह पढ़ती है कि हर तारीख-युक्त महादशा और अंतर्दशा का बदलाव कहाँ पड़ता है, उसके ग्रह आपकी कुंडली में किन भावों के स्वामी हैं और कहाँ बैठे हैं, शुरुआत आपके 1ले, 4थे, 7वें, 9वें और 10वें भाव से, और गुरु व शनि की धीमी चाल उसके आसपास के समय को कैसे रंगती है। फिर यह केवल वे कुछ मोड़ चुनती है जिनका प्रमाण साफ़ है और हर एक का विषय बताती है, घटनाएँ गढ़े बिना।",
    ],
  },
  analyzes: {
    en: [
      "The dated Mahadasha and Antardasha hand-overs across the next five years",
      "The 1st, 4th, 7th, 9th and 10th houses and their lords, plus any house ruled by a planet whose Dasha runs in that period",
      "Natal placements of the Sun, Moon, Mercury, Jupiter and Saturn, and of the active Dasha lords",
      "Jupiter and Saturn from your Lagna as the long-cycle backdrop to each hand-over",
    ],
    hi: [
      "अगले पाँच वर्षों में तारीख-युक्त महादशा और अंतर्दशा के बदलाव",
      "1ला, 4था, 7वाँ, 9वाँ और 10वाँ भाव और उनके स्वामी, साथ में हर वह भाव जिसका स्वामी उस अवधि में दशा चला रहा हो",
      "सूर्य, चंद्रमा, बुध, गुरु और शनि, और सक्रिय दशा-स्वामियों की जन्मजात स्थितियाँ",
      "हर बदलाव की लंबी पृष्ठभूमि के रूप में आपके लग्न से गुरु और शनि",
    ],
  },
  readingGuide: {
    heading: { en: "What a turning point is, and is not", hi: "मोड़ क्या है, और क्या नहीं" },
    points: {
      en: [
        "A turning point is a change of emphasis, such as from building a career to building a home, not a single dramatic day.",
        "Shifts usually build over weeks or months around a Dasha boundary. Notice the theme rather than waiting for an event.",
        "Use the map to prepare: finish what belongs to the outgoing chapter, and lay groundwork for the incoming one.",
        "Only a few well-supported turning points are named. The report never predicts accidents, illness or other specific events.",
      ],
      hi: [
        "मोड़ ज़ोर का बदलाव है, जैसे करियर बनाने से घर बनाने की ओर, कोई एक नाटकीय दिन नहीं।",
        "बदलाव आमतौर पर दशा की सीमा के आसपास हफ़्तों या महीनों में बनते हैं। किसी घटना का इंतज़ार करने के बजाय विषय पर ध्यान दें।",
        "नक्शे का उपयोग तैयारी में करें: जाते हुए अध्याय का काम पूरा करें, और आने वाले की नींव रखें।",
        "केवल कुछ अच्छी तरह समर्थित मोड़ बताए जाते हैं। रिपोर्ट कभी दुर्घटना, बीमारी या दूसरी खास घटनाओं की भविष्यवाणी नहीं करती।",
      ],
    },
  },
  differentiation: {
    en: "Important Years Ahead ranks the years by how much they matter. Next Phase Change looks only at the next boundary. This report maps all the major hand-overs across five years and names the theme each one opens.",
    hi: "'आगे के महत्वपूर्ण साल' वर्षों का क्रम इस आधार पर बताती है कि वे कितने अहम हैं। 'अगला जीवन बदलाव' केवल अगली सीमा देखती है। यह रिपोर्ट पाँच वर्षों के सभी बड़े बदलावों का नक्शा बनाती है और बताती है कि हर एक कौन-सा विषय खोलता है।",
  },
  internalLinks: [
    { path: "/reports/focused/important-years-ahead", localized: true, label: { en: "Important Years Ahead report (₹51)", hi: "आगे के महत्वपूर्ण साल रिपोर्ट (₹51)" } },
    { path: "/reports/focused/next-life-change-period", localized: true, label: { en: "Next Phase Change report (₹51)", hi: "अगला जीवन बदलाव रिपोर्ट (₹51)" } },
    { path: "/tools/grah-dasha-finder", localized: true, label: { en: "Free Dasha finder", hi: "मुफ़्त दशा फ़ाइंडर" } },
  ],
  benefits: {
    en: [
      "Maps the few major changes of emphasis across your next five years",
      "Names the theme each turning point opens, without inventing events",
      "Helps you prepare for a chapter before it begins",
    ],
    hi: [
      "अगले पाँच वर्षों के कुछ बड़े ज़ोर-परिवर्तनों का नक्शा",
      "हर मोड़ कौन-सा विषय खोलता है, घटनाएँ गढ़े बिना",
      "किसी अध्याय के शुरू होने से पहले उसकी तैयारी में मदद",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What are the major turning points in my coming years?”. It locates the supported Dasha hand-overs within five years and explains what each one shifts.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “आने वाले सालों में मेरे जीवन के बड़े turning points कौन-से हैं?” यह पाँच वर्षों के भीतर समर्थित दशा-बदलाव ढूँढती है और समझाती है कि हर एक क्या बदलता है।",
    },
    howJyotishApproachesIt: {
      en: "The backend calculates your houses and lords, the natal placements listed above, the multi-year Dasha sequence and Jupiter and Saturn dates. The reading interprets only those transitions and invents no event or date.",
      hi: "बैकएंड आपके भाव और स्वामी, ऊपर बताई जन्मजात स्थितियाँ, कई वर्षों का दशा-क्रम और गुरु व शनि की तारीखें गणना करता है। विश्लेषण केवल उन्हीं बदलावों की व्याख्या करता है और कोई घटना या तारीख नहीं गढ़ता।",
    },
    whoItIsFor: {
      en: "For someone at a crossroads, or simply curious about the shape of the next few years, who wants a calm overview rather than predictions.",
      hi: "उन लोगों के लिए जो किसी दोराहे पर हैं, या बस अगले कुछ वर्षों का आकार जानना चाहते हैं, और भविष्यवाणियों के बजाय शांत झलक चाहते हैं।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words: Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It names themes, not events, and never predicts death, illness, accidents or fixed life outcomes.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह विषय बताती है, घटनाएँ नहीं, और कभी मृत्यु, बीमारी, दुर्घटना या तय जीवन-नतीजों की भविष्यवाणी नहीं करती।",
    },
  },
  faqs: [
    {
      question: { en: "Will it tell me what exactly will happen at each turning point?", hi: "क्या यह बताएगी कि हर मोड़ पर ठीक-ठीक क्या होगा?" },
      answer: {
        en: "No. It names the area of life that gains emphasis, such as home, career or partnership. Specific events are not predicted.",
        hi: "नहीं। यह जीवन का वह क्षेत्र बताती है जिस पर ज़ोर बढ़ता है, जैसे घर, करियर या साझेदारी। खास घटनाओं की भविष्यवाणी नहीं होती।",
      },
    },
    {
      question: { en: "How many turning points will it list?", hi: "यह कितने मोड़ बताएगी?" },
      answer: {
        en: "Only the few that the evidence clearly supports, often two or three in five years, not every sub-period change.",
        hi: "केवल वे कुछ जिनका प्रमाण साफ़ है, अक्सर पाँच वर्षों में दो-तीन, हर उप-दशा का बदलाव नहीं।",
      },
    },
    {
      question: { en: "How is this different from Important Years Ahead?", hi: "यह 'आगे के महत्वपूर्ण साल' से कैसे अलग है?" },
      answer: {
        en: "This report finds the boundaries between chapters. Important Years Ahead compares whole years for how much they matter.",
        hi: "यह रिपोर्ट अध्यायों के बीच की सीमाएँ ढूँढती है। 'आगे के महत्वपूर्ण साल' पूरे वर्षों की तुलना करती है कि वे कितने अहम हैं।",
      },
    },
    {
      question: { en: "Can I use it alongside a free Dasha finder?", hi: "क्या मैं इसे मुफ़्त दशा फ़ाइंडर के साथ उपयोग कर सकता/सकती हूँ?" },
      answer: {
        en: "Yes. The free tool lists your Dasha dates; this report explains what the major hand-overs mean for you.",
        hi: "हाँ। मुफ़्त टूल आपकी दशा की तारीखें बताता है; यह रिपोर्ट समझाती है कि बड़े बदलाव आपके लिए क्या मायने रखते हैं।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 60, houses: [1, 4, 7, 9, 10], transits: ["Jupiter", "Saturn"], natalPlanets: ["Sun", "Moon", "Mercury", "Jupiter", "Saturn"], remedies: false },
};
