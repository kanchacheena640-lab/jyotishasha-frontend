import type { Metadata } from "next";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import HouseTransitPage from "@/components/transit/HouseTransitPage";
import { sunConfig } from "@/lib/transit/planetConfig";

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; house: string; locale: string };
}): Promise<Metadata> {
  const houseNum = Number(params.house.replace("house-", ""));
  if (isNaN(houseNum) || houseNum < 1 || houseNum > 12) {
    return { title: "Not Found", robots: { index: false } };
  }
  return getTransitMetadata({
    planetEn: sunConfig.planetEn,
    planetHi: sunConfig.planetHi,
    slug: `${sunConfig.slug}/${params.ascendant}/house-${houseNum}`,
    locale: params.locale || "en",
    ascendant: titleCase(params.ascendant),
    houseNum,
  });
}

export default async function SunTransitHousePage(props: {
  params: { ascendant: string; house: string; locale: string };
  searchParams?: { lang?: string };
}) {
  return HouseTransitPage({ ...props, config: sunConfig });
}
