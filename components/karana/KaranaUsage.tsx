type KaranaUsageProps = {
  isHi: boolean;
};

export default function KaranaUsage({ isHi }: KaranaUsageProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "करण का व्यावहारिक उपयोग" : "Practical Usage of Karana"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "वैदिक ज्योतिष में करण का उपयोग विभिन्न महत्वपूर्ण कार्यों के लिए मुहूर्त चयन करने में किया जाता है। यहाँ इसके कुछ प्रमुख व्यावहारिक उपयोग दिए गए हैं:"
            : "In Vedic astrology, Karana is used for selecting Muhurats for various important tasks. Here are some of its key practical applications:"}
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>{isHi ? "मुहूर्त चयन" : "Muhurat Selection"}:</strong> {isHi ? "शुभ कार्यों की शुरुआत के लिए अनुकूल समय खोजना।" : "Finding favorable timings for starting auspicious tasks."}</li>
          <li><strong>{isHi ? "विवाह समारोह" : "Marriage Ceremonies"}:</strong> {isHi ? "विवाह के लिए उपयुक्त तिथि और करण का विचार करना।" : "Considering the suitable Tithi and Karana for weddings."}</li>
          <li><strong>{isHi ? "गृह प्रवेश" : "Housewarming"}:</strong> {isHi ? "नए घर में प्रवेश के लिए पंचांग तत्वों का मिलान।" : "Aligning Panchang elements for entering a new home."}</li>
          <li><strong>{isHi ? "संपत्ति पंजीकरण" : "Property Registration"}:</strong> {isHi ? "महत्वपूर्ण कानूनी और संपत्ति संबंधी कार्यों के लिए समय का चयन।" : "Selecting times for important legal and property-related tasks."}</li>
          <li><strong>{isHi ? "धार्मिक अनुष्ठान" : "Religious Rituals"}:</strong> {isHi ? "पूजा और अन्य धार्मिक अनुष्ठानों के लिए सही करण की पहचान।" : "Identifying the right Karana for Puja and other religious rituals."}</li>
          <li><strong>{isHi ? "दैनिक पंचांग संदर्भ" : "Daily Panchang Reference"}:</strong> {isHi ? "दैनिक गतिविधियों की योजना बनाने के लिए करण की स्थिति का ज्ञान।" : "Knowledge of Karana status for planning daily activities."}</li>
        </ul>
        <p>
          {isHi
            ? "विशेष रूप से, 'विष्टि करण' या 'भद्रा' को मुहूर्त निर्धारण में विशेष सावधानी के साथ देखा जाता है। इसके अतिरिक्त, विभिन्न क्षेत्रों में पारंपरिक पंचांग गणना विधियों के आधार पर करण के उपयोग में मामूली भिन्नता हो सकती है।"
            : "In particular, the 'Vishti Karana' or 'Bhadra' is observed with special caution in Muhurat determination. Additionally, there may be slight variations in the usage of Karana based on traditional Panchang calculation methods in different regions."}
        </p>
      </div>
    </section>
  );
}
