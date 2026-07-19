/**
 * @fileoverview Canonical DomainTopic data model for the Jyotishasha Authority Platform.
 *
 * v1.1 changes (2026-07-19):
 *   BLOCKER 1 — First-class localization: replaced `Locale` with `LocaleCode`; added
 *               `_hi` fields to TopicIdentity, TopicSeo, TopicTaxonomy; added
 *               `LocaleFieldSet` + `additionalLocales?` for future languages.
 *   BLOCKER 2 — Stable IDs: added `TopicId` type documenting the 'domain:slug' format.
 *   BLOCKER 3 — CTA architecture: replaced `TopicCta.href` with `type + entity + slug`;
 *               added `CtaDestinationType`. Renderer owns URL construction.
 *   BLOCKER 4 — Typed adapter: added `EngineItem`, `EngineSection`, `EngineCta`,
 *               `EngineCompatibleTopic`, `DomainTopicMapper`. Eliminates unsafe casts.
 *   BLOCKER 5 — ContentTemplate: added `'concept'` for educational authority pages.
 *   BLOCKER 6 — Difficulty vs Authority: added `TopicDifficulty`; renamed
 *               `AuthorityLevel` values to `'introductory' | 'standard' | 'expert'`.
 *   BLOCKER 7 — Migration lineage: added `TopicLineage`; added `lineage?` to DomainTopic.
 *   BLOCKER 8 — AI metadata: made `topicGoal`, `targetAudience`, `primaryQuestion`,
 *               `contentAngle` optional; added required `difficulty` field.
 *
 * Rules:
 * - No business logic. No helper functions. No runtime code.
 * - No external imports. All types are self-contained.
 * - Every interface, type alias, and property is documented.
 * - All string fields with bounded value spaces use literal unions.
 * - All arrays and nested objects use readonly modifiers.
 *
 * @version 1.1.0
 * @since 2026-07-19
 */

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVE UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** ISO 8601 date string. Format: YYYY-MM-DD. */
export type IsoDateString = string

/** ISO 8601 datetime string. Format: YYYY-MM-DDThh:mm:ssZ. */
export type IsoDateTimeString = string

/** A URL path starting with `/`. Never a full URL with protocol. */
export type UrlPath = string

/** A full URL including protocol. E.g., https://jyotishasha.com/en/astrology/sun-in-10th-house */
export type AbsoluteUrl = string

/** A kebab-case slug. Pattern: [a-z0-9-]+. No uppercase, no spaces, no underscores. */
export type Slug = string

/**
 * A locale identifier for a supported language.
 *
 * Known values: `'en'` (English, primary) | `'hi'` (Hindi, secondary).
 * The `(string & {})` union preserves IDE autocomplete for known values while
 * allowing future codes (`'ta'`, `'te'`, `'mr'`, `'bn'`, `'gu'`) without a type error.
 *
 * v1.1: Replaces the closed `Locale = 'en' | 'hi'` type from v1.0.
 */
export type LocaleCode = 'en' | 'hi' | (string & {})

// ─────────────────────────────────────────────────────────────────────────────
// STABLE TOPIC IDENTIFIER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deterministic, immutable topic identifier.
 *
 * Format: `'[domain]:[slug]'`
 * Examples: `'astrology:new-job-chances'`, `'vastu:main-door'`
 *
 * Generation rule: `identity.domain + ':' + identity.slug` at first creation.
 * The ID is set ONCE and never changed — not even when the slug is renamed or
 * the topic moves to a different subdomain. When a slug changes, update
 * `identity.slug` and add the old slug to `routing.legacySlugs`.
 *
 * Uniqueness: globally unique because the domain prefix namespaces the slug space.
 *
 * v1.1: Replaces the UUID placeholder recommendation. The deterministic format
 * eliminates UUID generation tooling and keeps IDs human-readable.
 */
export type TopicId = string

// ─────────────────────────────────────────────────────────────────────────────
// PUBLISHING STATUS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The lifecycle state of a DomainTopic.
 *
 * State transitions:
 *   draft → review → published → archived
 *   draft → archived (skip review for clearly unsuitable topics)
 *   published → deprecated (topic superseded; a 301 redirect MUST exist)
 *   deprecated → archived (after redirect grace period)
 *
 * The domain `_index.ts` MUST filter to `status === 'published'` before
 * exposing topics to the engine registry.
 */
export type TopicStatus =
  | 'draft'        // Being authored. Not visible anywhere.
  | 'review'       // Ready for human editorial review.
  | 'published'    // Live on the site.
  | 'archived'     // Removed. Retained for reference only.
  | 'deprecated'   // Superseded by another slug. A 301 redirect exists.

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW AND QUALITY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The current human editorial review state of a topic.
 * Distinct from `TopicStatus` — a topic can be `published` but `needs-revision`.
 */
export type ReviewStatus =
  | 'not-reviewed'   // No human has reviewed this content.
  | 'in-review'      // Under active review.
  | 'approved'       // Reviewed and approved. Matches published status.
  | 'needs-revision' // Reviewed, but revisions are required before next cycle.

/**
 * Content quality score. Integer 0–100.
 * 0–39: Low. 40–69: Publishable. 70–89: High. 90–100: Exemplary.
 * Populated by content audit tooling, not authored manually.
 */
export type QualityScore = number

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN AND ENTITY TYPE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The top-level knowledge domain this topic belongs to.
 * Matches the canonical domain slug used in URL paths.
 * The `(string & {})` union allows future domains without breaking this union.
 */
export type TopicDomain =
  | 'astrology'
  | 'panchang'
  | 'muhurat'
  | 'vastu'
  | 'numerology'
  | 'palmistry'
  | 'lal-kitab'
  | 'kp-astrology'
  | 'nadi-astrology'
  | 'feng-shui'
  | 'tarot'
  | 'i-ching'
  | 'dream-interpretation'
  | 'name-numerology'
  | (string & {})

/** A secondary domain classification within a top-level domain. Free string. */
export type TopicSubdomain = string

/**
 * The structural entity type. Drives template selection and Block Selection Matrix row.
 * The `(string & {})` union allows future entity types without breaking this union.
 */
