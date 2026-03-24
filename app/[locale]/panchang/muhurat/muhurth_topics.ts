export interface MuhurthTopic {
  title: string;
  title_hi: string; // Mandatory for Hindi pages
  slug: string;
  activity: string;
  description: string;
  description_hi: string; // Mandatory for Hindi pages
  keywords: string[];
  canonical: string;
}

const baseTopics: Record<string, MuhurthTopic> = {
  "naamkaran-muhurat": {
    title: "Naamkaran Muhurat – Auspicious Baby Naming Dates",
    title_hi: "नामकरण मुहूर्त – नाम रखने के शुभ दिन",
    slug: "naamkaran-muhurat",
    activity: "naamkaran",
    description: "Find the most auspicious Naamkaran Muhurat dates based on Hindu Panchang and Nakshatra.",
    description_hi: "हिंदू पंचांग और नक्षत्र के आधार पर अपने बच्चे के लिए सबसे शुभ नामकरण मुहूर्त और तिथियां खोजें।",
    keywords: ["naamkaran muhurat", "baby naming dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/naamkaran-muhurat",
  },
  "marriage-muhurat": {
    title: "Marriage Muhurat – Shubh Vivah Dates",
    title_hi: "विवाह मुहूर्त – शुभ विवाह की तिथियां",
    slug: "marriage-muhurat",
    activity: "marriage",
    description: "Check monthly Shubh Vivah (Marriage) Muhurat dates as per Hindu Panchang and Nakshatra.",
    description_hi: "हिंदू पंचांग के अनुसार विवाह के लिए शुभ मुहूर्त, तिथियां और नक्षत्र की पूरी जानकारी यहाँ प्राप्त करें।",
    keywords: ["marriage muhurat", "vivah muhurat"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/marriage-muhurat",
  },
  "grah-pravesh-muhurat": {
    title: "Grah Pravesh Muhurat – Auspicious Housewarming Dates",
    title_hi: "गृह प्रवेश मुहूर्त – नए घर में प्रवेश के शुभ दिन",
    slug: "grah-pravesh-muhurat",
    activity: "grah_pravesh",
    description: "Discover monthly Grah Pravesh Muhurat for performing Griha Pravesh Puja.",
    description_hi: "अपने नए घर में प्रवेश और पूजा के लिए मासिक शुभ गृह प्रवेश मुहूर्त और तिथियां जानें।",
    keywords: ["grah pravesh", "housewarming dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/grah-pravesh-muhurat",
  },
  "vehicle-muhurat": {
    title: "Vehicle Muhurat – Auspicious Car or Bike Buying Dates",
    title_hi: "वाहन मुहूर्त – कार या बाइक खरीदने के शुभ दिन",
    slug: "vehicle-muhurat",
    activity: "vehicle",
    description: "Get monthly Shubh Muhurat for purchasing a new car, bike or vehicle.",
    description_hi: "नई कार, बाइक या किसी भी वाहन की खरीदारी के लिए हिंदू पंचांग के अनुसार शुभ मुहूर्त देखें।",
    keywords: ["vehicle muhurat", "car buying dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/vehicle-muhurat",
  },
  "child-birth-muhurat": {
    title: "Child Birth Muhurat – Auspicious Delivery & Ritual Dates",
    title_hi: "जन्म मुहूर्त – प्रसव और धार्मिक अनुष्ठान के शुभ दिन",
    slug: "child-birth-muhurat",
    activity: "childbirth",
    description: "Find auspicious Child Birth Muhurat and related ceremony dates.",
    description_hi: "हिंदू पंचांग के अनुसार बच्चे के जन्म और उससे जुड़े अनुष्ठानों के लिए शुभ मुहूर्त और तिथियां खोजें।",
    keywords: ["child birth muhurat", "janm muhurat"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/child-birth-muhurat",
  },
  "gold-buying-muhurat": {
    title: "Gold Buying Muhurat – Shubh Dates for Jewellery Purchase",
    title_hi: "स्वर्ण खरीदारी मुहूर्त – सोना खरीदने के शुभ दिन",
    slug: "gold-buying-muhurat",
    activity: "gold",
    description: "Explore auspicious Gold Buying Muhurat based on Hindu Panchang.",
    description_hi: "सोना, चांदी या गहनों की खरीदारी के लिए मासिक शुभ मुहूर्त और धनतेरस जैसी विशेष तिथियां जानें।",
    keywords: ["gold buying muhurat", "jewellery purchase"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/gold-buying-muhurat",
  },
  "foreign-travel-muhurat": {
    title: "Foreign Travel Muhurat – Auspicious Dates for Abroad Journeys",
    title_hi: "विदेश यात्रा मुहूर्त – विदेश जाने के शुभ दिन",
    slug: "foreign-travel-muhurat",
    activity: "travel",
    description: "Check Shubh Muhurat for starting foreign travel or study abroad.",
    description_hi: "विदेश यात्रा, पढ़ाई या बिजनेस ट्रिप शुरू करने के लिए हिंदू पंचांग के अनुसार शुभ यात्रा मुहूर्त देखें।",
    keywords: ["foreign travel muhurat", "travel dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/foreign-travel-muhurat",
  },
  "property-purchase-muhurat": {
    title: "Property Purchase Muhurat – Auspicious Dates for Land/House",
    title_hi: "संपत्ति खरीद मुहूर्त – ज़मीन या मकान खरीदने के शुभ दिन",
    slug: "property-purchase-muhurat",
    activity: "property",
    description: "Find the best Shubh Muhurat for buying or registering a new property.",
    description_hi: "नई संपत्ति, प्लॉट या मकान की रजिस्ट्री और खरीदारी के लिए सबसे शुभ मुहूर्त यहाँ देखें।",
    keywords: ["property muhurat", "land buying dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/property-purchase-muhurat",
  },
};

// Handle aliases and exports
export const muhurthTopics: Record<string, MuhurthTopic> = {
  ...baseTopics,
  "grahpravesh-muhurat": baseTopics["grah-pravesh-muhurat"],
};

export const GLOBAL_OG_IMAGE = "/og/muhurat-base.jpg";