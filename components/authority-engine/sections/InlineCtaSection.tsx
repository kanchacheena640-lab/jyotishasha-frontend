import Link from 'next/link'
import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import SectionShell from './SectionShell'

export default function InlineCtaSection({ section, locale }: SectionRendererProps) {
  return (
    <SectionShell section={section} locale={locale}>
      <div className="flex flex-wrap gap-3">
        {section.items.map(item =>
          item.href ? (
            <Link
              key={item.id}
              href={item.href}
              className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              {loc(item, 'label', locale)}
            </Link>
          ) : (
            <span
              key={item.id}
              className="inline-block px-5 py-2.5 rounded-xl text-sm text-gray-400 bg-white/[0.03]"
            >
              {loc(item, 'label', locale)}
            </span>
          )
        )}
      </div>
    </SectionShell>
  )
}
