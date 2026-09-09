"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import HistoryList from "@/components/admin/notifications/HistoryList";
export default function Page() {
  return <AdminGuard><div className="p-4"><AdminNav /><HistoryList /></div></AdminGuard>;
}
