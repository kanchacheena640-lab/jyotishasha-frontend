import Link from "next/link";

export default function TransitInternalLinks({
  planetName,
  planetSlug,
  ascendant,
  currentHouse,
}: {
  planetName: string;     // Mercury
  planetSlug: string;     // mercury-transit
  ascendant: string;      // aries
  currentHouse: number;   // 2
}) {
  const otherHouses = Array.from({ length: 12 }, (_, i) => i + 1).filter(
    (h) => h !== currentHouse
  );

  const ascTitle =
    ascendant.charAt(0).toUpperCase() + ascendant.slice(1);

  return (
    <section className="mt-12 border-t pt-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <Link href={`/${planetSlug}`} className="hover:underline">
          {planetName} Transit
        </Link>
        {" › "}
        <Link
          href={`/${planetSlug}/${ascendant}`}
          className="hover:underline"
        >
          {ascTitle} Ascendant
        </Link>
        {" › "}House {currentHouse}
      </div>

      {/* Ascendant hub link */}
      <Link
        href={`/${planetSlug}/${ascendant}`}
        className="block font-semibold text-blue-700 hover:underline"
      >
        View all {planetName} transit effects for {ascTitle} Ascendant →
      </Link>

      {/* Sibling houses */}
      <div>
        <h3 className="font-semibold mb-3">
          Other {planetName} Transit Houses for {ascTitle} Ascendant
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm">
          {otherHouses.map((h) => (
            <Link
              key={h}
              href={`/${planetSlug}/${ascendant}/house-${h}`}
              className="text-blue-700 hover:underline"
            >
              House {h}
            </Link>
          ))}
        </div>
      </div>

      {/* Planet hub */}
      <p className="text-sm text-gray-600">
        Explore complete{" "}
        <Link href={`/${planetSlug}`} className="underline">
          {planetName} Transit
        </Link>{" "}
        effects for all ascendants and houses.
      </p>
    </section>
  );
}
