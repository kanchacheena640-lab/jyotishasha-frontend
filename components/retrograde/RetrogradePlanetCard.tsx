import Link from "next/link"
import type { RetrogradePlanetCard as RetrogradePlanetCardType } from "@/lib/retrograde/types"

interface Props {
  card: RetrogradePlanetCardType
  isHi: boolean
  langPath: string
}

const STATUS_BADGE: Record<
  RetrogradePlanetCardType["status"],
  { en: string; hi: string; className: string }
> = {
  "retrograde-capable": {
    en: "Retrograde Capable",
    hi: "वक्री होने में सक्षम",
    className: "bg-emerald-100 text-emerald-800",
  },
  "never-retrograde": {
    en: "Never Retrograde",
    hi: "कभी वक्री नहीं",
    className: "bg-slate-100 text-slate-600",
  },
  "always-apparent-retrograde": {
    en: "Always Apparent Retrograde",
    hi: "सदा वक्री (आभासी)",
    className: "bg-amber-100 text-amber-800",
  },
}

export default function RetrogradePlanetCard({
  card,
  isHi,
  langPath,
}: Props) {
  const t = (en: string, hi: string) => (isHi ? hi : en)
  const badge = STATUS_BADGE[card.status]

  return (
    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 flex flex-col gap-3 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{card.icon}</span>
        <span className="font-bold text-white text-lg">
          {t(card.planet, card.planet_hi)}
        </span>
      </div>

      <span
        className={`self-start text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full ${badge.className}`}
      >
        {t(badge.en, badge.hi)}
      </span>

      {card.avgDuration && (
        <p className="text-white/60 text-sm">
          {t(card.avgDuration, card.avgDuration_hi ?? card.avgDuration)}
          {" · "}
          {t(card.frequency ?? "", card.frequency_hi ?? card.frequency ?? "")}
        </p>
      )}

      {card.summary && (
        <p className="text-white/80 text-sm leading-relaxed">
          {t(card.summary, card.summary_hi)}
        </p>
      )}

      {card.detailSlug && (
        <Link
          href={`${langPath}/${card.detailSlug}`}
          className="mt-auto text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-colors"
        >
          {t(`${card.planet} Retrograde Guide`, `${card.planet_hi} वक्री गाइड`)} →
        </Link>
      )}
    </div>
  )
}
