// components/authority-engine/AuthorityBreadcrumb.tsx
import Link from 'next/link'
import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { UI_LABELS } from '@/lib/authority-engine/constants'

interface Props {
  domain: AuthorityDomain
  topic: AuthorityTopic | null
  locale: Locale
  /** Home link override, e.g. '/hi' (the final URL; '/hi/' 308-redirects). Default unchanged. */
  homeHref?: string
  /** 'editorial' = the opt-in ivory article template: list markup, aria-current, 44px targets. */
  variant?: 'editorial'
}

export default function AuthorityBreadcrumb({ domain, topic, locale, homeHref, variant }: Props) {
  const localePath = locale === 'hi' ? '/hi' : ''

  const crumbs = [
    { label: UI_LABELS.home[locale],          href: homeHref ?? `${localePath}/` },
    { label: loc(domain, 'label', locale),    href: `${localePath}${domain.basePath}` },
    ...(topic ? [{ label: loc(topic, 'title', locale), href: null }] : []),
  ]

  if (variant === 'editorial') {
    return (
      <nav aria-label={locale === 'hi' ? 'ब्रेडक्रम्ब' : 'Breadcrumb'} className="mb-4">
        <ol className="flex flex-wrap items-center gap-x-1 text-[14px] leading-6 text-[#5B667D]">
          {crumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-x-1">
              {i > 0 && <span aria-hidden="true">›</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center px-1 font-medium text-[#A8461F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="px-1 py-2.5 font-medium text-[#1B2A4A]">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }

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
