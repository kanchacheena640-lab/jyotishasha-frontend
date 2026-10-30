/**
 * property_current_period -- grounded in modules/focused_reports/prompt_specs.py
 * (TIMING via answer_mode current_period: assess the present first, then
 * compare useful upcoming windows within the horizon; balance natal property and
 * resource factors with current MD/AD and Jupiter/Saturn; explain present
 * support, mixed signals and constraints without substituting for financial or
 * legal checks; remedies=False), property_keys.py (houses 2, 4, 11; 12 months)
 * and property_evidence.py (Jupiter, Saturn).
 */
import type { FocusedReportSeoContent } from "./types";

export const propertyCurrentPeriod: FocusedReportSeoContent = {
  questionKey: "property_current_period",
  searchIntent:
    "Present-moment check: someone with a specific property in view (a flat, plot or shop) asking whether the current period is supportive before they commit. Distinct from property-purchase-timing and property-strongest-period, which both compare windows over five years.",
  seoTitle: {
    en: "Is Now a Good Time to Buy Property? | Jyotishasha",
    hi: "क्या अभी प्रॉपर्टी खरीदना ठीक है? ज्योतिष | ज्योतिष आशा",
  },
  metaDescription: {
    en: "A ₹51 report that reads your present period first: whether current conditions support buying property now, and how they compare with the next 12 months.",
    hi: "₹51 की रिपोर्ट, पहले आपका मौजूदा दौर: क्या अभी की परिस्थितियाँ प्रॉपर्टी खरीदने का साथ देती हैं, और अगले 12 महीनों से उनकी तुलना।",
  },
  h1: {
    en: "Property Readiness Now: Does the Present Period Support Buying?",
    hi: "अभी प्रॉपर्टी की तैयारी: क्या मौजूदा दौर खरीदने का साथ देता है?",
  },
  intro: {
    en: [
      "Sometimes the question is immediate. A flat you like is available, a plot has come up in the right area, the builder wants a booking amount by the end of the month. The long-range question of when to buy has turned into a short one: is this a reasonable time to go ahead?",
      "This report answers that short question first. It reads the 2nd, 4th and 11th houses and their lords, which relate to savings, home and property, and gains, alongside your current Dasha and Jupiter and Saturn. It says whether the present period looks supportive, mixed or constrained, then compares it with the useful windows in the next 12 months. It sits beside, never in place of, your financial and legal checks.",
    ],
    hi: [
      "कभी-कभी सवाल तुरंत का होता है। पसंद का फ़्लैट उपलब्ध है, सही इलाके में प्लॉट आया है, बिल्डर महीने के आखिर तक बुकिंग राशि चाहता है। प्रॉपर्टी कब खरीदें, यह लंबा सवाल एक छोटे सवाल में बदल गया है: क्या आगे बढ़ने का यह ठीक समय है?",
      "यह रिपोर्ट पहले उसी छोटे सवाल का जवाब देती है। यह 2रा, 4था और 11वाँ भाव और उनके स्वामी पढ़ती है, जो बचत, घर व संपत्ति, और लाभ से जुड़े हैं, साथ में आपकी मौजूदा दशा और गुरु व शनि। यह बताती है कि मौजूदा दौर अनुकूल, मिला-जुला या बंधा हुआ दिखता है, फिर अगले 12 महीनों के उपयोगी समयों से उसकी तुलना करती है। यह आपकी वित्तीय और कानूनी जाँच के साथ रहती है, कभी उनकी जगह नहीं लेती।",
    ],
  },
  analyzes: {
    en: [
      "The 2nd, 4th and 11th houses and their lords: savings, home and property, and gains",
      "Your present Mahadasha and Antardasha, read first before anything ahead",
      "Jupiter and Saturn from your Lagna as they stand now and over the next 12 months",
      "Whether present signals are supportive, mixed or constrained, and how later windows compare",
    ],
    hi: [
      "2रा, 4था और 11वाँ भाव और उनके स्वामी: बचत, घर व संपत्ति, और लाभ",
      "आपकी मौजूदा महादशा और अंतर्दशा, आगे की किसी बात से पहले पढ़ी गई",
      "आपके लग्न से गुरु और शनि, अभी की स्थिति में और अगले 12 महीनों में",
      "मौजूदा संकेत अनुकूल, मिले-जुले या बंधे हुए हैं, और बाद के समय उनसे कैसे तुलना करते हैं",
    ],
  },
  readingGuide: {
    heading: { en: "Checks that come before any timing", hi: "समय से पहले आने वाली जाँचें" },
    points: {
      en: [
        "Clear title, approvals and encumbrance records come first; have them verified by a lawyer.",
        "Make sure the EMI fits comfortably within your income, with an emergency reserve left over.",
        "If the present looks mixed, consider a smaller first commitment or more time for due diligence rather than rushing.",
        "A supportive reading is not a reason to skip any of the above. The report never tells you to buy.",
      ],
      hi: [
        "साफ़ मालिकाना हक, मंज़ूरियाँ और भार-मुक्ति के रिकॉर्ड पहले आते हैं; इनकी जाँच किसी वकील से करवाएँ।",
        "पक्का करें कि EMI आपकी आमदनी में आराम से समा जाए, और आपात बचत बची रहे।",
        "अगर मौजूदा दौर मिला-जुला दिखे, तो जल्दबाज़ी के बजाय छोटी पहली प्रतिबद्धता या जाँच के लिए ज़्यादा समय पर विचार करें।",
        "अनुकूल विश्लेषण ऊपर की किसी जाँच को छोड़ने की वजह नहीं है। रिपोर्ट कभी खरीदने को नहीं कहती।",
      ],
    },
  },
  differentiation: {
    en: "Property Purchase Timing and Property Opportunity Windows both compare windows across five years. This report is the near-term check: it reads the present period first, for a decision that is in front of you now, and compares it only with the next 12 months.",
    hi: "'प्रॉपर्टी खरीदने का समय' और 'प्रॉपर्टी के मजबूत समय' दोनों पाँच वर्षों के समयों की तुलना करती हैं। यह रिपोर्ट नज़दीकी जाँच है: यह पहले मौजूदा दौर पढ़ती है, उस फ़ैसले के लिए जो अभी सामने है, और उसकी तुलना केवल अगले 12 महीनों से करती है।",
  },
  internalLinks: [
    { path: "/reports/focused/property-strongest-period", localized: true, label: { en: "Property Opportunity Windows report (₹51)", hi: "प्रॉपर्टी के मजबूत समय रिपोर्ट (₹51)" } },
    { path: "/reports/focused/property-purchase-timing", localized: true, label: { en: "Property Purchase Timing report (₹51)", hi: "प्रॉपर्टी खरीदने का समय रिपोर्ट (₹51)" } },
    { path: "/reports/property_report", localized: false, label: { en: "Property Report (₹51)", hi: "Property रिपोर्ट (₹51, अंग्रेज़ी पेज)" } },
  ],
  benefits: {
    en: [
      "Reads the present period first, for a property decision in front of you now",
      "Says whether current signals are supportive, mixed or constrained",
      "Compares now with the useful windows in the next 12 months",
    ],
    hi: [
      "अभी सामने खड़े प्रॉपर्टी के फ़ैसले के लिए पहले मौजूदा दौर पढ़ती है",
      "बताती है कि मौजूदा संकेत अनुकूल, मिले-जुले या बंधे हुए हैं",
      "अभी की तुलना अगले 12 महीनों के उपयोगी समयों से करती है",
    ],
  },
  sections: {
    whatItTellsYou: {
      en: "This report answers one question, “Is the current period supportive for buying property?”. It assesses the present first, then compares it with useful windows within 12 months.",
      hi: "यह रिपोर्ट एक ही सवाल का जवाब देती है: “क्या अभी का समय प्रॉपर्टी खरीदने के लिए अनुकूल है?” यह पहले वर्तमान का आकलन करती है, फिर 12 महीनों के भीतर उपयोगी समयों से उसकी तुलना करती है।",
    },
    howJyotishApproachesIt: {
      en: "Software first computes your three property and resource houses and their lords, your Dasha periods and Jupiter and Saturn dates. The reading starts from the present and adds no date of its own.",
      hi: "सॉफ़्टवेयर पहले आपके संपत्ति और संसाधन के तीन भाव और उनके स्वामी, दशा की अवधियाँ और गुरु व शनि की तारीखें गणना करता है। विश्लेषण वर्तमान से शुरू होता है और अपनी ओर से कोई तारीख नहीं जोड़ता।",
    },
    whoItIsFor: {
      en: "For a buyer with a specific flat, plot or shop in view who wants a timing read before paying a booking amount.",
      hi: "उस खरीदार के लिए जिसके सामने कोई खास फ़्लैट, प्लॉट या दुकान है और जो बुकिंग राशि देने से पहले समय की राय चाहता है।",
    },
    whatYouReceive: {
      en: "Delivered as a PDF of 400 to 500 words with Direct Answer, Why Your Chart Says This, Strongest Periods, Slower or Watch Period, What You Should Do, and Bottom Line, from your birth details.",
      hi: "400 से 500 शब्दों की PDF के रूप में, जिसमें सीधा जवाब, आपकी Chart ऐसा क्यों कहती है, सबसे मजबूत समय, धीमा या ध्यान रखने वाला समय, आपको क्या करना चाहिए, और सीधी बात शामिल हैं; आपकी जन्म जानकारी से।",
    },
    trustAndLimitations: {
      en: "This is astrology-based guidance, not a certainty or a guaranteed outcome. It is not financial, legal or title advice, and it does not judge any particular property or seller.",
      hi: "यह ज्योतिष-आधारित मार्गदर्शन है, कोई निश्चितता या पक्के नतीजे की गारंटी नहीं। यह वित्तीय, कानूनी या मालिकाना हक की सलाह नहीं है, और किसी खास प्रॉपर्टी या विक्रेता को नहीं आँकती।",
    },
  },
  faqs: [
    {
      question: { en: "Can the report tell me if a specific flat is a good buy?", hi: "क्या रिपोर्ट बता सकती है कि कोई खास फ़्लैट खरीदना ठीक है?" },
      answer: {
        en: "No. It reads your timing, not the property. Price, location and legal title need their own checks.",
        hi: "नहीं। यह आपका समय पढ़ती है, प्रॉपर्टी नहीं। कीमत, जगह और कानूनी हक की अलग जाँच ज़रूरी है।",
      },
    },
    {
      question: { en: "What if the present looks mixed?", hi: "अगर मौजूदा दौर मिला-जुला दिखे तो?" },
      answer: {
        en: "The report explains what is mixed and points to a better window within 12 months, if there is one.",
        hi: "रिपोर्ट बताती है कि क्या मिला-जुला है और अगर कोई बेहतर समय हो तो 12 महीनों के भीतर उसकी ओर इशारा करती है।",
      },
    },
    {
      question: { en: "Is this the same as fixing a muhurat for registration?", hi: "क्या यह रजिस्ट्रेशन का मुहूर्त निकालने जैसा है?" },
      answer: {
        en: "No. It reads the broader period, not an auspicious date or hour for signing.",
        hi: "नहीं। यह बड़ा दौर पढ़ती है, हस्ताक्षर के लिए कोई शुभ तारीख या समय नहीं।",
      },
    },
    {
      question: { en: "I am years away from buying. Which report fits?", hi: "मैं खरीदने से कई साल दूर हूँ। कौन-सी रिपोर्ट ठीक है?" },
      answer: {
        en: "Property Opportunity Windows or Property Purchase Timing, which compare five years of windows.",
        hi: "'प्रॉपर्टी के मजबूत समय' या 'प्रॉपर्टी खरीदने का समय', जो पाँच वर्षों के समयों की तुलना करती हैं।",
      },
    },
  ],
  grounding: { archetype: "TIMING", horizonMonths: 12, houses: [2, 4, 11], transits: ["Jupiter", "Saturn"], remedies: false },
};
