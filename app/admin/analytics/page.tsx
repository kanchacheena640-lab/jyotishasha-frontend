"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import AnalyticsPageClient from "@/components/admin/analytics/AnalyticsPageClient";

export default function Page() {
  return (
    <AdminGuard>
      <div className="p-4">
        <AdminNav />
        <AnalyticsPageClient />
      </div>
    </AdminGuard>
  );
}
