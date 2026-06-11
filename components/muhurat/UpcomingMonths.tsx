import Link from "next/link";

const currentMonthSlug =
  new Date()
    .toLocaleString("en-US", {
      month: "long",
    })
    .toLowerCase();
    
const allMonths = [
  "january","february","march","april",
  "may","june","july","august",
  "september","october","november","december"
];

const currentIndex =
  allMonths.indexOf(currentMonthSlug);

const months = [
  ...allMonths.slice(currentIndex),
  ...allMonths.slice(0, currentIndex),
];

const currentYear =
  new Date().getFullYear();

const nextYear =
  currentYear + 1;

export default function UpcomingMonths({
  locale,
  slug,
  title,
}:{
  locale:string;
  slug:string;
  title:string;
}) {

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
          href={`/${locale}/panchang/muhurat/${slug}/${month}`}
          className={`rounded-xl p-3 hover:bg-white/5 transition-all
          ${
            isCurrent
              ? "border-2 border-yellow-400 bg-yellow-400/10"
              : "border border-white/10"
          }`}
        >
          <div className="font-medium">
            {month.charAt(0).toUpperCase() + month.slice(1)}
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