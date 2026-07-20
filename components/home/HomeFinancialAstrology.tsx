import Link from "next/link";

const TOPICS = [
  {
    href: "/financial-astrology/best-career",
    title: "Best Career for Your Chart",
    title_hi: "आपकी कुंडली के लिए सर्वश्रेष्ठ करियर",
    desc: "Use your 10th house, 10th lord nakshatra, and Atmakaraka to find the career domain where your chart is strongest.",
    desc_hi: "दशम भाव, नक्षत्र और आत्मकारक से जानें आपकी कुंडली का सबसे मजबूत करियर क्षेत्र।",
    icon: "💼",
  },
  {
    href: "/financial-astrology/government-job",
    title: "Government Job Yoga",
    title_hi: "सरकारी नौकरी का योग",
    desc: "Identify Sun, Moon nakshatra, and Saturn combinations that indicate government career potential in your birth chart.",
    desc_hi: "सूर्य, चंद्र नक्षत्र और शनि की स्थितियां जो सरकारी नौकरी की संभावना दर्शाती हैं।",
    icon: "🏛️",
  },
  {
    href: "/financial-astrology/salary-growth",
    title: "Salary Growth",
    title_hi: "वेतन वृद्धि",
    desc: "The 2nd and 11th lords in mutual support predict income growth. Find your strongest earnings windows in the dasha sequence.",
    desc_hi: "द्वितीय और एकादश स्वामियों का संबंध आय वृद्धि की भविष्यवाणी करता है।",
    icon: "📈",
  },
  {
    href: "/financial-astrology/job-vs-business",
    title: "Job vs Business",
    title_hi: "नौकरी बनाम व्यापार",
    desc: "The 3rd house — self-initiative — is the real key to business success. See what your birth chart recommends.",
    desc_hi: "तृतीय भाव — स्व-पहल — व्यापारिक सफलता की असली कुंजी है।",
    icon: "⚖️",
  },
];

export default function HomeFinancialAstrology({ locale }: { locale: string }) {
  const isHi = locale === "hi";

  return (
    <section className="mb-16" aria-labelledby="financial-astrology-heading">
      <div className="flex items-center gap-3 mb-4">
        <h2
          id="financial-astrology-heading"
          className="text-2xl font-semibold whitespace-nowrap"
        >
          {isHi ? "वित्त ज्योतिष" : "Financial Astrology"}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-500 to-transparent" />
      </div>

      <p className="text-gray-400 text-sm mb-6 max-w-2xl leading-relaxed">
        {isHi
          ? "वैदिक ज्योतिष करियर दिशा, पदोन्नति समय, वेतन वृद्धि और नौकरी के निर्णयों को जन्मकुंडली और दशा अनुक्रम से जोड़ता है। चाहे करियर चुनना हो, सरकारी नौकरी की तलाश हो, या वेतन वार्ता का सही समय ढूंढना हो — आपकी कुंडली में किसी भी करियर परीक्षण से अधिक सटीक उत्तर है।"
          : "Vedic astrology maps career direction, promotion timing, salary growth, and job decisions to your birth chart and dasha sequence. Whether you are choosing a career path, seeking a government role, or timing a salary negotiation, your chart holds a more precise answer than any career test."}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {TOPICS.map((topic) => (
          <Link
            key={topic.href}
            href={`${locale === 'hi' ? '/hi' : ''}${topic.href}`}
            className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-amber-900/40 rounded-2xl p-4 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 flex flex-col"
          >
            <div className="text-2xl mb-2">{topic.icon}</div>
            <div className="font-semibold text-white text-sm md:text-base mb-1">
              {isHi ? topic.title_hi : topic.title}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3 flex-1">
              {isHi ? topic.desc_hi : topic.desc}
            </p>
            <span className="text-amber-400 text-xs font-medium mt-auto">
              {isHi ? "देखें" : "Explore"} →
            </span>
          </Link>
        ))}
      </div>

      <div>
        <Link
          href={`${locale === 'hi' ? '/hi' : ''}/financial-astrology`}
          className="inline-block px-6 py-2.5 text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-600/30 rounded-full transition-all active:scale-95"
        >
          {isHi ? "वित्त ज्योतिष देखें →" : "Explore Financial Astrology →"}
        </Link>
      </div>
    </section>
  );
}
