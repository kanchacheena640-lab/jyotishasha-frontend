/**
 * best_career_years -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING; best_windows; key == "best_career_years" swaps MD/AD for the full
 * multi-year LONG_DASHA sequence; anchor long-term promise in natal career
 * houses/yogas, transits only within their coverage; select a few phases,
 * distinguishing foundation-building from consolidation and recognition;
 * remedies=False) and career_evidence.py ("dasha_sequence" -> 60 months,
 * Jupiter/Saturn/Rahu).
 */
import type { FocusedReportSeoContent } from "./types";

export const bestCareerYears: FocusedReportSeoContent = {
  questionKey: "best_career_years",
  searchIntent:
    "Long-range planning: someone mapping their career across the next several years who wants to know which stretches favour building, consolidating or being recognised. Distinct from next-strong-career-period (the coming 12 months) and career-improvement-timing (the first turn after a flat phase).",
  seoTitle: {
    en: "Best Years for My Career? Astrology Report | Jyotishasha",
    hi: "करियर के सबसे अच्छे साल? ज्योतिष रिपोर्ट | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 personalised report mapping your career over the next five years: which Dasha phases favour building a base, consolidating, or being recognised.",
    hi: "₹51 की व्यक्तिगत रिपोर्ट: अगले पाँच वर्षों में आपके करियर का नक्शा, कौन-सी दशा नींव बनाने, मजबूती लाने या पहचान पाने के पक्ष में है।",
  },
  h1: {
    en: "Best Career Years: Mapping the Next Five Years of Your Work Life",
    hi: "करियर के अच्छे साल: आपके कामकाजी जीवन के अगले पाँच वर्षों का नक्शा",
  },
  intro: {
    en: [
      "Some career decisions only make sense on a longer clock: when to go back for a qualification, when to accept a slower role that teaches more, when to push for leadership. Looking one year ahead is not enough for these. You need a sense of how the next several years are shaped.",
      "This report reads the full sequence of your Mahadasha and Antardasha periods across the next five years, against the career promise in your birth chart, and picks out a few phases that stand out. It labels each one as a time for laying foundations, for consolidating what you have built, or for recognition, so you can plan in that order.",
    ],
    hi: [
      "कुछ करियर फ़ैसले सिर्फ़ लंबे समय के हिसाब से ही समझ में आते हैं: कब दोबारा पढ़ाई या कोई योग्यता लें, कब कोई धीमी लेकिन ज़्यादा सिखाने वाली भूमिका स्वीकार करें, कब नेतृत्व के लिए आगे बढ़ें। इनके लिए सिर्फ़ एक साल आगे देखना काफ़ी नहीं। आपको यह समझना होता है कि अगले कई साल किस तरह के हैं।",
      "यह रिपोर्ट अगले पाँच वर्षों में आपकी महादशा और अंतर्दशा का पूरा क्रम आपकी जन्म कुंडली के करियर संकेतों के साथ पढ़ती है, और कुछ खास दौर चुनती है। हर दौर को नींव बनाने, बने हुए को मजबूत करने, या पहचान पाने के समय के रूप में बताती है, ताकि आप उसी क्रम में योजना बना सकें।",
    ],
  },
  analyzes: {
    en: [
      "The complete dated Mahadasha and Antardasha sequence over the next five years, not just the current sub-period",
      "Natal career houses and lords, which set the long-term promise each phase draws on",
      "Career yogas, cited only where they are actually formed in your chart",
      "Jupiter, Saturn and Rahu from your Lagna, used only for the stretch their calculated positions cover",
    ],
    hi: [
      "अगले पाँच वर्षों का तारीख-युक्त पूरा महादशा और अंतर्दशा क्रम, सिर्फ़ मौजूदा उप-दशा नहीं",
      "जन्म कुंडली के करियर भाव और स्वामी, जो हर दौर के पीछे की दीर्घकालिक संभावना तय करते हैं",
      "करियर योग, केवल वहीं जहाँ वे आपकी कुंडली में सच में बनते हों",
      "आपके लग्न से गुरु, शनि और राहु, केवल उतनी अवधि के लिए जितनी उनकी गणना की गई स्थितियाँ कवर करती हैं",
    ],
  },
  readingGuide: {
    heading: { en: "Foundation, consolidation and recognition", hi: "नींव, मजबूती और पहचान" },
    points: {
      en: [
        "Foundation phases suit learning, switching domains or taking on hard, less visible work that pays off later.",
        "Consolidation phases suit deepening a role, building a track record and steadying income rather than jumping.",
        "Recognition phases suit visibility: applying for senior roles, presenting results, taking a public step.",
        "The report selects only a few well-supported phases. It does not assign a verdict to every single year, and it does not guess beyond five years.",
      ],
      hi: [
        "नींव वाले दौर सीखने, क्षेत्र बदलने या कठिन, कम दिखने वाले काम के लिए ठीक हैं, जिसका फल बाद में मिलता है।",
        "मजबूती वाले दौर भूमिका को गहरा करने, काम का रिकॉर्ड बनाने और कूदने के बजाय आमदनी को स्थिर करने के लिए ठीक हैं।",
        "पहचान वाले दौर दृश्यता के लिए ठीक हैं: वरिष्ठ भूमिकाओं के लिए आवेदन, नतीजे सामने रखना, कोई सार्वजनिक कदम।",
        "रिपोर्ट केवल कुछ अच्छी तरह समर्थित दौर चुनती है। यह हर साल पर फ़ैसला नहीं सुनाती, और पाँच साल से आगे का अनुमान नहीं लगाती।",
      ],
    },
  },
  differentiation: {
    en: "Next Career Opportunity ranks windows within the coming 12 months. Career Improvement looks for the first turn after a flat phase. This report takes the long view: the shape of your career across five years of Dasha periods.",
    hi: "'करियर का अगला मजबूत समय' आने वाले 12 महीनों के भीतर के समयों का क्रम बताती है। 'करियर में सुधार' ठहरे हुए दौर के बाद पहला बदलाव ढूँढती है। यह रिपोर्ट लंबा नज़रिया लेती है: पाँच वर्षों की दशाओं में आपके करियर का आकार।",
  },
  internalLinks: [
    { path: "/reports/focused/next-strong-career-period", localized: true, label: { en: "Next Career Opportunity report (₹51)", hi: "करियर का अगला मजबूत समय रिपोर्ट (₹51)" } },
    { path: "/tools/career-path", localized: true, label: { en: "Free career path calculator", hi: "मुफ़्त करियर पथ कैलकुलेटर" } },
    { path: "/financial-astrology/best-career", localized: true, label: { en: "Best career in astrology (free guide)", hi: "ज्योतिष में सबसे अच्छा करियर (मुफ़्त गाइड)" } },
    { path: "/reports/career_report", localized: false, label: { en: "Full Career Report", hi: "पूरी करियर रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "A five-year view of your career built on the full Dasha sequence",
      "Each highlighted phase labelled as foundation, consolidation or recognition",
      "Helps order long decisions such as study, a domain switch or a leadership push",
    ],
    hi: [
      "पूरे दशा-क्रम पर आधारित आपके करियर का पाँच साल का नज़रिया",
      "हर चुने गए दौर को नींव, मजबूती या पहचान के रूप में बताया गया",
      "पढ़ाई, क्षेत्र बदलने या नेतृत्व जैसे लंबे फ़ैसलों का क्रम तय करने में मदद",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Which coming years look best for my career growth?”. It compares the supplied phases of the next five years and names the few that best support sustained development.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “आने वाले कौन-से साल मेरे करियर ग्रोथ के लिए सबसे अच्छे दिखते हैं?” यह अगले पाँच वर्षों के दिए गए दौरों की तुलना करती है और उन कुछ दौरों का नाम बताती है जो लगातार विकास को सबसे ज़्यादा सहारा देते हैं।",
    },
    howJyotishApproachesIt: {
      en: "The backend computes your placements, career houses and lords, career yogas, the multi-year Dasha sequence and transit dates. The reading interprets only those phases and invents no year or event outside them.",
      hi: "बैकएंड आपकी ग्रह-स्थितियाँ, करियर भाव और स्वामी, करियर योग, कई वर्षों का दशा-क्रम और गोचर की तारीखें गणना करता है। विश्लेषण केवल उन्हीं दौरों की व्याख्या करता है और उनके बाहर कोई साल या घटना नहीं गढ़ता।",
    },
    whoItIsFor: {
      en: "For someone planning a multi-year career path, such as a mid-career professional weighing further study, a change of field or a move into leadership.",
      hi: "उन लोगों के लिए जो कई वर्षों का करियर रास्ता बना रहे हैं, जैसे करियर के बीच में पहुँचे पेशेवर जो आगे की पढ़ाई, क्षेत्र बदलने या नेतृत्व की ओर जाने पर विचार कर रहे हैं।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words with Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, prepared from your birth details. The Slower or Watch Period section appears only when your dated evidence supports it.",
      hi: "लगभग 400 से 500 शब्दों की PDF, जिसमें सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात शामिल हैं; आपकी जन्म जानकारी से तैयार। 'धीमा या ध्यान रखने वाला समय' वाला हिस्सा तभी आता है जब आपकी तारीख-युक्त जानकारी उसका समर्थन करे।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. Phases describe supportive conditions, not promotions, job offers or income figures.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। दौर अनुकूल परिस्थितियाँ बताते हैं, प्रमोशन, नौकरी के प्रस्ताव या आमदनी के आँकड़े नहीं।",
    },
  },
  faqs: [
    {
      question: { en: "Why five years and not ten?", hi: "दस नहीं, पाँच साल ही क्यों?" },
      answer: {
        en: "The backend supplies a dated Dasha sequence for five years. The report stays inside that evidence rather than stretching it.",
        hi: "बैकएंड पाँच वर्षों का तारीख-युक्त दशा-क्रम देता है। रिपोर्ट उसे खींचने के बजाय उसी प्रमाण के भीतर रहती है।",
      },
    },
    {
      question: { en: "What is the difference from Next Career Opportunity?", hi: "यह 'करियर का अगला मजबूत समय' से कैसे अलग है?" },
      answer: {
        en: "That report ranks windows in the coming 12 months for near-term moves. This one is for sequencing larger decisions over several years.",
        hi: "वह रिपोर्ट नज़दीकी कदमों के लिए आने वाले 12 महीनों के समयों का क्रम बताती है। यह रिपोर्ट कई वर्षों में बड़े फ़ैसलों का क्रम तय करने के लिए है।",
      },
    },
    {
      question: { en: "Will it tell me which career to choose?", hi: "क्या यह बताएगी कि कौन-सा करियर चुनूँ?" },
      answer: {
        en: "No. It is about timing, not field. For direction, the free career path calculator or the full Career Report is the better start.",
        hi: "नहीं। यह समय के बारे में है, क्षेत्र के बारे में नहीं। दिशा के लिए मुफ़्त करियर पथ कैलकुलेटर या पूरी करियर रिपोर्ट बेहतर शुरुआत है।",
      },
    },
    {
      question: { en: "Does a foundation phase mean a bad phase?", hi: "क्या नींव वाला दौर बुरा दौर होता है?" },
      answer: {
        en: "Not at all. It is often the most useful stretch for skills and groundwork that later phases build on.",
        hi: "बिल्कुल नहीं। अक्सर यह कौशल और तैयारी के लिए सबसे उपयोगी समय होता है, जिस पर बाद के दौर टिकते हैं।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 60, houses: null, transits: ["Jupiter", "Saturn", "Rahu"], remedies: false },
};
