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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/festivals/navratri?year=${year}&type=${type}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch Navratri data")
  }

  return res.json()
}