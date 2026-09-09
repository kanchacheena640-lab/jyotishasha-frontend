// app/admin/users/page.tsx
'use client';

import AdminGuard from '@/components/AdminGuard';
import AdminNav from '@/components/admin/AdminNav';
import UsersPageClient from '@/components/admin/users/UsersPageClient';

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <div className="p-4">
        <AdminNav />
        <UsersPageClient />
      </div>
    </AdminGuard>
  );
}
