import { Metadata } from "next"
import { fetchNavratri, type NavratriResponse } from "@/lib/fetchNavratri"
import NavratriClient from "./NavratriClient"
import { NAVRATRI_ARTICLE_DATA } from "@/lib/navratri"
import { getNavratriColors } from "@/lib/navratri/getNavratriColors"

/* ---------------- LANGUAGE ---------------- */
function getLangFromLocale(locale?: string) {
  return locale === "hi" ? "hi" : "en"
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return `${day}-${month}-${year}`
}

type Props = {
  params: { locale?: string }
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = getLangFromLocale(params?.locale)
  const year = new Date().getUTCFullYear()

  const article = NAVRATRI_ARTICLE_DATA[lang]

  return {
    title: article.title.replace("{year}", String(year)),
    description: article.hero.shortIntro.replace("{year}", String(year)),

    alternates: {
      canonical:
        lang === "hi"
          ? "https://www.jyotishasha.com/hi/navratri"
          : "https://www.jyotishasha.com/navratri",
      languages: {
        "en-US": "/navratri",
        "hi-IN": "/hi/navratri",
      },
    },

    openGraph: {
      title: article.title.replace("{year}", String(year)),
      description: article.hero.shortIntro.replace("{year}", String(year)),
      url:
        lang === "hi"
          ? "https://www.jyotishasha.com/hi/navratri"
          : "https://www.jyotishasha.com/navratri",
      images: ["/images/navratri-og.jpg"],
    },
  }
}

/* ---------------- PAGE ---------------- */
export default async function NavratriPage({ params }: Props) {
  const lang = getLangFromLocale(params?.locale)
  const article = NAVRATRI_ARTICLE_DATA[lang]

  const currentYear = new Date().getFullYear()
  const today = new Date()

  let initialData: NavratriResponse

  const chaitra = await fetchNavratri({ year: currentYear, type: "chaitra" })
  const chaitraEnd = new Date(chaitra.end_date)

  if (chaitraEnd >= today) {
    initialData = chaitra
  } else {
    const shardiya = await fetchNavratri({ year: currentYear, type: "shardiya" })
    const shardiyaEnd = new Date(shardiya.end_date)

    if (shardiyaEnd >= today) {
      initialData = shardiya
    } else {
      initialData = await fetchNavratri({
        year: currentYear + 1,
        type: "chaitra",
      })
    }
  }

  const startDate = initialData.start_date ?? ""
  const endDate = initialData.end_date ?? ""

  const colors = startDate ? getNavratriColors(startDate) : []
  const day1Color = colors[0] ?? ""

  const ghatTime =
    initialData.kalash_sthapana?.abhijit_muhurta
      ? `${initialData.kalash_sthapana.abhijit_muhurta.start} - ${initialData.kalash_sthapana.abhijit_muhurta.end}`
      : ""

  /* ---------------- SCHEMA ---------------- */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question.replace("{year}", String(currentYear)),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
          .replace("{year}", String(currentYear))
          .replace("{startDate}", formatDate(startDate))
          .replace("{endDate}", formatDate(endDate))
          .replace("{ghatTime}", ghatTime)
          .replace("{day1Color}", day1Color),
      },
    })),
  }

  return (
    <main className="min-h-screen bg-[#FFF8F1] text-[#2B2B2B]">
      <section className="max-w-6xl mx-auto px-4 py-12">

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* HEADER */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#7A1C1C] mb-4">
            {article.title.replace("{year}", String(currentYear))}
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            {article.hero.shortIntro
              .replace("{year}", String(currentYear))
              .replace("{startDate}", formatDate(startDate))
              .replace("{endDate}", formatDate(endDate))
              .replace("{ghatTime}", ghatTime)
              .replace("{day1Color}", day1Color)}
          </p>
        </header>

        <NavratriClient
          initialYear={currentYear}
          initialData={initialData}
          locale={params?.locale || "en"}
        />
      </section>

      {/* ARTICLE */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        {article.sections.map((section) => (
          <div key={section.id} className="mb-10">
            <h2 className="text-2xl font-bold text-[#7A1C1C] mb-4">
              {section.title.replace("{year}", String(currentYear))}
            </h2>

            {section.content && (
              <p className="text-gray-700 mb-4">
                {section.content
                  .replace("{year}", String(currentYear))
                  .replace("{startDate}", formatDate(startDate))
                  .replace("{endDate}", formatDate(endDate))
                  .replace("{ghatTime}", ghatTime)
                  .replace("{day1Color}", day1Color)}
              </p>
            )}

            {section.list && (
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {section.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="mt-16 mb-40 max-w-3xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6 text-center">
          {lang === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
        </h2>

        <div className="space-y-6 text-gray-700">
          {article.faqs.map((faq, idx) => (
            <div key={idx}>
              <h3 className="font-semibold">
                {faq.question
                  .replace("{year}", String(currentYear))
                  .replace("{startDate}", formatDate(startDate))
                  .replace("{endDate}", formatDate(endDate))
                  .replace("{ghatTime}", ghatTime)
                  .replace("{day1Color}", day1Color)}
              </h3>

              <p>
                {faq.answer
                  .replace("{year}", String(currentYear))
                  .replace("{startDate}", formatDate(startDate))
                  .replace("{endDate}", formatDate(endDate))
                  .replace("{ghatTime}", ghatTime)
                  .replace("{day1Color}", day1Color)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}