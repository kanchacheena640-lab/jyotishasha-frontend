import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getAbhijitMuhuratSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "अभिजीत मुहूर्त क्या है?",
          a: "अभिजीत मुहूर्त वैदिक ज्योतिष में दोपहर के समय का एक अत्यंत शुभ काल है, जो महत्वपूर्ण कार्यों की शुरुआत के लिए श्रेष्ठ माना जाता है।",
        },
        {
          q: "क्या अभिजीत मुहूर्त हर कार्य के लिए शुभ है?",
          a: "अभिजीत मुहूर्त अत्यंत शुभ है, लेकिन यह विशेष रूप से महत्वपूर्ण कार्यों या जब कोई अन्य मुहूर्त उपलब्ध न हो, तब के लिए सर्वोत्तम है।",
        },
        {
          q: "राहु काल और अभिजीत मुहूर्त के टकराने पर क्या करें?",
          a: "यदि राहु काल और अभिजीत मुहूर्त एक ही समय पर हों, तो राहु काल के प्रभाव के कारण उस समय शुभ कार्यों से बचने की सलाह दी जाती है।",
        },
        {
          q: "क्या अभिजीत मुहूर्त का समय स्थान के अनुसार बदलता है?",
          a: "हाँ, अभिजीत मुहूर्त स्थानीय सूर्योदय और सूर्यास्त के समय पर आधारित होता है, इसलिए यह स्थान के अनुसार भिन्न हो सकता है।",
        },
        {
          q: "क्या अभिजीत मुहूर्त दैनिक छोटे कार्यों के लिए आवश्यक है?",
          a: "दैनिक छोटे कार्यों के लिए अभिजीत मुहूर्त आवश्यक नहीं है, यह मुख्य रूप से बड़े और महत्वपूर्ण कार्यों की शुरुआत के लिए उपयोग किया जाता है।",
        },
      ]
    : [
        {
          q: "What is Abhijit Muhurat?",
          a: "Abhijit Muhurat is a powerful auspicious period in Vedic astrology occurring around midday, ideal for commencing important tasks.",
        },
        {
          q: "Is Abhijit Muhurat favorable for all tasks?",
          a: "Abhijit Muhurat is highly auspicious, but it is best utilized for important projects or when no other specific Muhurat is available.",
        },
        {
          q: "What if Abhijit Muhurat overlaps with Rahu Kaal?",
          a: "If Abhijit Muhurat overlaps with Rahu Kaal, it is generally advised to prioritize Rahu Kaal and avoid new, important activities during that period.",
        },
        {
          q: "Does Abhijit Muhurat timing change by location?",
          a: "Yes, it is calculated based on local sunrise and sunset timings, so it varies depending on your geographic location.",
        },
        {
          q: "Is Abhijit Muhurat necessary for small daily tasks?",
          a: "It is not essential for routine daily chores; it is primarily recommended for commencing significant or high-stakes activities.",
        },
      ];

  return {
    faqSchema: buildFAQPageSchema(faqItems),

    breadcrumbSchema: buildBreadcrumbSchema([
      {
        name: isHi ? "होम" : "Home",
        url: isHi ? "/hi" : "/",
      },
      {
        name: isHi ? "पंचांग" : "Panchang",
        url: isHi ? "/hi/panchang" : "/panchang",
      },
      {
        name: isHi ? "अभिजीत मुहूर्त" : "Abhijit Muhurat",
        url: isHi ? "/hi/abhijit-muhurat" : "/abhijit-muhurat",
      },
    ]),
  };
}
