import { VaraDetail } from "@/lib/data/varaData";

type DeitySectionProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function DeitySection({ data, isHi }: DeitySectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "अधिष्ठाता देवता - " : "Presiding Deity - "}
        {isHi ? data.deity.displayName.hi : data.deity.displayName.en}
      </h2>
      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <p className="text-gray-700 leading-7">
          {isHi ? data.deity.shortDescription.hi : data.deity.shortDescription.en}
        </p>
        <p className="mt-4 text-gray-700 leading-7">
          {isHi
            ? `${data.basic.hindiName} के दिन ${data.deity.displayName.hi} की पूजा करना विशेष रूप से फलदायी माना जाता है। यह परंपरा भक्त को आध्यात्मिक सुरक्षा और सकारात्मकता प्रदान करती है।`
            : `Worshipping ${data.deity.displayName.en} on ${data.basic.englishName} is considered particularly fruitful. This traditional practice is believed to provide spiritual protection and positivity.`}
        </p>
      </article>
    </section>
  );
}
