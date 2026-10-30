/**
 * kundali_match_for_marriage -- grounded in modules/focused_reports/prompt_specs.py
 * (DUAL, overview -> COMPATIBILITY; use actual Ashtakoot component results with
 * each chart's marriage house/lord context; do not recompute scores; explain
 * strengths and limitations rather than reducing marriage to a total score;
 * remedies=False), relationship_keys.py (houses 2, 5, 7; ALL_KOOTAS, so
 * relationship_evidence.py also supplies total_score/max_score from the existing
 * compute_ashtakoot; not a timing key -> no Dasha or transit evidence).
 */
import type { FocusedReportSeoContent } from "./types";

export const kundaliMatchForMarriage: FocusedReportSeoContent = {
  questionKey: "kundali_match_for_marriage",
  searchIntent:
    "Formal matching for a marriage decision: families or a couple wanting the full eight-koota (Ashtakoot) match interpreted with each chart's marriage context, not just a guna total. No timing. Distinct from long-term-compatibility (enduring themes, four kootas) and relationship-lead-to-marriage.",
  seoTitle: {
    en: "Kundali Match for Marriage: Interpreted | Jyotishasha",
    hi: "शादी के लिए कुंडली मिलान, विस्तार से | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report interpreting all eight Ashtakoot kootas and the total from both birth charts, with each person's marriage houses, instead of a bare guna score.",
    hi: "₹51 की रिपोर्ट: दोनों जन्म कुंडलियों से सभी आठ अष्टकूट कूटों और कुल अंक की व्याख्या, हर व्यक्ति के विवाह भावों के साथ, सिर्फ़ गुण संख्या नहीं।",
  },
  h1: {
    en: "Kundali Match for Marriage: Beyond the Guna Total",
    hi: "शादी के लिए कुंडली मिलान: गुण संख्या से आगे",
  },
  intro: {
    en: [
      "Most kundali matching ends with a single number out of 36. That number is a sum of eight separate kootas, each looking at something different: temperament, mutual friendship of the Moon signs, emotional and family harmony, and more. Two matches with the same total can have very different strengths and weak spots.",
      "This report starts from the existing Ashtakoot calculation on both of your charts: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot and Nadi, plus the total. It reads them alongside each person's 2nd, 5th and 7th houses and their lords, and explains what the match supports and where its limits are. It does not recompute or adjust any score, and it does not treat the total as the whole answer.",
    ],
    hi: [
      "ज़्यादातर कुंडली मिलान 36 में से एक संख्या पर खत्म हो जाता है। वह संख्या आठ अलग-अलग कूटों का जोड़ है, और हर कूट कुछ अलग देखता है: स्वभाव, चंद्र राशियों की आपसी मैत्री, भावनात्मक और पारिवारिक सामंजस्य, और भी बहुत कुछ। एक ही कुल अंक वाले दो मिलानों की ताकतें और कमज़ोरियाँ बहुत अलग हो सकती हैं।",
      "यह रिपोर्ट आप दोनों की कुंडलियों पर मौजूदा अष्टकूट गणना से शुरू होती है: वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी, साथ में कुल अंक। यह इन्हें हर व्यक्ति के 2रे, 5वें और 7वें भाव और उनके स्वामियों के साथ पढ़ती है, और बताती है कि मिलान किसका साथ देता है और उसकी सीमाएँ कहाँ हैं। यह कोई अंक दोबारा नहीं गिनती या बदलती, और कुल अंक को पूरा जवाब नहीं मानती।",
    ],
  },
  analyzes: {
    en: [
      "All eight Ashtakoot kootas from the existing calculation: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot and Nadi",
      "The total and maximum score exactly as calculated, read as one input among several",
      "The 2nd, 5th and 7th houses and their lords in each person's chart, kept separately attributed",
      "Natal placements of the Moon, Mercury and other relationship-relevant planets in both charts",
    ],
    hi: [
      "मौजूदा गणना के सभी आठ अष्टकूट कूट: वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट और नाड़ी",
      "कुल और अधिकतम अंक, ठीक वैसे ही जैसे गणना हुई, कई आधारों में से एक के रूप में पढ़े गए",
      "हर व्यक्ति की कुंडली में 2रा, 5वाँ और 7वाँ भाव और उनके स्वामी, अलग-अलग बताए गए",
      "दोनों कुंडलियों में चंद्रमा, बुध और रिश्ते से जुड़े दूसरे ग्रहों की स्थिति",
    ],
  },
  readingGuide: {
    heading: { en: "Reading a kundali match sensibly", hi: "कुंडली मिलान को समझदारी से कैसे पढ़ें" },
    points: {
      en: [
        "Look at the components, not just the total. A strong Graha Maitri or Gana can matter more day to day than a few extra points elsewhere.",
        "A low score in one koota is a topic to understand, not an automatic rejection. The report explains what each weak spot concerns.",
        "Each person's marriage houses add context the koota table alone does not show.",
        "Matching supports a family decision; it does not make it. Personal choice, values and practical fit still come first.",
      ],
      hi: [
        "सिर्फ़ कुल अंक नहीं, घटकों को देखें। मजबूत ग्रह मैत्री या गण रोज़मर्रा में कहीं और के कुछ अतिरिक्त अंकों से ज़्यादा मायने रख सकते हैं।",
        "किसी एक कूट में कम अंक समझने का विषय है, अपने-आप अस्वीकार नहीं। रिपोर्ट बताती है कि हर कमज़ोर हिस्सा किससे जुड़ा है।",
        "हर व्यक्ति के विवाह भाव वह संदर्भ जोड़ते हैं जो सिर्फ़ कूट तालिका नहीं दिखाती।",
        "मिलान परिवार के फ़ैसले में मदद करता है; फ़ैसला नहीं करता। निजी पसंद, मूल्य और व्यावहारिक मेल फिर भी पहले आते हैं।",
      ],
    },
  },
  differentiation: {
    en: "Long-Term Compatibility uses four kootas to describe the lasting dynamic. Relationship and Marriage weighs whether a current relationship can become a marriage. This report is the full Ashtakoot match, all eight kootas and the total, interpreted for a marriage decision.",
    hi: "'लंबे समय का तालमेल' टिकाऊ रिश्ते को समझाने के लिए चार कूटों का उपयोग करती है। 'रिश्ता और शादी' तौलती है कि मौजूदा रिश्ता शादी बन सकता है या नहीं। यह रिपोर्ट पूरा अष्टकूट मिलान है, सभी आठ कूट और कुल अंक, शादी के फ़ैसले के लिए समझाया गया।",
  },
  internalLinks: [
    { path: "/reports/focused/long-term-compatibility", localized: true, label: { en: "Long-Term Compatibility report (₹51)", hi: "लंबे समय का तालमेल रिपोर्ट (₹51)" } },
    { path: "/marriage-astrology/compatibility", localized: true, label: { en: "Compatibility in astrology (free guide)", hi: "ज्योतिष में अनुकूलता (मुफ़्त गाइड)" } },
    { path: "/marriage-astrology/arranged-marriage", localized: true, label: { en: "Arranged marriage in astrology (free guide)", hi: "ज्योतिष में अरेंज्ड मैरिज (मुफ़्त गाइड)" } },
    { path: "/tools/mangal-dosh", localized: true, label: { en: "Mangal dosh tool (free)", hi: "मंगल दोष टूल (मुफ़्त)" } },
  ],
  benefits: {
    en: [
      "All eight kootas from both of your birth charts interpreted, not just the total",
      "Each person's marriage houses read alongside the koota table",
      "Strengths and limits of the match explained without recalculating any score",
    ],
    hi: [
      "आप दोनों की जन्म कुंडलियों से सभी आठ कूटों की व्याख्या, सिर्फ़ कुल अंक नहीं",
      "कूट तालिका के साथ हर व्यक्ति के विवाह भाव",
      "कोई अंक दोबारा गिने बिना मिलान की ताकतें और सीमाएँ समझाई गईं",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Is our kundali match supportive for marriage?”. It interprets each koota and the total with both charts' marriage context, and explains strengths and limitations.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “क्या शादी के लिए हम दोनों की कुंडली का मिलान अनुकूल है?” यह दोनों कुंडलियों के विवाह संदर्भ के साथ हर कूट और कुल अंक की व्याख्या करती है, और ताकतें व सीमाएँ समझाती है।",
    },
    howJyotishApproachesIt: {
      en: "You enter both people's birth details. The backend calculates both charts and runs the existing Ashtakoot calculation; the reading uses those results exactly as given. No Dasha or transit timing is involved.",
      hi: "आप दोनों लोगों की जन्म जानकारी देते हैं। बैकएंड दोनों कुंडलियाँ गणना करता है और मौजूदा अष्टकूट गणना चलाता है; विश्लेषण उन्हीं नतीजों का ठीक वैसे ही उपयोग करता है। इसमें दशा या गोचर का समय शामिल नहीं है।",
    },
    whoItIsFor: {
      en: "For families assessing a proposal, or a couple who want their kundali milan explained properly rather than summed up as a number.",
      hi: "किसी रिश्ते पर विचार कर रहे परिवारों के लिए, या उस जोड़े के लिए जो अपना कुंडली मिलान सिर्फ़ एक संख्या में नहीं, ठीक से समझाया हुआ चाहता है।",
    },
    whatYouReceive: {
      en: "Your PDF has about 400 to 500 words under Direct Answer, Where Your Charts Support Each Other, Differences That Need Care, Practical Relationship Focus, and Bottom Line, from both people's birth details.",
      hi: "आपकी PDF में लगभग 400 से 500 शब्द होते हैं: सीधा जवाब, चार्ट में तालमेल के संकेत, किन फर्कों पर ध्यान दें, रिश्ते के लिए उपयोगी ध्यान, और सीधी बात; दोनों लोगों की जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. The total is not presented as a pass or fail and no score is adjusted. The report does not include remedies.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। कुल अंक को पास या फ़ेल के रूप में नहीं रखा जाता और कोई अंक नहीं बदला जाता। रिपोर्ट में उपाय शामिल नहीं हैं।",
    },
  },
  faqs: [
    {
      question: { en: "Is 18 out of 36 the minimum for marriage?", hi: "क्या शादी के लिए 36 में से 18 न्यूनतम है?" },
      answer: {
        en: "That rule of thumb is widely used, but the report does not treat any total as a pass or fail. It explains what the components themselves show.",
        hi: "यह मोटा नियम बहुत प्रचलित है, लेकिन रिपोर्ट किसी कुल अंक को पास या फ़ेल नहीं मानती। यह बताती है कि घटक खुद क्या दिखाते हैं।",
      },
    },
    {
      question: { en: "Does the report say how to fix Nadi or Bhakoot dosha?", hi: "क्या रिपोर्ट नाड़ी या भकूट दोष ठीक करने का तरीका बताती है?" },
      answer: {
        en: "No. This report does not include remedies. It explains what the result concerns so you can decide with full context.",
        hi: "नहीं। इस रिपोर्ट में उपाय शामिल नहीं हैं। यह बताती है कि नतीजा किससे जुड़ा है, ताकि आप पूरे संदर्भ के साथ फ़ैसला कर सकें।",
      },
    },
    {
      question: { en: "Will my score match other websites?", hi: "क्या मेरा अंक दूसरी वेबसाइटों से मेल खाएगा?" },
      answer: {
        en: "Ashtakoot conventions vary slightly between calculators, so totals can differ. This report uses Jyotishasha's existing calculation as given.",
        hi: "अष्टकूट के नियम अलग-अलग कैलकुलेटर में थोड़े अलग होते हैं, इसलिए कुल अंक भिन्न हो सकता है। यह रिपोर्ट Jyotishasha की मौजूदा गणना का ही उपयोग करती है।",
      },
    },
    {
      question: { en: "Does it check mangal dosh?", hi: "क्या यह मंगल दोष देखती है?" },
      answer: {
        en: "Mangal dosh is not one of the eight kootas. You can check it separately with the free Mangal Dosh tool.",
        hi: "मंगल दोष आठ कूटों में से नहीं है। आप इसे मुफ़्त मंगल दोष टूल से अलग से जाँच सकते हैं।",
      },
    },
  ],
  grounding: { archetype: "COMPATIBILITY", horizonMonths: null, houses: [2, 5, 7], transits: [], remedies: false },
};
