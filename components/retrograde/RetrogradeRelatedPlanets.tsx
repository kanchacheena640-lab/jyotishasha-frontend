import Link from "next/link"
import type { RetrogradePlanetData } from "@/lib/retrograde/types"

interface Props {
  related: RetrogradePlanetData[]
  isHi: boolean
  langPath: string
}

export default function RetrogradeRelatedPlanets({
  related,
  isHi,
  langPath,
}: Props) {
  const t = (en: string, hi: string) => (isHi ? hi : en)

  if (related.length === 0) return null

  return (
    <section className="my-8">
      <h2 className="text-lg font-bold mb-4 text-indigo-900">
        {t("Other Retrograde Planets", "अन्य वक्री ग्रह")}
      </h2>
      <div className="flex flex-wrap gap-3">
        {related.map((planet) => (
          <Link
            key={planet.planetSlug}
            href={`${langPath}/${planet.routeSlug}`}
            className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-semibold hover:bg-indigo-100 transition-colors"
          >
            {t(planet.planet, planet.planet_hi)}
          </Link>
        ))}
      </div>
    </section>
  )
}
