'use client'
// components/authority-engine/FilterableTopicGrid.tsx
// Client component — manages category filter state and renders the topic grid.

import { useState } from 'react'
import type { AuthorityTopic, CategoryConfig, Locale, DomainAccentColor } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { DOMAIN_ACCENT, UI_LABELS } from '@/lib/authority-engine/constants'
import TopicCard from './TopicCard'

interface Props {
  topics: AuthorityTopic[]
  categories: CategoryConfig[]
  basePath: string
  locale: Locale
  accentColor: DomainAccentColor
}

export default function FilterableTopicGrid({
  topics,
  categories,
  basePath,
  locale,
  accentColor,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const accent = DOMAIN_ACCENT[accentColor]

  const filtered = activeCategory
    ? topics.filter(t => t.category === activeCategory)
    : topics

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order)

  return (
    <section className="mt-12">
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? `${accent.button} text-white`
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          {UI_LABELS.allTopics[locale]}
        </button>
        {sortedCategories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? `${accent.button} text-white`
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {cat.icon} {loc(cat, 'label', locale)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(topic => (
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
