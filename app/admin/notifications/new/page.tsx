"use client";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";
import CampaignComposer from "@/components/admin/notifications/CampaignComposer";
export default function Page() {
  return <AdminGuard><div className="p-4"><AdminNav /><CampaignComposer /></div></AdminGuard>;
}
