"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HoroscopeLanding() {
  const { lang } = useLanguage();

  const zodiacs = [
    { name: "Aries", emoji: "♈", akshar: "चू, चे, चो, ला, ली, लू, ले, लो, अ" },
    { name: "Taurus", emoji: "♉", akshar: "ई, ऊ, ए, ओ, वा, वी, वू, वे, वो" },
    { name: "Gemini", emoji: "♊", akshar: "का, की, कू, घ, ङ, छ, के, को, ह" },
    { name: "Cancer", emoji: "♋", akshar: "ही, हू, हे, हो, डा, डी, डू, डे, डो" },
    { name: "Leo", emoji: "♌", akshar: "मा, मी, मू, मे, मो, टा, टी, टू, टे" },
    { name: "Virgo", emoji: "♍", akshar: "ढो, पा, पी, पू, ष, ण, ठ, पे, पो" },
    { name: "Libra", emoji: "♎", akshar: "रा, री, रू, रे, रो, ता, ती, तू, ते" },
    { name: "Scorpio", emoji: "♏", akshar: "तो, ना, नी, नू, ने, नो, या, यी, यू" },
    { name: "Sagittarius", emoji: "♐", akshar: "ये, यो, भा, भी, भू, धा, फा, ढा, भे" },
    { name: "Capricorn", emoji: "♑", akshar: "भो, जा, जी, खी, खू, खे, खो, गा, गी" },
    { name: "Aquarius", emoji: "♒", akshar: "गू, गे, गो, सा, सी, सू, से, सो, दा" },
    { name: "Pisces", emoji: "♓", akshar: "दी, दू, थ, झ, ञ, दे, दो, चा, ची" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-center">
      <div className="flex justify-center mb-8">
        <LanguageSwitcher />
      </div>

      <h1 className="text-4xl font-bold text-white mb-4">
        {lang === "hi" ? "आज का राशिफल चुनें" : "Choose Your Zodiac Sign"}
      </h1>
      <p className="text-purple-200 mb-10">
        {lang === "hi"
          ? "अपनी राशि पर क्लिक करें और आज का राशिफल पढ़ें।"
          : "Click on your zodiac sign to read today’s horoscope."}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {zodiacs.map((zodiac) => (
          <Link
            key={zodiac.name}
            href={`/horoscope/${zodiac.name.toLowerCase()}`}
            className="bg-gradient-to-br from-[#f7ecff] to-[#e5dbff] rounded-2xl p-6 border border-purple-200 shadow hover:shadow-xl hover:scale-105 transition-all flex flex-col items-center"
          >
            <div className="text-4xl mb-2">{zodiac.emoji}</div>
            <span className="text-lg font-semibold text-gray-900 mb-1">
              {zodiac.name}
            </span>
            <span className="text-xs text-gray-600">{zodiac.akshar}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
