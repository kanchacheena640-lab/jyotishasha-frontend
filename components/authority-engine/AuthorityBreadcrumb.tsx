// components/authority-engine/AuthorityBreadcrumb.tsx
import Link from 'next/link'
import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { UI_LABELS } from '@/lib/authority-engine/constants'

interface Props {
  domain: AuthorityDomain
  topic: AuthorityTopic | null
  locale: Locale
}

export default function AuthorityBreadcrumb({ domain, topic, locale }: Props) {
  const localePath = locale === 'hi' ? '/hi' : ''

  const crumbs = [
    { label: UI_LABELS.home[locale],          href: `${localePath}/` },
    { label: loc(domain, 'label', locale),    href: `${localePath}${domain.basePath}` },
    ...(topic ? [{ label: loc(topic, 'title', locale), href: null }] : []),
  ]

  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-gray-300 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-300">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
