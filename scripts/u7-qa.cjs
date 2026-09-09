const assert = require('node:assert/strict');
require('@next/env').loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const { chromium } = require(process.env.U6B_PLAYWRIGHT || 'playwright');
const base = 'http://127.0.0.1:3000';
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    await context.route('**/*', route => ['127.0.0.1', 'localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    assert.equal((await context.request.post(`${base}/api/admin/auth`, { data: { password: process.env.ADMIN_PASSWORD } })).status(), 200);
    const response = await context.request.get(`${base}/api/admin/users?page=1&page_size=100`);
    assert.equal(response.status(), 200);
    const list = await response.json();
    const fixtures = [];
    for (const user of list.users) {
      const response = await context.request.get(`${base}/api/admin/users/${user.id}`);
      assert.equal(response.status(), 200);
      const data = await response.json();
      fixtures.push(data);
      if (process.argv.includes('--discover')) console.log(JSON.stringify({ id: user.id, name: data.identity.name, moon: data.birth_astrology.moon_sign, dasha: data.birth_astrology.current_dasha, sade_sati: data.birth_astrology.sade_sati, resolved_at: data.birth_astrology.current_transits?.resolved_at, concerns: data.ask_now?.concerns.length }));
    }
    if (process.argv.includes('--discover')) return;
    const page = await context.newPage();
    page.setDefaultTimeout(60000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];
    const open = async id => {
      const response = page.waitForResponse(r => r.url() === `${base}/api/admin/users/${id}` && r.status() === 200);
      await page.goto(`${base}/admin/users/${id}`);
      await page.getByRole('region', { name: 'Identity', exact: true }).waitFor();
      return (await response).json();
    };
    for (const storedFixture of fixtures) {
      const fixture = await open(storedFixture.identity.id);
      assert.deepEqual(await page.getByRole('heading', { level: 2 }).allTextContents(), ['Identity', 'Customer', 'Birth Astrology', 'Ask Now Intelligence', 'Current Astrology', 'Current Transits']);
      const body = await page.locator('body').innerText();
      assert(!/Invalid Date|Coming in U3\/U4\/U5|Additional current\/upcoming/.test(body));
      const birth = page.getByRole('region', { name: 'Birth Astrology', exact: true });
      assert(!/Current Dasha|Sade Sati|Transit snapshot/.test(await birth.innerText()));
      for (const value of [fixture.birth_astrology.moon_sign, fixture.birth_astrology.lagna, fixture.birth_astrology.nakshatra]) {
        if (value) assert((await birth.innerText()).includes(value));
      }
      const current = page.getByRole('region', { name: 'Current Astrology', exact: true });
      const currentText = await current.innerText();
      const dasha = fixture.birth_astrology.current_dasha;
      if (dasha) {
        assert(currentText.includes(`Current Mahadasha: ${dasha.mahadasha}`));
        assert(currentText.includes(`Current Antardasha: ${dasha.antardasha}`));
      } else assert(currentText.includes('Not calculated'));
      const sade = fixture.birth_astrology.sade_sati;
      if (sade) assert(currentText.includes(`Status: ${sade.active ? 'Active' : 'Inactive'}`));
      if (sade?.active) assert(currentText.includes(`Phase: ${sade.phase}`));
      const rows = page.getByRole('table', { name: 'Current transits', exact: true }).locator('tbody tr');
      assert.equal(await rows.count(), 9);
      for (let i = 0; i < planets.length; i++) {
        const cells = await rows.nth(i).locator('td').allTextContents();
        const data = fixture.birth_astrology.current_transits.planets[planets[i]];
        assert.equal(cells[0], planets[i]);
        assert.equal(cells[1], data.rashi ?? '—');
        assert.equal(cells[2].trim(), data.house == null ? 'Not calculated' : `House ${data.house}`);
        assert.equal(cells[3], data.degree == null ? '—' : `${data.degree.toFixed(2)}°`);
        assert.equal(cells[4], data.motion ?? '—');
      }
      const ask = page.getByRole('region', { name: 'Ask Now Intelligence', exact: true });
      if (!fixture.ask_now.concerns.length) assert((await ask.innerText()).includes('No Ask Now concern history yet.'));
      else {
        assert.equal(await ask.locator('tbody tr').count(), fixture.ask_now.concerns.length);
        for (const entry of fixture.ask_now.concerns) assert((await ask.innerText()).includes(entry.category));
      }
    }
    // Controlled response-only cases: no fixture or database mutations.
    const mock = structuredClone(fixtures[0]);
    mock.identity.email = `${'long'.repeat(35)}@example.test`;
    mock.identity.signup_date = 'malformed';
    mock.identity.last_active_at = null;
    mock.ask_now = null;
    mock.birth_astrology.current_dasha = null;
    mock.birth_astrology.sade_sati = null;
    const mockPath = `**/api/admin/users/${mock.identity.id}`;
    for (const timestamp of [null, 'malformed', '2026-09-07 18:30:22 IST']) {
      mock.birth_astrology.current_transits.resolved_at = timestamp;
      await page.route(mockPath, route => route.fulfill({ json: mock }));
      await open(mock.identity.id);
      const expected = timestamp?.endsWith('IST') ? '07 Sept 2026, 18:30:22 IST' : 'Unavailable';
      await page.getByText(`Transit snapshot: ${expected}`, { exact: true }).waitFor();
      assert(!(await page.locator('body').innerText()).includes('Invalid Date'));
      await page.getByText('Ask Now data unavailable.', { exact: true }).waitFor();
      await page.setViewportSize({ width: 375, height: 812 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'No page overflow with long email');
      await page.unroute(mockPath);
    }
    mock.birth_astrology.current_transits = null;
    await page.route(mockPath, route => route.fulfill({ json: mock }));
    await open(mock.identity.id);
    await page.getByText('Current transit data unavailable.', { exact: true }).waitFor();
    await page.unroute(mockPath);
    for (const width of [1440, 768, 375]) {
      await page.setViewportSize({ width, height: 1000 });
      await open(970501);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `No page overflow at ${width}`);
      await page.screenshot({ path: `.u6b-u7-customer-${width}.png`, fullPage: true });
    }
    await page.goto(`${base}/admin/users`);
    await page.getByText(/\d+ users found/).waitFor();
    const headers = await page.locator('thead th').allTextContents();
    assert.equal(headers.length, 8);
    assert.deepEqual(headers.slice(1).map(s => s.trim()), ['User', 'Age', 'Status', 'Customer', 'Subscription', 'Last Active', 'View']);
    await page.getByRole('link', { name: 'Saved Audiences', exact: true }).click();
    await page.waitForURL(`${base}/admin/audiences`);
    await page.getByRole('heading', { name: 'Audiences', exact: true }).waitFor();
    assert.deepEqual(errors, []);
    console.log(`PASS: ${fixtures.length} real local Customer 360 fixtures; backend-derived data and all nine planets; null/malformed fallbacks; Ask Now history/empty states; Dasha/Sade Sati states; no obsolete card; responsive overflow checks; Users columns and U6 navigation. No database writes. Human visual review pending.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message); process.exit(1); });
