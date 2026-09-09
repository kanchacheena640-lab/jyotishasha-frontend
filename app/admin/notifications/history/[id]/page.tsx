"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import CampaignMonitor from "@/components/admin/notifications/CampaignMonitor";
export default function Page({ params }: { params: { id: string } }) {
  return <AdminGuard><div className="p-4"><AdminNav /><CampaignMonitor key={params.id} campaignId={params.id} /></div></AdminGuard>;
}
