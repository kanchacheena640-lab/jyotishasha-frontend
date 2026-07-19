import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import SectionShell from './SectionShell'

export default function ListSection({ section, locale }: SectionRendererProps) {
  return (
    <SectionShell section={section} locale={locale}>
      <ul className="space-y-3">
        {section.items.map(item => (
          <li key={item.id} className="flex items-start gap-3">
            {item.icon && (
              <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
            )}
            <div className="min-w-0">
              <p className="text-sm text-white leading-relaxed">
                {loc(item, 'label', locale)}
              </p>
              {item.body && (
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  {loc(item, 'body', locale)}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
