// app/today-panchang/page.tsx

import { format } from "date-fns";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

const DEFAULT_CITY = "India"; // SEO text only

async function getTodayPanchang() {
  const today = format(new Date(), "yyyy-MM-dd");

  const res = await fetch(`${BACKEND_URL}/api/panchang`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: today,
      latitude: 26.8467,
      longitude: 80.9462,
      language: "en",
    }),
    next: { revalidate: 3600 }, // 🔑 freshness
  });

  if (!res.ok) throw new Error("Failed to fetch Panchang");

  const data = await res.json();
  return data.selected_date;
}
function formatDDMMYYYY(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
}
type ChaughadiyaItem = {
  name: string;
  name_en: string;
  nature: string;
  nature_en: "shubh" | "ashubh";
  start: string;
  end: string;
};

/* ---------------- SEO META ---------------- */
export async function generateMetadata() {
  const p = await getTodayPanchang();

  return {
    title: `Today Panchang – ${p.weekday}, ${formatDDMMYYYY(p.date)} | Tithi, Nakshatra, Chaughadiya, Rahu Kaal`,
    description: `Today Panchang with ${p.tithi.name} Tithi, ${p.nakshatra.name} Nakshatra, Chaughadiya timings, Rahu Kaal and Panchak. Updated daily.`,
    alternates: { canonical: "/today-panchang" },
  };
}

