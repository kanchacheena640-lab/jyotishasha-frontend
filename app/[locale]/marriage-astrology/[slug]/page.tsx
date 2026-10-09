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
} from '@/lib/authority-engine/seo'
import AuthorityDetailRenderer from '@/components/authority-engine/AuthorityDetailRenderer'
import TopicLandingLead from '@/components/authority-engine/landing/TopicLandingLead'
import TopicLandingContextLinks from '@/components/authority-engine/landing/TopicLandingContextLinks'
import LandingInlineTool from '@/components/authority-engine/landing/LandingInlineTool'
import MarriageYouTubeShort from '@/components/authority-engine/landing/MarriageYouTubeShort'
import { getReportSampleLabel, getReportSampleUrl } from '@/lib/reportSamples'
import { marriageTopicLandings } from '@/lib/domains/marriage-astrology/_landing'
import { buildMarriageFaqPageSchema } from '@/lib/domains/marriage-astrology/faqSchema'
import { buildMarriageArticleSchema } from '@/lib/domains/marriage-astrology/articleSchema'

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
  // MC-07: shared Article builder + marriage-scoped integrity (no empty dates, canonical Organization author).
  const articleSchema    = buildMarriageArticleSchema(domain, topic!, locale)
  // MC-06: FAQPage built from the same FAQ items the page renders (null when a topic has no FAQ).
  const faqSchema        = buildMarriageFaqPageSchema(topic!, locale)
  // Opt-in landing presentation (currently marriage-timing only); others unchanged.
  const landing = marriageTopicLandings[params.slug]
  // Standalone Short card (TopicLandingConfig.inlineVideo); report-led pages use the lead card's own `video` slot.
  const shortCard = landing?.inlineVideo && (
    <MarriageYouTubeShort
      video={landing.inlineVideo}
      locale={locale}
      // Sample hook only on report-led pages: the offer's own sample PDF.
      {...(landing.offer && landing.inlineVideo.sampleHookLead && {
        sampleHref: getReportSampleUrl(landing.offer.reportSlug, locale),
        sampleLabel: getReportSampleLabel(locale),
      })}
    />
  )

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <AuthorityDetailRenderer
        domain={domain}
        topic={topic!}
        locale={locale}
        // MC-05: every Marriage topic renders FAQ answers and accordion bodies in server HTML
        // (native <details>, collapsed by default). A landing config can still set its own ssrFaq.
        ssrFaq={landing?.ssrFaq ?? true}
        {...(landing && {
          // A Short with placement 'after-lead' (free-tool pages) sits right after the top lead unit,
          // before the first article section; report-led pages carry their Short inside the lead card.
          lead: (
            <>
              <TopicLandingLead config={landing} locale={locale} />
              {shortCard && landing.inlineVideo?.placement === 'after-lead' && shortCard}
            </>
          ),
          beforeFaq: <TopicLandingContextLinks config={landing} domain={domain} locale={locale} />,
          longForm: landing.longForm,
          ...(landing.inlineTool && {
            afterSection: {
              sectionId: landing.inlineTool.afterSectionId,
              node: <LandingInlineTool tool={landing.inlineTool} locale={locale} />,
            },
          }),
          // Click-to-load Short inside the article (placement 'after-section'); after any inline tool there.
          ...(shortCard && landing.inlineVideo?.placement !== 'after-lead' && landing.inlineVideo?.afterSectionId && {
            afterSections: [{ sectionId: landing.inlineVideo.afterSectionId, node: shortCard }],
          }),
        })}
      />
    </>
  )
}
