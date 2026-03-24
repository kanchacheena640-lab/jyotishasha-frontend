import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

/* ---------------- LANGUAGE ---------------- */
function getLangFromLocale(locale?: string) {
  return locale === "hi" ? "hi" : "en";
}

const PLANET_HI: any = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "बृहस्पति",
  Venus: "शुक्र",
  Saturn: "शनि",
  Rahu: "राहु",
  Ketu: "केतु",
};

const RASHI_HI_MAP: any = {
  Aries: "मेष",
  Taurus: "वृषभ",
  Gemini: "मिथुन",
  Cancer: "कर्क",
  Leo: "सिंह",
  Virgo: "कन्या",
  Libra: "तुला",
  Scorpio: "वृश्चिक",
  Sagittarius: "धनु",
  Capricorn: "मकर",
  Aquarius: "कुंभ",
  Pisces: "मीन",
};

function getRashiName(rashi: string, rashi_hi: string | null, isHi: boolean) {
  if (!isHi) return rashi;
  return rashi_hi || RASHI_HI_MAP[rashi] || rashi;
}

function getPlanetName(planet: string, isHi: boolean) {
  if (!isHi) return planet;
  return PLANET_HI[planet] || planet;
}

function getMotion(motion: string, isHi: boolean) {
  if (!isHi) return motion;
  if (motion === "Direct") return "मार्गी";
  if (motion === "Retrograde") return "वक्री";
  return motion;
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata(): Promise<Metadata> {
  return getTransitMetadata("Venus", "venus-transit");
}

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ---------------- Data Fetch ---------------- */
async function fetchVenusTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Venus transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function VenusTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchVenusTransit(lang);

  const venusPos = data.positions?.Venus;
  const venusFuture = data.future_transits?.Venus || [];
  const currentTransit = venusFuture[0];

  const rashiName = getRashiName(
    venusPos?.rashi,
    venusPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Venus", isHi);
  const motion = getMotion(venusPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Venus transit ${currentYear} influence love and marriage?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Venus is the primary significator of relationships, romance, and marital harmony. Its transit enhances attraction, fosters deeper emotional bonds, and can trigger new romantic beginnings or strengthen existing partnerships.",
        },
      },
      {
        "@type": "Question",
        name: `What is the impact of Shukra Gochar on wealth, luxury, and beauty?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Venus governs material comforts, artistic expression, and financial pleasures. A supportive transit often brings opportunities for luxury, creative success, aesthetic improvements, and overall abundance in life.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-pink-950/20 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          {isHi ? (
            <>
              {planetName} गोचर {currentYear} {rashiName} राशि में –{" "}
              <span className="text-pink-600">प्रेम, सौंदर्य और समृद्धि</span>
            </>
          ) : (
            <>
              Venus Transit {currentYear} in {rashiName} –{" "}
              <span className="text-pink-600">Love, Beauty & Abundance</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-pink-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ शुक्र उपाय" : "↓ Venus Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (शुक्र गोचर) हमारे <strong>प्रेम, सौंदर्य और सुख-सुविधा</strong> का मासिक पुनर्संतुलन लाता है। <strong>वैदिक ज्योतिष</strong> में शुक्र को सौंदर्य, रिश्तों और धन-समृद्धि का कारक माना जाता है। इसका गोचर <strong>{rashiName}</strong> में हमारे रिश्तों की गुणवत्ता और आकर्षण की ऊर्जा को प्रभावित करता है।
              </p>
              <p>
                शुक्र जीवन में आनंद, कला, विलासिता और सामंजस्य का प्रतीक है। इस गोचर को समझकर आप अपने रिश्तों को गहरा कर सकते हैं, रचनात्मकता बढ़ा सकते हैं और भौतिक सुखों का बेहतर उपयोग कर सकते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Venus transit {currentYear}</strong> (Shukra Gochar) recalibrates our <strong>love, beauty, and material pleasures</strong>. In <strong>Vedic astrology</strong>, Venus is the planet of romance, harmony, luxury, and artistic expression. Its passage through <strong>{rashiName}</strong> colors our relationships and sense of abundance.
              </p>
              <p>
                As the significator of joy and connection, Venus transit influences attraction, partnerships, creativity, and financial flow. Aligning with this cycle helps deepen bonds, awaken creativity, and invite more beauty and prosperity into life.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-pink-400 uppercase">
            {isHi ? "वर्तमान शुक्र स्थिति" : "Current Venus Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({venusPos?.degree}°)
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गति" : "Transit Motion"}
              </p>
              <p className="text-2xl font-black italic">
                {motion}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "समय अवधि" : "Transit Window"}
              </p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet={planetName}
            planetRashi={rashiName}
            planetSlug="venus-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "शुक्र सामंजस्य और उपाय" : "Venus Harmony & Remedies"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-pink-50 rounded-3xl border border-pink-100">
              <h3 className="font-black text-pink-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  📿
                  <span>
                    {isHi
                      ? <> <strong>शुक्र बीज मंत्र</strong> का जप: <em>"ॐ द्रां द्रीं द्रौं स: शुक्राय नम:"</em> या <em>"ॐ शुं शुक्राय नम:"</em> शुक्रवार को 108 बार। </>
                      : <>Chant <strong>Shukra Beej Mantra</strong>: <em>"Om Draam Dreem Droum Sah Shukraya Namah"</em> or <em>"Om Shum Shukraya Namah"</em> 108 times on Fridays.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🤍
                  <span>
                    {isHi
                      ? <> शुक्रवार को सफेद वस्तुएं (चावल, दूध, मिठाई, रेशम) दान करें या <strong>लक्ष्मी पूजा</strong> करें। </>
                      : <>Donate white items (rice, milk, sweets, silk) on <strong>Fridays</strong> or perform Lakshmi puja.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> हीरा, ओपल या सफेद पुखराज (6-7 रत्ती) चांदी में शुक्रवार को धारण करें (ज्योतिषी से सलाह लें)। </>
                      : <>Wear diamond, opal, or white sapphire in silver on Friday (consult astrologer).</>}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "व्यावहारिक उपाय" : "Modern Alignment"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  🎨
                  <span>
                    {isHi
                      ? <> <strong>रचनात्मकता बढ़ाएं:</strong> पेंटिंग, म्यूजिक, डांस या घर की सजावट में समय बिताएं। </>
                      : <> <strong>Creative Expression:</strong> Engage in art, music, dance, or redecorate your living space.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🕊️
                  <span>
                    {isHi
                      ? <> <strong>रिश्तों में सामंजस्य:</strong> सक्रिय श्रवण, प्रशंसा और कृतज्ञता व्यक्त करें। </>
                      : <> <strong>Relationship Harmony:</strong> Practice active listening, appreciation, and gratitude in connections.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🌸
                  <span>
                    {isHi
                      ? <> <strong>सौंदर्य:</strong> खुद की देखभाल, अच्छे कपड़े और सुगंध का उपयोग करें। </>
                      : <> <strong>Self-Beauty:</strong> Focus on grooming, wearing pleasant colors, and using natural fragrances.</>}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 pt-12 border-t border-slate-100 pb-10">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">
            {isHi ? "ग्रह गोचर देखें" : "Planetary Transits"}
          </h4>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-pink-700">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/venus-transit/${venusPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-pink-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-pink-200 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना प्रेम और समृद्धि विश्लेषण देखें →" : "Unlock Your Love & Abundance Forecast →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}