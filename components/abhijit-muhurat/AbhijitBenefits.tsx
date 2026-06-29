type AbhijitBenefitsProps = {
  isHi: boolean;
};

export default function AbhijitBenefits({ isHi }: AbhijitBenefitsProps) {
  const benefits = isHi
    ? [
        { title: "व्यवसाय की शुरुआत", desc: "नए व्यापार, दुकान या किसी भी व्यावसायिक उद्यम को शुरू करने के लिए उत्कृष्ट समय।" },
        { title: "महत्वपूर्ण बैठकें", desc: "निर्णायक व्यावसायिक वार्ता या महत्वपूर्ण बैठकों को संचालित करने हेतु अनुकूल।" },
        { title: "यात्रा का आरंभ", desc: "नई और महत्वपूर्ण यात्राओं को शुरू करने के लिए एक शुभ अवधि।" },
        { title: "गृह प्रवेश", desc: "नए घर में प्रवेश या गृह आरंभ से संबंधित अनुष्ठानों के लिए शुभ माना जाता है।" },
        { title: "संपत्ति की खरीद", desc: "भूमि, वाहन या अन्य बड़ी संपत्ति के सौदों को अंतिम रूप देने हेतु उचित समय।" },
        { title: "शिक्षा और सीखना", desc: "नई विद्या, कौशल या महत्वपूर्ण शैक्षिक कार्य शुरू करने के लिए उत्तम।" },
      ]
    : [
        { title: "Starting Business", desc: "An excellent time for opening new businesses, shops, or launching any commercial venture." },
        { title: "Important Meetings", desc: "Favorable for conducting crucial business negotiations or scheduling key meetings." },
        { title: "Starting Journeys", desc: "Considered an auspicious period for embarking on new or important journeys." },
        { title: "Grah Pravesh", desc: "Regarded as auspicious for housewarming ceremonies or beginning rituals related to a new home." },
        { title: "Buying Assets", desc: "A suitable time for finalizing deals related to land, vehicles, or other major assets." },
        { title: "Education & Learning", desc: "Ideal for starting new academic courses, learning skills, or initiating significant educational work." },
      ];

  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "अभिजीत मुहूर्त के लाभ" : "Benefits and Uses of Abhijit Muhurat"}
        </h2>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((item, index) => (
          <article
            key={index}
            className="rounded-xl border border-gray-700 bg-gray-800 p-6"
          >
            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-gray-300 leading-7">
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
