// app/admin/page.tsx
'use client';

import AdminGuard from '@/components/AdminGuard';
import OrderList from '@/components/OrderList';

export default function AdminPage() {
  return (
    <AdminGuard>
      <OrderList />
    </AdminGuard>
  );
}
