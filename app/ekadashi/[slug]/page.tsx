import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getEkadashiContent,
  getAllEkadashiSlugs,
} from "@/app/data/ekadashi";
import LocationText from "@/components/location/LocationText";

const BACKEND = "https://jyotishasha-backend.onrender.com";

/* ---------------- FETCH DYNAMIC DATA ---------------- */

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
    return result.data; 
  } catch (error) {
    console.error("Fetch Error:", error);
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
  params: { slug: string };
  searchParams: { year?: string };
}) {
  const content = getEkadashiContent(params.slug);
  if (!content) notFound();

  // 1. Logic for Year: Default to current, or use searchParam
  const currentYear = new Date().getFullYear();
  const selectedYear = searchParams.year ? parseInt(searchParams.year) : currentYear;

  // 2. Fetch Dynamic Timings
  const dynamic = await getEkadashiDynamicData(params.slug, selectedYear);

  const currentUrl = `https://www.jyotishasha.com/ekadashi/${params.slug}`;

  return (
    <div className="bg-gradient-to-b from-orange-900 to-orange-800 py-16 min-h-screen">
      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-10 py-14 shadow-2xl text-black">
        
        {/* --- SEO BREADCRUMBS --- */}
        <nav className="flex text-sm text-gray-500 mb-6 gap-2">
          <Link href="/" className="hover:text-orange-600">Home</Link> <span>/</span>
          <Link href="/ekadashi" className="hover:text-orange-600">Ekadashi</Link> <span>/</span>
          <span className="text-orange-700 font-medium">{content.name.en}</span>
        </nav>

        {/* --- H1 TITLE --- */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
          {content.name.en} ({content.name.hi}) {selectedYear} <LocationText />: Date, Muhurat & Katha
        </h1>

        {/* --- YEAR NAVIGATION (Holi Style) --- */}
        <div className="flex gap-6 mb-12 text-sm border-b pb-4">
          {[2026, 2027].map((y) => (
            <Link 
              key={y}
              href={`/ekadashi/${params.slug}?year=${y}`}
              className={`${selectedYear === y ? "font-bold border-b-2 border-orange-700 text-orange-700 pb-1" : "text-gray-500 hover:text-orange-600"}`}
            >
              {content.name.en} {y}
            </Link>
          ))}
        </div>

        {/* --- TOP HIGHLIGHT CARDS (Holi Style) --- */}
        <section className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="bg-orange-700 text-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-sm uppercase opacity-80 font-semibold">Vrat Date</div>
            <div className="text-3xl font-bold mt-2">
                {dynamic?.vrat_date ? new Date(dynamic.vrat_date).toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'}) : "Check Panchang"}
            </div>
            <div className="mt-2 text-orange-200 text-sm">Month: {content.month} ({content.paksha} Paksha)</div>
          </div>

          <div className="bg-gradient-to-r from-orange-800 to-red-900 text-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
            <div className="text-sm uppercase opacity-80 font-semibold">Parana Time (Fast Breaking)</div>
            <div className="text-3xl font-bold mt-2">{dynamic?.parana?.start || "TBA"} - {dynamic?.parana?.end || "TBA"}</div>
            <div className="mt-2 text-orange-200 text-sm">On Dwadashi Tithi</div>
          </div>
        </section>

        {/* --- DETAILED MUHURAT TABLE --- */}
        {dynamic && (
            <section className="bg-orange-50 border border-orange-100 rounded-2xl p-8 mb-14">
                <h2 className="text-2xl font-bold mb-6 text-orange-900 flex items-center gap-2">
                    📅 {content.name.en} {selectedYear} Detailed Timings
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 text-center">
                        <div className="text-xs uppercase text-gray-500 font-bold">Tithi Starts</div>
                        <div className="text-orange-800 font-semibold mt-1">{dynamic.tithi.start}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 text-center">
                        <div className="text-xs uppercase text-gray-500 font-bold">Tithi Ends</div>
                        <div className="text-orange-800 font-semibold mt-1">{dynamic.tithi.end}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 text-center">
                        <div className="text-xs uppercase text-gray-500 font-bold">Hari Vasara End</div>
                        <div className="text-orange-800 font-semibold mt-1">{dynamic.parana.hari_vasara_end}</div>
                    </div>
                </div>
            </section>
        )}

        {/* --- MAIN CONTENT: INTRO & SIGNIFICANCE --- */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-16">
            <h2 className="text-3xl font-bold text-orange-900 mb-4">About {content.name.en}</h2>
            <p className="whitespace-pre-line bg-gray-50 p-6 rounded-2xl border-l-4 border-orange-500 italic">
                {content.intro.en}
            </p>

            <h2 className="text-3xl font-bold text-orange-900 mt-12 mb-4">Significance (Mahatmya)</h2>
            <p className="whitespace-pre-line">{content.significance.en}</p>
        </div>

        {/* --- VRAT VIDHI (Step by Step) --- */}
        <section className="mb-16 bg-gradient-to-br from-white to-orange-50 rounded-3xl border border-orange-100 p-8 shadow-inner">
            <h2 className="text-3xl font-bold text-orange-900 mb-8">Pooja Vidhi: How to perform {content.name.en}</h2>
            <div className="space-y-4">
                {content.vidhi.en.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">{i+1}</span>
                        <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* --- BENEFITS SECTION --- */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                <h3 className="text-2xl font-bold text-green-900 mb-4">Benefits of this Vrat</h3>
                <ul className="space-y-3">
                    {content.benefits.en.map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-green-800">
                            <span className="text-xl">✨</span> {b}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Important Note</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                    Always break the fast during the Parana time mentioned above. Breaking it during Hari Vasara or after Dwadashi ends is considered inauspicious according to Shastras.
                </p>
            </div>
        </section>

        {/* --- YOUTUBE SECTION --- */}
        {content.videoUrl && (
            <section className="mb-16">
                <div className="rounded-3xl border border-orange-200 shadow-xl overflow-hidden bg-white">
                    <div className="p-8 bg-orange-600 text-white">
                        <h2 className="text-2xl font-bold">{content.name.en} Vrat Katha & Vidhi Video</h2>
                    </div>
                    <div className="aspect-video">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${content.videoUrl.split('v=')[1]}`}
                            title="Ekadashi Video"
                            allowFullScreen
                        />
                    </div>
                    <div className="p-6 text-center">
                        <a href="https://youtube.com/@jyotishasha" target="_blank" className="text-red-600 font-bold hover:underline">
                            🔔 Subscribe to Jyotishasha for Daily Updates
                        </a>
                    </div>
                </div>
            </section>
        )}

        {/* --- FAQ SECTION --- */}
        <section className="mb-16 bg-gray-50 p-8 rounded-3xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
                {content.faq.en.map((item, i) => (
                    <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                        <h3 className="font-bold text-lg text-orange-900 mb-2">Q: {item.q}</h3>
                        <p className="text-gray-700 pl-4 border-l-4 border-orange-200">{item.a}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* --- AUTHORITY SECTION (SEO) --- */}
        <footer className="mt-20 pt-10 border-t border-gray-100">
            <div className="bg-gray-100 p-8 rounded-2xl text-sm text-gray-600 leading-relaxed">
                <h4 className="font-bold text-gray-800 mb-2">Panchang Calculation Methodology</h4>
                <p>
                    The {content.name.en} {selectedYear} timings provided are based on the Vedic Luni-Solar calendar. We use precise astronomical algorithms (Lahiri Ayanamsa) to calculate Tithi, Nakshatra, and Parana timings for India. Please note that timings may vary slightly based on your specific city's sunrise.
                </p>
                <p className="mt-4 italic">Last updated: {new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
            </div>
        </footer>

      </article>
    </div>
  );
}