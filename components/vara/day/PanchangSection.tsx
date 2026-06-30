import { VaraDetail } from "@/lib/data/varaData";

type PanchangSectionProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function PanchangSection({ data, isHi }: PanchangSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? data.panchang.title.hi : data.panchang.title.en}
      </h2>
      <article className="rounded-xl border border-purple-200 bg-purple-50 p-6">
        <p className="text-gray-700 leading-7 font-semibold mb-4">
          {isHi ? data.panchang.description.hi : data.panchang.description.en}
        </p>
        <p className="text-gray-700 leading-7 mb-4">
          {isHi ? data.panchang.content.hi : data.panchang.content.en}
        </p>
        <p className="text-gray-700 leading-7">
          {isHi
            ? "वार, पंचांग के पांच अंगों (तिथि, नक्षत्र, योग, करण और वार) में से एक है। ये पांच अंग मिलकर समय की ऊर्जा का पूरा चक्र बनाते हैं।"
            : "Vara is one of the five limbs of the Panchang (Tithi, Nakshatra, Yoga, Karana, and Vara). Together, these five limbs form the complete cycle of the energy of time."}
        </p>
      </article>
    </section>
  );
}
