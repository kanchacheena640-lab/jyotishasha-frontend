/**
 * relationship_care_periods -- grounded in modules/focused_reports/prompt_specs.py
 * (DUAL, care_periods -> TIMING; combine both charts' recurring interaction
 * themes with their separately attributed MD/AD and Jupiter/Saturn timing;
 * explain which pressures may coincide and what care means; never predict
 * separation or infidelity; remedies=False), relationship_keys.py (houses 3, 4,
 * 7; kootas graha_maitri, gana, bhakoot; in RELATIONSHIP_TIMING_KEYS -> 12
 * months) and relationship_evidence.py (aligned Jupiter/Saturn for both people).
 */
import type { FocusedReportSeoContent } from "./types";

export const relationshipCarePeriods: FocusedReportSeoContent = {
  questionKey: "relationship_care_periods",
  searchIntent:
    "Two-person timing for patience: a couple asking which stretches in the coming year may need gentler communication because both people's periods add pressure at once. Distinct from conflict-areas (where friction starts, no timing) and right-time-to-consider-marriage (supportive timing for marriage).",
  seoTitle: {
    en: "When Does Our Relationship Need Extra Care? | Jyotishasha",
    hi: "रिश्ते में कब ज़्यादा ध्यान चाहिए? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report comparing both people's Dasha and Jupiter and Saturn over the next 12 months to show when your relationship may need extra patience.",
    hi: "₹51 की रिपोर्ट: अगले 12 महीनों में दोनों लोगों की दशा और गुरु व शनि की तुलना करके बताती है कि रिश्ते को कब ज़्यादा धैर्य चाहिए।",
  },
  h1: {
    en: "Relationship Care Periods: When Patience May Matter Most",
    hi: "रिश्ते में ध्यान देने के समय: जब धैर्य सबसे ज़्यादा मायने रखता है",
  },
  intro: {
    en: [
      "Relationships rarely strain because of one bad day. They strain when both people are under pressure at the same time: one is stressed at work while the other is dealing with family, and neither has much patience left. Knowing roughly when such stretches may line up lets you plan for them instead of being surprised.",
      "This report compares both charts over the same next 12 months. For each person it reads the running Mahadasha and Antardasha and the movement of Jupiter and Saturn, kept separately attributed. It sets those against the recurring themes in your 3rd, 4th and 7th houses and their lords and three Ashtakoot results, Graha Maitri, Gana and Bhakoot, to show when pressures may coincide and what care means in those stretches.",
    ],
    hi: [
      "रिश्ते शायद ही किसी एक बुरे दिन से तनाव में आते हैं। वे तब तनाव में आते हैं जब दोनों लोग एक ही समय पर दबाव में हों: एक काम से परेशान हो, दूसरा परिवार से जूझ रहा हो, और किसी के पास ज़्यादा धैर्य न बचे। मोटे तौर पर यह जानना कि ऐसे दौर कब मिल सकते हैं, आपको हैरान होने के बजाय उनकी तैयारी करने देता है।",
      "यह रिपोर्ट अगले उन्हीं 12 महीनों के लिए दोनों कुंडलियों की तुलना करती है। हर व्यक्ति के लिए यह चल रही महादशा और अंतर्दशा और गुरु व शनि की चाल पढ़ती है, अलग-अलग बताई गई। इन्हें यह आपके 3रे, 4थे और 7वें भाव और उनके स्वामियों के बार-बार के विषयों और तीन अष्टकूट नतीजों, ग्रह मैत्री, गण और भकूट, के सामने रखती है, ताकि दिख सके कि दबाव कब एक साथ आ सकते हैं और उन दौरों में ध्यान रखने का क्या मतलब है।",
    ],
  },
  analyzes: {
    en: [
      "Each person's Mahadasha and Antardasha across the same 12 months, separately attributed",
      "Jupiter and Saturn from each person's Lagna over that shared period",
      "Recurring interaction themes from the 3rd, 4th and 7th houses and their lords in both charts",
      "Graha Maitri, Gana and Bhakoot, as background for how pressure tends to show between you",
    ],
    hi: [
      "उन्हीं 12 महीनों में हर व्यक्ति की महादशा और अंतर्दशा, अलग-अलग बताई गई",
      "उस साझा अवधि में हर व्यक्ति के लग्न से गुरु और शनि",
      "दोनों कुंडलियों में 3रे, 4थे और 7वें भाव और उनके स्वामियों से बार-बार के विषय",
      "ग्रह मैत्री, गण और भकूट, इस पृष्ठभूमि के रूप में कि आपके बीच दबाव कैसे दिखता है",
    ],
  },
  readingGuide: {
    heading: { en: "What “extra care” means in practice", hi: "“ज़्यादा ध्यान” का व्यवहार में क्या मतलब है" },
    points: {
      en: [
        "Lower the stakes: postpone big joint decisions or difficult family conversations where you can.",
        "Check in more often and more briefly, rather than saving everything for one long talk.",
        "Assume tiredness before bad intent when a reply comes out sharper than expected.",
        "A care period is not a warning about the relationship. The report never predicts separation or infidelity.",
      ],
      hi: [
        "दाँव कम करें: जहाँ हो सके, बड़े साझा फ़ैसले या कठिन पारिवारिक बातचीत टालें।",
        "एक लंबी बातचीत के लिए सब कुछ बचाने के बजाय ज़्यादा बार और छोटी बात करें।",
        "जब कोई जवाब उम्मीद से तीखा लगे, तो बुरे इरादे से पहले थकान मानें।",
        "ध्यान देने का समय रिश्ते के बारे में चेतावनी नहीं है। रिपोर्ट कभी अलगाव या बेवफ़ाई की भविष्यवाणी नहीं करती।",
      ],
    },
  },
  differentiation: {
    en: "Understanding Conflict shows where friction starts but has no timing. Considering Marriage Together looks for supportive timing for a marriage decision. This report looks at the same next 12 months for both of you to find the stretches that call for more patience.",
    hi: "'टकराव को समझना' दिखाती है कि टकराव कहाँ से शुरू होता है, लेकिन उसमें समय नहीं है। 'साथ शादी पर विचार' शादी के फ़ैसले के लिए अनुकूल समय देखती है। यह रिपोर्ट आप दोनों के अगले उन्हीं 12 महीनों को देखकर वे दौर ढूँढती है जिनमें ज़्यादा धैर्य चाहिए।",
  },
  internalLinks: [
    { path: "/reports/focused/conflict-areas", localized: true, label: { en: "Understanding Conflict report (₹51)", hi: "टकराव को समझना रिपोर्ट (₹51)" } },
    { path: "/reports/focused/right-time-to-consider-marriage", localized: true, label: { en: "Considering Marriage Together report (₹51)", hi: "साथ शादी पर विचार रिपोर्ट (₹51)" } },
    { path: "/marriage-astrology/married-life", localized: true, label: { en: "Married life in astrology (free guide)", hi: "ज्योतिष में वैवाहिक जीवन (मुफ़्त गाइड)" } },
  ],
  benefits: {
    en: [
      "Compares both of your birth charts' current periods over the same 12 months",
      "Shows when pressures on each of you may coincide",
      "Explains what extra care looks like in those stretches",
    ],
    hi: [
      "अगले उन्हीं 12 महीनों में आप दोनों की जन्म कुंडलियों के मौजूदा दौरों की तुलना",
      "दिखाती है कि आप दोनों पर दबाव कब एक साथ आ सकते हैं",
      "समझाती है कि उन दौरों में ज़्यादा ध्यान कैसा दिखता है",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Which periods need extra care in our relationship?”. It compares both people's timing over the next 12 months and names the stretches where patience may matter more.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “हमारे रिश्ते में कौन-से समय में ज़्यादा ध्यान रखने की ज़रूरत है?” यह अगले 12 महीनों में दोनों लोगों के समय की तुलना करती है और वे दौर बताती है जिनमें धैर्य ज़्यादा मायने रख सकता है।",
    },
    howJyotishApproachesIt: {
      en: "Both partners' birth details are entered. The backend computes both charts, three koota results and each person's Dasha and Jupiter and Saturn dates over one aligned period; the reading compares them and invents no date.",
      hi: "दोनों साथियों की जन्म जानकारी ली जाती है। बैकएंड दोनों कुंडलियाँ, तीन कूट नतीजे और एक ही मिलाई गई अवधि में हर व्यक्ति की दशा व गुरु-शनि की तारीखें गणना करता है; विश्लेषण उनकी तुलना करता है और कोई तारीख नहीं गढ़ता।",
    },
    whoItIsFor: {
      en: "For a couple heading into a busy or uncertain year who want to anticipate the harder stretches together.",
      hi: "उस जोड़े के लिए जो किसी व्यस्त या अनिश्चित साल में जा रहा है और कठिन दौरों का अंदाज़ा साथ मिलकर लगाना चाहता है।",
    },
    whatYouReceive: {
      en: "One PDF of about 400 to 500 words: Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from both people's birth details.",
      hi: "लगभग 400 से 500 शब्दों की एक PDF: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात; दोनों लोगों की जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It never predicts separation or infidelity and cannot know what either person will do.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह कभी अलगाव या बेवफ़ाई की भविष्यवाणी नहीं करती और यह नहीं जान सकती कि कोई व्यक्ति क्या करेगा।",
    },
  },
  faqs: [
    {
      question: { en: "Does a care period mean we will fight?", hi: "क्या ध्यान देने के समय का मतलब है कि हम झगड़ेंगे?" },
      answer: {
        en: "No. It means pressure on both of you may overlap, so a little more patience is useful. What happens is still up to you.",
        hi: "नहीं। इसका मतलब है कि आप दोनों पर दबाव एक साथ आ सकता है, इसलिए थोड़ा ज़्यादा धैर्य उपयोगी है। क्या होगा, यह फिर भी आप पर है।",
      },
    },
    {
      question: { en: "Why does it need both charts?", hi: "इसके लिए दोनों कुंडलियाँ क्यों चाहिए?" },
      answer: {
        en: "Because the question is about overlap. One person's periods alone cannot show when both of you are under pressure at once.",
        hi: "क्योंकि सवाल एक साथ आने के बारे में है। अकेले एक व्यक्ति के दौर यह नहीं दिखा सकते कि आप दोनों कब एक साथ दबाव में हैं।",
      },
    },
    {
      question: { en: "Does it also show good periods?", hi: "क्या यह अच्छे समय भी दिखाती है?" },
      answer: {
        en: "Yes. Calmer stretches are noted too, which are useful for important conversations.",
        hi: "हाँ। शांत दौर भी बताए जाते हैं, जो अहम बातचीत के लिए उपयोगी हैं।",
      },
    },
    {
      question: { en: "Can it look further than a year?", hi: "क्या यह एक साल से आगे देख सकती है?" },
      answer: {
        en: "No. The backend aligns both people's timing over the next 12 months, and the report stays within that window.",
        hi: "नहीं। बैकएंड दोनों लोगों के समय को अगले 12 महीनों पर मिलाता है, और रिपोर्ट उसी अवधि के भीतर रहती है।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: [3, 4, 7], transits: ["Jupiter", "Saturn"], remedies: false },
};
