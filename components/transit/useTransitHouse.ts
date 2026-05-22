'use client';

import { useSearchParams } from 'next/navigation';

export function useTransitHouse(
  fallbackHouse: number = 1
): number {
  const searchParams = useSearchParams();

  const rawHouse = searchParams.get('house');

  const parsedHouse = rawHouse
    ? Number(rawHouse)
    : fallbackHouse;

  const house =
    !isNaN(parsedHouse) &&
    parsedHouse >= 1 &&
    parsedHouse <= 12
      ? parsedHouse
      : fallbackHouse;

  return house;
}