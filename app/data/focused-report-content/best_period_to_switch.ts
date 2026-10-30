/**
 * best_period_to_switch -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING; best_windows; read continuity versus transition in career factors,
 * MD/AD and Jupiter/Saturn/Rahu; rank supported switching windows and note
 * tradeoffs without telling the user to leave; remedies=False), career_keys.py
 * (no numbered houses) and career_evidence.py (no dasha_sequence -> 12 months;
 * Jupiter, Saturn, Rahu).
 */
import type { FocusedReportSeoContent } from "./types";

export const bestPeriodToSwitch: FocusedReportSeoContent = {
  questionKey: "best_period_to_switch",
  searchIntent:
    "Planning a move: someone who has already decided to change employer or role at some point and wants the comparatively strongest windows in the coming year, with the tradeoffs of each. Distinct from job-change-now (whether to move at all, now) and new-job-timing (when an offer or joining is supported).",
  seoTitle: {
    en: "Best Time to Switch Jobs This Year? | Jyotishasha",
    hi: "नौकरी बदलने का सबसे अच्छा समय? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report ranking your stronger windows to change employer or role over the next 12 months, with the tradeoffs of switching in each one.",
    hi: "₹51 की रिपोर्ट: अगले 12 महीनों में नियोक्ता या भूमिका बदलने के मज़बूत समयों का क्रम, और हर समय में बदलने के नफ़े-नुकसान।",
  },
  h1: {
    en: "Job Switch Windows: Ranking the Year Ahead for a Planned Move",
    hi: "नौकरी बदलने के अवसर: सोची-समझी बदली के लिए अगले साल का क्रम",
  },
  intro: {
    en: [
      "Many people know they will leave their current job; the open question is when. Leave too early and you may walk away from a bonus, a vesting date or a project that would have strengthened your CV. Wait too long and a good opening passes. Timing a planned move is a different question from deciding whether to move at all.",
      "This report assumes the decision is made and compares the coming 12 months. It reads the balance between continuity and transition in your career factors, your current and next Dasha, and Jupiter, Saturn and Rahu, and ranks the windows where a switch looks best supported. For each window it notes the tradeoff, such as what you might gain or give up by moving then.",
    ],
    hi: [
      "बहुत से लोग जानते हैं कि वे मौजूदा नौकरी छोड़ेंगे; खुला सवाल यह है कि कब। बहुत जल्दी छोड़ें तो कोई बोनस, कोई वेस्टिंग तारीख या ऐसा प्रोजेक्ट छूट सकता है जो CV मज़बूत करता। बहुत देर करें तो अच्छा मौका निकल जाता है। सोची-समझी बदली का समय तय करना, बदलें या नहीं, इस सवाल से अलग है।",
      "यह रिपोर्ट मानकर चलती है कि फ़ैसला हो चुका है और आने वाले 12 महीनों की तुलना करती है। यह आपके करियर कारणों में निरंतरता और बदलाव का संतुलन, मौजूदा और अगली दशा, और गुरु, शनि व राहु पढ़ती है, और उन समयों का क्रम बताती है जहाँ बदलना सबसे ज़्यादा अनुकूल दिखता है। हर समय के लिए यह नफ़ा-नुकसान बताती है, जैसे उस समय बदलने पर आप क्या पा सकते हैं या क्या छोड़ सकते हैं।",
    ],
  },
  analyzes: {
    en: [
      "Continuity versus transition in your career houses and their lords",
      "Your current Mahadasha and Antardasha, and the next sub-period within 12 months",
      "Jupiter, Saturn and Rahu from your Lagna, including when each changes sign or direction",
      "The tradeoff attached to each ranked window, not just its strength",
    ],
    hi: [
      "आपके करियर भावों और उनके स्वामियों में निरंतरता बनाम बदलाव",
      "आपकी मौजूदा महादशा और अंतर्दशा, और 12 महीनों के भीतर अगली उप-दशा",
      "आपके लग्न से गुरु, शनि और राहु, जिसमें यह भी कि कब कोई राशि या दिशा बदलता है",
      "हर क्रमबद्ध समय से जुड़ा नफ़ा-नुकसान, सिर्फ़ उसकी ताकत नहीं",
    ],
  },
  readingGuide: {
    heading: { en: "Lining up a planned switch", hi: "सोची-समझी बदली की तैयारी कैसे करें" },
    points: {
      en: [
        "List the dates that cost money to leave before: bonuses, vesting, notice periods, appraisal cycles.",
        "Start conversations and applications a few weeks before the window you prefer, since hiring takes time.",
        "Keep the offer in writing and checked before you resign. The window supports the move; it does not replace due diligence.",
        "The report ranks windows and their tradeoffs. It never tells you to resign.",
      ],
      hi: [
        "वे तारीखें लिखें जिनसे पहले छोड़ने पर पैसा जाता है: बोनस, वेस्टिंग, नोटिस अवधि, मूल्यांकन चक्र।",
        "पसंद के समय से कुछ हफ़्ते पहले बातचीत और आवेदन शुरू करें, क्योंकि भर्ती में समय लगता है।",
        "इस्तीफ़ा देने से पहले प्रस्ताव लिखित में लें और जाँच लें। समय बदली का साथ देता है; जाँच की जगह नहीं लेता।",
        "रिपोर्ट समयों और उनके नफ़े-नुकसान का क्रम बताती है। यह कभी इस्तीफ़ा देने को नहीं कहती।",
      ],
    },
  },
  differentiation: {
    en: "Job Change Timing weighs whether to stay or move right now. New Job Opportunities looks at when an offer or joining is supported. This report is for a move you have already decided on: it ranks the year's switching windows and sets out the tradeoffs.",
    hi: "'नौकरी बदलने का समय' तौलती है कि अभी रुकें या बदलें। 'नई नौकरी के अवसर' देखती है कि प्रस्ताव या जॉइनिंग कब अनुकूल है। यह रिपोर्ट उस बदली के लिए है जिसका फ़ैसला आप कर चुके हैं: यह साल के बदलने वाले समयों का क्रम और उनके नफ़े-नुकसान बताती है।",
  },
  internalLinks: [
    { path: "/reports/focused/job-change-now", localized: true, label: { en: "Job Change Timing report (₹51)", hi: "नौकरी बदलने का समय रिपोर्ट (₹51)" } },
    { path: "/reports/focused/new-job-timing", localized: true, label: { en: "New Job Opportunities report (₹51)", hi: "नई नौकरी के अवसर रिपोर्ट (₹51)" } },
    { path: "/financial-astrology/job-change-prediction", localized: true, label: { en: "Job change prediction (free guide)", hi: "नौकरी बदलने की भविष्यवाणी (मुफ़्त गाइड)" } },
  ],
  benefits: {
    en: [
      "Ranks the stronger windows in the next 12 months for a planned job switch",
      "Notes what each window may cost or gain you, not only how strong it is",
      "Practical steps to line up the move with the window you choose",
    ],
    hi: [
      "अगले 12 महीनों में सोची-समझी नौकरी बदली के मज़बूत समयों का क्रम",
      "हर समय आपको क्या दे या क्या ले सकता है, सिर्फ़ उसकी ताकत नहीं",
      "चुने गए समय के साथ बदली तय करने के व्यावहारिक कदम",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Which upcoming period is best for switching jobs?”. It ranks the supported windows within 12 months and explains the tradeoff of each.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “नौकरी बदलने के लिए आने वाला सबसे अच्छा समय कौन-सा है?” यह 12 महीनों के भीतर अनुकूल समयों का क्रम बताती है और हर एक का नफ़ा-नुकसान समझाती है।",
    },
    howJyotishApproachesIt: {
      en: "Your career houses and lords, current and next Dasha and Jupiter, Saturn and Rahu dates are calculated first. The reading compares only those windows and adds no date of its own.",
      hi: "आपके करियर भाव और स्वामी, मौजूदा और अगली दशा और गुरु, शनि व राहु की तारीखें पहले गणना की जाती हैं। विश्लेषण केवल उन्हीं समयों की तुलना करता है और अपनी ओर से कोई तारीख नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For someone who has decided to move on from their employer or role and wants to choose the timing well.",
      hi: "उन लोगों के लिए जिन्होंने अपने नियोक्ता या भूमिका से आगे बढ़ने का फ़ैसला कर लिया है और समय अच्छे से चुनना चाहते हैं।",
    },
    whatYouReceive: {
      en: "A PDF of about 400 to 500 words: Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from your birth details.",
      hi: "लगभग 400 से 500 शब्दों की PDF: सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It does not promise an offer or a better job, and it never tells you to resign.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह किसी प्रस्ताव या बेहतर नौकरी का वादा नहीं करती, और कभी इस्तीफ़ा देने को नहीं कहती।",
    },
  },
  faqs: [
    {
      question: { en: "I am not sure I should leave at all. Is this the right report?", hi: "मुझे यकीन नहीं कि छोड़ना चाहिए या नहीं। क्या यह सही रिपोर्ट है?" },
      answer: {
        en: "Probably not yet. Job Change Timing compares staying and moving. This report assumes the move is decided.",
        hi: "शायद अभी नहीं। 'नौकरी बदलने का समय' रुकने और बदलने की तुलना करती है। यह रिपोर्ट मानकर चलती है कि बदलने का फ़ैसला हो चुका है।",
      },
    },
    {
      question: { en: "What kind of tradeoff does it describe?", hi: "यह किस तरह के नफ़े-नुकसान बताती है?" },
      answer: {
        en: "For example, a window that supports change but also brings added responsibility, or one that is steadier but slower. It does not calculate your bonus or notice terms.",
        hi: "जैसे, ऐसा समय जो बदलाव का साथ देता है पर ज़िम्मेदारी भी बढ़ाता है, या ऐसा जो ज़्यादा स्थिर पर धीमा है। यह आपका बोनस या नोटिस की शर्तें नहीं गिनती।",
      },
    },
    {
      question: { en: "Does it cover an internal role change?", hi: "क्या यह कंपनी के भीतर भूमिका बदलने को भी देखती है?" },
      answer: {
        en: "Yes. A change of role counts as well as a change of employer.",
        hi: "हाँ। नियोक्ता बदलने के साथ भूमिका बदलना भी इसमें आता है।",
      },
    },
    {
      question: { en: "Why only the next 12 months?", hi: "सिर्फ़ अगले 12 महीने क्यों?" },
      answer: {
        en: "The backend supplies a year of timing evidence for this question. For a multi-year career view, see Career Growth Years.",
        hi: "इस सवाल के लिए बैकएंड एक साल का समय-प्रमाण देता है। कई वर्षों के करियर नज़रिये के लिए 'करियर के अच्छे साल' देखें।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: null, transits: ["Jupiter", "Saturn", "Rahu"], remedies: false },
};
