interface PanchangToolsProps {
  locale: string;
}

export default function PanchangTools({
  locale,
}: PanchangToolsProps) {
  const isHi = locale === "hi";

  const prefix = isHi ? "/hi" : "";

  const tools = isHi
    ? [
        {
          title: "आज का पंचांग",
          href: `${prefix}/today-panchang`,
        },
        {
          title: "राहु काल",
          href: `${prefix}/rahu-kaal`,
        },
        {
          title: "फ्री कुंडली",
          href: `${prefix}/free-kundali`,
        },
        {
          title: "मुहूर्त खोजें",
          href: `${prefix}/panchang/muhurat/marriage-muhurat`,
        },
      ]
    : [
        {
          title: "Today's Panchang",
          href: `${prefix}/today-panchang`,
        },
        {
          title: "Rahu Kaal",
          href: `${prefix}/rahu-kaal`,
        },
        {
          title: "Free Kundali",
          href: `${prefix}/free-kundali`,
        },
        {
          title: "Find Muhurat",
          href: `${prefix}/panchang/muhurat/marriage-muhurat`,
        },
      ];

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-4">
        {isHi
          ? "उपयोगी पंचांग टूल्स"
          : "Useful Panchang Tools"}
      </h2>

      <p className="text-gray-300 mb-8">
        {isHi
          ? "दैनिक पंचांग, राहु काल, कुंडली और मुहूर्त संबंधी उपयोगी टूल्स का उपयोग करें।"
          : "Use these useful tools for Panchang, Rahu Kaal, Kundali and Muhurat calculations."}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition"
          >
            <div className="font-semibold">
              {tool.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}