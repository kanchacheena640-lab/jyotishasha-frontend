import { muhurthTopics } from "@/app/[locale]/panchang/muhurat/muhurth_topics";
import { toolsData } from "@/app/data/toolsData";
import { reportsData } from "@/app/data/reportsData";
import { getAllEkadashiSlugs } from "@/app/data/ekadashi";
import { NAVDURGA_LIST } from "@/lib/navratri";
import { getAllNakshatraSlugs } from "@/lib/nakshatra";
import { varaData } from "@/lib/data/varaData";
import { tithiData } from "@/app/data/tithiData";
import { hinduMonthsData } from "@/lib/data/hinduMonthsData";

export default async function sitemap() {
  const baseUrl = "https://www.jyotishasha.com";
  const now = new Date().toISOString();
  const currentYear = new Date().getFullYear();

  const createUrl = (
    url: string,
    priority: number = 0.8,
    changeFreq: string = "monthly"
  ) => ({
    url,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  });

  // ---------------- STATIC ----------------
  // Localized paths that exist under both the English and /hi [locale] tree.
  // "/panchang/muhurat" was removed — no page.tsx exists at that route (404).
  const staticPaths = [
    "",
    "/panchang",
    "/tools",
    "/contact",
  ];

  const staticUrls = staticPaths.map((path) =>
    createUrl(`${baseUrl}${path}`, 0.9, "weekly")
  );

  const staticUrlsHi = staticPaths.map((path) =>
    createUrl(`${baseUrl}/hi${path || ""}`, 0.85, "weekly")
  );

  // English-only paths that live outside the [locale] segment — no /hi
  // counterpart exists for these (see middleware.js public-page exemptions
  // and the standalone app/reports route), so no Hindi URL is generated.
  const englishOnlyStaticPaths = ["/reports", "/privacy-policy", "/terms"];

  const englishOnlyStaticUrls = englishOnlyStaticPaths.map((path) =>
    createUrl(`${baseUrl}${path}`, 0.9, "weekly")
  );

  // ---------------- MUHURAT ----------------
  // Exclude "grahpravesh-muhurat" — it's a legacy redirect alias (301 → grah-pravesh-muhurat),
  // not a real page, so it shouldn't be submitted to the sitemap.
  const muhuratSlugs = Object.keys(muhurthTopics).filter(
    (slug) => slug !== "grahpravesh-muhurat"
  );

  const muhuratUrls = muhuratSlugs.map((slug) =>
    createUrl(`${baseUrl}/panchang/muhurat/${slug}`, 0.7)
  );

  const muhuratUrlsHi = muhuratSlugs.map((slug) =>
    createUrl(`${baseUrl}/hi/panchang/muhurat/${slug}`, 0.65)
  );

  // ---------------- TOOLS ----------------
  const toolUrls = toolsData.map((tool) =>
    createUrl(`${baseUrl}/tools/${tool.slug}`, 0.7)
  );

  const toolUrlsHi = toolsData.map((tool) =>
    createUrl(`${baseUrl}/hi/tools/${tool.slug}`, 0.65)
  );

  // ---------------- REPORTS ----------------
  const reportUrls = reportsData.map((report) =>
    createUrl(`${baseUrl}/reports/${report.slug}`, 0.75)
  );


  // ---------------- FREE KUNDALI ----------------
  const kundaliUrls = [
    createUrl(`${baseUrl}/free-kundali`, 0.85, "weekly"),
    createUrl(`${baseUrl}/hi/free-kundali`, 0.8, "weekly"),
  ];

  // ---------------- NAVRATRI ----------------
  const navratriUrls = [
    createUrl(`${baseUrl}/navratri`, 0.8),
    createUrl(`${baseUrl}/hi/navratri`, 0.75),
  ];

  const navdurgaUrls = NAVDURGA_LIST.map((mata) =>
    createUrl(`${baseUrl}/navratri/${mata.slug}`, 0.7)
  );

  const navdurgaUrlsHi = NAVDURGA_LIST.map((mata) =>
    createUrl(`${baseUrl}/hi/navratri/${mata.slug}`, 0.65)
  );

  // ---------------- TRANSITS ----------------
  const planets = [
    "sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu",
  ];

  const ascendants = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
  ];

  const transitUrls: any[] = [];

  planets.forEach((planet) => {
    // Global
    transitUrls.push(createUrl(`${baseUrl}/${planet}-transit`, 0.9, "weekly"));
    transitUrls.push(createUrl(`${baseUrl}/hi/${planet}-transit`, 0.85, "weekly"));

    ascendants.forEach((asc) => {
      transitUrls.push(createUrl(`${baseUrl}/${planet}-transit/${asc}`, 0.8));
      transitUrls.push(createUrl(`${baseUrl}/hi/${planet}-transit/${asc}`, 0.75));

      for (let house = 1; house <= 12; house++) {
        // Canonical SEO URL uses a dash ("house-N"); next.config.js / middleware.js
        // 301-redirect the slash form ("house/N") here, so emit the canonical
        // form directly instead of relying on that redirect.
        transitUrls.push(
          createUrl(`${baseUrl}/${planet}-transit/${asc}/house-${house}`, 0.7)
        );
        transitUrls.push(
          createUrl(`${baseUrl}/hi/${planet}-transit/${asc}/house-${house}`, 0.65)
        );
      }
    });
  });

  // ---------------- HOLI ----------------
  const holiUrls: any[] = [];
  for (let year = currentYear - 1; year <= currentYear + 5; year++) {
    holiUrls.push(createUrl(`${baseUrl}/holi-${year}`, 0.7, "yearly"));
    holiUrls.push(createUrl(`${baseUrl}/hi/holi-${year}`, 0.65, "yearly"));
  }

  // ---------------- EKADASHI ----------------
  const ekadashiSlugs = getAllEkadashiSlugs();

  const ekadashiUrls = ekadashiSlugs.map((slug) =>
    createUrl(`${baseUrl}/ekadashi/${slug}`, 0.7)
  );

  const ekadashiUrlsHi = ekadashiSlugs.map((slug) =>
    createUrl(`${baseUrl}/hi/ekadashi/${slug}`, 0.65)
  );

  const ekadashiIndexUrls = [
    createUrl(`${baseUrl}/ekadashi`, 0.8, "weekly"),
    createUrl(`${baseUrl}/hi/ekadashi`, 0.75, "weekly"),
  ];

  // ---------------- NAKSHATRA ----------------
  const nakshatraSlugs = getAllNakshatraSlugs();

  const nakshatraUrls = nakshatraSlugs.map((slug) =>
    createUrl(`${baseUrl}/nakshatra/${slug}`, 0.7)
  );

  const nakshatraUrlsHi = nakshatraSlugs.map((slug) =>
    createUrl(`${baseUrl}/hi/nakshatra/${slug}`, 0.65)
  );

  const nakshatraIndexUrls = [
    createUrl(`${baseUrl}/nakshatra`, 0.8, "weekly"),
    createUrl(`${baseUrl}/hi/nakshatra`, 0.75, "weekly"),
  ];

  // ---------------- HOROSCOPE (DAILY / MONTHLY / YEARLY) ----------------
  const dailyHoroscopeUrls: any[] = [];
  const monthlyHoroscopeUrls: any[] = [];
  const yearlyHoroscopeUrls: any[] = [];

  ascendants.forEach((sign) => {
    dailyHoroscopeUrls.push(createUrl(`${baseUrl}/daily-horoscope/${sign}`, 0.75, "daily"));
    dailyHoroscopeUrls.push(createUrl(`${baseUrl}/hi/daily-horoscope/${sign}`, 0.7, "daily"));

    monthlyHoroscopeUrls.push(createUrl(`${baseUrl}/monthly-horoscope/${sign}`, 0.7, "monthly"));
    monthlyHoroscopeUrls.push(createUrl(`${baseUrl}/hi/monthly-horoscope/${sign}`, 0.65, "monthly"));

    yearlyHoroscopeUrls.push(createUrl(`${baseUrl}/yearly-horoscope/${sign}`, 0.7, "yearly"));
    yearlyHoroscopeUrls.push(createUrl(`${baseUrl}/hi/yearly-horoscope/${sign}`, 0.65, "yearly"));
  });

  // ---------------- BLOG ----------------
  const blogUrls = [
    createUrl(`${baseUrl}/blogs`, 0.7, "daily"),
    createUrl(`${baseUrl}/hi/blogs`, 0.65, "daily"),
  ];

  // ---------------- LOVE ----------------
  const loveSubPaths = [
    "",
    "/mangal-dosh",
    "/marriage-potential",
    "/matchmaking-compatibility",
    "/report/relationship_future_report",
    "/result",
    "/truth-or-dare",
  ];

  const loveUrls = loveSubPaths.map((path) =>
    createUrl(`${baseUrl}/love${path}`, path === "" ? 0.75 : 0.6, "monthly")
  );

  const loveUrlsHi = loveSubPaths.map((path) =>
    createUrl(`${baseUrl}/hi/love${path}`, path === "" ? 0.7 : 0.55, "monthly")
  );

  // ---------------- MISC TOOL / UTILITY PAGES ----------------
  const miscUrls = [
    createUrl(`${baseUrl}/gemstone-consult`, 0.6, "monthly"),
    createUrl(`${baseUrl}/hi/gemstone-consult`, 0.55, "monthly"),
    createUrl(`${baseUrl}/birth-chart`, 0.7, "monthly"),
    createUrl(`${baseUrl}/hi/birth-chart`, 0.65, "monthly"),
    createUrl(`${baseUrl}/today-panchang`, 0.8, "daily"),
    createUrl(`${baseUrl}/hi/today-panchang`, 0.75, "daily"),
    createUrl(`${baseUrl}/choghadiya`, 0.8, "daily"),
    createUrl(`${baseUrl}/hi/choghadiya`, 0.75, "daily"),
    createUrl(`${baseUrl}/vedic-panchang`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/vedic-panchang`, 0.65, "weekly"),
    createUrl(`${baseUrl}/rahu-kaal`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/rahu-kaal`, 0.65, "weekly"),
    createUrl(`${baseUrl}/astrology-methodology`, 0.5, "yearly"),
    createUrl(`${baseUrl}/hi/astrology-methodology`, 0.45, "yearly"),
  ];

  // ---------------- AUTHORITY HUBS ----------------
  const authorityHubUrls = [
    createUrl(`${baseUrl}/abhijit-muhurat`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/abhijit-muhurat`, 0.65, "weekly"),
    createUrl(`${baseUrl}/yoga`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/yoga`, 0.65, "weekly"),
    createUrl(`${baseUrl}/panchak`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/panchak`, 0.65, "weekly"),
    createUrl(`${baseUrl}/bhadra`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/bhadra`, 0.65, "weekly"),
    createUrl(`${baseUrl}/karana`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/karana`, 0.65, "weekly"),
    createUrl(`${baseUrl}/paksha`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/paksha`, 0.65, "weekly"),
    createUrl(`${baseUrl}/vara`, 0.8, "weekly"),
    createUrl(`${baseUrl}/hi/vara`, 0.75, "weekly"),
    createUrl(`${baseUrl}/panchang/tithi`, 0.8, "weekly"),
    createUrl(`${baseUrl}/hi/panchang/tithi`, 0.75, "weekly"),
    createUrl(`${baseUrl}/daily-horoscope`, 0.8, "daily"),
    createUrl(`${baseUrl}/hi/daily-horoscope`, 0.75, "daily"),
    createUrl(`${baseUrl}/monthly-horoscope`, 0.75, "monthly"),
    createUrl(`${baseUrl}/hi/monthly-horoscope`, 0.7, "monthly"),
    createUrl(`${baseUrl}/yearly-horoscope`, 0.75, "yearly"),
    createUrl(`${baseUrl}/hi/yearly-horoscope`, 0.7, "yearly"),
    createUrl(`${baseUrl}/hindu-months`, 0.8, "weekly"),
    createUrl(`${baseUrl}/hi/hindu-months`, 0.75, "weekly"),
    createUrl(`${baseUrl}/ayana`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/ayana`, 0.65, "weekly"),
    createUrl(`${baseUrl}/gulika-kaal`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/gulika-kaal`, 0.65, "weekly"),
    createUrl(`${baseUrl}/yamaganda`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/yamaganda`, 0.65, "weekly"),
  ];

  // ---------------- VARA (Weekday) DETAIL PAGES ----------------
  const varaDaySlugs = Object.keys(varaData);

  const varaDayUrls = varaDaySlugs.map((day) =>
    createUrl(`${baseUrl}/vara/${day}`, 0.7)
  );

  const varaDayUrlsHi = varaDaySlugs.map((day) =>
    createUrl(`${baseUrl}/hi/vara/${day}`, 0.65)
  );

  // ---------------- TITHI DETAIL PAGES ----------------
  const tithiSlugs = tithiData.map((tithi) => tithi.slug);

  const tithiUrls = tithiSlugs.map((slug) =>
    createUrl(`${baseUrl}/panchang/tithi/${slug}`, 0.7)
  );

  const tithiUrlsHi = tithiSlugs.map((slug) =>
    createUrl(`${baseUrl}/hi/panchang/tithi/${slug}`, 0.65)
  );

  // ---------------- HINDU MONTHS DETAIL PAGES ----------------
  const monthSlugs = Object.keys(hinduMonthsData);

  const monthUrls = monthSlugs.map((slug) =>
    createUrl(`${baseUrl}/hindu-months/${slug}`, 0.7)
  );

  const monthUrlsHi = monthSlugs.map((slug) =>
    createUrl(`${baseUrl}/hi/hindu-months/${slug}`, 0.65)
  );

  // ---------------- FINAL ----------------
  const allUrls = [
    ...staticUrls,
    ...staticUrlsHi,
    ...englishOnlyStaticUrls,
    ...authorityHubUrls,
    ...varaDayUrls,
    ...varaDayUrlsHi,
    ...tithiUrls,
    ...tithiUrlsHi,
    ...muhuratUrls,
    ...muhuratUrlsHi,
    ...toolUrls,
    ...toolUrlsHi,
    ...reportUrls,
    ...kundaliUrls,
    ...transitUrls,
    ...holiUrls,
    ...ekadashiUrls,
    ...ekadashiUrlsHi,
    ...ekadashiIndexUrls,
    ...nakshatraUrls,
    ...nakshatraUrlsHi,
    ...nakshatraIndexUrls,
    ...dailyHoroscopeUrls,
    ...monthlyHoroscopeUrls,
    ...yearlyHoroscopeUrls,
    ...blogUrls,
    ...loveUrls,
    ...loveUrlsHi,
    ...miscUrls,
    ...navratriUrls,
    ...navdurgaUrls,
    ...navdurgaUrlsHi,
    ...monthUrls,
    ...monthUrlsHi,
  ];

  // De-duplicate by URL (keep first occurrence) as a safety net against
  // duplicate entries from upstream data sources (e.g. duplicate slugs).
  const seenUrls = new Set<string>();
  return allUrls.filter((entry) => {
    if (seenUrls.has(entry.url)) return false;
    seenUrls.add(entry.url);
    return true;
  });
}