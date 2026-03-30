  import { muhurthTopics } from "@/app/[locale]/panchang/muhurat/muhurth_topics"; // ✅ Path updated
  import Link from "next/link";
  import Script from "next/script";
  import AppDownloadCTA from "@/components/AppDownloadCTA";

  export const revalidate = 86400;

  // ✅ Dynamic Metadata Function (Replaces static metadata)
  export async function generateMetadata({ params }: { params: { locale: string } }) {
    const isHi = params.locale === "hi";
    
    const title = isHi 
      ? "सभी शुभ मुहूर्त लेख | ज्‍योतिष आशा" 
      : "All Shubh Muhurat Articles | Jyotishasha";
      
    const description = isHi
      ? "विवाह, गृह प्रवेश, नामकरण, सोना खरीदने और अन्य शुभ कार्यों के लिए हिंदू पंचांग आधारित मुहूर्त गाइड।"
      : "Explore detailed Hindu Panchang-based Muhurat guides for Marriage, Grah Pravesh, Naamkaran, Gold Buying and more.";

    const canonical = `https://www.jyotishasha.com${isHi ? '/hi' : ''}/panchang/muhurat-articles`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        images: ["https://www.jyotishasha.com/og/muhurat-base.jpg"],
        type: "article",
      },
    };
  }

  export default function AllMuhurthArticlesPage({ params }: { params: { locale: string } }) {
    const isHi = params.locale === "hi";
    const langPath = isHi ? "/hi" : "";
    
    const now = new Date();
    const month = now.toLocaleString(isHi ? "hi-IN" : "en-US", { month: "long" });
    const year = now.getFullYear();

    const topics = Object.values(muhurthTopics);

    return (
      <article className="max-w-6xl mx-auto px-4 py-10 text-white leading-relaxed">
        {/* 🪔 Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-3">
            {isHi ? `🔮 सभी शुभ मुहूर्त गाइड – ${month} ${year}` : `🔮 Explore All Shubh Muhurat Guides – ${month} ${year}`}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {isHi ? (
              <>
                अपने जीवन के महत्वपूर्ण कार्यों के लिए शुभ <strong>मुहूर्त</strong> खोजें — <strong>विवाह</strong> और <strong>गृह प्रवेश</strong> से लेकर{" "}
                <strong>नामकरण</strong> और <strong>सोना खरीदने</strong> तक।{" "}
                <Link href="/hi/panchang" className="text-purple-300 hover:text-purple-100 underline">हिंदू पंचांग</Link> के अनुसार अपडेटेड।
              </>
            ) : (
              <>
                Find auspicious <strong>Muhurats</strong> for major life events — from{" "}
                <strong>Marriage</strong> and <strong>Grah Pravesh</strong> to{" "}
                <strong>Naamkaran</strong> and <strong>Gold Buying</strong>. Updated monthly as per{" "}
                <Link href="/panchang" className="text-purple-300 hover:text-purple-100 underline">Hindu Panchang</Link>.
              </>
            )}
          </p>
        </header>

        {/* 🧭 Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topics.map((topic: any) => {
              const displayTitle = isHi ? (topic.title_hi || topic.title).split(" – ")[0] : topic.title.split(" – ")[0];
              const displayDesc = isHi ? (topic.description_hi || topic.description) : topic.description;

              return (
                <Link
                  key={topic.slug}
                  href={`${langPath}/panchang/muhurat/${topic.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/30 shadow-sm hover:shadow-lg transition-all duration-300 bg-[#161b2e]"
                >
                  <div className="relative h-44 md:h-52">
                    <img
                      src="/og/muhurat-base.jpg"
                      alt={`${displayTitle} - ${month} ${year}`}
                      className="object-cover w-full h-full opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161b2e] via-transparent to-transparent flex items-end p-4">
                      <h2 className="text-lg md:text-xl font-bold text-purple-100 uppercase tracking-wide drop-shadow-md">
                        {displayTitle}
                      </h2>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-purple-300 text-[10px] font-bold uppercase mb-2 tracking-wider">
                      {isHi ? "अपडेटेड" : "Updated"} – {month} {year}
                    </p>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {displayDesc}
                    </p>
                    <p className="text-xs text-purple-300 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      {isHi ? "विस्तार से पढ़ें" : "Read More"} <span>→</span>
                    </p>
                  </div>
                </Link>
              );
          })}
        </section>

        <AppDownloadCTA utm={{ source: "muhurat_hub", medium: "content_cta", campaign: "all_muhurat" }} />

        {/* 💎 Gemstone Link */}
        <div className="mt-12 text-center">
          <a
            href="https://astroblog.in/product-category/rashi-ratna/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-500/10 text-purple-200 border border-purple-400/30 rounded-xl px-6 py-3 text-sm hover:bg-purple-500/20 transition"
          >
            {isHi ? "💎 असली और अभिमंत्रित राशि रत्न खरीदें" : "💎 Buy Original & Abhimantrit Rashi Ratna"}
          </a>
        </div>

        {/* ⚙️ Footer */}
        <footer className="mt-12 text-center text-gray-500 text-xs border-t border-white/5 pt-6">
          {isHi 
            ? "डेटा ज्‍योतिष आशा API से ऑटो-अपडेटेड • प्रामाणिक हिंदू पंचांग (लाहिड़ी अयनांश) पर आधारित"
            : "Data auto-updated from Jyotishasha API • Based on authentic Hindu Panchang (Lahiri Ayanamsa)"}
        </footer>

        {/* ✅ Schema Codes (Locale-Aware) */}
        <Script id="itemlist-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: isHi ? "सभी शुभ मुहूर्त लेख" : "All Shubh Muhurat Articles",
            url: `https://www.jyotishasha.com${langPath}/panchang/muhurat-articles`,
            itemListElement: topics.map((topic: any, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.jyotishasha.com${langPath}/panchang/muhurat/${topic.slug}`,
              name: isHi ? (topic.title_hi || topic.title).split(" – ")[0] : topic.title.split(" – ")[0],
            })),
          })}
        </Script>
      </article>
    );
  }