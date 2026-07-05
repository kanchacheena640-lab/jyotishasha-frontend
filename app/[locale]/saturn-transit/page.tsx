import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { saturnTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: saturnTransitHubConfig.planetEn,
    planetHi: saturnTransitHubConfig.planetHi,
    slug: saturnTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function SaturnTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: saturnTransitHubConfig });
}
