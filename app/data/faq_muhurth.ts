export interface FAQItem {
  q: string;
  a: string;
  q_hi?: string;
  a_hi?: string;
}

export const faq_muhurth: Record<string, FAQItem[]> = {
  naamkaran: [
    {
        q: "Which Nakshatra is best for Naamkaran Muhurat?",
        a: "Rohini, Mrigashira, Pushya, and Revati Nakshatras are considered auspicious for baby naming ceremonies.",
        q_hi: "नामकरण मुहूर्त के लिए कौन सा नक्षत्र सबसे शुभ है?",
        a_hi: "रोहिणी, मृगशिरा, पुष्य और रेवती नक्षत्र नामकरण संस्कार के लिए शुभ माने जाते हैं।",
    },
    {
        q: "Which Tithi should be avoided for Naamkaran?",
        a: "Avoid Chaturthi, Ashtami, and Amavasya Tithis for best results.",
        q_hi: "नामकरण के लिए कौन सी तिथि से बचना चाहिए?",
        a_hi: "सर्वोत्तम परिणाम के लिए चतुर्थी, अष्टमी और अमावस्या तिथियों से बचें।",
    },
    {
        q: "What is the best time or month for Naamkaran ceremony?",
        a: "The Naamkaran ceremony is usually performed on the 11th, 12th, or 21st day after birth, but astrologers may choose an auspicious day based on the child’s birth Nakshatra and Tithi.",
        q_hi: "नामकरण संस्कार के लिए सबसे शुभ समय या महीना कौन सा है?",
        a_hi: "नामकरण संस्कार सामान्यतः जन्म के 11वें, 12वें या 21वें दिन किया जाता है, परंतु ज्योतिषी बच्चे के जन्म नक्षत्र और तिथि के आधार पर शुभ दिन चुन सकते हैं।",
    },
    {
        q: "Can Naamkaran be done without a priest?",
        a: "Yes, Naamkaran can be done at home by parents or elders if a priest is not available, but following the proper Muhurat and chanting the name with devotion is essential.",
        q_hi: "क्या नामकरण पुजारी के बिना किया जा सकता है?",
        a_hi: "हां, यदि पुजारी उपलब्ध न हो तो माता-पिता या घर के बड़े सदस्य घर पर ही नामकरण कर सकते हैं, परंतु सही मुहूर्त का पालन करना और श्रद्धा से नाम का उच्चारण करना आवश्यक है।",
    },
    {
        q: "Why is Naamkaran Muhurat important?",
        a: "Naamkaran Muhurat ensures that the child’s name aligns with their Nakshatra and planetary vibrations, bringing harmony, health, and success in life.",
        q_hi: "नामकरण मुहूर्त का महत्व क्यों है?",
        a_hi: "नामकरण मुहूर्त यह सुनिश्चित करता है कि बच्चे का नाम उसके नक्षत्र और ग्रहों की ऊर्जा के साथ मेल खाए, जो जीवन में सामंजस्य, स्वास्थ्य और सफलता लाता है।",
    },
  ],

  marriage: [
    {
        q: "Which Nakshatra is auspicious for Marriage Muhurat?",
        a: "Rohini, Magha, Anuradha, Uttara Phalguni, and Revati Nakshatras are considered highly auspicious for marriage ceremonies as they bring harmony and lifelong stability.",
        q_hi: "विवाह मुहूर्त के लिए कौन सा नक्षत्र शुभ है?",
        a_hi: "रोहिणी, मघा, अनुराधा, उत्तर फाल्गुनी और रेवती नक्षत्र विवाह समारोह के लिए अत्यंत शुभ माने जाते हैं, क्योंकि ये सामंजस्य और जीवनभर की स्थिरता लाते हैं।",
    },
    {
        q: "Which Tithis should be avoided for Marriage Muhurat?",
        a: "Avoid Chaturthi, Ashtami, Navami, Chaturdashi, Amavasya, and Purnima Tithis, as these are generally considered inauspicious for weddings.",
        q_hi: "विवाह मुहूर्त के लिए कौन सी तिथियों से बचना चाहिए?",
        a_hi: "चतुर्थी, अष्टमी, नवमी, चतुर्दशी, अमावस्या और पूर्णिमा तिथियों से बचें, क्योंकि इन्हें विवाह के लिए सामान्यतः अशुभ माना जाता है।",
    },
    {
        q: "Which month is best for marriage according to Hindu Panchang?",
        a: "The months of Margashirsha, Pausha, Magha, and Phalguna (approximately December to March) are considered ideal for Hindu marriages, depending on planetary alignments and Nakshatra strength.",
        q_hi: "हिंदू पंचांग के अनुसार विवाह के लिए कौन सा महीना सबसे अच्छा है?",
        a_hi: "मार्गशीर्ष, पौष, माघ और फाल्गुन (लगभग दिसंबर से मार्च) के महीने हिंदू विवाह के लिए आदर्श माने जाते हैं, यह ग्रहों की स्थिति और नक्षत्र बल पर निर्भर करता है।",
    },
    {
        q: "Why is Muhurat important for marriage?",
        a: "A marriage Muhurat ensures that the planetary positions during the ceremony favor happiness, compatibility, and prosperity in the couple’s married life.",
        q_hi: "विवाह के लिए मुहूर्त क्यों महत्वपूर्ण है?",
        a_hi: "विवाह मुहूर्त यह सुनिश्चित करता है कि समारोह के समय ग्रहों की स्थिति दंपति के वैवाहिक जीवन में खुशी, अनुकूलता और समृद्धि के पक्ष में हो।",
    },
    {
        q: "Can marriage be done without checking Muhurat?",
        a: "While marriages can be conducted anytime, performing it during a proper Muhurat brings peace, reduces future conflicts, and aligns the couple’s life paths according to Vedic astrology.",
        q_hi: "क्या मुहूर्त देखे बिना विवाह किया जा सकता है?",
        a_hi: "विवाह किसी भी समय किया जा सकता है, परंतु उचित मुहूर्त में करने से शांति मिलती है, भविष्य के संघर्ष कम होते हैं और वैदिक ज्योतिष के अनुसार दंपति के जीवन-मार्ग संरेखित होते हैं।",
    },
  ],

  vehicle: [
    {
        q: "Which day is best to buy a new vehicle?",
        a: "Monday, Wednesday, Thursday, and Friday are considered the most auspicious days to buy a new vehicle according to the Hindu Panchang.",
        q_hi: "नया वाहन खरीदने के लिए कौन सा दिन सबसे अच्छा है?",
        a_hi: "सोमवार, बुधवार, गुरुवार और शुक्रवार हिंदू पंचांग के अनुसार नया वाहन खरीदने के लिए सबसे शुभ दिन माने जाते हैं।",
    },
    {
        q: "Which Nakshatra is good for purchasing a vehicle?",
        a: "Rohini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, and Revati Nakshatras are highly favorable for buying a new car or bike.",
        q_hi: "वाहन खरीदने के लिए कौन सा नक्षत्र अच्छा है?",
        a_hi: "रोहिणी, मृगशिरा, पुनर्वसु, पुष्य, हस्त, स्वाति और रेवती नक्षत्र नई कार या बाइक खरीदने के लिए अत्यंत अनुकूल हैं।",
    },
    {
        q: "Which Tithi should be avoided while buying a vehicle?",
        a: "Avoid Chaturthi, Ashtami, Navami, and Amavasya Tithis as these are not considered suitable for any kind of new purchase or investment.",
        q_hi: "वाहन खरीदते समय कौन सी तिथि से बचना चाहिए?",
        a_hi: "चतुर्थी, अष्टमी, नवमी और अमावस्या तिथियों से बचें, क्योंकि इन्हें किसी भी नई खरीदारी या निवेश के लिए उपयुक्त नहीं माना जाता।",
    },
    {
        q: "Why should we check Muhurat before buying a vehicle?",
        a: "Buying a vehicle during an auspicious Muhurat ensures safety, prosperity, and long-term good fortune, reducing the chances of accidents or losses.",
        q_hi: "वाहन खरीदने से पहले मुहूर्त क्यों देखना चाहिए?",
        a_hi: "शुभ मुहूर्त में वाहन खरीदने से सुरक्षा, समृद्धि और दीर्घकालिक सौभाग्य सुनिश्चित होता है, जिससे दुर्घटनाओं या हानि की संभावना कम होती है।",
    },
    {
        q: "Is Saturday good for buying a new vehicle?",
        a: "Saturday is generally avoided for purchasing vehicles because it is ruled by Saturn (Shani), which may delay benefits or create hurdles in usage and maintenance.",
        q_hi: "नया वाहन खरीदने के लिए क्या शनिवार अच्छा है?",
        a_hi: "शनिवार को सामान्यतः वाहन खरीदने के लिए टाला जाता है क्योंकि यह शनि ग्रह द्वारा शासित है, जो उपयोग और रखरखाव में देरी या बाधाएं ला सकता है।",
    },
  ],

  childbirth: [
    {
        q: "Which Nakshatra is auspicious for childbirth?",
        a: "Rohini, Pushya, Hasta, Anuradha, and Revati Nakshatras are considered highly auspicious for childbirth as they bless the baby with health, happiness, and prosperity.",
        q_hi: "बच्चे के जन्म के लिए कौन सा नक्षत्र शुभ है?",
        a_hi: "रोहिणी, पुष्य, हस्त, अनुराधा और रेवती नक्षत्र बच्चे के जन्म के लिए अत्यंत शुभ माने जाते हैं, क्योंकि ये शिशु को स्वास्थ्य, खुशी और समृद्धि का आशीर्वाद देते हैं।",
    },
    {
        q: "Which Tithis should be avoided for childbirth rituals?",
        a: "Avoid Chaturthi, Ashtami, Navami, Chaturdashi, and Amavasya Tithis for important childbirth-related rituals or naming ceremonies.",
        q_hi: "जन्म से जुड़े अनुष्ठानों के लिए कौन सी तिथियों से बचना चाहिए?",
        a_hi: "महत्वपूर्ण जन्म-संबंधी अनुष्ठानों या नामकरण समारोहों के लिए चतुर्थी, अष्टमी, नवमी, चतुर्दशी और अमावस्या तिथियों से बचें।",
    },
    {
        q: "What is the best time to perform childbirth-related ceremonies?",
        a: "The best time for childbirth rituals like Jatakarma and Naamkaran is during the Shukla Paksha when Moon is strong and benefic planets are well placed in the child’s horoscope.",
        q_hi: "जन्म से जुड़े समारोह करने का सबसे अच्छा समय कौन सा है?",
        a_hi: "जातकर्म और नामकरण जैसे जन्म-संबंधी संस्कारों के लिए शुक्ल पक्ष का समय सबसे उत्तम है, जब चंद्रमा बलवान हो और शुभ ग्रह बच्चे की कुंडली में अच्छी स्थिति में हों।",
    },
    {
        q: "Why is Muhurat important for childbirth?",
        a: "Performing childbirth rituals in a proper Muhurat ensures that the baby’s birth energy aligns harmoniously with planetary forces, promoting a healthy and prosperous life.",
        q_hi: "बच्चे के जन्म के लिए मुहूर्त क्यों महत्वपूर्ण है?",
        a_hi: "उचित मुहूर्त में जन्म-संबंधी संस्कार करने से शिशु की जन्म-ऊर्जा ग्रहों की शक्तियों के साथ सामंजस्य में आती है, जो स्वस्थ और समृद्ध जीवन को बढ़ावा देती है।",
    },
    {
        q: "Can astrology predict the exact childbirth timing?",
        a: "Yes, Vedic astrology can estimate the favorable period or probable dates for childbirth by studying the Dasha system and planetary transits of the expecting mother.",
        q_hi: "क्या ज्योतिष सटीक प्रसव समय की भविष्यवाणी कर सकता है?",
        a_hi: "हां, वैदिक ज्योतिष गर्भवती माता की दशा प्रणाली और ग्रहों के गोचर का अध्ययन करके प्रसव की अनुकूल अवधि या संभावित तिथियों का अनुमान लगा सकता है।",
    },
  ],

  gold: [
    {
        q: "Which day is best to buy gold as per Hindu Panchang?",
        a: "Monday, Wednesday, Thursday, and Friday are considered auspicious days to buy gold as they attract prosperity and long-lasting wealth.",
        q_hi: "हिंदू पंचांग के अनुसार सोना खरीदने के लिए कौन सा दिन सबसे अच्छा है?",
        a_hi: "सोमवार, बुधवार, गुरुवार और शुक्रवार सोना खरीदने के लिए शुभ माने जाते हैं क्योंकि ये समृद्धि और स्थायी धन को आकर्षित करते हैं।",
    },
    {
        q: "Which Nakshatra is auspicious for gold buying?",
        a: "Pushya, Rohini, Uttara Phalguni, Swati, and Revati Nakshatras are the most favorable for purchasing gold, silver, or precious ornaments.",
        q_hi: "सोना खरीदने के लिए कौन सा नक्षत्र शुभ है?",
        a_hi: "पुष्य, रोहिणी, उत्तर फाल्गुनी, स्वाति और रेवती नक्षत्र सोना, चांदी या कीमती आभूषण खरीदने के लिए सबसे अनुकूल हैं।",
    },
    {
        q: "Why is Akshaya Tritiya considered special for gold buying?",
        a: "Akshaya Tritiya is ruled by Lord Vishnu and believed to bring endless prosperity. Any purchase made on this day is said to multiply wealth and success.",
        q_hi: "अक्षय तृतीया को सोना खरीदने के लिए विशेष क्यों माना जाता है?",
        a_hi: "अक्षय तृतीया भगवान विष्णु द्वारा शासित है और अनंत समृद्धि लाने वाली मानी जाती है। इस दिन की गई खरीदारी धन और सफलता को कई गुना बढ़ाती है।",
    },
    {
        q: "Is Dhanteras a good day to buy gold?",
        a: "Yes, Dhanteras is one of the most auspicious days to buy gold, silver, or new items, as it marks the beginning of Diwali and symbolizes inviting Goddess Lakshmi into one’s home.",
        q_hi: "क्या धनतेरस सोना खरीदने के लिए अच्छा दिन है?",
        a_hi: "हां, धनतेरस सोना, चांदी या नई वस्तुएं खरीदने के सबसे शुभ दिनों में से एक है, क्योंकि यह दिवाली की शुरुआत का प्रतीक है और घर में देवी लक्ष्मी का आह्वान करता है।",
    },
    {
        q: "Which Tithis should be avoided while buying gold?",
        a: "Avoid Chaturthi, Ashtami, Navami, Chaturdashi, and Amavasya Tithis as they are not considered favorable for making new investments or major purchases.",
        q_hi: "सोना खरीदते समय कौन सी तिथियों से बचना चाहिए?",
        a_hi: "चतुर्थी, अष्टमी, नवमी, चतुर्दशी और अमावस्या तिथियों से बचें, क्योंकि इन्हें नए निवेश या बड़ी खरीदारी के लिए अनुकूल नहीं माना जाता।",
    },
  ],

  travel: [
    {
        q: "Which days are auspicious for starting a journey or foreign travel?",
        a: "Wednesday, Thursday, and Friday are considered auspicious for starting any journey, especially foreign or business travel, according to the Hindu Panchang.",
        q_hi: "यात्रा या विदेश यात्रा शुरू करने के लिए कौन से दिन शुभ हैं?",
        a_hi: "बुधवार, गुरुवार और शुक्रवार हिंदू पंचांग के अनुसार किसी भी यात्रा, विशेष रूप से विदेश या व्यावसायिक यात्रा शुरू करने के लिए शुभ माने जाते हैं।",
    },
    {
        q: "Which Nakshatra is good for foreign travel?",
        a: "Punarvasu, Swati, Anuradha, and Shravana Nakshatras are favorable for travel as they bring safety, success, and smooth experiences on the journey.",
        q_hi: "विदेश यात्रा के लिए कौन सा नक्षत्र अच्छा है?",
        a_hi: "पुनर्वसु, स्वाति, अनुराधा और श्रवण नक्षत्र यात्रा के लिए अनुकूल हैं क्योंकि ये सुरक्षा, सफलता और यात्रा में सहजता लाते हैं।",
    },
    {
        q: "Which Tithis should be avoided for travel?",
        a: "Avoid Chaturthi, Ashtami, Navami, Chaturdashi, and Amavasya Tithis for beginning new journeys, as these may cause delays or obstacles.",
        q_hi: "यात्रा के लिए कौन सी तिथियों से बचना चाहिए?",
        a_hi: "नई यात्राएं शुरू करने के लिए चतुर्थी, अष्टमी, नवमी, चतुर्दशी और अमावस्या तिथियों से बचें, क्योंकि ये देरी या बाधाएं ला सकती हैं।",
    },
    {
        q: "Why is Muhurat important before starting travel?",
        a: "Choosing a proper Muhurat before starting travel ensures divine protection, smooth progress, and positive outcomes, reducing the chances of mishaps or losses.",
        q_hi: "यात्रा शुरू करने से पहले मुहूर्त क्यों महत्वपूर्ण है?",
        a_hi: "यात्रा से पहले उचित मुहूर्त चुनने से दिव्य सुरक्षा, सहज प्रगति और सकारात्मक परिणाम सुनिश्चित होते हैं, जिससे दुर्घटना या हानि की संभावना कम होती है।",
    },
    {
        q: "Is Saturday good for travel or foreign trips?",
        a: "Saturday is generally avoided for starting long or important journeys, as it is ruled by Saturn (Shani), which may cause delays or fatigue during travel.",
        q_hi: "क्या शनिवार यात्रा या विदेश यात्रा के लिए अच्छा है?",
        a_hi: "शनिवार को महत्वपूर्ण या लंबी यात्राएं शुरू करने के लिए सामान्यतः टाला जाता है, क्योंकि यह शनि ग्रह द्वारा शासित है, जो यात्रा में देरी या थकान का कारण बन सकता है।",
    },
  ],
  grah_pravesh: [
    {
        q: "Which Tithis are best for Grah Pravesh Muhurat?",
        a: "Dwitiya, Tritiya, Panchami, Dashami, and Ekadashi Tithis are considered auspicious for Grah Pravesh as they bring prosperity, peace, and positive energy into the new home.",
        q_hi: "गृह प्रवेश मुहूर्त के लिए कौन सी तिथियां सबसे अच्छी हैं?",
        a_hi: "द्वितीया, तृतीया, पंचमी, दशमी और एकादशी तिथियां गृह प्रवेश के लिए शुभ मानी जाती हैं क्योंकि ये नए घर में समृद्धि, शांति और सकारात्मक ऊर्जा लाती हैं।",
    },
    {
        q: "Which Nakshatra is good for Griha Pravesh?",
        a: "Rohini, Mrigashira, Pushya, Anuradha, and Revati Nakshatras are most favorable for Grah Pravesh. These stars ensure happiness and stability in the new house.",
        q_hi: "गृह प्रवेश के लिए कौन सा नक्षत्र अच्छा है?",
        a_hi: "रोहिणी, मृगशिरा, पुष्य, अनुराधा और रेवती नक्षत्र गृह प्रवेश के लिए सबसे अनुकूल हैं। ये नक्षत्र नए घर में खुशी और स्थिरता सुनिश्चित करते हैं।",
    },
    {
        q: "Which months are ideal for Grah Pravesh ceremony?",
        a: "The months of Magha, Phalguna, Vaishakha, and Jyeshtha are generally considered best for Grah Pravesh. Avoid the months of Ashadha, Shravan, and Bhadrapada when most ceremonies are paused (Chaturmas).",
        q_hi: "गृह प्रवेश समारोह के लिए कौन से महीने आदर्श हैं?",
        a_hi: "माघ, फाल्गुन, वैशाख और ज्येष्ठ के महीने सामान्यतः गृह प्रवेश के लिए सर्वोत्तम माने जाते हैं। आषाढ़, श्रावण और भाद्रपद (चातुर्मास) के महीनों से बचें, जब अधिकांश समारोह रुक जाते हैं।",
    },
    {
        q: "Why is Muhurat important for Grah Pravesh?",
        a: "Performing Grah Pravesh during a favorable Muhurat ensures that the planetary energies are balanced, inviting prosperity, health, and harmony for all family members.",
        q_hi: "गृह प्रवेश के लिए मुहूर्त क्यों महत्वपूर्ण है?",
        a_hi: "अनुकूल मुहूर्त में गृह प्रवेश करने से यह सुनिश्चित होता है कि ग्रहों की ऊर्जा संतुलित हो, जो सभी परिवार के सदस्यों के लिए समृद्धि, स्वास्थ्य और सामंजस्य को आमंत्रित करती है।",
    },
    {
        q: "What should be avoided on the day of Grah Pravesh?",
        a: "Avoid entering the house during Amavasya or when Rahu Kalam is active. Ensure the ceremony is done in Shukla Paksha and the east-facing main door is decorated with torans and Kalash for good fortune.",
        q_hi: "गृह प्रवेश के दिन क्या टालना चाहिए?",
        a_hi: "अमावस्या के दिन या राहु काल के समय घर में प्रवेश करने से बचें। सुनिश्चित करें कि समारोह शुक्ल पक्ष में हो और पूर्व दिशा का मुख्य द्वार तोरण व कलश से सजाया गया हो।",
    },
    ],

  property: [
    {
        q: "Which Tithi is best for property purchase?",
        a: "Dwitiya, Tritiya, Panchami, Dashami, and Ekadashi Tithis are considered auspicious for buying or registering property, as they bring stability and long-term prosperity.",
        q_hi: "संपत्ति खरीदने के लिए कौन सी तिथि सबसे अच्छी है?",
        a_hi: "द्वितीया, तृतीया, पंचमी, दशमी और एकादशी तिथियां संपत्ति खरीदने या रजिस्ट्री के लिए शुभ मानी जाती हैं, क्योंकि ये स्थिरता और दीर्घकालिक समृद्धि लाती हैं।",
    },
    {
        q: "Which Nakshatra is favorable for buying land or a house?",
        a: "Rohini, Mrigashira, Pushya, Uttara Phalguni, and Revati Nakshatras are highly favorable for purchasing land, plots, or houses according to Vedic astrology.",
        q_hi: "ज़मीन या मकान खरीदने के लिए कौन सा नक्षत्र अनुकूल है?",
        a_hi: "रोहिणी, मृगशिरा, पुष्य, उत्तर फाल्गुनी और रेवती नक्षत्र वैदिक ज्योतिष के अनुसार ज़मीन, प्लॉट या मकान खरीदने के लिए अत्यंत अनुकूल हैं।",
    },
    {
        q: "Which Tithis should be avoided for property registration?",
        a: "Avoid Chaturthi, Ashtami, Navami, Chaturdashi, and Amavasya Tithis for property purchase or registration, as these are not considered favorable for major investments.",
        q_hi: "संपत्ति रजिस्ट्री के लिए कौन सी तिथियों से बचना चाहिए?",
        a_hi: "संपत्ति खरीदने या रजिस्ट्री के लिए चतुर्थी, अष्टमी, नवमी, चतुर्दशी और अमावस्या तिथियों से बचें, क्योंकि इन्हें बड़े निवेश के लिए अनुकूल नहीं माना जाता।",
    },
    {
        q: "Why is Muhurat important for buying property?",
        a: "A favorable Muhurat for property purchase ensures the investment brings long-term financial stability, protects against legal disputes, and aligns with positive planetary energy.",
        q_hi: "संपत्ति खरीदने के लिए मुहूर्त क्यों महत्वपूर्ण है?",
        a_hi: "संपत्ति खरीदने के लिए अनुकूल मुहूर्त यह सुनिश्चित करता है कि निवेश दीर्घकालिक आर्थिक स्थिरता लाए, कानूनी विवादों से बचाए और सकारात्मक ग्रहों की ऊर्जा के साथ संरेखित हो।",
    },
    {
        q: "Is it necessary to check Muhurat before signing property documents?",
        a: "While not mandatory, checking a Muhurat before signing property documents is recommended in Vedic tradition to ensure the transaction proceeds smoothly and brings lasting prosperity.",
        q_hi: "क्या संपत्ति के दस्तावेज़ों पर हस्ताक्षर करने से पहले मुहूर्त देखना आवश्यक है?",
        a_hi: "यह अनिवार्य नहीं है, परंतु वैदिक परंपरा में संपत्ति के दस्तावेज़ों पर हस्ताक्षर करने से पहले मुहूर्त देखने की सलाह दी जाती है ताकि सौदा सुचारू रूप से पूरा हो और स्थायी समृद्धि लाए।",
    },
  ],
};

export default faq_muhurth;
