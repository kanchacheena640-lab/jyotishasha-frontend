export type RetrogradePlanetStatus =
  | "retrograde-capable"
  | "never-retrograde"
  | "always-apparent-retrograde"

export interface RetrogradeFAQ {
  q: string
  a: string
  q_hi: string
  a_hi: string
}

export interface RetrogradeCTA {
  title: string
  title_hi: string
  description: string
  description_hi: string
  reportSlug: string
}

export interface RetrogradePlanetCard {
  planetSlug: string
  planet: string
  planet_hi: string
  status: RetrogradePlanetStatus
  statusLabel: string
  statusLabel_hi: string
  summary: string
  summary_hi: string
  icon: string
  detailSlug: string | null
  avgDuration?: string
  avgDuration_hi?: string
  frequency?: string
  frequency_hi?: string
}

export interface RetrogradePlanetData {
  // Identity
  planetSlug: string
  planet: string
  planet_hi: string
  routeSlug: string

  // Astronomy quick facts
  avgDuration: string
  avgDuration_hi: string
  frequency: string
  frequency_hi: string
  vakri_name: string
  vakri_name_hi: string
  classicalPosition: string
  classicalPosition_hi: string

  // SEO
  meta_title: string
  meta_title_hi: string
  meta_description: string
  meta_description_hi: string
  keywords: string[]
  keywords_hi: string[]

  // Article sections
  title: string
  title_hi: string
  intro: string
  intro_hi: string
  astronomy: string
  astronomy_hi: string
  vedicInterpretation: string
  vedicInterpretation_hi: string
  effectsGeneral: string
  effectsGeneral_hi: string
  effectsCareer: string
  effectsCareer_hi: string
  effectsRelationships: string
  effectsRelationships_hi: string
  effectsHealth: string
  effectsHealth_hi: string

  // Lists
  dos: string[]
  dos_hi: string[]
  donts: string[]
  donts_hi: string[]
  strengths: string[]
  strengths_hi: string[]
  challenges: string[]
  challenges_hi: string[]
  remedies: string[]
  remedies_hi: string[]

  // FAQ
  faqs: RetrogradeFAQ[]

  // Internal linking
  related: {
    otherRetrogradePlanets: string[]
  }
  discoverMore: string[]

  cta?: RetrogradeCTA
}

export interface RetrogradeHubData {
  faqs: RetrogradeFAQ[]
  planetCards: RetrogradePlanetCard[]
}
