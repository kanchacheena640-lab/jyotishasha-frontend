import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getKaranaSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "पंचांग में करण (Karana) क्या है?",
          a: "करण, पंचांग के पांच अंगों में से एक है। एक तिथि के आधे भाग को 'करण' कहा जाता है।",
        },
        {
          q: "पंचांग में कुल कितने करण होते हैं?",
          a: "पंचांग में कुल 11 करण होते हैं, जिनमें 7 चर (आवर्ती) और 4 स्थिर (ध्रुव) करण शामिल हैं।",
        },
        {
          q: "करण की गणना कैसे की जाती है?",
          a: "पंचांग की गणना में, एक तिथि को दो बराबर भागों में विभाजित किया जाता है, और प्रत्येक भाग को एक करण के रूप में माना जाता है।",
        },
        {
          q: "मुहूर्त चयन में करण क्यों महत्वपूर्ण है?",
          a: "मुहूर्त चयन में करण का महत्वपूर्ण स्थान है क्योंकि यह समय की अनुकूलता को जांचने और शुभ कार्यों की योजना बनाने में मदद करता है।",
        },
        {
          q: "करण और भद्रा (विष्टि करण) में क्या संबंध है?",
          a: "विष्टि करण, 11 करणों में से एक है जिसे पारंपरिक रूप से 'भद्रा' के नाम से जाना जाता है और मुहूर्त चयन में इस पर विशेष ध्यान दिया जाता है।",
        },
      ]
    : [
        {
          q: "What is Karana in the Panchang?",
          a: "Karana is one of the five limbs of the Panchang. One half of a Tithi (lunar day) is called a 'Karana'.",
        },
        {
          q: "How many Karanas are there?",
          a: "There are 11 Karanas in the Panchang, consisting of 7 recurring (movable) and 4 fixed (Dhruva) Karanas.",
        },
        {
          q: "How is Karana calculated?",
          a: "In Panchang calculations, one Tithi is divided into two equal halves, and each half is considered as one Karana.",
        },
        {
          q: "Why is Karana important in Muhurat?",
          a: "Karana is important in Muhurat selection because it helps in evaluating the favorability of time and planning auspicious tasks effectively.",
        },
        {
          q: "What is the relationship between Karana and Bhadra (Vishti Karana)?",
          a: "Vishti Karana is one of the 11 Karanas, traditionally known as 'Bhadra', which receives special consideration during Muhurat selection.",
        },
      ];

  const langPath = isHi ? "/hi" : "";

  return {
    faqSchema: buildFAQPageSchema(faqItems),

    breadcrumbSchema: buildBreadcrumbSchema([
      {
        name: isHi ? "होम" : "Home",
        url: langPath || "/",
      },
      {
        name: isHi ? "पंचांग" : "Panchang",
        url: `${langPath}/panchang`,
      },
      {
        name: isHi ? "करण" : "Karana",
        url: `${langPath}/karana`,
      },
    ]),
  };
}
