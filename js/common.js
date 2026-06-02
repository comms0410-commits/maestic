// ============================================================
// Maestic 고객 운영 포털 - 공통 유틸리티
// ============================================================

const API_BASE = 'tables';

// ---- 인증 관련 ----
const Auth = {
  // 관리자 계정 (실제 운영에서는 서버측 처리 필요)
  ADMIN_ACCOUNTS: [
    { id: 'admin', password: 'maestic2026!', name: '관리자', role: 'admin' }
  ],

  login(role, id, credential) {
    if (role === 'admin') {
      const admin = this.ADMIN_ACCOUNTS.find(a => a.id === id && a.password === credential);
      if (admin) {
        const session = { role: 'admin', name: admin.name, id: admin.id, loginAt: Date.now() };
        sessionStorage.setItem('maestic_session', JSON.stringify(session));
        return { success: true, session };
      }
      return { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' };
    }
    return { success: false, message: '잘못된 로그인 방식입니다.' };
  },

  async loginCustomer(customerNo, pin) {
    try {
      const res = await fetch(`${API_BASE}/customers?search=${customerNo}`);
      const data = await res.json();
      const customer = data.data.find(c => c.customer_no === customerNo && c.pin_hash === pin);
      if (customer) {
        const session = {
          role: 'customer',
          name: customer.customer_name,
          customerNo: customer.customer_no,
          customerId: customer.id,
          loginAt: Date.now()
        };
        sessionStorage.setItem('maestic_session', JSON.stringify(session));
        return { success: true, session };
      }
      return { success: false, message: '고객번호 또는 PIN이 올바르지 않습니다.' };
    } catch (e) {
      return { success: false, message: '로그인 중 오류가 발생했습니다.' };
    }
  },

  getSession() {
    const s = sessionStorage.getItem('maestic_session');
    return s ? JSON.parse(s) : null;
  },

  logout() {
    sessionStorage.removeItem('maestic_session');
    window.location.href = 'index.html';
  },

  requireAuth(allowedRole) {
    const session = this.getSession();
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }
    if (allowedRole && session.role !== allowedRole) {
      // 역할 불일치 시 자기 페이지로
      if (session.role === 'admin') window.location.href = 'admin.html';
      else window.location.href = 'customer.html';
      return null;
    }
    return session;
  }
};

