/**
 * life_direction -- grounded in modules/focused_reports/prompt_specs.py
 * (life_direction_and_strengths, overview -> DIRECTION; compare recurring natal
 * house/lord and placement themes rather than imposing one predetermined career
 * or lifestyle; offer a few plausible directions and their tradeoffs, not a
 * command or a fixed destiny; remedies=False) and life_keys.py (houses 1, 5, 9,
 * 10; horizon None -> natal only, so master_contract.py omits Current Timing
 * Context; natal Sun, Moon, Mercury, Jupiter, Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const lifeDirection: FocusedReportSeoContent = {
  questionKey: "life_direction",
  searchIntent:
    "Orientation: someone at a crossroads (student, mid-career, after a break) who wants a few broad directions of effort that fit their chart, with tradeoffs, rather than one prescribed path. No timing. Distinct from natural-strengths (describing tendencies) and focus-to-use-strengths (this year's priorities).",
  seoTitle: {
    en: "Which Life Direction Suits Me Best? | Jyotishasha",
    hi: "मेरे लिए जीवन की कौन-सी दिशा सही है? | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report offering a few broad directions of effort that fit recurring themes in your birth chart, with the tradeoffs of each, not one fixed path.",
    hi: "₹51 की रिपोर्ट: आपकी जन्म कुंडली के बार-बार आने वाले विषयों से मेल खाती कुछ बड़ी दिशाएँ, हर एक के नफ़े-नुकसान के साथ, कोई एक तय रास्ता नहीं।",
  },
  h1: {
    en: "Life Direction: A Few Paths That Fit Your Chart, and Their Tradeoffs",
    hi: "जीवन की दिशा: आपकी कुंडली से मेल खाते कुछ रास्ते, और उनके नफ़े-नुकसान",
  },
  intro: {
    en: [
      "Big direction questions rarely have one right answer. Should effort go into a stable career or something of your own? Teaching, building, serving, creating? Most people could thrive on more than one path. What helps is seeing which directions fit how you are made, and what each would ask of you.",
      "This report reads your birth chart for recurring themes. It looks at your Lagna and the 1st, 5th, 9th and 10th houses and their lords, which relate to self, intelligence and creativity, beliefs and higher purpose, and public work. It adds the placements of the Sun, Moon, Mercury, Jupiter and Saturn. It then offers a few plausible directions where those themes agree, with the tradeoffs of each. It does not hand you a predetermined career or lifestyle.",
    ],
    hi: [
      "दिशा के बड़े सवालों का शायद ही एक सही जवाब होता है। मेहनत स्थिर करियर में लगे या अपने किसी काम में? पढ़ाना, बनाना, सेवा करना, रचना? ज़्यादातर लोग एक से ज़्यादा रास्तों पर आगे बढ़ सकते हैं। मदद यह देखने से मिलती है कि कौन-सी दिशाएँ आपकी बनावट से मेल खाती हैं, और हर एक आपसे क्या माँगेगी।",
      "यह रिपोर्ट आपकी जन्म कुंडली में बार-बार आने वाले विषय पढ़ती है। यह आपका लग्न और 1ला, 5वाँ, 9वाँ और 10वाँ भाव और उनके स्वामी देखती है, जो स्वयं, बुद्धि और रचनात्मकता, आस्था और बड़े उद्देश्य, और सार्वजनिक काम से जुड़े हैं। इसमें सूर्य, चंद्रमा, बुध, गुरु और शनि की स्थितियाँ जुड़ती हैं। फिर यह कुछ संभावित दिशाएँ बताती है जहाँ ये विषय मेल खाते हैं, हर एक के नफ़े-नुकसान के साथ। यह आपको कोई पहले से तय करियर या जीवनशैली नहीं थमाती।",
    ],
  },
  analyzes: {
    en: [
      "The 1st, 5th, 9th and 10th houses and their lords: self, creativity, purpose and public work",
      "Your Lagna and the placements of the Sun, Moon, Mercury, Jupiter and Saturn",
      "Themes that recur across several of these factors, which carry more weight than any single placement",
      "Where the recurring themes point, and what each direction would ask of you",
    ],
    hi: [
      "1ला, 5वाँ, 9वाँ और 10वाँ भाव और उनके स्वामी: स्वयं, रचनात्मकता, उद्देश्य और सार्वजनिक काम",
      "आपका लग्न और सूर्य, चंद्रमा, बुध, गुरु और शनि की स्थितियाँ",
      "वे विषय जो इनमें से कई कारणों में बार-बार आते हैं, जिनका वज़न किसी एक स्थिति से ज़्यादा है",
      "बार-बार आने वाले विषय किस ओर इशारा करते हैं, और हर दिशा आपसे क्या माँगेगी",
    ],
  },
  readingGuide: {
    heading: { en: "Testing a direction before committing", hi: "प्रतिबद्ध होने से पहले किसी दिशा को कैसे परखें" },
    points: {
      en: [
        "Treat each suggested direction as a hypothesis. Try a short course, a side project or a conversation with someone already on that path.",
        "Compare the tradeoffs honestly: income, stability, time and what you would have to give up.",
        "Combine the reading with practical facts, such as your qualifications, finances and family responsibilities.",
        "No direction is presented as destiny, and the report never tells you to quit or abandon anything.",
      ],
      hi: [
        "हर सुझाई दिशा को एक परिकल्पना मानें। कोई छोटा कोर्स, कोई साइड प्रोजेक्ट या उस रास्ते पर पहले से चल रहे किसी व्यक्ति से बातचीत आज़माएँ।",
        "नफ़े-नुकसान ईमानदारी से तौलें: आमदनी, स्थिरता, समय और जो छोड़ना पड़ेगा।",
        "विश्लेषण को व्यावहारिक तथ्यों के साथ रखें, जैसे आपकी योग्यता, पैसे और पारिवारिक ज़िम्मेदारियाँ।",
        "किसी दिशा को भाग्य के रूप में नहीं रखा जाता, और रिपोर्ट कभी कुछ छोड़ने को नहीं कहती।",
      ],
    },
  },
  differentiation: {
    en: "Natural Strengths describes what you are naturally good at. Putting Strengths to Work turns that into this year's priorities. This report sits in between: it points your recurring tendencies towards a few broad directions and sets out the tradeoffs.",
    hi: "'प्राकृतिक ताकतें' बताती है कि आप स्वाभाविक रूप से किसमें अच्छे हैं। 'ताकतों का सही इस्तेमाल' उसे इस साल की प्राथमिकताओं में बदलती है। यह रिपोर्ट बीच में है: यह आपके बार-बार आने वाले रुझानों को कुछ बड़ी दिशाओं की ओर मोड़ती है और नफ़े-नुकसान बताती है।",
  },
  internalLinks: [
    { path: "/reports/focused/natural-strengths", localized: true, label: { en: "Natural Strengths report (₹51)", hi: "प्राकृतिक ताकतें रिपोर्ट (₹51)" } },
    { path: "/reports/focused/focus-to-use-strengths", localized: true, label: { en: "Putting Strengths to Work report (₹51)", hi: "ताकतों का सही इस्तेमाल रिपोर्ट (₹51)" } },
    { path: "/tools/career-path", localized: true, label: { en: "Free career path calculator", hi: "मुफ़्त करियर पथ कैलकुलेटर" } },
    { path: "/reports/career_report", localized: false, label: { en: "Full Career Report", hi: "पूरी करियर रिपोर्ट (अंग्रेज़ी)" } },
  ],
  benefits: {
    en: [
      "A few broad directions that fit recurring themes in your birth chart",
      "The tradeoffs of each, so you can compare them honestly",
      "No single prescribed path and no fixed destiny",
    ],
    hi: [
      "कुछ बड़ी दिशाएँ जो आपकी जन्म कुंडली के बार-बार आने वाले विषयों से मेल खाती हैं",
      "हर एक के नफ़े-नुकसान, ताकि आप ईमानदारी से तुलना कर सकें",
      "कोई एक थोपा हुआ रास्ता नहीं, कोई तय भाग्य नहीं",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Which life direction suits me best?”. It offers a few plausible directions supported by recurring chart themes, with their tradeoffs.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “मेरे लिए जीवन की कौन-सी दिशा सबसे सही रहेगी?” यह कुंडली के बार-बार आने वाले विषयों से समर्थित कुछ संभावित दिशाएँ, उनके नफ़े-नुकसान के साथ, बताती है।",
    },
    howJyotishApproachesIt: {
      en: "Your Lagna, the four houses above with their lords and the five natal placements are calculated first. No Dasha or transit timing is used, so the PDF leaves out its timing section and the reading invents no date.",
      hi: "आपका लग्न, ऊपर के चार भाव और उनके स्वामी, और पाँच जन्मजात स्थितियाँ पहले गणना की जाती हैं। दशा या गोचर का समय उपयोग नहीं होता, इसलिए PDF में समय वाला हिस्सा नहीं होता और विश्लेषण कोई तारीख नहीं गढ़ता।",
    },
    whoItIsFor: {
      en: "For a student choosing a stream, a professional reconsidering their path, or anyone restarting after a break who wants a grounded sense of direction.",
      hi: "स्ट्रीम चुन रहे विद्यार्थी, अपना रास्ता दोबारा सोच रहे पेशेवर, या ब्रेक के बाद फिर शुरू कर रहे किसी भी व्यक्ति के लिए जो दिशा की ठोस समझ चाहता है।",
    },
    whatYouReceive: {
      en: "A PDF of roughly 400 to 500 words under Direct Answer, Natural Strengths and Tendencies, Most Relevant Directions, Practical Focus, and Bottom Line, from your birth details. The Current Timing Context section is omitted because this report has no timing evidence.",
      hi: "लगभग 400 से 500 शब्दों की PDF, इन शीर्षकों में: सीधा जवाब, ताकतें और रुझान, सबसे उपयोगी दिशाएँ, व्यावहारिक ध्यान, और सीधी बात; आपकी जन्म जानकारी से। 'अभी के समय का संदर्भ' वाला हिस्सा नहीं होता, क्योंकि इस रिपोर्ट में समय का प्रमाण नहीं है।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It suggests directions, not a destiny, and never tells you to leave a job, course or relationship.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह दिशाएँ सुझाती है, भाग्य नहीं, और कभी नौकरी, पढ़ाई या रिश्ता छोड़ने को नहीं कहती।",
    },
  },
  faqs: [
    {
      question: { en: "Will it name one career for me?", hi: "क्या यह मेरे लिए एक करियर बताएगी?" },
      answer: {
        en: "No. It offers a few broad directions with tradeoffs. For career-specific detail, the full Career Report goes further.",
        hi: "नहीं। यह नफ़े-नुकसान के साथ कुछ बड़ी दिशाएँ बताती है। करियर के खास विवरण के लिए पूरी करियर रिपोर्ट आगे जाती है।",
      },
    },
    {
      question: { en: "What if I am already committed to a path?", hi: "अगर मैं पहले से किसी रास्ते पर प्रतिबद्ध हूँ तो?" },
      answer: {
        en: "The report can show which parts of that path fit your chart well and where a different emphasis within it might suit you.",
        hi: "रिपोर्ट दिखा सकती है कि उस रास्ते के कौन-से हिस्से आपकी कुंडली से अच्छे मेल खाते हैं और उसके भीतर कहाँ अलग ज़ोर आपके लिए ठीक हो सकता है।",
      },
    },
    {
      question: { en: "Why is there no timing?", hi: "इसमें समय क्यों नहीं है?" },
      answer: {
        en: "Direction is read from the birth chart alone, and the backend supplies no Dasha evidence for it. Putting Strengths to Work adds the current year.",
        hi: "दिशा केवल जन्म कुंडली से पढ़ी जाती है, और बैकएंड इसके लिए दशा का प्रमाण नहीं देता। 'ताकतों का सही इस्तेमाल' मौजूदा साल जोड़ती है।",
      },
    },
    {
      question: { en: "How is this different from Natural Strengths?", hi: "यह 'प्राकृतिक ताकतें' से कैसे अलग है?" },
      answer: {
        en: "Natural Strengths describes tendencies. This report asks where those tendencies could lead and what each direction would cost.",
        hi: "'प्राकृतिक ताकतें' रुझान बताती है। यह रिपोर्ट पूछती है कि वे रुझान कहाँ ले जा सकते हैं और हर दिशा की क्या कीमत होगी।",
      },
    },
  ],
  grounding: { archetype: "DIRECTION", horizonMonths: null, houses: [1, 5, 9, 10], transits: [], natalPlanets: ["Sun", "Moon", "Mercury", "Jupiter", "Saturn"], remedies: false },
};
