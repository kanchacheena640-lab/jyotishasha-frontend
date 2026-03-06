import HomeAstroSlider from "@/components/home/HomeAstroSlider";
import HomeFreeKundaliCompact from "@/components/home/HomeFreeKundaliCompact";
import HomeTicker from "@/components/home/HomeTicker";
import HomeMuhurth from "@/components/home/HomeMuhurth";
import HomeTools from "@/components/home/HomeTools";
import HomeReports from "@/components/home/HomeReports";
import Link from "next/link";

import { getDailySummary } from "@/lib/getDailySummary";
import { getPanchang } from "@/lib/getPanchang";
import { getHomeMuhurth } from "@/lib/getHomeMuhurth";
import { getTransit } from "@/lib/getTransit";
import { getUpcomingEvents } from "@/lib/getUpcomingEvents";


export default async function Home() {

  const panchangPromise = getPanchang();

  let summary = null;
  let muhurth = null;
  let transitData = null;
  let upcomingEvents = null;

  try {
    [
      summary,
      muhurth,
      transitData,
      upcomingEvents
    ] = await Promise.all([
      getDailySummary(),
      getHomeMuhurth(),
      getTransit(),
      getUpcomingEvents()
    ]);
  } catch (e) {
    console.error("Home API Error:", e);
  }

  const panchang = await panchangPromise;

  return (
    <div className="min-h-screen bg-[#0b1120] pt-12 text-white">

      <div className="max-w-6xl mx-auto px-6">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row gap-4">

          <div className="md:w-2/3">
            <HomeTicker data={panchang} />
          </div>

          <div className="md:w-1/3">
            <HomeFreeKundaliCompact />
          </div>

        </div>

        {/* ASTRO SLIDER */}
        <div className="mt-6">
          <HomeAstroSlider
            summary={summary}
            panchang={panchang}
            transitData={transitData}
            events={upcomingEvents}
          />
        </div>

        {/* MUHURTH BELOW SLIDER */}
        <div className="mt-6">
          <HomeMuhurth data={muhurth} />
        </div>

        <HomeTools />

        <HomeReports />

        <div className="text-center text-sm text-gray-400 py-8 border-t border-purple-900 mt-10">
          For astrology knowledge updates, festival guides, and the latest planetary insights,
follow the{" "}
          <Link href="/blogs" className="text-yellow-400 hover:underline">
            Jyotishasha Blog
          </Link>.
        </div>

      </div>

    </div>
  );
}