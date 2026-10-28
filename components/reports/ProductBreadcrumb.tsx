import Link from "next/link";
import { SITE_URL } from "@/lib/seo/articleSchema";
import { serializeJsonLd } from "@/lib/reportProductSeo";

export interface BreadcrumbItem {
  name: string;
  /** Site-relative path ("" = English home). Every item must be a real, canonical page. */
  path: string;
}

/** Visible breadcrumb trail + its BreadcrumbList JSON-LD, rendered from ONE item
 * list so the markup can never describe navigation readers don't see. The last
 * item is the current page (not a link). */
export default function ProductBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto mb-4 text-xs md:text-sm text-slate-400">
        <ol className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-slate-300">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.path || "/"} className="hover:text-white hover:underline">{item.name}</Link>
                    <span aria-hidden="true" className="text-slate-600">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
