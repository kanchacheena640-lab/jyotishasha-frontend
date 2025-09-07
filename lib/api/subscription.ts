// lib/api/subscription.ts
export async function getSubscriptionInfo(): Promise<{
  active: boolean;
  plan: string;
  status: 'active' | 'expired' | 'none' | 'pending';
  started_at: string;
  end_at: string;
  days_left: number;
  renews: boolean;
  is_active: boolean;
}> {
  // Get token from localStorage (or use cookie if stored that way)
  const token = localStorage.getItem("accessToken"); // 👈 adjust if you named it differently

  const res = await fetch("/api/profile/subscription-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 this is the missing part
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subscription info");
  }

  return res.json();
}