export type TopicEntityType =
  // ── Vedic Astrology ──
  | 'planet-in-house' | 'planet-in-sign' | 'ascendant' | 'nakshatra' | 'yoga'
  | 'dasha' | 'transit' | 'aspect' | 'divisional-chart'
  // ── Panchang & Muhurat ──
  | 'panchang-element' | 'muhurat-type' | 'tithi' | 'vara'
  | 'nakshatra-panchang' | 'yoga-panchang' | 'karana'
  // ── Vastu ──
  | 'vastu-direction' | 'vastu-element' | 'vastu-zone' | 'vastu-room'
  // ── Numerology ──
  | 'life-path' | 'name-number' | 'destiny-number' | 'soul-number'
  | 'personality-number' | 'birth-day-number' | 'maturity-number' | 'karmic-debt'
  // ── Palmistry ──
  | 'palm-line' | 'palm-mount' | 'palm-shape' | 'palm-finger' | 'palm-pattern'
  // ── Gemstones & Remedies ──
  | 'gemstone' | 'remedy' | 'mantra' | 'yantra' | 'puja' | 'vrat' | 'charity'
  // ── Compatibility ──
  | 'compatibility-sun-sign' | 'compatibility-moon-sign' | 'compatibility-nakshatra'
  | 'compatibility-numerology' | 'compatibility-tarot'
  // ── Tarot ──
  | 'tarot-major-arcana' | 'tarot-minor-arcana' | 'tarot-spread' | 'tarot-reading-type'
  // ── I Ching ──
  | 'hexagram' | 'trigram' | 'changing-line'
  // ── Dream Interpretation ──
  | 'dream-symbol' | 'dream-theme' | 'dream-archetype'
  // ── Feng Shui ──
  | 'bagua-area' | 'feng-shui-element' | 'feng-shui-direction' | 'feng-shui-sector'
  // ── Lal Kitab ──
  | 'lk-planet-in-house' | 'lk-remedy' | 'lk-debt'
  // ── General ──
  | 'concept' | 'reference' | 'tool' | 'glossary-term' | 'comparison'
  | (string & {})

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT TEMPLATE AND BLOCK TYPES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Page architecture template. Maps to a row in the Block Selection Matrix in
 * CONTENT_TEMPLATE.md.
 *
 * v1.1: Added `'concept'` for educational authority pages (career astrology,
 * financial astrology overviews, general Vedic concept pages) that are not tied
 * to a specific entity-type template. Use `'concept'` instead of `'custom'` for
 * these pages.
 */
export type ContentTemplate =
  | 'planet-in-house' | 'planet-in-sign' | 'ascendant' | 'nakshatra' | 'yoga'
  | 'dasha' | 'transit' | 'panchang' | 'muhurat' | 'vastu' | 'numerology'
  | 'palmistry' | 'compatibility' | 'gemstone' | 'remedy' | 'tarot'
  | 'i-ching' | 'dream' | 'feng-shui'
  | 'concept'  // v1.1: educational authority pages not tied to a specific entity type
  | 'custom'   // Full block override — use only when no template applies

/** The layout renderer for a content block. Maps to a section renderer component. */
export type ContentBlockLayout =
  | 'cards' | 'grid' | 'checklist' | 'timeline' | 'table'
  | 'accordion' | 'list' | 'alert' | 'faq' | 'comparison' | 'cta'

/** Semantic badge variant applied to a content block item. Controls visual color coding. */
export type ItemBadgeVariant =
  | 'positive'  // Favorable outcome, beneficial condition
  | 'negative'  // Challenging outcome, difficult condition
  | 'neutral'   // Neither favorable nor unfavorable
  | 'warning'   // Caution or timing-sensitive condition
  | 'info'      // Informational note or procedural guidance

/**
 * A single item within a content block.
 * Corresponds to one card, one FAQ pair, one checklist entry, one table row, etc.
 */
export interface ContentBlockItem {
  /** Unique identifier within the parent block. Kebab-case. */
  readonly id: string
  /** The primary label, heading, or question for this item. */
  readonly label: string
  /** Hindi translation of `label`. */
  readonly label_hi?: string
  /** The body text, description, or answer for this item. */
  readonly body?: string
  /** Hindi translation of `body`. */
  readonly body_hi?: string
  /** Decorative emoji icon. Single character. Not for conveying meaning alone. */
  readonly icon?: string
  /** Short badge text displayed as a pill. 3–20 characters. */
  readonly badge?: string
  /** Hindi translation of `badge`. */
  readonly badge_hi?: string
  /** Visual color variant of the badge pill. */
  readonly badgeVariant?: ItemBadgeVariant
  /** Internal navigation link for this item. Format: /[locale]/[domain]/[slug]. */
  readonly href?: UrlPath
}

/**
 * A single authored content block — one rendered section on the page.
 * Block ID must be unique within a topic and follow the canonical IDs
 * in CONTENT_TEMPLATE.md §14.
 */
