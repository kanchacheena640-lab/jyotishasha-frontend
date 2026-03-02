export function getNavratriColors(startDate: string) {
  const weekdayColors: Record<number, string> = {
    0: "Orange",     // Sunday
    1: "White",      // Monday
    2: "Red",        // Tuesday
    3: "Royal Blue", // Wednesday
    4: "Yellow",     // Thursday
    5: "Green",      // Friday
    6: "Grey"        // Saturday
  }

  const start = new Date(startDate)
  const startDay = start.getDay()

  const colors: string[] = []

  for (let i = 0; i < 9; i++) {
    const dayIndex = (startDay + i) % 7
    colors.push(weekdayColors[dayIndex])
  }

  return colors
}