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
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.city) {
          setCity(data.city);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <LocationContext.Provider value={{ city }}>
      {children}
    </LocationContext.Provider>
  );
}
