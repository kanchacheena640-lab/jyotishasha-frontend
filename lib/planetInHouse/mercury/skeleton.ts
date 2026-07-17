import type { PlanetInHouseData } from "../types"
import { ORDINALS, HOUSE_LABELS } from "../houseData"

const PLANET_SLUG = "mercury"
const PLANET_EN = "Mercury"
const PLANET_HI = "बुध"

const OTHER_PLANETS = ["sun", "moon", "mars", "jupiter", "venus", "saturn", "rahu", "ketu"] as const

function otherHouses(current: number): string[] {
  return ORDINALS.filter((_, i) => i + 1 !== current).map((ord) => `${PLANET_SLUG}-in-${ord}-house`)
}

function otherPlanets(house: number): string[] {
  return OTHER_PLANETS.map((p) => `${p}-in-${ORDINALS[house - 1]}-house`)
}

export function skeleton(n: number): PlanetInHouseData {
  return {
    slug: `${PLANET_SLUG}-in-${ORDINALS[n - 1]}-house`,
    planetSlug: PLANET_SLUG,
    planet: PLANET_EN,
    planet_hi: PLANET_HI,
    house: n,
    houseLabel: HOUSE_LABELS[n - 1].label,
    houseLabel_hi: HOUSE_LABELS[n - 1].label_hi,
    meta_title: "",
    meta_title_hi: "",
    meta_description: "",
    meta_description_hi: "",
    keywords: [],
    keywords_hi: [],
    title: "",
    title_hi: "",
    overview: "",
    overview_hi: "",
    personality: "",
    personality_hi: "",
    career: "",
    career_hi: "",
    relationships: "",
    relationships_hi: "",
    health: "",
    health_hi: "",
    spirituality: "",
    spirituality_hi: "",
    strengths: [],
    strengths_hi: [],
    challenges: [],
    challenges_hi: [],
    faqs: [],
    related: {
      samePlanetOtherHouses: otherHouses(n),
      otherPlanetsInSameHouse: otherPlanets(n),
    },
    discoverMore: [],
  }
}
