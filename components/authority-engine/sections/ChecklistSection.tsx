import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { BADGE_VARIANT_META } from '@/lib/authority-engine/constants'
import SectionShell from './SectionShell'

export default function ChecklistSection({ section, locale }: SectionRendererProps) {
  return (
    <SectionShell section={section} locale={locale}>
      <ul className="space-y-3">
        {section.items.map(item => {
          const variant  = item.badgeVariant ?? 'neutral'
          const dotClass = BADGE_VARIANT_META[variant].dotClass

          return (
            <li key={item.id} className="flex items-start gap-3">
              <span
                className={`mt-[5px] w-2 h-2 rounded-full shrink-0 ${dotClass}`}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-sm text-gray-200 leading-relaxed">
                  {loc(item, 'label', locale)}
                </p>
                {item.body && (
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {loc(item, 'body', locale)}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </SectionShell>
  )
}
