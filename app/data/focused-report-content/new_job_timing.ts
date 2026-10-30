/**
 * new_job_timing -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING; service and career houses/lords, career yogas, MD/AD, Jupiter/
 * Saturn/Rahu; "openings rather than guaranteed selection"; never promise a
 * date, an offer or tell the user to resign; remedies=False) and
 * career_evidence.py (dasha_window_summary, not dasha_sequence -> 12 months).
 */
import type { FocusedReportSeoContent } from "./types";

export const newJobTiming: FocusedReportSeoContent = {
  questionKey: "new_job_timing",
  searchIntent:
    "Commercial: a person actively looking for work wants chart-based timing for a new job in the near term. Distinct from the free /financial-astrology/new-job-chances guide (general astrology) and the broad ₹51 Career Report (overall career path).",
  seoTitle: {
    en: "When Will I Get a New Job? Astrology Report | Jyotishasha",
    hi: "नई नौकरी कब मिलेगी? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 personalised report that reads your Dasha, work houses and Jupiter, Saturn and Rahu transits to find supportive new-job windows in the next 12 months.",
    hi: "₹51 की व्यक्तिगत रिपोर्ट: आपकी दशा, काम से जुड़े भाव और गुरु, शनि व राहु के गोचर से अगले 12 महीनों में नई नौकरी के अनुकूल समय की पहचान।",
  },
  h1: {
    en: "New Job Timing: When Do Your Chances Strengthen?",
    hi: "नई नौकरी का समय: आपके योग कब मजबूत होते हैं?",
  },
  intro: {
    en: [
      "Most people ask “when will I get a new job?” while they are already applying: after a layoff, while stuck in a role, or when interviews keep stalling at the final round. In Vedic astrology, job timing is not read as a single date. It is read as a sequence of periods in which your chart's work-related indications become more or less active.",
      "This report looks at the next 12 months only. It identifies which stretches look supportive for a new role, which are slower, and why, using your own Dasha and the current movement of Jupiter, Saturn and Rahu relative to your birth chart.",
    ],
    hi: [
      "ज़्यादातर लोग “नई नौकरी कब मिलेगी?” तब पूछते हैं जब वे पहले से आवेदन कर रहे होते हैं: नौकरी छूटने के बाद, किसी पद पर अटके रहने पर, या जब इंटरव्यू बार-बार आखिरी दौर में रुक जाते हैं। वैदिक ज्योतिष में नौकरी का समय किसी एक तारीख के रूप में नहीं देखा जाता। इसे अवधियों के एक क्रम के रूप में पढ़ा जाता है, जिनमें आपकी कुंडली के काम से जुड़े संकेत कम या ज़्यादा सक्रिय होते हैं।",
      "यह रिपोर्ट सिर्फ अगले 12 महीनों को देखती है। यह आपकी अपनी दशा और आपकी जन्म कुंडली के सापेक्ष गुरु, शनि और राहु की मौजूदा चाल के आधार पर बताती है कि कौन-सी अवधि नई नौकरी के लिए अनुकूल दिखती है, कौन-सी धीमी है, और क्यों।",
    ],
  },
  analyzes: {
    en: [
      "The houses of work and service in your birth chart: their signs, and where their lords are placed",
      "Career yogas already computed in your chart, only those actually present and never invented",
      "Your current Mahadasha and Antardasha, and the sub-periods that begin within the next 12 months",
      "Jupiter, Saturn and Rahu: the sign and house each occupies from your Lagna, when it moves on, and when it turns retrograde or direct",
    ],
    hi: [
      "आपकी जन्म कुंडली में काम और सेवा से जुड़े भाव: उनकी राशियाँ, और उनके स्वामी कहाँ स्थित हैं",
      "आपकी कुंडली में पहले से गणना किए गए करियर योग, केवल वही जो सच में मौजूद हैं, कोई गढ़ा हुआ योग नहीं",
      "आपकी मौजूदा महादशा और अंतर्दशा, और अगले 12 महीनों में शुरू होने वाली उप-दशाएँ",
      "गुरु, शनि और राहु: आपके लग्न से हर ग्रह किस राशि और भाव में है, वह कब आगे बढ़ता है, और कब वक्री या मार्गी होता है",
    ],
  },
  readingGuide: {
    heading: { en: "How to read job timing in astrology", hi: "ज्योतिष में नौकरी का समय कैसे समझें" },
    points: {
      en: [
        "A window is a stretch between two dates, not a joining date. A reading that names an exact day for an offer is claiming more than a chart can show.",
        "Search activity, interview progress and an actual offer are different stages. A supportive period can first appear as more calls and interviews before it appears as an offer letter.",
        "When a supportive transit includes a retrograde portion, that part is better used for review, such as updating your CV or revisiting applications, than for a decisive move.",
        "Skills, the job market and notice periods still decide outcomes. Astrology describes conditions; it should not be the reason you resign from a job.",
      ],
      hi: [
        "अनुकूल समय दो तारीखों के बीच की एक अवधि है, ज्वाइनिंग की तारीख नहीं। जो विश्लेषण ऑफ़र का कोई सटीक दिन बताए, वह कुंडली की क्षमता से ज़्यादा दावा कर रहा है।",
        "नौकरी की तलाश, इंटरव्यू में प्रगति और असली ऑफ़र, ये अलग-अलग चरण हैं। अनुकूल अवधि पहले ज़्यादा कॉल और इंटरव्यू के रूप में दिख सकती है, ऑफ़र लेटर बाद में आता है।",
        "जब किसी अनुकूल गोचर में वक्री हिस्सा शामिल हो, तो उस हिस्से का बेहतर उपयोग समीक्षा के लिए है, जैसे CV अपडेट करना या आवेदनों को दोबारा देखना, न कि कोई निर्णायक कदम उठाने के लिए।",
        "नतीजे अब भी कौशल, नौकरी के बाज़ार और नोटिस पीरियड पर निर्भर करते हैं। ज्योतिष परिस्थितियों का वर्णन करता है; यह नौकरी छोड़ने का कारण नहीं होना चाहिए।",
      ],
    },
  },
  differentiation: {
    en: "Jyotishasha also has a free guide to new job chances, which explains the general astrology, and a broader ₹51 Career Report about your overall career path. This focused report answers one question only: the timing of a new job over the next 12 months, from your own chart.",
    hi: "Jyotishasha पर नई नौकरी के योग पर एक मुफ़्त गाइड भी है, जो सामान्य ज्योतिष समझाती है, और आपके पूरे करियर पथ पर एक व्यापक ₹51 करियर रिपोर्ट भी। यह फोकस्ड रिपोर्ट सिर्फ एक सवाल का जवाब देती है: आपकी अपनी कुंडली से अगले 12 महीनों में नई नौकरी का समय।",
  },
  internalLinks: [
    { path: "/financial-astrology/new-job-chances", localized: true, label: { en: "New job chances in astrology (free guide)", hi: "ज्योतिष में नई नौकरी के योग (मुफ़्त गाइड)" } },
    { path: "/tools/career-path", localized: true, label: { en: "Career path tool (free)", hi: "करियर पथ टूल (मुफ़्त)" } },
    { path: "/reports/career_report", localized: false, label: { en: "Career Report (₹51)", hi: "करियर रिपोर्ट (₹51, अंग्रेज़ी पेज)" } },
  ],
  benefits: {
    en: [
      "Supportive and slower stretches across the next 12 months, each with the chart reason behind it",
      "Separates rising search activity from the stronger window for an actual offer",
      "Built from your own Dasha and Jupiter, Saturn and Rahu transits, not a sun-sign forecast",
      "Delivered as a PDF to your email, usually within minutes of payment",
    ],
    hi: [
      "अगले 12 महीनों की अनुकूल और धीमी अवधियाँ, हर एक के पीछे का कुंडली-आधारित कारण",
      "बढ़ती तलाश की गतिविधि और असली ऑफ़र के ज़्यादा मजबूत समय को अलग करके बताती है",
      "आपकी अपनी दशा और गुरु, शनि व राहु के गोचर पर आधारित, सूर्य-राशि का सामान्य भविष्यफल नहीं",
      "भुगतान के कुछ ही मिनटों में आपके ईमेल पर PDF के रूप में",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “When am I likely to get a new job?”, for the next 12 months. It names the stretches that look most supportive for a new role, the slower or watch periods, and the chart reasons behind each.",
      hi: "यह रिपोर्ट अगले 12 महीनों के लिए एक ही सवाल का जवाब देती है: “मुझे नई नौकरी मिलने के योग कब बन रहे हैं?” यह नई भूमिका के लिए सबसे अनुकूल अवधियाँ, धीमी या ध्यान रखने वाली अवधियाँ, और हर एक के पीछे के कुंडली-कारण बताती है।",
    },
    howJyotishApproachesIt: {
      en: "The backend first calculates the facts: your Lagna and planetary placements, the houses tied to work and service with their lords, any career yogas present, your Dasha periods, and the sign and motion dates of Jupiter, Saturn and Rahu. The reading then interprets those facts together. It does not calculate, change or invent any position or date.",
      hi: "बैकएंड पहले तथ्यों की गणना करता है: आपका लग्न और ग्रह-स्थितियाँ, काम और सेवा से जुड़े भाव और उनके स्वामी, मौजूद करियर योग, आपकी दशा की अवधियाँ, और गुरु, शनि व राहु की राशि और गति की तारीखें। इसके बाद विश्लेषण इन तथ्यों को एक साथ पढ़ता है। यह कोई स्थिति या तारीख न तो गणना करता है, न बदलता है, न गढ़ता है।",
    },
    whoItIsFor: {
      en: "For someone actively looking for work, between jobs, or deciding whether the coming months suit a job search, who wants a chart-based sense of timing rather than a general career overview.",
      hi: "उन लोगों के लिए जो सक्रिय रूप से नौकरी ढूँढ रहे हैं, दो नौकरियों के बीच हैं, या तय कर रहे हैं कि आने वाले महीने तलाश के लिए ठीक हैं या नहीं, और जो सामान्य करियर विवरण के बजाय कुंडली-आधारित समय की समझ चाहते हैं।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words in six parts: Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line. It is generated from your birth details and emailed to you.",
      hi: "लगभग 400 से 500 शब्दों की PDF, छह हिस्सों में: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात। यह आपकी जन्म जानकारी से तैयार होकर आपके ईमेल पर भेजी जाती है।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not promise an offer, a selection or an appointment, and it will not tell you to resign. Hiring decisions depend on many practical factors outside the chart.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह किसी ऑफ़र, चयन या नियुक्ति का वादा नहीं करती, और आपको नौकरी छोड़ने के लिए नहीं कहेगी। भर्ती के फ़ैसले कुंडली के बाहर के कई व्यावहारिक कारणों पर निर्भर करते हैं।",
    },
  },
  faqs: [
    {
      question: { en: "Will the report tell me the exact date I'll get a job?", hi: "क्या रिपोर्ट मुझे नौकरी मिलने की सटीक तारीख बताएगी?" },
      answer: {
        en: "No. It shows stretches between dates in which your chart looks more or less supportive for a new role. Joining dates depend on employers and practical factors the chart cannot see.",
        hi: "नहीं। यह तारीखों के बीच की वे अवधियाँ दिखाती है जिनमें आपकी कुंडली नई भूमिका के लिए कम या ज़्यादा अनुकूल दिखती है। ज्वाइनिंग की तारीख नियोक्ताओं और ऐसे व्यावहारिक कारणों पर निर्भर करती है जिन्हें कुंडली नहीं देख सकती।",
      },
    },
    {
      question: { en: "I'm preparing for a government job. Is this the right report?", hi: "मैं सरकारी नौकरी की तैयारी कर रहा/रही हूँ। क्या यह सही रिपोर्ट है?" },
      answer: {
        en: "This report covers a new job in general over the next 12 months. Jyotishasha's Government Job Report looks specifically at public-sector potential, and the free government job tool is a quick place to start.",
        hi: "यह रिपोर्ट अगले 12 महीनों में सामान्य रूप से नई नौकरी को देखती है। Jyotishasha की सरकारी नौकरी रिपोर्ट खास तौर पर सरकारी क्षेत्र की संभावना देखती है, और मुफ़्त सरकारी नौकरी टूल शुरुआत के लिए एक आसान जगह है।",
      },
    },
    {
      question: { en: "What if my report shows a slow period right now?", hi: "अगर मेरी रिपोर्ट अभी धीमा समय दिखाए तो?" },
      answer: {
        en: "A slow period describes conditions, not a verdict. The report explains what your chart suggests for that stretch and where the next supportive window begins, if your Dasha and transit dates show one within the 12 months.",
        hi: "धीमा समय परिस्थितियों का वर्णन है, कोई फ़ैसला नहीं। रिपोर्ट बताती है कि उस अवधि के लिए आपकी कुंडली क्या संकेत देती है, और अगली अनुकूल अवधि कहाँ शुरू होती है, यदि आपकी दशा और गोचर की तारीखें 12 महीनों के भीतर ऐसी कोई अवधि दिखाती हों।",
      },
    },
    {
      question: { en: "How quickly will I receive the report?", hi: "मुझे रिपोर्ट कितनी जल्दी मिलेगी?" },
      answer: {
        en: "The PDF is generated after payment and emailed to you, usually within minutes.",
        hi: "PDF भुगतान के बाद तैयार होकर आपके ईमेल पर भेजी जाती है, आमतौर पर कुछ ही मिनटों में।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: null, transits: ["Jupiter", "Saturn", "Rahu"], remedies: false },
};
