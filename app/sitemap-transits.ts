export default function sitemap() {
  const baseUrl = "https://www.jyotishasha.com";
  const now = new Date().toISOString();

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

  const urls: { url: string; lastModified: string }[] = [];

  planets.forEach((planet) => {
    // Planet landing page
    urls.push({
      url: `${baseUrl}/${planet}-transit`,
      lastModified: now,
    });

    ascendants.forEach((asc) => {
      for (let house = 1; house <= 12; house++) {
        urls.push({
          url: `${baseUrl}/${planet}-transit/${asc}/house-${house}`,
          lastModified: now,
        });
      }
    });
  });

  return urls;
}
