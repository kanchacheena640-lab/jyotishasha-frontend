import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { rahuTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: rahuTransitHubConfig.planetEn,
    planetHi: rahuTransitHubConfig.planetHi,
    slug: rahuTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function RahuTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: rahuTransitHubConfig });
}
