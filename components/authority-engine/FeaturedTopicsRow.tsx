// components/authority-engine/FeaturedTopicsRow.tsx
import type { AuthorityTopic, AuthorityDomain, Locale } from '@/lib/authority-engine/types'
import { UI_LABELS } from '@/lib/authority-engine/constants'
import TopicCard from './TopicCard'

interface Props {
  topics: AuthorityTopic[]
  domain: AuthorityDomain
  locale: Locale
}

export default function FeaturedTopicsRow({ topics, domain, locale }: Props) {
  if (topics.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
        {UI_LABELS.featuredTopics[locale]}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topics.map(topic => (
          <TopicCard
            key={topic.slug}
            topic={topic}
            basePath={domain.basePath}
            locale={locale}
            accentColor={domain.accentColor}
          />
        ))}
      </div>
    </section>
  )
}
