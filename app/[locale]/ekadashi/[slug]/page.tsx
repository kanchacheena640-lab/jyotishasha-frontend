import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getEkadashiContent,
  getAllEkadashiSlugs,
} from "@/app/data/ekadashi";
import { DEFAULT_OG_IMAGE, SITE_URL, toISTDatePublished } from "@/lib/seo/articleSchema";

export const revalidate = 86400;

const BACKEND = "https://jyotishasha-backend.onrender.com";
const YEAR = 2026;

function stripEkadashiSuffix(name: string) {
  return name.replace(/\s*(Ekadashi|एकादशी)\s*$/u, "").trim();
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const { slug, locale } = params;
  const isHi = locale === "hi";

  const content = getEkadashiContent(slug);
  if (!content) {
    return { title: isHi ? "एकादशी | ज्योतिष आशा" : "Ekadashi | Jyotishasha" };
  }

  const baseNameEn = stripEkadashiSuffix(content.name.en);
  const baseNameHi = stripEkadashiSuffix(content.name.hi);

  const title = isHi
    ? `${baseNameHi} एकादशी ${YEAR} - व्रत, पारण समय और महत्व | ज्योतिष आशा`
    : `${baseNameEn} Ekadashi ${YEAR} - Vrat, Parana Time & Significance | Jyotishasha`;

  const description = isHi
    ? `${baseNameHi} एकादशी ${YEAR} की संपूर्ण जानकारी - व्रत तिथि, पारण समय, पूजा विधि, लाभ और आध्यात्मिक महत्व।`
    : `Complete guide to ${baseNameEn} Ekadashi ${YEAR} - vrat date, parana time, puja vidhi, benefits and spiritual significance.`;

  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/ekadashi/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      type: "article",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1730, height: 909, alt: title }],
    },
  };
}

/* --- Date Formatter --- */
function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "TBA";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${d.getFullYear()}`;
}

function formatTimeOnly(timeStr: string | undefined) {
  if (!timeStr) return "TBA";
  return timeStr.replace(/\d{4}-\d{2}-\d{2}/g, "").trim();
}

/* --- Dynamic Fetch --- */
async function getEkadashiDynamicData(
  slug: string,
  year: number,
  locale: string
) {
  try {
    const res = await fetch(
      `${BACKEND}/api/ekadashi/find-by-slug/${slug}?year=${year}&lang=${locale}`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    return result.data;
  } catch (e) {
    return null;
  }
}


export async function generateStaticParams() {
  const slugs = getAllEkadashiSlugs();

  return slugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "hi", slug },
  ]);
}

/* ---------------- PAGE ---------------- */
export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; locale: string };
  searchParams: { year?: string };
}) {

  const { slug, locale } = params;
  const sp = searchParams;

  const isHi = locale === "hi";

  const t = (en: any, hi: any) => (isHi ? hi : en);

  const content = getEkadashiContent(slug);
  if (!content) notFound();

  const parsedYear = Number(sp?.year);

  // Final Year Logic
  const selectedYear =
    !isNaN(parsedYear) && parsedYear > 2000
      ? parsedYear
      : new Date().getFullYear();

  const dynamic = await getEkadashiDynamicData(
    slug,
    selectedYear,
    locale
  );

  const displayDate = formatDate(dynamic?.vrat_date);

  const displayParanaTime = dynamic
    ? `${formatTimeOnly(dynamic.parana?.start)} - ${formatTimeOnly(
        dynamic.parana?.end
      )}`
    : "TBA";

  const displayParanaDate = formatDate(dynamic?.parana?.parana_date);

  const canonicalUrl = `https://www.jyotishasha.com${isHi ? "/hi" : ""}/ekadashi/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(
      `${content.name.en} ${selectedYear} - Vrat Date, Muhurat & Katha`,
      `${content.name.hi} ${selectedYear} - व्रत तिथि, मुहूर्त और कथा`
    ),
    description: t(content.significance.en, content.significance.hi),
    image: DEFAULT_OG_IMAGE,
    datePublished: toISTDatePublished(),
    author: { "@type": "Organization", name: "Jyotishasha", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Jyotishasha",
      logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const faqList = t(content.faq.en, content.faq.hi);
  const faqSchema = faqList?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <div className="bg-gradient-to-b from-orange-900 to-orange-800 py-6 md:py-16 min-h-screen">
      {/* JSON-LD Schema (Article + FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-4 md:px-10 py-8 md:py-14 shadow-2xl text-black">

        {/* Breadcrumb */}
        <nav className="flex text-xs text-gray-500 mb-6 gap-2">
          <Link href={`/${locale}`}>Home</Link> /
          <Link href={`/${locale}/ekadashi`}>Ekadashi</Link> /
          <span className="text-orange-700 font-bold">
            {t(content.name.en, content.name.hi)}
          </span>
        </nav>

        {/* H1 */}
        <h1 className="text-xl md:text-3xl font-extrabold mb-6">
          {t(content.name.en, content.name.hi)} {selectedYear}:{" "}
          {t("Vrat Date, Muhurat & Katha", "व्रत तिथि, मुहूर्त और कथा")}
        </h1>

        {/* Top Cards */}
        <section className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-700 text-white p-5 rounded-xl">
            <p className="text-xs uppercase">
              {t("Vrat Date", "व्रत तिथि")}
            </p>
            <p className="text-2xl font-bold">{displayDate}</p>
          </div>

          <div className="bg-orange-800 text-white p-5 rounded-xl">
            <p className="text-xs uppercase">
              {t("Parana Time", "पारण समय")}
            </p>
            <p className="text-xl font-bold">{displayParanaTime}</p>
            <p className="text-xs mt-1">{displayParanaDate}</p>
          </div>
        </section>

        {/* Summary */}
        {dynamic && (
          <p className="mb-8 text-gray-700 italic">
            {t(
              `In ${selectedYear}, ${content.name.en} falls on ${displayDate}.`,
              `${selectedYear} में ${content.name.hi} ${displayDate} को है।`
            )}
          </p>
        )}

        {/* About */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            {t("About", "परिचय")} {t(content.name.en, content.name.hi)}
          </h2>
          <p>{t(content.intro.en, content.intro.hi)}</p>
        </section>

        {/* Vidhi */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            {t("Pooja Vidhi", "पूजा विधि")}
          </h2>
          {t(content.vidhi.en, content.vidhi.hi).map(
            (step: string, i: number) => (
              <p key={i}>{i + 1}. {step}</p>
            )
          )}
        </section>

        {/* Benefits */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            {t("Benefits", "लाभ")}
          </h2>
          <ul>
            {t(content.benefits.en, content.benefits.hi).map(
              (b: string, i: number) => (
                <li key={i}>✓ {b}</li>
              )
            )}
          </ul>
        </section>

        {/* Other Ekadashi */}
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-4">
            {t("Explore Other Ekadashis", "अन्य एकादशी देखें")}
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {getAllEkadashiSlugs().map((slug) => {
              const other = getEkadashiContent(slug);
              return (
                <Link
                  key={slug}
                  href={`/${locale}/ekadashi/${slug}?year=${selectedYear}`}
                  className="p-2 bg-gray-100 rounded text-xs"
                >
                  {t(other?.name.en, other?.name.hi)}
                </Link>
              );
            })}
          </div>
        </section>

      </article>
    </div>
  );
}