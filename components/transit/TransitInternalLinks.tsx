import Link from "next/link";

export default function TransitInternalLinks({
  planetName,
  planetSlug,
  ascendant,
  currentHouse,
  lang,
}: {
  planetName: string;
  planetSlug: string;
  ascendant: string;
  currentHouse: number;
  lang: "en" | "hi";
}) {
  const isHi = lang === "hi";

  const otherHouses = Array.from({ length: 12 }, (_, i) => i + 1).filter(
    (h) => h !== currentHouse
  );

  const ascTitle =
    ascendant.charAt(0).toUpperCase() + ascendant.slice(1);

  return (
    <section className="mt-12 border-t pt-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <Link href={`/${isHi ? "hi/" : ""}${planetSlug}`} className="hover:underline">
          {planetName} Transit
        </Link>
        {" › "}
        <Link
          href={`/${isHi ? "hi/" : ""}${planetSlug}/${ascendant}`}
          className="hover:underline"
        >
          {isHi ? `${ascTitle} लग्न` : `${ascTitle} Ascendant`}
        </Link>
        {" › "}
        {isHi ? `भाव ${currentHouse}` : `House ${currentHouse}`}
      </div>

      {/* Ascendant hub link */}
      <Link
        href={`/${isHi ? "hi/" : ""}${planetSlug}/${ascendant}`}
        className="block font-semibold text-blue-700 hover:underline"
      >
        {isHi
          ? `${ascTitle} लग्न के लिए सभी ${planetName} गोचर देखें →`
          : `View all ${planetName} transit effects for ${ascTitle} Ascendant →`}
      </Link>

      {/* Sibling houses */}
      <div>
        <h3 className="font-semibold mb-3">
          {isHi
            ? `${ascTitle} लग्न के लिए अन्य ${planetName} गोचर भाव`
            : `Other ${planetName} Transit Houses for ${ascTitle} Ascendant`}
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm">
          {otherHouses.map((h) => (
            <Link
              key={h}
              href={`/${isHi ? "hi/" : ""}${planetSlug}/${ascendant}/house-${h}`}
              className="text-blue-700 hover:underline"
            >
              {isHi ? `भाव ${h}` : `House ${h}`}
            </Link>
          ))}
        </div>
      </div>

      {/* Planet hub */}
      <p className="text-sm text-gray-600">
        {isHi ? (
          <>
            सभी लग्न और भाव के लिए{" "}
            <Link
              href={`/${isHi ? "hi/" : ""}${planetSlug}`}
              className="underline"
            >
              {planetName} गोचर
            </Link>{" "}
            के प्रभाव देखें।
          </>
        ) : (
          <>
            Explore complete{" "}
            <Link
              href={`/${isHi ? "hi/" : ""}${planetSlug}`}
              className="underline"
            >
              {planetName} Transit
            </Link>{" "}
            effects for all ascendants and houses.
          </>
        )}
      </p>
    </section>
  );
}