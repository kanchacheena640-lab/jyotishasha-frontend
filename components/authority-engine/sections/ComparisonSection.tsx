import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { BADGE_VARIANT_META } from '@/lib/authority-engine/constants'
import SectionShell from './SectionShell'
import ItemBadge from './ItemBadge'

export default function ComparisonSection({ section, locale }: SectionRendererProps) {
  return (
    <SectionShell section={section} locale={locale}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {section.items.map(item => {
          const variant     = item.badgeVariant ?? 'neutral'
          const borderClass = BADGE_VARIANT_META[variant].borderClass

          return (
            <div
              key={item.id}
              className={`rounded-xl border ${borderClass} bg-white/[0.03] p-5`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  {item.icon && (
                    <span className="text-xl shrink-0" aria-hidden="true">{item.icon}</span>
                  )}
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {loc(item, 'label', locale)}
                  </h3>
                </div>
                <ItemBadge item={item} locale={locale} />
              </div>
              {item.body && (
                <p className="text-xs text-gray-400 leading-relaxed">
                  {loc(item, 'body', locale)}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}
