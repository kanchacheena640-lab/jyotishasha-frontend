// app/panchang/muhurat/muhurth_topics.ts

export interface MuhurthTopic {
  title: string;          // Page H1 + <title>
  slug: string;           // URL slug
  activity: string;       // backend identifier
  description: string;    // meta + intro paragraph
  keywords: string[];     // meta keywords (optional)
  canonical: string;      // full canonical URL
}

export const muhurthTopics: Record<string, MuhurthTopic> = {
  "naamkaran-muhurat": {
    title: "Naamkaran Muhurat – Auspicious Baby Naming Dates",
    slug: "naamkaran-muhurat",
    activity: "naamkaran",
    description:
      "Find the most auspicious Naamkaran Muhurat (baby naming ceremony) dates based on Hindu Panchang and Nakshatra. Updated every month with Shubh dates for baby naming rituals.",
    keywords: [
      "naamkaran muhurat",
      "baby naming muhurat",
      "shubh naamkaran",
      "naamkaran dates 2025",
    ],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/naamkaran-muhurat",
  },

  "marriage-muhurat": {
    title: "Marriage Muhurat – Shubh Vivah Dates",
    slug: "marriage-muhurat",
    activity: "marriage",
    description:
      "Check monthly Shubh Vivah (Marriage) Muhurat dates as per Hindu Panchang and Nakshatra. Explore auspicious wedding dates for your 2025 marriage planning.",
    keywords: [
      "marriage muhurat 2025",
      "vivah muhurat",
      "hindu wedding dates",
      "shubh vivah tithi",
    ],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/marriage-muhurat",
  },

  "grah-pravesh-muhurat": {
    title: "Grah Pravesh Muhurat – Auspicious Housewarming Dates",
    slug: "grah-pravesh-muhurat",
    activity: "grah-pravesh",
    description:
      "Discover monthly Grah Pravesh Muhurat (Housewarming Dates) for performing Griha Pravesh Puja and entering your new home as per Hindu Panchang.",
    keywords: [
      "grah pravesh muhurat",
      "housewarming muhurat",
      "griha pravesh puja 2025",
    ],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/grah-pravesh-muhurat",
  },

  "vehicle-muhurat": {
    title: "Vehicle Buying Muhurat – Shubh Car or Bike Purchase Dates",
    slug: "vehicle-muhurat",
    activity: "vehicle",
    description:
      "Get monthly Shubh Muhurat for purchasing a new car, bike or vehicle as per Hindu Panchang and Nakshatra. Updated every month for buyers planning auspicious purchase.",
    keywords: [
      "vehicle muhurat",
      "car buying muhurat",
      "bike purchase muhurat",
      "car purchase tithi",
    ],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/vehicle-muhurat",
  },

  "child-birth-muhurat": {
    title: "Child Birth Muhurat – Auspicious Delivery & Ritual Dates",
    slug: "child-birth-muhurat",
    activity: "child-birth",
    description:
      "Find auspicious Child Birth Muhurat and related ceremony dates according to Hindu Panchang and Nakshatra. Monthly updates for baby shower and delivery rituals.",
    keywords: [
      "child birth muhurat",
      "delivery muhurat",
      "janm muhurat",
      "garbh sanskar dates",
    ],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/child-birth-muhurat",
  },

  "gold-buying-muhurat": {
    title: "Gold Buying Muhurat – Shubh Dates for Jewellery Purchase",
    slug: "gold-buying-muhurat",
    activity: "gold-purchase",
    description:
      "Explore auspicious Gold Buying Muhurat based on Hindu Panchang. Includes monthly Shubh dates for buying gold, silver, or jewellery.",
    keywords: [
      "gold buying muhurat",
      "jewellery purchase muhurat",
      "dhanteras muhurat",
      "shubh din for gold",
    ],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/gold-buying-muhurat",
  },

  "foreign-travel-muhurat": {
    title: "Foreign Travel Muhurat – Auspicious Dates for Abroad Journeys",
    slug: "foreign-travel-muhurat",
    activity: "foreign-travel",
    description:
      "Check Shubh Muhurat for starting foreign travel, study abroad, or business trips. Monthly updated travel Muhurat dates as per Hindu Panchang.",
    keywords: [
      "foreign travel muhurat",
      "travel muhurat",
      "study abroad muhurat",
      "shubh yatra dates",
    ],
    canonical: "https://www.jyotishasha.com/panchang/muhurat/foreign-travel-muhurat",
  },
};

// ✅ Global OG image for all pages
export const GLOBAL_OG_IMAGE = "/og/muhurat-base.jpg";
