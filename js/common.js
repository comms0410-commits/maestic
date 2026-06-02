// ============================================================
// Maestic 고객 운영 포털 - 공통 데이터/인증/렌더링 유틸리티
// ============================================================
const STORAGE_KEY = 'maestic_portal_state_v3';
const SESSION_KEY = 'maestic_session';
const OPENAI_KEY = 'maestic_openai_api_key';

const PRODUCT_TYPES = ['콘텐츠형', '성장형', '제휴형', '기업형'];
const CURRENT_DATE = new Date('2026-06-02T00:00:00Z');

const INITIAL_STATE = {
  customers: [
    { id: 'c001', customer_no: '001', customer_name: '아비뜨', product_type: '콘텐츠형', monthly_fee: 990000, contract_round: '-', contract_renewed: true, pending_months: 0, monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 5, produced_total: '-', reservation_status: 'Y', subscribers: 1295, public_note: '월~금 예약 업로드 정상 진행', internal_note: '', pin_hash: '1234', status: 'active' },
    { id: 'c011', customer_no: '011', customer_name: '법무법인오현', product_type: '콘텐츠형', monthly_fee: 990000, contract_round: '-', contract_renewed: false, pending_months: 1, monthly_quota: 0, weekly_target: '요청시', weekly_target_count: 0, upload_cycle: '검수후', produced_this_week: null, produced_total: '-', reservation_status: '미진행', subscribers: 3652, public_note: '검수 대기 중', internal_note: '약 2주간, 미검수 및 뉴스픽 미진행', pin_hash: '1234', status: 'contract_pending' },
    { id: 'c012', customer_no: '012', customer_name: '뉴스톡', product_type: '성장형', monthly_fee: 1320000, contract_round: '17', contract_renewed: true, pending_months: 0, monthly_quota: 8, weekly_target: '2개', weekly_target_count: 2, upload_cycle: '화, 금', produced_this_week: 2, produced_total: '6', reservation_status: 'Y', subscribers: 13630, public_note: '화/금 주 2회 예약 업로드', internal_note: '', pin_hash: '1234', status: 'active' },
    { id: 'c017', customer_no: '017', customer_name: '엘사국제학교', product_type: '제휴형', monthly_fee: 0, contract_round: '7', contract_renewed: true, pending_months: 0, monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 5, produced_total: '20(완)', reservation_status: 'Y', subscribers: 154682, public_note: '회차 마감', internal_note: '회차마감', pin_hash: '1234', status: 'active' },
    { id: 'c018', customer_no: '018', customer_name: '한석준', product_type: '제휴형', monthly_fee: 0, contract_round: '-', contract_renewed: false, pending_months: 4, monthly_quota: 0, weekly_target: '요청시', weekly_target_count: 0, upload_cycle: '월~금', produced_this_week: null, produced_total: '-', reservation_status: '미진행', subscribers: 71675, public_note: '요청 시 제작', internal_note: '장기간 미계약 고객 - 삭제 검토 대상', pin_hash: '1234', status: 'contract_pending' },
    { id: 'c020', customer_no: '020', customer_name: '법무법인진솔', product_type: '성장형', monthly_fee: 1320000, contract_round: '3', contract_renewed: false, pending_months: 2, monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '검수후', produced_this_week: null, produced_total: '15', reservation_status: '미진행', subscribers: 1295, public_note: '검수 후 업로드', internal_note: '성장알고리즘 적용시점', pin_hash: '1234', status: 'contract_pending' },
    { id: 'c021', customer_no: '021', customer_name: '도서출판크레타', product_type: '성장형', monthly_fee: 1320000, contract_round: '-', contract_renewed: true, pending_months: 0, monthly_quota: 8, weekly_target: '2개', weekly_target_count: 2, upload_cycle: '화, 금', produced_this_week: 2, produced_total: '8', reservation_status: 'Y', subscribers: 8200, public_note: '신간/저자 콘텐츠 중심 운영', internal_note: 'README 초기 고객 기준 추가', pin_hash: '1234', status: 'active' },
    { id: 'c000', customer_no: '000', customer_name: '책책책', product_type: '성장형', monthly_fee: 1320000, contract_round: '-', contract_renewed: true, pending_months: 0, monthly_quota: 40, weekly_target: '10개', weekly_target_count: 10, upload_cycle: '월~금', produced_this_week: 10, produced_total: '-', reservation_status: 'Y', subscribers: 13601, public_note: '주 10개 집중 운영', internal_note: '', pin_hash: '1234', status: 'active' },
    { id: 'c022', customer_no: '022', customer_name: '부산광역시', product_type: '기업형', monthly_fee: 2500000, contract_round: '1', contract_renewed: true, pending_months: 0, monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 4, produced_total: '18(완)', reservation_status: 'Y', subscribers: 56604, public_note: '알고리즘 적용 후 신규 구독자 증가', internal_note: '알고리즘 적용완료(신규 구독자 약 300명 증가)', pin_hash: '1234', status: 'active' },
    { id: 'c023', customer_no: '023', customer_name: '글로비세무', product_type: '제휴형', monthly_fee: 0, contract_round: '1', contract_renewed: true, pending_months: 0, monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 5, produced_total: '15', reservation_status: 'Y', subscribers: 7, public_note: '제휴 콘텐츠형 3개월 진행', internal_note: '제휴(콘텐츠형) 3개월 진행, 미리 고지', pin_hash: '1234', status: 'active' }
  ],
  monthly_status: [],
  article_recommendations: [
    { id: 'r1', customer_no: '011', week: 1, title: '법률 이슈 뉴스픽 후보', url: 'https://example.com/law-news', status: 'recommended', created_at: Date.now() - 86400000 },
    { id: 'r2', customer_no: '022', week: 1, title: '부산시 정책 숏폼 후보', url: 'https://example.com/busan-policy', status: 'confirmed', created_at: Date.now() - 172800000 }
  ],
  pick_submissions: [],
  scripts: [
    { id: 's1', customer_no: '012', title: '뉴스톡 화요일 쇼츠 대본', version: 1, status: 'reviewing', body: '핵심 이슈를 30초 안에 전달하는 쇼츠 대본 초안입니다.', source_url: '', updated_at: Date.now() - 3600000 },
    { id: 's2', customer_no: '022', title: '부산광역시 알고리즘 성과 대본', version: 2, status: 'approved', body: '신규 구독자 증가 성과를 소개하는 대본입니다.', source_url: 'https://example.com/busan-policy', updated_at: Date.now() - 7200000 }
  ],
  notifications: [],
  prompts: {}
};

