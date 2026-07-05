import React from "react";

export type GlobalTransitHubConfig = {
  positionKey: string;
  planetEn: string;
  planetHi: string;
  slug: string;
  outerBg: string;
  h1AccentClass: string;
  h1TaglineHi: string;
  h1TaglineEn: string;
  navColorClass: string;
  remediesNavHi: string;
  remediesNavEn: string;
  intro: (planetName: string, rashiName: string, isHi: boolean, currentYear: number) => React.ReactNode;
  snapshotBgClass: string;
  snapshotH2ColorClass: string;
  snapshotH2Hi: string;
  snapshotH2En: string;
  snapshotMotionClass: string;
  remediesH2Hi: string;
  remediesH2En: string;
  remediesLeftBgClass: string;
  remediesLeftBorderClass: string;
  remediesLeftHeadingColorClass: string;
  remediesVedicItems: (isHi: boolean) => React.ReactNode;
  remediesModernItems: (isHi: boolean) => React.ReactNode;
  footerOtherPlanets: string[];
  footerColorClass: string;
  footerPbBottom: boolean;
  ctaBtnColorClass: string;
  ctaBtnHi: string;
  ctaBtnEn: string;
  faqQ1Name: (currentYear: number, isHi: boolean) => string;
  faqQ1Answer: (isHi: boolean) => string;
  faqQ2Name: (currentYear: number, isHi: boolean) => string;
  faqQ2Answer: (isHi: boolean) => string;
  breadcrumbNameHi: string;
  breadcrumbNameEn: string;
  webPageNameHi: (currentYear: number) => string;
  webPageNameEn: (currentYear: number) => string;
  webPageDescHi: (currentYear: number) => string;
  webPageDescEn: string;
};

