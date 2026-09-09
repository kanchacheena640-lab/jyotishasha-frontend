// app/admin/layout.tsx
//
// Admin Visual Foundation -- the shared shell for the entire /admin/*
// area (Orders, App Version, Users, Users detail, and Login, since
// Next.js layouts nest to every route under this segment).
//
// The public site's root body style (app/globals.css: a dark purple
// gradient, `text-white`) was bleeding into every /admin page, because
// /admin/* sits outside the app/[locale] tree and so never passes
// through components/AdminAwareLayout.tsx's own (already-dead-code, see
// that file's own comment) admin branch -- only this root `app/layout.tsx`
// wraps it. This layout overrides that inherited background/text color
// for the whole /admin subtree with one small wrapper, rather than
// patching every individual page's own markup.
//
// Deliberately minimal: only a background/text-color/font reset, no
// padding or max-width container -- app/admin/login/page.tsx already
// has its own full-screen centered-card layout that must not be
// constrained by a parent max-width/padding wrapper, and every other
// admin page already manages its own padding. Navigation (AdminNav) is
// NOT rendered here either -- it stays page-by-page (only authenticated
// pages render it), so the login page never shows nav links to pages it
// can't access yet.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {children}
    </div>
  );
}
