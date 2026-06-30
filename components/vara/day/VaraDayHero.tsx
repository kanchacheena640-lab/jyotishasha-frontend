import { VaraDetail } from "@/lib/data/varaData";

type VaraDayHeroProps = {
  data: VaraDetail;
  isHi: boolean;
};

function FeatureBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-purple-700 bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200">
      {text}
    </span>
  );
}

export default function VaraDayHero({ data, isHi }: VaraDayHeroProps) {
  return (
    <section className="rounded-2xl border border-purple-800 bg-purple-950 p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-white">
          {isHi ? data.hero.h1.hi : data.hero.h1.en}
        </h1>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <FeatureBadge text={isHi ? data.basic.hindiName : data.basic.englishName} />
        <FeatureBadge text={data.basic.sanskritName} />
        <FeatureBadge text={isHi ? data.planet.displayName.hi : data.planet.displayName.en} />
        <FeatureBadge text={isHi ? data.deity.displayName.hi : data.deity.displayName.en} />
        <FeatureBadge text={isHi ? data.vrat.displayName.hi : data.vrat.displayName.en} />
      </div>

      <p className="text-gray-300 leading-7">
        {isHi ? data.hero.description.hi : data.hero.description.en}
      </p>
    </section>
  );
}
