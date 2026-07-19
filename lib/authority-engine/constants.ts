// lib/authority-engine/constants.ts
// Visual configuration maps for the Authority Engine.
// Engine-internal UI labels use { en, hi } objects (fixed, few, never authored by users).
// User-authored data uses flat _hi suffix fields — see types.ts.

import { SectionLayout } from './types'
import type { SectionItemBadgeVariant, DomainAccentColor } from './types'

// ─── Badge Variant Config ─────────────────────────────────────────────────────

export const BADGE_VARIANT_META: Record<
  SectionItemBadgeVariant,
  { label: string; label_hi: string; badgeClass: string; dotClass: string; borderClass: string }
> = {
  positive: { label: 'Favorable',   label_hi: 'अनुकूल',        badgeClass: 'bg-green-500/20 text-green-400',   dotClass: 'bg-green-400',  borderClass: 'border-green-500/30'  },
  negative: { label: 'Challenging', label_hi: 'चुनौतीपूर्ण',   badgeClass: 'bg-red-700/20 text-red-500',       dotClass: 'bg-red-500',    borderClass: 'border-red-700/30'    },
  neutral:  { label: 'Neutral',     label_hi: 'तटस्थ',          badgeClass: 'bg-gray-500/20 text-gray-400',     dotClass: 'bg-gray-400',   borderClass: 'border-gray-500/30'   },
  warning:  { label: 'Caution',     label_hi: 'सावधानी',        badgeClass: 'bg-yellow-500/20 text-yellow-400', dotClass: 'bg-yellow-400', borderClass: 'border-yellow-500/30' },
  info:     { label: 'Note',        label_hi: 'ध्यान दें',      badgeClass: 'bg-blue-500/20 text-blue-400',     dotClass: 'bg-blue-400',   borderClass: 'border-blue-500/30'   },
}

// ─── Section Layout Config ────────────────────────────────────────────────────

export const SECTION_LAYOUT_CONFIG: Record<SectionLayout, { defaultColumns: 1 | 2 | 3 | 4 }> = {
  [SectionLayout.Cards]:      { defaultColumns: 2 },
  [SectionLayout.Grid]:       { defaultColumns: 3 },
  [SectionLayout.Checklist]:  { defaultColumns: 1 },
  [SectionLayout.Timeline]:   { defaultColumns: 1 },
  [SectionLayout.Table]:      { defaultColumns: 1 },
  [SectionLayout.Accordion]:  { defaultColumns: 1 },
  [SectionLayout.List]:       { defaultColumns: 1 },
  [SectionLayout.Alert]:      { defaultColumns: 1 },
  [SectionLayout.FAQ]:        { defaultColumns: 1 },
  [SectionLayout.Comparison]: { defaultColumns: 1 },
  [SectionLayout.CTA]:        { defaultColumns: 1 },
}

// ─── Domain Accent Color System ───────────────────────────────────────────────

export const DOMAIN_ACCENT: Record<
  DomainAccentColor,
  { bg: string; border: string; text: string; button: string }
> = {
  amber:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  text: 'text-amber-400',  button: 'bg-amber-500 hover:bg-amber-600'   },
  rose:   { bg: 'bg-rose-500/10',   border: 'border-rose-500/30',   text: 'text-rose-400',   button: 'bg-rose-500 hover:bg-rose-600'     },
  green:  { bg: 'bg-green-500/10',  border: 'border-green-500/30',  text: 'text-green-400',  button: 'bg-green-500 hover:bg-green-600'   },
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   text: 'text-blue-400',   button: 'bg-blue-500 hover:bg-blue-600'     },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', button: 'bg-purple-500 hover:bg-purple-600' },
  teal:   { bg: 'bg-teal-500/10',   border: 'border-teal-500/30',   text: 'text-teal-400',   button: 'bg-teal-500 hover:bg-teal-600'    },
}

// ─── CTA Config ───────────────────────────────────────────────────────────────

export const CTA_TYPE_LABELS: Record<'tool' | 'report', { en: string; hi: string }> = {
  tool:   { en: 'Free Tool',       hi: 'फ्री टूल'         },
  report: { en: 'Detailed Report', hi: 'विस्तृत रिपोर्ट'  },
}

export const CTA_ACTION_LABELS: Record<'tool' | 'report', { en: string; hi: string }> = {
  tool:   { en: 'Check Now',  hi: 'अभी जाँचें'  },
  report: { en: 'Get Report', hi: 'रिपोर्ट पाएं' },
}

export const CTA_BASE_PATHS: Record<'tool' | 'report', string> = {
  tool:   '/tools',
  report: '/reports',
}

// ─── Grid Column Classes (Tailwind-safe — no dynamic class construction) ─────

export const GRID_COLS_CLASS: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

// ─── Shared UI Labels ─────────────────────────────────────────────────────────

export const UI_LABELS = {
  relatedTopics:  { en: 'Related Topics',  hi: 'संबंधित विषय'  },
  exploreMore:    { en: 'Explore More',    hi: 'और जानें'       },
  allTopics:      { en: 'All Topics',      hi: 'सभी विषय'       },
  featuredTopics: { en: 'Featured Topics', hi: 'चुनिंदा विषय'  },
  home:           { en: 'Home',            hi: 'होम'            },
} as const
