// app/admin/reviews/page.tsx -- F10-P15 review moderation.
// Policy shown to moderators: reject ONLY for a listed content reason; never
// because a review is negative. Delete (F10-P17) is only for a buyer's own
// privacy request, found by order id after checking the request came from the
// order's email address. Publishing/rejecting goes through the
// /api/admin/reviews BFF (admin session + server-side bridge key).
'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminGuard from '@/components/AdminGuard';
import AdminNav from '@/components/admin/AdminNav';

type Review = { id: number; order_id: number; product: string; rating: number; body: string; display_name: string; date: string; status: string; auto_flags: string | null; moderation_reason: string | null; edit_count: number };
const REASONS = ['SPAM', 'ABUSIVE', 'PERSONAL_DATA', 'OFF_TOPIC', 'NOT_A_REVIEW'] as const;

export default function ReviewsAdminPage() {
  const [status, setStatus] = useState<'PENDING' | 'PUBLISHED' | 'REJECTED'>('PENDING');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [message, setMessage] = useState('');
  const [reason, setReason] = useState<Record<number, string>>({});
  const [orderQuery, setOrderQuery] = useState('');
  const [lookup, setLookup] = useState<string | null>(null);

  const load = useCallback(async () => {
    const query = lookup ? `order_id=${encodeURIComponent(lookup)}` : `status=${status}`;
    const res = await fetch(`/api/admin/reviews?${query}`, { cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setMessage(`Could not load reviews (${data.error || res.status}).`); setReviews([]); return; }
    setReviews(data.reviews || []);
  }, [status, lookup]);

  useEffect(() => { load(); }, [load]);

  async function act(id: number, action: 'publish' | 'reject' | 'delete') {
    if (action === 'delete' && !window.confirm(`Permanently delete review #${id}? Only do this when the buyer asked from the order's email address. This cannot be undone.`)) return;
    const res = await fetch('/api/admin/reviews', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action, reason: action === 'reject' ? reason[id] : undefined }),
    });
    const data = await res.json().catch(() => ({}));
    setMessage(res.ok ? `Review ${id}: ${data.status}${data.moderation_reason ? ` (${data.moderation_reason})` : ''}` : `Review ${id}: ${data.error || res.status}`);
    if (res.ok) load();
  }

  return (
    <AdminGuard>
      <div className="p-4 max-w-5xl mx-auto">
        <AdminNav />
        <h1 className="text-2xl font-bold mb-2">Report reviews</h1>
        <p className="text-sm text-gray-600 mb-4">
          Verified buyers only. Reviews with links, contact details or HTML wait here for a check. Reject only for a listed
          content reason — never because a review is negative or low-rated. Delete only when the buyer asks from the
          order&apos;s email address (find it by order id).
        </p>
        <div className="flex gap-2 mb-4">
          {(['PENDING', 'PUBLISHED', 'REJECTED'] as const).map((s) => (
            <button key={s} onClick={() => { setMessage(''); setLookup(null); setStatus(s); }} className={`px-3 py-1 rounded border ${!lookup && status === s ? 'bg-purple-600 text-white' : ''}`}>{s}</button>
          ))}
          <form onSubmit={(e) => { e.preventDefault(); setMessage(''); setLookup(/^\d+$/.test(orderQuery.trim()) ? orderQuery.trim() : null); }} className="flex gap-2 ml-auto">
            <input aria-label="Find review by order id" placeholder="Order id (privacy request)" value={orderQuery} onChange={(e) => setOrderQuery(e.target.value)} className="border rounded px-2 py-1 w-48" inputMode="numeric" />
            <button type="submit" className="px-3 py-1 rounded border">Find</button>
          </form>
        </div>
        {message && <p role="status" className="mb-3 text-sm">{message}</p>}
        {reviews.length === 0 ? <p className="text-gray-500">{lookup ? `No review for order ${lookup}.` : `No reviews in ${status}.`}</p> : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r.id} className="border rounded p-3">
                <div className="text-sm text-gray-600">#{r.id} · order {r.order_id} · {r.status} · {r.product} · {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)} · {r.display_name} · {r.date} · edits {r.edit_count}
                  {r.auto_flags && <span className="ml-2 text-amber-700">flags: {r.auto_flags}</span>}
                  {r.moderation_reason && <span className="ml-2 text-red-700">reason: {r.moderation_reason}</span>}
                </div>
                {/* Plain text: React escapes the review body. */}
                <p className="mt-2 whitespace-pre-line break-words">{r.body}</p>
                <div className="mt-2 flex flex-wrap gap-2 items-center">
                  {r.status !== 'PUBLISHED' && <button onClick={() => act(r.id, 'publish')} className="px-3 py-1 rounded bg-green-600 text-white">Publish</button>}
                  {r.status !== 'REJECTED' && (
                    <>
                      <select aria-label={`Reject reason for review ${r.id}`} value={reason[r.id] || ''} onChange={(e) => setReason({ ...reason, [r.id]: e.target.value })} className="border rounded px-2 py-1">
                        <option value="">Reject reason…</option>
                        {REASONS.map((x) => <option key={x} value={x}>{x}</option>)}
                      </select>
                      <button disabled={!reason[r.id]} onClick={() => act(r.id, 'reject')} className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-40">Reject</button>
                    </>
                  )}
                  <button onClick={() => act(r.id, 'delete')} className="px-3 py-1 rounded border border-red-600 text-red-700 ml-auto">Delete on buyer's request</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminGuard>
  );
}
