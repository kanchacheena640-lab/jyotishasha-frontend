interface QuickFact {
  label: string
  value: string
}

interface Props {
  facts: QuickFact[]
}

export default function QuickFactsCard({ facts }: Props) {
  const statFacts = facts.slice(0, 3)
  const featured = facts[3]

  return (
    <div className="my-6 space-y-3">
      {/* Three short-value stat cards — size naturally with content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {statFacts.map((fact) => (
          <div key={fact.label} className="bg-indigo-50 rounded-xl p-4">
            <span className="block text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">
              {fact.label}
            </span>
            <span className="text-sm font-bold text-indigo-900 leading-snug">
              {fact.value || "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Classical View — full-width, long text split into readable sentences */}
      {featured && (
        <div className="bg-indigo-50 rounded-xl p-4">
          <span className="block text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-2">
            {featured.label}
          </span>
          {featured.value ? (
            <ul className="space-y-1.5 list-none">
              {featured.value.split(";").map((part, i) => {
                const text = part.trim()
                return text ? (
                  <li key={i} className="text-sm text-indigo-900 leading-relaxed flex gap-2">
                    <span className="text-indigo-400 shrink-0 mt-0.5">›</span>
                    <span>{text}</span>
                  </li>
                ) : null
              })}
            </ul>
          ) : (
            <p className="text-sm text-indigo-900">—</p>
          )}
        </div>
      )}
    </div>
  )
}
