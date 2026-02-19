"use client";

import { useLocation } from "./LocationProvider";

export default function LocationText({
  fallback = "India",
  prefix = "in",
}: {
  fallback?: string;
  prefix?: string;
}) {
  const { city } = useLocation();

  return <>{prefix} {city ?? fallback}</>;
}
