import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getEkadashiContent,
  getAllEkadashiSlugs,
} from "@/app/data/ekadashi";

const BACKEND = "https://jyotishasha-backend.onrender.com";

/* ---------------- STATIC PARAMS ---------------- */

export async function generateStaticParams() {
  const slugs = getAllEkadashiSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

/* ---------------- FETCH NEXT EKADASHI ---------------- */

async function getNextEkadashi() {
  const res = await fetch(
    `${BACKEND}/api/events/ekadashi`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: 26.8467,
        longitude: 80.9462,
        date: new Date().toISOString().split("T")[0],
      }),
      cache: "no-store",
    }
  );

  if (!res.ok) return null;
  return res.json();
}

/* ---------------- PAGE ---------------- */

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const content = getEkadashiContent(params.slug);
  if (!content) notFound();

  const ekadashiData = await getNextEkadashi();

  let dynamic = null;

  if (
    ekadashiData?.next &&
    ekadashiData.next.slug === params.slug
  ) {
    dynamic = ekadashiData.next;
  }

  const currentUrl = `https://www.jyotishasha.com/ekadashi/${params.slug}`;
  const year = new Date().getFullYear();

  /* ---------------- SCHEMA ---------------- */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${content.name.en} ${year}`,
    description: content.intro.en.slice(0, 160),
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.en.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
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
        name: "Ekadashi",
        item: "https://www.jyotishasha.com/ekadashi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.name.en,
        item: currentUrl,
      },
    ],
  };

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/ 
  );
  return match ? match[1] : "";
};

  const videoSchema =
    content.videoUrl && {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${content.name.en} Vrat Vidhi`,
      description: content.intro.en.slice(0, 160),
      thumbnailUrl: `https://img.youtube.com/vi/${getYouTubeId(
        content.videoUrl
      )}/hqdefault.jpg`,
      uploadDate: new Date().toISOString(),
      contentUrl: content.videoUrl,
      embedUrl: content.videoUrl,
      publisher: {
        "@type": "Organization",
        name: "Jyotishasha",
        logo: {
          "@type": "ImageObject",
          url: "https://www.jyotishasha.com/logo.png",
        },
      },
    };

  const eventSchema =
    dynamic && {
      "@context": "https://schema.org",
      "@type": "ReligiousEvent",
      name: dynamic.name_en,
      startDate: new Date(dynamic.vrat_date).toISOString(),
      endDate: dynamic.parana?.date
        ? `${dynamic.parana.date}T00:00:00+05:30`
        : `${dynamic.vrat_date}T23:59:59+05:30`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "India",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
      },
      description: content.intro.en.slice(0, 160),
      organizer: {
        "@type": "Organization",
        name: "Jyotishasha",
        url: "https://www.jyotishasha.com",
      },
      url: currentUrl,
    };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* JSON-LD SCHEMAS */}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>

{videoSchema && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(videoSchema),
    }}
  />
)}

{eventSchema && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(eventSchema),
    }}
  />
)} 
      

      {/* HERO */}
      <h1 className="text-3xl font-bold mb-2">
        {content.name.en} ({content.name.hi})
      </h1>

      {dynamic && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm space-y-1">
          <p>
            In {year}, {dynamic.name_en} falls on{" "}
            <strong>{dynamic.vrat_date}</strong>.
          </p>
          <p>
            Tithi: {dynamic.tithi.start} – {dynamic.tithi.end}
          </p>
          <p>
            Parana: {dynamic.parana.start} – {dynamic.parana.end}
          </p>
          <p>
            Hari Vasara Ends: {dynamic.internal.hari_vasara_end}
          </p>
          <p>Sunrise: {dynamic.sunrise}</p>
        </div>
      )}

      {/* CONTENT SECTIONS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          About {content.name.en}
        </h2>
        <p className="whitespace-pre-line">
          {content.intro.en}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Significance
        </h2>
        <p className="whitespace-pre-line">
          {content.significance.en}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Astrological Significance
        </h2>
        <p className="whitespace-pre-line">
          {content.astrologicalSignificance.en}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Vrat Vidhi
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          {content.vidhi.en.map(
            (item: string, i: number) => (
              <li key={i}>{item}</li>
            )
          )}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Parana Time
        </h2>
        <p>{content.parana.en}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Benefits
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          {content.benefits.en.map(
            (item: string, i: number) => (
              <li key={i}>{item}</li>
            )
          )}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        {content.faq.en.map(
          (
            item: { q: string; a: string },
            i: number
          ) => (
            <div key={i} className="mb-4">
              <p className="font-semibold">
                {item.q}
              </p>
              <p>{item.a}</p>
            </div>
          )
        )}
      </section>

      <div className="border-t pt-6 text-sm">
        <p className="font-semibold mb-2">
          Related Ekadashi
        </p>
        <Link
          href="/ekadashi/nirjala-ekadashi"
          className="block text-blue-600"
        >
          Nirjala Ekadashi
        </Link>
        <Link
          href="/ekadashi/devshayani-ekadashi"
          className="block text-blue-600"
        >
          Devshayani Ekadashi
        </Link>
        <Link
          href="/ekadashi"
          className="block text-blue-600"
        >
          All Ekadashi List
        </Link>
      </div>

    </div>
  );
}