function clone(value) { return JSON.parse(JSON.stringify(value)); }

function getMonthOptions(startYear = 2026, startMonth = 1, endDate = CURRENT_DATE) {
  const options = [];
  for (let year = startYear; year <= endDate.getUTCFullYear(); year += 1) {
    const monthStart = year === startYear ? startMonth : 1;
    const monthEnd = year === endDate.getUTCFullYear() ? endDate.getUTCMonth() + 1 : 12;
    for (let month = monthStart; month <= monthEnd; month += 1) {
      options.push({ value: `${year}-${String(month).padStart(2, '0')}`, label: `${year}년 ${month}월`, year, month });
    }
  }
  return options;
}

function sumWeeklyDone(record) {
  return [1, 2, 3, 4, 5].reduce((sum, week) => sum + Number(record[`week${week}_done`] || 0), 0);
}

function seedMonthlyStatus(state) {
  state.monthly_status ||= [];
  state.customers.forEach((customer) => {
    getMonthOptions().forEach(({ year, month }) => {
      const exists = state.monthly_status.some((item) => item.customer_no === customer.customer_no && item.year === year && item.month === month);
      if (exists) return;
      const isMarchWeek = year === 2026 && month === 3;
      const record = {
        id: `m-${customer.customer_no}-${year}-${month}`,
        customer_no: customer.customer_no,
        year,
        month,
        total_target: customer.monthly_quota,
        total_completed: 0,
        week1_info: isMarchWeek ? customer.upload_cycle : '운영 예정',
        week1_done: isMarchWeek ? customer.produced_this_week || 0 : 0,
        week2_info: customer.reservation_status === 'Y' ? '예약 업로드 예정' : '검수/요청 확인 필요',
        week2_done: 0,
        week3_info: '운영 예정',
        week3_done: 0,
        week4_info: '월 마감 점검',
        week4_done: 0,
        week5_info: '5주차 예비 운영',
        week5_done: 0,
        public_note: customer.public_note,
        internal_note: customer.internal_note,
        status: customer.status === 'contract_pending' ? 'contract_pending' : customer.produced_total.includes?.('(완)') ? 'completed' : 'in_progress'
      };
      record.total_completed = sumWeeklyDone(record);
      state.monthly_status.push(record);
    });
  });
  state.monthly_status.forEach((record) => { record.total_completed = sumWeeklyDone(record); });
  return state;
}

