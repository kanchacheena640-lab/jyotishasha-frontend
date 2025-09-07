"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Layout from "./Layout";

export default function AdminAwareLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 bg-white border-b flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Jyotishasha
          </Link>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="p-4 text-center text-sm text-gray-500 border-t">
          © 2025 Jyotishasha. All rights reserved.
        </footer>
      </div>
    );
  }

  return <Layout>{children}</Layout>;
}

