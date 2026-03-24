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
  return getTransitMetadata("Saturn", "saturn-transit");
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
async function fetchSaturnTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Saturn transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function SaturnTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchSaturnTransit(lang);

  const saturnPos = data.positions?.Saturn;
  const saturnFuture = data.future_transits?.Saturn || [];
  const currentTransit = saturnFuture[0];

  const rashiName = getRashiName(
    saturnPos?.rashi,
    saturnPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Saturn", isHi);
  const motion = getMotion(saturnPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Saturn transit ${currentYear} affect career and responsibilities?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Saturn, the planet of karma and discipline, influences long-term career growth, authority, and hard work. Its transit often brings promotions through effort, increased responsibilities, or lessons in patience and structure.",
        },
      },
      {
        "@type": "Question",
        name: "What is the spiritual significance of Shani Gochar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, Saturn represents karma, justice, and maturity. Its transit teaches detachment, humility, and the value of consistent effort, helping clear past karmic debts and build a stronger foundation for the future.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900/90 py-16 px-4">
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
              <span className="text-slate-600">कर्म, अनुशासन और सिद्धि</span>
            </>
          ) : (
            <>
              Saturn Transit {currentYear} in {rashiName} –{" "}
              <span className="text-slate-600">Karma, Discipline & Mastery</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ शनि उपाय" : "↓ Shani Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (शनि गोचर) <strong>कर्मिक मूल्यांकन और दीर्घकालिक पुनर्संरचना</strong> का गहन चरण है। <strong>वैदिक ज्योतिष</strong> में शनि को न्याय, समय, धैर्य और अनुशासन का ग्रह माना जाता है। इसका धीमा गोचर <strong>{rashiName}</strong> में जीवन की नींव का कठोर परीक्षण करता है और कमजोर क्षेत्रों को मजबूत बनाने का अवसर देता है।
              </p>
              <p>
                शनि को लोग अक्सर डरते हैं, लेकिन यह "महान शिक्षक" है। यह गोचर सजा नहीं, बल्कि <strong>अनुशासन, मेहनत और जिम्मेदारी</strong> के माध्यम से स्थायी सफलता और आध्यात्मिक परिपक्वता प्रदान करता है। इसे अपनाकर आप मजबूत चरित्र और लंबे समय तक टिकने वाली उपलब्धियाँ प्राप्त कर सकते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Saturn transit {currentYear}</strong> (Shani Gochar) marks a deep phase of <strong>karmic reckoning and long-term restructuring</strong>. In <strong>Vedic astrology</strong>, Saturn governs justice, time, endurance, and discipline. Its slow movement through <strong>{rashiName}</strong> rigorously tests and strengthens the foundations of life.
              </p>
              <p>
                Often misunderstood and feared, Saturn is the true "Great Teacher." This transit rewards patience, hard work, and responsibility—building maturity, resilience, and lasting achievements rather than offering quick fixes.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-950 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-slate-400 uppercase">
            {isHi ? "वर्तमान शनि स्थिति" : "Current Saturn Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({saturnPos?.degree}°)
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गति" : "Transit Motion"}
              </p>
              <p className="text-2xl font-black italic text-slate-300">
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
            planetSlug="saturn-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "शनि सामंजस्य और उपाय" : "Saturn Discipline & Remedies"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-100 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  📿
                  <span>
                    {isHi
                      ? <> <strong>शनि बीज मंत्र</strong> का जप: <em>"ॐ शं शनैश्चराय नमः"</em> या <em>"ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः"</em> शनिवार को 108 बार। </>
                      : <>Chant <strong>Shani Beej Mantra</strong>: <em>"Om Sham Shanicharaya Namah"</em> or <em>"Om Praam Preem Praum Sah Shanicharaya Namah"</em> 108 times on Saturdays.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🪔
                  <span>
                    {isHi
                      ? <> शनिवार को तिल के तेल का दीपक जलाएं और पश्चिम दिशा में रखें। काले तिल, काले उड़द, सरसों का तेल या लोहा दान करें। </>
                      : <>Light a sesame oil lamp on Saturdays facing west. Donate black sesame seeds, black gram (urad), mustard oil, or iron items.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> नीलम (Blue Sapphire) या अमेथिस्ट शुक्रवार/शनिवार को चांदी में धारण करें (ज्योतिषी से परामर्श लें)। </>
                      : <>Wear Blue Sapphire (Neelam) or Amethyst in silver on Saturday (after astrologer consultation).</>}
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
                  🛠️
                  <span>
                    {isHi
                      ? <> <strong>अनुशासन:</strong> रोजाना रूटीन बनाएं, समय पर काम पूरा करें और देरी से बचें। </>
                      : <> <strong>Discipline:</strong> Build consistent routines, meet deadlines, and embrace structure in daily life.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🤝
                  <span>
                    {isHi
                      ? <> <strong>सेवा:</strong> गरीबों, मजदूरों या बुजुर्गों की मदद करें – सेवा से शनि प्रसन्न होते हैं। </>
                      : <> <strong>Service:</strong> Volunteer, help the underprivileged, or support elders—acts of selfless service soften Saturn's lessons.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🧘
                  <span>
                    {isHi
                      ? <> <strong>धैर्य और ध्यान:</strong> मेडिटेशन, योग या साइलेंस प्रैक्टिस करें ताकि मानसिक मजबूती आए। </>
                      : <> <strong>Patience & Stillness:</strong> Practice meditation, yoga, or periods of silence to cultivate inner strength and calm.</>}
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-slate-700">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/saturn-transit/${saturnPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-slate-950 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-800 transition shadow-2xl shadow-slate-900/30 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना कर्म और अनुशासन विश्लेषण देखें →" : "Master Your Karma & Discipline Forecast →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}