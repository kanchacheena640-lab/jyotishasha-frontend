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
      language: "hi",
    }),
    next: { revalidate: 3600 }, // 🔑 freshness
  });

  if (!res.ok) throw new Error("Failed to fetch Panchang");

  const data = await res.json();
  return data.selected_date;
}

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
        Today Panchang – {p.weekday}, {p.date}
      </h1>

      {/* Intro */}
      <p className="mb-4">
        Today Panchang gives complete Hindu calendar details including
        Tithi, Nakshatra, Chaughadiya, Rahu Kaal and Panchak based on accurate
        sunrise and sunset calculations.
      </p>

      {/* Tithi & Nakshatra */}
      <p className="mb-3">
        Aaj <strong>{p.tithi.paksha} {p.tithi.name}</strong> Tithi hai,
        jo <strong>{p.tithi.start_ist}</strong> se shuru hokar{" "}
        <strong>{p.tithi.end_ist}</strong> tak rahegi.  
        Chandrama <strong>{p.nakshatra.name}</strong> Nakshatra
        (Pada {p.nakshatra.pada}) mein sthit hai.
      </p>

      {/* Chaughadiya */}
      <p className="mb-3">
        Aaj ke Chaughadiya din aur raat ko Shubh aur Ashubh samayon
        mein baantte hain. Amrit, Shubh aur Labh Chaughadiya
        mahatvapurn karya shuru karne ke liye uttam hote hain.
      </p>

      {/* Rahu Kaal */}
      <p className="mb-4">
        Aaj ka Rahu Kaal <strong>{p.rahu_kaal.start} – {p.rahu_kaal.end}</strong>{" "}
        ke beech rahega. Is dauran naye kaam shuru karna varjit maana jata hai.
      </p>

      {/* Panchak */}
      {p.panchak.active ? (
        <p className="mb-4 text-red-300">
          Aaj Panchak lagu hai kyunki Chandra{" "}
          <strong>{p.panchak.nakshatra}</strong> Nakshatra mein hain.
        </p>
      ) : (
        <p className="mb-4 text-green-300">
          Aaj Panchak nahi hai, isliye din shubh mana jata hai.
        </p>
      )}

      {/* INTERNAL LINKS */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-purple-300 mb-3">
          Useful Astrology Links
        </h2>
        <ul className="list-disc list-inside space-y-1 text-purple-200">
          <li><a href="/horoscope/today" className="underline">Today Horoscope</a></li>
          <li><a href="/panchang" className="underline">Complete Panchang Calendar</a></li>
          <li><a href="/kundali" className="underline">Free Kundali & Birth Chart</a></li>
        </ul>
      </section>

      {/* APP CTA */}
      <section className="mt-12 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Daily Panchang on Mobile
        </h2>
        <p className="text-purple-200 mb-4">
          Get Today Panchang, Chaughadiya, Rahu Kaal & Horoscope instantly.
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

      {/* CITY KEYWORDS (SAFE) */}
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
