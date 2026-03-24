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

const PLANET_HI: Record<string, string> = {
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

const RASHI_HI_MAP: Record<string, string> = {
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
  return getTransitMetadata("Jupiter", "jupiter-transit");
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
async function fetchJupiterTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Jupiter transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function JupiterTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchJupiterTransit(lang);

  const jupiterPos = data.positions?.Jupiter;
  const jupiterFuture = data.future_transits?.Jupiter || [];
  const currentTransit = jupiterFuture[0];

  const rashiName = getRashiName(
    jupiterPos?.rashi,
    jupiterPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Jupiter", isHi);
  const motion = getMotion(jupiterPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Jupiter transit ${currentYear} influence growth and fortune?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jupiter, the planet of expansion and wisdom, brings opportunities for growth, higher learning, financial prosperity, and spiritual development. Its transit often signifies luck, generosity, teaching, and blessings in life.",
        },
      },
      {
        "@type": "Question",
        name: "What is the spiritual meaning of Guru Gochar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, Jupiter represents dharma, knowledge, and divine grace. Its transit encourages ethical living, pursuit of wisdom, generosity, and connection to higher purpose and teachers/gurus.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-yellow-950/10 py-16 px-4">
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
              <span className="text-yellow-600">विकास, ज्ञान और भाग्य</span>
            </>
          ) : (
            <>
              Jupiter Transit {currentYear} in {rashiName} –{" "}
              <span className="text-yellow-600">Growth, Wisdom & Fortune</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-yellow-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ बृहस्पति उपाय" : "↓ Guru Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (गुरु गोचर) वैदिक ज्योतिष में सबसे शुभ और विस्तारकारी चक्र है। <strong>बृहस्पति</strong> ज्ञान, समृद्धि, धर्म, गुरु और भाग्य का कारक ग्रह है। इसका गोचर <strong>{rashiName}</strong> में शिक्षा, यात्रा, धार्मिक कार्य, वित्तीय लाभ और आध्यात्मिक उन्नति के नए द्वार खोलता है।
              </p>
              <p>
                गुरु को "देवगुरु" कहा जाता है—यह उदारता, नैतिकता और उच्च विचारों की ऊर्जा लाता है। इस गोचर को अपनाकर आप ज्ञान बढ़ा सकते हैं, सकारात्मक निर्णय ले सकते हैं और जीवन में स्थायी समृद्धि प्राप्त कर सकते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Jupiter transit {currentYear}</strong> (Guru Gochar) is the most benevolent and expansive cycle in Vedic astrology. Jupiter governs wisdom, prosperity, dharma, higher learning, and good fortune. Its movement through <strong>{rashiName}</strong> opens doors to education, travel, spiritual growth, financial gains, and ethical expansion.
              </p>
              <p>
                Known as the "Great Benefic," Jupiter brings generosity, optimism, and divine grace. Aligning with this transit enhances knowledge, attracts mentors, fosters abundance, and supports long-term growth in all areas of life.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-yellow-400 uppercase">
            {isHi ? "वर्तमान बृहस्पति स्थिति" : "Current Jupiter Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({jupiterPos?.degree}°)
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
            planetSlug="jupiter-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "बृहस्पति सामंजस्य और उपाय" : "Jupiter Harmony & Remedies"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-yellow-50 rounded-3xl border border-yellow-100">
              <h3 className="font-black text-yellow-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  📿
                  <span>
                    {isHi
                      ? <> <strong>गुरु बीज मंत्र</strong> का जप: <em>"ॐ बृं बृहस्पतये नमः"</em> या <em>"ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः"</em> गुरुवार को 108 बार। </>
                      : <>Chant <strong>Guru Beej Mantra</strong>: <em>"Om Brim Brihaspataye Namah"</em> or <em>"Om Graam Greem Groum Sah Gurave Namah"</em> 108 times on Thursdays.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💛
                  <span>
                    {isHi
                      ? <> गुरुवार को पीली वस्तुएं (चना दाल, हल्दी, केला, किताबें, पीला कपड़ा) दान करें। भगवान विष्णु या लक्ष्मी की पूजा करें। </>
                      : <>Donate yellow items (chana dal, turmeric, banana, books, yellow cloth) on <strong>Thursdays</strong>. Worship Lord Vishnu or Lakshmi.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> पुखराज (Yellow Sapphire) सोने में तर्जनी उंगली में गुरुवार को धारण करें (ज्योतिषी से सलाह लें)। </>
                      : <>Wear Yellow Sapphire (Pukhraj) in gold on the index finger on Thursday (consult astrologer).</>}
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
                  🎓
                  <span>
                    {isHi
                      ? <> <strong>ज्ञानार्जन:</strong> नया कोर्स, किताब पढ़ें या गुरु/मेंटर से सीखें। </>
                      : <> <strong>Learning & Growth:</strong> Pursue higher education, read wisdom books, or seek guidance from mentors.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🤝
                  <span>
                    {isHi
                      ? <> <strong>उदारता:</strong> दूसरों की मदद करें, दान दें और कृतज्ञता व्यक्त करें। </>
                      : <> <strong>Generosity:</strong> Practice giving, volunteering, and daily gratitude to attract abundance.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🌟
                  <span>
                    {isHi
                      ? <> <strong>नैतिकता:</strong> सत्य, ईमानदारी और धर्म का पालन करें। </>
                      : <> <strong>Ethical Living:</strong> Live with integrity, optimism, and alignment with higher values.</>}
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-yellow-700">
            {["Sun", "Moon", "Mars", "Mercury", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/jupiter-transit/${jupiterPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-yellow-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-yellow-200 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना भाग्य और विकास विश्लेषण देखें →" : "Unlock Your Growth & Fortune Forecast →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}