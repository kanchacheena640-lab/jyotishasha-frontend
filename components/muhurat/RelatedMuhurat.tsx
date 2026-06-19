import Link from "next/link";

type Props = {
  locale: string;
  year: number;
};

export default function RelatedMuhurat({
  locale,
  year,
}: Props) {

  const items = [
    {
      title: "Marriage Muhurat",
      slug: "marriage-muhurat",
    },
    {
      title: "Grah Pravesh Muhurat",
      slug: "grah-pravesh-muhurat",
    },
    {
      title: "Vehicle Purchase Muhurat",
      slug: "vehicle-purchase-muhurat",
    },
    {
      title: "Property Purchase Muhurat",
      slug: "property-purchase-muhurat",
    },
  ];

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold text-purple-200 mb-8">
        {locale === "hi"
          ? "संबंधित मुहूर्त"
          : "Related Muhurat"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {items.map((item) => (

          <Link
            key={item.slug}
            href={`/${
              locale === "hi"
                ? "hi/"
                : ""
            }panchang/muhurat/${
              item.slug
            }/${year}`}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-6
              hover:border-purple-500
              hover:bg-purple-900/20
              transition
            "
          >

            <h3 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h3>

            <p className="text-gray-400">
              {locale === "hi"
                ? `${year} के शुभ मुहूर्त देखें`
                : `View auspicious dates for ${year}`}
            </p>

          </Link>

        ))}

      </div>

    </section>
  );
}