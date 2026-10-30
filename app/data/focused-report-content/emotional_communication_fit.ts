/**
 * emotional_communication_fit -- grounded in modules/focused_reports/prompt_specs.py
 * (DUAL, overview -> COMPATIBILITY; read each person's Moon and
 * communication-related placements within their house/lord context and relevant
 * compatibility factors; separate differences in expression from lack of
 * affection; offer specific ways to clarify needs; remedies=False),
 * relationship_keys.py (houses 3, 4, 7; kootas graha_maitri, gana only; not a
 * timing key -> no Dasha or transit evidence) and relationship_evidence.py.
 */
import type { FocusedReportSeoContent } from "./types";

export const emotionalCommunicationFit: FocusedReportSeoContent = {
  questionKey: "emotional_communication_fit",
  searchIntent:
    "Emotional and verbal fit: a couple wondering why one feels unheard or uncared for even though both care, asking how their emotional needs and ways of talking compare. No timing. Distinct from conflict-areas (where fights start) and long-term-compatibility (overall lasting fit).",
  seoTitle: {
    en: "Do Our Emotions and Communication Match? | Jyotishasha",
    hi: "हमारी भावनाएँ और बातचीत कितनी मेल खाती हैं? | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report comparing both your charts to show how your emotional needs and ways of talking differ, and how to say what you need more clearly.",
    hi: "₹51 की रिपोर्ट, दोनों कुंडलियों की तुलना से: आपकी भावनात्मक ज़रूरतें और बात करने के तरीके कैसे अलग हैं, और अपनी ज़रूरत साफ़ कैसे कहें।",
  },
  h1: {
    en: "Emotional and Communication Fit: How Each of You Feels and Speaks",
    hi: "भावनाओं और बातचीत का तालमेल: आप दोनों कैसे महसूस करते और बोलते हैं",
  },
  intro: {
    en: [
      "A common complaint in close relationships is “you don't listen” met by “I do, you just don't say what you want”. Often both are true. One person needs reassurance out loud, the other shows care by doing things. One wants to talk now, the other needs a day. None of this means affection is missing; it means the two styles are different.",
      "This report focuses on that layer. It reads each person's Moon, which describes emotional needs, and Mercury, which describes how thoughts get put into words, within the 3rd, 4th and 7th houses and their lords. It adds two Ashtakoot results, Graha Maitri and Gana, which relate to mental rapport and temperament. It explains where your styles differ and suggests specific ways to make needs clearer.",
    ],
    hi: [
      "करीबी रिश्तों में एक आम शिकायत है “तुम सुनते नहीं”, और जवाब आता है “सुनता हूँ, तुम बस यह नहीं बताते कि क्या चाहिए”। अक्सर दोनों सच होते हैं। एक को खुलकर दिलासा चाहिए, दूसरा काम करके परवाह दिखाता है। एक अभी बात करना चाहता है, दूसरे को एक दिन चाहिए। इसका मतलब यह नहीं कि प्यार कम है; मतलब यह है कि दोनों के तरीके अलग हैं।",
      "यह रिपोर्ट इसी परत पर केंद्रित है। यह हर व्यक्ति का चंद्रमा पढ़ती है, जो भावनात्मक ज़रूरतें बताता है, और बुध, जो बताता है कि विचार शब्दों में कैसे आते हैं, 3रे, 4थे और 7वें भाव और उनके स्वामियों के संदर्भ में। इसमें दो अष्टकूट नतीजे जुड़ते हैं, ग्रह मैत्री और गण, जो मानसिक मेल और स्वभाव से जुड़े हैं। यह समझाती है कि आपके तरीके कहाँ अलग हैं और ज़रूरतें साफ़ करने के खास तरीके सुझाती है।",
    ],
  },
  analyzes: {
    en: [
      "Each person's Moon, read for what they need in order to feel emotionally safe",
      "Each person's Mercury, read for pace, directness and how disagreement gets voiced",
      "The 3rd, 4th and 7th houses and their lords in both charts, as the setting for those placements",
      "Graha Maitri and Gana, the two koota results tied to mental rapport and temperament",
    ],
    hi: [
      "हर व्यक्ति का चंद्रमा, यह देखने के लिए कि भावनात्मक रूप से सुरक्षित महसूस करने के लिए उसे क्या चाहिए",
      "हर व्यक्ति का बुध, बात की रफ़्तार, सीधापन और असहमति कैसे कही जाती है, इसके लिए",
      "दोनों कुंडलियों में 3रा, 4था और 7वाँ भाव और उनके स्वामी, उन स्थितियों के संदर्भ के रूप में",
      "ग्रह मैत्री और गण, मानसिक मेल और स्वभाव से जुड़े दो कूट नतीजे",
    ],
  },
  readingGuide: {
    heading: { en: "Different expression is not missing affection", hi: "अलग तरीके से कहना, कम प्यार नहीं है" },
    points: {
      en: [
        "Write down, separately, what makes each of you feel cared for. The lists are often more different than expected.",
        "Agree how you will ask for what you need, for example a direct sentence rather than a hint.",
        "If one of you processes slowly, set a time to return to the topic instead of forcing an answer on the spot.",
        "The report describes tendencies in each chart. It does not read anyone's private feelings.",
      ],
      hi: [
        "अलग-अलग लिखें कि आप में से हर एक को किस बात से परवाह महसूस होती है। सूचियाँ अक्सर उम्मीद से ज़्यादा अलग होती हैं।",
        "तय करें कि अपनी ज़रूरत कैसे माँगेंगे, जैसे इशारे के बजाय एक सीधा वाक्य।",
        "अगर आप में से कोई धीरे सोचता है, तो तुरंत जवाब माँगने के बजाय विषय पर लौटने का समय तय करें।",
        "रिपोर्ट हर कुंडली के रुझान बताती है। यह किसी की निजी भावनाएँ नहीं पढ़ती।",
      ],
    },
  },
  differentiation: {
    en: "Understanding Conflict maps where arguments tend to start. Long-Term Compatibility looks at the lasting fit overall. This report narrows in on two things only: what each of you needs emotionally and how each of you communicates.",
    hi: "'टकराव को समझना' बताती है कि झगड़े आमतौर पर कहाँ से शुरू होते हैं। 'लंबे समय का तालमेल' कुल मिलाकर टिकाऊ मेल देखती है। यह रिपोर्ट केवल दो बातों पर केंद्रित है: आप में से हर एक को भावनात्मक रूप से क्या चाहिए और हर एक कैसे बात करता है।",
  },
  internalLinks: [
    { path: "/reports/focused/conflict-areas", localized: true, label: { en: "Understanding Conflict report (₹51)", hi: "टकराव को समझना रिपोर्ट (₹51)" } },
    { path: "/reports/focused/strengthen-relationship", localized: true, label: { en: "Strengthening Your Relationship report (₹51)", hi: "रिश्ता मजबूत बनाना रिपोर्ट (₹51)" } },
    { path: "/tools/love-life", localized: true, label: { en: "Free love life calculator", hi: "मुफ़्त लव लाइफ़ कैलकुलेटर" } },
  ],
  benefits: {
    en: [
      "Compares both of your birth charts on emotional needs and communication style",
      "Separates a different way of expressing care from a lack of it",
      "Specific ways to say what you need so it lands",
    ],
    hi: [
      "आप दोनों की जन्म कुंडलियों की भावनात्मक ज़रूरतों और बात करने के तरीके पर तुलना",
      "परवाह जताने के अलग तरीके को परवाह की कमी से अलग करती है",
      "अपनी ज़रूरत ऐसे कहने के खास तरीके कि बात पहुँचे",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “How well do our emotional needs and communication match?”. It compares the relevant placements in both charts and two koota results, and explains where your styles meet and differ.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “हम दोनों की भावनात्मक ज़रूरतों और बातचीत का तालमेल कैसा है?” यह दोनों कुंडलियों की संबंधित स्थितियों और दो कूट नतीजों की तुलना करती है, और बताती है कि आपके तरीके कहाँ मिलते और कहाँ अलग होते हैं।",
    },
    howJyotishApproachesIt: {
      en: "Both partners' birth details are used. The backend computes both charts and the two koota results; the written reading interprets the emotional and verbal contrast and adds no rating. No Dasha or transit timing is involved.",
      hi: "दोनों साथियों की जन्म जानकारी का उपयोग होता है। बैकएंड दोनों कुंडलियाँ और दो कूट नतीजे गणना करता है; लिखित विश्लेषण भावनात्मक और बोलचाल के फ़र्क की व्याख्या करता है और कोई रेटिंग नहीं जोड़ता। इसमें दशा या गोचर का समय शामिल नहीं है।",
    },
    whoItIsFor: {
      en: "For partners who care about each other but often feel misunderstood, or who express affection in very different ways.",
      hi: "उन साथियों के लिए जो एक-दूसरे की परवाह करते हैं लेकिन अक्सर गलत समझे जाते हैं, या जो बहुत अलग तरीकों से प्यार जताते हैं।",
    },
    whatYouReceive: {
      en: "Delivered as a PDF of 400 to 500 words: Direct Answer, Where Your Charts Support Each Other, Differences That Need Care, Practical Relationship Focus, and Bottom Line, from both people's birth details.",
      hi: "400 से 500 शब्दों की PDF के रूप में: सीधा जवाब, चार्ट में तालमेल के संकेत, किन फर्कों पर ध्यान दें, रिश्ते के लिए उपयोगी ध्यान, और सीधी बात; दोनों लोगों की जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It describes tendencies only, does not measure love, and does not replace an honest conversation.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह केवल रुझान बताती है, प्यार नहीं मापती, और ईमानदार बातचीत की जगह नहीं लेती।",
    },
  },
  faqs: [
    {
      question: { en: "Why does the report focus on the Moon and Mercury?", hi: "रिपोर्ट चंद्रमा और बुध पर ही क्यों केंद्रित है?" },
      answer: {
        en: "In Jyotish the Moon relates to emotional needs and Mercury to speech and thinking, so they are the natural starting point for this question.",
        hi: "ज्योतिष में चंद्रमा भावनात्मक ज़रूरतों से और बुध वाणी व सोच से जुड़ा है, इसलिए इस सवाल के लिए वही स्वाभाविक शुरुआत हैं।",
      },
    },
    {
      question: { en: "Only two kootas are used. Is that enough?", hi: "केवल दो कूटों का उपयोग होता है। क्या यह काफ़ी है?" },
      answer: {
        en: "For this question, yes. The backend selects Graha Maitri and Gana because they relate to rapport and temperament. The full match is a separate report.",
        hi: "इस सवाल के लिए हाँ। बैकएंड ग्रह मैत्री और गण चुनता है क्योंकि वे मेल और स्वभाव से जुड़े हैं। पूरा मिलान एक अलग रिपोर्ट है।",
      },
    },
    {
      question: { en: "My partner is very quiet. Does that mean they care less?", hi: "मेरा साथी बहुत चुप रहता है। क्या इसका मतलब है वह कम परवाह करता है?" },
      answer: {
        en: "Not necessarily. The report separates a quieter style of expression from a lack of affection and suggests how to ask directly.",
        hi: "ज़रूरी नहीं। रिपोर्ट चुप स्वभाव को परवाह की कमी से अलग करती है और सीधे पूछने का तरीका सुझाती है।",
      },
    },
    {
      question: { en: "Do we need exact birth times?", hi: "क्या हमें सही जन्म समय चाहिए?" },
      answer: {
        en: "Yes, for both of you. Houses and their lords depend on the time of birth, and the checkout asks for both.",
        hi: "हाँ, आप दोनों के। भाव और उनके स्वामी जन्म समय पर निर्भर करते हैं, और चेकआउट दोनों का समय माँगता है।",
      },
    },
  ],
  grounding: { archetype: "COMPATIBILITY", horizonMonths: null, houses: [3, 4, 7], transits: [], remedies: false },
};
