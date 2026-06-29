type YogaData = {
  name: string;
  name_hi: string;
  description: string;
  description_hi: string;
};

type TodayYogaProps = {
  isHi: boolean;
  yoga: YogaData | null | undefined;
};

export default function TodayYoga({
  isHi,
  yoga,
}: TodayYogaProps) {
  if (!yoga) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज का योग" : "Today's Yoga"}
        </h2>
      </header>

      <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
        <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
          {isHi ? "योग का नाम" : "Yoga Name"}
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {isHi ? yoga.name_hi : yoga.name}
        </p>

        <p className="mt-4 text-gray-700 leading-7">
          {isHi ? yoga.description_hi : yoga.description}
        </p>
      </article>
    </section>
  );
}
