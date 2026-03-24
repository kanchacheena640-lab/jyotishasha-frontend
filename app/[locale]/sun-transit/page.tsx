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
  return getTransitMetadata("Sun", "sun-transit");
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
async function fetchSunTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Sun transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function SunTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchSunTransit(lang);

  const sunPos = data.positions?.Sun;
  const sunFuture = data.future_transits?.Sun || [];
  const currentTransit = sunFuture[0];

  const rashiName = getRashiName(
    sunPos?.rashi,
    sunPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Sun", isHi);
  const motion = getMotion(sunPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does the Sun transit ${currentYear} affect my career?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Sun represents authority and leadership. Its transit influences your professional recognition, relationship with superiors, and overall confidence in making executive decisions."
        }
      },
      {
        "@type": "Question",
        name: "What is the spiritual meaning of Sun Transit (Surya Gochar)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, the Sun represents the Atma (Soul). Its transit indicates where you need to shine your light, take responsibility, and align with your higher purpose."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-amber-950/20 py-16 px-4">
      
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
              <span className="text-amber-600">जीवन ऊर्जा और शक्ति</span>
            </>
          ) : (
            <>
              Sun Transit {currentYear} in {rashiName} –{" "}
              <span className="text-amber-600">Vitality & Power</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ सूर्य उपाय" : "↓ Surya Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO (SAFE) */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
  {isHi ? (
    <>
      <p>
        <strong>{planetName} गोचर {currentYear}</strong> (सूर्य गोचर) हमारे <strong>आंतरिक प्रकाश और अधिकार</strong> का मासिक पुनर्संतुलन दर्शाता है। <strong>वैदिक ज्योतिष</strong> में सूर्य को ग्रहों का राजा माना जाता है, जो आत्मा, नेतृत्व और शारीरिक स्वास्थ्य का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में हमारे लक्ष्यों और महत्वाकांक्षाओं की दिशा तय करता है।
      </p>
      <p>
        सूर्य सभी ऊर्जा का स्रोत है, इसलिए इसका गोचर हमारे <strong>आत्म-अभिव्यक्ति और सामाजिक स्थिति</strong> को प्रभावित करता है। इस चक्र को समझकर आप अपनी शक्ति को सही दिशा में उपयोग कर सकते हैं, ऊर्जा बढ़ा सकते हैं और अधिक आत्मविश्वास के साथ जीवन जी सकते हैं।
      </p>
    </>
  ) : (
    <>
      <p>
        The <strong>Sun transit {currentYear}</strong> (Surya Gochar) marks a monthly recalibration of our <strong>inner light and authority</strong>. In <strong>Vedic astrology</strong>, the Sun is the King of the celestial cabinet, representing the Soul, leadership, and physical health. Its movement through <strong>{rashiName}</strong> sets the seasonal tone for our ambitions.
      </p>
      <p>
        As the source of all energy, the Sun’s transit dictates our <strong>self-expression and social status</strong>. Understanding this cycle allows you to harness personal power, improve vitality, and navigate life with greater confidence.
      </p>
    </>
  )}
</div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-amber-400 uppercase">
            {isHi ? "वर्तमान सूर्य स्थिति" : "Current Sun Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({sunPos?.degree}°)
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
            planetSlug="sun-transit"
            lang={lang}
          />
        </section>

    
<section id="remedies" className="mb-20 scroll-mt-20">
  <h2 className="text-3xl font-black mb-8 text-slate-950">
    {isHi ? "सूर्य शक्ति और उपाय" : "Sun Empowerment & Remedies"}
  </h2>

  <div className="grid md:grid-cols-2 gap-8">
    <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
      <h3 className="font-black text-amber-900 mb-4 uppercase tracking-widest text-xs">
        {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
      </h3>

      <ul className="space-y-4 text-slate-700 text-sm font-medium">
        <li className="flex gap-3">
          🪔
          <span>
            {isHi
              ? "रोज सुबह उगते सूर्य को जल अर्पित करें, इससे स्वास्थ्य और स्पष्टता बढ़ती है।"
              : <>Offer <strong>Arghya</strong> (Water) to the rising Sun daily to improve health and clarity.</>}
          </span>
        </li>

        <li className="flex gap-3">
          ☀️
          <span>
            {isHi
              ? <> <strong>आदित्य हृदय स्तोत्र</strong> या सूर्य बीज मंत्र का जप करें: <em>"Om Hram Hreem Hroum Sah Suryaye Namah"</em> </> 
              : <>Chant the <strong>Aditya Hridayam</strong> or Surya Beej Mantra: <em>"Om Hram Hreem Hroum Sah Suryaye Namah"</em>.</>}
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
          👔
          <span>
            {isHi
              ? <> <strong>नेतृत्व:</strong> इस समय जिम्मेदारी लें और उदाहरण बनकर नेतृत्व करें। </>
              : <> <strong>Leadership:</strong> Focus on taking responsibility and leading by example during this month.</>}
          </span>
        </li>

        <li className="flex gap-3">
          🧘
          <span>
            {isHi
              ? <> <strong>स्व-देखभाल:</strong> धूप में समय बिताएं या outdoor activities करें ताकि ऊर्जा और स्वास्थ्य बढ़े। </>
              : <> <strong>Self-Care:</strong> Prioritize "Sun-gazing" or outdoor activities to boost natural Vitamin D and solar energy.</>}
          </span>
        </li>
      </ul>
    </div>
  </div>
</section>

<footer className="mt-20 pt-12 border-t border-slate-100">
  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">
    {isHi ? "ग्रह गोचर देखें" : "Planetary Transits"}
  </h4>

  <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
    {["Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
      <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
        {isHi ? PLANET_HI[p] : p} →
      </Link>
    ))}
  </div>

  <div className="mt-12 text-center md:text-left">
    <Link
      href={`${isHi ? "/hi" : ""}/sun-transit/${sunPos?.rashi?.toLowerCase()}`}
      className="inline-block bg-amber-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-amber-200 hover:scale-105 active:scale-95"
    >
      {isHi ? "अपना सूर्य विश्लेषण देखें →" : "Check My Solar Alignment →"}
    </Link>
  </div>
</footer>

      </article>
    </div>
  );
}