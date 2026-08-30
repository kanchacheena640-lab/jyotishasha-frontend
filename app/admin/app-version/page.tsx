// app/admin/app-version/page.tsx
'use client';

import AdminGuard from '@/components/AdminGuard';
import AppVersionPolicyPanel from '@/components/AppVersionPolicyPanel';

export default function AppVersionAdminPage() {
  return (
    <AdminGuard>
      <AppVersionPolicyPanel />
    </AdminGuard>
  );
}
