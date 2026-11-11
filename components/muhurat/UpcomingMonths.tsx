import Link from "next/link";
import { istToday, localizedMonthName } from "@/lib/muhuratSeo";

const allMonths = [
  "january","february","march","april",
  "may","june","july","august",
  "september","october","november","december"
];

export default function UpcomingMonths({
  locale,
  slug,
  title,
}:{
  locale:string;
  slug:string;
  title:string;
}) {

  // Computed per render (Asia/Kolkata), not at module load, so a long-lived server
  // instance never keeps highlighting a previous month.
  const today = istToday();
  const currentMonthSlug = allMonths[today.month - 1];
  const currentIndex = today.month - 1;
  const months = [
    ...allMonths.slice(currentIndex),
    ...allMonths.slice(0, currentIndex),
  ];
  const currentYear = today.year;
  const nextYear = currentYear + 1;

  return (
    <>
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-purple-200">
      {title}{" "}
      {locale === "hi"
        ? `${currentYear}-${nextYear} माहवार`
        : `${currentYear}-${nextYear} Month Wise`}
    </h2>

    <p className="text-sm text-gray-400 mt-2">
      {locale === "hi"
        ? "आने वाले महीनों के शुभ मुहूर्त देखें।"
        : "Explore auspicious Muhurat dates month by month."}
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">

    {months.map((month) => {

      const isCurrent =
        month === currentMonthSlug;

      return (
        <Link
          key={month}
          href={`${locale === "hi" ? "/hi" : ""}/panchang/muhurat/${slug}/${month}`}
          className={`rounded-xl p-3 hover:bg-white/5 transition-all
          ${
            isCurrent
              ? "border-2 border-yellow-400 bg-yellow-400/10"
              : "border border-white/10"
          }`}
        >
          <div className="font-medium">
            {localizedMonthName(allMonths.indexOf(month) + 1, locale === "hi")}
          </div>

          {isCurrent && (
            <div className="mt-1 text-xs font-bold text-yellow-300">
              {locale === "hi"
                ? "वर्तमान माह"
                : "Current Month"}
            </div>
          )}
        </Link>
      );
    })}

  </div>
</>
  );
}