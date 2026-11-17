// lib/planetInHouse/financialLinks.ts

/**
 * Financial Astrology links on the planet-in-house pages of the money houses:
 * the 2nd (savings, family wealth), 10th (career, status) and 11th (income,
 * gains), for all nine planets. The page renders them under its "Career &
 * Finance" section; every other planet-in-house page renders no block.
 *
 * Destinations, names and the price are read from their registries, never
 * typed here: the hub from the Financial Astrology domain meta, the tool from
 * app/data/toolsData.ts, the report from app/data/reportsData.ts with its URL
 * from getReportProductPath (the paid report pages have no /hi URL, so Hindi
 * pages link the same /reports page and say it is in English, as the hubs do).
 *
 * Relative imports (not the @/ alias), matching lib/ modules that the plain
 * `tsc` test invocation compiles standalone.
 */
import { reportsData } from "../../app/data/reportsData"
import { toolsData } from "../../app/data/toolsData"
import { getReportProductPath } from "../reportProductSeo"
import { financialAstrologyMeta } from "../domains/financial-astrology/_meta"

export const FINANCIAL_LINK_HOUSES: readonly number[] = [2, 10, 11]
const TOOL_SLUG = "dhan-yog"
const REPORT_SLUG = "financial_report"

type Locale = "en" | "hi"

export interface PlanetInHouseFinancialLinks {
  lead: string
  links: { href: string; label: string }[]
  /** Hindi pages only, when the report page is English-only. */
  notice?: string
}

const T = {
  lead: { en: "Explore money and wealth in your chart:", hi: "अपनी कुंडली में धन और आय देखें:" },
  hub: { en: (label: string) => `${label} guides`, hi: (label: string) => `${label} गाइड` },
  tool: { en: (name: string) => `Check ${name} free`, hi: (name: string) => `${name} मुफ़्त जाँचें` },
  // Adapted from the hubs' English-only notice (components/authority-engine/IntentHubRenderer.tsx), naming the
  // report page because this page itself is in Hindi.
  enOnlyReport: "वित्तीय रिपोर्ट का पेज अंग्रेज़ी में है; फ़ॉर्म में रिपोर्ट की भाषा हिंदी चुन सकते हैं।",
}

/** The Financial links for a planet-in-house page, or null for pages outside the 2nd, 10th and 11th houses. */
export function resolvePlanetInHouseFinancialLinks(
  data: { house: number },
  locale: Locale,
): PlanetInHouseFinancialLinks | null {
  if (!FINANCIAL_LINK_HOUSES.includes(data.house)) return null
  const tool = toolsData.find((t) => t.slug === TOOL_SLUG)
  const report = reportsData.find((r) => r.slug === REPORT_SLUG)
  if (!tool || !report) throw new Error("planet-in-house financial links: catalog entry missing")
  const langPath = locale === "hi" ? "/hi" : ""
  const hubLabel = locale === "hi" ? financialAstrologyMeta.label_hi : financialAstrologyMeta.label
  const reportHref = getReportProductPath(report.slug, locale)
  return {
    lead: T.lead[locale],
    links: [
      { href: `${langPath}${financialAstrologyMeta.basePath}`, label: T.hub[locale](hubLabel) },
      { href: `${langPath}/tools/${tool.slug}`, label: T.tool[locale](tool.title[locale]) },
      { href: reportHref, label: `${report.title[locale]} — ₹${report.price}` },
    ],
    notice: locale === "hi" && !reportHref.startsWith("/hi/") ? T.enOnlyReport : undefined,
  }
}
