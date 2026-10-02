// components/authority-engine/AuthorityHubRenderer.tsx
import Link from 'next/link'
import type { AuthorityHubProps } from '@/lib/authority-engine/types'
import { getFeaturedTopics, getAllTopics } from '@/lib/authority-engine/resolver'
import { loc } from '@/lib/authority-engine/i18n'
import HubHero from './HubHero'
import FeaturedTopicsRow from './FeaturedTopicsRow'
import FilterableTopicGrid from './FilterableTopicGrid'

export default function AuthorityHubRenderer({ domain, locale }: AuthorityHubProps) {
  const featured  = getFeaturedTopics(domain)
  const allTopics = getAllTopics(domain)

  return (
    <main className="min-h-screen bg-[#0b1120] text-white pt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <HubHero domain={domain} locale={locale} />
        {domain.hubLinks && domain.hubLinks.length > 0 && (
          <div className="-mt-6 mb-12 flex flex-wrap justify-center gap-3">
            {domain.hubLinks.map(link => (
              <Link
                key={link.href}
                href={`${locale === 'hi' ? '/hi' : ''}${link.href}`}
                className="text-sm text-purple-300 hover:text-white bg-[#1e1b4b] hover:bg-[#2a2565] border border-purple-900/50 hover:border-purple-500 px-4 py-2 rounded-lg transition-all"
              >
                {loc(link, 'label', locale)}
              </Link>
            ))}
          </div>
        )}
        <FeaturedTopicsRow topics={featured} domain={domain} locale={locale} />
        <FilterableTopicGrid
          topics={allTopics}
          categories={domain.categories}
          basePath={domain.basePath}
          locale={locale}
          accentColor={domain.accentColor}
        />
      </div>
    </main>
  )
}
