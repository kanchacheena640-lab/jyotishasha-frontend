import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getPanchakSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "पंचक क्या है?",
          a: "पंचक पांच दिनों की एक अवधि है जब चंद्रमा कुंभ और मीन राशि में विशिष्ट नक्षत्रों से होकर गुजरता है।",
        },
        {
          q: "पंचक किन नक्षत्रों से बनता है?",
          a: "पंचक धनिष्ठा (अंतिम दो चरण), शतभिषा, पूर्वा भाद्रपद, उत्तरा भाद्रपद और रेवती नक्षत्रों के समूह से बनता है।",
        },
        {
          q: "क्या मुहूर्त निकालते समय पंचक का ध्यान रखा जाता है?",
          a: "हां, महत्वपूर्ण कार्यों के लिए मुहूर्त निकालते समय पंचक की स्थिति पर विचार किया जाता है ताकि कार्य निर्विघ्न संपन्न हों।",
        },
        {
          q: "पंचक के दौरान कौन से कार्य करने से बचने की सलाह दी जाती है?",
          a: "पारंपरिक रूप से पंचक में नए घर का निर्माण, छत डालना और लंबी दूरी की यात्रा जैसे महत्वपूर्ण कार्यों से बचने की सलाह दी जाती है।",
        },
        {
          q: "क्या पंचक सभी क्षेत्रों में समान रूप से माना जाता है?",
          a: "नहीं, पंचक को लेकर मान्यताएं और परंपराएं क्षेत्रीय आधार पर भिन्न हो सकती हैं।",
        },
      ]
    : [
        {
          q: "What is Panchak?",
          a: "Panchak is a five-day period during which the Moon transits through specific Nakshatras in Aquarius and Pisces.",
        },
        {
          q: "Which Nakshatras form Panchak?",
          a: "Panchak is formed by the group of Dhanishta (last two padas), Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, and Revati Nakshatras.",
        },
        {
          q: "Is Panchak considered while calculating Muhurat?",
          a: "Yes, the status of Panchak is considered when calculating Muhurat for important tasks to ensure they proceed without obstacles.",
        },
        {
          q: "Which activities are traditionally avoided during Panchak?",
          a: "Traditionally, it is advised to avoid important activities like starting construction of a new house, laying a roof, or long-distance travel during Panchak.",
        },
        {
          q: "Is Panchak observed in all regions?",
          a: "No, beliefs and traditions regarding Panchak can vary on a regional basis.",
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
        name: isHi ? "पंचक" : "Panchak",
        url: `${langPath}/panchak`,
      },
    ]),
  };
}
