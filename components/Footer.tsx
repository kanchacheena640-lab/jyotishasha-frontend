"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


export default function Footer() {
  const params = useParams();
  const currentLang = params?.locale === "hi" ? "hi" : "en";
  const langPath = currentLang === "hi" ? "/hi" : "";

  return (
    <footer className="bg-[#0f0c29] text-white pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Column 1: Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Jyotishasha</h2>
          <p className="text-gray-300 text-sm">
            Your trusted guide for Vedic Astrology insights & personalized reports.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li><Link href={`${langPath}/panchang`}>{currentLang === "hi" ? "पंचांग" : "Panchang"}</Link></li>
            <li><Link href={`${langPath}/ekadashi`}>{currentLang === "hi" ? "एकादशी" : "Ekadashi"}</Link></li>
            <li><Link href={`${langPath}/navratri`}>{currentLang === "hi" ? "नवरात्रि" : "Navratri"}</Link></li>
            <li><Link href={`${langPath}/rahu-kaal`}>{currentLang === "hi" ? "राहु काल" : "Rahu Kaal"}</Link></li>
            <li><Link href="/reports">Reports</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/astrology-methodology">Methodology</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-300 text-sm">
            Gomti Nagar, Lucknow, India <br /> Pin: 226010
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Email: <a href="mailto:support@jyotishasha.com" className="underline">support@jyotishasha.com</a>
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/AashaJyotish/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/jyotishasha108/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.youtube.com/@jyotishasha" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://x.com/SpiritualLifes1" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.858L1.254 2.25H8.08l4.258 5.627 5.906-5.627Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://in.pinterest.com/remedy999/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* 🔐 EEAT TRUST (Global – Footer Top) */}
      <div className="bg-[#0f0c29] border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <EEATTrustSnippet />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Jyotishasha. All Rights Reserved.</p>
        <div className="mt-2 text-gray-400 text-xs">
          Content Partner:{" "}
          <a
            href="https://www.astroblog.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            AstroBlog
          </a>{" "}
          — Your trusted source for astrology news, insights & educational articles.
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <img src="/payments/razorpay.png" alt="Razorpay" className="h-6 w-auto" />
          <img src="/payments/upi.png" alt="UPI" className="h-10 w-auto" />
        </div>
      </div>
    </footer>
  );
}
