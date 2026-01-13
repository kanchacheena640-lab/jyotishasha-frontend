import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";
import AdminAwareLayout from "../components/AdminAwareLayout";
import "react-datepicker/dist/react-datepicker.css";
import { LanguageProvider } from "@/context/LanguageContext"; // 🆕 added
import StickyAppDownloadCTA from "@/components/StickyAppDownloadCTA";



export const metadata = {
  title: "Jyotishasha",
  description: "Astrology Reports and Tools",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=GTM-WLP7T2DP'+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WLP7T2DP');
            `,
          }}
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

        {/* Load Google Maps once for the whole app */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`}
          strategy="afterInteractive"
        />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <LanguageProvider>
          <AdminAwareLayout>{children}</AdminAwareLayout>
        </LanguageProvider>

        {/* 🔽 STICKY APP DOWNLOAD CTA (MOBILE ONLY) */}
        <StickyAppDownloadCTA
          utm={{
            source: "site_global",
            medium: "sticky_cta",
            campaign: "app_download",
          }}
        />

                {/* WhatsApp floating button */}

        <a
          href="https://wa.me/917007012255"
          target="_blank"
          rel="noopener noreferrer"
          className="
            fixed right-4 z-50
            bottom-[88px] md:bottom-4
            bg-green-500 hover:bg-green-600
            text-white px-4 py-3 rounded-full
            shadow-lg flex items-center gap-2 transition-all
          "
        >
          <i className="fab fa-whatsapp text-xl"></i>
          Chat with us
        </a>
      </body>
    </html>
  );
}
