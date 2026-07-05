import React from "react";

export type HousePlanetConfig = {
  planet: string;
  planetEn: string;
  planetHi: string;
  slug: string;
  hubLabelEn: string;
  hubLabelHi: string;
  outerBg: string;
  navHoverClass: string;
  navCurrentClass: string;
  h1SpanColorClass: string;
  h1HiPhrase: string;
  chartBoxClass: string;
  chartH2Hi: string;
  chartParaHi: (houseNum: number) => React.ReactNode;
  chartParaEn: (houseNum: number) => React.ReactNode;
  chartBadgeClass: string;
  chartBadgeHi: string;
  chartBadgeEn: string;
  quoteBorderClass: string;
  sectionHoverClass: string;
  sectionBarClass: string;
  sectionBarGrow: string;
  sectionIconClass: string;
  sectionIcon: React.ReactNode;
  sectionHeadingClass: string;
  strengthsBg: string;
  strengthsIconClass: string;
  strengthsEmoji: string;
  strengthsHeadingHi: string;
  strengthsHeadingEn: string;
  strengthsHeadingClass: string;
  strengthsItemClass: string;
  strengthsBullet: React.ReactNode;
  challengesBg: string;
  challengesIconClass: string;
  challengesEmoji: string;
  challengesHeadingHi: string;
  challengesHeadingEn: string;
  challengesHeadingClass: string;
  challengesItemClass: string;
  challengesBullet: React.ReactNode;
  faqTextHi: (ascTitle: string, houseNum: number) => string;
  faqTextEn: (ascTitle: string, houseNum: number) => string;
  faqA2Hi: string;
  faqA2En: string;
  faqA3Hi: string;
  faqA3En: string;
  faqQ1HiOverride?: (houseNum: number) => string;
  faqQ3HiOverride?: (houseNum: number) => string;
  faqQ3Verb: string;
  ctaRounding: string;
  ctaGradientClass: string;
  ctaH3: (isHi: boolean) => React.ReactNode;
  ctaParaHi: string;
  ctaParaEn: string;
  ctaBtnPrimaryClass: string;
  ctaBtnPrimaryHi: string;
  ctaBtnPrimaryEn: string;
  ctaBtnSecondaryHref: (isHi: boolean) => string;
  ctaBtnSecondaryClass: string;
  ctaBtnSecondaryHi: string;
  ctaBtnSecondaryEn: string;
};

/* ─────────────────────────── SUN ─────────────────────────── */
export const sunConfig: HousePlanetConfig = {
  planet: "sun",
  planetEn: "Sun",
  planetHi: "सूर्य",
  slug: "sun-transit",
  hubLabelEn: "Sun Hub",
  hubLabelHi: "सूर्य हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-amber-950/20",
  navHoverClass: "hover:text-amber-600 transition",
  navCurrentClass: "text-amber-600",
  h1SpanColorClass: "text-amber-600",
  h1HiPhrase: "शक्ति और पहचान",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-amber-50/40 p-8 rounded-[2rem] border border-amber-100 shadow-inner",
  chartH2Hi: "अब चमकने और आगे बढ़ने का दौर",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>सूर्य</strong> आत्मा और राजा का ग्रह है। आपके {n}वें भाव में आने से <strong>आत्मविश्वास, पहचान और नेतृत्व की ताकत</strong> बढ़ जाती है।</>,
  chartParaEn: (n) => <>In Vedic astrology, the Sun is the Soul and the King. Its transit in your {n} house acts as a spotlight, bringing <strong>clarity, leadership opportunities, and a surge in personal vitality</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest border border-amber-200",
  chartBadgeHi: "अब सबकी नज़रों में आने का समय",
  chartBadgeEn: "Status: High Visibility Phase",
  quoteBorderClass: "border-amber-500",
  sectionHoverClass: "hover:border-amber-100",
  sectionBarClass: "bg-amber-500",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-amber-500",
  sectionIcon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="2" x2="12" y2="4"></line>
      <line x1="12" y1="20" x2="12" y2="22"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="2" y1="12" x2="4" y2="12"></line>
      <line x1="20" y1="12" x2="22" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ),
  sectionHeadingClass: "text-amber-950",
  strengthsBg: "bg-amber-50/50 border border-amber-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-600 text-2xl",
  strengthsEmoji: "☀️",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-amber-900",
  strengthsItemClass: "text-amber-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-rose-50/30 border border-rose-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  challengesEmoji: "🛡️",
  challengesHeadingHi: "किन बातों से सावधान रहें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में सूर्य से आत्मविश्वास और पहचान बढ़ती है।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, the Sun in the ${n} house brings illumination, recognition, and authority.`,
  faqA2Hi: "सूर्य का गोचर आत्मविश्वास, नेतृत्व, पहचान, करियर, पिता, प्रतिष्ठा और अधिकार से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Sun transit is associated with confidence, leadership, authority, reputation, career, father and self-expression. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर करियर, आत्मविश्वास, सरकारी कार्य, सामाजिक प्रतिष्ठा, नेतृत्व क्षमता और व्यक्तिगत पहचान को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence career, confidence, authority, public image, leadership and personal identity depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi ? (
    <>बस जीना मत।<br /><span className="text-amber-500">अपनी तकदीर पर राज करो!</span></>
  ) : (
    <>Don&apos;t Just Exist.<br /><span className="text-amber-500">Command Your Destiny.</span></>
  ),
  ctaParaHi: "सूर्य 1 महीना रहता है। बिना अपनी कुंडली में सूर्य की ताकत और दशा के पता चलाए तुम गलत रास्ते पर चल सकते हो। अपना सही सोलर मैप ले लो।",
  ctaParaEn: "The Sun stays for 30 days. Without knowing your natal Surya strength, its lordship, and your Dasha cycle, you might be following a path that doesn't align with your soul. Get your precision solar audit.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-amber-600 text-slate-950 font-black px-12 py-5 rounded-full hover:bg-amber-500 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg",
  ctaBtnPrimaryHi: "मेरा सूर्य रिपोर्ट लो →",
  ctaBtnPrimaryEn: "Get My Solar Prediction →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/10 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना सूर्य अंतर्दृष्टि",
  ctaBtnSecondaryEn: "Daily Solar Insights",
};

