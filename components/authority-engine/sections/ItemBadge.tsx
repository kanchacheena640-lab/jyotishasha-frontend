import type { SectionItem, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { BADGE_VARIANT_META } from '@/lib/authority-engine/constants'

interface ItemBadgeProps {
  item: SectionItem
  locale: Locale
}

export default function ItemBadge({ item, locale }: ItemBadgeProps) {
  if (!item.badge || !item.badgeVariant) return null
  const text = loc(item, 'badge', locale)
  if (!text) return null
  const meta = BADGE_VARIANT_META[item.badgeVariant]
  return (
    <span className={`inline-flex shrink-0 items-center text-xs font-medium px-2 py-0.5 rounded-full ${meta.badgeClass}`}>
      {text}
    </span>
  )
}
