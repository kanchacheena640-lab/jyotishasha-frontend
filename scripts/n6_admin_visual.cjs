// N6 History/Monitor browser visual QA with synthetic in-memory BFF
// responses. Backend logic proven separately (test_notification_
// campaign_n6.py against verified local PostgreSQL). No real backend/
// Firebase/production reached here -- every same-origin request,
// including this app's own BFF routes, is intercepted before it ever
// leaves the browser context.
const {chromium}=require('C:/Users/Laptop gallery/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const out=require('node:path').resolve(__dirname,'../.n6-visual');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1365,height:900}});
 let checks=0;
 const check=(condition,label)=>{assert(condition,label);checks++;console.log('PASS '+label);};

 const historyRows=[
  {id:'c1',title:'हिन्दी में शीर्षक — Diwali Offer 🎉',state:'COMPLETED',hold_reason:null,saved_audience_id:1,
   execution_id:'e1',execution_state:'COMPLETED',scheduled_for:null,target_count:5,
   created_at:'2026-09-01T10:00:00Z',updated_at:'2026-09-01T10:05:00Z',created_by:1},
  {id:'c2',title:'Scheduled reminder',state:'SCHEDULED',hold_reason:null,saved_audience_id:1,
   execution_id:'e2',execution_state:'SCHEDULED',scheduled_for:'2026-09-10T09:00:00Z',target_count:null,
   created_at:'2026-09-02T10:00:00Z',updated_at:'2026-09-02T10:00:00Z',created_by:1},
  {id:'c3',title:'Blocked ceiling test',state:'FAILED',hold_reason:'SAFETY_CEILING_EXCEEDED',saved_audience_id:1,
   execution_id:'e3',execution_state:'BLOCKED',scheduled_for:'2026-09-03T09:00:00Z',target_count:0,
   created_at:'2026-09-03T09:00:00Z',updated_at:'2026-09-03T09:05:00Z',created_by:1},
  {id:'c4',title:'Draft not yet sent',state:'DRAFT',hold_reason:null,saved_audience_id:1,
   execution_id:null,execution_state:null,scheduled_for:null,target_count:null,
   created_at:'2026-09-04T09:00:00Z',updated_at:'2026-09-04T09:00:00Z',created_by:1},
 ];

 const monitorDetail={
  id:'e1',campaign_id:'c1',state:'COMPLETED',hold_reason:null,approved_saved_audience_id:1,
  campaign:{id:'c1',title:'हिन्दी में शीर्षक — Diwali Offer 🎉',body:'यह एक परीक्षण संदेश है।',state:'COMPLETED',created_by:1},
  baseline:{generated_at:'2026-09-01T10:00:00Z',matched_user_count:5,eligible_recipient_count:5,recorded_at:'2026-09-01T10:00:00Z'},
  resolved:{matched_user_count:5,eligible_recipient_count:5,excluded_recipient_count:0,exclusion_counts:{}},
  all_users_confirmed:false,large_audience_acknowledged:false,
  target_count:5,delivery_counts:{PENDING:0,ACCEPTED:3,FAILED_RETRYABLE:0,FAILED_PERMANENT:1,UNKNOWN:1,SUPPRESSED:0},
  scheduled_for:null,expires_at:null,dispatch_started_at:'2026-09-01T10:00:05Z',
  frozen_at:'2026-09-01T10:00:05Z',started_at:'2026-09-01T10:00:06Z',completed_at:'2026-09-01T10:00:20Z',
  created_at:'2026-09-01T10:00:00Z',updated_at:'2026-09-01T10:00:20Z',
  metrics:{target_count:5,delivery_counts:{PENDING:0,ACCEPTED:3,FAILED_RETRYABLE:0,FAILED_PERMANENT:1,UNKNOWN:1,SUPPRESSED:0},
   notification_opened_count:2,destination_opened_count:1,open_rate:0.6667,destination_rate:0.5,
   conversion_count:0,conversion_rate:'UNKNOWN'},
 };

 const deliveries=[
  {id:'d1',user_id:101,app_user_id:201,status:'ACCEPTED',suppression_reason:null,attempt_count:1,next_attempt_at:null,first_attempted_at:'2026-09-01T10:00:06Z',last_attempted_at:'2026-09-01T10:00:06Z',accepted_at:'2026-09-01T10:00:06Z'},
  {id:'d2',user_id:102,app_user_id:202,status:'FAILED_PERMANENT',suppression_reason:null,attempt_count:4,next_attempt_at:null,first_attempted_at:'2026-09-01T10:00:06Z',last_attempted_at:'2026-09-01T10:04:00Z',accepted_at:null},
  {id:'d3',user_id:103,app_user_id:203,status:'UNKNOWN',suppression_reason:null,attempt_count:1,next_attempt_at:null,first_attempted_at:'2026-09-01T10:00:06Z',last_attempted_at:'2026-09-01T10:00:06Z',accepted_at:null},
 ];
 const attempts=[
  {attempt_number:1,started_at:'2026-09-01T10:00:06Z',finished_at:'2026-09-01T10:00:07Z',outcome:'FAILED_RETRYABLE',provider:'no_send',error_code:'SIMULATED_TRANSIENT',error_class:'retryable'},
  {attempt_number:2,started_at:'2026-09-01T10:00:36Z',finished_at:'2026-09-01T10:00:37Z',outcome:'FAILED_RETRYABLE',provider:'no_send',error_code:'SIMULATED_TRANSIENT',error_class:'retryable'},
  {attempt_number:3,started_at:'2026-09-01T10:02:37Z',finished_at:'2026-09-01T10:02:38Z',outcome:'FAILED_RETRYABLE',provider:'no_send',error_code:'SIMULATED_TRANSIENT',error_class:'retryable'},
  {attempt_number:4,started_at:'2026-09-01T10:04:38Z',finished_at:'2026-09-01T10:04:39Z',outcome:'FAILED_RETRYABLE',provider:'no_send',error_code:'RETRY_EXHAUSTED',error_class:'retryable'},
 ];

 await context.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(!['localhost','127.0.0.1'].includes(url.hostname))return route.abort();
  const p=url.pathname; const method=route.request().method(); let body;
  if(p==='/api/admin/auth')body={authenticated:true};
  else if(p==='/api/admin/notifications/history'&&method==='GET'){
   const state=url.searchParams.get('state');
   const search=(url.searchParams.get('search')||'').toLowerCase();
   let rows=historyRows;
   if(state)rows=rows.filter(r=>r.state===state);
   if(search)rows=rows.filter(r=>r.title.toLowerCase().includes(search));
   body={campaigns:rows,pagination:{page:1,page_size:20,total_count:rows.length,total_pages:1}};
  }
  else if(/^\/api\/admin\/notifications\/c1\/monitor$/.test(p)&&method==='GET')body=monitorDetail;
  else if(/^\/api\/admin\/notifications\/executions\/e1\/deliveries$/.test(p)&&method==='GET'){
   const status=url.searchParams.get('status');
   let rows=deliveries;
   if(status)rows=rows.filter(d=>d.status===status);
   body={deliveries:rows,pagination:{page:1,page_size:20,total_count:rows.length,total_pages:1}};
  }
  else if(/^\/api\/admin\/notifications\/deliveries\/d2\/attempts$/.test(p)&&method==='GET')
   body={delivery_id:'d2',status:'FAILED_PERMANENT',attempts};
  else if(/^\/api\/admin\/notifications\/deliveries\/[^/]+\/attempts$/.test(p)&&method==='GET')
   body={delivery_id:p.split('/')[5],status:'ACCEPTED',attempts:[]};
  if(body!==undefined)return route.fulfill({json:body});
  return route.continue();
 });

 const page=await context.newPage(); page.setDefaultTimeout(30000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const shot=async name=>{await page.waitForTimeout(250);return page.screenshot({path:`${out}/${name}.png`,fullPage:true});};

 try{
  // 1. History list -- desktop.
  await page.goto('http://127.0.0.1:3000/admin/notifications/history');
  await page.getByRole('heading',{name:'Campaign History'}).waitFor();
  await shot('01-history-list-desktop');
  check((await page.locator('body').innerText()).includes('COMPLETED'),'COMPLETED state rendered');
  check((await page.locator('body').innerText()).includes('SCHEDULED'),'SCHEDULED state rendered');
  check((await page.locator('body').innerText()).includes('Delivered')===false,'History list never says "Delivered"');
  check(await page.getByRole('link',{name:'Monitor'}).count()>0,'Monitor link present for executed campaigns');
  check(await page.locator('a',{hasText:'Monitor'}).nth(0).isVisible(),'Monitor link visible');

  // 2. Filter by state.
  await page.getByLabel('Filter by state').selectOption('DRAFT');
  await page.getByText('Draft not yet sent').waitFor();
  await shot('02-history-filtered-draft');
  check((await page.locator('body').innerText()).includes('Scheduled reminder')===false,'state filter excludes non-matching rows');
  await page.getByLabel('Filter by state').selectOption('');

  // 3. Search.
  await page.getByPlaceholder('Search by title…').fill('Diwali');
  await page.getByText('Diwali Offer').waitFor();
  await shot('03-history-search');
  check((await page.locator('body').innerText()).includes('Scheduled reminder')===false,'search excludes non-matching rows');
  await page.getByPlaceholder('Search by title…').fill('');

  // 4. Monitor detail -- metrics contract, never "Delivered".
  await page.goto('http://127.0.0.1:3000/admin/notifications/history/c1');
  await page.getByText('Execution status',{exact:false}).first().waitFor().catch(()=>{});
  await page.getByText('Accepted by push provider').first().waitFor();
  await shot('04-monitor-detail-desktop');
  const bodyText=(await page.locator('body').innerText());
  check(bodyText.includes('Delivered')===false,'Monitor detail never says "Delivered"');
  check(bodyText.includes('Accepted by push provider'),'Monitor detail uses "Accepted by push provider"');
  check(bodyText.includes('Unknown (no confirmed outcome)'),'UNKNOWN shown as its own distinct label');
  check(bodyText.includes('Notification opened'),'notification_opened metric shown');
  check(bodyText.includes('Destination opened'),'destination_opened metric shown, distinct from notification_opened');
  check(bodyText.includes('UNKNOWN / NOT AVAILABLE'),'a zero-denominator rate renders UNKNOWN, never a fabricated 0%');
  check(bodyText.includes('66.7%'),'a computed rate renders as a real percentage');

  // 5. Deliveries table + attempt expansion (retry contract visible).
  await shot('05-monitor-deliveries-table');
  check(bodyText.toLowerCase().includes('deliveries'),'deliveries table section present');
  await page.locator('tr',{hasText:'102'}).getByRole('button',{name:'Attempts'}).click();
  await page.getByText('RETRY_EXHAUSTED').waitFor();
  await shot('06-monitor-attempts-expanded');
  check((await page.locator('body').innerText()).includes('RETRY_EXHAUSTED'),'exhausted retry reason shown from real attempt data, not fabricated');

  // 6. Filter deliveries by status.
  await page.getByLabel('Filter deliveries by status').selectOption('UNKNOWN');
  await page.waitForTimeout(300);
  await shot('07-monitor-deliveries-filtered-unknown');
  check((await page.locator('body').innerText()).includes('103'),'UNKNOWN-status delivery still shown when filtered');

  // 7. Mobile viewport -- history list + monitor detail.
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:3000/admin/notifications/history');
  await page.getByRole('heading',{name:'Campaign History'}).waitFor();
  await shot('08-mobile-history-list');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile history list has no page overflow');
  await page.goto('http://127.0.0.1:3000/admin/notifications/history/c1');
  await page.getByText('Accepted by push provider').first().waitFor();
  await shot('09-mobile-monitor-detail');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile monitor detail has no page overflow');

  // 8. AdminNav shows History as its own distinct, correctly-highlighted link.
  await page.setViewportSize({width:1365,height:900});
  await page.goto('http://127.0.0.1:3000/admin/notifications/history');
  await shot('10-admin-nav-history-active');
  const navLinks=await page.locator('nav a').allTextContents();
  check(navLinks.includes('History'),'AdminNav includes a History link');
  check(navLinks.includes('Notifications'),'AdminNav still includes the original Notifications link');

  check(errors.length===0,'no browser runtime errors ('+errors.join('; ')+')');
  fs.writeFileSync(`${out}/results.json`,JSON.stringify({checks,failed:0,mode:'synthetic BFF responses; actual local Admin UI',screenshots:fs.readdirSync(out).filter(x=>x.endsWith('.png'))},null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
