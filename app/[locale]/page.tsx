// app/[locale]/page.tsx

import type { Metadata } from "next";
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
import HomeFinancialAstrology from "@/components/home/HomeFinancialAstrology";
import HomeMarriageAstrology from "@/components/home/HomeMarriageAstrology";

// Data
import { featuredLinks } from "@/app/data/featuredLinks";

// Data Fetching
import { getDictionary } from "@/lib/dictionaries";
import { getDailySummary } from "@/lib/getDailySummary";
import { getPanchang } from "@/lib/getPanchang";
import { getHomeMuhurth } from "@/lib/getHomeMuhurth";
import { getTransit } from "@/lib/getTransit";
import { getUpcomingEvents } from "@/lib/getUpcomingEvents";

const SITE_URL = "https://www.jyotishasha.com";

// Authority hub links — rendered as a 4-card grid for internal linking
const LEARN_LINKS = [
  {
    href: "/planet-in-house",
    title: "Planet in House",
    title_hi: "भावों में ग्रह",
    desc: "How each planet shapes personality and karma across all 12 houses.",
    desc_hi: "12 भावों में 9 ग्रहों का व्यक्तित्व और कर्म पर प्रभाव।",
  },
  {
    href: "/retrograde-planets",
    title: "Retrograde Planets",
    title_hi: "वक्री ग्रह",
    desc: "What retrograde motion means and how it affects your chart.",
    desc_hi: "वक्री ग्रह का अर्थ और आपकी कुंडली पर असर।",
  },
  {
    href: "/nakshatra",
    title: "27 Nakshatras",
    title_hi: "27 नक्षत्र",
    desc: "Lunar mansions that reveal personality, karma and destiny.",
    desc_hi: "व्यक्तित्व, कर्म और भाग्य बताने वाले 27 नक्षत्र।",
  },
  {
    href: "/vedic-panchang",
    title: "Vedic Panchang",
    title_hi: "वैदिक पंचांग",
    desc: "The five-limbed Vedic almanac — Tithi, Vara, Nakshatra, Yoga, Karana.",
    desc_hi: "पंचांग के पाँच अंग — तिथि, वार, नक्षत्र, योग, करण।",
  },
];

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale === "hi" ? "hi" : "en";
  const langPath = locale === "hi" ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${langPath}`;

  const title =
    locale === "hi"
      ? "ज्योतिष आशा - वैदिक ज्योतिष, कुंडली और पंचांग"
      : "Jyotishasha - Vedic Astrology, Kundali & Panchang";

  const description =
    locale === "hi"
      ? "मुफ्त वैदिक ज्योतिष टूल्स, दैनिक राशिफल, कुंडली, पंचांग, मुहूर्त"
      : "Free Vedic astrology tools, daily horoscope, kundali, panchang, muhurat and transit reports";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Jyotishasha",
      images: [{ url: "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg", width: 1730, height: 909, alt: "Jyotishasha – Free Kundali, Panchang & Muhurat" }],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const rawLocale = params.locale;
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

        {/* 1. Live Panchang Ticker + Compact Kundali Link */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="lg:w-2/3">
            <HomeTicker data={panchang} dict={dict} lang={locale} />
          </div>
          <div className="lg:w-1/3">
            <HomeFreeKundaliCompact dict={dict} lang={locale} />
          </div>
        </div>

        {/* 3. Learn Astrology — authority hub internal links */}
        <section className="mb-16" aria-labelledby="learn-astrology-heading">
          <div className="flex items-center gap-3 mb-6">
            <h2 id="learn-astrology-heading" className="text-2xl font-semibold">
              {locale === "hi" ? "ज्योतिष सीखें" : "Learn Astrology"}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LEARN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={`${locale === 'hi' ? '/hi' : ''}${link.href}`}
                className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-purple-900/50 rounded-2xl p-4 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex flex-col"
              >
                <div className="font-semibold text-white text-sm md:text-base mb-1">
                  {locale === "hi" ? link.title_hi : link.title}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3 flex-1">
                  {locale === "hi" ? link.desc_hi : link.desc}
                </p>
                <span className="text-purple-400 text-xs font-medium mt-auto">
                  {locale === "hi" ? "देखें" : "Explore"} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Reports — core business product */}
        <HomeReports locale={locale} />

        {/* 6. Daily Horoscope — heading managed by component */}
        <section className="mb-16">
          <HomeDailyHoroscope data={summary} dict={dict} lang={locale} />
        </section>

        {/* 7. Today's Panchang — heading managed by component */}
        <section className="mb-16">
          <HomePanchang
            data={panchang}
            events={upcomingEvents}
            dict={dict}
            lang={locale}
          />
        </section>

        {/* 8. Planetary Transits — heading managed by component */}
        <section className="mb-16">
          <HomeTransit data={transitData} dict={dict} lang={locale} />
        </section>

        {/* 9. Muhurth */}
        <section className="mb-16">
          <HomeMuhurth data={muhurth} dict={dict} lang={locale} />
        </section>

        {/* 10. Free Astrology Tools */}
        <HomeTools locale={locale} />

        {/* 11. Featured Authority Links — manually configured strategic internal links */}
        <section className="mb-16" aria-labelledby="explore-more-heading">
          <div className="flex items-center gap-3 mb-5">
            <h2 id="explore-more-heading" className="text-xl font-semibold">
              {locale === "hi" ? "और जानें" : "Explore More"}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-3">
            {featuredLinks.map((link) => (
              <Link
                key={link.path}
                href={`${locale === 'hi' ? '/hi' : ''}${link.path}`}
                className="text-sm text-purple-300 hover:text-white bg-[#1e1b4b] hover:bg-[#2a2565] border border-purple-900/50 hover:border-purple-500 px-4 py-2 rounded-lg transition-all"
              >
                {locale === "hi" ? link.title_hi : link.title}
              </Link>
            ))}
          </div>
        </section>

        {/* 12. Financial Astrology — career & income cluster */}
        <HomeFinancialAstrology locale={locale} />

        {/* 13. Marriage Astrology — relationship & compatibility cluster */}
        <HomeMarriageAstrology locale={locale} />

        {/* 14. Blog Footer */}
        <div className="text-center text-sm text-gray-400 py-12 border-t border-purple-900/50 mt-10">
          {dict.footer.blogText}{" "}
          <Link
            href={`${locale === 'hi' ? '/hi' : ''}/blogs`}
            className="text-yellow-400 hover:text-yellow-300 hover:underline"
          >
            {dict.footer.blogLink}
          </Link>
        </div>

      </div>
    </div>
  );
}
