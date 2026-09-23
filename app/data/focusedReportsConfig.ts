// app/data/focusedReportsConfig.ts

/**
 * Focused Reports (₹51) -- P0.4 frontend presentation/SEO/routing config.
 *
 * This file intentionally holds ONLY what app/data/intentCatalog.json (the
 * exact export of the backend's authoritative catalog) does NOT already
 * supply: a human-readable SEO slug, marketing/landing-page copy, benefits,
 * FAQ, and category label -- never the question_key, never the EN/HI
 * title/question text itself, which are always read live from
 * intentCatalog.ts (getIntentQuestion / resolveIntentSelection) so this
 * file can never drift from the backend's own wording.
 *
 * PILOT ONLY: exactly the 2 approved pilot products (major_kundali_obstacles,
 * major_kundali_strengths). Do not add the remaining 61 here yet -- doing so
 * would make them routable/indexable before their own SEO content, sample
 * strategy and (eventually) activation are approved. See P0.1's SEO audit,
 * Section K, for the intended later rollout order.
 *
 * SECURITY: `humanSlug` is a purely cosmetic URL identifier. The stable
 * identity used for anything that reaches the backend (order creation,
 * analytics dimensions, catalog lookups) is ALWAYS `questionKey` --
 * resolved from `humanSlug` once, at the route boundary
 * (getFocusedReportConfigBySlug), and never re-derived from visible text.
 */
import { getIntentQuestion, getIntent, type IntentCategoryId } from "./intentCatalog";

export interface FocusedReportFaq {
  question: { en: string; hi: string };
  answer: { en: string; hi: string };
}

export interface FocusedReportConfig {
  /** Cosmetic, human-readable URL segment -- e.g. "major-kundali-obstacles". Never sent to the backend. */
  humanSlug: string;
  /** The ONE stable identity: the backend's question_key, also this product's report_slug in ReportProduct. */
  questionKey: string;
  category: IntentCategoryId;
  priceRupees: 51;
  /** Short SEO/H1 title -- NOT exported by intentCatalog.json today (only the long customer
   * question is). Copied verbatim from the backend's own authoritative source,
   * modules/focused_reports/prompt_specs.py::PROMPT_SPECS[questionKey].title -- the exact
   * same text pdf_adapter.py already uses as this report's PDF product title -- never a
   * re-worded alternative. Re-verify against that source if this product's spec ever changes. */
  title: { en: string; hi: string };
  /** 3-4 short above-fold benefit lines. */
  benefits: { en: string[]; hi: string[] };
  /** Below-fold explanatory sections, in a fixed order (see FocusedReportDetails). */
  sections: {
    whatItTellsYou: { en: string; hi: string };
    howJyotishApproachesIt: { en: string; hi: string };
    whoItIsFor: { en: string; hi: string };
    whatYouReceive: { en: string; hi: string };
    trustAndLimitations: { en: string; hi: string };
  };
  faqs: FocusedReportFaq[];
  /** SEO meta description (distinct from the H1/hook, which always comes from intentCatalog). */
  metaDescription: { en: string; hi: string };
}

