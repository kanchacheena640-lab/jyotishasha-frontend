import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { venusTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: venusTransitHubConfig.planetEn,
    planetHi: venusTransitHubConfig.planetHi,
    slug: venusTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function VenusTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: venusTransitHubConfig });
}
