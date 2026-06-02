// ============================================================
// Maestic 고객 운영 포털 - 공통 데이터/인증/렌더링 유틸리티
// ============================================================
const STORAGE_KEY = 'maestic_portal_state_v2';
const SESSION_KEY = 'maestic_session';

const INITIAL_STATE = {
  customers: [
    { id: 'c001', customer_no: '001', customer_name: '아비뜨', product_type: '콘텐츠형', monthly_fee: 990000, contract_round: '-', monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 5, produced_total: '-', reservation_status: 'Y', subscribers: 1295, public_note: '월~금 예약 업로드 정상 진행', internal_note: '', pin_hash: '1234', status: 'active' },
    { id: 'c011', customer_no: '011', customer_name: '법무법인오현', product_type: '콘텐츠형', monthly_fee: 990000, contract_round: '-', monthly_quota: 0, weekly_target: '요청시', weekly_target_count: 0, upload_cycle: '검수후', produced_this_week: null, produced_total: '-', reservation_status: '미진행', subscribers: 3652, public_note: '검수 대기 중', internal_note: '약 2주간, 미검수 및 뉴스픽 미진행', pin_hash: '1234', status: 'active' },
    { id: 'c012', customer_no: '012', customer_name: '뉴스톡', product_type: '성장형', monthly_fee: 1320000, contract_round: '17', monthly_quota: 8, weekly_target: '2개', weekly_target_count: 2, upload_cycle: '화, 금', produced_this_week: 2, produced_total: '6', reservation_status: 'Y', subscribers: 13630, public_note: '화/금 주 2회 예약 업로드', internal_note: '', pin_hash: '1234', status: 'active' },
    { id: 'c017', customer_no: '017', customer_name: '엘사국제학교', product_type: '제휴형', monthly_fee: 0, contract_round: '7', monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 5, produced_total: '20(완)', reservation_status: 'Y', subscribers: 154682, public_note: '회차 마감', internal_note: '회차마감', pin_hash: '1234', status: 'active' },
    { id: 'c018', customer_no: '018', customer_name: '한석준', product_type: '제휴형', monthly_fee: 0, contract_round: '-', monthly_quota: 0, weekly_target: '요청시', weekly_target_count: 0, upload_cycle: '월~금', produced_this_week: null, produced_total: '-', reservation_status: '미진행', subscribers: 71675, public_note: '요청 시 제작', internal_note: '요청시 제작 상태이며 예약 업로드 미진행', pin_hash: '1234', status: 'pause' },
    { id: 'c020', customer_no: '020', customer_name: '법무법인진솔', product_type: '성장형', monthly_fee: 1320000, contract_round: '3', monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '검수후', produced_this_week: null, produced_total: '15', reservation_status: '미진행', subscribers: 1295, public_note: '검수 후 업로드', internal_note: '성장알고리즘 적용시점', pin_hash: '1234', status: 'active' },
    { id: 'c021', customer_no: '021', customer_name: '도서출판크레타', product_type: '성장형', monthly_fee: 1320000, contract_round: '-', monthly_quota: 8, weekly_target: '2개', weekly_target_count: 2, upload_cycle: '화, 금', produced_this_week: 2, produced_total: '8', reservation_status: 'Y', subscribers: 8200, public_note: '신간/저자 콘텐츠 중심 운영', internal_note: 'README 초기 고객 기준 추가', pin_hash: '1234', status: 'active' },
    { id: 'c000', customer_no: '000', customer_name: '책책책', product_type: '성장형', monthly_fee: 1320000, contract_round: '-', monthly_quota: 40, weekly_target: '10개', weekly_target_count: 10, upload_cycle: '월~금', produced_this_week: 10, produced_total: '-', reservation_status: 'Y', subscribers: 13601, public_note: '주 10개 집중 운영', internal_note: '', pin_hash: '1234', status: 'active' },
    { id: 'c022', customer_no: '022', customer_name: '부산광역시', product_type: '기업형', monthly_fee: 2500000, contract_round: '1', monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 4, produced_total: '18(완)', reservation_status: 'Y', subscribers: 56604, public_note: '알고리즘 적용 후 신규 구독자 증가', internal_note: '알고리즘 적용완료(신규 구독자 약 300명 증가)', pin_hash: '1234', status: 'active' },
    { id: 'c023', customer_no: '023', customer_name: '글로비세무', product_type: '제휴형', monthly_fee: 0, contract_round: '1', monthly_quota: 20, weekly_target: '5개', weekly_target_count: 5, upload_cycle: '월~금', produced_this_week: 5, produced_total: '15', reservation_status: 'Y', subscribers: 7, public_note: '제휴 콘텐츠형 3개월 진행', internal_note: '제휴(콘텐츠형) 3개월 진행, 미리 고지', pin_hash: '1234', status: 'active' }
  ],
  monthly_status: [],
  article_recommendations: [
    { id: 'r1', customer_no: '011', title: '법률 이슈 뉴스픽 후보', url: 'https://example.com/law-news', status: 'pending', created_at: Date.now() - 86400000 },
    { id: 'r2', customer_no: '022', title: '부산시 정책 숏폼 후보', url: 'https://example.com/busan-policy', status: 'picked', created_at: Date.now() - 172800000 }
  ],
  scripts: [
    { id: 's1', customer_no: '012', title: '뉴스톡 화요일 쇼츠 대본', version: 1, status: 'reviewing', body: '핵심 이슈를 30초 안에 전달하는 쇼츠 대본 초안입니다.', updated_at: Date.now() - 3600000 },
    { id: 's2', customer_no: '022', title: '부산광역시 알고리즘 성과 대본', version: 2, status: 'approved', body: '신규 구독자 증가 성과를 소개하는 대본입니다.', updated_at: Date.now() - 7200000 }
  ],
  notifications: [],
  prompts: {}
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function seedMonthlyStatus(state) {
  if (state.monthly_status.length) return state;
  state.monthly_status = state.customers.map((customer) => ({
    id: `m-${customer.customer_no}-2026-03`,
    customer_no: customer.customer_no,
    year: 2026,
    month: 3,
    total_target: customer.monthly_quota,
    total_completed: customer.produced_total && /\d/.test(customer.produced_total) ? Number(customer.produced_total.match(/\d+/)[0]) : customer.produced_this_week || 0,
    week1_info: customer.upload_cycle,
    week1_done: customer.produced_this_week || 0,
    week2_info: customer.reservation_status === 'Y' ? '예약 업로드 예정' : '검수/요청 확인 필요',
    week2_done: 0,
    week3_info: '운영 예정',
    week3_done: 0,
    week4_info: '월 마감 점검',
    week4_done: 0,
    public_note: customer.public_note,
    internal_note: customer.internal_note,
    status: customer.status === 'pause' ? 'paused' : customer.produced_total.includes?.('(완)') ? 'completed' : 'in_progress'
  }));
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
  save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
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
    const customer = state.customers.find((item) => item.customer_no === id && item.pin_hash === credential);
    if (!customer) return { success: false, message: '고객번호 또는 PIN이 올바르지 않습니다.' };
    const session = { role: 'customer', name: customer.customer_name, customerNo: customer.customer_no, customerId: customer.id, loginAt: Date.now() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, session };
  },
  getSession() {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  },
  requireAuth(role) {
    const session = this.getSession();
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }
    if (role && session.role !== role) {
      window.location.href = session.role === 'admin' ? 'admin.html' : 'customer.html';
      return null;
    }
    return session;
  }
};

