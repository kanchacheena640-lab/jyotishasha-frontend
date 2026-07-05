// app/today-panchang/page.tsx

import { format } from "date-fns";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";
import { DEFAULT_OG_IMAGE, SITE_URL, toISTDatePublished } from "@/lib/seo/articleSchema";


const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

const DEFAULT_CITY = "India"; // SEO text only

type ChaughadiyaItem = {
  name: string;
  name_en: string;
  nature: string;
  nature_en: "shubh" | "ashubh";
  start: string;
  end: string;
};

/* ---------------- DATA FETCH ---------------- */
async function getTodayPanchang(lang: "en" | "hi") {
  const today = format(new Date(), "yyyy-MM-dd");

  const res = await fetch(`${BACKEND_URL}/api/panchang`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: today,
      latitude: 26.8467,
      longitude: 80.9462,
      language: lang,
    }),
    next: { revalidate: 3600 }, // 🔑 freshness
  });

  if (!res.ok) throw new Error("Failed to fetch Panchang");

  const data = await res.json();
  return data.selected_date;
}

/* ---------------- FORMAT HELPERS ---------------- */
function formatDDMMYYYYWithTime(dateTimeStr: string) {
  // Expected: "YYYY-MM-DD HH:mm"
  const [date, time] = dateTimeStr.split(" ");
  if (!date || !time) return dateTimeStr;

  const [y, m, d] = date.split("-");
  if (y?.length === 4) return `${d}-${m}-${y} ${time}`;

  return dateTimeStr;
}

function formatDDMMYYYY(dateStr: string) {
  // already DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return dateStr;

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  }

  return dateStr; // fallback
}

