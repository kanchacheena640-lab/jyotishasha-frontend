type ChoghadiyaTypesProps = {
  isHi: boolean;
};

const TYPES = {
  en: [
    {
      title: "Amrit",
      color: "border-green-200 bg-green-50",
      description:
        "The most auspicious Choghadiya. Ideal for starting new ventures, business, investments, travel, religious ceremonies and other important activities.",
    },
    {
      title: "Shubh",
      color: "border-emerald-200 bg-emerald-50",
      description:
        "A favourable period for beginning important work, meeting people, education, family functions and professional decisions.",
    },
    {
      title: "Labh",
      color: "border-blue-200 bg-blue-50",
      description:
        "Associated with gains and growth. Considered suitable for financial matters, business expansion, purchases and career-related work.",
    },
    {
      title: "Chal",
      color: "border-yellow-200 bg-yellow-50",
      description:
        "A neutral Choghadiya. Suitable for routine activities, travel and regular work, but generally not preferred for highly significant events.",
    },
    {
      title: "Udveg",
      color: "border-orange-200 bg-orange-50",
      description:
        "Traditionally considered inauspicious. It is generally avoided for starting important work, financial commitments or major life decisions.",
    },
    {
      title: "Rog",
      color: "border-red-200 bg-red-50",
      description:
        "An unfavourable period associated with obstacles and health concerns. New beginnings and major investments are usually avoided.",
    },
    {
      title: "Kaal",
      color: "border-red-300 bg-red-100",
      description:
        "One of the most inauspicious Choghadiya periods. It is generally avoided for weddings, business launches, travel and other auspicious activities.",
    },
  ],

  hi: [
    {
      title: "अमृत",
      color: "border-green-200 bg-green-50",
      description:
        "अमृत चौघड़िया सबसे शुभ माना जाता है। नए कार्य, व्यापार, निवेश, यात्रा, पूजा-पाठ तथा महत्वपूर्ण निर्णयों की शुरुआत के लिए यह सर्वोत्तम समय माना जाता है।",
    },
    {
      title: "शुभ",
      color: "border-emerald-200 bg-emerald-50",
      description:
        "शुभ चौघड़िया नए कार्य, शिक्षा, पारिवारिक कार्यक्रम, व्यावसायिक बैठकों तथा अन्य शुभ कार्यों के लिए अनुकूल माना जाता है।",
    },
    {
      title: "लाभ",
      color: "border-blue-200 bg-blue-50",
      description:
        "लाभ चौघड़िया आर्थिक लाभ, व्यापार विस्तार, खरीदारी, निवेश और करियर से जुड़े निर्णयों के लिए शुभ माना जाता है।",
    },
    {
      title: "चाल",
      color: "border-yellow-200 bg-yellow-50",
      description:
        "चाल चौघड़िया सामान्य प्रकृति का होता है। दैनिक कार्यों, सामान्य यात्रा तथा नियमित गतिविधियों के लिए इसका उपयोग किया जा सकता है।",
    },
    {
      title: "उद्वेग",
      color: "border-orange-200 bg-orange-50",
      description:
        "उद्वेग चौघड़िया अशुभ माना जाता है। इस अवधि में नए कार्य, निवेश तथा महत्वपूर्ण निर्णय लेने से बचने की सलाह दी जाती है।",
    },
    {
      title: "रोग",
      color: "border-red-200 bg-red-50",
      description:
        "रोग चौघड़िया स्वास्थ्य, बाधाओं और कठिनाइयों से जुड़ा माना जाता है। इस समय शुभ कार्यों की शुरुआत सामान्यतः नहीं की जाती।",
    },
    {
      title: "काल",
      color: "border-red-300 bg-red-100",
      description:
        "काल चौघड़िया सबसे अधिक अशुभ अवधियों में से एक माना जाता है। विवाह, व्यापार, यात्रा तथा अन्य शुभ कार्यों की शुरुआत इस समय से बचकर करनी चाहिए।",
    },
  ],
};

export default function ChoghadiyaTypes({
  isHi,
}: ChoghadiyaTypesProps) {
  const items = isHi ? TYPES.hi : TYPES.en;

  return (
    <section className="mt-14">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi
            ? "चौघड़िया के प्रकार"
            : "Types of Choghadiya"}
        </h2>

        <p className="mt-3 max-w-3xl text-gray-300 leading-7">
          {isHi
            ? "प्रत्येक चौघड़िया की प्रकृति अलग होती है। नीचे सभी सात प्रकार के चौघड़िया तथा उनके पारंपरिक उपयोग दिए गए हैं।"
            : "Each Choghadiya has its own traditional significance. Below are the seven types of Choghadiya and their commonly accepted uses."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className={`rounded-xl border p-6 ${item.color}`}
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {item.title}
            </h3>

            <p className="mt-3 leading-7 text-gray-700">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}