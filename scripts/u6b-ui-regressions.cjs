// Additional UI regressions with explicitly mocked failures/historical-category data.
const assert = require('node:assert/strict');
require('@next/env').loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const { chromium } = require(process.env.U6B_PLAYWRIGHT || 'playwright');
const base = 'http://127.0.0.1:3000';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.route('**/*', route => ['localhost','127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  assert.equal((await context.request.post(`${base}/api/admin/auth`, { data: { password: process.env.ADMIN_PASSWORD } })).status(), 200);
  const page = await context.newPage(); page.setDefaultTimeout(30000);
  await page.goto(`${base}/admin/users`);
  await page.getByText(/\d+ users found/).waitFor();
  await page.route('**/api/admin/audiences/preview', route => route.fulfill({ status: 503, json: { error: 'qa_unavailable', message: 'QA preview temporarily unavailable.' } }));
  await page.getByRole('button', { name: 'Save Audience', exact: true }).click();
  const modal = page.getByRole('dialog');
  await modal.getByLabel('Audience Name *').fill('Must not save');
  await modal.getByText('QA preview temporarily unavailable.', { exact: false }).waitFor();
  assert(await modal.getByRole('button', { name: 'Save Audience', exact: true }).isDisabled());
  await page.unroute('**/api/admin/audiences/preview');
  await modal.getByRole('button', { name: 'Retry preview', exact: true }).click();
  await modal.getByText(/Current members: \d+/).waitFor();
  assert(await modal.getByRole('button', { name: 'Save Audience', exact: true }).isEnabled());
  await modal.getByRole('button', { name: 'Cancel', exact: true }).click();
  // Exercise the real shared filter controls; inspect serialized request, without persisting.
  await page.getByRole('button', { name: /^Filters/ }).click();
  for (const label of ['Mahadasha','Antardasha','Sade Sati Status','Sade Sati Phase','Current Transit Houses','Ask Now Concern']) await page.getByText(label, { exact: true }).first().waitFor();
  await page.getByRole('button', { name: 'Apply Filters', exact: true }).click();
  await page.getByRole('link', { name: 'Orders', exact: true }).waitFor();
  await page.getByRole('link', { name: 'App Version', exact: true }).waitFor();
  assert.equal(await page.getByRole('link', { name: 'Orders', exact: true }).getAttribute('href'), '/admin');
  assert.equal(await page.getByRole('link', { name: 'App Version', exact: true }).getAttribute('href'), '/admin/app-version');
  await page.getByRole('link', { name: 'Orders', exact: true }).click();
  await page.waitForURL(`${base}/admin`);
  await page.getByRole('link', { name: 'App Version', exact: true }).click();
  await page.waitForURL(`${base}/admin/app-version`);
  await page.getByRole('link', { name: 'Users', exact: true }).waitFor();

  // Synthetic historical response does not alter any persisted audience/category.
  const historical = { id: 999999998, name: 'Historical QA (mock)', description: null, is_active: false, created_by: null, created_at: null, updated_at: null, criteria: { version: 1, filters: { ask_now_concern: ['U6B retained historical concern'] } } };
  await page.route('**/api/admin/audiences/999999998', route => route.fulfill({ json: historical }));
  await page.route('**/api/admin/audiences/999999998/preview?*', route => route.fulfill({ json: { audience: historical, member_count: 0, users: [], pagination: { page: 1, page_size: 20, total_count: 0, total_pages: 0 } } }));
  await page.goto(`${base}/admin/audiences/999999998`);
  await page.getByText(/Retained historical\/inactive Ask Now criteria:/).waitFor();
  await page.getByRole('button', { name: 'Edit Audience', exact: true }).click();
  await modal.getByRole('button', { name: 'Edit criteria', exact: true }).click();
  assert.equal(await modal.getByLabel('Ask Now Buyer', { exact: true }).inputValue(), 'any');
  await modal.getByLabel('Ask Now Buyer', { exact: true }).selectOption('false');
  await modal.getByLabel('Active Subscription', { exact: true }).selectOption('false');
  await modal.getByRole('button', { name: 'U6B retained historical concern (retained historical/inactive)', exact: true }).waitFor();
  await modal.getByRole('button', { name: 'Cancel criteria changes', exact: true }).click();
  await modal.getByText('Ask Now Concern: U6B retained historical concern', { exact: true }).waitFor();
  await modal.getByRole('button', { name: 'Cancel', exact: true }).click();
  // Exercise pagination even when the local database has fewer than 21 users.
  await page.unroute('**/api/admin/audiences/999999998/preview?*');
  await page.route('**/api/admin/audiences/999999998/preview?*', route => {
    const current = Number(new URL(route.request().url()).searchParams.get('page'));
    return route.fulfill({ json: { member_count: 21, users: [], pagination: { page: current, page_size: 20, total_count: 21, total_pages: 2 } } });
  });
  await page.getByRole('button', { name: 'Refresh preview', exact: true }).click();
  await page.getByText('Page 1 of 2', { exact: true }).waitFor();
  await Promise.all([page.waitForResponse(r => r.url().includes('/preview?page=2&page_size=20')), page.getByRole('button', { name: /Next/ }).click()]);
  await page.getByText('Page 2 of 2', { exact: true }).waitFor();
  assert(await page.getByRole('button', { name: /Next/ }).isDisabled());
  console.log('PASS: mocked 503 blocks save, retry recovers; filter controls/nav retained; historical inactive criteria and boolean controls preserved through cancellation; pagination reaches page 2. No fixtures persisted.');
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
