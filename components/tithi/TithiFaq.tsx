interface Props {
  locale: string;
  faq: {
    question: string;
    answer: string;
    question_hi: string;
    answer_hi: string;
  }[];
}

export default function TithiFaq({
  locale,
  faq,
}: Props) {
  const isHi = locale === "hi";

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-8">
        {isHi
          ? "अक्सर पूछे जाने वाले प्रश्न"
          : "Frequently Asked Questions"}
      </h2>

      <div className="space-y-4">

        {faq.map((item) => (
          <div
            key={isHi ? item.question_hi : item.question}
            className="border border-white/10 rounded-xl p-5"
          >
            <h3 className="font-semibold mb-2">
              {isHi ? item.question_hi : item.question}
            </h3>

            <p className="text-gray-300">
              {isHi ? item.answer_hi : item.answer}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}