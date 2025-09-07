'use client';

import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white">🎉 Payment Successful!</h1>

      {/* Subtext */}
      <p className="mt-3 text-lg text-gray-200">
        Thank you. Your report is being prepared.
      </p>

      {/* WhatsApp Help */}
      <p className="mt-2 text-sm">
        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          className="text-cyan-300 hover:opacity-90 underline"
        >
          Need help? Chat with us on WhatsApp
        </a>
      </p>

      {/* Single CTA */}
      <div className="mt-8">
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-md bg-cyan-300/10 px-5 py-3 text-cyan-300 border border-cyan-300/40 hover:opacity-90"
        >
          More Reports →
        </Link>
      </div>
    </div>
  );
}
