// components/authority-engine/landing/TopicLandingContextLinks.tsx
// Server component: a short contextual block (rendered just before the FAQ)
// that hands sibling intents to their dedicated pages with crawlable,
// locale-aware links labelled by the target topics' own titles.

import Link from 'next/link'
import type { AuthorityDomain, Locale } from '@/lib/authority-engine/types'
import type { TopicLandingConfig } from '@/lib/authority-engine/landing-types'
import { loc } from '@/lib/authority-engine/i18n'

interface Props {
  config: TopicLandingConfig
  domain: AuthorityDomain
  locale: Locale
}

export default function TopicLandingContextLinks({ config, domain, locale }: Props) {
  const { contextLinks } = config
  const localePath = locale === 'hi' ? '/hi' : ''
  const href = (slug: string) => `${localePath}${domain.basePath}/${slug}`
  const links = contextLinks.topicSlugs.map(slug => domain.topics[slug] ? { slug, topic: domain.topics[slug] } : null)
    .filter((l): l is NonNullable<typeof l> => l !== null)
  const overview = domain.topics[contextLinks.overviewSlug]

  return (
    <section className="mb-10">
      <h2 className="mb-3 border-l-[3px] border-rose-500/70 pl-3 text-[22px] font-bold leading-snug text-white md:text-2xl">{contextLinks.heading[locale]}</h2>
      <p className="text-base leading-7 text-gray-300">{contextLinks.body[locale]}</p>
      <ul className="mt-3 space-y-2">
        {links.map(({ slug, topic }) => (
          <li key={slug}>
            <Link
              href={href(slug)}
              className="inline-flex min-h-[44px] items-center text-base font-medium text-rose-300 underline underline-offset-4 hover:text-rose-200"
            >
              {loc(topic, 'title', locale)} →
            </Link>
          </li>
        ))}
      </ul>
      {overview && (
        <p className="mt-4 text-base leading-7 text-gray-300">
          {contextLinks.overviewLead[locale]}{' '}
          <Link href={href(contextLinks.overviewSlug)} className="font-medium text-rose-300 underline underline-offset-4 hover:text-rose-200">
            {loc(overview, 'title', locale)}
          </Link>
          .
        </p>
      )}
    </section>
  )
}