/* ─────────────────────────── MOON ─────────────────────────── */
export const moonConfig: HousePlanetConfig = {
  planet: "moon",
  planetEn: "Moon",
  planetHi: "चंद्र",
  slug: "moon-transit",
  hubLabelEn: "Moon Hub",
  hubLabelHi: "चंद्र हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-indigo-950/20",
  navHoverClass: "hover:text-indigo-600 transition",
  navCurrentClass: "text-indigo-600",
  h1SpanColorClass: "text-indigo-600",
  h1HiPhrase: "भावनाएँ और अंतर्ज्ञान",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100 shadow-inner",
  chartH2Hi: "अब मन का मूड बदलने का दौर",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>चंद्र</strong> मन और भावनाओं का ग्रह है। आपके {n}वें भाव में आने से <strong>रोज़ मूड, अंतर्ज्ञान और मन की शांति</strong> बदलती रहती है।</>,
  chartParaEn: (n) => <>In Vedic astrology, the Moon is the planet of mind and emotions. Its transit in your {n} house dictates your <strong>daily mood, instincts, and mental peace</strong> for this cycle.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest",
  chartBadgeHi: "अब अंतर्ज्ञान का अच्छा समय",
  chartBadgeEn: "Status: Intuitive Mood Phase",
  quoteBorderClass: "border-indigo-500",
  sectionHoverClass: "hover:border-indigo-100",
  sectionBarClass: "bg-indigo-600",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-indigo-500",
  sectionIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
      <path d="M12 2a10 10 0 0 1 10 10"></path>
    </svg>
  ),
  sectionHeadingClass: "text-blue-950",
  strengthsBg: "bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl",
  strengthsEmoji: "🌙",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-emerald-900",
  strengthsItemClass: "text-emerald-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  challengesEmoji: "🌊",
  challengesHeadingHi: "किन बातों से सावधान रहें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में चंद्र से रोज़ मूड और भावनाएँ बदलती हैं।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, the Moon in the ${n} house activates daily emotional responses and intuition.`,
  faqA2Hi: "चंद्रमा का गोचर मन, भावनाओं, मानसिक स्थिति, परिवार, आराम और दैनिक अनुभवों से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Moon transit is associated with emotions, mental state, family, comfort, mood and daily experiences. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर मानसिक शांति, परिवार, रिश्ते, भावनात्मक संतुलन, यात्रा, नींद और दैनिक जीवन के अनुभवों को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence emotions, family life, relationships, emotional balance, travel, sleep and everyday experiences depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi ? (
    <>चंद्र रोज़ बदलता है।<br /><span className="text-indigo-400">तुम्हारा प्लान भी बदलो!</span></>
  ) : (
    <>The Moon Changes Daily.<br /><span className="text-indigo-400">Does Your Strategy?</span></>
  ),
  ctaParaHi: "सामान्य चंद्र गोचर मूड बताता है, लेकिन तुम्हारी जन्म राशि और नक्षत्र असली असर तय करते हैं। अपना रोज़ का प्लान उसी से मिलाओ।",
  ctaParaEn: "General Moon transits define the \"vibe,\" but your Natal Moon (Janma Rashi) and Nakshatra define your reality. Align your schedule with your personal lunar clock.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-indigo-600 text-white font-black px-12 py-5 rounded-full hover:bg-indigo-700 transition-all shadow-2xl hover:scale-105 active:scale-95",
  ctaBtnPrimaryHi: "मेरा मूड रिपोर्ट लो →",
  ctaBtnPrimaryEn: "Get My Personal Moon Report →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना मूड अलर्ट",
  ctaBtnSecondaryEn: "Daily Mood Alerts",
};

