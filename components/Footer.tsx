"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
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
            <li><Link href="/reports">Reports</Link></li>
            <li><Link href="/contact">Contact</Link></li>
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
            <a href="https://www.facebook.com/AashaJyotish/" target="_blank"><i className="fab fa-facebook text-xl"></i></a>
            <a href="https://www.instagram.com/jyotishasha108/" target="_blank"><i className="fab fa-instagram text-xl"></i></a>
            <a href="https://www.youtube.com/@jyotishasha" target="_blank"><i className="fab fa-youtube text-xl"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Jyotishasha. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <img src="/payments/razorpay.png" alt="Razorpay" className="h-6 w-auto" />
          <img src="/payments/upi.png" alt="UPI" className="h-10 w-auto" />
        </div>
      </div>
    </footer>
  );
}
