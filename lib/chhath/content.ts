// lib/chhath/content.ts
//
// Static bilingual content for /chhath-puja and /hi/chhath-puja.
// Kept to widely documented practice (four-day sequence, Surya and Chhathi
// Maiya, the nirjala fast, the two Arghyas). No origin myths, health or
// result promises. Dates and times are never written here -- they come only
// from the API response ({year} placeholders are filled by the page).

import type { ChhathDayKey, ChhathLanguage } from "./api";

type L = Record<ChhathLanguage, string>;

export const CHHATH_PATH = "/chhath-puja";

export const CHHATH_SEO = {
  title: {
    en: "Chhath Puja {year} Date: Nahay Khay, Kharna, Sandhya & Usha Arghya Time",
    hi: "छठ पूजा {year} तिथि: नहाय खाय, खरना, संध्या और उषा अर्घ्य का समय",
  } as L,
  description: {
    en: "Chhath Puja {year} dates for Nahay Khay, Kharna, Sandhya Arghya and Usha Arghya, with sunrise and sunset Arghya timings in IST for Patna and other Indian cities.",
    hi: "छठ पूजा {year} में नहाय खाय, खरना, संध्या अर्घ्य और उषा अर्घ्य की तिथियाँ तथा पटना व अन्य भारतीय शहरों के लिए सूर्योदय-सूर्यास्त अर्घ्य समय (IST)।",
  } as L,
};

export const CHHATH_HERO = {
  h1: {
    en: "Chhath Puja {year}: Dates and Arghya Timings",
    hi: "छठ पूजा {year}: तिथियाँ और अर्घ्य समय",
  } as L,
  intro: {
    en: "Chhath Puja, also called Surya Shashthi, is a four-day observance dedicated to Surya (the Sun) and Chhathi Maiya, centred on Kartik Shukla Shashthi. Choose your city to see local sunrise, sunset and Arghya timings.",
    hi: "छठ पूजा, जिसे सूर्य षष्ठी भी कहते हैं, सूर्य देव और छठी मैया को समर्पित चार दिनों का व्रत है, जिसका मुख्य दिन कार्तिक शुक्ल षष्ठी है। अपने शहर का चयन करके स्थानीय सूर्योदय, सूर्यास्त और अर्घ्य का समय देखें।",
  } as L,
};

export const CHHATH_DAY_COPY: Record<ChhathDayKey, { step: L; summary: L }> = {
  nahay_khay: {
    step: { en: "Day 1", hi: "पहला दिन" },
    summary: {
      en: "Vratis take a purifying bath, clean the home and eat a single sattvic meal, traditionally without onion or garlic.",
      hi: "व्रती पवित्र स्नान करते हैं, घर की साफ़-सफ़ाई होती है और बिना लहसुन-प्याज़ का एक समय सात्विक भोजन ग्रहण किया जाता है।",
    },
  },
  kharna: {
    step: { en: "Day 2", hi: "दूसरा दिन" },
    summary: {
      en: "A day-long fast ends in the evening with prasad of jaggery kheer and roti. The nirjala fast (without water) begins after Kharna.",
      hi: "दिनभर के उपवास के बाद शाम को गुड़ की खीर और रोटी का प्रसाद ग्रहण किया जाता है। खरना के बाद निर्जला व्रत आरंभ होता है।",
    },
  },
  sandhya_arghya: {
    step: { en: "Day 3", hi: "तीसरा दिन" },
    summary: {
      en: "In the evening, devotees stand in a river or pond and offer Arghya to the setting Sun with baskets of thekua, fruits and sugarcane.",
      hi: "शाम को श्रद्धालु नदी या तालाब में खड़े होकर ठेकुआ, फल और गन्ने से सजे सूप-दौरे के साथ डूबते सूर्य को अर्घ्य देते हैं।",
    },
  },
  usha_arghya: {
    step: { en: "Day 4", hi: "चौथा दिन" },
    summary: {
      en: "Before dawn, devotees return to the water to offer Arghya to the rising Sun. The vrat is then completed with prasad (parana).",
      hi: "भोर से पहले श्रद्धालु फिर जल में खड़े होकर उगते सूर्य को अर्घ्य देते हैं। इसके बाद प्रसाद ग्रहण कर व्रत का पारण किया जाता है।",
    },
  },
};

