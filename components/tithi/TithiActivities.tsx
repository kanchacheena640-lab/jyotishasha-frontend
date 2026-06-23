interface Props {
  locale: string;
}

export default function TithiActivities({
  locale,
}: Props) {
  const isHi = locale === "hi";

  const rows = [
    {
      tithi: "Pratipada",
      tithi_hi: "प्रतिपदा",
      deity: "Agni",
      deity_hi: "अग्नि",
      nature: "Beginning",
      nature_hi: "आरंभ",
      bestFor: "New Projects, Planning",
      bestFor_hi: "नई शुरुआत, योजना",
      activities: "Starting new ventures and important plans",
      activities_hi: "नए कार्य और योजनाएं शुरू करना",
    },
    {
      tithi: "Dwitiya",
      tithi_hi: "द्वितीया",
      deity: "Brahma",
      deity_hi: "ब्रह्मा",
      nature: "Growth",
      nature_hi: "विकास",
      bestFor: "Partnerships, Meetings",
      bestFor_hi: "साझेदारी, बैठक",
      activities: "Building relationships and cooperation",
      activities_hi: "संबंध और सहयोग बढ़ाना",
    },
    {
      tithi: "Tritiya",
      tithi_hi: "तृतीया",
      deity: "Gauri",
      deity_hi: "गौरी",
      nature: "Prosperity",
      nature_hi: "समृद्धि",
      bestFor: "Learning, Wealth",
      bestFor_hi: "शिक्षा, धन",
      activities: "Education, arts and financial activities",
      activities_hi: "शिक्षा, कला और धन संबंधी कार्य",
    },
    {
      tithi: "Chaturthi",
      tithi_hi: "चतुर्थी",
      deity: "Ganesha",
      deity_hi: "गणेश",
      nature: "Obstacle Removal",
      nature_hi: "विघ्न निवारण",
      bestFor: "Problem Solving",
      bestFor_hi: "समस्या समाधान",
      activities: "Ganesha worship and overcoming obstacles",
      activities_hi: "गणेश पूजा और विघ्न निवारण",
    },
    {
      tithi: "Panchami",
      tithi_hi: "पंचमी",
      deity: "Nagas",
      deity_hi: "नाग",
      nature: "Knowledge",
      nature_hi: "विद्या",
      bestFor: "Education",
      bestFor_hi: "शिक्षा",
      activities: "Learning, study and spiritual knowledge",
      activities_hi: "अध्ययन और ज्ञान प्राप्ति",
    },
    {
      tithi: "Shashthi",
      tithi_hi: "षष्ठी",
      deity: "Kartikeya",
      deity_hi: "कार्तिकेय",
      nature: "Victory",
      nature_hi: "विजय",
      bestFor: "Competition, Courage",
      bestFor_hi: "प्रतियोगिता, साहस",
      activities: "Leadership, challenges and achievement",
      activities_hi: "नेतृत्व, चुनौतियाँ और उपलब्धि",
    },
    {
      tithi: "Saptami",
      tithi_hi: "सप्तमी",
      deity: "Surya",
      deity_hi: "सूर्य",
      nature: "Vitality",
      nature_hi: "ऊर्जा",
      bestFor: "Health, Travel",
      bestFor_hi: "स्वास्थ्य, यात्रा",
      activities: "Healing, travel and new ventures",
      activities_hi: "स्वास्थ्य, यात्रा और नए कार्य",
    },
    {
      tithi: "Ashtami",
      tithi_hi: "अष्टमी",
      deity: "Durga",
      deity_hi: "दुर्गा",
      nature: "Strength",
      nature_hi: "शक्ति",
      bestFor: "Protection, Worship",
      bestFor_hi: "सुरक्षा, पूजा",
      activities: "Spiritual practices and protection rituals",
      activities_hi: "साधना और सुरक्षा संबंधी अनुष्ठान",
    },
    {
      tithi: "Navami",
      tithi_hi: "नवमी",
      deity: "Durga",
      deity_hi: "दुर्गा",
      nature: "Power",
      nature_hi: "शक्ति",
      bestFor: "Religious Activities",
      bestFor_hi: "धार्मिक कार्य",
      activities: "Worship, devotion and spiritual growth",
      activities_hi: "पूजा, भक्ति और आध्यात्मिक उन्नति",
    },
    {
      tithi: "Dashami",
      tithi_hi: "दशमी",
      deity: "Dharma",
      deity_hi: "धर्म",
      nature: "Success",
      nature_hi: "सफलता",
      bestFor: "Career, Expansion",
      bestFor_hi: "करियर, विस्तार",
      activities: "Business, career and important decisions",
      activities_hi: "व्यवसाय, करियर और महत्वपूर्ण निर्णय",
    },
    {
      tithi: "Ekadashi",
      tithi_hi: "एकादशी",
      deity: "Vishnu",
      deity_hi: "विष्णु",
      nature: "Spiritual",
      nature_hi: "आध्यात्मिक",
      bestFor: "Fasting, Worship",
      bestFor_hi: "व्रत, पूजा",
      activities: "Religious observances and devotion",
      activities_hi: "व्रत, पूजा और भक्ति",
    },
    {
      tithi: "Dwadashi",
      tithi_hi: "द्वादशी",
      deity: "Vishnu",
      deity_hi: "विष्णु",
      nature: "Purification",
      nature_hi: "शुद्धि",
      bestFor: "Charity, Worship",
      bestFor_hi: "दान, पूजा",
      activities: "Religious observances and charitable work",
      activities_hi: "धार्मिक कार्य और दान",
    },
    {
      tithi: "Trayodashi",
      tithi_hi: "त्रयोदशी",
      deity: "Shiva",
      deity_hi: "शिव",
      nature: "Transformation",
      nature_hi: "परिवर्तन",
      bestFor: "Shiva Worship",
      bestFor_hi: "शिव पूजा",
      activities: "Pradosh worship and spiritual practices",
      activities_hi: "प्रदोष पूजा और साधना",
    },
    {
      tithi: "Chaturdashi",
      tithi_hi: "चतुर्दशी",
      deity: "Shiva",
      deity_hi: "शिव",
      nature: "Introspection",
      nature_hi: "आत्मचिंतन",
      bestFor: "Meditation, Worship",
      bestFor_hi: "ध्यान, पूजा",
      activities: "Meditation and spiritual discipline",
      activities_hi: "ध्यान और आध्यात्मिक अनुशासन",
    },
    {
      tithi: "Purnima",
      tithi_hi: "पूर्णिमा",
      deity: "Chandra",
      deity_hi: "चंद्र",
      nature: "Completion",
      nature_hi: "पूर्णता",
      bestFor: "Religious Activities",
      bestFor_hi: "धार्मिक कार्य",
      activities: "Puja, charity and spiritual practices",
      activities_hi: "पूजा, दान और साधना",
    },
    {
      tithi: "Amavasya",
      tithi_hi: "अमावस्या",
      deity: "Pitru",
      deity_hi: "पितृ",
      nature: "Ancestral",
      nature_hi: "पितृ संबंध",
      bestFor: "Pitru Karya",
      bestFor_hi: "पितृ कार्य",
      activities: "Ancestor rituals and remembrance",
      activities_hi: "पितृ तर्पण और श्राद्ध",
    },
  ];

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-4">
        {isHi
          ? "विभिन्न तिथियों के लिए उपयुक्त कार्य"
          : "Activities Associated With Different Tithis"}
      </h2>

      <p className="text-gray-400 mb-8">
        {isHi
          ? "प्रत्येक तिथि का अपना स्वभाव, देवता और उपयोग माना जाता है। नीचे दी गई तालिका विभिन्न तिथियों से जुड़े पारंपरिक कार्यों का संक्षिप्त विवरण प्रदान करती है।"
          : "Each Tithi has a unique nature, ruling deity and traditional significance. The table below summarizes activities commonly associated with different Tithis."}
      </p>

      <div className="overflow-x-auto">

        <table className="w-full border border-white/10">

          <thead>
            <tr className="bg-white/5">

              <th className="p-3 text-left">
                {isHi ? "तिथि" : "Tithi"}
              </th>

              <th className="p-3 text-left">
                {isHi ? "देवता" : "Ruling Deity"}
              </th>

              <th className="p-3 text-left">
                {isHi ? "स्वभाव" : "Nature"}
              </th>

              <th className="p-3 text-left">
                {isHi ? "श्रेष्ठ कार्य" : "Best For"}
              </th>

              <th className="p-3 text-left">
                {isHi ? "अनुशंसित गतिविधियाँ" : "Recommended Activities"}
              </th>

            </tr>
          </thead>

          <tbody>

            {rows.map((row) => (
              <tr
                key={row.tithi}
                className="border-t border-white/10"
              >

                <td className="p-3 font-medium">
                  {isHi ? row.tithi_hi : row.tithi}
                </td>

                <td className="p-3">
                  {isHi ? row.deity_hi : row.deity}
                </td>

                <td className="p-3">
                  {isHi ? row.nature_hi : row.nature}
                </td>

                <td className="p-3">
                  {isHi ? row.bestFor_hi : row.bestFor}
                </td>

                <td className="p-3">
                  {isHi
                    ? row.activities_hi
                    : row.activities}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}