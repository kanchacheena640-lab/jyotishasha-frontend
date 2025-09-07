import Link from "next/link";

export const metadata = {
  title: "Horoscope | Jyotishasha",
  description: "Check your daily, monthly, and yearly horoscope for all zodiac signs.",
};

export default function HoroscopeLanding() {
  const zodiacs = [
    { name: "Aries", emoji: "♈" },
    { name: "Taurus", emoji: "♉" },
    { name: "Gemini", emoji: "♊" },
    { name: "Cancer", emoji: "♋" },
    { name: "Leo", emoji: "♌" },
    { name: "Virgo", emoji: "♍" },
    { name: "Libra", emoji: "♎" },
    { name: "Scorpio", emoji: "♏" },
    { name: "Sagittarius", emoji: "♐" },
    { name: "Capricorn", emoji: "♑" },
    { name: "Aquarius", emoji: "♒" },
    { name: "Pisces", emoji: "♓" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Horoscope</h1>
      <p className="text-purple-200 mb-10">
        Explore daily, monthly, and yearly horoscopes for your zodiac sign.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {zodiacs.map((zodiac) => (
          <Link
            key={zodiac.name}
            href={`/horoscope/${zodiac.name.toLowerCase()}`}
            className="bg-[#f1f0ff] text-center rounded-xl p-4 border border-white shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center h-28"
          >
            <div className="text-3xl mb-2">{zodiac.emoji}</div>
            <span className="block text-sm sm:text-base font-semibold text-gray-800">
              {zodiac.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
