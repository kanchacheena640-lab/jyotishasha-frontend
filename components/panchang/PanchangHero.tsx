interface PanchangHeroProps {
  locale: string;
}

const CONTENT = {
  hi: {
    title: "वैदिक पंचांग – शुभ समय, मुहूर्त और दैनिक मार्गदर्शन",
    description:
      "वैदिक पंचांग केवल एक कैलेंडर नहीं है। यह तिथि, नक्षत्र, योग, करण, वार, राहु काल, भद्रा और पंचक जैसी महत्वपूर्ण जानकारियों के माध्यम से सही समय पर सही निर्णय लेने में सहायता करता है।",

    todayPanchang: "आज का पंचांग",
    freeKundali: "फ्री कुंडली",
    findMuhurat: "मुहूर्त खोजें",
  },

  en: {
    title: "Vedic Panchang – Muhurat, Auspicious Timings & Daily Guidance",
    description:
      "Vedic Panchang is more than a calendar. It helps you understand Tithi, Nakshatra, Yoga, Karana, Vara, Rahu Kaal, Bhadra and Panchak to make better decisions at the right time.",

    todayPanchang: "Today's Panchang",
    freeKundali: "Free Kundali",
    findMuhurat: "Find Muhurat",
  },
};

export default function PanchangHero({
  locale,
}: PanchangHeroProps) {
  const content =
    locale === "hi"
      ? CONTENT.hi
      : CONTENT.en;

  const prefix =
    locale === "hi"
      ? "/hi"
      : "";

  return (
    <section className="mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {content.title}
      </h1>

      <p className="text-gray-300 max-w-4xl leading-7 mb-8">
        {content.description}
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={`${prefix}/today-panchang`}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
        >
          {content.todayPanchang}
        </a>

        <a
          href={`${prefix}/free-kundali`}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          {content.freeKundali}
        </a>
      </div>
    </section>
  );
}