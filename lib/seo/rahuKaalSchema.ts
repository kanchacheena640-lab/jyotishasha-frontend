import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export function getRahuKaalSchemas(isHi: boolean) {
  const faqItems = isHi
    ? [
        {
          q: "राहु काल का समय कैसे ज्ञात करें?",
          a: "राहु काल की गणना स्थानीय सूर्योदय और सूर्यास्त के समय के आधार पर की जाती है। हमारे पंचांग पृष्ठ पर आप अपने शहर के अनुसार आज का सटीक राहु काल देख सकते हैं।",
        },
        {
          q: "क्या राहु काल में यात्रा करना वर्जित है?",
          a: "राहु काल में महत्वपूर्ण यात्राएं शुरू करने से बचने की सलाह दी जाती है। हालांकि, यदि यात्रा अपरिहार्य हो, तो आप यात्रा शुरू कर सकते हैं।",
        },
        {
          q: "राहु काल में कौन से कार्य नहीं करने चाहिए?",
          a: "राहु काल के दौरान नया व्यवसाय शुरू करने, बड़े निवेश करने, नया घर या वाहन खरीदने, या महत्वपूर्ण व्यावसायिक समझौतों पर हस्ताक्षर करने से बचने की सलाह दी जाती है।",
        },
        {
          q: "क्या राहु काल में भोजन करना वर्जित है?",
          a: "नहीं, राहु काल दैनिक दिनचर्या के कार्यों जैसे भोजन करना, काम पर जाना या घर के सामान्य कार्यों पर लागू नहीं होता है।",
        },
        {
          q: "राहु काल का मुख्य उद्देश्य क्या है?",
          a: "राहु काल का उपयोग मुख्य रूप से महत्वपूर्ण कार्यों के लिए एक शुभ समय का चयन करने में सावधानी बरतने के लिए किया जाता है।",
        },
      ]
    : [
        {
          q: "How to find Rahu Kaal timings?",
          a: "Rahu Kaal is calculated based on local sunrise and sunset timings. You can check today's accurate Rahu Kaal for your city on our Panchang page.",
        },
        {
          q: "Is it forbidden to travel during Rahu Kaal?",
          a: "It is generally advised to avoid starting important journeys during Rahu Kaal. However, if travel is unavoidable, it may be necessary to proceed.",
        },
        {
          q: "Which activities should be avoided during Rahu Kaal?",
          a: "It is advised to avoid initiating new business ventures, making major investments, buying a new house or vehicle, or signing important business contracts during Rahu Kaal.",
        },
        {
          q: "Is eating food forbidden during Rahu Kaal?",
          a: "No, Rahu Kaal does not restrict routine daily activities such as eating, going to work, or household chores.",
        },
        {
          q: "What is the main purpose of Rahu Kaal?",
          a: "Rahu Kaal is primarily consulted to exercise caution and avoid scheduling important tasks during an inauspicious period.",
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
        name: isHi ? "राहु काल" : "Rahu Kaal",
        url: isHi ? "/hi/rahu-kaal" : "/rahu-kaal",
      },
    ]),
  };
}
