import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { sunTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: sunTransitHubConfig.planetEn,
    planetHi: sunTransitHubConfig.planetHi,
    slug: sunTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function SunTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: sunTransitHubConfig });
}
