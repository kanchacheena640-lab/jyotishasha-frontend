import type { Metadata } from "next";
import { toolContentMap } from "@/app/data/toolContent";
import ToolDynamicPage from "./ToolDynamicPage";

export function generateMetadata({ params }: { params: { toolId: string } }): Metadata {
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
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      
      {/* ✅ SEO CONTENT (SERVER RENDERED) */}
      {tool && (
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">{tool.seo.title}</h1>

          <p className="text-gray-700">{tool.content.intro}</p>
          <p className="text-gray-700">{tool.content.whatIsRashi}</p>
          <p className="text-gray-700">{tool.content.whyMoonRashiImportant}</p>

          <ul className="list-disc pl-6 text-gray-700">
            {tool.content.benefits.map((b: string, i: number) => (
                <li key={i}>{b}</li>
            ))}
            </ul>
        </section>
      )}

      {/* ✅ TOOL FORM + RESULT (CLIENT) */}
      <ToolDynamicPage />
    </div>
  );
}
