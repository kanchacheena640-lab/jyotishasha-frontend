import Link from "next/link";

type Props = {
  slug: string;
  locale: string;
  year: number;
};

export default function OtherYears({
  slug,
  locale,
  year,
}: Props) {

  const years = [
    year - 1,
    year + 1,
    year + 2,
  ];

  return (
    <section className="mt-16">

      <h2 className="text-2xl font-bold text-purple-200 mb-6">
        {locale === "hi"
          ? "अन्य वर्ष देखें"
          : "Explore Other Years"}
      </h2>

      <div className="flex flex-wrap gap-4">

        {years.map((y) => (

          <Link
            key={y}
            href={
                locale === "hi"
                    ? `/hi/panchang/muhurat/${slug}/${y}`
                    : `/panchang/muhurat/${slug}/${y}`
                }
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:border-purple-500"
          >
            {y}
          </Link>

        ))}

      </div>

    </section>
  );
}