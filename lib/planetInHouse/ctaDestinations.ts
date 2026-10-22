// lib/planetInHouse/ctaDestinations.ts

/**
 * Planet-in-house CTA destinations -- the ONE place that decides where a
 * planet-in-house page's bottom CTA points and what it says.
 *
 * The per-house content files (lib/planetInHouse/<planet>/<n>.ts) still carry
 * a legacy `cta` block, but its copy and `reportSlug` are NEVER rendered: every
 * one of those slugs (`<planet>-analysis-report`) was a product that does not
 * exist (a 404), and the copy promised a planet-specific "how <planet>
 * interacts with every other planet" PDF that no report delivers. The legacy
 * block now only marks WHICH pages show a CTA at all, so pages without one
 * (Sun, Moon, Mars 1st-3rd) are unchanged.
 *
 * Destinations are limited to what genuinely exists:
 *   - "report":    an existing paid report in app/data/reportsData.ts, priced
 *                  from that catalog entry (never hand-typed). If the slug is
 *                  ever missing from the catalog, the CTA falls back to the
 *                  catalog itself rather than rendering a broken link.
 *   - "free_tool": an existing free tool in app/data/toolsData.ts.
 *   - "catalog":   the /reports catalog, for planets with no dedicated report.
 *
 * Copy rules: never promise a planet-placement analysis no report provides;
 * transit reports always say current transit (गोचर), not birth placement.
 *
 * Relative imports (not the @/ alias), matching lib/ modules that the plain
 * `tsc` test invocation compiles standalone.
 */
import { reportsData } from "../../app/data/reportsData"
import { toolsData } from "../../app/data/toolsData"
import type { PlanetInHouseData } from "./types"

export type PlanetInHouseCtaKind = "report" | "free_tool" | "catalog"

/** What the page renders -- already localized, with a verified href. */
export interface ResolvedPlanetInHouseCta {
  kind: PlanetInHouseCtaKind
  href: string
  title: string
  description: string
  label: string
}

type Locale = "en" | "hi"

type CtaContext = Pick<PlanetInHouseData, "planet" | "planet_hi" | "houseLabel" | "houseLabel_hi">

interface CtaCopy {
  title: { en: string; hi: string }
  description: { en: string; hi: string }
  label: { en: string; hi: string }
}

type CtaRule =
  | { kind: "report"; reportSlug: string; copy: (ctx: CtaContext, priceRupees: number) => CtaCopy }
  | { kind: "free_tool"; toolSlug: string; copy: (ctx: CtaContext) => CtaCopy }
  | { kind: "catalog" }

export const REPORTS_CATALOG_PATH = "/reports"

/** Mars houses where the free Mangal Dosh check is the relevant next step. */
export const MANGAL_DOSH_HOUSES: readonly number[] = [4, 7, 8, 12]

function transitReportCopy(planetEn: string, planetHi: string, reportEn: string, reportHi: string) {
  return (ctx: CtaContext, price: number): CtaCopy => ({
    title: {
      en: `What Is ${planetEn}'s Current Transit Doing in Your Chart?`,
      hi: `${planetHi} का वर्तमान गोचर आपकी कुंडली में क्या कर रहा है?`,
    },
    description: {
      en: `This page explains ${planetEn} in the ${ctx.houseLabel} of a birth chart in general terms. The ${reportEn} answers a different question: where ${planetEn} is transiting right now relative to your own birth chart, which areas of life this current transit affects, and how long the phase lasts. It is a current-transit report, not an analysis of your birth placement. Delivered as a PDF to your email, in English or Hindi.`,
      hi: `यह पेज जन्म कुंडली के ${ctx.houseLabel_hi} में ${planetHi} के सामान्य प्रभाव बताता है। ${reportHi} एक अलग प्रश्न का उत्तर देती है: आपकी अपनी जन्म कुंडली के अनुसार ${planetHi} का वर्तमान गोचर किन जीवन क्षेत्रों को प्रभावित कर रहा है और यह चरण कब तक चलेगा। यह वर्तमान गोचर की रिपोर्ट है, जन्म के ग्रह-स्थान का विश्लेषण नहीं। रिपोर्ट PDF के रूप में आपके ईमेल पर, हिंदी या अंग्रेज़ी में।`,
    },
    label: {
      en: `Get ${reportEn} — ₹${price}`,
      hi: `${reportHi} पाएं — ₹${price}`,
    },
  })
}

