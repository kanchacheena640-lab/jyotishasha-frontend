import TithiCard from "@/components/TithiCard";
interface Props {
  locale: string;
}

export default function TithiList({
  locale,
}: Props) {
  const isHi = locale === "hi";

  const tithis = [
    {
      slug: "pratipada",
      name: "Pratipada",
      name_hi: "प्रतिपदा",
      deity: "Agni",
      deity_hi: "अग्नि",
      nature: "Beginning & Creation",
      nature_hi: "आरंभ एवं सृजन",
      color: "#7c3aed",
      category: "Nanda",
      moonIcon: "🌒",
      bestFor: ["New Plans"],
      bestFor_hi: ["नई शुरुआत"],
    },

    {
      slug: "dwitiya",
      name: "Dwitiya",
      name_hi: "द्वितीया",
      deity: "Brahma",
      deity_hi: "ब्रह्मा",
      nature: "Growth & Stability",
      nature_hi: "विकास एवं स्थिरता",
      color: "#2563eb",
      category: "Bhadra",
      moonIcon: "🌒",
      bestFor: ["Partnerships"],
      bestFor_hi: ["साझेदारी"],
    },

    {
      slug: "tritiya",
      name: "Tritiya",
      name_hi: "तृतीया",
      deity: "Gauri",
      deity_hi: "गौरी",
      nature: "Prosperity",
      nature_hi: "समृद्धि",
      color: "#16a34a",
      category: "Jaya",
      moonIcon: "🌒",
      bestFor: ["Wealth Activities"],
      bestFor_hi: ["धन संबंधी कार्य"],
    },

    {
      slug: "chaturthi",
      name: "Chaturthi",
      name_hi: "चतुर्थी",
      deity: "Ganesha",
      deity_hi: "गणेश",
      nature: "Obstacle Removal",
      nature_hi: "विघ्न निवारण",
      color: "#ea580c",
      category: "Rikta",
      moonIcon: "🌒",
      bestFor: ["Ganesha Worship"],
      bestFor_hi: ["गणेश पूजा"],
    },

    {
      slug: "panchami",
      name: "Panchami",
      name_hi: "पंचमी",
      deity: "Nagas",
      deity_hi: "नाग देवता",
      nature: "Learning",
      nature_hi: "विद्या",
      color: "#0891b2",
      category: "Poorna",
      moonIcon: "🌒",
      bestFor: ["Education"],
      bestFor_hi: ["शिक्षा"],
    },

    {
      slug: "shashthi",
      name: "Shashthi",
      name_hi: "षष्ठी",
      deity: "Kartikeya",
      deity_hi: "कार्तिकेय",
      nature: "Protection",
      nature_hi: "सुरक्षा",
      color: "#9333ea",
      category: "Nanda",
      moonIcon: "🌔",
      bestFor: ["Children"],
      bestFor_hi: ["संतान"],
    },

    {
      slug: "saptami",
      name: "Saptami",
      name_hi: "सप्तमी",
      deity: "Surya",
      deity_hi: "सूर्य",
      nature: "Vitality",
      nature_hi: "ऊर्जा",
      color: "#dc2626",
      category: "Bhadra",
      moonIcon: "🌔",
      bestFor: ["Health"],
      bestFor_hi: ["स्वास्थ्य"],
    },

    {
      slug: "ashtami",
      name: "Ashtami",
      name_hi: "अष्टमी",
      deity: "Durga",
      deity_hi: "दुर्गा",
      nature: "Strength",
      nature_hi: "शक्ति",
      color: "#be123c",
      category: "Jaya",
      moonIcon: "🌔",
      bestFor: ["Courage"],
      bestFor_hi: ["साहस"],
    },

    {
      slug: "navami",
      name: "Navami",
      name_hi: "नवमी",
      deity: "Durga",
      deity_hi: "दुर्गा",
      nature: "Victory",
      nature_hi: "विजय",
      color: "#e11d48",
      category: "Rikta",
      moonIcon: "🌔",
      bestFor: ["Achievements"],
      bestFor_hi: ["सफलता"],
    },

    {
      slug: "dashami",
      name: "Dashami",
      name_hi: "दशमी",
      deity: "Yama",
      deity_hi: "यम",
      nature: "Discipline",
      nature_hi: "अनुशासन",
      color: "#4f46e5",
      category: "Poorna",
      moonIcon: "🌔",
      bestFor: ["Authority"],
      bestFor_hi: ["प्रशासनिक कार्य"],
    },

    {
      slug: "ekadashi",
      name: "Ekadashi",
      name_hi: "एकादशी",
      deity: "Vishnu",
      deity_hi: "विष्णु",
      nature: "Spirituality",
      nature_hi: "आध्यात्मिकता",
      color: "#059669",
      category: "Nanda",
      moonIcon: "🌕",
      bestFor: ["Fasting"],
      bestFor_hi: ["व्रत"],
    },

    {
      slug: "dwadashi",
      name: "Dwadashi",
      name_hi: "द्वादशी",
      deity: "Vishnu",
      deity_hi: "विष्णु",
      nature: "Purification",
      nature_hi: "शुद्धि",
      color: "#0284c7",
      category: "Bhadra",
      moonIcon: "🌕",
      bestFor: ["Charity"],
      bestFor_hi: ["दान"],
    },

    {
      slug: "trayodashi",
      name: "Trayodashi",
      name_hi: "त्रयोदशी",
      deity: "Shiva",
      deity_hi: "शिव",
      nature: "Transformation",
      nature_hi: "परिवर्तन",
      color: "#7c2d12",
      category: "Jaya",
      moonIcon: "🌕",
      bestFor: ["Shiva Worship"],
      bestFor_hi: ["शिव पूजा"],
    },

    {
      slug: "chaturdashi",
      name: "Chaturdashi",
      name_hi: "चतुर्दशी",
      deity: "Shiva",
      deity_hi: "शिव",
      nature: "Completion",
      nature_hi: "पूर्णता",
      color: "#52525b",
      category: "Rikta",
      moonIcon: "🌕",
      bestFor: ["Meditation"],
      bestFor_hi: ["ध्यान"],
    },

    {
      slug: "purnima",
      name: "Purnima",
      name_hi: "पूर्णिमा",
      deity: "Chandra",
      deity_hi: "चंद्र",
      nature: "Fulfillment",
      nature_hi: "पूर्णता",
      color: "#facc15",
      category: "Poorna",
      moonIcon: "🌕",
      bestFor: ["Spiritual Practices"],
      bestFor_hi: ["धार्मिक कार्य"],
    },

    {
      slug: "amavasya",
      name: "Amavasya",
      name_hi: "अमावस्या",
      deity: "Pitru",
      deity_hi: "पितृ",
      nature: "Ancestral Connection",
      nature_hi: "पितृ संबंध",
      color: "#374151",
      category: "Special",
      moonIcon: "🌑",
      bestFor: ["Pitru Karya"],
      bestFor_hi: ["पितृ कार्य"],
    },
  ];

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-8">
        {isHi
          ? "सभी प्रमुख तिथियाँ"
          : "Major Tithis"}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tithis.map((tithi) => (
          <TithiCard
            key={tithi.slug}
            tithi={tithi}
            isHi={isHi}
            locale={locale}
          />
        ))}
      </div>

    </section>
  );
}