'use client';

import Image from 'next/image';

export default function ToolAdsBlock() {
  return (
    <div className="mt-10 flex justify-center">
      {/* Google Ads placeholder or live embed */}
      <div className="w-full max-w-3xl flex justify-center">
        {/* AdSense script or custom banner */}
        <a href="/ads/report-offer" target="_blank" rel="noopener noreferrer">
          <Image
            src="/ads/ad-offer.jpg"
            alt="Astrology Report Ad"
            width={728}
            height={90}
            className="rounded shadow border"
          />
        </a>
      </div>
    </div>
  );
}