export const FOCUSED_REPORTS_CONFIG: Record<string, FocusedReportConfig> = {
  "major-kundali-obstacles": {
    humanSlug: "major-kundali-obstacles",
    questionKey: "major_kundali_obstacles",
    category: "life",
    priceRupees: 51,
    title: { en: "Major Obstacles in Your Kundali", hi: "आपकी कुंडली की प्रमुख बाधाएँ" },
    benefits: {
      en: [
        "Identifies the 2-4 most meaningful challenges in your birth chart -- not an exhaustive negative list",
        "Separates long-standing birth-chart patterns from what your current Dasha and transits are actively activating",
        "Practical, conditional remedies tied to what your chart actually shows -- never a guaranteed fix",
        "Calm, plain-language reading with no fear-based or fatalistic language",
      ],
      hi: [
        "आपकी जन्म कुंडली की 2-4 सबसे मायने रखने वाली चुनौतियाँ बताता है -- हर नकारात्मक चीज़ की पूरी सूची नहीं",
        "कुंडली के पुराने, स्थायी पैटर्न को अलग करता है उन बातों से जो आपकी मौजूदा दशा और गोचर अभी सक्रिय कर रहे हैं",
        "आपकी कुंडली में सच में जो दिखता है उसी से जुड़े व्यावहारिक, सशर्त उपाय -- कभी पक्के नतीजे की गारंटी नहीं",
        "शांत, सीधी भाषा में विश्लेषण, कोई डर पैदा करने वाली या नियति-आधारित भाषा नहीं",
      ],
    },
    sections: {
      whatItTellsYou: {
        en: "This report reads your whole birth chart -- not one house or one planet -- to identify the challenges that genuinely stand out. It distinguishes durable, birth-chart-level obstacles from what is presently activated by your current Mahadasha, Antardasha and Jupiter/Saturn/Rahu transits, so you understand both what has always been part of your chart's pattern and what specifically deserves attention right now.",
        hi: "यह रिपोर्ट आपकी पूरी जन्म कुंडली को देखती है -- सिर्फ एक भाव या एक ग्रह को नहीं -- ताकि सच में मायने रखने वाली चुनौतियों की पहचान की जा सके। यह कुंडली के स्थायी, जन्मजात पैटर्न को अलग करती है उन बातों से जो आपकी मौजूदा महादशा, अंतर्दशा और गुरु/शनि/राहु के गोचर से अभी सक्रिय हैं -- ताकि आप समझ सकें कि आपकी कुंडली में हमेशा से क्या रहा है, और अभी विशेष रूप से किस पर ध्यान देना ज़रूरी है।",
      },
      howJyotishApproachesIt: {
        en: "The analysis uses your existing house/lord placements, career and wealth yogas already present in your chart, and your Dasha/transit timeline -- the same authoritative calculation method used across Jyotishasha's reports. It never invents a dosha: a specific dosha is named only when the underlying planetary fact is genuinely present in your chart. Where the evidence points to a real limiting pattern, only the 2-4 most meaningful factors are discussed, never an exhaustive list designed to alarm.",
        hi: "यह विश्लेषण आपकी कुंडली में पहले से मौजूद भाव/स्वामी की स्थिति, करियर और धन से जुड़े योगों, और आपकी दशा/गोचर की समयरेखा का उपयोग करता है -- वही प्रामाणिक गणना पद्धति जो Jyotishasha की सभी रिपोर्ट्स में इस्तेमाल होती है। यह कभी कोई दोष गढ़ती नहीं है: किसी खास दोष का नाम तभी लिया जाता है जब उससे जुड़ा ग्रह-तथ्य आपकी कुंडली में सच में मौजूद हो। जहाँ प्रमाण किसी वास्तविक सीमित करने वाले पैटर्न की ओर इशारा करते हैं, वहाँ सिर्फ 2-4 सबसे मायने रखने वाले कारणों पर बात होती है, डराने वाली पूरी सूची कभी नहीं दी जाती।",
      },
      whoItIsFor: {
        en: "For anyone who feels a specific area of life has repeatedly felt harder than expected, and wants a grounded, chart-based explanation -- not a vague or fear-based one -- along with practical, conditional next steps.",
        hi: "उन लोगों के लिए जिन्हें लगता है कि जीवन का कोई खास हिस्सा बार-बार उम्मीद से ज़्यादा मुश्किल रहा है, और जो एक ठोस, कुंडली-आधारित स्पष्टीकरण चाहते हैं -- कोई अस्पष्ट या डर पैदा करने वाला नहीं -- साथ ही व्यावहारिक, सशर्त अगले कदम भी चाहते हैं।",
      },
      whatYouReceive: {
        en: "A personalized PDF report covering: your direct answer, your birth-chart obstacles, your currently active obstacles (from your real Dasha/transit evidence), and concise remedies and what helps -- generated from your own birth details, delivered to your email.",
        hi: "एक व्यक्तिगत PDF रिपोर्ट जिसमें शामिल है: आपका सीधा जवाब, आपकी कुंडली की जन्मजात बाधाएँ, अभी सक्रिय बाधाएँ (आपके असली दशा/गोचर प्रमाण के आधार पर), और संक्षिप्त उपाय व मददगार सुझाव -- आपकी अपनी जन्म जानकारी से तैयार, आपके ईमेल पर भेजी गई।",
      },
      trustAndLimitations: {
        en: "This is astrology-based guidance, not a certainty, a medical/legal/financial opinion, or a guaranteed outcome. Remedies suggested are practical-first and conditional on what your own chart supports -- never a promise that any remedy will produce a specific result. No dosha is claimed unless your chart's own facts support it.",
        hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता, चिकित्सा/कानूनी/वित्तीय राय, या पक्के नतीजे की गारंटी नहीं। सुझाए गए उपाय व्यावहारिक-प्राथमिकता वाले हैं और आपकी अपनी कुंडली के समर्थन पर निर्भर हैं -- यह कभी वादा नहीं कि कोई उपाय किसी खास नतीजे को जन्म देगा। कोई दोष तभी बताया जाता है जब आपकी कुंडली के तथ्य उसका समर्थन करते हों।",
      },
    },
    faqs: [
      {
        question: { en: "Will this report tell me I have a specific dosha?", hi: "क्या यह रिपोर्ट मुझे बताएगी कि मुझे कोई खास दोष है?" },
        answer: {
          en: "Only if that exact dosha's underlying planetary fact is genuinely present in your chart. This report never assigns a dosha label just to explain a challenge -- it explains the actual house, lord, Dasha or transit evidence in plain language instead.",
          hi: "सिर्फ तभी जब उस दोष से जुड़ा ग्रह-तथ्य आपकी कुंडली में सच में मौजूद हो। यह रिपोर्ट किसी चुनौती को समझाने के लिए कभी भी दोष का नाम नहीं देती -- इसके बजाय यह असली भाव, स्वामी, दशा या गोचर के प्रमाण को आसान भाषा में समझाती है।",
        },
      },
      {
        question: { en: "Are the remedies guaranteed to work?", hi: "क्या उपाय काम करने की गारंटी है?" },
        answer: {
          en: "No. Remedies are practical-first suggestions, with a simple Jyotish or spiritual practice included only when it is reasonably tied to your chart's evidence. No remedy is presented as a guaranteed outcome, and none involves an expensive gemstone requirement.",
          hi: "नहीं। उपाय व्यावहारिक-प्राथमिकता वाले सुझाव हैं, और कोई साधारण ज्योतिषीय या आध्यात्मिक अभ्यास तभी शामिल किया जाता है जब वह आपकी कुंडली के प्रमाण से सच में जुड़ा हो। किसी भी उपाय को पक्के नतीजे के रूप में पेश नहीं किया जाता, और किसी में महँगे रत्न की ज़रूरत शामिल नहीं है।",
        },
      },
      {
        question: { en: "How is this different from a general reading?", hi: "यह एक सामान्य रीडिंग से कैसे अलग है?" },
        answer: {
          en: "This report is built specifically to answer one question -- your major obstacles -- using your whole chart plus your current Dasha/transit activation, rather than a broad, generic overview.",
          hi: "यह रिपोर्ट खास तौर पर एक ही सवाल का जवाब देने के लिए बनाई गई है -- आपकी प्रमुख बाधाएँ -- आपकी पूरी कुंडली और मौजूदा दशा/गोचर सक्रियता का उपयोग करके, न कि एक व्यापक, सामान्य विवरण के रूप में।",
        },
      },
      {
        question: { en: "How long does it take to receive my report?", hi: "मुझे अपनी रिपोर्ट मिलने में कितना समय लगता है?" },
        answer: {
          en: "Your personalized PDF is generated from your birth details and emailed to you shortly after successful payment.",
          hi: "आपकी व्यक्तिगत PDF आपकी जन्म जानकारी से तैयार की जाती है और सफल भुगतान के कुछ ही समय बाद आपके ईमेल पर भेज दी जाती है।",
        },
      },
    ],
    metaDescription: {
      en: "A personalized ₹51 astrology report identifying the 2-4 most meaningful obstacles in your birth chart, what's currently active through your Dasha and transits, and practical, conditional remedies.",
      hi: "₹51 की व्यक्तिगत ज्योतिष रिपोर्ट जो आपकी जन्म कुंडली की 2-4 सबसे मायने रखने वाली बाधाएँ, आपकी दशा और गोचर से अभी सक्रिय बातें, और व्यावहारिक, सशर्त उपाय बताती है।",
    },
  },

  "major-kundali-strengths": {
    humanSlug: "major-kundali-strengths",
    questionKey: "major_kundali_strengths",
    category: "life",
    priceRupees: 51,
    title: { en: "Major Strengths in Your Kundali", hi: "आपकी कुंडली की प्रमुख शक्तियाँ" },
    benefits: {
      en: [
        "Identifies the 2-4 strongest, most usable areas of your birth chart",
        "Shows which of your durable birth-chart strengths your current Dasha and transits are actively supporting right now",
        "Practical guidance for using your active strengths in this specific window -- not generic motivation",
        "Distinct from a general natal-strengths reading: this one covers your birth strengths PLUS what's active today",
      ],
      hi: [
        "आपकी जन्म कुंडली के 2-4 सबसे मजबूत और उपयोगी क्षेत्रों की पहचान करता है",
        "बताता है कि आपकी स्थायी जन्मजात शक्तियों में से किसे आपकी मौजूदा दशा और गोचर अभी समर्थन दे रहे हैं",
        "इस खास समय में अपनी सक्रिय शक्तियों का उपयोग करने के लिए व्यावहारिक मार्गदर्शन -- सामान्य प्रेरणा नहीं",
        "एक सामान्य प्राकृतिक-शक्ति रीडिंग से अलग: यह आपकी जन्मजात शक्तियों के साथ-साथ यह भी बताती है कि आज क्या सक्रिय है",
      ],
    },
    sections: {
      whatItTellsYou: {
        en: "This report reads your whole birth chart to identify the strengths that genuinely stand out, then separates durable, birth-chart-level strengths from what your current Mahadasha, Antardasha and Jupiter/Saturn/Rahu transits are actively supporting -- so you know both what your chart has always supported and which of those strengths deserve your focus right now.",
        hi: "यह रिपोर्ट आपकी पूरी जन्म कुंडली को पढ़कर उन शक्तियों की पहचान करती है जो सच में उभरकर सामने आती हैं, फिर स्थायी, जन्मजात शक्तियों को अलग करती है उन बातों से जिन्हें आपकी मौजूदा महादशा, अंतर्दशा और गुरु/शनि/राहु के गोचर अभी समर्थन दे रहे हैं -- ताकि आप जान सकें कि आपकी कुंडली ने हमेशा किसे समर्थन दिया है, और उनमें से किस पर अभी ध्यान देना सही रहेगा।",
      },
      howJyotishApproachesIt: {
        en: "The analysis uses your existing house/lord placements and career/wealth yogas already present in your chart for the durable, birth-chart layer, and your real Dasha/transit timeline for the current-activation layer -- the same authoritative calculation method used across Jyotishasha's reports. Only the 2-4 most meaningful strengths are discussed, with concrete, practical guidance for using them now.",
        hi: "यह विश्लेषण स्थायी, जन्मजात परत के लिए आपकी कुंडली में पहले से मौजूद भाव/स्वामी की स्थिति और करियर/धन योगों का उपयोग करता है, और मौजूदा-सक्रियता परत के लिए आपकी असली दशा/गोचर समयरेखा का -- वही प्रामाणिक गणना पद्धति जो Jyotishasha की सभी रिपोर्ट्स में इस्तेमाल होती है। सिर्फ 2-4 सबसे मायने रखने वाली शक्तियों पर बात होती है, साथ में उन्हें अभी इस्तेमाल करने के लिए ठोस, व्यावहारिक मार्गदर्शन।",
      },
      whoItIsFor: {
        en: "For anyone who wants to know not just their general natural strengths, but specifically which of those strengths their chart's current period is actively supporting -- and how to make practical use of that window.",
        hi: "उन लोगों के लिए जो सिर्फ अपनी सामान्य प्राकृतिक शक्तियाँ नहीं, बल्कि यह भी जानना चाहते हैं कि उनमें से किसे उनकी कुंडली का मौजूदा समय अभी समर्थन दे रहा है -- और इस समय का व्यावहारिक उपयोग कैसे किया जाए।",
      },
      whatYouReceive: {
        en: "A personalized PDF report covering: your direct answer, your birth-chart strengths, your currently active strengths (from your real Dasha/transit evidence), and how to use them now -- generated from your own birth details, delivered to your email.",
        hi: "एक व्यक्तिगत PDF रिपोर्ट जिसमें शामिल है: आपका सीधा जवाब, आपकी कुंडली की जन्मजात शक्तियाँ, अभी सक्रिय शक्तियाँ (आपके असली दशा/गोचर प्रमाण के आधार पर), और उनका अभी सबसे अच्छा उपयोग कैसे करें -- आपकी अपनी जन्म जानकारी से तैयार, आपके ईमेल पर भेजी गई।",
      },
      trustAndLimitations: {
        en: "This is astrology-based guidance describing tendencies and supported strengths, not a guaranteed outcome, ability score or ranking. It never claims a strength guarantees any specific result.",
        hi: "यह ज्योतिष-आधारित मार्गदर्शन है जो रुझान और समर्थित शक्तियों का वर्णन करता है, यह कोई पक्के नतीजे, क्षमता-स्कोर या रैंकिंग की गारंटी नहीं है। यह कभी दावा नहीं करता कि कोई शक्ति किसी खास नतीजे की गारंटी देती है।",
      },
    },
    faqs: [
      {
        question: { en: "How is this different from \"What are my natural strengths?\"", hi: "यह \"मेरी प्राकृतिक ताकतें क्या हैं?\" से कैसे अलग है?" },
        answer: {
          en: "The natural-strengths report is natal-only -- it describes tendencies from your birth chart alone, with no current-timing dimension. This report pairs the same kind of durable birth-chart strengths with which of them your current Dasha and transits are actively activating right now, plus how to use them in this specific window.",
          hi: "प्राकृतिक-शक्ति रिपोर्ट केवल जन्मजात होती है -- यह सिर्फ आपकी जन्म कुंडली से रुझान बताती है, बिना किसी मौजूदा-समय के पहलू के। यह रिपोर्ट उसी तरह की स्थायी जन्मजात शक्तियों को इस बात के साथ जोड़ती है कि उनमें से किसे आपकी मौजूदा दशा और गोचर अभी सक्रिय कर रहे हैं, साथ ही इस खास समय में उनका उपयोग कैसे करें।",
        },
      },
      {
        question: { en: "Does this guarantee my strengths will lead to success?", hi: "क्या यह गारंटी है कि मेरी शक्तियाँ सफलता दिलाएँगी?" },
        answer: {
          en: "No. The report describes tendencies and chart-supported strengths, and never claims a strength guarantees any specific outcome.",
          hi: "नहीं। यह रिपोर्ट रुझान और कुंडली-समर्थित शक्तियों का वर्णन करती है, और कभी दावा नहीं करती कि कोई शक्ति किसी खास नतीजे की गारंटी देती है।",
        },
      },
      {
        question: { en: "How long does it take to receive my report?", hi: "मुझे अपनी रिपोर्ट मिलने में कितना समय लगता है?" },
        answer: {
          en: "Your personalized PDF is generated from your birth details and emailed to you shortly after successful payment.",
          hi: "आपकी व्यक्तिगत PDF आपकी जन्म जानकारी से तैयार की जाती है और सफल भुगतान के कुछ ही समय बाद आपके ईमेल पर भेज दी जाती है।",
        },
      },
    ],
    metaDescription: {
      en: "A personalized ₹51 astrology report identifying the 2-4 strongest areas of your birth chart, which strengths your current Dasha and transits are activating now, and how to use them effectively.",
      hi: "₹51 की व्यक्तिगत ज्योतिष रिपोर्ट जो आपकी जन्म कुंडली की 2-4 सबसे मजबूत क्षेत्रों की पहचान करती है, बताती है कि आपकी मौजूदा दशा और गोचर अभी किन शक्तियों को सक्रिय कर रहे हैं, और उनका सर्वोत्तम उपयोग कैसे करें।",
    },
  },
};

export type FocusedReportHumanSlug = keyof typeof FOCUSED_REPORTS_CONFIG;

/** The ONLY function that turns a public URL segment into the trusted
 * question_key. Returns undefined for anything not in the pilot config --
 * the route calls notFound() in that case. Never guesses, never falls
 * back to treating the slug itself as a question_key. */
export function getFocusedReportConfigBySlug(humanSlug: string): FocusedReportConfig | undefined {
  return FOCUSED_REPORTS_CONFIG[humanSlug];
}

/** Bilingual title/question, read live from the authoritative catalog --
 * never duplicated here. Throws if the config's own questionKey ever
 * drifts from a real catalog entry (a genuine bug, not a runtime case to
 * handle gracefully). */
export function getFocusedReportCatalogEntry(config: FocusedReportConfig) {
  const question = getIntentQuestion(config.questionKey);
  if (!question) {
    throw new Error(`focusedReportsConfig: questionKey ${config.questionKey} is not in intentCatalog`);
  }
  const intent = getIntent(question.intentSlug);
  return { question, intent };
}

export function listFocusedReportHumanSlugs(): string[] {
  return Object.keys(FOCUSED_REPORTS_CONFIG);
}
