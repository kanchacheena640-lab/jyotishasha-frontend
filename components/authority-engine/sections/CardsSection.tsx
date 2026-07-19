import { SectionLayout } from '@/lib/authority-engine/types'
import type { SectionRendererProps, SectionItem, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { BADGE_VARIANT_META, SECTION_LAYOUT_CONFIG, GRID_COLS_CLASS } from '@/lib/authority-engine/constants'
import SectionShell from './SectionShell'
import ItemBadge from './ItemBadge'

function ItemCard({ item, locale }: { item: SectionItem; locale: Locale }) {
  const borderClass = item.badgeVariant
    ? BADGE_VARIANT_META[item.badgeVariant].borderClass
    : 'border-white/10'

  return (
    <article className={`rounded-xl border ${borderClass} bg-white/[0.03] p-5 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-3">
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
    </article>
  )
}

export default function CardsSection({ section, locale }: SectionRendererProps) {
  const columns = (section.columns ?? SECTION_LAYOUT_CONFIG[SectionLayout.Cards].defaultColumns) as 1 | 2 | 3 | 4

  return (
    <SectionShell section={section} locale={locale}>
      <div className={`grid gap-4 ${GRID_COLS_CLASS[columns]}`}>
        {section.items.map(item => (
          <ItemCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </SectionShell>
  )
}
