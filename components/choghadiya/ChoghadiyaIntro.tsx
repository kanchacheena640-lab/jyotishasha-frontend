type ChoghadiyaIntroProps = {
  isHi: boolean;
};

export default function ChoghadiyaIntro({
  isHi,
}: ChoghadiyaIntroProps) {
  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "चौघड़िया क्या है?" : "What is Choghadiya?"}
        </h2>
      </header>

      <div className="space-y-5 text-base leading-8 text-gray-300">
        <p>
          {isHi
            ? "चौघड़िया हिंदू पंचांग की एक प्राचीन समय-गणना प्रणाली है जिसका उपयोग दिन और रात के शुभ तथा अशुभ समय का निर्धारण करने के लिए किया जाता है। सूर्योदय से सूर्यास्त तक के समय को आठ समान भागों में तथा सूर्यास्त से अगले सूर्योदय तक के समय को पुनः आठ भागों में विभाजित किया जाता है। प्रत्येक भाग को एक विशेष चौघड़िया कहा जाता है जिसकी अपनी प्रकृति होती है।"
            : "Choghadiya is a traditional Hindu Panchang time system used to identify auspicious and inauspicious periods during the day and night. The duration between sunrise and sunset is divided into eight equal parts, and the period from sunset to the next sunrise is again divided into eight parts. Each segment is known as a Choghadiya and carries its own astrological significance."}
        </p>

        <p>
          {isHi
            ? "जब किसी कार्य के लिए विस्तृत मुहूर्त उपलब्ध न हो, तब चौघड़िया एक व्यावहारिक विकल्प माना जाता है। यात्रा, व्यापार, नए कार्य की शुरुआत, महत्वपूर्ण बैठक, खरीदारी और अन्य दैनिक निर्णयों के लिए लोग चौघड़िया का उपयोग करते हैं।"
            : "When a detailed Muhurat is not available, Choghadiya serves as a practical alternative. It is widely consulted before travel, business activities, investments, purchases, meetings and other important daily decisions."}
        </p>

        <p>
          {isHi
            ? "सामान्यतः अमृत, शुभ और लाभ चौघड़िया को शुभ माना जाता है, जबकि काल, रोग और उद्वेग चौघड़िया से बचने की सलाह दी जाती है। चाल चौघड़िया को सामान्य कार्यों के लिए स्वीकार्य माना जाता है। हालांकि अंतिम निर्णय लेते समय राहु काल, अभिजीत मुहूर्त तथा अन्य पंचांग तत्वों पर भी ध्यान देना चाहिए।"
            : "Generally, Amrit, Shubh and Labh are regarded as auspicious Choghadiya periods, whereas Kaal, Rog and Udveg are usually avoided for new beginnings. Chal is considered suitable for routine activities. For important events, Choghadiya should ideally be considered together with Rahu Kaal, Abhijit Muhurat and other Panchang elements."}
        </p>
      </div>
    </section>
  );
}