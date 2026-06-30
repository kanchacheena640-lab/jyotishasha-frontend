import { VaraDetail } from "@/lib/data/varaData";

type MuhuratSectionProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function MuhuratSection({ data, isHi }: MuhuratSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? data.muhurat.title.hi : data.muhurat.title.en}
      </h2>
      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <p className="text-gray-700 leading-7 font-semibold mb-4">
          {isHi ? data.muhurat.description.hi : data.muhurat.description.en}
        </p>
        <p className="text-gray-700 leading-7">
          {isHi ? data.muhurat.content.hi : data.muhurat.content.en}
        </p>
      </article>
    </section>
  );
}
