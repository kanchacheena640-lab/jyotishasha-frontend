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
    price: 98,
    image: "/reports/sadhesati-report.webp",
    category: "Transit",
    description: "Detailed Saturn Sadhesati report.",
    fullDescription: "Uncover hidden struggles, karmic lessons, and powerful remedies in your personalized Shani Sade Sati Report."  
  },
  {
    title: "Financial Report",
    slug: "financial_report",
    price: 98,
    image: "/reports/financial-report.webp",
    category: "Finance",
    description: "Gain insights into your financial growth through astrological analysis.",
    fullDescription: "The Financial Report analyzes your wealth potential, income patterns, and financial stability using your birth chart and ongoing planetary periods (Mahadasha/Antardasha)."  
  },
  {
    title: "Love & Relationship Report",
    slug: "love_relationship_report",
    price: 98,
    image: "/reports/love-life-report.webp",
    category: "Love",
    description: "Explore your love life and relationship patterns through your birth chart.",
    fullDescription: "The Love & Relationship Report uncovers your emotional style, romantic compatibility, and karmic patterns using insights from your birth chart and planetary phases like Mahadasha and Antardasha."
  },
  {
    title: "Marriage Report",
    slug: "marriage_report",
    price: 98,
    image: "/reports/marriage-report.webp",
    category: "Marriage",
    description: "Understand your marriage prospects through birth chart and dasha insights.",
    fullDescription: "The Marriage Report reveals emotional compatibility, timing of marriage, and possible challenges using your astrological chart and current planetary periods (Mahadasha/Antardasha)."
  },
  {
    title: "Startup Suggestion Report",
    slug: "startup_suggestion_report",
    price: 98,
    image: "/reports/startup-suggestion-report.webp",
    category: "Self",
    description: "Discover the best startup path for you based on your birth chart and dasha phase.",
    fullDescription: "The Startup Suggestion Report combines your astrological blueprint with the planetary period (Mahadasha/Antardasha) to guide you toward a fulfilling entrepreneurial journey."
  },
  {
    title: "Love Marriage Report",
    slug: "love_marriage_report",
    price: 98,
    image: "/reports/love-marriage-report.webp",
    category: "Marriage",
    description: "Understand your chances of love marriage through astrological insights.",
    fullDescription: "The Love Marriage Report analyzes your birth chart to reveal the possibility, timing, and planetary influences related to love-based marriage. It also highlights emotional compatibility and potential challenges using Mahadasha and Antardasha periods."
  },
  {
    title: "Government Job Report",
    slug: "government_job_report",
    price: 98,
    image: "/reports/government-job-report.webp",
    category: "Marriage",
    description: "Discover your potential for a government career through astrology.",
    fullDescription: "The Government Job Report evaluates your birth chart and planetary periods (Mahadasha/Antardasha) to reveal your chances of securing a government job, suitable fields, and the most favorable timing for success in this sector."
  },
  {
    title: "Foreign Travel Report",
    slug: "foreign_travel_report",
    price: 98,
    image: "/reports/foreign-travel-report.webp",
    category: "Self",
    description: "Know your chances of foreign travel through astrological guidance.",
    fullDescription: "The Foreign Travel Report examines your birth chart and planetary periods (Mahadasha/Antardasha) to reveal opportunities for travel or settlement abroad, favorable timings, and the planetary influences that shape your journey overseas."
  },
  {
    title: "Business Report",
    slug: "business_report",
    price: 98,
    image: "/reports/business-report.webp",
    category: "Self",
    description: "Discover your business potential and opportunities through astrology.",
    fullDescription: "The Business Report evaluates your entrepreneurial strengths, favorable industries, and the right timing to start or expand a venture using insights from your birth chart and planetary periods (Mahadasha/Antardasha)."
  },
  {
    title: "Career Report",
    slug: "career_report",
    price: 98,
    image: "/reports/career-report.webp",
    category: "Self",
    description: "Understand your career path and growth through astrology.",
    fullDescription: "The Career Report analyzes your professional strengths, challenges, and opportunities using your birth chart and planetary periods (Mahadasha/Antardasha). It also highlights favorable fields of work and timings for career advancement."
  },
  {
    title: "Legal Disputes Report",
    slug: "legal_disputes_report",
    price: 1,
    image: "/reports/legal-disputes-report.webp",
    category: "Life",
    description: "Know the chances of court cases, conflicts, or disputes in your life.",
    fullDescription: "The Legal Disputes Report studies the 6th, 7th, 8th, and 12th houses of your kundali along with Mars, Saturn, and Rahu–Ketu placements. It reveals tendencies for legal issues, conflicts, and possible resolutions. The report also guides on remedies, favorable periods, and strategies to overcome disputes as per Mahadasha–Antardasha and transit influences."
  }
];
