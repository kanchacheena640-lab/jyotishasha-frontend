import type { RetrogradePlanetData } from "./types"
import mercury from "./planets/mercury"
import venus from "./planets/venus"
import mars from "./planets/mars"
import jupiter from "./planets/jupiter"
import saturn from "./planets/saturn"

export const retrogradePlanetList: RetrogradePlanetData[] = [
  mercury,
  venus,
  mars,
  jupiter,
  saturn,
]

export function getRetrogradeContent(
  planetSlug: string,
): RetrogradePlanetData | null {
  return retrogradePlanetList.find((p) => p.planetSlug === planetSlug) ?? null
}

export function getAllRetrogradeRouteSlugs(): string[] {
  return retrogradePlanetList.map((p) => p.routeSlug)
}

export type {
  RetrogradePlanetData,
  RetrogradeFAQ,
  RetrogradeCTA,
  RetrogradePlanetCard,
  RetrogradeHubData,
  RetrogradePlanetStatus,
} from "./types"
