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
  authorityHomeUrl,
} from '@/lib/authority-engine/seo'
import type { AnyTopicLandingConfig, TopicLandingConfig } from '@/lib/authority-engine/landing-types'
import {
  EditorialLead, EditorialRelatedGuides, EditorialVideo,
} from '@/components/authority-engine/editorial/EditorialArticle'
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

/** The editorial template needs a report-led landing (direct answer + offer). */
function editorialLanding(landing: AnyTopicLandingConfig | undefined): TopicLandingConfig | null {
  return landing?.theme === 'editorial' && landing.offer ? (landing as TopicLandingConfig) : null
}

/**
 * Editorial side-column rows for the video: from its own section to the last article-column item
 * before the FAQ. Article-column items = every section plus any inline tool rendered after one.
 */
function editorialVideoRows(sections: { id: string; layout: string }[], videoSectionId: string, inlineToolSectionId?: string): string {
  let row = 0
  let startRow = 1
  for (const s of sections) {
    if (s.layout === 'faq') break
    row += 1
    if (s.id === videoSectionId) startRow = row
    if (s.id === inlineToolSectionId) row += 1
  }
  return `${startRow} / span ${Math.max(1, row - startRow + 1)}`
}

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

  // Home crumb = the final URL ('/hi/' 308-redirects to '/hi'); the visible breadcrumb uses the same.
  const breadcrumbSchema = buildAuthorityBreadcrumbSchema(domain, topic!, locale, authorityHomeUrl(locale))
  const breadcrumbHomeHref = locale === 'hi' ? '/hi' : '/'
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

  // Opt-in editorial article template (docs/seo/JYOTISHASHA_ARTICLE_STANDARD.md); all other topics as before.
  const editorial = editorialLanding(landing)
  // Editorial: an inline Spouse Lagna tool flagged `editorialHero` leads the hero instead of the article.
  const editorialTool = editorial?.inlineTool
  const heroTool = editorialTool?.kind === 'spouse-lagna' && editorialTool.editorialHero ? editorialTool : undefined
  const articleTool = heroTool ? undefined : editorialTool

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
      {editorial ? (
        <AuthorityDetailRenderer
          domain={domain}
          topic={topic!}
          locale={locale}
          theme="editorial"
          breadcrumbHomeHref={breadcrumbHomeHref}
          ssrFaq={editorial.ssrFaq}
          lead={(
            <EditorialLead
              config={editorial}
              topic={topic!}
              locale={locale}
              {...(heroTool && { heroTool: <LandingInlineTool tool={heroTool} locale={locale} variant="editorial" /> })}
            />
          )}
          related={<EditorialRelatedGuides config={editorial} domain={domain} topic={topic!} locale={locale} />}
          {...(articleTool && {
            afterSection: {
              sectionId: articleTool.afterSectionId,
              node: <LandingInlineTool tool={articleTool} locale={locale} />,
            },
          })}
          {...(editorial.video?.articleSectionId && {
            afterSections: [{
              sectionId: editorial.video.articleSectionId,
              node: (
                <EditorialVideo
                  video={editorial.video}
                  locale={locale}
                  gridRows={editorialVideoRows(topic!.sections, editorial.video.articleSectionId, articleTool?.afterSectionId)}
                />
              ),
            }],
          })}
        />
      ) : (
      <AuthorityDetailRenderer
        domain={domain}
        topic={topic!}
        locale={locale}
        breadcrumbHomeHref={breadcrumbHomeHref}
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
      )}
    </>
  )
}
