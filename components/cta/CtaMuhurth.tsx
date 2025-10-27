import Link from "next/link";

export default function CtaMuhurth({ slug }: { slug: string }) {
  const label = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <Link
      href={`/panchang/tools/${slug}`}
      className="block my-6 p-4 text-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      🪔 Check Your {label} Muhurat Dates
    </Link>
  );
}
