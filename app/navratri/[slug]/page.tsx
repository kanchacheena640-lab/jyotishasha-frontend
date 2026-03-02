import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNavdurgaBySlug, NAVDURGA_LIST } from "@/lib/navratri"
import { fetchNavratri } from "@/lib/fetchNavratri"
import NavdurgaDetailClient from "./NavdurgaDetailClient"

interface Props {
  params: { slug: string }
}

/* ---------------- Static Params ---------------- */

export async function generateStaticParams() {
  return NAVDURGA_LIST.map((mata) => ({
    slug: mata.slug,
  }))
}

/* ---------------- Metadata ---------------- */

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

/* ---------------- Page ---------------- */

export default async function NavdurgaDetailPage({ params }: Props) {
  const mata = getNavdurgaBySlug(params.slug)
  if (!mata) notFound()

  const currentYear = new Date().getFullYear()

  /* Upcoming Navratri default */
  const initialData = await fetchNavratri({
    year: currentYear,
    type: "auto",
  })

  const dayData = initialData.days.find(
    (d) => d.day_number === mata.day
  )

  return (
    <main className="bg-[#FFF8F1] min-h-screen text-[#2B2B2B]">

      {/* ---------------- Structured Data ---------------- */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: mata.en.title.replace("{year}", String(currentYear)),
            startDate: dayData?.date,
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "India",
            },
            image: `https://www.jyotishasha.com/images/navratri/${params.slug}.jpg`,
            description: mata.en.metaDescription,
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
                name: mata.en.title.replace(
                  "{year}",
                  String(currentYear)
                ),
                item: `https://www.jyotishasha.com/navratri/${params.slug}`,
              },
            ],
          }),
        }}
      />

      {/* ---------------- Client UI ---------------- */}

      <NavdurgaDetailClient
        mata={mata}
        initialYear={currentYear}
        initialData={initialData}
      />
    </main>
  )
}