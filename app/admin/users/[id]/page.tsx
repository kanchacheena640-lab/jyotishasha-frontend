'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AdminGuard from '@/components/AdminGuard';
import { formatTransitTimestamp } from '@/lib/admin/formatTransitTimestamp';
import { formatCalendarDate } from '@/lib/transit/formatCalendarDate';
import AdminNav from '@/components/admin/AdminNav';
import {
  RealUserDetailResponse,
  fetchAdminUserDetail,
  YOG_LABELS,
  DOSH_LABELS,
  CURRENT_TRANSIT_PLANET_ORDER,
  CurrentTransitPlanet,
  AskNowConcernHistoryEntry,
} from '@/lib/admin/usersApi';

type LoadState = 'loading' | 'ready' | 'not_found' | 'error';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section aria-label={title} className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
    <h2 className="mb-4 text-base font-semibold text-gray-900">{title}</h2>
    {children}
  </section>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">{children}</span>;
}

function formatDetailDate(value: string, dateOnly = false): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return dateOnly ? date.toLocaleDateString() : date.toLocaleString();
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-xs font-medium text-gray-600">{label}</p>
      <p className="break-words text-sm font-medium text-gray-900">{value ?? '—'}</p>
    </div>
  );
}

const STATUS_LABEL: Record<string, string> = { active: 'Active', inactive: 'Inactive', unknown: 'Unknown' };

function formatTransitDegree(degree: number | null): string {
  if (degree === null || degree === undefined) return '—';
  return `${degree.toFixed(2)}°`;
}

function CurrentTransitRow({ planet, data }: { planet: string; data: CurrentTransitPlanet }) {
  return (
    <tr className="border-t border-gray-100">
      <td className="py-1.5 pr-3 text-sm text-gray-800 font-medium">{planet}</td>
      <td className="py-1.5 pr-3 text-sm text-gray-800">{data.rashi ?? '—'}</td>
      <td className="py-1.5 pr-3 text-sm">
        {data.house !== null && data.house !== undefined ? (
          <span className="text-gray-800">House {data.house}</span>
        ) : (
          <span className="text-gray-600 italic">Not calculated</span>
        )}
      </td>
      <td className="py-1.5 pr-3 text-sm text-gray-800">{formatTransitDegree(data.degree)}</td>
      <td className={`py-1.5 text-sm ${data.motion === 'Retrograde' ? 'font-medium text-amber-800' : 'text-gray-700'}`}>{data.motion ?? '—'}</td>
    </tr>
  );
}

function parseAskNowTimestamp(iso: string): Date {
  const hasOffset = /[zZ]|[+-]\d{2}:\d{2}$/.test(iso);
  return new Date(hasOffset ? iso : `${iso}Z`);
}

