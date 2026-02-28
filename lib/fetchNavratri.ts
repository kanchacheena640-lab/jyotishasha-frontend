export interface TithiWindow {
  start_ist: string
  end_ist: string
  name: string
  number: number
  paksha: string
}

export interface NavratriDay {
  date: string
  day_number: number
  mata_name: string
  tithi: number
  tithi_window: TithiWindow
}

export interface NavratriResponse {
  type: "chaitra" | "shardiya"
  year: number
  days: NavratriDay[]
  start_date?: string
  end_date?: string
  total_days?: number
}

interface FetchParams {
  year: number
  type: string
}

export async function fetchNavratri({
  year,
  type
}: FetchParams): Promise<NavratriResponse> {

  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/festivals/navratri",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year,
        latitude: 26.8467,
        longitude: 80.9462,
        type
      }),
      cache: "no-store"
    }
  )

  if (!res.ok) {
    const text = await res.text()
    console.error("Navratri API Error:", text)
    throw new Error("Failed to fetch Navratri data")
  }

  return res.json()
}