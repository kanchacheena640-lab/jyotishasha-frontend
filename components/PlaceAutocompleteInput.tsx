'use client';

import React, { useRef, useEffect } from 'react';

interface Place {
  lat: number;
  lng: number;
  name: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (place: Place) => void;
}

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-places-script';
const GOOGLE_MAPS_SRC = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;

// Module-level singleton: this used to be loaded globally for every page via
// app/layout.tsx. Now every PlaceAutocompleteInput instance -- even several
// mounted at once (e.g. two birth-place fields on the same form) -- loads it
// on demand here and awaits this same promise, so the script is fetched at
// most once no matter how many instances mount, and never on pages that don't
// render this component at all.
let mapsLoadingPromise: Promise<void> | null = null;

// Exported so other, independent Google Maps consumers (e.g.
// components/reports/ReportCheckout.tsx, which wires its own Autocomplete
// directly rather than rendering this component) can trigger the same
// idempotent load instead of each needing their own script-injection copy.
export function loadGoogleMapsPlaces(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  // Already loaded (e.g. a previous page in this session already loaded it).
  if (window.google?.maps?.places) return Promise.resolve();

  if (mapsLoadingPromise) return mapsLoadingPromise;

  mapsLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      // Another instance's effect already injected the tag first this tick;
      // just wait on it instead of adding a second one.
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = GOOGLE_MAPS_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps script'));
    document.head.appendChild(script);
  });

  return mapsLoadingPromise;
}

const PlaceAutocompleteInput: React.FC<Props> = ({ value, onChange, onPlaceSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    let autocomplete: google.maps.places.Autocomplete | null = null;

    loadGoogleMapsPlaces()
      .then(() => {
        // Component may have unmounted (or its deps changed) while the script
        // was still loading -- don't touch a stale/removed input.
        if (cancelled || !inputRef.current || !window.google?.maps?.places) return;

        autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['(cities)'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete!.getPlace();
          const name = place.formatted_address || place.name;
          const lat = place.geometry?.location?.lat();
          const lng = place.geometry?.location?.lng();

          if (lat && lng && name) {
            onPlaceSelected({ lat, lng, name });
            onChange(name); // 👈 this keeps the input updated
          }
        });
      })
      .catch(() => {
        // Script failed to load (offline, blocked, etc.) -- the plain text
        // input above still works, it just won't autocomplete. Same
        // fallback behavior as before this component loaded the script itself.
      });

    return () => {
      cancelled = true;
      if (autocomplete && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [onPlaceSelected, onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
      placeholder="Enter place of birth"
    />
  );
};

export default PlaceAutocompleteInput;
