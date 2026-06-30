import { VaraDetail } from "@/lib/data/varaData";

type WeekdayFAQProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function WeekdayFAQ({ data, isHi }: WeekdayFAQProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "सामान्य प्रश्न" : "Frequently Asked Questions"}
      </h2>
      <div className="space-y-6">
        {data.faq.map((faq, index) => (
          <article key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">
              {isHi ? faq.question.hi : faq.question.en}
            </h3>
            <p className="text-gray-300 leading-7">
              {isHi ? faq.answer.hi : faq.answer.en}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
