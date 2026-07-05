import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import GlobalTransitPage from "@/components/transit/GlobalTransitPage";
import { ketuTransitHubConfig } from "@/lib/transit/transitHubConfig";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  return getTransitMetadata({
    planetEn: ketuTransitHubConfig.planetEn,
    planetHi: ketuTransitHubConfig.planetHi,
    slug: ketuTransitHubConfig.slug,
    locale: params?.locale || "en",
  });
}

export default async function KetuTransitPage(props: {
  params: { locale?: string };
}) {
  return GlobalTransitPage({ ...props, config: ketuTransitHubConfig });
}
