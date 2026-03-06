const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface TransitResponse {
  timestamp_ist: string;
  positions: Record<string, any>;
  future_transits: Record<
    string,
    {
      planet: string;
      from_rashi: string;
      to_rashi: string;
      entering_date: string;
      exit_date: string;
    }[]
  >;
}

export async function getTransit(): Promise<TransitResponse | null> {
  try {
    const res = await fetch(`${BACKEND}/api/transit/current`, {
      method: "GET",
      next: { revalidate: 21600 }, // 6 hour cache
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Transit API error:", error);
    return null;
  }
}