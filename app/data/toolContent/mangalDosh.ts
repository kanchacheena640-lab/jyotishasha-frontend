// Mangal Dosh calculator content (EN + HI), rendered on the server by components/tools/mangal-dosh/MangalDoshLanding.tsx.
// Every statement here describes what the calculator actually does (services/mangalik_dosh_logic.py, unchanged):
//   * Mars is checked from the Lagna AND from the Moon, in the 1st, 2nd, 4th, 7th, 8th and 12th houses (whole-sign
//     house count) -- each reference that applies is one trigger (0, 1 or 2);
//   * three cancellation conditions are checked: Mars in its own or exaltation sign (Aries, Scorpio, Capricorn);
//     Jupiter in a Kendra (1/4/7/10) from the Lagna or the Moon; Jupiter's aspect on Mars or Jupiter in the same sign;
//   * each condition present offsets one trigger -> None / Cancelled / Partial / Strong.
// No remedies, percentages or outcome promises. Titles are unchanged from the live page.

export const mangalDoshContent = {
  toolId: "mangal-dosh",

  en: {
    seo: {
      title: "Mangal Dosh Calculator – Accurate Manglik Dosha Check | Vedic Astrology",
      description:
        "Free Mangal Dosh calculator: enter your birth details to see where Mars sits from your Lagna and Moon, your Manglik status and which of three classical cancellation conditions apply.",
      keywords: [
        "mangal dosh calculator",
        "check manglik dosha online",
        "mangal dosha in kundali",
        "am I manglik astrology",
        "manglik dosha cancellation",
        "mangal dosh marriage",
      ],
    },

    landing: {
      breadcrumb: { home: "Home", tools: "Tools", current: "Mangal Dosh Calculator" },
      h1: "Mangal Dosh Calculator",
      intro:
        "Find out whether your birth chart has Mangal Dosh (Manglik Dosha). Enter your date, time and place of birth to see where Mars sits from your Lagna and your Moon, your Manglik status, and which of the three classical cancellation conditions apply to your chart.",
      method: "Calculated with the Swiss Ephemeris and Lahiri Ayanamsa.",
      submitLabel: "Check Mangal Dosh — Free",
      shows: {
        h2: "What the Free Result Shows",
        items: [
          { title: "Manglik status", body: "Not Manglik, Mangal Dosh cancelled, partial or present — graded from your own chart." },
          { title: "Mars from Lagna and Moon", body: "The house Mars occupies counted from your Lagna and from your Moon sign." },
          { title: "Jupiter's position", body: "Jupiter's house from your Lagna and Moon, which decides one of the cancellation checks." },
          { title: "Three cancellation checks", body: "Each classical condition marked as present or not present in your chart." },
        ],
      },
      how: {
        h2: "How Mangal Dosh Is Checked",
        body: [
          "Mangal Dosh is traditionally read when Mars occupies the 1st, 2nd, 4th, 7th, 8th or 12th house of the birth chart. These houses relate to the self, family, home, marriage, longevity and the bed of the couple.",
          "The calculator checks this twice: from your Lagna (Ascendant) and from your Moon sign. Each reference where Mars falls in one of these houses counts once, so a chart can show Mangal Dosh from neither, one or both.",
          "Houses are counted by whole sign. Your birth time matters because the Lagna changes roughly every two hours, and the Lagna decides which house Mars occupies.",
        ],
      },
      cancel: {
        h2: "The Three Cancellation Conditions We Check",
        intro: "Classical texts describe conditions that soften or cancel Mangal Dosh. The calculator checks these three:",
        items: [
          { title: "Mars in its own or exaltation sign", body: "Mars placed in Aries or Scorpio (its own signs) or Capricorn (its exaltation sign)." },
          { title: "Jupiter in a Kendra", body: "Jupiter in the 1st, 4th, 7th or 10th house from your Lagna or from your Moon." },
          { title: "Jupiter's influence on Mars", body: "Jupiter aspecting Mars, or Jupiter placed in the same sign as Mars." },
        ],
        grading: {
          h3: "How the result is graded",
          rows: [
            { label: "Not Manglik", body: "Mars is not in these houses from either the Lagna or the Moon." },
            { label: "Mangal Dosh cancelled", body: "Mars triggers the dosha, and the cancellation conditions present offset every trigger." },
            { label: "Partial", body: "One trigger remains after the cancellation conditions are counted." },
            { label: "Present", body: "Both triggers remain — Mars from the Lagna and from the Moon — with no condition offsetting them." },
          ],
        },
      },
      marriage: {
        h2: "Mangal Dosh in Marriage Matching",
        body:
          "Traditionally Mangal Dosh is weighed by comparing both partners' charts rather than one chart alone — two charts with similar Mars energy are read as balancing each other. Free Kundli Matching compares Mangal Dosh across both charts alongside the 36 Guna Milan score.",
        links: [
          { href: "/kundli-matching", label: "Free Kundli Matching (36 Guna Milan)" },
          { href: "/marriage-astrology/compatibility", label: "Marriage compatibility guide" },
        ],
      },
      houses: {
        h2: "Mars in Each House",
        body: "Read what Mars means in each house of the birth chart. The houses marked here are the ones Mangal Dosh is read from.",
        tag: "Mangal Dosh house",
        label: (n: string) => `Mars in the ${n} house`,
      },
      faqH2: "Frequently Asked Questions",
      related: {
        h2: "Related Marriage Guides",
        links: [
          { href: "/marriage-astrology", label: "Marriage Astrology", note: "Every marriage question, free tools and reports" },
          { href: "/kundli-matching", label: "Free Kundli Matching", note: "36 Guna Milan and Mangal Dosh for both partners" },
          { href: "/marriage-astrology/delayed-marriage", label: "Why Is My Marriage Delayed?", note: "The chart factors read for a later marriage" },
          { href: "/marriage-astrology/married-life", label: "Will My Married Life Be Happy?", note: "What a birth chart says about married life" },
        ],
      },
    },

    faq: [
      {
        q: "What is Mangal Dosh?",
        a: "Mangal Dosh (also called Manglik or Kuja Dosha) is read when Mars occupies the 1st, 2nd, 4th, 7th, 8th or 12th house of the birth chart. This calculator checks those houses from both your Lagna and your Moon sign.",
      },
      {
        q: "How do I know if I am Manglik?",
        a: "Enter your date, time and place of birth above. The calculator finds the house Mars occupies from your Lagna and from your Moon, checks three cancellation conditions and shows your status: not Manglik, cancelled, partial or present.",
      },
      {
        q: "Can Mangal Dosh be cancelled?",
        a: "Yes. Classical texts list conditions that cancel or soften it. This calculator checks three: Mars in its own or exaltation sign (Aries, Scorpio or Capricorn), Jupiter in a Kendra from the Lagna or Moon, and Jupiter's aspect on Mars or Jupiter in the same sign as Mars.",
      },
      {
        q: "What do partial and cancelled mean in the result?",
        a: "Each reference (Lagna or Moon) where Mars falls in a Mangal Dosh house is one trigger, and each cancellation condition present offsets one trigger. Cancelled means every trigger is offset; partial means one trigger remains; present means both remain.",
      },
      {
        q: "Why does the calculator need my birth time?",
        a: "The Lagna changes roughly every two hours, and it decides which house Mars occupies. The place of birth gives the coordinates used to calculate the Lagna, so both are needed for an accurate result.",
      },
      {
        q: "Should a Manglik person marry only a Manglik?",
        a: "Traditionally, two charts with similar Mars energy are read as balancing each other, so Mangal Dosh is compared across both charts rather than judged from one. Free Kundli Matching compares both partners' Mangal Dosh along with the 36 Guna Milan score.",
      },
      {
        q: "Is Mangal Dosh also checked from Venus?",
        a: "Some traditions also count Mars from Venus. This calculator uses the two most widely followed references, the Lagna and the Moon.",
      },
    ],

    video: {
      title: "Watch: Mangal Dosh Explained",
      youtubeUrl: "https://www.youtube.com/watch?v=xFoM847JcXU",
    },
  },

  hi: {
    seo: {
      title: "मंगल दोष कैलकुलेटर – कुंडली में मांगलिक दोष की सटीक जाँच | ज्‍योतिष आशा",
      description:
        "फ्री मंगल दोष कैलकुलेटर: जन्म विवरण डालें और जानें कि लग्न व चंद्र से मंगल किस भाव में है, आपकी मांगलिक स्थिति क्या है और तीन शास्त्रीय दोष भंग स्थितियों में से कौन-सी लागू होती हैं।",
      keywords: [
        "मंगल दोष कैलकुलेटर",
        "मांगलिक दोष की जाँच",
        "कुंडली में मंगल दोष",
        "क्या मैं मांगलिक हूँ",
        "मंगल दोष भंग",
        "मंगल दोष और विवाह",
      ],
    },

    landing: {
      breadcrumb: { home: "होम", tools: "टूल्स", current: "मंगल दोष कैलकुलेटर" },
      h1: "मंगल दोष कैलकुलेटर",
      intro:
        "जानिए कि आपकी कुंडली में मंगल दोष (मांगलिक दोष) है या नहीं। अपनी जन्म तिथि, समय और स्थान डालें और देखें कि लग्न व चंद्र से मंगल किस भाव में है, आपकी मांगलिक स्थिति क्या है और तीन शास्त्रीय दोष भंग स्थितियों में से कौन-सी आपकी कुंडली पर लागू होती हैं।",
      method: "गणना स्विस एफेमेरिस और लाहिरी अयनांश से।",
      submitLabel: "फ्री में मंगल दोष जाँचें",
      shows: {
        h2: "फ्री परिणाम में क्या मिलता है",
        items: [
          { title: "मांगलिक स्थिति", body: "मांगलिक नहीं, दोष भंग, आंशिक या प्रभावी — आपकी अपनी कुंडली से।" },
          { title: "लग्न और चंद्र से मंगल", body: "लग्न से और चंद्र राशि से गिनने पर मंगल किस भाव में है।" },
          { title: "गुरु की स्थिति", body: "लग्न और चंद्र से गुरु का भाव, जिससे एक दोष भंग स्थिति तय होती है।" },
          { title: "तीन दोष भंग जाँच", body: "हर शास्त्रीय स्थिति आपकी कुंडली में है या नहीं, स्पष्ट रूप से।" },
        ],
      },
      how: {
        h2: "मंगल दोष की जाँच कैसे होती है",
        body: [
          "परंपरागत रूप से मंगल दोष तब माना जाता है जब मंगल कुंडली के 1, 2, 4, 7, 8 या 12वें भाव में हो। ये भाव स्वयं, परिवार, घर, विवाह, आयु और दांपत्य सुख से जुड़े हैं।",
          "कैलकुलेटर यह जाँच दो बार करता है: आपके लग्न से और आपकी चंद्र राशि से। जिस भी संदर्भ से मंगल इन भावों में आता है, वह एक बार गिना जाता है — इसलिए किसी कुंडली में मंगल दोष किसी से नहीं, एक से या दोनों से दिख सकता है।",
          "भाव पूर्ण राशि पद्धति से गिने जाते हैं। जन्म समय इसलिए ज़रूरी है क्योंकि लग्न लगभग हर दो घंटे में बदलता है, और लग्न से ही तय होता है कि मंगल किस भाव में है।",
        ],
      },
      cancel: {
        h2: "हम कौन-सी तीन दोष भंग स्थितियाँ जाँचते हैं",
        intro: "शास्त्रीय ग्रंथों में ऐसी स्थितियाँ बताई गई हैं जो मंगल दोष को कम या शांत करती हैं। कैलकुलेटर ये तीन जाँचता है:",
        items: [
          { title: "मंगल स्वराशि या उच्च राशि में", body: "मंगल मेष या वृश्चिक (स्वराशि) अथवा मकर (उच्च राशि) में हो।" },
          { title: "गुरु केंद्र में", body: "गुरु आपके लग्न से या चंद्र से 1, 4, 7 या 10वें भाव में हो।" },
          { title: "मंगल पर गुरु का प्रभाव", body: "गुरु की मंगल पर दृष्टि हो, या गुरु मंगल के साथ एक ही राशि में हो।" },
        ],
        grading: {
          h3: "परिणाम कैसे तय होता है",
          rows: [
            { label: "मांगलिक नहीं", body: "लग्न या चंद्र — किसी से भी मंगल इन भावों में नहीं है।" },
            { label: "मंगल दोष भंग", body: "मंगल दोष बनता है, पर मौजूद दोष भंग स्थितियाँ हर कारण को संतुलित कर देती हैं।" },
            { label: "आंशिक", body: "दोष भंग स्थितियाँ गिनने के बाद एक कारण शेष रहता है।" },
            { label: "प्रभावी", body: "दोनों कारण — लग्न से और चंद्र से — शेष रहते हैं और कोई स्थिति उन्हें संतुलित नहीं करती।" },
          ],
        },
      },
      marriage: {
        h2: "विवाह मिलान में मंगल दोष",
        body:
          "परंपरा में मंगल दोष को एक कुंडली से नहीं, बल्कि दोनों साथियों की कुंडलियों की तुलना से देखा जाता है — समान मंगल ऊर्जा वाली दो कुंडलियाँ एक-दूसरे को संतुलित मानी जाती हैं। फ्री कुंडली मिलान 36 गुण मिलान स्कोर के साथ दोनों कुंडलियों के मंगल दोष की तुलना करता है।",
        links: [
          { href: "/kundli-matching", label: "फ्री कुंडली मिलान (36 गुण मिलान)" },
          { href: "/marriage-astrology/compatibility", label: "विवाह अनुकूलता मार्गदर्शिका" },
        ],
      },
      houses: {
        h2: "हर भाव में मंगल",
        body: "जन्म कुंडली के हर भाव में मंगल का अर्थ पढ़ें। चिह्नित भाव वे हैं जिनसे मंगल दोष देखा जाता है।",
        tag: "मंगल दोष भाव",
        label: (n: string) => `${n} भाव में मंगल`,
      },
      faqH2: "अक्सर पूछे जाने वाले प्रश्न",
      related: {
        h2: "विवाह से जुड़ी मार्गदर्शिकाएँ",
        links: [
          { href: "/marriage-astrology", label: "विवाह ज्योतिष", note: "विवाह से जुड़े सभी प्रश्न, फ्री टूल और रिपोर्ट" },
          { href: "/kundli-matching", label: "फ्री कुंडली मिलान", note: "दोनों साथियों के लिए 36 गुण मिलान और मंगल दोष" },
          { href: "/marriage-astrology/delayed-marriage", label: "मेरी शादी में देरी क्यों हो रही है?", note: "देर से विवाह के लिए देखे जाने वाले कुंडली के कारक" },
          { href: "/marriage-astrology/married-life", label: "क्या मेरा वैवाहिक जीवन सुखी रहेगा?", note: "कुंडली वैवाहिक जीवन के बारे में क्या बताती है" },
        ],
      },
    },

    faq: [
      {
        q: "मंगल दोष क्या है?",
        a: "मंगल दोष (जिसे मांगलिक या कुज दोष भी कहते हैं) तब माना जाता है जब मंगल कुंडली के 1, 2, 4, 7, 8 या 12वें भाव में हो। यह कैलकुलेटर इन भावों को आपके लग्न और आपकी चंद्र राशि — दोनों से जाँचता है।",
      },
      {
        q: "कैसे पता करें कि मैं मांगलिक हूँ या नहीं?",
        a: "ऊपर अपनी जन्म तिथि, समय और स्थान डालें। कैलकुलेटर लग्न और चंद्र से मंगल का भाव निकालता है, तीन दोष भंग स्थितियाँ जाँचता है और आपकी स्थिति बताता है: मांगलिक नहीं, दोष भंग, आंशिक या प्रभावी।",
      },
      {
        q: "क्या मंगल दोष भंग हो सकता है?",
        a: "हाँ। शास्त्रीय ग्रंथों में ऐसी स्थितियाँ बताई गई हैं जो इसे भंग या कम करती हैं। यह कैलकुलेटर तीन जाँचता है: मंगल स्वराशि या उच्च राशि (मेष, वृश्चिक या मकर) में, गुरु लग्न या चंद्र से केंद्र में, और मंगल पर गुरु की दृष्टि या गुरु का मंगल के साथ एक ही राशि में होना।",
      },
      {
        q: "परिणाम में आंशिक और दोष भंग का क्या अर्थ है?",
        a: "लग्न या चंद्र — जिस भी संदर्भ से मंगल दोष वाले भाव में आता है, वह एक कारण है, और हर मौजूद दोष भंग स्थिति एक कारण को संतुलित करती है। दोष भंग का अर्थ है हर कारण संतुलित हो गया; आंशिक का अर्थ है एक कारण शेष है; प्रभावी का अर्थ है दोनों शेष हैं।",
      },
      {
        q: "कैलकुलेटर को जन्म समय क्यों चाहिए?",
        a: "लग्न लगभग हर दो घंटे में बदलता है और उसी से तय होता है कि मंगल किस भाव में है। जन्म स्थान से वे निर्देशांक मिलते हैं जिनसे लग्न की गणना होती है, इसलिए सही परिणाम के लिए दोनों ज़रूरी हैं।",
      },
      {
        q: "क्या मांगलिक व्यक्ति को मांगलिक से ही विवाह करना चाहिए?",
        a: "परंपरा में समान मंगल ऊर्जा वाली दो कुंडलियाँ एक-दूसरे को संतुलित मानी जाती हैं, इसलिए मंगल दोष को एक कुंडली से नहीं, दोनों कुंडलियों की तुलना से देखा जाता है। फ्री कुंडली मिलान 36 गुण मिलान के साथ दोनों साथियों के मंगल दोष की तुलना करता है।",
      },
      {
        q: "क्या मंगल दोष शुक्र से भी देखा जाता है?",
        a: "कुछ परंपराओं में मंगल को शुक्र से भी गिना जाता है। यह कैलकुलेटर दो सबसे प्रचलित संदर्भों — लग्न और चंद्र — का उपयोग करता है।",
      },
    ],

    video: {
      title: "देखें: मंगल दोष क्या है",
      youtubeUrl: "https://www.youtube.com/watch?v=xFoM847JcXU",
    },
  },
};
