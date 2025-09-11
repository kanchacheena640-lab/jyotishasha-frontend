import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";
import AdminAwareLayout from "../components/AdminAwareLayout";
import "react-datepicker/dist/react-datepicker.css";

export const metadata = {
  title: "Jyotishasha",
  description: "Astrology Reports and Tools",
  icons: {
    icon: "/favicon.ico", // 👈 yahan tumhara favicon add ho gaya
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Load Google Maps once for the whole app */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`}
          strategy="afterInteractive"
        />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <AdminAwareLayout>{children}</AdminAwareLayout>

        <a
          href="https://wa.me/917007012255"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all"
        >
          <i className="fab fa-whatsapp text-xl"></i>
          Chat with us
        </a>
      </body>
    </html>
  );
}
