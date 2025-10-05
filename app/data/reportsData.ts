export interface Report {
  title: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  description: string;
  fullDescription: string
}

export const reportsData: Report[] = [
  {
    title: "Sadhesati Report",
    slug: "sadhesati_report",
    price: 99,
    image: "/reports/sadhesati-report.webp",
    category: "Transit",
    description: "Detailed Saturn Sadhesati report.",
    fullDescription: "Uncover hidden struggles, karmic lessons, and powerful remedies in your personalized Shani Sade Sati Report."  
  },
  {
    title: "Financial Report",
    slug: "financial_report",
    price: 99,
    image: "/reports/financial-report.webp",
    category: "Finance",
    description: "Gain insights into your financial growth through astrological analysis.",
    fullDescription: "The Financial Report analyzes your wealth potential, income patterns, and financial stability using your birth chart and ongoing planetary periods (Mahadasha/Antardasha)."  
  },
  {
    title: "Love & Relationship Report",
    slug: "love_relationship_report",
    price: 99,
    image: "/reports/love-life-report.webp",
    category: "Love",
    description: "Explore your love life and relationship patterns through your birth chart.",
    fullDescription: "The Love & Relationship Report uncovers your emotional style, romantic compatibility, and karmic patterns using insights from your birth chart and planetary phases like Mahadasha and Antardasha."
  },
  {
    title: "Marriage Report",
    slug: "marriage_report",
    price: 99,
    image: "/reports/marriage-report.webp",
    category: "Marriage",
    description: "Understand your marriage prospects through birth chart and dasha insights.",
    fullDescription: "The Marriage Report reveals emotional compatibility, timing of marriage, and possible challenges using your astrological chart and current planetary periods (Mahadasha/Antardasha)."
  },
  {
    title: "Startup Suggestion Report",
    slug: "startup_suggestion_report",
    price: 99,
    image: "/reports/startup-suggestion-report.webp",
    category: "Finance",
    description: "Discover the best startup path for you based on your birth chart and dasha phase.",
    fullDescription: "The Startup Suggestion Report combines your astrological blueprint with the planetary period (Mahadasha/Antardasha) to guide you toward a fulfilling entrepreneurial journey."
  },
  {
    title: "Love Marriage Report",
    slug: "love_marriage_report",
    price: 99,
    image: "/reports/love-marriage-report.webp",
    category: "Marriage",
    description: "Understand your chances of love marriage through astrological insights.",
    fullDescription: "The Love Marriage Report analyzes your birth chart to reveal the possibility, timing, and planetary influences related to love-based marriage. It also highlights emotional compatibility and potential challenges using Mahadasha and Antardasha periods."
  },
  {
    title: "Government Job Report",
    slug: "government_job_report",
    price: 99,
    image: "/reports/government-job-report.webp",
    category: "Self",
    description: "Discover your potential for a government career through astrology.",
    fullDescription: "The Government Job Report evaluates your birth chart and planetary periods (Mahadasha/Antardasha) to reveal your chances of securing a government job, suitable fields, and the most favorable timing for success in this sector."
  },
  {
    title: "Foreign Travel Report",
    slug: "foreign_travel_report",
    price: 99,
    image: "/reports/foreign-travel-report.webp",
    category: "Self",
    description: "Know your chances of foreign travel through astrological guidance.",
    fullDescription: "The Foreign Travel Report examines your birth chart and planetary periods (Mahadasha/Antardasha) to reveal opportunities for travel or settlement abroad, favorable timings, and the planetary influences that shape your journey overseas."
  },
  {
    title: "Business Report",
    slug: "business_report",
    price: 99,
    image: "/reports/business-report.webp",
    category: "Self",
    description: "Discover your business potential and opportunities through astrology.",
    fullDescription: "The Business Report evaluates your entrepreneurial strengths, favorable industries, and the right timing to start or expand a venture using insights from your birth chart and planetary periods (Mahadasha/Antardasha)."
  },
  {
    title: "Career Report",
    slug: "career_report",
    price: 99,
    image: "/reports/career-report.webp",
    category: "Self",
    description: "Understand your career path and growth through astrology.",
    fullDescription: "The Career Report analyzes your professional strengths, challenges, and opportunities using your birth chart and planetary periods (Mahadasha/Antardasha). It also highlights favorable fields of work and timings for career advancement."
  },
  {
    title: "Gemstone Consultation",
    slug: "gemstone_consultation",
    price: 99,
    image: "/reports/gemstone_consultation.webp",
    category: "Self",
    description: "Get personalized gemstone recommendations based on your birth chart for luck, good quality lifestyle, and success.",
    fullDescription: "The Gemstone Consultation Report guides you in choosing the right gemstone according to your horoscope. It explains which stone can balance your planets, attract positive energy, and protect you from challenges. Based on your Lagna, Moon sign, and planetary periods (Dasha/Antardasha), this report helps you wear gemstones that improve living quality & style, wealth, relationships, and overall destiny."
  },
  {
    title: "Children Parenting Report",
    slug: "children_parenting_report",
    price: 99,
    image: "/reports/children_parenting_report.webp",
    category: "Self",
    description: "Understand your child’s traits and parenting guidance based on astrology.",
    fullDescription: "The Children Parenting Report offers deep insights into your child’s personality, strengths, and challenges as seen through their birth chart. It highlights how planetary influences shape education, health, and behavior, while guiding parents with practical ways to nurture growth. With dasha and transit insights, this report helps you create a supportive environment, handle challenges wisely, and strengthen the parent-child bond."
  },
  {
    title: "Delay in Marriage Report",
    slug: "delay_in_marriage_report",
    price: 99,
    image: "/reports/delay_in_marriage_report.webp",
    category: "Marriage",
    description: "Find the astrological reasons behind marriage delays and remedies for timely settlement.",
    fullDescription: "The Delay in Marriage Report reveals planetary combinations and dasha periods that may cause postponements in marriage. It analyzes your birth chart to identify root causes such as Saturn or Rahu influence, weak Venus, or 7th house challenges. Along with transit insights, the report provides practical guidance and remedies to overcome delays, align with favorable periods, and improve prospects of a timely and harmonious marriage."
  },
  {
    title: "Financial Stability Report",
    slug: "financial_stability_report",
    price: 99,
    image: "/reports/financial_stability_report.webp",
    category: "Finance",
    description: "Discover your long-term financial potential and stability through Vedic astrology.",
    fullDescription: "The Financial Stability Report explores how wealth, savings, and stability unfold in your life as per your birth chart. It analyzes the 2nd, 8th, and 11th houses, along with planetary influences of Jupiter, Venus, and Saturn, to highlight financial strengths and challenges. With dasha and transit analysis, the report guides you toward building financial security, handling unexpected expenses, and aligning with opportunities for wealth growth and prosperity."
  },
  {
    title: "Jupiter Transit Report",
    slug: "jupiter_transit_report",
    price: 99,
    image: "/reports/jupiter_transit_report.webp",
    category: "Transit",
    description: "Know how Jupiter’s current transit impacts your career, finance, and relationships.",
    fullDescription: "The Jupiter Transit Report explains the influence of Jupiter’s movement on your life areas like growth, opportunities, finance, and wisdom. Based on your birth chart, it shows how Jupiter’s placement in different houses and signs brings favorable or challenging results. The report also highlights key dates, dasha alignment, and practical advice to maximize Jupiter’s blessings while handling its challenging phases with clarity and confidence."
  },
  {
    title: "Lifestyle Analysis Report",
    slug: "lifestyle_analysis_report",
    price: 99,
    image: "/reports/lifestyle_analysis_report.webp",
    category: "Self",
    description: "Get insights on your health, habits, and lifestyle patterns based on your birth chart.",
    fullDescription: "The Lifestyle Analysis Report studies your planetary positions to reveal your natural lifestyle patterns, health tendencies, and daily habits. It highlights how the Moon, Venus, and Ascendant shape your food choices, sleep cycle, energy levels, and overall wellness. With dasha and transit insights, this report provides practical guidance to maintain balance, avoid stress, and adopt positive routines that improve your health, productivity, and overall quality of life."
  },
  {
    title: "Love Disappointment Report",
    slug: "love_disappointment_report",
    price: 99,
    image: "/reports/love_disappointment_report.webp",
    category: "Love",
    description: "Understand the reasons for love setbacks and guidance to overcome emotional challenges.",
    fullDescription: "The Love Disappointment Report explores your birth chart to find the astrological reasons behind heartbreak, delays, or unfulfilled expectations in relationships. It highlights planetary influences on the 5th and 7th houses, Venus, and the Moon to explain emotional struggles. Along with dasha and transit insights, this report offers practical advice to heal, rebuild confidence, and prepare for healthier and more fulfilling love experiences in the future."
  },
  {
    title: "Problem in Marriage Report",
    slug: "problem_in_marriage_report",
    price: 99,
    image: "/reports/problem_in_marriage_report.webp",
    category: "Marriage",
    description: "Identify causes of conflict in marriage and find practical solutions for harmony.",
    fullDescription: "The Problem in Marriage Report analyzes the 7th house, Venus, Mars, and dasha influences in your birth chart to reveal potential issues in marital life. It highlights challenges like communication gaps, trust issues, or external pressures that may affect your relationship. With transit insights, the report provides guidance and remedies to improve understanding, rebuild harmony, and strengthen the emotional bond between partners for a healthier and lasting marriage."
  },
  {
    title: "Mood & Mental Health Report",
    slug: "mood_mental_health_report",
    price: 99,
    image: "/reports/mood_mental_health_report.webp",
    category: "Self",
    description: "Understand your emotional balance and mental health patterns through astrology.",
    fullDescription: "The Mood & Mental Health Report studies the influence of the Moon, Mercury, and other key planets on your emotional well-being. It highlights tendencies toward stress, overthinking, mood swings, or positivity as shown in your chart. With dasha and transit details, the report offers practical advice for managing emotions, improving focus, and maintaining a balanced mind, helping you build resilience and inner peace in daily life."
  },
  {
    title: "Property Report",
    slug: "property_report",
    price: 99,
    image: "/reports/property_report.webp",
    category: "Finance",
    description: "Know the chances of property purchase, inheritance, and real estate gains.",
    fullDescription: "The Property Report analyzes the 4th, 8th, and 11th houses in your birth chart to highlight prospects of buying land, house, or vehicles. It studies planetary influences of Mars, Saturn, and Jupiter to explain opportunities or obstacles in real estate matters. With dasha and transit insights, this report guides you on favorable periods for purchase, managing disputes, and improving stability through property investments and assets."
  },
  {
    title: "Saturn Transit Report",
    slug: "saturn_transit_report",
    price: 99,
    image: "/reports/saturn_transit_report.webp",
    category: "Transit",
    description: "Discover how Saturn’s transit impacts your career, discipline, and responsibilities.",
    fullDescription: "The Saturn Transit Report explains the influence of Saturn’s movement on different areas of your life including career, finance, health, and personal growth. It highlights karmic lessons, discipline, and responsibilities that Saturn brings as per your birth chart. With dasha and current transit insights, the report provides practical guidance to handle challenges, build long-term stability, and make disciplined choices that lead to lasting success."
  },
  {
    title: "Second Marriage Report",
    slug: "second_marriage_report",
    price: 99,
    image: "/reports/second_marriage_report.webp",
    category: "Marriage",
    description: "Analyze prospects of remarriage and possibilities of finding a compatible partner again.",
    fullDescription: "The Second Marriage Report studies the 7th, 8th, and 9th houses in your birth chart to reveal chances of remarriage or relationships after separation. It highlights planetary influences of Venus, Jupiter, and Rahu, along with dasha and transit details, to explain timing and possibilities of a stable second marriage. The report also provides practical guidance to avoid repeating past patterns and to build a harmonious bond in future partnerships."
  },
  {
    title: "Divorce Possibility Report",
    slug: "divorce_possibility_report",
    price: 99,
    image: "/reports/divorce_possibility_report.webp",
    category: "Self",
    description: "Know the astrological factors that may indicate separation or divorce in marriage.",
    fullDescription: "The Divorce Possibility Report analyzes the 7th house, Venus, Mars, and Saturn in your birth chart to assess challenges in marital life. It studies dasha periods and transit influences that may trigger conflicts, separation, or divorce-like situations. Along with identifying risks, the report offers practical advice to handle disputes, improve communication, and work towards maintaining harmony or making informed decisions regarding marriage."
  },
  {
    title: "Legal Disputes Report",
    slug: "legal_disputes_report",
    price: 99,
    image: "/reports/legal_disputes_report.webp",
    category: "Self",
    description: "Get clarity on legal disputes, conflicts, and chances of settlement from your chart.",
    fullDescription: "The Legal Disputes Report analyzes the 6th, 7th, and 12th houses along with planetary influences of Saturn, Mars, and Rahu to reveal possibilities of court cases and disputes. It explains timing and challenges related to legal issues through dasha and transit insights. The report also provides guidance for managing conflicts wisely, finding settlement opportunities, and minimizing stress while dealing with legal matters."
  },

];
