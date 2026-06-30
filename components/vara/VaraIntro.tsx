type VaraIntroProps = {
  isHi: boolean;
};

export default function VaraIntro({ isHi }: VaraIntroProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "वार (Vara) क्या है?" : "What is Vara?"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "वैदिक ज्योतिष और पंचांग में, 'वार' (सप्ताह का दिन) पंचांग के पांच मुख्य अंगों (तिथि, नक्षत्र, योग, करण और वार) में से एक है। वार का सीधा अर्थ सप्ताह के सात दिनों से है।"
            : "In Vedic astrology and Panchang, 'Vara' (weekday) is one of the five main limbs of the Panchang (Tithi, Nakshatra, Yoga, Karana, and Vara). Vara directly refers to the seven days of the week."}
        </p>
        <p>
          {isHi
            ? "प्रत्येक वार का अपना विशेष महत्व है, क्योंकि हर दिन एक विशिष्ट ग्रह स्वामी और अधिष्ठाता देवता से संबंधित होता है। यह संबंध उस दिन की ऊर्जा को निर्धारित करता है।"
            : "Each Vara holds special significance as every day is associated with a specific ruling planet and presiding deity. This association determines the energy of that day."}
        </p>
        <p>
          {isHi
            ? "वार का ज्ञान दैनिक पंचांग को समझने, महत्वपूर्ण कार्यों के लिए मुहूर्त का चयन करने और विभिन्न पारंपरिक व्रतों व अनुष्ठानों का पालन करने में अत्यंत सहायक माना जाता है।"
            : "Knowledge of Vara is considered highly helpful in understanding the daily Panchang, selecting auspicious times (Muhurat) for important tasks, and observing traditional fasts and rituals."}
        </p>
      </div>
    </section>
  );
}
