// Rashi Finder content (EN + HI), rendered on the server by components/tools/rashi-finder/RashiFinderLanding.tsx.
// Statements describe what the calculator does: the Moon's sidereal position (Swiss Ephemeris, Lahiri Ayanamsa) at
// the birth moment, using the birthplace's coordinates for local time. Title tags are unchanged from the live page.

export const rashiFinderContent = {
  toolId: "rashi-finder",

  en: {
    seo: {
      title: "Rashi Finder – Find Your Moon Rashi by Date, Time & Place | Jyotishasha",
      description:
        "Free Rashi finder: enter your date, time and place of birth to find your Moon sign (Chandra Rashi) with your Nakshatra, pada, ruling planet and the Moon's degree.",
      keywords: [
        "rashi finder online",
        "find your moon rashi",
        "moon sign calculator vedic",
        "chandra rashi by date of birth",
        "rashi by dob time and place",
        "what is my rashi astrology",
        "vedic rashi calculator",
        "lunar sign finder",
      ],
    },

    landing: {
      breadcrumb: { home: "Home", tools: "Tools", current: "Rashi Finder" },
      h1: "Rashi Finder: Find Your Moon Sign",
      intro:
        "Your Rashi is the zodiac sign the Moon occupied when you were born. Enter your date, time and place of birth to find your Moon sign, along with your Nakshatra, pada, ruling planet and the Moon's degree.",
      method: "Calculated with the Swiss Ephemeris and Lahiri Ayanamsa.",
      submitLabel: "Find My Rashi — Free",
      shows: {
        h2: "What the Free Result Shows",
        items: [
          { title: "Moon sign", body: "Your Rashi, with its element and ruling planet." },
          { title: "Nakshatra and pada", body: "The lunar mansion the Moon occupied and which of its four quarters." },
          { title: "Moon's degree", body: "How far the Moon had travelled through your sign at birth." },
          { title: "Birth-time note", body: "A note when the Moon was close to a sign boundary, where birth time matters most." },
        ],
      },
      sections: [
        {
          id: "rf-what",
          h2: "What Is a Rashi?",
          body: [
            "The zodiac is divided into twelve signs, and the sign the Moon occupied at your birth is your Rashi, also called your Moon sign or Chandra Rashi.",
            "Vedic astrology reads the Moon as the mind and emotions, so your Rashi is used for daily, monthly and yearly horoscopes, for Guna Milan in Kundli Matching, and for working out Sade Sati.",
          ],
        },
        {
          id: "rf-sun",
          h2: "Rashi vs Sun Sign",
          body: [
            "Your Sun sign depends mainly on your birth date, because the Sun spends about a month in each sign. Your Rashi depends on the Moon, which changes sign about every two and a quarter days.",
            "Many Western horoscopes use the tropical zodiac, while Vedic astrology uses the sidereal zodiac, which currently differs by about 24 degrees. That is why your Vedic signs may not match the sign you know from Western astrology.",
          ],
        },
        {
          id: "rf-lagna",
          h2: "Rashi vs Lagna",
          body: [
            "Your Rashi is the sign of the Moon. Your Lagna, or Ascendant, is the sign rising on the eastern horizon at the moment of birth. The Lagna changes about every two hours, so it needs an accurate birth time.",
            "They are two separate parts of the chart and are often different signs.",
          ],
        },
        {
          id: "rf-time",
          h2: "Why Birth Time and Place Matter",
          body: [
            "The Moon moves about half a degree an hour. On most days it stays in one sign, so a small time error makes no difference. On a day it changes sign, the birth time decides which Rashi is yours.",
            "Your birth place gives the coordinates used to work out local time at birth. If the Moon was within one degree of a sign's edge, the result tells you, so you can double-check your birth time.",
          ],
        },
      ],
      uses: {
        h2: "Where to Use Your Rashi",
        links: [
          { href: "/daily-horoscope", label: "Daily Horoscope", note: "Read today's horoscope for your Moon sign" },
          { href: "/nakshatra", label: "Nakshatra Guide", note: "Learn about the 27 Nakshatras" },
          { href: "/tools/sadhesati-calculator", label: "Sade Sati Calculator", note: "Sade Sati is read from your Moon sign" },
          { href: "/tools/lagna-finder", label: "Lagna Finder", note: "Find your rising sign" },
          { href: "/kundli-matching", label: "Free Kundli Matching", note: "36 Guna Milan uses both partners' Moon positions" },
          { href: "/free-kundali", label: "Free Kundali", note: "See your full birth chart" },
        ],
      },
      faqH2: "Frequently Asked Questions",
    },

    faq: [
      {
        q: "What is my Rashi?",
        a: "Your Rashi is the zodiac sign the Moon occupied at the moment you were born. It is also called your Moon sign or Chandra Rashi.",
      },
      {
        q: "Can I find my Rashi from my date of birth alone?",
        a: "Often, but not always. The Moon changes sign about every two and a quarter days, so on the day it changes sign, your birth time decides your Rashi. This calculator uses your date, time and place of birth.",
      },
      {
        q: "What if I don't know my exact birth time?",
        a: "Enter your closest estimate. If the Moon was not near a sign boundary, a small time difference will not change your Rashi. If it was, the result shows a note so you can check your birth time.",
      },
      {
        q: "Is my Rashi the same as my Sun sign?",
        a: "Not usually. Your Rashi comes from the Moon and your Sun sign comes from the Sun. They match only when both were in the same sign at your birth.",
      },
      {
        q: "What is the difference between Rashi and Lagna?",
        a: "Your Rashi is the sign of the Moon. Your Lagna is the sign rising on the eastern horizon when you were born. Lagna Finder shows your Lagna.",
      },
      {
        q: "Why is my Vedic Rashi different from my Western zodiac sign?",
        a: "Vedic astrology uses the sidereal zodiac and many Western horoscopes use the tropical zodiac, which currently differ by about 24 degrees. Western horoscopes also usually refer to the Sun sign rather than the Moon sign.",
      },
      {
        q: "Can I find my Rashi by my name?",
        a: "Not with this calculator. Some families choose a name from a syllable linked with the birth Nakshatra, and a Rashi taken from a name's first letter is a naming tradition. This calculator finds your birth Rashi from your birth details.",
      },
    ],

    video: {
      title: "Watch: What Is a Rashi?",
      youtubeUrl: "https://www.youtube.com/watch?v=ortAvdqzFjo",
    },
  },

  hi: {
    seo: {
      title: "राशि कैलकुलेटर – जन्म तिथि और समय से अपनी चंद्र राशि जानें | ज्‍योतिष आशा",
      description:
        "फ्री राशि कैलकुलेटर: अपनी जन्म तिथि, समय और स्थान डालें और जानें अपनी चंद्र राशि, नक्षत्र, पद, राशि स्वामी और चंद्रमा का अंश।",
      keywords: [
        "राशि कैलकुलेटर",
        "अपनी राशि जानें",
        "चंद्र राशि की पहचान",
        "जन्म तिथि से राशि",
        "राशि फाइंडर",
        "वैदिक राशि कैलकुलेटर",
        "मेरी क्या राशि है",
      ],
    },

    landing: {
      breadcrumb: { home: "होम", tools: "टूल्स", current: "राशि कैलकुलेटर" },
      h1: "राशि कैलकुलेटर: अपनी चंद्र राशि जानें",
      intro:
        "आपके जन्म के समय चंद्रमा जिस राशि में था, वही आपकी राशि है। अपनी जन्म तिथि, समय और स्थान डालें और जानें अपनी चंद्र राशि, नक्षत्र, पद, राशि स्वामी और चंद्रमा का अंश।",
      method: "गणना स्विस एफेमेरिस और लाहिरी अयनांश से।",
      submitLabel: "फ्री में अपनी राशि जानें",
      shows: {
        h2: "फ्री परिणाम में क्या मिलता है",
        items: [
          { title: "चंद्र राशि", body: "आपकी राशि, उसके तत्व और राशि स्वामी के साथ।" },
          { title: "नक्षत्र और पद", body: "चंद्रमा किस नक्षत्र और उसके किस चौथाई भाग में था।" },
          { title: "चंद्रमा का अंश", body: "जन्म के समय चंद्रमा आपकी राशि में कितना आगे बढ़ चुका था।" },
          { title: "जन्म समय की सूचना", body: "जब चंद्रमा राशि की सीमा के पास हो, जहाँ जन्म समय सबसे अधिक मायने रखता है।" },
        ],
      },
      sections: [
        {
          id: "rf-what",
          h2: "राशि क्या है?",
          body: [
            "राशि चक्र बारह राशियों में बँटा है। आपके जन्म के समय चंद्रमा जिस राशि में था, वही आपकी राशि है, जिसे चंद्र राशि भी कहते हैं।",
            "वैदिक ज्योतिष में चंद्रमा को मन और भावनाओं का कारक माना जाता है, इसलिए दैनिक, मासिक और वार्षिक राशिफल, कुंडली मिलान के गुण मिलान और साढ़े साती की गणना में आपकी राशि का उपयोग होता है।",
          ],
        },
        {
          id: "rf-sun",
          h2: "राशि और सूर्य राशि में अंतर",
          body: [
            "सूर्य राशि मुख्य रूप से जन्म तिथि पर निर्भर करती है, क्योंकि सूर्य एक राशि में लगभग एक महीना रहता है। आपकी राशि चंद्रमा पर निर्भर करती है, जो लगभग हर सवा दो दिन में राशि बदलता है।",
            "कई पश्चिमी राशिफल सायन राशि चक्र का उपयोग करते हैं, जबकि वैदिक ज्योतिष निरयन राशि चक्र का, और दोनों में अभी लगभग 24 अंश का अंतर है। इसीलिए आपकी वैदिक राशि पश्चिमी ज्योतिष की राशि से अलग हो सकती है।",
          ],
        },
        {
          id: "rf-lagna",
          h2: "राशि और लग्न में अंतर",
          body: [
            "राशि चंद्रमा की राशि है। लग्न वह राशि है जो जन्म के समय पूर्वी क्षितिज पर उदय हो रही थी। लग्न लगभग हर दो घंटे में बदलता है, इसलिए इसके लिए सही जन्म समय ज़रूरी है।",
            "ये कुंडली के दो अलग हिस्से हैं और अक्सर अलग-अलग राशियों में होते हैं।",
          ],
        },
        {
          id: "rf-time",
          h2: "जन्म समय और स्थान क्यों ज़रूरी हैं",
          body: [
            "चंद्रमा एक घंटे में लगभग आधा अंश चलता है। अधिकतर दिनों में वह एक ही राशि में रहता है, इसलिए समय की छोटी गलती से फर्क नहीं पड़ता। जिस दिन वह राशि बदलता है, उस दिन जन्म समय से ही आपकी राशि तय होती है।",
            "जन्म स्थान से वे निर्देशांक मिलते हैं जिनसे जन्म का स्थानीय समय निकाला जाता है। यदि चंद्रमा राशि की सीमा से एक अंश के भीतर था, तो परिणाम में इसकी सूचना मिलती है, ताकि आप अपना जन्म समय जाँच सकें।",
          ],
        },
      ],
      uses: {
        h2: "अपनी राशि का उपयोग कहाँ करें",
        links: [
          { href: "/daily-horoscope", label: "दैनिक राशिफल", note: "अपनी चंद्र राशि का आज का राशिफल पढ़ें" },
          { href: "/nakshatra", label: "नक्षत्र मार्गदर्शिका", note: "27 नक्षत्रों के बारे में जानें" },
          { href: "/tools/sadhesati-calculator", label: "साढ़े साती कैलकुलेटर", note: "साढ़े साती आपकी चंद्र राशि से देखी जाती है" },
          { href: "/tools/lagna-finder", label: "लग्न कैलकुलेटर", note: "अपना लग्न जानें" },
          { href: "/kundli-matching", label: "फ्री कुंडली मिलान", note: "36 गुण मिलान दोनों साथियों के चंद्रमा से होता है" },
          { href: "/free-kundali", label: "फ्री कुंडली", note: "अपनी पूरी जन्म कुंडली देखें" },
        ],
      },
      faqH2: "अक्सर पूछे जाने वाले प्रश्न",
    },

    faq: [
      {
        q: "मेरी राशि क्या है?",
        a: "आपके जन्म के क्षण चंद्रमा जिस राशि में था, वही आपकी राशि है। इसे चंद्र राशि भी कहते हैं।",
      },
      {
        q: "क्या केवल जन्म तिथि से राशि पता चल सकती है?",
        a: "अक्सर हाँ, पर हमेशा नहीं। चंद्रमा लगभग हर सवा दो दिन में राशि बदलता है, इसलिए जिस दिन वह राशि बदलता है, उस दिन जन्म समय से आपकी राशि तय होती है। यह कैलकुलेटर आपकी जन्म तिथि, समय और स्थान का उपयोग करता है।",
      },
      {
        q: "अगर मुझे सटीक जन्म समय नहीं पता तो क्या करूँ?",
        a: "अपना सबसे नज़दीकी अनुमान डालें। यदि चंद्रमा राशि की सीमा के पास नहीं था, तो समय के छोटे अंतर से आपकी राशि नहीं बदलेगी। यदि वह पास था, तो परिणाम में सूचना दिखेगी ताकि आप अपना जन्म समय जाँच सकें।",
      },
      {
        q: "क्या मेरी राशि और सूर्य राशि एक ही होती है?",
        a: "आमतौर पर नहीं। राशि चंद्रमा से और सूर्य राशि सूर्य से तय होती है। ये तभी समान होती हैं जब जन्म के समय दोनों एक ही राशि में हों।",
      },
      {
        q: "राशि और लग्न में क्या अंतर है?",
        a: "राशि चंद्रमा की राशि है। लग्न वह राशि है जो जन्म के समय पूर्वी क्षितिज पर उदय हो रही थी। लग्न कैलकुलेटर से आप अपना लग्न जान सकते हैं।",
      },
      {
        q: "मेरी वैदिक राशि पश्चिमी राशि से अलग क्यों है?",
        a: "वैदिक ज्योतिष निरयन राशि चक्र का और कई पश्चिमी राशिफल सायन राशि चक्र का उपयोग करते हैं, जिनमें अभी लगभग 24 अंश का अंतर है। पश्चिमी राशिफल आमतौर पर चंद्र राशि की जगह सूर्य राशि की बात करते हैं।",
      },
      {
        q: "क्या नाम से राशि पता की जा सकती है?",
        a: "इस कैलकुलेटर से नहीं। कुछ परिवारों में जन्म नक्षत्र से जुड़े अक्षर पर नाम रखा जाता है, और नाम के पहले अक्षर से राशि देखना नामकरण की परंपरा है। यह कैलकुलेटर आपके जन्म विवरण से आपकी जन्म राशि निकालता है।",
      },
    ],

    video: {
      title: "देखें: राशि क्या है?",
      youtubeUrl: "https://www.youtube.com/watch?v=ortAvdqzFjo",
    },
  },
};
