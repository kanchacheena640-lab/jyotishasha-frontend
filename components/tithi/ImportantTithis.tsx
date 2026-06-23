import Link from "next/link";

interface Props {
  locale: string;
}

export default function ImportantTithis({
  locale,
}: Props) {
  const isHi = locale === "hi";

  const items = [
    {
      title: "Ekadashi",
      title_hi: "एकादशी",
      desc: "Fasting & Vishnu Worship",
      desc_hi: "व्रत एवं विष्णु पूजा",
      href: `/${locale}/ekadashi`,
    },
    {
      title: "Purnima",
      title_hi: "पूर्णिमा",
      desc: "Full Moon Observances",
      desc_hi: "पूर्णिमा व्रत एवं पर्व",
      href: `/${locale}/panchang/tithi/purnima`,

    },
    {
      title: "Amavasya",
      title_hi: "अमावस्या",
      desc: "New Moon Observances",
      desc_hi: "अमावस्या एवं पितृ कार्य",
      href: `/${locale}/panchang/tithi/amavasya`,
    },
    {
      title: "Pradosh",
      title_hi: "प्रदोष",
      desc: "Shiva Worship",
      desc_hi: "शिव पूजा",
      href: `/${locale}/panchang/tithi`,
    },
    {
      title: "Sankashti",
      title_hi: "संकष्टी",
      desc: "Ganesha Worship",
      desc_hi: "गणेश पूजा",
      href: `/${locale}/panchang/tithi`,
    },
    {
      title: "Chaturthi",
      title_hi: "चतुर्थी",
      desc: "Ganesha Related Observances",
      desc_hi: "गणेश संबंधित व्रत",
      href: `/${locale}/panchang/tithi/chaturthi`,
    },
  ];

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-8">
        {isHi
          ? "महत्वपूर्ण तिथियाँ"
          : "Important Tithis"}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition"
          >
            <h3 className="font-semibold mb-2">
              {isHi
                ? item.title_hi
                : item.title}
            </h3>

            <p className="text-sm text-gray-400">
              {isHi
                ? item.desc_hi
                : item.desc}
            </p>
          </Link>
        ))}

      </div>

    </section>
  );
}