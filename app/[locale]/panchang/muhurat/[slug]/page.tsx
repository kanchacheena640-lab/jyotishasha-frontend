import { muhurthTopics } from "../../muhurat/muhurth_topics";
import { CtaMuhurth, CtaKundali, CtaReport } from "@/components/cta";
import { faq_muhurth } from "@/app/data/faq_muhurth";
import Link from "next/link";

// 🧩 Importing Our New "Tunch" Components
import { DynamicHero } from "@/components/muhurat/DynamicHero";
import { PrimeDates } from "@/components/muhurat/PrimeDates";
import { QuickActionGrid } from "@/components/muhurat/QuickActionGrid";
import { ZodiacVibeScroll } from "@/components/muhurat/ZodiacVibeScroll";
import { ExpandableDates } from "@/components/muhurat/ExpandableDates";
import { MuhurthArtFaq } from "@/components/muhurat/MuhurthArtFaq";

export const revalidate = 86400;

// 🔍 SEO & Metadata (Ranking Priority)
export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const isHi = params.locale === "hi";
  const topic = muhurthTopics[params.slug];
  const now = new Date();
  const month = now.toLocaleString(isHi ? "hi-IN" : "en-US", { month: "long" });
  const year = now.getFullYear();
  
  if (!topic) return { title: "Not Found" };
  
  const title = isHi ? `${topic.title_hi} – ${month} ${year}` : `${topic.title} – ${month} ${year}`;
  
  return {
    title,
    description: isHi ? topic.description_hi : topic.description,
    keywords: topic.keywords || [],
    alternates: { canonical: topic.canonical },
    openGraph: { 
      title, 
      description: isHi ? topic.description_hi : topic.description, 
      url: topic.canonical, 
      images: ["/og/muhurat-base.jpg"], 
      type: "article" 
    },
  };
}

// 📡 Data Fetching from Backend
async function getMuhurth(activity: string, lang: string) {
  if (activity === "grahpravesh-muhurat") activity = "grahpravesh";
  const res = await fetch("https://jyotishasha-backend.onrender.com/api/muhurth/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activity, latitude: 26.8467, longitude: 80.9462, days: 60, lang }),
    next: { revalidate: 86400 },
  });
  const data = await res.json();
  return data.results?.slice(0, 30) || [];
}

export default async function MuhuratPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  const isHi = locale === "hi";
  const topic = muhurthTopics[slug];
  
  if (!topic) return null;

  const dates = await getMuhurth(topic.activity, locale);
  const now = new Date();
  const monthName = now.toLocaleString(isHi ? "hi-IN" : "en-US", { month: "long" });
  const year = now.getFullYear();

  // Helper for PrimeDates Summary
  const getSummary = (score: number) => {
    const s = Math.round(score);
    if (isHi) return s >= 6 ? "बेहद शुभ दिन" : "अनुकूल समय";
    return s >= 6 ? "Highly Auspicious" : "Favorable Time";
  };

  return (
    <article className="max-w-6xl mx-auto px-4 py-10 text-white leading-relaxed">
      
      {/* 1️⃣ SEO Dynamic Hero */}
      <DynamicHero 
        title={isHi ? topic.title_hi : topic.title} 
        month={monthName} 
        year={year} 
        isHi={isHi} 
        locale={locale} 
      />

      {/* 🚀 2️⃣ Side-by-Side Grid: Prime Dates + Quick Actions */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Top 3 Dates (7 cols on Desktop) */}
        <div className="lg:col-span-7">
          <PrimeDates 
            dates={dates} 
            isHi={isHi} 
            monthName={monthName} 
            getSummary={getSummary} 
          />
        </div>

        {/* Right: Personal Intent CTA (5 cols on Desktop) */}
        <div className="lg:col-span-5">
          <QuickActionGrid 
            activity={topic.activity} 
            locale={locale} 
            isHi={isHi} 
          />
        </div>

      </section>

      {/* 3️⃣ Zodiac Scroll (Full Width) */}
      <div className="my-4">
        <ZodiacVibeScroll locale={locale} isHi={isHi} />
      </div>

      {/* 4️⃣ Full Expandable Dates Table (Default Closed) */}
      <ExpandableDates 
        dates={dates} 
        isHi={isHi} 
        monthName={monthName} 
        year={year} 
      />

      {/* 📝 Ranking Content (SEO Insight) */}
      <section className="my-16 prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-purple-200 mb-6 border-b border-white/10 pb-2">
           {isHi ? `${topic.title_hi.split(" – ")[0]} का महत्व और शास्त्र` : `Significance of ${topic.title.split(" – ")[0]}`}
        </h2>
        <div className="text-gray-300 text-sm md:text-base space-y-5 leading-loose">
           {isHi ? topic.description_hi : topic.description}
        </div>
      </section>

      <CtaKundali />

      {/* 5️⃣ FAQ Section (Rich Snippets) */}
      <div className="mt-16">
        <MuhurthArtFaq 
          faqs={faq_muhurth[topic.activity] || []} 
          isHi={isHi} 
          activityName={isHi ? topic.title_hi.split(" – ")[0] : topic.title.split(" – ")[0]} 
        />
      </div>

      {/* Standard Bottom CTAs */}
      <div className="space-y-6 mt-12">
        <CtaMuhurth slug={slug} />
        <CtaReport />
      </div>

      {/* 🔗 Related Guides Footer */}
      <footer className="mt-20 pt-10 border-t border-white/10">
        <h3 className="text-xl font-black text-purple-200 mb-8 uppercase tracking-widest text-center md:text-left">
          {isHi ? "अन्य महत्वपूर्ण मुहूर्त" : "Explore More Guides"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
           {Object.values(muhurthTopics)
            .filter(t => t.slug !== slug)
            .slice(0, 6)
            .map(t => (
             <Link 
                key={t.slug} 
                href={`/${locale}/panchang/muhurat/${t.slug}`} 
                className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center hover:bg-white/10 hover:border-purple-500/30 transition-all group shadow-sm"
             >
                <span className="text-xs font-bold text-purple-300 group-hover:text-white">
                  {isHi ? t.title_hi.split(" – ")[0] : t.title.split(" – ")[0]}
                </span>
             </Link>
           ))}
        </div>
      </footer>
    </article>
  );
}