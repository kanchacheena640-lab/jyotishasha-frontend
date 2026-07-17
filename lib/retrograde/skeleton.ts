import type { RetrogradePlanetData } from "./types"
import {
  RETROGRADE_PLANET_SLUGS,
  RETROGRADE_ROUTE_MAP,
  RETROGRADE_ASTRONOMY,
} from "./constants"
import type { RetrogradePlanetSlug } from "./constants"

export function createRetrogradeSkeleton(
  planetSlug: RetrogradePlanetSlug,
  planet: string,
  planet_hi: string,
): RetrogradePlanetData {
  const astro = RETROGRADE_ASTRONOMY[planetSlug]
  const otherPlanetSlugs: string[] = RETROGRADE_PLANET_SLUGS.filter(
    (s) => s !== planetSlug,
  )

  return {
    planetSlug,
    planet,
    planet_hi,
    routeSlug: RETROGRADE_ROUTE_MAP[planetSlug],

    avgDuration: astro.avgDuration,
    avgDuration_hi: astro.avgDuration_hi,
    frequency: astro.frequency,
    frequency_hi: astro.frequency_hi,
    vakri_name: `Vakri ${planet}`,
    vakri_name_hi: `वक्री ${planet_hi}`,
    classicalPosition: "",
    classicalPosition_hi: "",

    meta_title: "",
    meta_title_hi: "",
    meta_description: "",
    meta_description_hi: "",
    keywords: [],
    keywords_hi: [],

    title: "",
    title_hi: "",
    intro: "",
    intro_hi: "",
    astronomy: "",
    astronomy_hi: "",
    vedicInterpretation: "",
    vedicInterpretation_hi: "",
    effectsGeneral: "",
    effectsGeneral_hi: "",
    effectsCareer: "",
    effectsCareer_hi: "",
    effectsRelationships: "",
    effectsRelationships_hi: "",
    effectsHealth: "",
    effectsHealth_hi: "",

    dos: [],
    dos_hi: [],
    donts: [],
    donts_hi: [],
    strengths: [],
    strengths_hi: [],
    challenges: [],
    challenges_hi: [],
    remedies: [],
    remedies_hi: [],

    faqs: [],

    related: {
      otherRetrogradePlanets: otherPlanetSlugs,
    },
    discoverMore: [],
  }
}
