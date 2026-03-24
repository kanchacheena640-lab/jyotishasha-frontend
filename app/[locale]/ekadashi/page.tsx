import Link from "next/link";
import { Metadata } from "next";
import EkadashiCard from "@/components/EkadashiCard";

const BACKEND_URL = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026-2027",
  description:
    "Complete Ekadashi calendar with accurate dates and Parana timings.",
};

function formatDate(dateStr: string | undefined) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  try {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

async function getAllEkadashiData(year: number, locale: string) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/ekadashi/all?year=${year}&lang=${locale}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  } catch {
    return [];
  }
}

export default async function EkadashiDirectoryPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || "en";
  const isHi = locale === "hi";

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const [data2026, data2027] = await Promise.all([
    getAllEkadashiData(2026, locale),
    getAllEkadashiData(2027, locale),
  ]);

  const upcoming2026 = data2026.filter(
    (item: any) => new Date(item.vrat_date) >= now
  );
  const upcoming2027 = data2027.filter(
    (item: any) => new Date(item.vrat_date) >= now
  );

  const combinedData = [...upcoming2026, ...upcoming2027].slice(0, 24);
  const nextEkadashi = combinedData[0];

  return (
    <main className="min-h-screen bg-[#FDFCFE] pb-20 text-gray-900">

      {/* HERO */}
      <section className="bg-white border-b border-[#EDE9FE] py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-7xl font-black text-[#2E1065] mb-4 tracking-tight">
            {isHi ? "एकादशी" : "Ekadashi"}{" "}
            <span className="text-[#6D28D9]">
              {isHi ? "व्रत" : "Vrat"}
            </span>
          </h1>

          <p className="text-gray-500 font-medium text-sm md:text-lg mb-8 uppercase tracking-[0.2em]">
            {isHi ? "कैलेंडर 2026 — 2027" : "Calendar 2026 — 2027"}
          </p>

          {nextEkadashi && (
          <div className="inline-flex items-center gap-3 bg-[#6D28D9] text-white px-6 py-3 md:px-10 md:py-5 rounded-2xl md:rounded-3xl shadow-xl shadow-purple-200">
            <span className="text-xs md:text-lg font-black uppercase tracking-wider">
              {isHi ? "अगली:" : "NEXT:"}{" "}
              {(() => {
                // 1. Sabse pehle locale based field check karo
                const rawName = 
                  (typeof nextEkadashi.name === "object" ? nextEkadashi.name[locale] : null) || 
                  (isHi ? nextEkadashi.name_hi : nextEkadashi.name_en) || 
                  nextEkadashi.name || 
                  nextEkadashi.ekadashi_name || 
                  "";

                // 2. Agar khali hai toh fallback
                const base = rawName || (isHi ? "एकादशी" : "Ekadashi");

                // 3. Name append logic
                return base.toLowerCase().includes("ekadashi") || base.includes("एकादशी")
                  ? base
                  : `${base} ${isHi ? "एकादशी" : "Ekadashi"}`;
              })()}
              {" "} — {formatDate(nextEkadashi.vrat_date)}
            </span>
          </div>
        )}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {combinedData.map((item: any, idx: number) => {
            const itemDate = new Date(item.vrat_date);
            itemDate.setHours(0, 0, 0, 0);

            const isToday = itemDate.getTime() === now.getTime();

            return (
              <EkadashiCard
                key={idx}
                item={item}
                idx={idx}
                locale={locale}
                isToday={isToday}
              />
            );
          })}
        </div>
      </section>

    </main>
  );
}