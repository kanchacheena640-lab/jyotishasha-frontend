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
    description: "Explore month-wise Naamkaran Muhurat dates. View auspicious baby naming dates selected through Panchang analysis of Tithi, Nakshatra, Lagna and traditional Naamkaran Muhurat principles.",
    description_hi: "हिंदू पंचांग और नक्षत्र के आधार पर अपने बच्चे के लिए सबसे शुभ नामकरण मुहूर्त और तिथियां खोजें।",
    keywords: ["naamkaran muhurat", "baby naming dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/naamkaran-muhurat",
  },
  "marriage-muhurat": {
    title: "Marriage Muhurat – Shubh Vivah Dates",
    title_hi: "विवाह मुहूर्त – शुभ विवाह की तिथियां",
    slug: "marriage-muhurat",
    activity: "marriage",
    description: "Explore month-wise Marriage Muhurat dates. View auspicious wedding dates selected through Panchang analysis of Tithi, Nakshatra, Lagna and traditional Vivah Muhurat principles.",
    description_hi: "हिंदू पंचांग के अनुसार विवाह के लिए शुभ मुहूर्त, तिथियां और नक्षत्र की पूरी जानकारी यहाँ प्राप्त करें।",
    keywords: ["marriage muhurat", "vivah muhurat"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/marriage-muhurat",
  },
  "grah-pravesh-muhurat": {
    title: "Grah Pravesh Muhurat – Auspicious Housewarming Dates",
    title_hi: "गृह प्रवेश मुहूर्त – नए घर में प्रवेश के शुभ दिन",
    slug: "grah-pravesh-muhurat",
    activity: "grah_pravesh",
    description: "Explore month-wise Grah Pravesh Muhurat dates. Find auspicious housewarming dates selected through Panchang analysis for entering a new home and performing Griha Pravesh ceremonies.",
    description_hi: "अपने नए घर में प्रवेश और पूजा के लिए मासिक शुभ गृह प्रवेश मुहूर्त और तिथियां जानें।",
    keywords: ["grah pravesh", "housewarming dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/grah-pravesh-muhurat",
  },
  "vehicle-muhurat": {
    title: "Vehicle Muhurat – Auspicious Car or Bike Buying Dates",
    title_hi: "वाहन मुहूर्त – कार या बाइक खरीदने के शुभ दिन",
    slug: "vehicle-muhurat",
    activity: "vehicle",
    description: "Explore month-wise Vehicle Purchase Muhurat dates. View auspicious dates for buying a new car, bike or vehicle based on Panchang and Muhurat principles.",
    description_hi: "नई कार, बाइक या किसी भी वाहन की खरीदारी के लिए हिंदू पंचांग के अनुसार शुभ मुहूर्त देखें।",
    keywords: ["vehicle muhurat", "car buying dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/vehicle-muhurat",
  },
  "child-birth-muhurat": {
    title: "Child Birth Muhurat – Auspicious Delivery & Ritual Dates",
    title_hi: "बच्चे के जन्म का शुभ मुहूर्त – Hindu Panchang के अनुसार",
    slug: "child-birth-muhurat",
    activity: "childbirth",
    description: "Child Birth Muhurat holds deep significance in Vedic astrology, as the moment of birth is believed to shape a newborn's destiny, health, and life path. While the exact timing of delivery cannot always be controlled, classical Jyotish texts emphasize choosing auspicious Muhurats for related rituals such as Jatakarma, the first welcoming ceremony, Naamkaran or formal naming, and other early Samskaras performed shortly after birth. These rites are traditionally timed using careful analysis of Tithi, Nakshatra, Yoga, Karana, and weekday, ensuring the ceremony aligns harmoniously with favorable planetary positions. Performing these rituals during a well-chosen Muhurat is believed to strengthen the child's horoscope, reduce inauspicious influences, and invite blessings of health, longevity, and prosperity. Families often consult a Panchang or astrologer to identify the most beneficial dates, avoiding inauspicious Tithis like Chaturthi, Ashtami, and Amavasya. Many parents also use this guidance to plan medically scheduled deliveries, such as elective C-sections, aligning the baby's birth chart with favorable cosmic timing for a strong start in life.",
    description_hi: "वैदिक ज्योतिष में शिशु के जन्म का मुहूर्त अत्यंत महत्वपूर्ण माना जाता है, क्योंकि जन्म का क्षण बच्चे के भाग्य, स्वास्थ्य और जीवन-मार्ग को आकार देता है। यद्यपि वास्तविक प्रसव का समय पूरी तरह नियंत्रित नहीं किया जा सकता, शास्त्रों में जातकर्म, नामकरण और अन्य प्रारंभिक संस्कारों के लिए शुभ मुहूर्त चुनने पर विशेष बल दिया जाता है। ये संस्कार तिथि, नक्षत्र, योग, करण और वार के सावधानीपूर्वक विश्लेषण के आधार पर निश्चित किए जाते हैं, ताकि अनुष्ठान ग्रहों की अनुकूल स्थिति के साथ सामंजस्य में हों। उचित मुहूर्त में ये संस्कार करने से बच्चे की कुंडली मजबूत होती है, अशुभ प्रभाव कम होते हैं, और स्वास्थ्य, दीर्घायु व समृद्धि का आशीर्वाद मिलता है। माता-पिता और परिवार अक्सर सबसे शुभ तिथि व समय जानने के लिए पंचांग या ज्योतिषी से सलाह लेते हैं, विशेष रूप से चतुर्थी, अष्टमी और अमावस्या जैसी अशुभ तिथियों से बचते हुए। आधुनिक समय में कई परिवार नियोजित प्रसव, जैसे सिजेरियन डिलीवरी, के लिए भी जन्म मुहूर्त का मार्गदर्शन लेते हैं ताकि बच्चे की कुंडली शुभ समय के साथ संरेखित हो सके।",
    keywords: ["child birth muhurat", "janm muhurat", "बच्चे के जन्म का शुभ मुहूर्त"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/child-birth-muhurat",
  },
  "gold-buying-muhurat": {
    title: "Gold Buying Muhurat – Shubh Dates for Jewellery Purchase",
    title_hi: "स्वर्ण खरीदारी मुहूर्त – सोना खरीदने के शुभ दिन",
    slug: "gold-buying-muhurat",
    activity: "gold",
    description: "Explore month-wise Gold Buying Muhurat dates. Find auspicious dates for purchasing gold, silver or jewellery based on Panchang and Muhurat principles.",
    description_hi: "सोना, चांदी या गहनों की खरीदारी के लिए मासिक शुभ मुहूर्त और धनतेरस जैसी विशेष तिथियां जानें।",
    keywords: ["gold buying muhurat", "jewellery purchase"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/gold-buying-muhurat",
  },
  "foreign-travel-muhurat": {
    title: "Foreign Travel Muhurat – Auspicious Dates for Abroad Journeys",
    title_hi: "विदेश यात्रा मुहूर्त – विदेश जाने के शुभ दिन",
    slug: "foreign-travel-muhurat",
    activity: "travel",
    description: "Explore month-wise Foreign Travel Muhurat dates. Find auspicious dates for starting foreign travel or study abroad based on Panchang and Muhurat principles.",
    description_hi: "विदेश यात्रा, पढ़ाई या बिजनेस ट्रिप शुरू करने के लिए हिंदू पंचांग के अनुसार शुभ यात्रा मुहूर्त देखें।",
    keywords: ["foreign travel muhurat", "travel dates"],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/foreign-travel-muhurat",
  },
  "property-purchase-muhurat": {
    title: "Property Purchase Muhurat – Auspicious Dates for Land/House",
    title_hi: "संपत्ति खरीद मुहूर्त – ज़मीन या मकान खरीदने के शुभ दिन",
    slug: "property-purchase-muhurat",
    activity: "property",
    description: "Explore month-wise Property Purchase Muhurat dates. Find auspicious dates for purchasing land, plots, houses and property registration based on Panchang calculations.",
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