/* ─────────────────────────── MARS ─────────────────────────── */
export const marsConfig: HousePlanetConfig = {
  planet: "mars",
  planetEn: "Mars",
  planetHi: "मंगल",
  slug: "mars-transit",
  hubLabelEn: "Mars Hub",
  hubLabelHi: "मंगल हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-red-950/20",
  navHoverClass: "hover:text-red-600 transition",
  navCurrentClass: "text-red-600",
  h1SpanColorClass: "text-red-600",
  h1HiPhrase: "ऊर्जा और साहस",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-red-50/30 p-8 rounded-[2rem] border border-red-100 shadow-inner",
  chartH2Hi: "अब जोश का दौर",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>मंगल</strong> योद्धा ग्रह है। आपके {n}वें भाव में आने से <strong>जोश, साहस और काम करने की ताकत</strong> बढ़ जाती है।</>,
  chartParaEn: (n) => <>In Vedic astrology, Mars is the warrior planet. Its transit in your {n} house brings a surge in <strong>willpower, initiative, and the ability to conquer obstacles</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-xs font-black uppercase tracking-widest",
  chartBadgeHi: "अब जोश का समय है",
  chartBadgeEn: "Status: High Energy Phase",
  quoteBorderClass: "border-red-500",
  sectionHoverClass: "hover:border-red-100",
  sectionBarClass: "bg-red-600",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-red-500",
  sectionIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  sectionHeadingClass: "text-blue-950",
  strengthsBg: "bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl",
  strengthsEmoji: "⚔️",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-emerald-900",
  strengthsItemClass: "text-emerald-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  challengesEmoji: "🛡️",
  challengesHeadingHi: "किन बातों से सावधान रहें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में मंगल से जोश और साहस बढ़ता है।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, Mars in the ${n} house brings intense drive and willpower.`,
  faqA2Hi: "मंगल का गोचर ऊर्जा, साहस, प्रतियोगिता, क्रोध, कार्यक्षमता और निर्णय क्षमता से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Mars transit is associated with energy, courage, aggression, competition, ambition and action. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर करियर, आत्मविश्वास, संघर्ष, रिश्ते, स्वास्थ्य, निर्णय क्षमता और जीवन की सक्रियता को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence career, confidence, conflicts, relationships, health, decision making and overall activity depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi ? <>अब जोश को सही दिशा दो!</> : <>Stop Guessing. Take Command of Your Karma.</>,
  ctaParaHi: "मंगल ताकत है, लेकिन बिना अपनी कुंडली और दशा के पता चलाए काम करने से थकान हो सकती है। अपना सही एक्शन प्लान ले लो।",
  ctaParaEn: "Mars can be a weapon or a tool. Without knowing your natal Mangal strength and current Dasha, action can lead to burnout. Get your precision action map.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-red-600 text-white font-black px-12 py-5 rounded-full hover:bg-red-700 transition-all shadow-2xl hover:scale-105 active:scale-95",
  ctaBtnPrimaryHi: "मेरा एक्शन रिपोर्ट लो →",
  ctaBtnPrimaryEn: "Get My Action Report →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना ऊर्जा अलर्ट",
  ctaBtnSecondaryEn: "Daily Energy Alerts",
};

