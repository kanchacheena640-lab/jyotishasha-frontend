// Marriage Path page body (/tools/marriage-path and /hi/tools/marriage-path) -- a SERVER component.
// Breadcrumb, H1, introduction, the educational sections, the visible FAQ and the JSON-LD are all in the initial
// HTML. Only <ToolDynamicPage> (calculator + personal result) is a client island, so the prerendered page holds no
// personal data. Content: app/data/toolContent/marriagePath.ts. Same editorial pattern as Mangal Dosh / Rashi Finder.
import Link from 'next/link';
import ToolDynamicPage from '@/app/[locale]/tools/[toolId]/ToolDynamicPage';
import { marriagePathContent } from '@/app/data/toolContent/marriagePath';
import { SITE_URL } from '@/lib/seo/articleSchema';

const tokens = {
  card: 'rounded-2xl border border-[#E8DDC9] bg-white p-5 shadow-[0_1px_2px_rgba(27,42,74,0.06)] sm:p-6',
  h2: 'text-[22px] font-bold leading-tight tracking-tight text-[#1B2A4A] md:text-[26px] [text-wrap:balance]',
  body: 'text-[16px] leading-7 text-[#45516A]',
  link: 'inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-sm',
};

type Section = { id: string; h2: string; body: string[]; links?: { href: string; label: string }[] };

export default function MarriagePathLanding({ locale }: { locale: 'en' | 'hi' }) {
  const isHi = locale === 'hi';
  const lp = isHi ? '/hi' : '';
  const c = marriagePathContent[locale];
  const L = c.landing;
  const pageUrl = `${SITE_URL}${lp}/tools/marriage-path`;

  const crumbs = [
    { name: L.breadcrumb.home, href: lp || '/', item: isHi ? `${SITE_URL}/hi` : `${SITE_URL}/` },
    { name: L.breadcrumb.tools, href: `${lp}/tools`, item: `${SITE_URL}${lp}/tools` },
    { name: L.breadcrumb.current, href: `${lp}/tools/marriage-path`, item: pageUrl },
  ];
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((cr, i) => ({ '@type': 'ListItem', position: i + 1, name: cr.name, item: cr.item })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: L.h1,
      description: c.seo.description,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Any',
      inLanguage: isHi ? 'hi' : 'en',
      url: pageUrl,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
  ];

  return (
    <div lang={isHi ? 'hi' : undefined} className="bg-[#FBF8F2] text-[#45516A]">
      <div className="mx-auto max-w-5xl px-4 pt-6 md:px-6">
        <nav aria-label={isHi ? 'ब्रेडक्रम्ब' : 'Breadcrumb'}>
          <ol className="flex flex-wrap items-center gap-x-1 text-[14px] text-[#5B667D]">
            {crumbs.map((cr, i) => (
              <li key={cr.href} className="flex items-center">
                {i < crumbs.length - 1 ? (
                  <>
                    <Link href={cr.href} className="inline-flex min-h-[44px] items-center px-1 text-[#A8461F] hover:underline">{cr.name}</Link>
                    <span aria-hidden="true" className="px-1">›</span>
                  </>
                ) : (
                  <span aria-current="page" className="px-1 text-[#1B2A4A]">{cr.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-1 text-[32px] font-bold leading-tight tracking-tight text-[#1B2A4A] md:text-[42px] [text-wrap:balance]">{L.h1}</h1>
        <p className={`mt-3 max-w-3xl ${tokens.body} md:text-[17px] md:leading-8`}>{L.intro}</p>
        <p className="mt-2 text-[14px] text-[#5B667D]">{L.method}</p>
      </div>

      {/* Calculator + personal result (client island; inputs, API and analytics unchanged). */}
      <div className="mx-auto mt-6 max-w-5xl px-4 md:px-6">
        <ToolDynamicPage submitLabel={L.submitLabel} />
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-16 pt-10 md:px-6">
        <section aria-labelledby="mp-shows" className={tokens.card}>
          <h2 id="mp-shows" className={tokens.h2}>{L.shows.h2}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {L.shows.items.map((it) => (
              <li key={it.title} className="rounded-xl border border-[#EFE7D8] bg-[#FBF8F2] p-4">
                <h3 className="text-[17px] font-bold text-[#1B2A4A]">{it.title}</h3>
                <p className="mt-1 text-[15px] leading-6 text-[#45516A]">{it.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {(L.sections as Section[]).map((s) => (
          <section key={s.id} aria-labelledby={s.id} className={tokens.card}>
            <h2 id={s.id} className={tokens.h2}>{s.h2}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p) => <p key={p.slice(0, 24)} className={tokens.body}>{p}</p>)}
            </div>
            {s.links && (
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                {s.links.map((l) => <li key={l.href}><Link href={`${lp}${l.href}`} className={tokens.link}>{l.label}</Link></li>)}
              </ul>
            )}
          </section>
        ))}

        <section aria-labelledby="mp-faq" className={tokens.card}>
          <h2 id="mp-faq" className={tokens.h2}>{L.faqH2}</h2>
          <div className="mt-3 divide-y divide-[#EFE7D8]">
            {c.faq.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 py-2 text-[16px] font-semibold text-[#1B2A4A]">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="text-[#A8461F] transition group-open:rotate-45">+</span>
                </summary>
                <p className={`pb-3 ${tokens.body}`}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="mp-related">
          <h2 id="mp-related" className={tokens.h2}>{L.related.h2}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {L.related.links.map((r) => (
              <li key={r.href}>
                <Link href={`${lp}${r.href}`} className="flex min-h-[44px] flex-col rounded-xl border border-[#E8DDC9] bg-white px-4 py-3 hover:border-[#A8461F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]">
                  <span className="text-[16px] font-bold text-[#1B2A4A]">{r.label}</span>
                  <span className="text-[14px] text-[#45516A]">{r.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {schemas.map((s) => (
        <script key={s['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </div>
  );
}
