import Link from "next/link"
import type { RetrogradePlanetData } from "@/lib/retrograde/types"
import { getRetrogradeContent } from "@/lib/retrograde"
import QuickFactsCard from "./QuickFactsCard"
import RetrogradeDetailQuickLinks from "./RetrogradeDetailQuickLinks"
import RetrogradeRelatedPlanets from "./RetrogradeRelatedPlanets"

interface Props {
  data: RetrogradePlanetData
  isHi: boolean
  langPath: string
}

export default function RetrogradeDetailPageRenderer({
  data,
  isHi,
  langPath,
}: Props) {
  const t = (en: string, hi: string) => (isHi ? hi : en)

  function Placeholder() {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-5 text-gray-400 text-sm italic">
        {t("Content coming soon.", "सामग्री शीघ्र आएगी।")}
      </div>
    )
  }

  const relatedPlanets = data.related.otherRetrogradePlanets
    .map((slug) => getRetrogradeContent(slug))
    .filter((p): p is RetrogradePlanetData => p !== null)

  const pageTitle = t(
    data.title || `${data.planet} Retrograde in Vedic Astrology`,
    data.title_hi || `वक्री ${data.planet_hi} — वैदिक ज्योतिष`,
  )

  const quickFacts = [
    {
      label: t("Average Duration", "औसत अवधि"),
      value: t(data.avgDuration, data.avgDuration_hi),
    },
    {
      label: t("Frequency", "आवृत्ति"),
      value: t(data.frequency, data.frequency_hi),
    },
    {
      label: t("Sanskrit Name", "संस्कृत नाम"),
      value: t(data.vakri_name, data.vakri_name_hi),
    },
    {
      label: t("Classical View", "शास्त्रीय मत"),
      value:
        t(data.classicalPosition, data.classicalPosition_hi) ||
        t("— coming soon —", "— शीघ्र आएगा —"),
    },
  ]

  const dosItems = isHi ? data.dos_hi : data.dos
  const dontsItems = isHi ? data.donts_hi : data.donts
  const strengthItems = isHi ? data.strengths_hi : data.strengths
  const challengeItems = isHi ? data.challenges_hi : data.challenges
  const remedyItems = isHi ? data.remedies_hi : data.remedies

  const hasFaqs = data.faqs.length > 0
  const hasDiscover = data.discoverMore.length > 0

  const tocItems = [
    { id: "detail-intro", label: t(`What is ${data.planet} Retrograde?`, `${data.planet_hi} वक्री क्या है?`), show: true },
    { id: "detail-astronomy", label: t("The Astronomy", "खगोल विज्ञान"), show: true },
    { id: "detail-vedic", label: t("Vedic Meaning", "वैदिक व्याख्या"), show: true },
    { id: "detail-effects", label: t("General Life Effects", "सामान्य जीवन प्रभाव"), show: !!t(data.effectsGeneral, data.effectsGeneral_hi) },
    { id: "detail-career", label: t("Career & Finance", "करियर और वित्त"), show: !!t(data.effectsCareer, data.effectsCareer_hi) },
    { id: "detail-relationships", label: t("Relationships", "संबंध"), show: !!t(data.effectsRelationships, data.effectsRelationships_hi) },
    { id: "detail-health", label: t("Health", "स्वास्थ्य"), show: !!t(data.effectsHealth, data.effectsHealth_hi) },
    { id: "detail-dos", label: t("Do's & Don'ts", "क्या करें / न करें"), show: dosItems.length > 0 || dontsItems.length > 0 },
    { id: "detail-strengths", label: t("Strengths & Challenges", "शक्तियाँ व चुनौतियाँ"), show: strengthItems.length > 0 || challengeItems.length > 0 },
    { id: "detail-remedies", label: t("Remedies", "उपाय"), show: remedyItems.length > 0 },
    { id: "detail-faq", label: t("FAQs", "प्रश्नोत्तर"), show: hasFaqs },
    { id: "detail-discover", label: t("Discover More", "और जानें"), show: hasDiscover },
  ].filter((item) => item.show)

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-3xl px-4 md:px-10 py-8 md:py-14 shadow-2xl text-slate-900">
      {/* Breadcrumb */}
      <nav
        className="flex text-xs text-gray-500 mb-6 gap-1.5 flex-wrap items-center"
        aria-label={t("Breadcrumb", "ब्रेडक्रम्ब")}
      >
        <Link
          href={`${langPath}/`}
          className="hover:text-indigo-700 transition-colors"
        >
          {t("Home", "होम")}
        </Link>
        <span aria-hidden="true" className="text-gray-300">
          /
        </span>
        <Link
          href={`${langPath}/retrograde-planets`}
          className="hover:text-indigo-700 transition-colors"
        >
          {t("Retrograde Planets", "वक्री ग्रह")}
        </Link>
        <span aria-hidden="true" className="text-gray-300">
          /
        </span>
        <span className="text-indigo-700 font-bold">{pageTitle}</span>
      </nav>

      {/* H1 */}
      <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-indigo-900 text-balance">
        {pageTitle}
      </h1>

      {/* Quick Facts Grid */}
      <QuickFactsCard facts={quickFacts} />

      {/* Quick Links */}
      <RetrogradeDetailQuickLinks
        planetSlug={data.planetSlug}
        planet={data.planet}
        planet_hi={data.planet_hi}
        isHi={isHi}
        langPath={langPath}
      />

      {/* Table of Contents */}
      <nav
        aria-label={t("Table of Contents", "विषय सूची")}
        className="my-6 border border-indigo-100 rounded-xl p-4 bg-slate-50"
      >
        <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-3">
          {t("On This Page", "इस पृष्ठ पर")}
        </h3>
        <ol className="flex flex-col gap-1.5">
          {tocItems.map((item, i) => (
            <li key={item.id} className="flex gap-2 items-baseline">
              <span className="text-xs text-indigo-300 font-mono w-5 shrink-0 text-right">
                {i + 1}.
              </span>
              <a
                href={`#${item.id}`}
                className="text-sm text-indigo-700 hover:text-indigo-900 hover:underline transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* §1 What is [Planet] Retrograde? */}
      <section id="detail-intro" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t(
            `What is ${data.planet} Retrograde?`,
            `${data.planet_hi} वक्री क्या है?`,
          )}
        </h2>
        {t(data.intro, data.intro_hi) ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.intro, data.intro_hi)}
          </p>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §2 The Astronomy */}
      <section id="detail-astronomy" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t(
            `The Astronomy of ${data.planet} Retrograde`,
            `${data.planet_hi} की वक्री — खगोल विज्ञान`,
          )}
        </h2>
        {t(data.astronomy, data.astronomy_hi) ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.astronomy, data.astronomy_hi)}
          </p>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §3 Vedic Meaning */}
      <section id="detail-vedic" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t(
            `Vedic Meaning — Vakri ${data.planet}`,
            `वैदिक व्याख्या — वक्री ${data.planet_hi}`,
          )}
        </h2>
        {t(data.vedicInterpretation, data.vedicInterpretation_hi) ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.vedicInterpretation, data.vedicInterpretation_hi)}
          </p>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §4 General Life Effects */}
      <section id="detail-effects" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t(
            `${data.planet} Retrograde — General Life Effects`,
            `वक्री ${data.planet_hi} — सामान्य जीवन प्रभाव`,
          )}
        </h2>
        {t(data.effectsGeneral, data.effectsGeneral_hi) ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.effectsGeneral, data.effectsGeneral_hi)}
          </p>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §5 Career & Finance */}
      <section id="detail-career" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t("Career & Finance", "करियर और वित्त")}
        </h2>
        {t(data.effectsCareer, data.effectsCareer_hi) ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.effectsCareer, data.effectsCareer_hi)}
          </p>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §6 Relationships & Communication */}
      <section id="detail-relationships" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t("Relationships & Communication", "रिश्ते और संचार")}
        </h2>
        {t(data.effectsRelationships, data.effectsRelationships_hi) ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.effectsRelationships, data.effectsRelationships_hi)}
          </p>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §7 Health */}
      <section id="detail-health" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t("Health", "स्वास्थ्य")}
        </h2>
        {t(data.effectsHealth, data.effectsHealth_hi) ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t(data.effectsHealth, data.effectsHealth_hi)}
          </p>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §8 Do's & Don'ts */}
      <section id="detail-dos" className="mb-10 grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
          <h2 className="text-lg font-bold mb-3 text-emerald-800">
            {t("Do's", "क्या करें")}
          </h2>
          {dosItems.length > 0 ? (
            <ul className="space-y-2">
              {dosItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder />
          )}
        </div>
        <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
          <h2 className="text-lg font-bold mb-3 text-rose-800">
            {t("Don'ts", "क्या न करें")}
          </h2>
          {dontsItems.length > 0 ? (
            <ul className="space-y-2">
              {dontsItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder />
          )}
        </div>
      </section>

      {/* §9 Strengths & Challenges */}
      <section id="detail-strengths" className="mb-10 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
          <h2 className="text-lg font-bold mb-3 text-blue-800">
            {t("Strengths", "शक्तियाँ")}
          </h2>
          {strengthItems.length > 0 ? (
            <ul className="space-y-2">
              {strengthItems.map((item, i) => (
                <li key={i} className="text-sm text-gray-700">
                  • {item}
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder />
          )}
        </div>
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
          <h2 className="text-lg font-bold mb-3 text-amber-800">
            {t("Challenges", "चुनौतियाँ")}
          </h2>
          {challengeItems.length > 0 ? (
            <ul className="space-y-2">
              {challengeItems.map((item, i) => (
                <li key={i} className="text-sm text-gray-700">
                  • {item}
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder />
          )}
        </div>
      </section>

      {/* §10 Remedies */}
      <section id="detail-remedies" className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-900">
          {t(
            `${data.planet} Retrograde — Remedies`,
            `वक्री ${data.planet_hi} के उपाय`,
          )}
        </h2>
        {remedyItems.length > 0 ? (
          <ul className="space-y-3">
            {remedyItems.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="text-indigo-500 font-bold shrink-0 w-5">
                  {i + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Placeholder />
        )}
      </section>

      {/* §11 FAQ */}
      {hasFaqs && (
        <section id="detail-faq" className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            {t(
              "Frequently Asked Questions",
              "अक्सर पूछे जाने वाले सवाल",
            )}
          </h2>
          <div className="space-y-4">
            {data.faqs.map((f, i) => (
              <details
                key={i}
                className="group bg-indigo-50 rounded-xl p-4 border border-indigo-100"
              >
                <summary className="cursor-pointer font-bold text-indigo-900 flex justify-between items-center gap-4">
                  <span>{t(f.q, f.q_hi)}</span>
                  <span className="text-indigo-400 group-open:rotate-180 transition-transform shrink-0">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  {t(f.a, f.a_hi)}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* §12 Other Retrograde Planets */}
      <RetrogradeRelatedPlanets
        related={relatedPlanets}
        isHi={isHi}
        langPath={langPath}
      />

      {/* §13 CTA (conditional — only when a matching report exists) */}
      {data.cta && (
        <section id="detail-cta" className="mb-10 bg-indigo-900 text-white rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">
            {t(data.cta.title, data.cta.title_hi)}
          </h2>
          <p className="text-indigo-100 mb-4 leading-relaxed">
            {t(data.cta.description, data.cta.description_hi)}
          </p>
          <Link
            href={`/reports/${data.cta.reportSlug}`}
            className="inline-block px-6 py-3 rounded-full bg-white text-indigo-900 font-bold text-sm hover:bg-indigo-50 transition"
          >
            {t("Get Your Report", "रिपोर्ट प्राप्त करें")} →
          </Link>
        </section>
      )}

      {/* §14 Discover More (cross-cluster chips) */}
      {hasDiscover && (
        <section id="detail-discover" className="mb-10">
          <h2 className="text-lg font-bold mb-4 text-indigo-900">
            {t("Discover More", "और जानें")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.discoverMore.map((slug) => (
              <span
                key={slug}
                className="text-xs font-bold px-3 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
              >
                {slug
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* §15 Back to Hub — always last */}
      <section className="mt-10 pt-8 border-t border-gray-100">
        <Link
          href={`${langPath}/retrograde-planets`}
          className="inline-block text-sm font-bold text-indigo-700 hover:underline"
        >
          ← {t("Retrograde Planets", "वक्री ग्रह")}
        </Link>
      </section>
    </article>
  )
}
