import type { Metadata } from "next";

// The login page itself is a client component ('use client'), which can't
// export metadata directly -- this dedicated layout carries the noindex
// signal instead. Real, functioning private utility (gate for the internal
// admin/order-management dashboard), just not meant to be public search
// content. Login behavior itself is untouched -- this file has no logic.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
