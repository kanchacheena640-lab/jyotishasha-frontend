// lib/domains/_templates/private-job.ts
// TEMPLATE — copy to [your-domain]/topics/ and replace all TODO: placeholders.
// Topic pattern: private-sector / corporate / IT / service-industry employment.
//
// ID convention (v1.1 future-proof):
//   Use '[subdomain]:[slug]' — NOT '[top-level-domain]:[slug]'.
//   This prevents ID collisions when multiple clusters share the same top-level
//   domain (e.g. financial-astrology, marriage-astrology, health-astrology all
//   belong to the 'astrology' top-level domain but must not share ID namespaces).
//   Examples:
//     'financial-astrology:private-job'   ← this file
//     'marriage-astrology:compatibility'  ← marriage cluster
//     'health-astrology:disease-timing'   ← health cluster

import type { DomainTopic } from '@/lib/domains/_shared/domain-topic.types'

export const privateJob: DomainTopic = {

  identity: {
    id:         'financial-astrology:private-job',  // TODO: replace with your '[subdomain]:[slug]'
    slug:       'private-job',
    title:      '',        // TODO: 40–60 chars, keyword-first navigation/breadcrumb title
    title_hi:   '',
    domain:     'astrology',
    subdomain:  'financial-astrology',              // TODO: replace with your cluster subdomain
    category:   'career',                          // TODO: must match a slug in your domain _meta.ts categories
    entityType: 'concept',
    status:     'draft',                           // change to 'published' only when content is complete
  },

  routing: {
    canonicalPath: '/financial-astrology/private-job',  // TODO: /[subdomain]/[slug]
    breadcrumbs: [
      { label: 'Home',                label_hi: 'होम',             href: '/' },
      { label: 'Financial Astrology', label_hi: 'वित्तीय ज्योतिष', href: '/financial-astrology' },
      { label: 'Private Job',         label_hi: '',                href: '/financial-astrology/private-job' },
    ],
  },

  seo: {
    metaTitle:          '',  // TODO: 40–60 chars, keyword-first; engine appends site suffix
    metaDescription:    '',  // TODO: 140–160 chars, starts with focus keyword, no markdown
    metaDescription_hi: '',
    robots:             'noindex,follow',  // promote to 'index,follow' when status → 'published'
  },

  hero: {
    headline:    '',  // TODO: H1, 40–90 chars, focus keyword in first 60 chars
    headline_hi: '',
    subtext:     '',  // TODO: 100–280 chars, prose only — no bullets, no links
    subtext_hi:  '',
  },

  taxonomy: {
    tags:        [],  // TODO: 3–10 kebab-case tags for categorisation (not SEO)
    keywords:    [],  // TODO: 4–10 items; first item is the focus keyword, ordered by volume
    keywords_hi: [],
    hubPriority: 'standard',  // change to 'featured' if adding to _meta.ts featuredSlugs
  },

  content: {
    contentTemplate: 'concept',
    contentBlocks:   [],  // TODO: 2–8 blocks; FAQ block must be last
    ctas:            [],  // TODO: 1–3 CTAs; at most one with variant: 'primary'
  },

  aiMetadata: {
    searchIntent:  'commercial',   // decision-stage reader evaluating options
    difficulty:    'beginner',
    authorityLevel: 'standard',
  },

  schemaSignals: {
    expertise: '',  // TODO: 20–120 chars plain-English expertise statement for JSON-LD
  },

  authority: {
    reviewStatus:   'not-reviewed',
    contentVersion: 1,
  },

  publishing: {
    isIndexable:     false,  // set to true when status → 'published'
    isSearchEnabled: false,
    visibility:      'private',
  },

}
