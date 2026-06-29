type PanchakIntroProps = {
  isHi: boolean;
};

export default function PanchakIntro({ isHi }: PanchakIntroProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "पंचक क्या है?" : "What is Panchak?"}
      </h2>
      <div className="text-gray-300 leading-7 space-y-4">
        <p>
          {isHi
            ? "वैदिक ज्योतिष और पंचांग में, 'पंचक' पांच दिनों की एक विशेष अवधि है। यह तब होता है जब चंद्रमा कुंभ और मीन राशि में गोचर करता है, जो धनिष्ठा, शतभिषा, पूर्वा भाद्रपद, उत्तरा भाद्रपद और रेवती नक्षत्रों से होकर गुजरता है।"
            : "In Vedic astrology and Panchang, 'Panchak' is a special period of five days. It occurs when the Moon transits through the zodiac signs of Aquarius and Pisces, specifically passing through the Dhanishtha, Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, and Revati Nakshatras."}
        </p>
        <p>
          {isHi
            ? "यह अवधि पंचांग के दृष्टिकोण से अत्यंत महत्वपूर्ण मानी जाती है क्योंकि इसे कुछ कार्यों के लिए विशेष सावधानी के साथ देखा जाता है। इस समय को जानने से शुभ कार्यों की योजना बनाने और प्रतिकूल गतिविधियों से बचने में मदद मिलती है।"
            : "This period is considered very significant from the Panchang perspective as it is observed with special caution for certain activities. Being aware of this time helps in planning auspicious tasks and avoiding unfavorable activities."}
        </p>
      </div>
    </section>
  );
}
