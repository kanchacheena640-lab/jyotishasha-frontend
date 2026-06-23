interface TodayPanchangSnapshotProps {
  locale: string;
}

const CONTENT = {
  hi: {
    title: "आज के पंचांग में क्या देखें",
    items: [
      "तिथि",
      "नक्षत्र",
      "योग",
      "करण",
      "सूर्योदय",
      "सूर्यास्त",
      "राहु काल",
      "पंचक",
      "भद्रा",
    ],
  },

  en: {
    title: "What You Can Check In Today's Panchang",
    items: [
      "Tithi",
      "Nakshatra",
      "Yoga",
      "Karana",
      "Sunrise",
      "Sunset",
      "Rahu Kaal",
      "Panchak",
      "Bhadra",
    ],
  },
};

export default function TodayPanchangSnapshot({
  locale,
}: TodayPanchangSnapshotProps) {
  const content =
    locale === "hi"
      ? CONTENT.hi
      : CONTENT.en;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6">
        {content.title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {content.items.map((item) => (
          <div
            key={item}
            className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}