// components/authority-engine/AuthorityHubRenderer.tsx
import type { AuthorityHubProps } from '@/lib/authority-engine/types'
import { getFeaturedTopics, getAllTopics } from '@/lib/authority-engine/resolver'
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
