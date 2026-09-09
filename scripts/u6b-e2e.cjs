// Run against the guarded local servers. Uses an existing Playwright installation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const { chromium } = require(process.env.U6B_PLAYWRIGHT || 'playwright');
const base = 'http://127.0.0.1:3000';
const fixtureName = `U6B QA ${new Date().toISOString()}`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return ['127.0.0.1', 'localhost'].includes(url.hostname) ? route.continue() : route.abort();
  });
  const unauth = await context.request.get(`${base}/api/admin/audiences`);
  assert.equal(unauth.status(), 401);
  const auth = await context.request.post(`${base}/api/admin/auth`, { data: { password: process.env.ADMIN_PASSWORD } });
  assert.equal(auth.status(), 200);
  const missing = await context.request.get(`${base}/api/admin/audiences/999999999`);
  assert.equal(missing.status(), 404);
  const invalid = await context.request.post(`${base}/api/admin/audiences/preview`, { data: { criteria: { version: 1, filters: { saturn_house: ['10'] } } } });
  assert.equal(invalid.status(), 400);
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  const api = [];
  page.on('request', req => { if (req.url().includes('/api/admin/')) api.push({ url: req.url(), method: req.method(), body: req.postDataJSON() }); });
  await page.goto(`${base}/admin/users`);
  await page.getByText(/\d+ users found/).waitFor();
  const columns = await page.locator('thead th').allTextContents();
  assert.equal(columns.length, 8);
  const initialUsers = await (await context.request.get(`${base}/api/admin/users?page=1&page_size=8`)).json();
  assert(initialUsers.users.length > 0, 'Local user data required for member-link verification');

  // Draft cancellation must not leak into saving. Snapshot all-users criteria.
  await page.getByRole('button', { name: /^Filters/ }).click();
  await page.locator('input[type=number]').first().fill('99');
  await page.getByRole('button', { name: /^Close/ }).click();
  await page.getByRole('button', { name: 'Save Audience', exact: true }).click();
  const modal = page.getByRole('dialog');
  await modal.getByText(/Current members: \d+/).waitFor();
  await modal.getByText('Audience: All Users', { exact: true }).waitFor();
  assert.deepEqual(api.filter(r => r.url.endsWith('/audiences/preview')).at(-1).body.criteria, { version: 1, filters: {} });
  await modal.getByRole('button', { name: 'Cancel', exact: true }).click();

  await page.getByRole('button', { name: /^Filters/ }).click();
  await page.locator('input[type=number]').first().fill('0');
  await page.getByRole('button', { name: 'Apply Filters', exact: true }).click();
  await page.getByText(/\d+ users found/).waitFor();
  await page.getByRole('button', { name: 'Save Audience', exact: true }).click();
  await modal.getByText(/Current members: \d+/).waitFor();
  assert.equal(api.filter(r => r.url.endsWith('/audiences/preview')).at(-1).body.criteria.filters.age_min, 0);
  await modal.getByLabel('Audience Name *').fill(fixtureName);
  await modal.getByLabel('Description').fill('Isolated local U6B functional QA fixture; created through the Admin UI.');
  const createdResponse = page.waitForResponse(r => r.url().endsWith('/api/admin/audiences') && r.request().method() === 'POST');
  await modal.getByRole('button', { name: 'Save Audience', exact: true }).click();
  const created = await (await createdResponse).json();
  assert(created.id);
  const fixtures = fs.existsSync('.u6b-qa-fixtures.json') ? JSON.parse(fs.readFileSync('.u6b-qa-fixtures.json', 'utf8')) : { ids: [], names: [] };
  fixtures.ids.push(created.id); fixtures.names.push(fixtureName);
  fs.writeFileSync('.u6b-qa-fixtures.json', JSON.stringify(fixtures, null, 2));
  await page.getByRole('status').filter({ hasText: 'saved' }).waitFor();
  await page.getByRole('button', { name: /^Filters \(1\)/ }).waitFor();
  api.length = 0;
  await page.getByRole('link', { name: 'Saved Audiences', exact: true }).click();
  await page.getByRole('row').filter({ hasText: fixtureName }).waitFor();
  assert.equal(api.filter(r => r.url.includes('/preview')).length, 0);
  await page.getByRole('row').filter({ hasText: fixtureName }).getByRole('link', { name: 'View' }).click();
  await page.getByText(/Current members: \d+/).waitFor();
  const memberLink = page.locator('a[href^="/admin/users/"]').first();
  const href = await memberLink.getAttribute('href');
  assert.match(href, /^\/admin\/users\/\d+$/);
  await memberLink.click();
  await page.waitForURL(`**${href}`);
  await page.getByText('Identity', { exact: true }).waitFor();
  await page.goto(`${base}/admin/audiences/${created.id}`);
  await page.getByText(/Current members: \d+/).waitFor();

  await page.getByRole('button', { name: 'Edit Audience', exact: true }).click();
  await modal.getByRole('button', { name: 'Edit criteria', exact: true }).click();
  await modal.getByLabel('Search', { exact: true }).fill('U6B-no-matching-user-6530a3ce');
  await modal.getByRole('button', { name: 'Apply criteria & preview' }).click();
  await modal.getByText('Current members: 0', { exact: true }).waitFor();
  await modal.getByRole('button', { name: 'Save Audience', exact: true }).click();
  await page.getByText('Audience saved.', { exact: true }).waitFor();
  await page.getByText('Current members: 0', { exact: true }).waitFor();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Deactivate Audience', exact: true }).click();
  await page.getByText('Audience deactivated.', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Refresh preview', exact: true }).click();
  await page.getByText('Current members: 0', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Reactivate Audience', exact: true }).click();
  await page.getByText('Audience reactivated.', { exact: true }).waitFor();

  // Edit to All Users, proving empty criteria can also be saved and paginated.
  await page.getByRole('button', { name: 'Edit Audience', exact: true }).click();
  await modal.getByRole('button', { name: 'Edit criteria', exact: true }).click();
  await modal.getByLabel('Search', { exact: true }).fill('');
  await modal.locator('input[type=number]').first().fill('');
  await modal.getByRole('button', { name: 'Apply criteria & preview' }).click();
  await modal.getByText('Audience: All Users', { exact: true }).waitFor();
  await modal.getByText(/Current members: \d+/).waitFor();
  await modal.getByRole('button', { name: 'Save Audience', exact: true }).click();
  await page.getByText('Audience saved.', { exact: true }).waitFor();
  const saved = await (await context.request.get(`${base}/api/admin/audiences/${created.id}`)).json();
  assert.deepEqual(saved.criteria, { version: 1, filters: {} });
  assert.equal(saved.is_active, true);
  const count = await (await context.request.get(`${base}/api/admin/audiences/${created.id}/preview?page=1&page_size=20`)).json();
  if (count.member_count > 20) {
    const next = page.getByRole('button', { name: /Next/ });
    await Promise.all([page.waitForResponse(r => r.url().includes(`/audiences/${created.id}/preview?page=2`)), next.click()]);
  }
  console.log(`PASS: real local browser workflow, draft isolation, applied filters, direct preview, create, list without previews, member link, edit, zero results, deactivate/inactive preview/reactivate, All Users save. QA audience ID: ${created.id}`);
  await browser.close();
})().catch(error => { console.error(error.message); process.exit(1); });
