import Link from "next/link";

interface Props {
  locale: string;
}

export default function TithiTools({
  locale,
}: Props) {
  const isHi = locale === "hi";

  const prefix = isHi ? "/hi" : "";

  const tools = [
    {
      title: isHi ? "आज का पंचांग" : "Today's Panchang",
      href: `${prefix}/today-panchang`,
    },
    {
      title: isHi ? "राहु काल" : "Rahu Kaal",
      href: `${prefix}/rahu-kaal`,
    },
    {
      title: isHi ? "फ्री कुंडली" : "Free Kundali",
      href: `${prefix}/free-kundali`,
    },
    {
      title: isHi ? "मुहूर्त" : "Find Muhurat",
      href: `${prefix}/panchang/muhurat/child-birth-muhurat`,
    },
  ];

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-4">
        {isHi
          ? "संबंधित पंचांग टूल्स"
          : "Related Panchang Tools"}
      </h2>

      <p className="text-gray-400 mb-8">
        {isHi
          ? "तिथि, पंचांग, राहु काल और मुहूर्त से जुड़े उपयोगी टूल्स और सेवाओं तक जल्दी पहुँचें।"
          : "Quickly access useful tools and services related to Tithi, Panchang, Rahu Kaal and Muhurat."}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition"
          >
            <div className="font-semibold">
              {tool.title}
            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}