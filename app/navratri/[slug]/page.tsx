import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNavdurgaBySlug, NAVDURGA_LIST } from "@/lib/navratri"
import { fetchNavratri } from "@/lib/fetchNavratri"
import Link from "next/link"

interface Props {
  params: { slug: string }
  searchParams?: { type?: string }
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
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
      images: [
        `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
      ],
    },
  }
}

export default async function NavdurgaDetailPage({
  params,
  searchParams,
}: Props) {
  const mata = getNavdurgaBySlug(params.slug)
  if (!mata) notFound()

  const year = new Date().getFullYear()

  const type =
    searchParams?.type === "shardiya" ? "shardiya" : "chaitra"

  const navData = await fetchNavratri({
    year,
    type,
  })

  const dayData = navData.days.find(
    (d) => d.day_number === mata.day
  )

  const date = formatDate(dayData?.date)

  const content = mata.en

  return (
    <main className="bg-[#FFF8F1] text-[#2B2B2B] min-h-screen">
      {/* ---------------- SEO SCHEMA ---------------- */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: content.title.replace("{year}", String(year)),
            startDate: dayData?.date,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "India",
            },
            image: `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
            description: content.hero?.intro || "",
            organizer: {
              "@type": "Organization",
              name: "Jyotishasha",
              url: "https://www.jyotishasha.com",
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: `${content.title.replace("{year}", String(year))} Story`,
            description: "Watch detailed story and significance of this Navdurga form.",
            thumbnailUrl: `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
            uploadDate: `${year}-01-01`,
            embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
            publisher: {
              "@type": "Organization",
              name: "Jyotishasha",
            },
          }),
        }}
      />
      <section className="max-w-4xl mx-auto px-4 py-14">

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#7A1C1C] mb-4">
          {content.title.replace("{year}", String(year))}
        </h1>

        {/* Year Line */}
        <p className="text-sm text-gray-500 mb-6">
          Navratri {year} | Day {mata.day} |{" "}
          {type === "chaitra" ? "Chaitra" : "Shardiya"}
        </p>

        {/* Toggle */}
        <div className="flex gap-4 mb-8">
          <Link
            href={`/navratri/${params.slug}?type=chaitra`}
            className={`px-4 py-2 rounded-full text-sm ${
              type === "chaitra"
                ? "bg-[#7A1C1C] text-white"
                : "border border-[#7A1C1C]"
            }`}
          >
            Chaitra
          </Link>

          <Link
            href={`/navratri/${params.slug}?type=shardiya`}
            className={`px-4 py-2 rounded-full text-sm ${
              type === "shardiya"
                ? "bg-[#7A1C1C] text-white"
                : "border border-[#7A1C1C]"
            }`}
          >
            Shardiya
          </Link>
        </div>

        {/* Dynamic Paragraph */}
        <p className="text-gray-700 mb-8 leading-relaxed">
          In Navratri {year}, Maa{" "}
          {content.title.replace("{year}", "").split(" –")[0]} is worshipped on{" "}
          {date}. This sacred day represents divine feminine energy and spiritual discipline.
        </p>

        {/* Image */}
        <img
          src={`/images/navratri/${params.slug.replace("maa-", "")}.webp`}
          alt={content.title}
          className="w-full rounded-xl shadow-lg mb-12"
        />

        {/* Static Sections */}
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

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: content.faqs?.map((faq: any) => ({
                "@type": "Question",
                name: faq.question.replace("{year}", String(year)),
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer.replace("{year}", String(year)),
                },
              })),
            }),
          }}
        />

        {/* YouTube Video */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-[#7A1C1C] mb-6">
            Watch Maa {content.title.replace("{year}", String(year))} Story
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

        {/* Navdurga Grid */}
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
                  href={
                    isActive
                      ? "#"
                      : `/navratri/${m.slug}?type=${type}`
                  }
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

      </section>
    </main>
  )
}