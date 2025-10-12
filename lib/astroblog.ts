// lib/astroblog.ts
export type Lang = "en" | "hi";
const WP_BASE = "https://astroblog.in/wp-json/wp/v2";

export const ZODIAC_SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;
export type Zodiac = typeof ZODIAC_SIGNS[number];

export interface WPCategory { id: number; name: string; slug: string; }
export interface WPPost {
  id: number; date: string; link: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  better_featured_image?: { source_url?: string };
  _embedded?: any;
}

const DAILY_SLUGS: Record<Zodiac, string> = {
  aries: "aries-daily-horoscope", taurus: "taurus-daily-horoscope",
  gemini: "gemini-daily-horoscope", cancer: "cancer-daily-horoscope",
  leo: "leo-daily-horoscope", virgo: "virgo-daily-horoscope",
  libra: "libra-daily-horoscope", scorpio: "scorpio-daily-horoscope",
  sagittarius: "sagittarius-daily-horoscope", capricorn: "capricorn-daily-horoscope",
  aquarius: "aquarius-daily-horoscope", pisces: "pisces-daily-horoscope",
};

// STEP-1: 12 category IDs (always fetched from English categories)
export async function fetchDailyCategoryMap(lang: Lang = "en"): Promise<Record<Zodiac, number>> {
  const res = await fetch(`${WP_BASE}/categories?per_page=100&lang=en`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Category fetch failed`);
  const data = (await res.json()) as WPCategory[];

  const out: Partial<Record<Zodiac, number>> = {};
  for (const sign of ZODIAC_SIGNS) {
    const cat = data.find((c) => c.slug === DAILY_SLUGS[sign]);
    if (cat) out[sign] = cat.id;
  }
  const missing = ZODIAC_SIGNS.filter((z) => !out[z]);
  if (missing.length) throw new Error(`Missing cats: ${missing.join(",")}`);
  return out as Record<Zodiac, number>;
}

// STEP-2: latest post per category
export async function fetchLatestDailyPost(catId: number, lang: Lang): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_BASE}/posts?per_page=5&categories=${catId}&orderby=date&order=desc&_embed=1`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const arr = (await res.json()) as WPPost[];
  return arr[0] ?? null;
}

// STEP-3: fetch all 12 zodiac daily horoscopes together (Polylang free fallback)
export async function fetchAllDailyHoroscopes(lang: Lang) {
  // Always get English category IDs (same for both langs)
  const cats = await fetchDailyCategoryMap("en");

  const all = await Promise.all(
    Object.entries(cats).map(async ([sign, id]) => {
      const post = await fetchLatestDailyPost(id, "en"); // always English category
      return { sign, post };
    })
  );

  // 🔍 Filter posts by Polylang URL language (/hi/ or /en/)
  return all.map(({ sign, post }) => {
    if (!post) return { sign, post };
    const isHindi = post.link.includes("/hi/");
    const isEnglish = post.link.includes("/en/");
    if ((lang === "hi" && !isHindi) || (lang === "en" && !isEnglish)) {
      return { sign, post: null };
    }
    return { sign, post };
  });
}

// utils
export function stripHtml(html?: string) {
  return html ? html.replace(/<[^>]+>/g, "").trim() : "";
}