/* ─────────────────────────── MERCURY ─────────────────────────── */
export const mercuryConfig: HousePlanetConfig = {
  planet: "mercury",
  planetEn: "Mercury",
  planetHi: "बुध",
  slug: "mercury-transit",
  hubLabelEn: "Mercury Hub",
  hubLabelHi: "बुध हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-emerald-950/20",
  navHoverClass: "hover:text-emerald-600 transition",
  navCurrentClass: "text-emerald-600",
  h1SpanColorClass: "text-emerald-600",
  h1HiPhrase: "बुद्धि और संचार",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 shadow-inner",
  chartH2Hi: "अब दिमाग तेज होने का दौर",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>बुध</strong> सबसे तेज़ ग्रह है। आपके {n}वें भाव में आने से <strong>दिमाग तेज चलता है, बातचीत अच्छी होती है और व्यापार में समझदारी बढ़ती है</strong>।</>,
  chartParaEn: (n) => <>In Vedic astrology, Mercury is the fastest planet. Its transit in your {n} house brings <strong>sharp thinking, better communication, and smart business decisions</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest",
  chartBadgeHi: "अब प्लानिंग का अच्छा समय",
  chartBadgeEn: "Status: Sharp Mind Phase",
  quoteBorderClass: "border-emerald-500",
  sectionHoverClass: "hover:border-emerald-100",
  sectionBarClass: "bg-emerald-600",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-emerald-500",
  sectionIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  ),
  sectionHeadingClass: "text-blue-950",
  strengthsBg: "bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl",
  strengthsEmoji: "📈",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-emerald-900",
  strengthsItemClass: "text-emerald-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  challengesEmoji: "🧠",
  challengesHeadingHi: "किन बातों से सावधान रहें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में बुध से दिमाग तेज होता है और बातचीत अच्छी चलती है।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, Mercury in the ${n} house brings sharp thinking and better communication.`,
  faqA2Hi: "बुध का गोचर बुद्धि, संचार, व्यापार, विश्लेषण क्षमता, सीखने और निर्णय लेने की प्रक्रिया से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Mercury transit is associated with communication, intelligence, learning, business, analysis and decision-making. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर शिक्षा, व्यापार, बातचीत, मानसिक स्थिति, यात्रा, नेटवर्किंग और पेशेवर निर्णयों को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence education, communication, business, networking, travel, mental activity and professional decisions depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => (
    <>
      {isHi ? <>अब दिमाग की भटकन बंद करो!</> : <>Stop the Mental Noise.</>}
      <br />
      <span className="text-emerald-400">
        {isHi ? "अपना करियर का रास्ता साफ करो।" : "Clarify Your Professional Path."}
      </span>
    </>
  ),
  ctaParaHi: "बुध तेज़ दिमाग देता है, लेकिन बिना अपनी कुंडली और दशा के पता चलाए काम करने से गड़बड़ हो सकती है। अपना सही प्लानिंग मैप ले लो।",
  ctaParaEn: "Mercury can create genius or confusion. Without analyzing your natal Budh placement and current Dasha, you might miss the timing for that big deal or creative breakthrough.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-emerald-600 text-white font-black px-12 py-5 rounded-full hover:bg-emerald-700 transition-all shadow-2xl hover:scale-105 active:scale-95",
  ctaBtnPrimaryHi: "मेरा प्लानिंग रिपोर्ट लो →",
  ctaBtnPrimaryEn: "Get My Precision Logic Report →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना संचार टिप्स",
  ctaBtnSecondaryEn: "Daily Communication Tips",
};

