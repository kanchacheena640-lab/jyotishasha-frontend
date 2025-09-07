// app/dashboard/page.tsx

"use client";

import React from "react";
import SubscriptionBadge from "@/components/SubscriptionBadge";
import { useSubscriptionInfo } from "@/hooks/useSubscriptionInfo";
import UpgradeButton from "@/components/UpgradeButton";


export default function DashboardPage() {
  const { data, isLoading, isError, refresh } = useSubscriptionInfo();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Hello, Ravi Shastri</h1>

      {/* Subscription Status */}
      <div className="mb-6">
        {isLoading && (
          <p className="text-sm text-gray-400">Loading subscription...</p>
        )}

        {isError && (
          <div className="text-sm text-red-500">
            Failed to load subscription.{" "}
            <button
              onClick={() => refresh()}
              className="underline text-blue-600"
            >
              Retry
            </button>
          </div>
        )}

        {data && (
          <SubscriptionBadge
            status={data.status}
            plan={data.plan}
            expires_at={data.end_at}
            days_left={data.days_left}
            renews={data.renews}
          />
        )}
        {!data?.is_active && (
        <UpgradeButton />
        )}
      </div>

      {/* 🚧 Other dashboard sections will go here */}
      <div className="text-gray-600 text-sm">More features coming soon...</div>
    </div>
  );
}
