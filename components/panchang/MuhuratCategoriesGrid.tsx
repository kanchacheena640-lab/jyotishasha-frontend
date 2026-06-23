interface MuhuratCategoriesGridProps {
  locale: string;
}

export default function MuhuratCategoriesGrid({
  locale,
}: MuhuratCategoriesGridProps) {
  const isHi = locale === "hi";

  const prefix = isHi ? "/hi" : "";

  const items = isHi
    ? [
        {
          title: "विवाह मुहूर्त",
          href: `${prefix}/panchang/muhurat/marriage-muhurat`,
        },
        {
          title: "गृह प्रवेश मुहूर्त",
          href: `${prefix}/panchang/muhurat/grah-pravesh-muhurat`,
        },
        {
          title: "वाहन मुहूर्त",
          href: `${prefix}/panchang/muhurat/vehicle-muhurat`,
        },
        {
          title: "नामकरण मुहूर्त",
          href: `${prefix}/panchang/muhurat/naamkaran-muhurat`,
        },
        {
          title: "संपत्ति खरीद मुहूर्त",
          href: `${prefix}/panchang/muhurat/property-purchase-muhurat`,
        },
        {
          title: "स्वर्ण खरीदारी मुहूर्त",
          href: `${prefix}/panchang/muhurat/gold-buying-muhurat`,
        },
        {
          title: "विदेश यात्रा मुहूर्त",
          href: `${prefix}/panchang/muhurat/foreign-travel-muhurat`,
        },
        {
          title: "जन्म मुहूर्त",
          href: `${prefix}/panchang/muhurat/child-birth-muhurat`,
        },
      ]
    : [
        {
          title: "Marriage Muhurat",
          href: `${prefix}/panchang/muhurat/marriage-muhurat`,
        },
        {
          title: "Grah Pravesh Muhurat",
          href: `${prefix}/panchang/muhurat/grah-pravesh-muhurat`,
        },
        {
          title: "Vehicle Muhurat",
          href: `${prefix}/panchang/muhurat/vehicle-muhurat`,
        },
        {
          title: "Naamkaran Muhurat",
          href: `${prefix}/panchang/muhurat/naamkaran-muhurat`,
        },
        {
          title: "Property Purchase Muhurat",
          href: `${prefix}/panchang/muhurat/property-purchase-muhurat`,
        },
        {
          title: "Gold Buying Muhurat",
          href: `${prefix}/panchang/muhurat/gold-buying-muhurat`,
        },
        {
          title: "Foreign Travel Muhurat",
          href: `${prefix}/panchang/muhurat/foreign-travel-muhurat`,
        },
        {
          title: "Child Birth Muhurat",
          href: `${prefix}/panchang/muhurat/child-birth-muhurat`,
        },
      ];

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-4">
        {isHi
          ? "लोकप्रिय मुहूर्त श्रेणियां"
          : "Popular Muhurat Categories"}
      </h2>

      <p className="text-gray-300 mb-8">
        {isHi
          ? "विवाह, गृह प्रवेश, वाहन खरीद, संपत्ति खरीद और अन्य महत्वपूर्ण कार्यों के लिए शुभ मुहूर्त खोजें।"
          : "Find auspicious timings for marriage, housewarming, vehicle purchase, property registration and other important activities."}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition"
          >
            <div className="font-semibold">
              {item.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}