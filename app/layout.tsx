import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jyotishasha.com"),
  title: "Jyotishasha",
  description: "Astrology Reports and Tools",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    siteName: "Jyotishasha",
    images: [
      {
        url: "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg",
        width: 1730,
        height: 909,
        alt: "Jyotishasha – Free Kundali, Panchang & Muhurat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLP7T2DP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Google Maps and Razorpay are no longer loaded globally here.
            Maps is loaded on demand by components/PlaceAutocompleteInput.tsx
            (only on the routes that actually render a place-of-birth field).
            Razorpay is loaded on demand by hooks/useReportPurchase.ts (only
            when a purchase is actually initiated). Previously both scripts
            executed on every page regardless of need. */}

        {children}
        {/* Google AdSense — lazyOnload keeps it out of the critical path */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2039377363616016"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}