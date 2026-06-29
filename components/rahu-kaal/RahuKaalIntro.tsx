type RahuKaalIntroProps = {
  isHi: boolean;
};

export default function RahuKaalIntro({
  isHi,
}: RahuKaalIntroProps) {
  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "राहु काल क्या है?" : "What is Rahu Kaal?"}
        </h2>
      </header>

      <div className="space-y-5 text-base leading-8 text-gray-300">
        <p>
          {isHi
            ? "ज्योतिष शास्त्र में 'राहु काल' दिन का वह समय होता है जिसे किसी भी नए, महत्वपूर्ण या शुभ कार्य की शुरुआत के लिए वर्जित माना जाता है। यह पंचांग के अनुसार प्रतिदिन एक विशिष्ट समयावधि के लिए प्रभावी होता है।"
            : "In Vedic astrology, 'Rahu Kaal' refers to a specific period during the day considered unfavorable for initiating any new, significant, or auspicious tasks. According to the Panchang, this period occurs daily for a defined duration."}
        </p>

        <p>
          {isHi
            ? "माना जाता है कि इस दौरान राहु (एक छाया ग्रह) का प्रभाव अधिक होता है, जिससे कार्यों में बाधाएं या असफलताएं आने की संभावना बढ़ जाती है। हालाँकि, यह दैनिक दिनचर्या के कार्यों पर लागू नहीं होता है, बल्कि नए उपक्रमों के लिए महत्वपूर्ण है।"
            : "It is traditionally believed that the influence of Rahu (a shadow planet) is dominant during this time, potentially leading to obstacles or unfavorable outcomes. However, this does not apply to routine daily activities, but is primarily focused on avoiding the commencement of important new ventures."}
        </p>
      </div>
    </section>
  );
}