export default async function TodayPanchangPage() {
  const p = await getTodayPanchang();

  const isHindi = p.language === "hi";

  /* ---------------- ARTICLE SCHEMA ---------------- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Today Panchang – ${p.weekday}, ${formatDDMMYYYY(p.date)}`,
    description:
      "Daily updated Hindu Panchang with Tithi, Nakshatra, Chaughadiya, Rahu Kaal and Panchak.",
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Organization", name: "Jyotishasha" },
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
  <main className="max-w-4xl mx-auto px-4 py-10 text-gray-200">
    {/* JSON-LD */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />

    {/* ================== HERO SECTION ================== */}
    <section className="mb-8">

      {/* H1 */}
      <h1 className="text-3xl font-bold text-purple-300 mb-4">
        {isHindi
          ? `आज का पंचांग – ${p.weekday}, ${formatDDMMYYYY(p.date)}`
          : `Today Panchang – ${p.weekday}, ${formatDDMMYYYY(p.date)}`}
      </h1>

      {/* Intro Card */}
      <div className="bg-white/95 rounded-2xl p-5 shadow text-gray-800 space-y-4 max-w-3xl">
        {!isHindi ? (
          <>
            <p>
              Today Panchang for <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> begins with the
              sacred <strong>Brahma Muhurta</strong>, observed from{" "}
              <strong>{p.brahma_muhurta.start} to {p.brahma_muhurta.end}</strong>.
              This period is considered highly auspicious for meditation, prayers,
              spiritual practices, and setting positive intentions for the day.
            </p>

            <p className="text-sm text-gray-600">
              In this article, you will find complete and accurate details of{" "}
              <strong>Tithi, Nakshatra, Chaughadiya, Rahu Kaal, Abhijit Muhurta</strong>,
              calculated using precise astronomical methods and traditional Panchang principles.
            </p>
          </>
        ) : (
          <>
            <p>
              आज का पंचांग <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> के लिए
              <strong> ब्रह्म मुहूर्त</strong> से प्रारंभ होता है, जो{" "}
              <strong>{p.brahma_muhurta.start} से {p.brahma_muhurta.end}</strong> तक रहता है।
              यह समय ध्यान, पूजा, जप और आध्यात्मिक साधना के लिए अत्यंत शुभ माना जाता है।
            </p>

            <p className="text-sm text-gray-600">
              इस लेख में आपको <strong>तिथि, नक्षत्र, चौघड़िया, राहु काल और
              अभिजीत मुहूर्त</strong> की सटीक जानकारी पारंपरिक पंचांग गणनाओं के आधार पर मिलेगी।
            </p>
          </>
        )}
      </div>
    </section>

    {/* ================== TITHI & NAKSHATRA ================== */}
    <section className="mb-8">

      <h2 className="text-xl font-semibold text-purple-300 mb-3">
        {isHindi
          ? "आज की तिथि, नक्षत्र और शुभ मुहूर्त"
          : "Today’s Tithi, Nakshatra & Shubh Muhurat"}
      </h2>

      <div className="bg-white/95 rounded-2xl p-5 shadow text-gray-800 space-y-4 max-w-3xl">

        <p>
          {!isHindi ? (
            <>
              On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>, the lunar day is{" "}
              <strong>{p.tithi.paksha} {p.tithi.name}</strong>, starting at{" "}
              <strong>{p.tithi.start_ist}</strong> and ending at{" "}
              <strong>{p.tithi.end_ist}</strong>.
              The Moon remains in <strong>{p.nakshatra.name}</strong> Nakshatra
              (Pada {p.nakshatra.pada}), which is traditionally used to determine
              <strong> Shubh Muhurat</strong> for important life events.
            </>
          ) : (
            <>
              <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
              <strong>{p.tithi.paksha} {p.tithi.name}</strong> तिथि प्रभाव में है,
              जो <strong>{p.tithi.start_ist}</strong> से प्रारंभ होकर{" "}
              <strong>{p.tithi.end_ist}</strong> तक मान्य रहेगी।
              चंद्रमा <strong>{p.nakshatra.name}</strong> नक्षत्र के
              <strong> पाद {p.nakshatra.pada}</strong> में स्थित है, जिसके आधार पर
              शुभ मुहूर्त निर्धारित किए जाते हैं।
            </>
          )}
        </p>

        {/* Muhurat Links */}
        <div className="pt-2 border-t text-sm">
          <p className="font-medium mb-2 text-purple-700">
            {isHindi ? "आज के प्रमुख शुभ मुहूर्त:" : "Key Shubh Muhurat for Today:"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a className="hover:underline" href="/panchang/muhurat/marriage-muhurat">Marriage Muhurat</a>
            <a className="hover:underline" href="/panchang/muhurat/naamkaran-muhurat">Naamkaran Muhurat</a>
            <a className="hover:underline" href="/panchang/muhurat/grah-pravesh-muhurat">Grah Pravesh Muhurat</a>
            <a className="hover:underline" href="/panchang/muhurat/vehicle-muhurat">Vehicle Muhurat</a>
            <a className="hover:underline" href="/panchang/muhurat/child-birth-muhurat">Child Birth Muhurat</a>
            <a className="hover:underline" href="/panchang/muhurat/gold-buying-muhurat">Gold Buying Muhurat</a>
            <a className="hover:underline" href="/panchang/muhurat/foreign-travel-muhurat">Foreign Travel Muhurat</a>
          </div>
        </div>

      </div>
    </section>
    {/* ================== Chaughadiya Section ================== */}
    <section className="mt-10">

      {/* Heading */}
      <h2 className="text-xl font-semibold text-purple-300 mb-2">
        {isHindi
          ? `चौघड़िया मुहूर्त – ${p.weekday}, ${formatDDMMYYYY(p.date)}`
          : `Chaughadiya Muhurat for ${p.weekday}, ${formatDDMMYYYY(p.date)}`}
      </h2>

      {/* Intro */}
      <p className="mb-6 text-sm text-gray-300 max-w-3xl">
        {isHindi
          ? "चौघड़िया दिन और रात के शुभ तथा अशुभ समय को दर्शाता है, जिससे दैनिक कार्यों की योजना बनाई जाती है।"
          : "Chaughadiya Muhurat shows auspicious and inauspicious periods of the day and night, helping in planning important activities."}
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ================= DAYTIME ================= */}
        <div className="bg-white/95 rounded-xl p-4 shadow text-gray-800">
          <h3 className="font-semibold text-lg mb-3">
            {isHindi ? "दिन का चौघड़िया" : "Daytime Chaughadiya"}
          </h3>

          {/* Shubh */}
          <p className="text-green-600 font-medium mb-1">
            {isHindi ? "शुभ चौघड़िया" : "Shubh Chaughadiya"}
          </p>
          <table className="w-full text-sm mb-4">
            <tbody>
              {(p.chaughadiya.day as ChaughadiyaItem[])
                .filter(c => c.nature_en === "shubh")
                .map((c, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                    <td className="py-1 text-right">{c.start} – {c.end}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Ashubh */}
          <p className="text-red-600 font-medium mb-1">
            {isHindi ? "अशुभ चौघड़िया" : "Ashubh Chaughadiya"}
          </p>
          <table className="w-full text-sm">
            <tbody>
              {(p.chaughadiya.day as ChaughadiyaItem[])
                .filter(c => c.nature_en === "ashubh")
                .map((c, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                    <td className="py-1 text-right">{c.start} – {c.end}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ================= NIGHTTIME ================= */}
        <div className="bg-white/95 rounded-xl p-4 shadow text-gray-800">
          <h3 className="font-semibold text-lg mb-3">
            {isHindi ? "रात्रि का चौघड़िया" : "Nighttime Chaughadiya"}
          </h3>

          {/* Shubh */}
          <p className="text-green-600 font-medium mb-1">
            {isHindi ? "शुभ चौघड़िया" : "Shubh Chaughadiya"}
          </p>
          <table className="w-full text-sm mb-4">
            <tbody>
              {(p.chaughadiya.night as ChaughadiyaItem[])
                .filter(c => c.nature_en === "shubh")
                .map((c, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                    <td className="py-1 text-right">{c.start} – {c.end}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Ashubh */}
          <p className="text-red-600 font-medium mb-1">
            {isHindi ? "अशुभ चौघड़िया" : "Ashubh Chaughadiya"}
          </p>
          <table className="w-full text-sm">
            <tbody>
              {(p.chaughadiya.night as ChaughadiyaItem[])
                .filter(c => c.nature_en === "ashubh")
                .map((c, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-1">{isHindi ? c.name : c.name_en}</td>
                    <td className="py-1 text-right">{c.start} – {c.end}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
    {/* ================== End Chaughadiya Section ================== */}

    {/* ================== Muhurat Highlights ================== */}
    <section className="mt-10 space-y-6">

      {/* ---------- Rahu Kaal ---------- */}
      <div className="bg-white/95 text-gray-800 rounded-xl p-5 shadow">
        <h3 className="text-lg font-semibold text-red-600 mb-2">
          {isHindi ? "राहु काल" : "Rahu Kaal"}
        </h3>

        <p className="text-sm leading-relaxed">
          {isHindi ? (
            <>
              आज <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
              <strong>राहु काल {p.rahu_kaal.start} से {p.rahu_kaal.end}</strong> तक रहेगा।
              इस समय के दौरान <strong>सभी शुभ कार्य, नई शुरुआत, निवेश और
              महत्वपूर्ण निर्णय</strong> लेने से बचना चाहिए।
            </>
          ) : (
            <>
              On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>,{" "}
              <strong>Rahu Kaal is observed from {p.rahu_kaal.start} to {p.rahu_kaal.end}</strong>.
              During this period, it is advised to <strong>avoid auspicious activities,
              new beginnings, investments, and major decisions</strong>.
            </>
          )}
        </p>
      </div>

      {/* ---------- Abhijit Muhurat ---------- */}
      <div className="bg-white/95 text-gray-800 rounded-xl p-5 shadow">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          {isHindi ? "अभिजीत मुहूर्त" : "Abhijit Muhurat"}
        </h3>

        <p className="text-sm leading-relaxed">
          {isHindi ? (
            <>
              आज <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
              <strong>अभिजीत मुहूर्त {p.abhijit_muhurta.start} से {p.abhijit_muhurta.end}</strong>{" "}
              तक रहेगा। यह समय <strong>नए कार्यों की शुरुआत, महत्वपूर्ण निर्णय,
              पूजा-पाठ और शुभ कार्यों</strong> के लिए अत्यंत अनुकूल माना जाता है।
            </>
          ) : (
            <>
              On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>,{" "}
              <strong>Abhijit Muhurat is observed from {p.abhijit_muhurta.start} to {p.abhijit_muhurta.end}</strong>.
              This period is considered <strong>highly auspicious for starting new work,
              taking important decisions, prayers, and positive initiatives</strong>.
            </>
          )}
        </p>
      </div>

      {/* ---------- Panchak ---------- */}
      <div
        className={`rounded-xl p-5 shadow ${
          p.panchak.active
            ? "bg-red-50 text-red-800"
            : "bg-green-50 text-green-800"
        }`}
      >
        <h3 className="text-lg font-semibold mb-2">
          {isHindi ? "पंचक स्थिति" : "Panchak Status"}
        </h3>

        <p className="text-sm leading-relaxed">
          {isHindi ? (
            p.panchak.active ? (
              <>
                आज <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
                <strong>पंचक प्रभाव में है</strong> क्योंकि चंद्रमा{" "}
                <strong>{p.panchak.nakshatra}</strong> नक्षत्र में स्थित है।
                इस अवधि में <strong>गृह प्रवेश, निर्माण कार्य और
                महत्वपूर्ण शुभ कार्यों</strong> से बचना उचित माना जाता है।
              </>
            ) : (
              <>
                आज <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
                <strong>पंचक नहीं है</strong>, इसलिए दिन
                <strong>शुभ और सकारात्मक कार्यों</strong> के लिए अनुकूल माना जाता है।
              </>
            )
          ) : (
            p.panchak.active ? (
              <>
                On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>,{" "}
                <strong>Panchak is active</strong> due to the Moon’s placement in{" "}
                <strong>{p.panchak.nakshatra}</strong> Nakshatra.
                During this time, it is advised to <strong>avoid Grah Pravesh,
                construction work, and major auspicious activities</strong>.
              </>
            ) : (
              <>
                On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>,{" "}
                <strong>Panchak is not present</strong>, making the day
                <strong> favorable for auspicious and important activities</strong>.
              </>
            )
          )}
        </p>
      </div>

    </section>
    {/* ================== End Muhurat Highlights ================== */}

    {/* APP CTA – Play Store Only */}
    <section className="mt-12 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">
        Get Today Panchang on Mobile
      </h2>
      <p className="text-purple-200 mb-4">
        Access Today Panchang, Chaughadiya, Rahu Kaal, Abhijit Muhurat and Horoscope
        instantly on your phone.
      </p>
      <a
        href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
        className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl"
      >
        Download Jyotishasha App
      </a>
    </section>

    {/* ADS */}
    <div className="mt-10 text-center text-sm text-gray-400">
      Advertisement
    </div>

    {/* CITY KEYWORDS */}
    <section className="mt-10 text-sm text-gray-400">
      <p>
        Users searching for <strong>Today Panchang in {DEFAULT_CITY}</strong>,
        Aaj Ka Panchang, Daily Panchang, Chaughadiya Today and Rahu Kaal Today
        can trust Jyotishasha for accurate information.
      </p>
    </section>

    <p className="mt-6 text-xs text-gray-500">
      This Today Panchang page updates automatically every day.
    </p>
  </main>
);
}
