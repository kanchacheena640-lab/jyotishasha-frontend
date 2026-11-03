// components/authority-engine/TopicHero.tsx
import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { DOMAIN_ACCENT } from '@/lib/authority-engine/constants'

interface Props {
  domain: AuthorityDomain
  topic: AuthorityTopic
  locale: Locale
  /** 'editorial' = the opt-in ivory article template (no card around the title). */
  variant?: 'editorial'
}

export default function TopicHero({ domain, topic, locale, variant }: Props) {
  const accent = DOMAIN_ACCENT[domain.accentColor]
  const editorial = variant === 'editorial'
  const headerClass = editorial ? 'mb-8' : `mb-10 p-6 rounded-2xl border ${accent.border} ${accent.bg}`
  const titleClass = editorial
    ? 'mb-3 max-w-4xl text-[30px] md:text-[40px] font-bold leading-tight tracking-tight text-[#1B2A4A] [text-wrap:balance]'
    : 'text-2xl md:text-3xl font-bold text-white mb-2'
  const subtitleClass = editorial ? 'max-w-[46rem] text-[17px] leading-[1.75] text-[#45516A]' : 'text-gray-400'

  return (
    <header className={headerClass}>
      <h1 className={titleClass}>
        {loc(topic, 'title', locale)}
      </h1>
      <p className={subtitleClass}>
        {loc(topic, 'subtitle', locale)}
      </p>
    </header>
  )
}
