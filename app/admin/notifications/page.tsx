"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import CampaignsList from "@/components/admin/notifications/CampaignsList";
export default function Page() {
  return <AdminGuard><div className="p-4"><AdminNav /><CampaignsList /></div></AdminGuard>;
}
