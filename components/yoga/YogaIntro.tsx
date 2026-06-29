type YogaIntroProps = {
  isHi: boolean;
};

export default function YogaIntro({ isHi }: YogaIntroProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "पंचांग योग क्या है?" : "What is Panchang Yoga?"}
      </h2>
      <div className="text-gray-300 leading-7 space-y-4">
        <p>
          {isHi
            ? "वैदिक ज्योतिष में, योग पंचांग के पांच महत्वपूर्ण अंगों (पांच अंगों) में से एक है। यह सूर्य और चंद्रमा की आकाशीय लंबाइयों के योग से निर्धारित होता है।"
            : "In Vedic astrology, Yoga is one of the five essential limbs (Panchang) of the calendar. It is determined by the combined celestial longitudes of the Sun and the Moon."}
        </p>
        <p>
          {isHi
            ? "कुल 27 नित्य (दैनिक) योग होते हैं, जिनमें से प्रत्येक की अपनी विशिष्ट ऊर्जा और स्वभाव होता है। पंचांग में इसका स्थान बहुत महत्वपूर्ण है क्योंकि यह उस विशेष दिन की गुणवत्ता और विभिन्न कार्यों के लिए इसकी अनुकूलता को प्रभावित करता है।"
            : "There are 27 Nithya (daily) Yogas in total, each possessing a distinct energy and inherent nature. Its place in the Panchang is vital as it directly influences the quality of the day and its suitability for undertaking various activities."}
        </p>
      </div>
    </section>
  );
}
