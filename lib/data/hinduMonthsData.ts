export interface Multilingual {
  en: string;
  hi: string;
}

export interface FAQ {
  question: Multilingual;
  answer: Multilingual;
  category?: string;
}

export interface Festival {
  slug: string;
  name: Multilingual;
  approxTithi?: string;
  paksha?: "shukla" | "krishna";
  significance: Multilingual;
  isMajor: boolean;
  existingPageUrl?: string;
}

export interface Vrat {
  slug: string;
  name: Multilingual;
  type: "ekadashi" | "purnima" | "amavasya" | "sankashti" | "pradosh" | "other";
  significance: Multilingual;
  existingPageUrl?: string;
}

export interface MonthActivity {
  title: Multilingual;
  description: Multilingual;
  category?: "spiritual" | "financial" | "health" | "agricultural" | "social" | "travel";
  icon?: string;
}

export interface QuickFact {
  label: Multilingual;
  value: Multilingual;
  icon?: string;
  linkSlug?: string;
  linkType?: "nakshatra" | "ritu" | "ayana" | "internal";
}

export interface AssociatedZodiacSign {
  englishName: string;
  hindiName: string;
  slug: string;
}

export type MonthSlug =
  | "chaitra"
  | "vaishakha"
  | "jyeshtha"
  | "ashadha"
  | "shravana"
  | "bhadrapada"
  | "ashwin"
  | "kartika"
  | "margashirsha"
  | "pausha"
  | "magha"
  | "phalguna";

export interface HinduMonthDetail {
  basic: {
    slug: MonthSlug;
    monthNumber: number;
    sanskritName: string;
    iast?: string;
    englishName: string;
    hindiName: string;
  };
  hero: {
    h1: Multilingual;
    subtitle: Multilingual;
    heroImage?: string;
  };
  quickFacts: QuickFact[];
  introduction: Multilingual[];
  namingNakshatra: {
    slug: string;
    name: Multilingual;
    rationale: Multilingual;
  };
  ritu: {
    slug: string;
    name: Multilingual;
    gregorianApprox: Multilingual;
    description: Multilingual;
  };
  ayana: {
    slug: "uttarayana" | "dakshinayana";
    name: Multilingual;
    description: Multilingual;
  };
  associatedZodiacSigns?: AssociatedZodiacSign[];
  associatedPlanet?: {
    slug: string;
    englishName: string;
    hindiName: string;
  };
  festivals: Festival[];
  vrats: Vrat[];
  muhuratRelevance: {
    summary: Multilingual;
    relevantMuhuratSlugs: string[];
  };
  panchangRelevance: {
    summary: Multilingual;
    relatedTithiSlugs?: string[];
  };
  agriculturalImportance: {
    intro: Multilingual;
    items: MonthActivity[];
  };
  lifestyleGuidance: {
    intro: Multilingual;
    items: MonthActivity[];
  };
  recommendedActivities: MonthActivity[];
  avoidedActivities: MonthActivity[];
  faqs: FAQ[];
  seo: {
    title: Multilingual;
    description: Multilingual;
    keywords?: { en: string[]; hi: string[] };
    ogImage?: string;
  };
  crossLinks: {
    pakshaSlug: string;
    previousMonthSlug: MonthSlug;
    nextMonthSlug: MonthSlug;
    relatedMonths?: MonthSlug[];
  };
}

