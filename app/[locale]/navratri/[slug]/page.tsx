import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNavdurgaBySlug, NAVDURGA_LIST } from "@/lib/navratri"
import { fetchNavratri } from "@/lib/fetchNavratri"
import NavdurgaDetailClient from "./NavdurgaDetailClient"

/* ---------------- LANGUAGE ---------------- */
function getLang(locale?: string) {
  return locale === "hi" ? "hi" : "en"
}

interface Props {
  params: { slug: string; locale?: string }
}

/* ---------------- Static Params ---------------- */

export async function generateStaticParams() {
  return NAVDURGA_LIST.flatMap((mata) => [
    { slug: mata.slug },
    { slug: mata.slug, locale: "hi" },
  ])
}

/* ---------------- Metadata ---------------- */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const lang = getLang(params.locale)

  const mata = getNavdurgaBySlug(params.slug)
  if (!mata) return {}

  const year = new Date().getFullYear()
  const content = mata[lang]

  return {
    title: content.metaTitle.replace("{year}", String(year)),
    description: content.metaDescription.replace("{year}", String(year)),

    alternates: {
      canonical:
        lang === "hi"
          ? `https://www.jyotishasha.com/hi/navratri/${params.slug}`
          : `https://www.jyotishasha.com/navratri/${params.slug}`,
      languages: {
        "en-US": `/navratri/${params.slug}`,
        "hi-IN": `/hi/navratri/${params.slug}`,
      },
    },

    openGraph: {
      title: content.metaTitle.replace("{year}", String(year)),
      description: content.metaDescription.replace("{year}", String(year)),
      url:
        lang === "hi"
          ? `https://www.jyotishasha.com/hi/navratri/${params.slug}`
          : `https://www.jyotishasha.com/navratri/${params.slug}`,
      type: "article",
      images: [
        {
          url: `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: content.metaTitle.replace("{year}", String(year)),
      description: content.metaDescription.replace("{year}", String(year)),
      images: [
        `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
      ],
    },
  }
}

/* ---------------- Page ---------------- */

export default async function NavdurgaDetailPage({ params }: Props) {

  const lang = getLang(params.locale)

  const mata = getNavdurgaBySlug(params.slug)
  if (!mata) notFound()

  const content = mata[lang]

  const currentYear = new Date().getFullYear()

  /* Upcoming Navratri */
  let initialData

  const today = new Date()

  const chaitra = await fetchNavratri({
    year: currentYear,
    type: "chaitra",
  })

  const chaitraEnd = new Date(chaitra.end_date)

  if (chaitraEnd >= today) {
    initialData = chaitra
  } else {
    const shardiya = await fetchNavratri({
      year: currentYear,
      type: "shardiya",
    })

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

  const dayData = initialData.days.find(
    (d) => d.day_number === mata.day
  )

  /* ---------------- SCHEMA ---------------- */

  const eventName = content.title.replace("{year}", String(currentYear))

  return (
    <main className="bg-[#FFF8F1] min-h-screen text-[#2B2B2B]">

      {/* Event Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: eventName,
            startDate: dayData?.date,
            inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
            location: {
              "@type": "Place",
              name: "India",
            },
            image: `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
            description: content.metaDescription,
            organizer: {
              "@type": "Organization",
              name: "Jyotishasha",
              url: "https://www.jyotishasha.com",
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
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
                name: lang === "hi" ? "होम" : "Home",
                item: "https://www.jyotishasha.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: lang === "hi" ? "नवरात्रि" : "Navratri",
                item:
                  lang === "hi"
                    ? "https://www.jyotishasha.com/hi/navratri"
                    : "https://www.jyotishasha.com/navratri",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: eventName,
                item:
                  lang === "hi"
                    ? `https://www.jyotishasha.com/hi/navratri/${params.slug}`
                    : `https://www.jyotishasha.com/navratri/${params.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Client UI */}
      <NavdurgaDetailClient
        mata={mata}
        content={content}   // ✅ important
        locale={lang}
        initialYear={currentYear}
        initialData={initialData}
      />
    </main>
  )
}