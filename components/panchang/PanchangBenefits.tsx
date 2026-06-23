import Link from "next/link";

interface PanchangBenefitsProps {
  locale: string;
}

interface BenefitItem {
  title: string;
  description: string;
  href?: string;
}

const CONTENT = {
  hi: {
  title: "लोग वास्तविक जीवन में पंचांग का उपयोग कैसे करते हैं",
  description:
    "पंचांग केवल तिथि और त्योहार देखने का साधन नहीं है। लोग इसका उपयोग विवाह, व्यवसाय, निवेश, संपत्ति खरीद, यात्रा और अन्य महत्वपूर्ण जीवन निर्णयों के लिए शुभ समय चुनने में करते हैं।",

  items: [
    {
        title: "मैं विवाह की योजना बना रहा हूँ",
        description:
        "विवाह की तिथि तय करने से पहले विवाह मुहूर्त, शुभ तिथि और अनुकूल नक्षत्र की जानकारी प्राप्त करें।",
        href: "/panchang/muhurat/marriage-muhurat",
    },
    {
        title: "मैं संपत्ति खरीदना चाहता हूँ",
        description:
        "जमीन, मकान, फ्लैट बुकिंग और रजिस्ट्री जैसे कार्यों के लिए शुभ मुहूर्त खोजें।",
        href: "/panchang/muhurat/property-purchase-muhurat",
    },
    {
        title: "मैं नया वाहन खरीद रहा हूँ",
        description:
        "नई कार, बाइक या अन्य वाहन खरीदने के लिए अनुकूल समय का चयन करें।",
        href: "/panchang/muhurat/vehicle-muhurat",
    },
    {
        title: "मैं सोना खरीदना या निवेश करना चाहता हूँ",
        description:
        "सोना खरीदने, निवेश शुरू करने और महत्वपूर्ण वित्तीय निर्णय लेने से पहले पंचांग देखें।",
        href: "/panchang/muhurat/gold-buying-muhurat",
    },
    {
        title: "हम संतान जन्म की योजना बना रहे हैं",
        description:
        "संतान जन्म से जुड़े शुभ मुहूर्त और पारंपरिक पंचांग कारकों की जानकारी प्राप्त करें।",
        href: "/panchang/muhurat/child-birth-muhurat",
    },
    {
        title: "हम नामकरण संस्कार की तैयारी कर रहे हैं",
        description:
        "बच्चे के नामकरण संस्कार के लिए शुभ तिथि और मुहूर्त खोजें।",
        href: "/panchang/muhurat/naamkaran-muhurat",
    },
    {
        title: "मैं गृह प्रवेश की योजना बना रहा हूँ",
        description:
        "नए घर या फ्लैट में प्रवेश करने से पहले गृह प्रवेश मुहूर्त अवश्य देखें।",
        href: "/panchang/muhurat/grah-pravesh-muhurat",
    },
    {
        title: "मैं विदेश यात्रा की योजना बना रहा हूँ",
        description:
        "विदेश यात्रा, स्थान परिवर्तन या लंबी दूरी की यात्रा से पहले अनुकूल तिथियों की जानकारी प्राप्त करें।",
        href: "/panchang/muhurat/foreign-travel-muhurat",
    },
    {
        title: "मैं नया व्यवसाय शुरू करना चाहता हूँ",
        description:
        "व्यवसाय पंजीकरण, दुकान उद्घाटन, उत्पाद लॉन्च और महत्वपूर्ण समझौतों के लिए शुभ समय चुनें।",
    },
    {
        title: "मैं नई नौकरी की तलाश में हूँ",
        description:
        "इंटरव्यू, नौकरी आवेदन, जॉइनिंग और करियर से जुड़े महत्वपूर्ण निर्णयों के लिए उपयुक्त समय जानें।",
    },
    {
        title: "मुझे महत्वपूर्ण दस्तावेज़ों पर हस्ताक्षर करने हैं",
        description:
        "अनुबंध, रजिस्ट्री, समझौते और अन्य महत्वपूर्ण कागजात पूरे करने से पहले पंचांग देखें।",
    },
    {
        title: "मैं नई दुकान या उत्पाद लॉन्च करने जा रहा हूँ",
        description:
        "दुकान उद्घाटन, नए उत्पाद लॉन्च और व्यावसायिक शुरुआत के लिए शुभ समय चुनें।",
    },
    ],
},

  en: {
    title: "How People Use Panchang In Real Life",
    description:
        "Panchang is not just a calendar of dates and festivals. People use it to select favorable timings for important life events, financial decisions, ceremonies and new beginnings.",

    items: [
    {
        title: "I Am Planning My Marriage",
        description:
        "Find suitable marriage Muhurats, auspicious dates and supportive Nakshatras before fixing your wedding date.",
        href: "/panchang/muhurat/marriage-muhurat",
    },
    {
        title: "I Want To Buy A Property",
        description:
        "Find auspicious dates for property purchase, land registration, house booking and registry work.",
        href: "/panchang/muhurat/property-purchase-muhurat",
    },
    {
        title: "I Am Buying A Vehicle",
        description:
        "Choose favorable timings for purchasing a new car, bike or commercial vehicle.",
        href: "/panchang/muhurat/vehicle-muhurat",
    },
    {
        title: "I Want To Buy Gold Or Invest Money",
        description:
        "Review Panchang before buying gold, making investments or taking major financial decisions.",
        href: "/panchang/muhurat/gold-buying-muhurat",
    },
    {
        title: "We Are Planning Child Birth",
        description:
        "Explore suitable Child Birth Muhurats and important Panchang factors traditionally considered before delivery planning.",
        href: "/panchang/muhurat/child-birth-muhurat",
    },
    {
        title: "We Are Planning A Naamkaran Ceremony",
        description:
        "Find auspicious dates and Muhurats for your child's naming ceremony.",
        href: "/panchang/muhurat/naamkaran-muhurat",
    },
    {
        title: "I Am Planning A Housewarming Ceremony",
        description:
        "Check Grah Pravesh Muhurats before entering a new home or apartment.",
        href: "/panchang/muhurat/grah-pravesh-muhurat",
    },
    {
        title: "I Am Planning Foreign Travel",
        description:
        "Review favorable dates before long-distance travel, relocation or overseas journeys.",
        href: "/panchang/muhurat/foreign-travel-muhurat",
    },
    {
        title: "I Want To Start A New Business",
        description:
        "Choose favorable timings for business registration, shop opening, product launches and important agreements.",
    },
    {
        title: "I Am Looking For A New Job",
        description:
        "Review favorable timings for interviews, job applications, joining dates and important career decisions.",
    },
    {
        title: "I Need To Sign Important Documents",
        description:
        "Many people check Panchang before registrations, agreements, contracts and major commitments.",
    },
    {
        title: "I Am Launching A New Product Or Shop",
        description:
        "Choose supportive timings for opening a store, launching a product or starting commercial operations.",
    },
    ],
},
};

export default function PanchangBenefits({
  locale,
}: PanchangBenefitsProps) {
  const content =
    locale === "hi"
      ? CONTENT.hi
      : CONTENT.en;

  return (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-4">
      {content.title}
    </h2>

    <p className="text-gray-300 mb-8">
      {content.description}
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.items.map((item: BenefitItem) =>
        item.href ? (
          <Link
            key={item.title}
            href={item.href}
            className="bg-white/5 border border-white/10 rounded-xl p-5 block hover:bg-white/10 transition"
          >
            <h3 className="text-lg font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-gray-300 text-sm leading-6">
              {item.description}
            </p>

            <div className="mt-4 text-sm text-indigo-400 font-medium">
              {locale === "hi"
                ? "शुभ मुहूर्त देखें →"
                : "View Upcoming Muhurat →"}
            </div>
          </Link>
        ) : (
          <div
            key={item.title}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <h3 className="text-lg font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-gray-300 text-sm leading-6">
              {item.description}
            </p>
          </div>
        )
      )}
    </div>
  </section>
);}