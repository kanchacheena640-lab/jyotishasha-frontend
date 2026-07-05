import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { marsTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: marsTransitHubConfig.planetEn,
    planetHi: marsTransitHubConfig.planetHi,
    slug: marsTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function MarsTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: marsTransitHubConfig });
}
