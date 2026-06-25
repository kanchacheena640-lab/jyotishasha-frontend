'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'pending' | 'authenticated' | 'unauthenticated';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('pending');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.authenticated) {
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
          router.replace('/admin/login');
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('unauthenticated');
        router.replace('/admin/login');
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (status !== 'authenticated') {
    return null;
  }

  return <>{children}</>;
}
