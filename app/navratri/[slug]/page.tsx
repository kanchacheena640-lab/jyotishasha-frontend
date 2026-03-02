import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNavdurgaBySlug, NAVDURGA_LIST } from "@/lib/navratri"
import { fetchNavratri } from "@/lib/fetchNavratri"
import Link from "next/link"

interface Props {
  params: { slug: string }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return `${day}-${month}-${year}`
}

export async function generateStaticParams() {
  return NAVDURGA_LIST.map((mata) => ({
    slug: mata.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mata = getNavdurgaBySlug(params.slug)
  if (!mata) return {}

  const year = new Date().getFullYear()

  return {
    title: mata.en.metaTitle.replace("{year}", String(year)),
    description: mata.en.metaDescription.replace("{year}", String(year)),
    alternates: {
      canonical: `https://www.jyotishasha.com/navratri/${params.slug}`,
    },
    openGraph: {
      title: mata.en.metaTitle.replace("{year}", String(year)),
      description: mata.en.metaDescription.replace("{year}", String(year)),
      url: `https://www.jyotishasha.com/navratri/${params.slug}`,
      type: "article",
      images: [
        {
          url: `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: mata.en.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: mata.en.metaTitle.replace("{year}", String(year)),
      description: mata.en.metaDescription.replace("{year}", String(year)),
      images: [`https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`],
    },
  }
}

export default async function NavdurgaDetailPage({ params }: Props) {
  const mata = getNavdurgaBySlug(params.slug)
  if (!mata) notFound()

  const year = new Date().getFullYear()

  const navData = await fetchNavratri({
    year,
    type: "auto",
  })

  const dayData = navData.days.find(
    (d) => d.day_number === mata.day
  )

  const date = formatDate(dayData?.date)

  const content = mata.en

  return (
    <main className="bg-[#FFF8F1] text-[#2B2B2B] min-h-screen">

      {/* ---------- Structured Data ---------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: content.title.replace("{year}", String(year)),
            datePublished: dayData?.date,
            author: {
              "@type": "Organization",
              name: "Jyotishasha",
            },
            publisher: {
              "@type": "Organization",
              name: "Jyotishasha",
              logo: {
                "@type": "ImageObject",
                url: "https://www.jyotishasha.com/logo.png",
              },
            },
          }),
        }}
      />

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
                item: "https://www.jyotishasha.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Navratri",
                item: "https://www.jyotishasha.com/navratri",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: content.title.replace("{year}", String(year)),
                item: `https://www.jyotishasha.com/navratri/${params.slug}`,
              },
            ],
          }),
        }}
      />

      <section className="max-w-4xl mx-auto px-4 py-14">

       {/* ---------------- HERO ---------------- */}

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#7A1C1C] mb-4">
          {content.title.replace("{year}", String(year))}
        </h1>

        {/* Year Line */}
        <p className="text-sm text-gray-500 mb-6">
          Navratri {year} | Day {mata.day}
        </p>

        {/* Toggle (UI only for now) */}
        <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 bg-[#7A1C1C] text-white rounded-full text-sm">
            Chaitra
          </button>
          <button className="px-4 py-2 border border-[#7A1C1C] rounded-full text-sm">
            Shardiya
          </button>
        </div>

        {/* Dynamic Paragraph */}
        <p className="text-gray-700 mb-8 leading-relaxed">
          In Navratri {year}, Maa {content.title
            .replace(" – Navratri {year} Day " + mata.day + " Significance", "")
            .replace("{year}", "")} is worshipped on {date}. 
          This sacred day represents spiritual discipline, divine feminine energy 
          and inner transformation during the nine powerful nights of Navratri.
        </p>

        {/* Image */}
        <img
          src={`/images/navratri/${params.slug.replace("maa-", "")}.webp`}
          alt={content.title}
          className="w-full rounded-xl shadow-lg mb-12"
        />

        {/* ---------------- STATIC ARTICLE ---------------- */}

        {content.sections.map((section) => (
          <div key={section.id} className="mb-12">
            <h2 className="text-2xl font-semibold text-[#7A1C1C] mb-4">
              {section.title}
            </h2>

            {section.content && (
              <p className="text-gray-700 mb-4 leading-relaxed">
                {section.content
                  .replace("{year}", String(year))
                  .replace("{date}", date)}
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

        {/* YouTube Video Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-[#7A1C1C] mb-6">
            Watch Maa {content.title} Story
          </h2>

          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Navratri Video"
              allowFullScreen
            />
          </div>
        </div>

        {/* ---------------- NAVDURGA GRID ---------------- */}

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-[#7A1C1C] mb-8 text-center">
            Explore All 9 Forms of Maa Durga
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {NAVDURGA_LIST.map((m) => {
              const isActive = m.slug === params.slug

              return (
                <Link
                  key={m.slug}
                  href={isActive ? "#" : `/navratri/${m.slug}`}
                  className={`p-6 rounded-xl text-center shadow-md transition ${
                    isActive
                      ? "bg-gray-200 opacity-60 pointer-events-none"
                      : "bg-white hover:shadow-lg"
                  }`}
                >
                  <h3 className="font-semibold text-[#7A1C1C]">
                    {m.en.title.replace("{year}", String(year))}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Day {m.day}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#7A1C1C] mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {content.faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-semibold">
                  {faq.question.replace("{year}", String(year))}
                </h3>
                <p className="text-gray-700">
                  {faq.answer.replace("{year}", String(year))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}