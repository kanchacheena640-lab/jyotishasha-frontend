import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { BADGE_VARIANT_META } from '@/lib/authority-engine/constants'
import SectionShell from './SectionShell'

export default function AlertSection({ section, locale }: SectionRendererProps) {
  return (
    <SectionShell section={section} locale={locale}>
      <div className="space-y-3">
        {section.items.map(item => {
          const variant       = item.badgeVariant ?? 'warning'
          const meta          = BADGE_VARIANT_META[variant]
          const severityLabel = locale === 'hi' ? meta.label_hi : meta.label

          return (
            <div key={item.id} className={`rounded-xl border p-4 ${meta.badgeClass}`}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                {severityLabel}
              </p>
              <p className="text-sm font-medium leading-snug">
                {loc(item, 'label', locale)}
              </p>
              {item.body && (
                <p className="text-xs mt-1.5 leading-relaxed opacity-80">
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
