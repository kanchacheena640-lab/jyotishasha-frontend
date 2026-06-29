import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getYogaSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "पंचांग में कुल कितने योग होते हैं?",
          a: "पंचांग में कुल 27 नित्य (दैनिक) योग होते हैं, जो सूर्य और चंद्रमा की स्थिति के आधार पर बदलते हैं।",
        },
        {
          q: "योग की गणना कैसे की जाती है?",
          a: "योग की गणना सूर्य और चंद्रमा के देशांतर (Longitudes) को जोड़ने पर प्राप्त योगफल से की जाती है।",
        },
        {
          q: "क्या सभी योग शुभ होते हैं?",
          a: "पंचांग में कुछ योग अत्यंत शुभ माने जाते हैं, जबकि कुछ योग विशिष्ट कार्यों के लिए चुनौतीपूर्ण हो सकते हैं।",
        },
        {
          q: "क्या योग का दैनिक कार्यों पर प्रभाव पड़ता है?",
          a: "हां, योग दिन की अंतर्निहित ऊर्जा को प्रभावित करता है, जो विभिन्न कार्यों के लिए इसकी अनुकूलता को निर्धारित करने में मदद करता है।",
        },
        {
          q: "यात्रा के लिए योग का महत्व क्या है?",
          a: "शुभ योग में यात्रा करना यात्रा की सफलता और सुरक्षा के लिए सहायक माना जाता है।",
        },
      ]
    : [
        {
          q: "How many Yogas are there in Panchang?",
          a: "There are 27 Nithya (daily) Yogas in the Panchang, which change based on the positions of the Sun and the Moon.",
        },
        {
          q: "How is Yoga calculated?",
          a: "Yoga is calculated from the total sum of the celestial longitudes of the Sun and the Moon.",
        },
        {
          q: "Are all Yogas auspicious?",
          a: "In the Panchang, some Yogas are considered highly auspicious, while others may be challenging for specific activities.",
        },
        {
          q: "Does Yoga impact daily activities?",
          a: "Yes, Yoga influences the inherent energy of the day, helping to determine its suitability for various tasks.",
        },
        {
          q: "What is the importance of Yoga for travel?",
          a: "Traveling during an auspicious Yoga is considered helpful for the success and safety of the journey.",
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
        name: isHi ? "योग" : "Yoga",
        url: `${langPath}/yoga`,
      },
    ]),
  };
}
