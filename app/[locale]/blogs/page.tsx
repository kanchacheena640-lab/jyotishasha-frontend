import Link from "next/link";
import HoroscopeTabs from "@/components/blogs/HoroscopeTabs";
import { muhurthTopics } from "@/app/[locale]/panchang/muhurat/muhurth_topics";

export const revalidate = 3600;

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string, isHi?: boolean) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(isHi ? "hi-IN" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ---------------- Transit Config (Multilingual) ---------------- */
const PLANET_CARDS = [
  { key: "Sun", name: { en: "Sun", hi: "सूर्य" }, emoji: "☀️", href: "/sun-transit", tag: { en: "Authority • Career", hi: "अधिकार • करियर" } },
  { key: "Moon", name: { en: "Moon", hi: "चंद्र" }, emoji: "🌙", href: "/moon-transit", tag: { en: "Mind • Emotions", hi: "मन • भावनाएं" } },
  { key: "Mars", name: { en: "Mars", hi: "मंगल" }, emoji: "🔴", href: "/mars-transit", tag: { en: "Energy • Action", hi: "ऊर्जा • साहस" } },
  { key: "Mercury", name: { en: "Mercury", hi: "बुध" }, emoji: "🟢", slug: "/mercury-transit", tag: { en: "Intellect • Business", hi: "बुद्धि • व्यापार" } },
  { key: "Jupiter", name: { en: "Jupiter", hi: "गुरु" }, emoji: "🟡", href: "/jupiter-transit", tag: { en: "Growth • Wisdom", hi: "वृद्धि • ज्ञान" } },
  { key: "Venus", name: { en: "Venus", hi: "शुक्र" }, emoji: "💗", href: "/venus-transit", tag: { en: "Love • Comfort", hi: "प्रेम • विलासिता" } },
  { key: "Saturn", name: { en: "Saturn", hi: "शनि" }, emoji: "🪐", href: "/saturn-transit", tag: { en: "Karma • Discipline", hi: "कर्म • अनुशासन" } },
  { key: "Rahu", name: { en: "Rahu", hi: "राहु" }, emoji: "☊", href: "/rahu-transit", tag: { en: "Desire • Illusion", hi: "इच्छा • माया" } },
  { key: "Ketu", name: { en: "Ketu", hi: "केतु" }, emoji: "☋", href: "/ketu-transit", tag: { en: "Detachment • Insight", hi: "वैराग्य • अंतर्दृष्टि" } },
];

/* ---------------- Data Fetch (Locale Sensitive) ---------------- */
async function fetchTransit(isHi: boolean) {
  const lang = isHi ? "hi" : "en";
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogsHubPage({ params }: { params: any }) {
  const { locale } = await params;
  const isHi = locale === "hi";
  const langPath = isHi ? "/hi" : "";
  const data = await fetchTransit(isHi);

  const cardClass =
    "bg-white rounded-[20px] p-6 text-center shadow-md border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl text-gray-900";

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* 🚀 HERO SECTION (Hybrid Content) */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {isHi ? "ज्योतिष अपडेट और दैनिक अंतर्दृष्टि" : "Astrology Updates & Daily Insights"}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          {isHi 
            ? "दैनिक राशिफल, मुहूर्त, पंचांग और लाइव गोचर — सटीक वैदिक ज्योतिष गणना के साथ।" 
            : "Fresh daily horoscope, muhurat, panchang and live planetary transits — prepared using Vedic astrology."}
        </p>
      </header>

      {/* HOROSCOPE HUB (Tabs components should handle locale internally) */}
      <HoroscopeTabs />

      {/* 🗓️ TODAY PANCHANG (Locale-Aware Link) */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center text-indigo-900">
          {isHi ? "आज का पंचांग और मुहूर्त" : "Today’s Panchang & Muhurat"}
        </h2>
        <div className="max-w-xl mx-auto">
          <Link
            href={`${langPath}/today-panchang`}
            className="block bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl p-8 text-center shadow-lg border border-indigo-100 hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isHi ? "आज का विस्तृत पंचांग" : "Today’s Detailed Panchang"}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {isHi 
                ? "तिथि, नक्षत्र, योग, करण, राहु काल और शुभ चौघड़िया मुहूर्त की पूरी जानकारी।" 
                : "Tithi, Nakshatra, Yoga, Karana, Rahu Kaal & Auspicious Choghadiya Muhurats."}
            </p>
            <span className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
              {isHi ? "पंचांग देखें →" : "View Panchang →"}
            </span>
          </Link>
        </div>
      </section>

      {/* 🪔 MONTHLY MUHURAT (Fixed TS Error) */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {isHi ? "शुभ मुहूर्त (मासिक अपडेट)" : "Auspicious Muhurats (Monthly Updated)"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.values(muhurthTopics).map((topic: any) => ( // ✅ topic ko 'any' cast kiya taaki dynamic keys access ho sakein
            <Link
              key={topic.slug}
              href={`${langPath}${topic.canonical.replace("https://www.jyotishasha.com", "")}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all text-gray-900"
            >
              <div className="text-4xl mb-3">🪔</div>
              <h3 className="text-lg font-bold mb-2">
                {/* ✅ Check if hi version exists, otherwise fallback to default */}
                {isHi ? (topic.title_hi || topic.title) : topic.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {isHi ? (topic.description_hi || topic.description) : topic.description}
              </p>
              <span className="text-[10px] uppercase tracking-wider bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold">
                {isHi ? "हर महीने अपडेट" : "Monthly Update"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🪐 PLANETARY TRANSITS (Live Data with Locale) */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isHi ? "ग्रहों का गोचर (Live Gochar)" : "Planetary Transits (Live Gochar)"}
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          {isHi 
            ? "ग्रहों की वर्तमान स्थिति और उनके आपके जीवन पर पड़ने वाले प्रभावों का विस्तृत विश्लेषण।" 
            : "Explore detailed planet-wise transit analysis with live positions, dates and effects."}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {PLANET_CARDS.map((p) => {
            const pos = data?.positions?.[p.key];
            const current = data?.future_transits?.[p.key]?.[0];

            return (
              <Link key={p.key} href={`${langPath}${p.href}`} className={cardClass}>
                <div className="text-4xl mb-3">{p.emoji}</div>
                <h3 className="text-base sm:text-lg font-bold text-indigo-900 mb-1">
                  {isHi ? `${p.name.hi} गोचर` : `${p.name.en} Transit`}
                </h3>

                {pos?.rashi && (
                  <p className="text-xs sm:text-sm text-purple-700 font-bold bg-purple-50 py-1 rounded-lg">
                    {isHi ? `${pos.rashi_hi || pos.rashi} में` : `In ${pos.rashi}`}
                  </p>
                )}

                {current?.exit_date && (
                  <p className="text-[10px] text-gray-400 mt-2 font-medium">
                    {isHi ? "कब तक:" : "Till:"} {formatDate(current.exit_date, isHi)}
                  </p>
                )}

                <p className="hidden sm:block text-[11px] text-gray-500 mt-3 border-t pt-2 border-gray-50">
                  {isHi ? p.tag.hi : p.tag.en}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 📲 FINAL CTA */}
      <section className="text-center mt-24 bg-indigo-900 rounded-[40px] py-12 px-6 shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {isHi ? "अपनी व्यक्तिगत ज्योतिष रिपोर्ट मोबाइल पर पाएं" : "Get Personalized Astrology on Your Mobile"}
        </h2>
        <Link
          href={`${langPath}/app-download`}
          className="inline-block bg-white text-indigo-900 px-10 py-4 rounded-full font-extrabold hover:bg-indigo-50 transition-colors shadow-lg"
        >
          {isHi ? "अभी डाउनलोड करें" : "Download App Now"}
        </Link>
      </section>

      {/* 📄 FOOTER INFO */}
      <footer className="mt-20 text-[11px] text-gray-400 max-w-4xl mx-auto text-center border-t pt-10 border-gray-100">
        <p>
          <strong>Method:</strong> Vedic astrology (Sidereal Zodiac), Gochar principles and astronomical ephemeris.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} Jyotishasha Research Desk. All rights reserved.
        </p>
      </footer>
    </div>
  );
}