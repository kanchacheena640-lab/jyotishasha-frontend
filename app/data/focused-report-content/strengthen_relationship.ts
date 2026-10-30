/**
 * strengthen_relationship -- grounded in modules/focused_reports/prompt_specs.py
 * (DUAL, answer_mode guidance -> DIRECTION; anchor guidance in the strongest
 * emotional, communication and partnership contrasts and actual compatibility
 * facts; offer a few mutual practices tied to the analysis without claiming to
 * control another person's choices; remedies=False), relationship_keys.py
 * (houses 3, 4, 7; kootas graha_maitri, gana, bhakoot; not a timing key -> no
 * Dasha or transit evidence, so master_contract.py omits Current Timing Context).
 */
import type { FocusedReportSeoContent } from "./types";

export const strengthenRelationship: FocusedReportSeoContent = {
  questionKey: "strengthen_relationship",
  searchIntent:
    "Action-oriented: a couple who want a few concrete, shared practices to strengthen the relationship, grounded in their two charts rather than generic advice. No timing. Distinct from conflict-areas and emotional-communication-fit, which diagnose rather than prescribe.",
  seoTitle: {
    en: "How Can We Strengthen Our Relationship? | Jyotishasha",
    hi: "रिश्ता और मजबूत कैसे बनाएँ? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report that turns the main contrasts between both your birth charts into a few shared practices for a stronger, steadier relationship.",
    hi: "₹51 की रिपोर्ट: आप दोनों की जन्म कुंडलियों के मुख्य फ़र्कों को कुछ साझा आदतों में बदलती है, ताकि रिश्ता ज़्यादा मज़बूत और स्थिर हो।",
  },
  h1: {
    en: "Strengthening Your Relationship: Shared Practices From Both Charts",
    hi: "रिश्ता मजबूत बनाना: दोनों कुंडलियों से निकली साझा आदतें",
  },
  intro: {
    en: [
      "Generic relationship advice, such as communicate more or make time for each other, is rarely wrong but rarely specific. What helps one couple may not be what another couple needs. A more useful question is: given who the two of us actually are, what are the few habits most worth building?",
      "This report answers that from both of your charts. It looks at the clearest contrasts and common ground in the 3rd, 4th and 7th houses and their lords for each person, alongside three Ashtakoot results: Graha Maitri, Gana and Bhakoot. It then turns those findings into a short list of mutual practices. The suggestions are for both of you to choose together; nothing in the report claims to change or control the other person.",
    ],
    hi: [
      "आम रिश्ता-सलाह, जैसे ज़्यादा बात करो या एक-दूसरे के लिए समय निकालो, शायद ही गलत होती है, लेकिन शायद ही खास होती है। जो एक जोड़े के लिए काम करे, ज़रूरी नहीं दूसरे को उसी की ज़रूरत हो। ज़्यादा उपयोगी सवाल है: हम दोनों असल में जैसे हैं, उसे देखते हुए कौन-सी कुछ आदतें बनाना सबसे ज़्यादा फ़ायदेमंद है?",
      "यह रिपोर्ट आप दोनों की कुंडलियों से इसका जवाब देती है। यह हर व्यक्ति के 3रे, 4थे और 7वें भाव और उनके स्वामियों में सबसे साफ़ फ़र्क और साझा आधार देखती है, साथ में तीन अष्टकूट नतीजे: ग्रह मैत्री, गण और भकूट। फिर इन निष्कर्षों को साझा आदतों की छोटी सूची में बदलती है। सुझाव आप दोनों के मिलकर चुनने के लिए हैं; रिपोर्ट में कुछ भी दूसरे व्यक्ति को बदलने या नियंत्रित करने का दावा नहीं करता।",
    ],
  },
  analyzes: {
    en: [
      "Common ground between your charts that is worth deliberately building on",
      "The sharpest contrasts in the 3rd, 4th and 7th houses and their lords, which practices should address",
      "Graha Maitri, Gana and Bhakoot, used to anchor suggestions in actual compatibility facts",
      "A small number of shared practices, each tied to a specific finding",
    ],
    hi: [
      "आपकी कुंडलियों के बीच साझा आधार, जिस पर जानबूझकर आगे बढ़ना फ़ायदेमंद है",
      "3रे, 4थे और 7वें भाव और उनके स्वामियों में सबसे तीखे फ़र्क, जिन्हें आदतों से संभालना है",
      "ग्रह मैत्री, गण और भकूट, सुझावों को असली मिलान तथ्यों से जोड़ने के लिए",
      "कुछ साझा आदतें, हर एक किसी खास निष्कर्ष से जुड़ी",
    ],
  },
  readingGuide: {
    heading: { en: "Turning a reading into habits", hi: "विश्लेषण को आदतों में कैसे बदलें" },
    points: {
      en: [
        "Pick one practice to start with and try it for a few weeks before adding another.",
        "Choose practices together. A habit one partner imposes on the other rarely lasts.",
        "Build on the common ground first; it makes the harder adjustments feel safer.",
        "If a difference feels serious or unsafe, a qualified counsellor is the right next step, not a horoscope.",
      ],
      hi: [
        "शुरुआत के लिए एक आदत चुनें और दूसरी जोड़ने से पहले कुछ हफ़्ते उसे आज़माएँ।",
        "आदतें साथ मिलकर चुनें। एक साथी की दूसरे पर थोपी गई आदत शायद ही टिकती है।",
        "पहले साझा आधार पर काम करें; इससे कठिन बदलाव ज़्यादा सुरक्षित लगते हैं।",
        "अगर कोई फ़र्क गंभीर या असुरक्षित लगे, तो सही अगला कदम योग्य काउंसलर है, कोई राशिफल नहीं।",
      ],
    },
  },
  differentiation: {
    en: "Understanding Conflict and Emotional and Communication Fit explain what is happening between you. This report is the practical one: it uses the same kind of two-chart findings to suggest what the two of you can do about it.",
    hi: "'टकराव को समझना' और 'भावनाओं और बातचीत का तालमेल' समझाती हैं कि आपके बीच क्या हो रहा है। यह रिपोर्ट व्यावहारिक है: यह उसी तरह के दो-कुंडली निष्कर्षों से सुझाती है कि आप दोनों इसके बारे में क्या कर सकते हैं।",
  },
  internalLinks: [
    { path: "/reports/focused/emotional-communication-fit", localized: true, label: { en: "Emotional and Communication Fit report (₹51)", hi: "भावनाओं और बातचीत का तालमेल रिपोर्ट (₹51)" } },
    { path: "/reports/focused/conflict-areas", localized: true, label: { en: "Understanding Conflict report (₹51)", hi: "टकराव को समझना रिपोर्ट (₹51)" } },
    { path: "/marriage-astrology/married-life", localized: true, label: { en: "Married life in astrology (free guide)", hi: "ज्योतिष में वैवाहिक जीवन (मुफ़्त गाइड)" } },
    { path: "/reports/love_relationship_report", localized: false, label: { en: "Full Love and Relationship Report", hi: "पूरी लव और रिलेशनशिप रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "Built from both of your birth charts, not generic relationship tips",
      "A short list of shared practices, each tied to a specific finding",
      "Respects both people's choices; nothing is imposed on either of you",
    ],
    hi: [
      "आप दोनों की जन्म कुंडलियों से बनी, आम रिश्ता-सलाह नहीं",
      "साझा आदतों की छोटी सूची, हर एक किसी खास निष्कर्ष से जुड़ी",
      "दोनों की पसंद का सम्मान; आप में से किसी पर कुछ थोपा नहीं जाता",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “What can we do to make our relationship stronger?”. It translates the clearest strengths and contrasts between both charts into a few mutual practices.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “अपने रिश्ते को और मजबूत बनाने के लिए हम क्या कर सकते हैं?” यह दोनों कुंडलियों के बीच सबसे साफ़ ताकतों और फ़र्कों को कुछ साझा आदतों में बदलती है।",
    },
    howJyotishApproachesIt: {
      en: "You provide both partners' birth details. The backend calculates both charts and three koota results; the written reading builds its suggestions only from those facts. No Dasha or transit timing is supplied, so the PDF's timing section is left out.",
      hi: "आप दोनों साथियों की जन्म जानकारी देते हैं। बैकएंड दोनों कुंडलियाँ और तीन कूट नतीजे गणना करता है; लिखित विश्लेषण अपने सुझाव केवल उन्हीं तथ्यों से बनाता है। दशा या गोचर का समय नहीं दिया जाता, इसलिए PDF का समय वाला हिस्सा छोड़ दिया जाता है।",
    },
    whoItIsFor: {
      en: "For a couple in a reasonably good place who want to make it better on purpose, or one coming out of a rough patch and looking for a fresh start.",
      hi: "उस जोड़े के लिए जो ठीक-ठाक स्थिति में है और उसे जानबूझकर बेहतर बनाना चाहता है, या जो किसी कठिन दौर से निकलकर नई शुरुआत ढूँढ रहा है।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words under Direct Answer, Natural Strengths and Tendencies, Most Relevant Directions, Practical Focus, and Bottom Line, from both people's birth details. The Current Timing Context section is omitted because this report has no timing evidence.",
      hi: "लगभग 400 से 500 शब्दों की PDF, इन शीर्षकों में: सीधा जवाब, ताकतें और रुझान, सबसे उपयोगी दिशाएँ, व्यावहारिक ध्यान, और सीधी बात; दोनों लोगों की जन्म जानकारी से। 'अभी के समय का संदर्भ' वाला हिस्सा नहीं होता, क्योंकि इस रिपोर्ट में समय का प्रमाण नहीं है।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It cannot make anyone change, does not replace counselling, and makes no claim about the future of the relationship.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह किसी को बदल नहीं सकती, काउंसलिंग की जगह नहीं लेती, और रिश्ते के भविष्य के बारे में कोई दावा नहीं करती।",
    },
  },
  faqs: [
    {
      question: { en: "What kind of practices does it suggest?", hi: "यह किस तरह की आदतें सुझाती है?" },
      answer: {
        en: "Everyday, mutual ones, such as how you raise difficult topics or share responsibilities, each linked to something in your charts.",
        hi: "रोज़मर्रा की, साझा आदतें, जैसे मुश्किल विषय कैसे उठाएँ या ज़िम्मेदारियाँ कैसे बाँटें, हर एक आपकी कुंडलियों की किसी बात से जुड़ी।",
      },
    },
    {
      question: { en: "Does it include rituals or gemstones?", hi: "क्या इसमें अनुष्ठान या रत्न शामिल हैं?" },
      answer: {
        en: "No. The suggestions are practical habits between the two of you.",
        hi: "नहीं। सुझाव आप दोनों के बीच की व्यावहारिक आदतें हैं।",
      },
    },
    {
      question: { en: "Why is there no timing section?", hi: "समय वाला हिस्सा क्यों नहीं है?" },
      answer: {
        en: "The backend supplies no Dasha or transit evidence for this question, and the report never invents dates. Relationship Care Periods covers timing.",
        hi: "इस सवाल के लिए बैकएंड दशा या गोचर का प्रमाण नहीं देता, और रिपोर्ट कभी तारीखें नहीं गढ़ती। समय के लिए 'रिश्ते में ध्यान देने के समय' है।",
      },
    },
    {
      question: { en: "Can one partner use it to change the other?", hi: "क्या एक साथी इसका उपयोग दूसरे को बदलने के लिए कर सकता है?" },
      answer: {
        en: "That is not what it is for. Every suggestion is meant to be agreed and practised by both of you.",
        hi: "यह इसके लिए नहीं है। हर सुझाव आप दोनों के मिलकर तय करने और अपनाने के लिए है।",
      },
    },
  ],
  grounding: { archetype: "DIRECTION", horizonMonths: null, houses: [3, 4, 7], transits: [], remedies: false },
};
