import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { mercuryTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: mercuryTransitHubConfig.planetEn,
    planetHi: mercuryTransitHubConfig.planetHi,
    slug: mercuryTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function MercuryTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: mercuryTransitHubConfig });
}
