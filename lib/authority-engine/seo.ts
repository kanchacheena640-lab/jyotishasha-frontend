// lib/authority-engine/seo.ts
// Next.js Metadata and structured data generators.

import type { Metadata } from 'next'
import type { AuthorityDomain, AuthorityTopic, Locale } from './types'
import { loc, locArr } from './i18n'

const SITE_URL = 'https://www.jyotishasha.com'
const DEFAULT_OG = 'https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg'

function lp(locale: Locale): string {
  return locale === 'hi' ? '/hi' : ''
}

export function generateAuthorityHubMetadata(
  domain: AuthorityDomain,
  locale: Locale
): Metadata {
  const canonical = `${SITE_URL}${lp(locale)}${domain.basePath}`
  return {
    title: loc(domain, 'hubTitle', locale),
    description: loc(domain, 'hubMetaDescription', locale),
    keywords: locArr(domain, 'hubKeywords', locale),
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}${domain.basePath}`,
        hi: `${SITE_URL}/hi${domain.basePath}`,
      },
    },
    openGraph: {
      title: loc(domain, 'hubTitle', locale),
      description: loc(domain, 'hubMetaDescription', locale),
      url: canonical,
      type: 'website',
      siteName: 'Jyotishasha',
      images: [{ url: DEFAULT_OG }],
    },
  }
}

export function generateAuthorityTopicMetadata(
  domain: AuthorityDomain,
  topic: AuthorityTopic,
  locale: Locale
): Metadata {
  const topicPath = `${domain.basePath}/${topic.slug}`
  const canonical = `${SITE_URL}${lp(locale)}${topicPath}`
  return {
    title: loc(topic, 'title', locale),
    description: loc(topic, 'metaDescription', locale),
    keywords: locArr(topic, 'keywords', locale),
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}${topicPath}`,
        hi: `${SITE_URL}/hi${topicPath}`,
      },
    },
    openGraph: {
      title: loc(topic, 'title', locale),
      description: loc(topic, 'metaDescription', locale),
      url: canonical,
      type: 'article',
      siteName: 'Jyotishasha',
      images: [{ url: DEFAULT_OG }],
      publishedTime: topic.publishedAt,
      modifiedTime: topic.updatedAt,
    },
  }
}

export function buildAuthorityBreadcrumbSchema(
  domain: AuthorityDomain,
  topic: AuthorityTopic | null,
  locale: Locale
): Record<string, unknown> {
  const base = `${SITE_URL}${lp(locale)}`
  const homeLabel = locale === 'hi' ? 'होम' : 'Home'
  const items = [
    { name: homeLabel,                           item: `${base}/` },
    { name: loc(domain, 'label', locale),        item: `${base}${domain.basePath}` },
    ...(topic
      ? [{ name: loc(topic, 'title', locale), item: `${base}${domain.basePath}/${topic.slug}` }]
      : []),
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      ...item,
    })),
  }
}

export function buildAuthorityArticleSchema(
  domain: AuthorityDomain,
  topic: AuthorityTopic,
  locale: Locale
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: loc(topic, 'title', locale),
    description: loc(topic, 'metaDescription', locale),
    url: `${SITE_URL}${lp(locale)}${domain.basePath}/${topic.slug}`,
    datePublished: topic.publishedAt,
    dateModified: topic.updatedAt,
    publisher: { '@type': 'Organization', name: 'Jyotishasha', url: SITE_URL },
  }
}
