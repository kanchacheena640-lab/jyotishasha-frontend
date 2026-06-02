export const reportRelations: Record<string, string[]> = {
  government_job_report: [
    "career_report",
    "financial_stability_report",
    "gemstone_consultation",
  ],

  career_report: [
    "government_job_report",
    "financial_stability_report",
    "gemstone_consultation",
  ],

  financial_report: [
    "financial_stability_report",
    "business_report",
    "gemstone_consultation",
  ],

  financial_stability_report: [
    "financial_report",
    "business_report",
    "gemstone_consultation",
  ],

  business_report: [
    "startup_suggestion_report",
    "financial_report",
    "gemstone_consultation",
  ],

  startup_suggestion_report: [
    "business_report",
    "financial_report",
    "gemstone_consultation",
  ],

  property_report: [
    "financial_report",
    "legal_disputes_report",
    "gemstone_consultation",
  ],

  legal_disputes_report: [
    "property_report",
    "financial_stability_report",
    "gemstone_consultation",
  ],

  marriage_report: [
    "love_marriage_report",
    "relationship_future_report",
    "gemstone_consultation",
  ],

  love_marriage_report: [
    "marriage_report",
    "relationship_future_report",
    "gemstone_consultation",
  ],

  love_relationship_report: [
    "relationship_future_report",
    "love_marriage_report",
    "gemstone_consultation",
  ],

  relationship_future_report: [
    "love_relationship_report",
    "marriage_report",
    "gemstone_consultation",
  ],

  problem_in_marriage_report: [
    "marriage_report",
    "relationship_future_report",
    "gemstone_consultation",
  ],

  divorce_possibility_report: [
    "problem_in_marriage_report",
    "relationship_future_report",
    "gemstone_consultation",
  ],

  second_marriage_report: [
    "relationship_future_report",
    "love_relationship_report",
    "gemstone_consultation",
  ],

  delay_in_marriage_report: [
    "marriage_report",
    "love_marriage_report",
    "gemstone_consultation",
  ],

  love_disappointment_report: [
    "relationship_future_report",
    "love_relationship_report",
    "gemstone_consultation",
  ],

  children_parenting_report: [
    "marriage_report",
    "relationship_future_report",
    "gemstone_consultation",
  ],

  lifestyle_analysis_report: [
    "mood_mental_health_report",
    "financial_stability_report",
    "gemstone_consultation",
  ],

  mood_mental_health_report: [
    "lifestyle_analysis_report",
    "love_disappointment_report",
    "gemstone_consultation",
  ],

  jupiter_transit_report: [
    "saturn_transit_report",
    "financial_report",
    "gemstone_consultation",
  ],

  saturn_transit_report: [
    "sadhesati_report",
    "jupiter_transit_report",
    "gemstone_consultation",
  ],

  sadhesati_report: [
    "saturn_transit_report",
    "career_report",
    "gemstone_consultation",
  ],

  foreign_travel_report: [
    "career_report",
    "jupiter_transit_report",
    "gemstone_consultation",
  ],

  gemstone_consultation: [
    "financial_report",
    "marriage_report",
    "career_report",
  ],
};