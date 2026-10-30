/**
 * financial_improvement_timing -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING; income, savings and gains houses/lords and wealth yogas vs MD/AD and
 * Jupiter/Saturn; present conditions vs the first supported opening window;
 * separate increased inflow from reduced pressure and more stable money
 * management; no financial advice or guarantees; remedies=False) and
 * money_business_evidence.py (not in MULTI_YEAR_KEYS -> 12 months).
 */
import type { FocusedReportSeoContent } from "./types";

export const financialImprovementTiming: FocusedReportSeoContent = {
  questionKey: "financial_improvement_timing",
  searchIntent:
    "Commercial-timing: someone whose overall money situation feels tight or stuck asking when it may get better. Broader than income-increase-timing (inflow only); distinct from financial-pressure-easing (what is causing the strain) and debt-pressure-easing.",
  seoTitle: {
    en: "When Will My Finances Improve? Astrology | Jyotishasha",
    hi: "आर्थिक स्थिति कब सुधरेगी? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 personalised report on when your overall financial situation may improve in the next 12 months: more inflow, less strain or steadier money habits.",
    hi: "₹51 की व्यक्तिगत रिपोर्ट: अगले 12 महीनों में आपकी कुल आर्थिक स्थिति कब सुधर सकती है, ज़्यादा आमदनी, कम दबाव या ज़्यादा स्थिर पैसों की आदतें।",
  },
  h1: {
    en: "Financial Improvement: When Your Money Situation May Get Better",
    hi: "आर्थिक स्थिति में सुधार: पैसों की हालत कब बेहतर हो सकती है",
  },
  intro: {
    en: [
      "“Better finances” means different things at different times. For one person it is more money coming in; for another it is fewer demands going out; for a third it is finally being able to save something each month. These can improve at different moments, and confusing them leads to disappointment.",
      "This report reads your income, savings and gains factors, your wealth yogas, your current Dasha and the movement of Jupiter and Saturn, and identifies when your overall situation looks likely to improve in the next 12 months. It also says which kind of improvement the period mainly supports.",
    ],
    hi: [
      "“बेहतर आर्थिक स्थिति” का मतलब अलग-अलग समय पर अलग होता है। किसी के लिए यह ज़्यादा पैसे आना है; किसी के लिए कम खर्च और माँगें; किसी तीसरे के लिए आखिरकार हर महीने कुछ बचा पाना। ये अलग-अलग समय पर सुधर सकते हैं, और इन्हें आपस में मिला देने से निराशा होती है।",
      "यह रिपोर्ट आपकी आमदनी, बचत और लाभ से जुड़े कारण, धन योग, मौजूदा दशा और गुरु व शनि की चाल पढ़ती है, और बताती है कि अगले 12 महीनों में आपकी कुल स्थिति कब सुधरती दिखती है। यह भी बताती है कि वह समय मुख्य रूप से किस तरह के सुधार को सहारा देता है।",
    ],
  },
  analyzes: {
    en: [
      "The houses and lords connected with income, savings and gains in your chart",
      "Wealth yogas, mentioned only when they are actually formed",
      "Your current Mahadasha and Antardasha, and the next sub-period within 12 months",
      "Jupiter and Saturn relative to your Lagna, including their sign changes in this period",
    ],
    hi: [
      "आपकी कुंडली में आमदनी, बचत और लाभ से जुड़े भाव और उनके स्वामी",
      "धन योग, केवल तभी जब वे सच में बनते हों",
      "आपकी मौजूदा महादशा और अंतर्दशा, और 12 महीनों के भीतर अगली उप-दशा",
      "आपके लग्न के सापेक्ष गुरु और शनि, इस अवधि में उनके राशि-परिवर्तन सहित",
    ],
  },
  readingGuide: {
    heading: { en: "Three kinds of financial improvement", hi: "आर्थिक सुधार के तीन प्रकार" },
    points: {
      en: [
        "More inflow: new or larger earnings. Useful, but it only helps if spending does not rise with it.",
        "Less strain: fewer obligations or unexpected costs, which can feel like relief even with the same income.",
        "Steadier management: the ability to plan, save and stop living month to month.",
        "The report names which of these a coming period mainly supports, so you know what to watch for and what not to expect.",
      ],
      hi: [
        "ज़्यादा आमदनी: नई या बड़ी कमाई। उपयोगी, लेकिन तभी मदद करती है जब खर्च उसके साथ न बढ़े।",
        "कम दबाव: कम ज़िम्मेदारियाँ या अचानक खर्च, जो उसी आमदनी में भी राहत जैसा लग सकता है।",
        "ज़्यादा स्थिर प्रबंधन: योजना बनाने, बचाने और महीने-दर-महीने जीने से निकल पाने की क्षमता।",
        "रिपोर्ट बताती है कि आने वाला समय इनमें से मुख्य रूप से किसे सहारा देता है, ताकि आप जानें किस पर नज़र रखें और किसकी उम्मीद न करें।",
      ],
    },
  },
  differentiation: {
    en: "Income Increase looks only at when more money may come in. Financial Pressure explains what is causing strain and whether it is easing. This report takes the broader view: when your overall money situation may improve, and in which way.",
    hi: "'आमदनी में बढ़ोतरी' सिर्फ़ यह देखती है कि ज़्यादा पैसा कब आ सकता है। 'आर्थिक दबाव में राहत' बताती है कि दबाव किस कारण है और क्या वह कम हो रहा है। यह रिपोर्ट बड़ा नज़रिया लेती है: आपकी कुल आर्थिक स्थिति कब सुधर सकती है, और किस तरह।",
  },
  internalLinks: [
    { path: "/reports/focused/income-increase-timing", localized: true, label: { en: "Income Increase report (₹51)", hi: "आमदनी में बढ़ोतरी रिपोर्ट (₹51)" } },
    { path: "/reports/focused/financial-pressure-easing", localized: true, label: { en: "Financial Pressure report (₹51)", hi: "आर्थिक दबाव में राहत रिपोर्ट (₹51)" } },
    { path: "/tools/dhan-yog", localized: true, label: { en: "Free Dhan Yog calculator", hi: "मुफ़्त धन योग कैलकुलेटर" } },
    { path: "/reports/financial_report", localized: false, label: { en: "Full Finance Report", hi: "पूरी वित्त रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "When your overall money situation looks likely to improve in the coming year",
      "Which kind of improvement a period supports: inflow, relief or stability",
      "Practical money habits to pair with that period",
    ],
    hi: [
      "आने वाले साल में आपकी कुल आर्थिक स्थिति कब सुधरती दिखती है",
      "कोई समय किस तरह के सुधार को सहारा देता है: आमदनी, राहत या स्थिरता",
      "उस समय के साथ अपनाने लायक व्यावहारिक पैसों की आदतें",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “When will my financial situation improve?”. It compares your present conditions with the first supported window within 12 months and explains what kind of improvement it points to.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरी आर्थिक स्थिति कब सुधरने के योग हैं?” यह आपकी मौजूदा परिस्थितियों की तुलना 12 महीनों में पहली अनुकूल अवधि से करती है और बताती है कि वह किस तरह के सुधार की ओर इशारा करती है।",
    },
    howJyotishApproachesIt: {
      en: "Your placements, income, savings and gains houses and lords, wealth yogas, Dasha periods and Jupiter and Saturn dates are calculated first. The reading interprets those facts and adds no date of its own.",
      hi: "आपकी ग्रह-स्थितियाँ, आमदनी, बचत और लाभ के भाव और स्वामी, धन योग, दशा की अवधियाँ और गुरु व शनि की तारीखें पहले गणना की जाती हैं। विश्लेषण उन्हीं तथ्यों की व्याख्या करता है और अपनी ओर से कोई तारीख नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For someone who has been financially tight for a while, with no single crisis, and wants to know when things may loosen up.",
      hi: "उन लोगों के लिए जो कुछ समय से पैसों की तंगी में हैं, बिना किसी एक बड़े संकट के, और जानना चाहते हैं कि हालात कब ढीले पड़ सकते हैं।",
    },
    whatYouReceive: {
      en: "A PDF of around 400 to 500 words with Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, built from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF, जिसमें सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात शामिल हैं; आपकी जन्म जानकारी से बनी।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It is not financial advice and does not recommend any investment, loan or purchase.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह वित्तीय सलाह नहीं है और किसी निवेश, लोन या खरीदारी की सिफ़ारिश नहीं करती।",
    },
  },
  faqs: [
    {
      question: { en: "How is this different from the Income Increase report?", hi: "यह 'आमदनी में बढ़ोतरी' रिपोर्ट से कैसे अलग है?" },
      answer: {
        en: "Income Increase looks only at inflow. This report also considers relief from strain and steadier management, so it suits a broader “my finances are stuck” question.",
        hi: "'आमदनी में बढ़ोतरी' सिर्फ़ आमदनी देखती है। यह रिपोर्ट दबाव से राहत और स्थिर प्रबंधन को भी देखती है, इसलिए यह “मेरी आर्थिक हालत अटकी है” जैसे बड़े सवाल के लिए ठीक है।",
      },
    },
    {
      question: { en: "Will it tell me where to invest?", hi: "क्या यह बताएगी कि कहाँ निवेश करूँ?" },
      answer: {
        en: "No. It reads timing and conditions only, and does not recommend any investment.",
        hi: "नहीं। यह सिर्फ़ समय और परिस्थितियाँ पढ़ती है, और किसी निवेश की सिफ़ारिश नहीं करती।",
      },
    },
    {
      question: { en: "I have loans to repay. Is this the right report?", hi: "मुझे लोन चुकाने हैं। क्या यह सही रिपोर्ट है?" },
      answer: {
        en: "If debt is the main worry, Debt Pressure focuses on that specifically. This report is for the overall picture.",
        hi: "अगर कर्ज़ मुख्य चिंता है, तो 'कर्ज़ के दबाव' रिपोर्ट खास तौर पर उसी पर केंद्रित है। यह रिपोर्ट पूरी तस्वीर के लिए है।",
      },
    },
    {
      question: { en: "What if the next 12 months still look tight?", hi: "अगर अगले 12 महीने भी तंग दिखें तो?" },
      answer: {
        en: "The report says so and explains which period looks relatively steadier, with practical caution for the slower stretch.",
        hi: "रिपोर्ट यह बताती है और समझाती है कि कौन-सा समय तुलनात्मक रूप से ज़्यादा स्थिर दिखता है, साथ ही धीमे समय के लिए व्यावहारिक सावधानी।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: null, transits: ["Jupiter", "Saturn"], remedies: false },
};
