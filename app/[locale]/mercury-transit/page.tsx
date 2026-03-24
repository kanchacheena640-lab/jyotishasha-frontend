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
  return getTransitMetadata("Mercury", "mercury-transit");
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
async function fetchMercuryTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Mercury transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MercuryTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchMercuryTransit(lang);

  const mercuryPos = data.positions?.Mercury;
  const mercuryFuture = data.future_transits?.Mercury || [];
  const currentTransit = mercuryFuture[0];

  const rashiName = getRashiName(
    mercuryPos?.rashi,
    mercuryPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Mercury", isHi);
  const motion = getMotion(mercuryPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Mercury transit ${currentYear} affect communication and intellect?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mercury governs speech, logic, learning, and commerce. Its transit sharpens mental agility, influences business decisions, writing, negotiations, and short travels—often causing quick thinking or occasional miscommunications during retrograde.",
        },
      },
      {
        "@type": "Question",
        name: "What is the spiritual significance of Budh Gochar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, Mercury represents discernment, wit, and adaptability. Its transit encourages intellectual growth, clear expression, ethical commerce, and learning lessons through communication and curiosity.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-emerald-950/20 py-16 px-4">
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
              <span className="text-emerald-600">बुद्धि, वाणी और व्यापार</span>
            </>
          ) : (
            <>
              Mercury Transit {currentYear} in {rashiName} –{" "}
              <span className="text-emerald-600">Intellect, Speech & Commerce</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ बुध उपाय" : "↓ Budh Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (बुध गोचर) हमारे <strong>बुद्धि, संचार और व्यापारिक निर्णयों</strong> का तेज़ और बौद्धिक चक्र है। <strong>वैदिक ज्योतिष</strong> में बुध ग्रह बुद्धि, वाणी, तर्क, शिक्षा और व्यापार का कारक है। इसका गोचर <strong>{rashiName}</strong> में विचारों की स्पष्टता, सीखने की क्षमता और संवाद की गुणवत्ता को प्रभावित करता है।
              </p>
              <p>
                बुध त्वरित सोच, अनुकूलनशीलता और व्यावहारिक बुद्धि का प्रतीक है। इस गोचर को समझकर आप बेहतर निर्णय ले सकते हैं, संचार में सुधार कर सकते हैं और व्यापार/शिक्षा में सफलता प्राप्त कर सकते हैं—खासकर retrograde के दौरान सावधानी बरतें।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Mercury transit {currentYear}</strong> (Budh Gochar) energizes our <strong>intellect, communication, and commercial decisions</strong>. In <strong>Vedic astrology</strong>, Mercury rules logic, speech, learning, wit, and business acumen. Its movement through <strong>{rashiName}</strong> influences mental sharpness, negotiation skills, and short-term planning.
              </p>
              <p>
                As the planet of adaptability and discernment, Mercury transit boosts curiosity, writing, technology, and trade. Aligning with this cycle enhances clear thinking, effective expression, and success in intellectual or mercantile pursuits—watch for miscommunications during retrograde.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-emerald-400 uppercase">
            {isHi ? "वर्तमान बुध स्थिति" : "Current Mercury Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({mercuryPos?.degree}°)
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
            planetSlug="mercury-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "बुध सामंजस्य और उपाय" : "Mercury Harmony & Remedies"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <h3 className="font-black text-emerald-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  📿
                  <span>
                    {isHi
                      ? <> <strong>बुध बीज मंत्र</strong> का जप: <em>"ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः"</em> बुधवार को 108 बार। </>
                      : <>Chant <strong>Budh Beej Mantra</strong>: <em>"Om Bram Breem Broum Sah Budhaya Namah"</em> 108 times on Wednesdays.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🪔
                  <span>
                    {isHi
                      ? <> बुधवार को हरी वस्तुएं (मूंग दाल, पालक, हरी सब्जियाँ, किताबें) दान करें। भगवान विष्णु या गणेश की पूजा करें। </>
                      : <>Donate green items (moong dal, spinach, green veggies, books) on Wednesdays. Worship Lord Vishnu or Ganesha.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> पन्ना (Emerald) चांदी या सोने में छोटी उंगली में बुधवार को धारण करें (ज्योतिषी से परामर्श लें)। </>
                      : <>Wear Emerald (Panna) in silver/gold on the little finger on Wednesday (consult astrologer).</>}
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
                  📚
                  <span>
                    {isHi
                      ? <> <strong>सीखना:</strong> नई किताब पढ़ें, कोर्स करें या भाषा सीखें ताकि बुद्धि तेज हो। </>
                      : <> <strong>Learning:</strong> Read books, take courses, or learn a new skill/language to sharpen intellect.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💬
                  <span>
                    {isHi
                      ? <> <strong>संचार:</strong> स्पष्ट और ईमानदार बातचीत करें, journaling या public speaking का अभ्यास करें। </>
                      : <> <strong>Communication:</strong> Practice clear, honest expression—journal, speak mindfully, or improve public speaking.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🧠
                  <span>
                    {isHi
                      ? <> <strong>मानसिक स्वास्थ्य:</strong> ब्रेन गेम्स खेलें, meditation करें और निर्णय लेने में तर्क का उपयोग करें। </>
                      : <> <strong>Mental Agility:</strong> Play brain games, meditate, and use logic in decisions to balance Mercury energy.</>}
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-emerald-700">
            {["Sun", "Moon", "Mars", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/mercury-transit/${mercuryPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-emerald-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-emerald-200 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना बुद्धि और संचार विश्लेषण देखें →" : "Unlock Your Intellect & Communication Forecast →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}