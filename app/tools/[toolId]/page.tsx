import type { Metadata } from "next";
import { toolContentMap } from "@/app/data/toolContent";
import ToolDynamicPage from "./ToolDynamicPage";

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

export function generateMetadata(
  { params }: { params: { toolId: string } }
): Metadata {
  const tool = toolContentMap[params.toolId];

  if (!tool) {
    return {
      title: "Free Astrology Tool | Jyotishasha",
      description: "Use free Vedic astrology tools for accurate life guidance.",
      alternates: {
        canonical: `https://www.jyotishasha.com/tools/${params.toolId}`,
      },
    };
  }

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: `https://www.jyotishasha.com/tools/${params.toolId}`,
    },
  };
}

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const tool = toolContentMap[params.toolId];

  return (
    <>
      {/* 🔹 TOOL (FULL WIDTH – unchanged layout) */}
      <ToolDynamicPage />

      {/* 🔹 SEO CONTENT (separate container) */}
      {tool && (
        <div className="max-w-5xl mx-auto px-4 py-12 text-white space-y-6">
          <h2 className="text-2xl font-bold text-purple-300">
            {tool.seo.title}
          </h2>

          <p className="text-gray-200">{tool.content.intro}</p>
          <p className="text-gray-200">{tool.content.whatIsRashi}</p>
          <p className="text-gray-200">{tool.content.whyMoonRashiImportant}</p>

          <ul className="list-disc pl-6 text-gray-200">
            {tool.content.benefits.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          {/* ✅ FAQ JSON-LD (SEO ONLY, invisible) */}
{tool?.faq?.length > 0 && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(buildFaqJsonLd(tool.faq)),
    }}
  />
)}

          {/* 🎥 VIDEO */}
          {tool.video?.youtubeUrl && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                {tool.video.title}
              </h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden">
                <iframe
                  src={tool.video.youtubeUrl.replace("watch?v=", "embed/")}
                  title={tool.video.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
