// -----------------------------
// Types – Exact Backend Mirror
// -----------------------------

export interface TimeRange {
  start: string
  end: string
}

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
  label: string
  sunrise: string
  sunset: string
  abhijit_muhurta: TimeRange
  brahma_muhurta: TimeRange
  rahu_kaal: TimeRange
  tithi: number
  tithi_window: TithiWindow
  kshaya: boolean
  vriddhi: boolean
}

export interface KalashSthapana {
  date: string
  sunrise: string
  abhijit_muhurta: TimeRange
  brahma_muhurta: TimeRange
  rahu_kaal: TimeRange
}

export interface SandhiPuja {
  date: string
  start: string
  end: string
}

export interface Vijayadashami {
  date: string
  aparahna_start: string
  aparahna_end: string
}

export interface NavratriResponse {
  type: "chaitra" | "shardiya"
  year: number
  start_date: string
  end_date: string
  total_days: number
  days: NavratriDay[]
  kalash_sthapana: KalashSthapana
  sandhi_puja: SandhiPuja
  vijayadashami: Vijayadashami
}

interface FetchParams {
  year: number
  type: "chaitra" | "shardiya" | "auto"
}

// -----------------------------
// API Fetch Function
// -----------------------------

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