/* ─────────────────────────── JUPITER ─────────────────────────── */
export const jupiterConfig: HousePlanetConfig = {
  planet: "jupiter",
  planetEn: "Jupiter",
  planetHi: "गुरु",
  slug: "jupiter-transit",
  hubLabelEn: "Jupiter Hub",
  hubLabelHi: "बृहस्पति हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-amber-950/20",
  navHoverClass: "hover:text-amber-600 transition",
  navCurrentClass: "text-amber-600",
  h1SpanColorClass: "text-amber-600",
  h1HiPhrase: "भाग्य और विकास",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100 shadow-inner",
  chartH2Hi: "भाग्य का दौर शुरू",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>बृहस्पति (गुरु)</strong> सबसे बड़ा शुभ ग्रह हैं। आपके {n}वें भाव में आने से <strong>पैसा, ज्ञान और खुशहाली</strong> का नया दौर शुरू होता है।</>,
  chartParaEn: (n) => <>In Vedic astrology, <strong>Jupiter (Guru)</strong> is the Great Benefic. Its transit in your {n} house opens doors to <strong>expansion, wisdom, and long-term fortune</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest",
  chartBadgeHi: "अब भाग्य का समय है",
  chartBadgeEn: "Status: Fortune Rising Phase",
  quoteBorderClass: "border-amber-500",
  sectionHoverClass: "hover:border-amber-100",
  sectionBarClass: "bg-amber-500",
  sectionBarGrow: "group-hover:h-10",
  sectionIconClass: "text-amber-500",
  sectionIcon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  sectionHeadingClass: "text-blue-950",
  strengthsBg: "bg-emerald-50/40 border border-emerald-100 rounded-[2.5rem] p-10",
  strengthsIconClass: "w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-3xl",
  strengthsEmoji: "🌿",
  strengthsHeadingHi: "वृद्धि उत्प्रेरक",
  strengthsHeadingEn: "Growth Catalysts",
  strengthsHeadingClass: "text-emerald-900",
  strengthsItemClass: "text-emerald-800/80 font-bold leading-relaxed flex gap-3",
  strengthsBullet: <span className="text-emerald-400">✦</span>,
  challengesBg: "bg-rose-50/40 border border-rose-100 rounded-[2.5rem] p-10",
  challengesIconClass: "w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-3xl",
  challengesEmoji: "⚖️",
  challengesHeadingHi: "ज्ञान परीक्षा",
  challengesHeadingEn: "Wisdom Tests",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-bold leading-relaxed flex gap-3",
  challengesBullet: <span className="text-rose-400">✦</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n} भाव में बृहस्पति ज्ञान और वृद्धि देता है।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, Jupiter in the ${n} house brings expansion and wisdom.`,
  faqQ1HiOverride: (n) => `${n} भाव में बृहस्पति का प्रभाव क्या है?`,
  faqQ3HiOverride: (n) => `${n}वें भाव में बृहस्पति से किन क्षेत्रों पर असर पड़ता है?`,
  faqA2Hi: "बृहस्पति का गोचर ज्ञान, विस्तार, अवसर और आध्यात्मिक विकास से जुड़ा माना जाता है। इसका प्रभाव भाव और कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Jupiter transit is associated with growth, wisdom, opportunities and expansion. Its results depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर करियर, शिक्षा, धन, संबंध, आध्यात्मिकता और जीवन के महत्वपूर्ण निर्णयों को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence career, learning, finances, relationships, spirituality and major life decisions depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi ? (
    <>समय ही सब कुछ है। <br /><span className="text-amber-400">अपना भाग्य खोलें।</span></>
  ) : (
    <>Timing is Everything. <br /><span className="text-amber-400">Unlock Your Fortune.</span></>
  ),
  ctaParaHi: "सामान्य गोचर नक्शा देते हैं, लेकिन आपकी महादशा तय करती है कि खजाना आपका है या नहीं। अपने विकास का सटीक समय-तालिका प्राप्त करें।",
  ctaParaEn: "General transits provide the map, but your natal Mahadasha determines if the treasure is yours. Get a precise timeline of your growth.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-amber-500 text-slate-950 font-black px-12 py-5 rounded-full hover:bg-amber-400 transition-all shadow-2xl hover:scale-105 active:scale-95",
  ctaBtnPrimaryHi: "मेरा भाग्य रिपोर्ट प्राप्त करें →",
  ctaBtnPrimaryEn: "Get My Fortune Report →",
  ctaBtnSecondaryHref: (isHi) => `/${isHi ? "hi/" : ""}astrology-methodology`,
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/10 transition-all border border-white/10",
  ctaBtnSecondaryHi: "हमारी गणना विधि",
  ctaBtnSecondaryEn: "Our Calculation Logic",
};

/* ─────────────────────────── VENUS ─────────────────────────── */
export const venusConfig: HousePlanetConfig = {
  planet: "venus",
  planetEn: "Venus",
  planetHi: "शुक्र",
  slug: "venus-transit",
  hubLabelEn: "Venus Hub",
  hubLabelHi: "शुक्र हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-rose-950/20",
  navHoverClass: "hover:text-rose-600 transition",
  navCurrentClass: "text-rose-600",
  h1SpanColorClass: "text-rose-600",
  h1HiPhrase: "प्रेम और समृद्धि",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-rose-50/40 p-8 rounded-[2rem] border border-rose-100 shadow-inner",
  chartH2Hi: "अब प्यार और सुख का दौर",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>शुक्र</strong> सौंदर्य और सुख का ग्रह है। आपके {n}वें भाव में आने से <strong>प्यार, रिश्ते और ऐशो-आराम</strong> बढ़ जाता है।</>,
  chartParaEn: (n) => <>In Vedic astrology, Venus is the planet of pleasure and prosperity. Its transit in your {n} house acts as a magnet for <strong>attraction, creative flow, and material comfort</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-xs font-black uppercase tracking-widest border border-rose-200",
  chartBadgeHi: "अब खुशहाली का अच्छा समय",
  chartBadgeEn: "Status: Abundance Phase",
  quoteBorderClass: "border-rose-400",
  sectionHoverClass: "hover:border-rose-100",
  sectionBarClass: "bg-rose-400",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-rose-500",
  sectionIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  sectionHeadingClass: "text-rose-950",
  strengthsBg: "bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  strengthsEmoji: "💎",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-rose-900",
  strengthsItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-amber-50/30 border border-amber-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-600 text-2xl",
  challengesEmoji: "☁️",
  challengesHeadingHi: "किन बातों से सावधान रहें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-amber-900",
  challengesItemClass: "text-amber-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में शुक्र से प्यार और सुख बढ़ता है।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, Venus in the ${n} house brings harmony and material comfort.`,
  faqA2Hi: "शुक्र का गोचर प्रेम, सौंदर्य, रिश्ते, विवाह, विलासिता, कला और भौतिक सुखों से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Venus transit is associated with love, beauty, relationships, marriage, luxury, creativity and material comforts. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर प्रेम संबंध, विवाह, सामाजिक जीवन, कला, धन, आकर्षण और भावनात्मक संतुलन को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence relationships, marriage, finances, social life, attraction, creativity and emotional harmony depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi ? (
    <>तुम्हें सबसे अच्छा मिलना चाहिए।<br /><span className="text-rose-400">दिल और दौलत को जोड़ो!</span></>
  ) : (
    <>Deserve the Best.<br /><span className="text-rose-400">Align Your Heart &amp; Wealth.</span></>
  ),
  ctaParaHi: "शुक्र जो छूता है उसे सुंदर बना देता है। लेकिन बिना अपनी कुंडली में शुक्र की ताकत और दशा के पता चलाए तुम कम में संतोष कर सकते हो। अपना सही प्रेम और धन मैप ले लो।",
  ctaParaEn: "Venus transits determine the quality of your experiences. Without knowing your natal Shukra strength, its lordship, and your Mahadasha cycle, you might settle for less than your soul deserves. Get your precision love & wealth audit.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-rose-600 text-white font-black px-12 py-5 rounded-full hover:bg-rose-500 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg",
  ctaBtnPrimaryHi: "मेरा प्रेम और धन रिपोर्ट लो →",
  ctaBtnPrimaryEn: "Get My Relationship & Wealth Report →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/10 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना सौंदर्य और सुख टिप्स",
  ctaBtnSecondaryEn: "Daily Beauty & Bliss Tips",
};

