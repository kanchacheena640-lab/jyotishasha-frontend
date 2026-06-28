import { muhurthTopics } from "@/app/[locale]/panchang/muhurat/muhurth_topics";
import { toolsData } from "@/app/data/toolsData";
import { reportsData } from "@/app/data/reportsData";
import { getAllEkadashiSlugs } from "@/app/data/ekadashi";
import { NAVDURGA_LIST } from "@/lib/navratri";
import { getAllNakshatraSlugs } from "@/lib/nakshatra";

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
  const staticPaths = [
    "",
    "/panchang",
    "/panchang/muhurat",
    "/tools",
    "/reports",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const staticUrls = staticPaths.map((path) =>
    createUrl(`${baseUrl}${path}`, 0.9, "weekly")
  );

  const staticUrlsHi = staticPaths.map((path) =>
    createUrl(`${baseUrl}/hi${path || ""}`, 0.85, "weekly")
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
        transitUrls.push(
          createUrl(`${baseUrl}/${planet}-transit/${asc}/house/${house}`, 0.7)
        );
        transitUrls.push(
          createUrl(`${baseUrl}/hi/${planet}-transit/${asc}/house/${house}`, 0.65)
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
    createUrl(`${baseUrl}/vedic-panchang`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/vedic-panchang`, 0.65, "weekly"),
    createUrl(`${baseUrl}/rahu-kaal`, 0.7, "weekly"),
    createUrl(`${baseUrl}/hi/rahu-kaal`, 0.65, "weekly"),
    createUrl(`${baseUrl}/astrology-methodology`, 0.5, "yearly"),
    createUrl(`${baseUrl}/hi/astrology-methodology`, 0.45, "yearly"),
  ];

  // ---------------- FINAL ----------------
  return [
    ...staticUrls,
    ...staticUrlsHi,
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
  ];
}