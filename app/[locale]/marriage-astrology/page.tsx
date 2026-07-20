// app/[locale]/marriage-astrology/page.tsx
// Hub route for Marriage Astrology.
// DOMAIN_SLUG is the only hardcoded value — all rendering and SEO flows from the engine.

import type { Metadata } from 'next'
import type { Locale } from '@/lib/authority-engine/types'
import { getAuthorityDomain } from '@/lib/authority-engine/resolver'
import { generateAuthorityHubMetadata } from '@/lib/authority-engine/seo'
import AuthorityHubRenderer from '@/components/authority-engine/AuthorityHubRenderer'

const DOMAIN_SLUG = 'marriage-astrology'

export const revalidate = 86400

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = (params.locale === 'hi' ? 'hi' : 'en') as Locale
  return generateAuthorityHubMetadata(getAuthorityDomain(DOMAIN_SLUG), locale)
}

export default function MarriageAstrologyHub({
  params,
}: {
  params: { locale: string }
}) {
  const locale = (params.locale === 'hi' ? 'hi' : 'en') as Locale
  return <AuthorityHubRenderer domain={getAuthorityDomain(DOMAIN_SLUG)} locale={locale} />
}
