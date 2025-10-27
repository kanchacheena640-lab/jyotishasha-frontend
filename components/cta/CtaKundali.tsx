import Link from "next/link";

export default function CtaKundali() {
  return (
    <Link
      href="/free-kundali"
      className="block my-6 p-4 text-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      🔮 Generate Your Free Kundali Now
    </Link>
  );
}
