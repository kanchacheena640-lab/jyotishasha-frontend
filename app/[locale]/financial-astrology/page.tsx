// app/[locale]/financial-astrology/page.tsx
// Hub route for Financial Astrology.
// DOMAIN_SLUG is the only hardcoded value — all rendering and SEO flows from the engine.

import type { Metadata } from 'next'
import type { Locale } from '@/lib/authority-engine/types'
import { getAuthorityDomain } from '@/lib/authority-engine/resolver'
import { authorityHomeUrl, buildAuthorityBreadcrumbSchema, generateAuthorityHubMetadata } from '@/lib/authority-engine/seo'
import { loc } from '@/lib/authority-engine/i18n'
import IntentHubRenderer from '@/components/authority-engine/IntentHubRenderer'
import { financialAstrologyHub } from '@/lib/domains/financial-astrology/_hub'

const DOMAIN_SLUG = 'financial-astrology'

export const revalidate = 86400

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = (params.locale === 'hi' ? 'hi' : 'en') as Locale
  const base = generateAuthorityHubMetadata(getAuthorityDomain(DOMAIN_SLUG), locale)
  // Hub-specific title/description; canonical, hreflang and the rest stay the engine's.
  const title = loc(financialAstrologyHub, 'seoTitle', locale) || base.title
  const description = loc(financialAstrologyHub, 'metaDescription', locale) || base.description
  return { ...base, title, description, openGraph: { ...base.openGraph, title: title ?? undefined, description: description ?? undefined } }
}

export default function FinancialAstrologyHub({
  params,
}: {
  params: { locale: string }
}) {
  const locale = (params.locale === 'hi' ? 'hi' : 'en') as Locale
  const domain = getAuthorityDomain(DOMAIN_SLUG)
  // Home -> Financial Astrology; matches the visible breadcrumb in IntentHubRenderer.
  const breadcrumbSchema = buildAuthorityBreadcrumbSchema(domain, null, locale, authorityHomeUrl(locale))
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IntentHubRenderer
        domain={domain}
        hub={financialAstrologyHub}
        locale={locale}
      />
    </>
  )
}
