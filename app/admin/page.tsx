// app/admin/page.tsx
'use client';

import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';
import OrderList from '@/components/OrderList';

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="mb-4">
        <Link href="/admin/app-version" className="text-blue-600 underline text-sm">
          App Version Policy →
        </Link>
      </div>
      <OrderList />
    </AdminGuard>
  );
}
