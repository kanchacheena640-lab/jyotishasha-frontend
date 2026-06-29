import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getChoghadiyaSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "चौघड़िया क्या है?",
          a: "चौघड़िया हिंदू पंचांग की पारंपरिक समय-गणना प्रणाली है जिसमें दिन और रात को आठ-आठ भागों में विभाजित कर शुभ एवं अशुभ समय निर्धारित किया जाता है।",
        },
        {
          q: "सबसे शुभ चौघड़िया कौन सा होता है?",
          a: "अमृत, शुभ और लाभ चौघड़िया सबसे शुभ माने जाते हैं।",
        },
        {
          q: "क्या चौघड़िया प्रतिदिन बदलता है?",
          a: "हाँ। चौघड़िया सूर्योदय और सूर्यास्त के समय के आधार पर प्रतिदिन बदलता है।",
        },
        {
          q: "क्या राहु काल भी देखना चाहिए?",
          a: "हाँ। शुभ चौघड़िया होने पर भी राहु काल में नए कार्य प्रारम्भ करने से बचना चाहिए।",
        },
        {
          q: "अभिजीत मुहूर्त क्यों महत्वपूर्ण है?",
          a: "अभिजीत मुहूर्त दिन का अत्यंत शुभ समय माना जाता है और महत्वपूर्ण कार्यों की शुरुआत के लिए उपयोग किया जाता है।",
        },
        {
          q: "क्या चौघड़िया और मुहूर्त अलग हैं?",
          a: "हाँ। चौघड़िया दैनिक शुभ समय बताता है, जबकि मुहूर्त किसी विशेष कार्य के लिए विस्तृत पंचांग गणना पर आधारित होता है।",
        },
        {
          q: "क्या रात का चौघड़िया भी उपयोगी होता है?",
          a: "हाँ। सूर्यास्त के बाद होने वाले कार्यों के लिए रात्रि चौघड़िया देखा जाता है।",
        },
        {
          q: "चौघड़िया का उपयोग किन कार्यों में किया जाता है?",
          a: "यात्रा, व्यापार, निवेश, नए कार्य, खरीदारी तथा अन्य महत्वपूर्ण दैनिक कार्यों के लिए चौघड़िया देखा जाता है।",
        },
      ]
    : [
        {
          q: "What is Choghadiya?",
          a: "Choghadiya is a traditional Hindu time division system used to identify auspicious and inauspicious periods during the day and night.",
        },
        {
          q: "Which Choghadiya is considered most auspicious?",
          a: "Amrit, Shubh and Labh are considered the most auspicious Choghadiya periods.",
        },
        {
          q: "Does Choghadiya change every day?",
          a: "Yes. Choghadiya timings are calculated from local sunrise and sunset and therefore change every day.",
        },
        {
          q: "Should Rahu Kaal also be considered?",
          a: "Yes. Even during a favourable Choghadiya, Rahu Kaal is generally avoided for starting important activities.",
        },
        {
          q: "Why is Abhijit Muhurat important?",
          a: "Abhijit Muhurat is regarded as one of the most auspicious periods of the day for beginning important work.",
        },
        {
          q: "Is Choghadiya different from Muhurat?",
          a: "Yes. Choghadiya provides general daily auspicious timings, while Muhurat is calculated specifically for a particular event using multiple Panchang elements.",
        },
        {
          q: "Can Night Choghadiya also be used?",
          a: "Yes. Night Choghadiya is used for selecting favourable timings for activities performed after sunset.",
        },
        {
          q: "What is Choghadiya commonly used for?",
          a: "It is commonly used for travel, business, investments, purchases, starting new work and other important daily activities.",
        },
      ];

  return {
    faqSchema: buildFAQPageSchema(faqItems),

    breadcrumbSchema: buildBreadcrumbSchema([
      {
        name: isHi ? "Home" : "Home",
        url: isHi ? "/hi" : "/",
      },
      {
        name: isHi ? "Panchang" : "Panchang",
        url: isHi ? "/hi/panchang" : "/panchang",
      },
      {
        name: isHi ? "Choghadiya" : "Choghadiya",
        url: isHi ? "/hi/choghadiya" : "/choghadiya",
      },
    ]),
  };
}