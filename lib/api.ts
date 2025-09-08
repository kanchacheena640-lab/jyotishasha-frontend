const BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function apiGet(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, { ...init, cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function apiPost(path: string, body: any, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
