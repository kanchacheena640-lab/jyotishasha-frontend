export type ParsedResult = {
  title: string;
  subtitle?: string;
  description?: string;
  summary?: string;
  toolId?: string;
};

export async function parseToolResponse(data: any, toolId: string): Promise<ParsedResult> {
  const { name, rashi, lagna_sign } = data;

  switch (toolId) {
    case 'rashi-finder':
      return {
        title: `Your Moon Sign is ${rashi}`,
        summary: `Dear ${name}, your Moon Sign is ${rashi}. This defines your emotional nature and instinctive reactions.`,
        toolId: 'rashi-finder',
      };

    case 'lagna-finder':
      return {
        title: `Your Ascendant (Lagna) is ${lagna_sign}`,
        summary: `${name}, your Lagna is ${lagna_sign}. This governs your outer personality and how the world sees you.`,
        toolId: 'lagna-finder',
      };

    case 'planet-overview':
    return {
      title: 'Planet Overview Report',
      summary: 'Explore the deeper influence of each planet in your kundali, including dignity, aspects, and house impact.',
      toolId: 'planet-overview',
    };

    case 'kaalsarp-dosh':
    return {
      title: "Kaalsarp Dosh Report",
      subtitle: "Check for Rahu–Ketu alignment",
      summary: '',  // still blank here
      toolId: 'kaalsarp-dosh',
    };

    // ✅ Added for grah-dasha-finder
    case 'grah-dasha-finder':
      return {
        title: `Current Mahadasha & Antardasha Insight`,
        subtitle: `Based on your planetary periods`,
        summary: data.grah_dasha_text || 'Mahadasha–Antardasha summary is not available.',
        toolId: 'grah-dasha-finder',
      };
    
      case 'mangal-dosh':
        return {
          title: "Mangal Dosh Report",
          subtitle: "Find out if you're affected by Mangal Dosha.",
          summary: data.manglik_dosh?.general_explanation || '',             // ✔️ Use correct fallback
          toolId: 'mangal-dosh',
      };

      case 'sadhesati-calculator':
        return {
        title: "Sade Sati Report",
        toolId: 'sadhesati-calculator',
      };

    case 'parashari-rajyog':
    return {
      title: data.parashari_rajyog?.heading?.en || 'Parashari Rajyog',
      summary: data.parashari_rajyog?.description?.en || '',
      toolId: 'parashari-rajyog',
    };

  case 'neechbhang-rajyog':
    return {
      title: data.neechbhang_rajyog?.heading?.en || 'Neechbhang Rajyog',
      summary: data.neechbhang_rajyog?.description?.en || '',
      toolId: 'neechbhang-rajyog',
    };
    case 'gajakesari-yog':
    return {
      title: data.gajakesari_yog?.name || 'Gajakesari Yog',
      summary: data.gajakesari_yog?.description || '',
      toolId: 'gajakesari-yog',
    };
    case 'panch-mahapurush':
      return {
        title: data.panch_mahapurush_yog?.name || 'Panch Mahapurush Rajyog',
        summary: data.panch_mahapurush_yog?.description || '',
        toolId: 'panch-mahapurush',
      };
    case 'chandra-mangal':
      return {
        title: data.chandra_mangal_yog?.name || 'Chandra-Mangal Yog',
        summary: data.chandra_mangal_yog?.description || '',
        toolId: 'chandra-mangal',
      };
    case 'dhan-yog':
      return {
        title: data.dhan_yog?.name || 'Dhan Yog',
        summary: data.dhan_yog?.description || '',
        toolId: 'dhan-yog',
      };
    case 'rajya-sambandh':
      return {
        title: data.rajya_sambandh_rajyog?.name || 'Rajya Sambandh Rajyog',
        summary: data.rajya_sambandh_rajyog?.description || '',
        toolId: 'rajya-sambandh',
      };
    case 'dharma-karmadhipati':
      return {
        title: data.dharma_karmadhipati_rajyog?.name || 'Dharma-Karmadhipati Rajyog',
        summary: data.dharma_karmadhipati_rajyog?.description || '',
        toolId: 'dharma-karmadhipati',
      };
    case 'vipreet-rajyog':
      return {
        title: data.vipreet_rajyog?.name || 'Vipreet Rajyog',
        summary: data.vipreet_rajyog?.description || '',
        toolId: 'vipreet-rajyog',
      };
    case 'lakshmi-yog':
      return {
        title: data.lakshmi_yog?.name || 'Lakshmi Yog',
        summary: data.lakshmi_yog?.description || '',
        toolId: 'lakshmi-yog',
      };
    case 'shubh-kartari':
      return {
        title: data.shubh_kartari_yog?.name || 'Shubh Kartari Yog',
        summary: data.shubh_kartari_yog?.description || '',
        toolId: 'shubh-kartari',
      };
    case 'adhi-rajyog':
      return {
        title: data.adhi_rajyog?.name || 'Adhi Rajyog',
        summary: data.adhi_rajyog?.description || '',
        toolId: 'adhi-rajyog',
      };
    case 'kuber-rajyog':
      return {
        title: data.kuber_rajyog?.name || 'Kuber Rajyog',
        summary: data.kuber_rajyog?.description || '',
        toolId: 'kuber-rajyog',
      };
    case 'gemstone-suggestion':
      return {
        title: "Gemstone Suggestion Report",
        subtitle: `Based on your kundali and planetary strengths`,
        summary: data.gemstone_suggestion?.paragraph || '',
        toolId: 'gemstone-suggestion',
      };
    case 'career-path':
      return {
        title: "Career Direction Report",
        subtitle: "Based on your 10th house and planetary influences",
        summary: data.career_path?.heading || '',
        toolId: 'career-path',
      };
    case 'marriage-path':
      return {
        title: "Marriage Life Report",
        subtitle: "Based on your 7th house and Venus–Jupiter influences",
        summary: data.marriage_path?.heading || '',
        toolId: 'marriage-path', 
      };
    case 'foreign-travel':
      return {
        title: "Foreign Travel Insight",
        subtitle: "Based on your 9th & 12th house and planetary yogas",
        summary: (data.foreign_travel?.positive_points?.[0]?.en || '') + ' ' + (data.foreign_travel?.negative_points?.[0]?.en || ''),
        toolId: 'foreign-travel',
      };  
    case 'business-path':
      return {
        title: "Business Favorability Report",
        subtitle: "Based on your 7th and 11th house positions",
        summary: data.business_path?.heading || '',
        toolId: 'business-path',
      };
    case 'government-job':
      return {
        title: "Government Job Potential",
        subtitle: "Based on your 10th house and planetary strength",
        summary: data.government_job?.heading || '',
        toolId: 'government-job',
      };
    case 'love-life':
      return {
        title: "Love Life & Compatibility",
        subtitle: "Based on Venus, Mars, 7th house and emotional planets",
        summary: data.love_life?.heading || '',
        toolId: 'love-life',
      };

    default:
      return {
        title: `Astrology Report - ${toolId}`,
        summary: `Result for ${toolId} is currently under preparation.`,
      };
  }
}
