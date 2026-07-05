import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/articleSchema";

const WP_BASE = "https://astroblog.in/wp-json/wp/v2";

interface WPPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  better_featured_image?: { source_url?: string };
}

function stripHtml(html?: string) {
  return html ? html.replace(/<[^>]+>/g, "").trim() : "";
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

async function fetchSearchResults(query: string): Promise<WPPost[]> {
  if (!query.trim()) return [];
  try {
    const res = await fetch(
      `${WP_BASE}/posts?search=${encodeURIComponent(query)}&per_page=15&_embed=1`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    return res.json() as Promise<WPPost[]>;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { query?: string };
}): Promise<Metadata> {
  const locale = params.locale === "hi" ? "hi" : "en";
  const query = searchParams?.query ?? "";
  const isHi = locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/search`;

  const title = isHi
    ? `"${query}" के लिए खोज परिणाम | ज्योतिष आशा`
    : `Search results for "${query}" | Jyotishasha`;

  return {
    title,
    description: isHi
      ? "ज्योतिष आशा पर अपनी जानकारी खोजें"
      : "Search Jyotishasha for astrology articles and content",
    alternates: { canonical: canonicalUrl },
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { query?: string };
}) {
  const locale = params.locale === "hi" ? "hi" : "en";
  const isHi = locale === "hi";
  const query = searchParams?.query ?? "";
  const results = await fetchSearchResults(query);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {isHi ? "खोज परिणाम" : "Search Results"}
          </h1>
          {query && (
            <p className="text-gray-400 text-sm">
              {isHi
                ? `"${query}" के लिए ${results.length} परिणाम`
                : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
            </p>
          )}
        </div>

        {/* Results */}
        {!query ? (
          <p className="text-gray-500">
            {isHi ? "कृपया खोज शब्द दर्ज करें।" : "Please enter a search term."}
          </p>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">
              {isHi ? `"${query}" के लिए कोई परिणाम नहीं मिला।` : `No results found for "${query}".`}
            </p>
            <Link
              href={isHi ? "/hi" : "/"}
              className="text-purple-400 hover:text-purple-300 underline text-sm"
            >
              {isHi ? "होम पेज पर जाएं" : "Return to home"}
            </Link>
          </div>
        ) : (
          <ul className="space-y-5">
            {results.map((post) => {
              const excerpt = stripHtml(post.excerpt?.rendered).slice(0, 180);
              return (
                <li key={post.id}>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#111827] border border-purple-900/40 rounded-2xl p-5
                      hover:border-purple-500/70 hover:bg-[#1a1f2e] transition-all duration-200"
                  >
                    <p className="text-xs text-purple-400 mb-1">{formatDate(post.date)}</p>
                    <h2
                      className="text-base md:text-lg font-semibold text-white mb-2 leading-snug"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    {excerpt && (
                      <p className="text-sm text-gray-400 leading-relaxed">{excerpt}{excerpt.length === 180 ? "…" : ""}</p>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

      </div>
    </div>
  );
}
