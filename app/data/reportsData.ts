export interface Report {
  id: string; 
  slug: string;
  price: number;
  image: string;
  category: { en: string; hi: string };
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  fullDescription: { en: string; hi: string };
}

export const reportsData: Report[] = [
  {
    id: "rep_001",
    title: { en: "Sadhesati Report", hi: "शनि साढ़ेसाती रिपोर्ट" },
    slug: "sadhesati_report",
    price: 51,
    image: "/reports/sadhesati-report.webp",
    category: { en: "Transit", hi: "गोचर" },
    description: { en: "Detailed Saturn Sadhesati report.", hi: "शनि की साढ़ेसाती की विस्तृत रिपोर्ट।" },
    fullDescription: { 
      en: "Uncover hidden struggles, karmic lessons, and powerful remedies in your personalized Shani Sade Sati Report.",
      hi: "अपनी व्यक्तिगत शनि साढ़े साती रिपोर्ट में छिपे हुए संघर्षों, कर्मों के सबक और शक्तिशाली उपायों को जानें।" 
    }
  },
  {
    id: "rep_002",
    title: { en: "Financial Report", hi: "वित्तीय रिपोर्ट" },
    slug: "financial_report",
    price: 51,
    image: "/reports/financial-report.webp",
    category: { en: "Finance", hi: "वित्त" },
    description: { en: "Gain insights into your financial growth.", hi: "अपने वित्तीय विकास की ज्योतिषीय जानकारी प्राप्त करें।" },
    fullDescription: { 
      en: "The Financial Report analyzes your wealth potential and stability using your birth chart and dasha periods.",
      hi: "वित्तीय रिपोर्ट आपकी कुंडली और दशाओं का उपयोग करके आपकी धन क्षमता और स्थिरता का विश्लेषण करती है।" 
    }
  },
  {
    id: "rep_003",
    title: { en: "Love & Relationship Report", hi: "प्रेम और संबंध रिपोर्ट" },
    slug: "love_relationship_report",
    price: 51,
    image: "/reports/love-life-report.webp",
    category: { en: "Love", hi: "प्रेम" },
    description: { en: "Explore your love life and relationship patterns.", hi: "अपने प्रेम जीवन और संबंधों के पैटर्न को जानें।" },
    fullDescription: { 
      en: "This report uncovers your emotional style and romantic compatibility using insights from your birth chart.",
      hi: "यह रिपोर्ट आपकी कुंडली के माध्यम से आपकी भावनात्मक शैली और रोमांटिक अनुकूलता को उजागर करती है।" 
    }
  },
  {
    id: "rep_004",
    title: { en: "Marriage Report", hi: "विवाह रिपोर्ट" },
    slug: "marriage_report",
    price: 51,
    image: "/reports/marriage-report.webp",
    category: { en: "Marriage", hi: "विवाह" },
    description: { en: "Understand your marriage prospects and timing.", hi: "अपने विवाह की संभावनाओं और समय को समझें।" },
    fullDescription: { 
      en: "Reveals emotional compatibility and possible challenges using your astrological chart and dasha.",
      hi: "आपकी ज्योतिषीय कुंडली और दशा का उपयोग करके भावनात्मक अनुकूलता और चुनौतियों का खुलासा करती है।" 
    }
  },
  {
    id: "rep_005",
    title: { en: "Startup Suggestion Report", hi: "स्टार्टअप सुझाव रिपोर्ट" },
    slug: "startup_suggestion_report",
    price: 51,
    image: "/reports/startup-suggestion-report.webp",
    category: { en: "Finance", hi: "वित्त" },
    description: { en: "Discover the best startup path for you.", hi: "अपने लिए सबसे अच्छा स्टार्टअप मार्ग खोजें।" },
    fullDescription: { 
      en: "Combines your astrological blueprint with planetary periods to guide your entrepreneurial journey.",
      hi: "आपकी ज्योतिषीय योजना को ग्रहों की दशा के साथ जोड़कर आपकी उद्यमशीलता यात्रा का मार्गदर्शन करती है।" 
    }
  },
  {
    id: "rep_006",
    title: { en: "Love Marriage Report", hi: "प्रेम विवाह रिपोर्ट" },
    slug: "love_marriage_report",
    price: 51,
    image: "/reports/love-marriage-report.webp",
    category: { en: "Marriage", hi: "विवाह" },
    description: { en: "Understand your chances of love marriage.", hi: "प्रेम विवाह की अपनी संभावनाओं को समझें।" },
    fullDescription: { 
      en: "Analyzes your birth chart to reveal the possibility and timing related to love-based marriage.",
      hi: "प्रेम विवाह की संभावना, समय और ग्रहों के प्रभाव को जानने के लिए आपकी कुंडली का विश्लेषण करती है।" 
    }
  },
  {
    id: "rep_007",
    title: { en: "Government Job Report", hi: "सरकारी नौकरी रिपोर्ट" },
    slug: "government_job_report",
    price: 51,
    image: "/reports/government-job-report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Discover your potential for a government career.", hi: "सरकारी करियर के लिए अपनी क्षमता का पता लगाएं।" },
    fullDescription: { 
      en: "Evaluates your chances of securing a government job and favorable timing for success.",
      hi: "सरकारी नौकरी पाने की संभावनाओं, उपयुक्त क्षेत्रों और सफलता के सबसे अनुकूल समय का मूल्यांकन करती है।" 
    }
  },
  {
    id: "rep_008",
    title: { en: "Foreign Travel Report", hi: "विदेश यात्रा रिपोर्ट" },
    slug: "foreign_travel_report",
    price: 51,
    image: "/reports/foreign-travel-report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Know your chances of travel or settlement abroad.", hi: "विदेश यात्रा या वहां बसने की संभावनाओं को जानें।" },
    fullDescription: { 
      en: "Examines your birth chart to reveal opportunities for travel or settlement abroad.",
      hi: "विदेश यात्रा या विदेश में बसने के अवसरों और अनुकूल समय का विवरण प्रदान करती है।" 
    }
  },
  {
    id: "rep_009",
    title: { en: "Business Report", hi: "व्यापार रिपोर्ट" },
    slug: "business_report",
    price: 51,
    image: "/reports/business-report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Discover your business potential and opportunities.", hi: "अपनी व्यावसायिक क्षमता और अवसरों का पता लगाएं।" },
    fullDescription: { 
      en: "Evaluates entrepreneurial strengths and favorable industries using dasha insights.",
      hi: "आपकी उद्यमशीलता की ताकत और सही समय का मूल्यांकन करने के लिए कुंडली का विश्लेषण करती है।" 
    }
  },
  {
    id: "rep_010",
    title: { en: "Career Report", hi: "करियर रिपोर्ट" },
    slug: "career_report",
    price: 51,
    image: "/reports/career-report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Understand your career path and growth.", hi: "अपने करियर पथ और विकास को समझें।" },
    fullDescription: { 
      en: "Analyzes professional strengths, challenges, and timings for career advancement.",
      hi: "आपकी व्यावसायिक ताकत, चुनौतियों और करियर में उन्नति के लिए अनुकूल समय का विश्लेषण करती है।" 
    }
  },
  {
    id: "rep_011",
    title: { en: "Gemstone Consultation", hi: "रत्न परामर्श रिपोर्ट" },
    slug: "gemstone_consultation",
    price: 51,
    image: "/reports/gemstone_consultation.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Personalized gemstone recommendations for luck.", hi: "भाग्य और सफलता के लिए व्यक्तिगत रत्न सुझाव।" },
    fullDescription: { 
      en: "Guides you in choosing the right gemstone to balance your planets and attract positive energy.",
      hi: "आपके ग्रहों को संतुलित करने और सकारात्मक ऊर्जा को आकर्षित करने के लिए सही रत्न चुनने में मार्गदर्शन करती है।" 
    }
  },
  {
    id: "rep_012",
    title: { en: "Children Parenting Report", hi: "संतान और पेरेंटिंग रिपोर्ट" },
    slug: "children_parenting_report",
    price: 51,
    image: "/reports/children_parenting_report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Understand your child’s traits and parenting guidance.", hi: "अपने बच्चे के स्वभाव और पेरेंटिंग मार्गदर्शन को समझें।" },
    fullDescription: { 
      en: "Offers insights into your child’s personality and behavior through their birth chart.",
      hi: "बच्चे के व्यक्तित्व, ताकत और व्यवहार को समझने के लिए पेरेंटिंग मार्गदर्शन प्रदान करती है।" 
    }
  },
  {
    id: "rep_013",
    title: { en: "Delay in Marriage Report", hi: "विवाह में देरी रिपोर्ट" },
    slug: "delay_in_marriage_report",
    price: 51,
    image: "/reports/delay_in_marriage_report.webp",
    category: { en: "Marriage", hi: "विवाह" },
    description: { en: "Find reasons behind marriage delays and remedies.", hi: "विवाह में देरी के ज्योतिषीय कारण और उपाय जानें।" },
    fullDescription: { 
      en: "Reveals planetary combinations that may cause postponements in marriage and provides remedies.",
      hi: "विवाह में देरी के कारणों जैसे शनि या राहु के प्रभाव की पहचान कर उचित उपाय बताती है।" 
    }
  },
  {
    id: "rep_014",
    title: { en: "Financial Stability Report", hi: "वित्तीय स्थिरता रिपोर्ट" },
    slug: "financial_stability_report",
    price: 51,
    image: "/reports/financial_stability_report.webp",
    category: { en: "Finance", hi: "वित्त" },
    description: { en: "Discover your long-term financial potential.", hi: "अपनी दीर्घकालिक वित्तीय क्षमता का पता लगाएं।" },
    fullDescription: { 
      en: "Explores wealth, savings, and stability unfolded as per your birth chart.",
      hi: "आपकी कुंडली के अनुसार धन, बचत और स्थिरता के योगों का विश्लेषण करती है।" 
    }
  },
  {
    id: "rep_015",
    title: { en: "Jupiter Transit Report", hi: "गुरु गोचर रिपोर्ट" },
    slug: "jupiter_transit_report",
    price: 51,
    image: "/reports/jupiter_transit_report.webp",
    category: { en: "Transit", hi: "गोचर" },
    description: { en: "Impact of Jupiter’s transit on career and finance.", hi: "करियर और वित्त पर बृहस्पति के गोचर का प्रभाव जानें।" },
    fullDescription: { 
      en: "Explains the influence of Jupiter’s movement on growth, opportunities, and wisdom.",
      hi: "विकास, अवसर और वित्त पर बृहस्पति (गुरु) के गोचर के प्रभाव और शुभ तिथियों का विवरण देती है।" 
    }
  },
  {
    id: "rep_016",
    title: { en: "Lifestyle Analysis Report", hi: "जीवनशैली विश्लेषण रिपोर्ट" },
    slug: "lifestyle_analysis_report",
    price: 51,
    image: "/reports/lifestyle_analysis_report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Insights on your health and daily habits.", hi: "आपके स्वास्थ्य और दैनिक आदतों पर ज्योतिषीय जानकारी।" },
    fullDescription: { 
      en: "Studies planetary positions to reveal your natural lifestyle patterns and energy levels.",
      hi: "आपकी जीवनशैली के पैटर्न, स्वास्थ्य प्रवृत्तियों और आदतों का विश्लेषण कर संतुलन बनाए रखने में मदद करती है।" 
    }
  },
  {
    id: "rep_017",
    title: { en: "Love Disappointment Report", hi: "प्रेम निराशा रिपोर्ट" },
    slug: "love_disappointment_report",
    price: 51,
    image: "/reports/love_disappointment_report.webp",
    category: { en: "Love", hi: "प्रेम" },
    description: { en: "Reasons for setbacks and emotional guidance.", hi: "प्रेम में असफलता के कारण और भावनात्मक मार्गदर्शन।" },
    fullDescription: { 
      en: "Explores reasons behind heartbreak or unfulfilled expectations using the 5th and 7th houses.",
      hi: "रिश्तों में धोखे या असफलता के ज्योतिषीय कारणों को स्पष्ट कर भविष्य के लिए मार्गदर्शन देती है।" 
    }
  },
  {
    id: "rep_018",
    title: { en: "Problem in Marriage Report", hi: "विवाह समस्या रिपोर्ट" },
    slug: "problem_in_marriage_report",
    price: 51,
    image: "/reports/problem_in_marriage_report.webp",
    category: { en: "Marriage", hi: "विवाह" },
    description: { en: "Identify causes of conflict in marriage.", hi: "विवाहिक जीवन में कलह के कारणों की पहचान करें।" },
    fullDescription: { 
      en: "Analyzes the 7th house and dasha influences to find practical solutions for harmony.",
      hi: "विवाह में आपसी तालमेल की कमी और विवादों के कारणों को जानकर शांति के उपाय बताती है।" 
    }
  },
  {
    id: "rep_019",
    title: { en: "Mood & Mental Health Report", hi: "मानसिक स्वास्थ्य रिपोर्ट" },
    slug: "mood_mental_health_report",
    price: 51,
    image: "/reports/mood_mental_health_report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Understand your emotional balance.", hi: "अपने भावनात्मक संतुलन को ज्योतिष से समझें।" },
    fullDescription: { 
      en: "Studies the influence of the Moon and Mercury on your emotional well-being.",
      hi: "चंद्रमा और बुध के प्रभाव का अध्ययन कर मानसिक शांति और भावनाओं को प्रबंधित करने की सलाह देती है।" 
    }
  },
  {
    id: "rep_020",
    title: { en: "Property Report", hi: "संपत्ति रिपोर्ट" },
    slug: "property_report",
    price: 51,
    image: "/reports/property_report.webp",
    category: { en: "Finance", hi: "वित्त" },
    description: { en: "Chances of property purchase and inheritance.", hi: "संपत्ति खरीदने और पैतृक लाभ की संभावनाओं को जानें।" },
    fullDescription: { 
      en: "Analyzes houses related to land and vehicles to highlight investment prospects.",
      hi: "जमीन, घर या वाहन खरीदने के अवसरों और निवेश के लिए अनुकूल समय का विश्लेषण करती है।" 
    }
  },
  {
    id: "rep_021",
    title: { en: "Saturn Transit Report", hi: "शनि गोचर रिपोर्ट" },
    slug: "saturn_transit_report",
    price: 51,
    image: "/reports/saturn_transit_report.webp",
    category: { en: "Transit", hi: "गोचर" },
    description: { en: "How Saturn’s transit impacts discipline and career.", hi: "करियर और अनुशासन पर शनि के गोचर का प्रभाव।" },
    fullDescription: { 
      en: "Explains karmic lessons and responsibilities Saturn brings to your life areas.",
      hi: "शनि के गोचर से मिलने वाले कर्मों के फल, अनुशासन और करियर में आने वाले बदलावों का विवरण देती है।" 
    }
  },
  {
    id: "rep_022",
    title: { en: "Second Marriage Report", hi: "द्वितीय विवाह रिपोर्ट" },
    slug: "second_marriage_report",
    price: 51,
    image: "/reports/second_marriage_report.webp",
    category: { en: "Marriage", hi: "विवाह" },
    description: { en: "Analyze prospects of remarriage.", hi: "पुनर्विवाह की संभावनाओं का विश्लेषण करें।" },
    fullDescription: { 
      en: "Reveals chances of remarriage and finding a compatible partner after separation.",
      hi: "तलाक या अलगाव के बाद दूसरे विवाह की संभावनाओं और अनुकूल जीवनसाथी मिलने के योग बताती है।" 
    }
  },
  {
    id: "rep_023",
    title: { en: "Divorce Possibility Report", hi: "तलाक संभावना रिपोर्ट" },
    slug: "divorce_possibility_report",
    price: 51,
    image: "/reports/divorce_possibility_report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Factors indicating separation in marriage.", hi: "विवाह में अलगाव या तलाक के ज्योतिषीय संकेत।" },
    fullDescription: { 
      en: "Assesses challenges in marital life triggered by dasha and transit influences.",
      hi: "विवाह में अलगाव पैदा करने वाले ग्रहों और दशाओं का विश्लेषण कर समाधान के तरीके बताती है।" 
    }
  },
  {
    id: "rep_024",
    title: { en: "Legal Disputes Report", hi: "कानूनी विवाद रिपोर्ट" },
    slug: "legal_disputes_report",
    price: 51,
    image: "/reports/legal_disputes_report.webp",
    category: { en: "Self", hi: "स्वयं" },
    description: { en: "Clarity on court cases and settlement chances.", hi: "कोर्ट केस और समझौते की संभावनाओं पर स्पष्टता।" },
    fullDescription: { 
      en: "Analyzes houses of conflict to reveal possibilities and timing of legal issues.",
      hi: "कानूनी विवादों, अदालती मामलों और समझौते की संभावनाओं का समय के साथ विश्लेषण करती है।" 
    }
  },
  {
    id: "rep_025",
    title: { en: "Relationship Future Report", hi: "रिलेशनशिप फ्यूचर रिपोर्ट" },
    slug: "relationship_future_report",
    price: 199,
    image: "/reports/relationship-future-report.webp",
    category: { en: "Love", hi: "प्रेम" },
    description: { en: "Complete Love to Marriage future analysis.", hi: "प्रेम से विवाह तक के भविष्य का संपूर्ण विश्लेषण।" },
    fullDescription: { 
      en: "Provides a deep analysis of compatibility, emotional bonding, and long-term stability.",
      hi: "दो व्यक्तियों के बीच भावनात्मक तालमेल, विवाह की संभावना और भविष्य की स्थिरता का गहरा विश्लेषण करती है।" 
    }
  }
];