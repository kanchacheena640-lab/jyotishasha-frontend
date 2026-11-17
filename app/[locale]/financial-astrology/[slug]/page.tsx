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
  authorityHomeUrl,
} from '@/lib/authority-engine/seo'
import AuthorityDetailRenderer from '@/components/authority-engine/AuthorityDetailRenderer'
import FinancialCtaPanel from '@/components/authority-engine/financial/FinancialCtaPanel'
import FinancialContextLink from '@/components/authority-engine/financial/FinancialContextLink'
import { resolveFinancialContextLinks } from '@/lib/domains/financial-astrology/_contextLinks'
import { resolveFinancialCtas } from '@/lib/domains/financial-astrology/_ctas'
import { buildFinancialArticleSchema, buildFinancialFaqPageSchema } from '@/lib/domains/financial-astrology/_schema'

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

  // Home crumb = the final URL ('/hi/' 308-redirects to '/hi'); the visible breadcrumb uses the same.
  const breadcrumbSchema = buildAuthorityBreadcrumbSchema(domain, topic!, locale, authorityHomeUrl(locale))
  const breadcrumbHomeHref = locale === 'hi' ? '/hi' : '/'
  // Financial-scoped Article: shared builder + Organization author + canonical mainEntityOfPage, no empty fields.
  const articleSchema    = buildFinancialArticleSchema(domain, topic!, locale)
  // FAQPage built from the same FAQ items the page renders in server HTML (null when a guide has no FAQ).
  const faqSchema        = buildFinancialFaqPageSchema(topic!, locale)

  // Financial CTAs (base report, focused report, free tool) replace the topic CtaBlocks in the
  // same position: right after the last content section, before the related topics.
  const lastSectionId = topic!.sections[topic!.sections.length - 1].id
  const ctaPanel = <FinancialCtaPanel cards={resolveFinancialCtas(topic!, locale)} />
  // Contextual links to other Financial guides (only guides listed in _contextLinks.ts get any).
  const contextSlots = resolveFinancialContextLinks(domain, topic!, locale)
    .map(link => ({ sectionId: link.afterSectionId, node: <FinancialContextLink link={link} /> }))

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
        omitCtaSlugs={topic!.ctas.map(cta => cta.slug)}
        afterSection={{ sectionId: lastSectionId, node: ctaPanel }}
        afterSections={contextSlots.length > 0 ? contextSlots : undefined}
        breadcrumbHomeHref={breadcrumbHomeHref}
        // FAQ answers and accordion bodies in server HTML (native <details>, collapsed by default).
        ssrFaq
        // <main lang="hi"> on Hindi guides (the root <html> is shared and always "en").
        markContentLang
      />
    </>
  )
}
