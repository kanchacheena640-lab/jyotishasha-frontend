// Love Life calculator content (EN + HI), rendered on the server by components/tools/love-life/LoveLifeLanding.tsx.
// Positioned as a 5th & 7th house love analysis -- the calculator does NOT check compatibility, Dasha periods or
// timing. What it computes (services/love_life.py):
//   * the signs on the 5th and 7th houses and the planets placed there (whole sign from the Lagna);
//   * Venus or Moon in the 5th/7th read as supportive -- unless debilitated, then listed as needing care;
//   * Saturn or Ketu in the 5th/7th, and Sun or Mars in the 7th, read as points to watch.

export const loveLifeContent = {
  toolId: "love-life",

  en: {
    seo: {
      title: "Love Life Calculator – 5th & 7th House Love Analysis | Jyotishasha",
      description:
        "Free 5th and 7th house love analysis: enter your birth details to see the signs on your houses of romance and partnership, the planets placed there and how they are traditionally read.",
      keywords: [
        "love life astrology",
        "5th house love astrology",
        "7th house relationship astrology",
        "venus in 5th house",
        "love life by kundali",
        "romance in birth chart",
      ],
    },

    landing: {
      breadcrumb: { home: "Home", tools: "Tools", current: "Love Life" },
      h1: "Love Life: 5th & 7th House Love Analysis",
      intro:
        "In Vedic astrology the 5th house is read for romance and the 7th house for partnership. Enter your date, time and place of birth to see the signs on these two houses, the planets placed there and how they are traditionally read for love.",
      method: "Calculated with the Swiss Ephemeris and Lahiri Ayanamsa.",
      submitLabel: "Check My Love Houses — Free",
      shows: {
        h2: "What the Free Result Shows",
        items: [
          { title: "Your 5th and 7th house signs", body: "The signs on your houses of romance and partnership." },
          { title: "Planets in these houses", body: "Any planets placed in your 5th or 7th house." },
          { title: "Supportive placements", body: "Venus or the Moon in the 5th or 7th house, unless debilitated." },
          { title: "Points to watch", body: "Saturn or Ketu in the 5th or 7th, and the Sun or Mars in the 7th." },
        ],
      },
      sections: [
        {
          id: "ll-houses",
          h2: "What the 5th and 7th Houses Show",
          body: [
            "The 5th house is traditionally read for romance, affection and courtship, and the 7th house for partnership and marriage. Both are counted from your Lagna (Ascendant), so their signs depend on your birth time and place.",
            "Venus is the traditional significator of love, and the Moon of emotions, so their placement in these houses is read with particular attention.",
          ],
        },
        {
          id: "ll-checks",
          h2: "What This Calculator Checks",
          body: [
            "It finds the signs on your 5th and 7th houses and lists the planets placed there. Venus or the Moon in either house is read as supportive, unless that planet is debilitated (Venus in Virgo, the Moon in Scorpio), when it is listed as needing care instead.",
            "Saturn or Ketu in the 5th or 7th house, and the Sun or Mars in the 7th, are listed as points to watch.",
            "It does not analyse Dasha periods, the Navamsa (D9) chart or a partner's chart, so it does not predict timing or compatibility.",
          ],
        },
        {
          id: "ll-reading",
          h2: "Reading Your Result",
          body: [
            "Supportive placements and points to watch are traditional indicators, not fixed outcomes. A full reading weighs them together with the rest of your chart.",
            "If none of these placements applies to your chart, you will still see your 5th and 7th house signs. Houses without these planets are common.",
          ],
        },
        {
          id: "ll-more",
          h2: "Compatibility and Timing",
          body: [
            "Compatibility is read from both partners' charts, and timing from Dasha periods. Those questions have their own calculator and guides.",
          ],
          links: [
            { href: "/kundli-matching", label: "Free Kundli Matching" },
            { href: "/marriage-astrology/compatibility", label: "Marriage Compatibility guide" },
            { href: "/marriage-astrology/marriage-timing", label: "Marriage Timing guide" },
          ],
        },
      ],
      related: {
        h2: "Related Guides and Tools",
        links: [
          { href: "/marriage-astrology", label: "Marriage Astrology", note: "Every marriage question, free tools and reports" },
          { href: "/kundli-matching", label: "Free Kundli Matching", note: "36 Guna Milan for you and your partner" },
          { href: "/tools/marriage-path", label: "Marriage Path Calculator", note: "Your 7th house sign, lord and the planets there" },
          { href: "/marriage-astrology/love-marriage", label: "Will I Have a Love Marriage?", note: "How the chart is read for love marriage" },
          { href: "/marriage-astrology/compatibility", label: "Marriage Compatibility", note: "How two charts are read together" },
          { href: "/marriage-astrology/spouse-nature", label: "What Will My Spouse Be Like?", note: "How the 7th house is read for the spouse" },
        ],
      },
      faqH2: "Frequently Asked Questions",
    },

    faq: [
      {
        q: "What do the 5th and 7th houses show in a birth chart?",
        a: "The 5th house is traditionally read for romance and affection, and the 7th house for partnership and marriage. Both are counted from your Lagna.",
      },
      {
        q: "What does this calculator check?",
        a: "It shows your 5th and 7th house signs and the planets placed there. Venus or the Moon in these houses is read as supportive, and Saturn or Ketu in either house, or the Sun or Mars in the 7th, as points to watch.",
      },
      {
        q: "What if no planet is in my 5th or 7th house?",
        a: "That is common. Your result still shows the signs on both houses, which an astrologer reads together with their lords and the rest of your chart.",
      },
      {
        q: "Can it tell me if my partner and I are compatible?",
        a: "No. It reads one chart. Free Kundli Matching compares both partners' charts with the 36 Guna Milan score and Mangal Dosh.",
      },
      {
        q: "Does it predict when I will find love or get married?",
        a: "No. Timing is read from Dasha periods, which this calculator does not analyse. The Marriage Timing guide explains how timing is read.",
      },
      {
        q: "Why is my Venus or Moon in the 5th or 7th house not marked supportive?",
        a: "When Venus is in Virgo or the Moon is in Scorpio it is debilitated, which is traditionally read as an area needing more conscious care, so it is listed under points to watch instead.",
      },
      {
        q: "Why does the calculator need my birth time?",
        a: "Your Lagna changes about every two hours, and it decides which signs fall on your 5th and 7th houses. The birth place gives the coordinates used to calculate the Lagna.",
      },
    ],
  },

  hi: {
    seo: {
      title: "लव लाइफ कैलकुलेटर – पंचम और सप्तम भाव से प्रेम विश्लेषण | ज्‍योतिष आशा",
      description:
        "फ्री पंचम और सप्तम भाव प्रेम विश्लेषण: जन्म विवरण डालें और जानें अपने प्रेम और साझेदारी के भावों की राशियाँ, उनमें स्थित ग्रह और परंपरा में उनका अर्थ।",
      keywords: [
        "लव लाइफ ज्योतिष",
        "पंचम भाव प्रेम",
        "सप्तम भाव संबंध",
        "पंचम भाव में शुक्र",
        "कुंडली से प्रेम जीवन",
        "जन्म कुंडली में रोमांस",
      ],
    },

    landing: {
      breadcrumb: { home: "होम", tools: "टूल्स", current: "प्रेम जीवन" },
      h1: "प्रेम जीवन: पंचम और सप्तम भाव से प्रेम विश्लेषण",
      intro:
        "वैदिक ज्योतिष में पंचम भाव को प्रेम और सप्तम भाव को साझेदारी के लिए देखा जाता है। अपनी जन्म तिथि, समय और स्थान डालें और जानें इन दोनों भावों की राशियाँ, उनमें स्थित ग्रह और प्रेम के लिए परंपरा में उनका अर्थ।",
      method: "गणना स्विस एफेमेरिस और लाहिरी अयनांश से।",
      submitLabel: "फ्री में प्रेम भाव जाँचें",
      shows: {
        h2: "फ्री परिणाम में क्या मिलता है",
        items: [
          { title: "पंचम और सप्तम भाव की राशियाँ", body: "आपके प्रेम और साझेदारी के भावों की राशियाँ।" },
          { title: "इन भावों में ग्रह", body: "आपके पंचम या सप्तम भाव में स्थित ग्रह, यदि कोई हों।" },
          { title: "सहायक स्थितियाँ", body: "पंचम या सप्तम भाव में शुक्र या चंद्र, यदि वे नीच के न हों।" },
          { title: "ध्यान देने योग्य संकेत", body: "पंचम या सप्तम में शनि या केतु, और सप्तम में सूर्य या मंगल।" },
        ],
      },
      sections: [
        {
          id: "ll-houses",
          h2: "पंचम और सप्तम भाव क्या दर्शाते हैं",
          body: [
            "परंपरा में पंचम भाव प्रेम, स्नेह और प्रेम-प्रसंग के लिए, और सप्तम भाव साझेदारी और विवाह के लिए देखा जाता है। दोनों आपके लग्न से गिने जाते हैं, इसलिए इनकी राशियाँ आपके जन्म समय और स्थान पर निर्भर करती हैं।",
            "शुक्र प्रेम का और चंद्र भावनाओं का पारंपरिक कारक है, इसलिए इन भावों में उनकी स्थिति पर विशेष ध्यान दिया जाता है।",
          ],
        },
        {
          id: "ll-checks",
          h2: "यह कैलकुलेटर क्या जाँचता है",
          body: [
            "यह आपके पंचम और सप्तम भाव की राशियाँ निकालता है और उनमें स्थित ग्रहों की सूची देता है। इनमें से किसी भाव में शुक्र या चंद्र को सहायक माना जाता है, जब तक वह ग्रह नीच का न हो (कन्या में शुक्र, वृश्चिक में चंद्र); तब उसे सजग देखभाल वाले संकेत में रखा जाता है।",
            "पंचम या सप्तम भाव में शनि या केतु, और सप्तम में सूर्य या मंगल, ध्यान देने योग्य संकेतों में आते हैं।",
            "यह दशाओं, नवमांश (D9) कुंडली या साथी की कुंडली का विश्लेषण नहीं करता, इसलिए यह समय या अनुकूलता नहीं बताता।",
          ],
        },
        {
          id: "ll-reading",
          h2: "अपना परिणाम कैसे पढ़ें",
          body: [
            "सहायक स्थितियाँ और ध्यान देने योग्य संकेत पारंपरिक संकेत हैं, तय परिणाम नहीं। पूरा विश्लेषण इन्हें आपकी बाकी कुंडली के साथ मिलाकर किया जाता है।",
            "यदि इनमें से कोई स्थिति आपकी कुंडली पर लागू नहीं होती, तब भी आपको पंचम और सप्तम भाव की राशियाँ दिखेंगी। इन ग्रहों के बिना भाव होना आम बात है।",
          ],
        },
        {
          id: "ll-more",
          h2: "अनुकूलता और समय",
          body: [
            "अनुकूलता दोनों साथियों की कुंडलियों से और समय दशाओं से देखा जाता है। इन प्रश्नों के लिए अलग कैलकुलेटर और मार्गदर्शिकाएँ हैं।",
          ],
          links: [
            { href: "/kundli-matching", label: "फ्री कुंडली मिलान" },
            { href: "/marriage-astrology/compatibility", label: "विवाह अनुकूलता मार्गदर्शिका" },
            { href: "/marriage-astrology/marriage-timing", label: "विवाह के समय की मार्गदर्शिका" },
          ],
        },
      ],
      related: {
        h2: "संबंधित मार्गदर्शिकाएँ और टूल",
        links: [
          { href: "/marriage-astrology", label: "विवाह ज्योतिष", note: "विवाह से जुड़े सभी प्रश्न, फ्री टूल और रिपोर्ट" },
          { href: "/kundli-matching", label: "फ्री कुंडली मिलान", note: "आपके और आपके साथी के लिए 36 गुण मिलान" },
          { href: "/tools/marriage-path", label: "विवाह मार्ग कैलकुलेटर", note: "आपके सप्तम भाव की राशि, स्वामी और वहाँ के ग्रह" },
          { href: "/marriage-astrology/love-marriage", label: "क्या मेरा प्रेम विवाह होगा?", note: "प्रेम विवाह के लिए कुंडली कैसे पढ़ी जाती है" },
          { href: "/marriage-astrology/compatibility", label: "विवाह अनुकूलता", note: "दो कुंडलियाँ साथ कैसे पढ़ी जाती हैं" },
          { href: "/marriage-astrology/spouse-nature", label: "मेरा जीवनसाथी कैसा होगा?", note: "जीवनसाथी के लिए सप्तम भाव कैसे पढ़ा जाता है" },
        ],
      },
      faqH2: "अक्सर पूछे जाने वाले प्रश्न",
    },

    faq: [
      {
        q: "जन्म कुंडली में पंचम और सप्तम भाव क्या दर्शाते हैं?",
        a: "परंपरा में पंचम भाव प्रेम और स्नेह के लिए, और सप्तम भाव साझेदारी और विवाह के लिए देखा जाता है। दोनों आपके लग्न से गिने जाते हैं।",
      },
      {
        q: "यह कैलकुलेटर क्या जाँचता है?",
        a: "यह आपके पंचम और सप्तम भाव की राशियाँ और उनमें स्थित ग्रह दिखाता है। इन भावों में शुक्र या चंद्र को सहायक, और किसी भी भाव में शनि या केतु, या सप्तम में सूर्य या मंगल को ध्यान देने योग्य माना जाता है।",
      },
      {
        q: "अगर मेरे पंचम या सप्तम भाव में कोई ग्रह नहीं है तो?",
        a: "यह आम बात है। आपके परिणाम में तब भी दोनों भावों की राशियाँ दिखती हैं, जिन्हें ज्योतिषी उनके स्वामियों और बाकी कुंडली के साथ पढ़ते हैं।",
      },
      {
        q: "क्या यह बता सकता है कि मैं और मेरा साथी अनुकूल हैं?",
        a: "नहीं। यह एक कुंडली पढ़ता है। फ्री कुंडली मिलान 36 गुण मिलान और मंगल दोष के साथ दोनों साथियों की कुंडलियों की तुलना करता है।",
      },
      {
        q: "क्या यह बताता है कि मुझे प्रेम कब मिलेगा या शादी कब होगी?",
        a: "नहीं। समय दशाओं से देखा जाता है, जिनका यह कैलकुलेटर विश्लेषण नहीं करता। विवाह के समय की मार्गदर्शिका बताती है कि समय कैसे पढ़ा जाता है।",
      },
      {
        q: "मेरे पंचम या सप्तम भाव का शुक्र या चंद्र सहायक क्यों नहीं दिखा?",
        a: "कन्या में शुक्र या वृश्चिक में चंद्र नीच का होता है, जिसे परंपरा में अधिक सजग देखभाल वाला क्षेत्र माना जाता है, इसलिए उसे ध्यान देने योग्य संकेतों में रखा जाता है।",
      },
      {
        q: "कैलकुलेटर को मेरा जन्म समय क्यों चाहिए?",
        a: "आपका लग्न लगभग हर दो घंटे में बदलता है, और उसी से तय होता है कि पंचम और सप्तम भाव में कौन-सी राशियाँ हैं। जन्म स्थान से वे निर्देशांक मिलते हैं जिनसे लग्न की गणना होती है।",
      },
    ],
  },
};
