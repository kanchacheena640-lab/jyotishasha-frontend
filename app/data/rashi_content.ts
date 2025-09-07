const rashiContent = {
  rashis: [
    {
      id: 1,
      gemstone_id: "moonga",
      planet_id: "मंगल",
      english: {
        rashi: "Aries (Mesh)",
        condition: "Your Rashi Grah is Mars (Mangal). If this is not in your favour — your anger often puts you in trouble. Relationships and opportunities slip away due to uncontrolled aggression. Debt may become a big issue for you.",
        solution: "To get relief, give strength to Mars by wearing Red Coral (Moonga)."
      },
      hindi: {
        rashi: "मेष (Aries)",
        condition: "आपकी राशि का स्वामी मंगल है। यदि यह शुभफल नहीं दे रहा हो तो आपका गुस्सा आपको मुश्किल में डाल देता है। रिश्ते और अवसर हाथ से निकल जाते हैं। कर्ज भी बड़ी समस्या बन सकता है।",
        solution: "मंगल को मज़बूत करने के लिए मूंगा (Red Coral) धारण करें।"
      }
    },
    {
      id: 2,
      gemstone_id: "opel",
      planet_id: "शुक्र",
      english: {
        rashi: "Taurus (Vrishabh)",
        condition: "Your Rashi Grah is Venus (Shukra). If this is weak — even with money you may feel lack of luxury and comfort. Love life may face hurdles, and attraction or charm may seem missing.",
        solution: "To restore harmony, strengthen Venus by wearing Diamond or White Sapphire."
      },
      hindi: {
        rashi: "वृषभ (Taurus)",
        condition: "आपकी राशि का स्वामी शुक्र है। यदि यह कमज़ोर हो तो पैसा होते हुए भी सुख-सुविधाओं की कमी लगती है। प्रेम-संबंधों में अड़चन आती है और आकर्षण घटता है।",
        solution: "शुक्र को मज़बूत करने के लिए हीरा या सफेद पुखराज धारण करें।"
      }
    },
    {
      id: 3,
      gemstone_id: "panna",
      planet_id: "बुध",
      english: {
        rashi: "Gemini (Mithun)",
        condition: "Your Rashi Grah is Mercury (Budh). If this is not favourable — hasty decisions cause losses, and business or studies often get disturbed. Miscommunication becomes a big issue.",
        solution: "To overcome this, strengthen Mercury by wearing Emerald (Panna)."
      },
      hindi: {
        rashi: "मिथुन (Gemini)",
        condition: "आपकी राशि का स्वामी बुध है। यदि यह शुभफल न दे रहा हो तो जल्दबाज़ी में लिए गए फैसले नुकसान देते हैं। व्यापार या पढ़ाई में रुकावट आती है। गलतफहमी बढ़ जाती है।",
        solution: "बुध को मज़बूत करने के लिए पन्ना (Emerald) धारण करें।"
      }
    },
    {
      id: 4,
      gemstone_id: "moti",
      planet_id: "चंद्रमा",
      english: {
        rashi: "Cancer (Kark)",
        condition: "Your Rashi Grah is Moon (Chandra). If Moon is weak — you get emotionally attached quickly, which makes it easy for others to hurt you. Mental stress and instability may trouble you.",
        solution: "To balance emotions, wear Pearl (Moti)."
      },
      hindi: {
        rashi: "कर्क (Cancer)",
        condition: "आपकी राशि का स्वामी चंद्र है। यदि यह कमज़ोर हो तो आप जल्दी भावनात्मक हो जाते हैं, लोग आपका दिल तोड़ देते हैं और मानसिक तनाव बढ़ता है।",
        solution: "मन की शांति के लिए मोती (Pearl) धारण करें।"
      }
    },
    {
      id: 5,
      gemstone_id: "manik",
      planet_id: "सूर्य",
      english: {
        rashi: "Leo (Singh)",
        condition: "Your Rashi Grah is Sun (Surya). If this is not in favour — even after doing good work, you don’t get the recognition and respect you deserve. People may mistake your patience as weakness.",
        solution: "To shine with confidence, wear Ruby (Manik)."
      },
      hindi: {
        rashi: "सिंह (Leo)",
        condition: "आपकी राशि का स्वामी सूर्य है। यदि यह ग्रह आपको शुभ फल नहीं दे रहा हो तो मेहनत करने के बाद भी पहचान और सम्मान नहीं मिलता। लोग आपकी सहनशीलता को कमजोरी समझते हैं।",
        solution: "सूर्य को मज़बूत करने के लिए माणिक्य (Ruby) धारण करें।"
      }
    },
    {
      id: 6,
      gemstone_id: "panna",
      planet_id: "बुध",
      english: {
        rashi: "Virgo (Kanya)",
        condition: "Your Rashi Grah is Mercury (Budh). If this is weak — hurried actions bring losses. Your planning may not give expected results. Misunderstandings in communication are common.",
        solution: "To strengthen intelligence and clarity, wear Emerald (Panna)."
      },
      hindi: {
        rashi: "कन्या (Virgo)",
        condition: "आपकी राशि का स्वामी बुध है। यदि यह कमज़ोर हो तो जल्दी में किए गए काम नुकसान देते हैं। योजनाएँ सफल नहीं होतीं और संवाद में गलतियाँ होती हैं।",
        solution: "बुध को शक्ति देने के लिए पन्ना (Emerald) धारण करें।"
      }
    },
    {
      id: 7,
      gemstone_id: "opel",
      planet_id: "शुक्र",
      english: {
        rashi: "Libra (Tula)",
        condition: "Your Rashi Grah is Venus (Shukra). If this is not supportive — luxuries decrease, relationships become strained, and even wealth seems insufficient.",
        solution: "To regain charm and prosperity, wear Diamond or White Sapphire."
      },
      hindi: {
        rashi: "तुला (Libra)",
        condition: "आपकी राशि का स्वामी शुक्र है। यदि यह ग्रह आपको शुभ फल नहीं दे रहा हो तो वैभव कम हो जाता है, रिश्ते बिगड़ जाते हैं और धन कम पड़ता है।",
        solution: "शुक्र को बल देने के लिए हीरा या सफेद पुखराज धारण करें।"
      }
    },
    {
      id: 8,
      gemstone_id: "moonga",
      planet_id: "मंगल",
      english: {
        rashi: "Scorpio (Vrishchik)",
        condition: "Your Rashi Grah is Mars (Mangal). If this is weak — anger and overconfidence create hurdles. Unexpected debts or accidents may trouble you.",
        solution: "To stabilize energy, wear Red Coral (Moonga)."
      },
      hindi: {
        rashi: "वृश्चिक (Scorpio)",
        condition: "आपकी राशि का स्वामी मंगल है। यदि यह कमज़ोर हो तो गुस्सा और ओवरकॉन्फिडेंस मुश्किल खड़ी करते हैं। कर्ज या दुर्घटनाएँ भी परेशान कर सकती हैं।",
        solution: "मंगल को स्थिर करने के लिए मूंगा (Red Coral) धारण करें।"
      }
    },
    {
      id: 9,
      gemstone_id: "pukhraj",
      planet_id: "गुरू बृहस्‍पति",
      english: {
        rashi: "Sagittarius (Dhanu)",
        condition: "Your Rashi Grah is Jupiter (Guru). If this is not in favour — even with good intentions, results turn wrong. Hard work does not bring recognition, sometimes even defamation comes.",
        solution: "To invite growth and respect, wear Yellow Sapphire (Pukhraj)."
      },
      hindi: {
        rashi: "धनु (Sagittarius)",
        condition: "आपकी राशि का स्वामी गुरु है। यदि यह ग्रह आपको शुभ फल नहीं दे रहा हो तो अच्छे इरादों के बावजूद काम बिगड़ जाते हैं। मेहनत के बाद भी सफलता नहीं मिलती, उल्टा बदनामी हो जाती है।",
        solution: "गुरु को मजबूत करने के लिए पुखराज (Yellow Sapphire) धारण करें।"
      }
    },
    {
      id: 10,
      gemstone_id: "neelam",
      planet_id: "शनि देव",
      english: {
        rashi: "Capricorn (Makar)",
        condition: "Your Rashi Grah is Saturn (Shani). If this is weak — work delays, obstacles in success, and financial slowdowns become common. Hard work gives very little output.",
        solution: "To reduce struggles, wear Blue Sapphire (Neelam)."
      },
      hindi: {
        rashi: "मकर (Capricorn)",
        condition: "आपकी राशि का स्वामी शनि है। यदि यह कमज़ोर हो तो काम धीमे हो जाते हैं, सफलता देर से मिलती है और धन की आमद रुक जाती है।",
        solution: "शनि को बल देने के लिए नीलम (Blue Sapphire) धारण करें।"
      }
    },
    {
      id: 11,
      gemstone_id: "neelam",
      planet_id: "शनि देव",
      english: {
        rashi: "Aquarius (Kumbh)",
        condition: "Your Rashi Grah is Saturn (Shani). If this is not in favour — progress slows down, opportunities slip away, and financial blockages disturb life. Loneliness may also increase.",
        solution: "To remove obstacles, wear Blue Sapphire (Neelam)."
      },
      hindi: {
        rashi: "कुंभ (Aquarius)",
        condition: "आपकी राशि का स्वामी शनि है। यदि यह ग्रह आपको शुभ फल नहीं दे रहा हो तो प्रगति रुक जाती है, अवसर हाथ से निकल जाते हैं और आर्थिक संकट बढ़ जाते हैं। अकेलापन भी बढ़ सकता है।",
        solution: "शनि को प्रसन्न करने के लिए नीलम (Blue Sapphire) धारण करें।"
      }
    },
    {
      id: 12,
      gemstone_id: "pukhraj",
      planet_id: "गुरू बृहस्‍पति",
      english: {
        rashi: "Pisces (Meen)",
        condition: "Your Rashi Grah is Jupiter (Guru). If this is weak — your good work may not be appreciated, results may bring losses instead of gains, and respect may reduce.",
        solution: "To strengthen Jupiter, wear Yellow Sapphire (Pukhraj)."
      },
      hindi: {
        rashi: "मीन (Pisces)",
        condition: "आपकी राशि का स्वामी गुरु है। यदि यह कमज़ोर हो तो अच्छे काम की सराहना नहीं होती, मेहनत के बदले नुकसान होता है और मान-सम्मान कम होता है।",
        solution: "गुरु को बलवान करने के लिए पुखराज (Yellow Sapphire) धारण करें।"
      }
    }
  ]
};

export default rashiContent;
