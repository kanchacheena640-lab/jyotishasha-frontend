// components/authority-engine/TopicCard.tsx
// Used in: hub grid, featured row, related topics section.

import Link from 'next/link'
import type { AuthorityTopic, Locale, DomainAccentColor } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { DOMAIN_ACCENT } from '@/lib/authority-engine/constants'

interface Props {
  topic: AuthorityTopic
  basePath: string
  locale: Locale
  accentColor: DomainAccentColor
}

export default function TopicCard({ topic, basePath, locale, accentColor }: Props) {
  const accent      = DOMAIN_ACCENT[accentColor]
  const localePath  = locale === 'hi' ? '/hi' : ''
  const href        = `${localePath}${basePath}/${topic.slug}`
  const title       = loc(topic, 'title', locale)
  const subtitle    = loc(topic, 'subtitle', locale)

  return (
    <Link
      href={href}
      className={`group block rounded-2xl border p-5 transition-all duration-300
        bg-gradient-to-br from-[#1e1b4b] to-[#312e81]
        ${accent.border} hover:shadow-lg hover:shadow-black/20`}
    >
      <h3 className={`text-sm font-semibold text-white mb-2 leading-snug
        group-hover:${accent.text} transition-colors line-clamp-2`}
      >
        {title}
      </h3>

      {subtitle && (
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
          {subtitle}
        </p>
      )}

      <span className={`mt-3 inline-flex items-center text-xs font-medium ${accent.text}`}>
        Read more →
      </span>
    </Link>
  )
}
