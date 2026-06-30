type PakshaUsageProps = {
  isHi: boolean;
};

export default function PakshaUsage({ isHi }: PakshaUsageProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "पक्ष का व्यावहारिक उपयोग" : "Practical Usage of Paksha"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "पक्ष का उपयोग पंचांग के विभिन्न पहलुओं और दैनिक गतिविधियों की योजना बनाने में व्यापक रूप से किया जाता है। यहाँ इसके कुछ प्रमुख उपयोग हैं:"
            : "Paksha is widely used in various aspects of the Panchang and for planning daily activities. Here are some of its key applications:"}
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>{isHi ? "त्योहारों की योजना" : "Festival Planning"}:</strong> {isHi ? "हिंदू त्योहारों की तिथियों को निर्धारित करने के लिए।" : "For determining the dates of Hindu festivals."}</li>
          <li><strong>{isHi ? "उपवास (व्रत)" : "Fasting (Vrata)"}:</strong> {isHi ? "एकादशी और अन्य व्रतों की तिथियों का चयन।" : "Selecting dates for Ekadashi and other fasts."}</li>
          <li><strong>{isHi ? "मुहूर्त चयन" : "Muhurat Selection"}:</strong> {isHi ? "शुभ कार्यों के लिए सही समय (शुक्ल या कृष्ण पक्ष) का चयन।" : "Selecting the right time (Shukla or Krishna Paksha) for auspicious tasks."}</li>
          <li><strong>{isHi ? "धार्मिक समारोह" : "Religious Ceremonies"}:</strong> {isHi ? "विवाह, गृह प्रवेश और अन्य संस्कारों का आयोजन।" : "Organizing weddings, housewarming, and other Samskaras."}</li>
          <li><strong>{isHi ? "पंचांग संदर्भ" : "Panchang Reference"}:</strong> {isHi ? "दैनिक पंचांग में तिथि और पक्ष की जानकारी प्राप्त करना।" : "Getting information on Tithi and Paksha in the daily Panchang."}</li>
          <li><strong>{isHi ? "आध्यात्मिक अनुष्ठान" : "Spiritual Observances"}:</strong> {isHi ? "पूजा और ध्यान के लिए अनुकूल वातावरण बनाना।" : "Creating a favorable environment for Puja and meditation."}</li>
        </ul>
        <p>
          {isHi
            ? "कई हिंदू त्योहार तिथि और पक्ष दोनों के संयोजन पर आधारित होते हैं। इसके अतिरिक्त, अलग-अलग क्षेत्रों में पारंपरिक प्रथाओं के आधार पर पक्ष के उपयोग में थोड़ी भिन्नता हो सकती है।"
            : "Many Hindu festivals are determined by the combination of both Tithi and Paksha. Additionally, there may be slight variations in the usage of Paksha based on traditional customs in different regions."}
        </p>
      </div>
    </section>
  );
}
