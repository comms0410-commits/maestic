import assert from 'node:assert/strict';
import fs from 'node:fs';

const requiredFiles = [
  'index.html', 'admin.html', 'admin-customers.html', 'admin-pick.html', 'admin-script.html',
  'admin-prompt.html', 'admin-notify.html', 'customer.html', 'customer-pick.html', 'customer-script.html',
  'css/style.css', 'js/common.js'
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `${file} should exist`);
}

const common = fs.readFileSync('js/common.js', 'utf8');
assert.ok(common.includes('법무법인오현'), 'seed data should include provided customer operations data');
assert.ok(common.includes('부산광역시'), 'seed data should include performance memo customer');
assert.ok(common.includes('contract_pending'), 'contract-pending customer state should exist');
assert.ok(common.includes('week5_done'), 'monthly status should include week 5 production counts');
assert.ok(common.includes('pick_submissions'), 'customer article pick submissions should be stored');
assert.ok(common.includes('OpenAISettings'), 'OpenAI API key helper should exist');
assert.ok(common.includes('Notifier'), 'notification helper should exist');

const admin = fs.readFileSync('admin.html', 'utf8');
assert.ok(admin.includes('고객명 수정'), 'admin dashboard should allow editing customer names');
assert.ok(admin.includes('장기 미계약 삭제'), 'admin dashboard should support long-uncontracted deletion');
assert.ok(admin.includes('계약대기'), 'admin dashboard should support contract-pending classification');

const customerManagement = fs.readFileSync('admin-customers.html', 'utf8');
assert.ok(common.includes('function getMonthOptions(startYear = 2026') && customerManagement.includes('getMonthOptions'), 'customer management should use dynamic month options from 2026');
assert.ok(customerManagement.includes('월 완료(1~5주차 합산)'), 'monthly completion should be the sum of weeks 1-5');
assert.ok(customerManagement.includes('PRODUCT_TYPES'), 'customer management should use the product type list');

const prompt = fs.readFileSync('admin-prompt.html', 'utf8');
assert.ok(prompt.includes('OpenAI API Key'), 'prompt page should include OpenAI API key input');
assert.ok(prompt.includes('연결 테스트'), 'prompt page should include API connection test');
assert.ok(prompt.includes('article_read_failed'), 'prompt page should notify when article links cannot be read');
assert.ok(!prompt.includes('Claw Webhook URL'), 'Claw webhook fields should be removed');
assert.ok(!prompt.includes('LINE Webhook URL'), 'LINE webhook URL fields should be removed');
assert.ok(!prompt.includes('LINE Access Token'), 'LINE access token fields should be removed');
assert.ok(!prompt.includes('금지표현'), 'restricted-expression field should be removed');

const adminNotify = fs.readFileSync('admin-notify.html', 'utf8');
assert.ok(adminNotify.includes('<h1>알림</h1>'), 'notification page should be labeled as notifications only');
assert.ok(!adminNotify.includes('Webhook'), 'notification page should not mention webhook');

const customerPick = fs.readFileSync('customer-pick.html', 'utf8');
assert.ok(customerPick.includes('process_completed'), 'customer pick final submission should be marked process completed');
assert.ok(customerPick.includes('direct_urls'), 'customer direct article URLs should be submitted');

console.log('portal static checks passed');
