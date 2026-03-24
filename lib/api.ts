const BASE = process.env.NEXT_PUBLIC_API_BASE!;

// 🌍 Helper to get current locale (If needed in client side)
// Note: Server components mein hum params se lang bhejenge

export async function apiGet(path: string, lang: string = 'en', init?: RequestInit) {
  // ✅ Path mein query parameter add kar diya taaki Backend switch kar sake
  const separator = path.includes('?') ? '&' : '?';
  const url = `${BASE}${path}${separator}lang=${lang}`;

  const res = await fetch(url, { 
    ...init, 
    cache: 'no-store' 
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function apiPost(path: string, body: any, lang: string = 'en', init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept-Language': lang, // ✅ Header mein bhi bhasha bhej di
      ...(init?.headers || {}) 
    },
    body: JSON.stringify({
      ...body,
      lang: lang // ✅ Body mein bhi lang inject kar diya (Back-end safety)
    }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}