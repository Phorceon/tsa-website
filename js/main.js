import { icons as i } from './icons.js';
import * as R from './render-pages.js';

const NAV = [
  { path: '/', label: 'Home' },
  { path: '/resources', label: 'Resources' },
  { path: '/mental-health', label: 'Mental Health' },
  { path: '/events', label: 'Events' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/programs', label: 'Programs' },
  { path: '/references', label: 'References' },
];

const state = {
  path: '/',
  mobileOpen: false,
  resources: { activeFilters: [], searchQuery: '' },
  events: { activeCategory: 'All', dateFilter: 'all', sortBy: 'date', viewMode: 'grid' },
  programs: { ageFilter: 'All', categoryFilter: 'All', costFilter: 'All' },
  mental: { specialtyFilter: 'All', insuranceFilter: 'All', languageFilter: 'All', formatFilter: 'All' },
  volunteer: { activeCause: 'All', activeTab: 'volunteer', tutorSubmitted: false, skillSubmitted: false },
};

function getPath() {
  let h = window.location.hash.replace(/^#/, '') || '/';
  if (!h.startsWith('/')) h = '/' + h;
  const known = NAV.map((n) => n.path);
  return known.includes(h) ? h : '/';
}

function setPath(path) {
  window.location.hash = '#' + path;
}

function navHtml(path) {
  const desktop = NAV.map(
    (l) =>
      `<a href="#${l.path}" class="nav-link${path === l.path ? ' is-active' : ''}" data-nav-link="${l.path}" ${path === l.path ? 'aria-current="page"' : ''}>${l.label}</a>`
  ).join('');
  const mobile = NAV.map(
    (l) =>
      `<a href="#${l.path}" class="${path === l.path ? 'is-active' : ''}" data-nav-link="${l.path}" ${path === l.path ? 'aria-current="page"' : ''}>${l.label}</a>`
  ).join('');
  return `
    <a href="#main-content" class="sr-only sr-only-focusable">Skip to main content</a>
    <nav class="site-nav" aria-label="Primary">
      <div class="container site-nav-inner">
        <a href="#/" class="nav-brand" data-nav-link="/"><div class="nav-logo">TC</div><span class="nav-title">Tracy Community Center</span></a>
        <div class="nav-desktop">${desktop}</div>
        <div class="nav-actions">
          <a href="tel:988" class="btn-help-nav">${i.phone} Get Help Now</a>
          <button type="button" class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">${i.menu}</button>
        </div>
      </div>
    </nav>
    <div class="mobile-drawer-backdrop" id="drawer-backdrop" aria-hidden="true">
      <div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="mobile-drawer-header"><span>Menu</span><button type="button" id="drawer-close" class="nav-toggle" style="color:var(--navy)" aria-label="Close menu">${i.x}</button></div>
        <div class="mobile-drawer-links">${mobile}<a href="tel:988" class="mobile-drawer-help">${i.phone} Get Help Now — 988</a></div>
      </div>
    </div>`;
}

function footerHtml() {
  const labels = {
    '/': 'Home',
    '/resources': 'Community Resources',
    '/mental-health': 'Mental Health',
    '/events': 'Events',
    '/volunteer': 'Volunteer',
    '/programs': 'Programs',
    '/references': 'References',
  };
  const ql = NAV.map((l) => `<li><a href="#${l.path}">${labels[l.path]}</a></li>`).join('');
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <div style="display:flex;align-items:center;gap:0.625rem;margin-bottom:1rem">
            <div class="nav-logo">TC</div><span style="font-weight:600;color:#fff">Tracy Community Center</span>
          </div>
          <p class="footer-about">Connecting Tracy residents to resources, events, and community support. A central hub for all ages and backgrounds.</p>
          <div class="footer-contact-row">${i.mapPin}<span>Tracy, California 95376</span></div>
          <div class="footer-contact-row">${i.phone}<a href="tel:209-831-6200">209-831-6200</a></div>
          <div class="footer-contact-row">${i.mail}<a href="mailto:info@tracycommunity.org">info@tracycommunity.org</a></div>
        </div>
        <div>
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-links">${ql}</ul>
        </div>
        <div>
          <h3 class="footer-heading">Connect With Us</h3>
          <div class="social-row">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${i.facebook}</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${i.instagram}</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">${i.twitter}</a>
          </div>
          <p style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-bottom:0.75rem">Subscribe for weekly updates on events and resources.</p>
          <form class="subscribe-form" id="subscribe-form">
            <input type="email" name="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <p>&copy; 2026 Tracy Community Center. Built for the TSA Webmaster Competition.</p>
          <div class="footer-meta"><a href="#/references">References</a><span style="margin:0 0.5rem;color:rgba(255,255,255,0.2)">|</span><a href="#">Privacy</a><span style="margin:0 0.5rem;color:rgba(255,255,255,0.2)">|</span><a href="#">Terms</a></div>
        </div>
      </div>
    </footer>`;
}

function renderMain() {
  const p = state.path;
  if (p === '/') return R.renderHome();
  if (p === '/resources') return R.renderResources(state.resources);
  if (p === '/events') return R.renderEvents(state.events);
  if (p === '/programs') return R.renderPrograms(state.programs);
  if (p === '/mental-health') return R.renderMentalHealth(state.mental);
  if (p === '/volunteer') return R.renderVolunteer(state.volunteer);
  if (p === '/references') return R.renderReferences();
  return R.renderHome();
}

function updateNavActive() {
  const p = state.path;
  document.querySelectorAll('.nav-link[data-nav-link]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const linkPath = href.replace(/^#/, '');
    const on = linkPath === p;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.querySelectorAll('.mobile-drawer-links a[data-nav-link]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    const linkPath = href.replace(/^#/, '');
    a.classList.toggle('is-active', linkPath === p);
    if (linkPath === p) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function bindNavChrome() {
  const backdrop = document.getElementById('drawer-backdrop');
  const toggle = document.getElementById('nav-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const setOpen = (open) => {
    state.mobileOpen = open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (backdrop) backdrop.classList.toggle('is-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.innerHTML = open ? i.x : i.menu;
    }
  };
  toggle?.addEventListener('click', () => setOpen(!state.mobileOpen));
  closeBtn?.addEventListener('click', () => setOpen(false));
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) setOpen(false);
  });
  document.querySelectorAll('[data-nav-link]').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
}

function initScrollReveal(root) {
  const els = root.querySelectorAll('.reveal:not(.revealed)');
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

const breatheTimers = {};

function clearBreathe(id) {
  if (breatheTimers[id]) {
    clearInterval(breatheTimers[id].interval);
    clearInterval(breatheTimers[id].timerInt);
    delete breatheTimers[id];
  }
}

function setupBreathing(root) {
  root.querySelectorAll('[data-breathe-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-breathe-toggle');
      const type = btn.getAttribute('data-breathe-type');
      const ring = root.querySelector(`#${id}-ring`);
      const label = root.querySelector(`#${id}-label`);
      const timerEl = root.querySelector(`#${id}-timer`);
      const phases = type === 'box' ? ['Inhale', 'Hold', 'Exhale', 'Hold'] : ['Inhale', 'Hold', 'Exhale'];
      const running = !!breatheTimers[id];

      if (running) {
        clearBreathe(id);
        ring?.classList.remove('is-animating', 'box', 'f478');
        btn.innerHTML = `${i.play} Start`;
        return;
      }

      let phase = 0;
      ring?.classList.add('is-animating', type === 'box' ? 'box' : 'f478');
      if (label) label.textContent = phases[phase];
      btn.innerHTML = `${i.pause} Pause`;

      const stepMs = type === 'box' ? 4000 : 4000;
      breatheTimers[id] = {
        interval: setInterval(() => {
          phase = (phase + 1) % phases.length;
          if (label) label.textContent = phases[phase];
        }, stepMs),
      };

      if (type === 'box' && timerEl) {
        let sec = 240;
        const tick = () => {
          sec = Math.max(0, sec - 4);
          const m = String(Math.floor(sec / 60)).padStart(2, '0');
          const s = String(sec % 60).padStart(2, '0');
          timerEl.textContent = `${m}:${s}`;
        };
        tick();
        breatheTimers[id].timerInt = setInterval(tick, 4000);
      }

    });
  });
  root.querySelectorAll('[data-breathe-reset]').forEach((b) => {
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-breathe-reset');
      const type = b.getAttribute('data-breathe-type');
      const ring = root.querySelector(`#${id}-ring`);
      const label = root.querySelector(`#${id}-label`);
      const timerEl = root.querySelector(`#${id}-timer`);
      const phases = type === 'box' ? ['Inhale', 'Hold', 'Exhale', 'Hold'] : ['Inhale', 'Hold', 'Exhale'];
      const toggle = root.querySelector(`[data-breathe-toggle="${id}"]`);
      clearBreathe(id);
      ring?.classList.remove('is-animating', 'box', 'f478');
      if (label) label.textContent = phases[0];
      if (timerEl) timerEl.textContent = '04:00';
      if (toggle) toggle.innerHTML = `${i.play} Start`;
    });
  });
}