/* ─────────────────────────── SUN ─────────────────────────── */
export const sunTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Sun",
  planetEn: "Sun",
  planetHi: "सूर्य",
  slug: "sun-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-amber-950/20",
  h1AccentClass: "text-amber-600",
  h1TaglineHi: "जीवन ऊर्जा और शक्ति",
  h1TaglineEn: "Vitality & Power",
  navColorClass: "text-blue-700",
  remediesNavHi: "↓ सूर्य उपाय",
  remediesNavEn: "↓ Surya Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (सूर्य गोचर) हमारे <strong>आंतरिक प्रकाश और अधिकार</strong> का मासिक पुनर्संतुलन दर्शाता है। <strong>वैदिक ज्योतिष</strong> में सूर्य को ग्रहों का राजा माना जाता है, जो आत्मा, नेतृत्व और शारीरिक स्वास्थ्य का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में हमारे लक्ष्यों और महत्वाकांक्षाओं की दिशा तय करता है।
        </p>
        <p>
          सूर्य सभी ऊर्जा का स्रोत है, इसलिए इसका गोचर हमारे <strong>आत्म-अभिव्यक्ति और सामाजिक स्थिति</strong> को प्रभावित करता है। इस चक्र को समझकर आप अपनी शक्ति को सही दिशा में उपयोग कर सकते हैं, ऊर्जा बढ़ा सकते हैं और अधिक आत्मविश्वास के साथ जीवन जी सकते हैं।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Sun transit {currentYear}</strong> (Surya Gochar) marks a monthly recalibration of our <strong>inner light and authority</strong>. In <strong>Vedic astrology</strong>, the Sun is the King of the celestial cabinet, representing the Soul, leadership, and physical health. Its movement through <strong>{rashiName}</strong> sets the seasonal tone for our ambitions.
        </p>
        <p>
          As the source of all energy, the Sun&apos;s transit dictates our <strong>self-expression and social status</strong>. Understanding this cycle allows you to harness personal power, improve vitality, and navigate life with greater confidence.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-amber-400",
  snapshotH2Hi: "वर्तमान सूर्य स्थिति",
  snapshotH2En: "Current Sun Position",
  snapshotMotionClass: "",
  remediesH2Hi: "सूर्य शक्ति और उपाय",
  remediesH2En: "Sun Empowerment & Remedies",
  remediesLeftBgClass: "bg-amber-50",
  remediesLeftBorderClass: "border-amber-100",
  remediesLeftHeadingColorClass: "text-amber-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🪔
        <span>
          {isHi
            ? "रोज सुबह उगते सूर्य को जल अर्पित करें, इससे स्वास्थ्य और स्पष्टता बढ़ती है।"
            : <><strong>Arghya</strong> (Water) to the rising Sun daily to improve health and clarity.</>}
        </span>
      </li>
      <li className="flex gap-3">
        ☀️
        <span>
          {isHi
            ? <> <strong>आदित्य हृदय स्तोत्र</strong> या सूर्य बीज मंत्र का जप करें: <em>&quot;Om Hram Hreem Hroum Sah Suryaye Namah&quot;</em> </>
            : <>Chant the <strong>Aditya Hridayam</strong> or Surya Beej Mantra: <em>&quot;Om Hram Hreem Hroum Sah Suryaye Namah&quot;</em>.</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        👔
        <span>
          {isHi
            ? <> <strong>नेतृत्व:</strong> इस समय जिम्मेदारी लें और उदाहरण बनकर नेतृत्व करें। </>
            : <> <strong>Leadership:</strong> Focus on taking responsibility and leading by example during this month.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🧘
        <span>
          {isHi
            ? <> <strong>स्व-देखभाल:</strong> धूप में समय बिताएं या outdoor activities करें ताकि ऊर्जा और स्वास्थ्य बढ़े। </>
            : <> <strong>Self-Care:</strong> Prioritize &quot;Sun-gazing&quot; or outdoor activities to boost natural Vitamin D and solar energy.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"],
  footerColorClass: "text-blue-700",
  footerPbBottom: false,
  ctaBtnColorClass: "bg-amber-600 text-white hover:bg-slate-950 shadow-amber-200",
  ctaBtnHi: "अपना सूर्य विश्लेषण देखें →",
  ctaBtnEn: "Check My Solar Alignment →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में सूर्य गोचर करियर को कैसे प्रभावित करता है?`
      : `How does the Sun transit ${y} affect my career?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "सूर्य अधिकार, नेतृत्व और पहचान का ग्रह है। इसका गोचर करियर में प्रतिष्ठा, उच्च अधिकारियों से संबंध और निर्णय लेने की क्षमता को प्रभावित करता है।"
      : "The Sun represents authority and leadership. Its transit influences your professional recognition, relationship with superiors, and overall confidence in making executive decisions.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "सूर्य गोचर का आध्यात्मिक अर्थ क्या है?"
      : "What is the spiritual meaning of Sun Transit (Surya Gochar)?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से सूर्य आत्मा (Atma) का प्रतीक है। इसका गोचर बताता है कि जीवन के किस क्षेत्र में आपको जिम्मेदारी लेनी है, आत्मविश्वास दिखाना है और अपने उच्च उद्देश्य के साथ जुड़ना है।"
      : "Spiritually, the Sun represents the Atma (Soul). Its transit indicates where you need to shine your light, take responsibility, and align with your higher purpose.",
  breadcrumbNameHi: "सूर्य गोचर",
  breadcrumbNameEn: "Sun Transit",
  webPageNameHi: (y) => `सूर्य गोचर ${y}`,
  webPageNameEn: (y) => `Sun Transit ${y}`,
  webPageDescHi: (y) => `${y} में सूर्य गोचर का करियर, आत्मविश्वास और पहचान पर प्रभाव`,
  webPageDescEn: "Effects of Sun transit on career, confidence, authority, and recognition.",
};

/* ─────────────────────────── MOON ─────────────────────────── */
export const moonTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Moon",
  planetEn: "Moon",
  planetHi: "चंद्र",
  slug: "moon-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-indigo-950/20",
  h1AccentClass: "text-indigo-600",
  h1TaglineHi: "मन, भावनाएँ और अंतर्ज्ञान",
  h1TaglineEn: "Mind, Emotions & Intuition",
  navColorClass: "text-indigo-700",
  remediesNavHi: "↓ चंद्र उपाय",
  remediesNavEn: "↓ Chandra Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (चंद्र गोचर) हमारे <strong>मन, भावनाओं और दैनिक मूड</strong> का सबसे तेज़ बदलाव लाता है। <strong>वैदिक ज्योतिष</strong> में चंद्र माता, मन, अंतर्ज्ञान और भावुकता का कारक है। हर 2-3 दिन में राशि बदलने से यह गोचर <strong>{rashiName}</strong> में हमारे दैनिक अनुभवों को भावनात्मक रंग देता है।
        </p>
        <p>
          चंद्र हमारे subconscious और nurturing energy का प्रतीक है। इस गोचर को समझकर आप अपनी भावनाओं को बेहतर संभाल सकते हैं, अंतर्ज्ञान बढ़ा सकते हैं और मानसिक शांति प्राप्त कर सकते हैं। यह दैनिक जीवन में सबसे प्रत्यक्ष प्रभाव वाला ग्रह है।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Moon transit {currentYear}</strong> (Chandra Gochar) brings the fastest shifts in our <strong>mind, emotions, and daily mood</strong>. In <strong>Vedic astrology</strong>, the Moon rules the mother, mental state, intuition, and feelings. Changing signs every 2-3 days, its passage through <strong>{rashiName}</strong> colors our everyday emotional landscape.
        </p>
        <p>
          As the significator of inner peace, nurturing, and subconscious patterns, Moon transit affects sensitivity, memory, and relationships with mother/family. Understanding this cycle helps stabilize emotions, enhance intuition, and foster mental clarity in daily life.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-indigo-400",
  snapshotH2Hi: "वर्तमान चंद्र स्थिति",
  snapshotH2En: "Current Moon Position",
  snapshotMotionClass: "text-indigo-300",
  remediesH2Hi: "चंद्र सामंजस्य और उपाय",
  remediesH2En: "Moon Harmony & Remedies",
  remediesLeftBgClass: "bg-indigo-50",
  remediesLeftBorderClass: "border-indigo-100",
  remediesLeftHeadingColorClass: "text-indigo-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>चंद्र बीज मंत्र</strong> का जप: <em>&quot;ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः&quot;</em> सोमवार को 108 बार। </>
            : <>Chant <strong>Chandra Beej Mantra</strong>: <em>&quot;Om Shram Shreem Shraum Sah Chandramase Namah&quot;</em> 108 times on Mondays.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🪔
        <span>
          {isHi
            ? <> सोमवार को सफेद वस्तुएं (दूध, चावल, चीनी, सफेद कपड़ा, चांदी) दान करें। भगवान शिव को दूध चढ़ाएं। </>
            : <>Donate white items (milk, rice, sugar, white cloth, silver) on Mondays. Offer milk to Lord Shiva.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> मोती (Pearl) या चंद्रकोट चांदी में छोटी उंगली में सोमवार को धारण करें (ज्योतिषी से सलाह लें)। </>
            : <>Wear natural Pearl (Moti) in silver on the little finger on Monday (consult astrologer).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🧘
        <span>
          {isHi
            ? <> <strong>भावनात्मक देखभाल:</strong> मेडिटेशन, जर्नलिंग या पानी के पास समय बिताएं। </>
            : <> <strong>Emotional Care:</strong> Practice meditation, journaling, or spend time near water to calm the mind.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💧
        <span>
          {isHi
            ? <> <strong>हाइड्रेशन:</strong> खूब पानी पिएं और माँ का सम्मान करें (उनके साथ समय बिताएं या आशीर्वाद लें)। </>
            : <> <strong>Hydration &amp; Nurturing:</strong> Drink plenty of water and honor your mother—spend quality time or seek her blessings.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🌙
        <span>
          {isHi
            ? <> <strong>आराम:</strong> पर्याप्त नींद लें और चंद्रमा दिखाई देने पर उसे देखें/नमस्कार करें। </>
            : <> <strong>Rest &amp; Connection:</strong> Prioritize sleep and gaze at the Moon when visible for calming energy.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"],
  footerColorClass: "text-indigo-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-indigo-600 text-white hover:bg-slate-950 shadow-indigo-200",
  ctaBtnHi: "अपना दैनिक भावनात्मक विश्लेषण देखें →",
  ctaBtnEn: "Check My Daily Emotional Vibe →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में चंद्र गोचर भावनाओं और दैनिक मनोदशा को कैसे प्रभावित करता है?`
      : `How does Moon transit ${y} affect emotions and daily mood?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "चंद्रमा मन, भावनाओं, अंतर्ज्ञान और मातृत्व का कारक ग्रह है। इसका तेज़ गोचर हर 2-3 दिन में मानसिक स्थिति, भावनात्मक संवेदनशीलता, शांति और दैनिक प्रतिक्रियाओं को प्रभावित करता है।"
      : "The Moon governs the mind, emotions, intuition, and mother. Its quick transit influences daily mood swings, emotional sensitivity, mental peace, and instinctive reactions, shifting every 2-3 days.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "चंद्र गोचर का आध्यात्मिक महत्व क्या है?"
      : "What is the spiritual significance of Chandra Gochar?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से चंद्रमा आंतरिक मन, पोषण और अवचेतन का प्रतीक है। इसका गोचर भावनात्मक उपचार, अंतर्ज्ञान की वृद्धि, परिवार और माता से जुड़ाव तथा भावनाओं के प्रवाह को उजागर करता है।"
      : "Spiritually, the Moon represents the inner self, nurturing, and subconscious. Its transit highlights emotional healing, intuition development, connection to mother/family, and the flow of feelings in daily life.",
  breadcrumbNameHi: "चंद्र गोचर",
  breadcrumbNameEn: "Moon Transit",
  webPageNameHi: (y) => `चंद्र गोचर ${y}`,
  webPageNameEn: (y) => `Moon Transit ${y}`,
  webPageDescHi: (y) => `${y} में चंद्र गोचर का मन, भावनाएँ और अंतर्ज्ञान पर प्रभाव`,
  webPageDescEn: "Effects of Moon transit on mind, emotions, and intuition.",
};

/* ─────────────────────────── MARS ─────────────────────────── */
export const marsTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Mars",
  planetEn: "Mars",
  planetHi: "मंगल",
  slug: "mars-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-red-950/20",
  h1AccentClass: "text-red-600",
  h1TaglineHi: "साहस, ऊर्जा और क्रिया",
  h1TaglineEn: "Courage, Energy & Action",
  navColorClass: "text-red-700",
  remediesNavHi: "↓ मंगल उपाय",
  remediesNavEn: "↓ Mangal Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (मंगल गोचर) हमारे <strong>साहस, ऊर्जा और सक्रियता</strong> का शक्तिशाली चक्र है। <strong>वैदिक ज्योतिष</strong> में मंगल योद्धा ग्रह है जो साहस, शारीरिक शक्ति, नेतृत्व और संघर्ष का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में हमारी महत्वाकांक्षा, निर्णय लेने की क्षमता और क्रियाशीलता को तेज करता है।
        </p>
        <p>
          मंगल कच्ची ऊर्जा का स्रोत है—यह हमें आगे बढ़ने, चुनौतियों का सामना करने और लक्ष्यों को प्राप्त करने की शक्ति देता है। इस गोचर को समझकर आप अपनी ऊर्जा को सकारात्मक दिशा में उपयोग कर सकते हैं, क्रोध को नियंत्रित कर सकते हैं और मजबूत इच्छाशक्ति विकसित कर सकते हैं।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Mars transit {currentYear}</strong> (Mangal Gochar) ignites our <strong>courage, vitality, and drive for action</strong>. In <strong>Vedic astrology</strong>, Mars is the warrior planet governing energy, assertiveness, physical strength, competition, and leadership. Its passage through <strong>{rashiName}</strong> amplifies ambition, initiative, and the will to overcome obstacles.
        </p>
        <p>
          As the source of raw power and determination, Mars transit fuels passion, protection, and decisive movement—but requires discipline to avoid impulsiveness or conflict. Harnessing this cycle builds resilience, boosts physical vitality, and empowers bold, purposeful action.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-red-400",
  snapshotH2Hi: "वर्तमान मंगल स्थिति",
  snapshotH2En: "Current Mars Position",
  snapshotMotionClass: "text-amber-400",
  remediesH2Hi: "मंगल सामंजस्य और उपाय",
  remediesH2En: "Mars Harmony & Remedies",
  remediesLeftBgClass: "bg-red-50",
  remediesLeftBorderClass: "border-red-100",
  remediesLeftHeadingColorClass: "text-red-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>मंगल बीज मंत्र</strong> का जप: <em>&quot;ॐ क्रां क्रीं क्रौं सः भौमाय नमः&quot;</em> या <em>&quot;ॐ अं अंगारकाय नमः&quot;</em> मंगलवार को 108 बार। </>
            : <>Chant <strong>Mangal Beej Mantra</strong>: <em>&quot;Om Kram Kreem Kroum Sah Bhaumaya Namah&quot;</em> or <em>&quot;Om Ang Angarakaya Namah&quot;</em> 108 times on Tuesdays.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🪔
        <span>
          {isHi
            ? <> मंगलवार को लाल वस्तुएं (मसूर दाल, लाल फल, तांबा, लाल कपड़ा) दान करें। हनुमान चालीसा पढ़ें या हनुमान मंदिर जाएं। </>
            : <>Donate red items (masoor dal, red fruits, copper, red cloth) on Tuesdays. Recite Hanuman Chalisa or visit Hanuman temple.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> मूंगा (Red Coral) तांबे या सोने में अनामिका उंगली में मंगलवार को धारण करें (ज्योतिषी से सलाह लें)। </>
            : <>Wear Red Coral (Moonga) in copper/gold on the ring finger on Tuesday (consult astrologer).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🏋️
        <span>
          {isHi
            ? <> <strong>शारीरिक गतिविधि:</strong> व्यायाम, जिम, खेल या योग करें ताकि ऊर्जा सकारात्मक बहे। </>
            : <> <strong>Physical Outlet:</strong> Exercise, gym, sports, or martial arts to channel energy constructively.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🔥
        <span>
          {isHi
            ? <> <strong>क्रोध प्रबंधन:</strong> गहरी सांस लें, गिनती गिनें और assertive (न आक्रामक) तरीके से अपनी बात रखें। </>
            : <> <strong>Anger Management:</strong> Practice deep breathing, count to 10, and express needs assertively without aggression.</>}
        </span>
      </li>
      <li className="flex gap-3">
        ⚡
        <span>
          {isHi
            ? <> <strong>साहस:</strong> चुनौतियों का सामना करें, नेतृत्व लें और छोटे-छोटे goals पर तेजी से काम करें। </>
            : <> <strong>Courage &amp; Initiative:</strong> Take bold steps, lead projects, and act decisively on goals.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Moon", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"],
  footerColorClass: "text-red-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-red-600 text-white hover:bg-slate-950 shadow-red-200",
  ctaBtnHi: "अपना साहस और ऊर्जा विश्लेषण देखें →",
  ctaBtnEn: "Unlock Your Courage & Energy Forecast →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में मंगल गोचर ऊर्जा और साहस को कैसे प्रभावित करता है?`
      : `How does Mars transit ${y} affect energy and courage?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "मंगल ऊर्जा, साहस और कार्यशक्ति का ग्रह है। इसका गोचर महत्वाकांक्षा, प्रतिस्पर्धा और पहल करने की क्षमता को बढ़ाता है। यदि ऊर्जा सही दिशा में न जाए तो यह क्रोध, विवाद या दुर्घटनाओं का कारण भी बन सकता है।"
      : "Mars, the planet of action and vitality, influences courage, ambition, physical energy, and assertiveness. Its transit boosts drive, competitiveness, and initiative—but can also trigger conflicts, anger, or accidents if unmanaged.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "मंगल गोचर का आध्यात्मिक महत्व क्या है?"
      : "What is the spiritual significance of Mangal Gochar?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से मंगल इच्छाशक्ति, कर्म और साहस का प्रतीक है। इसका गोचर अनुशासित ऊर्जा, नेतृत्व, धर्म की रक्षा और सही दिशा में शक्ति के उपयोग का पाठ सिखाता है।"
      : "Spiritually, Mars represents willpower, discipline through action, and transformation via courage. Its transit teaches lessons in controlled aggression, leadership, protection of dharma, and channeling raw energy for higher purpose.",
  breadcrumbNameHi: "मंगल गोचर",
  breadcrumbNameEn: "Mars Transit",
  webPageNameHi: (y) => `मंगल गोचर ${y}`,
  webPageNameEn: (y) => `Mars Transit ${y}`,
  webPageDescHi: (y) => `${y} में मंगल गोचर का ऊर्जा, साहस, प्रतिस्पर्धा, क्रोध और कार्यक्षमता पर प्रभाव`,
  webPageDescEn: "Effects of Mars transit on energy, courage, ambition, competition, aggression, and physical drive.",
};

/* ─────────────────────────── MERCURY ─────────────────────────── */
export const mercuryTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Mercury",
  planetEn: "Mercury",
  planetHi: "बुध",
  slug: "mercury-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-emerald-950/20",
  h1AccentClass: "text-emerald-600",
  h1TaglineHi: "बुद्धि, वाणी और व्यापार",
  h1TaglineEn: "Intellect, Speech & Commerce",
  navColorClass: "text-emerald-700",
  remediesNavHi: "↓ बुध उपाय",
  remediesNavEn: "↓ Budh Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (बुध गोचर) हमारे <strong>बुद्धि, संचार और व्यापारिक निर्णयों</strong> का तेज़ और बौद्धिक चक्र है। <strong>वैदिक ज्योतिष</strong> में बुध ग्रह बुद्धि, वाणी, तर्क, शिक्षा और व्यापार का कारक है। इसका गोचर <strong>{rashiName}</strong> में विचारों की स्पष्टता, सीखने की क्षमता और संवाद की गुणवत्ता को प्रभावित करता है।
        </p>
        <p>
          बुध त्वरित सोच, अनुकूलनशीलता और व्यावहारिक बुद्धि का प्रतीक है। इस गोचर को समझकर आप बेहतर निर्णय ले सकते हैं, संचार में सुधार कर सकते हैं और व्यापार/शिक्षा में सफलता प्राप्त कर सकते हैं—खासकर retrograde के दौरान सावधानी बरतें।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Mercury transit {currentYear}</strong> (Budh Gochar) energizes our <strong>intellect, communication, and commercial decisions</strong>. In <strong>Vedic astrology</strong>, Mercury rules logic, speech, learning, wit, and business acumen. Its movement through <strong>{rashiName}</strong> influences mental sharpness, negotiation skills, and short-term planning.
        </p>
        <p>
          As the planet of adaptability and discernment, Mercury transit boosts curiosity, writing, technology, and trade. Aligning with this cycle enhances clear thinking, effective expression, and success in intellectual or mercantile pursuits—watch for miscommunications during retrograde.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-emerald-400",
  snapshotH2Hi: "वर्तमान बुध स्थिति",
  snapshotH2En: "Current Mercury Position",
  snapshotMotionClass: "text-amber-400",
  remediesH2Hi: "बुध सामंजस्य और उपाय",
  remediesH2En: "Mercury Harmony & Remedies",
  remediesLeftBgClass: "bg-emerald-50",
  remediesLeftBorderClass: "border-emerald-100",
  remediesLeftHeadingColorClass: "text-emerald-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>बुध बीज मंत्र</strong> का जप: <em>&quot;ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः&quot;</em> बुधवार को 108 बार। </>
            : <>Chant <strong>Budh Beej Mantra</strong>: <em>&quot;Om Bram Breem Broum Sah Budhaya Namah&quot;</em> 108 times on Wednesdays.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🪔
        <span>
          {isHi
            ? <> बुधवार को हरी वस्तुएं (मूंग दाल, पालक, हरी सब्जियाँ, किताबें) दान करें। भगवान विष्णु या गणेश की पूजा करें। </>
            : <>Donate green items (moong dal, spinach, green veggies, books) on Wednesdays. Worship Lord Vishnu or Ganesha.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> पन्ना (Emerald) चांदी या सोने में छोटी उंगली में बुधवार को धारण करें (ज्योतिषी से परामर्श लें)। </>
            : <>Wear Emerald (Panna) in silver/gold on the little finger on Wednesday (consult astrologer).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📚
        <span>
          {isHi
            ? <> <strong>सीखना:</strong> नई किताब पढ़ें, कोर्स करें या भाषा सीखें ताकि बुद्धि तेज हो। </>
            : <> <strong>Learning:</strong> Read books, take courses, or learn a new skill/language to sharpen intellect.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💬
        <span>
          {isHi
            ? <> <strong>संचार:</strong> स्पष्ट और ईमानदार बातचीत करें, journaling या public speaking का अभ्यास करें। </>
            : <> <strong>Communication:</strong> Practice clear, honest expression—journal, speak mindfully, or improve public speaking.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🧠
        <span>
          {isHi
            ? <> <strong>मानसिक स्वास्थ्य:</strong> ब्रेन गेम्स खेलें, meditation करें और निर्णय लेने में तर्क का उपयोग करें। </>
            : <> <strong>Mental Agility:</strong> Play brain games, meditate, and use logic in decisions to balance Mercury energy.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Moon", "Mars", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"],
  footerColorClass: "text-emerald-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-emerald-600 text-white hover:bg-slate-950 shadow-emerald-200",
  ctaBtnHi: "अपना बुद्धि और संचार विश्लेषण देखें →",
  ctaBtnEn: "Unlock Your Intellect & Communication Forecast →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में बुध गोचर बुद्धि और संचार को कैसे प्रभावित करता है?`
      : `How does Mercury transit ${y} affect communication and intellect?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "बुध वाणी, तर्क, शिक्षा और व्यापार का ग्रह है। इसका गोचर मानसिक तेज़ी बढ़ाता है, व्यापारिक निर्णयों, लेखन, बातचीत और छोटे यात्राओं को प्रभावित करता है। वक्री अवस्था में गलतफहमियाँ या संचार संबंधी समस्याएँ भी हो सकती हैं।"
      : "Mercury governs speech, logic, learning, and commerce. Its transit sharpens mental agility, influences business decisions, writing, negotiations, and short travels—often causing quick thinking or occasional miscommunications during retrograde.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "बुध गोचर का आध्यात्मिक महत्व क्या है?"
      : "What is the spiritual significance of Budh Gochar?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से बुध विवेक, बुद्धिमत्ता और अनुकूलन क्षमता का प्रतीक है। इसका गोचर स्पष्ट अभिव्यक्ति, नैतिक व्यापार, सीखने की क्षमता और जिज्ञासा के माध्यम से मानसिक विकास को बढ़ावा देता है।"
      : "Spiritually, Mercury represents discernment, wit, and adaptability. Its transit encourages intellectual growth, clear expression, ethical commerce, and learning lessons through communication and curiosity.",
  breadcrumbNameHi: "बुध गोचर",
  breadcrumbNameEn: "Mercury Transit",
  webPageNameHi: (y) => `बुध गोचर ${y}`,
  webPageNameEn: (y) => `Mercury Transit ${y}`,
  webPageDescHi: (y) => `${y} में बुध गोचर का बुद्धि, संचार, व्यापार और दैनिक निर्णयों पर प्रभाव`,
  webPageDescEn: "Effects of Mercury transit on intellect, communication, business decisions, and daily mental clarity.",
};

/* ─────────────────────────── JUPITER ─────────────────────────── */
export const jupiterTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Jupiter",
  planetEn: "Jupiter",
  planetHi: "बृहस्पति",
  slug: "jupiter-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-yellow-950/10",
  h1AccentClass: "text-yellow-600",
  h1TaglineHi: "विकास, ज्ञान और भाग्य",
  h1TaglineEn: "Growth, Wisdom & Fortune",
  navColorClass: "text-yellow-700",
  remediesNavHi: "↓ बृहस्पति उपाय",
  remediesNavEn: "↓ Guru Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (गुरु गोचर) वैदिक ज्योतिष में सबसे शुभ और विस्तारकारी चक्र है। <strong>बृहस्पति</strong> ज्ञान, समृद्धि, धर्म, गुरु और भाग्य का कारक ग्रह है। इसका गोचर <strong>{rashiName}</strong> में शिक्षा, यात्रा, धार्मिक कार्य, वित्तीय लाभ और आध्यात्मिक उन्नति के नए द्वार खोलता है।
        </p>
        <p>
          गुरु को &quot;देवगुरु&quot; कहा जाता है—यह उदारता, नैतिकता और उच्च विचारों की ऊर्जा लाता है। इस गोचर को अपनाकर आप ज्ञान बढ़ा सकते हैं, सकारात्मक निर्णय ले सकते हैं और जीवन में स्थायी समृद्धि प्राप्त कर सकते हैं।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Jupiter transit {currentYear}</strong> (Guru Gochar) is the most benevolent and expansive cycle in Vedic astrology. Jupiter governs wisdom, prosperity, dharma, higher learning, and good fortune. Its movement through <strong>{rashiName}</strong> opens doors to education, travel, spiritual growth, financial gains, and ethical expansion.
        </p>
        <p>
          Known as the &quot;Great Benefic,&quot; Jupiter brings generosity, optimism, and divine grace. Aligning with this transit enhances knowledge, attracts mentors, fosters abundance, and supports long-term growth in all areas of life.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-yellow-400",
  snapshotH2Hi: "वर्तमान बृहस्पति स्थिति",
  snapshotH2En: "Current Jupiter Position",
  snapshotMotionClass: "text-amber-400",
  remediesH2Hi: "बृहस्पति सामंजस्य और उपाय",
  remediesH2En: "Jupiter Harmony & Remedies",
  remediesLeftBgClass: "bg-yellow-50",
  remediesLeftBorderClass: "border-yellow-100",
  remediesLeftHeadingColorClass: "text-yellow-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>गुरु बीज मंत्र</strong> का जप: <em>&quot;ॐ बृं बृहस्पतये नमः&quot;</em> या <em>&quot;ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः&quot;</em> गुरुवार को 108 बार। </>
            : <>Chant <strong>Guru Beej Mantra</strong>: <em>&quot;Om Brim Brihaspataye Namah&quot;</em> or <em>&quot;Om Graam Greem Groum Sah Gurave Namah&quot;</em> 108 times on Thursdays.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💛
        <span>
          {isHi
            ? <> गुरुवार को पीली वस्तुएं (चना दाल, हल्दी, केला, किताबें, पीला कपड़ा) दान करें। भगवान विष्णु या लक्ष्मी की पूजा करें। </>
            : <>Donate yellow items (chana dal, turmeric, banana, books, yellow cloth) on <strong>Thursdays</strong>. Worship Lord Vishnu or Lakshmi.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> पुखराज (Yellow Sapphire) सोने में तर्जनी उंगली में गुरुवार को धारण करें (ज्योतिषी से सलाह लें)। </>
            : <>Wear Yellow Sapphire (Pukhraj) in gold on the index finger on Thursday (consult astrologer).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🎓
        <span>
          {isHi
            ? <> <strong>ज्ञानार्जन:</strong> नया कोर्स, किताब पढ़ें या गुरु/मेंटर से सीखें। </>
            : <> <strong>Learning &amp; Growth:</strong> Pursue higher education, read wisdom books, or seek guidance from mentors.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🤝
        <span>
          {isHi
            ? <> <strong>उदारता:</strong> दूसरों की मदद करें, दान दें और कृतज्ञता व्यक्त करें। </>
            : <> <strong>Generosity:</strong> Practice giving, volunteering, and daily gratitude to attract abundance.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🌟
        <span>
          {isHi
            ? <> <strong>नैतिकता:</strong> सत्य, ईमानदारी और धर्म का पालन करें। </>
            : <> <strong>Ethical Living:</strong> Live with integrity, optimism, and alignment with higher values.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Moon", "Mars", "Mercury", "Venus", "Saturn", "Rahu", "Ketu"],
  footerColorClass: "text-yellow-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-yellow-600 text-white hover:bg-slate-950 shadow-yellow-200",
  ctaBtnHi: "अपना भाग्य और विकास विश्लेषण देखें →",
  ctaBtnEn: "Unlock Your Growth & Fortune Forecast →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में गुरु गोचर वृद्धि और भाग्य को कैसे प्रभावित करता है?`
      : `How does Jupiter transit ${y} influence growth and fortune?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "गुरु (बृहस्पति) विस्तार, ज्ञान और सौभाग्य का ग्रह है। इसका गोचर जीवन में विकास, उच्च शिक्षा, आर्थिक समृद्धि, आध्यात्मिक उन्नति और नए अवसरों को बढ़ावा देता है। यह भाग्य, उदारता और आशीर्वाद का संकेत माना जाता है।"
      : "Jupiter, the planet of expansion and wisdom, brings opportunities for growth, higher learning, financial prosperity, and spiritual development. Its transit often signifies luck, generosity, teaching, and blessings in life.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "गुरु गोचर का आध्यात्मिक अर्थ क्या है?"
      : "What is the spiritual meaning of Guru Gochar?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से गुरु धर्म, ज्ञान और दिव्य कृपा का प्रतीक है। इसका गोचर नैतिक जीवन, ज्ञान की खोज, उदारता और उच्च उद्देश्य तथा गुरुजनों से जुड़ाव को प्रोत्साहित करता है।"
      : "Spiritually, Jupiter represents dharma, knowledge, and divine grace. Its transit encourages ethical living, pursuit of wisdom, generosity, and connection to higher purpose and teachers/gurus.",
  breadcrumbNameHi: "बृहस्पति गोचर",
  breadcrumbNameEn: "Jupiter Transit",
  webPageNameHi: (y) => `बृहस्पति गोचर ${y}`,
  webPageNameEn: (y) => `Jupiter Transit ${y}`,
  webPageDescHi: (y) => `${y} में बृहस्पति गोचर का विस्तार, ज्ञान और भाग्य पर प्रभाव`,
  webPageDescEn: "Effects of Jupiter transit on expansion, wisdom, and fortune.",
};

/* ─────────────────────────── VENUS ─────────────────────────── */
export const venusTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Venus",
  planetEn: "Venus",
  planetHi: "शुक्र",
  slug: "venus-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-pink-950/20",
  h1AccentClass: "text-pink-600",
  h1TaglineHi: "प्रेम, सौंदर्य और समृद्धि",
  h1TaglineEn: "Love, Beauty & Abundance",
  navColorClass: "text-pink-700",
  remediesNavHi: "↓ शुक्र उपाय",
  remediesNavEn: "↓ Venus Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (शुक्र गोचर) हमारे <strong>प्रेम, सौंदर्य और सुख-सुविधा</strong> का मासिक पुनर्संतुलन लाता है। <strong>वैदिक ज्योतिष</strong> में शुक्र को सौंदर्य, रिश्तों और धन-समृद्धि का कारक माना जाता है। इसका गोचर <strong>{rashiName}</strong> में हमारे रिश्तों की गुणवत्ता और आकर्षण की ऊर्जा को प्रभावित करता है।
        </p>
        <p>
          शुक्र जीवन में आनंद, कला, विलासिता और सामंजस्य का प्रतीक है। इस गोचर को समझकर आप अपने रिश्तों को गहरा कर सकते हैं, रचनात्मकता बढ़ा सकते हैं और भौतिक सुखों का बेहतर उपयोग कर सकते हैं।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Venus transit {currentYear}</strong> (Shukra Gochar) recalibrates our <strong>love, beauty, and material pleasures</strong>. In <strong>Vedic astrology</strong>, Venus is the planet of romance, harmony, luxury, and artistic expression. Its passage through <strong>{rashiName}</strong> colors our relationships and sense of abundance.
        </p>
        <p>
          As the significator of joy and connection, Venus transit influences attraction, partnerships, creativity, and financial flow. Aligning with this cycle helps deepen bonds, awaken creativity, and invite more beauty and prosperity into life.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-pink-400",
  snapshotH2Hi: "वर्तमान शुक्र स्थिति",
  snapshotH2En: "Current Venus Position",
  snapshotMotionClass: "",
  remediesH2Hi: "शुक्र सामंजस्य और उपाय",
  remediesH2En: "Venus Harmony & Remedies",
  remediesLeftBgClass: "bg-pink-50",
  remediesLeftBorderClass: "border-pink-100",
  remediesLeftHeadingColorClass: "text-pink-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>शुक्र बीज मंत्र</strong> का जप: <em>&quot;ॐ द्रां द्रीं द्रौं स: शुक्राय नम:&quot;</em> या <em>&quot;ॐ शुं शुक्राय नम:&quot;</em> शुक्रवार को 108 बार। </>
            : <>Chant <strong>Shukra Beej Mantra</strong>: <em>&quot;Om Draam Dreem Droum Sah Shukraya Namah&quot;</em> or <em>&quot;Om Shum Shukraya Namah&quot;</em> 108 times on Fridays.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🤍
        <span>
          {isHi
            ? <> शुक्रवार को सफेद वस्तुएं (चावल, दूध, मिठाई, रेशम) दान करें या <strong>लक्ष्मी पूजा</strong> करें। </>
            : <>Donate white items (rice, milk, sweets, silk) on <strong>Fridays</strong> or perform Lakshmi puja.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> हीरा, ओपल या सफेद पुखराज (6-7 रत्ती) चांदी में शुक्रवार को धारण करें (ज्योतिषी से सलाह लें)। </>
            : <>Wear diamond, opal, or white sapphire in silver on Friday (consult astrologer).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🎨
        <span>
          {isHi
            ? <> <strong>रचनात्मकता बढ़ाएं:</strong> पेंटिंग, म्यूजिक, डांस या घर की सजावट में समय बिताएं। </>
            : <> <strong>Creative Expression:</strong> Engage in art, music, dance, or redecorate your living space.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🕊️
        <span>
          {isHi
            ? <> <strong>रिश्तों में सामंजस्य:</strong> सक्रिय श्रवण, प्रशंसा और कृतज्ञता व्यक्त करें। </>
            : <> <strong>Relationship Harmony:</strong> Practice active listening, appreciation, and gratitude in connections.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🌸
        <span>
          {isHi
            ? <> <strong>सौंदर्य:</strong> खुद की देखभाल, अच्छे कपड़े और सुगंध का उपयोग करें। </>
            : <> <strong>Self-Beauty:</strong> Focus on grooming, wearing pleasant colors, and using natural fragrances.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Saturn", "Rahu", "Ketu"],
  footerColorClass: "text-pink-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-pink-600 text-white hover:bg-slate-950 shadow-pink-200",
  ctaBtnHi: "अपना प्रेम और समृद्धि विश्लेषण देखें →",
  ctaBtnEn: "Unlock Your Love & Abundance Forecast →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में शुक्र गोचर प्रेम और विवाह को कैसे प्रभावित करता है?`
      : `How does Venus transit ${y} influence love and marriage?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "शुक्र रिश्तों, प्रेम और वैवाहिक सुख का मुख्य कारक माना जाता है। इसका गोचर आकर्षण बढ़ाता है, भावनात्मक जुड़ाव को गहरा करता है और नए रिश्तों या वर्तमान संबंधों में सामंजस्य ला सकता है।"
      : "Venus is the primary significator of relationships, romance, and marital harmony. Its transit enhances attraction, fosters deeper emotional bonds, and can trigger new romantic beginnings or strengthen existing partnerships.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "शुक्र गोचर धन, विलासिता और सौंदर्य को कैसे प्रभावित करता है?"
      : "What is the impact of Shukra Gochar on wealth, luxury, and beauty?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "शुक्र भौतिक सुख, कला, सौंदर्य और आर्थिक आनंद का ग्रह है। शुभ शुक्र गोचर विलासिता, रचनात्मक सफलता, आकर्षण और जीवन में समृद्धि के अवसर प्रदान कर सकता है।"
      : "Venus governs material comforts, artistic expression, and financial pleasures. A supportive transit often brings opportunities for luxury, creative success, aesthetic improvements, and overall abundance in life.",
  breadcrumbNameHi: "शुक्र गोचर",
  breadcrumbNameEn: "Venus Transit",
  webPageNameHi: (y) => `शुक्र गोचर ${y}`,
  webPageNameEn: (y) => `Venus Transit ${y}`,
  webPageDescHi: (y) => `${y} में शुक्र गोचर का प्रेम, सौंदर्य और धन पर प्रभाव`,
  webPageDescEn: "Effects of Venus transit on love, beauty, and wealth.",
};

/* ─────────────────────────── SATURN ─────────────────────────── */
export const saturnTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Saturn",
  planetEn: "Saturn",
  planetHi: "शनि",
  slug: "saturn-transit",
  outerBg: "bg-gradient-to-b from-slate-950 to-slate-900/90",
  h1AccentClass: "text-slate-600",
  h1TaglineHi: "कर्म, अनुशासन और सिद्धि",
  h1TaglineEn: "Karma, Discipline & Mastery",
  navColorClass: "text-slate-700",
  remediesNavHi: "↓ शनि उपाय",
  remediesNavEn: "↓ Shani Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (शनि गोचर) <strong>कर्मिक मूल्यांकन और दीर्घकालिक पुनर्संरचना</strong> का गहन चरण है। <strong>वैदिक ज्योतिष</strong> में शनि को न्याय, समय, धैर्य और अनुशासन का ग्रह माना जाता है। इसका धीमा गोचर <strong>{rashiName}</strong> में जीवन की नींव का कठोर परीक्षण करता है और कमजोर क्षेत्रों को मजबूत बनाने का अवसर देता है।
        </p>
        <p>
          शनि को लोग अक्सर डरते हैं, लेकिन यह &quot;महान शिक्षक&quot; है। यह गोचर सजा नहीं, बल्कि <strong>अनुशासन, मेहनत और जिम्मेदारी</strong> के माध्यम से स्थायी सफलता और आध्यात्मिक परिपक्वता प्रदान करता है। इसे अपनाकर आप मजबूत चरित्र और लंबे समय तक टिकने वाली उपलब्धियाँ प्राप्त कर सकते हैं।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Saturn transit {currentYear}</strong> (Shani Gochar) marks a deep phase of <strong>karmic reckoning and long-term restructuring</strong>. In <strong>Vedic astrology</strong>, Saturn governs justice, time, endurance, and discipline. Its slow movement through <strong>{rashiName}</strong> rigorously tests and strengthens the foundations of life.
        </p>
        <p>
          Often misunderstood and feared, Saturn is the true &quot;Great Teacher.&quot; This transit rewards patience, hard work, and responsibility—building maturity, resilience, and lasting achievements rather than offering quick fixes.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-950",
  snapshotH2ColorClass: "text-slate-400",
  snapshotH2Hi: "वर्तमान शनि स्थिति",
  snapshotH2En: "Current Saturn Position",
  snapshotMotionClass: "text-slate-300",
  remediesH2Hi: "शनि सामंजस्य और उपाय",
  remediesH2En: "Saturn Discipline & Remedies",
  remediesLeftBgClass: "bg-slate-100",
  remediesLeftBorderClass: "border-slate-200",
  remediesLeftHeadingColorClass: "text-slate-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>शनि बीज मंत्र</strong> का जप: <em>&quot;ॐ शं शनैश्चराय नमः&quot;</em> या <em>&quot;ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः&quot;</em> शनिवार को 108 बार। </>
            : <>Chant <strong>Shani Beej Mantra</strong>: <em>&quot;Om Sham Shanicharaya Namah&quot;</em> or <em>&quot;Om Praam Preem Praum Sah Shanicharaya Namah&quot;</em> 108 times on Saturdays.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🪔
        <span>
          {isHi
            ? <> शनिवार को तिल के तेल का दीपक जलाएं और पश्चिम दिशा में रखें। काले तिल, काले उड़द, सरसों का तेल या लोहा दान करें। </>
            : <>Light a sesame oil lamp on Saturdays facing west. Donate black sesame seeds, black gram (urad), mustard oil, or iron items.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> नीलम (Blue Sapphire) या अमेथिस्ट शुक्रवार/शनिवार को चांदी में धारण करें (ज्योतिषी से परामर्श लें)। </>
            : <>Wear Blue Sapphire (Neelam) or Amethyst in silver on Saturday (after astrologer consultation).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🛠️
        <span>
          {isHi
            ? <> <strong>अनुशासन:</strong> रोजाना रूटीन बनाएं, समय पर काम पूरा करें और देरी से बचें। </>
            : <> <strong>Discipline:</strong> Build consistent routines, meet deadlines, and embrace structure in daily life.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🤝
        <span>
          {isHi
            ? <> <strong>सेवा:</strong> गरीबों, मजदूरों या बुजुर्गों की मदद करें – सेवा से शनि प्रसन्न होते हैं। </>
            : <> <strong>Service:</strong> Volunteer, help the underprivileged, or support elders—acts of selfless service soften Saturn&apos;s lessons.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🧘
        <span>
          {isHi
            ? <> <strong>धैर्य और ध्यान:</strong> मेडिटेशन, योग या साइलेंस प्रैक्टिस करें ताकि मानसिक मजबूती आए। </>
            : <> <strong>Patience &amp; Stillness:</strong> Practice meditation, yoga, or periods of silence to cultivate inner strength and calm.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Rahu", "Ketu"],
  footerColorClass: "text-slate-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-slate-950 text-white hover:bg-blue-800 shadow-slate-900/30",
  ctaBtnHi: "अपना कर्म और अनुशासन विश्लेषण देखें →",
  ctaBtnEn: "Master Your Karma & Discipline Forecast →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में शनि गोचर करियर और जिम्मेदारियों को कैसे प्रभावित करता है?`
      : `How does Saturn transit ${y} affect career and responsibilities?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "शनि कर्म, अनुशासन और धैर्य का ग्रह है। इसका गोचर करियर में मेहनत, जिम्मेदारियों और लंबे समय की स्थिर सफलता को प्रभावित करता है। यह प्रमोशन, कठिन परिश्रम और जीवन में संरचना बनाने के अवसर दे सकता है।"
      : "Saturn, the planet of karma and discipline, influences long-term career growth, authority, and hard work. Its transit often brings promotions through effort, increased responsibilities, or lessons in patience and structure.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "शनि गोचर का आध्यात्मिक महत्व क्या है?"
      : "What is the spiritual significance of Shani Gochar?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से शनि कर्म, न्याय और परिपक्वता का प्रतीक है। इसका गोचर विनम्रता, धैर्य और लगातार प्रयास का महत्व सिखाता है तथा पुराने कर्मों को संतुलित कर भविष्य की मजबूत नींव तैयार करता है।"
      : "Spiritually, Saturn represents karma, justice, and maturity. Its transit teaches detachment, humility, and the value of consistent effort, helping clear past karmic debts and build a stronger foundation for the future.",
  breadcrumbNameHi: "शनि गोचर",
  breadcrumbNameEn: "Saturn Transit",
  webPageNameHi: (y) => `शनि गोचर ${y}`,
  webPageNameEn: (y) => `Saturn Transit ${y}`,
  webPageDescHi: (y) => `${y} में शनि गोचर का करियर, कर्म, जिम्मेदारियों और जीवन की स्थिरता पर प्रभाव`,
  webPageDescEn: "Effects of Saturn transit on career, karma, discipline, responsibilities, and long-term stability.",
};

/* ─────────────────────────── RAHU ─────────────────────────── */
export const rahuTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Rahu",
  planetEn: "Rahu",
  planetHi: "राहु",
  slug: "rahu-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-indigo-950/30",
  h1AccentClass: "text-indigo-600",
  h1TaglineHi: "महत्वाकांक्षा, भ्रम और कर्म",
  h1TaglineEn: "Ambition, Illusion & Karma",
  navColorClass: "text-indigo-700",
  remediesNavHi: "↓ राहु उपाय",
  remediesNavEn: "↓ Rahu Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (राहु गोचर) <strong>महत्वाकांक्षा, भ्रम और अपरंपरागत सफलता</strong> का तीव्र चक्र है। <strong>वैदिक ज्योतिष</strong> में राहु छाया ग्रह है जो इच्छाओं, माया और विदेशी/आधुनिक प्रभावों का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में अचानक बदलाव, नई महत्वाकांक्षाएँ और कर्मिक तीव्रता लाता है।
        </p>
        <p>
          राहु अक्सर भ्रम पैदा करता है लेकिन साथ ही अभूतपूर्व अवसर भी देता है। यह गोचर आपको <strong>वास्तविकता और माया के बीच भेद करने</strong>, अति-महत्वाकांक्षा से बचने और आध्यात्मिक विकास के लिए प्रेरित करता है। इसे समझकर आप अपनी इच्छाओं को सही दिशा दे सकते हैं।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Rahu transit {currentYear}</strong> (Rahu Gochar) is an intense cycle of <strong>ambition, illusion, and unconventional breakthroughs</strong>. In <strong>Vedic astrology</strong>, Rahu is the shadow planet symbolizing desires, Maya (illusion), foreign influences, and obsessive pursuits. Its movement through <strong>{rashiName}</strong> triggers sudden shifts, innovative opportunities, and karmic acceleration.
        </p>
        <p>
          While Rahu creates confusion and craving, it also offers rapid growth and material success. This transit teaches discernment between truth and deception, detachment from obsessions, and channeling ambition constructively for spiritual evolution.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-indigo-400",
  snapshotH2Hi: "वर्तमान राहु स्थिति",
  snapshotH2En: "Current Rahu Position",
  snapshotMotionClass: "text-amber-400",
  remediesH2Hi: "राहु सामंजस्य और उपाय",
  remediesH2En: "Rahu Balance & Remedies",
  remediesLeftBgClass: "bg-indigo-50",
  remediesLeftBorderClass: "border-indigo-100",
  remediesLeftHeadingColorClass: "text-indigo-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>राहु बीज मंत्र</strong> का जप: <em>&quot;ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः&quot;</em> बुधवार या शनिवार को 108 बार। </>
            : <>Chant <strong>Rahu Beej Mantra</strong>: <em>&quot;Om Bhram Bhreem Bhraum Sah Rahave Namah&quot;</em> 108 times on Wednesday or Saturday.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🪔
        <span>
          {isHi
            ? <> सरसों का तेल, काले तिल या कोयला दान करें। नारियल को बहते पानी में प्रवाहित करें। माँ दुर्गा की पूजा या दुर्गा चालीसा पढ़ें। </>
            : <>Donate mustard oil, black sesame seeds, or coal. Flow a coconut in running water. Worship Goddess Durga or recite Durga Chalisa.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> गोमेद (Hessonite) रत्न चांदी में बुधवार को धारण करें (ज्योतिषी से परामर्श लें)। </>
            : <>Wear Hessonite (Gomed) gemstone in silver on Wednesday (consult astrologer first).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🌍
        <span>
          {isHi
            ? <> <strong>ग्राउंडिंग:</strong> प्रकृति में समय बिताएं, मेडिटेशन करें ताकि भ्रम और अति-महत्वाकांक्षा कम हो। </>
            : <> <strong>Grounding:</strong> Spend time in nature, meditate, or practice mindfulness to counter illusion and over-ambition.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🚀
        <span>
          {isHi
            ? <> <strong>नवाचार:</strong> नई स्किल्स सीखें या unconventional projects पर फोकस करें, लेकिन reality check रखें। </>
            : <> <strong>Innovation:</strong> Pursue tech, foreign, or creative ventures mindfully—avoid shortcuts or deception.</>}
        </span>
      </li>
      <li className="flex gap-3">
        ⚖️
        <span>
          {isHi
            ? <> <strong>संतुलन:</strong> इच्छाओं को नियंत्रित करें, honesty और detachment का अभ्यास करें। </>
            : <> <strong>Discernment:</strong> Practice ethical ambition, avoid obsession, and cultivate detachment from material illusions.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Ketu"],
  footerColorClass: "text-indigo-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-indigo-600 text-white hover:bg-slate-950 shadow-indigo-200",
  ctaBtnHi: "अपना महत्वाकांक्षा और कर्म विश्लेषण देखें →",
  ctaBtnEn: "Unlock Your Ambition & Karma Forecast →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में राहु गोचर महत्वाकांक्षा और अचानक बदलावों को कैसे प्रभावित करता है?`
      : `How does Rahu transit ${y} influence ambition and sudden changes?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "राहु इच्छा, भ्रम और असामान्य महत्वाकांक्षा का छाया ग्रह है। इसका गोचर अचानक अवसर, विदेशी संबंध, तकनीकी प्रगति और अप्रत्याशित बदलाव ला सकता है। यह व्यक्ति को तेज़ी से कर्मिक अनुभवों और नई दिशाओं की ओर धकेलता है।"
      : "Rahu, the shadow planet of desire and illusion, drives intense ambition, unconventional opportunities, and sudden breakthroughs or disruptions. Its transit often brings foreign connections, technological advances, or obsessive pursuits that accelerate karmic lessons.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "राहु गोचर का आध्यात्मिक अर्थ क्या है?"
      : "What is the spiritual meaning of Rahu Gochar?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से राहु अधूरी इच्छाओं, माया और भौतिक आकर्षण का प्रतीक है। इसका गोचर व्यक्ति को सांसारिक अनुभवों की ओर ले जाता है ताकि वह भ्रम और वास्तविकता के बीच अंतर समझ सके तथा आसक्ति पर विजय पाकर आध्यात्मिक विकास कर सके।"
      : "Spiritually, Rahu represents unresolved desires, illusion (Maya), and material cravings from past karma. Its transit pushes one toward worldly experiences to ultimately learn detachment, discernment between real and fake, and spiritual evolution through overcoming obsessions.",
  breadcrumbNameHi: "राहु गोचर",
  breadcrumbNameEn: "Rahu Transit",
  webPageNameHi: (y) => `राहु गोचर ${y}`,
  webPageNameEn: (y) => `Rahu Transit ${y}`,
  webPageDescHi: (y) => `${y} में राहु गोचर का महत्वाकांक्षा, भ्रम, विदेशी संबंधों और अचानक बदलावों पर प्रभाव`,
  webPageDescEn: "Effects of Rahu transit on ambition, illusion, foreign connections, obsessions, and sudden life changes.",
};

/* ─────────────────────────── KETU ─────────────────────────── */
export const ketuTransitHubConfig: GlobalTransitHubConfig = {
  positionKey: "Ketu",
  planetEn: "Ketu",
  planetHi: "केतु",
  slug: "ketu-transit",
  outerBg: "bg-gradient-to-b from-slate-900 to-purple-950/20",
  h1AccentClass: "text-purple-600",
  h1TaglineHi: "आध्यात्मिकता, वैराग्य और मोक्ष",
  h1TaglineEn: "Spirituality, Detachment & Liberation",
  navColorClass: "text-purple-700",
  remediesNavHi: "↓ केतु उपाय",
  remediesNavEn: "↓ Ketu Remedies",
  intro: (planetName, rashiName, isHi, currentYear) =>
    isHi ? (
      <>
        <p>
          <strong>{planetName} गोचर {currentYear}</strong> (केतु गोचर) <strong>आध्यात्मिक जागृति, वैराग्य और पिछले कर्मों का समापन</strong> का रहस्यमय चक्र है। <strong>वैदिक ज्योतिष</strong> में केतु छाया ग्रह है जो मोक्ष, त्याग, अंतर्ज्ञान और भौतिक बंधनों से मुक्ति का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में अचानक आध्यात्मिक अनुभव, पुरानी आदतों का अंत और गहन आत्म-निरीक्षण लाता है।
        </p>
        <p>
          केतु भ्रम और आसक्ति से मुक्त करने वाला ग्रह है। यह गोचर आपको <strong>भौतिक सुखों से अलगाव</strong>, occult ज्ञान और आत्म-मुक्ति की ओर ले जाता है। इसे अपनाकर आप पिछले कर्मों का बोझ कम कर सकते हैं और उच्च चेतना की ओर बढ़ सकते हैं।
        </p>
      </>
    ) : (
      <>
        <p>
          The <strong>Ketu transit {currentYear}</strong> (Ketu Gochar) is a mystical cycle of <strong>spiritual awakening, detachment, and karmic resolution</strong>. In <strong>Vedic astrology</strong>, Ketu is the south node symbolizing liberation (moksha), renunciation, intuition, past-life karma, and dissolution of ego. Its slow passage through <strong>{rashiName}</strong> triggers sudden spiritual insights, letting go of attachments, and deep inner transformation.
        </p>
        <p>
          While often associated with confusion or losses, Ketu ultimately guides toward higher truth, occult wisdom, and freedom from material illusions. Understanding this transit helps embrace detachment, heal karmic patterns, and accelerate soul evolution.
        </p>
      </>
    ),
  snapshotBgClass: "bg-slate-900",
  snapshotH2ColorClass: "text-purple-400",
  snapshotH2Hi: "वर्तमान केतु स्थिति",
  snapshotH2En: "Current Ketu Position",
  snapshotMotionClass: "text-amber-400",
  remediesH2Hi: "केतु सामंजस्य और उपाय",
  remediesH2En: "Ketu Harmony & Remedies",
  remediesLeftBgClass: "bg-purple-50",
  remediesLeftBorderClass: "border-purple-100",
  remediesLeftHeadingColorClass: "text-purple-900",
  remediesVedicItems: (isHi) => (
    <>
      <li className="flex gap-3">
        📿
        <span>
          {isHi
            ? <> <strong>केतु बीज मंत्र</strong> का जप: <em>&quot;ॐ स्रां स्रीं स्रौं सः केतवे नमः&quot;</em> मंगलवार या शनिवार को 108 बार। </>
            : <>Chant <strong>Ketu Beej Mantra</strong>: <em>&quot;Om Straam Streem Straum Sah Ketave Namah&quot;</em> 108 times on Tuesday or Saturday.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🪔
        <span>
          {isHi
            ? <> काले तिल, नारियल, कंबल या सात अनाज दान करें। गणेश जी की पूजा करें या कुत्तों को भोजन दें। </>
            : <>Donate black sesame, coconut, blanket, or seven grains. Worship Lord Ganesha or feed stray dogs.</>}
        </span>
      </li>
      <li className="flex gap-3">
        💎
        <span>
          {isHi
            ? <> लहसुनिया (Cat&apos;s Eye) चांदी में मंगलवार को धारण करें (ज्योतिषी से परामर्श लें)। </>
            : <>Wear Cat&apos;s Eye (Lehsunia) in silver on Tuesday (consult astrologer first).</>}
        </span>
      </li>
    </>
  ),
  remediesModernItems: (isHi) => (
    <>
      <li className="flex gap-3">
        🧘
        <span>
          {isHi
            ? <> <strong>ध्यान:</strong> गहन मेडिटेशन, mindfulness या solitude में समय बिताएं। </>
            : <> <strong>Meditation:</strong> Practice deep meditation, mindfulness, or spend time in solitude for inner clarity.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🌌
        <span>
          {isHi
            ? <> <strong>त्याग:</strong> अनावश्यक सामान, पुरानी आदतें या toxic संबंध छोड़ें। </>
            : <> <strong>Letting Go:</strong> Release unnecessary possessions, old habits, or toxic attachments to create space for growth.</>}
        </span>
      </li>
      <li className="flex gap-3">
        🔮
        <span>
          {isHi
            ? <> <strong>आध्यात्मिकता:</strong> योग, प्रार्थना या spiritual books पढ़ें। </>
            : <> <strong>Spiritual Practice:</strong> Engage in yoga, prayer, or reading spiritual texts to align with higher purpose.</>}
        </span>
      </li>
    </>
  ),
  footerOtherPlanets: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu"],
  footerColorClass: "text-purple-700",
  footerPbBottom: true,
  ctaBtnColorClass: "bg-purple-600 text-white hover:bg-slate-950 shadow-purple-200",
  ctaBtnHi: "अपना आध्यात्मिक विश्लेषण देखें →",
  ctaBtnEn: "Unlock Your Spiritual & Karmic Forecast →",
  faqQ1Name: (y, isHi) =>
    isHi
      ? `${y} में केतु गोचर आध्यात्मिकता और वैराग्य को कैसे प्रभावित करता है?`
      : `How does Ketu transit ${y} affect spirituality and detachment?`,
  faqQ1Answer: (isHi) =>
    isHi
      ? "केतु वैराग्य, पूर्व जन्म के कर्म, आध्यात्मिकता और मोक्ष का ग्रह है। इसका गोचर अचानक आध्यात्मिक जागरण, भौतिक इच्छाओं से दूरी, गहरी अंतर्ज्ञान शक्ति और ऐसे अनुभव ला सकता है जो व्यक्ति को उच्च ज्ञान की ओर ले जाएँ।"
      : "Ketu, the south node, represents detachment, past-life karma, spirituality, and liberation. Its transit often brings sudden spiritual awakenings, detachment from material desires, intuitive insights, or losses that lead to higher wisdom.",
  faqQ2Name: (_y, isHi) =>
    isHi
      ? "केतु गोचर का आध्यात्मिक अर्थ क्या है?"
      : "What is the spiritual meaning of Ketu Gochar?",
  faqQ2Answer: (isHi) =>
    isHi
      ? "आध्यात्मिक रूप से केतु मोक्ष, त्याग और अहंकार के विघटन का प्रतीक है। इसका गोचर आत्मचिंतन, कर्मिक समाधान, गूढ़ ज्ञान और आत्मा की उन्नति के लिए आसक्तियों को छोड़ने की प्रेरणा देता है।"
      : "Spiritually, Ketu signifies moksha (liberation), renunciation, and dissolution of ego. Its transit pushes one toward introspection, karmic resolution, occult knowledge, and letting go of attachments for soul evolution.",
  breadcrumbNameHi: "केतु गोचर",
  breadcrumbNameEn: "Ketu Transit",
  webPageNameHi: (y) => `केतु गोचर ${y}`,
  webPageNameEn: (y) => `Ketu Transit ${y}`,
  webPageDescHi: (y) => `${y} में केतु गोचर का आध्यात्मिकता, वैराग्य और मोक्ष पर प्रभाव`,
  webPageDescEn: "Effects of Ketu transit on spirituality, detachment, and liberation.",
};
