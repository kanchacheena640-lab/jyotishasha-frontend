"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LocationContextType = {
  city: string | null;
};

const LocationContext = createContext<LocationContextType>({
  city: null,
});

export function useLocation() {
  return useContext(LocationContext);
}

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check if we already have the city in LocalStorage to avoid multiple API calls
    const savedCity = localStorage.getItem("user-city");
    if (savedCity) {
      setCity(savedCity);
    }

    // 2. Fetch only if city is not set
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.city) {
          setCity(data.city);
          localStorage.setItem("user-city", data.city); // Save it for next time
        }
      })
      .catch((err) => console.error("Location fetch failed:", err));
  }, []);

  return (
    <LocationContext.Provider value={{ city }}>
      {children}
    </LocationContext.Provider>
  );
}