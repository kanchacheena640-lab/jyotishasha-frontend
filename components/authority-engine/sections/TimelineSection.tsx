import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { BADGE_VARIANT_META } from '@/lib/authority-engine/constants'
import SectionShell from './SectionShell'
import ItemBadge from './ItemBadge'

export default function TimelineSection({ section, locale }: SectionRendererProps) {
  return (
    <SectionShell section={section} locale={locale}>
      <ol className="relative border-l border-white/10 pl-6 space-y-8">
        {section.items.map(item => {
          const variant  = item.badgeVariant ?? 'neutral'
          const dotClass = BADGE_VARIANT_META[variant].dotClass

          return (
            <li key={item.id} className="relative">
              <span
                className={`absolute -left-[1.4375rem] top-1 w-3 h-3 rounded-full border-2 border-[#0b1120] ${dotClass}`}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {item.icon && (
                  <span className="text-base shrink-0" aria-hidden="true">{item.icon}</span>
                )}
                <h3 className="text-sm font-semibold text-white">
                  {loc(item, 'label', locale)}
                </h3>
                <ItemBadge item={item} locale={locale} />
              </div>
              {item.body && (
                <p className="text-xs text-gray-400 leading-relaxed">
                  {loc(item, 'body', locale)}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </SectionShell>
  )
}
