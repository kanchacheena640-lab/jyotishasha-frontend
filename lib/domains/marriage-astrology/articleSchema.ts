// lib/domains/marriage-astrology/articleSchema.ts
// MC-07 -- Article JSON-LD integrity for Marriage Astrology topic pages (marriage-scoped wrapper).
//
// Starts from the shared buildAuthorityArticleSchema() UNCHANGED (also used by financial-astrology)
// and only:
//   * omits datePublished / dateModified when the topic has no date metadata (the shared builder
//     emits '' for them). Dates are never invented: when present they come from the topic's own
//     committed metadata (schemaSignals.datePublished / authority.lastUpdated), exactly as before;
//   * adds `author` as the site's existing canonical identity -- the same Jyotishasha Organization
//     the Article already names as publisher, and the author identity every other Article on the
//     site uses. There is no named-person authorship anywhere on the site.
// No other field is added or changed, and key order is preserved.

import { buildAuthorityArticleSchema } from '@/lib/authority-engine/seo'
import { SITE_URL } from '@/lib/seo/articleSchema'
import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'

/** Canonical Jyotishasha organization identity (identical to the Article publisher). */
export const JYOTISHASHA_ORGANIZATION = { '@type': 'Organization', name: 'Jyotishasha', url: SITE_URL } as const

const DATE_KEYS = new Set(['datePublished', 'dateModified'])

export function buildMarriageArticleSchema(
  domain: AuthorityDomain,
  topic: AuthorityTopic,
  locale: Locale,
): Record<string, unknown> {
  const base = buildAuthorityArticleSchema(domain, topic, locale)
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(base)) {
    if (DATE_KEYS.has(key) && (typeof value !== 'string' || value.trim() === '')) continue
    if (key === 'publisher') out.author = { ...JYOTISHASHA_ORGANIZATION }
    out[key] = value
  }
  return out
}
