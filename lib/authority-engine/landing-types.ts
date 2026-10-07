// lib/authority-engine/landing-types.ts
// Opt-in "landing" presentation for an individual authority topic: a direct
// answer under the hero, a report conversion unit (optionally beside a
// click-to-load video), a contextual-links block before the FAQ, and
// server-rendered FAQ answers.
// Dependency-free on purpose (plain data types) so configs and standalone
// tests can import it without path-alias resolution.

export interface LocalizedString {
  en: string
  hi: string
}

export interface TopicLandingVideo {
  /** YouTube video id (embedded via youtube-nocookie.com only after a tap). */
  youtubeId: string
  /** Local, self-hosted 9:16 poster (public/ path). */
  posterSrc: string
  posterWidth: number
  posterHeight: number
  caption: LocalizedString
  playLabel: LocalizedString
  /** WebsiteEvents.featureUsed name fired on the play tap. */
  playFeatureName: string
}

export interface TopicLandingOffer {
  /** reportsData slug -- price, route and sample all derive from it. */
  reportSlug: string
  eyebrow: LocalizedString
  heading: LocalizedString
  intro: LocalizedString
  bullets: { en: string[]; hi: string[] }
  /** CTA label; "{price}" is replaced with the product's reportsData price. */
  ctaLabel: LocalizedString
  microcopy: LocalizedString
  sampleTitle: LocalizedString
  /** Lead-in for the secondary sample link under the video (only used with a video). */
  sampleHookLead?: LocalizedString
  /** WebsiteEvents.ctaClick ids / screen name. */
  reportCtaId: string
  sampleCtaId: string
  screenName: string
}

export interface TopicLandingContextLinks {
  heading: LocalizedString
  body: LocalizedString
  /** Existing topic slugs in the same domain, linked with their own titles. */
  topicSlugs: string[]
  overviewLead: LocalizedString
  overviewSlug: string
}

/** Optional interactive tool rendered inside the article, right after one content section. */
export interface TopicLandingSpouseLagnaTool {
  kind: 'spouse-lagna'
  /** Content-section id the tool is placed after. */
  afterSectionId: string
  /** Catalogue report the tool's result CTA links to. */
  reportSlug: string
}

/**
 * Optional compact, secondary report card placed after one content section, for a narrower audience
 * than the page's main offer (e.g. readers already facing a specific problem). Not a second main card.
 */
export interface TopicLandingContextualReport {
  kind: 'contextual-report'
  /** Content-section id the card is placed after. */
  afterSectionId: string
  /** reportsData slug -- route and price derive from it. */
  reportSlug: string
  eyebrow: LocalizedString
  heading: LocalizedString
  body: LocalizedString
  /** CTA label; "{price}" is replaced with the product's reportsData price. */
  ctaLabel: LocalizedString
  ctaId: string
  screenName: string
}

/** Unit rendered inside the article after one content section (an interactive tool or a contextual card). */
export type TopicLandingInlineTool = TopicLandingSpouseLagnaTool | TopicLandingContextualReport

/** Optional primary action: a compact card linking to an EXISTING site route (e.g. a free calculator). */
export interface TopicLandingPrimaryAction {
  eyebrow: LocalizedString
  heading: LocalizedString
  body: LocalizedString
  ctaLabel: LocalizedString
  microcopy: LocalizedString
  /** Locale-less internal path of an existing route, e.g. '/love'. The /hi prefix is added for Hindi. */
  href: string
  ctaId: string
  screenName: string
}

/** Fields shared by every landing overlay. */
interface TopicLandingBase {
  directAnswerLabel: LocalizedString
  directAnswer: LocalizedString
  /** Optional: without it the report card renders alone (no video slot, no play tracking). */
  video?: TopicLandingVideo
  /** Optional primary action card, rendered after the direct answer and before any report card. */
  primaryAction?: TopicLandingPrimaryAction
  contextLinks: TopicLandingContextLinks
  /** Render FAQ answers and accordion-section bodies in server HTML (native <details>) for this topic. */
  ssrFaq: boolean
  /** Optional long-form reading rhythm (section dividers, sub-heading labels) for text-heavy topics. */
  longForm?: boolean
  /** Optional unit (interactive tool or contextual report card) placed inside the article after one content section. */
  inlineTool?: TopicLandingInlineTool
}

/** Report-led landing (the original shape): a paid report card is the conversion unit. */
export interface TopicLandingConfig extends TopicLandingBase {
  offer: TopicLandingOffer
}

/** Tool-led landing: the primary action is an existing free tool; no report card on the page. */
export interface ToolLedLandingConfig extends TopicLandingBase {
  offer?: undefined
  primaryAction: TopicLandingPrimaryAction
}

export type AnyTopicLandingConfig = TopicLandingConfig | ToolLedLandingConfig
