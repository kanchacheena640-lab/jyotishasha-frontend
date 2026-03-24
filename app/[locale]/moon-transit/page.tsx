import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600; // Moon fast changes, but cache 1hr ok

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
  return getTransitMetadata("Moon", "moon-transit");
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
async function fetchMoonTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Moon transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MoonTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchMoonTransit(lang);

  const moonPos = data.positions?.Moon;
  const moonFuture = data.future_transits?.Moon || [];
  const currentTransit = moonFuture[0];

  const rashiName = getRashiName(
    moonPos?.rashi,
    moonPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Moon", isHi);
  const motion = getMotion(moonPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Moon transit ${currentYear} affect emotions and daily mood?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Moon governs the mind, emotions, intuition, and mother. Its quick transit influences daily mood swings, emotional sensitivity, mental peace, and instinctive reactions, shifting every 2-3 days.",
        },
      },
      {
        "@type": "Question",
        name: "What is the spiritual significance of Chandra Gochar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, the Moon represents the inner self, nurturing, and subconscious. Its transit highlights emotional healing, intuition development, connection to mother/family, and the flow of feelings in daily life.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950/20 py-16 px-4">
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
              <span className="text-indigo-600">मन, भावनाएँ और अंतर्ज्ञान</span>
            </>
          ) : (
            <>
              Moon Transit {currentYear} in {rashiName} –{" "}
              <span className="text-indigo-600">Mind, Emotions & Intuition</span>
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
              {isHi ? "↓ चंद्र उपाय" : "↓ Chandra Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (चंद्र गोचर) हमारे <strong>मन, भावनाओं और दैनिक मूड</strong> का सबसे तेज़ बदलाव लाता है। <strong>वैदिक ज्योतिष</strong> में चंद्र माता, मन, अंतर्ज्ञान और भावुकता का कारक है। हर 2-3 दिन में राशि बदलने से यह गोचर <strong>{rashiName}</strong> में हमारे दैनिक अनुभवों को भावनात्मक रंग देता है।
              </p>
              <p>
                चंद्र हमारे subconscious और nurturing energy का प्रतीक है। इस गोचर को समझकर आप अपनी भावनाओं को बेहतर संभाल सकते हैं, अंतर्ज्ञान बढ़ा सकते हैं और मानसिक शांति प्राप्त कर सकते हैं। यह दैनिक जीवन में सबसे प्रत्यक्ष प्रभाव वाला ग्रह है।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Moon transit {currentYear}</strong> (Chandra Gochar) brings the fastest shifts in our <strong>mind, emotions, and daily mood</strong>. In <strong>Vedic astrology</strong>, the Moon rules the mother, mental state, intuition, and feelings. Changing signs every 2-3 days, its passage through <strong>{rashiName}</strong> colors our everyday emotional landscape.
              </p>
              <p>
                As the significator of inner peace, nurturing, and subconscious patterns, Moon transit affects sensitivity, memory, and relationships with mother/family. Understanding this cycle helps stabilize emotions, enhance intuition, and foster mental clarity in daily life.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-indigo-400 uppercase">
            {isHi ? "वर्तमान चंद्र स्थिति" : "Current Moon Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({moonPos?.degree}°)
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गति" : "Transit Motion"}
              </p>
              <p className="text-2xl font-black italic text-indigo-300">
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
            planetSlug="moon-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "चंद्र सामंजस्य और उपाय" : "Moon Harmony & Remedies"}
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
                      ? <> <strong>चंद्र बीज मंत्र</strong> का जप: <em>"ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः"</em> सोमवार को 108 बार। </>
                      : <>Chant <strong>Chandra Beej Mantra</strong>: <em>"Om Shram Shreem Shraum Sah Chandramase Namah"</em> 108 times on Mondays.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🪔
                  <span>
                    {isHi
                      ? <> सोमवार को सफेद वस्तुएं (दूध, चावल, चीनी, सफेद कपड़ा, चांदी) दान करें। भगवान शिव को दूध चढ़ाएं। </>
                      : <>Donate white items (milk, rice, sugar, white cloth, silver) on Mondays. Offer milk to Lord Shiva.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> मोती (Pearl) या चंद्रकोट चांदी में छोटी उंगली में सोमवार को धारण करें (ज्योतिषी से सलाह लें)। </>
                      : <>Wear natural Pearl (Moti) in silver on the little finger on Monday (consult astrologer).</>}
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
                      ? <> <strong>भावनात्मक देखभाल:</strong> मेडिटेशन, जर्नलिंग या पानी के पास समय बिताएं। </>
                      : <> <strong>Emotional Care:</strong> Practice meditation, journaling, or spend time near water to calm the mind.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💧
                  <span>
                    {isHi
                      ? <> <strong>हाइड्रेशन:</strong> खूब पानी पिएं और माँ का सम्मान करें (उनके साथ समय बिताएं या आशीर्वाद लें)। </>
                      : <> <strong>Hydration & Nurturing:</strong> Drink plenty of water and honor your mother—spend quality time or seek her blessings.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🌙
                  <span>
                    {isHi
                      ? <> <strong>आराम:</strong> पर्याप्त नींद लें और चंद्रमा दिखाई देने पर उसे देखें/नमस्कार करें। </>
                      : <> <strong>Rest & Connection:</strong> Prioritize sleep and gaze at the Moon when visible for calming energy.</>}
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
            {["Sun", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/moon-transit/${moonPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना दैनिक भावनात्मक विश्लेषण देखें →" : "Check My Daily Emotional Vibe →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}