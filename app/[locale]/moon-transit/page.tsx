import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { moonTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: moonTransitHubConfig.planetEn,
    planetHi: moonTransitHubConfig.planetHi,
    slug: moonTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function MoonTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: moonTransitHubConfig });
}
