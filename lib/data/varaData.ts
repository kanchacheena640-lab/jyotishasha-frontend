export interface Multilingual {
  en: string;
  hi: string;
}

export interface VaraFAQ {
  question: Multilingual;
  answer: Multilingual;
}

export interface Activity {
  title: Multilingual;
  description: Multilingual;
}

export interface EntityDetail {
  slug: string;
  englishName: string;
  hindiName: string;
  displayName: Multilingual;
  shortDescription: Multilingual;
}

export interface VratDetail extends EntityDetail {
  overview: Multilingual;
}

export type VaraSlug =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface VaraDetail {
  basic: {
    slug: VaraSlug;
    englishName: string;
    hindiName: string;
    sanskritName: string;
    weekdayNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
  hero: {
    h1: Multilingual;
    description: Multilingual;
  };
  planet: EntityDetail;
  deity: EntityDetail;
  vrat: VratDetail;
  activities: {
    recommended: Activity[];
    avoided: Activity[];
  };
  muhurat: {
    title: Multilingual;
    description: Multilingual;
    content: Multilingual;
  };
  panchang: {
    title: Multilingual;
    description: Multilingual;
    content: Multilingual;
  };
  faq: VaraFAQ[];
  seo: {
    title: Multilingual;
    description: Multilingual;
  };
}

export const varaData: Record<VaraSlug, VaraDetail> = {
  sunday: {
    basic: { slug: "sunday", englishName: "Sunday", hindiName: "रविवार", sanskritName: "Ravivara", weekdayNumber: 1 },
    hero: {
      h1: { en: "Sunday | Significance in Vedic Astrology", hi: "रविवार | वैदिक ज्योतिष में रविवार का महत्व" },
      description: { en: "Sunday, governed by the Sun, is auspicious for leadership and new beginnings.", hi: "सूर्य द्वारा शासित रविवार, नेतृत्व और नए कार्यों की शुरुआत के लिए शुभ है।" },
    },
    planet: { slug: "sun", englishName: "Sun", hindiName: "सूर्य", displayName: { en: "Sun (Surya)", hi: "सूर्य" }, shortDescription: { en: "The central powerhouse governing soul and vitality.", hi: "आत्मा और जीवन शक्ति को नियंत्रित करने वाला केंद्रीय शक्ति केंद्र।" } },
    deity: { slug: "surya", englishName: "Surya Deva", hindiName: "सूर्य देव", displayName: { en: "Surya Deva", hi: "सूर्य देव" }, shortDescription: { en: "The cosmic eye and witness of all actions.", hi: "ब्रह्मांडीय आंख और सभी कार्यों के साक्षी।" } },
    vrat: { slug: "ravivar-vrat", englishName: "Ravivar Vrat", hindiName: "रविवार व्रत", displayName: { en: "Ravivar Vrat", hi: "रविवार व्रत" }, shortDescription: { en: "Fasting on Sunday for health and fame.", hi: "स्वास्थ्य और प्रसिद्धि के लिए रविवार का व्रत।" }, overview: { en: "Fasting on Sunday for health and fame.", hi: "स्वास्थ्य और प्रसिद्धि के लिए रविवार का व्रत।" } },
    activities: {
      recommended: [
        { title: { en: "Leadership", hi: "नेतृत्व" }, description: { en: "Initiating leadership tasks.", hi: "नेतृत्व के कार्यों की शुरुआत।" } },
        { title: { en: "Buying Gold", hi: "सोना खरीदना" }, description: { en: "Purchasing gold or valuables.", hi: "सोना या कीमती सामान खरीदना।" } },
      ],
      avoided: [
        { title: { en: "Salt intake", hi: "नमक का सेवन" }, description: { en: "Avoid salt during Vrat.", hi: "व्रत के दौरान नमक से बचें।" } },
      ],
    },
    muhurat: {
      title: { en: "Muhurat Impact", hi: "मुहूर्त प्रभाव" },
      description: { en: "Auspicious for leadership ventures.", hi: "नेतृत्व उद्यमों के लिए शुभ।" },
      content: { en: "Sunday is ideal for government-related tasks and leadership beginnings.", hi: "रविवार सरकारी कार्यों और नेतृत्व की शुरुआत के लिए आदर्श है।" },
    },
    panchang: {
      title: { en: "Panchang Context", hi: "पंचांग संदर्भ" },
      description: { en: "Solar influence on Panchang.", hi: "पंचांग पर सौर प्रभाव।" },
      content: { en: "Interaction of Vara with Tithi and Nakshatra highlights solar influence.", hi: "तिथि और नक्षत्र के साथ वार का मेल सौर प्रभाव को दर्शाता है।" },
    },
    faq: [
      { question: { en: "What is Sunday in Panchang?", hi: "पंचांग में रविवार क्या है?" }, answer: { en: "Sunday is the first day of the week, ruled by the Sun.", hi: "रविवार सप्ताह का पहला दिन है, जो सूर्य द्वारा शासित है।" } },
    ],
    seo: { title: { en: "Sunday Significance", hi: "रविवार का महत्व" }, description: { en: "Learn about Sunday, its ruling planet, and significance.", hi: "रविवार, इसके शासक ग्रह और महत्व के बारे में जानें।" } },
  },
  monday: {
    basic: { slug: "monday", englishName: "Monday", hindiName: "सोमवार", sanskritName: "Somavara", weekdayNumber: 2 },
    hero: {
      h1: { en: "Monday | Significance in Vedic Astrology", hi: "सोमवार | वैदिक ज्योतिष में सोमवार का महत्व" },
      description: { en: "Monday, governed by the Moon, is auspicious for creative and emotional tasks.", hi: "चंद्रमा द्वारा शासित सोमवार, रचनात्मक और भावनात्मक कार्यों के लिए शुभ है।" },
    },
    planet: { slug: "moon", englishName: "Moon", hindiName: "चंद्र", displayName: { en: "Moon (Chandra)", hi: "चंद्र" }, shortDescription: { en: "The planet governing emotions, mind, and intuition.", hi: "भावनाओं, मन और अंतर्ज्ञान को नियंत्रित करने वाला ग्रह।" } },
    deity: { slug: "shiva", englishName: "Lord Shiva", hindiName: "भगवान शिव", displayName: { en: "Lord Shiva", hi: "भगवान शिव" }, shortDescription: { en: "The supreme transformer and ascetic deity.", hi: "सर्वोच्च परिवर्तक और तपस्वी देवता।" } },
    vrat: { slug: "somvar-vrat", englishName: "Somvar Vrat", hindiName: "सोमवार व्रत", displayName: { en: "Somvar Vrat", hi: "सोमवार व्रत" }, shortDescription: { en: "Fasting on Monday for peace and clarity.", hi: "शांति और स्पष्टता के लिए सोमवार का व्रत।" }, overview: { en: "Fasting on Monday to seek blessings of Lord Shiva.", hi: "भगवान शिव का आशीर्वाद पाने के लिए सोमवार का व्रत।" } },
    activities: {
      recommended: [
        { title: { en: "Introspection", hi: "आत्म-चिंतन" }, description: { en: "Practicing meditation.", hi: "ध्यान का अभ्यास करना।" } },
        { title: { en: "Creative Arts", hi: "रचनात्मक कला" }, description: { en: "Engaging in creative hobbies.", hi: "रचनात्मक शौक में संलग्न होना।" } },
      ],
      avoided: [
        { title: { en: "Conflicts", hi: "विवाद" }, description: { en: "Avoid aggressive arguments.", hi: "आक्रामक तर्कों से बचें।" } },
      ],
    },
    muhurat: {
      title: { en: "Muhurat Impact", hi: "मुहूर्त प्रभाव" },
      description: { en: "Auspicious for emotional and creative tasks.", hi: "भावनात्मक और रचनात्मक कार्यों के लिए शुभ।" },
      content: { en: "Monday is ideal for travel, water-related activities, and new artistic beginnings.", hi: "सोमवार यात्रा, जल से संबंधित गतिविधियों और नई कलात्मक शुरुआत के लिए आदर्श है।" },
    },
    panchang: {
      title: { en: "Panchang Context", hi: "पंचांग संदर्भ" },
      description: { en: "Lunar influence on Panchang.", hi: "पंचांग पर चंद्र प्रभाव।" },
      content: { en: "Monday's energy is strongly tied to the lunar phase (Paksha) within the Panchang.", hi: "सोमवार की ऊर्जा पंचांग के भीतर चंद्र चरण (पक्ष) से मजबूती से जुड़ी है।" },
    },
    faq: [
      { question: { en: "What is Monday in Panchang?", hi: "पंचांग में सोमवार क्या है?" }, answer: { en: "Monday is the second day of the week, ruled by the Moon.", hi: "सोमवार सप्ताह का दूसरा दिन है, जो चंद्रमा द्वारा शासित है।" } },
    ],
    seo: { title: { en: "Monday Significance", hi: "सोमवार का महत्व" }, description: { en: "Learn about Monday, its ruling planet, and significance.", hi: "सोमवार, इसके शासक ग्रह और महत्व के बारे में जानें।" } },
  },
  tuesday: {
    basic: { slug: "tuesday", englishName: "Tuesday", hindiName: "मंगलवार", sanskritName: "Mangalvara", weekdayNumber: 3 },
    hero: {
      h1: { en: "Tuesday | Significance in Vedic Astrology", hi: "मंगलवार | वैदिक ज्योतिष में मंगलवार का महत्व" },
      description: { en: "Tuesday, governed by Mars, is auspicious for courageous and decisive actions.", hi: "मंगल द्वारा शासित मंगलवार, साहसी और निर्णायक कार्यों के लिए शुभ है।" },
    },
    planet: { slug: "mars", englishName: "Mars", hindiName: "मंगल", displayName: { en: "Mars (Mangal)", hi: "मंगल" }, shortDescription: { en: "The planet of courage, action, and energy.", hi: "साहस, कार्रवाई और ऊर्जा का ग्रह।" } },
    deity: { slug: "hanuman", englishName: "Lord Hanuman", hindiName: "भगवान हनुमान", displayName: { en: "Lord Hanuman", hi: "भगवान हनुमान" }, shortDescription: { en: "The epitome of strength, devotion, and courage.", hi: "शक्ति, भक्ति और साहस का प्रतीक।" } },
    vrat: { slug: "mangalvar-vrat", englishName: "Mangalvar Vrat", hindiName: "मंगलवार व्रत", displayName: { en: "Mangalvar Vrat", hi: "मंगलवार व्रत" }, shortDescription: { en: "Fasting on Tuesday for strength.", hi: "शक्ति के लिए मंगलवार का व्रत।" }, overview: { en: "Fasting on Tuesday to seek blessings of Lord Hanuman.", hi: "भगवान हनुमान का आशीर्वाद पाने के लिए मंगलवार का व्रत।" } },
    activities: {
      recommended: [
        { title: { en: "Physical Tasks", hi: "शारीरिक कार्य" }, description: { en: "Engaging in sports.", hi: "खेलों में संलग्न होना।" } },
        { title: { en: "Problem Solving", hi: "समस्या समाधान" }, description: { en: "Addressing technical issues.", hi: "तकनीकी समस्याओं का समाधान।" } },
      ],
      avoided: [
        { title: { en: "Impulsive Conflict", hi: "आवेगपूर्ण संघर्ष" }, description: { en: "Avoid unnecessary disputes.", hi: "अनावश्यक विवादों से बचें।" } },
      ],
    },
    muhurat: {
      title: { en: "Muhurat Impact", hi: "मुहूर्त प्रभाव" },
      description: { en: "Auspicious for courageous tasks.", hi: "साहसी कार्यों के लिए शुभ।" },
      content: { en: "Tuesday is ideal for property-related tasks and technical work.", hi: "मंगलवार संपत्ति संबंधी कार्यों और तकनीकी कार्यों के लिए आदर्श है।" },
    },
    panchang: {
      title: { en: "Panchang Context", hi: "पंचांग संदर्भ" },
      description: { en: "Mars influence on Panchang.", hi: "पंचांग पर मंगल का प्रभाव।" },
      content: { en: "Tuesday's energy reflects Mars' influence on Muhurat and daily activities.", hi: "मंगलवार की ऊर्जा मुहूर्त और दैनिक गतिविधियों पर मंगल के प्रभाव को दर्शाती है।" },
    },
    faq: [
      { question: { en: "What is Tuesday in Panchang?", hi: "पंचांग में मंगलवार क्या है?" }, answer: { en: "Tuesday is the third day of the week, ruled by Mars.", hi: "मंगलवार सप्ताह का तीसरा दिन है, जो मंगल द्वारा शासित है।" } },
    ],
    seo: { title: { en: "Tuesday Significance", hi: "मंगलवार का महत्व" }, description: { en: "Learn about Tuesday, its ruling planet, and significance.", hi: "मंगलवार, इसके शासक ग्रह और महत्व के बारे में जानें।" } },
  },
  wednesday: {
    basic: { slug: "wednesday", englishName: "Wednesday", hindiName: "बुधवार", sanskritName: "Budhvara", weekdayNumber: 4 },
    hero: {
      h1: { en: "Wednesday | Significance in Vedic Astrology", hi: "बुधवार | वैदिक ज्योतिष में बुधवार का महत्व" },
      description: { en: "Wednesday, governed by Mercury, is auspicious for intellect and business.", hi: "बुध द्वारा शासित बुधवार, बुद्धि और व्यापार के लिए शुभ है।" },
    },
    planet: { slug: "mercury", englishName: "Mercury", hindiName: "बुध", displayName: { en: "Mercury (Budh)", hi: "बुध" }, shortDescription: { en: "The planet of intelligence, communication, and commerce.", hi: "बुद्धि, संचार और वाणिज्य का ग्रह।" } },
    deity: { slug: "ganesha", englishName: "Lord Ganesha", hindiName: "भगवान गणेश", displayName: { en: "Lord Ganesha", hi: "भगवान गणेश" }, shortDescription: { en: "The remover of obstacles and lord of wisdom.", hi: "विघ्नहर्ता और बुद्धि के देवता।" } },
    vrat: { slug: "budhvar-vrat", englishName: "Budhvar Vrat", hindiName: "बुधवार व्रत", displayName: { en: "Budhvar Vrat", hi: "बुधवार व्रत" }, shortDescription: { en: "Fasting on Wednesday for knowledge.", hi: "ज्ञान के लिए बुधवार का व्रत।" }, overview: { en: "Fasting on Wednesday to seek blessings of Lord Ganesha.", hi: "भगवान गणेश का आशीर्वाद पाने के लिए बुधवार का व्रत।" } },
    activities: {
      recommended: [
        { title: { en: "Business", hi: "व्यापार" }, description: { en: "Starting new business ventures.", hi: "नए व्यावसायिक उद्यम शुरू करना।" } },
        { title: { en: "Learning", hi: "सीखना" }, description: { en: "Engaging in study or writing.", hi: "अध्ययन या लेखन में संलग्न होना।" } },
      ],
      avoided: [
        { title: { en: "Property Investment", hi: "संपत्ति निवेश" }, description: { en: "Avoid major real estate investments (per some traditions).", hi: "प्रमुख अचल संपत्ति निवेश से बचें (कुछ परंपराओं के अनुसार)।" } },
      ],
    },
    muhurat: {
      title: { en: "Muhurat Impact", hi: "मुहूर्त प्रभाव" },
      description: { en: "Auspicious for intellectual and business tasks.", hi: "बौद्धिक और व्यावसायिक कार्यों के लिए शुभ।" },
      content: { en: "Wednesday is ideal for communication, business dealings, and educational beginnings.", hi: "बुधवार संचार, व्यावसायिक लेनदेन और शैक्षिक शुरुआत के लिए आदर्श है।" },
    },
    panchang: {
      title: { en: "Panchang Context", hi: "पंचांग संदर्भ" },
      description: { en: "Mercury influence on Panchang.", hi: "पंचांग पर बुध का प्रभाव।" },
      content: { en: "Wednesday's energy highlights Mercury's role in Panchang and daily communication.", hi: "बुधवार की ऊर्जा पंचांग और दैनिक संचार में बुध की भूमिका को उजागर करती है।" },
    },
    faq: [
      { question: { en: "What is Wednesday in Panchang?", hi: "पंचांग में बुधवार क्या है?" }, answer: { en: "Wednesday is the fourth day of the week, ruled by Mercury.", hi: "बुधवार सप्ताह का चौथा दिन है, जो बुध द्वारा शासित है।" } },
    ],
    seo: { title: { en: "Wednesday Significance", hi: "बुधवार का महत्व" }, description: { en: "Learn about Wednesday, its ruling planet, and significance.", hi: "बुधवार, इसके शासक ग्रह और महत्व के बारे में जानें।" } },
  },
  thursday: {
    basic: { slug: "thursday", englishName: "Thursday", hindiName: "गुरुवार", sanskritName: "Guruvara", weekdayNumber: 5 },
    hero: {
      h1: { en: "Thursday | Significance in Vedic Astrology", hi: "गुरुवार | वैदिक ज्योतिष में गुरुवार का महत्व" },
      description: { en: "Thursday, governed by Jupiter, is auspicious for learning and spiritual growth.", hi: "गुरु द्वारा शासित गुरुवार, शिक्षा और आध्यात्मिक विकास के लिए शुभ है।" },
    },
    planet: { slug: "jupiter", englishName: "Jupiter", hindiName: "गुरु", displayName: { en: "Jupiter (Guru)", hi: "गुरु" }, shortDescription: { en: "The planet of wisdom, knowledge, and expansion.", hi: "बुद्धि, ज्ञान और विस्तार का ग्रह।" } },
    deity: { slug: "vishnu", englishName: "Lord Vishnu", hindiName: "भगवान विष्णु", displayName: { en: "Lord Vishnu", hi: "भगवान विष्णु" }, shortDescription: { en: "The preserver of the universe.", hi: "ब्रह्मांड के संरक्षक।" } },
    vrat: { slug: "guruvar-vrat", englishName: "Guruvar Vrat", hindiName: "गुरुवार व्रत", displayName: { en: "Guruvar Vrat", hi: "गुरुवार व्रत" }, shortDescription: { en: "Fasting on Thursday for wisdom.", hi: "ज्ञान के लिए गुरुवार का व्रत।" }, overview: { en: "Fasting on Thursday to seek blessings of Lord Vishnu.", hi: "भगवान विष्णु का आशीर्वाद पाने के लिए गुरुवार का व्रत।" } },
    activities: {
      recommended: [
        { title: { en: "Learning", hi: "सीखना" }, description: { en: "Teaching or studying.", hi: "शिक्षण या अध्ययन करना।" } },
        { title: { en: "Spiritual Tasks", hi: "आध्यात्मिक कार्य" }, description: { en: "Performing spiritual rituals.", hi: "आध्यात्मिक अनुष्ठान करना।" } },
      ],
      avoided: [
        { title: { en: "Neglecting wisdom", hi: "ज्ञान की उपेक्षा" }, description: { en: "Avoid ignoring traditional wisdom.", hi: "पारंपरिक ज्ञान की उपेक्षा करने से बचें।" } },
      ],
    },
    muhurat: {
      title: { en: "Muhurat Impact", hi: "मुहूर्त प्रभाव" },
      description: { en: "Auspicious for spiritual and educational tasks.", hi: "आध्यात्मिक और शैक्षिक कार्यों के लिए शुभ।" },
      content: { en: "Thursday is ideal for religious ceremonies, education, and financial planning.", hi: "गुरुवार धार्मिक अनुष्ठानों, शिक्षा और वित्तीय योजना के लिए आदर्श है।" },
    },
    panchang: {
      title: { en: "Panchang Context", hi: "पंचांग संदर्भ" },
      description: { en: "Jupiter influence on Panchang.", hi: "पंचांग पर गुरु का प्रभाव।" },
      content: { en: "Thursday's energy reflects Jupiter's role in Panchang and spiritual growth.", hi: "गुरुवार की ऊर्जा पंचांग और आध्यात्मिक विकास में गुरु की भूमिका को दर्शाती है।" },
    },
    faq: [
      { question: { en: "What is Thursday in Panchang?", hi: "पंचांग में गुरुवार क्या है?" }, answer: { en: "Thursday is the fifth day of the week, ruled by Jupiter.", hi: "गुरुवार सप्ताह का पांचवां दिन है, जो गुरु द्वारा शासित है।" } },
    ],
    seo: { title: { en: "Thursday Significance", hi: "गुरुवार का महत्व" }, description: { en: "Learn about Thursday, its ruling planet, and significance.", hi: "गुरुवार, इसके शासक ग्रह और महत्व के बारे में जानें।" } },
  },
  friday: {
    basic: { slug: "friday", englishName: "Friday", hindiName: "शुक्रवार", sanskritName: "Shukravara", weekdayNumber: 6 },
    hero: {
      h1: { en: "Friday | Significance in Vedic Astrology", hi: "शुक्रवार | वैदिक ज्योतिष में शुक्रवार का महत्व" },
      description: { en: "Friday, governed by Venus, is auspicious for arts and relationships.", hi: "शुक्र द्वारा शासित शुक्रवार, कला और रिश्तों के लिए शुभ है।" },
    },
    planet: { slug: "venus", englishName: "Venus", hindiName: "शुक्र", displayName: { en: "Venus (Shukra)", hi: "शुक्र" }, shortDescription: { en: "The planet of love, beauty, and luxury.", hi: "प्रेम, सुंदरता और विलासिता का ग्रह।" } },
    deity: { slug: "lakshmi", englishName: "Goddess Lakshmi", hindiName: "देवी लक्ष्मी", displayName: { en: "Goddess Lakshmi", hi: "देवी लक्ष्मी" }, shortDescription: { en: "The goddess of wealth and prosperity.", hi: "धन और समृद्धि की देवी।" } },
    vrat: { slug: "shukravar-vrat", englishName: "Shukravar Vrat", hindiName: "शुक्रवार व्रत", displayName: { en: "Shukravar Vrat", hi: "शुक्रवार व्रत" }, shortDescription: { en: "Fasting on Friday for prosperity.", hi: "समृद्धि के लिए शुक्रवार का व्रत।" }, overview: { en: "Fasting on Friday to seek blessings of Goddess Lakshmi.", hi: "देवी लक्ष्मी का आशीर्वाद पाने के लिए शुक्रवार का व्रत।" } },
    activities: {
      recommended: [
        { title: { en: "Creative Arts", hi: "रचनात्मक कला" }, description: { en: "Engaging in art or music.", hi: "कला या संगीत में संलग्न होना।" } },
        { title: { en: "Socializing", hi: "सामाजिक मेलजोल" }, description: { en: "Planning relationships or events.", hi: "रिश्तों या घटनाओं की योजना बनाना।" } },
      ],
      avoided: [
        { title: { en: "Extreme austerity", hi: "अत्यधिक तपस्या" }, description: { en: "Avoid excessive austerity.", hi: "अत्यधिक तपस्या से बचें।" } },
      ],
    },
    muhurat: {
      title: { en: "Muhurat Impact", hi: "मुहूर्त प्रभाव" },
      description: { en: "Auspicious for creative and relationship tasks.", hi: "रचनात्मक और संबंध कार्यों के लिए शुभ।" },
      content: { en: "Friday is ideal for beauty-related tasks, luxury, and social beginnings.", hi: "शुक्रवार सुंदरता से संबंधित कार्यों, विलासिता और सामाजिक शुरुआत के लिए आदर्श है।" },
    },
    panchang: {
      title: { en: "Panchang Context", hi: "पंचांग संदर्भ" },
      description: { en: "Venus influence on Panchang.", hi: "पंचांग पर शुक्र का प्रभाव।" },
      content: { en: "Friday's energy highlights Venus' role in Panchang and aesthetic pursuits.", hi: "शुक्रवार की ऊर्जा पंचांग और सौंदर्य संबंधी कार्यों में शुक्र की भूमिका को उजागर करती है।" },
    },
    faq: [
      { question: { en: "What is Friday in Panchang?", hi: "पंचांग में शुक्रवार क्या है?" }, answer: { en: "Friday is the sixth day of the week, ruled by Venus.", hi: "शुक्रवार सप्ताह का छठा दिन है, जो शुक्र द्वारा शासित है।" } },
    ],
    seo: { title: { en: "Friday Significance", hi: "शुक्रवार का महत्व" }, description: { en: "Learn about Friday, its ruling planet, and significance.", hi: "शुक्रवार, इसके शासक ग्रह और महत्व के बारे में जानें।" } },
  },
  saturday: {
    basic: { slug: "saturday", englishName: "Saturday", hindiName: "शनिवार", sanskritName: "Shanivara", weekdayNumber: 7 },
    hero: {
      h1: { en: "Saturday | Significance in Vedic Astrology", hi: "शनिवार | वैदिक ज्योतिष में शनिवार का महत्व" },
      description: { en: "Saturday, governed by Saturn, is auspicious for discipline and long-term goals.", hi: "शनि द्वारा शासित शनिवार, अनुशासन और दीर्घकालिक लक्ष्यों के लिए शुभ है।" },
    },
    planet: { slug: "saturn", englishName: "Saturn", hindiName: "शनि", displayName: { en: "Saturn (Shani)", hi: "शनि" }, shortDescription: { en: "The planet of discipline, justice, and karma.", hi: "अनुशासन, न्याय और कर्म का ग्रह।" } },
    deity: { slug: "shani", englishName: "Lord Shani", hindiName: "भगवान शनि", displayName: { en: "Lord Shani", hi: "भगवान शनि" }, shortDescription: { en: "The god of justice and karma.", hi: "न्याय और कर्म के देवता।" } },
    vrat: { slug: "shanivar-vrat", englishName: "Shanivar Vrat", hindiName: "शनिवार व्रत", displayName: { en: "Shanivar Vrat", hi: "शनिवार व्रत" }, shortDescription: { en: "Fasting on Saturday for discipline.", hi: "अनुशासन के लिए शनिवार का व्रत।" }, overview: { en: "Fasting on Saturday to seek blessings of Lord Shani.", hi: "भगवान शनि का आशीर्वाद पाने के लिए शनिवार का व्रत।" } },
    activities: {
      recommended: [
        { title: { en: "Completion", hi: "पूर्णता" }, description: { en: "Finishing long-term tasks.", hi: "दीर्घकालिक कार्यों को पूरा करना।" } },
        { title: { en: "Charity", hi: "दान" }, description: { en: "Doing charitable work.", hi: "दान का कार्य करना।" } },
      ],
      avoided: [
        { title: { en: "Carelessness", hi: "लापरवाही" }, description: { en: "Avoid carelessness or arrogance.", hi: "लापरवाही या अहंकार से बचें।" } },
      ],
    },
    muhurat: {
      title: { en: "Muhurat Impact", hi: "मुहूर्त प्रभाव" },
      description: { en: "Auspicious for disciplined and long-term tasks.", hi: "अनुशासित और दीर्घकालिक कार्यों के लिए शुभ।" },
      content: { en: "Saturday is ideal for hard work, structural planning, and finishing long-pending tasks.", hi: "शनिवार कड़ी मेहनत, संरचनात्मक योजना और लंबित कार्यों को पूरा करने के लिए आदर्श है।" },
    },
    panchang: {
      title: { en: "Panchang Context", hi: "पंचांग संदर्भ" },
      description: { en: "Saturn influence on Panchang.", hi: "पंचांग पर शनि का प्रभाव।" },
      content: { en: "Saturday's energy highlights Saturn's role in Panchang and karmic balance.", hi: "शनिवार की ऊर्जा पंचांग और कर्म संतुलन में शनि की भूमिका को दर्शाती है।" },
    },
    faq: [
      { question: { en: "What is Saturday in Panchang?", hi: "पंचांग में शनिवार क्या है?" }, answer: { en: "Saturday is the seventh day of the week, ruled by Saturn.", hi: "शनिवार सप्ताह का सातवां दिन है, जो शनि द्वारा शासित है।" } },
    ],
    seo: { title: { en: "Saturday Significance", hi: "शनिवार का महत्व" }, description: { en: "Learn about Saturday, its ruling planet, and significance.", hi: "शनिवार, इसके शासक ग्रह और महत्व के बारे में जानें।" } },
  },
};
