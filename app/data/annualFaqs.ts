
export function getAnnualFaqs(
  slug: string,
  locale: string,
  year: number
) {

  if (slug === "child-birth-muhurat") {

    if (locale === "hi") {
      return [
         {
        q: `${year} में चाइल्ड बर्थ मुहूर्त क्या है?`,
        a: `चाइल्ड बर्थ मुहूर्त ${year} पंचांग के आधार पर बच्चे के जन्म के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
    },
    {
        q: `चाइल्ड बर्थ मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है ताकि प्रसव के लिए शुभ समय चुना जा सके।`,
    },
    {
        q: `क्या चाइल्ड बर्थ मुहूर्त का उपयोग सी-सेक्शन के लिए किया जा सकता है?`,
        a: `हाँ। डॉक्टर द्वारा दी गई समय-सीमा के भीतर कई परिवार सी-सेक्शन के लिए शुभ मुहूर्त का चयन करते हैं।`,
    },
    {
        q: `क्या चाइल्ड बर्थ मुहूर्त नॉर्मल डिलीवरी के लिए उपयोगी है?`,
        a: `नॉर्मल डिलीवरी का समय नियंत्रित नहीं किया जा सकता, लेकिन संभावित प्रसव तिथि के आसपास शुभ समयावधियाँ पहचानी जा सकती हैं।`,
    },
    {
        q: `चाइल्ड बर्थ मुहूर्त के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `अश्विनी, रोहिणी, मृगशिरा, पुष्य, हस्त, अनुराधा और रेवती जैसे नक्षत्र पारंपरिक रूप से शुभ माने जाते हैं।`,
    },
    {
        q: `बच्चे के जन्म के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः शुभ मानी जाती हैं।`,
    },
    {
        q: `क्या कैलेंडर में दिखाई गई सभी तिथियाँ समान रूप से शुभ हैं?`,
        a: `नहीं। कुछ तिथियों का मुहूर्त स्कोर अधिक हो सकता है और वे अन्य तिथियों की तुलना में अधिक अनुकूल मानी जाती हैं।`,
    },
    {
        q: `क्या व्यक्तिगत चाइल्ड बर्थ मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। जन्म विवरण आधारित व्यक्तिगत मुहूर्त सामान्य वार्षिक कैलेंडर की तुलना में अधिक सटीक मार्गदर्शन प्रदान कर सकता है।`,
    },
    {
        q: `क्या चाइल्ड बर्थ मुहूर्त बच्चे के सफल भविष्य की गारंटी देता है?`,
        a: `नहीं। मुहूर्त केवल शुभ समय चुनने में सहायता करता है, भविष्य की गारंटी नहीं देता।`,
    },
    {
        q: `क्या चाइल्ड बर्थ मुहूर्त चिकित्सा सलाह का विकल्प है?`,
        a: `नहीं। माता और शिशु का स्वास्थ्य सर्वोच्च प्राथमिकता है। मुहूर्त केवल डॉक्टर द्वारा स्वीकृत समयावधि के भीतर ही देखा जाना चाहिए।`,
    },
      ];
    }

    return [
      {
        q: `What is Child Birth Muhurat ${year}?`,
        a: `Child Birth Muhurat ${year} refers to auspicious dates and timings selected for childbirth based on Panchang principles such as Tithi, Nakshatra, and weekday combinations.`,
    },
    {
        q: `How is Child Birth Muhurat calculated?`,
        a: `Child Birth Muhurat is calculated by evaluating Tithi, Nakshatra, weekday, and other traditional Panchang factors to identify favorable dates for childbirth.`,
    },
    {
        q: `Can Child Birth Muhurat be used for a C-Section?`,
        a: `Yes. Many families use Child Birth Muhurat while planning a medically approved C-Section and select the most suitable time within the doctor's recommended schedule.`,
    },
    {
        q: `Can Child Birth Muhurat be used for normal delivery?`,
        a: `Normal delivery timings cannot be controlled, but favorable dates and periods around the expected due date can still be identified using Muhurat principles.`,
    },
    {
        q: `Which Nakshatras are considered favorable for Child Birth Muhurat?`,
        a: `Traditionally, Nakshatras such as Ashwini, Rohini, Mrigashira, Pushya, Hasta, Anuradha, and Revati are often considered favorable for childbirth-related Muhurats.`,
    },
    {
        q: `Which Tithis are considered auspicious for childbirth?`,
        a: `Certain Tithis such as Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
        q: `Are all dates shown in the calendar equally favorable?`,
        a: `No. Some dates may receive higher Muhurat scores due to stronger Panchang combinations and are generally considered more favorable.`,
    },
    {
        q: `Do I still need a personalized Child Birth Muhurat?`,
        a: `Yes. A personalized Muhurat based on the parents' and child's birth details can provide more specific recommendations than a general annual calendar.`,
    },
    {
        q: `Can Child Birth Muhurat guarantee a successful future for the child?`,
        a: `No. Muhurat is traditionally used to select supportive timings and cannot guarantee specific life outcomes or future success.`,
    },
    {
        q: `Is Child Birth Muhurat a substitute for medical advice?`,
        a: `No. Medical guidance and the mother's health should always remain the highest priority. Muhurat should be considered only within medically approved schedules.`,
    },

    ];
  }

  if (slug === "marriage-muhurat") {

    if (locale === "hi") {
      return [
         {
        q: `${year} में विवाह मुहूर्त क्या है?`,
        a: `विवाह मुहूर्त ${year} पंचांग के आधार पर विवाह के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
      },
      {
        q: `विवाह मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार, लग्न और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है।`,
      },
      {
        q: `क्या सभी विवाह तिथियाँ समान रूप से शुभ होती हैं?`,
        a: `नहीं। कुछ तिथियों में ग्रह और पंचांग संयोजन अधिक अनुकूल होते हैं, इसलिए उनका महत्व अधिक माना जाता है।`,
      },
      {
        q: `विवाह के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `रोहिणी, मृगशिरा, उत्तरा फाल्गुनी, हस्त, स्वाती, अनुराधा और रेवती जैसे नक्षत्र सामान्यतः शुभ माने जाते हैं।`,
      },
      {
        q: `विवाह के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या विवाह मुहूर्त कुंडली मिलान का विकल्प है?`,
        a: `नहीं। मुहूर्त और कुंडली मिलान दोनों अलग प्रक्रियाएँ हैं और दोनों का अपना महत्व है।`,
      },
      {
        q: `क्या व्यक्तिगत विवाह मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। दूल्हा और दुल्हन की जन्म कुंडली के आधार पर व्यक्तिगत मुहूर्त अधिक सटीक माना जाता है।`,
      },
      {
        q: `क्या विवाह मुहूर्त सफल वैवाहिक जीवन की गारंटी देता है?`,
        a: `नहीं। मुहूर्त केवल शुभ समय चुनने में सहायता करता है, वैवाहिक सफलता कई अन्य कारकों पर निर्भर करती है।`,
      },
      {
        q: `क्या विवाह मुहूर्त केवल हिंदू विवाहों के लिए उपयोग किया जाता है?`,
        a: `मुख्य रूप से यह हिंदू परंपरा पर आधारित है, लेकिन इसका उपयोग करने का निर्णय व्यक्तिगत होता है।`,
      },
      {
        q: `क्या विवाह मुहूर्त पहले से योजना बनाने में मदद करता है?`,
        a: `हाँ। वार्षिक मुहूर्त कैलेंडर परिवारों को विवाह की तैयारी और आयोजन पहले से करने में सहायता करता है।`,
      },
      ];
    }

    return [
      {
      q: `What is Marriage Muhurat ${year}?`,
      a: `Marriage Muhurat ${year} refers to auspicious dates and timings selected for weddings based on Panchang principles and traditional Vedic astrology.`,
    },
    {
      q: `How is Marriage Muhurat calculated?`,
      a: `Marriage Muhurat is calculated by analyzing Tithi, Nakshatra, weekday, Lagna, and other important Panchang factors.`,
    },
    {
      q: `Are all wedding dates equally favorable?`,
      a: `No. Some dates receive stronger Panchang and planetary combinations and are generally considered more auspicious.`,
    },
    {
      q: `Which Nakshatras are considered favorable for Marriage Muhurat?`,
      a: `Nakshatras such as Rohini, Mrigashira, Uttara Phalguni, Hasta, Swati, Anuradha, and Revati are commonly preferred.`,
    },
    {
      q: `Which Tithis are considered auspicious for marriage?`,
      a: `Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
      q: `Can Marriage Muhurat replace horoscope matching?`,
      a: `No. Muhurat selection and horoscope matching are separate processes and both have their own significance.`,
    },
    {
      q: `Do I still need a personalized Marriage Muhurat?`,
      a: `Yes. A Muhurat based on the bride and groom's birth details can provide more specific recommendations.`,
    },
    {
      q: `Can Marriage Muhurat guarantee a successful married life?`,
      a: `No. Muhurat helps identify supportive timings but cannot guarantee specific life outcomes.`,
    },
    {
      q: `Is Marriage Muhurat used only for Hindu weddings?`,
      a: `It is primarily based on Hindu traditions, though its use depends on personal preference.`,
    },
    {
      q: `Can Marriage Muhurat help with wedding planning?`,
      a: `Yes. Annual Muhurat calendars help families plan ceremonies and related arrangements well in advance.`,
    },
    ];
  }

  if (slug === "grah-pravesh-muhurat") {

    if (locale === "hi") {
      return [
        {
        q: `${year} में गृह प्रवेश मुहूर्त क्या है?`,
        a: `गृह प्रवेश मुहूर्त ${year} नए घर में प्रवेश और गृह प्रवेश पूजा के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
      },
      {
        q: `गृह प्रवेश मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार, लग्न और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है।`,
      },
      {
        q: `क्या नए घर में प्रवेश के लिए मुहूर्त आवश्यक है?`,
        a: `यह व्यक्तिगत आस्था का विषय है, लेकिन कई परिवार शुभ समय में गृह प्रवेश करना पसंद करते हैं।`,
      },
      {
        q: `गृह प्रवेश के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `रोहिणी, मृगशिरा, उत्तरा फाल्गुनी, हस्त, अनुराधा, उत्तराषाढ़ा और रेवती जैसे नक्षत्र सामान्यतः शुभ माने जाते हैं।`,
      },
      {
        q: `गृह प्रवेश के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या गृह प्रवेश से पहले पूजा करना आवश्यक है?`,
        a: `अनेक परिवार गृह प्रवेश से पहले वास्तु और धार्मिक परंपराओं के अनुसार पूजा करते हैं।`,
      },
      {
        q: `क्या सभी तिथियाँ गृह प्रवेश के लिए समान रूप से शुभ होती हैं?`,
        a: `नहीं। कुछ तिथियों में पंचांग और ग्रह स्थितियाँ अधिक अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या व्यक्तिगत गृह प्रवेश मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। परिवार की जन्म कुंडलियों और स्थान के आधार पर व्यक्तिगत मुहूर्त अधिक सटीक माना जाता है।`,
      },
      {
        q: `क्या गृह प्रवेश मुहूर्त घर में सुख और समृद्धि की गारंटी देता है?`,
        a: `नहीं। मुहूर्त केवल शुभ समय चुनने में सहायता करता है, परिणाम कई अन्य कारकों पर निर्भर करते हैं।`,
      },
      {
        q: `क्या गृह प्रवेश मुहूर्त केवल नए घरों के लिए होता है?`,
        a: `मुख्य रूप से नए घर में प्रवेश के लिए उपयोग किया जाता है, लेकिन कुछ लोग बड़े नवीनीकरण के बाद भी इसका उपयोग करते हैं।`,
      },
      ];
    }

    return [
      {
      q: `What is Grah Pravesh Muhurat ${year}?`,
      a: `Grah Pravesh Muhurat ${year} refers to auspicious dates and timings selected for entering a new home and performing housewarming rituals.`,
    },
    {
      q: `How is Grah Pravesh Muhurat calculated?`,
      a: `It is calculated by analyzing Tithi, Nakshatra, weekday, Lagna, and other important Panchang factors.`,
    },
    {
      q: `Is Grah Pravesh Muhurat necessary for entering a new house?`,
      a: `It depends on personal belief, but many families prefer entering a new home during an auspicious Muhurat.`,
    },
    {
      q: `Which Nakshatras are considered favorable for Grah Pravesh?`,
      a: `Nakshatras such as Rohini, Mrigashira, Uttara Phalguni, Hasta, Anuradha, Uttara Ashadha, and Revati are commonly preferred.`,
    },
    {
      q: `Which Tithis are considered auspicious for Grah Pravesh?`,
      a: `Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
      q: `Should a housewarming puja be performed before entering the house?`,
      a: `Many families perform traditional rituals and pujas before entering a new home.`,
    },
    {
      q: `Are all dates equally favorable for Grah Pravesh?`,
      a: `No. Some dates have stronger Panchang and planetary combinations and are generally considered more auspicious.`,
    },
    {
      q: `Do I still need a personalized Grah Pravesh Muhurat?`,
      a: `Yes. A Muhurat based on family details and location can provide more specific recommendations.`,
    },
    {
      q: `Can Grah Pravesh Muhurat guarantee prosperity in the new home?`,
      a: `No. Muhurat helps identify supportive timings but cannot guarantee specific outcomes.`,
    },
    {
      q: `Is Grah Pravesh Muhurat only for newly built homes?`,
      a: `It is primarily used for new homes, though some families also use it after major renovations.`,
    },
    ];
  }

  if (slug === "vehicle-muhurat") {

    if (locale === "hi") {
      return [
        {
        q: `${year} में वाहन मुहूर्त क्या है?`,
        a: `वाहन मुहूर्त ${year} नई कार, बाइक या अन्य वाहन खरीदने के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
      },
      {
        q: `वाहन मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार, लग्न और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है।`,
      },
      {
        q: `क्या नई कार खरीदने के लिए मुहूर्त देखा जाता है?`,
        a: `हाँ। अनेक लोग नई कार की बुकिंग, डिलीवरी या पहली ड्राइव के लिए शुभ मुहूर्त चुनते हैं।`,
      },
      {
        q: `क्या बाइक खरीदने के लिए भी मुहूर्त देखा जाता है?`,
        a: `हाँ। वाहन मुहूर्त कार, बाइक और अन्य व्यक्तिगत वाहनों पर समान रूप से लागू किया जा सकता है।`,
      },
      {
        q: `वाहन खरीद के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `रोहिणी, मृगशिरा, पुष्य, हस्त, स्वाती, अनुराधा और रेवती जैसे नक्षत्र सामान्यतः शुभ माने जाते हैं।`,
      },
      {
        q: `वाहन खरीद के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या सभी वाहन खरीद तिथियाँ समान रूप से शुभ होती हैं?`,
        a: `नहीं। कुछ तिथियों में पंचांग और ग्रह स्थितियाँ अधिक अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या व्यक्तिगत वाहन मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। व्यक्तिगत जन्म विवरण के आधार पर अधिक विशिष्ट और सटीक मुहूर्त निकाला जा सकता है।`,
      },
      {
        q: `क्या वाहन मुहूर्त सुरक्षित ड्राइविंग की गारंटी देता है?`,
        a: `नहीं। वाहन सुरक्षा उचित ड्राइविंग, रखरखाव और यातायात नियमों के पालन पर निर्भर करती है।`,
      },
      {
        q: `क्या वाहन मुहूर्त केवल नए वाहनों के लिए उपयोग किया जाता है?`,
        a: `मुख्य रूप से नए वाहन खरीदने के लिए उपयोग किया जाता है, लेकिन कुछ लोग पुराने वाहन खरीदते समय भी इसका उपयोग करते हैं।`,
      },
      ];
    }

    return [
      {
      q: `What is Vehicle Muhurat ${year}?`,
      a: `Vehicle Muhurat ${year} refers to auspicious dates and timings selected for purchasing a new car, bike, or other vehicle.`,
    },
    {
      q: `How is Vehicle Muhurat calculated?`,
      a: `It is calculated by analyzing Tithi, Nakshatra, weekday, Lagna, and other important Panchang factors.`,
    },
    {
      q: `Is Muhurat considered for buying a new car?`,
      a: `Yes. Many people choose an auspicious Muhurat for vehicle booking, delivery, or the first drive.`,
    },
    {
      q: `Can Vehicle Muhurat also be used for buying a bike?`,
      a: `Yes. Vehicle Muhurat can be applied to cars, bikes, and other personal vehicles.`,
    },
    {
      q: `Which Nakshatras are considered favorable for Vehicle Muhurat?`,
      a: `Nakshatras such as Rohini, Mrigashira, Pushya, Hasta, Swati, Anuradha, and Revati are commonly preferred.`,
    },
    {
      q: `Which Tithis are considered auspicious for vehicle purchase?`,
      a: `Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
      q: `Are all vehicle purchase dates equally favorable?`,
      a: `No. Some dates have stronger Panchang and planetary combinations and are generally considered more auspicious.`,
    },
    {
      q: `Do I still need a personalized Vehicle Muhurat?`,
      a: `Yes. A Muhurat based on personal birth details can provide more specific recommendations.`,
    },
    {
      q: `Can Vehicle Muhurat guarantee safe driving?`,
      a: `No. Safe driving depends on responsible driving habits, vehicle maintenance, and following traffic rules.`,
    },
    {
      q: `Is Vehicle Muhurat used only for new vehicles?`,
      a: `It is primarily used for new vehicles, though some people also consider it while purchasing pre-owned vehicles.`,
    },
    ];
  }

  if (slug === "property-purchase-muhurat") {

    if (locale === "hi") {
      return [
        {
        q: `${year} में संपत्ति खरीद मुहूर्त क्या है?`,
        a: `संपत्ति खरीद मुहूर्त ${year} भूमि, प्लॉट, मकान, फ्लैट और अन्य संपत्तियों की खरीद के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
      },
      {
        q: `संपत्ति खरीद मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार, लग्न और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है।`,
      },
      {
        q: `क्या संपत्ति रजिस्ट्री के लिए मुहूर्त देखा जाता है?`,
        a: `हाँ। अनेक लोग संपत्ति की रजिस्ट्री और स्वामित्व हस्तांतरण के लिए शुभ मुहूर्त का चयन करते हैं।`,
      },
      {
        q: `क्या भूमि खरीद और मकान खरीद के लिए अलग मुहूर्त हो सकता है?`,
        a: `सामान्य सिद्धांत समान रहते हैं, लेकिन अंतिम मुहूर्त संपत्ति के प्रकार और परिस्थितियों के अनुसार भिन्न हो सकता है।`,
      },
      {
        q: `संपत्ति खरीद के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `रोहिणी, मृगशिरा, उत्तरा फाल्गुनी, हस्त, अनुराधा, उत्तराषाढ़ा और रेवती जैसे नक्षत्र सामान्यतः शुभ माने जाते हैं।`,
      },
      {
        q: `संपत्ति खरीद के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या सभी संपत्ति खरीद तिथियाँ समान रूप से शुभ होती हैं?`,
        a: `नहीं। कुछ तिथियों में पंचांग और ग्रह स्थितियाँ अधिक अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या व्यक्तिगत संपत्ति खरीद मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। व्यक्तिगत जन्म विवरण और संपत्ति के स्थान के आधार पर अधिक सटीक मुहूर्त निकाला जा सकता है।`,
      },
      {
        q: `क्या संपत्ति खरीद मुहूर्त निवेश में लाभ की गारंटी देता है?`,
        a: `नहीं। निवेश का परिणाम बाजार परिस्थितियों, स्थान और अन्य आर्थिक कारकों पर निर्भर करता है।`,
      },
      {
        q: `क्या संपत्ति खरीद मुहूर्त केवल नई संपत्ति के लिए उपयोग किया जाता है?`,
        a: `नहीं। इसका उपयोग नई और पुनर्विक्रय (resale) दोनों प्रकार की संपत्तियों के लिए किया जा सकता है।`,
      },
      ];
    }

    return [
      {
      q: `What is Property Purchase Muhurat ${year}?`,
      a: `Property Purchase Muhurat ${year} refers to auspicious dates and timings selected for purchasing land, plots, houses, apartments, and other properties.`,
    },
    {
      q: `How is Property Purchase Muhurat calculated?`,
      a: `It is calculated by analyzing Tithi, Nakshatra, weekday, Lagna, and other important Panchang factors.`,
    },
    {
      q: `Is Muhurat considered for property registration?`,
      a: `Yes. Many people choose an auspicious Muhurat for property registration and ownership transfer.`,
    },
    {
      q: `Can land purchase and house purchase have different Muhurats?`,
      a: `The general principles remain similar, but the final Muhurat may vary depending on the type of property and circumstances.`,
    },
    {
      q: `Which Nakshatras are considered favorable for Property Purchase Muhurat?`,
      a: `Nakshatras such as Rohini, Mrigashira, Uttara Phalguni, Hasta, Anuradha, Uttara Ashadha, and Revati are commonly preferred.`,
    },
    {
      q: `Which Tithis are considered auspicious for property purchase?`,
      a: `Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
      q: `Are all property purchase dates equally favorable?`,
      a: `No. Some dates have stronger Panchang and planetary combinations and are generally considered more auspicious.`,
    },
    {
      q: `Do I still need a personalized Property Purchase Muhurat?`,
      a: `Yes. A Muhurat based on personal birth details and property location can provide more specific recommendations.`,
    },
    {
      q: `Can Property Purchase Muhurat guarantee profitable investment returns?`,
      a: `No. Investment performance depends on market conditions, location, and various economic factors.`,
    },
    {
      q: `Is Property Purchase Muhurat only used for new properties?`,
      a: `No. It can be used for both new and resale property transactions.`,
    },
    ];
  }

  if (slug === "naamkaran-muhurat") {

    if (locale === "hi") {
      return [
        {
        q: `${year} में नामकरण मुहूर्त क्या है?`,
        a: `नामकरण मुहूर्त ${year} शिशु के नामकरण संस्कार के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
      },
      {
        q: `नामकरण मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार, लग्न और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है।`,
      },
      {
        q: `नामकरण संस्कार कब किया जाता है?`,
        a: `नामकरण संस्कार सामान्यतः बच्चे के जन्म के कुछ दिनों या सप्ताहों बाद पारिवारिक परंपराओं के अनुसार किया जाता है।`,
      },
      {
        q: `क्या नामकरण के लिए शुभ मुहूर्त आवश्यक है?`,
        a: `यह व्यक्तिगत आस्था का विषय है, लेकिन अनेक परिवार नामकरण समारोह के लिए शुभ मुहूर्त चुनना पसंद करते हैं।`,
      },
      {
        q: `नामकरण के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `अश्विनी, रोहिणी, मृगशिरा, पुष्य, हस्त, अनुराधा और रेवती जैसे नक्षत्र सामान्यतः शुभ माने जाते हैं।`,
      },
      {
        q: `नामकरण के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या सभी नामकरण तिथियाँ समान रूप से शुभ होती हैं?`,
        a: `नहीं। कुछ तिथियों में पंचांग और ग्रह स्थितियाँ अधिक अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या व्यक्तिगत नामकरण मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। बच्चे के जन्म विवरण के आधार पर अधिक विशिष्ट और सटीक मुहूर्त निकाला जा सकता है।`,
      },
      {
        q: `क्या नामकरण मुहूर्त बच्चे के भविष्य की गारंटी देता है?`,
        a: `नहीं। मुहूर्त केवल शुभ समय चुनने में सहायता करता है, भविष्य कई अन्य कारकों पर निर्भर करता है।`,
      },
      {
        q: `क्या नामकरण मुहूर्त केवल हिंदू परंपरा में उपयोग किया जाता है?`,
        a: `यह मुख्य रूप से हिंदू संस्कारों पर आधारित है, लेकिन इसका उपयोग करना व्यक्तिगत और पारिवारिक निर्णय होता है।`,
      },
      ];
    }

    return [
      {
      q: `What is Naamkaran Muhurat ${year}?`,
      a: `Naamkaran Muhurat ${year} refers to auspicious dates and timings selected for a baby's naming ceremony based on Panchang principles and traditional Vedic astrology.`,
    },
    {
      q: `How is Naamkaran Muhurat calculated?`,
      a: `It is calculated by analyzing Tithi, Nakshatra, weekday, Lagna, and other important Panchang factors.`,
    },
    {
      q: `When is Naamkaran Sanskar usually performed?`,
      a: `Naamkaran Sanskar is typically performed a few days or weeks after birth according to family traditions and customs.`,
    },
    {
      q: `Is an auspicious Muhurat necessary for a naming ceremony?`,
      a: `It depends on personal belief, but many families prefer conducting the naming ceremony during an auspicious Muhurat.`,
    },
    {
      q: `Which Nakshatras are considered favorable for Naamkaran Muhurat?`,
      a: `Nakshatras such as Ashwini, Rohini, Mrigashira, Pushya, Hasta, Anuradha, and Revati are commonly preferred.`,
    },
    {
      q: `Which Tithis are considered auspicious for Naamkaran?`,
      a: `Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
      q: `Are all naming ceremony dates equally favorable?`,
      a: `No. Some dates have stronger Panchang and planetary combinations and are generally considered more auspicious.`,
    },
    {
      q: `Do I still need a personalized Naamkaran Muhurat?`,
      a: `Yes. A Muhurat based on the baby's birth details can provide more specific recommendations.`,
    },
    {
      q: `Can Naamkaran Muhurat guarantee a successful future for the child?`,
      a: `No. Muhurat helps identify supportive timings but cannot guarantee specific life outcomes.`,
    },
    {
      q: `Is Naamkaran Muhurat used only in Hindu traditions?`,
      a: `It is primarily based on Hindu traditions, though its use depends on personal and family preferences.`,
    },
    ];
  }

  if (slug === "foreign-travel-muhurat") {

    if (locale === "hi") {
      return [
        {
        q: `${year} में विदेश यात्रा मुहूर्त क्या है?`,
        a: `विदेश यात्रा मुहूर्त ${year} विदेश जाने के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
      },
      {
        q: `विदेश यात्रा मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार, लग्न और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है।`,
      },
      {
        q: `क्या विदेश में पढ़ाई के लिए भी यात्रा मुहूर्त देखा जाता है?`,
        a: `हाँ। अनेक परिवार विदेश में उच्च शिक्षा के लिए जाने वाले छात्रों के लिए शुभ यात्रा मुहूर्त चुनते हैं।`,
      },
      {
        q: `क्या विदेश यात्रा मुहूर्त नौकरी या व्यवसाय यात्रा के लिए उपयोग किया जा सकता है?`,
        a: `हाँ। इसका उपयोग नौकरी, व्यवसाय, प्रवास, पर्यटन और अन्य अंतरराष्ट्रीय यात्राओं के लिए किया जा सकता है।`,
      },
      {
        q: `विदेश यात्रा के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `अश्विनी, पुनर्वसु, पुष्य, स्वाती, अनुराधा, श्रवण और रेवती जैसे नक्षत्र सामान्यतः शुभ माने जाते हैं।`,
      },
      {
        q: `विदेश यात्रा के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या सभी विदेश यात्रा तिथियाँ समान रूप से शुभ होती हैं?`,
        a: `नहीं। कुछ तिथियों में पंचांग और ग्रह स्थितियाँ अधिक अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या व्यक्तिगत विदेश यात्रा मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। व्यक्तिगत जन्म विवरण के आधार पर अधिक सटीक और विशिष्ट मुहूर्त निकाला जा सकता है।`,
      },
      {
        q: `क्या विदेश यात्रा मुहूर्त वीज़ा स्वीकृति की गारंटी देता है?`,
        a: `नहीं। वीज़ा स्वीकृति संबंधित देश की नीतियों और दस्तावेज़ी प्रक्रिया पर निर्भर करती है।`,
      },
      {
        q: `क्या विदेश यात्रा मुहूर्त सफल विदेश जीवन की गारंटी देता है?`,
        a: `नहीं। मुहूर्त केवल शुभ समय चुनने में सहायता करता है, सफलता कई अन्य व्यक्तिगत और व्यावहारिक कारकों पर निर्भर करती है।`,
      },
      ];
    }

    return [
      {
      q: `What is Foreign Travel Muhurat ${year}?`,
      a: `Foreign Travel Muhurat ${year} refers to auspicious dates and timings selected for international travel based on Panchang principles and traditional Vedic astrology.`,
    },
    {
      q: `How is Foreign Travel Muhurat calculated?`,
      a: `It is calculated by analyzing Tithi, Nakshatra, weekday, Lagna, and other important Panchang factors.`,
    },
    {
      q: `Is Muhurat considered for studying abroad?`,
      a: `Yes. Many families choose an auspicious travel Muhurat for students leaving for higher education overseas.`,
    },
    {
      q: `Can Foreign Travel Muhurat be used for work or business travel?`,
      a: `Yes. It can be used for employment, business, immigration, tourism, and other international journeys.`,
    },
    {
      q: `Which Nakshatras are considered favorable for Foreign Travel Muhurat?`,
      a: `Nakshatras such as Ashwini, Punarvasu, Pushya, Swati, Anuradha, Shravana, and Revati are commonly preferred.`,
    },
    {
      q: `Which Tithis are considered auspicious for foreign travel?`,
      a: `Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
      q: `Are all foreign travel dates equally favorable?`,
      a: `No. Some dates have stronger Panchang and planetary combinations and are generally considered more auspicious.`,
    },
    {
      q: `Do I still need a personalized Foreign Travel Muhurat?`,
      a: `Yes. A Muhurat based on personal birth details can provide more specific recommendations.`,
    },
    {
      q: `Can Foreign Travel Muhurat guarantee visa approval?`,
      a: `No. Visa approval depends on documentation, eligibility, and the policies of the destination country.`,
    },
    {
      q: `Can Foreign Travel Muhurat guarantee success abroad?`,
      a: `No. Muhurat helps identify supportive timings but cannot guarantee specific life outcomes or success overseas.`,
    },
    ];
  }

  if (slug === "gold-buying-muhurat") {

    if (locale === "hi") {
      return [
        {
        q: `${year} में स्वर्ण खरीद मुहूर्त क्या है?`,
        a: `स्वर्ण खरीद मुहूर्त ${year} सोना, चांदी और आभूषण खरीदने के लिए शुभ तिथियों और समय का चयन करने की प्रक्रिया है।`,
      },
      {
        q: `स्वर्ण खरीद मुहूर्त की गणना कैसे की जाती है?`,
        a: `इसकी गणना तिथि, नक्षत्र, वार, लग्न और अन्य पंचांग तत्वों का विश्लेषण करके की जाती है।`,
      },
      {
        q: `क्या सोना खरीदने के लिए मुहूर्त देखा जाता है?`,
        a: `हाँ। अनेक लोग सोना खरीदने, निवेश करने या आभूषण खरीदने के लिए शुभ मुहूर्त चुनते हैं।`,
      },
      {
        q: `क्या धनतेरस सोना खरीदने के लिए शुभ माना जाता है?`,
        a: `हाँ। धनतेरस पारंपरिक रूप से सोना और अन्य मूल्यवान वस्तुएँ खरीदने के लिए अत्यंत शुभ माना जाता है।`,
      },
      {
        q: `सोना खरीदने के लिए कौन से नक्षत्र शुभ माने जाते हैं?`,
        a: `रोहिणी, पुष्य, उत्तरा फाल्गुनी, हस्त, स्वाती, अनुराधा और रेवती जैसे नक्षत्र सामान्यतः शुभ माने जाते हैं।`,
      },
      {
        q: `सोना खरीदने के लिए कौन सी तिथियाँ शुभ मानी जाती हैं?`,
        a: `द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी और त्रयोदशी जैसी तिथियाँ सामान्यतः अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या सभी स्वर्ण खरीद तिथियाँ समान रूप से शुभ होती हैं?`,
        a: `नहीं। कुछ तिथियों में पंचांग और ग्रह स्थितियाँ अधिक अनुकूल मानी जाती हैं।`,
      },
      {
        q: `क्या व्यक्तिगत स्वर्ण खरीद मुहूर्त की आवश्यकता होती है?`,
        a: `हाँ। व्यक्तिगत जन्म विवरण के आधार पर अधिक विशिष्ट और सटीक मुहूर्त निकाला जा सकता है।`,
      },
      {
        q: `क्या स्वर्ण खरीद मुहूर्त निवेश लाभ की गारंटी देता है?`,
        a: `नहीं। निवेश का प्रदर्शन बाजार की स्थिति, कीमतों और अन्य आर्थिक कारकों पर निर्भर करता है।`,
      },
      {
        q: `क्या स्वर्ण खरीद मुहूर्त केवल सोने के लिए उपयोग किया जाता है?`,
        a: `नहीं। इसका उपयोग चांदी, आभूषण और अन्य मूल्यवान धातुओं की खरीद के लिए भी किया जा सकता है।`,
      },
      ];
    }

    return [
      {
      q: `What is Gold Buying Muhurat ${year}?`,
      a: `Gold Buying Muhurat ${year} refers to auspicious dates and timings selected for purchasing gold, silver, jewellery, and precious metals.`,
    },
    {
      q: `How is Gold Buying Muhurat calculated?`,
      a: `It is calculated by analyzing Tithi, Nakshatra, weekday, Lagna, and other important Panchang factors.`,
    },
    {
      q: `Is Muhurat considered for buying gold?`,
      a: `Yes. Many people choose an auspicious Muhurat for purchasing gold, jewellery, and precious metals.`,
    },
    {
      q: `Is Dhanteras considered auspicious for buying gold?`,
      a: `Yes. Dhanteras is traditionally regarded as one of the most favorable occasions for purchasing gold and other valuable assets.`,
    },
    {
      q: `Which Nakshatras are considered favorable for Gold Buying Muhurat?`,
      a: `Nakshatras such as Rohini, Pushya, Uttara Phalguni, Hasta, Swati, Anuradha, and Revati are commonly preferred.`,
    },
    {
      q: `Which Tithis are considered auspicious for buying gold?`,
      a: `Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, and Trayodashi are commonly preferred depending on the overall Panchang combination.`,
    },
    {
      q: `Are all gold purchase dates equally favorable?`,
      a: `No. Some dates have stronger Panchang and planetary combinations and are generally considered more auspicious.`,
    },
    {
      q: `Do I still need a personalized Gold Buying Muhurat?`,
      a: `Yes. A Muhurat based on personal birth details can provide more specific recommendations.`,
    },
    {
      q: `Can Gold Buying Muhurat guarantee investment profits?`,
      a: `No. Investment performance depends on market conditions, pricing trends, and various economic factors.`,
    },
    {
      q: `Is Gold Buying Muhurat only for gold purchases?`,
      a: `No. It can also be used for purchasing silver, jewellery, and other precious metals.`,
    },
    ];
  }

  return [];
}