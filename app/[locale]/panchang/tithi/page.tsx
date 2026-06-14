import Link from "next/link";
import { tithiData } from "@/app/data/tithiData";
import TithiCard from "@/components/TithiCard";
import TodayTithiHero from "@/components/TodayTithiHero";


async function getTodayPanchang(
  language: string
) {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/panchang",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: 26.8467,
        longitude: 80.9462,
        language,
      }),
      next: {
        revalidate: 3600,
      },
    }
  );

  return res.json();
}

export default async function TithiPage({
  params,
}: {
  params: { locale: string };
}) {

  const isHi = params.locale === "hi";

  const panchang =
    await getTodayPanchang(
      isHi ? "hi" : "en"
    );

  const tithiName =
    panchang?.selected_date?.tithi?.name || "";

  const slugMap: Record<string, string> = {
    Pratipada: "pratipada",
    Dwitiya: "dwitiya",
    Tritiya: "tritiya",
    Chaturthi: "chaturthi",
    Panchami: "panchami",
    Shashthi: "shashthi",
    Saptami: "saptami",
    Ashtami: "ashtami",
    Navami: "navami",
    Dashami: "dashami",
    Ekadashi: "ekadashi",
    Dvadashi: "dwadashi",
    Trayodashi: "trayodashi",
    Chaturdashi: "chaturdashi",
    Purnima: "purnima",
    Amavasya: "amavasya",
  };

  const currentTithi =
    tithiData.find(
      (t) => t.slug === slugMap[tithiName]
    ) || null;

  

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
        <TodayTithiHero
            panchang={panchang}
            currentTithi={currentTithi}
            isHi={isHi}
        />
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          {isHi
            ? "हिंदू पंचांग की 16 तिथियाँ"
            : "16 Tithis of Hindu Panchang"}
        </h1>

        <p className="mt-4 text-gray-400">
          {isHi
            ? "प्रत्येक तिथि का महत्व, देवता, शुभ कार्य और ज्योतिषीय प्रभाव जानें।"
            : "Explore the meaning, deity, best activities and astrological significance of every Tithi."}
        </p>
      </section>

      

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {tithiData.map((tithi) => (
          <TithiCard
            key={tithi.slug}
            tithi={tithi}
            isHi={isHi}
            locale={params.locale}
          />
        ))}

      </section>

    </main>
  );
}