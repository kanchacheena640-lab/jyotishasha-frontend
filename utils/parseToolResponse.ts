export type ParsedResult = {
  title: string;
  subtitle?: string;
  description?: string;
  summary?: string;
  toolId?: string;
};

export async function parseToolResponse(data: any, toolId: string, lang: string = 'en'): Promise<ParsedResult> {
  const { name, rashi, lagna_sign } = data;
  const isHi = lang === 'hi';

  switch (toolId) {
    case 'rashi-finder':
      return {
        title: isHi ? `आपकी चंद्र राशि ${rashi} है` : `Your Moon Sign is ${rashi}`,
        summary: isHi 
          ? `प्रिय ${name}, आपकी चंद्र राशि ${rashi} है। यह आपके भावनात्मक स्वभाव और जन्मजात प्रतिक्रियाओं को परिभाषित करती है।`
          : `Dear ${name}, your Moon Sign is ${rashi}. This defines your emotional nature and instinctive reactions.`,
        toolId,
      };

    case 'lagna-finder':
      return {
        title: isHi ? `आपका लग्न ${lagna_sign} है` : `Your Ascendant (Lagna) is ${lagna_sign}`,
        summary: isHi
          ? `${name}, आपका लग्न ${lagna_sign} है। यह आपके बाहरी व्यक्तित्व और दुनिया आपको कैसे देखती है, इसे नियंत्रित करता है।`
          : `${name}, your Lagna is ${lagna_sign}. This governs your outer personality and how the world sees you.`,
        toolId,
      };

    case 'planet-overview':
      return {
        title: isHi ? 'ग्रह परिचय रिपोर्ट' : 'Planet Overview Report',
        summary: isHi
          ? 'अपनी कुंडली में प्रत्येक ग्रह के गहरे प्रभाव, गरिमा, दृष्टि और भाव के प्रभाव का विश्लेषण करें।'
          : 'Explore the deeper influence of each planet in your kundali, including dignity, aspects, and house impact.',
        toolId,
      };

    case 'kaalsarp-dosh':
      return {
        title: isHi ? "कालसर्प दोष रिपोर्ट" : "Kaalsarp Dosh Report",
        subtitle: isHi ? "राहु-केतु संरेखण की जाँच करें" : "Check for Rahu–Ketu alignment",
        summary: data.kaalsarp_dosh?.description || (isHi ? 'आपकी कुंडली में राहु-केतु की स्थिति का विश्लेषण।' : 'Analysis of Rahu-Ketu placement in your chart.'),
        toolId,
      };

    case 'grah-dasha-finder':
      return {
        title: isHi ? `वर्तमान महादशा और अंतर्दशा अंतर्दृष्टि` : `Current Mahadasha & Antardasha Insight`,
        subtitle: isHi ? `आपकी ग्रह दशाओं के आधार पर` : `Based on your planetary periods`,
        summary: data.grah_dasha_text || (isHi ? 'महादशा-अंतर्दशा विवरण उपलब्ध नहीं है।' : 'Mahadasha–Antardasha summary is not available.'),
        toolId,
      };
    
    case 'mangal-dosh':
      return {
        title: isHi ? "मंगल दोष रिपोर्ट" : "Mangal Dosh Report",
        subtitle: isHi ? "जानें कि क्या आप मंगल दोष से प्रभावित हैं।" : "Find out if you're affected by Mangal Dosha.",
        summary: data.manglik_dosh?.general_explanation || '',
        toolId,
      };

    case 'sadhesati-calculator':
      return {
        title: isHi ? "साढ़े साती रिपोर्ट" : "Sade Sati Report",
        summary: data.sade_sati?.description || (isHi ? 'शनि के गोचर का आपके जीवन पर प्रभाव।' : 'Impact of Saturn’s transit on your life.'),
        toolId,
      };

    case 'parashari-rajyog':
      return {
        title: data.parashari_rajyog?.heading?.[lang] || (isHi ? 'पाराशरी राजयोग' : 'Parashari Rajyog'),
        summary: data.parashari_rajyog?.description?.[lang] || '',
        toolId,
      };

    case 'neechbhang-rajyog':
      return {
        title: data.neechbhang_rajyog?.heading?.[lang] || (isHi ? 'नीचभंग राजयोग' : 'Neechbhang Rajyog'),
        summary: data.neechbhang_rajyog?.description?.[lang] || '',
        toolId,
      };

    case 'gajakesari-yog':
      return {
        title: isHi ? (data.gajakesari_yog?.hi_name || 'गजकेसरी योग') : (data.gajakesari_yog?.name || 'Gajakesari Yog'),
        summary: data.gajakesari_yog?.description || '',
        toolId,
      };

    case 'panch-mahapurush':
      return {
        title: isHi ? (data.panch_mahapurush_yog?.hi_name || 'पंच महापुरुष राजयोग') : (data.panch_mahapurush_yog?.name || 'Panch Mahapurush Rajyog'),
        summary: data.panch_mahapurush_yog?.description || '',
        toolId,
      };

    case 'chandra-mangal':
      return {
        title: isHi ? (data.chandra_mangal_yog?.hi_name || 'चंद्र-मंगल योग') : (data.chandra_mangal_yog?.name || 'Chandra-Mangal Yog'),
        summary: data.chandra_mangal_yog?.description || '',
        toolId,
      };

    case 'dhan-yog':
      return {
        title: isHi ? (data.dhan_yog?.hi_name || 'धन योग') : (data.dhan_yog?.name || 'Dhan Yog'),
        summary: data.dhan_yog?.description || '',
        toolId,
      };

    case 'rajya-sambandh':
      return {
        title: isHi ? (data.rajya_sambandh_rajyog?.hi_name || 'राज्य सम्बन्ध राजयोग') : (data.rajya_sambandh_rajyog?.name || 'Rajya Sambandh Rajyog'),
        summary: data.rajya_sambandh_rajyog?.description || '',
        toolId,
      };

    case 'dharma-karmadhipati':
      return {
        title: isHi ? (data.dharma_karmadhipati_rajyog?.hi_name || 'धर्म-कर्माधिपति राजयोग') : (data.dharma_karmadhipati_rajyog?.name || 'Dharma-Karmadhipati Rajyog'),
        summary: data.dharma_karmadhipati_rajyog?.description || '',
        toolId,
      };

    case 'vipreet-rajyog':
      return {
        title: isHi ? (data.vipreet_rajyog?.hi_name || 'विपरीत राजयोग') : (data.vipreet_rajyog?.name || 'Vipreet Rajyog'),
        summary: data.vipreet_rajyog?.description || '',
        toolId,
      };

    case 'lakshmi-yog':
      return {
        title: isHi ? (data.lakshmi_yog?.hi_name || 'लक्ष्मी योग') : (data.lakshmi_yog?.name || 'Lakshmi Yog'),
        summary: data.lakshmi_yog?.description || '',
        toolId,
      };

    case 'shubh-kartari':
      return {
        title: isHi ? (data.shubh_kartari_yog?.hi_name || 'शुभ कर्तरी योग') : (data.shubh_kartari_yog?.name || 'Shubh Kartari Yog'),
        summary: data.shubh_kartari_yog?.description || '',
        toolId,
      };

    case 'adhi-rajyog':
      return {
        title: isHi ? (data.adhi_rajyog?.hi_name || 'अधि राजयोग') : (data.adhi_rajyog?.name || 'Adhi Rajyog'),
        summary: data.adhi_rajyog?.description || '',
        toolId,
      };

    case 'kuber-rajyog':
      return {
        title: isHi ? (data.kuber_rajyog?.hi_name || 'कुबेर राजयोग') : (data.kuber_rajyog?.name || 'Kuber Rajyog'),
        summary: data.kuber_rajyog?.description || '',
        toolId,
      };

    case 'gemstone-suggestion':
      return {
        title: isHi ? "रत्न सुझाव रिपोर्ट" : "Gemstone Suggestion Report",
        subtitle: isHi ? `आपकी कुंडली और ग्रहों की शक्ति के आधार पर` : `Based on your kundali and planetary strengths`,
        summary: data.gemstone_suggestion?.paragraph || '',
        toolId,
      };

    case 'career-path':
      return {
        title: isHi ? "करियर दिशा रिपोर्ट" : "Career Direction Report",
        subtitle: isHi ? "आपके 10वें भाव और ग्रहों के प्रभाव पर आधारित" : "Based on your 10th house and planetary influences",
        summary: data.career_path?.heading || '',
        toolId,
      };

    case 'marriage-path':
      return {
        title: isHi ? "वैवाहिक जीवन रिपोर्ट" : "Marriage Life Report",
        subtitle: isHi ? "आपके 7वें भाव और शुक्र-बृहस्पति के प्रभाव पर आधारित" : "Based on your 7th house and Venus–Jupiter influences",
        summary: data.marriage_path?.heading || '',
        toolId, 
      };

    case 'foreign-travel':
      return {
        title: isHi ? "विदेश यात्रा अंतर्दृष्टि" : "Foreign Travel Insight",
        subtitle: isHi ? "आपके 9वें और 12वें भाव और ग्रह योगों पर आधारित" : "Based on your 9th & 12th house and planetary yogas",
        summary: (data.foreign_travel?.positive_points?.[0]?.[lang] || '') + ' ' + (data.foreign_travel?.negative_points?.[0]?.[lang] || ''),
        toolId,
      };  

    case 'business-path':
      return {
        title: isHi ? "व्यापार अनुकूलता रिपोर्ट" : "Business Favorability Report",
        subtitle: isHi ? "आपके 7वें और 11वें भाव की स्थिति पर आधारित" : "Based on your 7th and 11th house positions",
        summary: data.business_path?.heading || '',
        toolId,
      };

    case 'government-job':
      return {
        title: isHi ? "सरकारी नौकरी की संभावना" : "Government Job Potential",
        subtitle: isHi ? "आपके 10वें भाव और ग्रहों की शक्ति के आधार पर" : "Based on your 10th house and planetary strength",
        summary: data.government_job?.heading || '',
        toolId,
      };

    case 'love-life':
      return {
        title: isHi ? "प्रेम जीवन और अनुकूलता" : "Love Life & Compatibility",
        subtitle: isHi ? "शुक्र, मंगल, 7वें भाव और भावनात्मक ग्रहों पर आधारित" : "Based on Venus, Mars, 7th house and emotional planets",
        summary: data.love_life?.heading || '',
        toolId,
      };

    default:
      return {
        title: isHi ? `ज्योतिष रिपोर्ट - ${toolId}` : `Astrology Report - ${toolId}`,
        summary: isHi ? `${toolId} के लिए परिणाम वर्तमान में तैयारी के अधीन है।` : `Result for ${toolId} is currently under preparation.`,
      };
  }
}