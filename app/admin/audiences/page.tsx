"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import AudiencesList from "@/components/admin/audiences/AudiencesList";
export default function Page() {
  return <AdminGuard><div className="p-4"><AdminNav /><AudiencesList /></div></AdminGuard>;
}
