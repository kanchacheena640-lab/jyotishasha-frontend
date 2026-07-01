import Link from "next/link";

type Props = {
  slug: string;
  locale: string;
  year: number;
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export default function AnnualMonthLinks({
  slug,
  locale,
  year,
}: Props) {

  return (
    <section className="mt-16">

      <h2 className="text-2xl font-bold mb-6">
        Explore Monthly Muhurat
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {months.map((month) => (

          <Link
            key={month}
            href={`${locale === "hi" ? "/hi" : ""}/panchang/muhurat/${slug}/${month}`}
            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
          >
            <div className="capitalize">
              {month}
            </div>

            <div className="text-xs text-gray-400">
              {year}
            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}