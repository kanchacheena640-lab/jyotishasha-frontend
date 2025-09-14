// lib/useUserCache.ts
import { useState, useEffect } from "react";

export interface UserCacheData {
  name?: string;
  dob?: string;
  tob?: string;
  gender?: string;
  place?: string;
  coords?: { lat: number; lng: number };
  language?: 'en' | 'hi';   // 🆕 ye line add karo
}

const STORAGE_KEY = "jyotishasha_user";

export function useUserCache() {
  const [userData, setUserData] = useState<UserCacheData>({});

  // Load cache on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setUserData(JSON.parse(saved));
        } catch {
          // ignore invalid JSON
        }
      }
    }
  }, []);

  // Save cache
  const saveUserData = (data: UserCacheData) => {
    setUserData(data);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  // Clear cache
  const clearUserData = () => {
    setUserData({});
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { userData, saveUserData, clearUserData };
}