const Store = {
  load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const state = seedMonthlyStatus(clone(INITIAL_STATE));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return state;
    }
    return seedMonthlyStatus(JSON.parse(saved));
  },
  save(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); },
  reset() {
    const state = seedMonthlyStatus(clone(INITIAL_STATE));
    this.save(state);
    return state;
  }
};

const Auth = {
  ADMIN_ACCOUNTS: [{ id: 'admin', password: 'maestic2026!', name: '관리자', role: 'admin' }],
  login(role, id, credential) {
    if (role === 'admin') {
      const admin = this.ADMIN_ACCOUNTS.find((account) => account.id === id && account.password === credential);
      if (!admin) return { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' };
      const session = { role: 'admin', name: admin.name, id: admin.id, loginAt: Date.now() };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, session };
    }
    const state = Store.load();
    const customer = state.customers.find((item) => item.customer_no === id && item.pin_hash === credential && item.status !== 'deleted');
    if (!customer) return { success: false, message: '고객번호 또는 PIN이 올바르지 않습니다.' };
    if (customer.status !== 'active') return { success: false, message: '계약대기 또는 비활성 고객은 로그인할 수 없습니다.' };
    const session = { role: 'customer', name: customer.customer_name, customerNo: customer.customer_no, customerId: customer.id, loginAt: Date.now() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, session };
  },
  getSession() { const session = sessionStorage.getItem(SESSION_KEY); return session ? JSON.parse(session) : null; },
  logout() { sessionStorage.removeItem(SESSION_KEY); window.location.href = 'index.html'; },
  requireAuth(role) {
    const session = this.getSession();
    if (!session) { window.location.href = 'index.html'; return null; }
    if (role && session.role !== role) { window.location.href = session.role === 'admin' ? 'admin.html' : 'customer.html'; return null; }
    return session;
  }
};

const Metrics = {
  summarize(customers) {
    const visibleCustomers = customers.filter((customer) => customer.status !== 'deleted');
    const activeCustomers = visibleCustomers.filter((customer) => customer.status === 'active');
    const contractPendingCount = visibleCustomers.filter((customer) => customer.status === 'contract_pending').length;
    const inactiveCount = visibleCustomers.filter((customer) => customer.status === 'inactive').length;
    const totalWeeklyTarget = visibleCustomers.reduce((sum, customer) => sum + (customer.weekly_target_count || 0), 0);
    const producedThisWeek = visibleCustomers.reduce((sum, customer) => sum + (customer.produced_this_week || 0), 0);
    const reservedCount = visibleCustomers.filter((customer) => customer.reservation_status === 'Y').length;
    const attentionCount = visibleCustomers.filter((customer) => this.needsAttention(customer)).length;
    const totalSubscribers = visibleCustomers.reduce((sum, customer) => sum + Number(customer.subscribers || 0), 0);
    return { activeCount: activeCustomers.length, totalCustomers: visibleCustomers.length, contractPendingCount, inactiveCount, totalWeeklyTarget, producedThisWeek, reservedCount, attentionCount, totalSubscribers };
  },
  needsAttention(customer) {
    return customer.status === 'contract_pending' || customer.status === 'inactive' || customer.reservation_status !== 'Y' || /미진행|미검수|적용시점|요청시/.test(customer.internal_note || customer.weekly_target || '');
  },
  isLongUncontracted(customer) { return customer.status === 'contract_pending' && Number(customer.pending_months || 0) >= 3; }
};

