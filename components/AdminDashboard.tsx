// components/AdminDashboard.tsx

"use client";

import AdminGuard from "./AdminGuard";
import OrderList from "./OrderList"; // ✅ Table code goes here (replace with your real file)

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">🧾 Admin Order Panel</h1>
        <OrderList />
      </div>
    </AdminGuard>
  );
}
