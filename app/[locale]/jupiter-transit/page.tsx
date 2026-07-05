import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { jupiterTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: jupiterTransitHubConfig.planetEn,
    planetHi: jupiterTransitHubConfig.planetHi,
    slug: jupiterTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function JupiterTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: jupiterTransitHubConfig });
}
