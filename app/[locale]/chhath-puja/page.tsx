import type { Metadata } from "next";
import Link from "next/link";
import ChhathClient from "./ChhathClient";
import type { ChhathLanguage } from "@/lib/chhath/api";
import {
  CHHATH_HERO,
  CHHATH_RELATED_LINKS,
  CHHATH_SECTIONS,
  CHHATH_UI,
  fill,
} from "@/lib/chhath/content";
import { resolveInitialChhath } from "@/lib/chhath/resolveYear";
import {
  buildChhathArticleSchema,
  buildChhathBreadcrumbSchema,
  buildChhathFaqSchema,
  buildChhathFaqs,
  chhathAlternates,
  chhathCanonical,
  chhathDescription,
  chhathTitle,
} from "@/lib/chhath/seo";
import { DEFAULT_OG_IMAGE, toISTDatePublished } from "@/lib/seo/articleSchema";

// Shorter than other festival pages (86400): if the Chhath API is
// unreachable at build/revalidation time the page renders its retry state,
// and should pick up real data again within the hour.
export const revalidate = 3600;

type Props = { params: { locale?: string } };

function langOf(locale?: string): ChhathLanguage {
  return locale === "hi" ? "hi" : "en";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = langOf(params?.locale);
  const { year } = await resolveInitialChhath(lang);
  const title = chhathTitle(lang, year);
  const description = chhathDescription(lang, year);
  return {
    title,
    description,
    alternates: chhathAlternates(lang),
    openGraph: {
      title,
      description,
      url: chhathCanonical(lang),
      type: "article",
      siteName: "Jyotishasha",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
    robots: { index: true, follow: true },
  };
}

export default async function ChhathPujaPage({ params }: Props) {
  const lang = langOf(params?.locale);
  const t = (copy: Record<ChhathLanguage, string>) => copy[lang];
  const prefix = lang === "hi" ? "/hi" : "";

  const { year, data } = await resolveInitialChhath(lang);
  const faqs = buildChhathFaqs(lang, year, data);

  const schemas = [
    buildChhathArticleSchema(lang, year, toISTDatePublished()),
    buildChhathBreadcrumbSchema(lang),
    buildChhathFaqSchema(lang, faqs),
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-[#2B2B2B]">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 md:pt-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href={prefix || "/"} className="hover:text-[#7A1C1C]">
                {lang === "hi" ? "होम" : "Home"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`${prefix}/vrat-tyohar`} className="hover:text-[#7A1C1C]">
                {lang === "hi" ? "व्रत और त्योहार" : "Vrat & Tyohar"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#7A1C1C] font-medium">{lang === "hi" ? "छठ पूजा" : "Chhath Puja"}</li>
          </ol>
        </nav>

        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#7A1C1C]">
            {fill(t(CHHATH_HERO.h1), { year })}
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">{t(CHHATH_HERO.intro)}</p>
        </header>

        <ChhathClient lang={lang} initialYear={year} initialData={data} />
      </div>

      <article className="max-w-4xl mx-auto px-4 pb-6">
        {CHHATH_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="mb-10">
            <h2 className="text-2xl font-bold text-[#7A1C1C] mb-4">{t(section.title)}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-gray-700">
                {t(p)}
              </p>
            ))}
          </section>
        ))}
      </article>

      <section className="max-w-4xl mx-auto px-4 pb-10" aria-labelledby="chhath-faq-title">
        <h2 id="chhath-faq-title" className="text-2xl font-bold text-[#7A1C1C] mb-6">
          {t(CHHATH_UI.faqTitle)}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-orange-100 bg-white px-5 py-4" open={i === 0}>
              <summary className="cursor-pointer list-none font-semibold text-[#2B2B2B]">{faq.q}</summary>
              <p className="mt-3 leading-relaxed text-gray-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="max-w-4xl mx-auto px-4 pb-24" aria-label={t(CHHATH_UI.relatedTitle)}>
        <h2 className="text-lg font-semibold text-[#7A1C1C] mb-3">{t(CHHATH_UI.relatedTitle)}</h2>
        <ul className="flex flex-wrap gap-3">
          {CHHATH_RELATED_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`${prefix}${link.href}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-[#7A1C1C]/30 bg-white px-4 text-sm font-medium text-[#7A1C1C] hover:bg-[#FDE8D7]"
              >
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
