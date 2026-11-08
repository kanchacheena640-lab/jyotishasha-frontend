// Marriage Path calculator content (EN + HI), rendered on the server by
// components/tools/marriage-path/MarriagePathLanding.tsx. Positioned as a 7th-house marriage analysis -- the
// calculator does NOT predict marriage timing or partner compatibility (those intents belong to the Marriage
// Timing guide and Kundli Matching). What it computes (services/marriage_path.py):
//   * the 7th house sign, its lord and the house the lord occupies;
//   * planets placed in the 7th house (whole sign);
//   * Venus and Jupiter exalted or debilitated;
//   * Rahu in the same house as the 7th lord;
//   * a "key influence": the first planet one of these rules finds (not a strength ranking).

export const marriagePathContent = {
  toolId: "marriage-path",

  en: {
    seo: {
      title: "Marriage Path Calculator – 7th House Marriage Analysis | Jyotishasha",
      description:
        "Free 7th house marriage analysis: enter your birth details to see your 7th house sign and lord, the planets placed there, and the Venus and Jupiter checks read for marriage.",
      keywords: [
        "7th house marriage analysis",
        "7th house lord calculator",
        "marriage house in kundali",
        "planets in 7th house",
        "marriage path by kundali",
        "venus jupiter marriage astrology",
      ],
    },

    landing: {
      breadcrumb: { home: "Home", tools: "Tools", current: "Marriage Path" },
      h1: "Marriage Path: 7th House Marriage Analysis",
      intro:
        "In Vedic astrology the 7th house is the house of marriage and partnership. Enter your date, time and place of birth to see your 7th house sign and lord, the planets placed there, and the Venus and Jupiter checks traditionally read for marriage.",
      method: "Calculated with the Swiss Ephemeris and Lahiri Ayanamsa.",
      submitLabel: "Check My 7th House — Free",
      shows: {
        h2: "What the Free Result Shows",
        items: [
          { title: "7th house sign and lord", body: "The sign on your 7th house and the planet that rules it." },
          { title: "Where the 7th lord sits", body: "The house your 7th lord occupies in your chart." },
          { title: "Planets in your 7th house", body: "Any planets placed in the house of marriage." },
          { title: "Venus, Jupiter and Rahu checks", body: "Venus or Jupiter exalted or debilitated, and Rahu with your 7th lord." },
        ],
      },
      sections: [
        {
          id: "mp-house",
          h2: "What the 7th House Shows",
          body: [
            "The 7th house is counted from your Lagna (Ascendant) and is traditionally read for marriage, the spouse and long-term partnerships. Its sign and the planet that rules it, called the 7th lord, are the first things an astrologer looks at.",
            "Venus is the traditional significator of love and marriage, and Jupiter is also read for marriage, especially in a woman's chart, where it is traditionally linked with the husband.",
          ],
        },
        {
          id: "mp-checks",
          h2: "What This Calculator Checks",
          body: [
            "It finds your 7th house sign, its lord and the house the lord occupies, and lists any planets placed in your 7th house. It checks whether Venus or Jupiter is exalted or debilitated, and whether Rahu sits in the same house as your 7th lord.",
            "The key influence it names is the first planet one of these checks finds. It is a pointer for reading, not a ranking of strength.",
            "It does not analyse the Navamsa (D9) chart or your Dasha periods, so it does not predict when you will marry or how compatible you are with a partner.",
          ],
        },
        {
          id: "mp-reading",
          h2: "Reading Your Result",
          body: [
            "Supportive and challenging points are traditional indicators, not fixed outcomes. A full reading weighs them together with the rest of your chart.",
            "If no rule applies to your chart, you will still see your 7th house sign, its lord and where the lord sits. An empty 7th house is common.",
          ],
        },
        {
          id: "mp-more",
          h2: "Marriage Timing and Compatibility",
          body: [
            "Marriage timing is read from Dasha periods and transits, and compatibility from both partners' charts. Those questions have their own guides and calculator.",
          ],
          links: [
            { href: "/marriage-astrology/marriage-timing", label: "Marriage Timing guide" },
            { href: "/kundli-matching", label: "Free Kundli Matching" },
            { href: "/marriage-astrology/compatibility", label: "Marriage Compatibility guide" },
          ],
        },
      ],
      related: {
        h2: "Related Marriage Guides and Tools",
        links: [
          { href: "/marriage-astrology", label: "Marriage Astrology", note: "Every marriage question, free tools and reports" },
          { href: "/kundli-matching", label: "Free Kundli Matching", note: "36 Guna Milan for you and your partner" },
          { href: "/tools/mangal-dosh", label: "Mangal Dosh Calculator", note: "Mars from your Lagna and Moon, with cancellation checks" },
          { href: "/marriage-astrology/spouse-nature", label: "What Will My Spouse Be Like?", note: "How the 7th house is read for the spouse" },
          { href: "/marriage-astrology/delayed-marriage", label: "Why Is My Marriage Delayed?", note: "The chart factors read for a later marriage" },
          { href: "/marriage-astrology/marriage-timing", label: "When Will I Get Married?", note: "How Dasha periods are read for timing" },
        ],
      },
      faqH2: "Frequently Asked Questions",
    },

    faq: [
      {
        q: "What does the 7th house show in a birth chart?",
        a: "The 7th house is traditionally read for marriage, the spouse and long-term partnerships. It is counted from your Lagna, so its sign depends on your birth time and place.",
      },
      {
        q: "How do I find my 7th house lord?",
        a: "Your 7th house lord is the planet that rules the sign on your 7th house. The calculator shows the sign, its lord and the house the lord occupies.",
      },
      {
        q: "What if there is no planet in my 7th house?",
        a: "An empty 7th house is common. Astrologers then read the 7th house sign and its lord. The result shows both, along with where the lord sits.",
      },
      {
        q: "Does this calculator predict when I will get married?",
        a: "No. It does not analyse Dasha periods or the Navamsa (D9) chart, which are used for timing. The Marriage Timing guide explains how timing is read.",
      },
      {
        q: "Can it check compatibility with my partner?",
        a: "No. It reads one chart. Free Kundli Matching compares both partners' charts with the 36 Guna Milan score and Mangal Dosh.",
      },
      {
        q: "What does an exalted or debilitated Venus or Jupiter mean here?",
        a: "Exalted Venus or Jupiter is traditionally read as supportive for marriage. Debilitated Venus or Jupiter is traditionally read as an area that needs more conscious care. Neither is a fixed outcome.",
      },
      {
        q: "Why does the calculator need my birth time?",
        a: "Your Lagna changes about every two hours, and it decides which sign falls on your 7th house. The birth place gives the coordinates used to calculate the Lagna.",
      },
    ],
  },

  hi: {
    seo: {
      title: "विवाह मार्ग कैलकुलेटर – सप्तम भाव से विवाह विश्लेषण | ज्‍योतिष आशा",
      description:
        "फ्री सप्तम भाव विवाह विश्लेषण: जन्म विवरण डालें और जानें अपने सप्तम भाव की राशि, सप्तमेश, उसमें स्थित ग्रह, और विवाह के लिए देखी जाने वाली शुक्र व गुरु की जाँच।",
      keywords: [
        "सप्तम भाव विवाह विश्लेषण",
        "सप्तमेश कैलकुलेटर",
        "कुंडली में विवाह भाव",
        "सप्तम भाव में ग्रह",
        "कुंडली से विवाह मार्ग",
        "शुक्र गुरु विवाह ज्योतिष",
      ],
    },

    landing: {
      breadcrumb: { home: "होम", tools: "टूल्स", current: "विवाह मार्ग" },
      h1: "विवाह मार्ग: सप्तम भाव से विवाह विश्लेषण",
      intro:
        "वैदिक ज्योतिष में सप्तम भाव विवाह और साझेदारी का भाव है। अपनी जन्म तिथि, समय और स्थान डालें और जानें अपने सप्तम भाव की राशि और स्वामी, उसमें स्थित ग्रह, और विवाह के लिए परंपरा से देखी जाने वाली शुक्र व गुरु की जाँच।",
      method: "गणना स्विस एफेमेरिस और लाहिरी अयनांश से।",
      submitLabel: "फ्री में सप्तम भाव जाँचें",
      shows: {
        h2: "फ्री परिणाम में क्या मिलता है",
        items: [
          { title: "सप्तम भाव की राशि और स्वामी", body: "आपके सप्तम भाव की राशि और उस पर शासन करने वाला ग्रह।" },
          { title: "सप्तमेश की स्थिति", body: "आपका सप्तमेश कुंडली के किस भाव में है।" },
          { title: "सप्तम भाव में ग्रह", body: "विवाह भाव में स्थित ग्रह, यदि कोई हों।" },
          { title: "शुक्र, गुरु और राहु की जाँच", body: "शुक्र या गुरु उच्च या नीच के, और राहु सप्तमेश के साथ।" },
        ],
      },
      sections: [
        {
          id: "mp-house",
          h2: "सप्तम भाव क्या दर्शाता है",
          body: [
            "सप्तम भाव आपके लग्न से गिना जाता है और परंपरा में इसे विवाह, जीवनसाथी और दीर्घकालिक साझेदारी के लिए देखा जाता है। इसकी राशि और उस राशि का स्वामी ग्रह, जिसे सप्तमेश कहते हैं, सबसे पहले देखे जाते हैं।",
            "शुक्र प्रेम और विवाह का पारंपरिक कारक है, और गुरु भी विवाह के लिए देखा जाता है, विशेषकर स्त्री की कुंडली में, जहाँ परंपरा में इसे पति से जोड़ा जाता है।",
          ],
        },
        {
          id: "mp-checks",
          h2: "यह कैलकुलेटर क्या जाँचता है",
          body: [
            "यह आपके सप्तम भाव की राशि, सप्तमेश और सप्तमेश का भाव निकालता है, और सप्तम भाव में स्थित ग्रहों की सूची देता है। यह जाँचता है कि शुक्र या गुरु उच्च या नीच के हैं या नहीं, और राहु सप्तमेश वाले भाव में है या नहीं।",
            "जिस प्रमुख प्रभाव का नाम यह देता है, वह इन जाँचों में मिलने वाला पहला ग्रह है। यह पढ़ने का एक संकेत है, बल की तुलना नहीं।",
            "यह नवमांश (D9) कुंडली या आपकी दशाओं का विश्लेषण नहीं करता, इसलिए यह विवाह का समय या जीवनसाथी से अनुकूलता नहीं बताता।",
          ],
        },
        {
          id: "mp-reading",
          h2: "अपना परिणाम कैसे पढ़ें",
          body: [
            "सहायक और चुनौतीपूर्ण बिंदु पारंपरिक संकेत हैं, तय परिणाम नहीं। पूरा विश्लेषण इन्हें आपकी बाकी कुंडली के साथ मिलाकर किया जाता है।",
            "यदि आपकी कुंडली पर कोई नियम लागू नहीं होता, तब भी आपको सप्तम भाव की राशि, सप्तमेश और उसका भाव दिखेगा। खाली सप्तम भाव आम बात है।",
          ],
        },
        {
          id: "mp-more",
          h2: "विवाह का समय और अनुकूलता",
          body: [
            "विवाह का समय दशा और गोचर से, और अनुकूलता दोनों साथियों की कुंडलियों से देखी जाती है। इन प्रश्नों के लिए अलग मार्गदर्शिकाएँ और कैलकुलेटर हैं।",
          ],
          links: [
            { href: "/marriage-astrology/marriage-timing", label: "विवाह के समय की मार्गदर्शिका" },
            { href: "/kundli-matching", label: "फ्री कुंडली मिलान" },
            { href: "/marriage-astrology/compatibility", label: "विवाह अनुकूलता मार्गदर्शिका" },
          ],
        },
      ],
      related: {
        h2: "विवाह से जुड़ी मार्गदर्शिकाएँ और टूल",
        links: [
          { href: "/marriage-astrology", label: "विवाह ज्योतिष", note: "विवाह से जुड़े सभी प्रश्न, फ्री टूल और रिपोर्ट" },
          { href: "/kundli-matching", label: "फ्री कुंडली मिलान", note: "आपके और आपके साथी के लिए 36 गुण मिलान" },
          { href: "/tools/mangal-dosh", label: "मंगल दोष कैलकुलेटर", note: "लग्न और चंद्र से मंगल, दोष भंग जाँच के साथ" },
          { href: "/marriage-astrology/spouse-nature", label: "मेरा जीवनसाथी कैसा होगा?", note: "जीवनसाथी के लिए सप्तम भाव कैसे पढ़ा जाता है" },
          { href: "/marriage-astrology/delayed-marriage", label: "मेरी शादी में देरी क्यों हो रही है?", note: "देर से विवाह के लिए देखे जाने वाले कारक" },
          { href: "/marriage-astrology/marriage-timing", label: "मेरी शादी कब होगी?", note: "समय के लिए दशाएँ कैसे पढ़ी जाती हैं" },
        ],
      },
      faqH2: "अक्सर पूछे जाने वाले प्रश्न",
    },

    faq: [
      {
        q: "जन्म कुंडली में सप्तम भाव क्या दर्शाता है?",
        a: "परंपरा में सप्तम भाव विवाह, जीवनसाथी और दीर्घकालिक साझेदारी के लिए देखा जाता है। यह आपके लग्न से गिना जाता है, इसलिए इसकी राशि आपके जन्म समय और स्थान पर निर्भर करती है।",
      },
      {
        q: "अपना सप्तमेश कैसे जानें?",
        a: "आपके सप्तम भाव की राशि पर शासन करने वाला ग्रह आपका सप्तमेश है। कैलकुलेटर राशि, उसका स्वामी और स्वामी का भाव दिखाता है।",
      },
      {
        q: "अगर मेरे सप्तम भाव में कोई ग्रह नहीं है तो?",
        a: "खाली सप्तम भाव आम बात है। तब ज्योतिषी सप्तम भाव की राशि और सप्तमेश को देखते हैं। परिणाम में दोनों और सप्तमेश का भाव दिखता है।",
      },
      {
        q: "क्या यह कैलकुलेटर बताता है कि मेरी शादी कब होगी?",
        a: "नहीं। यह दशाओं या नवमांश (D9) कुंडली का विश्लेषण नहीं करता, जिनसे समय देखा जाता है। विवाह के समय की मार्गदर्शिका बताती है कि समय कैसे पढ़ा जाता है।",
      },
      {
        q: "क्या यह मेरे साथी के साथ अनुकूलता जाँच सकता है?",
        a: "नहीं। यह एक कुंडली पढ़ता है। फ्री कुंडली मिलान 36 गुण मिलान और मंगल दोष के साथ दोनों साथियों की कुंडलियों की तुलना करता है।",
      },
      {
        q: "यहाँ उच्च या नीच के शुक्र या गुरु का क्या अर्थ है?",
        a: "उच्च का शुक्र या गुरु परंपरा में विवाह के लिए सहायक माना जाता है। नीच का शुक्र या गुरु परंपरा में ऐसे क्षेत्र के रूप में देखा जाता है जिसे अधिक सजग देखभाल चाहिए। दोनों में से कोई तय परिणाम नहीं है।",
      },
      {
        q: "कैलकुलेटर को मेरा जन्म समय क्यों चाहिए?",
        a: "आपका लग्न लगभग हर दो घंटे में बदलता है, और उसी से तय होता है कि आपके सप्तम भाव में कौन-सी राशि है। जन्म स्थान से वे निर्देशांक मिलते हैं जिनसे लग्न की गणना होती है।",
      },
    ],
  },
};
