import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import LocationText from "@/components/location/LocationText";
import HoliPujaVidhi from "@/components/HoliPujaVidhi";
import RashiCardHoli from "@/components/RashiCardHoli";

const BACKEND = "https://jyotishasha-backend.onrender.com";

const DEFAULT_LAT = 26.84;
const DEFAULT_LON = 80.94;

type Tip = { en: string; hi: string };

type HoliApiResponse = {
  year: number;
  holika_dahan: {
    date: string;
    sunset?: string;
    muhurta?: string;
    duration?: string;
    method?: string;
    note?: string;
  };
  holi_dhulandi?: { date: string };
  moon_sign_on_holi?: string;
  rashi_tips?: Record<string, { moon_transit_house: number; tip: Tip }>;
};

function isValidYear(raw: string) {
  return /^\d{4}$/.test(raw);
}

function clampYear(y: number) {
  const now = new Date().getFullYear();
  return Math.min(Math.max(y, now - 2), now + 20);
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${d.getFullYear()}`;
}

async function fetchHoli(year: number): Promise<HoliApiResponse | null> {
  try {
    const res = await fetch(`${BACKEND}/api/festivals/holi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: DEFAULT_LAT,
        longitude: DEFAULT_LON,
        year,
      }),
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/* ---------------- METADATA ---------------- */

export async function generateMetadata({
  params,
}: {
  params: { year: string; locale: string };
}): Promise<Metadata> {
  if (!isValidYear(params.year)) {
    return { robots: { index: false, follow: false } };
  }

  const locale = params.locale || "en";
  const isHi = locale === "hi";

  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);

  if (!data?.holika_dahan?.date) {
    return { robots: { index: false, follow: false } };
  }

  const baseUrl =
    locale === "hi"
      ? `https://www.jyotishasha.com/hi/holi-${year}`
      : `https://www.jyotishasha.com/holi-${year}`;

  return {
    title: isHi
      ? `होली ${year} तिथि व समय | होलिका दहन मुहूर्त`
      : `Holi ${year} Date & Time: Holika Dahan Muhurat`,
    description: isHi
      ? `होली ${year} की तिथि, होलिका दहन मुहूर्त और रंगों की होली की जानकारी।`
      : `Holi ${year} date, Holika Dahan muhurat and celebration details.`,
    alternates: {
      canonical: baseUrl,
    },
    robots: { index: true, follow: true },
  };
}

/* ---------------- PAGE ---------------- */

export default async function HoliYearPage({
  params,
}: {
  params: { locale: string; year: string };
}) {
  if (!isValidYear(params.year)) return notFound();

  const locale = params.locale || "en";
  const isHi = locale === "hi";

  const year = clampYear(Number(params.year));
  const data = await fetchHoli(year);

  if (!data?.holika_dahan?.date) return notFound();

  const holika = data.holika_dahan;
  const dhulandi = data?.holi_dhulandi?.date ?? null;
  const rashiTips = data.rashi_tips ?? {};

  const getHoliUrl = (y: number) =>
    locale === "hi" ? `/hi/holi-${y}` : `/holi-${y}`;

  const RASHI_ORDER = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  const RASHI_LABELS: Record<
    string,
    { en: string; hi: string }
  > = {
    aries: { en: "Aries", hi: "मेष" },
    taurus: { en: "Taurus", hi: "वृषभ" },
    gemini: { en: "Gemini", hi: "मिथुन" },
    cancer: { en: "Cancer", hi: "कर्क" },
    leo: { en: "Leo", hi: "सिंह" },
    virgo: { en: "Virgo", hi: "कन्या" },
    libra: { en: "Libra", hi: "तुला" },
    scorpio: { en: "Scorpio", hi: "वृश्चिक" },
    sagittarius: { en: "Sagittarius", hi: "धनु" },
    capricorn: { en: "Capricorn", hi: "मकर" },
    aquarius: { en: "Aquarius", hi: "कुंभ" },
    pisces: { en: "Pisces", hi: "मीन" },
  };

  const normalize = (s: string) => s.toLowerCase();

  return (
   <div className="bg-gradient-to-b from-slate-50 to-white py-16 text-slate-900">
      <article className="max-w-5xl mx-auto bg-white text-slate-900 px-6 md:px-10 py-14 rounded-3xl shadow-xl border border-slate-200">

        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-slate-900">
          {isHi
            ? `होली ${year} तिथि व समय`
            : `Holi ${year} Date & Time`}{" "}
          <LocationText />
        </h1>

        {/* YEAR NAV */}
       <div className="flex gap-6 mb-12 text-sm font-semibold text-slate-600">
          <Link href={getHoliUrl(year - 1)} className="hover:text-purple-600">
            Holi {year - 1}
          </Link>

          <span className="border-b-2 border-purple-600 text-slate-900">
            Holi {year}
          </span>

          <Link href={getHoliUrl(year + 1)} className="hover:text-purple-600">
            Holi {year + 1}
          </Link>
        </div>

        {/* DATE CARDS */}
        <section className="grid md:grid-cols-2 gap-6 mb-14">

          <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-2xl p-6 shadow-md">
            <div className="text-sm opacity-80">
              {isHi ? "होलिका दहन" : "Holika Dahan"}
            </div>
            <div className="text-2xl font-bold mt-1">
              {formatDate(holika.date)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow-md">
            <div className="text-sm opacity-80">
              {isHi ? "रंगों की होली" : "Rangwali Holi"}
            </div>
            <div className="text-2xl font-bold mt-1">
              {formatDate(dhulandi ?? "")}
            </div>
          </div>

        </section>

        {/* PUJA */}
        <HoliPujaVidhi isHi={isHi} />

        {/* RASHI */}
        {Object.keys(rashiTips).length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            {isHi ? "राशि अनुसार उपाय" : "Rashi Tips"}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RASHI_ORDER.map((rashiName) => {
            const entry = Object.entries(rashiTips).find(
              ([key]) => normalize(key) === normalize(rashiName)
            );

            if (!entry) return null;

            const [sign, item] = entry;

            return (
              <RashiCardHoli
                key={sign}
                sign={
                    RASHI_LABELS[sign.toLowerCase()]
                      ? isHi
                        ? RASHI_LABELS[sign.toLowerCase()].hi
                        : RASHI_LABELS[sign.toLowerCase()].en
                      : sign
                  }
                tip={item.tip}
                isHi={isHi}
                year={year}
              />
            );
          })}
        </div>
        </section>
      )}

      </article>
    </div>
  );
}