export const hinduMonthsData: Record<MonthSlug, HinduMonthDetail> = {
  chaitra: {
    basic: {
      slug: "chaitra",
      monthNumber: 1,
      sanskritName: "चैत्र",
      iast: "Caitra",
      englishName: "Chaitra",
      hindiName: "चैत्र",
    },
    hero: {
      h1: { en: "Chaitra Maas", hi: "चैत्र मास" },
      subtitle: {
        en: "The first lunar month — spring renewal and the Hindu New Year.",
        hi: "पहला चंद्र मास — वसंत का नवीनीकरण और हिंदू नववर्ष।",
      },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Vasanta (Spring)", hi: "वसंत" }, icon: "🌸", linkSlug: "vasanta", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Uttarayana", hi: "उत्तरायण" }, icon: "☀️", linkSlug: "uttarayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late March – Late April", hi: "मार्च अंत – अप्रैल अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Chitra", hi: "चित्रा" }, icon: "⭐", linkSlug: "chitra", linkType: "nakshatra" },
    ],
    introduction: [
      {
        en: "Chaitra is the first month of the Hindu lunisolar calendar (Amanta system), marking the beginning of the new year in much of India. It opens with the Sun moving out of Pisces into Aries and the Moon waxing toward the festivals of spring.",
        hi: "चैत्र हिंदू चंद्र-सौर पंचांग (अमांत प्रणाली) का पहला महीना है, जो भारत के अधिकांश हिस्सों में नववर्ष की शुरुआत का प्रतीक है। इसकी शुरुआत सूर्य के मीन से मेष राशि में प्रवेश और चंद्रमा के वसंत उत्सवों की ओर बढ़ने के साथ होती है।",
      },
      {
        en: "The month is named after the Chitra nakshatra, near which the full moon occurs during this period. Chaitra carries strong associations with renewal — new crops, new beginnings, and the spiritual reset of Chaitra Navratri.",
        hi: "इस महीने का नाम चित्रा नक्षत्र पर रखा गया है, जिसके निकट इस अवधि में पूर्णिमा होती है। चैत्र का संबंध नवीनीकरण से गहराई से जुड़ा है — नई फसलें, नई शुरुआत और चैत्र नवरात्रि का आध्यात्मिक पुनर्नवीनीकरण।",
      },
    ],
    namingNakshatra: {
      slug: "chitra",
      name: { en: "Chitra", hi: "चित्रा" },
      rationale: {
        en: "Hindu lunar months are traditionally named for the nakshatra nearest the full moon (Purnima) within them. Chaitra's Purnima falls near Chitra, the 'brilliant' star, giving the month its name.",
        hi: "हिंदू चंद्र महीनों का नामकरण पारंपरिक रूप से उस नक्षत्र के नाम पर किया जाता है जो उस महीने की पूर्णिमा के निकटतम होता है। चैत्र की पूर्णिमा चित्रा, 'तेजस्वी' तारे के निकट पड़ती है, जिससे इस महीने को यह नाम मिला।",
      },
    },
    ritu: {
      slug: "vasanta",
      name: { en: "Vasanta (Spring)", hi: "वसंत" },
      gregorianApprox: { en: "Mid-March to Mid-May", hi: "मध्य मार्च से मध्य मई" },
      description: {
        en: "Vasanta Ritu spans Chaitra and Vaishakha — a season of mild weather, blossoming, and renewal, traditionally considered the most pleasant and auspicious of the six seasons.",
        hi: "वसंत ऋतु चैत्र और वैशाख तक फैली होती है — यह सुहावने मौसम, पुष्पन और नवीनीकरण की ऋतु है, जिसे पारंपरिक रूप से छह ऋतुओं में सबसे सुखद और शुभ माना जाता है।",
      },
    },
    ayana: {
      slug: "uttarayana",
      name: { en: "Uttarayana", hi: "उत्तरायण" },
      description: {
        en: "Chaitra falls within Uttarayana, the Sun's northward movement, regarded in Hindu tradition as a spiritually auspicious half of the year.",
        hi: "चैत्र उत्तरायण के अंतर्गत आता है, सूर्य की उत्तर दिशा में गति, जिसे हिंदू परंपरा में वर्ष का आध्यात्मिक रूप से शुभ अर्ध माना जाता है।",
      },
    },
    associatedZodiacSigns: [
      { englishName: "Pisces", hindiName: "मीन", slug: "pisces" },
      { englishName: "Aries", hindiName: "मेष", slug: "aries" },
    ],
    festivals: [
      {
        slug: "gudi-padwa-ugadi",
        name: { en: "Gudi Padwa / Ugadi", hi: "गुड़ी पड़वा / उगादी" },
        approxTithi: "Chaitra Shukla Pratipada",
        paksha: "shukla",
        significance: {
          en: "The Hindu New Year in Maharashtra, Karnataka, Andhra Pradesh and Telangana — marked by raising the Gudi flag and beginning new ventures.",
          hi: "महाराष्ट्र, कर्नाटक, आंध्र प्रदेश और तेलंगाना में हिंदू नववर्ष — गुड़ी फहराने और नए कार्यों की शुरुआत के साथ मनाया जाता है।",
        },
        isMajor: true,
      },
      {
        slug: "chaitra-navratri",
        name: { en: "Chaitra Navratri", hi: "चैत्र नवरात्रि" },
        approxTithi: "Chaitra Shukla Pratipada – Navami",
        paksha: "shukla",
        significance: {
          en: "Nine nights dedicated to the Goddess, culminating in Ram Navami — one of the two major Navratri observances of the year.",
          hi: "देवी को समर्पित नौ रातें, जो राम नवमी पर समाप्त होती हैं — वर्ष की दो प्रमुख नवरात्रि में से एक।",
        },
        isMajor: true,
        existingPageUrl: "/navratri",
      },
      {
        slug: "ram-navami",
        name: { en: "Ram Navami", hi: "राम नवमी" },
        approxTithi: "Chaitra Shukla Navami",
        paksha: "shukla",
        significance: {
          en: "Celebrates the birth of Lord Rama, observed on the ninth day of Chaitra Navratri.",
          hi: "भगवान राम के जन्म का उत्सव, चैत्र नवरात्रि के नौवें दिन मनाया जाता है।",
        },
        isMajor: true,
      },
    ],
    vrats: [
      {
        slug: "kamada-ekadashi",
        name: { en: "Kamada Ekadashi", hi: "कामदा एकादशी" },
        type: "ekadashi",
        significance: {
          en: "The Shukla Paksha Ekadashi of Chaitra, believed to fulfil sincere wishes and free one from past sins.",
          hi: "चैत्र की शुक्ल पक्ष एकादशी, जिसके बारे में माना जाता है कि यह सच्ची इच्छाओं को पूर्ण करती है और पूर्व पापों से मुक्त करती है।",
        },
        existingPageUrl: "/ekadashi/kamada-ekadashi",
      },
      {
        slug: "papmochini-ekadashi",
        name: { en: "Papmochini Ekadashi", hi: "पापमोचनी एकादशी" },
        type: "ekadashi",
        significance: {
          en: "The Krishna Paksha Ekadashi marking the close of the lunar year, observed for liberation from sin.",
          hi: "चंद्र वर्ष के समापन का प्रतीक कृष्ण पक्ष एकादशी, पापों से मुक्ति हेतु मनाई जाती है।",
        },
        existingPageUrl: "/ekadashi/papmochini-ekadashi",
      },
    ],
    muhuratRelevance: {
      summary: {
        en: "Chaitra falls outside Chaturmas, making it favorable for marriage, Griha Pravesh and new ventures, especially after Ram Navami.",
        hi: "चैत्र चातुर्मास से बाहर पड़ता है, जिससे यह विवाह, गृह प्रवेश और नए कार्यों के लिए अनुकूल होता है, विशेषकर राम नवमी के बाद।",
      },
      relevantMuhuratSlugs: ["marriage-muhurat", "grah-pravesh-muhurat", "naamkaran-muhurat"],
    },
    panchangRelevance: {
      summary: {
        en: "Chaitra Shukla Pratipada is the reference Tithi for the Hindu New Year across several regional calendars, making this month's Tithi cycle especially significant.",
        hi: "चैत्र शुक्ल प्रतिपदा कई क्षेत्रीय पंचांगों में हिंदू नववर्ष की संदर्भ तिथि है, जिससे इस महीने का तिथि चक्र विशेष महत्व रखता है।",
      },
      relatedTithiSlugs: ["pratipada", "navami"],
    },
    agriculturalImportance: {
      intro: {
        en: "Chaitra coincides with the Rabi harvest across much of North India, particularly wheat and barley, making it a season of agrarian abundance and gratitude.",
        hi: "चैत्र उत्तर भारत के अधिकांश हिस्सों में रबी फसल, विशेषकर गेहूं और जौ की कटाई के साथ मेल खाता है, जिससे यह कृषि समृद्धि और कृतज्ञता का मौसम बन जाता है।",
      },
      items: [
        {
          title: { en: "Rabi Harvest", hi: "रबी की फसल कटाई" },
          description: { en: "Wheat and barley harvesting peaks in North Indian plains during Chaitra.", hi: "उत्तर भारतीय मैदानों में चैत्र के दौरान गेहूं और जौ की कटाई चरम पर होती है।" },
          category: "agricultural",
          icon: "🌾",
        },
        {
          title: { en: "New Agricultural Year", hi: "नया कृषि वर्ष" },
          description: { en: "Several regional almanacs mark Chaitra as the start of the agricultural and fiscal year.", hi: "कई क्षेत्रीय पंचांग चैत्र को कृषि और वित्तीय वर्ष की शुरुआत मानते हैं।" },
          category: "agricultural",
          icon: "🌱",
        },
      ],
    },
    lifestyleGuidance: {
      intro: {
        en: "As a season of renewal, Chaitra is traditionally a time for lighter, detoxifying foods and fresh starts in daily routine.",
        hi: "नवीनीकरण की ऋतु होने के कारण, चैत्र पारंपरिक रूप से हल्के, विषहरण करने वाले भोजन और दैनिक दिनचर्या में नई शुरुआत का समय है।",
      },
      items: [
        {
          title: { en: "Seasonal Detox Diet", hi: "मौसमी विषहरण आहार" },
          description: { en: "Neem leaves and bitter spring greens are traditionally consumed for health at the start of Chaitra.", hi: "चैत्र की शुरुआत में स्वास्थ्य हेतु पारंपरिक रूप से नीम की पत्तियां और कड़वे वसंत साग का सेवन किया जाता है।" },
          category: "health",
          icon: "🌿",
        },
        {
          title: { en: "Navratri Fasting", hi: "नवरात्रि व्रत" },
          description: { en: "Many observe a satvik, grain-light diet through Chaitra Navratri.", hi: "कई लोग चैत्र नवरात्रि के दौरान सात्विक, अनाज-रहित आहार का पालन करते हैं।" },
          category: "spiritual",
          icon: "🙏",
        },
      ],
    },
    recommendedActivities: [
      {
        title: { en: "Begin New Ventures", hi: "नए कार्य आरंभ करें" },
        description: { en: "The New Year energy of Chaitra makes it ideal for starting businesses, education, or projects.", hi: "चैत्र की नववर्ष ऊर्जा व्यापार, शिक्षा या परियोजनाएं शुरू करने के लिए आदर्श बनाती है।" },
        category: "financial",
        icon: "🚀",
      },
      {
        title: { en: "Spiritual Fasting", hi: "आध्यात्मिक व्रत" },
        description: { en: "Chaitra Navratri fasting is widely observed for spiritual discipline and health reset.", hi: "आध्यात्मिक अनुशासन और स्वास्थ्य पुनर्नवीनीकरण के लिए चैत्र नवरात्रि व्रत व्यापक रूप से मनाया जाता है।" },
        category: "spiritual",
        icon: "🕉️",
      },
    ],
    avoidedActivities: [
      {
        title: { en: "Heavy, Tamasic Food During Navratri", hi: "नवरात्रि में तामसिक भोजन" },
        description: { en: "Non-vegetarian and heavy foods are traditionally avoided during the Navratri fasting days within Chaitra.", hi: "चैत्र के नवरात्रि व्रत के दिनों में पारंपरिक रूप से मांसाहारी और भारी भोजन से परहेज किया जाता है।" },
        category: "health",
        icon: "🚫",
      },
    ],
    faqs: [
      {
        question: { en: "Why is Chaitra considered the first Hindu month?", hi: "चैत्र को हिंदू वर्ष का पहला महीना क्यों माना जाता है?" },
        answer: { en: "In the Amanta lunisolar calendar followed across most of India, Chaitra Shukla Pratipada marks the New Year, making Chaitra the first month of the cycle.", hi: "भारत के अधिकांश हिस्सों में प्रचलित अमांत चंद्र-सौर पंचांग में, चैत्र शुक्ल प्रतिपदा नववर्ष का प्रतीक है, जिससे चैत्र चक्र का पहला महीना बनता है।" },
      },
      {
        question: { en: "What is the significance of Chaitra Navratri?", hi: "चैत्र नवरात्रि का क्या महत्व है?" },
        answer: { en: "Chaitra Navratri honors the Goddess across nine nights and culminates in Ram Navami, celebrating the birth of Lord Rama.", hi: "चैत्र नवरात्रि नौ रातों तक देवी का सम्मान करती है और राम नवमी पर समाप्त होती है, जो भगवान राम के जन्म का उत्सव है।" },
      },
      {
        question: { en: "Is Chaitra a good month for weddings?", hi: "क्या चैत्र विवाह के लिए शुभ महीना है?" },
        answer: { en: "Yes — Chaitra falls outside Chaturmas, so marriage and Griha Pravesh muhurats are generally favorable, particularly after Ram Navami.", hi: "हां — चैत्र चातुर्मास से बाहर पड़ता है, इसलिए विवाह और गृह प्रवेश मुहूर्त सामान्यतः शुभ होते हैं, विशेषकर राम नवमी के बाद।" },
      },
      {
        question: { en: "Which nakshatra is Chaitra named after?", hi: "चैत्र का नामकरण किस नक्षत्र पर हुआ है?" },
        answer: { en: "Chaitra is named after Chitra nakshatra, near which the month's full moon traditionally falls.", hi: "चैत्र का नाम चित्रा नक्षत्र पर रखा गया है, जिसके निकट इस महीने की पूर्णिमा पारंपरिक रूप से पड़ती है।" },
      },
      {
        question: { en: "What season does Chaitra fall in?", hi: "चैत्र किस ऋतु में आता है?" },
        answer: { en: "Chaitra falls in Vasanta Ritu (spring), regarded as the most pleasant of the six Hindu seasons.", hi: "चैत्र वसंत ऋतु में आता है, जिसे छह हिंदू ऋतुओं में सबसे सुहावना माना जाता है।" },
      },
    ],
    seo: {
      title: { en: "Chaitra Month — Hindu Calendar's First Month | Festivals, Vrats & Significance", hi: "चैत्र मास — हिंदू पंचांग का पहला महीना | त्योहार, व्रत और महत्व" },
      description: {
        en: "Explore Chaitra, the first Hindu lunar month: Chaitra Navratri, Ram Navami, Gudi Padwa, Vasanta Ritu, naming nakshatra Chitra, and muhurat guidance.",
        hi: "चैत्र, पहले हिंदू चंद्र मास के बारे में जानें: चैत्र नवरात्रि, राम नवमी, गुड़ी पड़वा, वसंत ऋतु, नामकरण नक्षत्र चित्रा और मुहूर्त मार्गदर्शन।",
      },
      keywords: {
        en: ["Chaitra month", "Chaitra Navratri", "Hindu New Year", "Ram Navami", "Vasanta Ritu"],
        hi: ["चैत्र मास", "चैत्र नवरात्रि", "हिंदू नववर्ष", "राम नवमी", "वसंत ऋतु"],
      },
    },
    crossLinks: {
      pakshaSlug: "paksha",
      previousMonthSlug: "phalguna",
      nextMonthSlug: "vaishakha",
    },
  },
  vaishakha: {
    basic: {
      slug: "vaishakha",
      monthNumber: 2,
      sanskritName: "वैशाख",
      iast: "Vaiśākha",
      englishName: "Vaishakha",
      hindiName: "वैशाख",
    },
    hero: {
      h1: { en: "Vaishakha Maas", hi: "वैशाख मास" },
      subtitle: {
        en: "The month of Akshaya Tritiya — prosperity, new ventures and harvest abundance.",
        hi: "अक्षय तृतीया का महीना — समृद्धि, नए कार्य और फसल की प्रचुरता।",
      },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Vasanta (Spring)", hi: "वसंत" }, icon: "🌸", linkSlug: "vasanta", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Uttarayana", hi: "उत्तरायण" }, icon: "☀️", linkSlug: "uttarayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late April – Late May", hi: "अप्रैल अंत – मई अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Vishakha", hi: "विशाखा" }, icon: "⭐", linkSlug: "vishakha", linkType: "nakshatra" },
    ],
    introduction: [
      {
        en: "Vaishakha, the second month of the Hindu calendar, is widely regarded as one of the most auspicious months of the year, anchored by Akshaya Tritiya — a day considered eternally lucky for new beginnings.",
        hi: "वैशाख, हिंदू पंचांग का दूसरा महीना, वर्ष के सबसे शुभ महीनों में से एक माना जाता है, जिसका आधार अक्षय तृतीया है — एक दिन जिसे नई शुरुआत के लिए सदा शुभ माना जाता है।",
      },
      {
        en: "The month takes its name from the Vishakha nakshatra and continues the energy of Vasanta Ritu, with the Sun moving from Aries into Taurus during this period.",
        hi: "इस महीने का नाम विशाखा नक्षत्र पर रखा गया है और यह वसंत ऋतु की ऊर्जा को आगे बढ़ाता है, इस अवधि में सूर्य मेष से वृषभ राशि में गति करता है।",
      },
    ],
    namingNakshatra: {
      slug: "vishakha",
      name: { en: "Vishakha", hi: "विशाखा" },
      rationale: {
        en: "Vaishakha's Purnima falls near the Vishakha nakshatra, giving the month its name in the traditional naming convention.",
        hi: "वैशाख की पूर्णिमा विशाखा नक्षत्र के निकट पड़ती है, जिससे पारंपरिक नामकरण प्रणाली में इस महीने को यह नाम मिला।",
      },
    },
    ritu: {
      slug: "vasanta",
      name: { en: "Vasanta (Spring)", hi: "वसंत" },
      gregorianApprox: { en: "Mid-March to Mid-May", hi: "मध्य मार्च से मध्य मई" },
      description: {
        en: "Vaishakha closes out Vasanta Ritu with warming temperatures and the height of the Rabi harvest season.",
        hi: "वैशाख बढ़ते तापमान और रबी फसल के मौसम के चरम के साथ वसंत ऋतु को समाप्त करता है।",
      },
    },
    ayana: {
      slug: "uttarayana",
      name: { en: "Uttarayana", hi: "उत्तरायण" },
      description: {
        en: "Vaishakha continues within Uttarayana, the Sun's auspicious northward journey.",
        hi: "वैशाख उत्तरायण के अंतर्गत जारी रहता है, सूर्य की शुभ उत्तर दिशा की यात्रा।",
      },
    },
    associatedZodiacSigns: [
      { englishName: "Aries", hindiName: "मेष", slug: "aries" },
      { englishName: "Taurus", hindiName: "वृषभ", slug: "taurus" },
    ],
    festivals: [
      {
        slug: "akshaya-tritiya",
        name: { en: "Akshaya Tritiya", hi: "अक्षय तृतीया" },
        approxTithi: "Vaishakha Shukla Tritiya",
        paksha: "shukla",
        significance: {
          en: "Regarded as one of the most auspicious days in the entire Hindu calendar — ideal for gold purchase, new business, and major life decisions, requiring no separate muhurat lookup.",
          hi: "संपूर्ण हिंदू पंचांग के सबसे शुभ दिनों में से एक माना जाता है — सोना खरीदने, नया व्यापार और बड़े जीवन निर्णयों के लिए आदर्श, जिसके लिए अलग मुहूर्त देखने की आवश्यकता नहीं।",
        },
        isMajor: true,
      },
      {
        slug: "buddha-purnima",
        name: { en: "Buddha Purnima", hi: "बुद्ध पूर्णिमा" },
        approxTithi: "Vaishakha Shukla Purnima",
        paksha: "shukla",
        significance: {
          en: "Commemorates the birth, enlightenment and passing of Gautama Buddha.",
          hi: "गौतम बुद्ध के जन्म, ज्ञान प्राप्ति और महापरिनिर्वाण की स्मृति में मनाया जाता है।",
        },
        isMajor: true,
      },
    ],
    vrats: [
      {
        slug: "mohini-ekadashi",
        name: { en: "Mohini Ekadashi", hi: "मोहिनी एकादशी" },
        type: "ekadashi",
        significance: {
          en: "The Shukla Paksha Ekadashi of Vaishakha, associated with Vishnu's Mohini form and freedom from illusion.",
          hi: "वैशाख की शुक्ल पक्ष एकादशी, विष्णु के मोहिनी रूप और भ्रम से मुक्ति से जुड़ी है।",
        },
        existingPageUrl: "/ekadashi/mohini-ekadashi",
      },
      {
        slug: "varuthini-ekadashi",
        name: { en: "Varuthini Ekadashi", hi: "वरूथिनी एकादशी" },
        type: "ekadashi",
        significance: {
          en: "The Krishna Paksha Ekadashi of Vaishakha, observed for protection and the removal of obstacles.",
          hi: "वैशाख की कृष्ण पक्ष एकादशी, सुरक्षा और बाधाओं की निवृत्ति हेतु मनाई जाती है।",
        },
        existingPageUrl: "/ekadashi/varuthini-ekadashi",
      },
    ],
    muhuratRelevance: {
      summary: {
        en: "Vaishakha, anchored by Akshaya Tritiya, is among the year's strongest months for gold buying, weddings, Griha Pravesh and vehicle purchase.",
        hi: "अक्षय तृतीया के कारण वैशाख वर्ष के सबसे शक्तिशाली महीनों में से एक है — सोना खरीदना, विवाह, गृह प्रवेश और वाहन क्रय हेतु।",
      },
      relevantMuhuratSlugs: ["gold-buying-muhurat", "marriage-muhurat", "vehicle-muhurat", "grah-pravesh-muhurat"],
    },
    panchangRelevance: {
      summary: {
        en: "Akshaya Tritiya (Vaishakha Shukla Tritiya) is one of the few Tithis considered universally auspicious without needing further Panchang refinement.",
        hi: "अक्षय तृतीया (वैशाख शुक्ल तृतीया) उन कुछ तिथियों में से एक है जिसे बिना अतिरिक्त पंचांग शोधन के सार्वभौमिक रूप से शुभ माना जाता है।",
      },
      relatedTithiSlugs: ["tritiya", "purnima"],
    },
    agriculturalImportance: {
      intro: {
        en: "Vaishakha marks the peak of the Rabi harvest in North India and is celebrated regionally through harvest festivals.",
        hi: "वैशाख उत्तर भारत में रबी फसल कटाई के चरम का प्रतीक है और क्षेत्रीय रूप से फसल उत्सवों के माध्यम से मनाया जाता है।",
      },
      items: [
        {
          title: { en: "Baisakhi Harvest Festival", hi: "बैसाखी फसल उत्सव" },
          description: { en: "Celebrated in Punjab and North India to mark the wheat harvest.", hi: "गेहूं की फसल के उपलक्ष्य में पंजाब और उत्तर भारत में मनाया जाता है।" },
          category: "agricultural",
          icon: "🌾",
        },
        {
          title: { en: "Post-Harvest Trade", hi: "फसल पश्चात व्यापार" },
          description: { en: "Akshaya Tritiya traditionally sees heavy gold and commodity trading tied to harvest income.", hi: "अक्षय तृतीया पर पारंपरिक रूप से फसल आय से जुड़ा भारी सोना और वस्तु व्यापार होता है।" },
          category: "financial",
          icon: "💰",
        },
      ],
    },
    lifestyleGuidance: {
      intro: {
        en: "As temperatures rise toward summer, Vaishakha calls for cooling foods and hydration alongside its festive, prosperity-focused energy.",
        hi: "गर्मी की ओर बढ़ते तापमान के साथ, वैशाख ठंडक देने वाले भोजन और जलयोजन की मांग करता है, साथ ही इसकी उत्सवी, समृद्धि-केंद्रित ऊर्जा भी रहती है।",
      },
      items: [
        {
          title: { en: "Cooling Diet", hi: "शीतल आहार" },
          description: { en: "Buttermilk, seasonal fruits and light meals are favored as heat increases.", hi: "बढ़ती गर्मी के साथ छाछ, मौसमी फल और हल्के भोजन को प्राथमिकता दी जाती है।" },
          category: "health",
          icon: "🥤",
        },
        {
          title: { en: "Charitable Giving", hi: "दान-पुण्य" },
          description: { en: "Akshaya Tritiya is considered especially fruitful for charity and donation.", hi: "अक्षय तृतीया दान-पुण्य के लिए विशेष रूप से फलदायी मानी जाती है।" },
          category: "spiritual",
          icon: "🤲",
        },
      ],
    },
    recommendedActivities: [
      {
        title: { en: "Gold & Property Purchase", hi: "सोना और संपत्ति क्रय" },
        description: { en: "Akshaya Tritiya is the year's most popular day for gold and major asset purchases.", hi: "अक्षय तृतीया सोना और बड़ी संपत्ति खरीद के लिए वर्ष का सबसे लोकप्रिय दिन है।" },
        category: "financial",
        icon: "💍",
      },
      {
        title: { en: "Launch New Ventures", hi: "नए उद्यम आरंभ करें" },
        description: { en: "Business launches and major commitments are widely timed to Akshaya Tritiya.", hi: "व्यापार शुभारंभ और बड़ी प्रतिबद्धताएं व्यापक रूप से अक्षय तृतीया पर निर्धारित की जाती हैं।" },
        category: "financial",
        icon: "🚀",
      },
    ],
    avoidedActivities: [
      {
        title: { en: "Strenuous Midday Activity", hi: "दोपहर में अत्यधिक श्रम" },
        description: { en: "Rising heat makes prolonged outdoor exertion during midday inadvisable.", hi: "बढ़ती गर्मी के कारण दोपहर में लंबे समय तक बाहरी श्रम करना उचित नहीं है।" },
        category: "health",
        icon: "🥵",
      },
    ],
    faqs: [
      {
        question: { en: "Why is Akshaya Tritiya considered so auspicious?", hi: "अक्षय तृतीया को इतना शुभ क्यों माना जाता है?" },
        answer: { en: "Akshaya means 'never diminishing' — this Tithi is believed to bring lasting prosperity to anything begun on it, requiring no further muhurat verification.", hi: "अक्षय का अर्थ है 'कभी न घटने वाला' — माना जाता है कि इस तिथि पर शुरू किया गया कोई भी कार्य स्थायी समृद्धि लाता है, इसके लिए अतिरिक्त मुहूर्त जांच की आवश्यकता नहीं।" },
      },
      {
        question: { en: "Is Vaishakha a good month for weddings?", hi: "क्या वैशाख विवाह के लिए शुभ महीना है?" },
        answer: { en: "Yes, Vaishakha is consistently one of the most favored wedding months, especially around Akshaya Tritiya.", hi: "हां, वैशाख विशेष रूप से अक्षय तृतीया के आसपास, सबसे पसंदीदा विवाह महीनों में से एक है।" },
      },
      {
        question: { en: "What is celebrated on Buddha Purnima?", hi: "बुद्ध पूर्णिमा पर क्या मनाया जाता है?" },
        answer: { en: "Buddha Purnima marks the birth, enlightenment and Mahaparinirvana of Gautama Buddha, all believed to have occurred on this Tithi.", hi: "बुद्ध पूर्णिमा गौतम बुद्ध के जन्म, ज्ञान प्राप्ति और महापरिनिर्वाण का प्रतीक है, माना जाता है कि ये सभी इसी तिथि पर हुए।" },
      },
      {
        question: { en: "Which nakshatra names Vaishakha?", hi: "वैशाख का नामकरण किस नक्षत्र पर हुआ है?" },
        answer: { en: "Vaishakha is named after the Vishakha nakshatra, near which its Purnima falls.", hi: "वैशाख का नाम विशाखा नक्षत्र पर रखा गया है, जिसके निकट इसकी पूर्णिमा पड़ती है।" },
      },
      {
        question: { en: "Do I need a separate muhurat on Akshaya Tritiya?", hi: "क्या अक्षय तृतीया पर अलग मुहूर्त की आवश्यकता है?" },
        answer: { en: "No — Akshaya Tritiya is traditionally considered a 'swayam siddha muhurat', auspicious throughout the day without further timing refinement.", hi: "नहीं — अक्षय तृतीया को पारंपरिक रूप से 'स्वयं सिद्ध मुहूर्त' माना जाता है, जो बिना किसी अतिरिक्त समय निर्धारण के पूरे दिन शुभ रहता है।" },
      },
    ],
    seo: {
      title: { en: "Vaishakha Month — Akshaya Tritiya & Hindu Calendar Significance", hi: "वैशाख मास — अक्षय तृतीया और हिंदू पंचांग महत्व" },
      description: {
        en: "Explore Vaishakha month: Akshaya Tritiya, Buddha Purnima, Vasanta Ritu, naming nakshatra Vishakha, and the year's most favorable muhurats for gold and weddings.",
        hi: "वैशाख मास के बारे में जानें: अक्षय तृतीया, बुद्ध पूर्णिमा, वसंत ऋतु, नामकरण नक्षत्र विशाखा, और सोना व विवाह के लिए वर्ष के सबसे शुभ मुहूर्त।",
      },
      keywords: {
        en: ["Vaishakha month", "Akshaya Tritiya", "Buddha Purnima", "Vasanta Ritu"],
        hi: ["वैशाख मास", "अक्षय तृतीया", "बुद्ध पूर्णिमा", "वसंत ऋतु"],
      },
    },
    crossLinks: {
      pakshaSlug: "paksha",
      previousMonthSlug: "chaitra",
      nextMonthSlug: "jyeshtha",
    },
  },
  jyeshtha: {
    basic: {
      slug: "jyeshtha",
      monthNumber: 3,
      sanskritName: "ज्येष्ठ",
      iast: "Jyeṣṭha",
      englishName: "Jyeshtha",
      hindiName: "ज्येष्ठ",
    },
    hero: {
      h1: { en: "Jyeshtha Maas", hi: "ज्येष्ठ मास" },
      subtitle: {
        en: "Peak summer heat, the rigorous Nirjala Ekadashi fast, and pre-monsoon preparation.",
        hi: "चरम ग्रीष्म ताप, कठोर निर्जला एकादशी व्रत, और मानसून-पूर्व तैयारी।",
      },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Grishma (Summer)", hi: "ग्रीष्म" }, icon: "☀️", linkSlug: "grishma", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Uttarayana", hi: "उत्तरायण" }, icon: "☀️", linkSlug: "uttarayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late May – Late June", hi: "मई अंत – जून अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Jyeshtha", hi: "ज्येष्ठा" }, icon: "⭐", linkSlug: "jyeshtha", linkType: "nakshatra" },
    ],
    introduction: [
      {
        en: "Jyeshtha, the third month, sits at the height of Grishma Ritu — the hottest stretch of the Indian year — and carries the name of the Jyeshtha nakshatra, meaning 'the eldest' or 'most senior'.",
        hi: "ज्येष्ठ, तीसरा महीना, ग्रीष्म ऋतु के चरम पर पड़ता है — भारतीय वर्ष का सबसे गर्म समय — और इसका नाम ज्येष्ठा नक्षत्र पर है, जिसका अर्थ है 'सबसे बड़ा' या 'सबसे वरिष्ठ'।",
      },
      {
        en: "Despite the heat, Jyeshtha holds deep spiritual weight through Nirjala Ekadashi, the most austere of all Ekadashi fasts, observed without even water.",
        hi: "गर्मी के बावजूद, ज्येष्ठ निर्जला एकादशी के माध्यम से गहन आध्यात्मिक महत्व रखता है, जो सभी एकादशी व्रतों में सबसे कठोर है, जल के बिना भी मनाया जाता है।",
      },
    ],
    namingNakshatra: {
      slug: "jyeshtha",
      name: { en: "Jyeshtha", hi: "ज्येष्ठा" },
      rationale: {
        en: "The month's Purnima falls near the Jyeshtha nakshatra, lending the month its name and its association with seniority and authority.",
        hi: "इस महीने की पूर्णिमा ज्येष्ठा नक्षत्र के निकट पड़ती है, जिससे महीने को इसका नाम और वरिष्ठता व अधिकार से जुड़ाव मिलता है।",
      },
    },
    ritu: {
      slug: "grishma",
      name: { en: "Grishma (Summer)", hi: "ग्रीष्म" },
      gregorianApprox: { en: "Mid-May to Mid-July", hi: "मध्य मई से मध्य जुलाई" },
      description: {
        en: "Grishma Ritu spans Jyeshtha and Ashadha, bringing the year's highest temperatures before the monsoon breaks.",
        hi: "ग्रीष्म ऋतु ज्येष्ठ और आषाढ़ तक फैली होती है, मानसून के आगमन से पहले वर्ष का सर्वाधिक तापमान लाती है।",
      },
    },
    ayana: {
      slug: "uttarayana",
      name: { en: "Uttarayana", hi: "उत्तरायण" },
      description: {
        en: "Jyeshtha remains within Uttarayana, just before the Sun's transition to Dakshinayana in Ashadha.",
        hi: "ज्येष्ठ उत्तरायण के अंतर्गत बना रहता है, आषाढ़ में सूर्य के दक्षिणायन में संक्रमण से ठीक पहले।",
      },
    },
    associatedZodiacSigns: [
      { englishName: "Taurus", hindiName: "वृषभ", slug: "taurus" },
      { englishName: "Gemini", hindiName: "मिथुन", slug: "gemini" },
    ],
    festivals: [
      {
        slug: "ganga-dussehra",
        name: { en: "Ganga Dussehra", hi: "गंगा दशहरा" },
        approxTithi: "Jyeshtha Shukla Dashami",
        paksha: "shukla",
        significance: {
          en: "Commemorates the descent of the Ganga to earth; bathing in sacred rivers is widely observed.",
          hi: "गंगा के पृथ्वी पर अवतरण की स्मृति में मनाया जाता है; पवित्र नदियों में स्नान व्यापक रूप से किया जाता है।",
        },
        isMajor: true,
      },
      {
        slug: "vat-savitri-vrat",
        name: { en: "Vat Savitri Vrat", hi: "वट सावित्री व्रत" },
        approxTithi: "Jyeshtha Amavasya",
        significance: {
          en: "Married women observe a fast under the banyan tree for the wellbeing and longevity of their spouse.",
          hi: "विवाहित महिलाएं अपने पति की दीर्घायु और कल्याण हेतु वट वृक्ष के नीचे व्रत रखती हैं।",
        },
        isMajor: true,
      },
    ],
    vrats: [
      {
        slug: "nirjala-ekadashi",
        name: { en: "Nirjala Ekadashi", hi: "निर्जला एकादशी" },
        type: "ekadashi",
        significance: {
          en: "The Shukla Paksha Ekadashi of Jyeshtha — observed without food or water, considered equal in merit to all 24 Ekadashis combined.",
          hi: "ज्येष्ठ की शुक्ल पक्ष एकादशी — बिना अन्न-जल के मनाई जाती है, इसे सभी 24 एकादशियों के समान पुण्यदायी माना जाता है।",
        },
        existingPageUrl: "/ekadashi/nirjala-ekadashi",
      },
      {
        slug: "apara-ekadashi",
        name: { en: "Apara Ekadashi", hi: "अपरा एकादशी" },
        type: "ekadashi",
        significance: {
          en: "The Krishna Paksha Ekadashi of Jyeshtha, observed for removing sin and gaining fame and prosperity.",
          hi: "ज्येष्ठ की कृष्ण पक्ष एकादशी, पाप निवारण तथा यश व समृद्धि प्राप्ति हेतु मनाई जाती है।",
        },
        existingPageUrl: "/ekadashi/apara-ekadashi",
      },
    ],
    muhuratRelevance: {
      summary: {
        en: "Jyeshtha remains outside Chaturmas and is still considered favorable for weddings and ventures, though heat often shifts ceremonies to early morning or evening muhurats.",
        hi: "ज्येष्ठ चातुर्मास से बाहर रहता है और अभी भी विवाह व कार्यों के लिए शुभ माना जाता है, हालांकि गर्मी के कारण समारोह अक्सर सुबह या शाम के मुहूर्त में किए जाते हैं।",
      },
      relevantMuhuratSlugs: ["marriage-muhurat", "vehicle-muhurat"],
    },
    panchangRelevance: {
      summary: {
        en: "Jyeshtha Shukla Dashami (Ganga Dussehra) and the month's Ekadashi are key Tithis shaping the spiritual calendar of this month.",
        hi: "ज्येष्ठ शुक्ल दशमी (गंगा दशहरा) और इस महीने की एकादशी इस महीने के आध्यात्मिक पंचांग को आकार देने वाली प्रमुख तिथियां हैं।",
      },
      relatedTithiSlugs: ["dashami", "ekadashi"],
    },
    agriculturalImportance: {
      intro: {
        en: "Jyeshtha is the season of land preparation — fields are readied and irrigation planned ahead of the monsoon sowing season.",
        hi: "ज्येष्ठ भूमि तैयारी की ऋतु है — मानसून बुवाई के मौसम से पहले खेतों को तैयार किया जाता है और सिंचाई की योजना बनाई जाती है।",
      },
      items: [
        {
          title: { en: "Pre-Monsoon Land Preparation", hi: "मानसून-पूर्व भूमि तैयारी" },
          description: { en: "Farmers plough and prepare fields in anticipation of Kharif sowing.", hi: "किसान खरीफ बुवाई की प्रत्याशा में खेत जोतते और तैयार करते हैं।" },
          category: "agricultural",
          icon: "🚜",
        },
        {
          title: { en: "Water Conservation Focus", hi: "जल संरक्षण पर ध्यान" },
          description: { en: "Wells and reservoirs are maintained ahead of the rains.", hi: "वर्षा से पहले कुओं और जलाशयों का रखरखाव किया जाता है।" },
          category: "agricultural",
          icon: "💧",
        },
      ],
    },
    lifestyleGuidance: {
      intro: {
        en: "Jyeshtha's intense heat calls for hydration, rest during peak afternoon hours, and the charitable distribution of water and shade.",
        hi: "ज्येष्ठ की तीव्र गर्मी जलयोजन, दोपहर के चरम घंटों में विश्राम, और जल व छाया के दान की मांग करती है।",
      },
      items: [
        {
          title: { en: "Jal Daan (Water Donation)", hi: "जल दान" },
          description: { en: "Setting up water stations for travelers is a traditional act of merit during Jyeshtha.", hi: "ज्येष्ठ में राहगीरों के लिए जल पौ-ब्यो (प्याऊ) लगाना एक पारंपरिक पुण्य कार्य है।" },
          category: "spiritual",
          icon: "🚰",
        },
        {
          title: { en: "Heat Safety", hi: "गर्मी से सुरक्षा" },
          description: { en: "Limiting outdoor exertion to early morning and evening is widely advised.", hi: "बाहरी श्रम को सुबह और शाम तक सीमित रखने की व्यापक सलाह दी जाती है।" },
          category: "health",
          icon: "🧴",
        },
      ],
    },
    recommendedActivities: [
      {
        title: { en: "Charitable Water Donation", hi: "जल दान-पुण्य" },
        description: { en: "Donating water and shade during peak summer is considered highly meritorious in Jyeshtha.", hi: "ज्येष्ठ में चरम गर्मी के दौरान जल और छाया का दान अत्यंत पुण्यदायी माना जाता है।" },
        category: "spiritual",
        icon: "🤲",
      },
      {
        title: { en: "Nirjala Ekadashi Fasting", hi: "निर्जला एकादशी व्रत" },
        description: { en: "Observed by devotees seeking the combined merit of all Ekadashi fasts in one day.", hi: "एक ही दिन में सभी एकादशी व्रतों का संयुक्त पुण्य चाहने वाले भक्तों द्वारा मनाया जाता है।" },
        category: "spiritual",
        icon: "🙏",
      },
    ],
    avoidedActivities: [
      {
        title: { en: "Midday Travel and Exertion", hi: "दोपहर यात्रा और श्रम" },
        description: { en: "Peak Grishma heat makes outdoor travel and physical exertion between noon and 4 PM inadvisable.", hi: "ग्रीष्म के चरम ताप के कारण दोपहर 12 से 4 बजे के बीच बाहरी यात्रा और शारीरिक श्रम उचित नहीं है।" },
        category: "travel",
        icon: "🥵",
      },
    ],
    faqs: [
      {
        question: { en: "Why is Nirjala Ekadashi considered the most difficult fast?", hi: "निर्जला एकादशी को सबसे कठिन व्रत क्यों माना जाता है?" },
        answer: { en: "It is observed entirely without food or water, even in peak summer heat, and is believed to carry the combined merit of all 24 annual Ekadashis.", hi: "यह चरम ग्रीष्म ताप में भी पूर्णतः बिना अन्न-जल के मनाया जाता है, और माना जाता है कि यह वर्ष की सभी 24 एकादशियों का संयुक्त पुण्य देता है।" },
      },
      {
        question: { en: "What is celebrated on Ganga Dussehra?", hi: "गंगा दशहरा पर क्या मनाया जाता है?" },
        answer: { en: "Ganga Dussehra marks the day the river Ganga is believed to have descended from heaven to earth.", hi: "गंगा दशहरा वह दिन है जब माना जाता है कि गंगा नदी स्वर्ग से पृथ्वी पर अवतरित हुई थी।" },
      },
      {
        question: { en: "Why is Jyeshtha named 'the eldest'?", hi: "ज्येष्ठ को 'सबसे बड़ा' नाम क्यों दिया गया?" },
        answer: { en: "The month is named after Jyeshtha nakshatra, whose name itself means 'eldest' or 'most senior' among stars.", hi: "इस महीने का नाम ज्येष्ठा नक्षत्र पर है, जिसका नाम स्वयं तारों में 'सबसे बड़ा' या 'सबसे वरिष्ठ' दर्शाता है।" },
      },
      {
        question: { en: "Is Jyeshtha favorable for weddings?", hi: "क्या ज्येष्ठ विवाह के लिए शुभ है?" },
        answer: { en: "Yes, Jyeshtha is still outside Chaturmas and remains a valid wedding month, though many prefer to schedule ceremonies around the heat.", hi: "हां, ज्येष्ठ अभी भी चातुर्मास से बाहर है और एक मान्य विवाह महीना है, हालांकि कई लोग गर्मी को ध्यान में रखकर समारोह निर्धारित करना पसंद करते हैं।" },
      },
      {
        question: { en: "What season does Jyeshtha fall in?", hi: "ज्येष्ठ किस ऋतु में आता है?" },
        answer: { en: "Jyeshtha falls in Grishma Ritu, the peak summer season of the Hindu calendar.", hi: "ज्येष्ठ ग्रीष्म ऋतु में आता है, जो हिंदू पंचांग की चरम ग्रीष्म ऋतु है।" },
      },
    ],
    seo: {
      title: { en: "Jyeshtha Month — Nirjala Ekadashi, Ganga Dussehra & Grishma Ritu", hi: "ज्येष्ठ मास — निर्जला एकादशी, गंगा दशहरा और ग्रीष्म ऋतु" },
      description: {
        en: "Explore Jyeshtha month: Nirjala Ekadashi, Ganga Dussehra, Vat Savitri Vrat, Grishma Ritu, naming nakshatra Jyeshtha, and summer muhurat guidance.",
        hi: "ज्येष्ठ मास के बारे में जानें: निर्जला एकादशी, गंगा दशहरा, वट सावित्री व्रत, ग्रीष्म ऋतु, नामकरण नक्षत्र ज्येष्ठा, और ग्रीष्म मुहूर्त मार्गदर्शन।",
      },
      keywords: {
        en: ["Jyeshtha month", "Nirjala Ekadashi", "Ganga Dussehra", "Grishma Ritu"],
        hi: ["ज्येष्ठ मास", "निर्जला एकादशी", "गंगा दशहरा", "ग्रीष्म ऋतु"],
      },
    },
    crossLinks: {
      pakshaSlug: "paksha",
      previousMonthSlug: "vaishakha",
      nextMonthSlug: "ashadha",
    },
  },
  ashadha: {
    basic: { slug: "ashadha", monthNumber: 4, sanskritName: "आषाढ़", iast: "Āṣāḍha", englishName: "Ashadha", hindiName: "आषाढ़" },
    hero: {
      h1: { en: "Ashadha Maas", hi: "आषाढ़ मास" },
      subtitle: { en: "Monsoon begins, Chaturmas opens with Devshayani Ekadashi, and Guru Purnima is celebrated.", hi: "मानसून आरंभ, देवशयनी एकादशी से चातुर्मास का उद्घाटन, और गुरु पूर्णिमा का उत्सव।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Grishma / Varsha onset", hi: "ग्रीष्म / वर्षा आगमन" }, icon: "🌧️", linkSlug: "grishma", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Uttarayana (transitions to Dakshinayana)", hi: "उत्तरायण (दक्षिणायन में संक्रमण)" }, icon: "🔄", linkSlug: "uttarayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late June – Late July", hi: "जून अंत – जुलाई अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Purva Ashadha", hi: "पूर्वाषाढ़ा" }, icon: "⭐", linkSlug: "purva-ashadha", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Ashadha is a month of transition — the Sun crosses into Karka Rashi (Cancer) around mid-Ashadha, and the Indian monsoon typically arrives, bringing relief from Grishma heat.", hi: "आषाढ़ एक संक्रमण का महीना है — सूर्य आषाढ़ के मध्य में कर्क राशि में प्रवेश करता है, और भारतीय मानसून आमतौर पर आता है, जो ग्रीष्म की गर्मी से राहत देता है।" },
      { en: "Most significantly, Ashadha contains Devshayani Ekadashi — the day Lord Vishnu is said to enter yogic sleep — which marks the start of Chaturmas, a four-month period of spiritual intensification during which weddings and major auspicious ceremonies pause.", hi: "सबसे महत्वपूर्ण बात, आषाढ़ में देवशयनी एकादशी होती है — वह दिन जब भगवान विष्णु योग निद्रा में जाते हैं — जो चातुर्मास की शुरुआत का प्रतीक है, चार महीनों का आध्यात्मिक गहनता का काल जिसमें विवाह और बड़े शुभ समारोह रुक जाते हैं।" },
    ],
    namingNakshatra: {
      slug: "purva-ashadha",
      name: { en: "Purva Ashadha", hi: "पूर्वाषाढ़ा" },
      rationale: { en: "Ashadha's Purnima falls near the Purva Ashadha nakshatra, giving the month its name and meaning 'the former invincible one'.", hi: "आषाढ़ की पूर्णिमा पूर्वाषाढ़ा नक्षत्र के निकट पड़ती है, जिससे महीने को यह नाम मिला, जिसका अर्थ है 'पूर्व अजेय'।" },
    },
    ritu: {
      slug: "grishma",
      name: { en: "Grishma (Summer) / Varsha onset", hi: "ग्रीष्म / वर्षा प्रारंभ" },
      gregorianApprox: { en: "Mid-May to Mid-July", hi: "मध्य मई से मध्य जुलाई" },
      description: { en: "Ashadha closes Grishma and opens Varsha Ritu as the monsoon arrives, making it a month of climatic and spiritual transition.", hi: "आषाढ़ ग्रीष्म को समाप्त करता है और मानसून के आगमन के साथ वर्षा ऋतु को खोलता है, जिससे यह जलवायु और आध्यात्मिक संक्रमण का महीना बनता है।" },
    },
    ayana: {
      slug: "uttarayana",
      name: { en: "Uttarayana", hi: "उत्तरायण" },
      description: { en: "Ashadha is primarily within Uttarayana, though Karka Sankranti near its midpoint marks the Sun's transition into Dakshinayana.", hi: "आषाढ़ मुख्यतः उत्तरायण में है, हालांकि इसके मध्य में कर्क संक्रांति सूर्य के दक्षिणायन में संक्रमण का प्रतीक है।" },
    },
    associatedZodiacSigns: [
      { englishName: "Gemini", hindiName: "मिथुन", slug: "gemini" },
      { englishName: "Cancer", hindiName: "कर्क", slug: "cancer" },
    ],
    festivals: [
      { slug: "rath-yatra", name: { en: "Rath Yatra", hi: "रथ यात्रा" }, approxTithi: "Ashadha Shukla Dwitiya", paksha: "shukla", significance: { en: "Lord Jagannath's chariot procession at Puri — one of India's largest and most sacred festivals.", hi: "पुरी में भगवान जगन्नाथ की रथ यात्रा — भारत के सबसे बड़े और पवित्र उत्सवों में से एक।" }, isMajor: true },
      { slug: "guru-purnima", name: { en: "Guru Purnima", hi: "गुरु पूर्णिमा" }, approxTithi: "Ashadha Shukla Purnima", paksha: "shukla", significance: { en: "Dedicated to honoring spiritual teachers; observed by disciples across all traditions.", hi: "आध्यात्मिक गुरुओं के सम्मान हेतु समर्पित; सभी परंपराओं के शिष्यों द्वारा मनाया जाता है।" }, isMajor: true },
    ],
    vrats: [
      { slug: "devshayani-ekadashi", name: { en: "Devshayani Ekadashi", hi: "देवशयनी एकादशी" }, type: "ekadashi", significance: { en: "Marks the start of Chaturmas — Vishnu's four-month cosmic sleep. Weddings and major ceremonies do not occur from this day.", hi: "चातुर्मास की शुरुआत का प्रतीक — विष्णु की चार महीने की योग निद्रा। इस दिन से विवाह और बड़े समारोह नहीं होते।" }, existingPageUrl: "/ekadashi/devshayani-ekadashi" },
      { slug: "yogini-ekadashi", name: { en: "Yogini Ekadashi", hi: "योगिनी एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi of Ashadha, observed for healing and relief from suffering.", hi: "आषाढ़ की कृष्ण पक्ष एकादशी, उपचार और कष्टों से मुक्ति हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/yogini-ekadashi" },
    ],
    muhuratRelevance: {
      summary: { en: "Ashadha is split: before Devshayani Ekadashi, marriage and Griha Pravesh muhurats remain valid. After it, Chaturmas begins and major ceremonies pause until Kartika.", hi: "आषाढ़ दो भागों में बंटा है: देवशयनी एकादशी से पहले विवाह और गृह प्रवेश मुहूर्त वैध रहते हैं। उसके बाद चातुर्मास आरंभ होता है और कार्तिक तक बड़े समारोह रुक जाते हैं।" },
      relevantMuhuratSlugs: ["marriage-muhurat", "grah-pravesh-muhurat"],
    },
    panchangRelevance: {
      summary: { en: "Devshayani Ekadashi and Guru Purnima are the defining Tithis of Ashadha, with Karka Sankranti marking a key solar-calendar transition.", hi: "देवशयनी एकादशी और गुरु पूर्णिमा आषाढ़ की परिभाषित तिथियां हैं, कर्क संक्रांति एक प्रमुख सौर-पंचांग संक्रमण का प्रतीक है।" },
      relatedTithiSlugs: ["ekadashi", "purnima"],
    },
    agriculturalImportance: {
      intro: { en: "Ashadha coincides with the onset of the Indian summer monsoon — the most critical agricultural event of the year, triggering Kharif sowing.", hi: "आषाढ़ भारतीय ग्रीष्मकालीन मानसून के आगमन के साथ मेल खाता है — वर्ष की सबसे महत्वपूर्ण कृषि घटना, जो खरीफ बुवाई को प्रेरित करती है।" },
      items: [
        { title: { en: "Kharif Sowing Begins", hi: "खरीफ बुवाई आरंभ" }, description: { en: "Rice, maize, cotton and millets are sown as the first rains arrive.", hi: "पहली वर्षा के साथ चावल, मक्का, कपास और बाजरे की बुवाई होती है।" }, category: "agricultural", icon: "🌱" },
        { title: { en: "Monsoon Irrigation", hi: "मानसूनी सिंचाई" }, description: { en: "Tanks and reservoirs fill, reducing dependence on artificial irrigation.", hi: "तालाब और जलाशय भरते हैं, कृत्रिम सिंचाई पर निर्भरता कम होती है।" }, category: "agricultural", icon: "🌧️" },
      ],
    },
    lifestyleGuidance: {
      intro: { en: "Chaturmas begins in Ashadha, traditionally a time of simplicity, reduced travel, and increased spiritual practice.", hi: "आषाढ़ में चातुर्मास शुरू होता है, जो पारंपरिक रूप से सरलता, कम यात्रा और बढ़ी हुई आध्यात्मिक साधना का समय है।" },
      items: [
        { title: { en: "Reduce Long-Distance Travel", hi: "लंबी यात्राएं कम करें" }, description: { en: "Chaturmas was traditionally when wandering monks settled in one place, a principle that still applies to unnecessary travel.", hi: "चातुर्मास पारंपरिक रूप से तब होता था जब भ्रमणशील साधु एक स्थान पर रुकते थे, एक सिद्धांत जो अनावश्यक यात्राओं पर अभी भी लागू होता है।" }, category: "travel", icon: "🏠" },
        { title: { en: "Satvik Diet", hi: "सात्विक आहार" }, description: { en: "Many observers begin a simpler, more vegetarian diet from Devshayani Ekadashi through the Chaturmas period.", hi: "कई श्रद्धालु देवशयनी एकादशी से चातुर्मास के दौरान सरल, अधिक शाकाहारी आहार अपनाते हैं।" }, category: "health", icon: "🥗" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Guru Reverence", hi: "गुरु वंदन" }, description: { en: "Guru Purnima makes Ashadha the ideal time to express gratitude to teachers and mentors.", hi: "गुरु पूर्णिमा आषाढ़ को गुरुओं और मार्गदर्शकों के प्रति कृतज्ञता व्यक्त करने का आदर्श समय बनाती है।" }, category: "spiritual", icon: "🙏" },
      { title: { en: "Spiritual Study", hi: "शास्त्र अध्ययन" }, description: { en: "The Chaturmas period is traditionally used for scriptural study and spiritual deepening.", hi: "चातुर्मास काल पारंपरिक रूप से शास्त्र अध्ययन और आध्यात्मिक गहराई के लिए उपयोग किया जाता है।" }, category: "spiritual", icon: "📚" },
    ],
    avoidedActivities: [
      { title: { en: "Weddings & Major Ceremonies After Devshayani", hi: "देवशयनी के बाद विवाह और बड़े समारोह" }, description: { en: "Chaturmas convention — marriages, Griha Pravesh and major auspicious events are traditionally postponed until Devutthana Ekadashi in Kartika.", hi: "चातुर्मास प्रथा — विवाह, गृह प्रवेश और बड़े शुभ कार्य परंपरागत रूप से कार्तिक की देवोत्थान एकादशी तक स्थगित किए जाते हैं।" }, category: "social", icon: "⏸️" },
    ],
    faqs: [
      { question: { en: "What is Chaturmas and when does it begin?", hi: "चातुर्मास क्या है और यह कब शुरू होता है?" }, answer: { en: "Chaturmas is a four-month sacred period beginning on Ashadha Shukla Ekadashi (Devshayani) and ending on Kartika Shukla Ekadashi (Devutthana).", hi: "चातुर्मास एक चार महीने की पवित्र अवधि है जो आषाढ़ शुक्ल एकादशी (देवशयनी) पर शुरू होती है और कार्तिक शुक्ल एकादशी (देवोत्थान) पर समाप्त होती है।" } },
      { question: { en: "Why are weddings avoided during Chaturmas?", hi: "चातुर्मास में विवाह क्यों वर्जित हैं?" }, answer: { en: "Lord Vishnu is considered to be in yogic sleep during Chaturmas, and major auspicious ceremonies requiring His divine presence are traditionally deferred.", hi: "चातुर्मास के दौरान भगवान विष्णु योग निद्रा में माने जाते हैं, और उनकी दिव्य उपस्थिति की आवश्यकता वाले बड़े शुभ समारोह पारंपरिक रूप से स्थगित किए जाते हैं।" } },
      { question: { en: "What is the significance of Guru Purnima?", hi: "गुरु पूर्णिमा का क्या महत्व है?" }, answer: { en: "Guru Purnima is observed on Ashadha's full moon to honour teachers. It is associated with Maharishi Veda Vyasa who compiled the Vedas.", hi: "गुरु पूर्णिमा आषाढ़ की पूर्णिमा को गुरुओं के सम्मान हेतु मनाई जाती है। यह महर्षि वेद व्यास से जुड़ी है जिन्होंने वेदों का संकलन किया।" } },
      { question: { en: "Is Ashadha good for any muhurats?", hi: "क्या आषाढ़ किसी मुहूर्त के लिए शुभ है?" }, answer: { en: "Yes — muhurats before Devshayani Ekadashi are fully valid. After it, most major ceremonies shift to Kartika.", hi: "हां — देवशयनी एकादशी से पहले के मुहूर्त पूर्णतः वैध हैं। उसके बाद, अधिकांश बड़े समारोह कार्तिक में स्थानांतरित हो जाते हैं।" } },
      { question: { en: "Which nakshatra names Ashadha?", hi: "आषाढ़ का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Ashadha takes its name from the Purva Ashadha nakshatra, near which the month's full moon traditionally falls.", hi: "आषाढ़ अपना नाम पूर्वाषाढ़ा नक्षत्र से लेता है, जिसके निकट इस महीने की पूर्णिमा पारंपरिक रूप से पड़ती है।" } },
    ],
    seo: { title: { en: "Ashadha Month — Devshayani Ekadashi, Guru Purnima & Chaturmas", hi: "आषाढ़ मास — देवशयनी एकादशी, गुरु पूर्णिमा और चातुर्मास" }, description: { en: "Explore Ashadha month: Devshayani Ekadashi, Rath Yatra, Guru Purnima, Chaturmas rules, naming nakshatra Purva Ashadha, and monsoon significance.", hi: "आषाढ़ मास के बारे में जानें: देवशयनी एकादशी, रथ यात्रा, गुरु पूर्णिमा, चातुर्मास नियम, नामकरण नक्षत्र पूर्वाषाढ़ा, और मानसून महत्व।" }, keywords: { en: ["Ashadha month", "Devshayani Ekadashi", "Guru Purnima", "Chaturmas", "Rath Yatra"], hi: ["आषाढ़ मास", "देवशयनी एकादशी", "गुरु पूर्णिमा", "चातुर्मास"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "jyeshtha", nextMonthSlug: "shravana" },
  },
  shravana: {
    basic: { slug: "shravana", monthNumber: 5, sanskritName: "श्रावण", iast: "Śrāvaṇa", englishName: "Shravana", hindiName: "श्रावण" },
    hero: {
      h1: { en: "Shravana Maas", hi: "श्रावण मास" },
      subtitle: { en: "The holiest month of the year for Shiva devotees — Sawan Mondays, Kavad Yatra, and Raksha Bandhan.", hi: "शिव भक्तों के लिए वर्ष का सबसे पवित्र महीना — सावन सोमवार, कावड़ यात्रा और रक्षाबंधन।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Varsha (Monsoon)", hi: "वर्षा" }, icon: "🌧️", linkSlug: "varsha", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Dakshinayana", hi: "दक्षिणायन" }, icon: "🌒", linkSlug: "dakshinayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late July – Late August", hi: "जुलाई अंत – अगस्त अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Shravana", hi: "श्रवण" }, icon: "⭐", linkSlug: "shravana", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Shravana is one of the most revered months in Hinduism, deeply associated with Lord Shiva. The month's Mondays (Sawan Somvar) are especially sacred, drawing millions of Shiva devotees to temples and sacred rivers across India.", hi: "श्रावण हिंदू धर्म में सबसे अधिक पूजनीय महीनों में से एक है, जो भगवान शिव से गहराई से जुड़ा है। इस महीने के सोमवार (सावन सोमवार) विशेष रूप से पवित्र हैं, जो पूरे भारत में मंदिरों और पवित्र नदियों पर लाखों शिव भक्तों को आकर्षित करते हैं।" },
      { en: "The month is named after the Shravana nakshatra and falls squarely within Chaturmas and the Varsha Ritu, a season of intense monsoon rains and spiritual introspection.", hi: "इस महीने का नाम श्रवण नक्षत्र पर रखा गया है और यह चातुर्मास और वर्षा ऋतु के अंतर्गत पड़ता है, जो तीव्र मानसून वर्षा और आध्यात्मिक आत्मनिरीक्षण का मौसम है।" },
    ],
    namingNakshatra: { slug: "shravana", name: { en: "Shravana", hi: "श्रवण" }, rationale: { en: "The full moon of Shravana falls near the Shravana nakshatra, whose name means 'listening' — associated with learning, hearing scriptures and Lord Vishnu.", hi: "श्रावण की पूर्णिमा श्रवण नक्षत्र के निकट पड़ती है, जिसका नाम 'सुनना' है — शास्त्र श्रवण और भगवान विष्णु से जुड़ा।" } },
    ritu: { slug: "varsha", name: { en: "Varsha (Monsoon)", hi: "वर्षा" }, gregorianApprox: { en: "Mid-July to Mid-September", hi: "मध्य जुलाई से मध्य सितंबर" }, description: { en: "Varsha Ritu spans Shravana and Bhadrapada, the peak monsoon months of the Hindu year, bringing nourishing rains and deep green landscapes.", hi: "वर्षा ऋतु श्रावण और भाद्रपद तक फैली होती है, हिंदू वर्ष के चरम मानसूनी महीने, जो पोषणकारी वर्षा और गहरी हरी-भरी परिदृश्य लाते हैं।" } },
    ayana: { slug: "dakshinayana", name: { en: "Dakshinayana", hi: "दक्षिणायन" }, description: { en: "Shravana falls within Dakshinayana, the Sun's southward movement, a period associated with the night of the gods and increased inner focus.", hi: "श्रावण दक्षिणायन के अंतर्गत पड़ता है, सूर्य की दक्षिण दिशा की गति, एक काल जो देवताओं की रात्रि और बढ़े हुए आंतरिक ध्यान से जुड़ा है।" } },
    associatedZodiacSigns: [
      { englishName: "Cancer", hindiName: "कर्क", slug: "cancer" },
      { englishName: "Leo", hindiName: "सिंह", slug: "leo" },
    ],
    festivals: [
      { slug: "raksha-bandhan", name: { en: "Raksha Bandhan", hi: "रक्षाबंधन" }, approxTithi: "Shravana Shukla Purnima", paksha: "shukla", significance: { en: "Sisters tie a sacred thread (rakhi) on their brothers' wrists, celebrating the bond of sibling protection.", hi: "बहनें अपने भाइयों की कलाई पर पवित्र धागा (राखी) बांधती हैं, भाई-बहन के सुरक्षा के बंधन का उत्सव।" }, isMajor: true },
      { slug: "hariyali-teej", name: { en: "Hariyali Teej", hi: "हरियाली तीज" }, approxTithi: "Shravana Shukla Tritiya", paksha: "shukla", significance: { en: "Celebrated by women for marital bliss and the reunion of Shiva and Parvati, marked by green attire and swings.", hi: "महिलाओं द्वारा वैवाहिक सुख और शिव-पार्वती के मिलन हेतु मनाई जाती है, हरे वस्त्र और झूले के साथ।" }, isMajor: false },
      { slug: "nag-panchami", name: { en: "Nag Panchami", hi: "नाग पंचमी" }, approxTithi: "Shravana Shukla Panchami", paksha: "shukla", significance: { en: "Serpent deities are worshipped on this day for protection from snake-related harm and ancestral blessings.", hi: "इस दिन नाग देवताओं की पूजा सर्पदंश से सुरक्षा और पितृ आशीर्वाद हेतु की जाती है।" }, isMajor: false },
    ],
    vrats: [
      { slug: "putrada-shravana-ekadashi", name: { en: "Putrada Ekadashi (Shravana)", hi: "पुत्रदा एकादशी (श्रावण)" }, type: "ekadashi", significance: { en: "The Shukla Paksha Ekadashi of Shravana, associated with blessings for progeny and fulfillment of heartfelt wishes.", hi: "श्रावण की शुक्ल पक्ष एकादशी, संतान के आशीर्वाद और हार्दिक इच्छाओं की पूर्ति से जुड़ी है।" }, existingPageUrl: "/ekadashi/putrada-shravana-ekadashi" },
      { slug: "kamika-ekadashi", name: { en: "Kamika Ekadashi", hi: "कामिका एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi of Shravana, observed for the fulfillment of righteous desires.", hi: "श्रावण की कृष्ण पक्ष एकादशी, धर्मसम्मत इच्छाओं की पूर्ति हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/kamika-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "Shravana falls within Chaturmas — weddings and major ceremonies remain deferred. Spiritual practices, temple visits and donations are especially meritorious.", hi: "श्रावण चातुर्मास में पड़ता है — विवाह और बड़े समारोह स्थगित रहते हैं। आध्यात्मिक साधना, मंदिर दर्शन और दान विशेष रूप से पुण्यदायी हैं।" }, relevantMuhuratSlugs: [] },
    panchangRelevance: { summary: { en: "Shravana Mondays, Shukla Tritiya (Teej) and Purnima (Raksha Bandhan) are the most Panchang-significant days of this month.", hi: "श्रावण सोमवार, शुक्ल तृतीया (तीज) और पूर्णिमा (रक्षाबंधन) इस महीने के सबसे पंचांग-महत्वपूर्ण दिन हैं।" }, relatedTithiSlugs: ["purnima", "tritiya"] },
    agriculturalImportance: { intro: { en: "Shravana is the heart of the Kharif growing season — crops like rice, cotton and pulses grow vigorously under peak monsoon rains.", hi: "श्रावण खरीफ उगाने के मौसम का केंद्र है — चावल, कपास और दलहन जैसी फसलें चरम मानसून वर्षा में जोरदार वृद्धि करती हैं।" },
      items: [
        { title: { en: "Kharif Crop Growth", hi: "खरीफ फसल की वृद्धि" }, description: { en: "Paddy fields and other monsoon crops are at their most active growth phase.", hi: "धान के खेत और अन्य मानसूनी फसलें अपने सक्रिय वृद्धि चरण में होती हैं।" }, category: "agricultural", icon: "🌾" },
        { title: { en: "Soil Nourishment", hi: "मृदा पोषण" }, description: { en: "Monsoon rains replenish soil nutrients and recharge groundwater reserves.", hi: "मानसूनी वर्षा मृदा पोषक तत्वों की पूर्ति करती है और भूजल भंडार को रिचार्ज करती है।" }, category: "agricultural", icon: "💧" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Shravana calls for satvik living, Shiva devotion, and care around monsoon-specific dietary and health concerns.", hi: "श्रावण सात्विक जीवनशैली, शिव भक्ति और मानसून-विशिष्ट आहार एवं स्वास्थ्य संबंधी सावधानी की मांग करता है।" },
      items: [
        { title: { en: "Avoid Non-Vegetarian Food", hi: "मांसाहारी भोजन से परहेज" }, description: { en: "Most devout observers maintain a vegetarian diet through the Sawan month as a mark of Shiva devotion.", hi: "अधिकांश श्रद्धालु शिव भक्ति के प्रतीक के रूप में सावन महीने में शाकाहारी आहार बनाए रखते हैं।" }, category: "spiritual", icon: "🥗" },
        { title: { en: "Monday Shiva Worship", hi: "सोमवार शिव पूजन" }, description: { en: "Visiting a Shiva temple and observing a partial or full Monday fast is widely practised through Shravana.", hi: "शिव मंदिर जाना और श्रावण में सोमवार का आंशिक या पूर्ण व्रत रखना व्यापक रूप से प्रचलित है।" }, category: "spiritual", icon: "🕉️" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Shiva Worship & Jal Abhishek", hi: "शिव पूजन और जल अभिषेक" }, description: { en: "Daily Jal Abhishek of Shiva Lingam during Sawan is considered deeply meritorious.", hi: "सावन में शिवलिंग का दैनिक जल अभिषेक अत्यंत पुण्यदायी माना जाता है।" }, category: "spiritual", icon: "🌊" },
      { title: { en: "Scripture Reading", hi: "शास्त्र पाठ" }, description: { en: "Chaturmas is traditionally a period of intensified scripture study, especially effective in Shravana.", hi: "चातुर्मास पारंपरिक रूप से शास्त्र अध्ययन की गहन अवधि है, जो श्रावण में विशेष रूप से फलदायी है।" }, category: "spiritual", icon: "📖" },
    ],
    avoidedActivities: [
      { title: { en: "Weddings & Major Ceremonies", hi: "विवाह और बड़े समारोह" }, description: { en: "Chaturmas convention continues — all major ceremonies remain deferred.", hi: "चातुर्मास प्रथा जारी रहती है — सभी बड़े समारोह स्थगित रहते हैं।" }, category: "social", icon: "⏸️" },
      { title: { en: "Raw or Contaminated Water", hi: "कच्चा या दूषित जल" }, description: { en: "Monsoon-season waterborne illnesses make drinking only clean, boiled water especially important.", hi: "मानसूनी जल-जनित बीमारियां केवल स्वच्छ, उबला पानी पीने को विशेष रूप से महत्वपूर्ण बनाती हैं।" }, category: "health", icon: "🚰" },
    ],
    faqs: [
      { question: { en: "Why is Shravana the most sacred month for Shiva?", hi: "शिव के लिए श्रावण सबसे पवित्र महीना क्यों है?" }, answer: { en: "Multiple scriptural sources describe Shravana as the month when Shiva performed cosmic acts including the absorption of poison during Samudra Manthan. Mondays in Shravana are especially sacred.", hi: "कई शास्त्रीय स्रोत श्रावण को वह महीना बताते हैं जब शिव ने समुद्र मंथन के दौरान विष के अवशोषण सहित ब्रह्मांडीय कार्य किए। श्रावण के सोमवार विशेष रूप से पवित्र हैं।" } },
      { question: { en: "What is the tradition of Sawan Mondays?", hi: "सावन सोमवार की परंपरा क्या है?" }, answer: { en: "Devotees observe fasting and visit Shiva temples each Monday of Sawan, offering water, milk and Belpatra leaves to the Shiva Lingam.", hi: "भक्त सावन के प्रत्येक सोमवार व्रत रखते हैं और शिव मंदिर जाते हैं, शिवलिंग पर जल, दूध और बेलपत्र चढ़ाते हैं।" } },
      { question: { en: "What is Raksha Bandhan and when does it fall?", hi: "रक्षाबंधन क्या है और यह कब पड़ता है?" }, answer: { en: "Raksha Bandhan falls on Shravana Purnima — sisters tie a sacred thread (rakhi) on their brothers' wrists as a symbol of love and protection.", hi: "रक्षाबंधन श्रावण पूर्णिमा पर पड़ता है — बहनें अपने भाइयों की कलाई पर प्रेम और सुरक्षा के प्रतीक के रूप में पवित्र धागा (राखी) बांधती हैं।" } },
      { question: { en: "Should I avoid non-veg food in Shravana?", hi: "क्या श्रावण में मांसाहारी भोजन से परहेज करना चाहिए?" }, answer: { en: "Many devotees observe a vegetarian diet through Shravana as a mark of respect for Shiva, though it is ultimately a personal observance.", hi: "कई भक्त शिव के प्रति सम्मान के प्रतीक के रूप में श्रावण में शाकाहारी आहार अपनाते हैं, हालांकि यह अंततः व्यक्तिगत आचरण है।" } },
      { question: { en: "Which nakshatra names Shravana?", hi: "श्रावण का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Shravana is named after the Shravana nakshatra, whose name means 'listening' and which is associated with Lord Vishnu.", hi: "श्रावण का नाम श्रवण नक्षत्र पर रखा गया है, जिसका नाम 'सुनना' है और जो भगवान विष्णु से जुड़ा है।" } },
    ],
    seo: {
      title: { en: "Shravana Month — Sawan, Shiva, Raksha Bandhan & Varsha Ritu", hi: "श्रावण मास — सावन, शिव, रक्षाबंधन और वर्षा ऋतु" },
      description: { en: "Explore Shravana month: Sawan Somvar fasts, Raksha Bandhan, Hariyali Teej, Varsha Ritu, naming nakshatra Shravana, and Chaturmas guidance.", hi: "श्रावण मास के बारे में जानें: सावन सोमवार व्रत, रक्षाबंधन, हरियाली तीज, वर्षा ऋतु, नामकरण नक्षत्र श्रवण, और चातुर्मास मार्गदर्शन।" },
      keywords: { en: ["Shravana month", "Sawan month", "Raksha Bandhan", "Varsha Ritu", "Shiva Sawan"], hi: ["श्रावण मास", "सावन", "रक्षाबंधन", "वर्षा ऋतु"] },
    },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "ashadha", nextMonthSlug: "bhadrapada" },
  },
  bhadrapada: {
    basic: { slug: "bhadrapada", monthNumber: 6, sanskritName: "भाद्रपद", iast: "Bhādrapada", englishName: "Bhadrapada", hindiName: "भाद्रपद" },
    hero: {
      h1: { en: "Bhadrapada Maas", hi: "भाद्रपद मास" },
      subtitle: { en: "Krishna Janmashtami and Ganesh Chaturthi — the grandest festival month of the monsoon season.", hi: "कृष्ण जन्माष्टमी और गणेश चतुर्थी — मानसून मौसम का सबसे भव्य उत्सव महीना।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Varsha (Monsoon)", hi: "वर्षा" }, icon: "🌧️", linkSlug: "varsha", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Dakshinayana", hi: "दक्षिणायन" }, icon: "🌒", linkSlug: "dakshinayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late August – Late September", hi: "अगस्त अंत – सितंबर अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Uttara Bhadrapada", hi: "उत्तर भाद्रपदा" }, icon: "⭐", linkSlug: "uttara-bhadrapada", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Bhadrapada is the sixth month and possibly the most festival-dense of the Hindu year, containing both Krishna Janmashtami — the birth of Lord Krishna — and Ganesh Chaturthi, celebrated with 10-day grandeur across India.", hi: "भाद्रपद छठा महीना है और संभवतः हिंदू वर्ष का सबसे उत्सव-समृद्ध महीना है, जिसमें कृष्ण जन्माष्टमी — भगवान कृष्ण का जन्म — और गणेश चतुर्थी, पूरे भारत में 10 दिनों की भव्यता के साथ मनाई जाती है।" },
      { en: "The month falls within Chaturmas and Varsha Ritu, and near its end, Pitru Paksha begins — the 16-day period of ancestor remembrance that flows into Ashwin.", hi: "यह महीना चातुर्मास और वर्षा ऋतु में पड़ता है, और इसके अंत में पितृ पक्ष शुरू होता है — आश्विन में प्रवाहित होने वाली पूर्वजों की स्मृति की 16-दिवसीय अवधि।" },
    ],
    namingNakshatra: { slug: "uttara-bhadrapada", name: { en: "Uttara Bhadrapada", hi: "उत्तर भाद्रपदा" }, rationale: { en: "Bhadrapada's Purnima falls near the Uttara Bhadrapada nakshatra, lending the month its name meaning 'auspicious feet'.", hi: "भाद्रपद की पूर्णिमा उत्तर भाद्रपदा नक्षत्र के निकट पड़ती है, जिससे महीने को 'शुभ चरण' का अर्थ देने वाला यह नाम मिला।" } },
    ritu: { slug: "varsha", name: { en: "Varsha (Monsoon)", hi: "वर्षा" }, gregorianApprox: { en: "Mid-July to Mid-September", hi: "मध्य जुलाई से मध्य सितंबर" }, description: { en: "Bhadrapada falls in the second half of Varsha Ritu — rains are heavy, and Kharif crops are maturing.", hi: "भाद्रपद वर्षा ऋतु के दूसरे भाग में पड़ता है — वर्षा भारी होती है और खरीफ फसलें परिपक्व हो रही होती हैं।" } },
    ayana: { slug: "dakshinayana", name: { en: "Dakshinayana", hi: "दक्षिणायन" }, description: { en: "Bhadrapada continues within Dakshinayana, reinforcing the season's quality of inner reflection and spiritual intensity.", hi: "भाद्रपद दक्षिणायन में जारी रहता है, आंतरिक चिंतन और आध्यात्मिक गहनता की मौसमी गुणवत्ता को सुदृढ़ करता है।" } },
    associatedZodiacSigns: [
      { englishName: "Leo", hindiName: "सिंह", slug: "leo" },
      { englishName: "Virgo", hindiName: "कन्या", slug: "virgo" },
    ],
    festivals: [
      { slug: "krishna-janmashtami", name: { en: "Krishna Janmashtami", hi: "कृष्ण जन्माष्टमी" }, approxTithi: "Bhadrapada Krishna Ashtami", paksha: "krishna", significance: { en: "Celebrates the birth of Lord Krishna at midnight — observed through fasting, devotional singing and Dahi Handi rituals.", hi: "भगवान कृष्ण के आधी रात के जन्म का उत्सव — व्रत, भजन और दही हांडी रीति के साथ मनाया जाता है।" }, isMajor: true },
      { slug: "ganesh-chaturthi", name: { en: "Ganesh Chaturthi", hi: "गणेश चतुर्थी" }, approxTithi: "Bhadrapada Shukla Chaturthi", paksha: "shukla", significance: { en: "Lord Ganesha's 10-day festival, celebrated with elaborate clay idols and immersion processions — grandest in Maharashtra.", hi: "भगवान गणेश का 10-दिवसीय उत्सव, विस्तृत मिट्टी की मूर्तियों और विसर्जन जुलूसों के साथ मनाया जाता है — महाराष्ट्र में सबसे भव्य।" }, isMajor: true },
    ],
    vrats: [
      { slug: "parsva-ekadashi", name: { en: "Parsva Ekadashi (Parivartini)", hi: "पार्श्व एकादशी (परिवर्तिनी)" }, type: "ekadashi", significance: { en: "Observed on Bhadrapada Shukla Ekadashi — marks Vishnu turning over in his cosmic sleep.", hi: "भाद्रपद शुक्ल एकादशी पर मनाई जाती है — विष्णु के अपनी योग निद्रा में करवट लेने का प्रतीक।" }, existingPageUrl: "/ekadashi/parsva-ekadashi" },
      { slug: "aja-ekadashi", name: { en: "Aja Ekadashi", hi: "अजा एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi of Bhadrapada, held for the remission of sins and liberation.", hi: "भाद्रपद की कृष्ण पक्ष एकादशी, पापों के प्रायश्चित और मुक्ति हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/aja-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "Bhadrapada is within Chaturmas and approaches Pitru Paksha — both conventions restrict major ceremonies. Reserved for spiritual observances and personal fasting rather than auspicious new beginnings.", hi: "भाद्रपद चातुर्मास में है और पितृ पक्ष के निकट आता है — दोनों परंपराएं बड़े समारोहों को प्रतिबंधित करती हैं। शुभ नई शुरुआत की बजाय आध्यात्मिक अनुष्ठानों और व्यक्तिगत व्रत के लिए आरक्षित।" }, relevantMuhuratSlugs: [] },
    panchangRelevance: { summary: { en: "Bhadrapada Krishna Ashtami (Janmashtami) and Shukla Chaturthi (Ganesh Chaturthi) are the dominant Tithis, along with the beginning of Pitru Paksha near month-end.", hi: "भाद्रपद कृष्ण अष्टमी (जन्माष्टमी) और शुक्ल चतुर्थी (गणेश चतुर्थी) प्रमुख तिथियां हैं, साथ ही महीने के अंत में पितृ पक्ष का आरंभ होता है।" }, relatedTithiSlugs: ["ashtami", "chaturthi"] },
    agriculturalImportance: { intro: { en: "Bhadrapada is the Kharif crop maturation period — crops are approaching harvest and the skies remain rainy.", hi: "भाद्रपद खरीफ फसल परिपक्वता की अवधि है — फसलें कटाई के करीब आ रही हैं और आकाश में वर्षा जारी रहती है।" },
      items: [
        { title: { en: "Kharif Maturation", hi: "खरीफ परिपक्वता" }, description: { en: "Paddy and cotton crops mature toward their harvest phase.", hi: "धान और कपास की फसलें अपनी कटाई के चरण की ओर परिपक्व होती हैं।" }, category: "agricultural", icon: "🌾" },
        { title: { en: "Pest Management", hi: "कीट प्रबंधन" }, description: { en: "Humid monsoon conditions require vigilance against crop disease and pests.", hi: "आर्द्र मानसूनी स्थितियों में फसल रोग और कीटों के खिलाफ सतर्कता आवश्यक है।" }, category: "agricultural", icon: "🛡️" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Bhadrapada blends festive joy with the approaching solemnity of Pitru Paksha, calling for both celebration and ancestral reverence.", hi: "भाद्रपद उत्सव की खुशी और पितृ पक्ष की आती हुई गंभीरता को जोड़ता है, उत्सव और पितृ श्रद्धा दोनों की मांग करता है।" },
      items: [
        { title: { en: "Ganesh Worship", hi: "गणेश पूजन" }, description: { en: "Installing a Ganesh idol at home during Chaturthi is believed to remove obstacles for the coming year.", hi: "चतुर्थी पर घर में गणेश प्रतिमा स्थापित करना आने वाले वर्ष के लिए बाधाएं दूर करने में सहायक माना जाता है।" }, category: "spiritual", icon: "🐘" },
        { title: { en: "Begin Ancestor Remembrance", hi: "पितृ स्मरण आरंभ करें" }, description: { en: "As Pitru Paksha begins near month-end, preparing for Shraddha rituals honours ancestral lineage.", hi: "महीने के अंत में पितृ पक्ष शुरू होने पर, श्राद्ध अनुष्ठानों की तैयारी पितृ वंश का सम्मान करती है।" }, category: "spiritual", icon: "🪔" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Janmashtami Fasting & Devotion", hi: "जन्माष्टमी व्रत और भक्ति" }, description: { en: "Fasting until midnight and devotional singing are the primary observances of Janmashtami.", hi: "आधी रात तक व्रत और भक्ति संगीत जन्माष्टमी के प्राथमिक आचरण हैं।" }, category: "spiritual", icon: "🙏" },
      { title: { en: "Eco-Conscious Ganesh Celebration", hi: "पर्यावरण-अनुकूल गणेश उत्सव" }, description: { en: "Using clay idols and natural dyes for Ganesh Chaturthi minimizes environmental impact.", hi: "गणेश चतुर्थी के लिए मिट्टी की मूर्तियों और प्राकृतिक रंगों का उपयोग पर्यावरणीय प्रभाव को कम करता है।" }, category: "social", icon: "🌱" },
    ],
    avoidedActivities: [
      { title: { en: "New Ventures in Pitru Paksha", hi: "पितृ पक्ष में नए कार्य" }, description: { en: "The approach of Pitru Paksha from Bhadrapada Purnima onward makes new ventures inadvisable until after Dussehra.", hi: "भाद्रपद पूर्णिमा से आगे पितृ पक्ष के आगमन के साथ, दशहरे तक नए कार्य उचित नहीं माने जाते।" }, category: "financial", icon: "⏸️" },
    ],
    faqs: [
      { question: { en: "Why is Bhadrapada called the most festival-rich month?", hi: "भाद्रपद को सबसे उत्सव-समृद्ध महीना क्यों कहा जाता है?" }, answer: { en: "It contains Janmashtami, Ganesh Chaturthi (10 days), and the beginning of Pitru Paksha within a single month, making it uniquely celebration-dense.", hi: "इसमें एक ही महीने में जन्माष्टमी, गणेश चतुर्थी (10 दिन) और पितृ पक्ष की शुरुआत होती है, जो इसे अद्वितीय रूप से उत्सव-समृद्ध बनाता है।" } },
      { question: { en: "When does Ganesh Chaturthi occur and how long does it last?", hi: "गणेश चतुर्थी कब होती है और कितने दिन तक चलती है?" }, answer: { en: "Ganesh Chaturthi begins on Bhadrapada Shukla Chaturthi and the festival runs for 10 days, culminating in immersion (visarjan) on Anant Chaturdashi.", hi: "गणेश चतुर्थी भाद्रपद शुक्ल चतुर्थी को शुरू होती है और उत्सव 10 दिनों तक चलता है, अनंत चतुर्दशी पर विसर्जन के साथ समाप्त होता है।" } },
      { question: { en: "What is Pitru Paksha and when does it begin?", hi: "पितृ पक्ष क्या है और यह कब शुरू होता है?" }, answer: { en: "Pitru Paksha is the 16-day period of ancestor remembrance beginning on Bhadrapada Purnima and ending on Ashwin Amavasya, during which Shraddha rituals are performed.", hi: "पितृ पक्ष पूर्वजों की स्मृति की 16-दिवसीय अवधि है जो भाद्रपद पूर्णिमा को शुरू होती है और आश्विन अमावस्या पर समाप्त होती है, जिस दौरान श्राद्ध अनुष्ठान किए जाते हैं।" } },
      { question: { en: "Is Bhadrapada within Chaturmas?", hi: "क्या भाद्रपद चातुर्मास में है?" }, answer: { en: "Yes, Bhadrapada falls entirely within Chaturmas, meaning major ceremonies like weddings remain deferred.", hi: "हां, भाद्रपद पूरी तरह चातुर्मास में पड़ता है, जिसका अर्थ है कि विवाह जैसे बड़े समारोह स्थगित रहते हैं।" } },
      { question: { en: "Which nakshatra gives Bhadrapada its name?", hi: "भाद्रपद को इसका नाम किस नक्षत्र से मिला?" }, answer: { en: "Bhadrapada is named after Uttara Bhadrapada nakshatra, meaning 'auspicious feet', near which the month's full moon falls.", hi: "भाद्रपद का नाम उत्तर भाद्रपदा नक्षत्र से मिला है, जिसका अर्थ 'शुभ चरण' है, जिसके निकट इस महीने की पूर्णिमा पड़ती है।" } },
    ],
    seo: { title: { en: "Bhadrapada Month — Janmashtami, Ganesh Chaturthi & Pitru Paksha", hi: "भाद्रपद मास — जन्माष्टमी, गणेश चतुर्थी और पितृ पक्ष" }, description: { en: "Explore Bhadrapada month: Krishna Janmashtami, Ganesh Chaturthi, Pitru Paksha, Varsha Ritu, naming nakshatra Uttara Bhadrapada.", hi: "भाद्रपद मास के बारे में जानें: कृष्ण जन्माष्टमी, गणेश चतुर्थी, पितृ पक्ष, वर्षा ऋतु, नामकरण नक्षत्र उत्तर भाद्रपदा।" }, keywords: { en: ["Bhadrapada month", "Janmashtami", "Ganesh Chaturthi", "Pitru Paksha", "Varsha Ritu"], hi: ["भाद्रपद मास", "जन्माष्टमी", "गणेश चतुर्थी", "पितृ पक्ष"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "shravana", nextMonthSlug: "ashwin" },
  },
  ashwin: {
    basic: { slug: "ashwin", monthNumber: 7, sanskritName: "आश्विन", iast: "Āśvina", englishName: "Ashwin", hindiName: "आश्विन" },
    hero: {
      h1: { en: "Ashwin Maas", hi: "आश्विन मास" },
      subtitle: { en: "Pitru Paksha, Sharad Navratri, and Dussehra — a month of remembrance followed by triumph.", hi: "पितृ पक्ष, शारद नवरात्रि और दशहरा — स्मरण के बाद विजय का महीना।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Sharad (Autumn)", hi: "शरद" }, icon: "🍂", linkSlug: "sharad", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Dakshinayana", hi: "दक्षिणायन" }, icon: "🌒", linkSlug: "dakshinayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late September – Late October", hi: "सितंबर अंत – अक्टूबर अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Ashwini", hi: "अश्विनी" }, icon: "⭐", linkSlug: "ashwini", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Ashwin is a month of two halves: the solemn Pitru Paksha (16 days of ancestor remembrance) in Krishna Paksha, followed by the triumphant Sharad Navratri and culminating in Dussehra, the victory of good over evil.", hi: "आश्विन दो हिस्सों का महीना है: कृष्ण पक्ष में गंभीर पितृ पक्ष (16 दिन पूर्वज स्मरण), उसके बाद विजयी शारद नवरात्रि और दशहरे पर समापन, बुराई पर अच्छाई की जीत।" },
      { en: "This month ushers in Sharad Ritu — the post-monsoon autumn season — bringing with it cooler temperatures, clear skies, and the year's most spectacular festival celebrations.", hi: "यह महीना शरद ऋतु — मानसून पश्चात की शरद ऋतु — का स्वागत करता है, जो ठंडे तापमान, साफ आकाश और वर्ष के सबसे शानदार उत्सव समारोह लाती है।" },
    ],
    namingNakshatra: { slug: "ashwini", name: { en: "Ashwini", hi: "अश्विनी" }, rationale: { en: "Ashwin's Purnima falls near the Ashwini nakshatra, named after the divine horsemen Ashvins, physicians of the gods.", hi: "आश्विन की पूर्णिमा अश्विनी नक्षत्र के निकट पड़ती है, देवताओं के वैद्य दिव्य अश्विन कुमारों के नाम पर।" } },
    ritu: { slug: "sharad", name: { en: "Sharad (Autumn)", hi: "शरद" }, gregorianApprox: { en: "Mid-September to Mid-November", hi: "मध्य सितंबर से मध्य नवंबर" }, description: { en: "Sharad Ritu spans Ashwin and Kartika — post-monsoon autumn with mild weather, bright nights, and peak festive activity.", hi: "शरद ऋतु आश्विन और कार्तिक तक फैली होती है — मानसून पश्चात की शरद ऋतु जिसमें हल्का मौसम, चमकीली रातें और चरम उत्सवी गतिविधि होती है।" } },
    ayana: { slug: "dakshinayana", name: { en: "Dakshinayana", hi: "दक्षिणायन" }, description: { en: "Ashwin continues within Dakshinayana. The bright autumn nights of Sharad Purnima in Ashwin are considered especially auspicious.", hi: "आश्विन दक्षिणायन में जारी रहता है। आश्विन में शरद पूर्णिमा की उज्ज्वल शरद रातें विशेष रूप से शुभ मानी जाती हैं।" } },
    associatedZodiacSigns: [
      { englishName: "Virgo", hindiName: "कन्या", slug: "virgo" },
      { englishName: "Libra", hindiName: "तुला", slug: "libra" },
    ],
    festivals: [
      { slug: "sharad-navratri", name: { en: "Sharad Navratri", hi: "शारद नवरात्रि" }, approxTithi: "Ashwin Shukla Pratipada – Navami", paksha: "shukla", significance: { en: "The major Navratri of the year — nine nights of Goddess worship preceding Dussehra.", hi: "वर्ष की प्रमुख नवरात्रि — दशहरे से पहले नौ रातें देवी पूजन।" }, isMajor: true, existingPageUrl: "/navratri" },
      { slug: "dussehra-vijayadashami", name: { en: "Dussehra / Vijayadashami", hi: "दशहरा / विजयदशमी" }, approxTithi: "Ashwin Shukla Dashami", paksha: "shukla", significance: { en: "Celebrates the victory of Rama over Ravana and Durga's slaying of Mahishasura — symbolic triumph of good over evil.", hi: "राम की रावण पर और दुर्गा की महिषासुर पर विजय का उत्सव — बुराई पर अच्छाई की प्रतीकात्मक जीत।" }, isMajor: true },
    ],
    vrats: [
      { slug: "papankusha-ekadashi", name: { en: "Papankusha Ekadashi", hi: "पापांकुशा एकादशी" }, type: "ekadashi", significance: { en: "The Shukla Paksha Ekadashi of Ashwin, observed for liberation from sin and attainment of heaven.", hi: "आश्विन की शुक्ल पक्ष एकादशी, पापों से मुक्ति और स्वर्ग प्राप्ति हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/papankusha-ekadashi" },
      { slug: "indira-ekadashi", name: { en: "Indira Ekadashi", hi: "इंदिरा एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi falling within Pitru Paksha — especially associated with freeing deceased ancestors.", hi: "पितृ पक्ष में पड़ने वाली कृष्ण पक्ष एकादशी — विशेष रूप से दिवंगत पूर्वजों की मुक्ति से जुड़ी।" }, existingPageUrl: "/ekadashi/indira-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "Pitru Paksha (Krishna Paksha) restricts auspicious activities. After Dussehra, Chaturmas gradually eases and select muhurats become available before Kartika fully opens the season.", hi: "पितृ पक्ष (कृष्ण पक्ष) शुभ गतिविधियों को प्रतिबंधित करता है। दशहरे के बाद, चातुर्मास धीरे-धीरे ढील देता है और कार्तिक के पूर्ण उद्घाटन से पहले चुनिंदा मुहूर्त उपलब्ध होते हैं।" }, relevantMuhuratSlugs: [] },
    panchangRelevance: { summary: { en: "Pitru Paksha runs through the Krishna Paksha, the Navratri spans the Shukla Paksha, and Vijayadashami falls on Shukla Dashami — one of the most Tithi-event-dense months.", hi: "पितृ पक्ष कृष्ण पक्ष में चलता है, नवरात्रि शुक्ल पक्ष में फैली होती है, और विजयदशमी शुक्ल दशमी पर पड़ती है — तिथि-घटना से सबसे घना महीना।" }, relatedTithiSlugs: ["amavasya", "pratipada", "navami", "dashami"] },
    agriculturalImportance: { intro: { en: "Ashwin marks the beginning of the Kharif harvest in most regions of India, with the monsoon receding and fields ripening.", hi: "आश्विन भारत के अधिकांश क्षेत्रों में मानसून के हटने और खेतों के पकने के साथ खरीफ कटाई की शुरुआत का प्रतीक है।" },
      items: [
        { title: { en: "Kharif Harvest Begins", hi: "खरीफ कटाई आरंभ" }, description: { en: "Rice, sorghum and pulses are harvested as rains taper off in post-monsoon regions.", hi: "मानसून के बाद वर्षा कम होने पर चावल, ज्वार और दलहन की कटाई होती है।" }, category: "agricultural", icon: "🌾" },
        { title: { en: "Post-Monsoon Sowing", hi: "मानसून पश्चात बुवाई" }, description: { en: "Rabi crop sowing (wheat, mustard) begins in northern India toward month-end.", hi: "महीने के अंत की ओर उत्तर भारत में रबी फसल (गेहूं, सरसों) की बुवाई शुरू होती है।" }, category: "agricultural", icon: "🌱" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Ashwin combines the solemnity of ancestral remembrance with the jubilation of Navratri — a month requiring conscious transition between quiet reflection and exuberant celebration.", hi: "आश्विन पितृ स्मरण की गंभीरता को नवरात्रि के उत्साह के साथ जोड़ता है — शांत चिंतन और उत्साही उत्सव के बीच सचेत संक्रमण की आवश्यकता वाला महीना।" },
      items: [
        { title: { en: "Shraddha Observance", hi: "श्राद्ध आचरण" }, description: { en: "Performing Shraddha for departed ancestors during Pitru Paksha is considered a sacred duty.", hi: "पितृ पक्ष के दौरान दिवंगत पूर्वजों के लिए श्राद्ध करना एक पवित्र कर्तव्य माना जाता है।" }, category: "spiritual", icon: "🪔" },
        { title: { en: "Navratri Garba & Fasting", hi: "नवरात्रि गरबा और व्रत" }, description: { en: "Observing the Navratri fast and participating in Garba are the defining practices of Ashwin's Shukla Paksha.", hi: "नवरात्रि व्रत रखना और गरबा में भाग लेना आश्विन के शुक्ल पक्ष की परिभाषित प्रथाएं हैं।" }, category: "spiritual", icon: "🕺" },
      ],
    },
    recommendedActivities: [
      { title: { en: "New Ventures After Vijayadashami", hi: "विजयदशमी के बाद नए कार्य" }, description: { en: "Vijayadashami is one of the most auspicious days for initiating new ventures, education, weapon worship and tool puja.", hi: "विजयदशमी नए उद्यम, शिक्षा, शस्त्र पूजा और यंत्र पूजा आरंभ करने के सबसे शुभ दिनों में से एक है।" }, category: "financial", icon: "🚀" },
      { title: { en: "Ancestor Remembrance", hi: "पितृ तर्पण" }, description: { en: "Tarpan and charitable giving in memory of ancestors are the primary practices of Pitru Paksha.", hi: "तर्पण और पूर्वजों की स्मृति में दान-पुण्य पितृ पक्ष की प्राथमिक प्रथाएं हैं।" }, category: "spiritual", icon: "🙏" },
    ],
    avoidedActivities: [
      { title: { en: "Major Purchases & New Beginnings in Pitru Paksha", hi: "पितृ पक्ष में बड़ी खरीदारी और नई शुरुआत" }, description: { en: "Buying new items, marriage and other auspicious beginnings are traditionally deferred until after Pitru Paksha ends.", hi: "पितृ पक्ष समाप्त होने तक नई वस्तुएं खरीदना, विवाह और अन्य शुभ शुरुआत परंपरागत रूप से स्थगित की जाती हैं।" }, category: "financial", icon: "⏸️" },
    ],
    faqs: [
      { question: { en: "What is Pitru Paksha and how should it be observed?", hi: "पितृ पक्ष क्या है और इसे कैसे मनाया जाए?" }, answer: { en: "Pitru Paksha is the 16-day period for ancestor remembrance, observed through Shraddha rituals, Tarpan and charity done in the name of the deceased.", hi: "पितृ पक्ष पितृ स्मरण की 16-दिवसीय अवधि है, जो दिवंगतों के नाम पर श्राद्ध अनुष्ठानों, तर्पण और दान के माध्यम से मनाई जाती है।" } },
      { question: { en: "Why is Vijayadashami considered a universally auspicious day?", hi: "विजयदशमी को सार्वभौमिक रूप से शुभ दिन क्यों माना जाता है?" }, answer: { en: "Vijayadashami carries a 'swayam siddha' quality — it is traditionally considered auspicious throughout the day, similar to Akshaya Tritiya, requiring no separate muhurat.", hi: "विजयदशमी में 'स्वयं सिद्ध' गुण होता है — यह परंपरागत रूप से पूरे दिन शुभ मानी जाती है, अक्षय तृतीया की तरह, जिसके लिए अलग मुहूर्त की आवश्यकता नहीं।" } },
      { question: { en: "Is Ashwin a good month for major ceremonies?", hi: "क्या आश्विन बड़े समारोहों के लिए शुभ है?" }, answer: { en: "The Krishna Paksha is avoided due to Pitru Paksha. The Shukla Paksha from Navratri to Dussehra becomes highly auspicious, especially for new beginnings after Dussehra.", hi: "पितृ पक्ष के कारण कृष्ण पक्ष से बचा जाता है। नवरात्रि से दशहरे तक का शुक्ल पक्ष अत्यंत शुभ हो जाता है, विशेषकर दशहरे के बाद नई शुरुआत के लिए।" } },
      { question: { en: "What is Sharad Purnima and its significance?", hi: "शरद पूर्णिमा क्या है और इसका क्या महत्व है?" }, answer: { en: "Ashwin Purnima is called Sharad Purnima — the most luminous full moon of the year. It is associated with the Moon's full glory and is traditionally considered auspicious for health and spiritual practices.", hi: "आश्विन पूर्णिमा को शरद पूर्णिमा कहा जाता है — वर्ष की सबसे तेजस्वी पूर्णिमा। यह चंद्रमा की पूर्ण महिमा से जुड़ी है और पारंपरिक रूप से स्वास्थ्य और आध्यात्मिक साधनाओं के लिए शुभ मानी जाती है।" } },
      { question: { en: "Which nakshatra names Ashwin?", hi: "आश्विन का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Ashwin is named after the Ashwini nakshatra, associated with the divine twin Ashvins who are physicians of the gods.", hi: "आश्विन का नाम अश्विनी नक्षत्र पर रखा गया है, जो देवताओं के वैद्य दिव्य अश्विन जुड़वां से जुड़ा है।" } },
    ],
    seo: { title: { en: "Ashwin Month — Navratri, Dussehra, Pitru Paksha & Sharad Ritu", hi: "आश्विन मास — नवरात्रि, दशहरा, पितृ पक्ष और शरद ऋतु" }, description: { en: "Explore Ashwin month: Sharad Navratri, Dussehra, Pitru Paksha, Sharad Ritu, naming nakshatra Ashwini, and post-monsoon muhurat guidance.", hi: "आश्विन मास के बारे में जानें: शारद नवरात्रि, दशहरा, पितृ पक्ष, शरद ऋतु, नामकरण नक्षत्र अश्विनी।" }, keywords: { en: ["Ashwin month", "Navratri", "Dussehra", "Pitru Paksha", "Sharad Ritu"], hi: ["आश्विन मास", "नवरात्रि", "दशहरा", "पितृ पक्ष"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "bhadrapada", nextMonthSlug: "kartika" },
  },
  kartika: {
    basic: { slug: "kartika", monthNumber: 8, sanskritName: "कार्तिक", iast: "Kārtika", englishName: "Kartika", hindiName: "कार्तिक" },
    hero: {
      h1: { en: "Kartika Maas", hi: "कार्तिक मास" },
      subtitle: { en: "The most auspicious month of the year — Diwali, Dhanteras, Devutthana Ekadashi and the end of Chaturmas.", hi: "वर्ष का सबसे शुभ महीना — दिवाली, धनतेरस, देवोत्थान एकादशी और चातुर्मास का समापन।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Sharad (Autumn)", hi: "शरद" }, icon: "🍂", linkSlug: "sharad", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Dakshinayana", hi: "दक्षिणायन" }, icon: "🌒", linkSlug: "dakshinayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late October – Late November", hi: "अक्टूबर अंत – नवंबर अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Krittika", hi: "कृत्तिका" }, icon: "⭐", linkSlug: "krittika", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Kartika is widely regarded as the most sacred and auspicious month in the Hindu calendar — a month when charity, devotion and bathing in sacred rivers are believed to yield exceptional spiritual merit.", hi: "कार्तिक को हिंदू पंचांग में सबसे पवित्र और शुभ महीना माना जाता है — एक महीना जब दान, भक्ति और पवित्र नदियों में स्नान असाधारण आध्यात्मिक पुण्य देते हैं।" },
      { en: "Kartika contains Diwali, Dhanteras, Devutthana Ekadashi (which ends Chaturmas), and Tulsi Vivah — making it one of the most event-dense and commercially significant months in India.", hi: "कार्तिक में दिवाली, धनतेरस, देवोत्थान एकादशी (जो चातुर्मास समाप्त करती है) और तुलसी विवाह होता है — इसे भारत में सबसे घटना-युक्त और व्यावसायिक रूप से महत्वपूर्ण महीनों में से एक बनाता है।" },
    ],
    namingNakshatra: { slug: "krittika", name: { en: "Krittika", hi: "कृत्तिका" }, rationale: { en: "Kartika's Purnima falls near the Krittika nakshatra, associated with fire and the god Kartikeya, the commander of the divine army.", hi: "कार्तिक की पूर्णिमा कृत्तिका नक्षत्र के निकट पड़ती है, जो अग्नि और देवताओं की सेना के सेनापति कार्तिकेय से जुड़ी है।" } },
    ritu: { slug: "sharad", name: { en: "Sharad (Autumn)", hi: "शरद" }, gregorianApprox: { en: "Mid-September to Mid-November", hi: "मध्य सितंबर से मध्य नवंबर" }, description: { en: "Kartika closes Sharad Ritu with pleasant, cool weather and brilliant nights ideal for festivals.", hi: "कार्तिक उत्सवों के लिए आदर्श सुहावने, ठंडे मौसम और उज्ज्वल रातों के साथ शरद ऋतु को समाप्त करता है।" } },
    ayana: { slug: "dakshinayana", name: { en: "Dakshinayana", hi: "दक्षिणायन" }, description: { en: "Kartika is the last month fully within Dakshinayana before the transition begins in Pausha.", hi: "कार्तिक पौष में संक्रमण शुरू होने से पहले पूरी तरह दक्षिणायन के अंतर्गत अंतिम महीना है।" } },
    associatedZodiacSigns: [
      { englishName: "Libra", hindiName: "तुला", slug: "libra" },
      { englishName: "Scorpio", hindiName: "वृश्चिक", slug: "scorpio" },
    ],
    festivals: [
      { slug: "dhanteras", name: { en: "Dhanteras", hi: "धनतेरस" }, approxTithi: "Kartika Krishna Trayodashi", paksha: "krishna", significance: { en: "Gold, silver and household utensils are purchased on this day for prosperity — the opening of the Diwali festival sequence.", hi: "इस दिन समृद्धि हेतु सोना, चांदी और घरेलू बर्तन खरीदे जाते हैं — दिवाली उत्सव क्रम का प्रारंभ।" }, isMajor: true },
      { slug: "diwali-deepavali", name: { en: "Diwali / Deepavali", hi: "दिवाली / दीपावली" }, approxTithi: "Kartika Amavasya", significance: { en: "The Festival of Lights — Lakshmi Puja and firecrackers mark the return of Rama to Ayodhya and the worship of wealth.", hi: "दीपों का उत्सव — लक्ष्मी पूजा और पटाखे राम की अयोध्या वापसी और धन की पूजा का प्रतीक हैं।" }, isMajor: true },
      { slug: "tulsi-vivah", name: { en: "Tulsi Vivah", hi: "तुलसी विवाह" }, approxTithi: "Kartika Shukla Dwadashi", paksha: "shukla", significance: { en: "The ceremonial marriage of Tulsi plant to Lord Vishnu — marks the end of Chaturmas and the traditional reopening of the wedding season.", hi: "तुलसी पौधे का भगवान विष्णु से विवाह — चातुर्मास का समापन और पारंपरिक विवाह मौसम का पुनः प्रारंभ।" }, isMajor: true },
    ],
    vrats: [
      { slug: "devutthana-ekadashi", name: { en: "Devutthana Ekadashi (Prabodhini)", hi: "देवोत्थान एकादशी (प्रबोधिनी)" }, type: "ekadashi", significance: { en: "Lord Vishnu awakens from Chaturmas sleep — all auspicious ceremonies including weddings resume from this day.", hi: "भगवान विष्णु चातुर्मास निद्रा से जागते हैं — विवाह सहित सभी शुभ समारोह इस दिन से पुनः आरंभ होते हैं।" }, existingPageUrl: "/ekadashi/devutthana-ekadashi" },
      { slug: "rama-ekadashi", name: { en: "Rama Ekadashi", hi: "रमा एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi of Kartika, associated with Vishnu and observed for prosperity.", hi: "कार्तिक की कृष्ण पक्ष एकादशी, विष्णु से जुड़ी और समृद्धि हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/rama-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "Kartika is outstanding for gold buying (Dhanteras), marriage and Griha Pravesh (after Devutthana Ekadashi), and vehicle purchase. It is the year's prime month for major purchases and new beginnings.", hi: "कार्तिक सोना खरीदने (धनतेरस), विवाह और गृह प्रवेश (देवोत्थान एकादशी के बाद), और वाहन क्रय के लिए उत्कृष्ट है। यह बड़ी खरीदारी और नई शुरुआत के लिए वर्ष का प्रमुख महीना है।" }, relevantMuhuratSlugs: ["gold-buying-muhurat", "marriage-muhurat", "grah-pravesh-muhurat", "vehicle-muhurat", "property-purchase-muhurat"] },
    panchangRelevance: { summary: { en: "Kartika Amavasya (Diwali), Krishna Trayodashi (Dhanteras), Shukla Ekadashi (Devutthana) and Dwadashi (Tulsi Vivah) are its landmark Tithis.", hi: "कार्तिक अमावस्या (दिवाली), कृष्ण त्रयोदशी (धनतेरस), शुक्ल एकादशी (देवोत्थान) और द्वादशी (तुलसी विवाह) इसकी महत्वपूर्ण तिथियां हैं।" }, relatedTithiSlugs: ["trayodashi", "amavasya", "ekadashi", "dwadashi"] },
    agriculturalImportance: { intro: { en: "Kartika marks the completion of Kharif harvest across India and the prosperity that follows, celebrated through Diwali and Dhanteras.", hi: "कार्तिक पूरे भारत में खरीफ कटाई के पूर्ण होने और उसके बाद की समृद्धि का प्रतीक है, जो दिवाली और धनतेरस के माध्यम से मनाई जाती है।" },
      items: [
        { title: { en: "Kharif Harvest Completion", hi: "खरीफ कटाई पूर्ण" }, description: { en: "Rice and cotton harvests are completed in most regions of India.", hi: "भारत के अधिकांश क्षेत्रों में चावल और कपास की कटाई पूरी हो जाती है।" }, category: "agricultural", icon: "🌾" },
        { title: { en: "Rabi Sowing Peaks", hi: "रबी बुवाई चरम" }, description: { en: "Wheat, mustard and other Rabi crops are actively sown across North India.", hi: "उत्तर भारत में गेहूं, सरसों और अन्य रबी फसलों की सक्रिय रूप से बुवाई होती है।" }, category: "agricultural", icon: "🌱" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Kartika calls for deep devotion, daily lamp-lighting (Kartik Deep), and generous charity — traditions believed to yield extraordinary merit in this month above all others.", hi: "कार्तिक गहरी भक्ति, दैनिक दीप प्रज्वलन (कार्तिक दीप) और उदार दान की मांग करता है — परंपराएं जो इस महीने में अन्य सभी की तुलना में असाधारण पुण्य देती हैं।" },
      items: [
        { title: { en: "Kartik Deep (Daily Lamp Lighting)", hi: "कार्तिक दीप (दैनिक दीप प्रज्वलन)" }, description: { en: "Lighting a lamp near a Tulsi plant every evening throughout Kartika is a deeply meritorious daily practice.", hi: "कार्तिक के दौरान प्रत्येक शाम तुलसी के पौधे के पास दीप जलाना एक अत्यंत पुण्यदायी दैनिक प्रथा है।" }, category: "spiritual", icon: "🚔" },
        { title: { en: "Charity & Donation", hi: "दान-पुण्य" }, description: { en: "Giving food, clothing and money to the needy in Kartika is considered especially rewarding.", hi: "कार्तिक में जरूरतमंदों को भोजन, वस्त्र और धन दान करना विशेष रूप से फलदायी माना जाता है।" }, category: "spiritual", icon: "🤲" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Lakshmi Puja on Diwali", hi: "दिवाली पर लक्ष्मी पूजा" }, description: { en: "Performing Lakshmi Puja on Diwali night invites prosperity and wealth for the coming year.", hi: "दिवाली रात्रि पर लक्ष्मी पूजा करना आने वाले वर्ष के लिए समृद्धि और धन को आमंत्रित करता है।" }, category: "spiritual", icon: "💫" },
      { title: { en: "Gold & Property Purchase", hi: "सोना और संपत्ति क्रय" }, description: { en: "Dhanteras and the post-Devutthana period offer the year's most concentrated window for major purchases.", hi: "धनतेरस और देवोत्थान पश्चात की अवधि बड़ी खरीदारी के लिए वर्ष की सबसे केंद्रित खिड़की प्रदान करती है।" }, category: "financial", icon: "💛" },
    ],
    avoidedActivities: [
      { title: { en: "Avoid Auspicious Events on Diwali Amavasya Night", hi: "दिवाली अमावस्या रात्रि पर शुभ कार्य" }, description: { en: "Amavasya is generally avoided for new auspicious beginnings — Diwali celebrates the Goddess but new ventures are typically timed after it.", hi: "अमावस्या पर सामान्यतः नई शुभ शुरुआत से बचा जाता है — दिवाली देवी का उत्सव मनाती है लेकिन नए उद्यम सामान्यतः इसके बाद निर्धारित किए जाते हैं।" }, category: "financial", icon: "📆" },
    ],
    faqs: [
      { question: { en: "Why is Kartika considered the most auspicious month?", hi: "कार्तिक को सबसे शुभ महीना क्यों माना जाता है?" }, answer: { en: "Multiple scriptural sources declare Kartika as the most meritorious month, where bathing, charity and devotion yield results multiplied manifold compared to other months.", hi: "कई शास्त्रीय स्रोत कार्तिक को सबसे पुण्यदायी महीना घोषित करते हैं, जहां स्नान, दान और भक्ति अन्य महीनों की तुलना में कई गुना अधिक परिणाम देते हैं।" } },
      { question: { en: "When do weddings resume after Chaturmas?", hi: "चातुर्मास के बाद विवाह कब फिर से शुरू होते हैं?" }, answer: { en: "Weddings resume from Devutthana Ekadashi (Kartika Shukla Ekadashi), the day Lord Vishnu is believed to awaken from his four-month cosmic sleep.", hi: "विवाह देवोत्थान एकादशी (कार्तिक शुक्ल एकादशी) से पुनः आरंभ होते हैं, जिस दिन भगवान विष्णु अपनी चार महीने की योग निद्रा से जागते माने जाते हैं।" } },
      { question: { en: "What is Dhanteras and when does it fall?", hi: "धनतेरस क्या है और यह कब पड़ता है?" }, answer: { en: "Dhanteras falls on Kartika Krishna Trayodashi — two days before Diwali — and is the traditional day for purchasing gold, silver and utensils for prosperity.", hi: "धनतेरस कार्तिक कृष्ण त्रयोदशी को पड़ता है — दिवाली से दो दिन पहले — और समृद्धि हेतु सोना, चांदी और बर्तन खरीदने का पारंपरिक दिन है।" } },
      { question: { en: "What is the significance of Tulsi Vivah?", hi: "तुलसी विवाह का क्या महत्व है?" }, answer: { en: "Tulsi Vivah ceremonially marries the Tulsi (Holy Basil) plant to Lord Vishnu, marking the end of Chaturmas and the traditional opening of the wedding season.", hi: "तुलसी विवाह तुलसी पौधे का भगवान विष्णु से विधिपूर्वक विवाह कराता है, चातुर्मास का समापन और पारंपरिक विवाह मौसम का उद्घाटन।" } },
      { question: { en: "Which nakshatra names Kartika?", hi: "कार्तिक का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Kartika is named after the Krittika nakshatra, associated with fire and the warrior god Kartikeya.", hi: "कार्तिक का नाम कृत्तिका नक्षत्र पर रखा गया है, जो अग्नि और योद्धा देव कार्तिकेय से जुड़ा है।" } },
    ],
    seo: { title: { en: "Kartika Month — Diwali, Dhanteras, Devutthana Ekadashi & Sharad Ritu", hi: "कार्तिक मास — दिवाली, धनतेरस, देवोत्थान एकादशी और शरद ऋतु" }, description: { en: "Explore Kartika month: Diwali, Dhanteras, Devutthana Ekadashi, Tulsi Vivah, naming nakshatra Krittika, and the year's best muhurats.", hi: "कार्तिक मास के बारे में जानें: दिवाली, धनतेरस, देवोत्थान एकादशी, तुलसी विवाह, नामकरण नक्षत्र कृत्तिका।" }, keywords: { en: ["Kartika month", "Diwali", "Dhanteras", "Devutthana Ekadashi", "Chaturmas end"], hi: ["कार्तिक मास", "दिवाली", "धनतेरस", "देवोत्थान एकादशी"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "ashwin", nextMonthSlug: "margashirsha" },
  },
  margashirsha: {
    basic: { slug: "margashirsha", monthNumber: 9, sanskritName: "मार्गशीर्ष", iast: "Mārgaśīrṣa", englishName: "Margashirsha", hindiName: "मार्गशीर्ष" },
    hero: {
      h1: { en: "Margashirsha Maas", hi: "मार्गशीर्ष मास" },
      subtitle: { en: "Called the best of months by Lord Krishna in the Bhagavad Gita — ideal for weddings, Gita Jayanti and learning.", hi: "भगवद गीता में श्री कृष्ण ने जिसे महीनों में सर्वश्रेष्ठ कहा — विवाह, गीता जयंती और अध्ययन के लिए आदर्श।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Hemanta (Pre-winter)", hi: "हेमंत" }, icon: "🍃", linkSlug: "hemanta", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Dakshinayana", hi: "दक्षिणायन" }, icon: "🌒", linkSlug: "dakshinayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late November – Late December", hi: "नवंबर अंत – दिसंबर अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Mrigashira", hi: "मृगशिरा" }, icon: "⭐", linkSlug: "mrigashira", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Margashirsha holds a unique scriptural distinction: in the Bhagavad Gita (10.35), Lord Krishna names it as 'the best of months' (māsānāṃ mārgaśīrṣo 'ham). This divine endorsement makes Margashirsha a month of heightened spiritual opportunity.", hi: "मार्गशीर्ष एक अनूठी शास्त्रीय विशिष्टता रखता है: भगवद गीता (10.35) में, भगवान कृष्ण इसे 'महीनों में सर्वश्रेष्ठ' (मासानां मार्गशीर्षोऽहम) कहते हैं। यह दिव्य अनुमोदन मार्गशीर्ष को बढ़ी आध्यात्मिक अवसर का महीना बनाता है।" },
      { en: "The month is also home to Gita Jayanti — the anniversary of the Bhagavad Gita's recitation — and falls during Hemanta Ritu, a pleasant, cool pre-winter season ideal for ceremonies.", hi: "यह महीना गीता जयंती का भी घर है — भगवद गीता के उद्बोधन की वर्षगांठ — और हेमंत ऋतु में पड़ता है, जो समारोहों के लिए आदर्श एक सुखद, ठंडी पूर्व-शीत ऋतु है।" },
    ],
    namingNakshatra: { slug: "mrigashira", name: { en: "Mrigashira", hi: "मृगशिरा" }, rationale: { en: "Margashirsha literally means 'the head of the deer' (mriga = deer, shirsha = head), referring to the Mrigashira nakshatra near which the Purnima falls.", hi: "'मार्गशीर्ष' का शाब्दिक अर्थ है 'हिरण का सिर' (मृग = हिरण, शीर्ष = सिर), उस मृगशिरा नक्षत्र की ओर संकेत करता है जिसके निकट पूर्णिमा पड़ती है।" } },
    ritu: { slug: "hemanta", name: { en: "Hemanta (Pre-winter)", hi: "हेमंत" }, gregorianApprox: { en: "Mid-November to Mid-January", hi: "मध्य नवंबर से मध्य जनवरी" }, description: { en: "Hemanta Ritu spans Margashirsha and Pausha — a pleasant transition from autumn to winter with cool, invigorating mornings.", hi: "हेमंत ऋतु मार्गशीर्ष और पौष तक फैली होती है — शरद ऋतु से शीतकाल में एक सुखद संक्रमण जिसमें ठंडी, स्फूर्तिदायक सुबहें होती हैं।" } },
    ayana: { slug: "dakshinayana", name: { en: "Dakshinayana", hi: "दक्षिणायन" }, description: { en: "Margashirsha falls within Dakshinayana — though the month's post-Chaturmas energy and Gita Jayanti make it spiritually very active despite this.", hi: "मार्गशीर्ष दक्षिणायन में पड़ता है — हालांकि चातुर्मास पश्चात की ऊर्जा और गीता जयंती इसे इसके बावजूद आध्यात्मिक रूप से बहुत सक्रिय बनाती हैं।" } },
    associatedZodiacSigns: [
      { englishName: "Scorpio", hindiName: "वृश्चिक", slug: "scorpio" },
      { englishName: "Sagittarius", hindiName: "धनु", slug: "sagittarius" },
    ],
    festivals: [
      { slug: "gita-jayanti", name: { en: "Gita Jayanti", hi: "गीता जयंती" }, approxTithi: "Margashirsha Shukla Ekadashi", paksha: "shukla", significance: { en: "Commemorates the day the Bhagavad Gita was spoken by Lord Krishna to Arjuna on the battlefield of Kurukshetra.", hi: "भगवान कृष्ण द्वारा कुरुक्षेत्र के युद्धक्षेत्र पर अर्जुन को भगवद गीता सुनाए जाने के दिन की स्मृति में।" }, isMajor: true },
      { slug: "vivah-panchami", name: { en: "Vivah Panchami", hi: "विवाह पंचमी" }, approxTithi: "Margashirsha Shukla Panchami", paksha: "shukla", significance: { en: "Celebrates the divine wedding of Lord Rama and Goddess Sita.", hi: "भगवान राम और देवी सीता के दिव्य विवाह का उत्सव।" }, isMajor: false },
    ],
    vrats: [
      { slug: "mokshada-ekadashi", name: { en: "Mokshada Ekadashi (Gita Jayanti)", hi: "मोक्षदा एकादशी (गीता जयंती)" }, type: "ekadashi", significance: { en: "The Shukla Paksha Ekadashi of Margashirsha — also Gita Jayanti — observed for liberation (moksha). Considered one of the most powerful Ekadashis.", hi: "मार्गशीर्ष की शुक्ल पक्ष एकादशी — गीता जयंती भी — मोक्ष हेतु मनाई जाती है। सबसे शक्तिशाली एकादशियों में से एक मानी जाती है।" }, existingPageUrl: "/ekadashi/mokshada-ekadashi" },
      { slug: "utpanna-ekadashi", name: { en: "Utpanna Ekadashi", hi: "उत्पन्ना एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi — said to be the origin of the Ekadashi tradition, when the Goddess Ekadashi was born.", hi: "कृष्ण पक्ष एकादशी — एकादशी परंपरा का उद्गम मानी जाती है, जब देवी एकादशी का जन्म हुआ था।" }, existingPageUrl: "/ekadashi/utpanna-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "Margashirsha is one of the year's prime wedding months — fully outside Chaturmas, pleasant weather, and blessed by the Gita's endorsement. Griha Pravesh and business launches are also highly favored.", hi: "मार्गशीर्ष वर्ष के प्रमुख विवाह महीनों में से एक है — पूरी तरह चातुर्मास से बाहर, सुहावना मौसम और गीता के आशीर्वाद से युक्त। गृह प्रवेश और व्यापार शुभारंभ भी अत्यधिक अनुकूल हैं।" }, relevantMuhuratSlugs: ["marriage-muhurat", "grah-pravesh-muhurat", "naamkaran-muhurat"] },
    panchangRelevance: { summary: { en: "Margashirsha Shukla Ekadashi (Gita Jayanti) and Panchami (Vivah Panchami) are the dominant Tithis, with the Kharmas period beginning near month-end as the Sun enters Sagittarius.", hi: "मार्गशीर्ष शुक्ल एकादशी (गीता जयंती) और पंचमी (विवाह पंचमी) प्रमुख तिथियां हैं, सूर्य के धनु राशि में प्रवेश के साथ महीने के अंत में खरमास अवधि शुरू होती है।" }, relatedTithiSlugs: ["ekadashi", "panchami"] },
    agriculturalImportance: { intro: { en: "Margashirsha is a season of post-harvest prosperity in India — crops are in, and the cool, pleasant weather favors agricultural processing and storage.", hi: "मार्गशीर्ष भारत में फसल पश्चात की समृद्धि का मौसम है — फसलें आ चुकी हैं, और ठंडे, सुहावने मौसम से कृषि प्रसंस्करण और भंडारण अनुकूल होता है।" },
      items: [
        { title: { en: "Post-Harvest Prosperity", hi: "फसल पश्चात समृद्धि" }, description: { en: "Kharif harvest income drives a surge in market activity and weddings.", hi: "खरीफ फसल आय से बाजार गतिविधि और विवाह समारोहों में वृद्धि होती है।" }, category: "financial", icon: "💰" },
        { title: { en: "Rabi Crop Tending", hi: "रबी फसल देखभाल" }, description: { en: "Wheat and mustard crops, recently sown, require irrigation and attention in Margashirsha.", hi: "हाल ही में बोई गई गेहूं और सरसों की फसलों को मार्गशीर्ष में सिंचाई और ध्यान की आवश्यकता होती है।" }, category: "agricultural", icon: "🌾" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Margashirsha's cool, clear weather makes it ideal for ceremonies, travel and outdoor activities — a month to make the most of the year's best conditions.", hi: "मार्गशीर्ष का ठंडा, साफ मौसम समारोहों, यात्रा और बाहरी गतिविधियों के लिए आदर्श है — वर्ष की सर्वोत्तम परिस्थितियों का अधिकतम लाभ उठाने का महीना।" },
      items: [
        { title: { en: "Scriptural Study", hi: "शास्त्र अध्ययन" }, description: { en: "Gita Jayanti makes Margashirsha the ideal month to begin or deepen Bhagavad Gita study.", hi: "गीता जयंती मार्गशीर्ष को भगवद गीता अध्ययन शुरू करने या गहरा करने का आदर्श महीना बनाती है।" }, category: "spiritual", icon: "📖" },
        { title: { en: "Seasonal Outdoor Activity", hi: "मौसमी बाहरी गतिविधि" }, description: { en: "Cool temperatures and clear skies make Margashirsha perfect for travel, outdoor gatherings and ceremonies.", hi: "ठंडा तापमान और साफ आसमान मार्गशीर्ष को यात्रा, बाहरी सभाओं और समारोहों के लिए उपयुक्त बनाता है।" }, category: "travel", icon: "🏞️" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Weddings & Ceremonies", hi: "विवाह और समारोह" }, description: { en: "Margashirsha is among the most popular and auspicious months for marriage in North India.", hi: "मार्गशीर्ष उत्तर भारत में विवाह के लिए सबसे लोकप्रिय और शुभ महीनों में से एक है।" }, category: "social", icon: "💍" },
      { title: { en: "Gita Reading & Japa", hi: "गीता पाठ और जप" }, description: { en: "Reciting the Bhagavad Gita in Margashirsha carries particular spiritual significance at Gita Jayanti.", hi: "मार्गशीर्ष में भगवद गीता का पाठ गीता जयंती पर विशेष आध्यात्मिक महत्व रखता है।" }, category: "spiritual", icon: "🙏" },
    ],
    avoidedActivities: [
      { title: { en: "Major Ventures Late in the Month (Kharmas)", hi: "महीने के अंत में बड़े कार्य (खरमास)" }, description: { en: "As the Sun enters Sagittarius (Dhanu Kharmas) near the end of Margashirsha, new major ventures are traditionally deferred.", hi: "मार्गशीर्ष के अंत में सूर्य के धनु राशि में प्रवेश (धनु खरमास) के साथ, नए बड़े कार्य परंपरागत रूप से स्थगित किए जाते हैं।" }, category: "financial", icon: "⚠️" },
    ],
    faqs: [
      { question: { en: "Why does Krishna call Margashirsha the best of months?", hi: "कृष्ण मार्गशीर्ष को महीनों में सर्वश्रेष्ठ क्यों कहते हैं?" }, answer: { en: "In Bhagavad Gita 10.35, Krishna lists Margashirsha as one of his divine manifestations (vibhutis), signifying that its energy embodies his own highest qualities.", hi: "भगवद गीता 10.35 में, कृष्ण मार्गशीर्ष को अपनी दिव्य विभूतियों में से एक के रूप में सूचीबद्ध करते हैं, जो दर्शाता है कि इसकी ऊर्जा उनके अपने सर्वोच्च गुणों का प्रतीक है।" } },
      { question: { en: "What is Gita Jayanti and how is it observed?", hi: "गीता जयंती क्या है और इसे कैसे मनाया जाता है?" }, answer: { en: "Gita Jayanti on Margashirsha Shukla Ekadashi commemorates the day Krishna spoke the Gita, observed through readings, discourses and devotional programs.", hi: "मार्गशीर्ष शुक्ल एकादशी पर गीता जयंती उस दिन की स्मृति में मनाई जाती है जब कृष्ण ने गीता सुनाई, पाठ, प्रवचन और भक्ति कार्यक्रमों के माध्यम से।" } },
      { question: { en: "Is Margashirsha a good wedding month?", hi: "क्या मार्गशीर्ष अच्छा विवाह महीना है?" }, answer: { en: "Yes — Margashirsha is one of the most prized wedding months in North India, with pleasant weather, no Chaturmas restrictions, and the auspicious endorsement of the Gita.", hi: "हां — मार्गशीर्ष उत्तर भारत में सबसे मूल्यवान विवाह महीनों में से एक है, सुहावने मौसम, कोई चातुर्मास प्रतिबंध नहीं और गीता के शुभ अनुमोदन के साथ।" } },
      { question: { en: "What is Kharmas and does it affect Margashirsha?", hi: "खरमास क्या है और क्या यह मार्गशीर्ष को प्रभावित करता है?" }, answer: { en: "Kharmas refers to the period when the Sun transits Sagittarius (Dhanu) or Pisces (Meena), considered inauspicious for new ventures. Dhanu Kharmas begins near the end of Margashirsha.", hi: "खरमास उस अवधि को संदर्भित करता है जब सूर्य धनु या मीन राशि में रहता है, जो नए कार्यों के लिए अशुभ माना जाता है। धनु खरमास मार्गशीर्ष के अंत के निकट शुरू होता है।" } },
      { question: { en: "Which nakshatra names Margashirsha?", hi: "मार्गशीर्ष का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Margashirsha is named after the Mrigashira nakshatra — the name literally means 'head of the deer', which is the shape Mrigashira's star group resembles.", hi: "मार्गशीर्ष का नाम मृगशिरा नक्षत्र पर रखा गया है — नाम का शाब्दिक अर्थ है 'हिरण का सिर', जो मृगशिरा के तारा समूह की आकृति से मिलता-जुलता है।" } },
    ],
    seo: { title: { en: "Margashirsha Month — Best Month per Bhagavad Gita | Gita Jayanti & Weddings", hi: "मार्गशीर्ष मास — भगवद गीता में सर्वश्रेष्ठ महीना | गीता जयंती और विवाह" }, description: { en: "Explore Margashirsha month: Gita Jayanti, Vivah Panchami, Hemanta Ritu, naming nakshatra Mrigashira, and the year's best wedding and venture muhurats.", hi: "मार्गशीर्ष मास के बारे में जानें: गीता जयंती, विवाह पंचमी, हेमंत ऋतु, नामकरण नक्षत्र मृगशिरा।" }, keywords: { en: ["Margashirsha month", "Gita Jayanti", "Agrahayan", "Hemanta Ritu", "best Hindu month"], hi: ["मार्गशीर्ष मास", "गीता जयंती", "हेमंत ऋतु"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "kartika", nextMonthSlug: "pausha" },
  },
  pausha: {
    basic: { slug: "pausha", monthNumber: 10, sanskritName: "पौष", iast: "Pauṣa", englishName: "Pausha", hindiName: "पौष" },
    hero: {
      h1: { en: "Pausha Maas", hi: "पौष मास" },
      subtitle: { en: "The month of Winter Sun and spiritual introspection.", hi: "शीतकालीन सूर्य और आध्यात्मिक आत्मनिरीक्षण का महीना।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Hemanta (Pre-winter)", hi: "हेमंत" }, icon: "🍃", linkSlug: "hemanta", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Dakshinayana", hi: "दक्षिणायन" }, icon: "🌒", linkSlug: "dakshinayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late December – Late January", hi: "दिसंबर अंत – जनवरी अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Pushya", hi: "पुष्य" }, icon: "⭐", linkSlug: "pushya", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Pausha, the tenth month, falls in Hemanta Ritu, a time of cool weather and inward focus. It is named after the Pushya nakshatra, considered one of the most auspicious nakshatras in the Hindu calendar.", hi: "पौष, दसवां महीना, हेमंत ऋतु में पड़ता है, ठंडे मौसम और आंतरिक ध्यान का समय। यह पुष्य नक्षत्र के नाम पर रखा गया है, जिसे हिंदू पंचांग में सबसे शुभ नक्षत्रों में से एक माना जाता है।" },
      { en: "This month is deeply associated with Sun worship and the preparation for the Sun's shift into the northern hemisphere.", hi: "यह महीना सूर्य पूजा और सूर्य के उत्तरी गोलार्ध में स्थानांतरण की तैयारी से गहराई से जुड़ा है।" },
    ],
    namingNakshatra: { slug: "pushya", name: { en: "Pushya", hi: "पुष्य" }, rationale: { en: "Pausha's Purnima falls near the Pushya nakshatra, a star group associated with nourishment and prosperity.", hi: "पौष की पूर्णिमा पुष्य नक्षत्र के निकट पड़ती है, जो पोषण और समृद्धि से जुड़ा तारा समूह है।" } },
    ritu: { slug: "hemanta", name: { en: "Hemanta (Pre-winter)", hi: "हेमंत" }, gregorianApprox: { en: "Mid-November to Mid-January", hi: "मध्य नवंबर से मध्य जनवरी" }, description: { en: "Hemanta Ritu brings cool, brisk weather, ideal for spiritual practice and introspection.", hi: "हेमंत ऋतु ठंडा, स्फूर्तिदायक मौसम लाती है, जो आध्यात्मिक साधना और आत्मनिरीक्षण के लिए आदर्श है।" } },
    ayana: { slug: "dakshinayana", name: { en: "Dakshinayana", hi: "दक्षिणायन" }, description: { en: "Pausha starts within Dakshinayana and transitions toward Uttarayana as the Sun moves toward Capricorn.", hi: "पौष दक्षिणायन के भीतर शुरू होता है और उत्तरायण की ओर संक्रमण करता है जैसे-जैसे सूर्य मकर राशि की ओर बढ़ता है।" } },
    festivals: [
      { slug: "pausha-purnima", name: { en: "Pausha Purnima", hi: "पौष पूर्णिमा" }, approxTithi: "Pausha Shukla Purnima", paksha: "shukla", significance: { en: "Marks the beginning of the month-long Magh Mela at the Triveni Sangam, a major spiritual gathering.", hi: "त्रिवेणी संगम पर महीने भर चलने वाले माघ मेले की शुरुआत का प्रतीक, एक बड़ा आध्यात्मिक जमावड़ा।" }, isMajor: true },
    ],
    vrats: [
      { slug: "pausha-putrada-ekadashi", name: { en: "Pausha Putrada Ekadashi", hi: "पौष पुत्रदा एकादशी" }, type: "ekadashi", significance: { en: "The Shukla Paksha Ekadashi of Pausha, observed for the wellbeing and prosperity of children.", hi: "पौष की शुक्ल पक्ष एकादशी, बच्चों के कल्याण और समृद्धि हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/pausha-putrada-ekadashi" },
      { slug: "saphala-ekadashi", name: { en: "Saphala Ekadashi", hi: "सफला एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi, observed for success and the fulfillment of desires.", hi: "कृष्ण पक्ष एकादशी, सफलता और इच्छाओं की पूर्ति हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/saphala-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "Muhurats in Pausha are often restricted due to the proximity of Kharmas and the cold season. Many prefer to delay major ceremonies until the weather warms.", hi: "पौष में मुहूर्त अक्सर खरमास की निकटता और ठंडे मौसम के कारण सीमित होते हैं। कई लोग मौसम गर्म होने तक बड़े समारोहों में देरी करना पसंद करते हैं।" }, relevantMuhuratSlugs: [] },
    panchangRelevance: { summary: { en: "Pausha Purnima and the two Ekadashis are the main Tithis. Mid-Pausha brings Makar Sankranti, a critical solar-calendar transition.", hi: "पौष पूर्णिमा और दो एकादशियां मुख्य तिथियां हैं। मध्य पौष में मकर संक्रांति आती है, एक महत्वपूर्ण सौर-पंचांग संक्रमण।" }, relatedTithiSlugs: ["purnima", "ekadashi"] },
    agriculturalImportance: { intro: { en: "In Pausha, agriculture focuses on the maintenance of Rabi crops as the weather turns cold.", hi: "पौष में, कृषि रबी फसलों के रखरखाव पर केंद्रित होती है क्योंकि मौसम ठंडा हो जाता है।" },
      items: [
        { title: { en: "Rabi Crop Maintenance", hi: "रबी फसल रखरखाव" }, description: { en: "Wheat, mustard and gram require consistent care in the winter months.", hi: "गेहूं, सरसों और चने को सर्दियों के महीनों में निरंतर देखभाल की आवश्यकता होती है।" }, category: "agricultural", icon: "🌾" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Pausha calls for warmth, both in diet and lifestyle, as winter temperatures peak.", hi: "पौष आहार और जीवनशैली दोनों में गर्माहट की मांग करता है, क्योंकि सर्दियों का तापमान चरम पर होता है।" },
      items: [
        { title: { en: "Winter Diet", hi: "सर्दियों का आहार" }, description: { en: "Nutritious, warming foods like dry fruits, sesame, and jaggery are favored.", hi: "सूखे मेवे, तिल और गुड़ जैसे पौष्टिक, गर्माहट देने वाले भोजन को प्राथमिकता दी जाती है।" }, category: "health", icon: "🔥" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Charity & Feeding", hi: "दान और भोजन सेवा" }, description: { en: "Distributing warm food and blankets in the peak of winter is especially valued.", hi: "सर्दियों के चरम में गर्म भोजन और कंबल वितरित करना विशेष रूप से मूल्यवान है।" }, category: "social", icon: "🧣" },
      { title: { en: "Spiritual Introspection", hi: "आध्यात्मिक आत्मनिरीक्षण" }, description: { en: "The long winter nights make Pausha conducive to inward-focused meditation and scripture reading.", hi: "लंबी सर्दियों की रातें पौष को आंतरिक-केंद्रित ध्यान और शास्त्र अध्ययन के लिए अनुकूल बनाती हैं।" }, category: "spiritual", icon: "🙏" },
    ],
    avoidedActivities: [
      { title: { en: "Outdoor Exertion in Harsh Winter", hi: "कठोर सर्दियों में बाहरी श्रम" }, description: { en: "Very cold temperatures make harsh outdoor activity inadvisable.", hi: "बहुत ठंडा तापमान कठोर बाहरी गतिविधि को उचित नहीं बनाता।" }, category: "health", icon: "🥶" },
    ],
    faqs: [
      { question: { en: "Why is Pushya nakshatra considered so auspicious?", hi: "पुष्य नक्षत्र को इतना शुभ क्यों माना जाता है?" }, answer: { en: "Pushya is traditionally associated with nourishment, prosperity, and success in any new venture, making it a highly sought-after nakshatra.", hi: "पुष्य पारंपरिक रूप से पोषण, समृद्धि और किसी भी नए उद्यम में सफलता से जुड़ा है, जिससे यह एक अत्यधिक मांग वाला नक्षत्र बन जाता है।" } },
      { question: { en: "What is the significance of Pausha Purnima?", hi: "पौष पूर्णिमा का क्या महत्व है?" }, answer: { en: "Pausha Purnima marks the start of the month-long Magh Mela at Prayagraj, a major spiritual event in Hinduism.", hi: "पौष पूर्णिमा प्रयागराज में महीने भर चलने वाले माघ मेले की शुरुआत का प्रतीक है, जो हिंदू धर्म में एक प्रमुख आध्यात्मिक घटना है।" } },
      { question: { en: "Is Pausha a good wedding month?", hi: "क्या पौष विवाह के लिए शुभ महीना है?" }, answer: { en: "No, Pausha is generally avoided for weddings due to cold weather and the influence of Kharmas.", hi: "नहीं, पौष को सामान्यतः ठंडे मौसम और खरमास के प्रभाव के कारण विवाह के लिए टाला जाता है।" } },
      { question: { en: "What season does Pausha fall in?", hi: "पौष किस ऋतु में आता है?" }, answer: { en: "Pausha falls in Hemanta Ritu (pre-winter), a transition from autumn to winter.", hi: "पौष हेमंत ऋतु में आता है, शरद ऋतु से शीतकाल में एक संक्रमण।" } },
      { question: { en: "Which nakshatra names Pausha?", hi: "पौष का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Pausha is named after Pushya nakshatra, near which the month's full moon falls.", hi: "पौष का नाम पुष्य नक्षत्र पर रखा गया है, जिसके निकट इस महीने की पूर्णिमा पड़ती है।" } },
    ],
    seo: { title: { en: "Pausha Month — Winter Sun, Pushya Nakshatra & Spiritual Introspection", hi: "पौष मास — शीतकालीन सूर्य, पुष्य नक्षत्र और आध्यात्मिक आत्मनिरीक्षण" }, description: { en: "Explore Pausha month: Pushya nakshatra, Hemanta Ritu, winter traditions, and spiritual significance.", hi: "पौष मास के बारे में जानें: पुष्य नक्षत्र, हेमंत ऋतु, सर्दियों की परंपराएं, और आध्यात्मिक महत्व।" }, keywords: { en: ["Pausha month", "Pushya nakshatra", "Hemanta Ritu", "winter"], hi: ["पौष मास", "पुष्य नक्षत्र", "हेमंत ऋतु"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "margashirsha", nextMonthSlug: "magha" },
  },
  magha: {
    basic: { slug: "magha", monthNumber: 11, sanskritName: "माघ", iast: "Māgha", englishName: "Magha", hindiName: "माघ" },
    hero: {
      h1: { en: "Magha Maas", hi: "माघ मास" },
      subtitle: { en: "The holiest month for spiritual cleansing, pilgrimage, and Magh Mela.", hi: "आध्यात्मिक शुद्धि, तीर्थयात्रा और माघ मेले के लिए सबसे पवित्र महीना।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Shishira (Winter)", hi: "शिशिर" }, icon: "❄️", linkSlug: "shishira", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Uttarayana", hi: "उत्तरायण" }, icon: "☀️", linkSlug: "uttarayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late January – Late February", hi: "जनवरी अंत – फरवरी अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Magha", hi: "मघा" }, icon: "⭐", linkSlug: "magha", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Magha is considered one of the holiest months in the Hindu calendar, especially for spiritual cleansing through pilgrimage and bathing in sacred rivers like the Ganga, Yamuna, and Saraswati.", hi: "माघ को हिंदू पंचांग में सबसे पवित्र महीनों में से एक माना जाता है, विशेषकर गंगा, यमुना और सरस्वती जैसी पवित्र नदियों में तीर्थयात्रा और स्नान के माध्यम से आध्यात्मिक शुद्धि के लिए।" },
      { en: "The Magh Mela at Prayagraj (Sangam) is the largest spiritual gathering, and the month is named after the Magha nakshatra.", hi: "प्रयागराज (संगम) में माघ मेला सबसे बड़ा आध्यात्मिक जमावड़ा है, और महीने का नाम मघा नक्षत्र पर रखा गया है।" },
    ],
    namingNakshatra: { slug: "magha", name: { en: "Magha", hi: "मघा" }, rationale: { en: "Magha's Purnima falls near the Magha nakshatra, a powerful star group associated with ancestors (Pitrus) and divine blessings.", hi: "माघ की पूर्णिमा मघा नक्षत्र के निकट पड़ती है, जो पूर्वजों (पितरों) और दिव्य आशीर्वाद से जुड़ा एक शक्तिशाली तारा समूह है।" } },
    ritu: { slug: "shishira", name: { en: "Shishira (Winter)", hi: "शिशिर" }, gregorianApprox: { en: "Mid-January to Mid-March", hi: "मध्य जनवरी से मध्य मार्च" }, description: { en: "Shishira Ritu brings the coldest weather of the year, focusing the mind on spiritual warmth and inner practice.", hi: "शिशिर ऋतु वर्ष का सबसे ठंडा मौसम लाती है, जो मन को आध्यात्मिक गर्माहट और आंतरिक अभ्यास पर केंद्रित करती है।" } },
    ayana: { slug: "uttarayana", name: { en: "Uttarayana", hi: "उत्तरायण" }, description: { en: "Magha is firmly within Uttarayana, the Sun's northward movement, enhancing its auspiciousness.", hi: "माघ मजबूती से उत्तरायण के भीतर है, सूर्य की उत्तर दिशा की गति, इसकी शुभता को बढ़ाती है।" },
    },
    festivals: [
      { slug: "magha-purnima", name: { en: "Magha Purnima", hi: "माघ पूर्णिमा" }, approxTithi: "Magha Shukla Purnima", paksha: "shukla", significance: { en: "Considered the most auspicious day for bathing in sacred rivers to wash away sins.", hi: "पवित्र नदियों में स्नान कर पाप धोने के लिए वर्ष का सबसे शुभ दिन माना जाता है।" }, isMajor: true },
      { slug: "vasant-panchami", name: { en: "Vasant Panchami", hi: "वसंत पंचमी" }, approxTithi: "Magha Shukla Panchami", paksha: "shukla", significance: { en: "Dedicated to Saraswati, the Goddess of knowledge and arts; marks the beginning of preparations for spring.", hi: "ज्ञान और कला की देवी सरस्वती को समर्पित; वसंत की तैयारियों की शुरुआत का प्रतीक।" }, isMajor: true },
    ],
    vrats: [
      { slug: "shat-tila-ekadashi", name: { en: "Shat-Tila Ekadashi", hi: "षटतिला एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi of Magha, where sesame seeds (til) are used in six different ways for cleansing.", hi: "माघ की कृष्ण पक्ष एकादशी, जहां शुद्धि हेतु छह अलग-अलग तरीकों से तिल का उपयोग किया जाता है।" }, existingPageUrl: "/ekadashi/shat-tila-ekadashi" },
      { slug: "jaya-ekadashi", name: { en: "Jaya Ekadashi", hi: "जया एकादशी" }, type: "ekadashi", significance: { en: "The Shukla Paksha Ekadashi, observed for victory over difficulties and sins.", hi: "शुक्ल पक्ष एकादशी, कठिनाइयों और पापों पर विजय हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/jaya-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "As Magha falls in Uttarayana and moves past the coldest peak, certain auspicious ceremonies (like Naamkaran and some business launches) become favored.", hi: "चूंकि माघ उत्तरायण में पड़ता है और सबसे ठंडी चरम सीमा से आगे निकल जाता है, कुछ शुभ समारोह (जैसे नामकरण और कुछ व्यापार शुभारंभ) अनुकूल हो जाते हैं।" }, relevantMuhuratSlugs: ["naamkaran-muhurat"] },
    panchangRelevance: { summary: { en: "Magha Purnima, Vasant Panchami and the month's Ekadashis are the primary spiritual landmarks.", hi: "माघ पूर्णिमा, वसंत पंचमी और इस महीने की एकादशियां प्राथमिक आध्यात्मिक मील के पत्थर हैं।" }, relatedTithiSlugs: ["purnima", "panchami", "ekadashi"] },
    agriculturalImportance: { intro: { en: "Magha focuses on Rabi crop maintenance as the plants grow and develop ahead of the spring season.", hi: "माघ रबी फसल के रखरखाव पर केंद्रित है क्योंकि पौधे वसंत ऋतु से पहले बढ़ते और विकसित होते हैं।" },
      items: [
        { title: { en: "Rabi Growth", hi: "रबी की वृद्धि" }, description: { en: "Crops like wheat, mustard and gram actively develop in the cold. Irrigation is critical.", hi: "गेहूं, सरसों और चने जैसी फसलें सर्दियों में सक्रिय रूप से विकसित होती हैं। सिंचाई महत्वपूर्ण है।" }, category: "agricultural", icon: "🌾" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Magha is a month for austere, purposeful living — intense cold encourages disciplined spiritual practice.", hi: "माघ संयमित, उद्देश्यपूर्ण जीवन का महीना है — भीषण ठंड अनुशासित आध्यात्मिक साधना को प्रोत्साहित करती है।" },
      items: [
        { title: { en: "Sangam Snan (Holy Bathing)", hi: "संगम स्नान" }, description: { en: "Taking a dip at the confluence of sacred rivers in Magha is believed to bestow immense merit.", hi: "माघ में पवित्र नदियों के संगम पर डुबकी लगाना अपार पुण्य प्रदान करने वाला माना जाता है।" }, category: "spiritual", icon: "🌊" },
        { title: { en: "Sesame-Based Diet", hi: "तिल-आधारित आहार" }, description: { en: "Consuming sesame products helps maintain body warmth in the cold Shishira month.", hi: "ठंडे शिशिर महीने में शरीर की गर्माहट बनाए रखने के लिए तिल के उत्पादों का सेवन सहायक है।" }, category: "health", icon: "🔥" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Pilgrimage", hi: "तीर्थयात्रा" }, description: { en: "Magha is the pre-eminent month for pilgrimage to sacred rivers like the Ganga.", hi: "माघ गंगा जैसी पवित्र नदियों की तीर्थयात्रा के लिए सर्वोपरि महीना है।" }, category: "spiritual", icon: "🚶" },
      { title: { en: "Saraswati Puja", hi: "सरस्वती पूजा" }, description: { en: "Vasant Panchami is the ideal day to begin education, artistic pursuits, or perform Vidyarambham.", hi: "वसंत पंचमी शिक्षा शुरू करने, कलात्मक प्रयासों या विद्यारंभम करने का आदर्श दिन है।" }, category: "spiritual", icon: "🎨" },
    ],
    avoidedActivities: [
      { title: { en: "Excessive Exposure to Cold", hi: "अत्यधिक ठंड में बाहर जाना" }, description: { en: "The severe cold of Shishira requires protective clothing and limiting exposure.", hi: "शिशिर की भीषण ठंड में सुरक्षात्मक कपड़ों की आवश्यकता है और बाहर जाना सीमित रखना चाहिए।" }, category: "health", icon: "🧣" },
    ],
    faqs: [
      { question: { en: "Why is Magha considered the most sacred month for bathing?", hi: "माघ को स्नान के लिए सबसे पवित्र महीना क्यों माना जाता है?" }, answer: { en: "It is believed that bathing in sacred rivers during Magha, especially on Purnima, washes away sins and grants spiritual merit far beyond other months.", hi: "माना जाता है कि माघ के दौरान, विशेषकर पूर्णिमा पर, पवित्र नदियों में स्नान पापों को धो देता है और अन्य महीनों की तुलना में कहीं अधिक आध्यात्मिक पुण्य प्रदान करता है।" } },
      { question: { en: "What is the Magh Mela?", hi: "माघ मेला क्या है?" }, answer: { en: "The Magh Mela at Prayagraj (Sangam) is a month-long spiritual event where millions gather to bathe in the holy confluence and practice spiritual discipline.", hi: "प्रयागराज (संगम) में माघ मेला एक महीने तक चलने वाली आध्यात्मिक घटना है जहां लाखों लोग पवित्र संगम में स्नान करने और आध्यात्मिक अनुशासन का अभ्यास करने के लिए जमा होते हैं।" } },
      { question: { en: "What is Vasant Panchami and its significance?", hi: "वसंत पंचमी क्या है और इसका महत्व क्या है?" }, answer: { en: "Vasant Panchami is dedicated to Saraswati, the Goddess of knowledge and arts, and marks the onset of spring preparations.", hi: "वसंत पंचमी ज्ञान और कला की देवी सरस्वती को समर्पित है, और वसंत की तैयारियों के आगमन का प्रतीक है।" } },
      { question: { en: "Is Magha favorable for weddings?", hi: "क्या माघ विवाह के लिए शुभ है?" }, answer: { en: "Some periods in Magha are auspicious, particularly as the month transitions towards spring, but it depends on specific panchang calculations for the year.", hi: "माघ में कुछ अवधि शुभ है, विशेषकर जैसे-जैसे महीना वसंत की ओर बढ़ता है, लेकिन यह वर्ष के विशिष्ट पंचांग गणनाओं पर निर्भर करता है।" } },
      { question: { en: "Which nakshatra names Magha?", hi: "माघ का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Magha is named after the Magha nakshatra, near which the month's full moon falls.", hi: "माघ का नाम मघा नक्षत्र पर रखा गया है, जिसके निकट इस महीने की पूर्णिमा पड़ती है।" } },
    ],
    seo: { title: { en: "Magha Month — Spiritual Cleansing, Magh Mela & Vasant Panchami", hi: "माघ मास — आध्यात्मिक शुद्धि, माघ मेला और वसंत पंचमी" }, description: { en: "Explore Magha month: Spiritual cleansing, Magh Mela, Vasant Panchami, Shishira Ritu, naming nakshatra Magha, and Uttarayana significance.", hi: "माघ मास के बारे में जानें: आध्यात्मिक शुद्धि, माघ मेला, वसंत पंचमी, शिशिर ऋतु, नामकरण नक्षत्र मघा, और उत्तरायण महत्व।" }, keywords: { en: ["Magha month", "Magh Mela", "Vasant Panchami", "Shishira Ritu", "holy bathing"], hi: ["माघ मास", "माघ मेला", "वसंत पंचमी", "शिशिर ऋतु"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "pausha", nextMonthSlug: "phalguna" },
  },
  phalguna: {
    basic: { slug: "phalguna", monthNumber: 12, sanskritName: "फाल्गुन", iast: "Phālguna", englishName: "Phalguna", hindiName: "फाल्गुन" },
    hero: {
      h1: { en: "Phalguna Maas", hi: "फाल्गुन मास" },
      subtitle: { en: "Holi — the festival of colors and love, bringing the Hindu lunar year to its final close.", hi: "होली — रंगों और प्रेम का त्योहार, जो हिंदू चंद्र वर्ष को उसके अंतिम समापन पर लाता है।" },
    },
    quickFacts: [
      { label: { en: "Ritu (Season)", hi: "ऋतु" }, value: { en: "Shishira (Winter)", hi: "शिशिर" }, icon: "❄️", linkSlug: "shishira", linkType: "ritu" },
      { label: { en: "Ayana", hi: "अयन" }, value: { en: "Uttarayana", hi: "उत्तरायण" }, icon: "☀️", linkSlug: "uttarayana", linkType: "ayana" },
      { label: { en: "Gregorian Overlap", hi: "ग्रेगोरियन अवधि" }, value: { en: "Late February – Late March", hi: "फरवरी अंत – मार्च अंत" }, icon: "📅" },
      { label: { en: "Naming Nakshatra", hi: "नामकरण नक्षत्र" }, value: { en: "Purva Phalguni", hi: "पूर्वा फाल्गुनी" }, icon: "⭐", linkSlug: "purva-phalguni", linkType: "nakshatra" },
    ],
    introduction: [
      { en: "Phalguna is the twelfth and final month of the Hindu lunar calendar, defined by Holi, the world-famous festival of colors and love. The month serves as a joyous wrap-up to the lunar year, bridging the cold Shishira season and the impending Vasanta Ritu.", hi: "फाल्गुन हिंदू चंद्र पंचांग का बारहवां और अंतिम महीना है, जिसे होली, रंगों और प्रेम के विश्व प्रसिद्ध त्योहार द्वारा परिभाषित किया गया है। यह महीना चंद्र वर्ष के एक आनंदमय समापन के रूप में कार्य करता है, जो ठंडे शिशिर मौसम और आसन्न वसंत ऋतु के बीच सेतु बनाता है।" },
      { en: "The month takes its name from the Phalguni nakshatras and brings the year to a close as the Sun continues its northward journey.", hi: "इस महीने का नाम फाल्गुनी नक्षत्रों पर रखा गया है और यह वर्ष का समापन करता है क्योंकि सूर्य अपनी उत्तर दिशा की यात्रा जारी रखता है।" },
    ],
    namingNakshatra: { slug: "purva-phalguni", name: { en: "Purva Phalguni", hi: "पूर्वा फाल्गुनी" }, rationale: { en: "Phalguna's Purnima falls near the Purva Phalguni nakshatra, associated with marital bliss and the divine union.", hi: "फाल्गुन की पूर्णिमा पूर्वा फाल्गुनी नक्षत्र के निकट पड़ती है, जो वैवाहिक सुख और दिव्य मिलन से जुड़ा है।" } },
    ritu: { slug: "shishira", name: { en: "Shishira (Winter)", hi: "शिशिर" }, gregorianApprox: { en: "Mid-January to Mid-March", hi: "मध्य जनवरी से मध्य मार्च" }, description: { en: "Phalguna ends Shishira Ritu, with warmer days signaling the approach of spring.", hi: "फाल्गुन शिशिर ऋतु का अंत करता है, गर्म दिनों के साथ जो वसंत के आगमन का संकेत देते हैं।" } },
    ayana: { slug: "uttarayana", name: { en: "Uttarayana", hi: "उत्तरायण" }, description: { en: "Phalguna is firmly within Uttarayana, the Sun's northward journey.", hi: "फाल्गुन मजबूती से उत्तरायण के भीतर है, सूर्य की उत्तर दिशा की यात्रा।" },
    },
    festivals: [
      { slug: "holika-dahan", name: { en: "Holika Dahan", hi: "होलिका दहन" }, approxTithi: "Phalguna Shukla Purnima", paksha: "shukla", significance: { en: "Commemorates the triumph of devotion over evil; a bonfire is lit on the eve of Holi.", hi: "बुराई पर भक्ति की विजय का प्रतीक; होली की पूर्व संध्या पर अलाव जलाया जाता है।" }, isMajor: true },
      { slug: "holi", name: { en: "Holi", hi: "होली" }, approxTithi: "Phalguna Krishna Pratipada (post Purnima)", significance: { en: "The iconic festival of colors — celebrated with gaiety, colored powders, and social connection.", hi: "रंगों का प्रतिष्ठित त्योहार — आनंद, रंगीन पाउडर और सामाजिक जुड़ाव के साथ मनाया जाता है।" }, isMajor: true },
    ],
    vrats: [
      { slug: "vijaya-ekadashi", name: { en: "Vijaya Ekadashi", hi: "विजया एकादशी" }, type: "ekadashi", significance: { en: "The Krishna Paksha Ekadashi of Phalguna, observed for success and victory over obstacles.", hi: "फाल्गुन की कृष्ण पक्ष एकादशी, सफलता और बाधाओं पर विजय हेतु मनाई जाती है।" }, existingPageUrl: "/ekadashi/vijaya-ekadashi" },
      { slug: "amalaki-ekadashi", name: { en: "Amalaki Ekadashi", hi: "आमलकी एकादशी" }, type: "ekadashi", significance: { en: "The Shukla Paksha Ekadashi of Phalguna, involving worship of the Amalaki (Indian Gooseberry) tree.", hi: "फाल्गुन की शुक्ल पक्ष एकादशी, जिसमें आमलकी (आंवला) वृक्ष की पूजा शामिल है।" }, existingPageUrl: "/ekadashi/amalaki-ekadashi" },
    ],
    muhuratRelevance: { summary: { en: "Phalguna in Uttarayana is generally favorable, though festive activity around Holi often takes precedence over new ceremonies. It is a good month for concluding the lunar year and preparing for Chaitra.", hi: "उत्तरायण में फाल्गुन सामान्यतः अनुकूल है, हालांकि होली के आसपास उत्सवी गतिविधि अक्सर नए समारोहों पर प्राथमिकता लेती है। यह चंद्र वर्ष को समाप्त करने और चैत्र की तैयारी के लिए एक अच्छा महीना है।" }, relevantMuhuratSlugs: [] },
    panchangRelevance: { summary: { en: "Phalguna Purnima (Holi/Holika Dahan) is the defining Tithi, marking the end of the Hindu lunar year.", hi: "फाल्गुन पूर्णिमा (होली/होलिका दहन) परिभाषित तिथि है, जो हिंदू चंद्र वर्ष का अंत करती है।" }, relatedTithiSlugs: ["purnima"] },
    agriculturalImportance: { intro: { en: "Phalguna is the bridge to the Rabi harvest — agricultural activity focuses on continued crop maintenance before the harvest peak in Chaitra.", hi: "फाल्गुन रबी कटाई का सेतु है — कृषि गतिविधि रबी की कटाई के शिखर से पहले फसल के रखरखाव पर केंद्रित होती है।" },
      items: [
        { title: { en: "Rabi Pre-Harvest", hi: "रबी पूर्व-कटाई" }, description: { en: "Wheat and other Rabi crops are ripening, with harvest preparation nearing.", hi: "गेहूं और अन्य रबी फसलें पक रही हैं, कटाई की तैयारी निकट है।" }, category: "agricultural", icon: "🌾" },
      ],
    },
    lifestyleGuidance: { intro: { en: "Phalguna balances the lingering cold of winter with the vibrancy of the coming spring, encouraging playfulness and social connection in anticipation of new beginnings.", hi: "फाल्गुन आने वाले वसंत की जीवंतता के साथ सर्दियों की बची हुई ठंड को संतुलित करता है, नई शुरुआत की प्रत्याशा में चंचलता और सामाजिक जुड़ाव को प्रोत्साहित करता है।" },
      items: [
        { title: { en: "Holi Celebrations", hi: "होली उत्सव" }, description: { en: "Socially, Phalguna is the most vibrant month, centering on community engagement and joy.", hi: "सामाजिक रूप से, फाल्गुन सबसे जीवंत महीना है, जो सामुदायिक जुड़ाव और आनंद पर केंद्रित है।" }, category: "social", icon: "🎨" },
        { title: { en: "Spring Preparation", hi: "वसंत तैयारी" }, description: { en: "As Shishira ends, Phalguna begins the transition toward the lighter, more active months.", hi: "जैसे ही शिशिर समाप्त होता है, फाल्गुन हल्के, अधिक सक्रिय महीनों की ओर संक्रमण शुरू करता है।" }, category: "health", icon: "🌸" },
      ],
    },
    recommendedActivities: [
      { title: { en: "Social Celebration", hi: "सामाजिक उत्सव" }, description: { en: "Participating in Holi celebrations strengthens community and personal relationships.", hi: "होली उत्सव में भाग लेना सामुदायिक और व्यक्तिगत संबंधों को मजबूत करता है।" }, category: "social", icon: "🤝" },
      { title: { en: "Concluding the Lunar Year", hi: "चंद्र वर्ष का समापन" }, description: { en: "Using Phalguna for finishing tasks, settling accounts, and spiritual reflection prepares for the new year.", hi: "कार्यों को पूरा करने, हिसाब-किताब निपटाने और आध्यात्मिक चिंतन के लिए फाल्गुन का उपयोग नववर्ष की तैयारी कराता है।" }, category: "financial", icon: "✔️" },
    ],
    avoidedActivities: [
      { title: { en: "Heavy Exertion", hi: "अत्यधिक श्रम" }, description: { en: "As spring approaches, transitioning from winter routines should be gentle.", hi: "जैसे ही वसंत आता है, सर्दियों की दिनचर्या से संक्रमण सौम्य होना चाहिए।" }, category: "health", icon: "🍃" },
    ],
    faqs: [
      { question: { en: "What is the significance of Holi?", hi: "होली का महत्व क्या है?" }, answer: { en: "Holi celebrates the triumph of good over evil (Holika Dahan) and the victory of divine love, marked by joy, social equality and colors.", hi: "होली बुराई पर अच्छाई की जीत (होलिका दहन) और दिव्य प्रेम की जीत का जश्न मनाती है, जो आनंद, सामाजिक समानता और रंगों द्वारा चिह्नित है।" } },
      { question: { en: "Is Phalguna the last month of the Hindu year?", hi: "क्या फाल्गुन हिंदू वर्ष का अंतिम महीना है?" }, answer: { en: "Yes, Phalguna is the twelfth and final month of the lunar calendar in the Amanta system, preceding the New Year in Chaitra.", hi: "हां, फाल्गुन अमांत प्रणाली में चंद्र पंचांग का बारहवां और अंतिम महीना है, जो चैत्र में नववर्ष से पहले आता है।" } },
      { question: { en: "What is Holika Dahan?", hi: "होलिका दहन क्या है?" }, answer: { en: "Holika Dahan, on Phalguna Purnima, is the symbolic burning of the demoness Holika, representing the triumph of devotion over evil.", hi: "फाल्गुन पूर्णिमा पर होलिका दहन राक्षसी होलिका का प्रतीकात्मक दहन है, जो बुराई पर भक्ति की जीत का प्रतिनिधित्व करता है।" } },
      { question: { en: "Is Phalguna favorable for new ventures?", hi: "क्या फाल्गुन नए कार्यों के लिए अनुकूल है?" }, answer: { en: "It is generally favorable as it is within Uttarayana, though the festival mood of Holi often makes it better suited for concluding the year than initiating major projects.", hi: "यह सामान्यतः अनुकूल है क्योंकि यह उत्तरायण के भीतर है, हालांकि होली का उत्सवी मिजाज अक्सर इसे बड़े प्रोजेक्ट शुरू करने की तुलना में वर्ष समाप्त करने के लिए बेहतर बनाता है।" } },
      { question: { en: "Which nakshatra names Phalguna?", hi: "फाल्गुन का नामकरण किस नक्षत्र पर हुआ है?" }, answer: { en: "Phalguna is named after the Phalguni nakshatras (Purva Phalguni and Uttara Phalguni), near which the month's Purnima falls.", hi: "फाल्गुन का नाम फाल्गुनी नक्षत्रों (पूर्वा फाल्गुनी और उत्तरा फाल्गुनी) पर रखा गया है, जिसके निकट इस महीने की पूर्णिमा पड़ती है।" } },
    ],
    seo: { title: { en: "Phalguna Month — Holi, The Festival of Colors & The End of Lunar Year", hi: "फाल्गुन मास — होली, रंगों का त्योहार और चंद्र वर्ष का अंत" }, description: { en: "Explore Phalguna month: Holi, Holika Dahan, Shishira Ritu, naming nakshatra Phalguni, and the final month of the Hindu lunar year.", hi: "फाल्गुन मास के बारे में जानें: होली, होलिका दहन, शिशिर ऋतु, नामकरण नक्षत्र फाल्गुनी, और हिंदू चंद्र वर्ष का अंतिम महीना।" }, keywords: { en: ["Phalguna month", "Holi", "Holika Dahan", "Shishira Ritu", "last Hindu month"], hi: ["फाल्गुन मास", "होली", "होलिका दहन", "शिशिर ऋतु"] } },
    crossLinks: { pakshaSlug: "paksha", previousMonthSlug: "magha", nextMonthSlug: "chaitra" },
  },
} as Record<MonthSlug, HinduMonthDetail>;
