import { NAVRATRI_ARTICLE_DATA } from "./articleData"

import { SHAILPUTRI } from "./shailputri"
import { BRAHMACHARINI } from "./brahmacharini"
import { CHANDRAGHANTA } from "./chandraghanta"
import { KUSHMANDA } from "./kushmanda"
import { SKANDAMATA } from "./skandamata"
import { KATYAYANI } from "./katyayani"
import { KAALRATRI } from "./kaalratri"
import { MAHAGAURI } from "./mahagauri"
import { SIDDHIDATRI } from "./siddhidatri"

/* -----------------------------
   Base Navratri Article (Static SEO Content)
------------------------------ */
export { NAVRATRI_ARTICLE_DATA }

/* -----------------------------
   Navdurga List
------------------------------ */
export const NAVDURGA_LIST = [
  SHAILPUTRI,
  BRAHMACHARINI,
  CHANDRAGHANTA,
  KUSHMANDA,
  SKANDAMATA,
  KATYAYANI,
  KAALRATRI,
  MAHAGAURI,
  SIDDHIDATRI
]

/* -----------------------------
   Slug Map (for SSR routing)
------------------------------ */
export const NAVDURGA_MAP = NAVDURGA_LIST.reduce((acc, mata) => {
  acc[mata.slug] = mata
  return acc
}, {} as Record<string, typeof SHAILPUTRI>)

/* -----------------------------
   Helper Function
------------------------------ */
export const getNavdurgaBySlug = (slug: string) => {
  return NAVDURGA_MAP[slug] || null
}