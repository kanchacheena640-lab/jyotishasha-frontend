import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import SectionShell from './SectionShell'
import ItemBadge from './ItemBadge'

export default function TableSection({ section, locale }: SectionRendererProps) {
  const hasBadge = section.items.some(item => Boolean(item.badge))

  return (
    <SectionShell section={section} locale={locale}>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <tbody>
            {section.items.map((item, idx) => (
              <tr
                key={item.id}
                className={idx < section.items.length - 1 ? 'border-b border-white/10' : undefined}
              >
                <th
                  scope="row"
                  className="px-4 py-3 text-left font-medium text-white whitespace-nowrap w-1/3 align-top"
                >
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <span className="text-base shrink-0" aria-hidden="true">{item.icon}</span>
                    )}
                    {loc(item, 'label', locale)}
                  </div>
                </th>
                <td className="px-4 py-3 text-gray-400 leading-relaxed align-top">
                  {loc(item, 'body', locale)}
                </td>
                {hasBadge && (
                  <td className="px-4 py-3 text-right align-top">
                    <ItemBadge item={item} locale={locale} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  )
}
