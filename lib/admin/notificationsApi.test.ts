import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { actionLabel, urlLooksApproved, isLargeAudience, NONE_ACTION, APP_DEEP_LINK_TARGETS, APPROVED_YOUTUBE_URL, LARGE_AUDIENCE_THRESHOLD } from './notificationsApi';

test('urlLooksApproved accepts exact approved hosts and the approved YouTube channel', () => {
  for (const url of ['https://jyotishasha.com', 'https://jyotishasha.com/reports', 'https://www.jyotishasha.com/', APPROVED_YOUTUBE_URL]) {
    assert.equal(urlLooksApproved(url), true, url);
  }
});

test('urlLooksApproved rejects http, unapproved hosts, lookalikes and other YouTube URLs', () => {
  for (const url of [
    'http://jyotishasha.com',
    'https://evil.com',
    'https://jyotishasha.com.evil.com',
    'https://eviljyotishasha.com',
    'https://www.youtube.com/watch?v=someOtherVideo',
    'not-a-url',
    '',
  ]) {
    assert.equal(urlLooksApproved(url), false, url);
  }
});

test('every APP_DEEP_LINK target produces a distinct, non-empty label', () => {
  const labels = APP_DEEP_LINK_TARGETS.map(target => actionLabel({ type: 'APP_DEEP_LINK', target, parameters: {} }));
  assert.equal(new Set(labels).size, APP_DEEP_LINK_TARGETS.length);
  for (const label of labels) assert(label.length > 0);
});

test('NONE action label mentions Notification Detail fallback', () => {
  assert(actionLabel(NONE_ACTION).includes('Notification Detail'));
});

test('WEB_URL action label surfaces the destination URL', () => {
  const url = 'https://jyotishasha.com/reports';
  assert(actionLabel({ type: 'WEB_URL', target: 'HTTPS_URL', parameters: { url } }).includes(url));
});

test('isLargeAudience mirrors the backend >=1000 threshold on matched or eligible', () => {
  assert.equal(LARGE_AUDIENCE_THRESHOLD, 1000);
  assert.equal(isLargeAudience(999, 999), false);
  assert.equal(isLargeAudience(1000, 1000), true);
  assert.equal(isLargeAudience(1000, 5), true);
  assert.equal(isLargeAudience(5, 1000), true);
  assert.equal(isLargeAudience(0, 0), false);
});
