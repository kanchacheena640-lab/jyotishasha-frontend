type AbhijitIntroProps = {
  isHi: boolean;
};

export default function AbhijitIntro({
  isHi,
}: AbhijitIntroProps) {
  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "अभिजीत मुहूर्त क्या है?" : "What is Abhijit Muhurat?"}
        </h2>
      </header>

      <div className="space-y-5 text-base leading-8 text-gray-300">
        <p>
          {isHi
            ? "अभिजीत मुहूर्त वैदिक ज्योतिष में एक अत्यंत शुभ काल है, जो प्रतिदिन सूर्य के स्थानीय मेरिडियन पार करने के समय के आसपास आता है। इसे पारंपरिक रूप से नए उपक्रमों को शुरू करने के लिए सबसे शक्तिशाली और अनुकूल समय माना जाता है।"
            : "Abhijit Muhurat is a highly auspicious period in Vedic astrology, falling daily around the time the Sun crosses the local meridian. It is traditionally considered one of the most powerful and favorable times for commencing new endeavors."}
        </p>

        <p>
          {isHi
            ? "जब किसी विशिष्ट कार्य के लिए सटीक पंचांग आधारित मुहूर्त उपलब्ध न हो, तब अभिजीत मुहूर्त को महत्वपूर्ण कार्यों की शुरुआत के लिए एक सुरक्षित और उत्कृष्ट विकल्प माना जाता है। पंचांग के अनुसार यह मुहूर्त दैनिक गतिविधियों को सुचारू रूप से संचालित करने के लिए अत्यंत सहायक है।"
            : "When a precise Panchang-based Muhurat is not available for a specific task, Abhijit Muhurat is widely recommended as a safe and excellent alternative for starting significant work. According to the Panchang, this period is exceptionally helpful for conducting important daily activities smoothly."}
        </p>
      </div>
    </section>
  );
}
