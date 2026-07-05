import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

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
      <head>
        {/* ✅ Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2039377363616016"
          crossOrigin="anonymous"
        />
      </head>
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

        {/* ✅ Google Maps & Razorpay */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`}
          strategy="afterInteractive"
        />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  );
}