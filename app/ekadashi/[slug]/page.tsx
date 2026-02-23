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
  return slugs.map((slug) => ({ slug }));
}

/* ---------------- FETCH DYNAMIC DATA (PRO GET METHOD) ---------------- */

async function getEkadashiDynamicData(slug: string, year: number) {
  try {
    const res = await fetch(
      `${BACKEND}/api/ekadashi/find-by-slug/${slug}?year=${year}`,
      {
        method: "GET",
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!res.ok) return null;
    const result = await res.json();
    return result.data; // Return the 'data' object from backend response
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

/* ---------------- PAGE ---------------- */

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { year?: string };
}) {
  const content = getEkadashiContent(params.slug);
  if (!content) notFound();

  // 1. Determine the year from URL or current year
  const currentYear = new Date().getFullYear();
  const selectedYear = searchParams.year ? parseInt(searchParams.year) : currentYear;

  // 2. Fetch the data for that specific year
  const dynamic = await getEkadashiDynamicData(params.slug, selectedYear);

  const currentUrl = `https://www.jyotishasha.com/ekadashi/${params.slug}`;

  /* ---------------- SCHEMA ---------------- */

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${content.name.en} ${selectedYear}`,
    description: content.intro.en.slice(0, 160),
    author: { "@type": "Organization", name: "Jyotishasha" },
    publisher: {
      "@type": "Organization",
      name: "Jyotishasha",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jyotishasha.com/logo.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": currentUrl },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.en.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jyotishasha.com" },
      { "@type": "ListItem", position: 2, name: "Ekadashi", item: "https://www.jyotishasha.com/ekadashi" },
      { "@type": "ListItem", position: 3, name: content.name.en, item: currentUrl },
    ],
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : "";
  };

  const videoSchema = content.videoUrl && {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${content.name.en} Vrat Vidhi`,
    description: content.intro.en.slice(0, 160),
    thumbnailUrl: `https://img.youtube.com/vi/${getYouTubeId(content.videoUrl)}/hqdefault.jpg`,
    uploadDate: new Date().toISOString(),
    contentUrl: content.videoUrl,
    embedUrl: content.videoUrl,
    publisher: {
      "@type": "Organization",
      name: "Jyotishasha",
      logo: { "@type": "ImageObject", url: "https://www.jyotishasha.com/logo.png" },
    },
  };

  const eventSchema = dynamic && {
    "@context": "https://schema.org",
    "@type": "ReligiousEvent",
    name: `${content.name.en} ${selectedYear}`,
    startDate: new Date(dynamic.vrat_date).toISOString(),
    endDate: dynamic.parana?.parana_date 
      ? `${dynamic.parana.parana_date}T00:00:00+05:30` 
      : `${dynamic.vrat_date}T23:59:59+05:30`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "India",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    description: content.intro.en.slice(0, 160),
    organizer: { "@type": "Organization", name: "Jyotishasha", url: "https://www.jyotishasha.com" },
    url: currentUrl,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* JSON-LD SCHEMAS */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {videoSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />}
      {eventSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />}

      {/* HERO */}
      <h1 className="text-4xl font-bold mb-4">
        {content.name.en} ({content.name.hi}) - {selectedYear}
      </h1>

      {/* YEAR SELECTOR TABS */}
      <div className="flex space-x-4 mb-8 border-b pb-2">
        {[2026, 2027].map((y) => (
          <Link
            key={y}
            href={`/ekadashi/${params.slug}?year=${y}`}
            className={`px-4 py-1 rounded-full ${selectedYear === y ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {y} Details
          </Link>
        ))}
      </div>

      {/* DYNAMIC VRAT INFO CARD */}
      {dynamic ? (
        <div className="bg-orange-50 border-l-8 border-orange-500 p-6 rounded-lg shadow-sm mb-8 space-y-2">
          <p className="text-xl font-bold text-orange-900 mb-2">Vrat & Parana Timings ({selectedYear})</p>
          <p className="text-md"><strong>Vrat Date:</strong> {dynamic.vrat_date}</p>
          <p className="text-md"><strong>Tithi:</strong> {dynamic.tithi.start} – {dynamic.tithi.end}</p>
          <p className="text-md"><strong>Parana Time:</strong> {dynamic.parana.start} – {dynamic.parana.end}</p>
          <p className="text-md"><strong>Hari Vasara Ends:</strong> {dynamic.parana.hari_vasara_end}</p>
        </div>
      ) : (
        <div className="bg-red-50 p-4 rounded mb-8 text-red-700">
          Timings for {selectedYear} are not available yet.
        </div>
      )}

      {/* CONTENT SECTIONS */}
      <section className="mb-8 prose prose-orange max-w-none">
        <h2 className="text-2xl font-semibold mb-3">About {content.name.en}</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">{content.intro.en}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Significance</h2>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">{content.significance.en}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Vrat Vidhi</h2>
        <ul className="list-disc ml-6 space-y-3 text-gray-700">
          {content.vidhi.en.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Benefits</h2>
        <ul className="list-disc ml-6 space-y-3 text-gray-700">
          {content.benefits.en.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* FAQ SECTION */}
      <section className="mb-8 bg-gray-50 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        {content.faq.en.map((item: { q: string; a: string }, i: number) => (
          <div key={i} className="mb-6 last:mb-0">
            <p className="font-bold text-gray-900 text-lg mb-1 italic">Q: {item.q}</p>
            <p className="text-gray-700 pl-4 border-l-2 border-orange-200">{item.a}</p>
          </div>
        ))}
      </section>

      {/* FOOTER LINKS */}
      <div className="border-t pt-8 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-bold mb-3 text-gray-800">Related Ekadashi</p>
          <Link href="/ekadashi/nirjala-ekadashi" className="block text-blue-600 hover:underline mb-1">Nirjala Ekadashi</Link>
          <Link href="/ekadashi/devshayani-ekadashi" className="block text-blue-600 hover:underline">Devshayani Ekadashi</Link>
        </div>
        <div className="sm:text-right">
          <Link href="/ekadashi" className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
            View All Ekadashi List →
          </Link>
        </div>
      </div>
    </div>
  );
}