export interface ContentBlock {
  /** Unique section identifier. Kebab-case. Use canonical IDs from CONTENT_TEMPLATE.md §14. */
  readonly id: string
  /** Section heading rendered as an H2. */
  readonly title: string
  /** Hindi translation of `title`. */
  readonly title_hi?: string
  /** The layout renderer used to display this block's items. */
  readonly layout: ContentBlockLayout
  /** Number of columns for grid and card layouts. Ignored by non-grid layouts. */
  readonly columns?: 1 | 2 | 3
  /** Ordered items within this block. */
  readonly items: readonly ContentBlockItem[]
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The destination category of a call-to-action.
 * The renderer — not the content — is responsible for resolving the final URL.
 *
 * URL resolution rules (implemented in renderer, not here):
 *   'tool'     → /tools/[entity]/[slug]  or  /tools/[slug]
 *   'report'   → /reports/[entity]/[slug]  or  /reports/[slug]
 *   'topic'    → /[entity]/[slug]  where entity is the domain slug
 *   'page'     → /[slug]  for standalone static pages
 *   'external' → resolved by the renderer via a configured URL map keyed on slug
 *
 * v1.1: Replaces the previous href-based model. Content must never store
 * generated or resolved URL paths — URL ownership belongs to the routing layer.
 */
export type CtaDestinationType = 'tool' | 'report' | 'topic' | 'page' | 'external'

/**
 * A call-to-action entry. Rendered after all content blocks, not counted in
 * the `contentBlocks` length constraint.
 *
 * v1.1: Redesigned from `{id, href, label, variant}` to `{id, type, entity, slug, label, variant}`.
 * The `href` field is removed. The renderer resolves the URL from `type + entity + slug`.
 *
 * NOTE: The engine currently only renders `type: 'tool'` and `type: 'report'`.
 * Other types are defined for future use and are filtered by the adapter.
 */
export interface TopicCta {
  /** Unique identifier for this CTA within the topic. Kebab-case. */
  readonly id: string
  /**
   * The destination category. Renderer uses this to construct the URL.
   * Engine currently renders: 'tool' and 'report'. Other types need renderer support.
   */
  readonly type: CtaDestinationType
  /**
   * The namespace or entity context within the type's routing scope.
   * For `'tool'`: tool subdirectory (omit if tool is uncategorized).
   * For `'report'`: report subdirectory (omit if report is uncategorized).
   * For `'topic'`: the domain slug of the target topic (REQUIRED).
   * For `'page'`: omit.
   * For `'external'`: external service identifier.
   */
  readonly entity?: string
  /**
   * The specific resource slug within the entity namespace.
   * For `'tool'`: the tool slug, e.g. `'job-prediction'`.
   * For `'report'`: the report slug, e.g. `'career-report'`.
   * For `'topic'`: the topic slug, e.g. `'sun-in-10th-house'`.
   * For `'page'`: the page slug, e.g. `'about-us'`.
   * For `'external'`: a key resolved by the renderer's external URL registry.
   */
  readonly slug: string
  /** Button label text. 3–8 words. Imperative form. */
  readonly label: string
  /** Hindi translation of `label`. */
  readonly label_hi?: string
  /** Explanatory text displayed beneath the CTA label. */
  readonly description?: string
  /** Hindi translation of `description`. */
  readonly description_hi?: string
  /** `'primary'` renders as the main action button. At most one primary CTA per page. */
  readonly variant?: 'primary' | 'secondary'
}

// ─────────────────────────────────────────────────────────────────────────────
// ENGINE ADAPTER TYPES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The item shape expected by the engine's `SectionItem` interface.
 * Mirrors `lib/authority-engine/types.ts SectionItem` without importing it.
 *
 * IMPORTANT: `label_hi` is REQUIRED by the engine (unlike `ContentBlockItem`
 * where it is optional). The adapter must provide a fallback empty string.
 *
 * SYNC: Must be kept in sync with `SectionItem` in `lib/authority-engine/types.ts`.
 *
 * v1.1: Defined here to support the typed adapter architecture (Blocker 4).
 */
export interface EngineItem {
  id: string
  label: string
  label_hi: string         // required by engine
  body?: string
  body_hi?: string
  badge?: string
  badge_hi?: string
  badgeVariant?: ItemBadgeVariant
  icon?: string
  href?: string
  meta?: Record<string, string>
}

/**
 * The section shape expected by the engine's `PageSection` interface.
 * Mirrors `lib/authority-engine/types.ts PageSection` without importing it.
 *
 * Note: engine `columns` allows 1|2|3|4; `ContentBlock.columns` allows 1|2|3.
 *
 * SYNC: Must be kept in sync with `PageSection` in `lib/authority-engine/types.ts`.
 *
 * v1.1: Defined here to support the typed adapter architecture (Blocker 4).
 */
export interface EngineSection {
  id: string
  title: string
  title_hi: string         // required by engine
  layout: ContentBlockLayout
  items: EngineItem[]
  columns?: 1 | 2 | 3 | 4
  collapsible?: boolean
}

/**
 * The CTA shape expected by the engine's `Cta` interface.
 * Mirrors `lib/authority-engine/types.ts Cta` without importing it.
 *
 * Note: `description` and `description_hi` are REQUIRED by the engine.
 * Note: engine `type` is limited to `'tool' | 'report'`.
 *
 * SYNC: Must be kept in sync with `Cta` in `lib/authority-engine/types.ts`.
 *
 * v1.1: Defined here to support the typed adapter architecture (Blocker 4).
 */
export interface EngineCta {
  type: 'tool' | 'report'  // engine CtaType — wider CtaDestinationType narrows here
  slug: string
  label: string
  label_hi: string         // required by engine
  description: string      // required by engine
  description_hi: string   // required by engine
}

/**
 * The complete topic shape expected by `AuthorityDomain.topics` in the engine registry.
 * Mirrors `lib/authority-engine/types.ts AuthorityTopic` without importing it.
 *
 * Used as the default Output type for `DomainTopicMapper`. The adapter in
 * `lib/domains/_shared/domain-topic-adapter.ts` imports the real `AuthorityTopic`
 * and specializes the mapper with it.
 *
 * SYNC: Must be kept in sync with `AuthorityTopic` in `lib/authority-engine/types.ts`.
 *
 * v1.1: Defined here to enable typed adapter without unsafe casts (Blocker 4).
 */
export interface EngineCompatibleTopic {
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
  sections: EngineSection[]
  ctas: EngineCta[]
  tags: string[]
  intent: 'discovery' | 'decision' | 'timing' | 'remedial' | 'comparative'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  crossDomainLinks?: Array<{ domainSlug: string; topicSlug: string; label: string; label_hi: string }>
  publishedAt: string
  updatedAt: string
}

/**
 * Type signature for the function in `lib/domains/_shared/domain-topic-adapter.ts`
 * that converts `DomainTopic` to the engine's `AuthorityTopic` shape.
 *
 * Usage in `lib/domains/_shared/domain-topic-adapter.ts`:
 * ```typescript
 * import type { AuthorityTopic } from '@/lib/authority-engine/types'
 * import type { DomainTopic, DomainTopicMapper } from './domain-topic.types'
 *
 * export const mapDomainTopicToEngine: DomainTopicMapper<AuthorityTopic> = (topic) => ({
 *   slug: topic.identity.slug,
 *   // ... full mapping
 * })
 * ```
 *
 * v1.1: Generic `Output` defaults to `EngineCompatibleTopic` so the type is usable
 * even when the concrete engine type is not available. The adapter specializes it.
 */
export type DomainTopicMapper<Output extends EngineCompatibleTopic = EngineCompatibleTopic> =
  (topic: DomainTopic) => Output

// ─────────────────────────────────────────────────────────────────────────────
// HERO DATA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Page header data. Rendered above all content blocks.
 * Both `headline` and `subtext` are required for published topics.
 * This is NOT a `ContentBlock` — it has its own dedicated renderer.
 */
export interface HeroData {
  /**
   * The page H1 heading. 40–90 characters.
   * Must begin with the focus keyword. Keyword-first word order preferred.
   */
  readonly headline: string
  /** Hindi translation of `headline`. */
  readonly headline_hi: string
  /**
   * The introductory paragraph. 100–280 characters.
   * Flowing prose only. No bullets. No links. Appears directly below the H1.
   */
  readonly subtext: string
  /** Hindi translation of `subtext`. */
  readonly subtext_hi: string
  /** Short domain/category label displayed as a badge chip. 10–40 characters. */
  readonly badge?: string
  /** Hindi translation of `badge`. */
  readonly badge_hi?: string
  /** Decorative emoji for the broad topic category. Single character. */
  readonly icon?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Robots meta tag directive controlling search engine crawling and indexing.
 * Default for published topics: `'index,follow'`.
 */
export type RobotsDirective =
  | 'index,follow'      // Default. Crawl and index this page.
  | 'noindex,follow'    // Do not index. Follow links. Use for thin/draft pages.
  | 'index,nofollow'    // Index but do not follow links. Rare.
  | 'noindex,nofollow'  // Full exclusion. Use for admin/preview pages.

/**
 * All SEO metadata for a topic page.
 *
 * v1.1 additions (Blocker 1): Added `_hi` variants for Hindi locale SEO.
 * These fields were previously stored in `metadata` as a schema workaround.
 * They are now first-class typed fields, resolving migration gaps #2 and #3.
 *
 * For locales beyond Hindi: use `DomainTopic.additionalLocales`.
 */
export interface TopicSeo {
  /**
   * HTML `<title>` tag. 40–60 characters. Keyword-first.
   * Engine appends site suffix — do not include it here.
   */
  readonly metaTitle: string
  /** Hindi `<title>` tag for the `/hi/` locale. v1.1 addition. */
  readonly metaTitle_hi?: string
  /**
   * Meta description. 140–160 characters.
   * Begins with the focus keyword. States the page's primary value proposition.
   * No markdown formatting characters.
   */
  readonly metaDescription: string
  /** Hindi meta description for the `/hi/` locale. v1.1 addition. */
  readonly metaDescription_hi?: string
  /** `og:title` override. Defaults to `metaTitle` when absent. */
  readonly ogTitle?: string
  /** Hindi `og:title` for the `/hi/` locale. v1.1 addition. */
  readonly ogTitle_hi?: string
  /** `og:description` override. Defaults to `metaDescription` when absent. */
  readonly ogDescription?: string
  /** Hindi `og:description` for the `/hi/` locale. v1.1 addition. */
  readonly ogDescription_hi?: string
  /** Twitter Card title override. */
  readonly twitterTitle?: string
  /** Hindi Twitter Card title. v1.1 addition. */
  readonly twitterTitle_hi?: string
  /** Twitter Card description override. */
  readonly twitterDescription?: string
  /** Hindi Twitter Card description. v1.1 addition. */
  readonly twitterDescription_hi?: string
  /** Robots directive. Defaults to `'index,follow'` for published topics. */
  readonly robots: RobotsDirective
  /**
   * Override canonical URL. Set only when this page's canonical URL differs from
   * its primary URL path (e.g., when duplicate content exists across locales).
   * Must be an absolute URL including protocol.
   */
  readonly canonicalUrl?: AbsoluteUrl
  /** The single keyword phrase this page is optimized for. */
  readonly focusKeyword?: string
  /** Hindi equivalent of `focusKeyword` for the Hindi locale. */
  readonly focusKeyword_hi?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTING AND NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single breadcrumb navigation item.
 * Breadcrumbs render in the page header and produce BreadcrumbList schema.
 */
export interface BreadcrumbItem {
  /** Display label for this breadcrumb level. */
  readonly label: string
  /** Hindi translation of `label`. */
  readonly label_hi?: string
  /** Navigation path for this breadcrumb. */
  readonly href: UrlPath
}

/**
 * Routing, navigation, and legacy URL configuration.
 */
export interface TopicRouting {
  /**
   * The definitive URL path, excluding locale prefix.
   * Format: `/[domain]/[slug]`. Engine prepends `/[locale]/` at render time.
   */
  readonly canonicalPath: UrlPath
  /** Breadcrumb trail from Home to this page. First item is always Home. */
  readonly breadcrumbs: readonly BreadcrumbItem[]
  /** Slug of the parent topic in a content hierarchy. */
  readonly parent?: Slug
  /** Slugs of child topics under this topic. */
  readonly children?: readonly Slug[]
  /** Alternative slugs that resolve to this topic. */
  readonly aliases?: readonly Slug[]
  /** Former slugs for this topic. Used to set up 301 redirects. */
  readonly legacySlugs?: readonly Slug[]
}

// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY AND DISCOVERY
// ─────────────────────────────────────────────────────────────────────────────

/** Hub prominence level. `'featured'` appears in the domain landing page primary area. */
export type HubPriority = 'featured' | 'standard'

/** Search intent this topic satisfies. Drives content depth and CTA strategy. */
export type SearchIntent =
  | 'informational'   // Reader is learning. No purchase decision imminent.
  | 'commercial'      // Reader is evaluating options before a decision.
  | 'comparison'      // Reader is comparing two or more options.
  | 'transactional'   // Reader is ready to act, buy, or book.

/** Semantic relationship type between two topics or entities. */
export type RelationshipType =
  | 'parent-of' | 'child-of' | 'variant-of' | 'complement-of' | 'opposite-of'
  | 'modifies' | 'modified-by' | 'requires' | 'remedied-by'
  | 'tool-for' | 'report-for' | 'cross-domain-ref'

/** A reference to a related entity, potentially in another domain. */
export interface RelatedEntityRef {
  readonly slug: Slug
  readonly domain: TopicDomain
  readonly relation: RelationshipType
}

/** A named content cluster for hub navigation and internal linking grouping. */
export type ContentCluster = string

/**
 * Localizable fields for a single locale beyond English and Hindi.
 * Used in `DomainTopic.additionalLocales` for language expansion.
 *
 * v1.1: Introduced to support future locales (ta, te, mr, bn, gu, etc.)
 * without requiring a schema redesign.
 */
export interface LocaleFieldSet {
  readonly title?: string
  readonly shortTitle?: string
  readonly metaTitle?: string
  readonly metaDescription?: string
  readonly ogTitle?: string
  readonly ogDescription?: string
  readonly twitterTitle?: string
  readonly twitterDescription?: string
  readonly keywords?: readonly string[]
  readonly headline?: string
  readonly subtext?: string
}

/**
 * Taxonomy and discovery configuration.
 *
 * v1.1 addition (Blocker 1): `keywords_hi` — Hindi SEO keyword targets.
 * Previously stored in `metadata.keywords_hi`. Now a first-class typed field,
 * resolving migration gap #3.
 */
export interface TopicTaxonomy {
  /**
   * Content tags. Kebab-case. 3–10 items.
   * For categorization and content grouping, not SEO keyword targeting.
   */
  readonly tags: readonly string[]
  /**
   * SEO keyword targets. 4–10 items. First item is the focus keyword.
   * Ordered by search volume descending.
   */
  readonly keywords: readonly string[]
  /**
   * Hindi SEO keyword targets for the `/hi/` locale. 0–10 items.
   * v1.1 addition — was previously in `metadata.keywords_hi`.
   */
  readonly keywords_hi?: readonly string[]
  /** Search query synonyms for internal search ranking. */
  readonly searchAliases?: readonly string[]
  /** Related entities in any domain. Used for relationship rendering. */
  readonly relatedEntities?: readonly RelatedEntityRef[]
  /** Slugs of related topics within the same domain. */
  readonly relatedTopics?: readonly Slug[]
  /** Content clusters for hub navigation grouping. */
  readonly clusters?: readonly ContentCluster[]
  /** Hub listing prominence. Defaults to `'standard'`. */
  readonly hubPriority: HubPriority
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

/** The authored page content — blocks, CTAs, and content configuration. */
export interface TopicContent {
  /** Page architecture template. Drives block selection defaults. */
  readonly contentTemplate: ContentTemplate
  /**
   * Ordered content sections. Minimum 2, maximum 8 (including the FAQ block).
   * The FAQ block MUST always be the last entry.
   * DISCLAIMER (when present) is always the second-to-last entry.
   */
  readonly contentBlocks: readonly ContentBlock[]
  /**
   * Calls-to-action. 1–3 items. At most one with `variant: 'primary'`.
   * Rendered separately from contentBlocks. Not counted in the block length constraint.
   */
  readonly ctas: readonly TopicCta[]
  /** IDs of FAQ items used to generate FAQPage schema. */
  readonly faqIds?: readonly string[]
  /** IDs of schema blocks used to generate HowTo or Article schema. */
  readonly schemaIds?: readonly string[]
  /**
   * Anchor text phrases for inbound internal links to this page.
   * Used to standardize how other pages link to this topic.
   * 0–5 items.
   */
  readonly linkingKeywords?: readonly string[]
  /** ID of the single most important content block on this page. */
  readonly primaryBlockId?: string
  /** Total word count of all content blocks combined. */
  readonly wordCount?: number
  /** Estimated reading time in minutes. */
  readonly readingTimeMinutes?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// RELATIONSHIPS
// ─────────────────────────────────────────────────────────────────────────────

/** A typed link to another topic with explicit relationship semantics. */
export interface TopicRelationship {
  readonly slug: Slug
  readonly domain: TopicDomain
  readonly relation: RelationshipType
  /** Display label for this relationship link. */
  readonly label?: string
  /** Hindi translation of `label`. */
  readonly label_hi?: string
}

/** A tool or interactive feature related to this topic. */
export interface ToolReference {
  readonly id: string
  readonly name: string
  readonly name_hi?: string
  readonly href: UrlPath
  readonly description?: string
  readonly description_hi?: string
}

/** A report or personalized analysis product related to this topic. */
export interface ReportReference {
  readonly id: string
  readonly name: string
  readonly name_hi?: string
  readonly href: UrlPath | AbsoluteUrl
  readonly description?: string
  readonly description_hi?: string
}

/** Relationship configuration — connections to other topics, tools, and reports. */
export interface TopicRelationships {
  /** Slug of the parent entity in a structural hierarchy. */
  readonly parentEntity?: Slug
  /** Slugs of child entities under this topic. */
  readonly childEntities?: readonly Slug[]
  /** Typed cross-topic and cross-domain links. */
  readonly crossLinks?: readonly TopicRelationship[]
  /** Tools recommended for readers of this topic. */
  readonly recommendedTools?: readonly ToolReference[]
  /** Reports recommended for readers of this topic. */
  readonly recommendedReports?: readonly ReportReference[]
  /** Topics a reader should understand before this one. */
  readonly prerequisites?: readonly Slug[]
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT DEPTH AND READER LEVEL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The target reader's prior knowledge level.
 * Measures **reader effort**, not content depth.
 *
 * Matches the engine's `TopicDifficulty` values exactly — adapter passes through
 * without conversion.
 *
 * v1.1: Introduced as a separate type from `AuthorityLevel` (Blocker 6).
 * Previously, `difficulty` was incorrectly mapped to `authorityLevel` during
 * migration, conflating two orthogonal dimensions. Both are now required separately
 * in `AiMetadata`.
 */
export type TopicDifficulty = 'beginner' | 'intermediate' | 'advanced'

/**
 * The depth and comprehensiveness of the content itself.
 * Measures **content scope**, not reader effort.
 *
 * v1.1: Values renamed for clarity (Blocker 6):
 *   `'introductory'` — unchanged. Surface-level; defines core concepts.
 *   `'standard'`     — renamed from `'intermediate'`. Full topic coverage.
 *   `'expert'`       — renamed from `'comprehensive'`. Exhaustive; edge cases, nuance.
 *
 * MIGRATION NOTE: Any code or content using `'intermediate'` or `'comprehensive'`
 * as `AuthorityLevel` values must be updated. CONTENT_TEMPLATE.md Section 8
 * budget table also uses these values and requires a documentation update.
 */
export type AuthorityLevel = 'introductory' | 'standard' | 'expert'

// ─────────────────────────────────────────────────────────────────────────────
// AI AND CONTENT GENERATION METADATA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Metadata used to guide AI-assisted content generation.
 * Not rendered to readers. Used by content tooling and generation pipelines.
 *
 * v1.1 changes (Blocker 8):
 *   - Added `difficulty: TopicDifficulty` (required — directly from engine field).
 *   - Made `topicGoal`, `targetAudience`, `primaryQuestion`, `contentAngle` optional
 *     to unblock migration. These fields required editorial inference during
 *     migration from `AuthorityTopic` and should be completed in a follow-up
 *     content review cycle.
 *
 * Staged completion approach:
 *   Phase 1 (Migration): Populate `searchIntent`, `difficulty`, `authorityLevel` only.
 *   Phase 2 (Editorial): Add `topicGoal`, `targetAudience`, `primaryQuestion`, `contentAngle`.
 *   Phase 3 (AI-ready): All fields populated.
 */
export interface AiMetadata {
  /**
   * Required. The search intent this topic satisfies.
   * Derivable from the engine's `TopicIntent` field (with approximate mapping).
   */
  readonly searchIntent: SearchIntent
  /**
   * Required. The target reader's prior knowledge level.
   * Directly from the engine's `TopicDifficulty` field. No derivation needed.
   * v1.1 addition — was missing in v1.0, causing `difficulty` data loss during migration.
   */
  readonly difficulty: TopicDifficulty
  /**
   * Required. The depth and comprehensiveness of this content.
   * Derivable from `difficulty` as a starting point (beginner→introductory,
   * advanced→expert), but should be set deliberately based on content scope.
   */
  readonly authorityLevel: AuthorityLevel
  /**
   * What this page should accomplish for the reader. 20–150 characters.
   * Optional in v1.1 to unblock migration from AuthorityTopic (was required in v1.0).
   */
  readonly topicGoal?: string
  /**
   * Specific audience segments this page targets. 1–5 items.
   * Optional in v1.1 to unblock migration (was required in v1.0).
   */
  readonly targetAudience?: readonly string[]
  /**
   * The single primary question this page answers. 30–150 characters. Ends with `?`.
   * Optional in v1.1 to unblock migration (was required in v1.0).
   */
  readonly primaryQuestion?: string
  /**
   * The unique angle or perspective that differentiates this page. 30–200 characters.
   * Optional in v1.1 to unblock migration (was required in v1.0).
   */
  readonly contentAngle?: string
  /** Topics or angles this page should deliberately NOT cover. 0–10 items. */
  readonly avoidTopics?: readonly string[]
  /** Key concepts and terms this page should cover or link to. 2–12 items. */
  readonly relatedConcepts?: readonly string[]
  /**
   * Content this page depends on being accurate. Namespaced identifiers.
   * Format: `'[namespace].[identifier]'`. 0–20 items.
   */
  readonly contentDependencies?: readonly string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA.ORG AND E-E-A-T SIGNALS
// ─────────────────────────────────────────────────────────────────────────────

/** Schema.org article type for JSON-LD markup. Defaults to `'Article'`. */
export type SchemaArticleType = 'Article' | 'FAQPage' | 'HowTo'

/** Signals for Schema.org JSON-LD markup and E-E-A-T evaluation. */
export interface SchemaSignals {
  /**
   * Plain-English expertise statement. 20–120 characters.
   * Used in JSON-LD `author.description`. Not rendered to readers.
   */
  readonly expertise: string
  /** Schema.org type override. Defaults to `'Article'` when absent. */
  readonly schemaType?: SchemaArticleType
  /** Author name for JSON-LD `author.name`. */
  readonly author?: string
  /** Reviewer name for JSON-LD `reviewedBy.name`. */
  readonly reviewer?: string
  /** ISO 8601 date this topic was first published. For `datePublished` JSON-LD field. */
  readonly datePublished?: IsoDateString
}

// ─────────────────────────────────────────────────────────────────────────────
// MIGRATION LINEAGE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Migration provenance and authoring history for a topic.
 *
 * v1.1 addition (Blocker 7). Distinguishes between:
 *   - Newly created topics: `firstAuthoredAt` set, `migratedAt` absent.
 *   - Migrated topics: both `firstAuthoredAt` and `migratedAt` set.
 *
 * When migrating from `AuthorityTopic`:
 *   `firstAuthoredAt` ← `AuthorityTopic.publishedAt`
 *   `migratedAt`      ← the date the DomainTopic file was written
 *   `legacySource`    ← `'authority-topic-v1'`
 *   `legacyVersion`   ← `AuthorityTopic` content version at migration time (typically 1)
 */
export interface TopicLineage {
  /**
   * ISO 8601 date when this topic was first authored in any schema version.
   * For migrated topics: the original `AuthorityTopic.publishedAt` value.
   * For new topics: the date the DomainTopic file was first created.
   * Set once at creation. Never updated.
   */
  readonly firstAuthoredAt: IsoDateString
  /**
   * ISO 8601 date when this topic was migrated to the DomainTopic schema.
   * Absent for topics authored directly as DomainTopic (not migrated from another schema).
   */
  readonly migratedAt?: IsoDateString
  /**
   * The source schema or system this topic was migrated from.
   * Examples: `'authority-topic-v1'`, `'cms-wordpress'`, `'spreadsheet-v3'`
   */
  readonly legacySource?: string
  /**
   * The `contentVersion` at the time of migration.
   * Post-migration `contentVersion` increments from this base.
   */
  readonly legacyVersion?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHORITY AND EDITORIAL STATE
// ─────────────────────────────────────────────────────────────────────────────

/** Editorial review and content quality metadata. */
export interface TopicAuthority {
  /** Current editorial review state. */
  readonly reviewStatus: ReviewStatus
  /** Name or identifier of the reviewer who last reviewed this topic. */
  readonly reviewedBy?: string
  /** ISO 8601 date of the last editorial review. */
  readonly reviewedAt?: IsoDateString
  /** ISO 8601 datetime of the last substantive content update. */
  readonly lastUpdated?: IsoDateTimeString
  /** Content quality score. 0–100. Set by audit tooling, not manually. */
  readonly qualityScore?: QualityScore
  /**
   * Monotonically increasing version counter. Start at 1.
   * Increment on every substantive content revision.
   * Do NOT increment for translation updates, spelling corrections, or metadata-only changes.
   */
  readonly contentVersion: number
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLISHING AND VISIBILITY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Page visibility level.
 * `'public'`: anyone can access. `'unlisted'`: accessible via link, not indexed.
 * `'restricted'`: authentication required. `'private'`: internal only.
 */
export type VisibilityLevel = 'public' | 'unlisted' | 'restricted' | 'private'

/** Publishing and indexation configuration. */
export interface TopicPublishing {
  /** When `false`, page is served but excluded from sitemaps and marked `noindex`. */
  readonly isIndexable: boolean
  /** When `false`, page is excluded from site search results. */
  readonly isSearchEnabled: boolean
  /** Feature flags controlling optional rendering features for this topic. */
  readonly featureFlags?: Readonly<Record<string, boolean>>
  /** Page visibility level. */
  readonly visibility: VisibilityLevel
  /** ISO 8601 datetime to automatically publish this topic. */
  readonly scheduledPublishAt?: IsoDateTimeString
  /** ISO 8601 datetime to automatically archive this topic. */
  readonly scheduledArchiveAt?: IsoDateTimeString
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────

/** Analytics and experimentation identifiers. All optional. */
export interface TopicAnalytics {
  /** Analytics event key for page-level tracking. */
  readonly analyticsKey?: string
  /** A/B experiment identifier for this page. */
  readonly experimentKey?: string
  /** External tracking or CMS identifier. */
  readonly trackingId?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// FUTURE COMPATIBILITY
// ─────────────────────────────────────────────────────────────────────────────

/** A JSON-serializable value. Used for typed escape hatches. */
export type MetadataValue =
  | string | number | boolean | null
  | readonly MetadataValue[]
  | Readonly<{ [key: string]: MetadataValue }>

/** Domain-specific freeform metadata. Use sparingly. Prefer typed fields. */
export type TopicMetadata = Readonly<Record<string, MetadataValue>>

/** Per-domain typed extension fields. Cast to a domain-specific interface at the boundary. */
export type TopicCustomFields = Readonly<Record<string, MetadataValue>>

/** Third-party integration and future platform capability slots. Namespaced as `'[ns].[cap]'`. */
export type TopicExtensions = Readonly<Record<string, MetadataValue>>

// ─────────────────────────────────────────────────────────────────────────────
// CORE IDENTITY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Core identity fields that uniquely identify and classify a topic.
 *
 * v1.1 additions (Blocker 1):
 *   `title_hi`      — Hindi navigation/breadcrumb title. Previously in `metadata`.
 *   `shortTitle_hi` — Hindi abbreviated title.
 *
 * v1.1 change (Blocker 2):
 *   `id` now uses `TopicId` type with explicit format documentation.
 */
export interface TopicIdentity {
  /**
   * Deterministic, immutable identifier. Format: `'[domain]:[slug]'`.
   * Set once at first creation. Never change, even when `slug` is renamed.
   * Generation rule: `identity.domain + ':' + identity.slug` at creation time.
   * Example: `'astrology:new-job-chances'`
   */
  readonly id: TopicId
  /** URL-safe identifier. Kebab-case. 3–60 characters. Unique within a domain. */
  readonly slug: Slug
  /**
   * Primary title for navigation, breadcrumbs, and hub listings. 40–60 characters.
   * This is the canonical human-readable name, not the page H1.
   */
  readonly title: string
  /**
   * Hindi translation of `title`. Used in Hindi breadcrumbs, hub listings, and navigation.
   * v1.1 addition — was missing from v1.0, requiring `metadata.title_hi_nav` workaround.
   * Resolves migration gap #1.
   */
  readonly title_hi?: string
  /** Abbreviated title for compact UI contexts. 15–40 characters. */
  readonly shortTitle?: string
  /** Hindi translation of `shortTitle`. v1.1 addition. */
  readonly shortTitle_hi?: string
  /** Fully qualified canonical title in the knowledge domain. May differ from `title`. */
  readonly canonicalTitle?: string
  /** The top-level knowledge domain. */
  readonly domain: TopicDomain
  /** Secondary domain classification within the top-level domain. */
  readonly subdomain?: TopicSubdomain
  /**
   * The engine-level category slug. Maps to a `CategoryConfig` entry in the domain.
   * Used by the engine to group topics in filtered views.
   */
  readonly category: string
  /** Finer categorization within `category`. */
  readonly subcategory?: string
  /** The structural entity type. Drives template selection. */
  readonly entityType: TopicEntityType
  /** The current lifecycle state. Only `'published'` topics enter the engine registry. */
  readonly status: TopicStatus
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DOMAIN TOPIC INTERFACE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The canonical data model for every authority topic on the Jyotishasha platform.
 *
 * @version 1.1.0
 *
 * v1.1 additions to DomainTopic root:
 *   `lineage?`           — Migration provenance (Blocker 7).
 *   `additionalLocales?` — Escape hatch for languages beyond English and Hindi (Blocker 1).
 *
 * All other v1.1 changes are within existing field group interfaces.
 * See individual interface TSDoc for per-field change documentation.
 */
export interface DomainTopic {
  /** Core identity, slug, domain, entity type, and lifecycle status. */
  readonly identity: TopicIdentity
  /** URL routing, breadcrumbs, and legacy slug management. */
  readonly routing: TopicRouting
  /** SEO metadata — titles, descriptions, robots, Open Graph. */
  readonly seo: TopicSeo
  /** Page header data — H1, introductory paragraph, badge. */
  readonly hero: HeroData
  /** Classification, keywords, tags, and content clustering. */
  readonly taxonomy: TopicTaxonomy
  /** Authored content blocks, CTAs, and content configuration. */
  readonly content: TopicContent
  /** Cross-topic links, tool recommendations, and content prerequisites. */
  readonly relationships?: TopicRelationships
  /** AI content generation guidance and classification metadata. */
  readonly aiMetadata: AiMetadata
  /** Schema.org JSON-LD signals and E-E-A-T evidence. */
  readonly schemaSignals: SchemaSignals
  /** Editorial review state, quality score, and content version. */
  readonly authority: TopicAuthority
  /** Publishing flags, visibility, and scheduling. */
  readonly publishing: TopicPublishing
  /** Analytics and experiment tracking identifiers. */
  readonly analytics?: TopicAnalytics
  /**
   * Migration provenance and authoring history.
   * v1.1 addition (Blocker 7). Set at first creation; never updated.
   */
  readonly lineage?: TopicLineage
  /**
   * Locale-specific overrides for languages beyond English and Hindi.
   * Key: BCP 47 language code (e.g., `'ta'`, `'te'`, `'mr'`, `'bn'`).
   * English (en) is defined in typed fields. Hindi (hi) in `_hi` fields.
   * v1.1 addition (Blocker 1) — extensibility without schema redesign.
   */
  readonly additionalLocales?: Readonly<Record<string, LocaleFieldSet>>
  /** Domain-specific freeform metadata. Use sparingly; prefer typed fields. */
  readonly metadata?: TopicMetadata
  /** Per-domain typed extension fields for domain-specific requirements. */
  readonly customFields?: TopicCustomFields
  /** Third-party integration slots. Namespaced as `'[ns].[capability]'`. */
  readonly extensions?: TopicExtensions
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION CONSTRAINT DOCUMENTATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Machine-readable constraint documentation for content audit tooling.
 * NOT a runtime validator — `as const` reference only.
 */
export const DOMAIN_TOPIC_CONSTRAINTS = {
  'identity.id':         { pattern: '[domain]:[slug]', note: 'Always equals `${identity.domain}:${identity.slug}`; set once, never changed' },
  'identity.slug':       { minLength: 3,   maxLength: 60,  pattern: 'kebab-case [a-z0-9-]+' },
  'identity.title':      { minLength: 40,  maxLength: 60,  note: 'keyword-first; used in breadcrumbs and hub listings, not the page H1' },
  'identity.shortTitle': { minLength: 15,  maxLength: 40 },
  'seo.metaTitle':       { minLength: 40,  maxLength: 60,  note: 'keyword-first; engine appends site suffix' },
  'seo.metaDescription': { minLength: 140, maxLength: 160, note: 'begins with focus keyword; no markdown characters' },
  'hero.headline':       { minLength: 40,  maxLength: 90,  note: 'H1; keyword in first 60 characters' },
  'hero.subtext':        { minLength: 100, maxLength: 280, note: 'prose only; no lists; no links' },
  'hero.badge':          { minLength: 10,  maxLength: 40 },
  'taxonomy.tags':       { minItems: 3,    maxItems: 10,   pattern: 'kebab-case' },
  'taxonomy.keywords':   { minItems: 4,    maxItems: 10,   note: 'first item is the focus keyword; ordered by search volume descending' },
  'taxonomy.keywords_hi':{ minItems: 0,    maxItems: 10 },
  'content.contentBlocks': { minItems: 2,  maxItems: 8,    note: 'FAQ block must be last; DISCLAIMER (when present) second-to-last' },
  'content.ctas':          { minItems: 1,  maxItems: 3,    note: 'at most one item with variant: primary' },
  'content.linkingKeywords': { minItems: 0, maxItems: 5,   note: 'anchor text phrases for inbound internal links' },
  'aiMetadata.authorityLevel':  { values: "'introductory' | 'standard' | 'expert'", note: "'intermediate'/'comprehensive' were renamed in v1.1" },
  'aiMetadata.topicGoal':       { minLength: 20,  maxLength: 150 },
  'aiMetadata.targetAudience':  { minItems: 1,    maxItems: 5 },
  'aiMetadata.primaryQuestion': { minLength: 30,  maxLength: 150, note: 'must end with ?' },
  'aiMetadata.contentAngle':    { minLength: 30,  maxLength: 200 },
  'aiMetadata.avoidTopics':     { minItems: 0,    maxItems: 10 },
  'aiMetadata.relatedConcepts': { minItems: 2,    maxItems: 12 },
  'aiMetadata.contentDependencies': { minItems: 0, maxItems: 20, pattern: 'namespace.identifier' },
  'schemaSignals.expertise':    { minLength: 20,  maxLength: 120 },
  'authority.contentVersion':   { min: 1, note: 'start at 1; increment on every substantive revision' },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// DERIVED AND UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** A DomainTopic confirmed as live and publicly visible. Use after filtering in `_index.ts`. */
export type PublishedTopic = DomainTopic & {
  readonly identity: TopicIdentity & { readonly status: 'published' }
  readonly publishing: TopicPublishing & { readonly visibility: 'public' }
}

/**
 * Minimal shape for hub listing generation — content blocks are not loaded.
 * Used in domain hub pages and sitemaps.
 */
export type TopicHubEntry = Pick<DomainTopic, 'hero' | 'schemaSignals'> & {
  readonly identity: Pick<TopicIdentity, 'id' | 'slug' | 'title' | 'title_hi' | 'shortTitle' | 'domain' | 'entityType' | 'status'>
  readonly taxonomy: Pick<TopicTaxonomy, 'hubPriority' | 'tags' | 'clusters'>
  readonly routing: Pick<TopicRouting, 'canonicalPath'>
  readonly seo: Pick<TopicSeo, 'metaDescription' | 'metaDescription_hi'>
}

/** Lightweight reference for relationship lists and cross-link surfaces. */
export interface TopicRef {
  readonly slug: Slug
  readonly title: string
  readonly title_hi?: string
  readonly domain: TopicDomain
  readonly href: UrlPath
}