// ---- API 헬퍼 ----
const API = {
  async get(table, params = '') {
    const res = await fetch(`${API_BASE}/${table}${params ? '?' + params : ''}`);
    return res.json();
  },
  async getOne(table, id) {
    const res = await fetch(`${API_BASE}/${table}/${id}`);
    return res.json();
  },
  async post(table, data) {
    const res = await fetch(`${API_BASE}/${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async put(table, id, data) {
    const res = await fetch(`${API_BASE}/${table}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async patch(table, id, data) {
    const res = await fetch(`${API_BASE}/${table}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async delete(table, id) {
    await fetch(`${API_BASE}/${table}/${id}`, { method: 'DELETE' });
  },
  // 페이지네이션 전체 조회
  async getAll(table, extraParams = '') {
    const res = await fetch(`${API_BASE}/${table}?limit=200${extraParams ? '&' + extraParams : ''}`);
    const data = await res.json();
    return data.data || [];
  }
};

// ---- UI 헬퍼 ----
const UI = {
  statusBadge(status) {
    const map = {
      active: ['활성', 'badge-success'],
      inactive: ['비활성', 'badge-danger'],
      pause: ['일시정지', 'badge-warning'],
      paused: ['일시정지', 'badge-warning'],
      in_progress: ['진행중', 'badge-primary'],
      pending: ['대기중', 'badge-secondary'],
      completed: ['완료', 'badge-success'],
      draft: ['초안', 'badge-secondary'],
      reviewing: ['검토중', 'badge-primary'],
      revision_requested: ['수정요청', 'badge-danger'],
      approved: ['승인완료', 'badge-success'],
      sent: ['발송완료', 'badge-success'],
      failed: ['발송실패', 'badge-danger']
    };
    const [label, cls] = map[status] || [status, 'badge-secondary'];
    return `<span class="badge ${cls}">${label}</span>`;
  },

  productBadge(type) {
    const map = {
      '콘텐츠형': 'badge-info',
      '성장형': 'badge-primary',
      '제휴형': 'badge-warning',
      '기업형': 'badge-danger'
    };
    return `<span class="badge ${map[type] || 'badge-secondary'}">${type}</span>`;
  },

  toast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  confirm(message) {
    return window.confirm(message);
  },

  formatDate(ts) {
    if (!ts) return '-';
    return new Date(ts).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  },

  progress(done, total) {
    if (!total) return '<span class="text-muted">-</span>';
    const pct = Math.round((done / total) * 100);
    const cls = pct >= 100 ? 'bg-success' : pct >= 50 ? 'bg-primary' : 'bg-warning';
    return `<div class="progress-wrap">
      <div class="progress-bar-outer">
        <div class="progress-bar-inner ${cls}" style="width:${Math.min(pct,100)}%"></div>
      </div>
      <span class="progress-text">${done}/${total} (${pct}%)</span>
    </div>`;
  },

  renderNavbar(session) {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    nav.innerHTML = `
      <div class="nav-brand">
        <span class="nav-logo">M</span>
        <span class="nav-title">Maestic 운영 포털</span>
      </div>
      <div class="nav-menu">
        ${session.role === 'admin' ? `
          <a href="admin.html" class="nav-link">대시보드</a>
          <a href="admin-customers.html" class="nav-link">고객관리</a>
          <a href="admin-pick.html" class="nav-link">기사 Pick</a>
          <a href="admin-script.html" class="nav-link">대본관리</a>
          <a href="admin-prompt.html" class="nav-link">AI 프롬프트</a>
          <a href="admin-notify.html" class="nav-link">알림이력</a>
        ` : `
          <a href="customer.html" class="nav-link">내 현황</a>
          <a href="customer-pick.html" class="nav-link">기사 Pick</a>
          <a href="customer-script.html" class="nav-link">내 대본</a>
        `}
      </div>
      <div class="nav-user">
        <span class="nav-username">${session.role === 'admin' ? '👑 ' + session.name : '👤 ' + session.name + ' (' + session.customerNo + ')'}</span>
        <button class="btn btn-sm btn-outline" onclick="Auth.logout()">로그아웃</button>
      </div>
    `;
    // 현재 활성 메뉴 표시
    const links = nav.querySelectorAll('.nav-link');
    links.forEach(l => {
      if (l.href.includes(window.location.pathname.split('/').pop())) {
        l.classList.add('active');
      }
    });
  }
};

// ---- LINE/Claw Webhook 헬퍼 ----
const Webhook = {
  // Claw/LINE webhook 설정 (localStorage에 저장)
  getConfig() {
    const cfg = localStorage.getItem('maestic_webhook_config');
    return cfg ? JSON.parse(cfg) : {
      lineWebhookUrl: '',
      clawWebhookUrl: '',
      lineAccessToken: '',
      enabled: false
    };
  },
  saveConfig(config) {
    localStorage.setItem('maestic_webhook_config', JSON.stringify(config));
  },

  async send(type, customerNo, customerName, message, extraData = {}) {
    const cfg = this.getConfig();
    if (!cfg.enabled) return;

    const payload = {
      type,
      customer_no: customerNo,
      customer_name: customerName,
      message,
      timestamp: new Date().toISOString(),
      ...extraData
    };

    // Claw webhook 발송
    if (cfg.clawWebhookUrl) {
      try {
        await fetch(cfg.clawWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors'
        });
      } catch (e) {
        console.warn('Claw webhook 발송 실패:', e);
      }
    }

    // 알림 이력 저장
    await API.post('notifications', {
      customer_no: customerNo,
      type,
      message,
      channel: cfg.clawWebhookUrl ? 'claw' : 'web',
      send_status: 'sent',
      webhook_url: cfg.clawWebhookUrl || cfg.lineWebhookUrl
    });
  }
};

// ---- AI 대본 생성 헬퍼 ----
const AIHelper = {
  async generateScript(promptConfig, articleTitle, articleUrl, articleSummary) {
    const systemPrompt = promptConfig.system_prompt || `당신은 전문 콘텐츠 대본 작가입니다. ${promptConfig.brand_tone || '전문적이고 신뢰감 있는'} 톤으로 대본을 작성해주세요.`;
    const userPrompt = `다음 기사를 기반으로 유튜브/SNS 대본을 작성해주세요.

기사 제목: ${articleTitle}
기사 URL: ${articleUrl}
기사 요약: ${articleSummary || '내용 참조'}

조건:
- 톤앤매너: ${promptConfig.brand_tone || '전문적'}
- 대본 길이: ${promptConfig.script_length || '2-3분 분량'}
- 타겟: ${promptConfig.target_audience || '일반 시청자'}
- CTA: ${promptConfig.cta_text || ''}
- 금지 표현: ${promptConfig.restrictions || '없음'}
- 강조 키워드: ${promptConfig.keywords || ''}

${promptConfig.style_prompt || ''}`;

    return { systemPrompt, userPrompt };
  }
};

// ---- 월 선택 공통 헬퍼 ----
const MonthSelector = {
  init(elementId, onChange) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    const stored = sessionStorage.getItem('maestic_selected_month');
    if (stored) {
      const [y, m] = stored.split('-');
      year = parseInt(y); month = parseInt(m);
    }
    this.render(el, year, month, onChange);
  },
  render(el, year, month, onChange) {
    el.innerHTML = `
      <div class="month-selector">
        <button class="btn btn-sm btn-outline" onclick="MonthSelector._change(-1)">◀</button>
        <span class="month-label">${year}년 ${month}월</span>
        <button class="btn btn-sm btn-outline" onclick="MonthSelector._change(1)">▶</button>
      </div>
    `;
    this._year = year; this._month = month; this._onChange = onChange; this._el = el;
    sessionStorage.setItem('maestic_selected_month', `${year}-${month}`);
    if (onChange) onChange(year, month);
  },
  _change(delta) {
    let m = this._month + delta;
    let y = this._year;
    if (m > 12) { m = 1; y++; }
    if (m < 1) { m = 12; y--; }
    this.render(this._el, y, m, this._onChange);
  },
  get() {
    const stored = sessionStorage.getItem('maestic_selected_month');
    if (stored) {
      const [y, m] = stored.split('-');
      return { year: parseInt(y), month: parseInt(m) };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
};
