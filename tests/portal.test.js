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
assert.ok(common.includes('Metrics'), 'dashboard metric helper should exist');
assert.ok(common.includes('Auth'), 'auth helper should exist');

const admin = fs.readFileSync('admin.html', 'utf8');
assert.ok(admin.includes('관리 필요'), 'admin dashboard should show attention workflow');
assert.ok(admin.includes('이번 주 업로드 운영 큐'), 'admin dashboard should show weekly upload queue');
assert.ok(admin.includes('고객명 수정'), 'admin dashboard should allow editing customer names');
assert.ok(admin.includes('saveCustomerName'), 'admin dashboard should persist customer name edits');

console.log('portal static checks passed');
