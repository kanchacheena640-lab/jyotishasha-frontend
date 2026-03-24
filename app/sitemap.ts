import { muhurthTopics } from "@/app/[locale]/panchang/muhurat/muhurth_topics";
import { toolsData } from "@/app/data/toolsData";
import { reportsData } from "@/app/data/reportsData";
import { getAllEkadashiSlugs } from "@/app/data/ekadashi";
import { NAVDURGA_LIST } from "@/lib/navratri";

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
    "/about",
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
  const muhuratUrls = Object.keys(muhurthTopics).map((slug) =>
    createUrl(`${baseUrl}/panchang/muhurat/${slug}`, 0.7)
  );

  const muhuratUrlsHi = Object.keys(muhurthTopics).map((slug) =>
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

  const reportUrlsHi = reportsData.map((report) =>
    createUrl(`${baseUrl}/hi/reports/${report.slug}`, 0.7)
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

  // ---------------- FINAL ----------------
  return [
    ...staticUrls,
    ...staticUrlsHi,
    ...muhuratUrls,
    ...muhuratUrlsHi,
    ...toolUrls,
    ...toolUrlsHi,
    ...reportUrls,
    ...reportUrlsHi,
    ...kundaliUrls,
    ...transitUrls,
    ...holiUrls,
    ...ekadashiUrls,
    ...ekadashiUrlsHi,
    ...navratriUrls,
    ...navdurgaUrls,
    ...navdurgaUrlsHi,
  ];
}