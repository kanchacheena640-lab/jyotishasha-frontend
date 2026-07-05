import { notFound } from "next/navigation";
import Link from "next/link";

import { tithiData } from "@/app/data/tithiData";
import { tithiSeoContent } from "@/app/data/tithiSeoContent";
import TithiFaq from "@/components/tithi/TithiFaq";
import TithiBreadcrumb from "@/components/tithi/TithiBreadcrumb";
import TithiDetailSchema from "@/components/tithi/TithiDetailSchema";

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateStaticParams() {
  const locales = ["en", "hi"];

  return locales.flatMap((locale) =>
    tithiData.map((tithi) => ({
      locale,
      slug: tithi.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: Props) {
  const seo =
    tithiSeoContent[
      params.slug as keyof typeof tithiSeoContent
    ];

  if (!seo) return {};

  const isHi = params.locale === "hi";

  const canonical = isHi
    ? `https://www.jyotishasha.com/hi/panchang/tithi/${params.slug}`
    : `https://www.jyotishasha.com/panchang/tithi/${params.slug}`;

  const enUrl = `https://www.jyotishasha.com/panchang/tithi/${params.slug}`;
  const hiUrl = `https://www.jyotishasha.com/hi/panchang/tithi/${params.slug}`;

  return {
    title: isHi ? seo.meta_title_hi : seo.meta_title,

    description: isHi
      ? seo.meta_description_hi
      : seo.meta_description,

    alternates: {
      canonical,
      languages: {
        en: enUrl,
        hi: hiUrl,
      },
    },

    openGraph: {
        title: isHi ? seo.meta_title_hi : seo.meta_title,
        description: isHi
            ? seo.meta_description_hi
            : seo.meta_description,
        url: canonical,
        siteName: "Jyotishasha",
        locale: isHi ? "hi_IN" : "en_US",
        type: "article",
        images: [
            {
            url: "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg",
            width: 1730,
            height: 909,
            alt: "Jyotishasha",
            },
        ],
        },

        twitter: {
        card: "summary_large_image",
        title: isHi ? seo.meta_title_hi : seo.meta_title,
        description: isHi
            ? seo.meta_description_hi
            : seo.meta_description,
        images: [
            "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg",
        ],
        },
  };
}

export default function TithiDetailPage({
  params,
}: Props) {

  const isHi = params.locale === "hi";

  const tithi = tithiData.find(
    (t) => t.slug === params.slug
  );

  const seo =
    tithiSeoContent[
      params.slug as keyof typeof tithiSeoContent
    ];

  if (!tithi || !seo) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
    <TithiDetailSchema
        locale={params.locale}
        slug={params.slug}
        title={isHi ? seo.title_hi : seo.title}
        description={
            isHi
            ? seo.meta_description_hi
            : seo.meta_description
        }
        faq={seo.faq}
     />

    <TithiBreadcrumb
        locale={params.locale}
        title={isHi ? seo.title_hi : seo.title}
    />

      <h1 className="text-4xl font-bold mb-6">
        {isHi ? seo.title_hi : seo.title}
      </h1>

      <div className="mt-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold mb-3">
            {isHi ? "अर्थ" : "Meaning"}
          </h2>

          <p>{isHi ? seo.meaning_hi : seo.meaning}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            {isHi ? "महत्व" : "Significance"}
          </h2>

          <p>{isHi ? seo.significance_hi : seo.significance}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            {isHi ? "शुभ कार्य" : "Best Activities"}
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            {(isHi
              ? seo.bestActivities_hi
              : seo.bestActivities).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            {isHi ? "किन कार्यों से बचें" : "Avoid Activities"}
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            {(isHi
              ? seo.avoidActivities_hi
              : seo.avoidActivities).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            {isHi ? "मुहूर्त में महत्व" : "Importance in Muhurat"}
          </h2>

          <p>
            {isHi
              ? seo.muhuratRole_hi
              : seo.muhuratRole}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            {isHi ? "प्रमुख पर्व" : "Major Festivals"}
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            {(isHi
              ? seo.majorFestivals_hi
              : seo.majorFestivals).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <TithiFaq
          locale={params.locale}
          faq={seo.faq}
        />

    <section className="mt-14">
        <h2 className="text-2xl font-bold mb-6">
            {isHi ? "संबंधित तिथियाँ" : "Related Tithis"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {seo.related.map((slug: string) => {
            const item = tithiData.find((t) => t.slug === slug);

            if (!item) return null;

            return (
                <Link
                key={slug}
                href={`/${params.locale}/panchang/tithi/${slug}`}
                className="border rounded-xl p-4 hover:border-orange-500 transition"
                >
                <h3 className="font-semibold">
                    {isHi ? item.name_hi : item.name}
                </h3>
                </Link>
            );
            })}

        </div>
        </section>

      </div>

    </main>
  );
}