const UI = {
  money(value) { return Number(value || 0).toLocaleString('ko-KR'); },
  number(value) { return Number(value || 0).toLocaleString('ko-KR'); },
  escape(value = '') { return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char])); },
  productBadge(type) {
    const map = { 콘텐츠형: 'info', 성장형: 'primary', 제휴형: 'warning', 기업형: 'danger' };
    return `<span class="badge badge-${map[type] || 'secondary'}">${type}</span>`;
  },
  statusBadge(status) {
    const map = {
      active: ['활성', 'success'], contract_pending: ['계약대기', 'warning'], inactive: ['비활성', 'secondary'], deleted: ['삭제', 'danger'],
      in_progress: ['진행중', 'primary'], completed: ['완료', 'success'], paused: ['일시정지', 'warning'],
      recommended: ['추천', 'secondary'], confirmed: ['확정', 'success'], process_completed: ['처리완료', 'success'],
      reviewing: ['검토중', 'primary'], approved: ['승인완료', 'success'], revision_requested: ['수정요청', 'danger'], sent: ['발송완료', 'success'], replied: ['답글완료', 'primary']
    };
    const [label, tone] = map[status] || [status, 'secondary'];
    return `<span class="badge badge-${tone}">${label}</span>`;
  },
  progress(done, total) {
    const safeTotal = Number(total || 0);
    const pct = safeTotal ? Math.min(100, Math.round((Number(done || 0) / safeTotal) * 100)) : 0;
    return `<div class="progress"><span style="width:${pct}%"></span></div><small>${done || 0}/${safeTotal || '-'} (${pct}%)</small>`;
  },
  toast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 250); }, 2600);
  },
  renderNavbar(session) {
    const nav = document.getElementById('navbar');
    if (!nav || !session) return;
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const adminLinks = [['admin.html', '대시보드'], ['admin-customers.html', '고객관리'], ['admin-pick.html', '기사 Pick'], ['admin-script.html', '대본관리'], ['admin-prompt.html', 'AI 프롬프트'], ['admin-notify.html', '알림']];
    const customerLinks = [['customer.html', '내 현황'], ['customer-pick.html', '기사 Pick'], ['customer-script.html', '내 대본']];
    const links = session.role === 'admin' ? adminLinks : customerLinks;
    nav.innerHTML = `<a class="brand" href="${session.role === 'admin' ? 'admin.html' : 'customer.html'}"><span>M</span><strong>Maestic</strong></a><div class="nav-links">${links.map(([href, label]) => `<a class="${current === href ? 'active' : ''}" href="${href}">${label}</a>`).join('')}</div><div class="nav-user"><span>${session.name}${session.customerNo ? ` (${session.customerNo})` : ''}</span><button type="button" onclick="Auth.logout()">로그아웃</button></div>`;
  }
};

const Notifier = {
  send(type, customerNo, customerName, message, meta = {}) {
    const state = Store.load();
    state.notifications.unshift({ id: `n-${Date.now()}`, type, customer_no: customerNo, customer_name: customerName, message, meta, replies: [], send_status: 'sent', created_at: Date.now() });
    Store.save(state);
  },
  reply(notificationId, authorRole, authorName, message) {
    const state = Store.load();
    const notification = state.notifications.find((item) => item.id === notificationId);
    if (!notification) return null;
    notification.replies ||= [];
    notification.replies.push({ id: `reply-${Date.now()}`, author_role: authorRole, author_name: authorName, message, created_at: Date.now() });
    notification.send_status = 'replied';
    Store.save(state);
    return notification;
  }
};

const OpenAISettings = {
  getKey() { return localStorage.getItem(OPENAI_KEY) || ''; },
  saveKey(key) { localStorage.setItem(OPENAI_KEY, key); },
  clearKey() { localStorage.removeItem(OPENAI_KEY); }
};

const Page = {
  initProtected(role) { const session = Auth.requireAuth(role); UI.renderNavbar(session); return session; },
  resetDemoData() { Store.reset(); UI.toast('초기 데모 데이터로 복원했습니다.'); setTimeout(() => location.reload(), 600); }
};
