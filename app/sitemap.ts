import { muhurthTopics } from "@/app/panchang/muhurat/muhurth_topics";
import { toolsData } from "@/app/data/toolsData";
import { reportsData } from "@/app/data/reportsData"; // ✅ reports added

export default async function sitemap() {
  const baseUrl = "https://www.jyotishasha.com";
  const now = new Date().toISOString();

  // 🪔 Muhurat dynamic URLs
  const muhuratUrls = Object.keys(muhurthTopics).map((slug) => ({
    url: `${baseUrl}/panchang/muhurat/${slug}`,
    lastModified: now,
  }));

  // 🧮 Tools dynamic URLs
  const toolUrls = toolsData.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: now,
  }));

  // 📜 Reports dynamic URLs
  const reportUrls = reportsData.map((report) => ({
    url: `${baseUrl}/reports/${report.slug}`,
    lastModified: now,
  }));

  // 🧘 Free Kundali
  const kundaliUrls = [
    { url: `${baseUrl}/free-kundali`, lastModified: now },
  ];

  // 🌞 Static pages
  const staticUrls = [
    "",
    "/panchang",
    "/panchang/muhurat",
    "/tools",
    "/reports",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  // 🪐 Transit URLs

const planets = [
  "sun",
  "moon",
  "mars",
  "mercury",
  "jupiter",
  "venus",
  "saturn",
  "rahu",
  "ketu",
];

const ascendants = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const transitUrls: { url: string; lastModified: string }[] = [];

planets.forEach((planet) => {
  transitUrls.push({
    url: `${baseUrl}/${planet}-transit`,
    lastModified: now,
  });

  ascendants.forEach((asc) => {
    for (let house = 1; house <= 12; house++) {
      transitUrls.push({
        url: `${baseUrl}/${planet}-transit/${asc}/house-${house}`,
        lastModified: now,
      });
    }
  });
});

// 🎨 Holi Year URLs
const currentYear = new Date().getFullYear();
const holiUrls: { url: string; lastModified: string }[] = [];

for (let year = currentYear - 1; year <= currentYear + 5; year++) {
  holiUrls.push({
    url: `${baseUrl}/holi-${year}`,
    lastModified: now,
  });
}

  // 🔁 Combine all
  return [
    ...staticUrls,
    ...muhuratUrls,
    ...toolUrls,
    ...reportUrls,
    ...kundaliUrls,
    ...transitUrls,
    ...holiUrls,
  ];

}
