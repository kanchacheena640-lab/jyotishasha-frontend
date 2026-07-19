// app/[locale]/financial-astrology/[slug]/page.tsx
// Detail route for Financial Astrology topics.
// DOMAIN_SLUG is the only hardcoded value — everything else flows from the engine.

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/lib/authority-engine/types'
import {
  getAuthorityDomain,
  getTopicBySlug,
  getAuthorityStaticParams,
} from '@/lib/authority-engine/resolver'
import {
  generateAuthorityTopicMetadata,
  buildAuthorityBreadcrumbSchema,
  buildAuthorityArticleSchema,
} from '@/lib/authority-engine/seo'
import AuthorityDetailRenderer from '@/components/authority-engine/AuthorityDetailRenderer'

const DOMAIN_SLUG = 'financial-astrology'

export const revalidate = 86400

export async function generateStaticParams() {
  return getAuthorityStaticParams(getAuthorityDomain(DOMAIN_SLUG))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const locale = (params.locale === 'hi' ? 'hi' : 'en') as Locale
  const domain = getAuthorityDomain(DOMAIN_SLUG)
  const topic  = getTopicBySlug(domain, params.slug)
  if (!topic) return {}
  return generateAuthorityTopicMetadata(domain, topic, locale)
}

export default function FinancialAstrologyTopic({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const locale = (params.locale === 'hi' ? 'hi' : 'en') as Locale
  const domain = getAuthorityDomain(DOMAIN_SLUG)
  const topic  = getTopicBySlug(domain, params.slug)

  if (!topic) notFound()

  const breadcrumbSchema = buildAuthorityBreadcrumbSchema(domain, topic!, locale)
  const articleSchema    = buildAuthorityArticleSchema(domain, topic!, locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <AuthorityDetailRenderer domain={domain} topic={topic!} locale={locale} />
    </>
  )
}
