// lib/authority-engine/types.ts
// Single source of truth for the Authority Engine.
// Localization: flat _hi suffix fields — matches existing project conventions.
// No BiText. No manual relatedSlugs. No fixed card types.

export type Locale = 'en' | 'hi'

// ─── Section System ───────────────────────────────────────────────────────────

/**
 * Const object in value space + derived union type in type space.
 * Usage: SectionLayout.Cards (value), layout: SectionLayout (type).
 * Adding a layout: add one entry here + one entry in SectionRouter's SECTION_RENDERERS.
 */
export const SectionLayout = {
  Cards:      'cards',
  Grid:       'grid',
  Checklist:  'checklist',
  Timeline:   'timeline',
  Table:      'table',
  Accordion:  'accordion',
  List:       'list',
  Alert:      'alert',
  FAQ:        'faq',
  Comparison: 'comparison',
  CTA:        'cta',
} as const

export type SectionLayout = typeof SectionLayout[keyof typeof SectionLayout]

export type SectionItemBadgeVariant =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'warning'
  | 'info'

/**
 * Atomic content unit within a section. Not tied to any astrology card type.
 * meta carries layout-specific fields without polluting the base type.
 */
export interface SectionItem {
  id: string
  label: string
  label_hi: string
  body?: string
  body_hi?: string
  badge?: string
  badge_hi?: string
  badgeVariant?: SectionItemBadgeVariant
  icon?: string
  href?: string
  meta?: Record<string, string>
}

export interface SectionRendererProps {
  section: PageSection
  locale: Locale
}

/**
 * A structured content section within a topic page.
 * layout determines which renderer is used — no if/else in the engine.
 */
export interface PageSection {
  id: string
  title: string
  title_hi: string
  layout: SectionLayout
  items: SectionItem[]
  columns?: 1 | 2 | 3 | 4
  collapsible?: boolean
}

// ─── Topic Intent & Difficulty ────────────────────────────────────────────────

export type TopicIntent =
  | 'discovery'
  | 'decision'
  | 'timing'
  | 'remedial'
  | 'comparative'

export type TopicDifficulty =
  | 'beginner'
  | 'intermediate'
  | 'advanced'

// ─── Call To Action ───────────────────────────────────────────────────────────

export type CtaType = 'tool' | 'report'

export interface Cta {
  type: CtaType
  slug: string
  label: string
  label_hi: string
  description: string
  description_hi: string
}

// ─── Cross-Domain Link ────────────────────────────────────────────────────────

export interface CrossDomainLink {
  domainSlug: string
  topicSlug: string
  label: string
  label_hi: string
}

// ─── Authority Topic (one detail page) ───────────────────────────────────────

export interface AuthorityTopic {
  slug: string
  category: string
  title: string
  title_hi: string
  subtitle: string
  subtitle_hi: string
  metaDescription: string
  metaDescription_hi: string
  keywords: string[]
  keywords_hi: string[]
  sections: PageSection[]
  ctas: Cta[]
  tags: string[]
  intent: TopicIntent
  difficulty: TopicDifficulty
  crossDomainLinks?: CrossDomainLink[]
  publishedAt: string
  updatedAt: string
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface CategoryConfig {
  slug: string
  label: string
  label_hi: string
  description: string
  description_hi: string
  icon: string
  order: number
}

// ─── Accent Color ─────────────────────────────────────────────────────────────

export type DomainAccentColor =
  | 'amber'
  | 'rose'
  | 'green'
  | 'blue'
  | 'purple'
  | 'teal'

// ─── Authority Domain (hub + all topics) ──────────────────────────────────────

export interface AuthorityDomain {
  slug: string
  basePath: string
  label: string
  label_hi: string
  hubTitle: string
  hubTitle_hi: string
  hubSubtitle: string
  hubSubtitle_hi: string
  hubMetaDescription: string
  hubMetaDescription_hi: string
  hubKeywords: string[]
  hubKeywords_hi: string[]
  accentColor: DomainAccentColor
  icon: string
  categories: CategoryConfig[]
  featuredSlugs: string[]
  topics: Record<string, AuthorityTopic>
}

export type AuthorityDomainMeta = Omit<AuthorityDomain, 'topics'>

// ─── Registry ─────────────────────────────────────────────────────────────────

export type AuthorityRegistry = Record<string, AuthorityDomain>

// ─── Renderer Props ───────────────────────────────────────────────────────────

export interface AuthorityHubProps {
  domain: AuthorityDomain
  locale: Locale
}

export interface AuthorityDetailProps {
  domain: AuthorityDomain
  topic: AuthorityTopic
  locale: Locale
}
