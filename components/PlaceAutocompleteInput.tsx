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

const PlaceAutocompleteInput: React.FC<Props> = ({ value, onChange, onPlaceSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!, {
      types: ['(cities)'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const name = place.formatted_address || place.name;
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      if (lat && lng && name) {
        onPlaceSelected({ lat, lng, name });
        onChange(name); // 👈 this keeps the input updated
      }
    });
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
