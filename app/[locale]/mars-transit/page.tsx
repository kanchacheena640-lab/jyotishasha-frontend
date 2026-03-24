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
  return getTransitMetadata("Mars", "mars-transit");
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
async function fetchMarsTransit(lang: string) {
  const res = await fetch(
    `https://jyotishasha-backend.onrender.com/api/transit/current?lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Mars transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MarsTransitPage({
  params,
}: {
  params: { locale?: string };
}) {
  const lang = getLangFromLocale(params?.locale);
  const isHi = lang === "hi";

  const data = await fetchMarsTransit(lang);

  const marsPos = data.positions?.Mars;
  const marsFuture = data.future_transits?.Mars || [];
  const currentTransit = marsFuture[0];

  const rashiName = getRashiName(
    marsPos?.rashi,
    marsPos?.rashi_hi,
    isHi
  );

  const planetName = getPlanetName("Mars", isHi);
  const motion = getMotion(marsPos?.motion, isHi);

  /* FAQ Schema */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Mars transit ${currentYear} affect energy and courage?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mars, the planet of action and vitality, influences courage, ambition, physical energy, and assertiveness. Its transit boosts drive, competitiveness, and initiative—but can also trigger conflicts, anger, or accidents if unmanaged.",
        },
      },
      {
        "@type": "Question",
        name: "What is the spiritual significance of Mangal Gochar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Spiritually, Mars represents willpower, discipline through action, and transformation via courage. Its transit teaches lessons in controlled aggression, leadership, protection of dharma, and channeling raw energy for higher purpose.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-red-950/20 py-16 px-4">
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
              <span className="text-red-600">साहस, ऊर्जा और क्रिया</span>
            </>
          ) : (
            <>
              Mars Transit {currentYear} in {rashiName} –{" "}
              <span className="text-red-600">Courage, Energy & Action</span>
            </>
          )}
        </h1>

        <aside className="mb-10">
          <VedicNote lang={lang} />

          <div className="flex gap-6 text-[10px] font-black text-red-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="underline">
              {isHi ? "↓ राशि अनुसार फल" : "↓ Forecast by Sign"}
            </Link>

            <Link href="#remedies" className="underline">
              {isHi ? "↓ मंगल उपाय" : "↓ Mangal Remedies"}
            </Link>
          </div>
        </aside>

        {/* INTRO */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          {isHi ? (
            <>
              <p>
                <strong>{planetName} गोचर {currentYear}</strong> (मंगल गोचर) हमारे <strong>साहस, ऊर्जा और सक्रियता</strong> का शक्तिशाली चक्र है। <strong>वैदिक ज्योतिष</strong> में मंगल योद्धा ग्रह है जो साहस, शारीरिक शक्ति, नेतृत्व और संघर्ष का प्रतिनिधित्व करता है। इसका गोचर <strong>{rashiName}</strong> में हमारी महत्वाकांक्षा, निर्णय लेने की क्षमता और क्रियाशीलता को तेज करता है।
              </p>
              <p>
                मंगल कच्ची ऊर्जा का स्रोत है—यह हमें आगे बढ़ने, चुनौतियों का सामना करने और लक्ष्यों को प्राप्त करने की शक्ति देता है। इस गोचर को समझकर आप अपनी ऊर्जा को सकारात्मक दिशा में उपयोग कर सकते हैं, क्रोध को नियंत्रित कर सकते हैं और मजबूत इच्छाशक्ति विकसित कर सकते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                The <strong>Mars transit {currentYear}</strong> (Mangal Gochar) ignites our <strong>courage, vitality, and drive for action</strong>. In <strong>Vedic astrology</strong>, Mars is the warrior planet governing energy, assertiveness, physical strength, competition, and leadership. Its passage through <strong>{rashiName}</strong> amplifies ambition, initiative, and the will to overcome obstacles.
              </p>
              <p>
                As the source of raw power and determination, Mars transit fuels passion, protection, and decisive movement—but requires discipline to avoid impulsiveness or conflict. Harnessing this cycle builds resilience, boosts physical vitality, and empowers bold, purposeful action.
              </p>
            </>
          )}
        </div>

        {/* SNAPSHOT */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white">
          <h2 className="text-xl font-bold mb-8 text-red-400 uppercase">
            {isHi ? "वर्तमान मंगल स्थिति" : "Current Mars Position"}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-slate-500 text-[10px]">
                {isHi ? "गोचर राशि" : "Transit Sign"}
              </p>
              <p className="text-2xl font-black">
                {rashiName} ({marsPos?.degree}°)
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
            planetSlug="mars-transit"
            lang={lang}
          />
        </section>

        {/* REMEDIES */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {isHi ? "मंगल सामंजस्य और उपाय" : "Mars Harmony & Remedies"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
              <h3 className="font-black text-red-900 mb-4 uppercase tracking-widest text-xs">
                {isHi ? "वैदिक उपाय" : "Vedic Propitiation"}
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">
                  📿
                  <span>
                    {isHi
                      ? <> <strong>मंगल बीज मंत्र</strong> का जप: <em>"ॐ क्रां क्रीं क्रौं सः भौमाय नमः"</em> या <em>"ॐ अं अंगारकाय नमः"</em> मंगलवार को 108 बार। </>
                      : <>Chant <strong>Mangal Beej Mantra</strong>: <em>"Om Kram Kreem Kroum Sah Bhaumaya Namah"</em> or <em>"Om Ang Angarakaya Namah"</em> 108 times on Tuesdays.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🪔
                  <span>
                    {isHi
                      ? <> मंगलवार को लाल वस्तुएं (मसूर दाल, लाल फल, तांबा, लाल कपड़ा) दान करें। हनुमान चालीसा पढ़ें या हनुमान मंदिर जाएं। </>
                      : <>Donate red items (masoor dal, red fruits, copper, red cloth) on Tuesdays. Recite Hanuman Chalisa or visit Hanuman temple.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  💎
                  <span>
                    {isHi
                      ? <> मूंगा (Red Coral) तांबे या सोने में अनामिका उंगली में मंगलवार को धारण करें (ज्योतिषी से सलाह लें)। </>
                      : <>Wear Red Coral (Moonga) in copper/gold on the ring finger on Tuesday (consult astrologer).</>}
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
                  🏋️
                  <span>
                    {isHi
                      ? <> <strong>शारीरिक गतिविधि:</strong> व्यायाम, जिम, खेल या योग करें ताकि ऊर्जा सकारात्मक बहे। </>
                      : <> <strong>Physical Outlet:</strong> Exercise, gym, sports, or martial arts to channel energy constructively.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  🔥
                  <span>
                    {isHi
                      ? <> <strong>क्रोध प्रबंधन:</strong> गहरी सांस लें, गिनती गिनें और assertive (न आक्रामक) तरीके से अपनी बात रखें। </>
                      : <> <strong>Anger Management:</strong> Practice deep breathing, count to 10, and express needs assertively without aggression.</>}
                  </span>
                </li>
                <li className="flex gap-3">
                  ⚡
                  <span>
                    {isHi
                      ? <> <strong>साहस:</strong> चुनौतियों का सामना करें, नेतृत्व लें और छोटे-छोटे goals पर तेजी से काम करें। </>
                      : <> <strong>Courage & Initiative:</strong> Take bold steps, lead projects, and act decisively on goals.</>}
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-red-700">
            {["Sun", "Moon", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`${isHi ? "/hi" : ""}/${p.toLowerCase()}-transit`}>
                {isHi ? PLANET_HI[p] : p} →
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`${isHi ? "/hi" : ""}/mars-transit/${marsPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-red-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-red-200 hover:scale-105 active:scale-95"
            >
              {isHi ? "अपना साहस और ऊर्जा विश्लेषण देखें →" : "Unlock Your Courage & Energy Forecast →"}
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}