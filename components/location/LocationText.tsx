"use client";

import { useEffect, useState } from "react";
import { useLocation } from "./LocationProvider";

export default function LocationText({
  fallback = "India",
  prefix = "in",
}: {
  fallback?: string;
  prefix?: string;
}) {
  const { city } = useLocation();
  const [mounted, setMounted] = useState(false);

  // Sirf client par render hone ke baad text dikhayenge
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{prefix} {fallback}</>; // Server par default dikhega
  }

  return <>{prefix} {city ?? fallback}</>; // Client par actual city dikhegi
}