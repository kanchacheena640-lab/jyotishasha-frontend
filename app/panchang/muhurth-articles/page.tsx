import { muhurthTopics } from "@/app/panchang/muhurat/muhurth_topics";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";

export const revalidate = 86400; // 🔁 Auto-refresh every 24 hrs

// ✅ Dynamic, SEO-ready metadata
export const metadata = {
  title: "All Shubh Muhurat Articles | Jyotishasha",
  description:
    "Explore detailed Hindu Panchang-based Muhurat guides for Marriage, Grah Pravesh, Naamkaran, Gold Buying, Child Birth, Foreign Travel and more — updated monthly.",
  keywords: [
    "Shubh Muhurat",
    "Auspicious Dates",
    "Hindu Panchang Muhurat",
    "Marriage Muhurat",
    "Grah Pravesh Muhurat",
    "Naamkaran Muhurat",
    "Gold Buying Muhurat",
    "Child Birth Muhurat",
    "Foreign Travel Muhurat",
    "Vedic Timings",
    "Jyotishasha",
  ],
  alternates: {
    canonical: "https://www.jyotishasha.com/panchang/muhurth-articles",
  },
  openGraph: {
    title: "All Shubh Muhurat Articles | Jyotishasha",
    description:
      "Discover auspicious Muhurats and Vedic timings for all major life events, updated monthly as per Hindu Panchang.",
    url: "https://www.jyotishasha.com/panchang/muhurth-articles",
    images: ["https://www.jyotishasha.com/og/muhurat-base.jpg"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Shubh Muhurat Articles | Jyotishasha",
    description:
      "Explore detailed Hindu Panchang-based Muhurat guides for all life events.",
    images: ["https://www.jyotishasha.com/og/muhurat-base.jpg"],
  },
};

export default function AllMuhurthArticlesPage() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  const topics = Object.values(muhurthTopics);

  return (
    <article className="max-w-6xl mx-auto px-4 py-10 text-white leading-relaxed">
      {/* 🪔 Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-3">
          🔮 Explore All Shubh Muhurat Guides – {month} {year}
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Find auspicious <strong>Muhurats</strong> for major life events — from{" "}
          <strong>Marriage</strong> and <strong>Grah Pravesh</strong> to{" "}
          <strong>Naamkaran</strong>, <strong>Child Birth</strong> and{" "}
          <strong>Gold Buying</strong>. Updated monthly as per authentic{" "}
          <Link
            href="/panchang"
            className="text-purple-300 hover:text-purple-100 underline"
          >
            Hindu Panchang
          </Link>
          .
        </p>
      </header>

      {/* 🧭 Cards Grid (image + overlay + desc) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.values(muhurthTopics).map((topic) => {
            const titleBase = topic.title.split(" – ")[0];
            const month = new Date().toLocaleString("en-US", { month: "long" });
            const year = new Date().getFullYear();

            return (
            <Link
                key={topic.slug}
                href={`/panchang/muhurat/${topic.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/30 shadow-sm hover:shadow-lg transition-all duration-300"
            >
                {/* 🔮 Common background image */}
                <div className="relative h-44 md:h-52">
                <img
                    src="/og/muhurat-base.jpg"
                    alt={`${titleBase} Muhurat – ${month} ${year}`}
                    className="object-cover w-full h-full"
                />
                {/* 🟣 Gradient + overlay title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-center justify-center">
                    <h2 className="text-lg md:text-xl font-bold text-purple-100 uppercase tracking-wide text-center drop-shadow-md">
                    {titleBase}
                    </h2>
                </div>
                </div>

                {/* 🔮 Description below image */}
                <div className="p-4 bg-white/5 backdrop-blur-sm">
                <p className="text-purple-200 text-xs mb-1">
                    Updated – {month} {year}
                </p>
                <p className="text-gray-400 text-sm line-clamp-3">
                    {topic.description}
                </p>
                <p className="mt-4 text-xs text-purple-200 flex items-center gap-1">
                    Read More <span className="text-purple-300">→</span>
                </p>
                </div>
            </Link>
            );
        })}
        </section>

      {/* 💎 External Authority Link (E-A-T) */}
      <div className="mt-12 text-center">
        <a
          href="https://astroblog.in/product-category/rashi-ratna/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-purple-500/20 to-purple-700/20 text-purple-200 border border-purple-400/30 rounded-xl px-5 py-2 text-sm hover:bg-purple-500/30 transition"
        >
          💎 Buy Original & Abhimantrit Rashi Ratna
        </a>
        <p className="text-xs text-gray-500 mt-2">
          Partner link • Energized gemstones blessed under Vedic rituals for prosperity and protection.
        </p>
      </div>

      {/* ⚙️ Footer */}
      <footer className="mt-12 text-center text-gray-400 text-xs border-t border-white/10 pt-4">
        Data auto-updated from Jyotishasha API • Based on authentic Hindu Panchang (Lahiri Ayanamsa)
      </footer>

      {/* ✅ ItemList Schema for list hub */}
      <Script id="itemlist-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "All Shubh Muhurat Articles",
          description:
            "Explore all auspicious Muhurat guides including Marriage, Grah Pravesh, Naamkaran, Child Birth, Gold Buying and more.",
          url: "https://www.jyotishasha.com/panchang/muhurth-articles",
          itemListElement: topics.map((topic, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.jyotishasha.com/panchang/muhurat/${topic.slug}`,
            name: topic.title.split(" – ")[0],
          })),
        })}
      </Script>

      {/* ✅ Breadcrumb Schema */}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Panchang",
              item: "https://www.jyotishasha.com/panchang",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Muhurat Articles",
              item: "https://www.jyotishasha.com/panchang/muhurth-articles",
            },
          ],
        })}
      </Script>
    </article>
  );
}
