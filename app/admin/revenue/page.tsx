"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import RevenuePageClient from "@/components/admin/revenue/RevenuePageClient";

export default function Page() {
  return (
    <AdminGuard>
      <div className="p-4">
        <AdminNav />
        <RevenuePageClient />
      </div>
    </AdminGuard>
  );
}
