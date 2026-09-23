// Run against a local Next dev server. All API calls are mocked; external traffic is blocked.
// PLAYWRIGHT_MODULE may point to an existing installation without adding dependencies.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const requests = [];
    let submitted;
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (!['localhost', '127.0.0.1'].includes(url.hostname)) return route.abort();
      let body;
      if (url.pathname === '/api/admin/auth') body = { authenticated: true };
      else if (url.pathname === '/api/admin/users') {
        requests.push(url.searchParams);
        const size = Number(url.searchParams.get('page_size'));
        const page = Number(url.searchParams.get('page'));
        const total = 650;
        const base = url.searchParams.has('search') || url.searchParams.has('status') ? 1000 : 0;
        body = {
          users: Array.from({ length: Math.min(size, total - (page - 1) * size) }, (_, i) => ({
            id: base + (page - 1) * size + i + 1, name: `User ${i}`, email: `user${i}@example.test`,
            status: 'active', customer_type: 'free', active_subscription: false, last_active_at: null,
          })),
          summary: { total_users: total, active_users: total, paying_users: 0, active_subscriptions: 0 },
          pagination: { page, page_size: size, total_count: total, total_pages: Math.ceil(total / size) },
        };
      } else if (url.pathname === '/api/admin/users/asknow-concerns') body = { categories: [] };
      else if (url.pathname === '/api/admin/audiences' && route.request().method() === 'POST') {
        submitted = route.request().postDataJSON();
        body = { id: 1, name: submitted.name, audience_type: 'fixed', criteria: null };
      } else if (url.pathname.startsWith('/api/')) return route.abort();
      else return route.continue();
      return route.fulfill({ json: body });
    });
    const page = await context.newPage();
    await page.goto(process.env.USERS_TEST_URL || 'http://localhost:3100/admin/users');
    const rows = page.locator('tbody input[type=checkbox]');
    const header = page.getByRole('checkbox', { name: 'Select users on current page', exact: true });
    const size = page.getByRole('combobox', { name: 'Rows per page' });
    const ready = async count => { await page.waitForFunction(n => document.querySelectorAll('tbody input[type=checkbox]').length === n, count); };
    const selected = async n => { await page.getByRole('status').filter({ hasText: `${n} users selected across pages` }).waitFor(); };
    await ready(8);
    // Let the existing initial search debounce settle before navigating.
    await page.waitForTimeout(400);
    assert.deepEqual(await size.locator('option').allTextContents(), ['8','25','50','100','200','300']);
    await rows.nth(0).check(); await rows.nth(1).check(); await selected(2);
    assert.equal(await header.evaluate(e => e.indeterminate), true);
    await page.getByRole('button', { name: /Next/ }).click();
    await page.getByRole('checkbox', { name: 'Select user 9', exact: true }).waitFor();
    assert.equal(await header.isChecked(), false);
    await page.waitForFunction(() => !document.querySelector('input[aria-label="Select users on current page"]').indeterminate);
    await header.check(); await selected(10);
    await header.uncheck(); await selected(2);
    await rows.nth(0).check(); await selected(3);
    await page.getByRole('button', { name: /Prev/ }).click();
    await page.getByRole('checkbox', { name: 'Select user 1', exact: true }).waitFor();
    assert.equal(await rows.nth(0).isChecked(), true);
    const renderMs = {};
    for (const value of ['25','50','100','200','300']) {
      const start = Date.now(); await size.selectOption(value); await ready(Number(value));
      renderMs[value] = Date.now() - start;
      await selected(3);
      assert.equal(requests.at(-1).get('page_size'), value);
      assert.equal(requests.at(-1).get('page'), '1');
    }
    await page.getByPlaceholder('Search by name, email or contact...').fill('Other');
    await page.getByRole('checkbox', { name: 'Select user 1001', exact: true }).waitFor();
    await selected(3); assert.equal(await header.isChecked(), false);
    await page.getByPlaceholder('Search by name, email or contact...').fill('');
    await page.getByRole('checkbox', { name: 'Select user 1', exact: true }).waitFor();
    await page.getByRole('button', { name: /^Filters/ }).click();
    await page.locator('select').filter({ has: page.locator('option[value="unknown"]') }).selectOption('active');
    await page.getByRole('button', { name: 'Apply Filters', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Select user 1001', exact: true }).waitFor();
    await selected(3);
    await page.getByRole('button', { name: 'Clear All', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Select user 1', exact: true }).waitFor();
    await selected(3);
    await size.selectOption('8'); await ready(8); await selected(3);
    await page.getByRole('button', { name: /Create Audience from Selected/ }).click();
    await page.getByRole('textbox', { name: 'Audience Name' }).fill('Cross-page test');
    await page.getByRole('button', { name: 'Save Fixed Audience', exact: true }).click();
    await selected(0);
    assert.deepEqual(submitted.member_user_ids, [1,2,9]);
    await header.check(); await selected(8);
    await page.getByRole('button', { name: /Next/ }).click();
    await page.getByRole('checkbox', { name: 'Select user 9', exact: true }).check();
    await selected(9);
    await page.getByRole('button', { name: 'Clear Selection', exact: true }).click();
    await selected(0);
    assert.equal(await header.evaluate(e => e.indeterminate), false);
    assert.equal(await rows.nth(0).isChecked(), false);
    console.log('PASS: sizes, cross-page selection, page deselection, filters/search, clear, complete audience payload, indeterminate');
    console.log('Mocked local render timings (ms):', JSON.stringify(renderMs));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
