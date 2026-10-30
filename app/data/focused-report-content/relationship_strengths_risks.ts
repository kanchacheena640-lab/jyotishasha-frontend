/**
 * relationship_strengths_risks -- grounded in modules/focused_reports/prompt_specs.py
 * (DUAL, overview -> COMPATIBILITY; compare partnership, emotional and
 * communication-related natal factors with supplied compatibility components;
 * pair each major difficulty with a constructive adjustment and avoid treating
 * tendencies as behaviour facts; remedies=False), relationship_keys.py
 * (houses 3, 4, 7; kootas graha_maitri, gana, bhakoot, yoni; not a timing key ->
 * no Dasha or transit evidence) and relationship_evidence.py (both charts).
 */
import type { FocusedReportSeoContent } from "./types";

export const relationshipStrengthsRisks: FocusedReportSeoContent = {
  questionKey: "relationship_strengths_risks",
  searchIntent:
    "Balanced audit: a couple wanting a short, honest list of what is strong in their relationship and what is challenging, each challenge paired with a practical adjustment. No timing. Distinct from long-term-compatibility (ease vs recurring adjustment over years) and conflict-areas (friction only).",
  seoTitle: {
    en: "Our Relationship Strengths and Challenges | Jyotishasha",
    hi: "हमारे रिश्ते की ताकत और चुनौतियाँ | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report from both your birth charts naming the main strengths and challenges in your relationship, with a practical adjustment for each difficulty.",
    hi: "₹51 की रिपोर्ट, दोनों जन्म कुंडलियों से: आपके रिश्ते की मुख्य ताकतें और चुनौतियाँ, और हर कठिनाई के लिए एक व्यावहारिक सुधार।",
  },
  h1: {
    en: "Relationship Strengths and Challenges: An Honest Two-Chart View",
    hi: "रिश्ते की ताकत और चुनौतियाँ: दोनों कुंडलियों का ईमानदार नज़रिया",
  },
  intro: {
    en: [
      "Couples usually know roughly what works between them and what keeps going wrong, but rarely say it out loud in a balanced way. When things are tense, people list only problems; when things are good, they skip them. A structured view of both sides makes the conversation easier.",
      "This report compares both of your charts: each person's 3rd, 4th and 7th houses and their lords, which relate to communication, emotional comfort and partnership, plus the Moon, Mercury and other relationship-relevant planets. The Graha Maitri, Gana, Bhakoot and Yoni results from the site's standard matching calculation are folded in as well. It picks out the most important strengths and challenges and pairs every challenge with a constructive adjustment.",
    ],
    hi: [
      "जोड़े आमतौर पर मोटे तौर पर जानते हैं कि उनके बीच क्या ठीक चलता है और क्या बार-बार बिगड़ता है, लेकिन शायद ही कभी इसे संतुलित तरीके से कहते हैं। तनाव में लोग सिर्फ़ समस्याएँ गिनाते हैं; अच्छे समय में उन्हें छोड़ देते हैं। दोनों पक्षों का व्यवस्थित नज़रिया बातचीत आसान बनाता है।",
      "यह रिपोर्ट आप दोनों की कुंडलियों की तुलना करती है: हर व्यक्ति का 3रा, 4था और 7वाँ भाव और उनके स्वामी, जो बातचीत, भावनात्मक सुकून और साझेदारी से जुड़े हैं, साथ में चंद्रमा, बुध और रिश्ते से जुड़े दूसरे ग्रह। साइट की सामान्य मिलान गणना से ग्रह मैत्री, गण, भकूट और योनि के नतीजे भी इसमें शामिल किए जाते हैं। यह सबसे अहम ताकतें और चुनौतियाँ चुनती है और हर चुनौती के साथ एक रचनात्मक सुधार देती है।",
    ],
  },
  analyzes: {
    en: [
      "The 3rd, 4th and 7th houses and their lords in each chart: communication, emotional comfort and partnership",
      "Where the Moon, Mercury and the other relationship planets sit for each partner, as the basis for strengths and friction points",
      "Graha Maitri, Gana, Bhakoot and Yoni results, read for what they suggest about daily harmony and recurring friction",
      "The few strengths and challenges that matter most, rather than an exhaustive list",
    ],
    hi: [
      "हर कुंडली में 3रा, 4था और 7वाँ भाव और उनके स्वामी: बातचीत, भावनात्मक सुकून और साझेदारी",
      "हर साथी के लिए चंद्रमा, बुध और रिश्ते के दूसरे ग्रह कहाँ बैठे हैं, ताकत और टकराव के बिंदुओं का आधार",
      "ग्रह मैत्री, गण, भकूट और योनि के नतीजे, रोज़ के सामंजस्य और बार-बार के टकराव के लिहाज़ से पढ़े गए",
      "सबसे अहम कुछ ताकतें और चुनौतियाँ, लंबी सूची नहीं",
    ],
  },
  readingGuide: {
    heading: { en: "Using a strengths-and-challenges reading together", hi: "ताकत और चुनौतियों वाले विश्लेषण का साथ में उपयोग कैसे करें" },
    points: {
      en: [
        "Read the strengths first. They are what you can lean on when a challenge flares up.",
        "Each challenge comes with an adjustment, such as how you raise difficult topics or share household load. Try one at a time.",
        "Tendencies are not behaviour facts. The report never says what either of you will do, only what may come more or less easily.",
        "If friction is the main concern, Understanding Conflict focuses on that alone.",
      ],
      hi: [
        "पहले ताकतें पढ़ें। चुनौती उभरने पर इन्हीं पर टिका जा सकता है।",
        "हर चुनौती के साथ एक सुधार है, जैसे मुश्किल विषय कैसे उठाएँ या घर का बोझ कैसे बाँटें। एक बार में एक आज़माएँ।",
        "रुझान व्यवहार के तथ्य नहीं हैं। रिपोर्ट कभी नहीं कहती कि आप में से कोई क्या करेगा, बस यह कि क्या ज़्यादा या कम आसानी से आ सकता है।",
        "अगर टकराव ही मुख्य चिंता है, तो 'टकराव को समझना' केवल उसी पर केंद्रित है।",
      ],
    },
  },
  differentiation: {
    en: "Long-Term Compatibility looks at what stays easy and what keeps needing care over the years. Understanding Conflict looks only at friction. This report gives a balanced, practical audit: the main strengths, the main challenges and an adjustment for each.",
    hi: "'लंबे समय का तालमेल' देखती है कि वर्षों में क्या आसान रहता है और किस पर बार-बार ध्यान चाहिए। 'टकराव को समझना' केवल टकराव देखती है। यह रिपोर्ट संतुलित, व्यावहारिक जाँच देती है: मुख्य ताकतें, मुख्य चुनौतियाँ और हर एक के लिए सुधार।",
  },
  internalLinks: [
    { path: "/reports/focused/long-term-compatibility", localized: true, label: { en: "Long-Term Compatibility report (₹51)", hi: "लंबे समय का तालमेल रिपोर्ट (₹51)" } },
    { path: "/reports/focused/conflict-areas", localized: true, label: { en: "Understanding Conflict report (₹51)", hi: "टकराव को समझना रिपोर्ट (₹51)" } },
    { path: "/marriage-astrology/married-life", localized: true, label: { en: "Married life in astrology (free guide)", hi: "ज्योतिष में वैवाहिक जीवन (मुफ़्त गाइड)" } },
    { path: "/reports/love_relationship_report", localized: false, label: { en: "Full Love and Relationship Report", hi: "पूरी लव और रिलेशनशिप रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "The main strengths and challenges across both of your birth charts",
      "A constructive adjustment paired with every challenge",
      "Tendencies described as tendencies, never as verdicts on either person",
    ],
    hi: [
      "आप दोनों की जन्म कुंडलियों में मुख्य ताकतें और चुनौतियाँ",
      "हर चुनौती के साथ एक रचनात्मक सुधार",
      "रुझानों को रुझान ही बताया गया, किसी व्यक्ति पर फ़ैसला नहीं",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What are the strengths and challenges in our relationship?”. It names the most important of each from both charts and the selected kootas, with an adjustment for every challenge.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “हमारे रिश्ते की ताकत और चुनौतियाँ क्या हैं?” यह दोनों कुंडलियों और चुने गए कूटों से दोनों की सबसे अहम बातें बताती है, हर चुनौती के लिए एक सुधार के साथ।",
    },
    howJyotishApproachesIt: {
      en: "Checkout asks for birth details for each partner. Software computes both charts and the koota table first, then the written reading sorts those facts into strengths and challenges without inventing a rating. Dasha and transit timing are not part of this report.",
      hi: "चेकआउट पर हर साथी की जन्म जानकारी माँगी जाती है। सॉफ़्टवेयर पहले दोनों कुंडलियाँ और कूट तालिका निकालता है, फिर लिखित विश्लेषण उन तथ्यों को ताकत और चुनौतियों में बाँटता है, बिना कोई रेटिंग गढ़े। दशा और गोचर का समय इस रिपोर्ट का हिस्सा नहीं है।",
    },
    whoItIsFor: {
      en: "For a couple at any stage who want a fair, two-sided picture to talk through together, rather than a list of problems.",
      hi: "किसी भी दौर के उस जोड़े के लिए जो समस्याओं की सूची के बजाय साथ बैठकर बात करने के लिए निष्पक्ष, दोनों तरफ़ की तस्वीर चाहता है।",
    },
    whatYouReceive: {
      en: "The PDF runs to about 400 to 500 words: Direct Answer, Where Your Charts Support Each Other, Differences That Need Care, Practical Relationship Focus, and Bottom Line, from both people's birth details.",
      hi: "PDF लगभग 400 से 500 शब्दों की होती है: सीधा जवाब, चार्ट में तालमेल के संकेत, किन फर्कों पर ध्यान दें, रिश्ते के लिए उपयोगी ध्यान, और सीधी बात; दोनों लोगों की जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It is not relationship counselling, does not judge either person and never advises ending the relationship.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह रिलेशनशिप काउंसलिंग नहीं है, किसी व्यक्ति को नहीं आँकती और कभी रिश्ता खत्म करने की सलाह नहीं देती।",
    },
  },
  faqs: [
    {
      question: { en: "Will it blame one of us for the problems?", hi: "क्या यह समस्याओं के लिए हम में से किसी एक को दोष देगी?" },
      answer: {
        en: "No. Findings are attributed to the chart they come from, but they are described as tendencies, not faults.",
        hi: "नहीं। निष्कर्ष उसी कुंडली से जोड़े जाते हैं जिससे वे आते हैं, लेकिन उन्हें कमियों के रूप में नहीं, रुझानों के रूप में बताया जाता है।",
      },
    },
    {
      question: { en: "How many challenges will it list?", hi: "यह कितनी चुनौतियाँ बताएगी?" },
      answer: {
        en: "Only the few that matter most, each with an adjustment. It is not an exhaustive list of everything that could go wrong.",
        hi: "केवल सबसे अहम कुछ, हर एक के साथ एक सुधार। यह हर उस चीज़ की लंबी सूची नहीं है जो गलत हो सकती है।",
      },
    },
    {
      question: { en: "We are going through a rough patch. Is this the right report?", hi: "हम कठिन दौर से गुज़र रहे हैं। क्या यह सही रिपोर्ट है?" },
      answer: {
        en: "It can help you see the strengths you still share. If timing is the worry, Relationship Care Periods looks at when patience may matter more.",
        hi: "यह आपको वे ताकतें देखने में मदद कर सकती है जो अब भी आपके बीच हैं। अगर समय चिंता है, तो 'रिश्ते में ध्यान देने के समय' देखती है कि कब ज़्यादा धैर्य चाहिए।",
      },
    },
    {
      question: { en: "Does it replace couples counselling?", hi: "क्या यह कपल काउंसलिंग की जगह ले सकती है?" },
      answer: {
        en: "No. It can be a useful starting point for a conversation, but serious difficulties are better worked through with a qualified counsellor.",
        hi: "नहीं। यह बातचीत की उपयोगी शुरुआत हो सकती है, लेकिन गंभीर कठिनाइयों पर किसी योग्य काउंसलर के साथ काम करना बेहतर है।",
      },
    },
  ],
  grounding: { archetype: "COMPATIBILITY", horizonMonths: null, houses: [3, 4, 7], transits: [], remedies: false },
};