function formatAskNowDate(iso: string): string {
  const d = parseAskNowTimestamp(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const ASK_NOW_SOURCE_LABEL: Record<AskNowConcernHistoryEntry['source'], string> = {
  free: 'Free',
  pack: 'Paid Pack',
};

function TraitList({
  title,
  calculatedAt,
  entries,
  labels,
  metricKey,
  metricLabel,
}: {
  title: string;
  calculatedAt: string | null;
  entries: Record<string, { strength?: string; severity?: string }> | null;
  labels: Record<string, string>;
  metricKey: 'strength' | 'severity';
  metricLabel: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-600 mb-1">{title}</p>
      {!calculatedAt ? (
        <p className="text-sm text-gray-600 italic">Not calculated</p>
      ) : !entries || Object.keys(entries).length === 0 ? (
        <p className="text-sm text-gray-500">No active {title.replace('Active ', '')}</p>
      ) : (
        <ul className="text-sm text-gray-800 space-y-0.5">
          {Object.entries(entries).map(([key, val]) => {
            const label = labels[key] || key;
            const metric = val?.[metricKey];
            return (
              <li key={key}>
                {label}
                {metric ? <span className="text-gray-600"> — {metricLabel}: {metric}</span> : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const [state, setState] = useState<LoadState>('loading');
  const [detail, setDetail] = useState<RealUserDetailResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    fetchAdminUserDetail(params.id)
      .then((res) => {
        if (cancelled) return;
        if (res === null) {
          setState('not_found');
          return;
        }
        setDetail(res);
        setState('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMessage(err instanceof Error ? err.message : "Couldn't load this user.");
        setState('error');
      });
    return () => { cancelled = true; };
  }, [params.id]);

  return (
    <AdminGuard>
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <AdminNav />
        <a href="/admin/users" className="text-sm text-indigo-600 hover:underline">← Back to Users</a>

        {state === 'loading' && (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {state === 'not_found' && (
          <div className="mt-4 border border-gray-200 rounded-xl bg-white p-6 text-center text-sm text-gray-500">
            No user found for id &quot;{params.id}&quot;.
          </div>
        )}

        {state === 'error' && (
          <div className="mt-4 border border-gray-200 rounded-xl bg-white p-6 text-center text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        {state === 'ready' && detail && (
          <>
            <div className="mt-3 mb-4">
              <h1 className="text-xl font-bold text-gray-900">{detail.identity.name || `User #${detail.identity.id}`}</h1>
              <p className="mt-1 text-sm text-gray-600">Customer 360 · User #{detail.identity.id}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>{detail.customer.customer_type === 'paying' ? 'Paying' : 'Free'}</Badge>
                <Badge>{STATUS_LABEL[detail.identity.status] ?? 'Unknown'}</Badge>
                {detail.customer.active_subscription && <Badge>Subscription Active</Badge>}
                {detail.customer.ask_now_buyer && <Badge>Ask Now Buyer</Badge>}
              </div>
            </div>

            <div className="space-y-4">
            <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Section title="Identity">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name" value={detail.identity.name} />
                  <Field label="Age" value={detail.identity.age} />
                  <Field label="Email" value={detail.identity.email} />
                  <Field label="Phone" value={detail.identity.phone} />
                  <Field label="Signup Date" value={detail.identity.signup_date ? formatDetailDate(detail.identity.signup_date, true) : '—'} />
                  <Field label="Last Active" value={detail.identity.last_active_at ? formatDetailDate(detail.identity.last_active_at) : 'Never'} />
                  <Field label="Status" value={STATUS_LABEL[detail.identity.status]} />
                </div>
              </Section>

              <Section title="Customer">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Type" value={detail.customer.customer_type === 'paying' ? 'Paying' : 'Free'} />
                  <Field label="Active Subscription" value={detail.customer.active_subscription ? 'Yes' : 'No'} />
                  <Field label="Ask Now Buyer" value={detail.customer.ask_now_buyer ? 'Yes' : 'No'} />
                </div>
              </Section>
            </div>
            <div className="grid items-start gap-4 lg:grid-cols-2">
              <Section title="Birth Astrology">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Moon Sign / Rashi" value={detail.birth_astrology.moon_sign} />
                  <Field label="Lagna / Ascendant" value={detail.birth_astrology.lagna} />
                  <Field label="Nakshatra" value={detail.birth_astrology.nakshatra} />
                  <Field label="Pada" value={detail.birth_astrology.nakshatra_pada} />
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <TraitList
                    title="Active Yog"
                    calculatedAt={detail.birth_astrology.static_astrology_calculated_at}
                    entries={detail.birth_astrology.static_yog}
                    labels={YOG_LABELS}
                    metricKey="strength"
                    metricLabel="Strength"
                  />
                  <TraitList
                    title="Active Dosh"
                    calculatedAt={detail.birth_astrology.static_astrology_calculated_at}
                    entries={detail.birth_astrology.static_dosh}
                    labels={DOSH_LABELS}
                    metricKey="severity"
                    metricLabel="Severity"
                  />
                </div>
                {detail.birth_astrology.static_astrology_calculated_at && (
                  <p className="mt-3 text-[11px] text-gray-500">
                    Calculated {formatDetailDate(detail.birth_astrology.static_astrology_calculated_at)}
                    {detail.birth_astrology.static_astrology_version != null && ` · v${detail.birth_astrology.static_astrology_version}`}
                  </p>
                )}
              </Section>
              <Section title="Ask Now Intelligence">
                {detail.ask_now ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Buyer" value={detail.ask_now.buyer ? 'Yes' : 'No'} />
                      <Field label="Classified Questions" value={detail.ask_now.total_classified_questions} />
                    </div>

                    {Object.keys(detail.ask_now.category_counts).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-600 mb-1">Concern Summary</p>
                        <ul className="text-sm text-gray-800 space-y-0.5">
                          {Object.entries(detail.ask_now.category_counts).map(([category, count]) => (
                            <li key={category}>
                              {category} — {count}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-600 mb-1">Concern History</p>
                      {detail.ask_now.concerns.length === 0 ? (
                        <p className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">No Ask Now concern history yet.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left">
                                <th className="pb-1 pr-3 text-xs font-medium text-gray-600">Concern</th>
                                <th className="pb-1 pr-3 text-xs font-medium text-gray-600">Source</th>
                                <th className="pb-1 text-xs font-medium text-gray-600">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {detail.ask_now.concerns.map((entry, i) => (
                                <tr key={`${entry.created_at}-${i}`} className="border-t border-gray-100">
                                  <td className="py-1.5 pr-3 text-sm text-gray-800">{entry.category}</td>
                                  <td className="py-1.5 pr-3 text-sm text-gray-800">{ASK_NOW_SOURCE_LABEL[entry.source]}</td>
                                  <td className="py-1.5 text-sm text-gray-800">{formatAskNowDate(entry.created_at)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-600 italic">Ask Now data unavailable.</p>
                )}
              </Section>
            </div>
            <Section title="Current Astrology">
              <div className="grid items-start gap-4 sm:grid-cols-2 sm:gap-8">
                <div className="min-w-0">
                  <h3 className="mb-2 text-sm font-semibold text-gray-800">Current Dasha</h3>
                  {detail.birth_astrology.current_dasha ? (
                    <div className="text-sm text-gray-800 space-y-0.5">
                      <p>Current Mahadasha: {detail.birth_astrology.current_dasha.mahadasha}</p>
                      <p>Current Antardasha: {detail.birth_astrology.current_dasha.antardasha}</p>
                      <p className="text-gray-500">
                        Period: {formatCalendarDate(detail.birth_astrology.current_dasha.start_date)}
                        {' – '}
                        {formatCalendarDate(detail.birth_astrology.current_dasha.end_date)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 italic">Not calculated</p>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="mb-2 text-sm font-semibold text-gray-800">Sade Sati</h3>
                  {detail.birth_astrology.sade_sati ? (
                    <div className="text-sm text-gray-800 space-y-0.5">
                      <p>Status: {detail.birth_astrology.sade_sati.active ? 'Active' : 'Inactive'}</p>
                      <p className="text-gray-500">
                        Phase: {detail.birth_astrology.sade_sati.active ? (detail.birth_astrology.sade_sati.phase ?? '—') : '—'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 italic">Not calculated</p>
                  )}
                </div>
              </div>
            </Section>
                <Section title="Current Transits">
                  {detail.birth_astrology.current_transits ? (
                    <>
                      <div className="overflow-x-auto">
                        <table aria-label="Current transits" className="w-full min-w-[480px]">
                          <thead>
                            <tr className="text-left">
                              <th className="pb-1 pr-3 text-xs font-medium text-gray-600">Planet</th>
                              <th className="pb-1 pr-3 text-xs font-medium text-gray-600">Rashi</th>
                              <th className="pb-1 pr-3 text-xs font-medium text-gray-600">House</th>
                              <th className="pb-1 pr-3 text-xs font-medium text-gray-600">Degree</th>
                              <th className="pb-1 text-xs font-medium text-gray-600">Motion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {CURRENT_TRANSIT_PLANET_ORDER.map((planet) => (
                              <CurrentTransitRow
                                key={planet}
                                planet={planet}
                                data={detail.birth_astrology.current_transits!.planets[planet]}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-2 text-[11px] text-gray-500">
                        Transit snapshot: {formatTransitTimestamp(detail.birth_astrology.current_transits.resolved_at)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600 italic">Current transit data unavailable.</p>
                  )}
                </Section>

            </div>
          </>
        )}
      </div>
    </AdminGuard>
  );
}