export interface ChhathSection {
  id: string;
  title: L;
  paragraphs: L[];
}

export const CHHATH_SECTIONS: ChhathSection[] = [
  {
    id: "about",
    title: { en: "What is Chhath Puja?", hi: "छठ पूजा क्या है?" },
    paragraphs: [
      {
        en: "Chhath Puja is observed on the Shashthi (sixth) tithi of the Shukla Paksha of Kartik, a few days after Diwali. Devotees worship Surya, the Sun, as the sustainer of life, along with Chhathi Maiya, and pray for the well-being of their family and children.",
        hi: "छठ पूजा कार्तिक मास के शुक्ल पक्ष की षष्ठी तिथि को, दीपावली के कुछ दिन बाद मनाई जाती है। श्रद्धालु जीवन के आधार सूर्य देव और छठी मैया की उपासना करते हैं तथा परिवार और संतान के कल्याण की कामना करते हैं।",
      },
      {
        en: "The festival is most widely observed in Bihar, Jharkhand, eastern Uttar Pradesh and the Terai region of Nepal, and by these communities across India and abroad. It is known for its emphasis on purity, discipline and offerings made directly to the Sun at riverbanks and water bodies.",
        hi: "यह पर्व मुख्य रूप से बिहार, झारखंड, पूर्वी उत्तर प्रदेश और नेपाल के तराई क्षेत्र में तथा देश-विदेश में बसे इन समुदायों द्वारा मनाया जाता है। शुद्धता, अनुशासन और नदी-घाटों पर सीधे सूर्य को अर्घ्य देना इस पर्व की विशेष पहचान है।",
      },
    ],
  },
  {
    id: "vrat",
    title: { en: "The Chhath Vrat", hi: "छठ व्रत" },
    paragraphs: [
      {
        en: "The person observing the vrat is called a vrati. After the Kharna prasad on the second evening, the vrati keeps a nirjala fast, without food or water, through the evening Arghya until the morning Arghya on the fourth day, which is commonly described as about 36 hours.",
        hi: "व्रत रखने वाले को व्रती कहा जाता है। दूसरे दिन शाम को खरना का प्रसाद ग्रहण करने के बाद व्रती संध्या अर्घ्य से होते हुए चौथे दिन के उषा अर्घ्य तक बिना अन्न-जल के निर्जला व्रत रखते हैं, जिसे सामान्यतः लगभग 36 घंटे का व्रत कहा जाता है।",
      },
      {
        en: "Prasad is prepared at home with special care for cleanliness. Thekua, rice laddoo, seasonal fruits, sugarcane and coconut are commonly arranged in bamboo baskets (soop and daura) for the Arghya.",
        hi: "प्रसाद घर पर विशेष शुद्धता के साथ तैयार किया जाता है। अर्घ्य के लिए बांस के सूप और दौरे में ठेकुआ, चावल के लड्डू, मौसमी फल, गन्ना और नारियल सजाए जाते हैं।",
      },
    ],
  },
  {
    id: "timings",
    title: { en: "How Dates and Arghya Times Are Calculated", hi: "तिथि और अर्घ्य समय की गणना कैसे होती है" },
    paragraphs: [
      {
        en: "The Sandhya Arghya day is the day on which Kartik Shukla Shashthi prevails at sunrise, calculated for Patna as the reference location. Nahay Khay and Kharna fall on the two days before it, and Usha Arghya on the following morning. Adhik (extra) months are excluded.",
        hi: "संध्या अर्घ्य का दिन वह दिन है जिस दिन सूर्योदय के समय कार्तिक शुक्ल षष्ठी तिथि हो — इसकी गणना पटना को संदर्भ स्थान मानकर की जाती है। नहाय खाय और खरना इससे पहले के दो दिनों में तथा उषा अर्घ्य अगली सुबह होता है। अधिक मास को इसमें शामिल नहीं किया जाता।",
      },
      {
        en: "The festival dates stay the same whichever city you choose. Only the sunrise, sunset and Arghya times change with your location. All times are shown in Indian Standard Time (IST).",
        hi: "शहर बदलने पर पर्व की तिथियाँ नहीं बदलतीं — केवल सूर्योदय, सूर्यास्त और अर्घ्य का समय आपके स्थान के अनुसार बदलता है। सभी समय भारतीय मानक समय (IST) में दिए गए हैं।",
      },
      {
        en: "Chhath is also observed in Chaitra as Chaiti Chhath. This page covers the Kartik Chhath.",
        hi: "चैत्र मास में भी छठ मनाई जाती है, जिसे चैती छठ कहते हैं। यह पृष्ठ कार्तिक छठ के लिए है।",
      },
    ],
  },
];

