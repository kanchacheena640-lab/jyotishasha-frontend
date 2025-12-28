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
    title: `Today Panchang – ${p.weekday}, ${p.date} | Tithi, Nakshatra, Chaughadiya, Rahu Kaal`,
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
    headline: `Today Panchang – ${p.weekday}, ${p.date}`,
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

    {/* H1 */}
    <h1 className="text-3xl font-bold text-purple-300 mb-4">
      {isHindi
        ? `आज का पंचांग – ${p.weekday}, ${formatDDMMYYYY(p.date)}`
        : `Today Panchang – ${p.weekday}, ${formatDDMMYYYY(p.date)}`}
    </h1>

    {/* Intro – English (ONLY when language != hi) */}
    {!isHindi && (
      <>
        <p className="mb-4">
          Today Panchang for <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> begins with the
          sacred <strong>Brahma Muhurta</strong>, observed from{" "}
          <strong>{p.brahma_muhurta.start} to {p.brahma_muhurta.end}</strong>. This period is
          considered highly auspicious for meditation, prayers, spiritual practices,
          and setting positive intentions for the day.
        </p>

        <p className="mb-4">
          In this Today Panchang article, you will find complete and accurate details of{" "}
          <strong>Tithi, Nakshatra, Chaughadiya, Rahu Kaal, Abhijit Muhurta</strong>, and
          other important Hindu calendar timings, calculated using precise astronomical
          methods and traditional Panchang principles.
        </p>
      </>
    )}

    {/* Intro – Hindi (ONLY when backend language = hi) */}
    {p.language === "hi" && (
      <>
        <p className="mb-4">
          आज का पंचांग <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> के लिए
          <strong> ब्रह्म मुहूर्त</strong> से प्रारंभ होता है, जो{" "}
          <strong>{p.brahma_muhurta.start} से {p.brahma_muhurta.end}</strong> तक रहता है।
          यह समय ध्यान, पूजा, जप और आध्यात्मिक साधना के लिए अत्यंत शुभ माना जाता है।
        </p>

        <p className="mb-4">
          इस आज के पंचांग लेख में आपको <strong>तिथि, नक्षत्र, चौघड़िया, राहु काल,
          अभिजीत मुहूर्त</strong> तथा अन्य महत्वपूर्ण हिंदू पंचांग विवरण
          सटीक ज्योतिषीय गणनाओं के आधार पर प्राप्त होंगे।
        </p>
      </>
    )}

    {/* Tithi & Nakshatra Section */}
    <h2 className="text-xl font-semibold text-purple-300 mb-2">
      {isHindi ? "आज की तिथि, नक्षत्र और शुभ मुहूर्त" : "Today’s Tithi, Nakshatra & Shubh Muhurat"}
    </h2>

    <p className="mb-4">
      {isHindi ? (
        <>
          <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
          <strong>{p.tithi.paksha} {p.tithi.name}</strong> तिथि प्रभाव में है,
          जो <strong>{p.tithi.start_ist}</strong> से प्रारंभ होकर{" "}
          <strong>{p.tithi.end_ist}</strong> तक मान्य रहेगी।
          इस दिन चंद्रमा <strong>{p.nakshatra.name}</strong> नक्षत्र के{" "}
          <strong>पाद {p.nakshatra.pada}</strong> में स्थित है, जिसके आधार पर
          विभिन्न <strong>शुभ मुहूर्त</strong> निर्धारित किए जाते हैं।
        </>
      ) : (
        <>
          On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>, the lunar day is{" "}
          <strong>{p.tithi.paksha} {p.tithi.name}</strong>, starting at{" "}
          <strong>{p.tithi.start_ist}</strong> and ending at{" "}
          <strong>{p.tithi.end_ist}</strong>.
          The Moon remains in <strong>{p.nakshatra.name}</strong> Nakshatra
          (Pada {p.nakshatra.pada}), which is traditionally used to determine
          <strong> Shubh Muhurat</strong> for important life events.
        </>
      )}
    </p>
    <div className="mt-4 rounded-xl border border-purple-700/40 bg-purple-900/20 p-4">
      <p className="mb-3 font-medium text-purple-200">
        {isHindi
          ? "आज के शुभ मुहूर्त देखें:"
          : "Explore Shubh Muhurat based on today’s Panchang:"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-purple-300 text-sm">
        <a href="/panchang/muhurat/marriage-muhurat" className="hover:underline">
          Marriage Muhurat
        </a>
        <a href="/panchang/muhurat/naamkaran-muhurat" className="hover:underline">
          Naamkaran Muhurat
        </a>
        <a href="/panchang/muhurat/grah-pravesh-muhurat" className="hover:underline">
          Grah Pravesh Muhurat
        </a>
        <a href="/panchang/muhurat/vehicle-muhurat" className="hover:underline">
          Vehicle Muhurat
        </a>
        <a href="/panchang/muhurat/child-birth-muhurat" className="hover:underline">
          Child Birth Muhurat
        </a>
        <a href="/panchang/muhurat/gold-buying-muhurat" className="hover:underline">
          Gold Buying Muhurat
        </a>
        <a href="/panchang/muhurat/foreign-travel-muhurat" className="hover:underline">
          Foreign Travel Muhurat
        </a>
      </div>
    </div>
    {/* ================== Chaughadiya Section ================== */}
      <section className="mt-8">

        {/* Heading */}
        <h2 className="text-xl font-semibold text-purple-300 mb-3">
          {isHindi
            ? `चौघड़िया मुहूर्त – ${p.weekday}, ${formatDDMMYYYY(p.date)}`
            : `Chaughadiya Muhurat for ${p.weekday} & ${formatDDMMYYYY(p.date)}`}
        </h2>

        {/* Intro */}
        <p className="mb-4 text-sm text-gray-300">
          {isHindi
            ? "चौघड़िया दिन और रात के शुभ तथा अशुभ समय को दर्शाता है, जिसका उपयोग दैनिक कार्यों की योजना बनाने में किया जाता है।"
            : "Chaughadiya Muhurat divides the day and night into auspicious and inauspicious time periods as per the Hindu Panchang."}
        </p>

        {/* ---------- DAYTIME SHUBH ---------- */}
        <h3 className="font-semibold text-green-400 mb-2">
          {isHindi ? "दिन का शुभ चौघड़िया" : "Daytime Shubh Chaughadiya"}
        </h3>

        <table className="w-full mb-4 text-sm border border-green-700/40">
          <tbody>
            {(p.chaughadiya.day as ChaughadiyaItem[])
              .filter((c) => c.nature_en === "shubh")
              .map((c, i) => (
                <tr key={i} className="border-b border-green-700/20">
                  <td className="py-2 px-3">{isHindi ? c.name : c.name_en}</td>
                  <td className="py-2 px-3 text-right">{c.start} – {c.end}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* ---------- DAYTIME ASHUBH ---------- */}
        <h3 className="font-semibold text-red-400 mb-2">
          {isHindi ? "दिन का अशुभ चौघड़िया" : "Daytime Ashubh Chaughadiya"}
        </h3>

        <table className="w-full mb-6 text-sm border border-red-700/40">
          <tbody>
            {(p.chaughadiya.day as ChaughadiyaItem[])
              .filter((c) => c.nature_en === "ashubh")
              .map((c, i) => (
                <tr key={i} className="border-b border-red-700/20">
                  <td className="py-2 px-3">{isHindi ? c.name : c.name_en}</td>
                  <td className="py-2 px-3 text-right">{c.start} – {c.end}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* ---------- NIGHTTIME SHUBH ---------- */}
        <h3 className="font-semibold text-green-400 mb-2">
          {isHindi ? "रात्रि का शुभ चौघड़िया" : "Nighttime Shubh Chaughadiya"}
        </h3>

        <table className="w-full mb-4 text-sm border border-green-700/40">
          <tbody>
            {(p.chaughadiya.night as ChaughadiyaItem[])
              .filter((c) => c.nature_en === "shubh")
              .map((c, i) => (
                <tr key={i} className="border-b border-green-700/20">
                  <td className="py-2 px-3">{isHindi ? c.name : c.name_en}</td>
                  <td className="py-2 px-3 text-right">{c.start} – {c.end}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* ---------- NIGHTTIME ASHUBH ---------- */}
        <h3 className="font-semibold text-red-400 mb-2">
          {isHindi ? "रात्रि का अशुभ चौघड़िया" : "Nighttime Ashubh Chaughadiya"}
        </h3>

        <table className="w-full text-sm border border-red-700/40">
          <tbody>
            {(p.chaughadiya.night as ChaughadiyaItem[])
              .filter((c) => c.nature_en === "ashubh")
              .map((c, i) => (
                <tr key={i} className="border-b border-red-700/20">
                  <td className="py-2 px-3">{isHindi ? c.name : c.name_en}</td>
                  <td className="py-2 px-3 text-right">{c.start} – {c.end}</td>
                </tr>
              ))}
          </tbody>
        </table>

      </section>
      {/* ================== End Chaughadiya Section ================== */}

    {/* Rahu Kaal */}
    <p className="mb-4">
      {isHindi ? (
        <>
          आज <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
          <strong>राहु काल {p.rahu_kaal.start} से {p.rahu_kaal.end}</strong> तक रहेगा।
          इस अवधि के दौरान सभी <strong>शुभ कार्य, नई शुरुआत, निवेश और महत्वपूर्ण निर्णय</strong>{" "}
          लेने से बचना चाहिए।
        </>
      ) : (
        <>
          On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>,{" "}
          <strong>Rahu Kaal is observed from {p.rahu_kaal.start} to {p.rahu_kaal.end}</strong>.
          During this time, it is advised to <strong>avoid all auspicious activities,
          new beginnings, investments, and important decisions</strong>.
        </>
      )}
    </p>
    {/* Abhijit Muhurat */}
    <p className="mb-4">
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
          important decisions, prayers, and positive initiatives</strong>.
        </>
      )}
    </p>
    {/* Panchak */}
    <p className={`mb-4 ${p.panchak.active ? "text-red-300" : "text-green-300"}`}>
      {isHindi ? (
        p.panchak.active ? (
          <>
            आज <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong> को{" "}
            <strong>पंचक प्रभाव में है</strong> क्योंकि चंद्रमा{" "}
            <strong>{p.panchak.nakshatra}</strong> नक्षत्र में स्थित है।
            इस अवधि में <strong>गृह प्रवेश, लकड़ी से जुड़े कार्य और
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
            During this period, it is advised to <strong>avoid Grah Pravesh,
            construction-related work, and major auspicious activities</strong>.
          </>
        ) : (
          <>
            On <strong>{p.weekday}, {formatDDMMYYYY(p.date)}</strong>,{" "}
            <strong>Panchak is not present</strong>, making the day
            <strong>favorable for auspicious and important activities</strong>.
          </>
        )
      )}
    </p>

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
