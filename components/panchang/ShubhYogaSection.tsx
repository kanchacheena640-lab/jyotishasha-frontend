interface ShubhYogaSectionProps {
  locale: string;
}

const CONTENT = {
  hi: {
    title: "शुभ योग जिन्हें आपको अवश्य देखना चाहिए",
    description:
      "यदि आप नया व्यवसाय शुरू कर रहे हैं, दुकान खोल रहे हैं, निवेश कर रहे हैं, महत्वपूर्ण दस्तावेज़ साइन कर रहे हैं या किसी बड़े निर्णय की तैयारी कर रहे हैं, तो इन शुभ योगों की जांच अवश्य करें।",

    yogas: [
      {
        name: "सिद्ध योग",
        use: "नया कार्य शुरू करना, व्यवसाय आरंभ करना और महत्वपूर्ण निर्णय लेना",
      },
      {
        name: "सर्वार्थ सिद्धि योग",
        use: "लगभग सभी प्रकार के शुभ कार्यों के लिए अत्यंत लाभकारी माना जाता है",
      },
      {
        name: "अमृत सिद्धि योग",
        use: "दीर्घकालिक सफलता, निवेश और स्थायी लाभ वाले कार्यों के लिए श्रेष्ठ",
      },
      {
        name: "रवि पुष्य योग",
        use: "सोना खरीदना, निवेश करना, व्यवसाय शुरू करना और संपत्ति खरीदना",
      },
      {
        name: "गुरु पुष्य योग",
        use: "शिक्षा, धन निवेश, आध्यात्मिक कार्य और नए अवसरों की शुरुआत",
      },
    ],
  },

  en: {
    title: "Auspicious Yogas You Should Watch For",
    description:
      "If you are starting a business, opening a shop, making investments, signing important documents or preparing for a major decision, these auspicious Yogas deserve special attention.",

    yogas: [
      {
        name: "Siddha Yoga",
        use: "Starting new ventures, business activities and important decisions",
      },
      {
        name: "Sarvartha Siddhi Yoga",
        use: "Considered highly favorable for almost all auspicious activities",
      },
      {
        name: "Amrit Siddhi Yoga",
        use: "Excellent for long-term success, investments and important initiatives",
      },
      {
        name: "Ravi Pushya Yoga",
        use: "Buying gold, making investments, starting businesses and purchasing property",
      },
      {
        name: "Guru Pushya Yoga",
        use: "Education, financial planning, spiritual pursuits and new opportunities",
      },
    ],
  },
};

export default function ShubhYogaSection({
  locale,
}: ShubhYogaSectionProps) {
  const content =
    locale === "hi"
      ? CONTENT.hi
      : CONTENT.en;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-4">
        {content.title}
      </h2>

      <p className="text-gray-300 mb-8">
        {content.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {content.yogas.map((yoga) => (
          <div
            key={yoga.name}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <h3 className="text-xl font-semibold mb-2">
              {yoga.name}
            </h3>

            <p className="text-gray-300">
              {yoga.use}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}