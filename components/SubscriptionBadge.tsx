// components/SubscriptionBadge.tsx
import React from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

type Props = {
  status: "active" | "expired" | "none" | "pending";
  plan: string;
  expires_at: string;
  days_left: number;
  renews: boolean;
};

const getBadgeStyle = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-400";
    case "expired":
    case "none":
    default:
      return "bg-gray-100 text-gray-800 border-gray-400";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <FaCheckCircle className="inline mr-1" />;
    case "pending":
      return <FaClock className="inline mr-1" />;
    default:
      return <FaTimesCircle className="inline mr-1" />;
  }
};

export default function SubscriptionBadge({
  status,
  plan,
  expires_at,
  days_left,
  renews,
}: Props) {
  const badgeStyle = getBadgeStyle(status);
  const icon = getStatusIcon(status);

  let expiryDate = "";

    try {
    expiryDate = expires_at
        ? formatInTimeZone(expires_at, "Asia/Kolkata", "dd MMM yyyy")
        : "unknown";
    } catch {
    expiryDate = "invalid date";
    }

  return (
    <div className="flex flex-col items-start">
      <span
        className={`text-sm border px-3 py-1 rounded-full font-medium ${badgeStyle}`}
      >
        {icon}
        {status === "active"
          ? `Premium • Ends ${expiryDate}`
          : status === "pending"
          ? "Payment pending — complete checkout"
          : "Free Plan"}
      </span>
      {status !== "none" && (
        <span className="text-xs text-gray-500 mt-1 ml-1">
          Auto-renew: {renews ? "On" : "Off"}
        </span>
      )}
    </div>
  );
}