export const PLANET_IN_HOUSE_CTA_RULES: Readonly<Record<string, (house: number) => CtaRule>> = {
  saturn: () => ({
    kind: "report",
    reportSlug: "saturn_transit_report",
    copy: transitReportCopy("Saturn", "शनि", "Saturn Transit Report", "शनि गोचर रिपोर्ट"),
  }),
  jupiter: () => ({
    kind: "report",
    reportSlug: "jupiter_transit_report",
    copy: transitReportCopy("Jupiter", "बृहस्पति", "Jupiter Transit Report", "बृहस्पति गोचर रिपोर्ट"),
  }),
  venus: () => ({
    kind: "report",
    reportSlug: "love_relationship_report",
    copy: (_ctx, price) => ({
      title: {
        en: "Venus Rules Love — Explore Your Love & Relationship Report",
        hi: "शुक्र प्रेम का कारक है — अपनी प्रेम और संबंध रिपोर्ट देखें",
      },
      description: {
        en: "In Vedic astrology Venus (Shukra) is the main significator of love and attraction. The Love & Relationship Report reads your own birth chart to describe your emotional style and romantic compatibility. It focuses on love and relationships, not on every effect of Venus in this house. Delivered as a PDF to your email, in English or Hindi.",
        hi: "वैदिक ज्योतिष में शुक्र प्रेम और आकर्षण का मुख्य कारक है। प्रेम और संबंध रिपोर्ट आपकी अपनी जन्म कुंडली के आधार पर आपकी भावनात्मक शैली और प्रेम-अनुकूलता बताती है। यह रिपोर्ट प्रेम और संबंधों पर केंद्रित है, इस भाव में शुक्र के हर प्रभाव पर नहीं। रिपोर्ट PDF के रूप में आपके ईमेल पर, हिंदी या अंग्रेज़ी में।",
      },
      label: {
        en: `Get Love & Relationship Report — ₹${price}`,
        hi: `प्रेम और संबंध रिपोर्ट पाएं — ₹${price}`,
      },
    }),
  }),
  mars: (house) =>
    MANGAL_DOSH_HOUSES.includes(house)
      ? {
          kind: "free_tool",
          toolSlug: "mangal-dosh",
          copy: (ctx) => ({
            title: {
              en: "Is This Mars Placement Linked to Mangal Dosh?",
              hi: "क्या यह मंगल स्थिति मंगल दोष से जुड़ी है?",
            },
            description: {
              en: `Mars in the ${ctx.houseLabel} is one of the placements traditionally checked for Mangal Dosh (Manglik Dosha). Whether it actually applies depends on your complete birth chart, including classical cancellation rules. Check it free with your birth details.`,
              hi: `${ctx.houseLabel_hi} में मंगल उन स्थितियों में से है जिन्हें पारंपरिक रूप से मंगल दोष (मांगलिक दोष) के लिए देखा जाता है। यह वास्तव में लागू होता है या नहीं, यह आपकी पूरी जन्म कुंडली और शास्त्रीय दोष-भंग नियमों पर निर्भर करता है। अपने जन्म विवरण से इसे मुफ़्त जांचें।`,
            },
            label: { en: "Check Mangal Dosh Free", hi: "मंगल दोष मुफ़्त जांचें" },
          }),
        }
      : { kind: "catalog" },
  rahu: () => ({ kind: "catalog" }),
  ketu: () => ({ kind: "catalog" }),
  mercury: () => ({ kind: "catalog" }),
}

function catalogCopy(ctx: CtaContext): CtaCopy {
  return {
    title: {
      en: "Looking for Personalised Guidance?",
      hi: "व्यक्तिगत मार्गदर्शन चाहिए?",
    },
    description: {
      en: `There is no separate ${ctx.planet} report. Our personalised reports each answer a specific question — career, marriage, finance, Sade Sati and more — from your own birth chart, delivered as a PDF to your email.`,
      hi: `${ctx.planet_hi} के लिए अलग रिपोर्ट उपलब्ध नहीं है। हमारी व्यक्तिगत रिपोर्ट्स आपकी अपनी जन्म कुंडली के आधार पर किसी एक खास प्रश्न — करियर, विवाह, वित्त, साढ़ेसाती आदि — का उत्तर देती हैं, और PDF के रूप में आपके ईमेल पर भेजी जाती हैं।`,
    },
    label: { en: "Explore Reports", hi: "सभी रिपोर्ट्स देखें" },
  }
}

function localize(copy: CtaCopy, locale: Locale) {
  return { title: copy.title[locale], description: copy.description[locale], label: copy.label[locale] }
}

/**
 * The CTA a planet-in-house page should render, or null for none. Only pages
 * whose content already had a (legacy) CTA get one; the legacy copy and slug
 * are ignored. Report links go to the non-locale /reports tree (the paid
 * catalog has no /hi URL); free-tool links keep the page's locale.
 */
export function resolvePlanetInHouseCta(
  data: Pick<PlanetInHouseData, "planetSlug" | "house" | "cta"> & CtaContext,
  locale: Locale,
): ResolvedPlanetInHouseCta | null {
  if (!data.cta) return null
  const ruleFor = PLANET_IN_HOUSE_CTA_RULES[data.planetSlug]
  if (!ruleFor) return null
  const rule = ruleFor(data.house)

  if (rule.kind === "report") {
    const report = reportsData.find((r) => r.slug === rule.reportSlug)
    if (report) {
      return { kind: "report", href: `/reports/${report.slug}`, ...localize(rule.copy(data, report.price), locale) }
    }
  }

  if (rule.kind === "free_tool" && toolsData.some((t) => t.slug === rule.toolSlug)) {
    const langPath = locale === "hi" ? "/hi" : ""
    return { kind: "free_tool", href: `${langPath}/tools/${rule.toolSlug}`, ...localize(rule.copy(data), locale) }
  }

  return { kind: "catalog", href: REPORTS_CATALOG_PATH, ...localize(catalogCopy(data), locale) }
}