/* ─────────────────────────── SATURN ─────────────────────────── */
export const saturnConfig: HousePlanetConfig = {
  planet: "saturn",
  planetEn: "Saturn",
  planetHi: "शनि",
  slug: "saturn-transit",
  hubLabelEn: "Saturn Hub",
  hubLabelHi: "शनि हब",
  outerBg: "bg-gradient-to-b from-slate-950 to-slate-900",
  navHoverClass: "hover:text-slate-600 transition",
  navCurrentClass: "text-slate-600",
  h1SpanColorClass: "text-slate-600",
  h1HiPhrase: "कर्म और अनुशासन",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-200 shadow-inner",
  chartH2Hi: "अब नींव मज़बूत करने का समय",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>शनि</strong> कर्म का मालिक है। आपके {n}वें भाव में आने से <strong>मेहनत, जिम्मेदारी और लंबे समय की सफलता</strong> का दौर शुरू होता है।</>,
  chartParaEn: (n) => <>In Vedic astrology, Saturn is the Lord of Karma. Its transit in your {n} house initiates a <strong>cycle of discipline, heavy responsibility, and permanent foundations</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-full text-xs font-black uppercase tracking-widest border border-slate-300",
  chartBadgeHi: "अब मेहनत का फल मिलने का दौर",
  chartBadgeEn: "Status: Mastery Phase",
  quoteBorderClass: "border-slate-900",
  sectionHoverClass: "hover:border-slate-300",
  sectionBarClass: "bg-slate-900",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-slate-900",
  sectionIcon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  sectionHeadingClass: "text-slate-900",
  strengthsBg: "bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl",
  strengthsEmoji: "🏛️",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-emerald-900",
  strengthsItemClass: "text-emerald-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  challengesEmoji: "⚖️",
  challengesHeadingHi: "किन बातों से सावधान रहें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में शनि से मेहनत और जिम्मेदारी बढ़ती है।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, Saturn in the ${n} house brings discipline and long-term restructuring.`,
  faqA2Hi: "शनि का गोचर कर्म, अनुशासन, जिम्मेदारी, देरी, संघर्ष, स्थिरता और जीवन के वास्तविक परीक्षणों से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Saturn transit is associated with karma, discipline, responsibility, delays, struggles, stability and life lessons. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर करियर, जिम्मेदारियों, मानसिक दबाव, रिश्तों, मेहनत, धैर्य और जीवन की स्थिरता को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence career, responsibilities, mental pressure, relationships, hard work, patience and long-term stability depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-slate-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi ? (
    <>कर्म मोल-भाव नहीं करता।<br /><span className="text-slate-400">अपनी नींव मज़बूत करो!</span></>
  ) : (
    <>Karma Doesn&apos;t Negotiate.<br /><span className="text-slate-400">Master Your Foundations.</span></>
  ),
  ctaParaHi: "शनि 2.5 साल रुकता है। बिना अपनी कुंडली में शनि की ताकत, दृष्टि और दशा के पता चलाए मेहनत बेकार जा सकती है। अपना लंबा प्लान ले लो।",
  ctaParaEn: "Saturn stays for 2.5 years. Without knowing your natal Shani strength, its aspects, and your Mahadasha cycle, you might be fighting a battle you aren't meant to win yet. Get your long-term mastery audit.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-white text-slate-950 font-black px-12 py-5 rounded-full hover:bg-slate-200 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg",
  ctaBtnPrimaryHi: "मेरा कर्म ऑडिट रिपोर्ट लो →",
  ctaBtnPrimaryEn: "Get My Karmic Audit Report →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/10 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना शनि उपाय",
  ctaBtnSecondaryEn: "Daily Shani Remedies",
};

