// app/[locale]/marriage-astrology/[slug]/page.tsx
// Detail route for Marriage Astrology topics.
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
import TopicLandingLead from '@/components/authority-engine/landing/TopicLandingLead'
import TopicLandingContextLinks from '@/components/authority-engine/landing/TopicLandingContextLinks'
import LandingInlineTool from '@/components/authority-engine/landing/LandingInlineTool'
import { marriageTopicLandings } from '@/lib/domains/marriage-astrology/_landing'

const DOMAIN_SLUG = 'marriage-astrology'

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

export default function MarriageAstrologyTopic({
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
  // Opt-in landing presentation (currently marriage-timing only); others unchanged.
  const landing = marriageTopicLandings[params.slug]

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
      <AuthorityDetailRenderer
        domain={domain}
        topic={topic!}
        locale={locale}
        // MC-05: every Marriage topic renders FAQ answers and accordion bodies in server HTML
        // (native <details>, collapsed by default). A landing config can still set its own ssrFaq.
        ssrFaq={landing?.ssrFaq ?? true}
        {...(landing && {
          lead: <TopicLandingLead config={landing} locale={locale} />,
          beforeFaq: <TopicLandingContextLinks config={landing} domain={domain} locale={locale} />,
          longForm: landing.longForm,
          ...(landing.inlineTool && {
            afterSection: {
              sectionId: landing.inlineTool.afterSectionId,
              node: <LandingInlineTool tool={landing.inlineTool} locale={locale} />,
            },
          }),
        })}
      />
    </>
  )
}
