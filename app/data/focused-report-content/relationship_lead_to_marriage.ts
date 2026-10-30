/**
 * relationship_lead_to_marriage -- grounded in modules/focused_reports/prompt_specs.py
 * (DUAL, overview -> COMPATIBILITY; compare each person's relationship/marriage
 * house-lord facts and existing Ashtakoot components, preserving person
 * attribution; balance strengths and work needed for commitment; no guaranteed
 * marriage; remedies=False), relationship_keys.py (houses 2, 5, 7, 11; kootas
 * graha_maitri, gana, bhakoot, nadi; in RELATIONSHIP_TIMING_KEYS -> 12 months)
 * and relationship_evidence.py (both charts; Jupiter/Saturn for both).
 */
import type { FocusedReportSeoContent } from "./types";

export const relationshipLeadToMarriage: FocusedReportSeoContent = {
  questionKey: "relationship_lead_to_marriage",
  searchIntent:
    "Two-chart potential: a couple asking whether their charts together support the relationship progressing to marriage, and what will need work. Distinct from relationship-to-marriage-window (one chart, timing) and kundali-match-for-marriage (full eight-koota match interpretation).",
  seoTitle: {
    en: "Will Our Relationship Lead to Marriage? | Jyotishasha",
    hi: "क्या हमारा रिश्ता शादी तक पहुँचेगा? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report reading both your charts: how they support or complicate your relationship progressing to marriage, plus both people's next 12 months.",
    hi: "₹51 की रिपोर्ट, दोनों कुंडलियों से: आपका रिश्ता शादी तक पहुँचने में कुंडलियाँ कैसे साथ देती हैं या कहाँ उलझन है, और दोनों के अगले 12 महीने।",
  },
  h1: {
    en: "Relationship and Marriage: Do Both Charts Support the Next Step?",
    hi: "रिश्ता और शादी: क्या दोनों कुंडलियाँ अगले कदम का साथ देती हैं?",
  },
  intro: {
    en: [
      "When a couple starts talking seriously about marriage, two questions sit underneath: are we a good basis for a lifelong commitment, and what will we have to work at? A single chart cannot answer that. It takes both people's charts, read side by side.",
      "This report uses both sets of birth details. For each of you it reads the 2nd, 5th, 7th and 11th houses and their lords, plus four Ashtakoot components from the existing matching calculation: Graha Maitri, Gana, Bhakoot and Nadi. It also looks at each person's Dasha and Jupiter and Saturn over the next 12 months. It keeps clear which finding belongs to whom, and balances what supports commitment with what will need effort.",
    ],
    hi: [
      "जब कोई जोड़ा शादी के बारे में गंभीरता से बात करने लगता है, तो दो सवाल अंदर रहते हैं: क्या हम जीवनभर के रिश्ते का अच्छा आधार हैं, और हमें किन बातों पर मेहनत करनी होगी? एक कुंडली इसका जवाब नहीं दे सकती। इसके लिए दोनों लोगों की कुंडलियाँ साथ रखकर पढ़नी होती हैं।",
      "यह रिपोर्ट दोनों की जन्म जानकारी का उपयोग करती है। आप दोनों में से हर एक के लिए यह 2वें, 5वें, 7वें और 11वें भाव और उनके स्वामी पढ़ती है, साथ ही मौजूदा मिलान गणना के चार अष्टकूट घटक: ग्रह मैत्री, गण, भकूट और नाड़ी। यह अगले 12 महीनों में हर व्यक्ति की दशा और गुरु व शनि भी देखती है। यह साफ़ रखती है कि कौन-सा निष्कर्ष किसका है, और प्रतिबद्धता को सहारा देने वाली बातों को मेहनत माँगने वाली बातों के साथ तौलती है।",
    ],
  },
  analyzes: {
    en: [
      "The 2nd, 5th, 7th and 11th houses and their lords in each person's chart, attributed separately",
      "Natal placements of the Moon, Mercury and other relationship-relevant planets in both charts",
      "Four Ashtakoot components from the existing calculation: Graha Maitri, Gana, Bhakoot and Nadi",
      "Each person's Dasha periods and Jupiter and Saturn over the same next 12 months",
    ],
    hi: [
      "हर व्यक्ति की कुंडली में 2, 5, 7 और 11वाँ भाव और उनके स्वामी, अलग-अलग बताए गए",
      "दोनों कुंडलियों में चंद्रमा, बुध और रिश्ते से जुड़े दूसरे ग्रहों की स्थिति",
      "मौजूदा गणना के चार अष्टकूट घटक: ग्रह मैत्री, गण, भकूट और नाड़ी",
      "अगले उन्हीं 12 महीनों में हर व्यक्ति की दशा और गुरु व शनि",
    ],
  },
  readingGuide: {
    heading: { en: "Support for commitment, and the work it needs", hi: "प्रतिबद्धता का सहारा, और उसके लिए ज़रूरी मेहनत" },
    points: {
      en: [
        "Each finding is attributed to one person or to the pair, so neither of you is described through the other's chart.",
        "Koota results are inputs, not a verdict. A weaker component points to something to talk about, not a reason to end things.",
        "The 12-month view shows whether both of you are in supportive periods at the same time, which often matters for the pace.",
        "The report never promises a marriage and never tells either of you what to decide.",
      ],
      hi: [
        "हर निष्कर्ष किसी एक व्यक्ति या जोड़े से जोड़ा जाता है, ताकि आप में से किसी को दूसरे की कुंडली से न आँका जाए।",
        "कूट के नतीजे आधार हैं, फ़ैसला नहीं। कमज़ोर घटक बात करने का विषय दिखाता है, रिश्ता खत्म करने की वजह नहीं।",
        "12 महीनों का नज़रिया दिखाता है कि क्या आप दोनों एक ही समय पर अनुकूल दौर में हैं, जो अक्सर रफ़्तार के लिए मायने रखता है।",
        "रिपोर्ट कभी शादी का वादा नहीं करती और कभी आप में से किसी को नहीं बताती कि क्या फ़ैसला करें।",
      ],
    },
  },
  differentiation: {
    en: "Relationship Towards Marriage reads one chart for one person's timing. Kundali Match for Marriage interprets all eight kootas and the total. This report asks the couple's question: do both charts together support the relationship becoming a marriage, and what needs work?",
    hi: "'रिश्ते से शादी की ओर' एक व्यक्ति के समय के लिए एक कुंडली पढ़ती है। 'शादी के लिए कुंडली मिलान' सभी आठ कूटों और कुल अंक की व्याख्या करती है। यह रिपोर्ट जोड़े का सवाल पूछती है: क्या दोनों कुंडलियाँ मिलकर रिश्ते के शादी बनने का साथ देती हैं, और किस पर मेहनत चाहिए?",
  },
  internalLinks: [
    { path: "/reports/focused/kundali-match-for-marriage", localized: true, label: { en: "Kundali Match for Marriage report (₹51)", hi: "शादी के लिए कुंडली मिलान रिपोर्ट (₹51)" } },
    { path: "/reports/focused/relationship-to-marriage-window", localized: true, label: { en: "Relationship Towards Marriage report, one chart (₹51)", hi: "रिश्ते से शादी की ओर रिपोर्ट, एक कुंडली (₹51)" } },
    { path: "/marriage-astrology/love-marriage", localized: true, label: { en: "Love marriage in astrology (free guide)", hi: "ज्योतिष में लव मैरिज (मुफ़्त गाइड)" } },
    { path: "/reports/marriage_report", localized: false, label: { en: "Full Marriage Report", hi: "पूरी विवाह रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "Built from both of your birth charts, with every finding attributed to the right person",
      "Balances what supports commitment against what will need work",
      "Shows whether both of you are in supportive periods over the next 12 months",
    ],
    hi: [
      "आप दोनों की जन्म कुंडलियों से बनी, हर निष्कर्ष सही व्यक्ति से जोड़कर",
      "प्रतिबद्धता को सहारा देने वाली बातों को मेहनत माँगने वाली बातों के साथ तौलती है",
      "दिखाती है कि अगले 12 महीनों में क्या आप दोनों अनुकूल दौर में हैं",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Do our charts support our relationship leading to marriage?”. It weighs both charts and the selected Ashtakoot components, then sets out strengths and the work needed for commitment.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “क्या हमारे चार्ट बताते हैं कि हमारा रिश्ता शादी तक पहुँच सकता है?” यह दोनों कुंडलियों और चुने गए अष्टकूट घटकों को तौलती है, फिर ताकतें और प्रतिबद्धता के लिए ज़रूरी मेहनत बताती है।",
    },
    howJyotishApproachesIt: {
      en: "You enter both people's birth details. The backend calculates both charts, the koota results and both people's Dasha and Jupiter and Saturn dates; the reading interprets those facts and adds no score of its own.",
      hi: "आप दोनों लोगों की जन्म जानकारी देते हैं। बैकएंड दोनों कुंडलियाँ, कूट के नतीजे और दोनों की दशा व गुरु-शनि की तारीखें गणना करता है; विश्लेषण उन्हीं तथ्यों की व्याख्या करता है और अपनी ओर से कोई अंक नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For a couple seriously considering marriage who want a balanced, two-sided view before talking to their families.",
      hi: "उस जोड़े के लिए जो गंभीरता से शादी पर विचार कर रहा है और परिवारों से बात करने से पहले संतुलित, दोनों तरफ़ का नज़रिया चाहता है।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words: Direct Answer, Where Your Charts Support Each Other, Differences That Need Care, Practical Relationship Focus, and Bottom Line, from both people's birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, चार्ट में तालमेल के संकेत, किन फर्कों पर ध्यान दें, रिश्ते के लिए उपयोगी ध्यान, और सीधी बात; दोनों लोगों की जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not predict a marriage, measure feelings or replace an honest conversation between you.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह शादी की भविष्यवाणी नहीं करती, भावनाएँ नहीं मापती, और आपके बीच ईमानदार बातचीत की जगह नहीं लेती।",
    },
  },
  faqs: [
    {
      question: { en: "What do we need to provide?", hi: "हमें क्या जानकारी देनी होगी?" },
      answer: {
        en: "Date, time and place of birth for both of you. The report cannot be produced from one chart.",
        hi: "आप दोनों की जन्म तारीख, समय और स्थान। यह रिपोर्ट एक कुंडली से नहीं बन सकती।",
      },
    },
    {
      question: { en: "Why only four kootas and not all eight?", hi: "आठ के बजाय सिर्फ़ चार कूट क्यों?" },
      answer: {
        en: "The backend selects the components most relevant to this question. Kundali Match for Marriage interprets all eight with the total.",
        hi: "बैकएंड इस सवाल के लिए सबसे ज़्यादा प्रासंगिक घटक चुनता है। 'शादी के लिए कुंडली मिलान' कुल अंक के साथ सभी आठ की व्याख्या करती है।",
      },
    },
    {
      question: { en: "What if one component is weak, such as Nadi?", hi: "अगर कोई घटक, जैसे नाड़ी, कमज़ोर हो तो?" },
      answer: {
        en: "The report explains it in context with both charts and pairs it with what supports you. It is not presented as a reason to break up.",
        hi: "रिपोर्ट उसे दोनों कुंडलियों के संदर्भ में समझाती है और साथ में बताती है कि क्या आपका साथ देता है। उसे अलग होने की वजह के रूप में नहीं रखा जाता।",
      },
    },
    {
      question: { en: "Does it give a date for the wedding?", hi: "क्या यह शादी की तारीख देती है?" },
      answer: {
        en: "No. It reads the next 12 months for both of you as supportive or quieter, but sets no date.",
        hi: "नहीं। यह आप दोनों के अगले 12 महीनों को अनुकूल या शांत के रूप में पढ़ती है, लेकिन कोई तारीख तय नहीं करती।",
      },
    },
  ],
  grounding: { archetype: "COMPATIBILITY", horizonMonths: 12, houses: [2, 5, 7, 11], transits: ["Jupiter", "Saturn"], remedies: false },
};