/* ─────────────────────────── RAHU ─────────────────────────── */
export const rahuConfig: HousePlanetConfig = {
  planet: "rahu",
  planetEn: "Rahu",
  planetHi: "राहु",
  slug: "rahu-transit",
  hubLabelEn: "Rahu Hub",
  hubLabelHi: "राहु हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-indigo-950/40",
  navHoverClass: "hover:text-indigo-600 transition",
  navCurrentClass: "text-indigo-600",
  h1SpanColorClass: "text-indigo-600",
  h1HiPhrase: "महत्वाकांक्षा और कर्म",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-indigo-50/30 p-8 rounded-[2rem] border border-indigo-100 shadow-inner",
  chartH2Hi: "अब कर्म का नया दौर",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>राहु</strong> इच्छाओं और अचानक बदलाव का ग्रह है। आपके {n}वें भाव में आने से <strong>महत्वाकांक्षा बढ़ती है और नए अवसर आते हैं</strong>। लेकिन सावधानी बरतनी पड़ती है।</>,
  chartParaEn: (n) => <>In Vedic astrology, Rahu is the planet of desires and sudden shifts. Its transit in your {n} house brings <strong>magnetic pull toward expansion, obsession, and unconventional breakthroughs</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest",
  chartBadgeHi: "अब बड़ा बदलाव का समय",
  chartBadgeEn: "Status: Intensive Change Phase",
  quoteBorderClass: "border-indigo-500",
  sectionHoverClass: "hover:border-indigo-100",
  sectionBarClass: "bg-indigo-600",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-indigo-500",
  sectionIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  sectionHeadingClass: "text-indigo-950",
  strengthsBg: "bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl",
  strengthsEmoji: "🚀",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-emerald-900",
  strengthsItemClass: "text-emerald-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  challengesEmoji: "👁️",
  challengesHeadingHi: "किन बातों से सावधान रहें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में राहु से अचानक बदलाव और महत्वाकांक्षा बढ़ती है।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, Rahu in the ${n} house amplifies desires and brings sudden karmic shifts.`,
  faqA2Hi: "राहु का गोचर महत्वाकांक्षा, अचानक बदलाव, भ्रम, विदेशी संबंध, तकनीक, भौतिक इच्छाओं और असामान्य अनुभवों से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Rahu transit is associated with ambition, sudden changes, illusion, foreign connections, technology, material desires and unconventional experiences. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर करियर, मानसिक स्थिति, विदेशी अवसर, सामाजिक छवि, भ्रम, महत्वाकांक्षा और अप्रत्याशित घटनाओं को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence career, mental state, foreign opportunities, social image, ambitions, confusion and unexpected events depending on the activated house.",
  faqQ3Verb: "activated",
  ctaRounding: "rounded-[3.5rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/30 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi ? (
    <>अवसर है या धोखा?<br /><span className="text-indigo-400">राहु का खेल समझो!</span></>
  ) : (
    <>Is it Opportunity or Mirage?<br /><span className="text-indigo-400">Decode Rahu&apos;s Agenda.</span></>
  ),
  ctaParaHi: "राहु जो भी छूता है उसे बड़ा कर देता है। लेकिन बिना अपनी कुंडली और दशा के पता चलाए ये \"अवसर\" कर्म के जाल भी हो सकते हैं। अपना सही मैप ले लो।",
  ctaParaEn: "Rahu amplifies whatever it touches. Without knowing your natal Rahu strength and dispositor dignity, these \"opportunities\" could be karmic traps. Get your precision material map.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-indigo-600 text-white font-black px-12 py-5 rounded-full hover:bg-indigo-700 transition-all shadow-2xl hover:scale-105 active:scale-95",
  ctaBtnPrimaryHi: "मेरा राहु रिपोर्ट लो →",
  ctaBtnPrimaryEn: "Get My Rahu Reality Report →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना महत्वाकांक्षा अलर्ट",
  ctaBtnSecondaryEn: "Daily Manifestation Alerts",
};

