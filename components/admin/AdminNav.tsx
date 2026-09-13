"use client";

/**
 * Users Module U1 -- the minimum sensible admin navigation.
 *
 * The prior audit found no proper admin navigation system exists: each
 * /admin/* page is an island (app/admin/page.tsx's own single manual
 * <Link> to /admin/app-version was the entire "nav system" before this).
 * components/AdminAwareLayout.tsx's own admin-branch header/footer is
 * unreachable dead code for the real /admin/* routes (they live outside
 * the [locale] tree AdminAwareLayout is actually wired into), so this
 * does not touch that file or attempt to fix that separately -- it is
 * out of scope for U1 ("do not redesign the entire Admin Dashboard/
 * navigation system").
 *
 * Deliberately NOT a shared layout.tsx: each real admin page already
 * renders <AdminGuard> individually (the existing convention), so this
 * component is included the same way, page by page. This also means it
 * can never affect /admin/login (which doesn't render it), with zero
 * risk of an unauthenticated visitor seeing internal nav links.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

// Users Visual QA Fix #1: Users is now the first/primary destination in
// the nav, per the approved ordering (Users | Orders | App Version).
// Routes/hrefs are unchanged -- display order only.
const LINKS = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/audiences", label: "Audiences" },
  { href: "/admin/notifications", label: "Notifications" },
  { href: "/admin/notifications/history", label: "History" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin", label: "Orders" },
  { href: "/admin/app-version", label: "App Version" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1 border-b border-gray-200 pb-2">
      {LINKS.map((link) => {
        const isActive =
          link.href === "/admin" ? pathname === "/admin" :
          // N6 -- "/admin/notifications/history" is a prefix match of
          // "/admin/notifications" too; without this exclusion both
          // links would highlight simultaneously on the History page.
          link.href === "/admin/notifications" ? pathname?.startsWith(link.href) && !pathname?.startsWith("/admin/notifications/history") :
          pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
