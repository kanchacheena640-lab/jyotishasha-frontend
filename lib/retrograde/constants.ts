export const RETROGRADE_PLANET_SLUGS = [
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
] as const

export type RetrogradePlanetSlug = (typeof RETROGRADE_PLANET_SLUGS)[number]

export const RETROGRADE_ROUTE_MAP: Record<RetrogradePlanetSlug, string> = {
  mercury: "retrograde-mercury",
  venus: "retrograde-venus",
  mars: "retrograde-mars",
  jupiter: "retrograde-jupiter",
  saturn: "retrograde-saturn",
}

export const RETROGRADE_ASTRONOMY: Record<
  RetrogradePlanetSlug,
  {
    avgDuration: string
    avgDuration_hi: string
    frequency: string
    frequency_hi: string
  }
> = {
  mercury: {
    avgDuration: "~21 days",
    avgDuration_hi: "~21 दिन",
    frequency: "3–4 times per year",
    frequency_hi: "वर्ष में 3–4 बार",
  },
  venus: {
    avgDuration: "~40 days",
    avgDuration_hi: "~40 दिन",
    frequency: "Once every ~18 months",
    frequency_hi: "लगभग 18 माह में एक बार",
  },
  mars: {
    avgDuration: "~60–80 days",
    avgDuration_hi: "~60–80 दिन",
    frequency: "Once every ~26 months",
    frequency_hi: "लगभग 26 माह में एक बार",
  },
  jupiter: {
    avgDuration: "~120 days",
    avgDuration_hi: "~120 दिन",
    frequency: "Once per year",
    frequency_hi: "वर्ष में एक बार",
  },
  saturn: {
    avgDuration: "~135 days",
    avgDuration_hi: "~135 दिन",
    frequency: "Once per year",
    frequency_hi: "वर्ष में एक बार",
  },
}
