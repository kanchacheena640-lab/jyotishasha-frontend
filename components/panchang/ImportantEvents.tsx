interface ImportantEventsProps {
  locale: string;
}

export default function ImportantEvents({
  locale,
}: ImportantEventsProps) {
  const isHi = locale === "hi";

  const prefix = isHi ? "/hi" : "";

  const events = isHi
    ? [
        { title: "एकादशी", href: `${prefix}/ekadashi` },
        { title: "अमावस्या", href: `${prefix}/panchang/amavasya` },
        { title: "पूर्णिमा", href: `${prefix}/panchang/purnima` },
        { title: "प्रदोष व्रत", href: `${prefix}/panchang/pradosh` },
        { title: "संकष्टी चतुर्थी", href: `${prefix}/panchang/sankashti-chaturthi` },
        { title: "संक्रांति", href: `${prefix}/panchang/sankranti` },
      ]
    : [
        { title: "Ekadashi", href: `${prefix}/ekadashi` },
        { title: "Amavasya", href: `${prefix}/panchang/amavasya` },
        { title: "Purnima", href: `${prefix}/panchang/purnima` },
        { title: "Pradosh Vrat", href: `${prefix}/panchang/pradosh` },
        { title: "Sankashti Chaturthi", href: `${prefix}/panchang/sankashti-chaturthi` },
        { title: "Sankranti", href: `${prefix}/panchang/sankranti` },
      ];

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-4">
        {isHi
          ? "महत्वपूर्ण वैदिक तिथियां और पर्व"
          : "Important Vedic Dates & Observances"}
      </h2>

      <p className="text-gray-300 mb-8">
        {isHi
          ? "एकादशी, अमावस्या, पूर्णिमा और अन्य महत्वपूर्ण वैदिक तिथियों की जानकारी प्राप्त करें।"
          : "Explore Ekadashi, Purnima, Amavasya and other important Vedic observances."}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <a
            key={event.href}
            href={event.href}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition"
          >
            <div className="font-semibold">
              {event.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}