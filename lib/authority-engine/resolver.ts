// lib/authority-engine/resolver.ts
// Data access and auto-related content scoring.

import { authorityRegistry } from './registry'
import type { DomainSlug } from './registry'
import type {
  AuthorityDomain,
  AuthorityTopic,
  CategoryConfig,
  Locale,
} from './types'

/**
 * Accepts DomainSlug (not string) — TypeScript catches invalid slugs at call sites.
 * Route files pass string literals ('financial-astrology') which are assignable without
 * an explicit import of DomainSlug.
 */
export function getAuthorityDomain(slug: DomainSlug): AuthorityDomain {
  return authorityRegistry[slug]
}

export function getTopicBySlug(
  domain: AuthorityDomain,
  slug: string
): AuthorityTopic | null {
  return domain.topics[slug] ?? null
}

export function getAllTopics(domain: AuthorityDomain): AuthorityTopic[] {
  return Object.values(domain.topics)
}

export function getAllTopicSlugs(domain: AuthorityDomain): string[] {
  return Object.keys(domain.topics)
}

export function getTopicsByCategory(
  domain: AuthorityDomain,
  categorySlug: string
): AuthorityTopic[] {
  return Object.values(domain.topics).filter(t => t.category === categorySlug)
}

export function getFeaturedTopics(domain: AuthorityDomain): AuthorityTopic[] {
  return domain.featuredSlugs
    .map(slug => domain.topics[slug])
    .filter((t): t is AuthorityTopic => t !== undefined)
}

export function getCategoryConfig(
  domain: AuthorityDomain,
  categorySlug: string
): CategoryConfig | null {
  return domain.categories.find(c => c.slug === categorySlug) ?? null
}

// ─── Auto-Related Algorithm ───────────────────────────────────────────────────
// Scoring: same category (+3), shared tag (+2 each), same intent (+1), same difficulty (+1).
// No manual relatedSlugs — rankings update automatically as topic data evolves.

export function getRelatedTopics(
  domain: AuthorityDomain,
  topic: AuthorityTopic,
  limit = 3
): AuthorityTopic[] {
  return Object.values(domain.topics)
    .filter(t => t.slug !== topic.slug)
    .map(t => ({ t, score: scoreRelatedness(t, topic) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ t }) => t)
}

function scoreRelatedness(
  candidate: AuthorityTopic,
  reference: AuthorityTopic
): number {
  let score = 0
  if (candidate.category === reference.category) score += 3
  const sharedTags = candidate.tags.filter(tag => reference.tags.includes(tag))
  score += sharedTags.length * 2
  if (candidate.intent === reference.intent) score += 1
  if (candidate.difficulty === reference.difficulty) score += 1
  return score
}

// ─── Static Params ────────────────────────────────────────────────────────────

export function getAuthorityStaticParams(
  domain: AuthorityDomain
): Array<{ locale: string; slug: string }> {
  return getAllTopicSlugs(domain).flatMap(slug => [
    { locale: 'en', slug },
    { locale: 'hi', slug },
  ])
}

export function resolveCtaHref(
  type: 'tool' | 'report',
  slug: string,
  locale: Locale
): string {
  const lp = locale === 'hi' ? '/hi' : ''
  return type === 'tool' ? `${lp}/tools/${slug}` : `/reports/${slug}`
}