/* ─────────────────────────── KETU ─────────────────────────── */
export const ketuConfig: HousePlanetConfig = {
  planet: "ketu",
  planetEn: "Ketu",
  planetHi: "केतु",
  slug: "ketu-transit",
  hubLabelEn: "Ketu Hub",
  hubLabelHi: "केतु हब",
  outerBg: "bg-gradient-to-b from-slate-900 to-gray-950",
  navHoverClass: "hover:text-blue-600 transition",
  navCurrentClass: "text-blue-600",
  h1SpanColorClass: "text-blue-600",
  h1HiPhrase: "वैराग्य और आध्यात्मिकता",
  chartBoxClass: "my-16 flex flex-col md:flex-row items-center gap-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-100",
  chartH2Hi: "अब वैराग्य का समय",
  chartParaHi: (n) => <>वैदिक ज्योतिष में <strong>केतु</strong> वैराग्य और पिछले कर्मों का ग्रह है। आपके {n}वें भाव में आने से <strong>पुरानी चीजें छूटती हैं और आध्यात्मिक समझ बढ़ती है</strong>।</>,
  chartParaEn: (n) => <>In Vedic astrology, Ketu is the planet of detachment and past karma. Its transit in your {n} house brings <strong>release of old patterns and deeper spiritual insight</strong>.</>,
  chartBadgeClass: "inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest",
  chartBadgeHi: "अब अच्छा समय है",
  chartBadgeEn: "Status: Karmic Release Phase",
  quoteBorderClass: "border-blue-500",
  sectionHoverClass: "hover:border-blue-100",
  sectionBarClass: "bg-blue-600",
  sectionBarGrow: "group-hover:h-8",
  sectionIconClass: "text-blue-500",
  sectionIcon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  sectionHeadingClass: "text-blue-950",
  strengthsBg: "bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10",
  strengthsIconClass: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl",
  strengthsEmoji: "✨",
  strengthsHeadingHi: "क्या अच्छा होगा",
  strengthsHeadingEn: "What Will Be Good",
  strengthsHeadingClass: "text-emerald-900",
  strengthsItemClass: "text-emerald-800/80 font-medium leading-relaxed flex gap-2",
  strengthsBullet: <span>•</span>,
  challengesBg: "bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10",
  challengesIconClass: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl",
  challengesEmoji: "🚩",
  challengesHeadingHi: "ध्यान रखने वाली बातें",
  challengesHeadingEn: "Things To Be Careful About",
  challengesHeadingClass: "text-rose-900",
  challengesItemClass: "text-rose-800/80 font-medium leading-relaxed flex gap-2",
  challengesBullet: <span>•</span>,
  faqTextHi: (ascTitle, n) => `${ascTitle} लग्न के लिए ${n}वें भाव में केतु से वैराग्य और आध्यात्मिक बदलाव आते हैं।`,
  faqTextEn: (ascTitle, n) => `For ${ascTitle} ascendant, Ketu in the ${n} house brings karmic detachment and inner growth.`,
  faqA2Hi: "केतु का गोचर वैराग्य, आध्यात्मिकता, अलगाव और आंतरिक परिवर्तन से जुड़ा माना जाता है। इसका प्रभाव भाव और जन्म कुंडली की स्थिति पर निर्भर करता है।",
  faqA2En: "Ketu transit is associated with detachment, spirituality, inner transformation and karmic experiences. Its effects depend on house placement and natal chart strength.",
  faqA3Hi: "यह गोचर मानसिक स्थिति, रिश्ते, करियर, आध्यात्मिक सोच, अचानक परिवर्तन और आंतरिक विकास को प्रभावित कर सकता है।",
  faqA3En: "This transit may influence mental state, relationships, career, spirituality, sudden changes and inner growth depending on the activated house.",
  faqQ3Verb: "influenced",
  ctaRounding: "rounded-[3rem]",
  ctaGradientClass: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-50",
  ctaH3: (isHi) => isHi
    ? <>केतु का असर आपकी कुंडली में कैसा होगा?</>
    : <>How will Ketu manifest in Your Chart?</>,
  ctaParaHi: "केतु का गोचर बहुत व्यक्तिगत होता है। आपकी महादशा और जन्म कुंडली के हिसाब से ये प्रभाव आध्यात्मिक आनंद से लेकर गहरे भ्रम तक हो सकते हैं।",
  ctaParaEn: "Ketu transits are highly individual. Depending on your Mahadasha and natal placements, these effects can range from spiritual bliss to deep confusion.",
  ctaBtnPrimaryClass: "w-full md:w-auto bg-blue-600 text-white font-black px-12 py-5 rounded-full hover:bg-blue-700 transition-all shadow-2xl hover:scale-105 active:scale-95",
  ctaBtnPrimaryHi: "अपना कर्म नक्शा खोलें →",
  ctaBtnPrimaryEn: "Unlock Your Karma Map →",
  ctaBtnSecondaryHref: () => "/app-download",
  ctaBtnSecondaryClass: "w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-black px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10",
  ctaBtnSecondaryHi: "रोज़ाना गोचर अलर्ट पाएँ",
  ctaBtnSecondaryEn: "Get Daily Transit Alerts",
};
