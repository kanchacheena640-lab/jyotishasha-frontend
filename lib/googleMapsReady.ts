// lib/googleMapsReady.ts
export function waitForGoogleMaps(timeoutMs = 10000): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const w = window as any;
  // Already loaded?
  if (w.__gmapsReady || w.google?.maps?.places) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      window.removeEventListener("gmaps:ready", onReady);
      if (intervalId) clearInterval(intervalId as number);
      if (timeoutId) clearTimeout(timeoutId as number);
    };

    const onReady = () => {
      cleanup();
      resolve();
    };

    const checkNow = () => {
      if (w.__gmapsReady || w.google?.maps?.places) {
        cleanup();
        resolve();
      }
    };

    // Listen for our custom ready event from app/layout.tsx
    window.addEventListener("gmaps:ready", onReady);

    // Also poll in case event was missed
    const intervalId = window.setInterval(checkNow, 200);

    // Safety timeout
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("Google Maps failed to load in time"));
    }, timeoutMs);

    // Immediate check once
    checkNow();
  });
}
