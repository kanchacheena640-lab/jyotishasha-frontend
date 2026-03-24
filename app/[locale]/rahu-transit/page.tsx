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
  return getTransitMetadata("Rahu", "rahu-transit");
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
async function fetchRahuTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Rahu transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function RahuTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchRahuTransit(lang);

  const rahuPos = data.positions?.Rahu;
  const rahuFuture = data.future_transits?.Rahu || [];
  const currentTransit = rahuFuture[0];

  const rashiName = getRashiName(
    rahuPos?.rashi,
    rahuPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Rahu", isHi);
  const motion = getMotion(rahuPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Rahu transit ${currentYear} influence ambition and sudden changes?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rahu, the shadow planet of desire and illusion, drives intense ambition, unconventional opportunities, and sudden breakthroughs or disruptions. Its transit often brings foreign connections, technological advances, or obsessive pursuits that accelerate karmic lessons.",
        },
      },
      {
        "@type": "Question",
        name: "What is the spiritual meaning of Rahu Gochar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, Rahu represents unresolved desires, illusion (Maya), and material cravings from past karma. Its transit pushes one toward worldly experiences to ultimately learn detachment, discernment between real and fake, and spiritual evolution through overcoming obsessions.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950/30 py-16 px-4">
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
              <span className="text-indigo-600">महत्वाकांक्षा, भ्रम और कर्म</span>
            </>
          ) : (
            <>
              Rahu Transit {currentYear} in {rashiName} –{" "}
              <span className="text-indigo-600">Ambition, Illusion & Karma</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ राहु उपाय" : "↓ Rahu Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (राहु गोचर) <strong>महत्वाकांक्षा, भ्रम और अपरंपरागत सफलता</strong> का तीव्र चक्र है। <strong>वैदिक ज्योतिष</strong> में राहु छाया ग्रह है जो इच्छाओं, माया और विदेशी/आधुनिक प्रभावों का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में अचानक बदलाव, नई महत्वाकांक्षाएँ और कर्मिक तीव्रता लाता है।
              </p>
              <p>
                राहु अक्सर भ्रम पैदा करता है लेकिन साथ ही अभूतपूर्व अवसर भी देता है। यह गोचर आपको <strong>वास्तविकता और माया के बीच भेद करने</strong>, अति-महत्वाकांक्षा से बचने और आध्यात्मिक विकास के लिए प्रेरित करता है। इसे समझकर आप अपनी इच्छाओं को सही दिशा दे सकते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Rahu transit {currentYear}</strong> (Rahu Gochar) is an intense cycle of <strong>ambition, illusion, and unconventional breakthroughs</strong>. In <strong>Vedic astrology</strong>, Rahu is the shadow planet symbolizing desires, Maya (illusion), foreign influences, and obsessive pursuits. Its movement through <strong>{rashiName}</strong> triggers sudden shifts, innovative opportunities, and karmic acceleration.
              </p>
              <p>
                While Rahu creates confusion and craving, it also offers rapid growth and material success. This transit teaches discernment between truth and deception, detachment from obsessions, and channeling ambition constructively for spiritual evolution.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-indigo-400 uppercase">
            {isHi ? "वर्तमान राहु स्थिति" : "Current Rahu Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({rahuPos?.degree}°)
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गति" : "Transit Motion"}
              </p>
              <p className="text-2xl font-black italic text-amber-400">
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
            planetSlug="rahu-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "राहु सामंजस्य और उपाय" : "Rahu Balance & Remedies"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
              <h3 className="font-black text-indigo-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  📿
                  <span>
                    {isHi
                      ? <> <strong>राहु बीज मंत्र</strong> का जप: <em>"ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः"</em> बुधवार या शनिवार को 108 बार। </>
                      : <>Chant <strong>Rahu Beej Mantra</strong>: <em>"Om Bhram Bhreem Bhraum Sah Rahave Namah"</em> 108 times on Wednesday or Saturday.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🪔
                  <span>
                    {isHi
                      ? <> सरसों का तेल, काले तिल या कोयला दान करें। नारियल को बहते पानी में प्रवाहित करें। माँ दुर्गा की पूजा या दुर्गा चालीसा पढ़ें। </>
                      : <>Donate mustard oil, black sesame seeds, or coal. Flow a coconut in running water. Worship Goddess Durga or recite Durga Chalisa.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> गोमेद (Hessonite) रत्न चांदी में बुधवार को धारण करें (ज्योतिषी से परामर्श लें)। </>
                      : <>Wear Hessonite (Gomed) gemstone in silver on Wednesday (consult astrologer first).</>}
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
                  🌍
                  <span>
                    {isHi
                      ? <> <strong>ग्राउंडिंग:</strong> प्रकृति में समय बिताएं, मेडिटेशन करें ताकि भ्रम और अति-महत्वाकांक्षा कम हो। </>
                      : <> <strong>Grounding:</strong> Spend time in nature, meditate, or practice mindfulness to counter illusion and over-ambition.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🚀
                  <span>
                    {isHi
                      ? <> <strong>नवाचार:</strong> नई स्किल्स सीखें या unconventional projects पर फोकस करें, लेकिन reality check रखें। </>
                      : <> <strong>Innovation:</strong> Pursue tech, foreign, or creative ventures mindfully—avoid shortcuts or deception.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  ⚖️
                  <span>
                    {isHi
                      ? <> <strong>संतुलन:</strong> इच्छाओं को नियंत्रित करें, honesty और detachment का अभ्यास करें। </>
                      : <> <strong>Discernment:</strong> Practice ethical ambition, avoid obsession, and cultivate detachment from material illusions.</>}
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-indigo-700">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Ketu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/rahu-transit/${rahuPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना महत्वाकांक्षा और कर्म विश्लेषण देखें →" : "Unlock Your Ambition & Karma Forecast →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}