export const CHHATH_UI = {
  calendarTitle: { en: "Chhath Puja {year} Calendar", hi: "छठ पूजा {year} कैलेंडर" } as L,
  cityLabel: { en: "City", hi: "शहर" } as L,
  yearLabel: { en: "Year", hi: "वर्ष" } as L,
  sunrise: { en: "Sunrise", hi: "सूर्योदय" } as L,
  sunset: { en: "Sunset", hi: "सूर्यास्त" } as L,
  tithiAtSunrise: { en: "Tithi at sunrise", hi: "सूर्योदय पर तिथि" } as L,
  sandhyaArghyaTime: { en: "Sandhya Arghya (sunset)", hi: "संध्या अर्घ्य (सूर्यास्त)" } as L,
  ushaArghyaTime: { en: "Usha Arghya (sunrise)", hi: "उषा अर्घ्य (सूर्योदय)" } as L,
  lunarMonth: { en: "Lunar month", hi: "चंद्र मास" } as L,
  shashthiWindow: { en: "Shashthi tithi", hi: "षष्ठी तिथि" } as L,
  timesNote: {
    en: "Times shown for {city} in IST. Festival dates follow the Patna reference.",
    hi: "{city} के लिए समय IST में। पर्व की तिथियाँ पटना संदर्भ के अनुसार।",
  } as L,
  loading: { en: "Loading Chhath timings…", hi: "छठ का समय लोड हो रहा है…" } as L,
  errorTitle: { en: "Chhath timings could not be loaded", hi: "छठ का समय लोड नहीं हो सका" } as L,
  errorBody: {
    en: "We could not reach the Panchang service right now. Please try again.",
    hi: "अभी पंचांग सेवा से संपर्क नहीं हो सका। कृपया दोबारा प्रयास करें।",
  } as L,
  retry: { en: "Try again", hi: "दोबारा प्रयास करें" } as L,
  variationTitle: { en: "Panchang note", hi: "पंचांग संबंधी सूचना" } as L,
  variationBody: {
    en: "This year the Shashthi tithi begins or ends close to sunrise, so some regional Panchangs may list a different date. The dates above follow the sunrise Shashthi rule for Patna.",
    hi: "इस वर्ष षष्ठी तिथि सूर्योदय के निकट आरंभ या समाप्त हो रही है, इसलिए कुछ क्षेत्रीय पंचांगों में तिथि अलग हो सकती है। ऊपर दी गई तिथियाँ पटना के लिए सूर्योदय-षष्ठी नियम पर आधारित हैं।",
  } as L,
  variationAlt: {
    en: "Some calendars list Sandhya Arghya on {dates}.",
    hi: "कुछ पंचांगों में संध्या अर्घ्य {dates} को दिया गया है।",
  } as L,
  variationAdvice: {
    en: "Please follow your local Panchang or family tradition.",
    hi: "कृपया अपने स्थानीय पंचांग या पारिवारिक परंपरा का पालन करें।",
  } as L,
  faqTitle: { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले सवाल" } as L,
  relatedTitle: { en: "Related", hi: "संबंधित" } as L,
};

/** Appended to date-bearing FAQ answers in needs_review years. */
export const CHHATH_FAQ_REVIEW_SUFFIX: L = {
  en: " Some regional Panchangs may list a different date this year; please follow your local Panchang or family tradition.",
  hi: " इस वर्ष कुछ क्षेत्रीय पंचांगों में तिथि अलग हो सकती है; कृपया अपने स्थानीय पंचांग या पारिवारिक परंपरा का पालन करें।",
};

export interface ChhathFaq {
  q: L;
  /** {year}, {nahay}, {kharna}, {sandhya}, {usha}, {sandhyaTime}, {ushaTime} are filled from API data. */
  a: L;
  /** Answer needs API data; without data the fallback answer is used. */
  needsData?: boolean;
  fallback?: L;
  /** Append CHHATH_FAQ_REVIEW_SUFFIX when the API status is needs_review. */
  reviewSensitive?: boolean;
}

export const CHHATH_FAQS: ChhathFaq[] = [
  {
    q: { en: "When is Chhath Puja in {year}?", hi: "{year} में छठ पूजा कब है?" },
    a: {
      en: "For {year}, Nahay Khay is on {nahay}, Kharna on {kharna}, Sandhya Arghya on {sandhya} and Usha Arghya on {usha}, calculated for the Patna reference.",
      hi: "{year} में नहाय खाय {nahay}, खरना {kharna}, संध्या अर्घ्य {sandhya} और उषा अर्घ्य {usha} को है (पटना संदर्भ के अनुसार गणना)।",
    },
    needsData: true,
    reviewSensitive: true,
    fallback: {
      en: "Chhath Puja falls on Kartik Shukla Shashthi, about a week after Diwali. Nahay Khay and Kharna are on the two days before it, and Usha Arghya on the next morning.",
      hi: "छठ पूजा कार्तिक शुक्ल षष्ठी को, दीपावली के लगभग एक सप्ताह बाद मनाई जाती है। नहाय खाय और खरना इससे पहले के दो दिनों में तथा उषा अर्घ्य अगली सुबह होता है।",
    },
  },
  {
    q: { en: "What are the four days of Chhath Puja?", hi: "छठ पूजा के चार दिन कौन से हैं?" },
    a: {
      en: "Day 1 is Nahay Khay (purifying bath and a sattvic meal), Day 2 is Kharna (day-long fast ending with jaggery kheer prasad), Day 3 is Sandhya Arghya to the setting Sun, and Day 4 is Usha Arghya to the rising Sun, followed by parana.",
      hi: "पहला दिन नहाय खाय (पवित्र स्नान और सात्विक भोजन), दूसरा दिन खरना (दिनभर उपवास और शाम को गुड़ की खीर का प्रसाद), तीसरा दिन डूबते सूर्य को संध्या अर्घ्य और चौथा दिन उगते सूर्य को उषा अर्घ्य, जिसके बाद पारण होता है।",
    },
  },
  {
    q: { en: "What is the Sandhya and Usha Arghya time?", hi: "संध्या और उषा अर्घ्य का समय क्या है?" },
    a: {
      en: "Arghya is offered at sunset on the third day and at sunrise on the fourth day, so the time depends on your city. In Patna for {year}, sunset on Sandhya Arghya day is at {sandhyaTime} and sunrise on Usha Arghya day is at {ushaTime} (IST).",
      hi: "अर्घ्य तीसरे दिन सूर्यास्त पर और चौथे दिन सूर्योदय पर दिया जाता है, इसलिए समय आपके शहर पर निर्भर करता है। {year} में पटना में संध्या अर्घ्य के दिन सूर्यास्त {sandhyaTime} और उषा अर्घ्य के दिन सूर्योदय {ushaTime} (IST) पर है।",
    },
    needsData: true,
    fallback: {
      en: "Arghya is offered at sunset on the third day and at sunrise on the fourth day, so the exact time depends on your city's sunset and sunrise.",
      hi: "अर्घ्य तीसरे दिन सूर्यास्त पर और चौथे दिन सूर्योदय पर दिया जाता है, इसलिए सही समय आपके शहर के सूर्यास्त और सूर्योदय पर निर्भर करता है।",
    },
  },
  {
    q: { en: "Which deities are worshipped in Chhath Puja?", hi: "छठ पूजा में किसकी पूजा होती है?" },
    a: {
      en: "Chhath Puja is dedicated to Surya, the Sun, and to Chhathi Maiya. Devotees offer Arghya to the setting and the rising Sun.",
      hi: "छठ पूजा सूर्य देव और छठी मैया को समर्पित है। श्रद्धालु डूबते और उगते सूर्य को अर्घ्य देते हैं।",
    },
  },
  {
    q: { en: "What is offered on Kharna?", hi: "खरना में क्या प्रसाद बनता है?" },
    a: {
      en: "On Kharna the vrati fasts through the day and, in the evening, prepares and takes prasad of kheer made with jaggery, along with roti. The nirjala fast begins after this prasad.",
      hi: "खरना के दिन व्रती दिनभर उपवास रखते हैं और शाम को गुड़ की खीर व रोटी का प्रसाद बनाकर ग्रहण करते हैं। इसी प्रसाद के बाद निर्जला व्रत शुरू होता है।",
    },
  },
  {
    q: { en: "Why can Chhath dates differ between calendars?", hi: "अलग-अलग पंचांगों में छठ की तिथि अलग क्यों हो सकती है?" },
    a: {
      en: "The date depends on when Shashthi tithi prevails at sunrise. When the tithi begins or ends very close to sunrise, Panchangs using different calculation methods or locations can list different days. In such years, follow your local Panchang or family tradition.",
      hi: "तिथि इस पर निर्भर करती है कि सूर्योदय के समय षष्ठी तिथि है या नहीं। जब तिथि सूर्योदय के बहुत निकट आरंभ या समाप्त होती है, तो अलग गणना पद्धति या स्थान वाले पंचांगों में दिन अलग हो सकता है। ऐसे वर्षों में अपने स्थानीय पंचांग या पारिवारिक परंपरा का पालन करें।",
    },
  },
  {
    q: { en: "Is Chhath also celebrated in Chaitra?", hi: "क्या चैत्र में भी छठ मनाई जाती है?" },
    a: {
      en: "Yes. Chaiti Chhath is observed on Chaitra Shukla Shashthi with the same four-day sequence. The dates on this page are for the Kartik Chhath.",
      hi: "हाँ। चैती छठ चैत्र शुक्ल षष्ठी को इसी चार दिवसीय क्रम के साथ मनाई जाती है। इस पृष्ठ पर दी गई तिथियाँ कार्तिक छठ की हैं।",
    },
  },
];

export const CHHATH_RELATED_LINKS: { href: string; label: L }[] = [
  { href: "/vrat-tyohar", label: { en: "Vrat & Tyohar", hi: "व्रत और त्योहार" } },
  { href: "/hindu-months/kartika", label: { en: "Kartika Month", hi: "कार्तिक मास" } },
  { href: "/panchang/tithi/shashthi", label: { en: "Shashthi Tithi", hi: "षष्ठी तिथि" } },
  { href: "/ekadashi", label: { en: "Ekadashi", hi: "एकादशी" } },
];

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match
  );
}
