import { VaraDetail } from "@/lib/data/varaData";

type VratSectionProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function VratSection({ data, isHi }: VratSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "व्रत और परंपरा - " : "Vrat and Tradition - "}
        {isHi ? data.vrat.displayName.hi : data.vrat.displayName.en}
      </h2>
      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <p className="text-gray-700 leading-7 font-medium mb-4">
          {isHi ? data.vrat.overview.hi : data.vrat.overview.en}
        </p>
        <p className="text-gray-700 leading-7">
          {isHi
            ? "व्रत पालन की परंपराएं और विधि क्षेत्रीय मान्यताओं और पारिवारिक परंपराओं के अनुसार भिन्न हो सकती हैं। यह एक आध्यात्मिक अभ्यास है जिसे श्रद्धा के साथ किया जाना चाहिए।"
            : "The traditions and methods of observing Vrat may vary according to regional beliefs and family customs. This is a spiritual practice that should be performed with devotion and sincerity."}
        </p>
      </article>
    </section>
  );
}
