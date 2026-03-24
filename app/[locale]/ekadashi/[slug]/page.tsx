import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getEkadashiContent,
  getAllEkadashiSlugs,
} from "@/app/data/ekadashi";
import LocationText from "@/components/location/LocationText";

const BACKEND = "https://jyotishasha-backend.onrender.com";

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
    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const slugs = getAllEkadashiSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ---------------- PAGE ---------------- */
export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; locale: string };
  searchParams: { year?: string };
}) {
  const locale = params.locale || "en";
  const isHi = locale === "hi";

  const t = (en: any, hi: any) => (isHi ? hi : en);

  const content = getEkadashiContent(params.slug);
  if (!content) notFound();

  const currentYear = new Date().getFullYear();
  const selectedYear = searchParams.year
    ? parseInt(searchParams.year)
    : currentYear;

  const dynamic = await getEkadashiDynamicData(
    params.slug,
    selectedYear,
    locale
  );

  const currentUrl = `https://www.jyotishasha.com/${locale}/ekadashi/${params.slug}`;

  const displayDate = formatDate(dynamic?.vrat_date);
  const displayParanaTime = dynamic
    ? `${formatTimeOnly(dynamic.parana.start)} - ${formatTimeOnly(
        dynamic.parana.end
      )}`
    : "TBA";
  const displayParanaDate = formatDate(dynamic?.parana?.parana_date);

  const tithiStart = dynamic?.tithi?.start || "TBA";
  const tithiEnd = dynamic?.tithi?.end || "TBA";

  const shareText = `✨ *${t(
    content.name.en,
    content.name.hi
  )} ${selectedYear}* ✨
📅 ${t("Date", "तारीख")}: ${displayDate}
⏳ ${t("Parana", "पारण")}: ${displayParanaTime}
🔗 ${currentUrl}`;

  return (
    <div className="bg-gradient-to-b from-orange-900 to-orange-800 py-6 md:py-16 min-h-screen">
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
          {t(content.name.en, content.name.hi)} {selectedYear}{" "}
          <LocationText />:{" "}
          {t("Vrat Date, Muhurat & Katha", "व्रत तिथि, मुहूर्त और कथा")}
        </h1>

        {/* Year Tabs */}
        <div className="flex gap-4 mb-8 border-b pb-2">
          {[2026, 2027].map((y) => (
            <Link
              key={y}
              href={`/${locale}/ekadashi/${params.slug}?year=${y}`}
              className={
                selectedYear === y
                  ? "text-orange-700 border-b-4 border-orange-700 pb-2"
                  : "text-gray-400"
              }
            >
              {y}
            </Link>
          ))}
        </div>

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
                  href={`/${locale}/ekadashi/${slug}`}
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