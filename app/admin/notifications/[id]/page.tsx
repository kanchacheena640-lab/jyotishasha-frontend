"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import CampaignComposer from "@/components/admin/notifications/CampaignComposer";
export default function Page({ params }: { params: { id: string } }) {
  return <AdminGuard><div className="p-4"><AdminNav /><CampaignComposer key={params.id} id={params.id} /></div></AdminGuard>;
}
