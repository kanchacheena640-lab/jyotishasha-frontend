// hooks/useSubscriptionInfo.ts
import useSWR from "swr";
import { getSubscriptionInfo } from "../lib/api/subscription";

export function useSubscriptionInfo() {
  const { data, error, isLoading, mutate } = useSWR(
    "subscription-info",
    getSubscriptionInfo
  );

  return {
    data,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
}
