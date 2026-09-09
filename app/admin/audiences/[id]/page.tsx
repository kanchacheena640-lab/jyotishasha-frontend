"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import AudienceDetail from "@/components/admin/audiences/AudienceDetail";
export default function Page({ params }: { params: { id: string } }) {
  return <AdminGuard><div className="p-4"><AdminNav /><AudienceDetail key={params.id} id={params.id} /></div></AdminGuard>;
}
