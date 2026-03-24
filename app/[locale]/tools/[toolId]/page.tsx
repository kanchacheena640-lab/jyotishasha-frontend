import type { Metadata } from "next";
import { toolContentMap } from "@/app/data/toolContent";
import ToolDynamicPage from "./ToolDynamicPage";

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
    },
  };
}

export default function ToolPage({ params }: { params: { toolId: string; locale?: string } }) {
  const toolRaw = toolContentMap[params.toolId];
  
  // Language determination
  const lang = params.locale === 'hi' ? 'hi' : 'en';
  const tool = toolRaw ? toolRaw[lang] : null;

  if (!tool) {
    return <div className="text-white text-center py-20">Tool Content Not Found</div>;
  }

  return (
    <>
      {/* 🔹 TOOL INTERACTION UI (Calculators/Charts) */}
      <ToolDynamicPage />

      {/* 🔹 SEO & TEXT CONTENT (Bilingual Support) */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-white space-y-8">
        
        {/* Title: H2 SEO ke liye best hai */}
        <h2 className="text-3xl font-bold text-purple-300 border-b border-purple-900/40 pb-4">
          {tool.seo.title}
        </h2>

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

        {/* ✅ FAQ SCHEMA (Google Rich Snippets ke liye) */}
        {tool.faq && tool.faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildFaqJsonLd(tool.faq)),
            }}
          />
        )}
      </div>
    </>
  );
}