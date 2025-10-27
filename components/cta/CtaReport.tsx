import Link from "next/link";

export default function CtaReport() {
  return (
    <Link
      href="/reports"
      className="block my-6 p-4 text-center rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      📘 Get Your Personalized Astrology Report – Only ₹49
    </Link>
  );
}
