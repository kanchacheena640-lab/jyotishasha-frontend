// Local-only U1-U7 integration checks. Compile the existing mapping modules into
// .u6b-test-out first (commands in the U8 report). No duplicate filter semantics.
const assert = require('node:assert/strict');
require('@next/env').loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const { chromium } = require(process.env.U6B_PLAYWRIGHT || 'playwright');
const { EMPTY_BASIC_FILTERS, buildUsersQuery, YOG_LABELS, DOSH_LABELS } = require('../.u6b-test-out/usersApi.js');
const { appliedFiltersToCriteria } = require('../.u6b-test-out/audiencesApi.js');
const base = 'http://127.0.0.1:3000';
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    await context.route('**/*', route => ['localhost', '127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    for (const path of ['/api/admin/users', '/api/admin/users/970501', '/api/admin/users/asknow-concerns', '/api/admin/audiences']) {
      assert.equal((await context.request.get(base + path)).status(), 401, `Unauthenticated ${path}`);
    }
    assert.equal((await context.request.post(`${base}/api/admin/auth`, { data: { password: process.env.ADMIN_PASSWORD } })).status(), 200);
    const json = async path => {
      const response = await context.request.get(base + path);
      assert.equal(response.status(), 200, path);
      return response.json();
    };
    const full = await json('/api/admin/users/970501');
    const dasha = await json('/api/admin/users/970601');
    const history = await json('/api/admin/users/995400');
    const categories = (await json('/api/admin/users/asknow-concerns')).categories;
    const concern = history.ask_now.concerns.map(row => row.category).find(name => categories.includes(name));
    assert(concern, 'Existing active history category required');
    const birth = full.birth_astrology;
    const cases = [
      ['customer_type', { customerType: 'paying' }],
      ['Ask Now buyer', { askNowBuyer: true }],
      ['Ask Now concern', { askNowConcern: [concern] }],
      ['Moon Sign / Lagna', { moonSign: [birth.moon_sign], lagna: [birth.lagna] }],
      ['Mahadasha / Antardasha', { mahadasha: [dasha.birth_astrology.current_dasha.mahadasha], antardasha: [dasha.birth_astrology.current_dasha.antardasha] }],
      ['Sade Sati', { sadeSatiActive: 'true', sadeSatiPhase: ['1st Phase'] }],
      ['Saturn / Jupiter house', { saturnHouse: [birth.current_transits.planets.Saturn.house], jupiterHouse: [birth.current_transits.planets.Jupiter.house] }],
      ['Combined dimensions', { customerType: 'free', moonSign: [birth.moon_sign], lagna: [birth.lagna], sadeSatiActive: 'false', saturnHouse: [birth.current_transits.planets.Saturn.house] }],
      ['All Users', {}],
    ];
    for (const [label, patch] of cases) {
      const filters = { ...structuredClone(EMPTY_BASIC_FILTERS), ...patch };
      const list = await json(`/api/admin/users?${buildUsersQuery('', filters, 1, 100)}`);
      const response = await context.request.post(`${base}/api/admin/audiences/preview?page=1&page_size=100`, { data: { criteria: appliedFiltersToCriteria('', filters) } });
      assert.equal(response.status(), 200, label);
      const preview = await response.json();
      assert.equal(list.pagination.total_count, preview.member_count, `${label}: count parity`);
      assert.deepEqual(list.users.map(u => u.id).sort((a,b) => a-b), preview.users.map(u => u.id).sort((a,b) => a-b), `${label}: canonical IDs`);
      assert(list.pagination.total_count > 0, `${label}: representative nonempty coverage`);
      console.log(`PASS parity: ${label} (${preview.member_count} users)`);
    }
    const page = await context.newPage();
    page.setDefaultTimeout(30000);
    const requests = [];
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('request', request => {
      if (request.url().includes('/api/admin/')) {
        const url = new URL(request.url());
        assert.equal(url.origin, base, 'Admin browser requests use BFF');
        assert(!Object.keys(request.headers()).some(key => key.toLowerCase() === 'x-admin-bridge-key'));
        requests.push(url);
      }
    });
    const isUsers = url => new URL(url).pathname === '/api/admin/users';
    const waitList = async action => {
      const pending = page.waitForResponse(r => isUsers(r.url()) && r.status() === 200);
      await action();
      const response = await pending;
      await page.getByText(/\d+ users found/).waitFor();
      return { data: await response.json(), params: new URL(response.url()).searchParams };
    };
    await waitList(() => page.goto(`${base}/admin/users`));
    assert.equal(await page.locator('thead th').count(), 8);
    assert.deepEqual((await page.locator('thead th').allTextContents()).slice(1).map(s => s.trim()), ['User', 'Age', 'Status', 'Customer', 'Subscription', 'Last Active', 'View']);
    const next = await waitList(() => page.getByRole('button', { name: /Next/ }).click());
    assert.equal(next.params.get('page'), '2');
    const search = page.getByPlaceholder(/Search.*name/i);
    const searched = await waitList(() => search.fill('Visual QA -- Full Astrology'));
    assert.equal(searched.params.get('page'), '1');
    assert.equal(searched.data.users[0].id, 970501);
    await waitList(() => search.fill(''));
    const openFilters = () => page.getByRole('button', { name: /^Filters/ }).click();
    await openFilters();
    await page.getByPlaceholder('Search concern...').waitFor();
    const beforeDraft = requests.filter(url => isUsers(url.href)).length;
    await page.locator('input[type=number]').first().fill('99');
    await page.getByRole('button', { name: /^Close/ }).click();
    // A stable request window catches accidental fetches/debounce from draft edits.
    await page.waitForTimeout(500);
    assert.equal(requests.filter(url => isUsers(url.href)).length, beforeDraft);
    await openFilters();
    assert.equal(await page.locator('input[type=number]').first().inputValue(), '');
    const labeled = label => page.locator('label').filter({ hasText: new RegExp(`^${label}$`) }).locator('..');
    const section = title => page.getByText(title, { exact: true }).first().locator('..').locator('..');
    const choose = async (container, value) => container.getByRole('button', { name: value, exact: true }).click();
    const expected = { ...structuredClone(EMPTY_BASIC_FILTERS), ageMin: '0', ageMax: '120', status: 'unknown', signupFrom: '2000-01-01', signupTo: '2099-12-31', customerType: 'paying', askNowBuyer: true, activeSubscription: true,
      moonSign: [birth.moon_sign], lagna: [birth.lagna], nakshatra: [birth.nakshatra], nakshatraPada: [birth.nakshatra_pada], yog: [Object.keys(birth.static_yog)[0]], dosh: [Object.keys(birth.static_dosh)[0]],
      mahadasha: ['Saturn'], antardasha: ['Venus'], sadeSatiActive: 'false', sadeSatiPhase: ['1st Phase'], jupiterHouse: [1], saturnHouse: [2], rahuHouse: [3], ketuHouse: [4], askNowConcern: [concern] };
    await labeled('Age min').locator('input').fill(expected.ageMin);
    await labeled('Age max').locator('input').fill(expected.ageMax);
    await labeled('Status').locator('select').selectOption(expected.status);
    await labeled('Signup from').locator('input').fill(expected.signupFrom);
    await labeled('Signup to').locator('input').fill(expected.signupTo);
    await labeled('Free / Paying').locator('select').selectOption(expected.customerType);
    await page.getByRole('checkbox', { name: 'Ask Now Buyer', exact: true }).check();
    await page.getByRole('checkbox', { name: 'Active Subscription', exact: true }).check();
    for (const [label, value] of [['Moon Sign / Rashi', birth.moon_sign], ['Lagna / Ascendant', birth.lagna], ['Nakshatra', birth.nakshatra], ['Nakshatra Pada', `Pada ${birth.nakshatra_pada}`]]) await choose(labeled(label), value);
    for (const [title, value] of [['Yog', YOG_LABELS[expected.yog[0]]], ['Dosh', DOSH_LABELS[expected.dosh[0]]], ['Mahadasha', 'Saturn'], ['Antardasha', 'Venus'], ['Sade Sati Phase', '1st Phase'], ['Ask Now Concern', concern]]) await choose(section(title), value);
    await section('Sade Sati Status').locator('select').selectOption('false');
    for (const [index, planet] of ['Jupiter', 'Saturn', 'Rahu', 'Ketu'].entries()) await choose(labeled(`${planet} House`), `House ${index + 1}`);
    assert.equal(requests.filter(url => isUsers(url.href)).length, beforeDraft, 'All unapplied controls remain draft-only');
    const applied = await waitList(() => page.getByRole('button', { name: 'Apply Filters', exact: true }).click());
    assert.equal(applied.params.toString(), buildUsersQuery('', expected, 1, 8), 'All filter controls serialized by existing query builder');
    await page.getByText('No users match these filters.', { exact: true }).waitFor();
    const chip = page.locator('span.inline-flex').filter({ hasText: `Moon Sign: ${birth.moon_sign}` });
    const removed = await waitList(() => chip.getByRole('button').click());
    assert.equal(removed.params.has('moon_sign'), false);
    assert.equal(removed.params.get('page'), '1');
    await waitList(() => page.getByRole('button', { name: 'Clear All', exact: true }).click());
    // Practical loading/error/empty cases use response interception only.
    let release;
    const hold = new Promise(resolve => { release = resolve; });
    await page.route('**/api/admin/users?*', async route => { await hold; await route.fulfill({ status: 503, json: { message: 'U8 controlled list failure' } }); });
    await page.goto(`${base}/admin/users`);
    await page.locator('tbody .animate-pulse').first().waitFor();
    release();
    await page.getByText('U8 controlled list failure', { exact: true }).waitFor();
    await page.unroute('**/api/admin/users?*');
    await waitList(() => page.getByRole('button', { name: 'Retry', exact: true }).click());
    await waitList(() => search.fill('U8-no-such-user-921e09'));
    await page.getByText('No users match these filters.', { exact: true }).waitFor();
    await waitList(() => search.fill(''));
    assert.equal(requests.filter(url => /^\/api\/admin\/users\/\d+$/.test(url.pathname)).length, 0, 'No per-user requests on Users list');
    requests.length = 0;
    await page.getByRole('link', { name: 'Audiences', exact: true }).click();
    await page.getByRole('heading', { name: 'Audiences', exact: true }).waitFor();
    await page.waitForTimeout(500);
    assert.equal(requests.filter(url => url.pathname.includes('preview')).length, 0);
    for (const [name, path] of [['Orders', '/admin'], ['App Version', '/admin/app-version'], ['Users', '/admin/users']]) {
      await page.getByRole('link', { name, exact: true }).click();
      await page.waitForURL(base + path);
    }
    assert.deepEqual(pageErrors, []);
    console.log('PASS: Users pagination/search/loading/error/retry/empty; every filter control; draft cancellation/no fetch; Apply/query parity; chip removal/page reset; BFF browser boundary; no per-user calls or audience list previews; four Admin destinations. No persisted fixtures.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.stack); process.exit(1); });
