import {
  getAnnualMuhuratContent,
  type AnnualMuhuratSlug,
} from "@/app/data/annual_muhurat_content";

type Props = {
  slug: string;
  locale: string;
  year: number;
};

type MuhuratSlug =
  AnnualMuhuratSlug;

export default function AnnualSEOContent({
  slug,
  locale,
  year,
}: Props) {

  const annualMuhuratContent =
    getAnnualMuhuratContent(year);

  const content =
    annualMuhuratContent[
      slug as AnnualMuhuratSlug
    ]?.[
          locale === "hi"
          ? "hi"
          : "en"
      ];

  if (!content) {
    return null;
  }

    return (
    <section className="mt-20">

        <div className="max-w-none">

        <h2 className="text-3xl font-bold text-purple-200 mb-8">
            {locale === "hi"
            ? `${year} ${content.sections[0]?.title}`
            : `${content.sections[0]?.title} ${year}`}
        </h2>

        {content.intro && (

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">

            <p className="text-gray-300 leading-8">
                {content.intro}
            </p>

            </div>

        )}

        {content.sections.map(
            (
            section: any,
            index: number
            ) => (

            <div
                key={index}
                className="mb-10"
            >

                <h3 className="text-2xl font-semibold text-white mb-4">
                {section.title}
                </h3>

                <p className="text-gray-300 leading-8">
                {section.content}
                </p>

            </div>

            )
        )}

        </div>

    </section>
    );
}