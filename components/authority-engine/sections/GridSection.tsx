import { SectionLayout } from '@/lib/authority-engine/types'
import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { SECTION_LAYOUT_CONFIG, GRID_COLS_CLASS } from '@/lib/authority-engine/constants'
import SectionShell from './SectionShell'

export default function GridSection({ section, locale }: SectionRendererProps) {
  const columns = (section.columns ?? SECTION_LAYOUT_CONFIG[SectionLayout.Grid].defaultColumns) as 1 | 2 | 3 | 4

  return (
    <SectionShell section={section} locale={locale}>
      <div className={`grid gap-3 ${GRID_COLS_CLASS[columns]}`}>
        {section.items.map(item => (
          <div
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 flex items-center gap-3"
          >
            {item.icon && (
              <span className="text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-white leading-snug">
                {loc(item, 'label', locale)}
              </p>
              {item.body && (
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                  {loc(item, 'body', locale)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
