// lib/domains/financial-astrology/_schema.ts
// Financial Astrology guide JSON-LD (Financial-scoped; the shared builders and the Marriage helpers are
// used unchanged / not used at all).
//
// FAQPage -- built from the SAME data and localisation the page renders in server HTML (the topic's FAQ
// section -> loc(item, 'label' | 'body', locale), exactly as StaticFaqSection renders it). No schema-only
// copy: order, question text and answer text are the visible ones, untruncated. Items without a visible
// answer are left out; null when a guide has no FAQ, so the route then emits no FAQPage.
//
// Article -- starts from the shared buildAuthorityArticleSchema() unchanged and only:
//   * adds `author`: the site's canonical Jyotishasha Organization (identical to the publisher; the site
//     has no named-person authorship);
//   * adds `mainEntityOfPage`: the guide's canonical URL (the same `url` the shared builder emits);
//   * omits datePublished / dateModified when empty -- dates are never invented, only taken from the
//     topic's own committed metadata;
//   * drops any other empty / null value, so the Article never carries an empty field.

import { buildFAQPageSchema, SITE_URL } from '@/lib/seo/articleSchema'
import { buildAuthorityArticleSchema } from '@/lib/authority-engine/seo'
import { loc } from '@/lib/authority-engine/i18n'
import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'

const JYOTISHASHA_ORGANIZATION = { '@type': 'Organization', name: 'Jyotishasha', url: SITE_URL } as const

export function buildFinancialFaqPageSchema(topic: AuthorityTopic, locale: Locale): Record<string, unknown> | null {
  const faq = topic.sections.find(section => section.layout === 'faq')
  if (!faq) return null
  const items = faq.items
    .map(item => ({ q: loc(item, 'label', locale).trim(), a: item.body ? loc(item, 'body', locale).trim() : '' }))
    .filter(item => item.q.length > 0 && item.a.length > 0)
  return items.length > 0 ? buildFAQPageSchema(items) : null
}

const isEmpty = (value: unknown) =>
  value === null || value === undefined || (typeof value === 'string' && value.trim() === '')

export function buildFinancialArticleSchema(
  domain: AuthorityDomain,
  topic: AuthorityTopic,
  locale: Locale,
): Record<string, unknown> {
  const base = buildAuthorityArticleSchema(domain, topic, locale)
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(base)) {
    if (isEmpty(value)) continue
    if (key === 'publisher') out.author = { ...JYOTISHASHA_ORGANIZATION }
    out[key] = value
    if (key === 'url') out.mainEntityOfPage = { '@type': 'WebPage', '@id': value }
  }
  return out
}