function bindPage(root) {
  /* Resources */
  root.querySelectorAll('[data-res-cat]').forEach((b) => {
    b.addEventListener('click', () => {
      const cat = b.getAttribute('data-res-cat');
      if (cat === 'All') state.resources.activeFilters = [];
      else {
        const set = new Set(state.resources.activeFilters);
        if (set.has(cat)) set.delete(cat);
        else set.add(cat);
        state.resources.activeFilters = [...set];
      }
      paint();
    });
  });
  root.querySelector('[data-res-search]')?.addEventListener('input', (e) => {
    state.resources.searchQuery = e.target.value;
    paint();
  });
  root.querySelectorAll('[data-res-clear]').forEach((b) => {
    b.addEventListener('click', () => {
      state.resources.activeFilters = [];
      state.resources.searchQuery = '';
      paint();
    });
  });

  /* Events */
  root.querySelectorAll('[data-ev-cat]').forEach((b) => {
    b.addEventListener('click', () => {
      state.events.activeCategory = b.getAttribute('data-ev-cat');
      paint();
    });
  });
  root.querySelector('[data-ev-date]')?.addEventListener('change', (e) => {
    state.events.dateFilter = e.target.value;
    paint();
  });
  root.querySelector('[data-ev-sort]')?.addEventListener('change', (e) => {
    state.events.sortBy = e.target.value;
    paint();
  });
  root.querySelectorAll('[data-ev-view]').forEach((b) => {
    b.addEventListener('click', () => {
      state.events.viewMode = b.getAttribute('data-ev-view');
      paint();
    });
  });
  root.querySelectorAll('[data-ev-clear]').forEach((b) => {
    b.addEventListener('click', () => {
      state.events.activeCategory = 'All';
      state.events.dateFilter = 'all';
      state.events.sortBy = 'date';
      paint();
    });
  });

  /* Programs */
  root.querySelectorAll('[data-pr-age]').forEach((b) => {
    b.addEventListener('click', () => {
      state.programs.ageFilter = b.getAttribute('data-pr-age');
      paint();
    });
  });
  root.querySelectorAll('[data-pr-cat]').forEach((b) => {
    b.addEventListener('click', () => {
      state.programs.categoryFilter = b.getAttribute('data-pr-cat');
      paint();
    });
  });
  root.querySelectorAll('[data-pr-cost]').forEach((b) => {
    b.addEventListener('click', () => {
      state.programs.costFilter = b.getAttribute('data-pr-cost');
      paint();
    });
  });
  root.querySelectorAll('[data-pr-clear]').forEach((b) => {
    b.addEventListener('click', () => {
      state.programs.ageFilter = 'All';
      state.programs.categoryFilter = 'All';
      state.programs.costFilter = 'All';
      paint();
    });
  });

  /* Mental health filters */
  root.querySelector('[data-th-sp]')?.addEventListener('change', (e) => {
    state.mental.specialtyFilter = e.target.value;
    paint();
  });
  root.querySelector('[data-th-in]')?.addEventListener('change', (e) => {
    state.mental.insuranceFilter = e.target.value;
    paint();
  });
  root.querySelector('[data-th-la]')?.addEventListener('change', (e) => {
    state.mental.languageFilter = e.target.value;
    paint();
  });
  root.querySelector('[data-th-fo]')?.addEventListener('change', (e) => {
    state.mental.formatFilter = e.target.value;
    paint();
  });

  /* Volunteer */
  root.querySelectorAll('[data-vo-tab]').forEach((b) => {
    b.addEventListener('click', () => {
      state.volunteer.activeTab = b.getAttribute('data-vo-tab');
      paint();
    });
  });
  root.querySelectorAll('[data-vo-cause]').forEach((b) => {
    b.addEventListener('click', () => {
      state.volunteer.activeCause = b.getAttribute('data-vo-cause');
      paint();
    });
  });
  root.querySelector('[data-tutor-form]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.volunteer.tutorSubmitted = true;
    paint();
  });
  root.querySelector('[data-skill-form]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.volunteer.skillSubmitted = true;
    paint();
  });

  /* References accordion */
  root.querySelectorAll('.accordion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-acc');
      const panel = root.getElementById(`acc-panel-${idx}`);
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      const icon = btn.querySelector('[data-acc-icon]');
      if (panel) panel.hidden = open;
      if (icon) icon.innerHTML = open ? i.chevronDown : i.chevronUp;
    });
  });

  root.querySelectorAll('[data-pdf]').forEach((b) => {
    b.addEventListener('click', () => {
      alert('PDF download would open the requested TSA document.');
    });
  });

  setupBreathing(root);
}

function paint() {
  state.path = getPath();
  const outlet = document.getElementById('app-main');
  if (!outlet) return;
  outlet.innerHTML = renderMain();
  window.scrollTo(0, 0);
  updateNavActive();
  initScrollReveal(outlet);
  bindPage(outlet);
}

function boot() {
  state.path = getPath();
  document.getElementById('site-nav').innerHTML = navHtml(state.path);
  document.getElementById('site-footer').innerHTML = footerHtml();
  bindNavChrome();
  document.getElementById('subscribe-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  });

  window.addEventListener('hashchange', () => paint());

  paint();
}

boot();
