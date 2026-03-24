'use client';

import { useEffect, useState } from 'react';
import KundaliWithTransit from '@/components/KundaliWithTransit';

export default function TestTransitPage() {
  const [kundaliData, setKundaliData] = useState<any>(null);

  useEffect(() => {
    const fetchKundali = async () => {
      const res = await fetch('http://localhost:5000/api/full-kundali', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          dob: '1985-03-31',
          tob: '19:45',
          latitude: 26.8467,
          longitude: 80.9462,
          gender: 'Male',
          language: 'en',
          toolId: 'live-transit',
          
        }),
      });

      const data = await res.json();
      setKundaliData(data);
      console.log('✅ Fetched Kundali:', data);
    };

    fetchKundali();
  }, []);

  if (!kundaliData) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-xl font-bold text-purple-800">Test Transit Page</h1>
      <div className="border rounded p-4 bg-white shadow">
        <KundaliWithTransit
          name={kundaliData.name}
          dob={kundaliData.dob}
          tob={kundaliData.tob}
          latitude={kundaliData.latitude}
          longitude={kundaliData.longitude}
          language="en" 
          kundaliData={kundaliData}
        />
      </div>
    </div>
  );
}
