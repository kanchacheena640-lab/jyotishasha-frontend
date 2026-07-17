import type { PlanetInHouseData } from "./types"

import { sunInHouseData } from "./sun/index"
import { moonInHouseData } from "./moon/index"
import { marsInHouseData } from "./mars"
import { mercuryInHouseData } from "./mercury"
import { jupiterInHouseData } from "./jupiter"
import { venusInHouseData } from "./venus"
import { saturnInHouseData } from "./saturn"
import { rahuInHouseData } from "./rahu"
import { ketuInHouseData } from "./ketu"

export const planetInHouseList: PlanetInHouseData[] = [
  ...sunInHouseData,
  ...moonInHouseData,
  ...marsInHouseData,
  ...mercuryInHouseData,
  ...jupiterInHouseData,
  ...venusInHouseData,
  ...saturnInHouseData,
  ...rahuInHouseData,
  ...ketuInHouseData,
]

export function getPlanetInHouseContent(slug: string): PlanetInHouseData | null {
  return planetInHouseList.find((item) => item.slug === slug) || null
}

export function getAllPlanetInHouseSlugs(): string[] {
  return planetInHouseList.map((item) => item.slug)
}

export function getPlanetHouseByPlanet(planetSlug: string): PlanetInHouseData[] {
  return planetInHouseList.filter((item) => item.planetSlug === planetSlug)
}

export type { PlanetInHouseData, PlanetInHouseFAQ } from "./types"
