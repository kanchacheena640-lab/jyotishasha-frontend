// components/authority-engine/RelatedTopics.tsx
// Auto-related topics section. Topics are pre-ranked by resolver — this component only renders.

import type { AuthorityTopic, Locale, DomainAccentColor } from '@/lib/authority-engine/types'
import { UI_LABELS } from '@/lib/authority-engine/constants'
import TopicCard from './TopicCard'

interface Props {
  topics: AuthorityTopic[]
  basePath: string
  locale: Locale
  accentColor: DomainAccentColor
}

export default function RelatedTopics({ topics, basePath, locale, accentColor }: Props) {
  if (topics.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-purple-900/30">
      <h2 className="text-lg font-semibold text-white mb-5">
        {UI_LABELS.relatedTopics[locale]}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {topics.map(topic => (
          <TopicCard
            key={topic.slug}
            topic={topic}
            basePath={basePath}
            locale={locale}
            accentColor={accentColor}
          />
        ))}
      </div>
    </section>
  )
}
