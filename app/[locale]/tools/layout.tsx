import { toolContentMap } from "@/app/data/toolContent";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const lang = params.locale === "hi" ? "hi" : "en";
  
  // Data seedha hamari 'all-tools' key se aayega
  const seoData = toolContentMap["all-tools"][lang].seo;

  return {
    title: seoData.title,
    description: seoData.description,
    alternates: {
      canonical: `https://www.jyotishasha.com/${params.locale}/tools`,
    },
  };
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}