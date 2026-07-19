// components/authority-engine/TopicHero.tsx
import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { DOMAIN_ACCENT } from '@/lib/authority-engine/constants'

interface Props {
  domain: AuthorityDomain
  topic: AuthorityTopic
  locale: Locale
}

export default function TopicHero({ domain, topic, locale }: Props) {
  const accent = DOMAIN_ACCENT[domain.accentColor]

  return (
    <header className={`mb-10 p-6 rounded-2xl border ${accent.border} ${accent.bg}`}>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {loc(topic, 'title', locale)}
      </h1>
      <p className="text-gray-400">
        {loc(topic, 'subtitle', locale)}
      </p>
    </header>
  )
}
