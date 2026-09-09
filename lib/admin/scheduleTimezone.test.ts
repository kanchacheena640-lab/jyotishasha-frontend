import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { istInputToUtcIso, utcIsoToIstInput, formatIst, formatUtc, IST_OFFSET_MINUTES } from './scheduleTimezone';

test('IST offset is the fixed +05:30, no DST', () => {
  assert.equal(IST_OFFSET_MINUTES, 330);
});

test('istInputToUtcIso converts IST wall-clock to the correct UTC instant', () => {
  // 2026-09-10 14:30 IST == 2026-09-10 09:00 UTC
  assert.equal(istInputToUtcIso('2026-09-10T14:30'), '2026-09-10T09:00:00.000Z');
  // Crossing midnight: 2026-01-01 02:00 IST == 2025-12-31 20:30 UTC
  assert.equal(istInputToUtcIso('2026-01-01T02:00'), '2025-12-31T20:30:00.000Z');
});

test('utcIsoToIstInput is the exact inverse round trip', () => {
  for (const utc of ['2026-09-10T09:00:00.000Z', '2025-12-31T20:30:00.000Z', '2026-06-15T18:45:00.000Z']) {
    const localValue = utcIsoToIstInput(utc);
    assert.equal(istInputToUtcIso(localValue), utc);
  }
});

test('malformed/empty input returns null, never throws or silently defaults', () => {
  for (const bad of ['', 'not-a-date', '2026-13-40T99:99', '2026-09-10']) {
    assert.equal(istInputToUtcIso(bad), null);
  }
});

test('formatIst and formatUtc show the same instant in two explicit offsets', () => {
  const utc = '2026-09-10T09:00:00.000Z';
  assert.equal(formatIst(utc), '10-09-2026 14:30 IST');
  assert.equal(formatUtc(utc), '10-09-2026 09:00 UTC');
});

test('formatIst/formatUtc handle null/invalid without throwing', () => {
  assert.equal(formatIst(null), '—');
  assert.equal(formatUtc(undefined), '—');
  assert.equal(formatIst('not-a-date'), '—');
});
