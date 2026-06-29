type ChoghadiyaUsageProps = {
  isHi: boolean;
};

const ACTIVITIES = {
  en: [
    {
      title: "Travel",
      description:
        "Amrit, Shubh and Labh Choghadiya are generally preferred before beginning domestic or long-distance journeys.",
    },
    {
      title: "Business & Investments",
      description:
        "Many people choose auspicious Choghadiya before launching a business, signing agreements or making important investments.",
    },
    {
      title: "Property & Vehicle Purchase",
      description:
        "Buying a house, land or vehicle during favourable Choghadiya is traditionally considered beneficial.",
    },
    {
      title: "Job & Career",
      description:
        "Interviews, joining a new job, submitting applications and important meetings are often planned during auspicious periods.",
    },
    {
      title: "Religious Activities",
      description:
        "Puja, Havan, temple visits and other spiritual activities are commonly performed during favourable Choghadiya.",
    },
    {
      title: "Daily Planning",
      description:
        "Many people use Choghadiya every day to schedule important personal and professional tasks at suitable times.",
    },
  ],

  hi: [
    {
      title: "यात्रा",
      description:
        "घरेलू या लंबी यात्रा प्रारम्भ करने से पहले अमृत, शुभ या लाभ चौघड़िया को प्राथमिकता दी जाती है।",
    },
    {
      title: "व्यापार एवं निवेश",
      description:
        "नया व्यापार शुरू करना, समझौते करना या महत्वपूर्ण निवेश करने से पहले शुभ चौघड़िया देखना पारंपरिक रूप से उचित माना जाता है।",
    },
    {
      title: "घर एवं वाहन खरीद",
      description:
        "घर, भूमि या वाहन खरीदने जैसे महत्वपूर्ण कार्यों के लिए शुभ चौघड़िया का चयन किया जाता है।",
    },
    {
      title: "नौकरी एवं करियर",
      description:
        "नई नौकरी जॉइन करना, इंटरव्यू देना, आवेदन जमा करना तथा महत्वपूर्ण मीटिंग के लिए शुभ समय चुना जाता है।",
    },
    {
      title: "धार्मिक कार्य",
      description:
        "पूजा, हवन, मंदिर दर्शन तथा अन्य धार्मिक कार्य सामान्यतः शुभ चौघड़िया में किए जाते हैं।",
    },
    {
      title: "दैनिक कार्य योजना",
      description:
        "कई लोग अपने महत्वपूर्ण दैनिक कार्यों की योजना बनाने के लिए प्रतिदिन चौघड़िया का उपयोग करते हैं।",
    },
  ],
};

export default function ChoghadiyaUsage({
  isHi,
}: ChoghadiyaUsageProps) {
  const items = isHi ? ACTIVITIES.hi : ACTIVITIES.en;

  return (
    <section className="mt-14">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi
            ? "चौघड़िया का उपयोग कब करें?"
            : "How to Use Choghadiya?"}
        </h2>

        <p className="mt-3 max-w-3xl text-gray-300 leading-7">
          {isHi
            ? "चौघड़िया दैनिक जीवन में शुभ समय चुनने का एक सरल और व्यावहारिक माध्यम है। नीचे कुछ सामान्य परिस्थितियाँ दी गई हैं जहाँ लोग चौघड़िया का उपयोग करते हैं।"
            : "Choghadiya offers a simple way to identify favourable timings for important activities. Below are some of the most common situations where it is traditionally consulted."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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

      <div className="mt-10 rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h3 className="text-xl font-semibold text-blue-900">
          {isHi
            ? "महत्वपूर्ण सूचना"
            : "Important Note"}
        </h3>

        <p className="mt-3 leading-7 text-blue-800">
          {isHi
            ? "चौघड़िया दैनिक कार्यों के लिए उपयोगी मार्गदर्शक है, लेकिन विवाह, गृह प्रवेश, नामकरण, उपनयन तथा अन्य प्रमुख संस्कारों के लिए विस्तृत मुहूर्त देखना अधिक उचित माना जाता है।"
            : "Choghadiya is a practical guide for everyday activities. However, for major life events such as marriage, housewarming, naming ceremonies and other important rituals, a complete Muhurat based on the Panchang is generally recommended."}
        </p>
      </div>
    </section>
  );
}