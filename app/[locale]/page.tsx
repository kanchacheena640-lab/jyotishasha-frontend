// app/[locale]/page.tsx

import Link from "next/link";

// Components
import HomeTicker from "@/components/home/HomeTicker";
import HomeFreeKundaliCompact from "@/components/home/HomeFreeKundaliCompact";
import HomeDailyHoroscope from "@/components/home/HomeDailyHoroscope";
import HomePanchang from "@/components/home/HomePanchang";
import HomeTransit from "@/components/home/HomeTransits";
import HomeMuhurth from "@/components/home/HomeMuhurth";
import HomeTools from "@/components/home/HomeTools";
import HomeReports from "@/components/home/HomeReports";

// Data Fetching
import { getDictionary } from "@/lib/dictionaries";
import { getDailySummary } from "@/lib/getDailySummary";
import { getPanchang } from "@/lib/getPanchang";
import { getHomeMuhurth } from "@/lib/getHomeMuhurth";
import { getTransit } from "@/lib/getTransit";
import { getUpcomingEvents } from "@/lib/getUpcomingEvents";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "hi" ? "hi" : "en";

  const dict = await getDictionary(locale);

  // Parallel Data Fetching
  const [panchang, summary, muhurth, transitData, upcomingEvents] = await Promise.all([
    getPanchang(locale),
    getDailySummary(locale).catch(() => null),
    getHomeMuhurth(locale).catch(() => null),
    getTransit(locale).catch(() => null),
    getUpcomingEvents(locale).catch(() => null),
  ]);

  return (
    <div className="min-h-screen bg-[#0b1120] pt-12 text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="lg:w-2/3">
            <HomeTicker data={panchang} dict={dict} lang={locale} />
          </div>
          <div className="lg:w-1/3">
            <HomeFreeKundaliCompact dict={dict} lang={locale} />
          </div>
        </div>

        {/* ==================== NEW SECTIONS ==================== */}

        {/* 1. Daily Horoscope / राशि फल */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-semibold">
              {locale === "hi" ? "आज का राशि फल" : "Daily Horoscope"}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
          <HomeDailyHoroscope data={summary} dict={dict} lang={locale} />
        </section>

        {/* 2. Today’s Panchang */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-semibold">
              {locale === "hi" ? "आज का पंचांग" : "Today’s Panchang"}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
          <HomePanchang 
            data={panchang} 
            events={upcomingEvents} 
            dict={dict} 
            lang={locale} 
          />
        </section>

        {/* 3. Planetary Transit / गोचर */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-semibold">
              {locale === "hi" ? "ग्रह गोचर" : "Planetary Transits"}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
          <HomeTransit data={transitData} dict={dict} lang={locale} />
        </section>

        {/* Muhurth Section */}
        <section className="mb-16">
          <HomeMuhurth data={muhurth} dict={dict} lang={locale} />
        </section>

        {/* Tools & Reports */}
        <HomeTools />
        <HomeReports />

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-400 py-12 border-t border-purple-900/50 mt-10">
          {dict.footer.blogText}{" "}
          <Link 
            href={`/${locale}/blogs`} 
            className="text-yellow-400 hover:text-yellow-300 hover:underline"
          >
            {dict.footer.blogLink}
          </Link>
        </div>

      </div>
    </div>
  );
}