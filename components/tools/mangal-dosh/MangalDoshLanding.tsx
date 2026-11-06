// Mangal Dosh calculator page body (/tools/mangal-dosh and /hi/tools/mangal-dosh) -- a SERVER component.
// Everything here is in the initial HTML: breadcrumb, H1, introduction, the educational sections, the visible
// FAQ and the JSON-LD (FAQPage built from the same visible questions, BreadcrumbList matching the visible
// breadcrumb, WebApplication without ratings). Only <ToolDynamicPage> (calculator + result) is a client island.
// Content: app/data/toolContent/mangalDosh.ts. Ivory/navy editorial palette of the Marriage Hub.
import Link from 'next/link';
import ToolDynamicPage from '@/app/[locale]/tools/[toolId]/ToolDynamicPage';
import { mangalDoshContent } from '@/app/data/toolContent/mangalDosh';
import { SITE_URL } from '@/lib/seo/articleSchema';
import { ENGINE_MANGAL_DOSH_HOUSES, houseOrdinal, marsInHouseHref } from '@/lib/mangalDosh';

const tokens = {
  card: 'rounded-2xl border border-[#E8DDC9] bg-white p-5 shadow-[0_1px_2px_rgba(27,42,74,0.06)] sm:p-6',
  h2: 'text-[22px] font-bold leading-tight tracking-tight text-[#1B2A4A] md:text-[26px] [text-wrap:balance]',
  body: 'text-[16px] leading-7 text-[#45516A]',
  link: 'font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 rounded-sm',
};

export default function MangalDoshLanding({ locale }: { locale: 'en' | 'hi' }) {
  const isHi = locale === 'hi';
  const lp = isHi ? '/hi' : '';
  const c = mangalDoshContent[locale];
  const L = c.landing;
  const pageUrl = `${SITE_URL}${lp}/tools/mangal-dosh`;

  const crumbs = [
    { name: L.breadcrumb.home, href: lp || '/', item: isHi ? `${SITE_URL}/hi` : `${SITE_URL}/` },
    { name: L.breadcrumb.tools, href: `${lp}/tools`, item: `${SITE_URL}${lp}/tools` },
    { name: L.breadcrumb.current, href: `${lp}/tools/mangal-dosh`, item: pageUrl },
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

      {/* Calculator + result (client island; calculation, API and analytics unchanged). */}
      <div className="mx-auto mt-6 max-w-5xl px-4 md:px-6">
        <ToolDynamicPage submitLabel={L.submitLabel} />
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-16 pt-10 md:px-6">
        <section aria-labelledby="md-shows" className={tokens.card}>
          <h2 id="md-shows" className={tokens.h2}>{L.shows.h2}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {L.shows.items.map((it) => (
              <li key={it.title} className="rounded-xl border border-[#EFE7D8] bg-[#FBF8F2] p-4">
                <h3 className="text-[17px] font-bold text-[#1B2A4A]">{it.title}</h3>
                <p className="mt-1 text-[15px] leading-6 text-[#45516A]">{it.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="md-how" className={tokens.card}>
          <h2 id="md-how" className={tokens.h2}>{L.how.h2}</h2>
          <div className="mt-3 space-y-3">
            {L.how.body.map((p) => <p key={p.slice(0, 24)} className={tokens.body}>{p}</p>)}
          </div>
        </section>

        <section aria-labelledby="md-cancel" className={tokens.card}>
          <h2 id="md-cancel" className={tokens.h2}>{L.cancel.h2}</h2>
          <p className={`mt-3 ${tokens.body}`}>{L.cancel.intro}</p>
          <ol className="mt-3 space-y-3">
            {L.cancel.items.map((it, i) => (
              <li key={it.title} className="flex gap-3">
                <span aria-hidden="true" className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#1B2A4A] text-[14px] font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-[17px] font-bold text-[#1B2A4A]">{it.title}</h3>
                  <p className="text-[15px] leading-6 text-[#45516A]">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="mt-6 text-[18px] font-bold text-[#1B2A4A]">{L.cancel.grading.h3}</h3>
          <dl className="mt-2 divide-y divide-[#EFE7D8] rounded-xl border border-[#E8DDC9]">
            {L.cancel.grading.rows.map((r) => (
              <div key={r.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-[15px] font-bold text-[#1B2A4A]">{r.label}</dt>
                <dd className="text-[15px] leading-6 text-[#45516A]">{r.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="md-marriage" className={tokens.card}>
          <h2 id="md-marriage" className={tokens.h2}>{L.marriage.h2}</h2>
          <p className={`mt-3 ${tokens.body}`}>{L.marriage.body}</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            {L.marriage.links.map((l) => (
              <li key={l.href}><Link href={`${lp}${l.href}`} className={`inline-flex min-h-[44px] items-center ${tokens.link}`}>{l.label}</Link></li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="md-houses" className={tokens.card}>
          <h2 id="md-houses" className={tokens.h2}>{L.houses.h2}</h2>
          <p className={`mt-3 ${tokens.body}`}>{L.houses.body}</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
              const md = ENGINE_MANGAL_DOSH_HOUSES.includes(n);
              return (
                <li key={n}>
                  <Link href={marsInHouseHref(n, isHi)} className="flex min-h-[48px] items-center justify-between gap-3 rounded-xl border border-[#E8DDC9] bg-white px-4 py-2 hover:border-[#A8461F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]">
                    <span className="text-[15px] font-semibold text-[#1B2A4A]">{L.houses.label(houseOrdinal(n, isHi))}</span>
                    {md && <span className="flex-none rounded-md border border-[#E6C28A] bg-[#FDF3E3] px-2 py-0.5 text-[13px] font-semibold text-[#8A4B00]">{L.houses.tag}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="md-faq" className={tokens.card}>
          <h2 id="md-faq" className={tokens.h2}>{L.faqH2}</h2>
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

        {c.video?.youtubeUrl && (
          <section aria-labelledby="md-video" className={tokens.card}>
            <h2 id="md-video" className={tokens.h2}>{c.video.title}</h2>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-[#E8DDC9]">
              <iframe
                src={c.video.youtubeUrl.replace('watch?v=', 'embed/')}
                title={c.video.title}
                loading="lazy"
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section aria-labelledby="md-related">
          <h2 id="md-related" className={tokens.h2}>{L.related.h2}</h2>
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
