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

export interface TopicLandingConfig {
  directAnswerLabel: LocalizedString
  directAnswer: LocalizedString
  /** Optional: without it the report card renders alone (no video slot, no play tracking). */
  video?: TopicLandingVideo
  offer: TopicLandingOffer
  contextLinks: TopicLandingContextLinks
  /** Render FAQ answers in server HTML (native <details>) for this topic. */
  ssrFaq: boolean
}
