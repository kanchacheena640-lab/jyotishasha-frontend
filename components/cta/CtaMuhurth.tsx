import Link from "next/link";
import { MUHURAT_TOPIC_TO_TOOL } from "@/lib/panchangToolsMap";

export default function CtaMuhurth({ slug, isHi }: { slug: string; isHi?: boolean }) {
  const tool = MUHURAT_TOPIC_TO_TOOL[slug];

  // No legitimate Panchang Tool exists for this Muhurat topic (e.g.
  // property-purchase-muhurat) -- hide the CTA rather than link to an
  // unrelated tool or a 404.
  if (!tool) return null;

  const label = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <Link
      href={`${isHi ? "/hi" : ""}/panchang/tools/${tool}`}
      className="block my-6 p-4 text-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      🪔 Check Your {label} Muhurat Dates
    </Link>
  );
}
