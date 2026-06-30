import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getVaraSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "पंचांग में वार (Vara) क्या है?",
          a: "वार पंचांग के पांच मुख्य अंगों में से एक है, जो वैदिक प्रणाली में सप्ताह के सात दिनों को दर्शाता है।",
        },
        {
          q: "वार का निर्धारण कैसे किया जाता है?",
          a: "वार का निर्धारण प्रत्येक दिन के स्वामी ग्रह के आधार पर किया जाता है, जो वैदिक ज्योतिषीय गणनाओं के अनुसार निश्चित है।",
        },
        {
          q: "कौन सा ग्रह किस वार का स्वामी है?",
          a: "प्रत्येक वार एक ग्रह द्वारा शासित होता है (जैसे रविवार-सूर्य, सोमवार-चंद्र, मंगलवार-मंगल, बुधवार-बुध, गुरुवार-गुरु, शुक्रवार-शुक्र, शनिवार-शनि)।",
        },
        {
          q: "मुहूर्त में वार क्यों महत्वपूर्ण है?",
          a: "मुहूर्त चयन में वार का महत्व इसलिए है क्योंकि प्रत्येक दिन की ऊर्जा विशिष्ट कार्यों के लिए अनुकूल या प्रतिकूल हो सकती है।",
        },
        {
          q: "दैनिक पंचांग में वार का उपयोग कैसे होता है?",
          a: "दैनिक पंचांग में वार का उपयोग दिन के शासक ग्रह, अधिष्ठाता देवता और विशिष्ट व्रतों की पहचान करने के लिए किया जाता है।",
        },
      ]
    : [
        {
          q: "What is Vara in the Panchang?",
          a: "Vara is one of the five main limbs of the Panchang, representing the seven days of the week in the Vedic system.",
        },
        {
          q: "How is Vara determined?",
          a: "Vara is determined based on the ruling planet of each day, which is fixed according to Vedic astrological calculations.",
        },
        {
          q: "Which planet rules each weekday?",
          a: "Each weekday is ruled by a planet (e.g., Sunday-Sun, Monday-Moon, Tuesday-Mars, Wednesday-Mercury, Thursday-Jupiter, Friday-Venus, Saturday-Saturn).",
        },
        {
          q: "Why is Vara important in Muhurat?",
          a: "Vara is important in Muhurat selection because the energy of each day can be either favorable or unfavorable for specific activities.",
        },
        {
          q: "How is Vara used in daily Panchang?",
          a: "In the daily Panchang, Vara is used to identify the ruling planet of the day, the presiding deity, and the appropriate traditional fasts or observances.",
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
        name: isHi ? "वार" : "Vara",
        url: `${langPath}/vara`,
      },
    ]),
  };
}
