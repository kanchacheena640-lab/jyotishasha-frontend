import {
  getAnnualFaqs,
} from "@/app/data/annualFaqs";

type Props = {
  activityName: string;
  slug: string;
  year: number;
  locale: string;
};

export default function AnnualFAQ({
  activityName,
  slug,
  year,
  locale,
}: Props) {

  

  const faqs =
    getAnnualFaqs(
      slug,
      locale,
      year
    );

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold text-purple-200 mb-8">
        {locale === "hi"
          ? "अक्सर पूछे जाने वाले प्रश्न"
          : "Frequently Asked Questions"}
      </h2>

      <div className="space-y-4">

  {faqs.map(
    (
      faq: any,
      index: number
    ) => (

      <div
        key={index}
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
      >

        <h3 className="text-lg font-semibold text-white mb-3">
          {faq.q}
        </h3>

        <p className="text-gray-300 leading-7">
          {faq.a}
        </p>

      </div>

    )
  )}

      </div>

    </section>
  );
}