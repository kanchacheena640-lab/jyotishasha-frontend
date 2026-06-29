import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getBhadraSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "भद्रा (विष्टि करण) क्या है?",
          a: "भद्रा, जिसे विष्टि करण भी कहा जाता है, पंचांग के 11 करणों में से एक है जो तिथि के आधे भाग में होता है।",
        },
        {
          q: "मुहूर्त चयन के दौरान भद्रा को क्यों देखा जाता है?",
          a: "मुहूर्त चयन के दौरान भद्रा को इसलिए देखा जाता है क्योंकि इसे पारंपरिक रूप से कुछ विशेष कार्यों के लिए सावधानी बरतने वाला माना जाता है।",
        },
        {
          q: "भद्रा के दौरान किन कार्यों को करने से बचने की सलाह दी जाती है?",
          a: "पारंपरिक रूप से भद्रा में महत्वपूर्ण कार्यों जैसे नए घर में प्रवेश या बड़े धार्मिक अनुष्ठानों के लिए सावधानी बरतने की सलाह दी जाती है।",
        },
        {
          q: "क्या भद्रा की हर अवधि एक समान होती है?",
          a: "नहीं, भद्रा के प्रभाव और उसकी अवधि पंचांग के अनुसार भिन्न हो सकती है, जो कि तिथि और नक्षत्र के संयोजन पर निर्भर करता है।",
        },
        {
          q: "पंचांग में भद्रा की गणना कैसे की जाती है?",
          a: "भद्रा की गणना पंचांग के करणों के निश्चित अनुक्रम के आधार पर की जाती है, जो कि तिथि के बदलाव के साथ बदलता है।",
        },
      ]
    : [
        {
          q: "What is Bhadra (Vishti Karana)?",
          a: "Bhadra, also known as Vishti Karana, is one of the 11 Karanas in the Panchang, which occurs during half of a Tithi.",
        },
        {
          q: "Why is Bhadra considered during Muhurat selection?",
          a: "Bhadra is considered during Muhurat selection because it is traditionally perceived as a period that requires caution for specific auspicious activities.",
        },
        {
          q: "Which activities are traditionally avoided during Bhadra?",
          a: "Traditionally, it is advised to exercise caution for important activities like entering a new home or performing major religious rituals during Bhadra.",
        },
        {
          q: "Is every Bhadra period considered the same?",
          a: "No, the impact and duration of Bhadra can vary based on the Panchang, depending on the specific combination of Tithi and Nakshatra.",
        },
        {
          q: "How is Bhadra calculated in the Panchang?",
          a: "Bhadra is calculated based on the fixed sequence of Karanas in the Panchang, which changes with the transition of Tithis.",
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
        name: isHi ? "भद्रा" : "Bhadra",
        url: `${langPath}/bhadra`,
      },
    ]),
  };
}
