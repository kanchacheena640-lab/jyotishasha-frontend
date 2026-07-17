export interface PlanetInHouseFAQ {
  q: string
  a: string
  q_hi: string
  a_hi: string
}

export interface PlanetInHouseData {
  // Identity
  slug: string
  planetSlug: string
  planet: string
  planet_hi: string
  house: number
  houseLabel: string
  houseLabel_hi: string

  // SEO
  meta_title: string
  meta_title_hi: string
  meta_description: string
  meta_description_hi: string
  keywords: string[]
  keywords_hi: string[]

  // Article Content
  title: string
  title_hi: string
  overview: string
  overview_hi: string
  personality: string
  personality_hi: string
  career: string
  career_hi: string
  relationships: string
  relationships_hi: string
  health: string
  health_hi: string
  spirituality: string
  spirituality_hi: string
  strengths: string[]
  strengths_hi: string[]
  challenges: string[]
  challenges_hi: string[]

  // FAQ
  faqs: PlanetInHouseFAQ[]

  // Internal Linking
  related: {
    samePlanetOtherHouses: string[]
    otherPlanetsInSameHouse: string[]
  }

  // Discover More (cross-cluster links to other authority pages)
  discoverMore: string[]

  // Future: Ascendant-level interpretation (e.g., Sun in 1st house for Aries Ascendant)
  ascendantEffects?: Partial<Record<string, { effect: string; effect_hi: string }>>

  // Future: Premium Report CTA
  cta?: {
    title: string
    title_hi: string
    description: string
    description_hi: string
    reportSlug: string
  }
}
