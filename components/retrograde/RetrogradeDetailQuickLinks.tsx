import Link from "next/link"

interface Props {
  planetSlug: string
  planet: string
  planet_hi: string
  isHi: boolean
  langPath: string
}

export default function RetrogradeDetailQuickLinks({
  planetSlug,
  planet,
  planet_hi,
  isHi,
  langPath,
}: Props) {
  const t = (en: string, hi: string) => (isHi ? hi : en)

  return (
    <section className="my-6 border border-indigo-100 rounded-xl p-4 bg-indigo-50/50">
      <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-3">
        {t("Quick Links", "त्वरित लिंक")}
      </h3>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Link
          href={`${langPath}/tools/lagna-finder`}
          className="text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
        >
          {t("Find Your Lagna", "अपना लग्न जानें")} →
        </Link>
        <Link
          href={`${langPath}/${planetSlug}-transit`}
          className="text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
        >
          {t(`${planet} Transit Guide`, `${planet_hi} गोचर गाइड`)} →
        </Link>
        <Link
          href={`${langPath}/free-kundali`}
          className="text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
        >
          {t("Get Your Full Birth Chart", "पूरी जन्म कुंडली बनाएं")} →
        </Link>
      </div>
    </section>
  )
}
