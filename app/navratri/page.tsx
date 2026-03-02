import { Metadata } from "next"
import { fetchNavratri, type NavratriResponse } from "@/lib/fetchNavratri"
import NavratriClient from "./NavratriClient"
import { NAVRATRI_ARTICLE_DATA } from "@/lib/navratri"
import { getNavratriColors } from "@/lib/navratri/getNavratriColors"

const formatDate = (dateString: string) => {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return `${day}-${month}-${year}`
}

export async function generateMetadata(): Promise<Metadata> {
  const year = new Date().getUTCFullYear()

  return {
    title: `Navratri ${year} Dates, Kalash Sthapana Muhurat & 9 Devi Details`,
    description:
      `Explore Navratri ${year} dates, Kalash Sthapana muhurat, Sandhi Puja timing and all 9 forms of Maa Durga with pooja details.`,
    keywords: [
      "Navratri dates",
      "Kalash Sthapana muhurat",
      "Chaitra Navratri",
      "Shardiya Navratri",
      "Maa Durga 9 forms",
      "Navratri calendar India"
    ],
    alternates: {
      canonical: "https://www.jyotishasha.com/navratri",
    },
    openGraph: {
      title: `Navratri ${year} – The 9 Day Blessing of Maa Durga`,
      description:
        `Complete Navratri ${year} calendar with Kalash Sthapana, Sandhi Puja and 9 Devi details.`,
      url: "https://www.jyotishasha.com/navratri",
      type: "article",
      images: [
        {
          url: "https://www.jyotishasha.com/images/navratri-og.jpg",
          width: 1200,
          height: 630,
          alt: "Navratri Festival"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Navratri ${year} – 9 Day Blessing of Maa Durga`,
      description:
        `Check Navratri ${year} dates, muhurat and 9 Devi details.`,
      images: ["https://www.jyotishasha.com/images/navratri-og.jpg"]
    }
  }
}

export default async function NavratriPage() {
  const currentYear = new Date().getFullYear()

  const initialData: NavratriResponse = await fetchNavratri({
    year: currentYear,
    type: "auto",
  })

  const days = initialData.days ?? []

  const startDate = days.length > 0 ? days[0].date : ""
  const colors = startDate ? getNavratriColors(startDate) : []
  const day1Color = colors[0] ?? ""
  const endDate = days.length > 0 ? days[days.length - 1].date : ""

  return (
    <main className="min-h-screen bg-[#FFF8F1] text-[#2B2B2B]">
      <section className="max-w-6xl mx-auto px-4 py-12">

        {/* Structured Data – Event */}
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Event",
                    "@id": "https://www.jyotishasha.com/navratri#event",
                    name: `Navratri ${currentYear}`,
                    description: `Navratri ${currentYear} festival with Kalash Sthapana Muhurat and 9 forms of Maa Durga.`,
                    inLanguage: "en-IN",
                    startDate: startDate,
                    endDate: endDate,
                    eventStatus: "https://schema.org/EventScheduled",
                    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                    location: {
                        "@type": "Place",
                        name: "India"
                    },
                    organizer: {
                        "@type": "Organization",
                        name: "Jyotishasha",
                        url: "https://www.jyotishasha.com"
                    },
                    image: [
                        "https://www.jyotishasha.com/images/navratri-og.jpg"
                    ],
                    url: "https://www.jyotishasha.com/navratri"
                    })
            }}
            />

        {/* Structured Data – Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.jyotishasha.com"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Navratri",
                  item: "https://www.jyotishasha.com/navratri"
                }
              ]
            }),
          }}
        />

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                inLanguage: "en-IN",
                mainEntity: [
                    {
                    "@type": "Question",
                    name: `When is Navratri ${currentYear}?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `Navratri ${currentYear} begins on ${formatDate(startDate)} and ends on ${formatDate(endDate)}.`
                    }
                    },
                    {
                    "@type": "Question",
                    name: "What is Kalash Sthapana Muhurat?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Kalash Sthapana marks the beginning of Navratri and is performed during an auspicious muhurat on the first day."
                    }
                    },
                    {
                    "@type": "Question",
                    name: "What is the difference between Chaitra and Shardiya Navratri?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Chaitra Navratri occurs in spring while Shardiya Navratri is celebrated in autumn. Both honor the 9 forms of Maa Durga."
                    }
                    },
                    {
                    "@type": "Question",
                    name: "How many days is Navratri celebrated?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Navratri is celebrated for nine nights and ten days."
                    }
                    }
                ]
                })
            }}
            />

        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#7A1C1C] mb-4">
            Navratri {currentYear} – The 9 Day Blessing of Maa Durga
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover official Navratri dates, Kalash Sthapana Muhurat,
            Sandhi Puja timing and divine details of all 9 forms of Maa Durga.
          </p>
        </header>

        <NavratriClient
          initialYear={currentYear}
          initialData={initialData}
        />

      </section>

      {/* ---------------- Static SEO Article ---------------- */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        {(() => {
          const article = NAVRATRI_ARTICLE_DATA.en
          return (
            <>
              <h2 className="text-3xl font-bold text-[#7A1C1C] mb-6">
                {article.title.replace("{year}", String(currentYear))}
              </h2>

              <p className="mb-8 text-gray-700">
                {article.hero.shortIntro
                  .replace("{year}", String(currentYear))
                  .replace("{startDate}", formatDate(startDate))
                  .replace("{endDate}", formatDate(endDate))
                  .replace("{ghatTime}", initialData.ghatasthapana?.muhurat ?? "")
                  .replace("{day1Color}", day1Color)
                }
              </p>

              {article.sections.map((section) => (
                <div key={section.id} className="mb-10">
                  <h3 className="text-xl font-semibold text-[#7A1C1C] mb-3">
                    {section.title.replace("{year}", String(currentYear))}
                  </h3>

                  {section.content && (
                    <p className="text-gray-700 mb-4">
                      {section.content
                        .replace("{year}", String(currentYear))
                        .replace("{startDate}", formatDate(startDate))
                        .replace("{endDate}", formatDate(endDate))
                        .replace("{ghatTime}", initialData.ghatasthapana?.muhurat ?? "")
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
            </>
          )
        })()}
      </section>

      <section className="mt-16 mb-32 max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6 text-gray-700">
        {NAVRATRI_ARTICLE_DATA.en.faqs.map((faq, idx) => (
          <div key={idx}>
            <h3 className="font-semibold">
              {faq.question
                .replace("{year}", String(currentYear))
                .replace("{startDate}", formatDate(startDate))
                .replace("{endDate}", formatDate(endDate))
                .replace("{ghatTime}", initialData.ghatasthapana?.muhurat ?? "")
                .replace("{day1Color}", day1Color)}
            </h3>

            <p>
              {faq.answer
                .replace("{year}", String(currentYear))
                .replace("{startDate}", formatDate(startDate))
                .replace("{endDate}", formatDate(endDate))
                .replace("{ghatTime}", initialData.ghatasthapana?.muhurat ?? "")
                .replace("{day1Color}", day1Color)}
            </p>
          </div>
        ))}
      </div>
    </section>
    </main>
  )
}