import Link from "next/link";

const TOPICS = [
  {
    href: "/marriage-astrology/marriage-prediction",
    title: "Marriage Prediction",
    title_hi: "विवाह की भविष्यवाणी",
    desc: "Read the 7th house, its lord, and Venus to understand the timing and nature of your marriage from your birth chart.",
    desc_hi: "सप्तम भाव, उसके स्वामी और शुक्र से जानें अपनी कुंडली में विवाह का समय और स्वभाव।",
    icon: "💍",
  },
  {
    href: "/marriage-astrology/marriage-timing",
    title: "Marriage Timing",
    title_hi: "विवाह का समय",
    desc: "Identify the Dasha and transit windows when the chart shows the strongest activation of marriage indicators.",
    desc_hi: "दशा और गोचर के उन संयोग की पहचान करें जब कुंडली में विवाह के कारक सबसे प्रबल हों।",
    icon: "📅",
  },
  {
    href: "/marriage-astrology/compatibility",
    title: "Compatibility",
    title_hi: "अनुकूलता",
    desc: "Assess the karmic alignment between two charts through Kundli matching, Navamsa, and planetary Karakas.",
    desc_hi: "कुंडली मिलान, नवांश और ग्रह कारकों से दो कुंडलियों के कार्मिक संरेखण का मूल्यांकन करें।",
    icon: "🤝",
  },
  {
    href: "/marriage-astrology/spouse-nature",
    title: "Spouse Nature",
    title_hi: "जीवनसाथी का स्वभाव",
    desc: "The 7th house, Darakaraka, and Navamsa together reveal your spouse's personality, appearance, and qualities.",
    desc_hi: "सप्तम भाव, दारकारक और नवांश मिलकर जीवनसाथी के व्यक्तित्व, रूप और गुणों को प्रकट करते हैं।",
    icon: "🌸",
  },
];

export default function HomeMarriageAstrology({ locale }: { locale: string }) {
  const isHi = locale === "hi";

  return (
    <section className="mb-16" aria-labelledby="marriage-astrology-heading">
      <div className="flex items-center gap-3 mb-4">
        <h2
          id="marriage-astrology-heading"
          className="text-2xl font-semibold whitespace-nowrap"
        >
          {isHi ? "विवाह ज्योतिष" : "Marriage Astrology"}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-rose-500 to-transparent" />
      </div>

      <p className="text-gray-400 text-sm mb-6 max-w-2xl leading-relaxed">
        {isHi
          ? "वैदिक ज्योतिष विवाह के समय, जीवनसाथी के स्वभाव, अनुकूलता और वैवाहिक जीवन की गुणवत्ता को जन्मकुंडली और नवांश चार्ट से जोड़ता है। चाहे विवाह का सही समय जानना हो या जीवनसाथी की प्रकृति समझनी हो — आपकी कुंडली में गहरे उत्तर हैं।"
          : "Vedic astrology maps marriage timing, spouse nature, compatibility, and marital harmony to your birth chart and Navamsa. Whether you are seeking the right time to marry or understanding a partner's nature, your chart holds deeper answers than any compatibility quiz."}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {TOPICS.map((topic) => (
          <Link
            key={topic.href}
            href={`${locale === 'hi' ? '/hi' : ''}${topic.href}`}
            className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-rose-900/40 rounded-2xl p-4 hover:border-rose-500/60 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300 flex flex-col"
          >
            <div className="text-2xl mb-2">{topic.icon}</div>
            <div className="font-semibold text-white text-sm md:text-base mb-1">
              {isHi ? topic.title_hi : topic.title}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3 flex-1">
              {isHi ? topic.desc_hi : topic.desc}
            </p>
            <span className="text-rose-400 text-xs font-medium mt-auto">
              {isHi ? "देखें" : "Explore"} →
            </span>
          </Link>
        ))}
      </div>

      <div>
        <Link
          href={`${locale === 'hi' ? '/hi' : ''}/marriage-astrology`}
          className="inline-block px-6 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 rounded-full transition-all active:scale-95"
        >
          {isHi ? "विवाह ज्योतिष देखें →" : "Explore Marriage Astrology →"}
        </Link>
      </div>
    </section>
  );
}
