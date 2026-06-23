import Link from "next/link";

export default function TithiCard({
  tithi,
  isHi,
  locale,
}: {
  tithi: any;
  isHi: boolean;
  locale: string;
}) {
  return (
    <Link
      href={`${isHi ? "/hi" : ""}/panchang/tithi/${tithi.slug}`}
      className="block rounded-2xl border p-5 hover:scale-[1.02] transition-all"
      style={{
        borderColor: tithi.color,
      }}
    >
      <div className="text-4xl mb-3">
        {tithi.moonIcon}
      </div>

      <h3 className="text-xl font-bold">
        {isHi ? tithi.name_hi : tithi.name}
      </h3>

      <p className="text-sm text-gray-400 mt-2">
        {isHi ? tithi.nature_hi : tithi.nature}
      </p>

      <div
        className="inline-block mt-3 px-2 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: tithi.color,
        }}
      >
        {tithi.category}
      </div>

      <div className="mt-4 text-sm">
        <div className="font-medium">
          {isHi ? "देवता" : "Deity"}
        </div>

        <div className="text-gray-400">
          {isHi ? tithi.deity_hi : tithi.deity}
        </div>
      </div>

      <div className="mt-4 text-sm">
        <div className="font-medium">
          {isHi ? "शुभ कार्य" : "Best For"}
        </div>

        <div className="text-gray-400">
          {isHi
            ? tithi.bestFor_hi[0]
            : tithi.bestFor[0]}
        </div>
      </div>
    </Link>
  );
}