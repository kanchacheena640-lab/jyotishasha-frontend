// app/admin/app-version/page.tsx
'use client';

import AdminGuard from '@/components/AdminGuard';
import AdminNav from '@/components/admin/AdminNav';
import AppVersionPolicyPanel from '@/components/AppVersionPolicyPanel';

export default function AppVersionAdminPage() {
  return (
    <AdminGuard>
      <div className="p-4">
        <AdminNav />
        <AppVersionPolicyPanel />
      </div>
    </AdminGuard>
  );
}
