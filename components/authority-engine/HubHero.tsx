// components/authority-engine/HubHero.tsx
import type { AuthorityDomain, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'

interface Props {
  domain: AuthorityDomain
  locale: Locale
}

export default function HubHero({ domain, locale }: Props) {
  return (
    <header className="mb-12 text-center">
      <p className="text-3xl mb-3">{domain.icon}</p>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
        {loc(domain, 'hubTitle', locale)}
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        {loc(domain, 'hubSubtitle', locale)}
      </p>
    </header>
  )
}
