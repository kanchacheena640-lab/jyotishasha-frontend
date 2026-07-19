// components/authority-engine/CtaBlock.tsx
// Single component for all CTA types — href, labels, and action text resolved from constants.

import Link from 'next/link'
import type { Cta, Locale, DomainAccentColor } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { DOMAIN_ACCENT, CTA_TYPE_LABELS, CTA_ACTION_LABELS, CTA_BASE_PATHS } from '@/lib/authority-engine/constants'

interface Props {
  cta: Cta
  locale: Locale
  isPrimary: boolean
  accentColor: DomainAccentColor
}

export default function CtaBlock({ cta, locale, isPrimary, accentColor }: Props) {
  const accent      = DOMAIN_ACCENT[accentColor]
  const typeLabel   = CTA_TYPE_LABELS[cta.type]
  const actionLabel = CTA_ACTION_LABELS[cta.type]
  const localePath  = locale === 'hi' ? '/hi' : ''

  const href = cta.type === 'tool'
    ? `${localePath}${CTA_BASE_PATHS.tool}/${cta.slug}`
    : `${CTA_BASE_PATHS.report}/${cta.slug}`

  return (
    <div className={`my-8 rounded-2xl p-6 border transition-colors
      ${isPrimary ? `${accent.border} ${accent.bg}` : 'border-gray-700/50 bg-[#1a1744]/30'}`}
    >
      <p className={`text-xs font-semibold uppercase tracking-wider mb-1
        ${isPrimary ? accent.text : 'text-gray-500'}`}
      >
        {typeLabel[locale]}
      </p>

      <h3 className="text-lg font-bold text-white mb-1">
        {loc(cta, 'label', locale)}
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        {loc(cta, 'description', locale)}
      </p>

      <Link
        href={href}
        className={`inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors
          ${isPrimary ? accent.button : 'bg-white/10 hover:bg-white/20'}`}
      >
        {actionLabel[locale]} →
      </Link>
    </div>
  )
}
