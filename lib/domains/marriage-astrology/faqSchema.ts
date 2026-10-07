// lib/domains/marriage-astrology/faqSchema.ts
// MC-06 -- FAQPage JSON-LD for Marriage Astrology topic pages.
//
// Derived from the SAME data and the SAME localisation the page uses to render its visible FAQ
// (topic FAQ section -> loc(item, 'label' | 'body', locale), exactly as StaticFaqSection renders
// it in server HTML since MC-05). No schema-only copy: question order, question text and answer
// text are the visible ones, untruncated. Items without a visible answer are left out. Returns
// null when a topic has no FAQ, so the route then emits no FAQPage at all.
//
// Reuses the site's existing pure builder (lib/seo/articleSchema.ts buildFAQPageSchema) unchanged.

import { buildFAQPageSchema } from '@/lib/seo/articleSchema'
import { loc } from '@/lib/authority-engine/i18n'
import type { AuthorityTopic, Locale } from '@/lib/authority-engine/types'

export function buildMarriageFaqPageSchema(topic: AuthorityTopic, locale: Locale): Record<string, unknown> | null {
  const faq = topic.sections.find(section => section.layout === 'faq')
  if (!faq) return null
  const items = faq.items
    .map(item => ({ q: loc(item, 'label', locale).trim(), a: item.body ? loc(item, 'body', locale).trim() : '' }))
    .filter(item => item.q.length > 0 && item.a.length > 0)
  return items.length > 0 ? buildFAQPageSchema(items) : null
}
