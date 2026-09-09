import assert from 'node:assert/strict';
import { formatTransitTimestamp } from './formatTransitTimestamp';

for (const timezone of ['UTC', 'Asia/Kolkata', 'America/Los_Angeles']) {
  process.env.TZ = timezone;
  assert.equal(formatTransitTimestamp('2026-09-07 18:30:22 IST'), '07 Sept 2026, 18:30:22 IST');
  assert.equal(formatTransitTimestamp('2026-09-08 08:24:40 IST'), '08 Sept 2026, 08:24:40 IST');
  assert.equal(formatTransitTimestamp('2024-02-29 00:00:00 IST'), '29 Feb 2024, 00:00:00 IST');
  assert.equal(formatTransitTimestamp(' 2026-12-31 23:59:59 IST '), '31 Dec 2026, 23:59:59 IST');
  for (const value of [null, undefined, '', 'Invalid Date', 'nonsense', '2026-02-29 12:00:00 IST',
    '2026-04-31 12:00:00 IST', '2026-13-01 12:00:00 IST', '2026-00-01 12:00:00 IST',
    '2026-01-00 12:00:00 IST', '2026-01-01 24:00:00 IST', '2026-01-01 12:60:00 IST',
    '2026-01-01 12:00:60 IST', '2026-09-07 18:30:22', '2026-09-07 18:30:22 PST']) {
    assert.equal(formatTransitTimestamp(value), 'Unavailable', String(value));
  }
}
console.log('PASS: transit IST timestamps, leap days, boundaries, null/malformed values, and viewer timezone independence.');