/* ---------------- SMALL UI HELPERS (same Tailwind) ---------------- */
function Section({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-purple-300">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-gray-300 max-w-3xl">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white/95 rounded-2xl p-5 shadow text-gray-800 ${className}`}>
      {children}
    </div>
  );
}

function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ---------------- SEO META ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const isHindi = params.locale === "hi";
  const p = await getTodayPanchang(isHindi ? "hi" : "en");

  const title = isHindi
    ? `आज का पंचांग – ${p.weekday}, ${formatDDMMYYYY(
        p.date
      )} | तिथि, नक्षत्र, चौघड़िया, राहु काल`
    : `Today Panchang – ${p.weekday}, ${formatDDMMYYYY(
        p.date
      )} | Tithi, Nakshatra, Chaughadiya, Rahu Kaal`;

  const description = isHindi
    ? `आज का पंचांग ${p.tithi.name} तिथि, ${p.nakshatra.name} नक्षत्र, चौघड़िया समय, राहु काल और पंचक के साथ। प्रतिदिन अपडेट होता है।`
    : `Today Panchang with ${p.tithi.name} Tithi, ${p.nakshatra.name} Nakshatra, Chaughadiya timings, Rahu Kaal and Panchak. Updated daily.`;

  const canonicalUrl = `${SITE_URL}${isHindi ? "/hi" : ""}/today-panchang`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1730, height: 909, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function TodayPanchangPage({
  params,
}: {
  params: { locale: string };
}) {
  const isHindi = params.locale === "hi";
  const p = await getTodayPanchang(isHindi ? "hi" : "en");

  /* ---------------- ARTICLE SCHEMA ---------------- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Today Panchang – ${p.weekday}, ${formatDDMMYYYY(p.date)}`,
    description:
      "Daily updated Hindu Panchang with Tithi, Nakshatra, Chaughadiya, Rahu Kaal and Panchak.",
    datePublished: toISTDatePublished(p.date),
    dateModified: toISTDatePublished(p.date),
    image: DEFAULT_OG_IMAGE,
    author: { "@type": "Organization", name: "Jyotishasha", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Jyotishasha" },
  };

  /* ---------------- FAQ SCHEMA ---------------- */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Today Panchang kya hota hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Today Panchang Hindu calendar ka daily detail hota hai jisme Tithi, Nakshatra, Yoga, Karan, Rahu Kaal, Chaughadiya aur Panchak ki jaankari hoti hai.",
        },
      },
      {
        "@type": "Question",
        name: "Aaj ka Shubh Chaughadiya kaunsa hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Amrit, Shubh aur Labh Chaughadiya ko shubh mana jata hai jo naya kaam aur yatra ke liye upyukt hote hain.",
        },
      },
      {
        "@type": "Question",
        name: "Rahu Kaal mein kya nahi karna chahiye?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Rahu Kaal ke dauran naya kaam, investment aur shubh karya shuru karne se bachna chahiye.",
        },
      },
      {
        "@type": "Question",
        name: "Kya Today Panchang roz update hota hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Haan, Today Panchang har din automatically update hota hai aur sunrise-sunset ke anusaar calculate hota hai.",
        },
      },
    ],
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-200 space-y-10">
      {/* JSON-LD */}
      <JsonLd schema={articleSchema} />
      <JsonLd schema={faqSchema} />

      {/* ================== HERO ================== */}
      <section>
        <h1 className="text-3xl font-bold text-purple-300 mb-4">
          {isHindi
            ? `आज का पंचांग – ${p.weekday}, ${formatDDMMYYYY(p.date)}`
            : `Today Panchang – ${p.weekday}, ${formatDDMMYYYY(p.date)}`}
        </h1>

        <Card className="space-y-4 max-w-4xl">
          {!isHindi ? (
            <>
              <p>
                Today Panchang for{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>{" "}
                begins with the sacred <strong>Brahma Muhurta</strong>, observed from{" "}
                <strong>
                  {p.brahma_muhurta.start} to {p.brahma_muhurta.end}
                </strong>
                . This period is considered highly auspicious for meditation, prayers,
                spiritual practices, and setting positive intentions for the day.
              </p>

              <p className="text-sm text-gray-600">
                In this article, you will find complete and accurate details of{" "}
                <strong>
                  Tithi, Nakshatra, Chaughadiya, Rahu Kaal, Abhijit Muhurta
                </strong>
                , calculated using precise astronomical methods and traditional Panchang
                principles.
              </p>
            </>
          ) : (
            <>
              <p>
                आज का पंचांग{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>{" "}
                के लिए <strong>ब्रह्म मुहूर्त</strong> से प्रारंभ होता है, जो{" "}
                <strong>
                  {p.brahma_muhurta.start} से {p.brahma_muhurta.end}
                </strong>{" "}
                तक रहता है। यह समय ध्यान, पूजा, जप और आध्यात्मिक साधना के लिए अत्यंत
                शुभ माना जाता है।
              </p>

              <p className="text-sm text-gray-600">
                इस लेख में आपको{" "}
                <strong>
                  तिथि, नक्षत्र, चौघड़िया, राहु काल और अभिजीत मुहूर्त
                </strong>{" "}
                की सटीक जानकारी पारंपरिक पंचांग गणनाओं के आधार पर मिलेगी।
              </p>
            </>
          )}
        </Card>
      </section>

      <p className="text-xs text-gray-500">
        Panchang calculated using Indian standard latitude–longitude (IST).
      </p>

      {/* ================== TITHI & NAKSHATRA ================== */}
      <Section
        title={isHindi ? "आज की तिथि, नक्षत्र और शुभ मुहूर्त" : "Today’s Tithi, Nakshatra & Shubh Muhurat"}
      >
        <Card className="space-y-4 max-w-4xl">
          <p>
            {!isHindi ? (
              <>
                On{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>
                , the lunar day is{" "}
                <strong>
                  {p.tithi.paksha} {p.tithi.name}
                </strong>
                , starting at <strong>{formatDDMMYYYYWithTime(p.tithi.start_ist)}</strong> and
                ending at <strong>{formatDDMMYYYYWithTime(p.tithi.end_ist)}</strong>. The Moon
                remains in <strong>{p.nakshatra.name}</strong> Nakshatra (Pada{" "}
                {p.nakshatra.pada}), which is traditionally used to determine{" "}
                <strong>Shubh Muhurat</strong> for important life events.
              </>
            ) : (
              <>
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>{" "}
                को <strong>{p.tithi.paksha} {p.tithi.name}</strong> तिथि प्रभाव में है, जो{" "}
                <strong>{formatDDMMYYYYWithTime(p.tithi.start_ist)}</strong> से प्रारंभ होकर{" "}
                <strong>{formatDDMMYYYYWithTime(p.tithi.end_ist)}</strong> तक मान्य रहेगी।
                चंद्रमा <strong>{p.nakshatra.name}</strong> नक्षत्र के{" "}
                <strong>पाद {p.nakshatra.pada}</strong> में स्थित है, जिसके आधार पर शुभ
                मुहूर्त निर्धारित किए जाते हैं।
              </>
            )}
          </p>

          {/* Muhurat Links */}
          <div className="pt-3 border-t text-sm">
            <p className="font-medium mb-3 text-purple-700 text-center">
              {isHindi ? "आज के प्रमुख शुभ मुहूर्त:" : "Key Shubh Muhurat for Today:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Marriage Muhurat", url: "/panchang/muhurat/marriage-muhurat" },
                { label: "Naamkaran Muhurat", url: "/panchang/muhurat/naamkaran-muhurat" },
                { label: "Grah Pravesh Muhurat", url: "/panchang/muhurat/grah-pravesh-muhurat" },
                { label: "Vehicle Muhurat", url: "/panchang/muhurat/vehicle-muhurat" },
                { label: "Child Birth Muhurat", url: "/panchang/muhurat/child-birth-muhurat" },
                { label: "Gold Buying Muhurat", url: "/panchang/muhurat/gold-buying-muhurat" },
                { label: "Foreign Travel Muhurat", url: "/panchang/muhurat/foreign-travel-muhurat" },
              ].map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  className="
                    block text-center rounded-lg px-4 py-3
                    bg-purple-50 text-purple-700 font-medium
                    hover:bg-purple-600 hover:text-white
                    transition-all duration-200
                    shadow-sm hover:shadow
                  "
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      {/* ================== CHAUGHADIYA ================== */}
      <Section
        title={
          isHindi
            ? `चौघड़िया मुहूर्त – ${p.weekday}, ${formatDDMMYYYY(p.date)}`
            : `Chaughadiya Muhurat for ${p.weekday}, ${formatDDMMYYYY(p.date)}`
        }
        subtitle={
          isHindi
            ? "चौघड़िया दिन और रात के शुभ तथा अशुभ समय को दर्शाता है, जिससे दैनिक कार्यों की योजना बनाई जाती है।"
            : "Chaughadiya Muhurat shows auspicious and inauspicious periods of the day and night, helping in planning important activities."
        }
      >
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DAY */}
            <Card>
              <h3 className="font-semibold text-lg mb-4">
                {isHindi ? "दिन का चौघड़िया" : "Daytime Chaughadiya"}
              </h3>

              <p className="text-green-600 font-medium mb-1">
                {isHindi ? "शुभ चौघड़िया" : "Shubh Chaughadiya"}
              </p>
              <table className="w-full text-sm mb-4">
                <tbody>
                  {(p.chaughadiya.day as ChaughadiyaItem[])
                    .filter((c) => c.nature_en === "shubh")
                    .map((c, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                        <td className="py-1 text-right">
                          {c.start} – {c.end}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <p className="text-red-600 font-medium mb-1">
                {isHindi ? "अशुभ चौघड़िया" : "Ashubh Chaughadiya"}
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {(p.chaughadiya.day as ChaughadiyaItem[])
                    .filter((c) => c.nature_en === "ashubh")
                    .map((c, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                        <td className="py-1 text-right">
                          {c.start} – {c.end}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>

            {/* NIGHT */}
            <Card>
              <h3 className="font-semibold text-lg mb-4">
                {isHindi ? "रात्रि का चौघड़िया" : "Nighttime Chaughadiya"}
              </h3>

              <p className="text-green-600 font-medium mb-1">
                {isHindi ? "शुभ चौघड़िया" : "Shubh Chaughadiya"}
              </p>
              <table className="w-full text-sm mb-4">
                <tbody>
                  {(p.chaughadiya.night as ChaughadiyaItem[])
                    .filter((c) => c.nature_en === "shubh")
                    .map((c, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                        <td className="py-1 text-right">
                          {c.start} – {c.end}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <p className="text-red-600 font-medium mb-1">
                {isHindi ? "अशुभ चौघड़िया" : "Ashubh Chaughadiya"}
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {(p.chaughadiya.night as ChaughadiyaItem[])
                    .filter((c) => c.nature_en === "ashubh")
                    .map((c, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                        <td className="py-1 text-right">
                          {c.start} – {c.end}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </Section>

      {/* ================== MUHURAT HIGHLIGHTS ================== */}
      <section className="space-y-6">
        {/* Rahu Kaal */}
        <Card className="rounded-xl">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            {isHindi ? "राहु काल" : "Rahu Kaal"}
          </h3>
          <p className="text-sm leading-relaxed">
            {isHindi ? (
              <>
                आज{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>{" "}
                को <strong>राहु काल {p.rahu_kaal.start} से {p.rahu_kaal.end}</strong> तक
                रहेगा। इस समय के दौरान{" "}
                <strong>सभी शुभ कार्य, नई शुरुआत, निवेश और महत्वपूर्ण निर्णय</strong>{" "}
                लेने से बचना चाहिए।
              </>
            ) : (
              <>
                On{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>
                , <strong>Rahu Kaal is observed from {p.rahu_kaal.start} to {p.rahu_kaal.end}</strong>
                . During this period, it is advised to{" "}
                <strong>avoid auspicious activities, new beginnings, investments, and major decisions</strong>.
              </>
            )}
          </p>
        </Card>

        {/* Abhijit Muhurat */}
        <Card className="rounded-xl">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            {isHindi ? "अभिजीत मुहूर्त" : "Abhijit Muhurat"}
          </h3>
          <p className="text-sm leading-relaxed">
            {isHindi ? (
              <>
                आज{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>{" "}
                को <strong>अभिजीत मुहूर्त {p.abhijit_muhurta.start} से {p.abhijit_muhurta.end}</strong>{" "}
                तक रहेगा। यह समय{" "}
                <strong>नए कार्यों की शुरुआत, महत्वपूर्ण निर्णय, पूजा-पाठ और शुभ कार्यों</strong>{" "}
                के लिए अत्यंत अनुकूल माना जाता है।
              </>
            ) : (
              <>
                On{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>
                , <strong>Abhijit Muhurat is observed from {p.abhijit_muhurta.start} to {p.abhijit_muhurta.end}</strong>.
                This period is considered{" "}
                <strong>highly auspicious for starting new work, taking important decisions, prayers, and positive initiatives</strong>.
              </>
            )}
          </p>
        </Card>

        {/* Panchak */}
        <div
          className={`rounded-xl p-5 shadow ${
            p.panchak.active ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            {isHindi ? "पंचक स्थिति" : "Panchak Status"}
          </h3>

          <p className="text-sm leading-relaxed">
            {isHindi ? (
              p.panchak.active ? (
                <>
                  आज{" "}
                  <strong>
                    {p.weekday}, {formatDDMMYYYY(p.date)}
                  </strong>{" "}
                  को <strong>पंचक प्रभाव में है</strong> क्योंकि चंद्रमा{" "}
                  <strong>{p.panchak.nakshatra}</strong> नक्षत्र में स्थित है। इस अवधि में{" "}
                  <strong>गृह प्रवेश, निर्माण कार्य और महत्वपूर्ण शुभ कार्यों</strong>{" "}
                  से बचना उचित माना जाता है।
                </>
              ) : (
                <>
                  आज{" "}
                  <strong>
                    {p.weekday}, {formatDDMMYYYY(p.date)}
                  </strong>{" "}
                  को <strong>पंचक नहीं है</strong>, इसलिए दिन{" "}
                  <strong>शुभ और सकारात्मक कार्यों</strong> के लिए अनुकूल माना जाता है।
                </>
              )
            ) : p.panchak.active ? (
              <>
                On{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>
                , <strong>Panchak is active</strong> due to the Moon’s placement in{" "}
                <strong>{p.panchak.nakshatra}</strong> Nakshatra. During this time, it is advised to{" "}
                <strong>avoid Grah Pravesh, construction work, and major auspicious activities</strong>.
              </>
            ) : (
              <>
                On{" "}
                <strong>
                  {p.weekday}, {formatDDMMYYYY(p.date)}
                </strong>
                , <strong>Panchak is not present</strong>, making the day{" "}
                <strong>favorable for auspicious and important activities</strong>.
              </>
            )}
          </p>
        </div>
      </section>

      <p className="text-xs text-gray-500 mt-4">
        Panchang calculations follow traditional Vedic astronomy principles
        using sidereal zodiac and Jyotishasha methodology.
      </p>

      {/* ================== APP CTA ================== */}
      <section className="mt-2 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Get Today Panchang on Mobile</h2>
        <p className="text-purple-200 mb-4">
          Access Today Panchang, Chaughadiya, Rahu Kaal, Abhijit Muhurat and Horoscope instantly on your phone.
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl"
        >
          Download Jyotishasha App
        </a>
      </section>
      
      {/* ================== ADS + SEO FOOTER ================== */}
      <div className="mt-6 text-center text-sm text-gray-400">Advertisement</div>

      <section className="mt-2 text-sm text-gray-400">
        <p>
          Users searching for <strong>Today Panchang in {DEFAULT_CITY}</strong>, Aaj Ka Panchang,
          Daily Panchang, Chaughadiya Today and Rahu Kaal Today can trust Jyotishasha for accurate information.
        </p>
      </section>

      <p className="text-xs text-gray-500">This Today Panchang page updates every day.</p>
    </main>
  );
}