const Metrics = {
  summarize(customers) {
    const activeCustomers = customers.filter((customer) => customer.status === 'active');
    const totalWeeklyTarget = customers.reduce((sum, customer) => sum + (customer.weekly_target_count || 0), 0);
    const producedThisWeek = customers.reduce((sum, customer) => sum + (customer.produced_this_week || 0), 0);
    const reservedCount = customers.filter((customer) => customer.reservation_status === 'Y').length;
    const attentionCount = customers.filter((customer) => customer.reservation_status !== 'Y' || customer.status === 'pause' || customer.internal_note).length;
    const totalSubscribers = customers.reduce((sum, customer) => sum + Number(customer.subscribers || 0), 0);
    return { activeCount: activeCustomers.length, totalCustomers: customers.length, totalWeeklyTarget, producedThisWeek, reservedCount, attentionCount, totalSubscribers };
  },
  needsAttention(customer) {
    return customer.reservation_status !== 'Y' || customer.status === 'pause' || /미진행|미검수|적용시점|요청시/.test(customer.internal_note || customer.weekly_target || '');
  }
};

const UI = {
  money(value) {
    return Number(value || 0).toLocaleString('ko-KR');
  },
  number(value) {
    return Number(value || 0).toLocaleString('ko-KR');
  },
  escape(value = '') {
    return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  },
  productBadge(type) {
    const map = { 콘텐츠형: 'info', 성장형: 'primary', 제휴형: 'warning', 기업형: 'danger' };
    return `<span class="badge badge-${map[type] || 'secondary'}">${type}</span>`;
  },
  statusBadge(status) {
    const map = {
      active: ['활성', 'success'], pause: ['일시정지', 'warning'], inactive: ['비활성', 'danger'],
      in_progress: ['진행중', 'primary'], completed: ['완료', 'success'], paused: ['일시정지', 'warning'],
      pending: ['대기', 'secondary'], picked: ['선택완료', 'success'], reviewing: ['검토중', 'primary'], approved: ['승인완료', 'success'], revision_requested: ['수정요청', 'danger'], sent: ['발송완료', 'success']
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
    const adminLinks = [
      ['admin.html', '대시보드'], ['admin-customers.html', '고객관리'], ['admin-pick.html', '기사 Pick'], ['admin-script.html', '대본관리'], ['admin-prompt.html', 'AI 프롬프트'], ['admin-notify.html', '알림이력']
    ];
    const customerLinks = [['customer.html', '내 현황'], ['customer-pick.html', '기사 Pick'], ['customer-script.html', '내 대본']];
    const links = session.role === 'admin' ? adminLinks : customerLinks;
    nav.innerHTML = `
      <a class="brand" href="${session.role === 'admin' ? 'admin.html' : 'customer.html'}"><span>M</span><strong>Maestic</strong></a>
      <div class="nav-links">${links.map(([href, label]) => `<a class="${current === href ? 'active' : ''}" href="${href}">${label}</a>`).join('')}</div>
      <div class="nav-user"><span>${session.name}${session.customerNo ? ` (${session.customerNo})` : ''}</span><button type="button" onclick="Auth.logout()">로그아웃</button></div>`;
  }
};

const Webhook = {
  getConfig() {
    const saved = localStorage.getItem('maestic_webhook_config');
    return saved ? JSON.parse(saved) : { clawWebhookUrl: '', lineWebhookUrl: '', lineAccessToken: '', enabled: false };
  },
  saveConfig(config) {
    localStorage.setItem('maestic_webhook_config', JSON.stringify(config));
  },
  send(type, customerNo, customerName, message) {
    const state = Store.load();
    state.notifications.unshift({ id: `n-${Date.now()}`, type, customer_no: customerNo, customer_name: customerName, message, channel: 'web', send_status: 'sent', created_at: Date.now() });
    Store.save(state);
  }
};

const Page = {
  initProtected(role) {
    const session = Auth.requireAuth(role);
    UI.renderNavbar(session);
    return session;
  },
  resetDemoData() {
    Store.reset();
    UI.toast('초기 데모 데이터로 복원했습니다.');
    setTimeout(() => location.reload(), 600);
  }
};
