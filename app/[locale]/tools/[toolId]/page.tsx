import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolContentMap } from "@/app/data/toolContent";
import ToolDynamicPage from "./ToolDynamicPage";
import MangalDoshLanding from "@/components/tools/mangal-dosh/MangalDoshLanding";
import RashiFinderLanding from "@/components/tools/rashi-finder/RashiFinderLanding";
import { SITE_URL } from "@/lib/seo/articleSchema";

// Every tool page is known at build time (the content map), so it is prerendered per locale instead of being
// rendered on every request. The page HTML holds no personal data: the calculation runs in the browser.
export function generateStaticParams() {
  return Object.keys(toolContentMap).filter((toolId) => toolId !== "all-tools").map((toolId) => ({ toolId }));
}

// 🔹 Question-Answer Schema (Google Search Results ke liye)
function buildFaqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };
}

function buildBreadcrumbJsonLd(
  toolTitle: string,
  toolId: string,
  lang: string
) {
  const base =
    lang === "hi"
      ? "https://www.jyotishasha.com/hi"
      : "https://www.jyotishasha.com";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "hi" ? "होम" : "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "hi" ? "टूल्स" : "Tools",
        item: `${base}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: toolTitle,
        item: `${base}/tools/${toolId}`,
      },
    ],
  };
}

// 🔹 Metadata Generator: SEO Titles aur Descriptions handle karega
export function generateMetadata(
  { params }: { params: { toolId: string; locale?: string } }
): Metadata {
  const toolRaw = toolContentMap[params.toolId];
  
  // URL params se current language pakadna (Default: en)
  const lang = params.locale === 'hi' ? 'hi' : 'en';
  const tool = toolRaw ? toolRaw[lang] : null;

    if (!tool) {
      return {
        title: "Free Astrology Tool | Jyotishasha",
        description: "Accurate Vedic astrology tools for life guidance.",
      };
    }

    return {
      title: tool.seo.title,
      description: tool.seo.description,
      keywords: tool.seo.keywords,
      alternates: {
        canonical: `https://www.jyotishasha.com/${lang === 'hi' ? 'hi/' : ''}tools/${params.toolId}`,
        languages: {
          en: `${SITE_URL}/tools/${params.toolId}`,
          hi: `${SITE_URL}/hi/tools/${params.toolId}`,
          "x-default": `${SITE_URL}/tools/${params.toolId}`,
        },
      },
    };
  }

  export default function ToolPage({ params }: { params: { toolId: string; locale?: string } }) {
    const toolRaw = toolContentMap[params.toolId];
    
    // Language determination
    const lang = params.locale === 'hi' ? 'hi' : 'en';
    const tool = toolRaw ? toolRaw[lang] : null;

  // An unknown tool id is a real 404 (it used to answer 200 with a "Tool Content Not Found" page).
  if (!tool) notFound();

  // Mangal Dosh: server-rendered editorial page (H1, introduction, sections, visible FAQ, schema) around the
  // shared calculator island. Every other tool keeps the generic layout below.
  if (params.toolId === "mangal-dosh") {
    return <MangalDoshLanding locale={lang} />;
  }
  if (params.toolId === "rashi-finder") {
    return <RashiFinderLanding locale={lang} />;
  }

  // Breadcrumb name: the tool's own name, without the title tag's tagline and brand.
  const breadcrumbSchema = buildBreadcrumbJsonLd(
    tool.seo.title.split(/[–|]/)[0].trim(),
    params.toolId,
    lang
  );

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",

    name: tool.seo.title,

    description: tool.seo.description,

    applicationCategory: "LifestyleApplication",

    operatingSystem: "Any",

    url:
      lang === "hi"
        ? `https://www.jyotishasha.com/hi/tools/${params.toolId}`
        : `https://www.jyotishasha.com/tools/${params.toolId}`,

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      {/* 🔹 TOOL INTERACTION UI (Calculators/Charts) */}
      <ToolDynamicPage />

      {/* 🔹 SEO & TEXT CONTENT (Bilingual Support) */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-white space-y-8">
        
        {/* Main page title */}
        <h1 className="text-3xl font-bold text-purple-300 border-b border-purple-900/40 pb-4">
          {tool.seo.title}
        </h1>

        {/* Content Paragraphs */}
        <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
          <p className="font-medium text-purple-100">{tool.content.intro}</p>
          <p>{tool.content.whatIsRashi}</p>
          <p>{tool.content.whyMoonRashiImportant}</p>
          
          {/* Naya field jo humne data files mein add kiya hai */}
          <div className="bg-[#1e1b4b]/40 p-6 rounded-2xl border border-purple-500/20">
            <p>{tool.content.howToolWorks}</p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-4 pt-4">
          <h3 className="text-2xl font-semibold text-purple-300">
            {lang === 'hi' ? 'मुख्य लाभ:' : 'Key Benefits:'}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.content.benefits.map((benefit: string, index: number) => (
              <li key={index} className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-purple-400 font-bold">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sun vs Moon Context */}
        <div className="p-6 bg-gradient-to-r from-purple-900/30 to-transparent rounded-xl border-l-4 border-purple-600">
          <p className="text-gray-300 italic">{tool.content.sunVsMoonRashi}</p>
        </div>

        {/* 🎥 VIDEO SECTION */}
        {tool.video?.youtubeUrl && (
          <div className="pt-8">
            <h3 className="text-2xl font-semibold text-purple-300 mb-6">
              {tool.video.title}
            </h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
              <iframe
                src={tool.video.youtubeUrl.replace("watch?v=", "embed/")}
                title={tool.video.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Visible FAQ: the same questions as the FAQPage schema below. */}
        {tool.faq && tool.faq.length > 0 && (
          <section aria-labelledby="tool-faq-heading" className="pt-4">
            <h2 id="tool-faq-heading" className="text-2xl font-semibold text-purple-300">
              {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            </h2>
            <div className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5 px-4">
              {tool.faq.map((item: { q: string; a: string }) => (
                <details key={item.q} className="py-1">
                  <summary className="min-h-[44px] cursor-pointer py-3 text-lg font-medium text-purple-100">{item.q}</summary>
                  <p className="pb-3 text-gray-200 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

                {/* ✅ FAQ SCHEMA (Google Rich Snippets ke liye) */}
                {tool.faq && tool.faq.length > 0 && (
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(buildFaqJsonLd(tool.faq)),
                    }}
                  />
                )}

                {/* ✅ Breadcrumb Schema */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                  }}
                />

                {/* ✅ WebApplication Schema */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webAppSchema),
                  }}
                />
              </div>
            </>
          );

}