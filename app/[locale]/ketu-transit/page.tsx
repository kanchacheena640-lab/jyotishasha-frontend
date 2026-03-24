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
  return getTransitMetadata("Ketu", "ketu-transit");
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
async function fetchKetuTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Ketu transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function KetuTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchKetuTransit(lang);

  const ketuPos = data.positions?.Ketu;
  const ketuFuture = data.future_transits?.Ketu || [];
  const currentTransit = ketuFuture[0];

  const rashiName = getRashiName(
    ketuPos?.rashi,
    ketuPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Ketu", isHi);
  const motion = getMotion(ketuPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Ketu transit ${currentYear} affect spirituality and detachment?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ketu, the south node, represents detachment, past-life karma, spirituality, and liberation. Its transit often brings sudden spiritual awakenings, detachment from material desires, intuitive insights, or losses that lead to higher wisdom.",
        },
      },
      {
        "@type": "Question",
        name: "What is the spiritual meaning of Ketu Gochar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, Ketu signifies moksha (liberation), renunciation, and dissolution of ego. Its transit pushes one toward introspection, karmic resolution, occult knowledge, and letting go of attachments for soul evolution.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-purple-950/20 py-16 px-4">
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
              <span className="text-purple-600">आध्यात्मिकता, वैराग्य और मोक्ष</span>
            </>
          ) : (
            <>
              Ketu Transit {currentYear} in {rashiName} –{" "}
              <span className="text-purple-600">Spirituality, Detachment & Liberation</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-purple-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ केतु उपाय" : "↓ Ketu Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (केतु गोचर) <strong>आध्यात्मिक जागृति, वैराग्य और पिछले कर्मों का समापन</strong> का रहस्यमय चक्र है। <strong>वैदिक ज्योतिष</strong> में केतु छाया ग्रह है जो मोक्ष, त्याग, अंतर्ज्ञान और भौतिक बंधनों से मुक्ति का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में अचानक आध्यात्मिक अनुभव, पुरानी आदतों का अंत और गहन आत्म-निरीक्षण लाता है।
              </p>
              <p>
                केतु भ्रम और आसक्ति से मुक्त करने वाला ग्रह है। यह गोचर आपको <strong>भौतिक सुखों से अलगाव</strong>, occult ज्ञान और आत्म-मुक्ति की ओर ले जाता है। इसे अपनाकर आप पिछले कर्मों का बोझ कम कर सकते हैं और उच्च चेतना की ओर बढ़ सकते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Ketu transit {currentYear}</strong> (Ketu Gochar) is a mystical cycle of <strong>spiritual awakening, detachment, and karmic resolution</strong>. In <strong>Vedic astrology</strong>, Ketu is the south node symbolizing liberation (moksha), renunciation, intuition, past-life karma, and dissolution of ego. Its slow passage through <strong>{rashiName}</strong> triggers sudden spiritual insights, letting go of attachments, and deep inner transformation.
              </p>
              <p>
                While often associated with confusion or losses, Ketu ultimately guides toward higher truth, occult wisdom, and freedom from material illusions. Understanding this transit helps embrace detachment, heal karmic patterns, and accelerate soul evolution.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-purple-400 uppercase">
            {isHi ? "वर्तमान केतु स्थिति" : "Current Ketu Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({ketuPos?.degree}°)
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
            planetSlug="ketu-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "केतु सामंजस्य और उपाय" : "Ketu Harmony & Remedies"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100">
              <h3 className="font-black text-purple-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  📿
                  <span>
                    {isHi
                      ? <> <strong>केतु बीज मंत्र</strong> का जप: <em>"ॐ स्रां स्रीं स्रौं सः केतवे नमः"</em> मंगलवार या शनिवार को 108 बार। </>
                      : <>Chant <strong>Ketu Beej Mantra</strong>: <em>"Om Straam Streem Straum Sah Ketave Namah"</em> 108 times on Tuesday or Saturday.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🪔
                  <span>
                    {isHi
                      ? <> काले तिल, नारियल, कंबल या सात अनाज दान करें। गणेश जी की पूजा करें या कुत्तों को भोजन दें। </>
                      : <>Donate black sesame, coconut, blanket, or seven grains. Worship Lord Ganesha or feed stray dogs.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> लहसुनिया (Cat's Eye) चांदी में मंगलवार को धारण करें (ज्योतिषी से परामर्श लें)। </>
                      : <>Wear Cat's Eye (Lehsunia) in silver on Tuesday (consult astrologer first).</>}
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
                  🧘
                  <span>
                    {isHi
                      ? <> <strong>ध्यान:</strong> गहन मेडिटेशन, mindfulness या solitude में समय बिताएं। </>
                      : <> <strong>Meditation:</strong> Practice deep meditation, mindfulness, or spend time in solitude for inner clarity.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🌌
                  <span>
                    {isHi
                      ? <> <strong>त्याग:</strong> अनावश्यक सामान, पुरानी आदतें या toxic संबंध छोड़ें। </>
                      : <> <strong>Letting Go:</strong> Release unnecessary possessions, old habits, or toxic attachments to create space for growth.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🔮
                  <span>
                    {isHi
                      ? <> <strong>आध्यात्मिकता:</strong> योग, प्रार्थना या spiritual books पढ़ें। </>
                      : <> <strong>Spiritual Practice:</strong> Engage in yoga, prayer, or reading spiritual texts to align with higher purpose.</>}
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-purple-700">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/ketu-transit/${ketuPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-purple-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-purple-200 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना आध्यात्मिक विश्लेषण देखें →" : "Unlock Your Spiritual & Karmic Forecast →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}