import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getPakshaSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "पक्ष (Paksha) क्या है?",
          a: "वैदिक पंचांग में, 'पक्ष' एक चंद्र पखवाड़े (15 दिन) की अवधि है, जो चंद्र मास के दो हिस्सों में से एक है।",
        },
        {
          q: "शुक्ल पक्ष और कृष्ण पक्ष में क्या अंतर है?",
          a: "शुक्ल पक्ष चंद्रमा के बढ़ने का चरण है (अमावस्या से पूर्णिमा), जबकि कृष्ण पक्ष चंद्रमा के घटने का चरण है (पूर्णिमा से अमावस्या)।",
        },
        {
          q: "पक्ष की गणना कैसे की जाती है?",
          a: "पक्ष की गणना सूर्य और चंद्रमा के बीच की कोणीय दूरी (Relative Position) के आधार पर की जाती है।",
        },
        {
          q: "पंचांग में पक्ष का क्या महत्व है?",
          a: "पक्ष चंद्र ऊर्जा को निर्धारित करता है और यह पंचांग में त्योहारों, उपवासों और मुहूर्त चयन का आधार है।",
        },
        {
          q: "कौन से हिंदू त्योहार पक्ष पर निर्भर करते हैं?",
          a: "अधिकांश हिंदू त्योहार तिथि और पक्ष के विशिष्ट संयोजन द्वारा निर्धारित किए जाते हैं, जैसे नवरात्रि या एकादशी व्रत।",
        },
      ]
    : [
        {
          q: "What is Paksha?",
          a: "In the Vedic Panchang, 'Paksha' refers to a lunar fortnight (15 days) period, representing one half of a lunar month.",
        },
        {
          q: "What is the difference between Shukla Paksha and Krishna Paksha?",
          a: "Shukla Paksha is the waxing phase of the Moon (from New Moon to Full Moon), while Krishna Paksha is the waning phase of the Moon (from Full Moon to New Moon).",
        },
        {
          q: "How is Paksha calculated?",
          a: "Paksha is calculated based on the angular distance (relative position) between the Sun and the Moon in the lunar cycle.",
        },
        {
          q: "Why is Paksha important in the Panchang?",
          a: "Paksha determines the lunar energy and forms the foundation for scheduling festivals, fasts, and Muhurat selections in the Panchang.",
        },
        {
          q: "Which Hindu festivals depend on Paksha?",
          a: "Most Hindu festivals, such as Navratri or Ekadashi, are determined by the specific combination of Tithi and Paksha.",
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
        name: isHi ? "पक्ष" : "Paksha",
        url: `${langPath}/paksha`,
      },
    ]),
  };
}
